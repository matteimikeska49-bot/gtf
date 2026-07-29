import { existsSync, readdirSync, readFileSync } from 'fs';
import path from 'path';
import {
  getAllSeoPages,
  getSeoPageRecordByPath,
  getSeoPageByPath,
} from '../src/content/seoPages/index.js';
import { isSeoPageRoutable } from '../src/content/seoPages/helpers/sitemapEligibility.js';
import { PROTECTED_RU_PRODUCT_TOOL_ROUTES, PROTECTED_RU_SYSTEM_ROUTES } from '../src/content/seoPages/protectedRoutes.js';
import { APP_ROUTE_ALIASES } from '../src/routes/routeAliases.js';

const blogDir = 'src/content/blog/articles';
const errors = [];
const publicBlogSlugs = new Set();
const redirectTargetPath = '/ru/ii-generator-karuseley';
const redirectSourcePath = Object.entries(APP_ROUTE_ALIASES)
  .find(([, targetPath]) => targetPath === redirectTargetPath)?.[0];

const sourceScanRoots = ['src', 'public', 'scripts'];
const historicalSourcePrefixes = [
  'src/content/blog/briefs/',
  'src/content/seoPages/handoffs/',
  'src/content/seoPages/planning/',
];
const historicalSourceFiles = new Set([
  'src/content/blog/ru-wave-1-topic-plan.json',
  'src/content/seoPages/README.md',
  'src/content/seoPages/SYSTEM_MANIFEST.md',
]);
const redirectTechnicalFiles = new Set([
  'src/App.jsx',
  'src/routes/routeAliases.js',
  'src/content/seoPages/index.js',
  'src/content/seoPages/protectedRoutes.js',
  'public/.htaccess',
]);
const scannedExtensions = new Set(['.js', '.jsx', '.mjs', '.json', '.md', '.txt', '.xml']);

const collectFiles = (entryPath) => {
  if (!existsSync(entryPath)) return [];
  const entries = readdirSync(entryPath, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const childPath = path.join(entryPath, entry.name);
    return entry.isDirectory() ? collectFiles(childPath) : [childPath];
  });
};

if (!redirectSourcePath) {
  errors.push(`Missing redirect alias targeting ${redirectTargetPath}`);
} else {
  for (const sourceFile of sourceScanRoots.flatMap(collectFiles)) {
    const normalizedPath = sourceFile.split(path.sep).join('/');
    if (
      redirectTechnicalFiles.has(normalizedPath)
      || historicalSourceFiles.has(normalizedPath)
      || historicalSourcePrefixes.some((prefix) => normalizedPath.startsWith(prefix))
    ) {
      continue;
    }

    const extension = path.extname(normalizedPath);
    if (!scannedExtensions.has(extension)) continue;

    const source = readFileSync(sourceFile, 'utf8');
    if (source.includes(redirectSourcePath)) {
      errors.push(`${normalizedPath}: contains redirect source path ${redirectSourcePath}`);
    }
  }

  const distDir = 'dist';
  const renderedHrefPattern = new RegExp(
    `href=(["'])(?:https://gotoflow\\.io)?${redirectSourcePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:[/#?][^"']*)?\\1`,
    'g',
  );

  for (const htmlFile of existsSync(distDir) ? collectFiles(distDir).filter((file) => file.endsWith('.html')) : []) {
    const html = readFileSync(htmlFile, 'utf8');
    const matches = html.match(renderedHrefPattern) || [];
    if (matches.length > 0) {
      errors.push(`${htmlFile}: contains ${matches.length} rendered href(s) to redirect source ${redirectSourcePath}`);
    }
  }
}

for (const file of existsSync(blogDir) ? readdirSync(blogDir) : []) {
  if (!file.endsWith('.md') || file.startsWith('_')) continue;
  const source = readFileSync(path.join(blogDir, file), 'utf8');
  const slug = source.match(/^slug:\s*["']?([^"'\n]+)["']?/m)?.[1]?.trim() || file.replace(/\.md$/, '');
  const published = /^published:\s*(true|"true"|'true')\s*$/m.test(source);
  const noindex = /^noindex:\s*(true|"true"|'true')\s*$/m.test(source);
  if (published && !noindex) publicBlogSlugs.add(slug);
}

const protectedPaths = new Set([
  ...Object.keys(PROTECTED_RU_PRODUCT_TOOL_ROUTES),
  ...Object.keys(PROTECTED_RU_SYSTEM_ROUTES),
]);

for (const page of getAllSeoPages()) {
  for (const slug of page.relatedBlogSlugs || []) {
    if (!publicBlogSlugs.has(slug)) {
      errors.push(`${page.id}: relatedBlogSlugs contains missing/unpublished/noindex slug ${slug}`);
    }
  }

  for (const relatedPath of page.relatedSeoPaths || []) {
    const relatedPage = getSeoPageRecordByPath(relatedPath);
    if (!relatedPage) {
      errors.push(`${page.id}: relatedSeoPaths contains missing SEO registry path ${relatedPath}`);
      continue;
    }

    if (isSeoPageRoutable(page) && !getSeoPageByPath(relatedPath)) {
      errors.push(`${page.id}: routable page links to non-routable SEO page ${relatedPath}`);
    }
  }

  for (const productPath of page.relatedProductToolPaths || []) {
    if (!protectedPaths.has(productPath) && !getSeoPageRecordByPath(productPath)) {
      errors.push(`${page.id}: relatedProductToolPaths contains unknown route ${productPath}`);
    }
  }
}

console.log('SEO related links check');
console.log(`- public blog slugs: ${publicBlogSlugs.size}`);
console.log(`- registry records checked: ${getAllSeoPages().length}`);
console.log(`- redirect link source checked: ${redirectSourcePath || 'missing'}`);

if (errors.length > 0) {
  console.error('\nSEO related links check failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('SEO related links check passed.');
