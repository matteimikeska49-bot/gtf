import { SeoPageBenefits } from './SeoPageBenefits';
import { SeoPageCTA } from './SeoPageCTA';
import { SeoPageExamples } from './SeoPageExamples';
import { SeoPageFAQ } from './SeoPageFAQ';
import { SeoPageHero } from './SeoPageHero';
import { SeoPageRelatedLinks } from './SeoPageRelatedLinks';
import { SeoPageWorkflow } from './SeoPageWorkflow';
import { SeoPageTemplateHero } from './template-page/SeoPageTemplateHero';
import { SeoPageTemplateCategories } from './template-page/SeoPageTemplateCategories';
import { SeoPageTemplateExamples } from './template-page/SeoPageTemplateExamples';
import { SeoPageTemplateHowToUse } from './template-page/SeoPageTemplateHowToUse';
import { SeoProductWorkflowShowcase } from './template-page/SeoProductWorkflowShowcase';
import { SeoTemplateChoiceGuide } from './template-page/SeoTemplateChoiceGuide';
import { SeoQuickAnswer } from './template-page/SeoQuickAnswer';
import { SeoPageAnchorNav } from './template-page/SeoPageAnchorNav';
import { SeoReadyCarouselShowcase } from './template-page/SeoReadyCarouselShowcase';
import { resolveTemplateSectionOrder } from '../../content/seoPages/templateVariants';

const SECTION_ALIASES = {
  problem: ['problem', 'pain', 'who-for', 'whoFor'],
  whatItCreates: ['whatItCreates', 'what-it-does', 'what-it-does-for-platform'],
  useCases: ['useCases', 'use-cases'],
  platformUseCases: ['platformUseCases', 'use-cases', 'useCases'],
  contentFormats: ['contentFormats', 'format', 'vk-format-guidance', 'telegram-format-guidance'],
  workflow: ['workflow', 'how-it-works'],
  howToUse: ['howToUse', 'workflow'],
  breakdown: ['breakdown'],
  howToCreate: ['howToCreate', 'workflow'],
  comparison: ['comparison'],
  whenToUseGoToFlow: ['whenToUseGoToFlow'],
  migrationBenefits: ['migrationBenefits'],
  promptGroups: ['promptGroups'],
  howToUsePrompts: ['howToUsePrompts'],
  scenario: ['scenario'],
  templateCategories: ['templateCategories', 'templates'],
  productCapabilities: ['productCapabilities'],
};

const SECTION_HEADINGS = {
  problem: ['Problem', 'Проблема и контекст'],
  whatItCreates: ['Outputs', 'Что помогает создать'],
  useCases: ['Use cases', 'Сценарии использования'],
  platformUseCases: ['Platform use cases', 'Сценарии для платформы'],
  contentFormats: ['Formats', 'Форматы контента'],
  workflow: ['Workflow', 'Как это работает'],
  howToUse: ['How to use', 'Как использовать'],
  breakdown: ['Breakdown', 'Разбор примеров'],
  howToCreate: ['Creation flow', 'Как создать'],
  comparison: ['Comparison', 'Сравнение'],
  whenToUseGoToFlow: ['Product fit', 'Когда использовать GoToFlow'],
  migrationBenefits: ['Migration benefits', 'Преимущества перехода'],
  promptGroups: ['Prompt groups', 'Группы промптов'],
  howToUsePrompts: ['Prompt workflow', 'Как использовать промпты'],
  scenario: ['Scenario', 'Сценарий использования'],
  templateCategories: ['Template categories', 'Категории шаблонов'],
  productCapabilities: ['Product capabilities', 'Что умеет GoToFlow'],
};

const toSection = (item, prefix, index) => ({
  id: `${prefix}-${index}`,
  title: item.title || item.label || item.name || item.step,
  body: item.body || item.description || item.text || item.content,
  bullets: item.bullets,
});

const getStructuredItems = (page, requirement) => {
  const direct = page[requirement];
  if (Array.isArray(direct)) return direct;

  const fallback = {
    platformUseCases: page.useCases,
    howToUse: page.workflow,
    howToCreate: page.workflow,
    howToUsePrompts: page.promptGroups || page.prompts,
    migrationBenefits: page.migrationBenefits || page.benefits,
    templateCategories: page.templateCategories || page.templates,
    promptGroups: page.promptGroups || page.prompts,
  };

  return Array.isArray(fallback[requirement]) ? fallback[requirement] : [];
};

const getSectionsForRequirement = (page, requirement) => {
  const aliases = SECTION_ALIASES[requirement] || [requirement];
  const existingSections = (page.sections || []).filter((section) => aliases.includes(section.id));
  const structuredItems = getStructuredItems(page, requirement).map((item, index) => toSection(item, requirement, index));

  return structuredItems.length > 0 ? structuredItems : existingSections;
};

const FinalCtaBlock = ({ page }) => {
  const finalCta = page.finalCta;
  if (!finalCta) return null;

  const title = finalCta.title || {};

  return (
    <section className="pb-24 md:pb-32">
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.045] p-8 shadow-[0_24px_90px_rgba(0,0,0,0.28)] md:flex md:items-center md:justify-between md:gap-10 md:p-12">
        <div className="absolute right-[-12%] top-[-40%] h-80 w-80 rounded-full bg-pink-500/[0.12] blur-[90px]" />
        <div className="relative max-w-2xl">
          {finalCta.eyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-pink-300">
              {finalCta.eyebrow}
            </p>
          )}
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            {title.before}
            {title.accent && (
              <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
                {title.accent}
              </span>
            )}
            {title.after}
          </h2>
          <p className="mt-4 text-sm leading-7 text-zinc-400">{finalCta.description}</p>
        </div>
        <div className="relative mt-7 shrink-0 md:mt-0">
          <SeoPageCTA cta={finalCta.primaryAction} page={page} ctaPosition="final" compact />
        </div>
      </div>
    </section>
  );
};

const renderVariantSection = (page, requirement) => {
  if (requirement === 'productCapabilities') {
    return (
      <SeoPageWorkflow
        key={requirement}
        id="product-capabilities"
        dataSeoProof="product-capabilities"
        sections={page.productCapabilities?.groups || []}
        eyebrow={page.productCapabilities?.eyebrow || 'Возможности продукта'}
        heading={page.productCapabilities?.heading || 'Что можно настроить в GoToFlow'}
        cardMarker="product-capability"
      />
    );
  }

  if (requirement === 'useCases') {
    return (
      <SeoPageWorkflow
        key={requirement}
        id="use-cases"
        dataSeoSection="use-cases"
        sections={getSectionsForRequirement(page, requirement)}
        eyebrow={page.useCasesIntro?.eyebrow || 'Сценарии'}
        heading={page.useCasesIntro?.heading || 'Для каких задач подходит бесшовная карусель'}
      />
    );
  }

  if (page.templateVariant === 'template_page') {
    if (requirement === 'hero') return null;
    if (requirement === 'quickAnswer') return <SeoQuickAnswer key={requirement} page={page} />;
    if (requirement === 'readyCarouselShowcase') return <SeoReadyCarouselShowcase key={requirement} page={page} />;
    if (requirement === 'templateCategories') return <SeoPageTemplateCategories key={requirement} page={page} />;
    if (requirement === 'examples') return <SeoPageTemplateExamples key={requirement} page={page} />;
    if (requirement === 'templateChoiceGuide') return page.templateChoiceGuide ? <SeoTemplateChoiceGuide key={requirement} page={page} /> : null;
    if (requirement === 'productWorkflow') {
      return page.productWorkflow
        ? <SeoProductWorkflowShowcase key={requirement} page={page} />
        : <SeoPageTemplateHowToUse key={requirement} page={page} />;
    }
    if (requirement === 'howToUse') return page.productWorkflow ? null : <SeoPageTemplateHowToUse key={requirement} page={page} />;
  }

  if (requirement === 'hero') return null;
  if (requirement === 'productWorkflow') return <SeoProductWorkflowShowcase key={requirement} page={page} />;
  if (requirement === 'benefits') return <SeoPageBenefits key={requirement} page={page} />;
  if (requirement === 'examples') return <SeoPageExamples key={requirement} page={page} />;
  if (requirement === 'faq') return <SeoPageFAQ key={requirement} page={page} items={page.faq} />;
  if (requirement === 'related') return <SeoPageRelatedLinks key={requirement} page={page} />;
  if (requirement === 'finalCta') return <FinalCtaBlock key={requirement} page={page} />;

  const [eyebrow, heading] = SECTION_HEADINGS[requirement] || ['Section', requirement];
  return (
    <SeoPageWorkflow
      key={requirement}
      sections={getSectionsForRequirement(page, requirement)}
      eyebrow={eyebrow}
      heading={heading}
    />
  );
};

export const SeoPageTemplate = ({ page }) => {
  const sectionOrder = resolveTemplateSectionOrder(page.templateVariant, page.templateSections);

  return (
    <main className="relative z-10 bg-[#050505]">
      {page.templateVariant === 'template_page' ? (
        <SeoPageTemplateHero page={page} />
      ) : (
        <SeoPageHero page={page} />
      )}

      {page.templateVariant === 'template_page' && <SeoPageAnchorNav page={page} />}

      <section className="px-6">
        <div className="mx-auto max-w-7xl">
          {sectionOrder.map((requirement) => renderVariantSection(page, requirement))}
        </div>
      </section>
    </main>
  );
};
