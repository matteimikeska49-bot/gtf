import assert from 'node:assert/strict';
import test from 'node:test';
import { CONTENT_DATE_LABELS, formatContentDate, normalizeContentDate, resolveContentDates } from '../../src/utils/contentDates.js';
import { getArticleSchema } from '../../src/utils/schemaGenerator.js';
import { renderSitemap } from '../lib/project-seo-state.mjs';
import { validateDateArtifacts } from '../check-content-dates.mjs';

test('updatedAt newer than review is modification; review stays separate', () => {
  assert.deepEqual(resolveContentDates({ updatedAt: '2026-10-06', lastReviewed: '2026-06-21' }),
    { published: null, modified: '2026-10-06', reviewed: '2026-06-21', lastmod: '2026-10-06' });
});
test('a newer review never advances modification/lastmod', () => {
  const dates = resolveContentDates({ updatedAt: '2026-06-21', lastReviewed: '2026-10-06' });
  assert.equal(dates.modified, '2026-06-21'); assert.equal(dates.lastmod, '2026-06-21');
  assert.equal(dates.reviewed, '2026-10-06');
});
test('partial month does not become June 1 or fall back to old authoring/review', () => {
  const dates = resolveContentDates({ updatedAt: '2026-06', createdAt: '2024-03-22', lastReviewed: '2026-06-20' });
  assert.equal(dates.modified, null); assert.equal(dates.lastmod, null); assert.equal(dates.published, null);
  assert.equal(formatContentDate('2026-06'), null);
});
test('missing modification remains absent; known publication may be lastmod', () => {
  assert.equal(resolveContentDates({ publishedAt: '2026-06-21', lastReviewed: '2026-07-01' }).lastmod, '2026-06-21');
  assert.equal(resolveContentDates({ createdAt: '2026-06-21', lastReviewed: '2026-07-01' }).lastmod, null);
});
test('old unchanged document does not acquire review/build dates', () => {
  const old = { publishedAt: '2020-01-01', lastReviewed: '2026-10-08' };
  const schema = getArticleSchema('/blog/old', 'Old', 'Description', 'en', old);
  assert.equal(schema.datePublished, '2020-01-01'); assert.ok(!('dateModified' in schema));
  assert.equal(resolveContentDates(old).lastmod, '2020-01-01');
});
test('real update has identical Article dateModified and sitemap lastmod', () => {
  const metadata = { updatedAt: '2026-06-24', lastReviewed: '2026-06-21' };
  const date = resolveContentDates(metadata).lastmod;
  const schema = getArticleSchema('/blog/a', 'A', 'Description', 'en', metadata);
  const xml = renderSitemap({ sitemapEntries: [{ path: '/blog/a', lastmod: date, hreflang: [], changefreq: 'monthly', priority: 0.7 }] });
  assert.ok(xml.includes(`<lastmod>${schema.dateModified}</lastmod>`));
  assert.equal(schema.dateModified, '2026-06-24');
});
test('unknown lastmod omits only date, not URL/sitemap eligibility', () => {
  const xml = renderSitemap({ sitemapEntries: [{ path: '/blog/a', lastmod: null, hreflang: [], changefreq: 'monthly', priority: 0.7 }] });
  assert.ok(xml.includes('<loc>https://gotoflow.io/blog/a</loc>')); assert.ok(!xml.includes('<lastmod>'));
});
test('calendar and timestamp validation does not accept rollover or arbitrary suffix', () => {
  for (const date of ['2026-02-29', '2026-02-31', '2026-13-01', '2026-06-01Tgarbage', '2026-06-01T25:00:00Z']) assert.equal(normalizeContentDate(date), null);
  assert.equal(normalizeContentDate('2024-02-29'), '2024-02-29');
  assert.equal(normalizeContentDate('2026-06-09T00:00:00.000Z'), '2026-06-09');
});
test('RU/EN labels identify distinct events and locale rendering is timezone-safe', () => {
  assert.equal(CONTENT_DATE_LABELS.ru.reviewed, 'Редакционная проверка');
  assert.equal(CONTENT_DATE_LABELS.en.published, 'Published');
  assert.match(formatContentDate('2026-06-24', 'ru'), /24 июня 2026/);
  assert.match(formatContentDate('2026-06-24', 'en'), /June 24, 2026/);
});
test('independent artifact checker rejects review as modification and invented publication', () => {
  const metadata = { updatedAt: '2026-06-21', lastReviewed: '2026-10-06', createdAt: '2024-01-01' };
  const html = '<script type="application/ld+json">{"@type":"Article","dateModified":"2026-10-06","datePublished":"2024-01-01"}</script>';
  const errors = validateDateArtifacts({ metadata, html, sitemapBlock: '<lastmod>2026-10-06</lastmod>', visible: false });
  assert.ok(errors.some((e) => e.includes('lastmod'))); assert.ok(errors.some((e) => e.includes('dateModified')));
  assert.ok(errors.some((e) => e.includes('datePublished')));
});
test('independent checker rejects stale rendered datetime and wrong review label', () => {
  const metadata = { language: 'ru', updatedAt: '2026-06-24', lastReviewed: '2026-06-21' };
  const schema = getArticleSchema('/blog/a', 'A', 'Description', 'ru', metadata);
  const html = `<script type="application/ld+json">${JSON.stringify(schema)}</script>Обновлено: <time data-content-date="modified" datetime="2026-06-21">21 июня 2026</time>Обновлено: <time data-content-date="reviewed" datetime="2026-06-21">21 июня 2026</time>`;
  const errors = validateDateArtifacts({ metadata, html, sitemapBlock: '<lastmod>2026-06-24</lastmod>' });
  assert.ok(errors.some((e) => e.includes('datetime mismatch'))); assert.ok(errors.some((e) => e.includes('reviewed label')));
});
test('modification before confirmed publication fails validation, not rollover', () => {
  const metadata = { publishedAt: '2026-06-24', updatedAt: '2026-06-21' };
  const schema = getArticleSchema('/blog/a', 'A', 'Description', 'en', metadata);
  assert.ok(!('dateModified' in schema));
  assert.ok(validateDateArtifacts({ metadata, html: `<script type="application/ld+json">${JSON.stringify(schema)}</script>`, sitemapBlock: '<lastmod>2026-06-24</lastmod>', visible: false }).some((e) => e.includes('precedes')));
});
