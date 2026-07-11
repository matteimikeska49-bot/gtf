import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { getSeoPagesForPrerender } from '../src/content/seoPages/index.js';

console.log('🔍 Starting Production Dist Sync Check...');

const rootDir = process.cwd();
const committedDistDir = path.join(rootDir, 'dist');
const tmpDistDir = path.join(rootDir, 'dist_tmp');

if (!fs.existsSync(committedDistDir)) {
  console.error('❌ FAIL: committed dist/ directory not found. Please run build first.');
  process.exit(1);
}

// 1. Temporary Build
console.log('⏳ Running temporary production build...');
try {
  execSync('npx vite build --outDir dist_tmp', { stdio: 'pipe' });
  execSync('PRERENDER_DIST_DIR=dist_tmp node prerender.mjs', { stdio: 'pipe' });
} catch (e) {
  console.error('❌ FAIL: Temporary build failed.');
  console.error(e.stderr?.toString() || e.message);
  process.exit(1);
}

const errors = [];
const pages = getSeoPagesForPrerender();

const removeNonDeterministicLines = (html) => {
  return html.replace(/assets\/[^.]+\.[a-z0-9]+\.(js|css|woff2?|png|jpg|svg)/g, 'assets/HASHED.$1')
             .replace(/<script[^>]*><\/script>/g, '') 
             .replace(/vite-plugin-pwa[^"]*/g, '')
             .replace(/style="[^"]*"/g, 'style=""')
             .replace(/\s+/g, ' '); 
};

// 2. Compare temporary build HTML with committed HTML
for (const page of pages) {
  const relativeHtmlPath = path.join(page.path.replace(/^\//, ''), 'index.html');
  const committedPath = path.join(committedDistDir, relativeHtmlPath);
  const tmpPath = path.join(tmpDistDir, relativeHtmlPath);

  if (!fs.existsSync(committedPath)) {
    errors.push(`Missing production HTML in committed dist for ${page.path}`);
    continue;
  }
  if (!fs.existsSync(tmpPath)) {
    errors.push(`Missing production HTML in temporary build for ${page.path}`);
    continue;
  }

  const committedHtml = fs.readFileSync(committedPath, 'utf-8');
  const tmpHtml = fs.readFileSync(tmpPath, 'utf-8');

  if (!committedHtml.includes('<link rel="canonical"')) errors.push(`Missing canonical in ${page.path}`);
  if (!committedHtml.includes('<html lang="ru"')) errors.push(`Missing lang="ru" in ${page.path}`);
  if (!committedHtml.includes('index, follow') && page.state === 'indexable_approved') {
      errors.push(`Missing index, follow in ${page.path}`);
  }

  const normCommitted = removeNonDeterministicLines(committedHtml);
  const normTmp = removeNonDeterministicLines(tmpHtml);

  if (normCommitted !== normTmp) {
    fs.writeFileSync('dist_committed_debug.html', normCommitted);
    fs.writeFileSync('dist_tmp_debug.html', normTmp);
    errors.push(`Semantic HTML mismatch for ${page.path}. Committed dist is stale. Please run 'npm run build' and commit the result. Saved debug files.`);
  }
}

// 3. Compare sitemap
const committedSitemapPath = path.join(committedDistDir, 'sitemap.xml');
const tmpSitemapPath = path.join(tmpDistDir, 'sitemap.xml');

if (!fs.existsSync(committedSitemapPath)) {
  errors.push(`Missing sitemap.xml in committed dist`);
} else if (!fs.existsSync(tmpSitemapPath)) {
  errors.push(`Missing sitemap.xml in temporary dist`);
} else {
  let committedSitemap = fs.readFileSync(committedSitemapPath, 'utf-8');
  let tmpSitemap = fs.readFileSync(tmpSitemapPath, 'utf-8');
  
  const removeDates = (sitemap) => sitemap.replace(/<lastmod>.*<\/lastmod>/g, '<lastmod>DATE</lastmod>');
  
  committedSitemap = removeDates(committedSitemap);
  tmpSitemap = removeDates(tmpSitemap);

  if (committedSitemap !== tmpSitemap) {
    errors.push(`Sitemap mismatch. Committed sitemap is stale.`);
  }

  for (const page of pages) {
    if (page.state === 'indexable_approved') {
      if (!committedSitemap.includes(`<loc>https://gotoflow.io${page.path}</loc>`)) {
        errors.push(`Approved page missing from sitemap: ${page.path}`);
      }
    }
    if (page.state === 'noindex_review' && committedSitemap.includes(`<loc>https://gotoflow.io${page.path}</loc>`)) {
      errors.push(`Noindex page leaked into sitemap: ${page.path}`);
    }
  }
}

if (errors.length === 0) {
  try {
    fs.rmSync(tmpDistDir, { recursive: true, force: true });
  } catch (e) {}
}

if (errors.length > 0) {
  console.error('\n❌ FAIL: Dist Sync Check failed with the following errors:');
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
}

console.log('✅ PASS: Dist Sync Check passed.');
