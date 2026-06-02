import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

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
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', (err) => resolve({ status: 500, data: err.message }));
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
  if (buildRes.status !== 200) {
    conflicts.push(`Production build.json is missing or returned ${buildRes.status}`);
    hasP0Error = true;
  } else {
    console.log('  ✅ build.json is accessible.');
  }

  // Fetch sitemap and blog indexes
  console.log('Fetching sitemaps and blog indexes...');
  const sitemapRes = await fetchUrl(`${BASE_URL}/sitemap.xml`);
  const sitemapData = sitemapRes.data;
  
  const enBlogRes = await fetchUrl(`${BASE_URL}/blog`);
  const enBlogData = enBlogRes.data;
  
  const ruBlogRes = await fetchUrl(`${BASE_URL}/ru/blog`);
  const ruBlogData = ruBlogRes.data;

  // 2. Check Articles
  console.log('Checking articles...');
  const articlesToCheck = batchData.filter(a => ['published', 'ready_to_publish', 'draft'].includes(a.status));

  for (const article of articlesToCheck) {
    const route = article.language === 'ru' ? `/ru/blog/${article.slug}` : `/blog/${article.slug}`;
    const fullUrl = `${BASE_URL}${route}`;
    console.log(`  Checking ${fullUrl} [Status: ${article.status}, Preview: ${article.preview}]`);
    
    const res = await fetchUrl(fullUrl);
    const html = res.data;
    
    // Check Status Code
    if (article.status === 'published' || article.preview === true) {
      if (res.status !== 200) {
        conflicts.push(`Article ${route} should be accessible (status 200) but returned ${res.status}`);
        hasP0Error = true;
      }
    } else {
      // Drafts without preview:true should not be deployed or return 404
      if (res.status === 200) {
        conflicts.push(`Article ${route} is a draft without preview, but it returned 200 on production.`);
        hasP0Error = true;
      }
    }

    // Check Noindex
    if (res.status === 200) {
      const hasNoindexTag = html.includes('name="robots" content="noindex,nofollow"');
      
      if (article.status === 'published' && hasNoindexTag) {
         conflicts.push(`Published article ${route} has a noindex tag in production.`);
         hasP0Error = true;
      }
      
      if (article.status !== 'published' && article.preview && !hasNoindexTag) {
         conflicts.push(`Preview article ${route} is MISSING a noindex tag in production.`);
         hasP0Error = true;
      }
    }
    
    // Check Sitemap presence
    const inSitemap = sitemapData.includes(route);
    if (article.status === 'published' && !inSitemap) {
      conflicts.push(`Published article ${route} is MISSING from sitemap.xml`);
      hasP0Error = true;
    }
    if (article.status !== 'published' && inSitemap) {
      conflicts.push(`Draft article ${route} is IN sitemap.xml (SEO Leak)`);
      hasP0Error = true;
    }
    
    // Check Blog Index presence
    const blogHtml = article.language === 'ru' ? ruBlogData : enBlogData;
    // VERY simple check: Does the route appear as a link in the blog index?
    // Depending on pagination, it might not be on page 1, but we assume it is for now.
    const inBlogIndex = blogHtml.includes(`href="${route}"`);
    
    if (article.status === 'published' && !inBlogIndex) {
      console.log(`  ⚠️ Warning: Published article ${route} not found in first page of /${article.language === 'ru' ? 'ru/blog' : 'blog'}`);
    }
    if (article.status !== 'published' && inBlogIndex) {
       conflicts.push(`Draft article ${route} is linked in the public blog index!`);
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
