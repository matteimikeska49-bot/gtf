export const SEO_TEMPLATE_VARIANTS = {
  commercial_tool: {
    label: 'Commercial tool landing page',
    requiredSections: [
      'hero',
      'problem',
      'whatItCreates',
      'useCases',
      'workflow',
      'examples',
      'benefits',
      'faq',
      'related',
      'finalCta',
    ],
  },
  platform_page: {
    label: 'Platform-specific landing page',
    requiredSections: [
      'hero',
      'platformUseCases',
      'contentFormats',
      'workflow',
      'examples',
      'benefits',
      'faq',
      'related',
      'finalCta',
    ],
  },
  template_page: {
    label: 'Template/library page',
    supportedSections: [
      'hero',
      'quickAnswer',
      'templateCategories',
      'examples',
      'templateChoiceGuide',
      'productWorkflow',
      'productCapabilities',
      'readyCarouselShowcase',
      'useCases',
      'faq',
      'related',
      'finalCta',
    ],
    requiredSections: [
      'hero',
      'quickAnswer',
      'templateCategories',
      'templateChoiceGuide',
      'productWorkflow',
      'productCapabilities',
      'readyCarouselShowcase',
      'useCases',
      'faq',
      'related',
      'finalCta',
    ],
    optionalSections: [
      'examples',
    ],
  },
  example_page: {
    label: 'Examples/case-style page',
    requiredSections: [
      'hero',
      'examples',
      'breakdown',
      'howToCreate',
      'related',
      'finalCta',
    ],
  },
  alternative_page: {
    label: 'Alternative/comparison page',
    requiredSections: [
      'hero',
      'comparison',
      'whenToUseGoToFlow',
      'migrationBenefits',
      'faq',
      'related',
      'finalCta',
    ],
  },
  prompt_page: {
    label: 'Prompt collection page',
    requiredSections: [
      'hero',
      'promptGroups',
      'howToUsePrompts',
      'examples',
      'faq',
      'related',
      'finalCta',
    ],
  },
  use_case_page: {
    label: 'Use-case/scenario page',
    requiredSections: [
      'hero',
      'scenario',
      'workflow',
      'examples',
      'benefits',
      'faq',
      'related',
      'finalCta',
    ],
  },
};

export const SEO_TEMPLATE_VARIANT_NAMES = Object.keys(SEO_TEMPLATE_VARIANTS);

export const CAROUSEL_PRODUCT_SEO_SECTION_ORDER = [
  'hero',
  'quickAnswer',
  'pageRelevantFormats',
  'productWorkflow',
  'productCapabilities',
  'readyCarouselShowcase',
  'pageSpecificVisualProof',
  'useCases',
  'faq',
  'related',
  'finalCta',
];

export const PAGE_TYPE_TO_TEMPLATE_VARIANT = {
  commercial: 'commercial_tool',
  tool: 'commercial_tool',
  platform: 'platform_page',
  template: 'template_page',
  example: 'example_page',
  alternative: 'alternative_page',
  prompt: 'prompt_page',
  useCase: 'use_case_page',
};

export const getTemplateVariant = (variant) => SEO_TEMPLATE_VARIANTS[variant] || null;

export const getTemplateSectionOrder = (variant) => (
  getTemplateVariant(variant)?.requiredSections || []
);

export const resolveTemplateSectionOrder = (variantId, pageSections) => {
  const variant = getTemplateVariant(variantId);
  if (!variant) return [];

  // The master deterministic order. Fall back to requiredSections if supportedSections isn't explicitly defined.
  const masterOrder = variant.supportedSections || variant.requiredSections || [];

  // If the page doesn't explicitly declare an order, fall back to required sections
  if (!pageSections || !Array.isArray(pageSections) || pageSections.length === 0) {
    return variant.requiredSections || [];
  }

  const requestedSections = new Set(pageSections);

  // Return the strict deterministic order, filtering only for sections the page requested
  return masterOrder.filter(section => requestedSections.has(section));
};

export const isCarouselProductSeoPage = (page = {}) => (
  page.pageFamily === 'carousel_product_page' &&
  page.templateVariant === 'template_page' &&
  page.productWorkflow?.preset === 'carousel_creation' &&
  Array.isArray(page.readyCarouselShowcase) &&
  Boolean(page.productCapabilities?.groups?.length)
);

export const getAllTemplateSectionIds = () => (
  [...new Set(Object.values(SEO_TEMPLATE_VARIANTS).flatMap((variant) => variant.requiredSections))]
);

export const getDefaultTemplateVariantForPageType = (pageType) => (
  PAGE_TYPE_TO_TEMPLATE_VARIANT[pageType] || 'commercial_tool'
);

export const hasValidTemplateVariant = (variant) => Boolean(getTemplateVariant(variant));
