import React, { useEffect } from 'react';
import { LegalPageLayout } from './LegalPageLayout';
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

    const desc = lang === 'RU' 
      ? 'Политика конфиденциальности GoToFlow: как сервис собирает, использует, хранит и защищает данные пользователей при работе с инструментами ИИ для каруселей и контента.'
      : 'Privacy Policy for GoToFlow: how we collect, use, store, and protect user data when you use our AI carousel and content generation tools.';

    setMeta('title', title);
    setMeta('description', desc);
    setMeta('og:title', title, true);
    setMeta('og:description', desc, true);
    setMeta('twitter:title', title, true);
    setMeta('twitter:description', desc, true);

    if (lang === 'RU') {
      setLink('canonical', 'https://gotoflow.io/ru/politika');
      setLink('alternate', 'https://gotoflow.io/privacy-policy', { hreflang: 'en' });
      setLink('alternate', 'https://gotoflow.io/ru/politika', { hreflang: 'ru' });
      setLink('alternate', 'https://gotoflow.io/privacy-policy', { hreflang: 'x-default' });
      document.documentElement.lang = 'ru';
    } else {
      setLink('canonical', 'https://gotoflow.io/privacy-policy');
      setLink('alternate', 'https://gotoflow.io/privacy-policy', { hreflang: 'en' });
      setLink('alternate', 'https://gotoflow.io/ru/politika', { hreflang: 'ru' });
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
  const effectiveDate = lang === 'RU'
    ? 'Дата вступления в силу: 19 февраля 2026'
    : 'Effective date: February 19, 2026';

  return (
    <LegalPageLayout
      title={t('legal.privacy.title')}
      effectiveDate={effectiveDate}
      sections={sections}
    >
      <PrivacySEOHead lang={lang} />
    </LegalPageLayout>
  );
};
