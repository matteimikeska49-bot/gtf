import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ru } from '../i18n/ru';
import { en } from '../i18n/en';

const LanguageContext = createContext();

const translations = {
  RU: ru,
  EN: en,
};

/**
 * Determines the initial language based on:
 * 1. Saved preference in localStorage ('lang')
 * 2. Current URL path (/ru → RU, / → EN)
 * 3. Browser language auto-detection (first visit only)
 */
function getInitialLang(pathname) {
  // 1. Explicit SEO pages strictly follow URL
  if (pathname === '/ru/ai-generator-karuselej' || pathname === '/ru/generator-kontenta' || pathname === '/ru/generator-postov-instagram' || pathname === '/ru/generator-karuselej-linkedin' || pathname === '/ru/blog' || pathname === '/ru/blog/idei-karuselej-linkedin') return 'RU';
  if (pathname === '/ai-carousel-maker' || pathname === '/ai-content-generator' || pathname === '/ai-instagram-post-generator' || pathname === '/linkedin-carousel-maker' || pathname === '/blog' || pathname === '/blog/linkedin-carousel-ideas') return 'EN';

  // 2. Check saved preference
  const saved = localStorage.getItem('lang');
  if (saved === 'ru') return 'RU';
  if (saved === 'en') return 'EN';

  // 3. Check URL
  if (pathname === '/ru' || pathname === '/ru/') return 'RU';
  if (pathname === '/' || pathname === '') return 'EN';

  // 4. Auto-detect from browser (first visit only)
  const browserLang = (navigator.language || '').toLowerCase();
  const slavicPrefixes = ['ru', 'be', 'uk', 'kk'];
  if (slavicPrefixes.some((prefix) => browserLang.startsWith(prefix))) {
    return 'RU';
  }

  return 'EN';
}

export const LanguageProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [lang, setLangState] = useState(() => getInitialLang(location.pathname));

  // On first mount: handle redirect for auto-detection (only if no saved lang)
  useEffect(() => {
    const isRootRoute = location.pathname === '/' || location.pathname === '' || location.pathname === '/ru' || location.pathname === '/ru/';
    
    // Do not redirect SEO pages or any other non-root pages
    if (!isRootRoute) {
      return;
    }

    const saved = localStorage.getItem('lang');
    if (saved) {
      // Saved preference exists — enforce correct URL on root pages
      if (saved === 'ru' && location.pathname !== '/ru') {
        navigate('/ru', { replace: true });
      } else if (saved === 'en' && location.pathname !== '/') {
        navigate('/', { replace: true });
      }
      return;
    }

    // No saved preference — auto-detect for root visitors
    const detectedLang = getInitialLang(location.pathname);
    if (detectedLang === 'RU' && location.pathname !== '/ru') {
      navigate('/ru', { replace: true });
    }
    // If EN and already at /, no redirect needed
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync lang state when URL changes (e.g., browser back/forward)
  useEffect(() => {
    if (location.pathname === '/ai-carousel-maker' || location.pathname === '/ai-content-generator' || location.pathname === '/ai-instagram-post-generator' || location.pathname === '/linkedin-carousel-maker' || location.pathname === '/blog' || location.pathname === '/blog/linkedin-carousel-ideas') {
      setLangState('EN');
    } else if (location.pathname === '/ru/ai-generator-karuselej' || location.pathname === '/ru/generator-kontenta' || location.pathname === '/ru/generator-postov-instagram' || location.pathname === '/ru/generator-karuselej-linkedin' || location.pathname === '/ru/blog' || location.pathname === '/ru/blog/idei-karuselej-linkedin') {
      setLangState('RU');
    } else if (location.pathname === '/ru' || location.pathname === '/ru/') {
      setLangState('RU');
    } else if (location.pathname === '/' || location.pathname === '') {
      setLangState('EN');
    }
  }, [location.pathname]);

  // Update <html lang>, canonical, and hreflang when language changes
  useEffect(() => {
    document.documentElement.lang = lang === 'RU' ? 'ru' : 'en';

    const isRootRoute = location.pathname === '/' || location.pathname === '' || location.pathname === '/ru' || location.pathname === '/ru/';
    
    if (isRootRoute) {
      // Update canonical
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.href = lang === 'RU' ? 'https://gotoflow.io/ru' : 'https://gotoflow.io/';
      }

      // Update title and meta description based on language
      if (lang === 'RU') {
        document.title = 'AI-генератор контента — Посты и Карусели | GoToFlow';
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.content = 'Создавайте конвертирующий контент для соцсетей с помощью ИИ. Генерируйте карусели, посты, сценарии Reels и контент-планы за секунды с GoToFlow.';
        const metaTitle = document.querySelector('meta[name="title"]');
        if (metaTitle) metaTitle.content = 'AI-генератор контента для соцсетей — Создавайте посты, карусели и Reels | GoToFlow';
      } else {
        document.title = 'AI Content Generator — Create Posts & Carousels | GoToFlow';
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.content = 'Create high-converting social media content with AI. Generate carousels, posts, reels scripts and content plans in seconds with GoToFlow.';
        const metaTitle = document.querySelector('meta[name="title"]');
        if (metaTitle) metaTitle.content = 'AI Content Generator for Social Media — Create Posts, Carousels & Reels Fast | GoToFlow';
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
    localStorage.setItem('lang', newLang === 'RU' ? 'ru' : 'en');
    navigate(paired);
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
