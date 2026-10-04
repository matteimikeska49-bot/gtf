import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveProjectSeoState } from './lib/project-seo-state.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const requestedBase = process.env.SEO_INDEXATION_BASE_REF || 'origin/main';

const git = (args) => execFileSync('git', args, {
  cwd: root,
  encoding: 'utf8',
  maxBuffer: 64 * 1024 * 1024,
}).trim();

const baseRef = git(['merge-base', 'HEAD', requestedBase]);
const state = resolveProjectSeoState(root);
const errors = [];

const normalizeRoutePath = (value) => {
  if (!value || value === '/') return '/';
  return `/${String(value).replace(/^\/+/, '').replace(/\/+$/, '')}`;
};

const routeFromDistFile = (file) => {
  if (file === 'dist/index.html') return '/';
  return normalizeRoutePath(file.slice('dist/'.length, -'/index.html'.length));
};

const readBaseFile = (file) => {
  try {
    return git(['show', `${baseRef}:${file}`]);
  } catch {
    return '';
  }
};

const robotsFromHtml = (html) => {
  const tag = html.match(/<meta\b[^>]*name=["']robots["'][^>]*>/i)?.[0]
    || html.match(/<meta\b[^>]*content=["'][^"']*["'][^>]*name=["']robots["'][^>]*>/i)?.[0]
    || '';
  return tag.match(/content=["']([^"']+)["']/i)?.[1].toLowerCase() || 'index, follow';
};

const sitemapRoutes = (xml) => new Set(
  [...xml.matchAll(/<loc>https:\/\/gotoflow\.io([^<]*)<\/loc>/g)]
    .map((match) => normalizeRoutePath(match[1] || '/')),
);

const baseSitemapRoutes = sitemapRoutes(readBaseFile('dist/sitemap.xml'));
const baseHtmlFiles = git(['ls-tree', '-r', '--name-only', baseRef, 'dist'])
  .split('\n')
  .filter((file) => file === 'dist/index.html' || file.endsWith('/index.html'));
const baseDisposition = new Map();

for (const file of baseHtmlFiles) {
  const routePath = routeFromDistFile(file);
  const robots = robotsFromHtml(readBaseFile(file));
  baseDisposition.set(routePath, {
    indexable: !robots.includes('noindex'),
    robots,
    sitemap: baseSitemapRoutes.has(routePath),
  });
}
for (const routePath of baseSitemapRoutes) {
  if (!baseDisposition.has(routePath)) {
    baseDisposition.set(routePath, { indexable: true, robots: 'index, follow', sitemap: true });
  }
}

const currentSitemapRoutes = sitemapRoutes(fs.readFileSync(path.join(root, 'dist/sitemap.xml'), 'utf8'));
const currentDisposition = new Map();
const walkCurrentHtml = (directory) => {
  for (const item of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, item.name);
    if (item.isDirectory()) {
      walkCurrentHtml(fullPath);
      continue;
    }
    if (item.name !== 'index.html') continue;
    const relative = path.relative(root, fullPath).split(path.sep).join('/');
    const routePath = routeFromDistFile(relative);
    const robots = robotsFromHtml(fs.readFileSync(fullPath, 'utf8'));
    currentDisposition.set(routePath, {
      indexable: !robots.includes('noindex'),
      robots,
      sitemap: currentSitemapRoutes.has(routePath),
    });
  }
};
walkCurrentHtml(path.join(root, 'dist'));
for (const routePath of currentSitemapRoutes) {
  if (!currentDisposition.has(routePath)) {
    currentDisposition.set(routePath, { indexable: true, robots: 'index, follow', sitemap: true });
  }
}

let unchanged = 0;
let explicitRedirectTransitions = 0;
let baseNoindexRoutes = 0;
const redirectTransitionPaths = [];

for (const [routePath, before] of baseDisposition) {
  if (!before.indexable) baseNoindexRoutes += 1;
  const resolved = state.byPath.get(routePath);
  const after = currentDisposition.get(routePath);
  if (!resolved) {
    errors.push(`${routePath}: approved-base route is missing from resolved Project SEO State.`);
    continue;
  }
  if (!after) {
    errors.push(`${routePath}: approved-base route is missing from current rendered artifacts.`);
    continue;
  }
  if (after.indexable !== resolved.indexable) {
    errors.push(`${routePath}: current rendered indexation does not match resolved lifecycle ${resolved.lifecycle}.`);
    continue;
  }
  if (before.indexable === after.indexable) {
    unchanged += 1;
    continue;
  }
  if (before.indexable && resolved.lifecycle === 'redirect') {
    explicitRedirectTransitions += 1;
    redirectTransitionPaths.push(routePath);
    continue;
  }
  if (!before.indexable && after.indexable) {
    errors.push(`${routePath}: unauthorized approved-base noindex -> index transition.`);
    continue;
  }
  errors.push(`${routePath}: unauthorized approved-base index -> ${resolved.lifecycle} transition.`);
}

console.log('SEO indexation regression contract');
console.log(`- approved base: ${baseRef}`);
console.log(`- existing routes compared: ${baseDisposition.size}`);
console.log(`- approved-base noindex routes: ${baseNoindexRoutes}`);
console.log(`- unchanged indexation dispositions: ${unchanged}`);
console.log(`- explicit route-alias transitions: ${explicitRedirectTransitions}`);
for (const routePath of redirectTransitionPaths) console.log(`  - ${routePath}`);
console.log(`- unintended indexation transitions: ${errors.length}`);

if (errors.length) {
  console.error(`\nSEO indexation regression contract failed (${errors.length}):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('SEO indexation regression contract passed.');
