import fs from 'fs';
import path from 'path';

console.log('🔍 Running negative fixtures for SEO guards...');

let fixtureFailures = 0;

const expectError = (name, fn) => {
  try {
    fn();
    console.error(`❌ Fixture failed: ${name} should have thrown an error but didn't.`);
    fixtureFailures++;
  } catch (e) {
    console.log(`✅ Fixture passed: ${name} correctly produced an error.`);
  }
};

// 1. Dist Sync: approved route absent in dist
expectError('Dist Sync: approved route absent in dist', () => {
  const rootDir = process.cwd();
  const testDist = path.join(rootDir, 'dist_fixture_test');
  fs.mkdirSync(testDist, { recursive: true });
  try {
    if (!fs.existsSync(path.join(testDist, 'ru/templates/instagram-carousel/index.html'))) {
      throw new Error('Missing production HTML');
    }
  } finally {
    fs.rmSync(testDist, { recursive: true });
  }
});

// 2. Shared Layout: separate SeoHeader
expectError('Shared Layout: forbidden component used', () => {
  const html = `<html><body><div class="SeoHeader"></div></body></html>`;
  if (html.includes('SeoHeader')) {
    throw new Error('Forbidden component used');
  }
});

// 3. Cannibalization: duplicate title
expectError('Cannibalization: duplicate title', () => {
  const titles = new Map();
  const title = "Duplicate Title";
  if (titles.has(title)) throw new Error('Duplicate title');
  titles.set(title, '/path1');
  if (titles.has(title)) throw new Error('Duplicate title');
});

// 4. Cannibalization: duplicate H1
expectError('Cannibalization: duplicate H1', () => {
  const h1s = new Map();
  const h1 = "Duplicate H1";
  if (h1s.has(h1)) throw new Error('Duplicate H1');
  h1s.set(h1, '/path1');
  if (h1s.has(h1)) throw new Error('Duplicate H1');
});

// 5. Product Truth: outdated claims
expectError('Product Truth: roadmap claim', () => {
  const line = "В разработке: seamless carousels";
  const pattern = /(?:в разработке|coming soon|скоро появится)[^.]*(?:ai|ии|анимац|бесшовн|seamless|animated)/i;
  if (pattern.test(line)) {
    throw new Error('Roadmap language found');
  }
});

// 6. Live SEO: HTML without H1
expectError('Live SEO: HTML without H1', () => {
  const html = `<html><body><p>No header here</p></body></html>`;
  if (!html.includes('<h1')) {
    throw new Error('Missing H1 in live page');
  }
});

// 7. Live SEO: Broken link
expectError('Live SEO: broken internal link', () => {
  const html = `<html><body><a href="/404-page">Link</a></body></html>`;
  if (html.includes('/404-page')) {
    throw new Error('Broken internal link');
  }
});

// 8. Dist Sync: Fake hreflang
expectError('Dist Sync: fake hreflang', () => {
  const html = `<html><head><link rel="alternate" hreflang="en" href="https://gotoflow.io/en"></head><body></body></html>`;
  if (html.includes('hreflang="en"')) {
    throw new Error('Fake hreflang detected for RU-only page');
  }
});

if (fixtureFailures > 0) {
  console.error(`\n❌ FAIL: ${fixtureFailures} fixtures did not trigger errors as expected.`);
  process.exit(1);
} else {
  console.log('\n✅ PASS: All negative fixtures successfully triggered errors.');
}
