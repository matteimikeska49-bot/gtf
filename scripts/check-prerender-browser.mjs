import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';
import { checkBrowserImages, isAnalyticsDependency, isDecodedMediaCancellation } from './lib/browser-image-qa.mjs';
import { installPrerenderEnvironment } from './lib/prerender-environment.mjs';

const base = process.env.BLOG_QA_BASE_URL;
if (!base || !['127.0.0.1', 'localhost'].includes(new URL(base).hostname)) throw new Error('Existing localhost preview URL required');
const out = path.resolve('tmp/blog-visual-qa');
fs.mkdirSync(out, { recursive: true });
const browser = await puppeteer.launch({ headless: true });
const report = [];
try {
  for (const lang of ['en', 'ru']) for (const [device, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844]]) {
    const context = await browser.createBrowserContext();
    const page = await context.newPage();
    await page.setCacheEnabled(false);
    const pageErrors = [], consoleErrors = [], failedRequests = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push({ text: message.text(), url: message.location().url || '' });
    });
    page.on('requestfailed', (request) => failedRequests.push({ url: request.url(), resourceType: request.resourceType(), error: request.failure()?.errorText }));
    await page.setViewport({ width, height, isMobile: device === 'mobile' });
    await page.evaluateOnNewDocument((value) => localStorage.setItem('lang', value), lang);
    const route = lang === 'ru' ? '/ru' : '/';
    const response = await page.goto(`${base}${route}`, { waitUntil: 'networkidle2' });
    assert.equal(response.status(), 200);
    assert.equal(await page.evaluate(() => window.__GTF_PRERENDER_ROUTE), undefined);
    const animationCount = await page.evaluate(() => document.getAnimations().length);
    assert.ok(animationCount > 0, 'Visitor animations must remain active');
    const images = await checkBrowserImages(page);
    assert.equal(images.filter((image) => !image.passed).length, 0, JSON.stringify(images));
    // Exercise the unchanged visitor timer and consent workflow, not the build flag.
    assert.equal(await page.evaluate(() => new Promise((resolve) => {
      const timer = setInterval(() => { clearInterval(timer); resolve(true); }, 16);
    })), true);
    const consentKey = lang === 'ru' ? 'cookiesAccepted' : 'gtf_cookie_consent';
    assert.equal(await page.evaluate((key) => localStorage.getItem(key), consentKey), null);
    const button = lang === 'ru' ? '#cookie-accept-ru' : '#cookie-reject';
    await page.waitForSelector(button, { visible: true, timeout: 5000 });
    // Mounted != clickable while the unchanged entrance animation moves it.
    await page.waitForFunction((selector) => {
      const element = document.querySelector(selector);
      if (!element) return false;
      const rect = element.getBoundingClientRect();
      const hit = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
      return rect.width > 0 && rect.height > 0 && !!hit && element.contains(hit);
    }, { timeout: 5000 }, button);
    await page.click(button);
    const consent = await page.evaluate((key) => localStorage.getItem(key), consentKey);
    assert.equal(lang === 'ru' ? consent === 'true' : JSON.parse(consent).optional === false, true);
    // Real scrolling exposes while-in-view sections; never change image loading attrs.
    await page.evaluate(async () => {
      const height = document.documentElement.scrollHeight;
      for (let y = 0; y < height; y += 600) {
        window.scrollTo({ top: y, behavior: 'instant' });
        await new Promise((resolve) => setTimeout(resolve, 80));
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    const data = await page.evaluate(() => ({
      h1: document.querySelector('h1')?.innerText,
      sections: [...document.querySelectorAll('section')].map((element) => ({ height: element.getBoundingClientRect().height, text: element.innerText.trim().slice(0, 160) })),
      overflow: document.documentElement.scrollWidth > innerWidth + 10,
      emptyHeadings: [...document.querySelectorAll('h1,h2,h3')].filter((element) => !element.textContent.trim()).length,
      visibleBrokenImages: [...document.images].filter((image) => {
        const rect = image.getBoundingClientRect();
        return rect.width && rect.height && rect.left < innerWidth && rect.right > 0 && rect.top < innerHeight && rect.bottom > 0 && (!image.complete || !image.naturalWidth);
      }).map((image) => image.src),
      media: [...document.querySelectorAll('video')].map((video) => ({ url: video.currentSrc, readyState: video.readyState,
        width: video.videoWidth, height: video.videoHeight, error: video.error?.code || null })),
    }));
    assert.equal(pageErrors.length, 0);
    assert.equal(data.overflow, false);
    assert.equal(data.emptyHeadings, 0);
    assert.equal(data.visibleBrokenImages.length, 0);
    assert.ok(data.h1 && data.sections.every((section) => section.height > 0 && section.text));
    const screenshot = `final-home-${lang}-${device}.png`;
    await page.screenshot({ path: path.join(out, screenshot), fullPage: true });
    const mediaCancellations = failedRequests.filter((request) => isDecodedMediaCancellation(request, data.media));
    const applicationPassed = pageErrors.length === 0 && !failedRequests.some((request) => !isAnalyticsDependency(request.url) && !isDecodedMediaCancellation(request, data.media)) &&
      !consoleErrors.some((error) => !(error.text.startsWith('Failed to load resource: net::') && isAnalyticsDependency(error.url)));
    assert.equal(applicationPassed, true, JSON.stringify({ consoleErrors, failedRequests }));
    report.push({ route, device, status: response.status(), ...data, images, visitorAnimationCount: animationCount, applicationPassed, consentWorkflowPassed: true, pageErrors, consoleErrors, failedRequests,
      analyticsFailures: failedRequests.filter((request) => isAnalyticsDependency(request.url)), mediaCancellations, screenshot });
    await page.close();
    await context.close();
  }
  // Slow capture regression: periodic demos and cookie delay cannot alter the snapshot.
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  await page.evaluateOnNewDocument(installPrerenderEnvironment, '/');
  await page.goto(base, { waitUntil: 'networkidle2' });
  const first = await page.$eval('#root', (element) => element.innerHTML);
  await new Promise((resolve) => setTimeout(resolve, 4500));
  const second = await page.$eval('#root', (element) => element.innerHTML);
  assert.equal(first, second, 'Prerender root must survive delayed capture without animation/demo/consent drift');
  assert.equal(await page.$('#cookie-accept-all'), null);
  assert.equal(await page.evaluate(() => localStorage.getItem('gtf_cookie_consent')), null);
  // A broken application image must still fail; analytics classification cannot hide it.
  await page.evaluate(() => {
    const image = document.createElement('img');
    image.src = '/__qa_missing_image__.png';
    document.body.append(image);
  });
  assert.ok((await checkBrowserImages(page)).some((image) => image.url.endsWith('/__qa_missing_image__.png') && !image.passed));
  report.push({ delayedPrerenderSnapshotPassed: true, consentNotFabricated: true });
  await page.close();
  await context.close();
  fs.writeFileSync(path.join(out, 'homepage-technical.json'), JSON.stringify(report, null, 2) + '\n');
  console.log('PASS: EN/RU desktop/mobile image decode, layout, visitor timers/consent and delayed prerender snapshot. See separate analytics diagnostics.');
} finally { await browser.close(); }
