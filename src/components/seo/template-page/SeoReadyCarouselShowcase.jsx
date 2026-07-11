import { SeoPageCTA } from '../SeoPageCTA';
import { getAppUrlWithRef } from '../../../utils/url';
import { SEO_ANALYTICS_EVENTS } from '../../../content/seoPages/releaseContracts';
import { trackSeoEvent } from '../seoAnalytics';

export const SeoReadyCarouselShowcase = ({ page }) => {
  const showcase = page.readyCarouselShowcase || [];
  if (!showcase.length) return null;
  const showcaseCta = page.readyCarouselShowcaseCta || {
    label: 'Выбрать структуру и создать карусель',
    href: 'https://app.gotoflow.io',
    action: 'open_app',
    note: 'Перед публикацией результат можно проверить и отредактировать.',
  };
  const showcaseCardHref = getAppUrlWithRef(showcaseCta.href);

  return (
    <section id="ready-carousel-showcase" className="border-t border-white/[0.08] py-14 md:py-20">
      <div className="mb-9 max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-pink-300">Готовый результат</p>
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          Посмотрите, какие карусели можно создать в{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">GoToFlow</span>
        </h2>
        <p className="mt-4 text-zinc-400 leading-relaxed">Готовая структура, текст по слайдам, визуальная подача и CTA — результат, который можно сразу забирать в работу.</p>
      </div>

      <div className="mx-auto grid max-w-[340px] grid-cols-[minmax(0,340px)] justify-center gap-4 md:max-w-[696px] md:grid-cols-[repeat(2,minmax(0,340px))] xl:max-w-[1052px] xl:grid-cols-[repeat(3,minmax(0,340px))]">
        {showcase.map((item, index) => (
          <a
            key={index}
            href={showcaseCardHref}
            onClick={() => trackSeoEvent(SEO_ANALYTICS_EVENTS.showcaseCardClick, page, {
              showcase_index: index,
              showcase_title: item.title,
              showcase_type: item.type,
              target_url: showcaseCta.href,
              destination_type: page.conversion?.destinationType || 'app',
            })}
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-pink-500/30 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50"
          >
            {/* Real carousel image */}
            {item.image && (
              <div className="relative h-[300px] w-full overflow-hidden bg-zinc-950 sm:h-[320px] xl:h-[330px]">
                <img
                  src={item.image}
                  alt={`Пример карусели: ${item.title}`}
                  width={item.width}
                  height={item.height}
                  className="absolute inset-0 h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Type badge */}
                {item.type && (
                  <span className="absolute top-3 left-3 inline-flex rounded-full bg-pink-500/20 px-3 py-1 text-xs font-bold text-pink-200 backdrop-blur-sm border border-pink-500/20">
                    {item.type}
                  </span>
                )}

                {/* Hover overlay CTA */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                  <span className="rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg">
                    Создать карусель в GoToFlow
                  </span>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
              <h3 className="mb-2 text-[17px] font-semibold leading-snug text-white">{item.title}</h3>
              <p className="mb-3 line-clamp-4 text-[14px] leading-6 text-zinc-400">{item.body}</p>
              {item.audience && (
                <p className="mt-auto line-clamp-2 text-[13px] leading-5 text-zinc-400">
                  <span className="text-zinc-500">Кому подходит:</span> {item.audience}
                </p>
              )}
            </div>
          </a>
        ))}
      </div>

      {/* Section CTA */}
      <div className="mt-9 flex flex-col items-center gap-3">
        <SeoPageCTA cta={showcaseCta} page={page} ctaPosition="showcase" />
        {showcaseCta.note && (
          <p className="text-sm text-zinc-400">{showcaseCta.note}</p>
        )}
      </div>
    </section>
  );
};
