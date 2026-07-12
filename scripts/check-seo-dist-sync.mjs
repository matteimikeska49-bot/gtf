import fs from 'fs';
import os from 'os';
import path from 'path';
import { execFileSync } from 'child_process';
import {
  getAllSeoPages,
  getSeoPageRouteCollision,
  getSeoPagesForPrerender,
  getSeoPagesForSitemap,
} from '../src/content/seoPages/index.js';

const rootDir = process.cwd();
const committedDistDir = path.resolve(process.env.SEO_DIST_SYNC_COMMITTED_DIST || path.join(rootDir, 'dist'));
const skipBuild = process.env.SEO_DIST_SYNC_SKIP_BUILD === '1';
const providedTempDist = process.env.SEO_DIST_SYNC_TMP_DIST
  ? path.resolve(process.env.SEO_DIST_SYNC_TMP_DIST)
  : null;
const tmpBuildRoot = providedTempDist
  ? path.dirname(providedTempDist)
  : fs.mkdtempSync(path.join(os.tmpdir(), 'gotoflow-seo-dist-sync-'));
const tmpDistDir = providedTempDist || path.join(tmpBuildRoot, 'dist');
const cleanupTemp = process.env.SEO_DIST_SYNC_KEEP_TMP !== '1' && !providedTempDist;

const errors = [];
const warnings = [];

const routeToHtmlPath = (distDir, routePath) => path.join(distDir, routePath.replace(/^\//, ''), 'index.html');
const readUtf8 = (filePath) => fs.readFileSync(filePath, 'utf8');
const countMatches = (text, pattern) => (text.match(pattern) || []).length;
const normalizeWhitespace = (text = '') => text.replace(/\s+/g, ' ').trim();
const unique = (items) => [...new Set(items.filter(Boolean))].sort();

const extractAttr = (tag, attr) => tag.match(new RegExp(`${attr}=["']([^"']+)["']`, 'i'))?.[1] || '';
const extractTags = (html, tagName) => [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, 'gi'))].map((match) => match[0]);

const getMetaContent = (html, name) => {
  const tags = extractTags(html, 'meta');
  const tag = tags.find((candidate) => extractAttr(candidate, 'name').toLowerCase() === name.toLowerCase());
  return tag ? extractAttr(tag, 'content') : '';
};

const getLinkHref = (html, rel, hreflang = null) => {
  const tags = extractTags(html, 'link');
  const tag = tags.find((candidate) => {
    const relValue = extractAttr(candidate, 'rel').toLowerCase();
    const hreflangValue = extractAttr(candidate, 'hreflang').toLowerCase();
    return relValue === rel.toLowerCase() && (hreflang === null || hreflangValue === hreflang.toLowerCase());
  });
  return tag ? extractAttr(tag, 'href') : '';
};

const extractJsonLdBlocks = (html) => {
  return [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => match[1].trim())
    .filter(Boolean)
    .flatMap((source) => {
      try {
        const parsed = JSON.parse(source);
        const roots = Array.isArray(parsed) ? parsed : [parsed];
        return roots.flatMap((entry) => Array.isArray(entry?.['@graph']) ? entry['@graph'] : entry);
      } catch (error) {
        errors.push(`Invalid JSON-LD block: ${error.message}`);
        return [{ '@type': 'parse-error' }];
      }
    });
};

const schemaTypes = (html) => unique(extractJsonLdBlocks(html).map((entry) => entry?.['@type']).flat());

const faqSchemaCount = (html) => {
  const faq = extractJsonLdBlocks(html).find((entry) => entry?.['@type'] === 'FAQPage');
  return Array.isArray(faq?.mainEntity) ? faq.mainEntity.length : 0;
};

const faqSchemaQuestions = (html) => {
  const faq = extractJsonLdBlocks(html).find((entry) => entry?.['@type'] === 'FAQPage');
  return Array.isArray(faq?.mainEntity)
    ? faq.mainEntity.map((entry) => normalizeWhitespace(entry?.name || ''))
    : [];
};

const breadcrumbSchemaItems = (html) => {
  const breadcrumb = extractJsonLdBlocks(html).find((entry) => entry?.['@type'] === 'BreadcrumbList');
  return Array.isArray(breadcrumb?.itemListElement)
    ? breadcrumb.itemListElement.map((item) => `${item?.position || ''}:${item?.name || ''}:${item?.item || ''}`)
    : [];
};

const extractAssetRefs = (html) => unique(
  [...html.matchAll(/(?:src|href)=["']([^"']+)["']/gi)]
    .map((match) => match[1])
    .filter((href) => href.startsWith('/assets/') || href.startsWith('/images/') || href.startsWith('assets/'))
    .map((href) => href.replace(/^\/+/, ''))
);

const collectInternalLinks = (html) => unique(
  [...html.matchAll(/<a\b[^>]*href=["']([^"']*)["'][^>]*>/gi)]
    .map((match) => match[1].trim())
    .filter((href) => href.startsWith('/'))
    .map((href) => href.split('#')[0].replace(/\/+$/, '') || '/')
);

const collectImageRefs = (html) => unique(
  [...html.matchAll(/<img\b[^>]*src=["']([^"']+)["'][^>]*>/gi)]
    .map((match) => match[1].trim())
    .filter((src) => src.startsWith('/'))
    .map((src) => src.replace(/^\/+/, ''))
);

const htmlRouteExists = (distDir, routePath) => fs.existsSync(routeToHtmlPath(distDir, routePath));

const assetExists = (distDir, assetPath) => fs.existsSync(path.join(distDir, assetPath.replace(/^\/+/, '')));

const snapshotHtml = (html, page) => {
  const h1Text = normalizeWhitespace(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, ' ') || '');
  const alternateTags = extractTags(html, 'link')
    .filter((tag) => extractAttr(tag, 'rel').toLowerCase() === 'alternate')
    .map((tag) => `${extractAttr(tag, 'hreflang')}:${extractAttr(tag, 'href')}`)
    .sort();

  return {
    title: normalizeWhitespace(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || ''),
    description: normalizeWhitespace(getMetaContent(html, 'description')),
    h1Count: countMatches(html, /<h1\b/gi),
    h1Text,
    canonical: getLinkHref(html, 'canonical'),
    robots: normalizeWhitespace(getMetaContent(html, 'robots')),
    lang: html.match(/<html\b[^>]*lang=["']([^"']+)["']/i)?.[1] || '',
    hreflang: alternateTags,
    schemaTypes: schemaTypes(html),
    faqSchemaCount: faqSchemaCount(html),
    faqSchemaQuestions: faqSchemaQuestions(html),
    breadcrumbSchemaItems: breadcrumbSchemaItems(html),
    faqVisibleCount: Array.isArray(page.faq)
      ? page.faq.filter((item) => html.includes(item.question)).length
      : 0,
    headerCount: countMatches(html, /<header\b/gi),
    footerCount: countMatches(html, /<footer\b/gi),
    assetRefs: extractAssetRefs(html),
  };
};

const assertExpectedPageSemantics = (snapshot, page, label) => {
  const expectedCanonical = `https://gotoflow.io${page.path}`;

  if (snapshot.title !== page.title) errors.push(`${label}: title mismatch: "${snapshot.title}"`);
  if (snapshot.description !== page.description) errors.push(`${label}: description mismatch.`);
  if (snapshot.h1Count !== 1) errors.push(`${label}: expected exactly one H1, got ${snapshot.h1Count}.`);
  if (snapshot.h1Text !== page.h1) errors.push(`${label}: H1 mismatch: "${snapshot.h1Text}"`);
  if (snapshot.canonical !== expectedCanonical) errors.push(`${label}: canonical mismatch: ${snapshot.canonical || '(missing)'}`);
  if (snapshot.lang !== page.language) errors.push(`${label}: html lang mismatch: ${snapshot.lang || '(missing)'}`);
  if (page.noindex === true && !/noindex/i.test(snapshot.robots)) errors.push(`${label}: expected noindex robots.`);
  if (page.noindex !== true && /noindex/i.test(snapshot.robots)) errors.push(`${label}: must not contain noindex robots.`);
  if (page.noindex !== true && !/index,\s*follow/i.test(snapshot.robots)) errors.push(`${label}: expected index, follow robots.`);
  if (page.language === 'ru' && page.hreflang === undefined && snapshot.hreflang.length > 0) {
    errors.push(`${label}: RU-only SEO page must not emit hreflang alternates.`);
  }
  if (snapshot.schemaTypes.includes('Article') || snapshot.schemaTypes.includes('BlogPosting')) {
    errors.push(`${label}: SEO page must not use Article or BlogPosting schema.`);
  }
  ['Organization', 'WebSite', 'WebPage', 'BreadcrumbList'].forEach((type) => {
    if (!snapshot.schemaTypes.includes(type)) errors.push(`${label}: missing ${type} schema.`);
  });
  if (Array.isArray(page.faq) && page.faq.length > 0) {
    const expectedFaqQuestions = page.faq.map((item) => normalizeWhitespace(item.question));
    if (!snapshot.schemaTypes.includes('FAQPage')) errors.push(`${label}: missing FAQPage schema.`);
    if (snapshot.faqSchemaCount !== page.faq.length) errors.push(`${label}: FAQ schema count ${snapshot.faqSchemaCount}, expected ${page.faq.length}.`);
    if (JSON.stringify(snapshot.faqSchemaQuestions) !== JSON.stringify(expectedFaqQuestions)) {
      errors.push(`${label}: FAQ schema questions do not match registry questions.`);
    }
    if (snapshot.faqVisibleCount !== page.faq.length) errors.push(`${label}: visible FAQ count ${snapshot.faqVisibleCount}, expected ${page.faq.length}.`);
  }
  if (snapshot.headerCount !== 1) errors.push(`${label}: expected one shared header, got ${snapshot.headerCount}.`);
  if (snapshot.footerCount !== 1) errors.push(`${label}: expected one shared footer, got ${snapshot.footerCount}.`);
};

const assertNoBrokenRefs = (html, distDir, routePath) => {
  collectInternalLinks(html).forEach((linkPath) => {
    if (linkPath === '/') return;
    if (!htmlRouteExists(distDir, linkPath)) errors.push(`${routePath}: broken internal link in committed dist: ${linkPath}`);
  });

  collectImageRefs(html).forEach((imagePath) => {
    if (!assetExists(distDir, imagePath)) errors.push(`${routePath}: missing image asset in committed dist: /${imagePath}`);
  });

  if (/localhost|127\.0\.0\.1|vite preview/i.test(html)) errors.push(`${routePath}: committed HTML contains local preview URL.`);
  if (/<a\b[^>]*href=["']\s*["']/i.test(html)) errors.push(`${routePath}: committed HTML contains empty href.`);
  if (/<a\b[^>]*href=["']javascript:/i.test(html)) errors.push(`${routePath}: committed HTML contains javascript: href.`);
};

const compareSnapshots = (committed, generated, page) => {
  const comparableFields = [
    'title',
    'description',
    'h1Count',
    'h1Text',
    'canonical',
    'robots',
    'lang',
    'hreflang',
    'schemaTypes',
    'faqSchemaCount',
    'faqSchemaQuestions',
    'breadcrumbSchemaItems',
    'faqVisibleCount',
    'headerCount',
    'footerCount',
    'assetRefs',
  ];

  comparableFields.forEach((field) => {
    const left = JSON.stringify(committed[field]);
    const right = JSON.stringify(generated[field]);
    if (left !== right) errors.push(`${page.path}: committed dist differs from fresh production build for ${field}.`);
  });
};

const readSitemapCounts = (distDir) => {
  const sitemapPath = path.join(distDir, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) return null;
  const sitemap = readUtf8(sitemapPath);
  const counts = new Map();
  [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].forEach((match) => {
    const url = match[1];
    try {
      const routePath = new URL(url).pathname.replace(/\/+$/, '') || '/';
      counts.set(routePath, (counts.get(routePath) || 0) + 1);
    } catch {
      errors.push(`Invalid sitemap URL: ${url}`);
    }
  });
  return { sitemap, counts };
};

const assertSitemapContract = (distDir, label) => {
  const result = readSitemapCounts(distDir);
  if (!result) {
    errors.push(`${label}: missing sitemap.xml.`);
    return null;
  }

  const sitemapPages = getSeoPagesForSitemap();
  const allPages = getAllSeoPages();

  sitemapPages.forEach((page) => {
    const count = result.counts.get(page.path) || 0;
    if (count !== 1) errors.push(`${label}: approved sitemap page ${page.path} appears ${count} times.`);
  });

  allPages.forEach((page) => {
    if (page.noindex === true && !getSeoPageRouteCollision(page)) {
      const count = result.counts.get(page.path) || 0;
      if (count > 0) errors.push(`${label}: noindex SEO page ${page.path} appears in sitemap.`);
    }
  });

  return result;
};

const runTemporaryProductionBuild = () => {
  if (skipBuild) {
    if (!fs.existsSync(tmpDistDir)) throw new Error(`SEO_DIST_SYNC_TMP_DIST does not exist: ${tmpDistDir}`);
    console.log(`- using provided temporary dist: ${tmpDistDir}`);
    return;
  }

  console.log(`- creating temporary production build: ${tmpDistDir}`);
  execFileSync('npx', ['vite', 'build', '--outDir', tmpDistDir, '--emptyOutDir'], {
    cwd: rootDir,
    env: { ...process.env, NODE_ENV: 'production' },
    stdio: 'pipe',
  });
  execFileSync('node', ['prerender.mjs'], {
    cwd: rootDir,
    env: { ...process.env, PRERENDER_DIST_DIR: tmpDistDir },
    stdio: 'pipe',
  });
};

console.log('SEO dist sync check');
console.log(`- committed dist: ${committedDistDir}`);
console.log(`- temporary dist: ${tmpDistDir}`);

try {
  if (!fs.existsSync(committedDistDir)) {
    errors.push(`Committed dist directory not found: ${committedDistDir}`);
  } else {
    runTemporaryProductionBuild();

    const pages = getSeoPagesForPrerender();
    pages.forEach((page) => {
      const committedPath = routeToHtmlPath(committedDistDir, page.path);
      const tmpPath = routeToHtmlPath(tmpDistDir, page.path);

      if (!fs.existsSync(committedPath)) {
        errors.push(`${page.path}: missing committed production HTML.`);
        return;
      }
      if (!fs.existsSync(tmpPath)) {
        errors.push(`${page.path}: missing temporary production HTML.`);
        return;
      }

      const committedHtml = readUtf8(committedPath);
      const tmpHtml = readUtf8(tmpPath);
      const committedSnapshot = snapshotHtml(committedHtml, page);
      const tmpSnapshot = snapshotHtml(tmpHtml, page);

      assertExpectedPageSemantics(committedSnapshot, page, `committed ${page.path}`);
      assertExpectedPageSemantics(tmpSnapshot, page, `temporary ${page.path}`);
      assertNoBrokenRefs(committedHtml, committedDistDir, page.path);
      compareSnapshots(committedSnapshot, tmpSnapshot, page);
    });

    const committedSitemap = assertSitemapContract(committedDistDir, 'committed dist');
    const temporarySitemap = assertSitemapContract(tmpDistDir, 'temporary dist');

    if (committedSitemap && temporarySitemap) {
      const normalizeSitemap = (source) => source.replace(/<lastmod>[^<]*<\/lastmod>/g, '<lastmod>DATE</lastmod>');
      if (normalizeSitemap(committedSitemap.sitemap) !== normalizeSitemap(temporarySitemap.sitemap)) {
        errors.push('Committed sitemap differs from fresh production build sitemap after lastmod normalization.');
      }
    }
  }
} catch (error) {
  errors.push(`Temporary production build failed: ${error.stderr?.toString() || error.message}`);
} finally {
  if (cleanupTemp) {
    fs.rmSync(tmpBuildRoot, { recursive: true, force: true });
  }
}

console.log(`- semantic fields compared: title, description, h1, canonical, robots, lang, hreflang, schema, FAQ, breadcrumb, header/footer, asset refs, sitemap`);
console.log(`- temp directory removed: ${cleanupTemp ? !fs.existsSync(tmpBuildRoot) : 'not-owned'}`);

warnings.forEach((warning) => console.warn(`WARNING: ${warning}`));

if (errors.length > 0) {
  console.error('\nSEO dist sync check failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('SEO dist sync check passed.');
