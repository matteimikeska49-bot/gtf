import { existsSync, readFileSync } from 'fs';
import {
  getAllSeoPages,
  getSeoPagesForSitemap,
  getSeoPagesForPrerender,
} from '../src/content/seoPages/index.js';

const errors = [];
const pages = getAllSeoPages();
const sitemapPages = getSeoPagesForSitemap();
const prerenderPages = getSeoPagesForPrerender();
const sitemapPath = 'dist/sitemap.xml';
const sitemap = existsSync(sitemapPath) ? readFileSync(sitemapPath, 'utf8') : '';

for (const page of pages) {
  const inHelperSitemap = sitemapPages.some((item) => item.path === page.path);
  const inHelperPrerender = prerenderPages.some((item) => item.path === page.path);
  const inDistSitemap = sitemap.includes(`<loc>https://gotoflow.io${page.path}</loc>`);

  if (['planning_only', 'quarantined_review', 'noindex_review'].includes(page.state) && inHelperSitemap) {
    errors.push(`${page.id}: ${page.state} page appears in SEO sitemap helper output`);
  }

  if (['planning_only', 'quarantined_review'].includes(page.state) && inHelperPrerender) {
    errors.push(`${page.id}: ${page.state} page appears in SEO prerender helper output`);
  }

  if (page.noindex === true && inHelperSitemap) {
    errors.push(`${page.id}: noindex page appears in SEO sitemap helper output`);
  }

  if (page.noindex === true && inDistSitemap && page.urlOrigin !== 'existing_sitemap_product_tool') {
    errors.push(`${page.id}: noindex registry path appears in dist/sitemap.xml`);
  }

  if (page.state === 'indexable_approved') {
    if (page.approvedByHuman !== true) errors.push(`${page.id}: indexable page lacks approvedByHuman`);
    if (page.indexationApproved !== true) errors.push(`${page.id}: indexable page lacks indexationApproved`);
    if (page.sitemapEligible !== true) errors.push(`${page.id}: indexable page lacks sitemapEligible`);
  }
}

for (const routePath of [...sitemap.matchAll(/<loc>https:\/\/gotoflow\.io([^<]+)<\/loc>/g)].map((match) => match[1])) {
  if (routePath.includes(':') || routePath.includes('${') || routePath.includes('...')) {
    errors.push(`Placeholder route appears in sitemap: ${routePath}`);
  }
}

console.log('SEO sitemap eligibility check');
console.log(`- SEO sitemap helper pages: ${sitemapPages.length}`);
console.log(`- SEO prerender helper pages: ${prerenderPages.length}`);

if (errors.length > 0) {
  console.error('\nSEO sitemap eligibility check failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('SEO sitemap eligibility check passed.');
