import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const BATCH_STATUS_PATH = path.join(ROOT_DIR, 'src/content/blog/batch-status.json');
const ARTICLES_DIR = path.join(ROOT_DIR, 'src/content/blog/articles');
const BASE_URL = 'https://gotoflow.io';

console.log('🚀 Starting LIVE Verification check...\n');

let hasP0Error = false;
let warnings = [];
let conflicts = [];

function fetchUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, data, error: null }));
    });
    req.on('error', (err) => resolve({ status: null, data: null, error: err }));
  });
}

function checkRawArtifacts(html) {
  const artifacts = [];
  const cleanHtml = html.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, '');
  if (cleanHtml.includes('undefined')) artifacts.push('undefined');
  if (cleanHtml.includes('null')) artifacts.push('null');
  if (cleanHtml.includes('[object Object]')) artifacts.push('[object Object]');
  if (cleanHtml.includes('```json')) artifacts.push('```json');
  return artifacts;
}

async function runChecks() {
  let batchData = [];
  try {
    batchData = JSON.parse(fs.readFileSync(BATCH_STATUS_PATH, 'utf-8'));
  } catch (e) {
    console.error(`❌ Failed to read batch-status.json: ${e.message}`);
    process.exit(1);
  }

  console.log('Fetching sitemaps and blog indexes...');
  const sitemapRes = await fetchUrl(`${BASE_URL}/sitemap.xml`);
  if (sitemapRes.error) {
    conflicts.push(`NETWORK ERROR fetching sitemap: ${sitemapRes.error.message}`);
    hasP0Error = true;
  }
  const sitemapData = sitemapRes.data || '';
  
  const enBlogRes = await fetchUrl(`${BASE_URL}/blog`);
  const enBlogData = enBlogRes.data || '';
  const ruBlogRes = await fetchUrl(`${BASE_URL}/ru/blog`);
  const ruBlogData = ruBlogRes.data || '';

  const articlesToCheck = batchData.filter(a => a.published === true || ['draft', 'draft_preview'].includes(a.status) || (a.published === false && a.noindex === true));

  let verifiedCount = 0;
  let skippedDraftCount = 0;

  for (const article of articlesToCheck) {
    const isPublished = article.published === true && ['published', 'live_verified'].includes(article.status);
    const route = article.language === 'ru' ? `/ru/blog/${article.slug}` : `/blog/${article.slug}`;
    const fullUrl = `${BASE_URL}${route}`;

    const inSitemap = sitemapData.includes(route);
    const blogHtml = article.language === 'ru' ? ruBlogData : enBlogData;
    const inBlogIndex = blogHtml.includes(`href="${route}"`);

    if (!isPublished) {
      // Draft/D53 rules
      if (inSitemap) {
        conflicts.push(`[LIVE P0 ERROR] Draft article ${fullUrl} is IN sitemap.xml!`);
        hasP0Error = true;
      }
      if (inBlogIndex) {
        conflicts.push(`[LIVE P0 ERROR] Draft article ${fullUrl} is IN the public blog index!`);
        hasP0Error = true;
      }
      skippedDraftCount++;
      continue;
    }

    console.log(`Checking LIVE URL: ${fullUrl}`);
    const res = await fetchUrl(fullUrl);
    
    if (res.error) {
      conflicts.push(`[LIVE P0 ERROR] Network error for ${fullUrl}: ${res.error.message}`);
      hasP0Error = true;
      continue;
    }

    if (res.status !== 200) {
      conflicts.push(`[LIVE P0 ERROR] Published article ${fullUrl} returned HTTP ${res.status}`);
      hasP0Error = true;
      continue;
    }

    const html = res.data;

    // Canonical
    const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i);
    const liveCanonical = canonicalMatch ? canonicalMatch[1] : null;
    if (!liveCanonical || !liveCanonical.includes(route)) {
      conflicts.push(`[LIVE P0 ERROR] Missing or incorrect canonical tag on ${fullUrl}`);
      hasP0Error = true;
    }

    // Noindex
    const metaRobotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*>/i);
    const hasNoindexMeta = metaRobotsMatch ? /content=["'][^"']*noindex[^"']*["']/i.test(metaRobotsMatch[0]) : false;
    const robotsHeader = res.headers ? (res.headers['x-robots-tag'] || '') : '';
    const hasNoindexHeader = robotsHeader.toLowerCase().includes('noindex');
    if (hasNoindexMeta || hasNoindexHeader) {
      conflicts.push(`[LIVE P0 ERROR] Published article ${fullUrl} has a noindex tag in production!`);
      hasP0Error = true;
    }

    // Title/Meta
    const hasTitle = /<title>[^<]+<\/title>/i.test(html);
    const hasMetaDesc = /<meta[^>]*name=["']description["'][^>]*>/i.test(html);
    if (!hasTitle || !hasMetaDesc) {
      conflicts.push(`[LIVE P0 ERROR] Missing title or meta description on ${fullUrl}`);
      hasP0Error = true;
    }

    // Schema
    const hasArticleSchema = html.includes('schema.org') && (html.includes('"@type":"Article"') || html.includes('"@type": "Article"') || html.includes('"@type":"BlogPosting"') || html.includes('"@type": "BlogPosting"'));
    if (!hasArticleSchema) {
      conflicts.push(`[LIVE P0 ERROR] Missing Article/BlogPosting schema on ${fullUrl}`);
      hasP0Error = true;
    }

    // Read local markdown for FAQ check
    let markdownHasFaq = false;
    try {
      const filePath = path.join(ARTICLES_DIR, `${article.slug}.md`);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        if (content.match(/## FAQ/i) || content.match(/## Часто задаваемые вопросы/i)) {
          markdownHasFaq = true;
        }
      }
    } catch (e) {
      warnings.push(`Could not read local markdown for ${article.slug} to check FAQ presence`);
    }

    if (markdownHasFaq) {
      const hasFaqSchema = html.includes('"@type":"FAQPage"') || html.includes('"@type": "FAQPage"');
      if (!hasFaqSchema) {
        conflicts.push(`[LIVE P0 ERROR] Missing FAQ schema on ${fullUrl} despite having FAQ section`);
        hasP0Error = true;
      }
    }

    // Sitemap/Index
    if (!inSitemap) {
      conflicts.push(`[LIVE P0 ERROR] Published article ${fullUrl} missing from sitemap`);
      hasP0Error = true;
    }
    if (!inBlogIndex) {
      conflicts.push(`[LIVE P0 ERROR] Published article ${fullUrl} missing from blog index`);
      hasP0Error = true;
    }

    // Artifacts
    const rawArtifacts = checkRawArtifacts(html);
    // Ignore 'null' string if it occurs inside JSON LD scripts because that is valid JSON syntax
    const artifactsFiltered = rawArtifacts.filter(a => !(a === 'null' && (html.split('null').length - 1 <= html.split('<script type="application/ld+json">').length)));
    
    // Stricter checking to avoid false positives with JSON syntax, we already check this in pre-publish, but for live we just do a quick scan
    // So let's refine artifacts
    if (artifactsFiltered.includes('undefined') || artifactsFiltered.includes('[object Object]') || artifactsFiltered.includes('```json')) {
      conflicts.push(`[LIVE P0 ERROR] Raw artifact found on ${fullUrl}: ${artifactsFiltered.join(', ')}`);
      hasP0Error = true;
    }

    verifiedCount++;
  }

  console.log(`\nVerified URLs: ${verifiedCount}`);
  console.log(`Skipped drafts: ${skippedDraftCount}`);

  if (warnings.length > 0) {
    console.log('\n⚠️ Warnings:');
    warnings.forEach(w => console.log(`  - ${w}`));
  }

  if (conflicts.length > 0) {
    console.log('\n🚨 LIVE VERIFICATION ERRORS FOUND:');
    conflicts.forEach(c => console.log(`  - ${c}`));
    process.exit(1);
  } else {
    console.log('\n✅ All live verifications passed.');
    process.exit(0);
  }
}

runChecks();
