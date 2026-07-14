import { ArrowRight } from 'lucide-react';
import { getAppUrlWithRef } from '../../../utils/url';
import { SEO_ANALYTICS_EVENTS, SEO_APP_ORIGIN } from '../../../content/seoPages/releaseContracts';
import { trackSeoEvent } from '../seoAnalytics';
import { SeoSectionHeading } from '../SeoSectionHeading';

/* Distinct visual previews for each category type */
const ChecklistPreview = () => (
  <div className="absolute inset-0 rounded-xl border border-white/10 bg-gradient-to-b from-emerald-500/[0.08] to-transparent p-4 backdrop-blur transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
    <div className="mb-3 text-[11px] font-bold text-emerald-300 uppercase tracking-wider">Чек-лист</div>
    {['Определить цель карусели', 'Написать хук для обложки', 'Добавить 5 практических пунктов'].map((text, i) => (
      <div key={i} className="mb-2.5 flex items-center gap-2">
        <div className="h-3.5 w-3.5 shrink-0 rounded border border-emerald-400/50 bg-emerald-500/10 flex items-center justify-center">
          {i === 0 && <div className="h-1.5 w-1.5 rounded-sm bg-emerald-400" />}
        </div>
        <span className="text-[10px] text-zinc-400 leading-tight">{text}</span>
      </div>
    ))}
  </div>
);

const ProblemSolutionPreview = () => (
  <div className="absolute inset-0 flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
    <div className="h-1/2 w-full border-b border-white/5 bg-red-500/[0.08] p-3">
      <div className="text-[10px] font-bold text-red-300 uppercase tracking-wider mb-1">Проблема</div>
      <div className="text-[10px] text-zinc-400 leading-snug">Клиенты не читают карусели дальше 2-го слайда</div>
    </div>
    <div className="h-1/2 w-full bg-emerald-500/[0.08] p-3">
      <div className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider mb-1">Решение</div>
      <div className="text-[10px] text-zinc-400 leading-snug">Каждый слайд содержит микро-ценность и ведёт к следующему</div>
    </div>
  </div>
);

const MistakePreview = () => (
  <div className="absolute inset-0 rounded-xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
    <div className="text-[10px] font-bold text-amber-300 uppercase tracking-wider mb-3">Разбор ошибок</div>
    <div className="flex h-[calc(100%-24px)] gap-2">
      <div className="h-full w-1/2 rounded-lg border border-red-500/20 bg-red-500/[0.05] p-2 flex flex-col">
        <div className="text-[9px] font-bold text-red-400/70 mb-1">✕ Неправильно</div>
        <div className="h-1.5 w-full rounded bg-red-400/20 mb-1" />
        <div className="h-1.5 w-3/4 rounded bg-red-400/15" />
      </div>
      <div className="h-full w-1/2 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.05] p-2 flex flex-col">
        <div className="text-[9px] font-bold text-emerald-400/70 mb-1">✓ Правильно</div>
        <div className="h-1.5 w-full rounded bg-emerald-400/20 mb-1" />
        <div className="h-1.5 w-full rounded bg-emerald-400/15" />
      </div>
    </div>
  </div>
);

const CaseStudyPreview = () => (
  <div className="absolute inset-0 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.05] p-3 backdrop-blur transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
    <div className="flex h-[80%] w-[42%] flex-col justify-end rounded-lg border border-zinc-700 bg-zinc-800/50 p-2">
      <div className="text-[9px] font-bold text-zinc-500 uppercase mb-1">До</div>
      <div className="h-6 w-full rounded bg-zinc-700/50" />
      <div className="mt-1 h-1 w-2/3 rounded bg-zinc-700/30" />
    </div>
    <div className="flex flex-col items-center gap-1">
      <ArrowRight className="h-3 w-3 text-pink-400/60" />
    </div>
    <div className="flex h-[80%] w-[42%] flex-col justify-end rounded-lg border border-pink-500/20 bg-gradient-to-t from-pink-500/15 to-transparent p-2">
      <div className="text-[9px] font-bold text-pink-300 uppercase mb-1">После</div>
      <div className="h-12 w-full rounded bg-pink-500/15" />
      <div className="mt-1 h-1 w-full rounded bg-pink-500/20" />
    </div>
  </div>
);

const AnnouncementPreview = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-white/10 bg-gradient-to-b from-violet-500/[0.08] to-transparent p-4 text-center backdrop-blur transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
    <div className="mb-2 h-10 w-10 rounded-full bg-gradient-to-br from-pink-500/30 to-orange-500/30 flex items-center justify-center">
      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-pink-500/50 to-orange-500/50" />
    </div>
    <div className="text-[11px] font-bold text-white mb-1">Новый курс</div>
    <div className="text-[9px] text-zinc-400 leading-snug mb-2">Для кого · Что внутри · Следующий шаг</div>
    <div className="h-5 w-20 rounded-full bg-gradient-to-r from-pink-500/30 to-orange-500/30 border border-pink-500/20" />
  </div>
);

const renderCategoryPreview = (index) => {
  switch (index % 5) {
    case 0: return <ChecklistPreview />;
    case 1: return <ProblemSolutionPreview />;
    case 2: return <MistakePreview />;
    case 3: return <CaseStudyPreview />;
    case 4:
    default: return <AnnouncementPreview />;
  }
};

export const SeoPageTemplateCategories = ({ page }) => {
  const categories = page.templateCategories || page.templates || [];
  if (!categories.length) return null;
  const ctaHref = page.categoryCta?.href || page.conversion?.destinationUrl || SEO_APP_ORIGIN;
  const ctaLabel = page.categoryCta?.label || 'Создать в GoToFlow';
  const intro = page.templateCategoriesIntro || {};
  const eyebrow = intro.eyebrow || 'Категории';
  const heading = intro.heading || {
    before: 'Популярные форматы ',
    accent: 'шаблонов',
    after: '',
  };

  return (
    <section id="template-categories" className="border-t border-white/[0.08] py-16 md:py-24">
      <SeoSectionHeading eyebrow={eyebrow} heading={heading} sectionId="template-categories" />

      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((item, index) => (
          <a
            key={item.title}
            href={getAppUrlWithRef(ctaHref)}
            onClick={() => trackSeoEvent(SEO_ANALYTICS_EVENTS.categoryCtaClick, page, {
              category_index: index,
              category_title: item.title,
              cta_label: ctaLabel,
              target_url: ctaHref,
              destination_type: page.conversion?.destinationType || 'app',
            })}
            className="group relative flex min-h-11 w-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-pink-500/30 hover:bg-white/[0.05] hover:shadow-[0_8px_30px_rgba(236,72,153,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60 sm:p-6"
          >
            {/* Abstract Preview */}
            <div className="mb-6 h-36 w-full rounded-2xl bg-zinc-900/50 p-4 ring-1 ring-white/5">
              <div className="relative h-full w-full">
                <div className="absolute left-2 top-2 h-full w-full rounded-xl border border-white/5 bg-white/[0.02] transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
                {renderCategoryPreview(index)}
              </div>
            </div>

            <h3 className="text-xl font-semibold leading-snug text-white" style={{ textWrap: 'balance' }}>{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-400" style={{ textWrap: 'pretty' }}>{item.body || item.description}</p>

            <div className="mt-auto pt-6 flex items-center gap-2 text-sm font-semibold text-pink-300">
              <span>{ctaLabel}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
