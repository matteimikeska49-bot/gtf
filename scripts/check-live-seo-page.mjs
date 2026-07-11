import fs from 'fs';
import path from 'path';
import https from 'https';

console.log('🔍 Starting Live SEO Page Check...');

const fetchUrl = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({
        status: res.statusCode,
        headers: res.headers,
        data
      }));
    }).on('error', err => reject(err));
  });
};

const checkLivePage = async () => {
  const targetUrl = 'https://gotoflow.io/ru/templates/instagram-carousel';
  const sitemapUrl = 'https://gotoflow.io/sitemap.xml';
  
  let errors = [];

  console.log(`Fetching ${targetUrl} ...`);
  let pageRes;
  try {
    pageRes = await fetchUrl(targetUrl);
  } catch (e) {
    console.error(`❌ FAIL: Could not fetch ${targetUrl}`);
    process.exit(1);
  }

  if (pageRes.status !== 200) {
    errors.push(`Expected HTTP 200, got ${pageRes.status}`);
  }

  const html = pageRes.data;

  // 1. Robots META / Headers
  if (html.includes('<meta name="robots" content="noindex')) {
    errors.push(`Page has noindex meta tag`);
  }
  if (!html.includes('index, follow')) {
    console.log(`⚠️ Warning: "index, follow" not explicitly found, assuming default indexable if no noindex is present.`);
  }

  // 2. Canonical
  const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
  if (!canonicalMatch) {
    errors.push(`Missing canonical link`);
  } else if (canonicalMatch[1] !== targetUrl) {
    errors.push(`Canonical mismatch. Expected ${targetUrl}, got ${canonicalMatch[1]}`);
  }

  // 3. Schema Validation
  if (!html.includes('application/ld+json')) {
    errors.push(`Missing JSON-LD Schema`);
  }

  // 4. Asset checks (simple regex for broken links or missing images)
  const imgMatches = [...html.matchAll(/<img[^>]+src="([^"]+)"/g)];
  for (const match of imgMatches) {
    const src = match[1];
    if (src.includes('TODO') || src.includes('placeholder')) {
      errors.push(`Image source contains placeholder: ${src}`);
    }
  }

  // 5. Sitemap presence
  console.log(`Fetching ${sitemapUrl} ...`);
  try {
    const sitemapRes = await fetchUrl(sitemapUrl);
    if (sitemapRes.status === 200) {
      if (!sitemapRes.data.includes(`<loc>${targetUrl}</loc>`)) {
        errors.push(`Target URL not found in sitemap.xml`);
      }
    } else {
      errors.push(`Could not fetch sitemap.xml, got status ${sitemapRes.status}`);
    }
  } catch (e) {
    errors.push(`Failed to fetch sitemap.xml: ${e.message}`);
  }

  if (errors.length > 0) {
    console.error('\n❌ FAIL: Live SEO Page Check failed:');
    errors.forEach(e => console.error(`  - ${e}`));
    process.exit(1);
  }

  console.log('✅ PASS: Live SEO Page Check passed.');
};

checkLivePage().catch(e => {
  console.error(e);
  process.exit(1);
});
