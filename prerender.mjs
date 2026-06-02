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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, 'dist');

/* ── Routes to prerender ── */
const ROUTES = [
  '/',
  '/ru',
  '/ai-carousel-maker',
  '/ru/ai-generator-karuselej',
  '/ai-content-generator',
  '/ru/generator-kontenta',
  '/ai-instagram-post-generator',
  '/ai-post-maker',
  '/ru/generator-postov-instagram',
  '/linkedin-carousel-maker',
  '/ru/generator-karuselej-linkedin',
  '/blog',
  '/ru/blog',
  '/blog/linkedin-carousel-ideas',
  '/blog/best-ai-carousel-generators',
  '/blog/how-to-make-linkedin-carousel-with-ai',
  '/blog/ai-instagram-carousel-generator',
  '/blog/test-seo-template-v2',
  '/ru/blog/test-ru-seo-template',
  '/ru/blog/idei-karuselej-linkedin',
  '/ru/blog/luchshie-ai-generatory-karuselej',
  '/ru/blog/kak-sdelat-karusel-linkedin-s-ai',
  '/ru/blog/prompty-dlya-karuseley-v-instagram',
  '/blog/how-to-make-an-instagram-carousel-with-ai',
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
    srv.listen(0, () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
    srv.on('error', reject);
  });
}

/* ── Start vite preview and wait until it's ready ── */
function startPreviewServer(port) {
  return new Promise((resolve, reject) => {
    const proc = spawn('npx', ['vite', 'preview', '--port', String(port), '--strictPort'], {
      cwd: __dirname,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    const timeout = setTimeout(() => reject(new Error('Preview server timed out')), 30000);

    const onData = (data) => {
      const text = data.toString();
      if (text.includes('Local:') || text.includes('localhost:')) {
        clearTimeout(timeout);
        // Give the server 300ms to fully bind
        setTimeout(() => resolve(proc), 300);
      }
    };

    proc.stdout.on('data', onData);
    proc.stderr.on('data', onData);
    proc.on('error', reject);
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
      
      if (isPublished && !isNoindex) {
        // Extract slug, fallback to filename
        const slugMatch = content.match(/^slug:\s*["']?([^"'\n]+)["']?/m);
        const slug = slugMatch ? slugMatch[1].trim() : file.replace(/\.md$/, '');
        
        // Extract language, fallback to 'en'
        const langMatch = content.match(/^language:\s*["']?([^"'\n]+)["']?/m);
        const language = langMatch ? langMatch[1].trim() : 'en';

        const route = language === 'ru' ? `/ru/blog/${slug}` : `/blog/${slug}`;
        dynamicRoutes.push(route);
      }
    }
  } catch (err) {
    console.log(`⚠️  Could not read articles dir: ${err.message}`);
  }
  return dynamicRoutes;
}

/* ── Main ── */
(async () => {
  console.log('🚀  Starting prerender…\n');

  const dynamicRoutes = await getDynamicMarkdownRoutes();
  if (dynamicRoutes.length > 0) {
    console.log(`📚  Found ${dynamicRoutes.length} dynamic markdown articles: ${dynamicRoutes.join(', ')}`);
    ROUTES.push(...dynamicRoutes);
  }

  const port = await getFreePort();
  console.log(`📡  Starting vite preview on port ${port}…`);
  const server = await startPreviewServer(port);
  const BASE = `http://localhost:${port}`;

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const results = [];

  for (const route of ROUTES) {
    const url = `${BASE}${route}`;
    try {
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

      // Wait for the React SEO useEffect to fire and inject meta tags
      // We wait for <title> to not be the generic fallback
      await page.waitForFunction(
        () => document.title && document.title !== 'Vite + React',
        { timeout: 10000 }
      ).catch(() => {}); // don't crash if title stays generic

      // Additional short wait for hreflang / canonical injection
      await new Promise(r => setTimeout(r, 500));

      const html = await page.content();
      await page.close();

      const filePath = await writeHtml(route, html);
      const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '(no title)';
      const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1] ?? '(no canonical)';

      results.push({ route, ok: true, title, canonical, filePath });
      console.log(`  ✅  ${route}\n      title: ${title}\n      canonical: ${canonical}\n      → ${filePath}`);
    } catch (err) {
      results.push({ route, ok: false, error: err.message });
      console.error(`  ❌  ${route}: ${err.message}`);
    }
  }

  await browser.close();
  server.kill();

  console.log('\n─────────────────────────────────────────');
  const ok = results.filter(r => r.ok).length;
  const fail = results.filter(r => !r.ok).length;
  console.log(`✓ ${ok} routes prerendered successfully`);
  if (fail) console.log(`✗ ${fail} routes failed`);

  /* ── Append dynamic routes to Sitemap ── */
  try {
    const sitemapPath = path.join(DIST, 'sitemap.xml');
    let sitemap = await readFile(sitemapPath, 'utf-8');
    
    if (dynamicRoutes.length > 0 && sitemap.includes('</urlset>')) {
      const today = new Date().toISOString().split('T')[0];
      let newUrls = '';
      
      for (const route of dynamicRoutes) {
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
        console.log(`\n🗺️  Added ${dynamicRoutes.length} dynamic routes to sitemap.xml`);
      }
    }
  } catch (err) {
    console.log(`\n⚠️  Could not update sitemap.xml: ${err.message}`);
  }

  process.exit(fail > 0 ? 1 : 0);
})();
