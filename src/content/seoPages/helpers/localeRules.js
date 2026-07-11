export const SEO_PAGE_LOCALES = {
  en: {
    pathPrefix: '',
    designReference: '/',
  },
  ru: {
    pathPrefix: '/ru',
    designReference: '/ru',
  },
};

const SITE_ORIGIN = 'https://gotoflow.io';

const toUrlPath = (value) => {
  if (typeof value !== 'string' || !value.trim()) return '';
  const trimmed = value.trim();

  try {
    if (/^https?:\/\//i.test(trimmed)) {
      return new URL(trimmed).pathname.replace(/\/$/, '') || '/';
    }
  } catch {
    return trimmed;
  }

  return trimmed.replace(/\/$/, '') || '/';
};

const hasEnPrefix = (path) => path === '/en' || path.startsWith('/en/');
const isRuPath = (path) => path === '/ru' || path.startsWith('/ru/');
const isRootLanguagePath = (path) => path.startsWith('/') && !hasEnPrefix(path) && !isRuPath(path);

export const getExpectedSeoPageCanonical = (page) => `${SITE_ORIGIN}${page.path}`;

export const getLocaleRuleErrors = (page) => {
  const errors = [];
  const locale = SEO_PAGE_LOCALES[page.language];
  const id = page.id || page.path || '(missing id)';
  const path = toUrlPath(page.path);

  if (!locale) {
    errors.push(`${id} has invalid language for SEO page locale rules: ${page.language}`);
    return errors;
  }

  if (hasEnPrefix(path)) {
    errors.push(`${id} path ${page.path} uses forbidden /en prefix. English SEO pages live at root paths.`);
  }

  if (page.language === 'ru' && !isRuPath(path)) {
    errors.push(`${id} language=ru must use a /ru path. Got ${page.path}`);
  }

  if (page.language === 'en' && !isRootLanguagePath(path)) {
    errors.push(`${id} language=en must use a root path without /en or /ru. Got ${page.path}`);
  }

  if (page.designReference !== locale.designReference) {
    errors.push(`${id} language=${page.language} must use designReference=${locale.designReference}. Got ${page.designReference}`);
  }

  const canonicalCandidates = [
    page.canonical,
    page.canonicalUrl,
    page.canonicalHref,
  ].filter(Boolean);

  canonicalCandidates.forEach((canonical) => {
    const canonicalPath = toUrlPath(canonical);

    if (hasEnPrefix(canonicalPath)) {
      errors.push(`${id} canonical ${canonical} uses forbidden /en prefix.`);
    }

    if (page.language === 'ru' && !isRuPath(canonicalPath)) {
      errors.push(`${id} language=ru canonical must use /ru path. Got ${canonical}`);
    }

    if (page.language === 'en' && !isRootLanguagePath(canonicalPath)) {
      errors.push(`${id} language=en canonical must use root path without /en or /ru. Got ${canonical}`);
    }

    if (canonicalPath !== path) {
      errors.push(`${id} canonical ${canonical} must match page path ${page.path}.`);
    }
  });

  (page.hreflang || []).forEach((item) => {
    const href = item?.href;
    const lang = item?.lang || item?.hreflang;
    const hrefPath = toUrlPath(href);

    if (!href || !hrefPath) {
      errors.push(`${id} has hreflang item without href.`);
      return;
    }

    if (hasEnPrefix(hrefPath)) {
      errors.push(`${id} hreflang href ${href} uses forbidden /en prefix.`);
    }

    if (lang === 'ru' && !isRuPath(hrefPath)) {
      errors.push(`${id} hreflang ru href must use /ru path. Got ${href}`);
    }

    if ((lang === 'en' || lang === 'x-default') && !isRootLanguagePath(hrefPath)) {
      errors.push(`${id} hreflang ${lang} href must use root path without /en or /ru. Got ${href}`);
    }
  });

  return errors;
};
