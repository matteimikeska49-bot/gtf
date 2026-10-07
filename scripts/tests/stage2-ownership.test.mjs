import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { resolveProjectSeoState } from '../lib/project-seo-state.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const state = resolveProjectSeoState(root);
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, 'src/content/blog', file), 'utf8'));
const clusters = readJson('cluster-authority-map.json');
const intents = readJson('intent-map.json');

for (const [network, product, clusterId] of [
  ['linkedin', '/linkedin-post-generator', 'en:linkedin-post-generator'],
  ['instagram', '/ai-instagram-post-generator', 'en:instagram-post-generator'],
]) {
  test(`${network}: plural comparison article, singular product and cluster metadata agree`, () => {
    const route = `/blog/ai-${network}-post-generator`;
    const article = state.byPath.get(route).article;
    const keyword = `best ai ${network} post generators`;
    assert.equal(article.primaryKeyword, keyword);
    assert.equal(article.targetKeyword, keyword);
    assert.equal(article.canonical, `https://gotoflow.io${route}`);
    assert.equal(state.byPath.get(route).indexable, true);
    assert.equal(article.relatedProductRoute, product);
    assert.equal(state.byPath.get(product).indexable, true);
    assert.equal(article.clusterId, clusterId);
    const intent = intents.find((entry) => entry.intentId === article.intentId);
    assert.equal(intent.intentType, 'comparison');
    assert.equal(intent.cluster, clusterId);
    assert.equal(intent.relatedProductRoute, product);
    const roles = clusters.flatMap((cluster) => cluster.articleRoles.filter((role) => role.url === route));
    assert.equal(roles.length, 1);
    assert.equal(roles[0].role, article.articleRole);
    assert.equal(roles[0].intentId, article.intentId);
    assert.ok(article.body.includes(`](${product})`));
  });
}

test('LinkedIn comparison leaves carousel cluster without moving other supporting articles', () => {
  const comparison = clusters.find((cluster) => cluster.clusterId === 'en:linkedin-post-generator');
  assert.deepEqual(comparison.articleRoles.map((role) => role.slug), ['ai-linkedin-post-generator']);
  const carousel = clusters.find((cluster) => cluster.clusterId === 'en:linkedin-carousel');
  assert.ok(!carousel.supportingArticles.includes('ai-linkedin-post-generator'));
  assert.equal(carousel.productRoute, '/linkedin-carousel-maker');
  const article = state.byPath.get('/blog/ai-linkedin-post-generator').article;
  assert.ok(article.body.includes('](/linkedin-carousel-maker)'));
  assert.equal(article.finalCta.buttonHref, '/linkedin-post-generator');
  assert.equal(article.finalCta.secondaryHref, '/linkedin-carousel-maker');
});

test('source-truth corrections match real project routes and product owners', () => {
  const b2b = intents.find((intent) => intent.ownerSlug === 'b2b-keysy-v-linkedin-karusel');
  assert.equal(b2b.ownerUrl, '/ru/blog/b2b-keysy-v-linkedin-karusel');
  assert.equal(b2b.relatedProductRoute, '/ru/generator-karuselej-linkedin');
  const role = clusters.flatMap((cluster) => cluster.articleRoles).find((entry) => entry.slug === b2b.ownerSlug);
  assert.equal(role.url, b2b.ownerUrl);
  const vk = intents.find((intent) => intent.ownerSlug === 'razmer-foto-dlya-posta-vk-formaty');
  assert.equal(vk.relatedProductRoute, '/ru/vk-post-generator');
  for (const [route, product] of [
    ['/blog/ai-facebook-post-generator', '/ai-content-generator'],
    ['/blog/how-to-schedule-linkedin-carousel', '/linkedin-carousel-maker'],
  ]) {
    assert.equal(state.byPath.get(route).article.relatedProductRoute, product);
    assert.equal(state.byPath.get(product).indexable, true);
  }
});
