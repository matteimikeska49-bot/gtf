import { Link } from 'react-router-dom';
import { ArrowRight, Check, CornerDownLeft, Download, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { getAppUrlWithRef } from '../../utils/url';

const CTA_URL = 'https://app.gotoflow.io';

const renderHeading = (heading, fallback) => {
  if (!heading || typeof heading === 'string') return <>{heading || fallback}</>;
  return (
    <>
      {heading.before}
      <span className="text-gradient-brand">{heading.accent}</span>
      {heading.after}
    </>
  );
};

const SectionHeading = ({ eyebrow, heading, description, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`text-center ${className}`}
  >
    {eyebrow && (
      <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-300 backdrop-blur-md">
        <Sparkles className="h-3.5 w-3.5" />
        {eyebrow}
      </div>
    )}
    <h2 className="mx-auto max-w-4xl text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
      {renderHeading(heading)}
    </h2>
    {description && (
      <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-relaxed text-zinc-400 md:text-lg">
        {description}
      </p>
    )}
  </motion.div>
);

const PostInputMockup = ({ page }) => (
  <div className="relative mx-auto w-full max-w-md rounded-[2rem] border border-white/[0.08] bg-white/[0.035] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
    <div className="mb-4 flex items-center gap-2">
      <span className="h-2.5 w-2.5 rounded-full bg-pink-400" />
      <span className="h-2.5 w-2.5 rounded-full bg-orange-400" />
      <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
    </div>
    <div className="space-y-3">
      <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-600">Идея</p>
        <p className="text-sm leading-6 text-zinc-300">{page.heroPromptExample}</p>
      </div>
      <div className="rounded-2xl border border-pink-500/20 bg-pink-500/10 p-4">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-pink-300">GoToFlow</p>
        <p className="text-sm leading-6 text-white">{page.heroResultExample}</p>
      </div>
    </div>
  </div>
);

const FormatGrid = ({ page }) => (
  <section id="formats" data-seo-section="formats" className="px-6 py-24 md:py-32">
    <div className="mx-auto max-w-7xl">
      <SectionHeading
        eyebrow={page.templateCategoriesIntro?.eyebrow}
        heading={page.templateCategoriesIntro?.heading}
      />
      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {page.templateCategories.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.05 }}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 backdrop-blur-xl transition-colors hover:border-white/[0.14] hover:bg-white/[0.05]"
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-zinc-600">{String(index + 1).padStart(2, '0')}</p>
            <h3 className="text-xl font-bold leading-snug text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-zinc-400">{item.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const WorkflowBlock = ({ page }) => {
  const steps = Object.values(page.productWorkflow?.stepOverrides || {});
  return (
    <section id="product-workflow" data-seo-section="workflow" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/[0.08] bg-[#050505]/60 p-8 shadow-[0_30px_100px_-15px_rgba(0,0,0,1),0_0_40px_rgba(236,72,153,0.15)] backdrop-blur-2xl md:p-12 lg:p-16">
        <SectionHeading
          eyebrow={page.productWorkflow?.eyebrow || 'Как это работает'}
          heading={page.productWorkflow?.title}
          description={page.productWorkflow?.description}
        />
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="relative rounded-3xl border border-white/[0.12] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-7 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            >
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#0a0a0a] text-sm font-bold text-zinc-300">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold leading-snug text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{step.body || step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductTruthBlock = ({ page }) => (
  <section id="product-truth" data-seo-section="product-truth" className="px-6 py-20 md:py-28">
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-white md:text-3xl">{page.productTruthTitle}</h2>
      <p className="text-base leading-relaxed text-zinc-400">{page.productBridge}</p>
    </div>
  </section>
);

const VisualProofBlock = ({ page }) => {
  const slides = page.pageSpecificVisualProof?.images || [];
  return (
    <section id="visual-proof" data-seo-section="visual-proof" className="px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <SectionHeading
          className="text-left"
          eyebrow={page.pageSpecificVisualProof?.eyebrow}
          heading={page.pageSpecificVisualProof?.heading}
          description={page.pageSpecificVisualProof?.description}
        />
        <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
          <div className="mb-5 rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-600">{page.pageSpecificVisualProof?.inputLabel}</p>
            <p className="text-sm leading-6 text-zinc-300">{page.pageSpecificVisualProof?.inputCopy}</p>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {slides.slice(0, 5).map((slide, index) => (
              <div key={slide.src} className="overflow-hidden rounded-xl border border-white/10 bg-black/40">
                <img src={slide.src} alt={slide.alt} className="aspect-[4/5] h-full w-full object-cover" loading="lazy" />
                <span className="sr-only">Слайд {index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const UseCasesBlock = ({ page }) => {
  if (!page.useCases?.length) return null;
  return (
    <section id="use-cases" data-seo-section="use-cases" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={page.useCasesIntro?.eyebrow} heading={page.useCasesIntro?.heading} />
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {page.useCases.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6">
              <h3 className="font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQBlock = ({ page }) => (
  <section id="faq-section" data-seo-section="faq" className="px-6 py-24 md:py-32">
    <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/[0.05] bg-white/[0.02] p-8 backdrop-blur-sm md:p-12 lg:p-16">
      <SectionHeading eyebrow="FAQ" heading={{ before: 'Частые ', accent: 'вопросы', after: '' }} />
      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4">
        {page.faq.map((item) => (
          <div key={item.question} data-seo-faq-item="true" data-seo-faq-question={item.question} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
            <h3 className="text-base font-semibold leading-snug text-white">{item.question}</h3>
            <p className="mt-4 text-sm font-medium leading-7 text-zinc-400">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const RelatedBlock = ({ page }) => (
  <section id="related-content" data-seo-section="related-content" className="px-6 py-16">
    <div className="mx-auto max-w-4xl rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 md:p-8">
      <h2 className="mb-5 text-lg font-semibold text-white">{page.relatedIntro?.title || page.relatedIntro?.heading?.accent || 'Связанные инструменты'}</h2>
      <ul className="space-y-3">
        {page.relatedCards.map((item) => (
          <li key={item.href} className="flex items-center gap-2">
            <span className="text-pink-500">•</span>
            <Link to={item.href} className="text-zinc-300 underline decoration-white/10 underline-offset-4 transition-colors hover:text-pink-400 hover:decoration-pink-400/50">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const FinalCtaBlock = ({ page }) => (
  <section id="final-cta" data-seo-section="final-cta" className="px-6 py-24 md:py-32">
    <div className="mx-auto max-w-[1200px] rounded-[2.5rem] border border-white/[0.08] bg-white/[0.035] px-8 py-16 text-center shadow-[0_40px_80px_-25px_rgba(0,0,0,0.8)] md:px-20 md:py-24">
      <h2 className="mx-auto max-w-3xl text-[1.6rem] font-bold leading-[1.12] tracking-tight text-white sm:text-[2rem] md:text-[2.6rem]">
        {renderHeading(page.finalCta?.title)}
      </h2>
      <p className="mx-auto mt-6 max-w-xl text-sm font-medium leading-[1.75] text-zinc-500 md:text-[0.92rem]">{page.finalCta?.description}</p>
      <a
        href={getAppUrlWithRef(page.finalCta?.primaryAction?.href || CTA_URL)}
        className="mx-auto mt-10 flex items-center justify-center gap-2.5 rounded-[14px] border border-white/20 bg-gradient-to-r from-pink-500 to-orange-500 px-9 py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_35px_rgba(236,72,153,0.25)] transition-transform hover:scale-105"
      >
        {page.finalCta?.primaryAction?.label}
        <ArrowRight className="h-[17px] w-[17px]" />
      </a>
    </div>
  </section>
);

export const PostGeneratorSeoPage = ({ page }) => (
  <main className="relative z-10 bg-[#050505]">
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#050505] px-6 pb-16 pt-32 text-center">
      <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[700px] w-[800px] -translate-x-1/2 rounded-full bg-[#ec4899]/[0.07] blur-[80px] md:h-[900px] md:w-[1200px] md:blur-[150px]" />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.78fr] lg:text-left">
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-8">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2 shrink-0"><span className="absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-60 md:animate-ping" /><span className="relative inline-flex h-2 w-2 rounded-full bg-pink-500" /></span>
              <span className="whitespace-nowrap text-sm text-zinc-300">{page.heroEyebrow}</span>
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="mb-8 text-[1.8rem] font-bold leading-[1.12] tracking-tight text-white sm:text-[2.2rem] md:text-[2.8rem] lg:text-[3.3rem]">
            {page.h1}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mx-auto mb-10 max-w-2xl text-sm font-medium leading-[1.75] text-zinc-400 md:text-base lg:mx-0">
            {page.heroSubtitle}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <a href={getAppUrlWithRef(page.cta?.href || CTA_URL)} className="flex w-full items-center justify-center gap-2 rounded-full border border-pink-400/20 bg-gradient-to-r from-pink-500 to-orange-500 px-8 py-4 text-base font-bold text-white shadow-[0_0_40px_rgba(236,72,153,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(236,72,153,0.5)] sm:w-auto">
              {page.cta?.label}
              <ArrowRight className="h-5 w-5" />
            </a>
            <a href="#visual-proof" className="text-sm font-semibold text-zinc-400 transition-colors hover:text-white">{page.heroSecondaryLinkLabel}</a>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <PostInputMockup page={page} />
        </motion.div>
      </div>
    </section>

    <section id="quick-answer" data-seo-section="quick-answer" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/[0.06] bg-white/[0.025] p-6 md:p-8">
        <h2 className="mb-4 text-2xl font-bold text-white">{page.quickAnswer?.title}</h2>
        <p className="text-base leading-8 text-zinc-400">{page.quickAnswer?.body}</p>
      </div>
    </section>

    <FormatGrid page={page} />
    <WorkflowBlock page={page} />
    <ProductTruthBlock page={page} />
    <VisualProofBlock page={page} />
    <UseCasesBlock page={page} />
    <FAQBlock page={page} />
    <RelatedBlock page={page} />
    <FinalCtaBlock page={page} />
  </main>
);
