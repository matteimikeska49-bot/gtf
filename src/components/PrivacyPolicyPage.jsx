import React, { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MainLayout } from './MainLayout';
import { CookieBanner } from './CookieBanner';
import { useLanguage } from '../context/LanguageContext';

const PrivacySEOHead = ({ lang }) => {
  const { t } = useLanguage();
  useEffect(() => {
    const title = t('legal.privacy.title') + ' | GoToFlow';
    document.title = title;
    
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

    setMeta('title', title);
    setMeta('og:title', title, true);
    setMeta('twitter:title', title, true);
    
    if (lang === 'RU') {
      setLink('canonical', 'https://gotoflow.io/politika');
      setLink('alternate', 'https://gotoflow.io/privacy-policy', { hreflang: 'en' });
      setLink('alternate', 'https://gotoflow.io/politika', { hreflang: 'ru' });
      setLink('alternate', 'https://gotoflow.io/privacy-policy', { hreflang: 'x-default' });
      document.documentElement.lang = 'ru';
    } else {
      setLink('canonical', 'https://gotoflow.io/privacy-policy');
      setLink('alternate', 'https://gotoflow.io/privacy-policy', { hreflang: 'en' });
      setLink('alternate', 'https://gotoflow.io/politika', { hreflang: 'ru' });
      setLink('alternate', 'https://gotoflow.io/privacy-policy', { hreflang: 'x-default' });
      document.documentElement.lang = 'en';
    }

    return () => { document.title = 'GoToFlow'; };
  }, [lang, t]);
  
  return null;
};

export const PrivacyPolicyPage = () => {
  const { t, lang } = useLanguage();
  const sections = t('legal.privacy.sections');

  return (
    <MainLayout>
      <PrivacySEOHead lang={lang} />
      <Header />
      <main className="pt-32 pb-20 px-6 relative z-10 w-full bg-[#050505] flex-1">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">{t('legal.privacy.title')}</h1>
            <p className="text-sm text-zinc-500">GoToFlow · https://gotoflow.io</p>
          </div>
          
          <div className="flex flex-col gap-10">
            {Array.isArray(sections) && sections.map((sec, i) => (
              <div key={i}>
                <h3 className="text-lg font-bold text-white mb-4 tracking-tight">{sec.title}</h3>
                <ul className="flex flex-col gap-3">
                  {sec.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-4 text-zinc-400 text-base leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-500/60 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </MainLayout>
  );
};
