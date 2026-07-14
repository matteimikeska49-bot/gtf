import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getMarkdownArticleBySlug } from '../../lib/blog/markdownArticles';
import { getSeoPageByPath } from '../../content/seoPages';
import { SEO_ANALYTICS_EVENTS } from '../../content/seoPages/releaseContracts';
import { trackSeoEvent } from './seoAnalytics';

const RelatedCard = ({ to, title, description, page, linkType }) => (
  <Link
    to={to}
    onClick={() => trackSeoEvent(SEO_ANALYTICS_EVENTS.relatedLinkClick, page, {
      link_type: linkType,
      link_label: title,
      target_url: to,
    })}
    className="group block min-h-11 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 transition-colors hover:border-pink-400/30 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60"
  >
    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className="text-base font-semibold text-white">{title}</h3>
        {description && <p className="mt-2 text-sm leading-6 text-zinc-400">{description}</p>}
      </div>
      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-zinc-500 transition-transform group-hover:translate-x-1 group-hover:text-pink-300" />
    </div>
  </Link>
);

const PRODUCT_CARDS_MAP = {
  '/ru/generator-karuselej-instagram': {
    title: 'Генератор каруселей Instagram',
    description: 'Создайте готовую карусель с помощью ИИ: обложка, структура слайдов, текст, визуал и CTA.',
  }
};

export const SeoPageRelatedLinks = ({ page }) => {
  const customCards = page.relatedCards || [];
  const relatedSeoPages = (page.relatedSeoPaths || [])
    .map((routePath) => getSeoPageByPath(routePath))
    .filter(Boolean);

  const relatedBlogArticles = (page.relatedBlogSlugs || [])
    .map((slug) => getMarkdownArticleBySlug(slug, { publicOnly: true }))
    .filter(Boolean);

  if (!customCards.length && !relatedSeoPages.length && !relatedBlogArticles.length && !page.relatedProductToolPaths?.length) {
    return null;
  }

  return (
    <section id="related-content" data-seo-section="related-content" className="border-t border-white/[0.08] py-16 md:py-20">
      <div className="mb-8 max-w-3xl">
        {page.relatedIntro?.eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-pink-300">
            {page.relatedIntro.eyebrow}
          </p>
        )}
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Связанные материалы</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {customCards.map((item) => (
          <RelatedCard key={item.href} page={page} linkType={item.type || 'contract_related'} to={item.href} title={item.title} description={item.description} />
        ))}

        {!customCards.length && relatedSeoPages.map((item) => (
          <RelatedCard key={item.id} page={page} linkType="seo_page" to={item.path} title={item.h1} description={item.description} />
        ))}

        {!customCards.length && relatedBlogArticles.map((article) => {
          const routePath = article.language === 'ru' ? `/ru/blog/${article.slug}` : `/blog/${article.slug}`;
          return (
            <RelatedCard key={article.slug} page={page} linkType="blog_article" to={routePath} title={article.title} description={article.description} />
          );
        })}

        {!customCards.length && page.relatedProductToolPaths?.map((routePath) => {
          const info = PRODUCT_CARDS_MAP[routePath] || { title: 'Инструмент GoToFlow', description: 'Перейти к продукту' };
          return (
            <RelatedCard key={routePath} page={page} linkType="product_tool" to={routePath} title={info.title} description={info.description} />
          );
        })}
      </div>
    </section>
  );
};
