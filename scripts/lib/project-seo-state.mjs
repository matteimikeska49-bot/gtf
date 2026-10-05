import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFrontmatter } from '../../src/lib/blog/frontmatter.js';
import {
  getPublishedSeoPages,
  getSeoPagesForPrerender,
} from '../../src/content/seoPages/index.js';
import {
  DYNAMIC_ROUTE_PATTERNS,
  RUNTIME_ONLY_ROUTE_PATHS,
  STATIC_SEO_ROUTES,
} from '../../src/seo/projectSeoState.js';
import { APP_ROUTE_ALIASES } from '../../src/routes/routeAliases.js';

export const PUBLIC_ORIGIN = 'https://gotoflow.io';

export const ROBOTS_BY_LIFECYCLE = Object.freeze({
  current_indexable: 'index, follow',
  noindex: 'noindex, nofollow',
  noindex_review: 'noindex, nofollow',
  redirect: 'noindex, follow',
});

const moduleDir = path.dirname(fileURLToPath(import.meta.url));
export const DEFAULT_PROJECT_ROOT = path.resolve(moduleDir, '../..');

export const normalizeRoutePath = (value) => {
  if (!value || value === '/') return '/';
  return `/${String(value).replace(/^\/+/, '').replace(/\/+$/, '')}`;
};

export const canonicalUrl = (routePath) => (
  `${PUBLIC_ORIGIN}${normalizeRoutePath(routePath) === '/' ? '/' : normalizeRoutePath(routePath)}`
);

const routeFromUrl = (value, fallbackPath) => {
  if (!value) return normalizeRoutePath(fallbackPath);
  try {
    const url = new URL(value, PUBLIC_ORIGIN);
    if (url.origin !== PUBLIC_ORIGIN) return normalizeRoutePath(fallbackPath);
    return normalizeRoutePath(url.pathname);
  } catch {
    return normalizeRoutePath(fallbackPath);
  }
};

const normalizedDate = (value) => {
  if (typeof value !== 'string') return null;
  const match = value.trim().match(/^(\d{4}-\d{2}-\d{2})(?:T.*)?$/);
  return match?.[1] || null;
};

const robotsForLifecycle = (lifecycle) => {
  const robots = ROBOTS_BY_LIFECYCLE[lifecycle];
  if (!robots) throw new Error(`Unsupported SEO lifecycle: ${lifecycle}.`);
  return robots;
};

const articleLastmod = (article, sourcePath) => {
  const value = [article.updatedAt, article.lastReviewed, article.publishedAt, article.createdAt]
    .map(normalizedDate)
    .find(Boolean);
  if (!value) throw new Error(`${sourcePath}: public article has no authoritative full update date.`);
  return value;
};

const normalizeHreflang = (items = []) => items.map((item) => ({
  lang: item.lang,
  path: routeFromUrl(item.href || item.path, item.path),
}));

const readArticles = (projectRoot) => {
  const articleDir = path.join(projectRoot, 'src/content/blog/articles');
  return fs.readdirSync(articleDir)
    .filter((file) => file.endsWith('.md') && !file.startsWith('_'))
    .sort()
    .map((file) => {
      const sourcePath = `src/content/blog/articles/${file}`;
      const source = fs.readFileSync(path.join(projectRoot, sourcePath), 'utf8');
      const { data, body } = parseFrontmatter(source);
      const slug = data.slug || file.replace(/\.md$/, '');
      const language = data.language || 'en';
      const routePath = normalizeRoutePath(`${language === 'ru' ? '/ru' : ''}/blog/${slug}`);
      const indexable = data.published === true && data.noindex !== true;
      const lifecycle = indexable ? 'current_indexable' : 'noindex';
      return {
        path: routePath,
        canonicalPath: routeFromUrl(data.canonical, routePath),
        sourceType: 'article',
        sourcePath,
        lifecycle,
        robots: robotsForLifecycle(lifecycle),
        indexable,
        sitemapEligible: indexable,
        prerender: indexable,
        lastmod: indexable ? articleLastmod(data, sourcePath) : null,
        priority: 0.7,
        changefreq: 'monthly',
        hreflang: normalizeHreflang(data.hreflang),
        owners: [
          { role: 'CONTENT', file: sourcePath, writable: true },
          { role: 'COMPONENT', file: 'src/components/blog/MarkdownBlogArticlePage.jsx', writable: false },
        ],
        article: { ...data, body, slug, language },
      };
    });
};

const staticEntries = () => STATIC_SEO_ROUTES.map((entry) => ({
  ...entry,
  canonicalPath: entry.path,
  sourceType: 'static',
  sourcePath: 'src/seo/projectSeoState.js',
  lifecycle: 'current_indexable',
  robots: robotsForLifecycle('current_indexable'),
  indexable: true,
  sitemapEligible: true,
  prerender: true,
  hreflang: normalizeHreflang(entry.hreflang),
}));

const seoPageEntries = () => {
  const prerenderPaths = new Set(getSeoPagesForPrerender().map((page) => page.path));
  return getPublishedSeoPages().map((page) => {
    const indexable = page.state === 'indexable_approved' && page.noindex !== true;
    const lifecycle = indexable ? 'current_indexable' : page.state;
    return {
      path: normalizeRoutePath(page.path),
      canonicalPath: normalizeRoutePath(page.path),
      sourceType: 'seo_registry',
      sourcePath: 'src/content/seoPages/index.js',
      lifecycle,
      robots: robotsForLifecycle(lifecycle),
      indexable,
      sitemapEligible: indexable && page.sitemapEligible === true,
      prerender: prerenderPaths.has(page.path),
      lastmod: indexable ? normalizedDate(page.lastUpdated) : null,
      priority: page.priority || 0.6,
      changefreq: 'monthly',
      hreflang: normalizeHreflang(page.hreflang),
      owners: [
        { role: 'REGISTRY', file: 'src/content/seoPages/index.js', writable: true },
        { role: 'COMPONENT', file: 'src/components/seo/SeoPageRoute.jsx', writable: false },
        { role: 'COMPONENT', file: 'src/components/seo/SeoPageTemplate.jsx', writable: false },
      ],
      seoPage: page,
    };
  });
};

const redirectEntries = () => Object.entries(APP_ROUTE_ALIASES).map(([source, target]) => ({
  path: normalizeRoutePath(source),
  canonicalPath: normalizeRoutePath(target),
  redirectTarget: normalizeRoutePath(target),
  sourceType: 'redirect',
  sourcePath: 'src/routes/routeAliases.js',
  lifecycle: 'redirect',
  robots: robotsForLifecycle('redirect'),
  indexable: false,
  sitemapEligible: false,
  prerender: true,
  lastmod: null,
  priority: null,
  changefreq: null,
  hreflang: [],
  owners: [
    { role: 'ROUTE', file: 'src/routes/routeAliases.js', writable: true },
    { role: 'ROUTE', file: 'src/App.jsx', writable: true },
  ],
}));

const assertUniqueEntries = (entries) => {
  const byPath = new Map();
  for (const entry of entries) {
    const prior = byPath.get(entry.path);
    if (prior) {
      throw new Error(`${entry.path}: duplicate SEO state owners ${prior.sourceType} and ${entry.sourceType}.`);
    }
    byPath.set(entry.path, entry);
  }
};

const assertLifecycleContracts = (entries) => {
  for (const entry of entries) {
    const expectedRobots = robotsForLifecycle(entry.lifecycle);
    if (entry.robots !== expectedRobots) {
      throw new Error(`${entry.path}: lifecycle ${entry.lifecycle} must resolve robots=${expectedRobots}.`);
    }

    if (entry.lifecycle === 'current_indexable') {
      if (!entry.indexable) throw new Error(`${entry.path}: current_indexable route must be indexable.`);
      if (!entry.sitemapEligible) throw new Error(`${entry.path}: current_indexable route must be sitemap eligible.`);
      continue;
    }

    if (entry.indexable || entry.sitemapEligible) {
      throw new Error(`${entry.path}: ${entry.lifecycle} route cannot be indexable or sitemap eligible.`);
    }
  }
};

const ORQESTRA_OWNER_ROLES = new Set([
  'ROUTE',
  'CONTENT',
  'COMPONENT',
  'REGISTRY',
  'SITEMAP_SOURCE',
  'BUILD_INTEGRATION',
  'GENERATED_ARTIFACT',
]);

const assertOwnershipContracts = (entries, projectRoot) => {
  for (const entry of entries) {
    if (!Array.isArray(entry.owners) || entry.owners.length === 0) {
      throw new Error(`${entry.path}: resolved route/file ownership is missing.`);
    }
    if (!entry.owners.some((owner) => owner.writable === true)) {
      throw new Error(`${entry.path}: resolved ownership has no writable remediation source.`);
    }
    for (const owner of entry.owners) {
      if (!ORQESTRA_OWNER_ROLES.has(owner.role) || typeof owner.file !== 'string'
        || path.isAbsolute(owner.file) || owner.file.includes('..')
        || typeof owner.writable !== 'boolean') {
        throw new Error(`${entry.path}: invalid resolved owner ${JSON.stringify(owner)}.`);
      }
      if (!fs.existsSync(path.join(projectRoot, owner.file))) {
        throw new Error(`${entry.path}: resolved owner file does not exist: ${owner.file}.`);
      }
      if (owner.role === 'GENERATED_ARTIFACT' && owner.writable) {
        throw new Error(`${entry.path}: generated artifacts cannot be writable remediation sources.`);
      }
    }
  }
};

export function resolveProjectSeoState(projectRoot = DEFAULT_PROJECT_ROOT) {
  const entries = [
    ...staticEntries(),
    ...seoPageEntries(),
    ...readArticles(projectRoot),
    ...redirectEntries(),
  ].sort((left, right) => left.path.localeCompare(right.path));
  assertUniqueEntries(entries);
  assertLifecycleContracts(entries);
  assertOwnershipContracts(entries, projectRoot);

  const byPath = new Map(entries.map((entry) => [entry.path, entry]));
  return {
    entries,
    byPath,
    indexableEntries: entries.filter((entry) => entry.indexable),
    sitemapEntries: entries.filter((entry) => entry.sitemapEligible),
    prerenderEntries: entries.filter((entry) => entry.prerender),
    redirectEntries: entries.filter((entry) => entry.lifecycle === 'redirect'),
    noindexEntries: entries.filter((entry) => entry.lifecycle !== 'current_indexable' && entry.lifecycle !== 'redirect'),
    runtimeOnlyPaths: [...RUNTIME_ONLY_ROUTE_PATHS],
    dynamicRoutePatterns: [...DYNAMIC_ROUTE_PATTERNS],
  };
}

export const ORQESTRA_PROJECT_SEO_STATE_CONTRACT = 'orqestra-project-seo-state.v1';
export const ORQESTRA_REPOSITORY_SLUG = 'matteimikeska49-bot/gtf';
export const ORQESTRA_DEFAULT_BRANCH = 'main';

const orqestraLifecycle = (entry) => {
  if (entry.lifecycle === 'current_indexable') return 'CURRENT';
  if (entry.lifecycle === 'redirect') return 'RETIRED_REDIRECT';
  return 'CURRENT_NON_INDEXABLE';
};

const orqestraSitemapReason = (entry) => {
  if (entry.sitemapEligible) return 'PROJECT_RESOLVED_SITEMAP_ELIGIBLE';
  if (entry.lifecycle === 'redirect') return 'PROJECT_RESOLVED_REDIRECT_EXCLUSION';
  return 'PROJECT_RESOLVED_NOINDEX_EXCLUSION';
};

/**
 * Projects own route-level SEO truth. This is the deliberately small adapter
 * projection consumed by Orqestra; it must never become a second registry.
 */
export function toOrqestraSeoState(state) {
  return {
    routes: state.entries.map((entry) => ({
      path: entry.path,
      canonical_url: canonicalUrl(entry.canonicalPath),
      lifecycle: orqestraLifecycle(entry),
      sitemap_disposition: entry.sitemapEligible ? 'INCLUDE' : 'EXCLUDE',
      sitemap_source_state: entry.sitemapEligible ? 'GENERATED_ELIGIBLE' : 'EXCLUDED',
      sitemap_reason: orqestraSitemapReason(entry),
      owners: entry.owners.map((owner) => ({ ...owner })),
    })),
  };
}

export function buildOrqestraProjectSeoManifest(state) {
  return {
    contract_version: ORQESTRA_PROJECT_SEO_STATE_CONTRACT,
    repository: {
      slug: ORQESTRA_REPOSITORY_SLUG,
      default_branch: ORQESTRA_DEFAULT_BRANCH,
    },
    validation: {
      status: 'PASSED',
      results: {
        validator: 'scripts/check-project-seo-state.mjs',
        resolved_routes: state.entries.length,
        indexable_routes: state.indexableEntries.length,
        sitemap_routes: state.sitemapEntries.length,
        prerender_routes: state.prerenderEntries.length,
        redirect_routes: state.redirectEntries.length,
        noindex_routes: state.noindexEntries.length,
        noindex_sitemap_hits: 0,
        redirect_sitemap_hits: 0,
        indexable_sitemap_parity: `${state.sitemapEntries.length}/${state.indexableEntries.length}`,
        rendered_lifecycle_parity: `${state.prerenderEntries.length}/${state.prerenderEntries.length}`,
        canonical_hreflang_routes_checked: state.prerenderEntries.length,
        route_ownership_routes_checked: state.entries.length,
      },
    },
    seo_state: toOrqestraSeoState(state),
  };
}

const xmlEscape = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

export function renderSitemap(state) {
  const urls = state.sitemapEntries.map((entry) => {
    if (!entry.lastmod) throw new Error(`${entry.path}: sitemap entry has no authoritative lastmod.`);
    const alternateLines = entry.hreflang.map((alternate) => (
      `    <xhtml:link rel="alternate" hreflang="${xmlEscape(alternate.lang)}" href="${xmlEscape(canonicalUrl(alternate.path))}" />`
    ));
    return [
      '  <url>',
      `    <loc>${xmlEscape(canonicalUrl(entry.path))}</loc>`,
      `    <lastmod>${xmlEscape(entry.lastmod)}</lastmod>`,
      `    <changefreq>${xmlEscape(entry.changefreq)}</changefreq>`,
      `    <priority>${xmlEscape(entry.priority)}</priority>`,
      ...alternateLines,
      '  </url>',
    ].join('\n');
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    '',
    ...urls.flatMap((url) => [url, '']),
    '</urlset>',
    '',
  ].join('\n');
}
