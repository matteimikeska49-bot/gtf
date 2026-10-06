import fs from 'fs';
import os from 'os';
import path from 'path';
import { spawnSync } from 'child_process';
import { validateSeoIntentRecords } from './check-seo-route-intent-ownership.mjs';
import { scanProductTruthText } from './check-seo-cross-system-product-truth.mjs';
import { validateRobotsPolicy, validateNavigationTarget, validatePublishedFacts, validateNginx404Contract, validateTopLevelFrontmatterKeys, checkChangedArticleFrontmatter } from './check-crawl-hygiene.mjs';
import { validateCarouselOwnership } from './lib/carousel-ownership.mjs';
import { getAppUrlWithRef } from '../src/utils/url.js';

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

const crawlFixture = (name, errors, blocked = true) => cases.push({
  name, expected: blocked ? 'non-zero' : 'zero', actual: errors.length ? 'non-zero' : 'zero',
  passed: Boolean(errors.length) === blocked, realCheckerUsed: 'crawl/ownership production validators', output: errors.join(' | '),
});
const robots = fs.readFileSync(path.join(rootDir, 'public/robots.txt'), 'utf8');
crawlFixture('valid explicit Clean-param policy', validateRobotsPolicy(robots), false);
crawlFixture('content-affecting lang must not be cleaned', validateRobotsPolicy(robots.replace('ref&utm_source', 'lang&ref&utm_source')));
for (const name of ['partner', 'referral']) {
  crawlFixture(`unverified ${name} must not be cleaned`, validateRobotsPolicy(robots.replace('ref&utm_source', `ref&${name}&utm_source`)));
}
crawlFixture('no wildcard callback parameters', validateRobotsPolicy(robots.replace('Shp_intent_id', 'Shp_*')));
crawlFixture('payment normalization must retain /ru scope', validateRobotsPolicy(robots.replace('Shp_purchase_type /ru', 'Shp_purchase_type')));
crawlFixture('source/generated robots drift', validateRobotsPolicy(robots, robots + '\n'));
const nginx = fs.readFileSync(path.join(rootDir, 'nginx.conf'), 'utf8');
crawlFixture('unchanged nginx preserves unknown-path 404', validateNginx404Contract(nginx), false);
crawlFixture('SPA status rewrite to 200 is blocked', validateNginx404Contract(nginx.replace('error_page 404 /index.html;', 'error_page 404 =200 /index.html;')));
for (const href of ['/?ref=test123', 'https://app.gotoflow.io/?ref=partner_test', '/ru/blog/NOCLICK_', '/api/health', '/ru/blog/title%7C', '/ru/blog/title|', '/blog/test-seo-template-v2', '/ru?OutSum=1', '/ru?need_sec_link=1', '/blog/10-best-instagram-carousel-examples-to-inspire-old']) {
  crawlFixture(`block junk navigation ${href}`, validateNavigationTarget(href));
}
crawlFixture('real referral attribution remains valid', validateNavigationTarget('/ru?ref=real_partner&utm_source=partner'), false);
const previousWindow = globalThis.window;
try {
  globalThis.window = { location: { search: '?ref=real_partner&utm_source=partner&OutSum=42&InvId=7&Shp_provider=return' }, localStorage: { getItem: () => null } };
  const appUrl = new URL(getAppUrlWithRef('https://app.gotoflow.io'));
  crawlFixture('crawler normalization does not strip referral/payment browser flow',
    ['ref', 'utm_source', 'OutSum', 'InvId', 'Shp_provider'].filter(name => appUrl.searchParams.get(name) !== new URLSearchParams(globalThis.window.location.search).get(name)), false);
} finally {
  if (previousWindow === undefined) delete globalThis.window;
  else globalThis.window = previousWindow;
}
crawlFixture('Instagram platform limit is not product limit', validatePublishedFacts('Instagram supports up to 10 photos.'));
crawlFixture('valid platform/product distinction and 10-slide examples', validatePublishedFacts('Instagram supports up to 20 photos. GoToFlow supports up to 10 slides. A recommended 10-slide Instagram example.'), false);
crawlFixture('stale LinkedIn owner wording', validatePublishedFacts('/ai-linkedin-post-generator remains the current EN route'));
const igCluster = { clusterId: 'ru:instagram-carousel', productRoute: '/ru/generator-karuselej-instagram' };
const article = '---\nclusterId: "ru:instagram-carousel"\nrelatedProductRoute: "/ru/generator-karuselej-instagram"\nfinalCta:\n  primaryHref: "/ru/generator-karuselej-instagram"\n---\n[Создать](/ru/generator-karuselej-instagram)';
const bridge = content => validateCarouselOwnership(content, { slug: 'fixture', cluster: igCluster });
crawlFixture('correct Instagram commercial bridge', bridge(article), false);
crawlFixture('wrong Instagram post CTA', bridge(article.replace('primaryHref: "/ru/generator-karuselej-instagram"', 'primaryHref: "/ru/generator-postov-instagram"')));
crawlFixture('href alone is not a rendered primary CTA', bridge(article.replace('primaryHref:', 'href:')));
crawlFixture('competing generic bridge in Instagram supporting content', bridge(article + '\n[Create](/ru/ii-generator-karuseley)'));
crawlFixture('intent-map drift is independently blocked', validateCarouselOwnership(article, { slug: 'fixture', cluster: igCluster, intent: { cluster: igCluster.clusterId, relatedProductRoute: '/ru/ii-generator-karuseley' } }));
crawlFixture('draft/noindex editorial role is not treated as a current rendered page', bridge(article.replace('clusterId:', 'published: false\nnoindex: true\nclusterId:').replace('primaryHref: "/ru/generator-karuselej-instagram"', 'primaryHref: "/ru/generator-postov-instagram"')), false);
crawlFixture('all PR-changed articles have unique top-level frontmatter keys', checkChangedArticleFrontmatter(rootDir).errors, false);
crawlFixture('duplicate updatedAt cannot silently overwrite maintenance date', validateTopLevelFrontmatterKeys('---\nupdatedAt: "2026-10-06"\nupdatedAt: "2026-06-13"\n---\nBody'));
crawlFixture('duplicate non-date top-level keys are blocked', validateTopLevelFrontmatterKeys('---\ntitle: First\ntitle: Second\n---\nBody'));
crawlFixture('quoted duplicate keys and CRLF are blocked', validateTopLevelFrontmatterKeys('---\r\nupdatedAt: "2026-10-06"\r\n"updatedAt": "2026-06-13"\r\n---\r\nBody'));
crawlFixture('repeated nested keys and body text are not frontmatter duplicates', validateTopLevelFrontmatterKeys('---\ntitle: Example\nfaq:\n  - question: First\n    answer: One\n  - question: Second\n    answer: Two\n---\ntitle: Body\ntitle: More body'), false);
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
