(function (w, d) {
  'use strict';
  // One bootstrap for both language flows, including remounts and SPA navigation.
  if (w.gtfAnalytics) return;
  var key = 'gtf_cookie_consent';
  var sessionChoice = null;
  var started = false;

  function readChoice() {
    if (sessionChoice !== null) return sessionChoice;
    try {
      var raw = w.localStorage.getItem(key);
      if (raw !== null) {
        var value = JSON.parse(raw);
        return value && value.necessary === true && typeof value.optional === 'boolean'
          ? value.optional : null;
      }
      // Honour the existing affirmative RU choice, not an arbitrary truthy value.
      return w.localStorage.getItem('cookiesAccepted') === 'true' ? true : null;
    } catch {
      return null; // Invalid/unavailable storage never grants optional consent.
    }
  }

  function addScript(src) {
    var script = d.createElement('script');
    script.async = true;
    script.src = src;
    d.head.appendChild(script);
  }

  function start() {
    if (started || readChoice() !== true || typeof w.__GTF_PRERENDER_ROUTE === 'string') return;
    started = true;
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () { w.dataLayer.push(arguments); };
    w.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    w.gtag('js', new Date());
    w.gtag('config', 'G-7T87G1XGHL');
    w.ym = function () { (w.ym.a = w.ym.a || []).push(arguments); };
    w.ym.l = new Date().getTime();
    w.ym(108772587, 'init', {
      ssr: true, webvisor: true, clickmap: true, ecommerce: 'dataLayer',
      referrer: d.referrer, url: w.location.href, accurateTrackBounce: true, trackLinks: true,
    });
    addScript('https://www.googletagmanager.com/gtm.js?id=GTM-W5R5NBH8');
    addScript('https://www.googletagmanager.com/gtag/js?id=G-7T87G1XGHL');
    addScript('https://mc.yandex.ru/metrika/tag.js?id=108772587');
  }

  w.gtfAnalytics = {
    readChoice: readChoice,
    hasConsent: function () { return readChoice() === true; },
    setConsent: function (optional) {
      if (typeof optional !== 'boolean') return;
      sessionChoice = optional;
      try {
        w.localStorage.setItem(key, JSON.stringify({ necessary: true, optional: optional, updatedAt: '2026-02-19' }));
        // Keep the legacy RU key compatible without overriding an explicit Reject.
        if (optional) w.localStorage.setItem('cookiesAccepted', 'true');
        else w.localStorage.removeItem('cookiesAccepted');
      } catch { /* The explicit choice still applies in this browser session. */ }
      start();
    },
  };
  start();
})(window, document);
