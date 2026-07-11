import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { SeoPageCTA } from './SeoPageCTA';

export const SeoPageBreadcrumbs = ({ breadcrumbs = [] }) => (
  <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap items-center gap-2 text-sm text-zinc-500">
    {breadcrumbs.map((crumb, index) => (
      <span key={`${crumb.path}-${crumb.label}`} className="inline-flex items-center gap-2">
        {index > 0 && <span className="text-zinc-700">/</span>}
        {index === breadcrumbs.length - 1 ? (
          <span className="text-zinc-300">{crumb.label}</span>
        ) : (
          <Link to={crumb.path} className="inline-flex min-h-11 items-center rounded-md transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60">
            {crumb.label}
          </Link>
        )}
      </span>
    ))}
  </nav>
);

export const SeoPageHero = ({ page }) => (
  <section className="relative isolate overflow-hidden px-6 pb-20 pt-32 md:pb-28 md:pt-36">
    <div className="absolute left-1/2 top-0 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-pink-500/[0.10] blur-[140px]" />
    <div className="absolute right-[-12%] top-32 -z-10 h-[380px] w-[520px] rounded-full bg-orange-500/[0.08] blur-[120px]" />
    <div className="mx-auto max-w-7xl">
      <SeoPageBreadcrumbs breadcrumbs={page.breadcrumbs} />
      <div className="max-w-5xl">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-300 backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-pink-300" />
          <span>{page.templateVariant}</span>
        </div>
        <h1 className="max-w-4xl text-5xl font-black leading-[0.96] tracking-tight text-white md:text-7xl">
          {page.h1}
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-300 md:text-xl">
          {page.heroSubtitle}
        </p>
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <SeoPageCTA cta={page.cta} />
          {page.cta?.note && <p className="max-w-sm text-sm leading-6 text-zinc-500">{page.cta.note}</p>}
        </div>
      </div>
    </div>
  </section>
);
