import React, { useEffect } from 'react';
import { LegalPageLayout } from './LegalPageLayout';
import { useLanguage } from '../context/LanguageContext';

const RefundSEOHead = () => {
  useEffect(() => {
    const title = 'Refund & Cancellation Policy — GoToFlow';
    const desc = 'GoToFlow Refund & Cancellation Policy: subscription cancellation, refunds, billing errors, and payment disputes.';
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
    setMeta('og:url', 'https://gotoflow.io/refund-policy', true);
    setMeta('twitter:title', title, true);
    setMeta('twitter:description', desc, true);

    setLink('canonical', 'https://gotoflow.io/refund-policy');
    document.documentElement.lang = 'en';

    return () => { document.title = 'GoToFlow'; };
  }, []);

  return null;
};

export const RefundPolicyPage = () => {
  const { t } = useLanguage();
  const sections = t('legal.refund.sections');

  return (
    <LegalPageLayout
      title={t('legal.refund.title')}
      effectiveDate="Effective date: February 19, 2026"
      sections={sections}
    >
      <RefundSEOHead />
    </LegalPageLayout>
  );
};
