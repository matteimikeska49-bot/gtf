import assert from 'node:assert/strict';
import fs from 'node:fs';
import puppeteer from 'puppeteer';

const base = process.env.BLOG_QA_BASE_URL;
if (!base || !['127.0.0.1', 'localhost'].includes(new URL(base).hostname)) throw new Error('Existing localhost preview required');
const optional = url => /(?:googletagmanager\.com|google-analytics\.com|mc\.yandex\.(?:ru|com)|mc\.yandex|yandex\.ru\/clck)/u.test(url);
const bootstraps = ['/gtm.js', '/gtag/js', '/metrika/tag.js'];
const cases = [
  ['en-clean-reject', 'EN', '/', null, '#cookie-reject', false],
  ['en-clean-accept', 'EN', '/', null, '#cookie-accept-all', true],
  ['ru-clean-accept', 'RU', '/ru', null, '#cookie-accept-ru', true],
  ['ru-learn-more', 'RU', '/ru', null, '#cookie-learn-more-ru', false],
  ['saved-reject', 'EN', '/', { necessary: true, optional: false }, null, false],
  ['saved-accept', 'RU', '/ru', { necessary: true, optional: true }, null, true],
  ['invalid-consent', 'EN', '/', { optional: true }, null, false],
];
const report = [];
const browser = await puppeteer.launch({ headless: true });
try {
  for (const [name, lang, route, saved, button, accepted] of cases) {
    const context = await browser.createBrowserContext();
    const page = await context.newPage();
    const requests = [], failures = [], errors = [];
    page.on('request', request => { if (optional(request.url())) requests.push(new URL(request.url()).origin + new URL(request.url()).pathname); });
    page.on('requestfailed', request => { if (optional(request.url())) failures.push({ url: new URL(request.url()).origin + new URL(request.url()).pathname, error: request.failure()?.errorText }); });
    page.on('pageerror', error => errors.push(error.message));
    await page.evaluateOnNewDocument((language, choice) => {
      localStorage.setItem('lang', language.toLowerCase());
      if (choice) localStorage.setItem('gtf_cookie_consent', JSON.stringify(choice));
    }, lang, saved);
    assert.equal((await page.goto(base + route, { waitUntil: 'networkidle2' })).status(), 200);
    await new Promise(resolve => setTimeout(resolve, 1600));
    const before = requests.length;
    if (!saved || saved.optional !== true || saved.necessary !== true) assert.equal(before, 0, name + ': no optional request before consent');
    if (button) {
      await page.waitForSelector(button, { visible: true });
      await page.click(button);
      await new Promise(resolve => setTimeout(resolve, 2500));
    }
    if (accepted) {
      for (const path of bootstraps) assert.equal(requests.filter(url => new URL(url).pathname === path).length, 1, name + ': one ' + path);
      const count = requests.filter(url => bootstraps.includes(new URL(url).pathname)).length;
      await page.evaluate(() => { window.gtfAnalytics.setConsent(true); window.gtfAnalytics.setConsent(true); });
      await new Promise(resolve => setTimeout(resolve, 500));
      assert.equal(requests.filter(url => bootstraps.includes(new URL(url).pathname)).length, count, name + ': replay must not initialize again');
    } else assert.equal(requests.length, 0, name + ': Reject/invalid/learn-more does not permit analytics');
    assert.equal(errors.length, 0, name + ': application error');
    const state = await page.evaluate(() => ({ choice: window.gtfAnalytics.readChoice(), saved: localStorage.getItem('gtf_cookie_consent'), url: location.pathname }));
    if (name === 'ru-learn-more') { assert.equal(state.url, '/ru/politika'); assert.equal(state.choice, null); }
    if (button && name !== 'ru-learn-more') {
      await page.reload({ waitUntil: 'networkidle2' });
      assert.equal(await page.evaluate(() => window.gtfAnalytics.readChoice()), accepted, name + ': saved choice survives reload');
      if (!accepted) assert.equal(requests.length, 0);
    }
    report.push({ name, beforeConsentRequests: before, accepted, requests, providerNetworkFailures: failures, applicationErrors: errors, state, passed: true });
    await context.close();
  }
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  const requests = [];
  page.on('request', request => { if (optional(request.url())) requests.push(new URL(request.url()).pathname); });
  await page.setJavaScriptEnabled(false);
  await page.goto(base, { waitUntil: 'networkidle2' });
  assert.equal(requests.length, 0, 'noscript must not bypass missing consent');
  report.push({ name: 'javascript-disabled', optionalRequests: requests.length, passed: true });
  await context.close();
  fs.mkdirSync('tmp/blog-visual-qa', { recursive: true });
  fs.writeFileSync('tmp/blog-visual-qa/analytics-consent.json', JSON.stringify({ base, report, limitations: 'Local network/init evidence, not analytics-account event registration or legal certification. GTM container tag configuration is not inspected.' }, null, 2) + '\n');
  console.log('PASS: eight real browser consent scenarios; no optional pre-consent/Reject requests, one bootstrap per provider after Accept, persisted choice and no-JS fail-closed.');
} finally { await browser.close(); }
