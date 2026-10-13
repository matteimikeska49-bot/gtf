import test from 'node:test';
import assert from 'node:assert/strict';
import { isAnalyticsDependency, isDecodedMediaCancellation } from '../lib/browser-image-qa.mjs';

test('network diagnostics distinguish exact analytics endpoints, never application failures', () => {
  assert.equal(isAnalyticsDependency('https://www.googletagmanager.com/gtm.js?id=GTM-W5R5NBH8'), true);
  assert.equal(isAnalyticsDependency('https://mc.yandex.ru/metrika/match.html'), true);
  for (const url of ['http://localhost:56433/assets/app.js', 'https://gotoflow.io/images/broken.png',
    'https://www.googletagmanager.com.evil.test/gtm.js', 'https://mc.yandex.ru/other.js', '',
    'https://www.googletagmanager.com/application.js']) assert.equal(isAnalyticsDependency(url), false);
});

test('only actual decoded media can explain an aborted range request', () => {
  const request = { url: 'http://localhost/video.mp4', resourceType: 'media', error: 'net::ERR_ABORTED' };
  const media = [{ url: request.url, readyState: 4, width: 640, height: 480, error: null }];
  assert.equal(isDecodedMediaCancellation(request, media), true);
  assert.equal(isDecodedMediaCancellation({ ...request, resourceType: 'image' }, media), false);
  assert.equal(isDecodedMediaCancellation({ ...request, error: 'net::ERR_CONNECTION_CLOSED' }, media), false);
  for (const bad of [{ ...media[0], readyState: 0 }, { ...media[0], error: 3 }, { ...media[0], width: 0 }, { ...media[0], url: 'http://localhost/other.mp4' }]) {
    assert.equal(isDecodedMediaCancellation(request, [bad]), false);
  }
});
