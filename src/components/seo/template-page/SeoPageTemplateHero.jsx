import { SeoPageBreadcrumbs } from '../SeoPageHero';
import { SeoPageCTA } from '../SeoPageCTA';
import { Sparkles, ArrowDown } from 'lucide-react';

const DEFAULT_HERO_CAROUSEL_IMAGES = [
  {
    src: '/images/niches/ru/content-ru-9.webp',
    alt: 'Пример карусели: экспертный пост',
  },
  {
    src: '/images/niches/ru/content-ru-10.webp',
    alt: 'Пример карусели: продуктовый кейс',
  },
  {
    src: '/images/niches/ru/content-ru-5.webp',
    alt: 'Пример карусели: готовый шаблон с обложкой и слайдами',
  },
];

const HeroCarouselComposition = ({ images = DEFAULT_HERO_CAROUSEL_IMAGES, badge = 'Шаблон' }) => {
  const [left, right, center] = images.length >= 3 ? images : DEFAULT_HERO_CAROUSEL_IMAGES;

  return (
  <div className="relative h-[400px] w-full max-w-lg md:h-[500px]">
    {/* Ambient glow */}
    <div className="absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/[0.15] blur-[80px]" />
    <div className="absolute left-1/3 top-1/3 -z-10 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/[0.1] blur-[60px]" />

    {/* Card 1: Back left — real image */}
    <div className="absolute left-4 top-12 h-64 w-48 -rotate-12 rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl overflow-hidden transition-transform duration-500 hover:-translate-y-4 hover:rotate-[-8deg] md:left-0 md:h-80 md:w-56" style={{ transformStyle: 'preserve-3d' }}>
      <img src={left.src} alt={left.alt} className="h-full w-full object-cover opacity-80" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </div>

    {/* Card 2: Back right — real image */}
    <div className="absolute right-4 top-20 h-64 w-48 rotate-12 rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl overflow-hidden transition-transform duration-500 hover:-translate-y-4 hover:rotate-[8deg] md:right-0 md:h-80 md:w-56" style={{ transformStyle: 'preserve-3d' }}>
      <img src={right.src} alt={right.alt} className="h-full w-full object-cover opacity-80" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </div>

    {/* Card 3: Foreground center — real image, prominent */}
    <div className="absolute left-1/2 top-4 z-10 h-72 w-56 -translate-x-1/2 rounded-2xl border border-white/20 bg-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transition-transform duration-500 hover:-translate-y-4 md:h-[360px] md:w-[280px]" style={{ transformStyle: 'preserve-3d' }}>
      <img src={center.src} alt={center.alt} className="h-full w-full object-cover" loading="eager" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="inline-flex rounded-full bg-pink-500/20 px-3 py-1 text-[10px] font-bold text-pink-200 backdrop-blur-sm border border-pink-500/20 mb-2">
          {badge}
        </div>
      </div>
    </div>
  </div>
);
};

const renderH1 = (text) => {
  if (!text) return null;
  /* Accent the keyword phrase while keeping rendering generic */
  const accentMap = {
    'Instagram': 'Instagram',
    'LinkedIn': 'LinkedIn',
    'Telegram': 'Telegram',
  };

  for (const [keyword, display] of Object.entries(accentMap)) {
    if (text.includes(keyword)) {
      const parts = text.split(keyword);
      if (parts.length === 2) {
        return (
          <>
            {parts[0]}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">{display}</span>
            {parts[1]}
          </>
        );
      }
    }
  }
  return text;
};

export const SeoPageTemplateHero = ({ page }) => {
  const heroImages = Array.isArray(page.heroCarouselImages)
    ? page.heroCarouselImages.map((image) => ({
      src: image.src || image.assetPath,
      alt: image.alt,
    })).filter((image) => image.src && image.alt)
    : DEFAULT_HERO_CAROUSEL_IMAGES;
  const scrollToNext = (e) => {
    e.preventDefault();
    const nextSection = document.getElementById('template-categories');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative isolate overflow-hidden px-6 pb-16 pt-32 md:pb-24 md:pt-36">
      <div className="absolute left-0 top-0 -z-10 h-[600px] w-full bg-gradient-to-b from-pink-500/[0.03] to-transparent" />

      <div className="mx-auto max-w-7xl">
        <SeoPageBreadcrumbs breadcrumbs={page.breadcrumbs} />

        <div className="grid items-center gap-16 md:grid-cols-2 md:gap-8">
          {/* Left Column: Content */}
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-300 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-pink-300" />
              <span>Шаблоны и структуры</span>
            </div>

            <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {renderH1(page.h1)}
            </h1>

            <p className="mt-6 text-lg leading-8 text-zinc-400">
              {page.heroSubtitle || page.description}
            </p>

            <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <SeoPageCTA cta={page.cta} page={page} ctaPosition="hero" />

              <a
                href="#template-categories"
                onClick={scrollToNext}
                className="group flex min-h-11 items-center gap-2 rounded-full px-1 text-sm font-semibold text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60"
              >
                <span>Посмотреть структуры</span>
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
              </a>
            </div>

            {page.cta?.note && (
              <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-500">{page.cta.note}</p>
            )}
          </div>

          {/* Right Column: Real carousel composition */}
          <div className="flex justify-center md:justify-end">
            <HeroCarouselComposition images={heroImages} badge={page.heroVisualBadge || 'Шаблон'} />
          </div>
        </div>
      </div>
    </section>
  );
};
