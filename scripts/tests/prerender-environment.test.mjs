import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
import { installPrerenderEnvironment, applyPrerenderReferralState } from '../lib/prerender-environment.mjs';

test('build-only environment freezes periodic demo ticks but retains one-shot timers and storage', () => {
  let called = false;
  const timeout = () => 123;
  const storage = { consent: null };
  const window = { setInterval: () => { called = true; }, setTimeout: timeout, localStorage: storage };
  vm.runInNewContext(`(${installPrerenderEnvironment.toString()})('/ru')`, { window });
  assert.equal(window.__GTF_PRERENDER_ROUTE, '/ru');
  assert.equal(window.setInterval(() => { called = true; }, 16), 0);
  assert.equal(called, false);
  assert.equal(window.setTimeout, timeout);
  assert.equal(window.localStorage, storage);
  assert.equal(storage.consent, null);
});

const referralSource = fs.readFileSync(new URL('../../index.html', import.meta.url), 'utf8')
  .match(/<script>\s*((?:(?!<\/script>)[\s\S])*var APP_DOMAIN(?:(?!<\/script>)[\s\S])*)<\/script>/)[1];

function referralContext({ build = false, query = '', savedRef = '' } = {}) {
  const links = [];
  const timers = [];
  const events = [];
  const window = { location: { href: `http://localhost/route${query}`, search: query, protocol: 'http:' },
    localStorage: { getItem: () => savedRef, setItem: () => {} },
    ...(build ? { __GTF_PRERENDER_ROUTE: '/route' } : {}) };
  const document = { readyState: 'loading', body: {}, cookie: '',
    querySelectorAll: () => links, addEventListener: (name, callback) => events.push({ name, callback }) };
  const context = { window, document, URL, URLSearchParams, setTimeout: (callback, delay) => timers.push({ callback, delay }) };
  vm.runInNewContext(referralSource, context);
  const add = (href) => {
    const link = { value: href, getAttribute: () => link.value, setAttribute: (_, value) => { link.value = value; } };
    links.push(link);
    return link;
  };
  return { context, window, timers, events, add };
}

test('ready-DOM referral pass uses actual production script and removes timer-dependent capture', () => {
  const { context, timers, add } = referralContext({ build: true });
  const link = add('https://app.gotoflow.io');
  assert.equal(link.value, 'https://app.gotoflow.io');
  vm.runInNewContext(`(${applyPrerenderReferralState.toString()})()`, context);
  assert.equal(link.value, 'https://app.gotoflow.io/');
  const ready = link.value;
  for (const timer of timers) timer.callback();
  assert.equal(link.value, ready);
  assert.deepEqual(timers.map(t => t.delay), [1000, 3000]);
});

test('referral capture preserves destination, existing query, page tracking and ref precedence', () => {
  const { context, add } = referralContext({ build: true, query: '?utm_source=review&ref=owner', savedRef: 'saved' });
  const app = add('https://app.gotoflow.io/create?mode=carousel');
  const external = add('https://example.org/resource');
  const invalid = add('http://[');
  vm.runInNewContext(`(${applyPrerenderReferralState.toString()})()`, context);
  const url = new URL(app.value);
  assert.equal(url.origin, 'https://app.gotoflow.io');
  assert.equal(url.pathname, '/create');
  assert.equal(url.searchParams.get('mode'), 'carousel');
  assert.equal(url.searchParams.get('utm_source'), 'review');
  assert.equal(url.searchParams.get('ref'), 'owner');
  assert.equal(external.value, 'https://example.org/resource');
  assert.equal(invalid.value, 'http://[');
});

test('visitor referral timers/events unchanged and no build hook exposed', () => {
  const { context, window, timers, events, add } = referralContext();
  assert.equal(window.__GTF_PRERENDER_APPLY_REF, undefined);
  const app = add('https://app.gotoflow.io');
  assert.equal(app.value, 'https://app.gotoflow.io');
  assert.deepEqual(timers.map(t => t.delay), [1000, 3000]);
  assert.deepEqual(events.map(e => e.name), ['DOMContentLoaded']);
  timers[0].callback();
  assert.equal(app.value, 'https://app.gotoflow.io/');
  assert.throws(() => vm.runInNewContext(`(${applyPrerenderReferralState.toString()})()`, context), /readiness hook is missing/);
});

test('capture fails closed if production referral hook is absent', () => {
  assert.throws(() => vm.runInNewContext(`(${applyPrerenderReferralState.toString()})()`, {
    window: { __GTF_PRERENDER_ROUTE: '/route' }
  }), /readiness hook is missing/);
});
