import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { parseCounts, reconcile } from '../reconcile-analytics-registrations.mjs';

const source = fs.readFileSync(new URL('../../public/analytics-consent.js', import.meta.url), 'utf8');
const html = fs.readFileSync(new URL('../../index.html', import.meta.url), 'utf8');
const runtime = (saved = {}, options = {}) => {
  const values = new Map(Object.entries(saved)), session = new Map(), jar = options.jar || new Map();
  const scripts = [], timers = [], events = [], listeners = new Map(); let reloads = 0;
  const storage = map => ({ getItem: k => map.get(k) ?? null, setItem: (k, v) => map.set(k, v), removeItem: k => map.delete(k) });
  const location = new URL(options.url || 'https://gotoflow.io/ru?utm_source=campaign');
  location.reload = () => { reloads++; };
  const window = { location, localStorage: storage(values), sessionStorage: storage(session),
    history: {}, setTimeout: fn => timers.push(fn), setInterval: fn => { window.tick = fn; },
    addEventListener: (name, fn) => listeners.set(name, fn), dispatchEvent: e => events.push(e),
    ...(options.prerender ? { __GTF_PRERENDER_ROUTE: '/test' } : {}) };
  for (const method of ['pushState', 'replaceState']) window.history[method] = (_a, _b, url) => { window.location = Object.assign(new URL(url, window.location.href), { reload: location.reload }); };
  const document = { referrer: '', title: 'Test page', createElement: () => ({}), head: { appendChild: s => scripts.push(s) }, addEventListener() {} };
  Object.defineProperty(document, 'cookie', { get: () => [...jar].map(([k,v]) => k+'='+v).join('; '), set: line => { const pair = line.split(';')[0]; const i = pair.indexOf('='); const key = pair.slice(0,i); if (line.includes('Max-Age=0;')) jar.delete(key); else jar.set(key,pair.slice(i+1)); } });
  const context = vm.createContext({ window, document, URL, URLSearchParams, Date, CustomEvent: class { constructor(type, init) { this.type=type; this.detail=init.detail; } } });
  const load = () => vm.runInContext(source, context); load();
  return { window, document, scripts, values, session, jar, events, load, flush: () => { while(timers.length) timers.shift()(); }, reloads: () => reloads };
};

test('missing choice and both historical affirmative formats fail closed; old explicit refusal survives', () => {
  for (const saved of [{}, {cookiesAccepted:'true'}, {gtf_cookie_consent:JSON.stringify({necessary:true,optional:true,updatedAt:'2026-02-19'})}]) {
    const r=runtime(saved); assert.equal(r.window.gtfAnalytics.readChoice(),null); assert.equal(r.scripts.length,0); assert.equal(r.session.size,0);
  }
  assert.equal(runtime({gtf_cookie_consent:'{"necessary":true,"optional":false}'}).window.gtfAnalytics.readChoice(),false);
});
test('explicit choice writes version and actual timestamp; Accept starts one bootstrap and one initial YM hit', () => {
  const r=runtime(); const before=Date.now();r.window.gtfAnalytics.setConsent(true);r.window.gtfAnalytics.setConsent(true);r.load();
  const record=JSON.parse(decodeURIComponent(r.jar.get('gtf_consent_v2')));
  assert.equal(record.version,2);assert.ok(Date.parse(record.updatedAt)>=before);assert.equal(r.values.has('cookiesAccepted'),false);
  assert.equal(r.scripts.length,3);assert.equal(r.window.ym.a.filter(a=>a[1]==='init').length,1);assert.equal(r.window.ym.a.find(a=>a[1]==='init')[2].defer,true);
  assert.equal(r.window.ym.a.filter(a=>a[1]==='hit').length,1);assert.equal(r.window.dataLayer.filter(a=>a[0]==='config').length,1);
});
test('shared v2 cookie overrides stale local state; refusal and withdrawal propagate to another open context', () => {
  const first=runtime();first.window.gtfAnalytics.setConsent(true);
  const second=runtime({}, {jar:first.jar,url:'https://app.gotoflow.io/'});assert.equal(second.window.gtfAnalytics.hasConsent(),true);
  first.window.gtfAnalytics.setConsent(false);second.window.tick();
  assert.equal(second.window.gtfAnalytics.hasConsent(),false);assert.equal(second.window['ga-disable-G-7T87G1XGHL'],true);assert.equal(second.reloads(),1);
  const reload=runtime({}, {jar:first.jar});assert.equal(reload.scripts.length,0);
});
test('withdrawal disables providers, destructs Metrica, clears optional storage and reloads', () => {
  const r=runtime();r.window.gtfAnalytics.setConsent(true);r.jar.set('_ga','test');r.jar.set('_ym_uid','test');r.window.gtfAnalytics.setConsent(false);
  assert.equal(r.window.gtfAnalytics.hasConsent(),false);assert.equal(r.window['ga-disable-G-7T87G1XGHL'],true);assert.equal(r.window.ym.a.at(-1)[1],'destruct');
  assert.equal(r.jar.has('_ga'),false);assert.equal(r.jar.has('_ym_uid'),false);assert.equal(r.session.size,0);assert.equal(r.reloads(),1);
});
test('history replay is deduplicated; new path sends one YM hit with GA owned by native history', () => {
  const r=runtime();r.window.gtfAnalytics.setConsent(true);
  r.window.history.pushState({},'', '/ru/politika');r.flush();r.window.history.replaceState({},'', '/ru/politika');r.flush();
  assert.equal(r.window.ym.a.filter(a=>a[1]==='hit').length,2);assert.equal(r.window.dataLayer.filter(a=>a[0]==='config').length,1);
  assert.equal(r.window.dataLayer.filter(a=>a[0]==='event').length,0);
});
test('campaign survives internal navigation only after permission; arbitrary query, email and tokens are not forwarded', () => {
  const r=runtime({}, {url:'https://gotoflow.io/ru?utm_source=launch&utm_campaign=summer&token=secret&email=user%40example.com&utm_term=user%40example.com'});
  assert.equal(r.window.gtfAnalytics.decorateAppUrl('https://app.gotoflow.io/'),'https://app.gotoflow.io/');
  r.window.gtfAnalytics.setConsent(true);assert.ok(!r.window.location.href.includes('secret'));r.window.history.pushState({},'', '/ru/generator-kontenta');r.flush();
  assert.equal(r.window.gtfAnalytics.decorateAppUrl('https://app.gotoflow.io/'),'https://app.gotoflow.io/?utm_source=launch&utm_campaign=summer');
  r.window.gtfAnalytics.setConsent(false);assert.equal(r.window.gtfAnalytics.decorateAppUrl('https://app.gotoflow.io/'),'https://app.gotoflow.io/');
});
test('malformed/expired shared choices and prerender never grant or manufacture consent', () => {
  for(const record of ['broken',JSON.stringify({version:2,necessary:true,optional:true,updatedAt:'2026-02-19'})]) assert.equal(runtime({}, {jar:new Map([['gtf_consent_v2',encodeURIComponent(record)]])}).scripts.length,0);
  const r=runtime({}, {prerender:true});r.window.gtfAnalytics.setConsent(true);assert.equal(r.scripts.length,0);assert.equal(r.jar.size,0);
  assert.doesNotMatch(html, /(?:src|href)=["'][^"']*(?:googletagmanager|mc\.yandex)/);
});
test('registration reconciliation accepts aggregates only, preserves missing dates, and does not infer consent', () => {
  const b=parseCounts('date,new_registrations\n2026-10-14,5\n2026-10-15,4');const g=parseCounts('date,new_registrations\n2026-10-14,2');
  const rows=reconcile(b,g,new Map());assert.equal(rows[0].ga4Difference,3);assert.equal(rows[1].ga4Difference,null);
  assert.throws(()=>parseCounts('date,new_registrations,email\n2026-10-14,5,a@b.com'));assert.throws(()=>parseCounts('date,new_registrations\n2026-10-14,5\n2026-10-14,2'));
});
