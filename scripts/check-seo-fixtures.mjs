import fs from 'fs';
import os from 'os';
import path from 'path';
import { spawnSync } from 'child_process';
import { validateSeoIntentRecords } from './check-seo-route-intent-ownership.mjs';
import { scanProductTruthText } from './check-seo-cross-system-product-truth.mjs';

const rootDir = process.cwd();
const sourceDist = path.join(rootDir, 'dist');
const cases = [];

const routeHtmlPath = (distDir, routePath = '/ru/templates/instagram-carousel') => (
  path.join(distDir, routePath.replace(/^\//, ''), 'index.html')
);

const runNode = (script, env = {}) => {
  const result = spawnSync(process.execPath, [script], {
    cwd: rootDir,
    env: { ...process.env, ...env },
    encoding: 'utf8',
  });
  return {
    status: result.status ?? 1,
    stdout: result.stdout || '',
    stderr: result.stderr || '',
  };
};

const createFixtureDistPair = () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'gotoflow-seo-fixture-'));
  const committed = path.join(root, 'committed');
  const fresh = path.join(root, 'fresh');
  fs.cpSync(sourceDist, committed, { recursive: true });
  fs.cpSync(sourceDist, fresh, { recursive: true });
  return { root, committed, fresh };
};

const mutateHtml = (distDir, mutator, routePath = '/ru/templates/instagram-carousel') => {
  const filePath = routeHtmlPath(distDir, routePath);
  const html = fs.readFileSync(filePath, 'utf8');
  fs.writeFileSync(filePath, mutator(html));
};

const mutateSitemap = (distDir, mutator) => {
  const filePath = path.join(distDir, 'sitemap.xml');
  const sitemap = fs.readFileSync(filePath, 'utf8');
  fs.writeFileSync(filePath, mutator(sitemap));
};

const runDistSyncFixture = (name, mutator, expected = 'non-zero') => {
  const fixture = createFixtureDistPair();
  try {
    mutator(fixture.committed, fixture.fresh);
    const result = runNode('scripts/check-seo-dist-sync.mjs', {
      SEO_DIST_SYNC_SKIP_BUILD: '1',
      SEO_DIST_SYNC_COMMITTED_DIST: fixture.committed,
      SEO_DIST_SYNC_TMP_DIST: fixture.fresh,
    });
    const passed = expected === 'zero' ? result.status === 0 : result.status !== 0;
    cases.push({
      name,
      expected,
      actual: result.status === 0 ? 'zero' : 'non-zero',
      realCheckerUsed: 'scripts/check-seo-dist-sync.mjs',
      passed,
      output: `${result.stdout}\n${result.stderr}`.trim().split('\n').slice(-4).join(' | '),
    });
  } finally {
    fs.rmSync(fixture.root, { recursive: true, force: true });
  }
};

const runSharedLayoutFixture = (name, mutator, expected = 'non-zero') => {
  const fixture = createFixtureDistPair();
  try {
    mutator(fixture.committed);
    const result = runNode('scripts/check-seo-shared-layout.mjs', {
      SEO_SHARED_LAYOUT_DIST: fixture.committed,
    });
    const passed = expected === 'zero' ? result.status === 0 : result.status !== 0;
    cases.push({
      name,
      expected,
      actual: result.status === 0 ? 'zero' : 'non-zero',
      realCheckerUsed: 'scripts/check-seo-shared-layout.mjs',
      passed,
      output: `${result.stdout}\n${result.stderr}`.trim().split('\n').slice(-4).join(' | '),
    });
  } finally {
    fs.rmSync(fixture.root, { recursive: true, force: true });
  }
};

const runIntentFixture = (name, pages, expected = 'non-zero', blogRoutes = []) => {
  const result = validateSeoIntentRecords(pages, { blogRoutes });
  const status = result.errors.length > 0 ? 1 : 0;
  const passed = expected === 'zero' ? status === 0 : status !== 0;
  cases.push({
    name,
    expected,
    actual: status === 0 ? 'zero' : 'non-zero',
    realCheckerUsed: 'validateSeoIntentRecords',
    passed,
    output: [...result.errors, ...result.warnings].join(' | '),
  });
};

const runProductTruthFixture = (name, text, expected = 'non-zero') => {
  const findings = scanProductTruthText(text, '(fixture)');
  const blocking = findings.filter((finding) => finding.severity === 'blocking');
  const status = blocking.length > 0 ? 1 : 0;
  const passed = expected === 'zero' ? status === 0 : status !== 0;
  cases.push({
    name,
    expected,
    actual: status === 0 ? 'zero' : 'non-zero',
    realCheckerUsed: 'scanProductTruthText',
    passed,
    output: findings.map((finding) => `${finding.claimKey}:${finding.severity}`).join(', '),
  });
};

const basePage = {
  path: '/ru/templates/a',
  state: 'indexable_approved',
  published: true,
  noindex: false,
  sitemapEligible: true,
  title: 'Уникальный title A',
  h1: 'Уникальный H1 A',
  canonicalOwner: '/ru/templates/a',
  intentOwner: 'intent-a',
  primaryIntent: 'intent a',
  heroSubtitle: 'Помогает выбрать структуру Instagram-карусели под задачу.',
  productBridge: 'GoToFlow помогает подготовить карусель и перейти к созданию.',
  sections: [{ title: 'Как выбрать структуру' }, { title: 'Когда использовать формат' }],
  faq: [
    { question: 'Вопрос A 1?', answer: 'Ответ.' },
    { question: 'Вопрос A 2?', answer: 'Ответ.' },
    { question: 'Вопрос A 3?', answer: 'Ответ.' },
    { question: 'Вопрос A 4?', answer: 'Ответ.' },
    { question: 'Вопрос A 5?', answer: 'Ответ.' },
  ],
};

const clonePage = (overrides = {}) => ({ ...basePage, ...overrides });

console.log('SEO guard fixture runner');

runDistSyncFixture('positive production dist', () => {}, 'zero');

runDistSyncFixture('approved route absent in dist', (committed) => {
  fs.rmSync(routeHtmlPath(committed), { force: true });
});

runDistSyncFixture('stale sitemap', (committed) => {
  mutateSitemap(committed, (sitemap) => sitemap.replace('<loc>https://gotoflow.io/ru/templates/instagram-carousel</loc>', ''));
});

runDistSyncFixture('wrong canonical', (committed) => {
  mutateHtml(committed, (html) => html.replace('https://gotoflow.io/ru/templates/instagram-carousel', 'https://gotoflow.io/ru/templates/wrong-canonical'));
});

runDistSyncFixture('noindex route in sitemap', (committed) => {
  mutateSitemap(committed, (sitemap) => sitemap.replace('</urlset>', '<url><loc>https://gotoflow.io/ru/platforms/instagram-carousel</loc></url></urlset>'));
});

runDistSyncFixture('fake hreflang', (committed) => {
  mutateHtml(committed, (html) => html.replace('</head>', '<link rel="alternate" hreflang="en" href="https://gotoflow.io/templates/instagram-carousel"></head>'));
});

runDistSyncFixture('HTML without H1', (committed) => {
  mutateHtml(committed, (html) => html.replace(/<h1\b[^>]*>[\s\S]*?<\/h1>/i, ''));
});

runDistSyncFixture('visible FAQ mismatch', (committed) => {
  mutateHtml(committed, (html) => html.replace('Что такое шаблон карусели Instagram?', 'Fixture removed question text'));
});

runDistSyncFixture('Article schema on template page', (committed) => {
  mutateHtml(committed, (html) => html.replace('</head>', '<script type="application/ld+json">{"@context":"https://schema.org","@type":"Article"}</script></head>'));
});

runProductTruthFixture('outdated Product Truth in article', 'GoToFlow: бесшовные карусели скоро появится в roadmap.');

runSharedLayoutFixture('separate SeoHeader in rendered HTML', (committed) => {
  mutateHtml(committed, (html) => html.replace('<header', '<div class="SeoHeader"></div><header'));
});

runDistSyncFixture('broken internal link', (committed) => {
  mutateHtml(committed, (html) => html.replace('</body>', '<a href="/missing-fixture-route">Broken</a></body>'));
});

runDistSyncFixture('missing image', (committed) => {
  mutateHtml(committed, (html) => html.replace('</body>', '<img src="/images/missing-fixture-image.png" alt="Missing"></body>'));
});

runIntentFixture('duplicate primary intent owner', [
  clonePage({ path: '/ru/templates/a', intentOwner: 'same-intent' }),
  clonePage({ path: '/ru/templates/b', title: 'Уникальный title B', h1: 'Уникальный H1 B', canonicalOwner: '/ru/templates/b', intentOwner: 'same-intent' }),
]);

runIntentFixture('duplicate title', [
  clonePage({ path: '/ru/templates/a', title: 'Duplicate title' }),
  clonePage({ path: '/ru/templates/b', h1: 'Уникальный H1 B', canonicalOwner: '/ru/templates/b', intentOwner: 'intent-b', title: 'Duplicate title' }),
]);

runIntentFixture('duplicate H1', [
  clonePage({ path: '/ru/templates/a', h1: 'Duplicate H1' }),
  clonePage({ path: '/ru/templates/b', title: 'Уникальный title B', canonicalOwner: '/ru/templates/b', intentOwner: 'intent-b', h1: 'Duplicate H1' }),
]);

runIntentFixture('duplicate canonical', [
  clonePage({ path: '/ru/templates/a', canonicalOwner: '/ru/templates/shared' }),
  clonePage({ path: '/ru/templates/b', title: 'Уникальный title B', h1: 'Уникальный H1 B', intentOwner: 'intent-b', canonicalOwner: '/ru/templates/shared' }),
]);

runIntentFixture('near-identical lead', [
  clonePage({ path: '/ru/templates/a', heroSubtitle: 'Одинаковый подробный lead про выбор структуры карусели и переход к созданию в GoToFlow.' }),
  clonePage({ path: '/ru/templates/b', title: 'Уникальный title B', h1: 'Уникальный H1 B', canonicalOwner: '/ru/templates/b', intentOwner: 'intent-b', heroSubtitle: 'Одинаковый подробный lead про выбор структуры карусели и переход к созданию в GoToFlow.' }),
]);

runIntentFixture('massively identical FAQ', [
  clonePage({ path: '/ru/templates/a' }),
  clonePage({ path: '/ru/templates/b', title: 'Уникальный title B', h1: 'Уникальный H1 B', canonicalOwner: '/ru/templates/b', intentOwner: 'intent-b' }),
]);

runIntentFixture('allowed topical cluster with shared Product Truth claims', [
  clonePage({
    path: '/ru/templates/a',
    heroSubtitle: 'Шаблон помогает выбрать структуру Instagram-карусели.',
    productBridge: 'GoToFlow создает максимум 10 слайдов; чаще удобно 5-10.',
  }),
  clonePage({
    path: '/ru/templates/b',
    title: 'Уникальный title B',
    h1: 'Уникальный H1 B',
    canonicalOwner: '/ru/templates/b',
    intentOwner: 'intent-b',
    heroSubtitle: 'Страница помогает выбрать структуру LinkedIn-карусели.',
    productBridge: 'GoToFlow создает максимум 10 слайдов; чаще удобно 5-10.',
    faq: [
      { question: 'Вопрос B 1?', answer: 'Ответ.' },
      { question: 'Вопрос B 2?', answer: 'Ответ.' },
      { question: 'Вопрос B 3?', answer: 'Ответ.' },
      { question: 'Вопрос B 4?', answer: 'Ответ.' },
      { question: 'Вопрос B 5?', answer: 'Ответ.' },
    ],
  }),
], 'zero');

const failed = cases.filter((item) => !item.passed);

cases.forEach((item) => {
  const icon = item.passed ? 'PASS' : 'FAIL';
  console.log(`${icon}: ${item.name}`);
  console.log(`  expected: ${item.expected}`);
  console.log(`  actual: ${item.actual}`);
  console.log(`  realCheckerUsed: ${item.realCheckerUsed}`);
  if (item.output) console.log(`  output: ${item.output}`);
});

console.log(`- total: ${cases.length}`);
console.log(`- passed: ${cases.length - failed.length}`);
console.log(`- failed: ${failed.length}`);

if (failed.length > 0) {
  console.error('\nSEO fixtures failed.');
  process.exit(1);
}

console.log('SEO fixtures passed.');
