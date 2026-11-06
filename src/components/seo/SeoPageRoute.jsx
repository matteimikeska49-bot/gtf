import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { CookieBanner } from '../CookieBanner';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { MainLayout } from '../MainLayout';
import { NotFoundPage } from '../NotFoundPage';
import { getSeoPageByRoute } from '../../content/seoPages';
import { SeoPageHead } from './SeoPageHead';
import { SeoPageTemplate } from './SeoPageTemplate';

export const SeoPageRoute = ({ pageType, pageTypes, slug: propSlug, language = 'ru' }) => {
  const { slug: routeSlug } = useParams();
  const slug = propSlug || routeSlug;
  const location = useLocation();
  const types = pageTypes || [pageType];
  const page = types
    .filter(Boolean)
    .map((type) => getSeoPageByRoute({ language, pageType: type, slug, path: location.pathname }))
    .find(Boolean);

  // Native GA4 and the consent bootstrap own page views on all routes.
  // Do not emit an unmapped seo_page_view alongside those provider views.

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
