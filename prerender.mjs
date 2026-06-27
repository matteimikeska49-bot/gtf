/**
 * prerender.mjs
 * Prerenders SEO-critical routes by:
 *  1. Starting `vite preview` on a free port
 *  2. Using Puppeteer to visit each route, wait for JS to inject meta tags
 *  3. Writing the resulting HTML to dist/<route>/index.html
 *
 * Run: node prerender.mjs
 */

import { createServer } from 'net';
import { spawn } from 'child_process';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import { readdir, readFile } from 'fs/promises';
import http from 'http';
import { setTimeout as delay } from 'timers/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, 'dist');
const PREVIEW_HOST = '127.0.0.1';
const NAVIGATION_ATTEMPTS = 3;
const NAVIGATION_TIMEOUT_MS = 60000;
const PREVIEW_READY_TIMEOUT_MS = 30000;

/* ── Routes to prerender ── */
const ROUTES = [
  '/',
  '/ru',
  '/ai-carousel-maker',
  '/carousel-maker',
  '/ru/ai-generator-karuselej',
  '/ru/ii-generator-karuseley',
  '/ai-content-generator',
  '/ru/generator-kontenta',
  '/ru/ii-generator-kontenta',
  '/ai-instagram-post-generator',
  '/ai-post-maker',
  '/ru/generator-postov-instagram',
  '/ru/ii-generator-postov-dlya-instagram',
  '/linkedin-carousel-maker',
  '/ru/generator-karuselej-linkedin',
  '/ru/ii-generator-postov-dlya-linkedin',
  '/blog',
  '/ru/blog',
  '/blog/linkedin-carousel-ideas',
  '/blog/best-ai-carousel-generators',
  '/blog/how-to-make-linkedin-carousel-with-ai',
  '/blog/ai-instagram-carousel-generator',
  '/ru/blog/idei-karuselej-linkedin',
  '/ru/blog/luchshie-ai-generatory-karuselej',
  '/ru/blog/kak-sdelat-karusel-linkedin-s-ai',
  '/ru/blog/prompty-dlya-karuseley-v-instagram',
  '/blog/instagram-carousel-ideas',
  '/privacy-policy',
  '/ru/politika',
  '/politika',
  '/ru/polzovatelskoe-soglashenie',
  '/ru/soglasie-na-obrabotku-personalnyh-dannyh',
  '/ru/ugc-creator-terms',
  '/refund-policy',
  '/terms-of-service',
  '/personal-data-consent',
  '/pricing',
  '/carousel/create',
];

/* ── Find a free port ── */
function getFreePort() {
  return new Promise((resolve, reject) => {
    const srv = createServer();
    srv.listen(0, PREVIEW_HOST, () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
    srv.on('error', reject);
  });
}

function waitForPreviewReady(baseUrl, timeoutMs = PREVIEW_READY_TIMEOUT_MS) {
  const started = Date.now();

  return new Promise((resolve, reject) => {
    const check = () => {
      const req = http.get(baseUrl, (res) => {
        res.resume();
        resolve();
      });

      req.on('error', () => {
        if (Date.now() - started >= timeoutMs) {
          reject(new Error(`Preview server did not respond within ${timeoutMs}ms`));
          return;
        }
        setTimeout(check, 250);
      });

      req.setTimeout(2000, () => {
        req.destroy();
      });
    };

    check();
  });
}

/* ── Start vite preview and wait until it's ready ── */
function startPreviewServer(port) {
  return new Promise((resolve, reject) => {
    const proc = spawn('npx', ['vite', 'preview', '--host', PREVIEW_HOST, '--port', String(port), '--strictPort'], {
      cwd: __dirname,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let settled = false;
    const timeout = setTimeout(() => {
      if (settled) return;
      settled = true;
      proc.kill();
      reject(new Error('Preview server timed out'));
    }, PREVIEW_READY_TIMEOUT_MS);

    const onData = (data) => {
      const text = data.toString();
      if (!settled && (text.includes('Local:') || text.includes(PREVIEW_HOST) || text.includes('localhost:'))) {
        settled = true;
        clearTimeout(timeout);
        resolve(proc);
      }
    };

    proc.stdout.on('data', onData);
    proc.stderr.on('data', onData);
    proc.on('error', (err) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      reject(err);
    });
    proc.on('exit', (code, signal) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      reject(new Error(`Preview server exited before ready (code ${code}, signal ${signal})`));
    });
  });
}

/* ── Write HTML to dist ── */
async function writeHtml(route, html) {
  // Route '/' → dist/index.html
  // Route '/blog' → dist/blog/index.html
  const parts = route === '/' ? [] : route.replace(/^\//, '').split('/');
  const dir = path.join(DIST, ...parts);
  await mkdir(dir, { recursive: true });
  const filePath = path.join(dir, 'index.html');
  await writeFile(filePath, html, 'utf-8');
  return filePath;
}

/* ── Find dynamic markdown articles ── */
async function getDynamicMarkdownRoutes() {
  const articlesDir = path.join(__dirname, 'src', 'content', 'blog', 'articles');
  const dynamicRoutes = [];
  try {
    const files = await readdir(articlesDir);
    for (const file of files) {
      if (!file.endsWith('.md') || file.startsWith('_')) continue;
      
      const content = await readFile(path.join(articlesDir, file), 'utf-8');
      
      // Simple frontmatter parsing
      const isPublished = /^published:\s*true\b/m.test(content);
      const isNoindex = /^noindex:\s*true\b/m.test(content);
      const isPreview = /^preview:\s*true\b/m.test(content);
      
      if (isPublished && !isNoindex) {
        // Extract slug, fallback to filename
        const slugMatch = content.match(/^slug:\s*["']?([^"'\n]+)["']?/m);
        const slug = slugMatch ? slugMatch[1].trim() : file.replace(/\.md$/, '');
        
        // Extract language, fallback to 'en'
        const langMatch = content.match(/^language:\s*["']?([^"'\n]+)["']?/m);
        const language = langMatch ? langMatch[1].trim() : 'en';

        const route = language === 'ru' ? `/ru/blog/${slug}` : `/blog/${slug}`;
        
        // We only add to sitemap if it's actually published and indexable
        const addToSitemap = isPublished && !isNoindex;
        
        dynamicRoutes.push({ route, addToSitemap });
      }
    }
  } catch (err) {
    console.log(`⚠️  Could not read articles dir: ${err.message}`);
  }
  return dynamicRoutes;
}

async function launchBrowser() {
  return puppeteer.launch({
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    protocolTimeout: 120000,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--disable-background-networking',
      '--disable-background-timer-throttling',
      '--disable-renderer-backgrounding',
      '--disable-extensions',
      '--disable-sync',
      '--mute-audio'
    ],
  });
}

async function closeBrowser(browser) {
  if (!browser) return;
  try {
    await browser.close();
  } catch (err) {
    console.log(`⚠️  Could not close browser cleanly: ${err.message}`);
  }
}

async function closePreviewServer(server) {
  if (!server || server.killed) return;
  await new Promise((resolve) => {
    server.once('exit', resolve);
    server.kill();
    setTimeout(resolve, 3000);
  });
}

async function preparePage(page, baseHostname) {
  page.setDefaultNavigationTimeout(NAVIGATION_TIMEOUT_MS);
  page.setDefaultTimeout(NAVIGATION_TIMEOUT_MS);

  await page.setRequestInterception(true);
  page.on('request', (request) => {
    try {
      const requestUrl = new URL(request.url());
      const isLocalRequest = requestUrl.hostname === baseHostname || requestUrl.hostname === 'localhost';

      if (requestUrl.protocol.startsWith('http') && !isLocalRequest) {
        request.abort();
        return;
      }
    } catch {
      // Non-standard URLs such as data: or blob: should continue.
    }

    request.continue();
  });
}

async function prerenderRoute(browser, route, baseUrl) {
  const url = `${baseUrl}${route}`;
  let page = null;

  try {
    page = await browser.newPage();
    await preparePage(page, PREVIEW_HOST);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: NAVIGATION_TIMEOUT_MS });

    await page.waitForFunction(
      () => document.title && document.title !== 'Vite + React',
      { timeout: 10000 }
    ).catch(() => {});

    await page.waitForFunction(
      () => document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
      { timeout: 10000 }
    ).catch(() => {});

    await delay(500);

    await page.evaluate(() => {
      document
        .querySelectorAll('script[src*="googletagmanager.com/gtm.js?id=GTM-W5R5NBH8"]')
        .forEach((script) => script.remove());
    });

    let html = await page.content();

    // Inject meta refresh for specific alias routes to act as a soft 301 for SEO
    if (route === '/carousel-maker') {
      html = html.replace('<head>', '<head>\n    <meta http-equiv="refresh" content="0; url=/ai-carousel-maker">');
    }

    const filePath = await writeHtml(route, html);
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '(no title)';
    const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1] ?? '(no canonical)';

    return { route, ok: true, title, canonical, filePath };
  } finally {
    if (page) {
      await page.close().catch(() => {});
    }
  }
}

/* ── Main ── */
(async () => {
  console.log('🚀  Starting prerender…\n');

  const dynamicRoutes = await getDynamicMarkdownRoutes();
  const routesToPrerender = dynamicRoutes.map(r => r.route);
  const routesToSitemap = dynamicRoutes.filter(r => r.addToSitemap).map(r => r.route);

  if (routesToPrerender.length > 0) {
    console.log(`📚  Found ${routesToPrerender.length} dynamic markdown articles: ${routesToPrerender.join(', ')}`);
    ROUTES.push(...routesToPrerender);
  }

  let server = null;
  let browser = null;
  const results = [];

  try {
    const port = await getFreePort();
    const BASE = `http://${PREVIEW_HOST}:${port}`;

    console.log(`📡  Starting vite preview on ${BASE}…`);
    server = await startPreviewServer(port);
    await waitForPreviewReady(BASE);

    browser = await launchBrowser();

    for (const route of ROUTES) {
      let success = false;
      let lastError = null;

      for (let attempt = 1; attempt <= NAVIGATION_ATTEMPTS; attempt++) {
        try {
          if (!browser || !browser.connected) {
            await closeBrowser(browser);
            browser = await launchBrowser();
          }

          if (attempt > 1) console.log(`  ↻  Retrying ${route} (attempt ${attempt}/${NAVIGATION_ATTEMPTS})...`);
          const result = await prerenderRoute(browser, route, BASE);

          results.push(result);
          console.log(`  ✅  ${route}\n      title: ${result.title}\n      canonical: ${result.canonical}\n      → ${result.filePath}`);
          success = true;
          break;
        } catch (err) {
          lastError = err;
          console.error(`  ⚠️  ${route} attempt ${attempt}/${NAVIGATION_ATTEMPTS} failed: ${err.message}`);

          if (!browser?.connected || /Connection closed|frame was detached|Target closed|Session closed/i.test(err.message)) {
            await closeBrowser(browser);
            browser = await launchBrowser();
          }
        }
      }

      if (!success) {
        results.push({ route, ok: false, error: lastError.message });
        console.error(`  ❌  ${route}: ${lastError.message}`);
      }
    }
  } finally {
    await closeBrowser(browser);
    await closePreviewServer(server);
  }

  console.log('\n─────────────────────────────────────────');
  const ok = results.filter(r => r.ok).length;
  const failList = results.filter(r => !r.ok);
  const fail = failList.length;
  console.log(`✓ ${ok} routes prerendered successfully`);
  
  let exitCode = 0;
  if (fail > 0) {
    console.log(`✗ ${fail} routes failed:`);
    for (const f of failList) {
      console.log(`    - ${f.route}: ${f.error}`);
      if (f.route !== '/') {
        exitCode = 1; // Any failed route except '/' fails the whole build
      }
    }
    if (exitCode === 0) {
      console.log(`⚠️  Build passing: only root route '/' failed (handled by fallback html).`);
    } else {
      console.log(`❌  Build failed due to SEO route failures.`);
    }
  }

  /* ── Append dynamic routes to Sitemap ── */
  try {
    const sitemapPath = path.join(DIST, 'sitemap.xml');
    let sitemap = await readFile(sitemapPath, 'utf-8');
    
    if (routesToSitemap.length > 0 && sitemap.includes('</urlset>')) {
      const today = new Date().toISOString().split('T')[0];
      let newUrls = '';
      
      for (const route of routesToSitemap) {
        // Ensure it's not already in the sitemap manually
        if (!sitemap.includes(`<loc>https://gotoflow.io${route}</loc>`)) {
          newUrls += `
  <url>
    <loc>https://gotoflow.io${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
        }
      }
      
      if (newUrls) {
        sitemap = sitemap.replace('</urlset>', `${newUrls}\n</urlset>`);
        await writeFile(sitemapPath, sitemap, 'utf-8');
        console.log(`\n🗺️  Added ${routesToSitemap.length} dynamic routes to sitemap.xml`);
      }
    }
  } catch (err) {
    console.log(`\n⚠️  Could not update sitemap.xml: ${err.message}`);
  }

  process.exit(exitCode);
})();
