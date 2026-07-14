export const EXACT_SEO_PAGE_BLUEPRINT_ID = 'gotoflow-template-page-exact-v1';

export const SEO_HANDOFF_STATUSES = [
  'content_design_draft',
  'human_review',
  'approved_for_technical_integration',
  'technical_review',
  'approved_for_release',
];

export const SEO_HANDOFF_ROLE_CONTRACT = {
  geminiResponsibilities: [
    'full copy',
    'metadata draft',
    'section order',
    'blueprint selection',
    'copy slot completion',
    'visual slot completion',
    'asset selection',
    'CTA',
    'FAQ',
    'related links',
    'Product Truth claims',
    'localhost preview',
    'owner feedback fixes',
  ],
  geminiForbidden: [
    'new runtime renderer',
    'new template variant',
    'registry keys in visible copy',
    'generic card substitution for mapped components',
    'release approval',
    'push without final owner approval',
  ],
  codexResponsibilities: [
    'route',
    'registry',
    'component path verification',
    'prop wiring',
    'Product Truth validation',
    'intent ownership',
    'cannibalization',
    'schema',
    'lifecycle',
    'accessibility',
    'build',
    'prerender',
    'sitemap',
    'committed dist',
    'release gate',
    'local commit',
  ],
  codexForbidden: [
    'rewrite approved copy',
    'change approved section order',
    'replace approved components',
    'invent design',
    'insert visual placeholders',
    'create a generic renderer',
  ],
  codexAllowedStatuses: [
    'approved_for_technical_integration',
    'technical_review',
    'approved_for_release',
  ],
  releaseAllowedStatuses: [
    'approved_for_release',
  ],
};

export const FORBIDDEN_BLUEPRINT_COPY_PATTERNS = [
  'USE_CASE_PAGE',
  'COMMERCIAL_TOOL',
  'SECTION',
  'readyCarouselShowcase',
  'productWorkflow',
  'template_page',
  'commercial_tool',
  'use_case_page',
  'planning_only',
  'quarantined_review',
  'noindex_review',
  'indexable_approved',
  'mockup: not_available',
  'not_available',
  'placeholder',
  'TBD',
  'TODO',
];

export const SEO_PRODUCT_PROOF_CONTRACT = {
  sourceRoute: '/ru/templates/instagram-carousel',
  canonicalProductWorkflow: {
    required: true,
    componentName: 'SeoProductWorkflowShowcase',
    componentPath: 'src/components/seo/template-page/SeoProductWorkflowShowcase.jsx',
    dataSource: 'page.productWorkflow',
    copySlots: ['eyebrow', 'heading.before', 'heading.accent', 'heading.after', 'description', 'stepOverrides', 'featureChips', 'cta'],
    visualSlots: ['workflowSteps', 'mockups', 'resultCarousel'],
    domMarker: 'product-workflow',
    minimumSteps: 5,
    minimumMockups: 4,
    forbiddenFallbacks: ['text cards replacing product UI', 'missing workflow marker', 'placeholder UI proof'],
  },
  canonicalProductCapabilities: {
    required: true,
    componentName: 'SeoPageWorkflow',
    componentPath: 'src/components/seo/SeoPageWorkflow.jsx',
    canonicalDataSource: 'SEO_CANONICAL_PRODUCT_CAPABILITIES',
    requiredProps: ['page.productCapabilities.groups', 'page.productCapabilities.highlightedCapabilities', 'page.productCapabilities.introCopy'],
    renderedMarker: 'product-capabilities',
    minimumGroups: 6,
    requiredCapabilityIds: [
      'topicText',
      'link',
      'video',
      'pdf',
      'voice',
      'aiStructureText',
      'templates',
      'aiStyle',
      'customPrompt',
      'background',
      'character',
      'cta',
      'textEditing',
      'slideEditing',
      'regeneration',
      'seamlessCarousels',
      'animatedCarousels',
      'formats4511916',
      'upTo10Slides',
    ],
    forbiddenFallbacks: ['use cases mixed into capabilities', 'random page-specific feature list', 'placeholder capabilities', 'unsupported product claims'],
    responsiveRules: ['1 column mobile', '2 columns md and above', 'cards use existing SeoPageSection rendering'],
  },
  canonicalReadyCarouselShowcase: {
    required: true,
    componentName: 'SeoReadyCarouselShowcase',
    componentPath: 'src/components/seo/template-page/SeoReadyCarouselShowcase.jsx',
    dataSource: 'page.readyCarouselShowcase',
    minimumExamples: 6,
    exactExamples: 6,
    domMarker: 'ready-results-showcase',
    requiredCardMarker: 'ready-carousel',
    disallowedAssetPrefixes: ['/images/seo-handoffs/'],
    requiredCta: true,
    assetPaths: [
      '/images/niches/ru/content-ru-2.webp',
      '/images/niches/ru/content-ru-3.webp',
      '/images/niches/ru/content-ru-5.webp',
      '/images/niches/ru/content-ru-6.webp',
      '/images/niches/ru/content-ru-7.webp',
      '/images/niches/ru/content-ru-8.webp',
    ],
    forbiddenFallbacks: ['single technical proof reused as gallery', 'placeholder image cards', 'generic cards without images'],
  },
  canonicalReadyResultsShowcase: {
    required: true,
    componentName: 'SeoReadyCarouselShowcase',
    componentPath: 'src/components/seo/template-page/SeoReadyCarouselShowcase.jsx',
    dataSource: 'page.readyCarouselShowcase',
    minimumExamples: 5,
    domMarker: 'ready-results-showcase',
    requiredCardMarker: 'ready-result',
    requiredCta: true,
    forbiddenFallbacks: ['placeholder result cards', 'generic cards without result visuals'],
  },
  pageSpecificVisualProof: {
    required: true,
    type: 'page_specific_result_carousel',
    componentName: 'SeoPageSpecificVisualProof',
    componentPath: 'src/components/seo/template-page/SeoPageSpecificVisualProof.jsx',
    dataSource: 'page.pageSpecificVisualProof',
    domMarker: 'page-specific-result',
    minimumAssets: 3,
    acceptanceRules: [
      'Uses page-specific visual assets tied to the target query.',
      'Does not replace the canonical ready-results showcase.',
      'Does not share the same DOM node as the ready-results showcase.',
      'Uses non-empty asset src and alt text for at least one non-decorative preview.',
    ],
  },
  pageFamilies: {
    carousel: ['canonicalProductWorkflow', 'canonicalProductCapabilities', 'canonicalReadyCarouselShowcase', 'pageSpecificVisualProof'],
    content: ['canonicalProductWorkflow', 'canonicalProductCapabilities', 'canonicalReadyResultsShowcase', 'pageSpecificVisualProof'],
  },
};

const section = ({
  id,
  order,
  purpose,
  componentName,
  componentPath,
  benchmarkRoute = '/ru/templates/instagram-carousel',
  required = true,
  acceptedProps = [],
  copySlots = [],
  visualSlots = [],
  assetRequirements = [],
  forbiddenFallbacks = [],
  validationRules = [],
  responsiveRules = [],
  limitations = [],
  referenceRoutes = ['/ru/templates/instagram-carousel'],
}) => ({
  id,
  order,
  purpose,
  componentName,
  componentPath,
  benchmarkRoute,
  required,
  acceptedProps,
  copySlots,
  visualSlots,
  assetRequirements,
  forbiddenFallbacks,
  validationRules,
  responsiveRules,
  limitations,
  referenceRoutes,
});

export const EXACT_SEO_PAGE_BLUEPRINT = {
  blueprintId: EXACT_SEO_PAGE_BLUEPRINT_ID,
  benchmarkRoute: '/ru/templates/instagram-carousel',
  benchmarkRecordId: 'ru-template-instagram-carousel',
  suitablePageTypes: ['template', 'useCase', 'tool', 'platform'],
  humanApprovalRequired: true,
  runtimeRendererCreated: false,
  newGenericVariantCreated: false,
  productProofContract: SEO_PRODUCT_PROOF_CONTRACT,
  requiredSections: [
    'sharedHeader',
    'hero',
    'anchorNav',
    'quickAnswer',
    'pageRelevantFormats',
    'productCapabilities',
    'productWorkflow',
    'readyCarouselShowcase',
    'pageSpecificVisualProof',
    'useCases',
    'faq',
    'related',
    'finalCta',
    'sharedFooter',
  ],
  optionalSections: [],
  forbiddenPatterns: FORBIDDEN_BLUEPRINT_COPY_PATTERNS,
  forbiddenRuntimeWork: [
    'new generic use_case_page',
    'new generic commercial_tool',
    'new universal renderer',
    'new Header/Footer',
    'placeholder cards',
    'route creation before owner approval',
    'sitemap addition before release approval',
  ],
  sections: [
    section({
      id: 'sharedHeader',
      order: 1,
      purpose: 'Use the existing global navigation and shared layout shell.',
      componentName: 'Header',
      componentPath: 'src/components/Header.jsx',
      acceptedProps: [],
      copySlots: [],
      visualSlots: [],
      forbiddenFallbacks: ['new header', 'page-specific nav clone'],
      validationRules: ['render exactly one shared header'],
      responsiveRules: ['existing header responsive behavior only'],
      limitations: ['Do not add SEO-page-specific header content.'],
    }),
    section({
      id: 'hero',
      order: 2,
      purpose: 'State the page intent and show an immediate real carousel/product visual.',
      componentName: 'SeoPageTemplateHero',
      componentPath: 'src/components/seo/template-page/SeoPageTemplateHero.jsx',
      acceptedProps: ['page.breadcrumbs', 'page.h1', 'page.heroSubtitle', 'page.description', 'page.cta', 'page.cta.note'],
      copySlots: ['eyebrow', 'heading', 'body', 'primaryCta', 'secondaryCta'],
      visualSlots: ['heroCarouselImages'],
      assetRequirements: [
        '/images/niches/ru/content-ru-9.webp',
        '/images/niches/ru/content-ru-10.webp',
        '/images/niches/ru/content-ru-5.webp',
      ],
      forbiddenFallbacks: ['hero without product visual', 'abstract gradient-only hero', 'placeholder carousel card'],
      validationRules: ['single H1', 'meaningful heroSubtitle', 'app CTA', 'real image alt text'],
      responsiveRules: ['two-column desktop grid', 'stacked mobile layout', 'fixed hero visual height 400px mobile / 500px desktop'],
    }),
    section({
      id: 'anchorNav',
      order: 3,
      purpose: 'Optional sticky in-page navigation for long template/product pages.',
      componentName: 'SeoPageAnchorNav',
      componentPath: 'src/components/seo/template-page/SeoPageAnchorNav.jsx',
      required: false,
      acceptedProps: ['page'],
      copySlots: ['navLabels'],
      visualSlots: [],
      forbiddenFallbacks: ['raw section IDs as labels', 'variant IDs as labels'],
      validationRules: ['visible labels must be human-readable'],
      responsiveRules: ['wraps into multiple rows with min-height tap targets'],
    }),
    section({
      id: 'quickAnswer',
      order: 4,
      purpose: 'Give a direct answer/value explanation before deeper sections.',
      componentName: 'SeoQuickAnswer',
      componentPath: 'src/components/seo/template-page/SeoQuickAnswer.jsx',
      acceptedProps: ['page.quickAnswer.title', 'page.quickAnswer.body', 'page.quickAnswer.contextualLink'],
      copySlots: ['heading', 'body', 'contextualLink'],
      visualSlots: ['componentIcon'],
      forbiddenFallbacks: ['empty answer card', 'heading copied from registry key'],
      validationRules: ['quickAnswer item must include title and body'],
      responsiveRules: ['card width follows parent max-w-7xl and uses text-sm/md:text-base'],
    }),
    section({
      id: 'templateCategories',
      order: 5,
      purpose: 'Show concrete selectable structures or category choices, not generic cards.',
      componentName: 'SeoPageTemplateCategories',
      componentPath: 'src/components/seo/template-page/SeoPageTemplateCategories.jsx',
      acceptedProps: ['page.templateCategories', 'page.templates', 'page.categoryCta', 'page.conversion'],
      copySlots: ['sectionEyebrow', 'sectionHeading', 'item.title', 'item.body', 'categoryCta'],
      visualSlots: ['componentGeneratedCategoryPreview'],
      forbiddenFallbacks: ['empty grid', 'same generic card repeated in every section', 'category title equal to a data key'],
      validationRules: ['at least one category item', 'each item has title and body', 'CTA targets app origin'],
      responsiveRules: ['1 column mobile', '2 columns md', '3 columns lg'],
    }),
    section({
      id: 'templateChoiceGuide',
      order: 6,
      purpose: 'Map user tasks to exact structures so the page has a real decision aid.',
      componentName: 'SeoTemplateChoiceGuide',
      componentPath: 'src/components/seo/template-page/SeoTemplateChoiceGuide.jsx',
      acceptedProps: ['page.templateChoiceGuide.eyebrow', 'page.templateChoiceGuide.title', 'page.templateChoiceGuide.description', 'page.templateChoiceGuide.items'],
      copySlots: ['eyebrow', 'heading.before', 'heading.accent', 'heading.after', 'description', 'items.task', 'items.template', 'items.structure'],
      visualSlots: ['articleStyleDecisionSurface'],
      forbiddenFallbacks: ['fewer than four choices', 'duplicate item IDs', 'placeholder task/template/structure'],
      validationRules: ['4 to 8 items', 'unique item IDs', 'unique task/template pairs'],
      responsiveRules: ['two-column decision grid on md and above', 'single column mobile'],
    }),
    section({
      id: 'pageRelevantFormats',
      order: 5,
      purpose: 'Render page-relevant formats and structure choices in one fixed slot before canonical product proof.',
      componentName: 'PageRelevantFormatsBlock',
      componentPath: 'src/components/seo/SeoPageTemplate.jsx',
      acceptedProps: ['page.templateCategories', 'page.templateChoiceGuide', 'page.categoryCta', 'page.conversion'],
      copySlots: ['sectionHeading', 'item.title', 'item.body', 'items.task', 'items.template', 'items.structure'],
      visualSlots: ['componentGeneratedCategoryPreview', 'articleStyleDecisionSurface'],
      forbiddenFallbacks: ['arbitrary injected section', 'separate layout variant', 'raw section IDs as UI labels'],
      validationRules: ['fixed slot renders category and choice-guide data', 'page config cannot insert sections between canonical blocks'],
      responsiveRules: ['inherits existing category and choice-guide responsive rules'],
    }),
    section({
      id: 'productWorkflow',
      order: 7,
      purpose: 'Prove the real GoToFlow product flow with steps, editing controls, and result mockups.',
      componentName: 'SeoProductWorkflowShowcase',
      componentPath: 'src/components/seo/template-page/SeoProductWorkflowShowcase.jsx',
      acceptedProps: ['page.productWorkflow', 'workflowPresets.carousel_creation'],
      copySlots: ['eyebrow', 'heading.before', 'heading.accent', 'heading.after', 'description', 'stepOverrides', 'featureChips', 'cta'],
      visualSlots: ['workflowSteps', 'mockups', 'resultCarousel'],
      assetRequirements: [
        'component:FALLBACK_MOCKUPS.source-structure',
        'component:FALLBACK_MOCKUPS.text-review',
        'component:FALLBACK_MOCKUPS.visual-route',
        '/images/seo-workflow/carousel-result/ai-carousel-1.webp',
        '/images/seo-workflow/carousel-result/ai-carousel-2.webp',
        '/images/seo-workflow/carousel-result/ai-carousel-3.webp',
        '/images/seo-workflow/carousel-result/ai-carousel-4.webp',
        '/images/seo-workflow/carousel-result/ai-carousel-5.webp',
      ],
      forbiddenFallbacks: ['unsupported Product Truth claim', 'draft outcome as final result', 'internal product status labels', 'token pricing', 'mockup: not_available'],
      validationRules: ['carousel_creation renders exactly five steps and four mockups', 'mockups have captions', 'result carousel has at least two images'],
      responsiveRules: ['workflow cards 1 column mobile, 2 columns md, centered xl, compact five-card row at 2xl', 'mockups 1 column mobile / 2 columns sm'],
    }),
    section({
      id: 'productCapabilities',
      order: 6,
      purpose: 'Show canonical verified GoToFlow product capabilities, not use-case scenarios.',
      componentName: 'SeoPageWorkflow',
      componentPath: 'src/components/seo/SeoPageWorkflow.jsx',
      acceptedProps: ['page.productCapabilities.groups', 'page.productCapabilities.highlightedCapabilities', 'page.productCapabilities.introCopy'],
      copySlots: ['eyebrow', 'heading', 'introCopy', 'groups.title', 'groups.body'],
      visualSlots: ['capabilityIconCards'],
      forbiddenFallbacks: ['scenarios in capability block', 'unsupported feature claims', 'short random feature list', 'placeholder capabilities'],
      validationRules: ['uses SEO_CANONICAL_PRODUCT_CAPABILITIES', 'contains every required canonical capability id', 'renders data-seo-proof="product-capabilities"'],
      responsiveRules: ['1 column mobile', '2 columns md', 'existing SeoPageWorkflow card rhythm'],
    }),
    section({
      id: 'readyCarouselShowcase',
      order: 8,
      purpose: 'Show finished examples/results with real image assets and a distinct showcase CTA.',
      componentName: 'SeoReadyCarouselShowcase',
      componentPath: 'src/components/seo/template-page/SeoReadyCarouselShowcase.jsx',
      acceptedProps: ['page.readyCarouselShowcase', 'page.readyCarouselShowcaseCta'],
      copySlots: ['sectionEyebrow', 'sectionHeading', 'sectionBody', 'item.title', 'item.body', 'item.type', 'item.audience', 'showcaseCta'],
      visualSlots: ['items.image'],
      assetRequirements: [
        '/images/niches/ru/content-ru-2.webp',
        '/images/niches/ru/content-ru-3.webp',
        '/images/niches/ru/content-ru-5.webp',
        '/images/niches/ru/content-ru-6.webp',
        '/images/niches/ru/content-ru-7.webp',
        '/images/niches/ru/content-ru-8.webp',
      ],
      forbiddenFallbacks: ['empty showcase', 'card without image', 'generic results without actual result'],
      validationRules: ['showcase array contains exactly 6 cards', 'each item has image, title, body, width, height, alt derived from title', 'showcase CTA differs from final CTA'],
      responsiveRules: ['max 340px card on mobile', '2-column md', '3-column xl'],
    }),
    section({
      id: 'pageSpecificVisualProof',
      order: 9,
      purpose: 'Show visual proof for the exact page intent after the canonical ready-results showcase.',
      componentName: 'SeoPageSpecificVisualProof',
      componentPath: 'src/components/seo/template-page/SeoPageSpecificVisualProof.jsx',
      acceptedProps: ['page.pageSpecificVisualProof'],
      copySlots: ['eyebrow', 'title', 'description', 'label', 'mode'],
      visualSlots: ['images'],
      forbiddenFallbacks: ['workflow result reused as the only proof', 'showcase reused as page-specific proof', 'arbitrary component path'],
      validationRules: ['3 to 5 page-specific images', 'renders data-seo-proof="page-specific-result"', 'is separate from ready-results showcase'],
      responsiveRules: ['uses canonical result carousel stack responsive behavior'],
    }),
    section({
      id: 'useCases',
      order: 10,
      purpose: 'Show page-specific usage scenarios separately from product capabilities and workflow controls.',
      componentName: 'SeoPageWorkflow',
      componentPath: 'src/components/seo/SeoPageWorkflow.jsx',
      acceptedProps: ['page.useCases', 'page.useCasesIntro'],
      copySlots: ['heading', 'item.title', 'item.body'],
      visualSlots: ['useCaseCards'],
      forbiddenFallbacks: ['capabilities mixed into scenarios', 'generic repeated cards', 'wrong heading for page intent'],
      validationRules: ['renders data-seo-section="use-cases"', 'at least six page-specific use cases', 'heading matches page scenario'],
      responsiveRules: ['1 column mobile', '2 columns md'],
    }),
    section({
      id: 'faq',
      order: 11,
      purpose: 'Answer product, publishing, template, and boundary questions with visible FAQ/schema parity.',
      componentName: 'SeoPageFAQ',
      componentPath: 'src/components/seo/SeoPageFAQ.jsx',
      acceptedProps: ['page.faq', 'page.faqPolicy'],
      copySlots: ['question', 'answer'],
      visualSlots: ['accordionChevron'],
      forbiddenFallbacks: ['empty FAQ', 'duplicate questions', 'FAQ schema without visible FAQ'],
      validationRules: ['product SEO FAQ count 12 to 16', 'questions unique by intent', 'FAQPage schema matches visible FAQ 1:1'],
      responsiveRules: ['1 column mobile', '2 columns lg'],
    }),
    section({
      id: 'related',
      order: 12,
      purpose: 'Connect to approved supporting articles, product routes, and related SEO pages.',
      componentName: 'SeoPageRelatedLinks',
      componentPath: 'src/components/seo/SeoPageRelatedLinks.jsx',
      acceptedProps: ['page.relatedSeoPaths', 'page.relatedBlogSlugs', 'page.relatedProductToolPaths', 'page.contextualLinks'],
      copySlots: ['relatedCard.title', 'relatedCard.description'],
      visualSlots: ['relatedCardArrowIcon'],
      forbiddenFallbacks: ['missing/noindex link targets', 'self-link', 'generic product card when a mapped product route exists'],
      validationRules: ['at least one related/supporting link', 'targets exist and are routable/public'],
      responsiveRules: ['single column mobile', '2 columns md'],
    }),
    section({
      id: 'finalCta',
      order: 13,
      purpose: 'End with a page-specific conversion action tied to truthful product capability.',
      componentName: 'FinalCtaBlock',
      componentPath: 'src/components/seo/SeoPageTemplate.jsx',
      acceptedProps: ['page.finalCta.eyebrow', 'page.finalCta.title', 'page.finalCta.description', 'page.finalCta.primaryAction'],
      copySlots: ['eyebrow', 'heading.before', 'heading.accent', 'heading.after', 'body', 'primaryCta', 'secondaryCta'],
      visualSlots: ['ctaGradientSurface'],
      forbiddenFallbacks: ['generic final CTA', 'draft outcome wording', 'unsupported guarantee'],
      validationRules: ['finalCta required', 'primaryAction targets approved app/internal destination', 'no placeholder copy'],
      responsiveRules: ['stacked mobile', 'flex row md and above'],
    }),
    section({
      id: 'sharedFooter',
      order: 14,
      purpose: 'Use the existing global footer after the SEO page content.',
      componentName: 'Footer',
      componentPath: 'src/components/Footer.jsx',
      acceptedProps: [],
      copySlots: [],
      visualSlots: [],
      forbiddenFallbacks: ['new footer', 'page-specific footer clone'],
      validationRules: ['render exactly one shared footer'],
      responsiveRules: ['existing footer responsive behavior only'],
      limitations: ['Do not add SEO-page-specific footer content.'],
    }),
  ],
  componentInventory: [
    {
      componentName: 'RuAICarouselGeneratorPage',
      componentPath: 'src/components/RuAICarouselGeneratorPage.jsx',
      referenceRoutes: ['/ru/generator-karuselej-instagram', '/ru/ii-generator-karuseley'],
      purpose: 'Protected RU carousel product page with strong product hero, proof, workflow, FAQ, and CTA patterns.',
      acceptedProps: [],
      visualRole: 'product page reference, not a reusable registry renderer',
      reusable: false,
      limitations: ['Monolithic protected product route; do not import sections into registry pages without owner-approved extraction.'],
    },
    {
      componentName: 'LinkedInCarouselPageRu',
      componentPath: 'src/components/LinkedInCarouselPageRu.jsx',
      referenceRoutes: ['/ru/generator-karuselej-linkedin'],
      purpose: 'Protected LinkedIn carousel product page reference for product visual density and CTA rhythm.',
      acceptedProps: [],
      visualRole: 'product page reference',
      reusable: false,
      limitations: ['Route owner remains protected.'],
    },
    {
      componentName: 'InstagramPostPageRu',
      componentPath: 'src/components/InstagramPostPageRu.jsx',
      referenceRoutes: ['/ru/generator-postov-instagram'],
      purpose: 'Protected Instagram post generator reference for platform-specific product copy and FAQ boundaries.',
      acceptedProps: [],
      visualRole: 'product page reference',
      reusable: false,
      limitations: ['Do not reuse as a generic renderer.'],
    },
    {
      componentName: 'AIContentPageRu',
      componentPath: 'src/components/AIContentPageRu.jsx',
      referenceRoutes: ['/ru/generator-kontenta'],
      purpose: 'Protected broad content generator reference for multi-format product positioning.',
      acceptedProps: [],
      visualRole: 'product page reference',
      reusable: false,
      limitations: ['Broad content intent must not be duplicated by narrow SEO pages.'],
    },
  ],
};

export const SEO_PAGE_BLUEPRINTS = [EXACT_SEO_PAGE_BLUEPRINT];

export const getSeoBlueprintById = (blueprintId) => (
  SEO_PAGE_BLUEPRINTS.find((blueprint) => blueprint.blueprintId === blueprintId) || null
);

const textFrom = (value) => {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map(textFrom).join(' ');
  if (value && typeof value === 'object') return Object.values(value).map(textFrom).join(' ');
  return '';
};

const hasText = (value) => typeof value === 'string' && value.trim().length > 0;

const isPlaceholderValue = (value) => {
  const text = textFrom(value);
  return FORBIDDEN_BLUEPRINT_COPY_PATTERNS.some((pattern) => (
    text.toLowerCase().includes(pattern.toLowerCase())
  )) || /\b(?:placeholder|not_available|todo|tbd)\b|плейсхолдер|заглушк/iu.test(text);
};

const isPlaceholderProofModuleValue = (value) => (
  /\b(?:placeholder|not_available|todo|tbd)\b|плейсхолдер|заглушк/iu.test(textFrom(value))
);

const findSection = (blueprint, id) => blueprint.sections.find((sectionItem) => sectionItem.id === id);

const ensurePathExists = (errors, context, label, filePath) => {
  if (!hasText(filePath) || filePath === 'TBD') {
    errors.push(`${label} must use a real componentPath.`);
    return;
  }
  if (context.componentPathExists && !context.componentPathExists(filePath)) {
    errors.push(`${label} componentPath does not exist: ${filePath}`);
  }
};

const ensureAssetExists = (errors, context, label, assetPath) => {
  if (!hasText(assetPath) || assetPath === 'TBD' || /not_available|placeholder/iu.test(assetPath)) {
    errors.push(`${label} visual assetPath must be real and non-placeholder.`);
    return;
  }
  if (assetPath.startsWith('component:')) return;
  if (!assetPath.startsWith('/')) {
    errors.push(`${label} visual assetPath must be a local public path or component: reference.`);
    return;
  }
  if (context.assetExists && !context.assetExists(assetPath)) {
    errors.push(`${label} visual asset does not exist: ${assetPath}`);
  }
};

const slotValues = (slots, slotName) => {
  if (!slots || typeof slots !== 'object') return [];
  const value = slots[slotName];
  if (Array.isArray(value)) return value;
  return value === undefined || value === null ? [] : [value];
};

const asArray = (value) => (Array.isArray(value) ? value : []);

const assetPathFrom = (value) => {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object') return value.assetPath || value.src || value.image || value.componentRef || '';
  return '';
};

const collectAssetPaths = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.flatMap(collectAssetPaths);
  if (typeof value === 'string') return [value];
  if (typeof value === 'object') {
    const direct = assetPathFrom(value);
    const nested = ['assetPaths', 'assets', 'images', 'examples'].flatMap((key) => collectAssetPaths(value[key]));
    return [direct, ...nested].filter(Boolean);
  }
  return [];
};

export const getSeoProductProofFamily = (handoffOrPage = {}) => {
  if (handoffOrPage.productProofFamily) return handoffOrPage.productProofFamily;
  const text = textFrom([
    handoffOrPage.route,
    handoffOrPage.primaryQuery,
    handoffOrPage.searchIntent,
    handoffOrPage.userJob,
    handoffOrPage.pageType,
    handoffOrPage.templateVariant,
  ]).toLowerCase();
  if (/карусел|carousel|instagram/.test(text)) return 'carousel';
  if (/post|content|контент|пост/.test(text)) return 'content';
  return '';
};

const getProofModule = (modules, key) => modules?.[key] || null;

const ensureModuleShape = (errors, context, label, module, contract) => {
  if (!module || typeof module !== 'object') {
    errors.push(`${label} is required.`);
    return;
  }
  if (module.required !== true) errors.push(`${label}.required must be true.`);
  if (module.componentName !== contract.componentName) errors.push(`${label}.componentName must be ${contract.componentName}.`);
  if (module.componentPath !== contract.componentPath) errors.push(`${label}.componentPath must be ${contract.componentPath}.`);
  ensurePathExists(errors, context, label, module.componentPath);
  if (isPlaceholderProofModuleValue(module)) errors.push(`${label} must not contain placeholders.`);
};

const ensureReadyShowcaseModule = (errors, context, label, module, contract) => {
  ensureModuleShape(errors, context, label, module, contract);
  if (!module || typeof module !== 'object') return;

  const minimum = module.minimumExamples || contract.minimumExamples || 5;
  const exact = module.exactExamples || contract.exactExamples || null;
  const examples = asArray(module.examples);
  const assetPaths = collectAssetPaths([module.assetPaths, module.examples]);
  if (exact && examples.length !== exact) errors.push(`${label}.examples must contain exactly ${exact} examples.`);
  if (examples.length < minimum) errors.push(`${label}.examples must contain at least ${minimum} examples.`);
  if (assetPaths.filter((assetPath) => assetPath.startsWith('/')).length < minimum) {
    errors.push(`${label}.assetPaths must include at least ${minimum} real local image assets.`);
  }
  if (!module.cta || !hasText(textFrom(module.cta))) errors.push(`${label}.cta is required.`);
  assetPaths.forEach((assetPath, index) => {
    ensureAssetExists(errors, context, `${label}.assetPaths[${index}]`, assetPath);
    if ((contract.disallowedAssetPrefixes || []).some((prefix) => assetPath.startsWith(prefix))) {
      errors.push(`${label}.assetPaths[${index}] must not reuse page-specific handoff assets: ${assetPath}`);
    }
  });
};

const capabilityIdsFrom = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.flatMap(capabilityIdsFrom);
  if (typeof value === 'object') return [
    ...asArray(value.capabilityIds),
    ...capabilityIdsFrom(value.groups),
    ...capabilityIdsFrom(value.highlightedCapabilities),
  ];
  return [];
};

export const validateSeoProductProofModules = (handoff, context = {}) => {
  const errors = [];
  const label = handoff?.id || handoff?.route || 'handoff';
  const modules = handoff?.productProofModules;
  const family = getSeoProductProofFamily(handoff);
  const requiredKeys = SEO_PRODUCT_PROOF_CONTRACT.pageFamilies[family] || [];

  if (!requiredKeys.length) return errors;
  if (!modules || typeof modules !== 'object') {
    errors.push(`${label} missing productProofModules for ${family} product proof contract.`);
    return errors;
  }

  const requiredModules = requiredKeys.map((key) => getProofModule(modules, key)).filter(Boolean);
  const signatures = requiredModules.map((module) => `${module.componentName || ''}|${module.componentPath || ''}`);
  if (signatures.length >= 3 && new Set(signatures).size === 1) {
    errors.push(`${label}.productProofModules cannot declare one component as workflow, ready showcase, and page-specific proof.`);
  }

  requiredKeys.forEach((key) => {
    const contract = SEO_PRODUCT_PROOF_CONTRACT[key];
    const module = getProofModule(modules, key);
    const moduleLabel = `${label}.productProofModules.${key}`;
    if (key === 'canonicalReadyCarouselShowcase' || key === 'canonicalReadyResultsShowcase') {
      ensureReadyShowcaseModule(errors, context, moduleLabel, module, contract);
      return;
    }
    ensureModuleShape(errors, context, moduleLabel, module, contract);
    if (!module || typeof module !== 'object') return;

    if (key === 'canonicalProductCapabilities') {
      if (module.canonicalDataSource !== contract.canonicalDataSource) {
        errors.push(`${moduleLabel}.canonicalDataSource must be ${contract.canonicalDataSource}.`);
      }
      const groups = asArray(module.groups);
      if (groups.length < contract.minimumGroups) {
        errors.push(`${moduleLabel}.groups must contain at least ${contract.minimumGroups} canonical capability groups.`);
      }
      const declaredIds = new Set(capabilityIdsFrom(module));
      const missingIds = contract.requiredCapabilityIds.filter((capabilityId) => !declaredIds.has(capabilityId));
      if (missingIds.length > 0) {
        errors.push(`${moduleLabel} missing canonical capability ids: ${missingIds.join(', ')}.`);
      }
    }

    if (key === 'canonicalProductWorkflow') {
      (contract.copySlots || []).forEach((slotName) => {
        if (!asArray(module.copySlots).includes(slotName) && !module.copySlots?.[slotName]) {
          errors.push(`${moduleLabel}.copySlots must include ${slotName}.`);
        }
      });
      (contract.visualSlots || []).forEach((slotName) => {
        if (!asArray(module.visualSlots).includes(slotName) && !module.visualSlots?.[slotName]) {
          errors.push(`${moduleLabel}.visualSlots must include ${slotName}.`);
        }
      });
    }

    if (key === 'pageSpecificVisualProof') {
      if (module.type !== contract.type) errors.push(`${moduleLabel}.type must be ${contract.type}.`);
      const assetPaths = collectAssetPaths(module.assetPaths || module.assets || module.examples);
      if (assetPaths.filter((assetPath) => assetPath.startsWith('/')).length < contract.minimumAssets) {
        errors.push(`${moduleLabel}.assetPaths must include at least ${contract.minimumAssets} page-specific local assets.`);
      }
      assetPaths.forEach((assetPath, index) => ensureAssetExists(errors, context, `${moduleLabel}.assetPaths[${index}]`, assetPath));
      if (!Array.isArray(module.acceptanceRules) || module.acceptanceRules.length < 3) {
        errors.push(`${moduleLabel}.acceptanceRules must define rendered proof acceptance rules.`);
      }
    }
  });

  return errors;
};

const readyImageFrom = (item) => item?.image || item?.src || item?.assetPath || '';

const getRuntimePageSpecificProof = (page) => {
  return page?.pageSpecificVisualProof || null;
};

export const validateSeoRuntimeProductProof = ({ page, handoff = null, context = {} }) => {
  const errors = [];
  const label = page?.id || page?.path || handoff?.id || 'seo page';
  if (!handoff?.productProofModules && page?.templateVariant !== 'template_page') return errors;
  const family = getSeoProductProofFamily(handoff || page);
  if (!family) return errors;

  const requiredKeys = SEO_PRODUCT_PROOF_CONTRACT.pageFamilies[family] || [];
  if (!requiredKeys.length) return errors;

  if (page?.templateSections !== undefined) {
    errors.push(`${label} carousel product page config must not declare templateSections or section order.`);
  }

  if (!page?.productWorkflow || typeof page.productWorkflow !== 'object') {
    errors.push(`${label} missing canonical productWorkflow proof module.`);
  } else {
    if (page.productWorkflow.preset !== 'carousel_creation') {
      errors.push(`${label} productWorkflow.preset must be carousel_creation.`);
    }
    if (asArray(page.productWorkflow.mockups).length !== 4) {
      errors.push(`${label} productWorkflow.mockups must contain exactly 4 product panels.`);
    }
  }

  const heroImages = asArray(page?.heroCarouselImages);
  if (heroImages.length !== 3) errors.push(`${label} heroCarouselImages must contain exactly 3 carousel images.`);

  const capabilities = page?.productCapabilities;
  const requiredCapabilities = SEO_PRODUCT_PROOF_CONTRACT.canonicalProductCapabilities;
  const runtimeCapabilityIds = new Set(capabilityIdsFrom(capabilities));
  const missingCapabilityIds = requiredCapabilities.requiredCapabilityIds.filter((capabilityId) => !runtimeCapabilityIds.has(capabilityId));
  if (!capabilities || typeof capabilities !== 'object') {
    errors.push(`${label} missing canonical productCapabilities proof module.`);
  } else {
    if (asArray(capabilities.groups).length < requiredCapabilities.minimumGroups) {
      errors.push(`${label} productCapabilities must contain at least ${requiredCapabilities.minimumGroups} canonical groups.`);
    }
    if (missingCapabilityIds.length > 0) {
      errors.push(`${label} productCapabilities missing canonical ids: ${missingCapabilityIds.join(', ')}.`);
    }
  }

  const ready = asArray(page?.readyCarouselShowcase);
  const readyMinimum = SEO_PRODUCT_PROOF_CONTRACT.canonicalReadyCarouselShowcase.minimumExamples;
  const readyExact = SEO_PRODUCT_PROOF_CONTRACT.canonicalReadyCarouselShowcase.exactExamples;
  if (readyExact && ready.length !== readyExact) errors.push(`${label} readyCarouselShowcase must contain exactly ${readyExact} examples.`);
  if (ready.length < readyMinimum) errors.push(`${label} readyCarouselShowcase must contain at least ${readyMinimum} examples.`);
  const readyImages = ready.map(readyImageFrom).filter(Boolean);
  if (readyImages.length < readyMinimum) errors.push(`${label} readyCarouselShowcase must contain at least ${readyMinimum} real images.`);
  readyImages.forEach((assetPath, index) => {
    ensureAssetExists(errors, context, `${label}.readyCarouselShowcase[${index}].image`, assetPath);
    if (SEO_PRODUCT_PROOF_CONTRACT.canonicalReadyCarouselShowcase.disallowedAssetPrefixes.some((prefix) => assetPath.startsWith(prefix))) {
      errors.push(`${label}.readyCarouselShowcase[${index}].image must use canonical ready-result assets, not page-specific proof assets.`);
    }
  });
  if (!page?.readyCarouselShowcaseCta || !hasText(textFrom(page.readyCarouselShowcaseCta))) {
    errors.push(`${label} readyCarouselShowcaseCta is required for mandatory product proof.`);
  }

  const pageProof = getRuntimePageSpecificProof(page);
  if (!pageProof) {
    errors.push(`${label} missing page-specific visual proof module.`);
    return errors;
  }
  const proofAssets = collectAssetPaths(pageProof.images || pageProof.assetPaths || pageProof.assets);
  if (proofAssets.filter((assetPath) => assetPath.startsWith('/')).length < SEO_PRODUCT_PROOF_CONTRACT.pageSpecificVisualProof.minimumAssets) {
    errors.push(`${label} page-specific visual proof must include at least ${SEO_PRODUCT_PROOF_CONTRACT.pageSpecificVisualProof.minimumAssets} local visual assets.`);
  }
  proofAssets.forEach((assetPath, index) => ensureAssetExists(errors, context, `${label}.pageSpecificVisualProof.assetPaths[${index}]`, assetPath));
  if (readyImages.length && proofAssets.length && proofAssets.every((assetPath) => readyImages.includes(assetPath))) {
    errors.push(`${label} page-specific visual proof must not be the same image set as readyCarouselShowcase.`);
  }

  const useCases = asArray(page?.useCases);
  if (useCases.length < 6) {
    errors.push(`${label} useCases must contain at least 6 page-specific scenarios separate from capabilities.`);
  }

  const faq = asArray(page?.faq);
  if (faq.length < 12 || faq.length > 16) {
    errors.push(`${label} product SEO FAQ must contain 12 to 16 items; got ${faq.length}.`);
  }

  return errors;
};

export const validateRenderedSeoProductProofDom = (snapshot = {}) => {
  const errors = [];
  const expectedOrder = [
    'header',
    'hero',
    'anchorNav',
    'quickAnswer',
    'pageRelevantFormats',
    'productCapabilities',
    'productWorkflow',
    'readyCarouselShowcase',
    'pageSpecificVisualProof',
    'useCases',
    'faq',
    'related',
    'finalCta',
    'footer',
  ];
  if (snapshot.headerCount !== undefined && snapshot.headerCount !== 1) errors.push('Rendered DOM must contain exactly one shared header.');
  if (snapshot.footerCount !== undefined && snapshot.footerCount !== 1) errors.push('Rendered DOM must contain exactly one shared footer.');
  if (snapshot.heroCarouselCards !== undefined && snapshot.heroCarouselCards !== 3) errors.push('Rendered DOM hero must contain exactly 3 carousel cards.');
  if (snapshot.heroCarouselImages !== undefined && snapshot.heroCarouselImages !== 3) errors.push('Rendered DOM hero must contain exactly 3 carousel images.');
  if (snapshot.productWorkflowMarkers !== 1) errors.push('Rendered DOM must contain exactly one data-seo-proof="product-workflow" marker.');
  if (snapshot.productCapabilitiesMarkers !== 1) errors.push('Rendered DOM must contain exactly one data-seo-proof="product-capabilities" marker.');
  if ((snapshot.productCapabilityCards || 0) < 6) errors.push('Rendered DOM product capabilities must contain at least 6 capability group cards.');
  if (snapshot.readyResultsShowcaseMarkers !== 1) errors.push('Rendered DOM must contain exactly one data-seo-proof="ready-results-showcase" marker.');
  if ((snapshot.readyResultCards || 0) !== 6) errors.push('Rendered DOM ready-results showcase must contain exactly 6 example cards.');
  if ((snapshot.readyResultImages || 0) !== 6) errors.push('Rendered DOM ready-results showcase must contain exactly 6 image/previews.');
  if (snapshot.readyResultsCtas !== 1) errors.push('Rendered DOM ready-results showcase must contain a CTA.');
  if (snapshot.readyResultsHasPlaceholder === true) errors.push('Rendered DOM ready-results showcase must not contain placeholder visuals.');
  if (snapshot.pageSpecificProofMarkers !== 1) errors.push('Rendered DOM must contain exactly one data-seo-proof="page-specific-result" marker.');
  if ((snapshot.pageSpecificProofImages || 0) < 3) errors.push('Rendered DOM page-specific proof must contain at least 3 visual assets.');
  if (snapshot.pageSpecificProofSharesReadyNode === true) errors.push('Rendered DOM page-specific proof must not share the ready-results showcase node.');
  if ((snapshot.workflowSteps || 0) !== 5) errors.push('Rendered DOM product workflow must contain exactly 5 workflow steps.');
  if (snapshot.workflowPanels !== undefined && snapshot.workflowPanels !== 4) errors.push('Rendered DOM product workflow must contain exactly 4 product panels.');
  if (snapshot.useCasesMarkers !== 1) errors.push('Rendered DOM must contain exactly one data-seo-section="use-cases" marker.');
  if (snapshot.relatedMarkers !== undefined && snapshot.relatedMarkers !== 1) errors.push('Rendered DOM must contain related content exactly once.');
  if (snapshot.finalCtaMarkers !== undefined && snapshot.finalCtaMarkers !== 1) errors.push('Rendered DOM must contain final CTA exactly once.');
  if ((snapshot.visibleFaqCount || 0) < 12 || (snapshot.visibleFaqCount || 0) > 16) errors.push('Rendered DOM FAQ must contain 12 to 16 visible questions.');
  if (snapshot.faqSchemaParity !== true) errors.push('Rendered DOM FAQPage schema must match visible FAQ questions 1:1.');
  if (Array.isArray(snapshot.sectionOrder)) {
    const missing = expectedOrder.filter((sectionId) => !snapshot.sectionOrder.includes(sectionId));
    if (missing.length) errors.push(`Rendered DOM section order is missing: ${missing.join(', ')}.`);
    const orderIndexes = expectedOrder.map((sectionId) => snapshot.sectionOrder.indexOf(sectionId));
    const hasBadOrder = orderIndexes.some((index, position) => index < 0 || (position > 0 && index <= orderIndexes[position - 1]));
    if (hasBadOrder) errors.push('Rendered DOM carousel product component tree is not in the required order.');
  }
  if (Array.isArray(snapshot.anchorTargetsMissing) && snapshot.anchorTargetsMissing.length) {
    errors.push(`Rendered DOM anchor nav links to missing sections: ${snapshot.anchorTargetsMissing.join(', ')}.`);
  }
  if (snapshot.legacyTechnicalLabels === true) errors.push('Rendered DOM contains legacy technical labels.');
  return errors;
};

export const validateSeoBlueprintCatalog = (context = {}) => {
  const errors = [];

  SEO_PAGE_BLUEPRINTS.forEach((blueprint) => {
    if (!hasText(blueprint.blueprintId)) errors.push('Blueprint must have blueprintId.');
    if (!hasText(blueprint.benchmarkRoute)) errors.push(`${blueprint.blueprintId} must define benchmarkRoute.`);
    if (!Array.isArray(blueprint.requiredSections) || !blueprint.requiredSections.length) {
      errors.push(`${blueprint.blueprintId} must define requiredSections.`);
    }

    blueprint.requiredSections.forEach((sectionId) => {
      if (!findSection(blueprint, sectionId)) {
        errors.push(`${blueprint.blueprintId} missing section mapping for required section ${sectionId}.`);
      }
    });

    blueprint.sections.forEach((sectionItem) => {
      const label = `${blueprint.blueprintId}.${sectionItem.id}`;
      if (!hasText(sectionItem.componentName) || /SomeHero|TBD/iu.test(sectionItem.componentName)) {
        errors.push(`${label} must use a real componentName.`);
      }
      ensurePathExists(errors, context, label, sectionItem.componentPath);
      (sectionItem.assetRequirements || []).forEach((assetPath) => ensureAssetExists(errors, context, label, assetPath));
    });
  });

  return errors;
};

export const validateSeoPageHandoff = (handoff, context = {}) => {
  const errors = [];
  const label = handoff?.id || handoff?.route || 'handoff';

  if (!handoff || typeof handoff !== 'object') {
    return ['Handoff must be an object.'];
  }

  const blueprint = getSeoBlueprintById(handoff.blueprintId);
  if (!blueprint) {
    errors.push(`${label} must use an existing blueprintId.`);
    return errors;
  }

  const status = handoff.ownerApprovalStatus || handoff.approvalStatus;
  if (!SEO_HANDOFF_STATUSES.includes(status)) {
    errors.push(`${label} ownerApprovalStatus must be one of: ${SEO_HANDOFF_STATUSES.join(', ')}.`);
  }

  if (
    handoff.codexStageRequested === true &&
    !SEO_HANDOFF_ROLE_CONTRACT.codexAllowedStatuses.includes(status)
  ) {
    errors.push(`${label} Codex integration is blocked without approved_for_technical_integration.`);
  }

  if (
    handoff.releaseRequested === true &&
    !SEO_HANDOFF_ROLE_CONTRACT.releaseAllowedStatuses.includes(status)
  ) {
    errors.push(`${label} release is blocked without approved_for_release.`);
  }

  const sections = Array.isArray(handoff.sections) ? handoff.sections : [];
  if (!sections.length) {
    errors.push(`${label} must define sections from the selected blueprint.`);
    return errors;
  }

  const byId = new Map(sections.map((sectionItem) => [sectionItem.id, sectionItem]));
  blueprint.requiredSections.forEach((sectionId) => {
    if (!byId.has(sectionId)) errors.push(`${label} is missing required blueprint section ${sectionId}.`);
  });

  sections.forEach((sectionItem) => {
    const blueprintSection = findSection(blueprint, sectionItem.id);
    if (!blueprintSection) {
      errors.push(`${label}.${sectionItem.id || '(missing section id)'} is not part of blueprint ${blueprint.blueprintId}.`);
      return;
    }

    if (sectionItem.componentName !== blueprintSection.componentName) {
      errors.push(`${label}.${sectionItem.id} must use componentName ${blueprintSection.componentName}.`);
    }
    if (sectionItem.componentPath !== blueprintSection.componentPath) {
      errors.push(`${label}.${sectionItem.id} must use componentPath ${blueprintSection.componentPath}.`);
    }
    ensurePathExists(errors, context, `${label}.${sectionItem.id}`, sectionItem.componentPath);

    (blueprintSection.copySlots || []).forEach((slotName) => {
      const values = slotValues(sectionItem.copySlots, slotName);
      if (!values.length) errors.push(`${label}.${sectionItem.id} missing required copy slot ${slotName}.`);
      values.forEach((value, index) => {
        if (!hasText(textFrom(value))) errors.push(`${label}.${sectionItem.id} copy slot ${slotName}[${index}] must be filled.`);
        if (isPlaceholderValue(value)) errors.push(`${label}.${sectionItem.id} copy slot ${slotName}[${index}] contains forbidden internal/placeholder text.`);
      });
    });

    (blueprintSection.visualSlots || []).forEach((slotName) => {
      const values = slotValues(sectionItem.visualSlots, slotName);
      if (!values.length) errors.push(`${label}.${sectionItem.id} missing required visual slot ${slotName}.`);
      values.forEach((value, index) => {
        if (typeof value === 'string') {
          ensureAssetExists(errors, context, `${label}.${sectionItem.id}.${slotName}[${index}]`, value);
          return;
        }
        if (!value || typeof value !== 'object') {
          errors.push(`${label}.${sectionItem.id} visual slot ${slotName}[${index}] must be an object or asset reference.`);
          return;
        }
        ensureAssetExists(errors, context, `${label}.${sectionItem.id}.${slotName}[${index}]`, value.assetPath || value.componentRef);
        if (!hasText(value.type)) errors.push(`${label}.${sectionItem.id} visual slot ${slotName}[${index}] must define type.`);
        if (!hasText(value.alt) && !String(value.assetPath || value.componentRef || '').startsWith('component:')) {
          errors.push(`${label}.${sectionItem.id} visual slot ${slotName}[${index}] must define alt text for image assets.`);
        }
        if (isPlaceholderValue(value)) errors.push(`${label}.${sectionItem.id} visual slot ${slotName}[${index}] contains forbidden placeholder/internal text.`);
      });
    });

    if (!SEO_HANDOFF_STATUSES.includes(sectionItem.ownerApprovalStatus || status)) {
      errors.push(`${label}.${sectionItem.id} must carry ownerApprovalStatus or inherit a valid handoff status.`);
    }
  });

  errors.push(...validateSeoProductProofModules(handoff, context));

  return errors;
};
