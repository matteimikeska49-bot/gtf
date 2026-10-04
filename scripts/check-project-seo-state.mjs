import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  canonicalUrl,
  normalizeRoutePath,
  resolveProjectSeoState,
  ROBOTS_BY_LIFECYCLE,
} from './lib/project-seo-state.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const state = resolveProjectSeoState(root);
const errors = [];
let noindexSitemapHits = 0;
let redirectSitemapHits = 0;
let sitemapParityMatches = 0;
let renderedLifecycleMatches = 0;

const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');
const attr = (tag, name) => tag.match(new RegExp(`${name}=["']([^"']+)["']`, 'i'))?.[1] || '';
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map((match) => match[0]);
const routeFile = (routePath) => path.join(dist, routePath === '/' ? '' : routePath.slice(1), 'index.html');

const appSource = read('src/App.jsx');
const appPaths = [...appSource.matchAll(/<Route\s+path="([^"]+)"/g)].map((match) => normalizeRoutePath(match[1]));
for (const routePath of appPaths) {
  if (routePath.includes(':') || routePath === '/*' || routePath === '*') continue;
  if (!state.byPath.has(routePath) && !state.runtimeOnlyPaths.includes(routePath)) {
    errors.push(`App route is not classified by project SEO state: ${routePath}`);
  }
}
for (const entry of state.entries) {
  if (!appPaths.includes(entry.path) && !['article', 'seo_registry'].includes(entry.sourceType)) {
    errors.push(`Resolved concrete route is missing from App.jsx: ${entry.path}`);
  }
}

for (const entry of state.redirectEntries) {
  const target = state.byPath.get(entry.redirectTarget);
  if (!target?.indexable) errors.push(`${entry.path}: redirect target is not an indexable owner: ${entry.redirectTarget}`);
}

for (const entry of state.entries) {
  const expectedRobots = ROBOTS_BY_LIFECYCLE[entry.lifecycle];
  if (!expectedRobots) errors.push(`${entry.path}: unsupported lifecycle ${entry.lifecycle}.`);
  if (entry.lifecycle === 'current_indexable') {
    if (!entry.indexable) errors.push(`${entry.path}: current_indexable route is not indexable.`);
    if (!entry.sitemapEligible) errors.push(`${entry.path}: current_indexable route is not sitemap eligible.`);
    continue;
  }
  if (entry.indexable) errors.push(`${entry.path}: ${entry.lifecycle} route is unexpectedly indexable.`);
  if (entry.sitemapEligible) errors.push(`${entry.path}: ${entry.lifecycle} route is unexpectedly sitemap eligible.`);
}

const sitemapPath = path.join(dist, 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  errors.push('dist/sitemap.xml is missing.');
} else {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const blocks = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => match[1]);
  const seen = new Map();
  for (const block of blocks) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1] || '';
    let routePath = '';
    try { routePath = normalizeRoutePath(new URL(loc).pathname); } catch { errors.push(`Invalid sitemap loc: ${loc}`); continue; }
    seen.set(routePath, (seen.get(routePath) || 0) + 1);
    const expected = state.byPath.get(routePath);
    if (!expected?.sitemapEligible) errors.push(`${routePath}: unexpected or ineligible sitemap route.`);
    if (expected && !expected.indexable && expected.lifecycle !== 'redirect') noindexSitemapHits += 1;
    if (expected?.lifecycle === 'redirect') redirectSitemapHits += 1;
    const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] || '';
    if (expected && lastmod !== expected.lastmod) errors.push(`${routePath}: sitemap lastmod ${lastmod} != ${expected.lastmod}.`);
  }
  for (const entry of state.sitemapEntries) {
    if ((seen.get(entry.path) || 0) !== 1) {
      errors.push(`${entry.path}: expected exactly once in sitemap, got ${seen.get(entry.path) || 0}.`);
    } else {
      sitemapParityMatches += 1;
    }
  }
  if (blocks.length !== state.sitemapEntries.length) errors.push(`Sitemap count ${blocks.length} != resolved count ${state.sitemapEntries.length}.`);
}

if (noindexSitemapHits !== 0) errors.push(`Noindex routes found in sitemap: ${noindexSitemapHits}.`);
if (redirectSitemapHits !== 0) errors.push(`Redirect routes found in sitemap: ${redirectSitemapHits}.`);

const actualHtml = [];
if (fs.existsSync(dist)) {
  const walk = (dir) => {
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, item.name);
      if (item.isDirectory()) walk(full);
      else if (item.name === 'index.html') actualHtml.push(full);
    }
  };
  walk(dist);
}
const expectedFiles = new Set(state.prerenderEntries.map((entry) => path.resolve(routeFile(entry.path))));
for (const file of actualHtml) if (!expectedFiles.has(path.resolve(file))) errors.push(`Orphan rendered HTML: ${path.relative(root, file)}`);

for (const entry of state.prerenderEntries) {
  const file = routeFile(entry.path);
  if (!fs.existsSync(file)) { errors.push(`${entry.path}: missing rendered HTML.`); continue; }
  const html = fs.readFileSync(file, 'utf8');
  const links = tags(html, 'link');
  const metas = tags(html, 'meta');
  const canonicalTags = links.filter((tag) => attr(tag, 'rel').toLowerCase() === 'canonical');
  if (canonicalTags.length !== 1 || attr(canonicalTags[0] || '', 'href') !== canonicalUrl(entry.canonicalPath)) {
    errors.push(`${entry.path}: rendered canonical does not match resolved owner.`);
  }
  const robotsTags = metas.filter((tag) => attr(tag, 'name').toLowerCase() === 'robots');
  const expectedRobots = ROBOTS_BY_LIFECYCLE[entry.lifecycle];
  if (robotsTags.length !== 1 || attr(robotsTags[0] || '', 'content').toLowerCase() !== expectedRobots) {
    errors.push(`${entry.path}: rendered robots must be exactly "${expectedRobots}".`);
  } else {
    renderedLifecycleMatches += 1;
  }
  const actualAlternates = links
    .filter((tag) => attr(tag, 'rel').toLowerCase() === 'alternate')
    .map((tag) => `${attr(tag, 'hreflang')}:${attr(tag, 'href')}`).sort();
  const expectedAlternates = entry.hreflang.map((item) => `${item.lang}:${canonicalUrl(item.path)}`).sort();
  if (JSON.stringify(actualAlternates) !== JSON.stringify(expectedAlternates)) errors.push(`${entry.path}: rendered hreflang differs from resolved state.`);
  for (const alternate of entry.hreflang) {
    const target = state.byPath.get(alternate.path);
    if (!target?.indexable) errors.push(`${entry.path}: hreflang target is not indexable: ${alternate.path}`);
    if (alternate.lang !== 'x-default' && !target?.hreflang.some((item) => item.path === entry.path)) {
      errors.push(`${entry.path}: hreflang is not reciprocal with ${alternate.path}.`);
    }
  }
  if (entry.lifecycle === 'redirect' && !html.includes(`http-equiv="refresh" content="0; url=${entry.redirectTarget}"`)) {
    errors.push(`${entry.path}: rendered redirect artifact lacks target refresh.`);
  }
}

const articleBySlug = new Map(state.entries.filter((entry) => entry.sourceType === 'article').map((entry) => [entry.article.slug, entry]));
const clusters = JSON.parse(read('src/content/blog/cluster-authority-map.json'));
for (const cluster of clusters.filter((item) => item.ownershipValidation === 'required')) {
  const owner = state.byPath.get(cluster.productRoute);
  if (!owner?.indexable) errors.push(`${cluster.clusterId}: product owner is not an indexable route: ${cluster.productRoute}.`);
  for (const role of cluster.articleRoles || []) {
    const article = articleBySlug.get(role.slug);
    if (!article?.indexable) continue;
    if (article.article.relatedProductRoute !== cluster.productRoute) {
      errors.push(`${role.slug}: relatedProductRoute ${article.article.relatedProductRoute || 'missing'} != cluster owner ${cluster.productRoute}.`);
    }
    const ownerLink = new RegExp(`\\]\\(${cluster.productRoute.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}(?:[)#?])`);
    if (!ownerLink.test(article.article.body)) errors.push(`${role.slug}: body does not link to cluster owner ${cluster.productRoute}.`);
    if (article.article.finalCta?.primaryHref !== cluster.productRoute) {
      errors.push(`${role.slug}: final CTA does not resolve to cluster owner ${cluster.productRoute}.`);
    }
  }
}

for (const [file, collection, statusKey] of [
  ['src/content/blog/cluster-authority-map.json', clusters.flatMap((cluster) => cluster.articleRoles || []), 'status'],
  ['src/content/blog/topic-map.json', JSON.parse(read('src/content/blog/topic-map.json')), 'publishStatus'],
]) {
  for (const record of collection) {
    const slug = record.slug || record.targetSlug;
    if (articleBySlug.get(slug)?.indexable && !['published', 'live_verified'].includes(record[statusKey])) {
      errors.push(`${file}: ${slug} is public/indexable but ${statusKey}=${record[statusKey] || 'missing'}.`);
    }
  }
}

console.log('Project SEO state contract');
console.log(`- resolved routes: ${state.entries.length}`);
console.log(`- indexable/sitemap routes: ${state.indexableEntries.length}/${state.sitemapEntries.length}`);
console.log(`- prerender/redirect/noindex: ${state.prerenderEntries.length}/${state.redirectEntries.length}/${state.noindexEntries.length}`);
console.log(`- noindex sitemap hits: ${noindexSitemapHits}`);
console.log(`- redirect sitemap hits: ${redirectSitemapHits}`);
console.log(`- indexable sitemap parity: ${sitemapParityMatches}/${state.indexableEntries.length}`);
console.log(`- rendered lifecycle parity: ${renderedLifecycleMatches}/${state.prerenderEntries.length}`);
if (errors.length) {
  console.error(`\nProject SEO state contract failed (${errors.length}):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log('Project SEO state contract passed.');
