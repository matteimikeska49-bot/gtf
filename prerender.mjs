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
import { existsSync } from 'fs';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import { readdir, readFile } from 'fs/promises';
import http from 'http';
import { getSeoPagesForPrerender, getSeoPagesForSitemap } from './src/content/seoPages/index.js';
import { getRouteAliasTarget, getRouteCanonicalPath } from './src/routes/routeAliases.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = process.env.PRERENDER_DIST_DIR
  ? path.resolve(process.env.PRERENDER_DIST_DIR)
  : path.join(__dirname, 'dist');
const PREVIEW_HOST = '127.0.0.1';
const PUBLIC_ORIGIN = 'https://gotoflow.io';
const NAVIGATION_ATTEMPTS = 3;
const NAVIGATION_TIMEOUT_MS = 60000;
const PREVIEW_READY_TIMEOUT_MS = 30000;

const ROOT_FALLBACK_TITLE = 'AI Content Generator for Social Media — Create Posts, Carousels & Reels Fast | GoToFlow';

const normalizeRoutePath = (routePath) => {
  if (!routePath || routePath === '/') return '/';
  return `/${String(routePath).replace(/^\/+/, '').replace(/\/+$/, '')}`;
};

const canonicalUrlForPath = (routePath) => {
  const normalized = normalizeRoutePath(routePath);
  return `${PUBLIC_ORIGIN}${normalized === '/' ? '/' : normalized}`;
};

const classifyRoute = (route, seoPageByPath) => {
  const normalizedRoute = normalizeRoutePath(route);
  const seoPage = seoPageByPath.get(normalizedRoute);

  if (seoPage) {
    return {
      type: 'seo',
      route: normalizedRoute,
      expectedPath: normalizedRoute,
      expectedCanonical: canonicalUrlForPath(seoPage.path),
      expectedTitle: seoPage.title,
      expectedH1: seoPage.h1,
      expectedRobots: seoPage.noindex === true ? 'noindex, nofollow' : 'index, follow',
      page: seoPage,
    };
  }

  const aliasTarget = getRouteAliasTarget(normalizedRoute);
  if (aliasTarget) {
    return {
      type: 'alias',
      route: normalizedRoute,
      expectedPath: normalizeRoutePath(aliasTarget),
      expectedCanonical: canonicalUrlForPath(getRouteCanonicalPath(normalizedRoute)),
    };
  }

  const canonicalPath = getRouteCanonicalPath(normalizedRoute);
  const isStaticContentRoute = (
    normalizedRoute === '/' ||
    normalizedRoute === '/ru' ||
    normalizedRoute === '/blog' ||
    normalizedRoute === '/ru/blog' ||
    normalizedRoute.startsWith('/blog/') ||
    normalizedRoute.startsWith('/ru/blog/') ||
    [
      '/privacy-policy',
      '/ru/politika',
      '/refund-policy',
      '/terms-of-service',
      '/personal-data-consent',
      '/ru/polzovatelskoe-soglashenie',
      '/ru/soglasie-na-obrabotku-personalnyh-dannyh',
      '/ru/ugc-creator-terms',
    ].includes(normalizedRoute)
  );

  return {
    type: isStaticContentRoute ? 'static' : 'application',
    route: normalizedRoute,
    expectedPath: normalizedRoute,
    expectedCanonical: canonicalUrlForPath(canonicalPath),
  };
};

const getBrowserRouteState = () => {
  const root = document.getElementById('root');
  const rootText = root?.textContent?.replace(/\s+/g, ' ').trim() || '';
  const h1Texts = [...document.querySelectorAll('h1')]
    .map((item) => item.textContent.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
  const robots = document.querySelector('meta[name="robots"]')?.getAttribute('content') || '';
  const title = document.title || '';
  const pathname = window.location.pathname || '/';
  const notFound = /not found|404|страница не найдена/i.test(rootText);

  return {
    pathname,
    title,
    canonical,
    robots,
    h1Texts,
    h1Count: h1Texts.length,
    htmlLang: document.documentElement.getAttribute('lang') || '',
    hasRootContent: Boolean(root && rootText.length > 0),
    notFound,
  };
};

const getReadinessErrors = (state, contract) => {
  const errors = [];

  if (!state.hasRootContent) errors.push('React root is empty');
  if (state.notFound) errors.push('rendered Not Found content');
  if (!state.title || state.title === 'Vite + React') errors.push(`title is not ready (${state.title || 'missing'})`);
  if (contract.route !== '/' && state.title === ROOT_FALLBACK_TITLE && state.canonical === canonicalUrlForPath('/')) {
    errors.push('rendered root shell instead of target route');
  }
  if (state.canonical !== contract.expectedCanonical) {
    errors.push(`canonical mismatch: expected ${contract.expectedCanonical}, got ${state.canonical || 'missing'}`);
  }

  if (contract.type === 'alias') {
    if (normalizeRoutePath(state.pathname) !== contract.expectedPath) {
      errors.push(`alias did not navigate: expected path ${contract.expectedPath}, got ${state.pathname || 'missing'}`);
    }
    return errors;
  }

  if (normalizeRoutePath(state.pathname) !== contract.expectedPath) {
    errors.push(`route path mismatch: expected ${contract.expectedPath}, got ${state.pathname || 'missing'}`);
  }

  if (contract.type === 'seo') {
    if (state.h1Count !== 1) errors.push(`expected exactly one H1, got ${state.h1Count}`);
    if (state.h1Texts[0] !== contract.expectedH1) {
      errors.push(`H1 mismatch: expected "${contract.expectedH1}", got "${state.h1Texts[0] || ''}"`);
    }
    if (state.title !== contract.expectedTitle) {
      errors.push(`title mismatch: expected "${contract.expectedTitle}", got "${state.title}"`);
    }
    if (contract.page.language && state.htmlLang !== contract.page.language) {
      errors.push(`html lang mismatch: expected ${contract.page.language}, got ${state.htmlLang || 'missing'}`);
    }
    if (contract.page.noindex === true) {
      if (!/noindex/i.test(state.robots) || !/nofollow/i.test(state.robots)) {
        errors.push(`robots mismatch: expected noindex, nofollow, got "${state.robots || 'missing'}"`);
      }
    } else if (!/index,\s*follow/i.test(state.robots) || /noindex/i.test(state.robots)) {
      errors.push(`robots mismatch: expected index, follow, got "${state.robots || 'missing'}"`);
    }
  }

  return errors;
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const waitForRouteReady = async (page, contract, timeoutMs = 15000) => {
  const started = Date.now();
  let lastState = null;
  let lastErrors = [];

  while (Date.now() - started < timeoutMs) {
    lastState = await page.evaluate(getBrowserRouteState).catch((error) => ({
      evaluateError: error.message,
      hasRootContent: false,
      h1Texts: [],
      h1Count: 0,
    }));
    lastErrors = lastState.evaluateError
      ? [`could not inspect route: ${lastState.evaluateError}`]
      : getReadinessErrors(lastState, contract);

    if (lastErrors.length === 0) {
      return lastState;
    }

    await wait(250);
  }

  throw new Error(
    [
      `Prerender ready condition failed for ${contract.route} (${contract.type})`,
      ...lastErrors,
      `state=${JSON.stringify(lastState)}`,
    ].join('; ')
  );
};

/* ── Routes to prerender ── */
const ROUTES = [
  '/',
  '/ru',
  '/ai-carousel-maker',
  '/carousel-maker',
  '/ru/ii-generator-karuseley',
  '/ai-content-generator',
  '/ru/generator-kontenta',
  '/ai-instagram-post-generator',
  '/instagram-carousel-maker',
  '/ai-post-maker',
  '/ru/generator-postov-instagram',
  '/ru/generator-karuselej-instagram',
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
    const proc = spawn('npx', ['vite', 'preview', '--outDir', DIST, '--host', PREVIEW_HOST, '--port', String(port), '--strictPort'], {
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
  const macChromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const chromiumPath = process.env.PUPPETEER_EXECUTABLE_PATH ||
    (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined) ||
    (existsSync(macChromePath) ? macChromePath : undefined);

  return puppeteer.launch({
    headless: 'new',
    executablePath: chromiumPath,
    protocolTimeout: 120000,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--disable-dev-tools',
      '--no-first-run',
      '--no-zygote',
      '--disable-background-networking',
      '--disable-background-timer-throttling',
      '--disable-renderer-backgrounding',
      '--disable-default-apps',
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

async function prerenderRoute(browser, route, baseUrl, seoPageByPath) {
  const url = `${baseUrl}${route}`;
  let page = null;
  const contract = classifyRoute(route, seoPageByPath);

  try {
    page = await browser.newPage();
    await page.evaluateOnNewDocument((currentRoute) => {
      window.__GTF_PRERENDER_ROUTE = currentRoute;
    }, route);
    await preparePage(page, PREVIEW_HOST);

    await page.goto(url, { waitUntil: 'networkidle2', timeout: NAVIGATION_TIMEOUT_MS });
    await waitForRouteReady(page, contract);

    await page.evaluate(() => {
      document
        .querySelectorAll('script[src*="googletagmanager.com/gtm.js?id=GTM-W5R5NBH8"]')
        .forEach((script) => script.remove());
    });

    let html = await page.content();

    const aliasTarget = getRouteAliasTarget(contract.route);
    if (aliasTarget) {
      html = html.replace('<head>', `<head>\n    <meta http-equiv="refresh" content="0; url=${aliasTarget}">`);
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
  const seoPagesToPrerender = getSeoPagesForPrerender();
  const seoPagesToSitemap = getSeoPagesForSitemap();
  const seoRoutesToPrerender = seoPagesToPrerender.map((page) => page.path);
  const seoPageByPath = new Map(seoPagesToPrerender.map((page) => [page.path, page]));

  if (routesToPrerender.length > 0) {
    console.log(`📚  Found ${routesToPrerender.length} dynamic markdown articles: ${routesToPrerender.join(', ')}`);
    ROUTES.push(...routesToPrerender);
  }

  if (seoRoutesToPrerender.length > 0) {
    console.log(`🧭  Found ${seoRoutesToPrerender.length} routable SEO pages: ${seoRoutesToPrerender.join(', ')}`);
    ROUTES.push(...seoRoutesToPrerender);
  }

  const uniqueRoutes = [...new Set(ROUTES)];

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

    for (const route of uniqueRoutes) {
      let success = false;
      let lastError = null;

      for (let attempt = 1; attempt <= NAVIGATION_ATTEMPTS; attempt++) {
        try {
          if (!browser || !browser.connected) {
            await closeBrowser(browser);
            browser = await launchBrowser();
          }

          if (attempt > 1) console.log(`  ↻  Retrying ${route} (attempt ${attempt}/${NAVIGATION_ATTEMPTS})...`);
          const result = await prerenderRoute(browser, route, BASE, seoPageByPath);

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
    
    if ((routesToSitemap.length > 0 || seoPagesToSitemap.length > 0) && sitemap.includes('</urlset>')) {
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

      for (const page of seoPagesToSitemap) {
        if (!sitemap.includes(`<loc>https://gotoflow.io${page.path}</loc>`)) {
          const lastmod = page.lastUpdated || today;
          newUrls += `
  <url>
    <loc>https://gotoflow.io${page.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${page.priority || 0.6}</priority>
  </url>`;
        }
      }
      
      if (newUrls) {
        sitemap = sitemap.replace('</urlset>', `${newUrls}\n</urlset>`);
        await writeFile(sitemapPath, sitemap, 'utf-8');
        console.log(`\n🗺️  Added ${routesToSitemap.length + seoPagesToSitemap.length} dynamic routes to sitemap.xml`);
      }
    }
  } catch (err) {
    console.log(`\n⚠️  Could not update sitemap.xml: ${err.message}`);
  }

  process.exit(exitCode);
})();
