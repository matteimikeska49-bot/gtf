import { getAllSeoPages } from '../src/content/seoPages/index.js';
import {
  getSeoProductClaimErrors,
  getSeoProductClaimSummary,
} from '../src/content/seoPages/helpers/productClaims.js';

const pages = getAllSeoPages();
const errors = pages.flatMap(getSeoProductClaimErrors);
const summary = getSeoProductClaimSummary(pages);

console.log('SEO product claims check');
console.log(`- registry records checked: ${summary.pagesScanned}`);
console.log(`- blocked claim types: ${summary.blockedClaimTypes.join(', ')}`);
console.log('- safe wording allowed: помогает подготовить, можно использовать для, удобно собрать, helps prepare, can be used to, helps structure');

if (errors.length > 0) {
  console.error('\nSEO product claims check failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('SEO product claims check passed.');
