import React, { useEffect } from 'react';
import { LegalPageLayout } from './LegalPageLayout';
import { useLanguage } from '../context/LanguageContext';

const TermsSEOHead = () => {
  useEffect(() => {
    const title = 'Terms of Service — GoToFlow';
    const desc = 'GoToFlow Terms of Use: service rules, user responsibilities, account terms, and conditions for using AI content generation tools.';
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
    setMeta('description', desc);
    setMeta('og:title', title, true);
    setMeta('og:description', desc, true);
    setMeta('og:url', 'https://gotoflow.io/terms-of-service', true);
    setMeta('twitter:title', title, true);
    setMeta('twitter:description', desc, true);

    setLink('canonical', 'https://gotoflow.io/terms-of-service');
    document.documentElement.lang = 'en';

    return () => { document.title = 'GoToFlow'; };
  }, []);

  return null;
};

export const TermsOfServicePage = () => {
  const { t } = useLanguage();
  const sections = t('legal.terms.sections');

  return (
    <LegalPageLayout
      title={t('legal.terms.title')}
      effectiveDate="Effective date: February 19, 2026"
      sections={sections}
    >
      <TermsSEOHead />
    </LegalPageLayout>
  );
};
