import { existsSync, readdirSync, readFileSync } from 'fs';
import path from 'path';
import {
  getAllSeoPages,
  getSeoPageRecordByPath,
  getSeoPageByPath,
} from '../src/content/seoPages/index.js';
import { isSeoPageRoutable } from '../src/content/seoPages/helpers/sitemapEligibility.js';
import { PROTECTED_RU_PRODUCT_TOOL_ROUTES, PROTECTED_RU_SYSTEM_ROUTES } from '../src/content/seoPages/protectedRoutes.js';

const blogDir = 'src/content/blog/articles';
const errors = [];
const publicBlogSlugs = new Set();

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

if (errors.length > 0) {
  console.error('\nSEO related links check failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('SEO related links check passed.');
