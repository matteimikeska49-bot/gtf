import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { CookieBanner } from '../CookieBanner';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { MainLayout } from '../MainLayout';
import { getMarkdownArticleBySlug } from '../../lib/blog/markdownArticles';
import { MarkdownSeoArticleTemplateV2 } from './templates/MarkdownSeoArticleTemplateV2';
import { NotFoundPage } from '../NotFoundPage';
import {
  getOrganizationSchema,
  getWebSiteSchema,
  getArticleSchema,
  getBreadcrumbSchema,
  getFAQPageSchema,
  buildSchema
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
};

const MarkdownArticleSEOHead = ({ article }) => {
  useEffect(() => {
    const title = `${article.title} | GoToFlow`;
    const description = article.description;
    const langPrefix = article.language === 'ru' ? '/ru' : '';
    const canonical = article.canonical || `https://gotoflow.io${langPrefix}/blog/${article.slug}`;

    document.title = title;
    document.documentElement.lang = article.language || 'en';

    setMeta('title', title);
    setMeta('description', description);
    setMeta('robots', article.noindex ? 'noindex, nofollow' : 'index, follow');
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:url', canonical, true);
    setMeta('og:type', 'article', true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:url', canonical);
    setLink('canonical', canonical);

    if (article.ogImage) {
      setMeta('og:image', article.ogImage, true);
      setMeta('twitter:image', article.ogImage);
    }

    if (Array.isArray(article.hreflang)) {
      article.hreflang.forEach((item) => {
        setLink('alternate', item.href, { hreflang: item.lang });
      });
    }

    const path = `${langPrefix}/blog/${article.slug}`;
    const items = [
      getOrganizationSchema(),
      getWebSiteSchema(article.language || 'en'),
      getArticleSchema(path, title, description, article.language || 'en')
    ];

    const blogLabel = article.language === 'ru' ? 'Блог' : 'Blog';
    const homeLabel = article.language === 'ru' ? 'Главная' : 'Home';
    const crumbs = [
      { name: homeLabel, path: langPrefix || '/' },
      { name: blogLabel, path: `${langPrefix}/blog` },
      { name: title, path }
    ];
    items.push(getBreadcrumbSchema(crumbs, path));

    if (article.faq && Array.isArray(article.faq) && article.faq.length > 0) {
      const faqItems = article.faq.map(item => ({
        q: item.question,
        a: item.answer
      }));
      items.push(getFAQPageSchema(faqItems, path));
    }

    const schema = buildSchema(items);
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'article-ld-json';
    script.text = JSON.stringify(schema);
    
    const existing = document.getElementById('article-ld-json');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const robotsMeta = document.querySelector('meta[name="robots"]');
      const robotsContent = article.noindex ? 'noindex, nofollow' : 'index, follow';

      if (robotsMeta?.getAttribute('content') === robotsContent) {
        robotsMeta.remove();
      }

      document.title = 'GoToFlow';

      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [article]);

  return null;
};

export const MarkdownBlogArticlePage = ({ slug: propSlug, langPrefix = 'en' }) => {
  const params = useParams();
  const slug = propSlug || params.slug;
  const article = getMarkdownArticleBySlug(slug);

  const isLocalPreview = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  // Allow previewing on production only if explicitly marked as preview and noindex
  const isPreviewable = isLocalPreview || (article?.preview === true && article?.noindex === true);

  if (!article || article.language !== langPrefix || (article.published === false && !isPreviewable)) {
    return <NotFoundPage />;
  }

  return (
    <MainLayout>
      <MarkdownArticleSEOHead article={article} />
      <Header />
      <MarkdownSeoArticleTemplateV2 article={article} />
      <Footer />
      <CookieBanner />
    </MainLayout>
  );
};
