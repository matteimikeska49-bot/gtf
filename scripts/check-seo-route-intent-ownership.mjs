import { existsSync } from 'fs';
import { readdir, readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  getAllSeoPages,
  getPublishedSeoPages,
  getSeoPagesForSitemap,
  getSeoPagesForPrerender,
  getSeoPageRouteCollision,
  hasApprovedSeoRouteMigration,
  isSeoPageRouteAllowed,
  validateSeoPages,
} from '../src/content/seoPages/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const readUtf8 = (relativePath) => readFile(path.join(rootDir, relativePath), 'utf-8');

const normalizeRoute = (route) => (
  route
    .replace(/\/+$/, '')
    .replace(/^$/, '/')
);

const normalizeText = (text = '') => text
  .toLowerCase()
  .replace(/https?:\/\/\S+/g, ' ')
  .replace(/[^\p{L}\p{N}\s]+/gu, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const tokenSet = (text = '') => new Set(
  normalizeText(text)
    .split(' ')
    .filter((token) => token.length > 3)
);

const jaccard = (leftText = '', rightText = '') => {
  const left = tokenSet(leftText);
  const right = tokenSet(rightText);
  if (left.size === 0 || right.size === 0) return 0;
  const intersection = [...left].filter((token) => right.has(token)).length;
  const union = new Set([...left, ...right]).size;
  return Number((intersection / union).toFixed(3));
};

const sharedFaqScore = (leftFaq = [], rightFaq = []) => {
  const left = new Set(leftFaq.map((item) => normalizeText(item.question || item.q || '')).filter(Boolean));
  const right = new Set(rightFaq.map((item) => normalizeText(item.question || item.q || '')).filter(Boolean));
  if (left.size === 0 || right.size === 0) return { score: 0, shared: 0 };
  const shared = [...left].filter((question) => right.has(question)).length;
  return {
    score: Number((shared / Math.min(left.size, right.size)).toFixed(3)),
    shared,
  };
};

const pageLeadText = (page) => [
  page.heroSubtitle,
  page.quickAnswer?.answer,
  page.productBridge,
].filter(Boolean).join(' ');

const pageH2Text = (page) => [
  ...(page.sections || []).map((section) => section.title),
  ...(page.templateCategories || []).map((section) => section.title),
  ...(page.howItWorks || []).map((section) => section.title),
].filter(Boolean).join(' ');

const productionIntentPages = (pages) => pages.filter((page) => (
  page.state === 'indexable_approved' ||
  (page.published === true && page.noindex !== true && page.sitemapEligible === true)
));

export const validateSeoIntentRecords = (pages, { blogRoutes = [] } = {}) => {
  const errors = [];
  const warnings = [];
  const intentOwners = new Map();
  const titles = new Map();
  const h1s = new Map();
  const canonicals = new Map();
  const productionPages = productionIntentPages(pages);

  for (const page of productionPages) {
    const intentOwner = normalizeText(page.intentOwner || page.primaryIntent || page.searchIntent || page.primaryKeyword || '');
    const title = normalizeText(page.title || '');
    const h1 = normalizeText(page.h1 || '');
    const canonical = page.canonicalOwner || page.path;

    if (intentOwner) {
      if (intentOwners.has(intentOwner)) {
        errors.push(`[Cannibalization P0] Duplicate primary intent owner "${page.intentOwner || page.primaryIntent}" for ${page.path} and ${intentOwners.get(intentOwner)}.`);
      }
      intentOwners.set(intentOwner, page.path);
    }

    if (title) {
      if (titles.has(title)) errors.push(`[Cannibalization P0] Duplicate title for ${page.path} and ${titles.get(title)}: "${page.title}".`);
      titles.set(title, page.path);
    }

    if (h1) {
      if (h1s.has(h1)) errors.push(`[Cannibalization P0] Duplicate H1 for ${page.path} and ${h1s.get(h1)}: "${page.h1}".`);
      h1s.set(h1, page.path);
    }

    if (canonical) {
      if (canonicals.has(canonical)) errors.push(`[Cannibalization P0] Duplicate canonical owner ${canonical} for ${page.path} and ${canonicals.get(canonical)}.`);
      canonicals.set(canonical, page.path);
    }

    for (const blog of blogRoutes) {
      const blogTitle = normalizeText(blog.title || '');
      if (title && blogTitle && title === blogTitle) {
        errors.push(`[Cannibalization P0] Duplicate title across systems: ${page.path} matches blog ${blog.path} ("${page.title}").`);
      }
    }
  }

  for (let i = 0; i < productionPages.length; i += 1) {
    for (let j = i + 1; j < productionPages.length; j += 1) {
      const left = productionPages[i];
      const right = productionPages[j];
      const leadScore = jaccard(pageLeadText(left), pageLeadText(right));
      const h2Score = jaccard(pageH2Text(left), pageH2Text(right));
      const faq = sharedFaqScore(left.faq, right.faq);

      if (leadScore >= 0.94) {
        errors.push(`[Cannibalization P0] Near-identical lead copy: ${left.path} vs ${right.path}, score ${leadScore}.`);
      } else if (leadScore >= 0.82) {
        warnings.push(`[Cannibalization warning] Similar lead copy: ${left.path} vs ${right.path}, score ${leadScore}.`);
      }

      if (h2Score >= 0.92) {
        warnings.push(`[Cannibalization warning] Highly similar major H2 set: ${left.path} vs ${right.path}, score ${h2Score}.`);
      }

      if (faq.shared >= 5 && faq.score >= 0.85) {
        errors.push(`[Cannibalization P0] FAQ set is too similar: ${left.path} vs ${right.path}, score ${faq.score}, shared ${faq.shared}.`);
      } else if (faq.shared >= 4 && faq.score >= 0.65) {
        warnings.push(`[Cannibalization warning] FAQ overlap should be reviewed: ${left.path} vs ${right.path}, score ${faq.score}, shared ${faq.shared}.`);
      }
    }
  }

  return { errors, warnings };
};

const extractAppRoutes = async () => {
  const source = await readUtf8('src/App.jsx');
  const routes = [];
  const routePattern = /<Route\s+path="([^"]+)"\s+element=\{<([^}]+)\}\s*\/>/g;
  let match = routePattern.exec(source);

  while (match) {
    const [, routePath, element] = match;
    const isRegistryRoute = /SeoPageRoute|SeoHubPage/.test(element);

    routes.push({
      path: normalizeRoute(routePath),
      source: 'src/App.jsx',
      owner: element.trim(),
      isRegistryRoute,
      isDynamic: routePath.includes(':') || routePath.includes('*'),
    });

    match = routePattern.exec(source);
  }

  return routes;
};

const extractPrerenderRoutes = async () => {
  const source = await readUtf8('prerender.mjs');
  return [...source.matchAll(/'([^']+)'/g)]
    .map((match) => normalizeRoute(match[1]))
    .filter((route) => route.startsWith('/ru'));
};

const extractSitemapRoutes = async () => {
  const sitemapPath = path.join(rootDir, 'dist', 'sitemap.xml');

  if (!existsSync(sitemapPath)) {
    return [];
  }

  const source = await readFile(sitemapPath, 'utf-8');
  return [...source.matchAll(/<url>([\s\S]*?)<\/url>/g)]
    .map((match) => {
      const block = match[1];
      const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim() || '';
      const url = new URL(loc);

      return {
        url: loc,
        path: normalizeRoute(url.pathname),
        lastmod: block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]?.trim() || '',
        changefreq: block.match(/<changefreq>([^<]+)<\/changefreq>/)?.[1]?.trim() || '',
        priority: block.match(/<priority>([^<]+)<\/priority>/)?.[1]?.trim() || '',
      };
    })
    .filter((entry) => entry.path.startsWith('/ru'));
};

const extractRuBlogRoutes = async () => {
  const articlesDir = path.join(rootDir, 'src', 'content', 'blog', 'articles');
  const files = await readdir(articlesDir);
  const routes = [];

  for (const file of files) {
    if (!file.endsWith('.md') || file.startsWith('_')) {
      continue;
    }

    const source = await readFile(path.join(articlesDir, file), 'utf-8');
    const language = source.match(/^language:\s*["']?([^"'\n]+)["']?/m)?.[1]?.trim();

    if (language !== 'ru') {
      continue;
    }

    const slug = source.match(/^slug:\s*["']?([^"'\n]+)["']?/m)?.[1]?.trim() || file.replace(/\.md$/, '');
    const title = source.match(/^title:\s*["']?([^"'\n]+)["']?/m)?.[1]?.trim() || '';
    const primaryKeyword = source.match(/^primaryKeyword:\s*["']?([^"'\n]+)["']?/m)?.[1]?.trim() || '';
    routes.push({
      path: `/ru/blog/${slug}`,
      source: `src/content/blog/articles/${file}`,
      title,
      primaryKeyword,
    });
  }

  return routes;
};

const extractIntentMap = async () => {
  const intentMapPath = path.join(rootDir, 'src', 'content', 'blog', 'intent-map.json');

  if (!existsSync(intentMapPath)) {
    return [];
  }

  const source = await readFile(intentMapPath, 'utf-8');
  const parsed = JSON.parse(source);

  if (Array.isArray(parsed)) {
    return parsed;
  }

  if (parsed && typeof parsed === 'object') {
    return Object.entries(parsed).map(([id, value]) => ({ id, ...value }));
  }

  return [];
};

const buildRouteInventory = async () => {
  const appRoutes = await extractAppRoutes();
  const prerenderRoutes = await extractPrerenderRoutes();
  const sitemapRoutes = await extractSitemapRoutes();
  const blogRoutes = await extractRuBlogRoutes();
  const intentMapEntries = await extractIntentMap();
  const nonRegistryAppRoutes = appRoutes.filter((route) => (
    route.path.startsWith('/ru') &&
    !route.isRegistryRoute &&
    !route.isDynamic
  ));

  return {
    appRoutes,
    nonRegistryAppRoutes,
    prerenderRoutes,
    sitemapRoutes,
    blogRoutes,
    intentMapEntries,
    nonRegistryRouteOwners: new Map(nonRegistryAppRoutes.map((route) => [route.path, route.owner])),
    sitemapRouteOwners: new Map(sitemapRoutes.map((route) => [route.path, route.url])),
  };
};

const validateRouteOwnership = (inventory) => {
  const errors = [];
  const warnings = [];
  const pages = getAllSeoPages();
  const sitemapPages = new Set(getSeoPagesForSitemap().map((page) => page.path));
  const prerenderPages = new Set(getSeoPagesForPrerender().map((page) => page.path));
  const publishedPages = new Set(getPublishedSeoPages().map((page) => page.path));
  const actualSitemapPages = new Set(inventory.sitemapRoutes.map((route) => route.path));
  const sitemapCounts = new Map();

  inventory.sitemapRoutes.forEach((route) => {
    sitemapCounts.set(route.path, (sitemapCounts.get(route.path) || 0) + 1);
  });

  sitemapCounts.forEach((count, routePath) => {
    if (count > 1) {
      errors.push(`${routePath}: duplicate URL appears ${count} times in dist/sitemap.xml.`);
    }
  });

  inventory.sitemapRoutes.forEach((route) => {
    if (route.path.includes(':') || route.path.includes('${') || route.path.includes('...')) {
      errors.push(`${route.path}: placeholder or route pattern appears in dist/sitemap.xml.`);
    }
  });

  for (const page of pages) {
    const dynamicRouteOwner = inventory.nonRegistryRouteOwners.get(page.path);
    const configuredRouteOwner = getSeoPageRouteCollision(page);
    const sitemapRouteOwner = sitemapPages.has(page.path) ? null : inventory.sitemapRouteOwners.get(page.path);
    const routeOwner = dynamicRouteOwner || configuredRouteOwner || sitemapRouteOwner;
    const hasApprovedMigration = hasApprovedSeoRouteMigration(page);
    const isRouteAllowed = isSeoPageRouteAllowed(page);

    if (routeOwner && page.published === true && !hasApprovedMigration) {
      errors.push(`${page.path}: registry page collides with existing non-registry route owner (${routeOwner}). Existing route owner wins until explicit human-approved migration exists.`);
    }

    if (page.published === true && !isRouteAllowed) {
      errors.push(`${page.path}: registry page is marked published but ownership decision does not allow routing.`);
    }

    if (page.noindex === true && sitemapPages.has(page.path)) {
      errors.push(`${page.path}: noindex registry page is present in SEO sitemap helper output.`);
    }

    if (page.noindex === true && isRouteAllowed && actualSitemapPages.has(page.path)) {
      errors.push(`${page.path}: noindex routeable registry review page is present in dist/sitemap.xml.`);
    }

    if (page.noindex === true && prerenderPages.has(page.path)) {
      errors.push(`${page.path}: noindex registry page is present in SEO prerender helper output.`);
    }

    if (page.published === false && publishedPages.has(page.path)) {
      errors.push(`${page.path}: unpublished/backlog registry page is still routable.`);
    }

    if (page.ownershipDecision?.intentOverlapPaths?.length > 0 && page.ownershipDecision.decision === 'safe_new_registry_page') {
      warnings.push(`${page.path}: safe registry page still has supporting/overlap content to review: ${page.ownershipDecision.intentOverlapPaths.join(', ')}`);
    }

    if ((dynamicRouteOwner || configuredRouteOwner) && !hasApprovedMigration) {
      warnings.push(`${page.path}: registry path matches an existing route owner (${dynamicRouteOwner || configuredRouteOwner}); existing route owner wins unless migration is human-approved.`);
    }

    if (!isRouteAllowed && actualSitemapPages.has(page.path)) {
      warnings.push(`${page.path}: registry record is not routeable, but path is in sitemap as an existing indexable route owner.`);
    }
  }

  const cannibalizationValidation = validateSeoIntentRecords(pages, {
    blogRoutes: inventory.blogRoutes,
  });
  errors.push(...cannibalizationValidation.errors);
  warnings.push(...cannibalizationValidation.warnings);

  return { errors, warnings };
};

const main = async () => {
  const inventory = await buildRouteInventory();
  const registryErrors = validateSeoPages();
  const ownershipValidation = validateRouteOwnership(inventory);
  const errors = [...registryErrors, ...ownershipValidation.errors];

  console.log('SEO route/intent ownership guardrail');
  console.log(`- app routes found: ${inventory.appRoutes.length}`);
  console.log(`- non-registry RU app routes found: ${inventory.nonRegistryAppRoutes.length}`);
  console.log(`- RU blog article routes found: ${inventory.blogRoutes.length}`);
  console.log(`- blog intent-map entries found: ${inventory.intentMapEntries.length}`);
  console.log(`- RU prerender routes found: ${inventory.prerenderRoutes.length}`);
  console.log(`- RU sitemap routes found: ${inventory.sitemapRoutes.length}`);
  console.log(`- SEO registry records found: ${getAllSeoPages().length}`);
  console.log(`- routable SEO registry pages: ${getPublishedSeoPages().map((page) => page.path).join(', ') || '(none)'}`);
  console.log(`- indexable SEO registry pages: ${getSeoPagesForSitemap().map((page) => page.path).join(', ') || '(none)'}`);

  if (ownershipValidation.warnings.length > 0) {
    console.log('\nWarnings:');
    ownershipValidation.warnings.forEach((warning) => console.log(`- ${warning}`));
  }

  if (errors.length > 0) {
    console.error('\nSEO route/intent ownership guardrail failed:');
    errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }

  console.log('\nSEO route/intent ownership guardrail passed.');
};

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
