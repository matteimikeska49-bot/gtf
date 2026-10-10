import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../../public/analytics-consent.js', import.meta.url), 'utf8');
const html = fs.readFileSync(new URL('../../index.html', import.meta.url), 'utf8');
const runtime = (saved = {}, options = {}) => {
  const values = new Map(Object.entries(saved));
  const scripts = [];
  const window = {
    location: { href: 'https://gotoflow.io/test' },
    localStorage: {
      getItem: k => { if (options.blockStorage) throw new Error('Storage denied'); return values.get(k) ?? null; },
      setItem: (k, v) => { if (options.blockStorage) throw new Error('Storage denied'); values.set(k, v); },
      removeItem: k => values.delete(k),
    },
    ...(options.prerender ? { __GTF_PRERENDER_ROUTE: '/test' } : {}),
  };
  const document = { referrer: '', createElement: () => ({}), head: { appendChild: s => scripts.push(s) } };
  const context = vm.createContext({ window, document });
  const load = () => vm.runInContext(source, context);
  load();
  return { window, scripts, values, load, context };
};

test('clean visitor and explicit Reject send no optional request or queued event', () => {
  const r = runtime();
  assert.equal(r.window.gtfAnalytics.readChoice(), null);
  assert.equal(r.scripts.length, 0);
  r.window.gtfAnalytics.setConsent(false);
  r.load();
  assert.equal(r.scripts.length, 0);
  assert.equal(r.window.dataLayer, undefined);
  assert.equal(r.window.gtfAnalytics.hasConsent(), false);
});

test('Accept boots all existing providers exactly once, including remount/replay', () => {
  const r = runtime();
  r.window.gtfAnalytics.setConsent(true);
  r.window.gtfAnalytics.setConsent(true);
  r.load();
  assert.equal(r.scripts.length, 3);
  assert.equal(new Set(r.scripts.map(s => s.src)).size, 3);
  assert.equal(r.window.dataLayer.filter(v => v.event === 'gtm.js').length, 1);
  assert.equal(r.window.dataLayer.filter(v => v[0] === 'config').length, 1);
  assert.equal(r.window.ym.a.filter(v => v[1] === 'init').length, 1);
});

test('saved explicit Reject overrides the old affirmative RU key in either language', () => {
  const r = runtime({ gtf_cookie_consent: JSON.stringify({ necessary: true, optional: false }), cookiesAccepted: 'true' });
  assert.equal(r.window.gtfAnalytics.readChoice(), false);
  assert.equal(r.scripts.length, 0);
});

test('restored Accept and genuine legacy RU Accept start providers', () => {
  for (const saved of [{ cookiesAccepted: 'true' }, { gtf_cookie_consent: JSON.stringify({ necessary: true, optional: true }) }]) {
    const r = runtime(saved);
    assert.equal(r.window.gtfAnalytics.hasConsent(), true);
    assert.equal(r.scripts.length, 3);
  }
});

test('malformed consent, arbitrary legacy values and denied storage fail closed', () => {
  for (const saved of [{ gtf_cookie_consent: 'broken', cookiesAccepted: 'true' },
    { gtf_cookie_consent: '{"optional":true}' }, { cookiesAccepted: 'false' }, { cookiesAccepted: 'yes' }]) {
    assert.equal(runtime(saved).scripts.length, 0);
  }
  const r = runtime({}, { blockStorage: true });
  assert.equal(r.scripts.length, 0);
  r.window.gtfAnalytics.setConsent(true);
  assert.equal(r.scripts.length, 3); // The user's real choice works in-session.
});

test('prerender preserves optional consent as interactive state without provider artifacts', () => {
  const r = runtime({ cookiesAccepted: 'true' }, { prerender: true });
  assert.equal(r.scripts.length, 0);
  assert.equal(r.values.get('gtf_cookie_consent'), undefined);
});

test('HTML contains no unconditional optional provider resource or noscript pixel', () => {
  assert.match(html, /<script defer src="\/analytics-consent\.js"><\/script>/);
  assert.ok(html.indexOf('/analytics-consent.js') < html.indexOf('/src/main.jsx'));
  assert.doesNotMatch(html, /(?:src|href)=["'][^"']*(?:googletagmanager|mc\.yandex)/);
});

test('SEO event consumer drops pre-consent events and forwards one event after consent', () => {
  const r = runtime();
  const events = [];
  r.window.dispatchEvent = event => events.push(event);
  r.context.CustomEvent = class { constructor(type, init) { this.type = type; this.detail = init.detail; } };
  const consumer = fs.readFileSync(new URL('../../src/components/seo/seoAnalytics.js', import.meta.url), 'utf8')
    .replace(/^import[^\n]*\n/, 'const SEO_ANALYTICS_EVENTS = {};\n').replaceAll('export const ', 'const ');
  vm.runInContext(consumer + '\nwindow.testTrack = trackSeoEvent;', r.context);
  r.window.testTrack('seo_cta_click', { id: 'test' });
  assert.equal(events.length, 0);
  r.window.gtfAnalytics.setConsent(true);
  r.window.testTrack('seo_cta_click', { id: 'test' });
  assert.equal(events.length, 1);
  assert.equal(r.window.dataLayer.filter(v => v.event === 'seo_cta_click').length, 1);
});
