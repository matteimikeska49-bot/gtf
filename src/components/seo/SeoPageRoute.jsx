import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { CookieBanner } from '../CookieBanner';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { MainLayout } from '../MainLayout';
import { NotFoundPage } from '../NotFoundPage';
import { getSeoPageByRoute } from '../../content/seoPages';
import { SeoPageHead } from './SeoPageHead';
import { SeoPageTemplate } from './SeoPageTemplate';
import { SEO_ANALYTICS_EVENTS } from '../../content/seoPages/releaseContracts';
import { trackSeoEvent } from './seoAnalytics';

export const SeoPageRoute = ({ pageType, pageTypes, slug: propSlug, language = 'ru' }) => {
  const { slug: routeSlug } = useParams();
  const slug = propSlug || routeSlug;
  const location = useLocation();
  const types = pageTypes || [pageType];
  const page = types
    .filter(Boolean)
    .map((type) => getSeoPageByRoute({ language, pageType: type, slug, path: location.pathname }))
    .find(Boolean);

  useEffect(() => {
    if (!page) return;
    trackSeoEvent(SEO_ANALYTICS_EVENTS.pageView, page, {
      route_path: location.pathname,
    });
  }, [location.pathname, page]);

  if (!page) {
    return <NotFoundPage />;
  }

  return (
    <MainLayout>
      <SeoPageHead page={page} />
      <Header />
      <SeoPageTemplate page={page} />
      <Footer />
      <CookieBanner />
    </MainLayout>
  );
};
