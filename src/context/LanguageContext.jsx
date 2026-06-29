import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ru } from '../i18n/ru';
import { en } from '../i18n/en';

const LanguageContext = createContext();

const translations = {
  RU: ru,
  EN: en,
};

function normalizeLang(value) {
  const normalized = (value || '').toLowerCase();
  if (normalized === 'ru') return 'RU';
  if (normalized === 'en') return 'EN';
  return null;
}

function getQueryLang(search) {
  return normalizeLang(new URLSearchParams(search || '').get('lang'));
}

function getCookieLang() {
  const match = document.cookie.match(/(?:^|;\s*)gtf_lang=([^;]+)/);
  return normalizeLang(match ? decodeURIComponent(match[1]) : null);
}

function saveLangPreference(newLang) {
  const value = newLang === 'RU' ? 'ru' : 'en';
  localStorage.setItem('lang', value);

  const maxAge = 60 * 60 * 24 * 365;
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `gtf_lang=${value}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
}

/**
 * Determines the initial language based on:
 * 1. Explicit route language (/ru... → RU, non-root non-RU routes → EN)
 * 2. Query override (?lang=en / ?lang=ru) for root only
 * 3. Saved preference in gtf_lang cookie or localStorage ('lang') for root only
 * 4. Browser language auto-detection for root only
 */
function getRouteLang(pathname) {
  if (pathname === '/ru' || pathname === '/ru/' || pathname.startsWith('/ru/')) return 'RU';
  if (pathname === '/' || pathname === '') return null;
  return 'EN';
}

function getSavedLang() {
  const cookieLang = getCookieLang();
  if (cookieLang) return cookieLang;

  const saved = localStorage.getItem('lang');
  if (saved === 'ru') return 'RU';
  if (saved === 'en') return 'EN';

  return null;
}

function getBrowserLang() {
  const browserLang = (navigator.language || '').toLowerCase();
  const slavicPrefixes = ['ru', 'be', 'uk', 'kk'];
  if (slavicPrefixes.some((prefix) => browserLang.startsWith(prefix))) {
    return 'RU';
  }

  return 'EN';
}

function isLocalPrerenderBrowser() {
  return navigator.webdriver && ['127.0.0.1', 'localhost'].includes(window.location.hostname);
}

function getInitialLang(pathname, search) {
  return getRouteLang(pathname) || getQueryLang(search) || getSavedLang() || 'EN';
}

export const LanguageProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [lang, setLangState] = useState(() => getInitialLang(location.pathname, location.search));

  // On first mount: handle redirect for root auto-detection.
  useEffect(() => {
    const routeLang = getRouteLang(location.pathname);

    if (routeLang) {
      setLangState(routeLang);
      return;
    }

    const queryLang = getQueryLang(location.search);
    if (queryLang) {
      saveLangPreference(queryLang);
      setLangState(queryLang);

      if (queryLang === 'RU' && location.pathname !== '/ru') {
        navigate('/ru' + location.search + location.hash, { replace: true });
      }
      return;
    }

    const detectedLang = getSavedLang() || (isLocalPrerenderBrowser() ? 'EN' : getBrowserLang());
    setLangState(detectedLang);
    if (detectedLang === 'RU' && location.pathname !== '/ru') {
      navigate('/ru' + location.search + location.hash, { replace: true });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync lang state when URL changes (e.g., browser back/forward)
  useEffect(() => {
    setLangState(getInitialLang(location.pathname, location.search));
  }, [location.pathname, location.search]);

  // Update <html lang>, canonical, and hreflang when language changes
  useEffect(() => {
    document.documentElement.lang = lang === 'RU' ? 'ru' : 'en';

    const isRootRoute = location.pathname === '/' || location.pathname === '' || location.pathname === '/ru' || location.pathname === '/ru/';
    
    if (isRootRoute) {
      const setMeta = (name, content, prop = false) => {
        const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
        let el = document.querySelector(sel);
        if (!el) { el = document.createElement('meta'); document.head.appendChild(el); }
        el.setAttribute(prop ? 'property' : 'name', name);
        el.setAttribute('content', content);
      };

      const setLink = (rel, href, extra = {}) => {
        const sel = extra.hreflang ? `link[rel="${rel}"][hreflang="${extra.hreflang}"]` : `link[rel="${rel}"]`;
        let el = document.querySelector(sel);
        if (!el) { el = document.createElement('link'); document.head.appendChild(el); }
        el.setAttribute('rel', rel); el.setAttribute('href', href);
        Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v));
      };

      if (lang === 'RU') {
        const title = 'GoToFlow — AI-генератор контента для соцсетей';
        const desc = 'Создавайте посты, карусели, сценарии Reels и идеи для соцсетей с помощью AI. GoToFlow помогает быстро упаковывать контент под ваш стиль.';
        const url = 'https://gotoflow.io/ru';
        
        document.title = title;
        setMeta('title', title);
        setMeta('description', desc);
        setMeta('og:title', title, true);
        setMeta('og:description', desc, true);
        setMeta('og:url', url, true);
        setMeta('twitter:title', title, true);
        setMeta('twitter:description', desc, true);
        setMeta('twitter:url', url, true);
        
        setLink('canonical', url);
        setLink('alternate', 'https://gotoflow.io/', { hreflang: 'en' });
        setLink('alternate', 'https://gotoflow.io/ru', { hreflang: 'ru' });
        setLink('alternate', 'https://gotoflow.io/', { hreflang: 'x-default' });
      } else {
        const title = 'AI Content Generator for Social Media — Create Posts, Carousels & Reels Fast | GoToFlow';
        const desc = 'Create high-converting social media content with AI. Generate carousels, posts, reels scripts and content plans in seconds with GoToFlow.';
        const url = 'https://gotoflow.io/';
        
        document.title = title;
        setMeta('title', title);
        setMeta('description', desc);
        setMeta('og:title', title, true);
        setMeta('og:description', desc, true);
        setMeta('og:url', url, true);
        setMeta('twitter:title', title, true);
        setMeta('twitter:description', desc, true);
        setMeta('twitter:url', url, true);
        
        setLink('canonical', url);
        setLink('alternate', 'https://gotoflow.io/', { hreflang: 'en' });
        setLink('alternate', 'https://gotoflow.io/ru', { hreflang: 'ru' });
        setLink('alternate', 'https://gotoflow.io/', { hreflang: 'x-default' });
      }
    }
  }, [lang, location.pathname]);

  /* ── Route pair map (EN ↔ RU) ── */
  const routePairs = [
    ['/', '/ru'],
    ['/ai-carousel-maker', '/ru/ai-generator-karuselej'],
    ['/ai-content-generator', '/ru/generator-kontenta'],
    ['/ai-instagram-post-generator', '/ru/generator-postov-instagram'],
    ['/linkedin-carousel-maker', '/ru/generator-karuselej-linkedin'],
    ['/blog/linkedin-carousel-ideas', '/ru/blog/idei-karuselej-linkedin'],
    ['/blog', '/ru/blog'],
    ['/privacy-policy', '/ru/politika'],
    ['/terms-of-service', '/ru/polzovatelskoe-soglashenie'],
    ['/personal-data-consent', '/ru/soglasie-na-obrabotku-personalnyh-dannyh'],
  ];

  const getPairedRoute = (pathname, targetLang) => {
    for (const [en, ru] of routePairs) {
      if (targetLang === 'RU' && pathname === en) return ru;
      if (targetLang === 'EN' && pathname === ru) return en;
    }
    return null;
  };

  const hasTranslation = (() => {
    const p = location.pathname;
    for (const [en, ru] of routePairs) {
      if (p === en || p === ru) return true;
    }
    return false;
  })();

  const changeLang = (newLang) => {
    const paired = getPairedRoute(location.pathname, newLang);

    // If no paired route exists, do nothing (page has no translation)
    if (!paired) return;

    setLangState(newLang);
    saveLangPreference(newLang);
    navigate(paired + location.search + location.hash);
  };

  const t = useCallback((path) => {
    const keys = path.split('.');
    let result = translations[lang];
    
    for (const key of keys) {
      if (result && typeof result === 'object' && key in result) {
        result = result[key];
      } else {
        console.warn(`Translation key not found: ${path}`);
        return path;
      }
    }
    
    return result;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t, hasTranslation }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
