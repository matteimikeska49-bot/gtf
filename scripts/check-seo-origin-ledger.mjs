import { existsSync, readFileSync } from 'fs';
import { getAllSeoPages } from '../src/content/seoPages/index.js';
import { isValidSeoUrlOrigin } from '../src/content/seoPages/helpers/originLedger.js';

const ledgerPath = 'scratch/seo-demand-imports/2026-07-06/seo-url-origin-ledger-2026-07-08.csv';
const errors = [];

if (!existsSync(ledgerPath)) {
  errors.push(`Missing URL origin ledger: ${ledgerPath}`);
}

const ledger = existsSync(ledgerPath) ? readFileSync(ledgerPath, 'utf8') : '';
const pages = getAllSeoPages();

for (const page of pages) {
  if (!isValidSeoUrlOrigin(page.urlOrigin)) {
    errors.push(`${page.id}: invalid urlOrigin ${page.urlOrigin}`);
  }

  if (!page.urlOriginEvidence?.length) {
    errors.push(`${page.id}: missing urlOriginEvidence`);
  }

  if (!ledger.includes(page.path)) {
    errors.push(`${page.id}: path ${page.path} is not documented in ${ledgerPath}`);
  }

  if (
    page.urlOrigin === 'existing_sitemap_blog' &&
    ['noindex_review', 'indexable_approved'].includes(page.state)
  ) {
    errors.push(`${page.id}: existing blog article origin cannot justify commercial runtime state ${page.state}`);
  }

  if (
    page.urlOrigin === 'existing_sitemap_product_tool' &&
    page.state !== 'planning_only' &&
    page.ownershipDecision?.migration?.approvedByHuman !== true
  ) {
    errors.push(`${page.id}: protected existing product/tool URL must stay planning_only without approved migration`);
  }

  if (
    page.state === 'indexable_approved' &&
    (page.approvedByHuman !== true || page.indexationApproved !== true)
  ) {
    errors.push(`${page.id}: indexable_approved requires approvedByHuman and indexationApproved`);
  }
}

console.log('SEO URL origin ledger check');
console.log(`- ledger: ${ledgerPath}`);
console.log(`- registry records checked: ${pages.length}`);

if (errors.length > 0) {
  console.error('\nSEO URL origin ledger check failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('SEO URL origin ledger check passed.');
