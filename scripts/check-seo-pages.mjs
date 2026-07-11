import { getAllSeoPages, validateSeoPages } from '../src/content/seoPages/index.js';

const pages = getAllSeoPages();
const errors = validateSeoPages();

console.log('SEO pages contract check');
console.log(`- registry records: ${pages.length}`);
console.log(`- states: ${[...new Set(pages.map((page) => page.state))].join(', ') || '(none)'}`);
console.log(`- template variants: ${[...new Set(pages.map((page) => page.templateVariant))].join(', ') || '(none)'}`);

if (errors.length > 0) {
  console.error('\nSEO page contract check failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('SEO page contract check passed.');
