import https from 'https';
import { URL } from 'url';
import { getSeoPageRecordByPath } from '../src/content/seoPages/index.js';

const targetPath = process.argv.find((arg) => arg.startsWith('--path='))?.split('=')[1] || '/ru/templates/instagram-carousel';
const targetUrl = process.argv.find((arg) => arg.startsWith('--url='))?.split('=')[1] || `https://gotoflow.io${targetPath}`;
const origin = new URL(targetUrl).origin;
const pageRecord = getSeoPageRecordByPath(new URL(targetUrl).pathname);
const errors = [];
const warnings = [];

const fetchUrl = (url, redirectCount = 0, seen = new Set()) => new Promise((resolve, reject) => {
  if (redirectCount > 8) {
    reject(new Error(`Redirect loop or too many redirects for ${url}`));
    return;
  }
  if (seen.has(url)) {
    reject(new Error(`Redirect loop detected for ${url}`));
    return;
  }
  seen.add(url);

  https.get(url, { headers: { 'User-Agent': 'GoToFlow SEO live checker' } }, (res) => {
    const location = res.headers.location;
    if ([301, 302, 303, 307, 308].includes(res.statusCode) && location) {
      const nextUrl = new URL(location, url).toString();
      fetchUrl(nextUrl, redirectCount + 1, seen).then(resolve, reject);
      res.resume();
      return;
    }

    let data = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => resolve({
      url,
      finalUrl: url,
      status: res.statusCode,
      headers: res.headers,
      data,
      redirectCount,
    }));
  }).on('error', reject);
});

const countMatches = (text, pattern) => (text.match(pattern) || []).length;
const attr = (tag, name) => tag.match(new RegExp(`${name}=["']([^"']+)["']`, 'i'))?.[1] || '';
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map((match) => match[0]);
const meta = (html, name) => {
  const tag = tags(html, 'meta').find((candidate) => attr(candidate, 'name').toLowerCase() === name.toLowerCase());
  return tag ? attr(tag, 'content') : '';
};
const canonical = (html) => {
  const tag = tags(html, 'link').find((candidate) => attr(candidate, 'rel').toLowerCase() === 'canonical');
  return tag ? attr(tag, 'href') : '';
};
const alternates = (html) => tags(html, 'link')
  .filter((tag) => attr(tag, 'rel').toLowerCase() === 'alternate')
  .map((tag) => `${attr(tag, 'hreflang')}:${attr(tag, 'href')}`);

const jsonLd = (html) => [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
  .flatMap((match) => {
    try {
      const parsed = JSON.parse(match[1]);
      const roots = Array.isArray(parsed) ? parsed : [parsed];
      return roots.flatMap((entry) => Array.isArray(entry?.['@graph']) ? entry['@graph'] : entry);
    } catch (error) {
      errors.push(`Invalid JSON-LD: ${error.message}`);
      return [];
    }
  });

const schemaTypes = (html) => jsonLd(html).map((entry) => entry?.['@type']).flat().filter(Boolean);
const faqSchemaCount = (html) => {
  const faq = jsonLd(html).find((entry) => entry?.['@type'] === 'FAQPage');
  return Array.isArray(faq?.mainEntity) ? faq.mainEntity.length : 0;
};

const internalHrefs = (html) => [...html.matchAll(/<a\b[^>]*href=["']([^"']*)["'][^>]*>/gi)].map((match) => match[1]);
const imageSrcs = (html) => [...html.matchAll(/<img\b[^>]*src=["']([^"']+)["'][^>]*>/gi)].map((match) => match[1]);

const headCheck = (html, response) => {
  const titleCount = countMatches(html, /<title\b/gi);
  const descCount = tags(html, 'meta').filter((tag) => attr(tag, 'name').toLowerCase() === 'description').length;
  const canonicalCount = tags(html, 'link').filter((tag) => attr(tag, 'rel').toLowerCase() === 'canonical').length;
  const h1Count = countMatches(html, /<h1\b/gi);
  const robots = meta(html, 'robots');
  const xRobots = response.headers['x-robots-tag'] || '';
  const types = schemaTypes(html);

  if (response.status !== 200) errors.push(`Expected HTTP 200, got ${response.status}.`);
  if (!/^text\/html/i.test(response.headers['content-type'] || '')) errors.push(`Expected text/html content-type, got ${response.headers['content-type'] || '(missing)'}.`);
  if (response.redirectCount > 3) warnings.push(`Redirect count is ${response.redirectCount}.`);
  if (/noindex/i.test(xRobots)) errors.push(`X-Robots-Tag contains noindex: ${xRobots}`);
  if (titleCount !== 1) errors.push(`Expected exactly one title, got ${titleCount}.`);
  if (descCount !== 1) errors.push(`Expected exactly one meta description, got ${descCount}.`);
  if (canonicalCount !== 1) errors.push(`Expected exactly one canonical, got ${canonicalCount}.`);
  if (h1Count !== 1) errors.push(`Expected exactly one H1, got ${h1Count}.`);
  if (canonical(html) !== targetUrl) errors.push(`Canonical mismatch: ${canonical(html) || '(missing)'}`);
  if (html.match(/<html\b[^>]*lang=["']([^"']+)["']/i)?.[1] !== pageRecord?.language) errors.push('HTML lang mismatch.');
  if (pageRecord?.noindex === true && !/noindex/i.test(robots)) errors.push('Expected noindex robots.');
  if (pageRecord?.noindex !== true && /noindex/i.test(robots)) errors.push('Page must not be noindex.');
  if (pageRecord?.noindex !== true && !/index,\s*follow/i.test(robots)) errors.push('Expected robots index, follow.');
  if (pageRecord?.language === 'ru' && pageRecord?.hreflang === undefined && alternates(html).length > 0) errors.push('RU-only page must not emit hreflang alternates.');
  ['Organization', 'WebSite', 'WebPage', 'BreadcrumbList'].forEach((type) => {
    if (!types.includes(type)) errors.push(`Missing ${type} schema.`);
  });
  if (pageRecord?.faq?.length && faqSchemaCount(html) !== pageRecord.faq.length) {
    errors.push(`FAQ schema count mismatch: ${faqSchemaCount(html)} vs ${pageRecord.faq.length}.`);
  }
  ['Article', 'BlogPosting', 'Review', 'AggregateRating', 'Offer'].forEach((type) => {
    if (types.includes(type)) errors.push(`Forbidden schema type on SEO page: ${type}.`);
  });
  if (countMatches(html, /<header\b/gi) !== 1) errors.push('Expected exactly one shared header.');
  if (countMatches(html, /<footer\b/gi) !== 1) errors.push('Expected exactly one shared footer.');
};

const robotsAndSitemapCheck = async () => {
  const robotsResponse = await fetchUrl(`${origin}/robots.txt`);
  if (robotsResponse.status !== 200) errors.push(`robots.txt status ${robotsResponse.status}.`);
  if (!/sitemap:/i.test(robotsResponse.data)) errors.push('robots.txt is missing Sitemap directive.');
  const pathRule = new RegExp(`disallow:\\s*${targetPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i');
  if (pathRule.test(robotsResponse.data)) errors.push(`${targetPath} is blocked in robots.txt.`);

  const sitemapResponse = await fetchUrl(`${origin}/sitemap.xml`);
  if (sitemapResponse.status !== 200) errors.push(`sitemap.xml status ${sitemapResponse.status}.`);
  const sitemapCount = countMatches(sitemapResponse.data, new RegExp(`<loc>${targetUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}<\\/loc>`, 'g'));
  if (sitemapCount !== 1) errors.push(`Target URL appears ${sitemapCount} times in sitemap.xml.`);
};

const linksAndImagesCheck = async (html) => {
  for (const href of internalHrefs(html)) {
    if (!href) errors.push('Empty internal href.');
    if (/^javascript:/i.test(href)) errors.push(`javascript: href found: ${href}`);
    if (href.startsWith('/')) {
      const url = new URL(href, origin).toString();
      const response = await fetchUrl(url).catch((error) => ({ status: 0, error }));
      if (!response.status || response.status >= 400) errors.push(`Broken internal link: ${href} (${response.status || response.error.message})`);
    }
    if (/app\.gotoflow\.io/.test(href) && !href.startsWith('https://')) errors.push(`App link must use HTTPS: ${href}`);
  }

  for (const src of imageSrcs(html)) {
    if (/localhost|127\.0\.0\.1|preview/i.test(src)) errors.push(`Image src contains local preview URL: ${src}`);
    const url = new URL(src, origin).toString();
    const response = await fetchUrl(url).catch((error) => ({ status: 0, headers: {}, error }));
    if (!response.status || response.status >= 400) errors.push(`Broken image: ${src} (${response.status || response.error.message})`);
    if (response.status && !/^image\//i.test(response.headers['content-type'] || '')) errors.push(`Image MIME is not image/* for ${src}: ${response.headers['content-type'] || '(missing)'}`);
  }
};

console.log('SEO live page baseline check');
console.log(`- target: ${targetUrl}`);

try {
  const response = await fetchUrl(targetUrl);
  headCheck(response.data, response);
  await robotsAndSitemapCheck();
  await linksAndImagesCheck(response.data);
} catch (error) {
  errors.push(error.message);
}

warnings.forEach((warning) => console.warn(`WARNING: ${warning}`));

if (errors.length > 0) {
  console.error('\nSEO live page baseline check failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('SEO live page baseline check passed.');
