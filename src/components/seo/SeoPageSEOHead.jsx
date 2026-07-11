import { useEffect } from 'react';
import {
  buildSchema,
  getBreadcrumbSchema,
  getFAQPageSchema,
  getOrganizationSchema,
  getSoftwareSchema,
  getWebApplicationSchema,
  getWebPageSchema,
  getWebSiteSchema,
} from '../../utils/schemaGenerator';

const setMeta = (name, content, prop = false) => {
  if (!content) return;

  const selector = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let element = document.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  element.setAttribute(prop ? 'property' : 'name', name);
  element.setAttribute('content', content);
  element.setAttribute('data-seo-page-head', 'true');
};

const setLink = (rel, href, extra = {}) => {
  if (!href) return;

  const selector = extra.hreflang ? `link[rel="${rel}"][hreflang="${extra.hreflang}"]` : `link[rel="${rel}"]`;
  let element = document.querySelector(selector);

  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  element.setAttribute('rel', rel);
  element.setAttribute('href', href);
  Object.entries(extra).forEach(([key, value]) => element.setAttribute(key, value));
  element.setAttribute('data-seo-page-head', 'true');
};

const removeSeoPageHead = () => {
  document
    .querySelectorAll('[data-seo-page-head="true"], #seo-page-ld-json, link[rel="alternate"][hreflang]')
    .forEach((element) => element.remove());
};

const buildStructuredDataItems = (page, canonical) => {
  const items = [
    getOrganizationSchema(),
    getWebSiteSchema(page.language),
    getWebPageSchema(page.path, page.title, page.description, page.language),
  ];

  if (page.schemaType === 'SoftwareApplication') {
    items.push(getSoftwareSchema(page.path, page.title, page.description, page.language));
  }

  if (page.schemaType === 'WebApplication') {
    items.push(getWebApplicationSchema(page.path, page.title, page.description, page.language));
  }

  if (Array.isArray(page.breadcrumbs) && page.breadcrumbs.length > 0) {
    items.push(getBreadcrumbSchema(
      page.breadcrumbs.map((crumb) => ({ name: crumb.label, path: crumb.path })),
      page.path
    ));
  }

  if (Array.isArray(page.faq) && page.faq.length > 0) {
    items.push(getFAQPageSchema(
      page.faq.map((item) => ({ q: item.question, a: item.answer })),
      page.path
    ));
  }

  return buildSchema(items.map((item) => ({
    ...item,
    ...(item['@type'] === 'WebPage' ? { url: canonical } : {}),
  })));
};

export const SeoPageSEOHead = ({ page }) => {
  useEffect(() => {
    const title = page.title;
    const description = page.description;
    const canonical = `https://gotoflow.io${page.path}`;

    removeSeoPageHead();

    document.title = title;
    document.documentElement.lang = page.language || 'ru';

    setMeta('title', title);
    setMeta('description', description);
    setMeta('robots', page.noindex ? 'noindex, nofollow' : 'index, follow');
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:url', canonical, true);
    setMeta('og:type', 'website', true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:url', canonical);
    setLink('canonical', canonical);

    if (page.state === 'indexable_approved' && page.noindex !== true && Array.isArray(page.hreflang)) {
      page.hreflang.forEach((item) => {
        setLink('alternate', item.href, { hreflang: item.lang });
      });
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'seo-page-ld-json';
    script.text = JSON.stringify(buildStructuredDataItems(page, canonical));
    document.head.appendChild(script);

    return () => {
      removeSeoPageHead();
      document.title = 'GoToFlow';
    };
  }, [page]);

  return null;
};
