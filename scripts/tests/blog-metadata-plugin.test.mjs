import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { blogMetadataPlugin } from '../lib/blog-metadata-plugin.mjs';
import { parseFrontmatter } from '../../src/lib/blog/frontmatter.js';
import { toArticle, REQUIRED_ARTICLE_FIELDS, isPublicMarkdownArticle } from '../../src/lib/blog/articleRecord.js';

test('every derived article metadata module equals actual frontmatter, without body loss in source', () => {
  const dir = fileURLToPath(new URL('../../src/content/blog/articles/', import.meta.url));
  const plugin = blogMetadataPlugin();
  let count = 0;
  const articles = fs.readdirSync(dir).filter(name => name.endsWith('.md'));
  for (const name of articles) {
    const file = path.join(dir, name);
    const source = fs.readFileSync(file, 'utf8');
    const { data, body } = parseFrontmatter(source);
    const generated = plugin.load(file + '?blog-metadata');
    assert.deepEqual(JSON.parse(generated.slice('export default '.length, -1)), data, name);
    const locator = plugin.load(file + '?blog-slug');
    assert.equal(JSON.parse(locator.slice('export default '.length, -1)), data.slug || name.replace(/\.md$/, ''));
    const record = toArticle([file, source]);
    assert.deepEqual(record, { ...data, body, fileName: name, path: file,
      slug: data.slug || name.replace(/\.md$/, ''), language: data.language || 'en',
      isTemplate: name.startsWith('_'), missingFields: REQUIRED_ARTICLE_FIELDS.filter(field => !(field in data)) });
    assert.equal(fs.readFileSync(file, 'utf8'), source);
    if (body.trim()) assert.ok(!generated.includes(body.trim()), name + ': body is not eager metadata');
    count++;
  }
  assert.ok(count > 0);
  assert.equal(count, articles.length); // Check the actual complete inventory, not an invented count.
});

test('shared record retains a declared slug instead of inventing a filename route', () => {
  const record = toArticle(['/source/different-filename.md', '---\nslug: declared-route\nlanguage: ru\npublished: true\nnoindex: false\n---\nComplete source body.']);
  assert.equal(record.slug, 'declared-route');
  assert.equal(record.body, 'Complete source body.');
  assert.equal(record.language, 'ru');
  assert.equal(record.published, true);
  assert.equal(record.noindex, false);
});

test('raw content and non-Markdown requests are not transformed', () => {
  const plugin = blogMetadataPlugin();
  assert.equal(plugin.load('/anything.md?raw'), null);
  assert.equal(plugin.load('/anything.js'), null);
});

test('lazy source serialization preserves every Markdown byte without JS trailing whitespace', async () => {
  const dir = fileURLToPath(new URL('../../src/content/blog/articles/', import.meta.url));
  const plugin = blogMetadataPlugin();
  for (const name of fs.readdirSync(dir).filter(name => name.endsWith('.md'))) {
    const file = path.join(dir, name);
    const generated = plugin.load(file + '?blog-source');
    assert.equal(/[\t ]+$/m.test(generated), false, name);
    const module = await import('data:text/javascript,' + encodeURIComponent(generated));
    assert.equal(module.default, fs.readFileSync(file, 'utf8'), name);
  }
});

test('exact article and metadata schema consumers retain the same strict public disposition', () => {
  for (const [article, expected] of [
    [null, false], [{ published: true, noindex: false, isTemplate: false }, true],
    [{ published: 'true', noindex: false }, false], [{ published: false }, false],
    [{ published: true, noindex: true }, false], [{ published: true, isTemplate: true }, false],
    [{ published: true }, true],
  ]) assert.equal(isPublicMarkdownArticle(article), expected);
});
