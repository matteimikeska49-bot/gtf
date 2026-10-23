(function (w, d) {
  'use strict';
  if (w.gtfAnalytics) return;
  var cookieKey = 'gtf_consent_v2';
  var oldKey = 'gtf_cookie_consent';
  var campaignKey = 'gtf_campaign_v1';
  var maxAge = 180 * 86400;
  var started = false;
  var volatileChoice = null;
  var lastPage = '';
  var campaign = {};
  var utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_id', 'utm_content', 'utm_term'];
  var sharedDomain = /^(?:app\.)?gotoflow\.io$/.test(w.location.hostname) ? '; Domain=gotoflow.io' : '';
  var prerender = typeof w.__GTF_PRERENDER_ROUTE === 'string';

  function readCookie() {
    var pair = d.cookie.split(';').map(function (s) { return s.trim(); }).find(function (s) { return s.indexOf(cookieKey + '=') === 0; });
    if (!pair) return null;
    try {
      var value = JSON.parse(decodeURIComponent(pair.slice(cookieKey.length + 1)));
      var time = Date.parse(value.updatedAt);
      return value.version === 2 && value.necessary === true && typeof value.optional === 'boolean' &&
        Number.isFinite(time) && time <= Date.now() + 300000 && Date.now() - time <= maxAge * 1000 ? value : null;
    } catch { return null; }
  }
  function readChoice() {
    var value = readCookie();
    if (value) return value.optional;
    if (volatileChoice !== null) return volatileChoice;
    // Old affirmative values have no trustworthy provenance (RU Learn more also set true).
    // Preserve only explicit historical refusal; never invent a timestamp for it.
    try {
      var old = JSON.parse(w.localStorage.getItem(oldKey));
      return old && old.necessary === true && old.optional === false ? false : null;
    } catch { return null; }
  }
  function safeValue(value) {
    return typeof value === 'string' && /^[\p{L}\p{N} ._~-]{1,100}$/u.test(value) && !/\d{7,}/.test(value) ? value : '';
  }
  function readCampaign(params) {
    var result = {};
    utmKeys.forEach(function (key) { var value = safeValue(params.get(key)); if (value) result[key] = value; });
    return result;
  }
  function captureCampaign() {
    if (prerender || readChoice() === false) return;
    var incoming = readCampaign(new URLSearchParams(w.location.search));
    if (Object.keys(incoming).length) campaign = incoming;
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
    utmKeys.forEach(function (key) { url.searchParams.delete(key); });
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
      if (utmKeys.includes(key) && safeValue(value)) return;
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
    lastPage = url;
    w.ym(108772587, 'hit', url, { title: d.title });
    // GA4 already measures history changes. Do not add another GA page_view here.
  }
  function addScript(src) { var script = d.createElement('script'); script.async = true; script.src = src; d.head.appendChild(script); }
  function start() {
    if (started || readChoice() !== true || prerender) return;
    // Remove non-contract query before loading any optional SDK. Keep ref/lang and safe UTM.
    var address = safeAddress(w.location.href);
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
    w.ym(108772587, 'init', { defer: true, url: pageUrl(), referrer: d.referrer ? new URL(d.referrer).origin : '', ssr: true, webvisor: true, clickmap: true, ecommerce: 'dataLayer', accurateTrackBounce: true, trackLinks: true });
    addScript('https://www.googletagmanager.com/gtm.js?id=GTM-W5R5NBH8');
    addScript('https://www.googletagmanager.com/gtag/js?id=G-7T87G1XGHL');
    addScript('https://mc.yandex.ru/metrika/tag.js?id=108772587');
    trackPage();
  }
  function clearOptionalStorage() {
    campaign = {};
    try { w.sessionStorage.removeItem(campaignKey); } catch { /* Restricted storage. */ }
    d.cookie.split(';').forEach(function (pair) {
      var name = pair.trim().split('=')[0];
      if (!/^(?:_ga(?:_|$)|_ym_|mdd$)/.test(name)) return;
      ['', '; Domain=' + w.location.hostname, sharedDomain].forEach(function (domain) { d.cookie = name + '=; Max-Age=0; Path=/' + domain + '; SameSite=Lax' + (w.location.protocol === 'https:' ? '; Secure' : ''); });
    });
  }
  function stop() {
    w['ga-disable-G-7T87G1XGHL'] = true;
    if (started && w.ym) w.ym(108772587, 'destruct');
    clearOptionalStorage();
    // Unload third-party listeners/timers, not just the loader flag.
    if (started) w.location.reload();
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
      d.cookie = cookieKey + '=' + encodeURIComponent(JSON.stringify(value)) + '; Path=/; Max-Age=' + maxAge + '; SameSite=Lax' + sharedDomain + (w.location.protocol === 'https:' ? '; Secure' : '');
      volatileChoice = readCookie() ? null : optional;
      try { w.localStorage.removeItem(oldKey); w.localStorage.removeItem('cookiesAccepted'); } catch { /* Cookie/current-document choice still works. */ }
      notify();
      if (optional) { captureCampaign(); start(); } else stop();
    },
  };
  if (prerender) return;
  captureCampaign();
  var observedChoice = readChoice();
  function sync() {
    var choice = readChoice();
    if (observedChoice === choice) return;
    observedChoice = choice; notify();
    if (choice === true) start(); else stop();
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
