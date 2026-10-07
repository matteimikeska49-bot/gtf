import assert from 'node:assert/strict';
import test from 'node:test';
import { auditClusterHubLinks, renderedHrefPaths } from '../lib/cluster-hub-links.mjs';

const hub = { path: '/blog/hub', indexable: true, sourceType: 'article', article: { slug: 'hub', language: 'en' } };
const support = { path: '/blog/support', indexable: true, sourceType: 'article' };
const cluster = { clusterId: 'en:example', language: 'en', hubSlug: 'hub',
  articleRoles: [{ role: 'hub', url: hub.path }, { role: 'supporting', url: support.path }],
  internalLinkingRules: { mustLinkToHub: true } };
const run = (html, overrides = {}) => auditClusterHubLinks({ clusters: [cluster],
  state: { entries: [hub, support], byPath: new Map([[hub.path, hub], [support.path, support]]) },
  readHtml: () => html, ...overrides });

test('exact rendered destination required; product/near-match/external links cannot satisfy hub', () => {
  assert.equal(run('<a href="/product">Product</a>').missing, 1);
  assert.equal(run('<a href="/blog/hub-extra">Other</a>').missing, 1);
  assert.equal(run('<a href="https://other.example/blog/hub">Other</a>').missing, 1);
  assert.equal(run('<a href="/blog/hub#steps">Guide</a>').missing, 0);
  assert.equal(run('<a href="https://gotoflow.io/blog/hub/">Guide</a>').missing, 0);
});

test('missing artifact or nonindexable hub fails; noindex supporting article is not counted', () => {
  assert.equal(run(null).findings[0].reason, 'RENDERED_ARTICLE_MISSING');
  assert.equal(run('', { state: { entries: [{ ...hub, indexable: false }],
    byPath: new Map([[support.path, support]]) } }).findings[0].reason, 'HUB_NOT_INDEXABLE');
  assert.equal(run('', { state: { entries: [hub],
    byPath: new Map([[support.path, { ...support, indexable: false }]]) } }).checked, 0);
});

test('advisory declared hubs are opt-in and not reported as mandatory rules', () => {
  const clusters = [{ ...cluster, internalLinkingRules: { mustLinkToHub: false } }];
  assert.equal(run('', { clusters }).checked, 0);
  const advisory = run('', { clusters, includeDeclared: true });
  assert.equal(advisory.missing, 1);
  assert.equal(advisory.findings[0].required, false);
});

test('parser handles quote styles, trailing slash, fragments and query strings', () => {
  assert.deepEqual([...renderedHrefPaths("<a href='/blog/hub/?a=1&amp;b=2#x'>Guide</a>")], ['/blog/hub']);
});
