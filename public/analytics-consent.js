(function (w, d) {
  'use strict';
  if (w.gtfAnalytics) return;
  var cookieKey = 'gtf_consent_v2';
  var oldKey = 'gtf_cookie_consent';
  var campaignKey = 'gtf_campaign_v1';
  var maxAge = 180 * 86400;
  var started = false;
  var volatileChoice = null;
  var denialKey = 'gtf_consent_denied_v2';
  var stopped = false;
  var pendingAttribution = {};
  var lastPage = '';
  var campaign = {};
  var utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_id', 'utm_content', 'utm_term', 'utm_source_platform', 'utm_creative_format', 'utm_marketing_tactic'];
  var clickKeys = ['yclid', 'ysclid', 'gclid', 'dclid', 'gbraid', 'wbraid', 'gad_source', 'gad_campaignid', '_openstat'];
  var attributionKeys = utmKeys.concat(clickKeys);
  var sharedDomain = /^(?:app\.)?gotoflow\.io$/.test(w.location.hostname) ? '; Domain=gotoflow.io' : '';
  var prerender = typeof w.__GTF_PRERENDER_ROUTE === 'string';

  function readCookie() {
    try {
      var pair = d.cookie.split(';').map(function (s) { return s.trim(); }).find(function (s) { return s.indexOf(cookieKey + '=') === 0; });
      if (!pair) return null;
      var value = JSON.parse(decodeURIComponent(pair.slice(cookieKey.length + 1)));
      var time = Date.parse(value.updatedAt);
      return value.version === 2 && value.necessary === true && typeof value.optional === 'boolean' &&
        Number.isFinite(time) && time <= Date.now() + 300000 && Date.now() - time <= maxAge * 1000 ? value : null;
    } catch { return null; }
  }
  function readDenial() {
    try {
      var time = Number(w.localStorage.getItem(denialKey));
      return time > 0 && time <= Date.now() + 300000 && Date.now() - time <= maxAge * 1000 ? time : 0;
    } catch { return 0; }
  }
  function persistedChoice() {
    var value = readCookie();
    if (readDenial() >= (value ? Date.parse(value.updatedAt) : 1)) return false;
    if (value) return value.optional;
    // Old affirmative values have no trustworthy provenance (RU Learn more also set true).
    // Preserve only explicit historical refusal; never invent a timestamp for it.
    try {
      var old = JSON.parse(w.localStorage.getItem(oldKey));
      return old && old.necessary === true && old.optional === false ? false : null;
    } catch { return null; }
  }
  function readChoice() {
    var value = readCookie();
    // A failed cookie write must not restore an older grant in this document.
    if (volatileChoice && (!value || Date.parse(value.updatedAt) <= volatileChoice.time)) {
      if (readDenial() > volatileChoice.time) return false;
      return volatileChoice.optional;
    }
    return persistedChoice();
  }
  function safeValue(key, value) {
    if (typeof value !== 'string') return '';
    if (key === '_openstat') return /^[a-zA-Z0-9_+/=;.-]{1,512}$/.test(value) ? value : '';
    if (clickKeys.includes(key)) return /^[a-zA-Z0-9_-]{1,256}$/.test(value) ? value : '';
    // Numeric campaign IDs are legitimate. Exclude email/URL/control syntax, not digits.
    return /^[\p{L}\p{N} ._~+()!,:;/-]{1,200}$/u.test(value) && !/https?:|www\./i.test(value) ? value : '';
  }
  function readCampaign(params) {
    var result = {};
    attributionKeys.forEach(function (key) { var value = safeValue(key, params.get(key)); if (value) result[key] = value; });
    return result;
  }
  function captureCampaign() {
    if (prerender || readChoice() === false) return;
    var incoming = readCampaign(new URLSearchParams(w.location.search));
    if (Object.keys(incoming).length) {
      campaign = incoming;
      if (!started) pendingAttribution = incoming;
    }
    if (readChoice() === true) {
      try {
        if (!Object.keys(campaign).length) campaign = readCampaign(new URLSearchParams(JSON.parse(w.sessionStorage.getItem(campaignKey) || '{}')));
        if (Object.keys(campaign).length) w.sessionStorage.setItem(campaignKey, JSON.stringify(campaign));
      } catch { /* No persistence is required for a current-document choice. */ }
    }
  }
  function decorateAppUrl(base) {
    var url = new URL(base, w.location.href);
    if (url.origin !== 'https://app.gotoflow.io') return url.toString();
    // The explicit destination may contain product parameters; copy no arbitrary landing query.
    attributionKeys.forEach(function (key) { url.searchParams.delete(key); });
    if (!prerender && readChoice() === true) {
      captureCampaign();
      Object.keys(campaign).forEach(function (key) { url.searchParams.set(key, campaign[key]); });
    }
    return url.toString();
  }
  function safeAddress(input) {
    var url = new URL(input, w.location.href);
    Array.from(url.searchParams.keys()).forEach(function (key) {
      var value = url.searchParams.get(key);
      if (attributionKeys.includes(key) && safeValue(key, value)) { url.searchParams.set(key, value); return; }
      if (key === 'ref' && /^[a-zA-Z0-9_-]{1,64}$/.test(value)) return;
      if (key === 'lang' && /^(en|ru)$/.test(value)) return;
      url.searchParams.delete(key);
    });
    return url.toString();
  }
  function pageUrl() {
    var url = new URL(w.location.href);
    url.search = ''; url.hash = '';
    if (readChoice() === true) Object.entries(readCampaign(new URLSearchParams(w.location.search))).forEach(function (entry) { url.searchParams.set(entry[0], entry[1]); });
    return url.toString();
  }
  function trackPage() {
    captureCampaign();
    if (!started || readChoice() !== true) return;
    var url = pageUrl();
    if (lastPage === url) return;
    var referer = lastPage || safeReferrer();
    lastPage = url;
    w.ym(108772587, 'hit', url, { title: d.title, referer: referer });
    // GA4 already measures history changes. Do not add another GA page_view here.
  }
  function safeReferrer() {
    try { var url = new URL(safeAddress(d.referrer)); url.hash = ''; return d.referrer ? url.toString() : ''; } catch { return ''; }
  }
  function addScript(src) { var script = d.createElement('script'); script.async = true; script.src = src; d.head.appendChild(script); }
  function start() {
    if (started || readChoice() !== true || prerender) return;
    // Keep validated campaign/click IDs for both SDKs, including a choice made after SPA navigation.
    var entry = new URL(safeAddress(w.location.href));
    Object.keys(pendingAttribution).forEach(function (key) { if (!entry.searchParams.has(key)) entry.searchParams.set(key, pendingAttribution[key]); });
    var address = entry.toString();
    if (address !== w.location.href) w.history.replaceState(w.history.state, '', address);
    started = true;
    w['ga-disable-G-7T87G1XGHL'] = false;
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () { w.dataLayer.push(arguments); };
    w.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    w.gtag('js', new Date());
    w.gtag('config', 'G-7T87G1XGHL');
    w.ym = function () { (w.ym.a = w.ym.a || []).push(arguments); };
    w.ym.l = Date.now();
    w.ym(108772587, 'init', { defer: true, url: pageUrl(), referrer: safeReferrer(), ssr: true, webvisor: true, clickmap: true, ecommerce: 'dataLayer', accurateTrackBounce: true, trackLinks: true });
    addScript('https://www.googletagmanager.com/gtm.js?id=GTM-W5R5NBH8');
    addScript('https://www.googletagmanager.com/gtag/js?id=G-7T87G1XGHL');
    addScript('https://mc.yandex.ru/metrika/tag.js?id=108772587');
    trackPage();
  }
  function clearOptionalStorage() {
    campaign = {}; pendingAttribution = {};
    try { w.sessionStorage.removeItem(campaignKey); } catch { /* Restricted storage. */ }
    try { d.cookie.split(';').forEach(function (pair) {
      var name = pair.trim().split('=')[0];
      if (!/^(?:_ga(?:_|$)|_ym_|mdd$)/.test(name)) return;
      ['', '; Domain=' + w.location.hostname, sharedDomain].forEach(function (domain) { d.cookie = name + '=; Max-Age=0; Path=/' + domain + '; SameSite=Lax' + (w.location.protocol === 'https:' ? '; Secure' : ''); });
    }); } catch { /* Cookie access may be blocked. */ }
  }
  function stop() {
    w['ga-disable-G-7T87G1XGHL'] = true;
    if (stopped) return;
    stopped = true;
    if (started && w.ym) w.ym(108772587, 'destruct');
    clearOptionalStorage();
    // Unload third-party listeners/timers, not just the loader flag.
    if (started && persistedChoice() !== true) w.location.reload();
  }
  function notify() { w.dispatchEvent(new CustomEvent('gtf:consent-change', { detail: { optional: readChoice() } })); }
  w.gtfAnalytics = {
    readChoice: readChoice,
    hasConsent: function () { return readChoice() === true; },
    decorateAppUrl: decorateAppUrl,
    trackPage: trackPage,
    setConsent: function (optional) {
      if (typeof optional !== 'boolean' || prerender) return;
      var value = { version: 2, necessary: true, optional: optional, updatedAt: new Date().toISOString() };
      try { d.cookie = cookieKey + '=' + encodeURIComponent(JSON.stringify(value)) + '; Path=/; Max-Age=' + maxAge + '; SameSite=Lax' + sharedDomain + (w.location.protocol === 'https:' ? '; Secure' : ''); } catch { /* Use an explicit current-document choice. */ }
      var saved = readCookie();
      var persisted = saved && saved.optional === optional && saved.updatedAt === value.updatedAt;
      volatileChoice = persisted ? null : { optional: optional, time: Date.parse(value.updatedAt) };
      try {
        if (!optional) w.localStorage.setItem(denialKey, String(Date.parse(value.updatedAt)));
        else w.localStorage.removeItem(denialKey);
      } catch { /* Never rely on optional storage to enforce the current-document refusal. */ }
      try { w.localStorage.removeItem(oldKey); w.localStorage.removeItem('cookiesAccepted'); } catch { /* Cookie/current-document choice still works. */ }
      observedChoice = readChoice(); notify();
      if (optional) {
        if (stopped && started) { if (persisted) w.location.reload(); return; }
        stopped = false; captureCampaign(); start();
      } else stop();
    },
  };
  if (prerender) return;
  captureCampaign();
  var observedChoice = readChoice();
  function sync() {
    var choice = readChoice();
    if (observedChoice === choice) return;
    observedChoice = choice; notify();
    if (choice === true) { stopped = false; start(); } else stop();
  }
  // The shared cookie is authoritative across hostnames; storage events alone cannot cross origins.
  w.addEventListener('focus', sync);
  w.addEventListener('storage', sync);
  d.addEventListener('visibilitychange', sync);
  w.setInterval(sync, 1000);
  ['pushState', 'replaceState'].forEach(function (method) {
    var original = w.history[method];
    w.history[method] = function () {
      var args = Array.from(arguments);
      if (readChoice() === true && args[2] != null) args[2] = safeAddress(args[2]);
      var result = original.apply(this, args); w.setTimeout(trackPage, 0); return result;
    };
  });
  w.addEventListener('popstate', function () { w.setTimeout(trackPage, 0); });
  start();
})(window, document);
