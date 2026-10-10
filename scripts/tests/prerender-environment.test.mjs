import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { installPrerenderEnvironment } from '../lib/prerender-environment.mjs';

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
