import { Link } from 'react-router-dom';
import {
  ArrowRight,
  FileText,
  Image,
  Link2,
  Mic,
  RefreshCcw,
  Sparkles,
  Type,
  Video,
  Wand2,
} from 'lucide-react';
import {
  buildProductWorkflowCarouselTypes,
  buildProductWorkflowMockups,
  buildProductWorkflowSteps,
} from '../../../content/seoPages/workflowPresets';
import { getAppUrlWithRef } from '../../../utils/url';
import { SEO_ANALYTICS_EVENTS } from '../../../content/seoPages/releaseContracts';
import { trackSeoEvent } from '../seoAnalytics';
import { SeoSectionHeading } from '../SeoSectionHeading';

const isExternalHref = (href) => /^https?:\/\//.test(href || '');

const getCtaHref = (href) => (
  href?.startsWith('https://app.gotoflow.io') ? getAppUrlWithRef(href) : href
);

const WorkflowCta = ({ cta, page }) => {
  if (!cta?.href || !cta?.label) return null;

  const className = 'inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 text-sm font-bold text-white shadow-[0_18px_48px_rgba(236,72,153,0.28)] transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 focus:ring-offset-[#050505] sm:w-auto';
  const content = (
    <>
      <Sparkles className="h-4 w-4" aria-hidden="true" />
      <span>{cta.label}</span>
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </>
  );

  const handleClick = () => trackSeoEvent(SEO_ANALYTICS_EVENTS.workflowCtaClick, page, {
    cta_label: cta.label,
    target_url: cta.href,
    target_action: cta.action || page?.conversion?.targetAction,
    destination_type: page?.conversion?.destinationType,
  });

  if (isExternalHref(cta.href)) {
    return <a href={getCtaHref(cta.href)} className={className} onClick={handleClick}>{content}</a>;
  }

  return <Link to={cta.href} className={className} onClick={handleClick}>{content}</Link>;
};

/* ─── Horizontal process step ─── */
const WorkflowStep = ({ step, index, className = '' }) => {
  return (
    <div
      data-workflow-step
      className={`flex min-h-[132px] min-w-0 flex-col rounded-2xl border border-white/[0.06] bg-white/[0.026] p-3.5 md:p-4 ${className}`}
    >
      <p
        className="mb-3 text-[12px] font-bold tracking-[0.08em] text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </p>
      <h3 className="text-[16px] font-semibold leading-snug text-white md:text-[18px]" style={{ textWrap: 'balance' }}>
        {step.title}
      </h3>
      <p
        className="mt-2 text-[14px] font-normal leading-6 text-zinc-400 md:text-[15px]"
        style={{ textWrap: 'pretty' }}
      >
        {step.description}
      </p>
    </div>
  );
};

/* ─── Product mockup visuals ─── */

const SourceStructureMockup = ({ carouselTypes = [] }) => {
  const sources = [
    ['Тема / текст', Type],
    ['Ссылка', Link2],
    ['Видео', Video],
    ['PDF', FileText],
    ['Голосовое', Mic],
  ];
  const structures = ['Экспертный разбор', 'Гайд', 'Чек-лист', 'Кейс / история', 'AIDA/PAS'];

  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.055] bg-black/35 p-2.5">
      <div className="mb-2 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        {carouselTypes.map((type) => (
          <div
            key={type.id}
            className="flex min-h-8 cursor-default items-center justify-center gap-1.5 rounded-lg border border-white/[0.055] bg-white/[0.025] px-2 py-1 text-center text-[10px] font-semibold leading-tight text-zinc-300"
          >
            <span>{type.label}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-white/[0.045] bg-white/[0.018] p-2">
          <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-zinc-500">Исходник</p>
          <div className="space-y-1">
            {sources.map(([label, Icon], index) => (
              <div
                key={label}
                className={`flex items-center gap-1.5 rounded-md border px-2 py-1.5 text-[11px] ${
                  index === 0
                    ? 'border-pink-400/18 bg-pink-500/8 text-zinc-200'
                    : 'border-white/[0.035] bg-black/20 text-zinc-400'
                }`}
              >
                <Icon className="h-3 w-3 shrink-0 text-zinc-500" aria-hidden="true" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-white/[0.045] bg-white/[0.018] p-2">
          <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-zinc-500">Структура</p>
          <div className="space-y-1">
            {structures.map((label, index) => (
              <div
                key={label}
                className={`flex items-center gap-1.5 rounded-md border px-2 py-1.5 text-[11px] ${
                  index === 0
                    ? 'border-orange-400/20 bg-orange-500/8 text-orange-100'
                    : 'border-white/[0.035] bg-black/20 text-zinc-400'
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${index === 0 ? 'bg-orange-300' : 'bg-zinc-600'}`} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TextReviewMockup = () => (
  <div className="overflow-hidden rounded-xl border border-white/[0.055] bg-black/35">
    <div className="flex border-b border-white/[0.06] text-[9px] font-bold uppercase tracking-[0.10em] text-zinc-500">
      <span className="px-2.5 py-1.5">Тип</span>
      <span className="px-2.5 py-1.5">Бриф</span>
      <span className="border-b-2 border-pink-400 px-2.5 py-1.5 text-white">Тексты</span>
    </div>
    <div className="p-2.5">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="rounded-md border border-emerald-400/15 bg-emerald-400/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-emerald-200">Редактируемо</span>
        <span className="inline-flex items-center gap-1 rounded-md border border-white/[0.06] bg-white/[0.03] px-1.5 py-0.5 text-[9px] text-zinc-400">
          <RefreshCcw className="h-2.5 w-2.5" aria-hidden="true" />
          Перегенерировать
        </span>
      </div>
      <div className="rounded-lg border border-white/[0.055] bg-white/[0.028] p-2.5">
        <p className="mb-1.5 text-[13px] font-bold leading-snug text-white">Как эксперту упаковать услугу в 7 слайдов</p>
        <ol className="space-y-1 text-[11px] leading-4 text-zinc-400">
          <li>1. Главная боль клиента</li>
          <li>2. Что меняется после работы</li>
          <li>3. Доказательство через пример</li>
          <li>4. CTA на консультацию</li>
        </ol>
      </div>
    </div>
  </div>
);

const VisualRouteMockup = ({ carouselTypes = [] }) => {
  const otherTypes = carouselTypes.filter((type) => ['seamless', 'animated'].includes(type.id));

  return (
    <div className="grid gap-2 rounded-xl border border-white/[0.055] bg-black/35 p-2.5">
      <div className="rounded-lg border border-white/[0.045] bg-white/[0.02] p-2.5">
        <div className="mb-1.5 flex items-center gap-1.5">
          <Wand2 className="h-3.5 w-3.5 text-pink-300" aria-hidden="true" />
          <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-zinc-300">AI</p>
        </div>
        <div className="grid grid-cols-2 gap-1.5 text-[11px] text-zinc-400">
          {['Готовый стиль', 'Свой промпт', 'Персонаж', 'Перегенерация'].map((item) => (
            <div
              key={item}
              className="rounded-md border border-white/[0.04] bg-black/20 px-2 py-1.5"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-white/[0.045] bg-white/[0.02] p-2.5">
        <div className="mb-1.5 flex items-center gap-1.5">
          <Image className="h-3.5 w-3.5 text-orange-300" aria-hidden="true" />
          <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-zinc-300">Шаблон</p>
        </div>
        <div className="grid grid-cols-2 gap-1.5 text-[11px] text-zinc-400">
          {['Формат', 'Стиль шаблона', 'Фон', 'CTA'].map((item) => (
            <div
              key={item}
              className="rounded-md border border-white/[0.04] bg-black/20 px-2 py-1.5"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-white/[0.045] bg-white/[0.02] p-2.5">
        <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-zinc-300">Другие типы</p>
        <div className="flex flex-wrap gap-1.5 text-[11px]">
          {otherTypes.map((type) => (
            <span
              key={type.id}
              className="inline-flex cursor-default items-center gap-1.5 rounded-md border border-white/[0.055] bg-black/20 px-2 py-1.5 text-zinc-300"
            >
              {type.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const EditorResultFallback = () => (
  <div className="rounded-xl border border-white/[0.055] bg-black/35 p-2.5">
    <div className="mb-2 flex items-center gap-1.5 text-[9px] text-zinc-400">
      <span className="rounded-md border border-white/[0.055] bg-white/[0.035] px-1.5 py-0.5">4:5</span>
      <span className="rounded-md border border-white/[0.055] bg-white/[0.035] px-1.5 py-0.5">5 слайдов</span>
      <span className="rounded-md border border-pink-400/18 bg-pink-500/10 px-1.5 py-0.5 text-pink-100">Редактор</span>
    </div>
    <div className="grid grid-cols-[52px_1fr] gap-2">
      <div className="space-y-1.5">
        {['01', '02', '03', '05'].map((item, index) => (
          <div key={item} className={`rounded-md border px-1.5 py-2 text-center text-[9px] font-bold ${index === 0 ? 'border-pink-400/25 bg-pink-500/10 text-white' : 'border-white/[0.055] bg-white/[0.03] text-zinc-400'}`}>{item}</div>
        ))}
      </div>
      <div className="overflow-hidden rounded-lg border border-white/[0.07] bg-gradient-to-br from-fuchsia-950 via-zinc-950 to-orange-950 p-3">
        <p className="mb-2.5 text-[9px] font-bold uppercase tracking-[0.12em] text-orange-200">Карусель с ИИ</p>
        <p className="text-[18px] font-black leading-tight text-white">5 причин делать карусели с ИИ</p>
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          <div className="h-10 rounded-md bg-pink-400/25" />
          <div className="h-10 rounded-md bg-orange-300/25" />
          <div className="h-10 rounded-md bg-white/10" />
        </div>
      </div>
    </div>
  </div>
);

const FALLBACK_MOCKUPS = {
  'source-structure': SourceStructureMockup,
  'text-review': TextReviewMockup,
  'visual-route': VisualRouteMockup,
  'editor-result': EditorResultFallback,
};

const RESULT_SLIDE_LAYOUT = [
  {
    className: 'rotate-0',
    decorative: false,
  },
  {
    className: '-rotate-1',
    decorative: true,
  },
  {
    className: 'rotate-0',
    decorative: true,
  },
  {
    className: 'rotate-1',
    decorative: true,
  },
  {
    className: 'rotate-0',
    decorative: true,
  },
];

export const ResultCarouselStack = ({ resultCarousel }) => {
  const images = resultCarousel?.images || [];
  if (images.length === 0) return <EditorResultFallback />;
  const proofAttributes = resultCarousel.proofType === 'page-specific'
    ? { 'data-seo-proof': 'page-specific-result' }
    : {};

  return (
    <div {...proofAttributes} className="overflow-hidden rounded-xl border border-white/[0.055] bg-black/35 p-2.5">
      <div className="mb-2 flex flex-wrap items-center gap-1.5 text-[9px] text-zinc-400">
        {resultCarousel.label && (
          <span className="rounded-md border border-orange-300/15 bg-orange-300/10 px-1.5 py-0.5 font-bold uppercase tracking-[0.10em] text-orange-100">
            {resultCarousel.label}
          </span>
        )}
        {resultCarousel.format && (
          <span className="rounded-md border border-white/[0.055] bg-white/[0.035] px-1.5 py-0.5">
            {resultCarousel.format}
          </span>
        )}
        {resultCarousel.slideCount && (
          <span className="rounded-md border border-white/[0.055] bg-white/[0.035] px-1.5 py-0.5">
            {resultCarousel.slideCount} слайдов
          </span>
        )}
        {resultCarousel.mode && (
          <span className="rounded-md border border-pink-400/18 bg-pink-500/10 px-1.5 py-0.5 text-pink-100">
            {resultCarousel.mode}
          </span>
        )}
      </div>

      <div className="rounded-lg border border-white/[0.07] bg-gradient-to-br from-zinc-950 via-black to-zinc-900 p-2.5">
        {resultCarousel.title && (
          <p className="mb-2 text-[13px] font-bold leading-snug text-white">
            {resultCarousel.title}
          </p>
        )}

        <div
          className="overflow-hidden rounded-lg bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.12),transparent_70%)] px-1.5 py-3 sm:px-2 sm:py-3.5 md:px-2.5"
          aria-label={`${resultCarousel.title || 'Готовая карусель'}: ${images.length} слайдов`}
        >
          <div className="mx-auto flex w-full max-w-[980px] items-center justify-center">
            {images.map((image, index) => {
              const layout = RESULT_SLIDE_LAYOUT[index] || RESULT_SLIDE_LAYOUT[RESULT_SLIDE_LAYOUT.length - 1];
              const overlapClass = index === 0 ? '' : '-ml-[6%] sm:-ml-[4%]';

              return (
                <img
                  key={image.src}
                  data-seo-proof-image={resultCarousel.proofType === 'page-specific' ? 'page-specific-result' : undefined}
                  src={image.src}
                  alt={layout.decorative ? '' : image.alt}
                  width={1122}
                  height={1402}
                  loading="lazy"
                  decoding="async"
                  className={`relative aspect-[1122/1402] w-[25%] max-w-[190px] shrink-0 rounded-lg border border-white/[0.12] object-contain shadow-[0_16px_36px_rgba(0,0,0,0.42)] sm:w-[22%] md:w-[22%] ${overlapClass} ${layout.className}`}
                  style={{ zIndex: index + 1 }}
                  aria-hidden={layout.decorative ? 'true' : undefined}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const MockupVisual = ({ mockup, carouselTypes }) => {
  if (mockup.resultCarousel) {
    return <ResultCarouselStack resultCarousel={mockup.resultCarousel} />;
  }

  if (mockup.image) {
    return (
      <div className="overflow-hidden rounded-xl border border-white/[0.055] bg-black/35">
        <img
          src={mockup.image}
          alt={mockup.decorative ? '' : mockup.alt}
          className="h-full min-h-[150px] w-full object-cover"
          style={{
            objectPosition: mockup.objectPosition || 'center',
            aspectRatio: mockup.aspectRatio || '16 / 11',
          }}
          loading="lazy"
        />
      </div>
    );
  }

  const Fallback = FALLBACK_MOCKUPS[mockup.id] || EditorResultFallback;
  return <Fallback carouselTypes={carouselTypes} />;
};

export const SeoProductWorkflowShowcase = ({ page }) => {
  const workflow = page.productWorkflow;
  if (!workflow) return null;

  const steps = buildProductWorkflowSteps(workflow);
  const mockups = buildProductWorkflowMockups(workflow);
  const carouselTypes = buildProductWorkflowCarouselTypes(workflow);
  const title = workflow.title || {};

  return (
    <section
      id="product-workflow"
      data-seo-proof="product-workflow"
      className="border-t border-white/[0.08] py-14 md:py-20"
    >
      <SeoSectionHeading
        eyebrow={workflow.eyebrow}
        heading={title}
        intro={workflow.description}
        sectionId="product-workflow"
      />

      {/* ── Horizontal workflow steps — article-style surface ── */}
      <div className="mb-10 overflow-hidden rounded-3xl border border-white/[0.07] bg-[#080808] p-3 sm:p-4 lg:p-5">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-6 2xl:grid-cols-5">
          {steps.map((step, index) => {
            /* xl: 3 + 2 centered; 2xl: five readable compact cards in one row. */
            const gridClass =
              index < 3
                ? 'xl:col-span-2 2xl:col-span-1'
                : index === 3
                  ? 'xl:col-span-2 xl:col-start-2 2xl:col-span-1 2xl:col-start-auto'
                  : 'md:col-span-2 xl:col-span-2 2xl:col-span-1';

            return (
              <WorkflowStep
                key={step.id}
                step={step}
                index={index}
                className={gridClass}
              />
            );
          })}
        </div>
      </div>

      {/* ── Product mockups 2×2 grid ── */}
      <div className="grid gap-3.5 sm:grid-cols-2">
        {mockups.map((mockup, index) => (
          <article
            key={mockup.id}
            data-seo-proof-card="product-workflow-mockup"
            className="overflow-hidden rounded-xl border border-white/[0.065] bg-white/[0.022]"
          >
            <div className="flex items-center gap-2.5 px-3.5 pt-3.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-pink-500 to-orange-500 text-[11px] font-black text-white">{index + 1}</span>
              <h3 className="text-[15px] font-bold leading-snug text-white">{mockup.title}</h3>
            </div>
            <div className="p-2.5 md:p-3">
              <MockupVisual mockup={mockup} carouselTypes={carouselTypes} />
            </div>
            <p className="px-3.5 pb-3.5 text-[12px] font-normal leading-5 text-zinc-400">{mockup.caption}</p>
          </article>
        ))}
      </div>

      {/* ── Capability chips ── */}
      {workflow.featureChips?.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-1.5">
          {workflow.featureChips.map((chip) => (
            <span key={chip} className="cursor-default rounded-lg border border-white/[0.045] bg-white/[0.018] px-2.5 py-1.5 text-[11px] font-medium text-zinc-500">
              {chip}
            </span>
          ))}
        </div>
      )}

      {/* ── CTA strip ── */}
      {workflow.cta && (
        <div className="mt-6 rounded-xl border border-white/[0.065] bg-white/[0.03] p-4 sm:flex sm:items-center sm:justify-between sm:gap-5">
          <p className="mb-4 text-sm font-normal leading-6 text-zinc-400 sm:mb-0">{workflow.cta.note}</p>
          <WorkflowCta cta={workflow.cta} page={page} />
        </div>
      )}
    </section>
  );
};
