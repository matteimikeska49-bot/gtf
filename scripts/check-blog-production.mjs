import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import { PRODUCTION_ARTIFACT_MARKERS, findRawMarkdownTextMarkers, findVisiblePlatformFootnoteMarkers, hasStarredHref } from './blog-template-guardrails.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BATCH_STATUS_PATH = path.join(__dirname, '../src/content/blog/batch-status.json');
const BASE_URL = 'https://gotoflow.io';

console.log('🚀 Starting production verification check...\n');
console.log('NOTE: This script should ONLY be run AFTER deployment to production.\n');

let hasP0Error = false;
let conflicts = [];

// Helper for HTTP GET
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

async function runChecks() {
  let batchData = [];
  try {
    const content = fs.readFileSync(BATCH_STATUS_PATH, 'utf-8');
    batchData = JSON.parse(content);
  } catch (e) {
    console.error(`❌ Failed to read batch-status.json: ${e.message}`);
    process.exit(1);
  }

  // 1. Check build.json
  console.log('Checking /build.json...');
  const buildRes = await fetchUrl(`${BASE_URL}/build.json`);
  if (buildRes.error) {
    conflicts.push(`NETWORK ERROR fetching build.json: ${buildRes.error.message}`);
    hasP0Error = true;
  } else if (buildRes.status !== 200) {
    conflicts.push(`Production build.json is missing or returned ${buildRes.status}`);
    hasP0Error = true;
  } else {
    try {
      const buildInfo = JSON.parse(buildRes.data);
      if (buildInfo.commit === 'unknown') {
        console.log('  ⚠️ Warning: build.json reports commit: "unknown". Deploy likely succeeded but git hash is missing in Docker build.');
      } else {
        console.log(`  ✅ build.json is accessible. Commit: ${buildInfo.commit}`);
      }
    } catch (e) {
      console.log('  ⚠️ Warning: Could not parse build.json');
    }
  }

  // Fetch sitemap and blog indexes
  console.log('Fetching sitemaps and blog indexes...');
  const sitemapRes = await fetchUrl(`${BASE_URL}/sitemap.xml`);
  if (sitemapRes.error) {
    conflicts.push(`NETWORK ERROR fetching sitemap: ${sitemapRes.error.message}`);
    hasP0Error = true;
  }
  const sitemapData = sitemapRes.data || '';
  
  const enBlogRes = await fetchUrl(`${BASE_URL}/blog`);
  if (enBlogRes.error) {
    conflicts.push(`NETWORK ERROR fetching EN blog index: ${enBlogRes.error.message}`);
    hasP0Error = true;
  }
  const enBlogData = enBlogRes.data || '';
  
  const ruBlogRes = await fetchUrl(`${BASE_URL}/ru/blog`);
  if (ruBlogRes.error) {
    conflicts.push(`NETWORK ERROR fetching RU blog index: ${ruBlogRes.error.message}`);
    hasP0Error = true;
  }
  const ruBlogData = ruBlogRes.data || '';

  // 2. Check Articles
  console.log('Checking articles...');
  const articlesToCheck = batchData.filter(a => ['published', 'ready_to_publish', 'draft', 'draft_preview'].includes(a.status) || (a.published === false && a.noindex === true && a.preview === true));

  for (const article of articlesToCheck) {
    const route = article.language === 'ru' ? `/ru/blog/${article.slug}` : `/blog/${article.slug}`;
    const fullUrl = `${BASE_URL}${route}`;
    console.log(`  Checking ${fullUrl} [Status: ${article.status}, Preview: ${article.preview}]`);
    
    const res = await fetchUrl(fullUrl);
    
    if (res.error) {
      conflicts.push(`NETWORK ERROR for ${fullUrl}: ${res.error.message}`);
      hasP0Error = true;
      continue;
    }

    const html = res.data;
    
    // Check Status Code
    if (article.status === 'published' || article.preview === true) {
      if (res.status !== 200) {
        conflicts.push(`[SEO CONTENT ERROR] Article ${fullUrl} should be accessible (status 200) but returned ${res.status}`);
        hasP0Error = true;
      }
    } else {
      // Drafts without preview:true should not be deployed or return 404
      if (res.status === 200) {
        conflicts.push(`[SEO CONTENT ERROR] Article ${fullUrl} is a draft without preview, but it returned 200 on production.`);
        hasP0Error = true;
      }
    }

    // Check Noindex
    if (res.status === 200) {
      const metaRobotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*>/i);
      const hasNoindexMeta = metaRobotsMatch ? /content=["'][^"']*noindex[^"']*["']/i.test(metaRobotsMatch[0]) : false;
      const robotsHeader = res.headers ? (res.headers['x-robots-tag'] || '') : '';
      const hasNoindexHeader = robotsHeader.toLowerCase().includes('noindex');
      const hasNoindexTag = hasNoindexMeta || hasNoindexHeader;
      
      if (article.status === 'published' && hasNoindexTag) {
         conflicts.push(`[SEO P0 ERROR] Published article ${fullUrl} has a noindex tag in production.`);
         hasP0Error = true;
      }
      
      if (article.status !== 'published' && article.preview && !hasNoindexTag) {
         conflicts.push(`[SEO P0 ERROR] Preview article ${fullUrl} is MISSING a noindex tag in production.`);
         hasP0Error = true;
      }

      for (const marker of PRODUCTION_ARTIFACT_MARKERS) {
        if (html.includes(marker)) {
          conflicts.push(`[SEO P0 ERROR] Production canonical HTML for ${fullUrl} contains raw marker/artifact: ${marker}`);
          hasP0Error = true;
        }
      }

      if (hasStarredHref(html)) {
        conflicts.push(`[SEO P0 ERROR] Production canonical HTML for ${fullUrl} contains href with a literal *.`);
        hasP0Error = true;
      }

      const visiblePlatformMarkers = findVisiblePlatformFootnoteMarkers(html, { html: true });
      for (const finding of visiblePlatformMarkers) {
        conflicts.push(`[SEO P0 ERROR] Production canonical HTML for ${fullUrl} contains visible platform footnote marker "${finding.marker}".`);
        hasP0Error = true;
      }

      const rawMarkdownMarkers = findRawMarkdownTextMarkers(html, { html: true, includeBold: true });
      for (const finding of rawMarkdownMarkers) {
        conflicts.push(`[SEO P0 ERROR] Production canonical HTML for ${fullUrl} contains raw markdown marker "${finding.marker}".`);
        hasP0Error = true;
      }
    }
    
    // Check Sitemap presence
    const inSitemap = sitemapData.includes(route);
    if (article.status === 'published' && !inSitemap) {
      conflicts.push(`[SEO CONTENT ERROR] Published article ${fullUrl} is MISSING from sitemap.xml`);
      hasP0Error = true;
    }
    if (article.status !== 'published' && inSitemap) {
      conflicts.push(`[SEO P0 ERROR] Draft article ${fullUrl} is IN sitemap.xml (SEO Leak)`);
      hasP0Error = true;
    }
    
    // Check Blog Index presence
    const blogHtml = article.language === 'ru' ? ruBlogData : enBlogData;
    // VERY simple check: Does the route appear as a link in the blog index?
    const inBlogIndex = blogHtml.includes(`href="${route}"`);
    
    if (article.status === 'published' && !inBlogIndex) {
      conflicts.push(`[SEO CONTENT ERROR] Published article ${fullUrl} not found in first page of /${article.language === 'ru' ? 'ru/blog' : 'blog'}`);
      hasP0Error = true;
    }
    if (article.status !== 'published' && inBlogIndex) {
       conflicts.push(`[SEO P0 ERROR] Draft article ${fullUrl} is linked in the public blog index!`);
       hasP0Error = true;
    }
  }

  if (conflicts.length > 0) {
    console.log('\n🚨 P0 PRODUCTION CONFLICTS FOUND:');
    conflicts.forEach(c => console.log(`  - ${c}`));
  } else {
    console.log('\n✅ No P0 production errors found.');
  }

  if (hasP0Error) {
    console.error('\n❌ FAIL: Production verification failed.');
    process.exit(1);
  } else {
    console.log('\n✅ PASS: Production verification passed.');
    process.exit(0);
  }
}

runChecks();
