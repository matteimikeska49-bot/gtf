import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CookieBanner } from '../CookieBanner';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { MainLayout } from '../MainLayout';
import { NotFoundPage } from '../NotFoundPage';
import {
  SEO_PAGE_HUBS,
  getIndexableSeoPagesByType,
  getPublishedSeoPagesByType,
} from '../../content/seoPages';
import { SeoPageSEOHead } from './SeoPageSEOHead';

export const SeoHubPage = ({ pageType }) => {
  const hub = SEO_PAGE_HUBS[pageType];
  const pages = useMemo(() => getPublishedSeoPagesByType(pageType), [pageType]);
  const indexablePages = useMemo(() => getIndexableSeoPagesByType(pageType), [pageType]);

  if (!hub) {
    return <NotFoundPage />;
  }

  const headPage = {
    id: `ru-hub-${pageType}`,
    language: 'ru',
    pageType,
    slug: hub.path.split('/').pop(),
    path: hub.path,
    title: `${hub.title} | GoToFlow`,
    description: hub.description,
    h1: hub.h1,
    heroSubtitle: hub.description,
    primaryKeyword: hub.h1,
    secondaryKeywords: [],
    searchIntent: 'hub',
    priority: 0.4,
    commercialValue: 0.4,
    productBridge: hub.description,
    cta: { label: 'Открыть GoToFlow', href: 'https://app.gotoflow.io' },
    sections: [],
    faq: [],
    relatedSeoPages: [],
    relatedBlogSlugs: [],
    breadcrumbs: [
      { label: 'Главная', path: '/ru' },
      { label: hub.label, path: hub.path },
    ],
    schemaType: 'WebPage',
    published: true,
    noindex: indexablePages.length === 0,
    lastUpdated: '2026-07-08',
  };

  return (
    <MainLayout>
      <SeoPageSEOHead page={headPage} />
      <Header />
      <main className="relative z-10 px-6 pb-24 pt-32">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap items-center gap-2 text-sm text-zinc-500">
            <Link to="/ru" className="transition-colors hover:text-white">Главная</Link>
            <span className="text-zinc-700">/</span>
            <span className="text-zinc-300">{hub.label}</span>
          </nav>

          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-pink-300">{hub.label}</p>
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">{hub.h1}</h1>
            <p className="mt-6 text-base leading-8 text-zinc-300 md:text-lg">{hub.description}</p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {pages.map((page) => (
              <Link
                key={page.id}
                to={page.path}
                className="group rounded-lg border border-white/[0.08] bg-white/[0.025] p-6 transition-colors hover:border-pink-400/30 hover:bg-white/[0.04]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-white">{page.h1}</h2>
                    <p className="mt-3 text-sm leading-7 text-zinc-400">{page.description}</p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-zinc-500 transition-transform group-hover:translate-x-1 group-hover:text-pink-300" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </MainLayout>
  );
};
