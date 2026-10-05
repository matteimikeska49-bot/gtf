import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  buildOrqestraProjectSeoManifest,
  canonicalUrl,
  resolveProjectSeoState,
} from './lib/project-seo-state.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputPath = path.join(root, '.orqestra/project-seo-state.json');
const checkOnly = process.argv.includes('--check');

// PASSED is emitted only after the project's existing rendered-state validator
// has accepted the same resolver inputs and generated production artifacts.
execFileSync(process.execPath, ['scripts/check-project-seo-state.mjs'], {
  cwd: root,
  stdio: 'inherit',
});

const state = resolveProjectSeoState(root);
const manifest = buildOrqestraProjectSeoManifest(state);
const serialized = `${JSON.stringify(manifest, null, 2)}\n`;
const errors = [];

const route = (routePath) => manifest.seo_state.routes.find((entry) => entry.path === routePath);
const assertRoute = (routePath, expected) => {
  const actual = route(routePath);
  if (!actual) {
    errors.push(`${routePath}: missing from Orqestra projection.`);
    return;
  }
  for (const [key, value] of Object.entries(expected)) {
    if (actual[key] !== value) errors.push(`${routePath}: ${key}=${actual[key]} != ${value}.`);
  }
};

const assertOwners = (routePath, expectedOwners) => {
  const actual = route(routePath);
  if (!actual) return;
  const actualOwners = new Set(actual.owners.map((owner) => `${owner.role}:${owner.file}:${owner.writable}`));
  for (const owner of expectedOwners) {
    if (!actualOwners.has(owner)) errors.push(`${routePath}: missing resolved owner ${owner}.`);
  }
};

if (Object.hasOwn(manifest, 'revision')) errors.push('Manifest must not contain a self-referential revision field.');
if (serialized.includes('"body"')) errors.push('Manifest must not export article bodies.');
if (manifest.seo_state.routes.length !== state.entries.length) errors.push('Every resolved route must be projected exactly once.');
if (new Set(manifest.seo_state.routes.map((entry) => entry.path)).size !== state.entries.length) {
  errors.push('Projected route paths must be unique.');
}
for (const entry of manifest.seo_state.routes) {
  if (!entry.owners.length || entry.owners.some((owner) => !owner.file)) {
    errors.push(`${entry.path}: route/file ownership is missing.`);
  }
}

assertRoute('/ru/use-cases/foto-v-karusel', {
  lifecycle: 'CURRENT_NON_INDEXABLE',
  sitemap_disposition: 'EXCLUDE',
});
assertOwners('/ru/use-cases/foto-v-karusel', [
  'REGISTRY:src/content/seoPages/index.js:true',
  'COMPONENT:src/components/seo/SeoPageRoute.jsx:false',
]);
assertRoute('/ai-linkedin-post-generator', {
  canonical_url: canonicalUrl('/linkedin-post-generator'),
  lifecycle: 'RETIRED_REDIRECT',
  sitemap_disposition: 'EXCLUDE',
});
assertOwners('/ai-linkedin-post-generator', [
  'ROUTE:src/routes/routeAliases.js:true',
  'ROUTE:src/App.jsx:true',
]);
assertOwners('/instagram-carousel-maker', [
  'REGISTRY:src/seo/projectSeoState.js:true',
  'ROUTE:src/App.jsx:true',
  'COMPONENT:src/components/CarouselPage.jsx:true',
  'COMPONENT:src/components/carousel/CarouselSections.jsx:true',
]);
assertOwners('/linkedin-post-generator', [
  'REGISTRY:src/content/seoPages/index.js:true',
  'COMPONENT:src/components/seo/SeoPageRoute.jsx:false',
]);
assertOwners('/ru/blog/karusel-dlya-instagram', [
  'CONTENT:src/content/blog/articles/karusel-dlya-instagram.md:true',
  'COMPONENT:src/components/blog/MarkdownBlogArticlePage.jsx:false',
]);
for (const routePath of [
  '/instagram-carousel-maker',
  '/linkedin-post-generator',
  '/ru/generator-karuselej-instagram',
  '/ru/ii-generator-postov-dlya-linkedin',
]) {
  assertRoute(routePath, {
    canonical_url: canonicalUrl(routePath),
    lifecycle: 'CURRENT',
    sitemap_disposition: 'INCLUDE',
  });
}

// Prove the projection is deterministic and changes when authoritative state
// changes, without manufacturing any additional project truth.
const secondPass = `${JSON.stringify(buildOrqestraProjectSeoManifest(resolveProjectSeoState(root)), null, 2)}\n`;
if (serialized !== secondPass) errors.push('Manifest generation is not deterministic.');
const changedState = resolveProjectSeoState(root);
changedState.entries = changedState.entries.map((entry, index) => (
  index === 0 ? { ...entry, canonicalPath: `${entry.path}-determinism-check` } : entry
));
const changedProjection = JSON.stringify(buildOrqestraProjectSeoManifest(changedState));
if (changedProjection === JSON.stringify(manifest)) errors.push('Authoritative-state changes do not affect the manifest.');

if (errors.length) {
  console.error(`Orqestra Project SEO State manifest failed (${errors.length}):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

if (checkOnly) {
  if (!fs.existsSync(outputPath)) {
    console.error('.orqestra/project-seo-state.json is missing.');
    process.exit(1);
  }
  const committed = fs.readFileSync(outputPath, 'utf8');
  if (committed !== serialized) {
    console.error('.orqestra/project-seo-state.json is stale. Run npm run build:orqestra-seo-manifest.');
    process.exit(1);
  }
  console.log('Orqestra Project SEO State manifest is valid and current.');
} else {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, serialized, 'utf8');
  console.log(`Wrote ${path.relative(root, outputPath)} (${state.entries.length} routes).`);
}
