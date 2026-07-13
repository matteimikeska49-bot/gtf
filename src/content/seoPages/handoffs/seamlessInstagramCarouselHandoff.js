import {
  EXACT_SEO_PAGE_BLUEPRINT,
  EXACT_SEO_PAGE_BLUEPRINT_ID,
} from '../blueprints/exactSeoPageBlueprint.js';

const awaitingCopy = (slotName) => ({
  status: 'awaiting_gemini_content',
  slotName,
  ownerReviewRequired: true,
});

const awaitingVisual = (slotName) => ({
  type: slotName,
  assetPath: {
    status: 'awaiting_gemini_visual_requirement',
    ownerVisualApprovalRequired: true,
  },
  caption: {
    status: 'awaiting_gemini_content',
    ownerReviewRequired: true,
  },
  alt: {
    status: 'awaiting_gemini_content',
    ownerReviewRequired: true,
  },
});

const requiredBlueprintSections = EXACT_SEO_PAGE_BLUEPRINT.sections
  .filter((section) => EXACT_SEO_PAGE_BLUEPRINT.requiredSections.includes(section.id));

export const seamlessInstagramCarouselHandoff = {
  id: 'ru-use-case-seamless-instagram-carousel-handoff',
  route: '/ru/use-cases/besshovnaya-karusel-instagram',
  blueprintId: EXACT_SEO_PAGE_BLUEPRINT_ID,
  benchmarkRoute: EXACT_SEO_PAGE_BLUEPRINT.benchmarkRoute,
  runtimeImported: false,
  routeRegistered: false,
  sitemapIncluded: false,
  physicalHtmlCreated: false,

  contentDesignStatus: 'content_design_draft',
  ownerReviewStatus: 'content_design_draft',
  ownerVisualApprovalReceived: false,
  approvedForTechnicalIntegration: false,
  approvedForRelease: false,

  primaryQuery: {
    status: 'awaiting_gemini_content',
    required: true,
  },
  searchIntent: {
    status: 'awaiting_gemini_content',
    required: true,
  },
  userJob: {
    status: 'awaiting_gemini_content',
    required: true,
  },
  articleBoundary: {
    status: 'awaiting_gemini_content',
    required: true,
    mustNotDuplicateBlogArticle: true,
  },
  generatorBoundary: {
    status: 'awaiting_gemini_content',
    required: true,
    mustNotOverrideProtectedGeneratorRoutes: true,
  },

  metadata: {
    title: awaitingCopy('metadata.title'),
    description: awaitingCopy('metadata.description'),
    canonicalPath: '/ru/use-cases/besshovnaya-karusel-instagram',
  },

  sections: requiredBlueprintSections.map((section) => ({
    id: section.id,
    order: section.order,
    purpose: section.purpose,
    componentName: section.componentName,
    componentPath: section.componentPath,
    benchmarkRoute: section.benchmarkRoute,
    requiredProps: section.acceptedProps,
    copySlots: Object.fromEntries((section.copySlots || []).map((slotName) => [
      slotName,
      awaitingCopy(slotName),
    ])),
    visualSlots: Object.fromEntries((section.visualSlots || []).map((slotName) => [
      slotName,
      awaitingVisual(slotName),
    ])),
    ProductTruthClaims: [
      {
        status: 'awaiting_gemini_content',
        source: 'src/content/seoPages/productTruthRegistry.js',
      },
    ],
    forbiddenFallbacks: section.forbiddenFallbacks,
    ownerApprovalStatus: 'content_design_draft',
  })),

  ProductTruthClaims: [
    {
      status: 'awaiting_gemini_content',
      source: 'src/content/seoPages/productTruthRegistry.js',
      rule: 'Use only confirmed GoToFlow capabilities and owner-approved workflow wording.',
    },
  ],
  forbiddenClaims: [
    'User must download one panorama and cut it in an external app.',
    'GoToFlow does not create finished slides.',
    'External slicing is required.',
    'Custom fonts are supported.',
    'Automatic publishing is supported.',
    'Unverified export is supported.',
    'Unverified engagement percentages.',
    'quarantined_review',
  ],
  FAQ: [
    {
      question: awaitingCopy('faq.question'),
      answer: awaitingCopy('faq.answer'),
    },
  ],
  relatedLinks: [
    {
      status: 'awaiting_gemini_content',
      required: true,
      allowedTargetTypes: ['approved_blog_article', 'approved_seo_page', 'protected_product_route'],
    },
  ],
  ownerComments: [],
};

export default seamlessInstagramCarouselHandoff;
