import { getDefaultTemplateVariantForPageType } from './templateVariants.js';
import { getProtectedRouteOwner } from './protectedRoutes.js';
import { seamlessInstagramCarouselHandoff } from './handoffs/seamlessInstagramCarouselHandoff.js';
import { hasApprovedSeoRouteMigration as hasApprovedEngineRouteMigration } from './helpers/routeOwnership.js';
import {
  isSeoPageRoutable,
  isSeoPageIndexable,
  getSeoPagesEligibleForSitemap,
  getSeoPagesEligibleForPrerender,
} from './helpers/sitemapEligibility.js';
import { validateSeoPagesContract } from './helpers/validation.js';
import { SEO_CANONICAL_PRODUCT_CAPABILITIES } from './productTruthRegistry.js';
import { getSeoCarouselAssets } from './carouselAssetRegistry.js';

export const SEO_PAGE_TYPES = [
  'commercial',
  'tool',
  'platform',
  'useCase',
  'template',
  'example',
  'prompt',
  'alternative',
];

export const SEO_PAGE_TYPE_ROUTES = {
  commercial: '',
  tool: 'tools',
  platform: 'platforms',
  useCase: 'use-cases',
  template: 'templates',
  example: 'examples',
  prompt: 'prompts',
  alternative: 'alternatives',
};

export const SEO_PAGE_HUBS = {
  tool: {
    path: '/ru/tools',
    title: 'Инструменты GoToFlow',
    description: 'SEO-хаб для страниц инструментов GoToFlow.',
    h1: 'Инструменты',
    label: 'Tools',
  },
  platform: {
    path: '/ru/platforms',
    title: 'Платформы для контента',
    description: 'SEO-хаб для страниц платформ и форматов.',
    h1: 'Платформы',
    label: 'Platforms',
  },
  useCase: {
    path: '/ru/use-cases',
    title: 'Сценарии использования GoToFlow',
    description: 'SEO-хаб для страниц сценариев использования.',
    h1: 'Сценарии использования',
    label: 'Use cases',
  },
  template: {
    path: '/ru/templates',
    title: 'Шаблоны GoToFlow',
    description: 'SEO-хаб для страниц шаблонов.',
    h1: 'Шаблоны',
    label: 'Templates',
  },
  example: {
    path: '/ru/examples',
    title: 'Примеры контента GoToFlow',
    description: 'SEO-хаб для страниц примеров.',
    h1: 'Примеры',
    label: 'Examples',
  },
  prompt: {
    path: '/ru/prompts',
    title: 'Промпты GoToFlow',
    description: 'SEO-хаб для страниц промптов.',
    h1: 'Промпты',
    label: 'Prompts',
  },
  alternative: {
    path: '/ru/alternatives',
    title: 'Альтернативы инструментам для контента',
    description: 'SEO-хаб для страниц альтернатив.',
    h1: 'Альтернативы',
    label: 'Alternatives',
  },
};

/**
 * @typedef {'commercial'|'tool'|'platform'|'useCase'|'template'|'example'|'prompt'|'alternative'} SeoPageType
 * @typedef {'ru'|'en'} SeoPageLanguage
 * @typedef {'WebPage'|'WebApplication'|'SoftwareApplication'} SeoSchemaType
 *
 * @typedef {Object} SeoPageCta
 * @property {string} label
 * @property {string} href
 * @property {string=} note
 *
 * @typedef {Object} SeoPageFinalCta
 * @property {string} eyebrow
 * @property {{before: string, accent: string, after: string}} title
 * @property {string} description
 * @property {SeoPageCta} primaryAction
 *
 * @typedef {Object} SeoPageSection
 * @property {string} id
 * @property {string} title
 * @property {string} body
 * @property {string[]=} bullets
 *
 * @typedef {Object} SeoPageFaq
 * @property {string} question
 * @property {string} answer
 *
 * @typedef {Object} SeoPageBreadcrumb
 * @property {string} label
 * @property {string} path
 *
 * @typedef {Object} SeoPageBlockItem
 * @property {string} title
 * @property {string} body
 *
 * @typedef {Object} SeoPage
 * @property {string} id
 * @property {SeoPageLanguage} language
 * @property {SeoPageType} pageType
 * @property {string} slug
 * @property {string} path
 * @property {string} title
 * @property {string} description
 * @property {string} h1
 * @property {string} heroSubtitle
 * @property {string} primaryKeyword
 * @property {string[]} secondaryKeywords
 * @property {string} searchIntent
 * @property {number} priority
 * @property {number} commercialValue
 * @property {string} productBridge
 * @property {SeoPageCta} cta
 * @property {SeoPageFinalCta=} finalCta
 * @property {SeoPageSection[]} sections
 * @property {SeoPageFaq[]} faq
 * @property {string[]} relatedSeoPages
 * @property {string[]} relatedBlogSlugs
 * @property {SeoPageBreadcrumb[]} breadcrumbs
 * @property {SeoSchemaType} schemaType
 * @property {boolean} published
 * @property {boolean} noindex
 * @property {string} lastUpdated
 * @property {string=} productTruthReviewedAt
 * @property {string=} seoReviewedAt
 * @property {string=} indexationApprovedAt
 * @property {string=} lastLiveCheckedAt
 * @property {string=} nextProductReviewAt
 * @property {string=} nextSeoReviewAt
 * @property {string=} contentOwner
 * @property {string=} seoOwner
 * @property {string=} productVersion
 * @property {SeoPageBlockItem[]=} examples
 * @property {SeoPageBlockItem[]=} templates
 * @property {{lang: string, href: string}[]=} hreflang
 */

const p0BatchUpdatedAt = '2026-07-08';

const p0Cta = {
  label: 'Создать контент в GoToFlow',
  href: 'https://app.gotoflow.io',
  note: 'Страница открыта для внутреннего визуального ревью и пока закрыта от индексации.',
};

const ruHomeBreadcrumb = { label: 'Главная', path: '/ru' };

export const SEO_INTENT_OWNERSHIP_DECISIONS = [
  'safe_new_registry_page',
  'update_existing_page_instead',
  'merge_into_existing_page',
  'supporting_blog_article',
  'faq_h2_only',
  'secondary_keyword_only',
  'manual_review_required',
  'explicit_migration_required',
];

export const SEO_MIGRATION_REQUIRED_FIELDS = [
  'oldRouteOwner',
  'newRouteOwner',
  'migrationReason',
  'canonicalDecision',
  'noindexDecision',
  'sitemapDecision',
  'rollbackPlan',
  'approvedByHuman',
];

export const EXISTING_RU_ROUTE_OWNERS = {
  '/ru': 'App.jsx:LandingPage',
  '/ru/ai-generator-karuselej': 'App.jsx:RuAICarouselGeneratorPage',
  '/ru/ii-generator-karuseley': 'App.jsx:RuAICarouselGeneratorPage historical product/tool route',
  '/ru/generator-karuselej-instagram': 'App.jsx:RuAICarouselGeneratorPage',
  '/ru/generator-kontenta': 'App.jsx:AIContentPageRu',
  '/ru/ii-generator-kontenta': 'App.jsx:AIContentPageRu',
  '/ru/generator-postov-instagram': 'App.jsx:InstagramPostPageRu',
  '/ru/ii-generator-postov-dlya-instagram': 'App.jsx:InstagramPostPageRu',
  '/ru/generator-karuselej-linkedin': 'App.jsx:LinkedInCarouselPageRu',
  '/ru/ii-generator-postov-dlya-linkedin': 'App.jsx:LinkedInPostPageRu',
  '/ru/blog': 'App.jsx:BlogPageRu',
  '/ru/politika': 'App.jsx:PrivacyPolicyPage',
  '/ru/polzovatelskoe-soglashenie': 'App.jsx:RuTermsOfServicePage',
  '/ru/soglasie-na-obrabotku-personalnyh-dannyh': 'App.jsx:RuPersonalDataConsentPage',
  '/ru/ugc-creator-terms': 'App.jsx:UgcCreatorTermsRu',
};

const ownershipDecision = ({
  decision,
  reason,
  existingOwnerStatus,
  migrationRequired = false,
  approvedByHuman = false,
  intentOverlapPaths = [],
  migration = null,
}) => ({
  decision,
  reason,
  existingOwnerStatus,
  migrationRequired,
  approvedByHuman,
  intentOverlapPaths,
  migration,
});

const p0OwnershipDecisions = {
  generatorKaruseley: ownershipDecision({
    decision: 'update_existing_page_instead',
    reason: 'Overlaps the existing RU carousel product family and should be resolved as an update to existing route owners before registry routing.',
    existingOwnerStatus: 'Existing product/tool family: /ru/ai-generator-karuselej, /ru/ii-generator-karuseley, /ru/generator-karuselej-instagram.',
    intentOverlapPaths: ['/ru/ai-generator-karuselej', '/ru/ii-generator-karuseley', '/ru/generator-karuselej-instagram'],
  }),
  iiGeneratorKaruseley: ownershipDecision({
    decision: 'explicit_migration_required',
    reason: 'Exact route collision with the existing/historical RU product/tool route owner.',
    existingOwnerStatus: 'Existing route owner wins: App.jsx:RuAICarouselGeneratorPage plus legacy schema, FAQ schema, canonical fallback, and blog CTA evidence.',
    migrationRequired: true,
    intentOverlapPaths: ['/ru/ai-generator-karuselej', '/ru/generator-karuselej-instagram', '/ru/blog/luchshie-ai-generatory-karuselej'],
    migration: {
      oldRouteOwner: 'App.jsx:RuAICarouselGeneratorPage historical product/tool route',
      newRouteOwner: 'SEO registry page ru-commercial-ii-generator-karuseley',
      migrationReason: 'Not approved. Requires explicit product/SEO owner decision before registry can take over this route.',
      canonicalDecision: 'Keep existing route owner canonical until migration approval.',
      noindexDecision: 'Registry backlog entry is not routable; existing product/tool route controls robots.',
      sitemapDecision: 'Registry entry must not add this path to sitemap without approved migration.',
      rollbackPlan: 'Restore App.jsx route to RuAICarouselGeneratorPage and keep registry entry unpublished.',
      approvedByHuman: false,
    },
  }),
  generatorPostovDlyaSocsetey: ownershipDecision({
    decision: 'update_existing_page_instead',
    reason: 'Overlaps existing RU content/product generator routes and should be resolved with those owners before registry routing.',
    existingOwnerStatus: 'Existing product/tool family: /ru/generator-kontenta, /ru/ii-generator-kontenta, /ru/generator-postov-instagram.',
    intentOverlapPaths: ['/ru/generator-kontenta', '/ru/ii-generator-kontenta', '/ru/generator-postov-instagram'],
  }),
  instagramCarouselGenerator: ownershipDecision({
    decision: 'update_existing_page_instead',
    reason: 'Overlaps the existing Instagram carousel product route.',
    existingOwnerStatus: 'Existing product/tool route: /ru/generator-karuselej-instagram.',
    intentOverlapPaths: ['/ru/generator-karuselej-instagram', '/ru/blog/kak-sdelat-karusel-dlya-instagram-s-ii'],
  }),
  instagramPostGenerator: ownershipDecision({
    decision: 'update_existing_page_instead',
    reason: 'Overlaps existing Instagram post generator routes.',
    existingOwnerStatus: 'Existing product/tool routes: /ru/generator-postov-instagram and /ru/ii-generator-postov-dlya-instagram.',
    intentOverlapPaths: ['/ru/generator-postov-instagram', '/ru/ii-generator-postov-dlya-instagram'],
  }),
  vkPostGenerator: ownershipDecision({
    decision: 'safe_new_registry_page',
    reason: 'No exact hard-coded product/tool route collision found; keep published for internal route review and noindex until SEO approval.',
    existingOwnerStatus: 'No exact existing RU product/tool route owner found in the 2026-07-08 inventory.',
    intentOverlapPaths: ['/ru/blog/kak-napisat-post-v-vk-s-pomoshyu-ii', '/ru/blog/temy-postov-dlya-gruppy-vkontakte'],
  }),
  telegramPostGenerator: ownershipDecision({
    decision: 'safe_new_registry_page',
    reason: 'No exact hard-coded product/tool route collision found; keep published for internal route review and noindex until SEO approval.',
    existingOwnerStatus: 'No exact existing RU product/tool route owner found in the 2026-07-08 inventory.',
    intentOverlapPaths: ['/ru/blog/kak-vesti-telegram-kanal-biznesu', '/ru/blog/struktura-prodayuschego-posta-v-telegram'],
  }),
  linkedinCarouselGenerator: ownershipDecision({
    decision: 'update_existing_page_instead',
    reason: 'Overlaps the existing LinkedIn carousel product route.',
    existingOwnerStatus: 'Existing product/tool route: /ru/generator-karuselej-linkedin.',
    intentOverlapPaths: ['/ru/generator-karuselej-linkedin', '/ru/blog/kak-sdelat-karusel-linkedin-s-ai', '/ru/blog/idei-karuselej-linkedin'],
  }),
  platformSeed: ownershipDecision({
    decision: 'safe_new_registry_page',
    reason: 'Technical noindex seed page for the SEO page foundation; no exact existing production route collision found.',
    existingOwnerStatus: 'No exact existing RU product/tool route owner found in the 2026-07-08 inventory.',
  }),
  templateSeed: ownershipDecision({
    decision: 'safe_new_registry_page',
    reason: 'Technical noindex seed page for the SEO page foundation; no exact existing production route collision found.',
    existingOwnerStatus: 'No exact existing RU product/tool route owner found in the 2026-07-08 inventory.',
  }),
};

const seamlessHandoffSection = (sectionId) => (
  seamlessInstagramCarouselHandoff.sections.find((section) => section.id === sectionId)
);

const buildCanonicalProductCapabilities = ({ heading, introCopy, highlightedCapabilities = [] } = {}) => ({
  eyebrow: 'Возможности GoToFlow',
  heading: heading || 'Что можно настроить в GoToFlow',
  introCopy: introCopy || 'Этот блок показывает подтвержденные возможности продукта: источники, AI-структуру, шаблоны, визуальные настройки, редактирование, типы каруселей и форматы.',
  highlightedCapabilities,
  groups: SEO_CANONICAL_PRODUCT_CAPABILITIES,
});

const seamlessCopySlot = (sectionId, slotName, fallback = '') => (
  seamlessHandoffSection(sectionId)?.copySlots?.[slotName] ?? fallback
);

const seamlessCopyList = (sectionId, slotName) => {
  const value = seamlessCopySlot(sectionId, slotName, []);
  return Array.isArray(value) ? value : [];
};

const seamlessVisualList = (sectionId, slotName) => {
  const value = seamlessHandoffSection(sectionId)?.visualSlots?.[slotName] ?? [];
  return Array.isArray(value) ? value : [];
};

const seamlessImagesFromVisualSlot = (sectionId, slotName) => (
  seamlessVisualList(sectionId, slotName).map((item) => ({
    src: item.assetPath,
    alt: item.alt,
  }))
);

const seamlessItemsFromSlots = (sectionId, limit = Infinity) => {
  const titles = seamlessCopyList(sectionId, 'item.title');
  const bodies = seamlessCopyList(sectionId, 'item.body');
  const types = seamlessCopyList(sectionId, 'item.type');
  const audiences = seamlessCopyList(sectionId, 'item.audience');
  const images = seamlessVisualList(sectionId, 'items.image');

  return titles.slice(0, limit).map((title, index) => ({
    title,
    body: bodies[index],
    type: types[index],
    audience: audiences[index],
    image: images[index]?.assetPath,
    width: 1080,
    height: 1350,
  }));
};

const seamlessGuideItems = seamlessCopyList('pageRelevantFormats', 'items.task').map((task, index) => ({
  id: `seamless-guide-${index + 1}`,
  task,
  template: seamlessCopyList('pageRelevantFormats', 'items.template')[index],
  structure: seamlessCopyList('pageRelevantFormats', 'items.structure')[index],
}));

const seamlessRelatedCards = seamlessCopyList('related', 'relatedCard.title').map((title, index) => ({
  href: seamlessInstagramCarouselHandoff.relatedLinks[index]?.route,
  title,
  description: seamlessCopyList('related', 'relatedCard.description')[index],
  type: seamlessInstagramCarouselHandoff.relatedLinks[index]?.allowedTargetTypes?.[0],
})).filter((item) => item.href && item.title);

const seamlessWorkflowStepKeys = ['source', 'structure', 'textReview', 'visualRoute', 'editorResult'];
const seamlessWorkflowStepTitles = seamlessCopyList('productWorkflow', 'stepOverrides');
const seamlessWorkflowStepDescriptions = [
  seamlessWorkflowStepTitles[0],
  seamlessWorkflowStepTitles[1],
  seamlessWorkflowStepTitles[2],
  seamlessWorkflowStepTitles[3],
  seamlessWorkflowStepTitles[4],
];

const seamlessResultSlides = getSeoCarouselAssets('workflowResults', 'seamlessInstagramFiveSlides');
const aiCarouselResultSlides = getSeoCarouselAssets('workflowResults', 'aiCarouselFiveSlides');

const seamlessSectionPolicy = Object.fromEntries([
  'hero',
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
].map((sectionId) => [
  sectionId,
  {
    enabled: true,
    reason: 'Section is required by the exact reusable SEO page blueprint and populated from the approved Gemini handoff.',
  },
]));

const seamlessInstagramCarouselDraftPage = {
  id: 'ru-use-case-seamless-instagram-carousel',
  language: 'ru',
  pageType: 'useCase',
  slug: 'besshovnaya-karusel-instagram',
  path: seamlessInstagramCarouselHandoff.route,
  title: seamlessInstagramCarouselHandoff.metadata.title,
  description: seamlessInstagramCarouselHandoff.metadata.description,
  h1: seamlessCopySlot('hero', 'heading'),
  heroSubtitle: seamlessCopySlot('hero', 'body'),
  primaryKeyword: seamlessInstagramCarouselHandoff.primaryQuery,
  secondaryKeywords: seamlessInstagramCarouselHandoff.supportingQueries,
  searchIntent: seamlessInstagramCarouselHandoff.searchIntent,
  priority: 0.72,
  commercialValue: 0.8,
  productBridge: seamlessInstagramCarouselHandoff.userJob,
  primaryIntent: seamlessInstagramCarouselHandoff.searchIntent,
  pageFamily: 'carousel_product_page',
  templateVariant: 'template_page',
  cta: {
    label: seamlessCopySlot('hero', 'primaryCta'),
    href: 'https://app.gotoflow.io',
    action: 'open_app',
  },
  heroEyebrow: seamlessCopySlot('hero', 'eyebrow'),
  heroSecondaryLinkLabel: seamlessCopySlot('hero', 'secondaryCta'),
  finalCta: {
    eyebrow: seamlessCopySlot('finalCta', 'eyebrow'),
    title: {
      before: seamlessCopySlot('finalCta', 'heading.before'),
      accent: seamlessCopySlot('finalCta', 'heading.accent'),
      after: seamlessCopySlot('finalCta', 'heading.after'),
    },
    description: seamlessCopySlot('finalCta', 'body'),
    primaryAction: {
      label: seamlessCopySlot('finalCta', 'primaryCta'),
      href: 'https://app.gotoflow.io',
      action: 'open_app',
    },
  },
  conversion: {
    destinationType: 'app',
    destinationUrl: 'https://app.gotoflow.io',
    targetAction: 'create_seamless_instagram_carousel',
    pageEntity: 'seamless_instagram_carousel',
    appDeepLinkVerified: false,
    appDeepLinkNotes: 'No verified deep link for the draft preview; route uses the approved GoToFlow app origin.',
  },
  seoBrief: {
    pageEntity: 'seamless Instagram carousel use case',
    primaryQuery: seamlessInstagramCarouselHandoff.primaryQuery,
    primaryIntent: seamlessInstagramCarouselHandoff.searchIntent,
    userJob: seamlessInstagramCarouselHandoff.userJob,
    uniqueAngle: seamlessInstagramCarouselHandoff.generatorBoundary,
    audience: 'Создатели Instagram-каруселей, эксперты, SMM-команды и авторы визуального контента.',
    contentType: 'noindex use-case SEO page',
    platform: 'Instagram',
    language: 'ru',
    country: 'RU',
    conversionAction: 'create_seamless_instagram_carousel',
    productRoute: 'https://app.gotoflow.io',
    cannibalizationBoundary: seamlessInstagramCarouselHandoff.articleBoundary,
  },
  faqPolicy: {
    minItems: 12,
    maxItems: 16,
    requireUniqueQuestions: true,
    requireVisibleSchemaParity: true,
  },
  sectionPolicy: seamlessSectionPolicy,
  sections: [],
  quickAnswer: {
    title: seamlessCopySlot('quickAnswer', 'heading'),
    body: seamlessCopySlot('quickAnswer', 'body'),
    contextualLink: {
      label: seamlessCopySlot('quickAnswer', 'contextualLink'),
      href: '/ru/blog/besshovnaya-karusel-v-instagram',
    },
  },
  heroCarouselImages: seamlessImagesFromVisualSlot('hero', 'heroCarouselImages'),
  heroVisualBadge: 'Бесшовная',
  templateCategoriesIntro: {
    eyebrow: seamlessCopySlot('pageRelevantFormats', 'sectionEyebrow'),
    heading: seamlessCopySlot('pageRelevantFormats', 'sectionHeading'),
  },
  templateCategories: seamlessItemsFromSlots('pageRelevantFormats', 4),
  categoryCta: {
    label: seamlessCopySlot('pageRelevantFormats', 'categoryCta'),
    href: 'https://app.gotoflow.io',
    action: 'open_app',
  },
  templateChoiceGuide: {
    eyebrow: 'Настройки',
    title: {
      before: 'Какие параметры ',
      accent: 'можно настроить',
      after: ' перед скачиванием',
    },
    description: 'Этот блок про настройки редактора, а не про сценарии применения: исходник, бесшовный тип, стиль, фон, персонаж, CTA и ручная проверка результата.',
    items: [
      { id: 'source', task: 'Исходный материал', template: 'Тема, текст, ссылка, видео, PDF или голосовое', structure: 'добавьте контекст и задачу карусели' },
      { id: 'seamless-type', task: 'Тип карусели', template: 'Бесшовная карусель', structure: 'выберите визуальное продолжение между слайдами' },
      { id: 'style', task: 'Визуальный стиль', template: 'AI-стиль или собственный промпт', structure: 'задайте направление, фон и персонажа' },
      { id: 'editing', task: 'Редактирование', template: 'Текст, слайды и CTA', structure: 'проверьте, исправьте и перегенерируйте части результата' },
    ],
  },
  productWorkflow: {
    preset: 'carousel_creation',
    eyebrow: seamlessCopySlot('productWorkflow', 'eyebrow'),
    title: {
      before: seamlessCopySlot('productWorkflow', 'heading.before'),
      accent: seamlessCopySlot('productWorkflow', 'heading.accent'),
      after: seamlessCopySlot('productWorkflow', 'heading.after'),
    },
    description: seamlessCopySlot('productWorkflow', 'description'),
    carouselTypes: [
      { id: 'ai', label: 'AI-карусель', availability: 'available' },
      { id: 'template', label: 'Шаблонная', availability: 'available' },
      { id: 'seamless', label: 'Бесшовная', availability: 'available', active: true },
      { id: 'animated', label: 'Анимированная', availability: 'available' },
    ],
    stepOverrides: Object.fromEntries(seamlessWorkflowStepKeys.map((key, index) => [
      key,
      {
        title: seamlessWorkflowStepTitles[index],
        description: seamlessWorkflowStepDescriptions[index],
      },
    ])),
    mockups: [
      {
        id: 'source-structure',
        title: 'Выбор темы и структуры',
        caption: seamlessWorkflowStepTitles[0],
        fallbackVisualType: 'source_structure',
      },
      {
        id: 'text-review',
        title: 'Проверка текста',
        caption: seamlessWorkflowStepTitles[2],
        fallbackVisualType: 'text_review',
      },
      {
        id: 'visual-route',
        title: 'Бесшовный стиль',
        caption: seamlessWorkflowStepTitles[1],
        fallbackVisualType: 'ai_template',
      },
      {
        id: 'editor-result',
        title: 'Готовые связанные слайды',
        caption: seamlessWorkflowStepTitles[3],
        fallbackVisualType: 'editor_result',
        resultCarousel: {
          proofType: 'workflow-result',
          title: seamlessCopySlot('readyCarouselShowcase', 'sectionHeading'),
          label: 'Бесшовная карусель',
          format: '4:5',
          slideCount: seamlessResultSlides.length,
          width: 1080,
          height: 1350,
          mode: 'Связанные слайды',
          images: seamlessResultSlides,
        },
      },
    ],
    featureChips: seamlessCopyList('productWorkflow', 'featureChips'),
    cta: {
      label: seamlessCopySlot('productWorkflow', 'cta'),
      href: 'https://app.gotoflow.io',
      action: 'open_app',
      note: seamlessCopySlot('productWorkflow', 'description'),
    },
  },
  pageSpecificVisualProof: {
    proofType: 'page-specific',
    eyebrow: seamlessCopySlot('pageSpecificVisualProof', 'eyebrow'),
    title: seamlessCopySlot('pageSpecificVisualProof', 'title'),
    description: seamlessCopySlot('pageSpecificVisualProof', 'description'),
    label: seamlessCopySlot('pageSpecificVisualProof', 'label'),
    format: '4:5',
    slideCount: seamlessResultSlides.length,
    width: 1080,
    height: 1350,
    mode: seamlessCopySlot('pageSpecificVisualProof', 'mode'),
    images: seamlessResultSlides,
  },
  readyCarouselShowcaseIntro: {
    eyebrow: seamlessCopySlot('readyCarouselShowcase', 'sectionEyebrow'),
    heading: seamlessCopySlot('readyCarouselShowcase', 'sectionHeading'),
    body: seamlessCopySlot('readyCarouselShowcase', 'sectionBody'),
  },
  readyCarouselShowcase: seamlessItemsFromSlots('readyCarouselShowcase', 6),
  readyCarouselShowcaseCta: {
    label: seamlessCopySlot('readyCarouselShowcase', 'showcaseCta'),
    href: 'https://app.gotoflow.io',
    action: 'open_app',
    note: seamlessCopySlot('readyCarouselShowcase', 'sectionBody'),
  },
  productCapabilities: buildCanonicalProductCapabilities({
    heading: seamlessCopySlot('productCapabilities', 'heading'),
    introCopy: seamlessCopySlot('productCapabilities', 'introCopy', seamlessInstagramCarouselHandoff.productProofModules.canonicalProductCapabilities.introCopy),
    highlightedCapabilities: ['seamlessCarousels', 'formats4511916', 'upTo10Slides', 'slideEditing'],
  }),
  useCasesIntro: {
    eyebrow: 'Сценарии',
    heading: 'Для каких задач подходит бесшовная карусель',
  },
  useCases: seamlessCopyList('useCases', 'item.title').map((title, index) => ({
    title,
    body: seamlessCopyList('useCases', 'item.body')[index],
  })),
  faq: seamlessInstagramCarouselHandoff.FAQ,
  relatedIntro: {
    eyebrow: seamlessCopySlot('related', 'eyebrow'),
  },
  relatedCards: seamlessRelatedCards,
  relatedSeoPages: [],
  relatedSeoPaths: ['/ru/templates/instagram-carousel'],
  relatedProductToolPaths: ['/ru/generator-karuselej-instagram'],
  contextualLinks: [],
  relatedBlogSlugs: ['besshovnaya-karusel-v-instagram'],
  breadcrumbs: [
    ruHomeBreadcrumb,
    { label: 'Сценарии использования', path: '/ru/use-cases' },
    { label: seamlessCopySlot('hero', 'heading'), path: seamlessInstagramCarouselHandoff.route },
  ],
  schemaType: 'WebPage',
  published: true,
  noindex: true,
  state: 'noindex_review',
  sitemapEligible: false,
  routeReviewApproved: true,
  approvedByHuman: false,
  indexationApproved: false,
  indexationApproval: {
    approved: false,
    approvedBy: '',
    approvedAt: '',
    notes: 'Noindex localhost preview only. Owner visual approval and release approval are pending.',
  },
  contentReviewedByHuman: true,
  uniquenessReviewedByHuman: true,
  internalLinksReviewedByHuman: true,
  ctaReviewedByHuman: true,
  productClaimsReviewedByHuman: true,
  review: {
    owner: 'GoToFlow',
    contentReviewedAt: '2026-07-14',
    productClaimsReviewedAt: '2026-07-14',
    assetsReviewedAt: '',
    seoReviewedAt: '2026-07-14',
    productVersion: 'seo-draft-preview-2026-07-14',
  },
  designReference: '/ru',
  urlOrigin: 'seo_registry_candidate',
  urlOriginEvidence: [
    'src/content/seoPages/handoffs/seamlessInstagramCarouselHandoff.js',
    'src/content/seoPages/blueprints/exactSeoPageBlueprint.js',
    'scratch/seo-demand-imports/2026-07-06/seo-route-only-manual-check-plan-2026-07-08.csv',
  ],
  intentOwner: 'ru-use-case-seamless-instagram-carousel',
  routeOwner: 'ru-use-case-seamless-instagram-carousel',
  canonicalOwner: seamlessInstagramCarouselHandoff.metadata.canonicalPath,
  riskLevel: 'medium',
  manualReviewReason: 'Noindex localhost preview from the approved Gemini handoff; owner visual approval is still required before production integration.',
  createdFromActionMapRowIds: ['seamless-instagram-carousel-gemini-handoff-2026-07-14'],
  notes: [
    seamlessInstagramCarouselHandoff.generatorBoundary,
    seamlessInstagramCarouselHandoff.articleBoundary,
    'Draft route remains noindex and excluded from sitemap until separate owner release approval.',
  ],
  draftPreviewIntegrated: true,
  productionIntegrationCompleted: false,
  approvedForRelease: false,
  lastUpdated: '2026-07-14',
  ownershipDecision: ownershipDecision({
    decision: 'safe_new_registry_page',
    reason: 'No exact protected route collision found for the use-case path; existing generator and slicing article remain separate route owners.',
    existingOwnerStatus: 'Existing product route /ru/generator-karuselej-instagram remains the generator owner; related blog route keeps slicing-instruction intent.',
    intentOverlapPaths: ['/ru/generator-karuselej-instagram', '/ru/blog/kak-narezat-foto-dlya-karuseli', '/ru/templates/instagram-carousel'],
  }),
};

/** @type {SeoPage[]} */
const rawSeoPages = [
  seamlessInstagramCarouselDraftPage,
  {
    id: 'ru-commercial-generator-karuseley',
    language: 'ru',
    pageType: 'commercial',
    slug: 'generator-karuseley',
    path: '/ru/generator-karuseley',
    title: 'Генератор каруселей для соцсетей | GoToFlow',
    description: 'Генератор каруселей GoToFlow помогает собрать структуру, текст по слайдам, идеи и CTA для экспертных, образовательных и продающих каруселей.',
    h1: 'Генератор каруселей для соцсетей',
    heroSubtitle: 'Превращайте тему, тезисы или готовый материал в понятный черновик карусели: с логикой слайдов, коротким текстом, примерами форматов и CTA.',
    primaryKeyword: 'генератор каруселей',
    secondaryKeywords: ['создать карусель онлайн', 'генератор постов каруселей', 'карусель для соцсетей'],
    searchIntent: 'commercial investigation',
    priority: 0.8,
    commercialValue: 0.9,
    productBridge: 'GoToFlow помогает быстро собрать черновик карусели: выбрать угол подачи, разложить мысль по слайдам, подготовить текст и финальный призыв к действию.',
    cta: p0Cta,
    sections: [
      {
        id: 'what-it-does',
        title: 'Что помогает сделать генератор каруселей',
        body: 'Инструмент помогает перейти от сырой идеи к последовательной карусели: определить первый слайд, разложить аргументы, добавить примеры и закончить пост понятным CTA.',
        bullets: ['Подготовить структуру слайдов', 'Сократить длинный текст до формата карусели', 'Собрать обучающий, экспертный или продающий сценарий'],
      },
      {
        id: 'who-for',
        title: 'Кому подходит',
        body: 'Страница рассчитана на экспертов, SMM-специалистов, основателей, авторов личного бренда и небольшие команды, которым нужно регулярно выпускать карусели без долгого ручного планирования.',
        bullets: ['Экспертам и консультантам', 'SMM-командам и агентствам', 'Создателям образовательного и продуктового контента'],
      },
      {
        id: 'use-cases',
        title: 'Практические сценарии',
        body: 'GoToFlow можно использовать для идей, чек-листов, мини-гайдов, разборов ошибок, упаковки кейса, анонса продукта или серии постов вокруг одной темы.',
        bullets: ['Мини-гайд из 6-8 слайдов', 'Карусель с ошибками и решениями', 'Пост с разбором кейса или процесса'],
      },
      {
        id: 'workflow',
        title: 'Как создать карусель в GoToFlow',
        body: 'Начните с темы или тезисов, уточните аудиторию и задачу, выберите желаемый стиль подачи и используйте получившийся черновик как основу для редактуры и публикации.',
        bullets: ['Опишите тему и цель', 'Получите структуру и текст по слайдам', 'Отредактируйте формулировки под свой голос'],
      },
    ],
    examples: [
      { title: 'Обучающая карусель', body: 'Пошаговый разбор темы с короткими слайдами и выводом в конце.' },
      { title: 'Экспертный чек-лист', body: 'Список действий, критериев или ошибок, который удобно сохранить.' },
      { title: 'Продающий разбор', body: 'Проблема аудитории, объяснение решения и мягкий переход к продукту или консультации.' },
    ],
    faq: [
      {
        question: 'Можно ли сразу публиковать текст из генератора?',
        answer: 'Лучше использовать его как черновик: проверить факты, добавить личный опыт и адаптировать формулировки под свой стиль.',
      },
      {
        question: 'Подходит ли генератор для Instagram и LinkedIn?',
        answer: 'Да, GoToFlow помогает собрать структуру и текст карусели для разных соцсетей, а финальный формат публикации стоит адаптировать под требования площадки.',
      },
      {
        question: 'Почему страница noindex?',
        answer: 'Это первый P0-батч для внутреннего визуального ревью. Страница будет закрыта от индексации до отдельного решения о публикации.',
      },
    ],
    relatedSeoPages: ['ru-commercial-ii-generator-karuseley', 'ru-tool-instagram-carousel-generator', 'ru-tool-linkedin-carousel-generator'],
    relatedBlogSlugs: ['karusel-dlya-instagram', 'kak-sdelat-karusel-dlya-instagram-s-ii', 'tekst-v-karusel-neyroset'],
    breadcrumbs: [
      ruHomeBreadcrumb,
      { label: 'Генератор каруселей', path: '/ru/generator-karuseley' },
    ],
    schemaType: 'SoftwareApplication',
    published: false,
    noindex: true,
    lastUpdated: p0BatchUpdatedAt,
    ownershipDecision: p0OwnershipDecisions.generatorKaruseley,
  },
  {
    id: 'ru-commercial-ii-generator-karuseley',
    language: 'ru',
    pageType: 'commercial',
    slug: 'ii-generator-karuseley',
    path: '/ru/ii-generator-karuseley',
    title: 'ИИ генератор каруселей | GoToFlow',
    description: 'ИИ генератор каруселей GoToFlow помогает быстро подготовить структуру и текст для постов-каруселей в соцсетях.',
    h1: 'ИИ генератор каруселей',
    heroSubtitle: 'Собирайте черновик карусели быстрее: от темы и аудитории до слайдов, примеров, коротких формулировок и финального CTA.',
    primaryKeyword: 'ИИ генератор каруселей',
    secondaryKeywords: ['нейросеть для каруселей', 'ИИ для каруселей', 'создать карусель с ИИ'],
    searchIntent: 'commercial investigation',
    priority: 0.8,
    commercialValue: 0.9,
    productBridge: 'GoToFlow помогает сформулировать идею, структуру и текст карусели, а автор сохраняет контроль над фактами и финальной редактурой.',
    cta: p0Cta,
    sections: [
      {
        id: 'what-it-does',
        title: 'Что делает ИИ генератор каруселей',
        body: 'Он помогает не начинать с пустого листа: предлагает логику слайдов, варианты заголовков, краткий текст и переход к действию.',
        bullets: ['Идея и угол подачи', 'Текст по слайдам', 'Финальный CTA и варианты формата'],
      },
      {
        id: 'who-for',
        title: 'Для кого эта страница',
        body: 'Подходит тем, кто регулярно объясняет экспертные темы, продает через контент или превращает длинные материалы в короткие посты.',
        bullets: ['Эксперты и авторы личного бренда', 'Маркетологи и SMM-специалисты', 'Основатели и продуктовые команды'],
      },
      {
        id: 'use-cases',
        title: 'Где особенно полезен AI-подход',
        body: 'ИИ помогает ускорить первый черновик, когда есть тема, но нет структуры: для обучающих серий, прогрева, запусков, кейсов и контент-планов.',
        bullets: ['Разбор сложной темы простым языком', 'Серия каруселей из одного материала', 'Упаковка тезисов вебинара или статьи'],
      },
      {
        id: 'workflow',
        title: 'Как работать с черновиком',
        body: 'Задайте тему, аудиторию и цель, получите структуру, затем уточните тон, уберите лишнее и добавьте собственные примеры.',
        bullets: ['Сначала смысл и аудитория', 'Потом структура слайдов', 'В конце редактура под личный голос'],
      },
    ],
    examples: [
      { title: 'Карусель с объяснением', body: 'От проблемы к простому алгоритму действий.' },
      { title: 'Карусель для прогрева', body: 'Боль аудитории, причины, решение и мягкий переход к следующему шагу.' },
      { title: 'Карусель из статьи', body: 'Сжатая версия длинного текста с ключевыми выводами.' },
    ],
    faq: [
      {
        question: 'ИИ сам делает финальную публикацию?',
        answer: 'Нет. GoToFlow помогает с подготовкой структуры и текста, а финальную проверку, оформление и публикацию контролирует автор.',
      },
      {
        question: 'Можно ли сохранить авторский стиль?',
        answer: 'Да, лучше давать вводные по тону и затем редактировать черновик так, чтобы он звучал как ваш контент.',
      },
      {
        question: 'Страница будет индексироваться?',
        answer: 'Пока нет. Она опубликована для ревью и помечена noindex.',
      },
    ],
    relatedSeoPages: ['ru-commercial-generator-karuseley', 'ru-tool-instagram-carousel-generator', 'ru-tool-linkedin-carousel-generator'],
    relatedBlogSlugs: ['ii-dlya-karuseley', 'tekst-v-karusel-neyroset', 'kak-sdelat-karusel-dlya-instagram-s-ii'],
    breadcrumbs: [
      ruHomeBreadcrumb,
      { label: 'ИИ генератор каруселей', path: '/ru/ii-generator-karuseley' },
    ],
    schemaType: 'SoftwareApplication',
    published: false,
    noindex: true,
    lastUpdated: p0BatchUpdatedAt,
    ownershipDecision: p0OwnershipDecisions.iiGeneratorKaruseley,
  },
  {
    id: 'ru-commercial-generator-postov-dlya-socsetey',
    language: 'ru',
    pageType: 'commercial',
    slug: 'generator-postov-dlya-socsetey',
    path: '/ru/generator-postov-dlya-socsetey',
    title: 'Генератор постов для соцсетей | GoToFlow',
    description: 'GoToFlow помогает готовить идеи, структуру и черновики постов для соцсетей: от экспертных заметок до каруселей и анонсов.',
    h1: 'Генератор постов для соцсетей',
    heroSubtitle: 'Планируйте и собирайте черновики постов быстрее: идея, структура, текст, варианты формата и призыв к действию в одном рабочем процессе.',
    primaryKeyword: 'генератор постов для соцсетей',
    secondaryKeywords: ['генератор контента для соцсетей', 'создать пост с ИИ', 'посты для соцсетей'],
    searchIntent: 'commercial investigation',
    priority: 0.8,
    commercialValue: 0.9,
    productBridge: 'GoToFlow помогает превратить тему, тезисы или материал в черновик контента для соцсетей, который можно адаптировать под Instagram, Telegram, ВК или LinkedIn.',
    cta: p0Cta,
    sections: [
      {
        id: 'what-it-does',
        title: 'Что помогает создать генератор постов',
        body: 'Инструмент помогает собрать основу поста: выбрать формат, выстроить мысль, подготовить заголовок, основной текст и CTA.',
        bullets: ['Идеи и форматы постов', 'Черновики текстов', 'Структура для каруселей и коротких публикаций'],
      },
      {
        id: 'who-for',
        title: 'Кому подходит',
        body: 'Подходит бизнесам, экспертам, SMM-специалистам и командам, которым нужно выпускать регулярный контент без хаотичного придумывания тем.',
        bullets: ['Личные бренды', 'Малый бизнес и команды', 'Контент-менеджеры и агентства'],
      },
      {
        id: 'use-cases',
        title: 'Сценарии использования',
        body: 'Используйте GoToFlow для контент-плана, постов из длинных материалов, анонсов, экспертных объяснений, подборок и серий вокруг одной темы.',
        bullets: ['Пост из тезисов', 'Серия публикаций из статьи', 'Анонс продукта, события или материала'],
      },
      {
        id: 'workflow',
        title: 'Как подготовить пост',
        body: 'Опишите тему, площадку, аудиторию и цель публикации. Затем доработайте черновик: проверьте факты, добавьте личные детали и адаптируйте длину.',
        bullets: ['Задайте цель поста', 'Выберите формат', 'Отредактируйте черновик перед публикацией'],
      },
    ],
    examples: [
      { title: 'Экспертный пост', body: 'Короткое объяснение проблемы с выводом и практическим советом.' },
      { title: 'Карусель', body: 'Структура из нескольких слайдов для более глубокого раскрытия темы.' },
      { title: 'Анонс', body: 'Пост для запуска продукта, вебинара, статьи или нового предложения.' },
    ],
    faq: [
      {
        question: 'GoToFlow публикует посты автоматически?',
        answer: 'Эта страница описывает подготовку и генерацию черновиков. Публикацию и финальное оформление стоит контролировать отдельно.',
      },
      {
        question: 'Можно ли делать посты для разных соцсетей?',
        answer: 'Да, GoToFlow помогает с идеей и текстовой структурой, а длину и формат нужно адаптировать под конкретную площадку.',
      },
      {
        question: 'Почему страница закрыта от индексации?',
        answer: 'Это P0-страница для визуальной проверки. До отдельного одобрения она остается noindex.',
      },
    ],
    relatedSeoPages: ['ru-tool-instagram-post-generator', 'ru-tool-vk-post-generator', 'ru-tool-telegram-post-generator'],
    relatedBlogSlugs: ['ii-post-dlya-socsetej', 'neyroset-dlya-postov', 'kak-pisat-prodayushchie-posty-s-ii'],
    breadcrumbs: [
      ruHomeBreadcrumb,
      { label: 'Генератор постов для соцсетей', path: '/ru/generator-postov-dlya-socsetey' },
    ],
    schemaType: 'SoftwareApplication',
    published: false,
    noindex: true,
    lastUpdated: p0BatchUpdatedAt,
    ownershipDecision: p0OwnershipDecisions.generatorPostovDlyaSocsetey,
  },
  {
    id: 'ru-tool-instagram-carousel-generator',
    language: 'ru',
    pageType: 'tool',
    slug: 'instagram-carousel-generator',
    path: '/ru/instagram-carousel-generator',
    title: 'Генератор каруселей для Instagram | GoToFlow',
    description: 'Генератор каруселей для Instagram помогает подготовить структуру, текст слайдов, идеи форматов и CTA для публикаций.',
    h1: 'Генератор каруселей для Instagram',
    heroSubtitle: 'Создавайте черновики Instagram-каруселей для экспертного, образовательного и продуктового контента без долгого ручного планирования.',
    primaryKeyword: 'генератор каруселей для Instagram',
    secondaryKeywords: ['instagram carousel generator', 'карусель инстаграм генератор', 'создать карусель instagram'],
    searchIntent: 'tool',
    priority: 0.75,
    commercialValue: 0.85,
    productBridge: 'GoToFlow помогает собрать идею, логику слайдов, короткий текст и финальный CTA для Instagram-карусели, которую затем можно отредактировать и оформить под бренд.',
    cta: p0Cta,
    sections: [
      {
        id: 'what-it-does',
        title: 'Что помогает сделать инструмент',
        body: 'Инструмент помогает упаковать мысль в слайды: от цепляющего первого экрана до полезной середины и понятного финала.',
        bullets: ['Хук для первого слайда', 'Тезисы по слайдам', 'CTA для комментариев, сохранений или перехода'],
      },
      {
        id: 'who-for',
        title: 'Кому подойдет',
        body: 'Подходит экспертам, блогерам, SMM-специалистам и бизнесам, которые используют Instagram для обучения аудитории, прогрева и демонстрации экспертизы.',
        bullets: ['Экспертный блог', 'Маркетинг услуг', 'Контент для образовательных проектов'],
      },
      {
        id: 'use-cases',
        title: 'Примеры задач',
        body: 'Можно подготовить чек-лист, подборку ошибок, мини-гайд, разбор кейса, пост с мифами или короткую историю с выводом.',
        bullets: ['Карусель “5 ошибок”', 'Пошаговый гайд', 'Кейс с проблемой и решением'],
      },
      {
        id: 'workflow',
        title: 'Как использовать GoToFlow',
        body: 'Опишите тему и аудиторию, выберите задачу публикации, получите черновик слайдов и доработайте текст под свою подачу.',
        bullets: ['Тема и аудитория', 'Структура слайдов', 'Редактура и оформление перед публикацией'],
      },
    ],
    examples: [
      { title: 'How-to карусель', body: 'Пошаговая инструкция, где каждый слайд отвечает за один шаг.' },
      { title: 'Мифы и факты', body: 'Формат для исправления частых заблуждений аудитории.' },
      { title: 'Сохранить на потом', body: 'Чек-лист, памятка или список критериев для повторного использования.' },
    ],
    faq: [
      {
        question: 'Генератор делает дизайн карусели?',
        answer: 'Страница описывает подготовку структуры и текста. Визуальное оформление нужно проверять и адаптировать под ваш стиль и требования площадки.',
      },
      {
        question: 'Можно ли сделать карусель из статьи?',
        answer: 'Да, длинный материал можно использовать как основу для структуры и коротких слайдов, но факты и формулировки стоит проверить перед публикацией.',
      },
      {
        question: 'Будет ли страница в sitemap?',
        answer: 'Нет. До визуального одобрения страница остается noindex и не попадает в sitemap.',
      },
    ],
    relatedSeoPages: ['ru-commercial-generator-karuseley', 'ru-commercial-ii-generator-karuseley', 'ru-tool-instagram-post-generator'],
    relatedBlogSlugs: ['karusel-dlya-instagram', 'kak-sdelat-karusel-dlya-instagram-s-ii', 'razmer-karuseli-v-instagram'],
    breadcrumbs: [
      ruHomeBreadcrumb,
      { label: 'Tools', path: '/ru/tools' },
      { label: 'Генератор каруселей Instagram', path: '/ru/instagram-carousel-generator' },
    ],
    schemaType: 'WebApplication',
    published: false,
    noindex: true,
    lastUpdated: p0BatchUpdatedAt,
    ownershipDecision: p0OwnershipDecisions.instagramCarouselGenerator,
  },
  {
    id: 'ru-tool-instagram-post-generator',
    language: 'ru',
    pageType: 'tool',
    slug: 'instagram-post-generator',
    path: '/ru/instagram-post-generator',
    title: 'Генератор постов для Instagram | GoToFlow',
    description: 'GoToFlow помогает подготовить идеи, подписи, структуры каруселей и черновики постов для Instagram.',
    h1: 'Генератор постов для Instagram',
    heroSubtitle: 'Собирайте черновики Instagram-постов быстрее: от идеи и подписи до формата карусели, мини-гайда или экспертного поста.',
    primaryKeyword: 'генератор постов для Instagram',
    secondaryKeywords: ['генератор постов инстаграм', 'создать пост instagram', 'подпись для instagram'],
    searchIntent: 'tool',
    priority: 0.72,
    commercialValue: 0.82,
    productBridge: 'GoToFlow помогает с идеей, структурой и текстом поста, а автор затем адаптирует длину, тон и оформление под аккаунт.',
    cta: p0Cta,
    sections: [
      {
        id: 'what-it-does',
        title: 'Что можно подготовить',
        body: 'Инструмент помогает собрать основу публикации: короткую подпись, экспертный пост, карусельный сценарий или серию идей.',
        bullets: ['Идея поста', 'Черновик подписи', 'Структура карусели или образовательного поста'],
      },
      {
        id: 'who-for',
        title: 'Кому полезен',
        body: 'Подходит авторам, экспертам, брендам и SMM-специалистам, которым нужно быстро перейти от темы к понятному тексту для публикации.',
        bullets: ['Экспертные аккаунты', 'Малый бизнес', 'SMM-команды'],
      },
      {
        id: 'use-cases',
        title: 'Сценарии для Instagram',
        body: 'Используйте GoToFlow для подписей, каруселей, прогрева, объяснений продукта, постов с советами и контента из уже готовых материалов.',
        bullets: ['Пост с советами', 'Карусель из тезисов', 'Анонс услуги или материала'],
      },
      {
        id: 'workflow',
        title: 'Как создать черновик поста',
        body: 'Укажите тему, аудиторию и цель: вовлечение, сохранения, объяснение или переход к действию. Затем отредактируйте результат под голос бренда.',
        bullets: ['Опишите задачу', 'Получите структуру и текст', 'Проверьте факты и тон'],
      },
    ],
    examples: [
      { title: 'Подпись к посту', body: 'Короткий текст с вводной, смыслом и мягким CTA.' },
      { title: 'Экспертная заметка', body: 'Разбор одной мысли с примером и выводом.' },
      { title: 'Карусельный пост', body: 'Сценарий из нескольких слайдов для более глубокого раскрытия темы.' },
    ],
    faq: [
      {
        question: 'Можно ли генерировать только подписи?',
        answer: 'Да, можно использовать GoToFlow для черновиков подписей, идей и структуры постов.',
      },
      {
        question: 'Подходит ли инструмент для коммерческих аккаунтов?',
        answer: 'Да, если использовать результат как основу и добавлять реальные детали продукта, оффера или кейса.',
      },
      {
        question: 'Почему страница noindex?',
        answer: 'Это P0-страница для внутренней проверки перед возможной индексацией.',
      },
    ],
    relatedSeoPages: ['ru-commercial-generator-postov-dlya-socsetey', 'ru-tool-instagram-carousel-generator', 'ru-commercial-generator-karuseley'],
    relatedBlogSlugs: ['kak-sdelat-post-v-instagram-s-ii', 'ii-post-dlya-socsetej', 'tekst-i-foto-dlya-posta-instagram'],
    breadcrumbs: [
      ruHomeBreadcrumb,
      { label: 'Tools', path: '/ru/tools' },
      { label: 'Генератор постов Instagram', path: '/ru/instagram-post-generator' },
    ],
    schemaType: 'WebApplication',
    published: false,
    noindex: true,
    lastUpdated: p0BatchUpdatedAt,
    ownershipDecision: p0OwnershipDecisions.instagramPostGenerator,
  },
  {
    id: 'ru-tool-vk-post-generator',
    language: 'ru',
    pageType: 'tool',
    slug: 'vk-post-generator',
    path: '/ru/vk-post-generator',
    title: 'Генератор постов для ВК | GoToFlow',
    description: 'Генератор постов для ВК помогает подготовить идеи, структуру, текст и визуальные блоки для публикаций в группах и сообществах ВКонтакте.',
    h1: 'Генератор постов для ВК',
    heroSubtitle: 'Собирайте черновики постов для ВКонтакте: идеи для группы, структуру публикации, текстовые блоки, карточки и CTA для обсуждения в сообществе.',
    primaryKeyword: 'генератор постов для ВК',
    secondaryKeywords: ['генератор постов вконтакте', 'пост для группы вк', 'идеи постов для ВК', 'структура поста ВК', 'контент для сообщества ВК'],
    searchIntent: 'tool',
    priority: 0.68,
    commercialValue: 0.78,
    productBridge: 'GoToFlow помогает подготовить основу публикации именно для ВК: выбрать угол темы, разложить пост на смысловые блоки, собрать текст для группы или сообщества и отдельно продумать визуальные карточки, если формат это требует.',
    cta: p0Cta,
    sections: [
      {
        id: 'what-it-does',
        title: 'Что помогает подготовить для ВК',
        body: 'Страница сфокусирована на публикациях ВКонтакте, а не на универсальных постах для всех соцсетей. GoToFlow можно использовать, чтобы собрать черновик текста, план карточек, идеи рубрик и структуру поста под формат группы или сообщества.',
        bullets: ['Посты для группы ВК', 'Публикации для сообщества', 'Идеи рубрик и контент-плана', 'Текстовые блоки для карточек ВК'],
      },
      {
        id: 'who-for',
        title: 'Кому подходит',
        body: 'Подходит тем, кто ведет ВК как отдельный канал: владельцам групп, администраторам сообществ, локальному бизнесу, экспертам, образовательным проектам и SMM-специалистам.',
        bullets: ['Группы ВК с регулярными рубриками', 'Коммерческие сообщества', 'Экспертные страницы', 'Образовательные и локальные проекты'],
      },
      {
        id: 'use-cases',
        title: 'Сценарии для ВК',
        body: 'Используйте GoToFlow, когда нужно подготовить пост-знакомство, полезную подборку, анонс, ответ на частый вопрос, текст к визуалу или серию публикаций вокруг одной темы сообщества.',
        bullets: ['Пост для вовлечения в комментариях', 'Анонс события или продукта', 'Полезная подборка для подписчиков', 'Карточки по одной теме'],
      },
      {
        id: 'workflow',
        title: 'Как собрать ВК-пост',
        body: 'Опишите тему, нишу сообщества, рубрику и цель публикации. Затем используйте черновик как основу: уточните факты, добавьте ссылки, проверьте тон и адаптируйте CTA под реакцию, которую ждете от подписчиков ВК.',
        bullets: ['Тема, рубрика и аудитория группы', 'Хук, основная мысль и вывод', 'Короткие блоки для текста или карточек', 'Редактура под голос сообщества'],
      },
      {
        id: 'vk-format-guidance',
        title: 'Форматы результатов',
        body: 'Результат удобно использовать как заготовку для разных ВК-форматов: короткого поста, экспертной заметки, карточек, серии публикаций или поста с вопросом для обсуждения.',
        bullets: ['Короткий текст для ленты', 'Длинный экспертный пост', 'План карточек с тезисами', 'Финальный вопрос или CTA'],
      },
    ],
    examples: [
      { title: 'Пост для группы ВК', body: 'Хук, контекст, 3-5 полезных тезисов и вопрос, который помогает начать обсуждение в комментариях.' },
      { title: 'Карточки для сообщества', body: 'Короткие смысловые блоки: проблема, причина, решение, пример и мягкий CTA.' },
      { title: 'Анонс события или запуска', body: 'Что происходит, кому полезно, почему стоит обратить внимание и какой следующий шаг сделать.' },
      { title: 'Идеи рубрик для ВК', body: 'Список тем для регулярных публикаций: разборы, ответы на вопросы, кейсы, подборки и посты-знакомства.' },
    ],
    faq: [
      {
        question: 'Можно ли использовать страницу именно для групп ВК?',
        answer: 'Да. Контент страницы сфокусирован на группах и сообществах ВКонтакте: можно подготовить идею, структуру, черновик текста и блоки для карточек.',
      },
      {
        question: 'GoToFlow автоматически публикует посты во ВКонтакте?',
        answer: 'Нет. Страница описывает подготовку идей, структуры и черновиков. Финальную редактуру, оформление и публикацию нужно проверять отдельно.',
      },
      {
        question: 'Чем это отличается от общего генератора контента?',
        answer: 'Эта страница отвечает за ВК-интент: группы, сообщества, рубрики, карточки и посты для вовлечения подписчиков ВКонтакте. Общий генератор контента шире и не должен заменять эту платформенную задачу.',
      },
      {
        question: 'Страница индексируется?',
        answer: 'Нет. Эта P0-страница пока закрыта noindex и используется для внутреннего ревью качества, маршрута и интента.',
      },
    ],
    relatedSeoPages: ['ru-tool-telegram-post-generator'],
    relatedBlogSlugs: ['kak-napisat-post-v-vk-s-pomoshyu-ii', 'generator-karuseley-dlya-vk', 'temy-postov-dlya-gruppy-vkontakte'],
    breadcrumbs: [
      ruHomeBreadcrumb,
      { label: 'Tools', path: '/ru/tools' },
      { label: 'Генератор постов ВК', path: '/ru/vk-post-generator' },
    ],
    schemaType: 'WebApplication',
    published: true,
    noindex: true,
    lastUpdated: p0BatchUpdatedAt,
    ownershipDecision: p0OwnershipDecisions.vkPostGenerator,
  },
  {
    id: 'ru-tool-telegram-post-generator',
    language: 'ru',
    pageType: 'tool',
    slug: 'telegram-post-generator',
    path: '/ru/telegram-post-generator',
    title: 'Генератор постов для Telegram | GoToFlow',
    description: 'Генератор постов для Telegram помогает подготовить идеи, структуру, короткие и длинные черновики публикаций для личных и бизнес-каналов.',
    h1: 'Генератор постов для Telegram',
    heroSubtitle: 'Готовьте посты для Telegram-канала: короткие заметки, длинные экспертные публикации, анонсы, прогревы, серии сообщений и CTA под формат канала.',
    primaryKeyword: 'генератор постов для Telegram',
    secondaryKeywords: ['пост для телеграм канала', 'генератор постов телеграм', 'контент для telegram', 'посты для бизнес канала telegram', 'структура поста telegram'],
    searchIntent: 'tool',
    priority: 0.68,
    commercialValue: 0.78,
    productBridge: 'GoToFlow помогает подготовить основу Telegram-публикации: выбрать одну главную мысль, собрать структуру поста, сделать короткую или длинную версию и сохранить за автором финальную редактуру, факты и голос канала.',
    cta: p0Cta,
    sections: [
      {
        id: 'what-it-does',
        title: 'Что можно подготовить для Telegram',
        body: 'Страница отвечает за Telegram-интент: канал, формат публикации, темп чтения и структуру сообщения. GoToFlow можно использовать для черновиков коротких заметок, длинных экспертных постов, анонсов, подборок и серий публикаций.',
        bullets: ['Посты для Telegram-канала', 'Короткие и длинные форматы', 'Контент для бизнес-канала', 'Серии постов из одной темы'],
      },
      {
        id: 'who-for',
        title: 'Кому полезен',
        body: 'Подходит владельцам Telegram-каналов, экспертам, редакторам, образовательным проектам, бизнес-командам и SMM-специалистам, которые ведут Telegram как отдельный канал коммуникации.',
        bullets: ['Авторские Telegram-каналы', 'Бизнес-каналы и продуктовые обновления', 'Образовательные проекты', 'Редакторы и контент-команды'],
      },
      {
        id: 'use-cases',
        title: 'Сценарии для Telegram',
        body: 'Используйте GoToFlow для плана рубрик, постов по тезисам, коротких объяснений, дайджестов, прогрева перед запуском, экспертных разборов и публикаций, которые ведут читателя к следующему действию.',
        bullets: ['Пост с одной сильной мыслью', 'Дайджест или подборка', 'Серия для прогрева', 'Пост для бизнес-канала'],
      },
      {
        id: 'workflow',
        title: 'Как создать черновик',
        body: 'Опишите канал, аудиторию, цель поста и желаемую длину. После генерации сократите лишнее, добавьте реальные детали, проверьте факты и убедитесь, что текст звучит естественно для вашего Telegram-канала.',
        bullets: ['Канал, аудитория и цель', 'Короткий или длинный формат', 'Главная мысль и структура', 'Редактура под голос автора'],
      },
      {
        id: 'telegram-format-guidance',
        title: 'Форматы результатов',
        body: 'Черновик можно использовать как короткий пост, длинную экспертную публикацию, структуру прогрева, анонс, дайджест или серию сообщений. Это помогает не смешивать Telegram-задачу с общим генератором постов для всех соцсетей.',
        bullets: ['Короткий пост на одну мысль', 'Длинный экспертный разбор', 'Анонс или прогрев', 'Серия связанных публикаций'],
      },
    ],
    examples: [
      { title: 'Короткий пост для канала', body: 'Одна мысль, короткий контекст, вывод и вопрос или CTA в конце.' },
      { title: 'Длинный экспертный пост', body: 'Проблема, разбор, пример, практический вывод и аккуратный следующий шаг.' },
      { title: 'Пост-анонс', body: 'Контекст, польза для читателя, детали события или запуска и понятное действие.' },
      { title: 'Серия публикаций', body: 'Несколько связанных постов вокруг одной темы: вводный, обучающий, кейсовый и финальный.' },
    ],
    faq: [
      {
        question: 'Можно ли делать длинные Telegram-посты?',
        answer: 'Да, но лучше задавать цель и структуру заранее, а затем редактировать черновик под привычный стиль канала.',
      },
      {
        question: 'Подходит ли для бизнес-канала в Telegram?',
        answer: 'Да, можно использовать GoToFlow для черновиков продуктовых обновлений, экспертных разборов, анонсов, прогревов и публикаций с мягким CTA.',
      },
      {
        question: 'Чем это отличается от общего генератора постов?',
        answer: 'Эта страница сфокусирована на Telegram: каналах, коротких и длинных форматах, прогревах, дайджестах и стиле сообщений. Общий генератор постов должен оставаться более широким маршрутом.',
      },
      {
        question: 'Почему страница не в sitemap?',
        answer: 'Она помечена noindex для внутреннего ревью, поэтому не должна попадать в sitemap.',
      },
    ],
    relatedSeoPages: ['ru-tool-vk-post-generator'],
    relatedBlogSlugs: ['kak-vesti-telegram-kanal-biznesu', 'struktura-prodayuschego-posta-v-telegram', 'ii-post-dlya-socsetej'],
    breadcrumbs: [
      ruHomeBreadcrumb,
      { label: 'Tools', path: '/ru/tools' },
      { label: 'Генератор постов Telegram', path: '/ru/telegram-post-generator' },
    ],
    schemaType: 'WebApplication',
    published: true,
    noindex: true,
    lastUpdated: p0BatchUpdatedAt,
    ownershipDecision: p0OwnershipDecisions.telegramPostGenerator,
  },
  {
    id: 'ru-tool-linkedin-carousel-generator',
    language: 'ru',
    pageType: 'tool',
    slug: 'linkedin-carousel-generator',
    path: '/ru/linkedin-carousel-generator',
    title: 'Генератор каруселей для LinkedIn | GoToFlow',
    description: 'Генератор каруселей для LinkedIn помогает подготовить структуру, текст слайдов и CTA для экспертных B2B-публикаций.',
    h1: 'Генератор каруселей для LinkedIn',
    heroSubtitle: 'Упаковывайте экспертные идеи, кейсы и материалы в LinkedIn-карусели: от хука и логики слайдов до финального призыва к действию.',
    primaryKeyword: 'генератор каруселей для LinkedIn',
    secondaryKeywords: ['linkedin carousel generator', 'карусель linkedin с ИИ', 'создать linkedin carousel'],
    searchIntent: 'tool',
    priority: 0.74,
    commercialValue: 0.86,
    productBridge: 'GoToFlow помогает подготовить структуру и текст для LinkedIn-карусели, а автор затем адаптирует содержание под профессиональный тон и реальные детали опыта.',
    cta: p0Cta,
    sections: [
      {
        id: 'what-it-does',
        title: 'Что помогает создать инструмент',
        body: 'Инструмент помогает превратить экспертную мысль, статью, кейс или тезисы в последовательную карусель для профессиональной аудитории.',
        bullets: ['Хук для первого слайда', 'Логика аргументации', 'CTA для обсуждения или перехода'],
      },
      {
        id: 'who-for',
        title: 'Для кого подходит',
        body: 'Подходит основателям, B2B-маркетологам, консультантам, экспертам и авторам, которые используют LinkedIn для демонстрации экспертизы.',
        bullets: ['B2B-основатели', 'Консультанты и эксперты', 'Маркетологи и content teams'],
      },
      {
        id: 'use-cases',
        title: 'Практические сценарии',
        body: 'Используйте GoToFlow для кейсов, фреймворков, разборов ошибок, чек-листов, объяснения процессов и переработки длинных материалов.',
        bullets: ['Кейс в формате слайдов', 'Фреймворк или методика', 'Карусель из статьи или PDF'],
      },
      {
        id: 'workflow',
        title: 'Как подготовить LinkedIn-карусель',
        body: 'Опишите исходный материал, аудиторию и цель. Получите структуру, затем проверьте формулировки, уберите лишний маркетинг и добавьте конкретику.',
        bullets: ['Исходная идея', 'Структура слайдов', 'Редактура под профессиональный тон'],
      },
    ],
    examples: [
      { title: 'B2B-кейс', body: 'Проблема, контекст, подход, результат без выдуманных цифр и честный вывод.' },
      { title: 'Фреймворк', body: 'Модель или методика, разложенная на понятные шаги.' },
      { title: 'Карусель из статьи', body: 'Ключевые выводы длинного материала в формате слайдов.' },
    ],
    faq: [
      {
        question: 'Можно ли использовать для B2B-кейсов?',
        answer: 'Да, но важно добавлять только реальные данные и не выдумывать результаты, клиентов или гарантии.',
      },
      {
        question: 'GoToFlow публикует PDF в LinkedIn?',
        answer: 'Эта страница описывает подготовку структуры и текста. Экспорт, оформление и публикацию нужно проверять в вашем рабочем процессе.',
      },
      {
        question: 'Будет ли страница индексироваться?',
        answer: 'Нет. До визуального ревью страница остается noindex.',
      },
    ],
    relatedSeoPages: ['ru-commercial-generator-karuseley', 'ru-commercial-ii-generator-karuseley', 'ru-tool-instagram-carousel-generator'],
    relatedBlogSlugs: ['kak-sdelat-karusel-linkedin-s-ai', 'primery-karuseley-linkedin', 'idei-karuselej-linkedin'],
    breadcrumbs: [
      ruHomeBreadcrumb,
      { label: 'Tools', path: '/ru/tools' },
      { label: 'Генератор каруселей LinkedIn', path: '/ru/linkedin-carousel-generator' },
    ],
    schemaType: 'WebApplication',
    published: false,
    noindex: true,
    lastUpdated: p0BatchUpdatedAt,
    ownershipDecision: p0OwnershipDecisions.linkedinCarouselGenerator,
  },
  {
    id: 'ru-platform-instagram-carousel',
    language: 'ru',
    pageType: 'platform',
    slug: 'instagram-carousel',
    path: '/ru/platforms/instagram-carousel',
    title: 'Instagram Carousel | GoToFlow',
    description: 'Черновая SEO-страница платформы Instagram Carousel для проверки инфраструктуры не-блоговых страниц.',
    h1: 'Instagram Carousel',
    heroSubtitle: 'Тестовая platform-страница для будущих SEO-хабов по платформам и форматам.',
    primaryKeyword: 'instagram carousel',
    secondaryKeywords: ['карусель instagram', 'instagram carousel ai'],
    searchIntent: 'commercial investigation',
    priority: 0.6,
    commercialValue: 0.7,
    productBridge: 'GoToFlow помогает быстро подготовить структуру и текст для карусели Instagram.',
    cta: {
      label: 'Попробовать GoToFlow',
      href: 'https://app.gotoflow.io',
      note: 'Тестовый CTA для platform-страницы.',
    },
    sections: [
      {
        id: 'format',
        title: 'Будущий блок про формат',
        body: 'Здесь появится продуктово ориентированный контент про карусели Instagram после подготовки финального SEO-текста.',
      },
    ],
    faq: [],
    relatedSeoPages: ['ru-commercial-generator-karuseley', 'ru-template-instagram-carousel'],
    relatedBlogSlugs: ['chto-takoe-karusel-v-instagram', 'instagram-carousel-post'],
    breadcrumbs: [
      { label: 'Главная', path: '/ru' },
      { label: 'Platforms', path: '/ru/platforms' },
      { label: 'Instagram Carousel', path: '/ru/platforms/instagram-carousel' },
    ],
    schemaType: 'WebPage',
    published: true,
    noindex: true,
    lastUpdated: '2026-07-08',
    ownershipDecision: p0OwnershipDecisions.platformSeed,
  },
  {
    id: 'ru-template-instagram-carousel',
    language: 'ru',
    pageType: 'template',
    slug: 'instagram-carousel',
    path: '/ru/templates/instagram-carousel',
    state: 'indexable_approved',
    templateVariant: 'template_page',
    title: 'Шаблоны каруселей Instagram: структуры и примеры | GoToFlow',
    description: 'Выберите структуру карусели Instagram: чек-лист, гайд, кейс, AIDA/PAS и другие форматы. Создайте и отредактируйте карусель в GoToFlow.',
    h1: 'Шаблоны каруселей Instagram',
    heroSubtitle: 'Выберите структуру будущей карусели: от экспертного чек-листа до продуктового анонса. GoToFlow создаёт готовую карусель с обложкой, последовательностью слайдов, текстом, визуальной подачей и финальным CTA.',
    primaryKeyword: 'шаблоны каруселей instagram',
    secondaryKeywords: [
      'instagram carousel templates',
      'шаблон карусели',
      'структура карусели instagram',
      'шаблоны постов каруселей',
    ],
    searchIntent: 'template discovery',
    primaryIntent: 'Выбор структуры и шаблона Instagram-карусели перед созданием готовой карусели в GoToFlow.',
    pageFamily: 'carousel_product_page',
    priority: 0.6,
    commercialValue: 0.65,
    productBridge: 'GoToFlow создаёт карусель с нуля: от идеи и структуры до готовых слайдов, текста, визуальной подачи и CTA. Перед публикацией результат можно проверить и отредактировать.',
    cta: {
      label: 'Собрать карусель по шаблону',
      href: 'https://app.gotoflow.io',
      action: 'open_app',
      note: 'Выберите структуру, добавьте тему и доработайте результат перед публикацией.',
    },
    heroEyebrow: 'Шаблоны и структуры',
    heroSecondaryLinkLabel: 'Посмотреть форматы',
    conversion: {
      destinationType: 'app',
      destinationUrl: 'https://app.gotoflow.io',
      targetAction: 'create_carousel',
      pageEntity: 'instagram_carousel_template',
      appDeepLinkVerified: false,
      appDeepLinkNotes: 'No verified page-specific app deep link is documented in this repo; conversion CTAs use the app origin.',
    },
    categoryCta: {
      label: 'Создать в GoToFlow',
      href: 'https://app.gotoflow.io',
      action: 'open_app',
    },
    seoBrief: {
      pageEntity: 'instagram_carousel_template',
      primaryQuery: 'шаблоны каруселей instagram',
      primaryIntent: 'Выбрать структуру Instagram-карусели перед созданием готового результата.',
      userJob: 'Понять, какой формат карусели подходит под задачу, и перейти к созданию в GoToFlow.',
      uniqueAngle: 'Template discovery page focused on structure choice, not the protected Instagram carousel generator route.',
      audience: 'Эксперты, SMM-специалисты, создатели образовательного и продуктового контента.',
      contentType: 'carousel',
      platform: 'Instagram',
      language: 'ru',
      country: 'RU',
      conversionAction: 'create_carousel',
      productRoute: 'https://app.gotoflow.io',
      cannibalizationBoundary: 'This page owns commercial template-selection intent for choosing an Instagram carousel structure and moving into GoToFlow. The supporting article /ru/blog/shablony-karuseley-v-instagram owns detailed informational explanation, educational guidance, broader examples, and how-to context. Generator intent remains owned by /ru/generator-karuselej-instagram and related product/tool routes.',
    },
    faqPolicy: {
      minItems: 12,
      maxItems: 16,
      requireUniqueQuestions: true,
      requireVisibleSchemaParity: true,
    },
    sectionPolicy: {
      hero: { enabled: true, reason: 'Required to state template discovery intent and the product CTA.' },
      quickAnswer: { enabled: true, reason: 'Required to define what Instagram carousel templates are.' },
      pageRelevantFormats: { enabled: true, reason: 'Core intent block for structure and format selection using typed page data.' },
      productCapabilities: { enabled: true, reason: 'Shows the canonical verified product capabilities shared by product SEO pages.' },
      productWorkflow: { enabled: true, reason: 'Shows truthful GoToFlow product workflow after structure choice.' },
      readyCarouselShowcase: { enabled: true, reason: 'Shows realistic finished carousel outcomes directly after workflow.' },
      pageSpecificVisualProof: { enabled: true, reason: 'Shows the page-specific visual proof separately from workflow and showcase.' },
      useCases: { enabled: true, reason: 'Keeps publishing scenarios separate from product capabilities.' },
      faq: { enabled: true, reason: 'Answers template, workflow, publishing, and product-fit questions.' },
      related: { enabled: true, reason: 'Connects to existing product route and real supporting articles.' },
      finalCta: { enabled: true, reason: 'Provides final app conversion action for the approved indexable template page.' },
      examples: { enabled: false, reason: 'The approved reference layout uses readyCarouselShowcase instead of separate examples.' },
    },
    finalCta: {
      eyebrow: 'ГОТОВЫЙ РЕЗУЛЬТАТ',
      title: {
        before: 'Выберите структуру и создайте ',
        accent: 'готовую карусель',
        after: '',
      },
      description: 'Добавьте тему или исходный материал, проверьте структуру и тексты, настройте визуал и доработайте результат в редакторе GoToFlow.',
      primaryAction: {
        label: 'Создать карусель в GoToFlow',
        href: 'https://app.gotoflow.io',
        action: 'open_app',
      },
    },
    sections: [],
    quickAnswer: {
      title: 'Что такое шаблоны каруселей Instagram?',
      body: 'Шаблоны каруселей Instagram — это готовые структуры слайдов для разных задач: экспертного чек-листа, разбора ошибки, кейса, объяснения проблемы или презентации продукта. В GoToFlow можно выбрать подходящую структуру и создать готовую карусель с обложкой, последовательностью слайдов, текстом, визуальной подачей и финальным CTA.',
      contextualLink: { label: 'Размеры карусели Instagram', href: '/ru/blog/razmer-karuseli-v-instagram' },
    },
    heroCarouselImages: getSeoCarouselAssets('hero', 'instagramTemplates'),
    readyCarouselShowcase: getSeoCarouselAssets('readyShowcase', 'instagramCarousel'),
    readyCarouselShowcaseCta: {
      label: 'Выбрать структуру и создать карусель',
      href: 'https://app.gotoflow.io',
      action: 'open_app',
      note: 'Перед публикацией результат можно проверить и отредактировать.',
    },
    productCapabilities: buildCanonicalProductCapabilities({
      heading: 'Что можно настроить в GoToFlow',
      introCopy: 'GoToFlow поддерживает разные исходники, AI-структуру и текст, шаблоны, стили, промпты, фон, персонажа, CTA, редактирование, перегенерацию, бесшовные и анимированные карусели, форматы 4:5, 1:1 и 9:16 и до 10 слайдов для Instagram-карусели.',
      highlightedCapabilities: ['templates', 'aiStructureText', 'textEditing', 'formats4511916'],
    }),
    useCasesIntro: {
      eyebrow: 'Сценарии',
      heading: 'Для каких задач подходят шаблоны каруселей',
    },
    useCases: [
      {
        title: 'Экспертный гайд',
        body: 'Разложите сложную тему на последовательность слайдов с понятным входом, аргументами, примерами и финальным выводом.',
      },
      {
        title: 'Пошаговая инструкция',
        body: 'Соберите процесс в формате шагов: от обложки и списка действий до короткого резюме и CTA.',
      },
      {
        title: 'Разбор ошибки',
        body: 'Покажите распространенную ошибку, последствия и корректный подход, который читатель может применить.',
      },
      {
        title: 'Кейс или до-после',
        body: 'Оформите исходную ситуацию, процесс решения, результат и выводы без неподтвержденных гарантий.',
      },
      {
        title: 'Продуктовая презентация',
        body: 'Покажите задачу аудитории, ценность продукта, ключевые функции и следующий шаг в одном понятном сценарии.',
      },
      {
        title: 'Чек-лист или подборка',
        body: 'Соберите критерии, идеи, инструменты или пункты проверки в формат, который удобно сохранить.',
      },
    ],
    templateCategories: [
      {
        title: 'Экспертный чек-лист',
        body: 'Подходит для полезной карусели с последовательностью шагов: обложка с обещанием, 5-7 практических пунктов, короткое резюме и CTA к консультации, подписке или следующему материалу.',
      },
      {
        title: 'Проблема и решение',
        body: 'Удобно использовать, когда нужно показать боль аудитории, объяснить причину, предложить подход и завершить карусель понятным следующим шагом без обещаний мгновенного результата.',
      },
      {
        title: 'Разбор ошибки',
        body: 'Формат для образовательного контента: назвать распространенную ошибку, показать последствия, дать корректный вариант и добавить пример, который читатель может применить в своем проекте.',
      },
      {
        title: 'Кейс или до-после',
        body: 'Подходит для продуктового или экспертного сторителлинга: исходная ситуация, что изменили, как выглядела логика решения, какие выводы можно забрать без неподтвержденных гарантий.',
      },
      {
        title: 'Анонс продукта или услуги',
        body: 'Можно использовать для мягкой продажи: кому подходит предложение, какую задачу помогает решить, что входит в следующий шаг и почему стоит перейти к действию сейчас.',
      },
    ],
    templateChoiceGuide: {
      eyebrow: 'ВЫБОР ШАБЛОНА',
      title: {
        before: 'Какой шаблон карусели выбрать ',
        accent: 'под вашу задачу',
        after: '',
      },
      description: 'Выберите структуру по цели публикации: объяснить тему, дать инструкцию, продать услугу, показать результат или разобрать частую ошибку.',
      items: [
        {
          id: 'explain',
          task: 'Объяснить сложную тему',
          template: 'Экспертный разбор',
          structure: 'проблема → объяснение → пример → вывод',
        },
        {
          id: 'guide',
          task: 'Дать пошаговую пользу',
          template: 'Гайд или чек-лист',
          structure: 'обложка → шаги или пункты → итог',
        },
        {
          id: 'sell',
          task: 'Продать услугу',
          template: 'AIDA/PAS или проблема–решение',
          structure: 'боль → решение → преимущества → CTA',
        },
        {
          id: 'result',
          task: 'Показать результат',
          template: 'Кейс или до/после',
          structure: 'исходная ситуация → процесс → результат → вывод',
        },
        {
          id: 'compare',
          task: 'Сравнить варианты',
          template: 'Сравнение A vs B',
          structure: 'критерии → различия → рекомендация',
        },
        {
          id: 'mistakes',
          task: 'Разобрать ошибки',
          template: 'Ошибки новичка или мифы vs реальность',
          structure: 'ошибка → последствия → правильный подход',
        },
      ],
    },
    productWorkflow: {
      preset: 'carousel_creation',
      eyebrow: 'ШАБЛОНЫ КАРУСЕЛЕЙ',
      title: {
        before: 'Как создать карусель ',
        accent: 'по шаблону',
        after: ' в GoToFlow',
      },
      description: 'Сначала выберите тип карусели и добавьте тему или исходный материал. GoToFlow подготовит структуру и тексты слайдов, после чего вы сможете проверить их, настроить визуал и доработать готовую карусель в редакторе.',
      contextLabel: 'Instagram templates',
      carouselTypes: [
        { id: 'seamless', availability: 'available' },
        { id: 'animated', availability: 'available' },
      ],
      stepOverrides: {
        source: {
          title: 'Выберите тип карусели',
          description: 'AI, шаблонная, анимированная или бесшовная — под вашу задачу.',
        },
        structure: {
          title: 'Добавьте материал и структуру',
          description: 'Тема, ссылка, видео, PDF или голосовое. Структуру выберите сами или доверьте GoToFlow.',
        },
        textReview: {
          title: 'Проверьте тексты',
          description: 'Отредактируйте заголовки и слайды либо перегенерируйте отдельный текст.',
        },
        visualRoute: {
          title: 'Настройте визуал',
          description: 'Выберите AI-стиль, свой промпт или шаблон; задайте формат, фон, персонажа и CTA.',
        },
        editorResult: {
          title: 'Доработайте результат',
          description: 'Переместите элементы, замените визуал и подготовьте карусель к публикации.',
        },
      },
      mockups: [
        {
          id: 'source-structure',
          title: 'Тип, исходник и структура',
          caption: 'Выберите тип, добавьте материал и задайте структуру слайдов.',
          fallbackVisualType: 'source_structure',
          alt: 'Выбор типа карусели, исходного материала и структуры в GoToFlow',
          decorative: false,
        },
        {
          id: 'text-review',
          title: 'Проверка текстов',
          caption: 'Проверьте и отредактируйте тексты до создания визуалов.',
          fallbackVisualType: 'text_review',
          alt: 'Редактирование заголовков и текста слайдов перед визуальным оформлением',
          decorative: false,
        },
        {
          id: 'visual-route',
          title: 'Настройки визуала',
          caption: 'Выберите стиль и доступные настройки нужного типа карусели.',
          fallbackVisualType: 'ai_template',
          alt: 'Настройки визуала для AI, шаблонной, бесшовной и анимированной карусели',
          decorative: false,
        },
        {
          id: 'editor-result',
          title: 'Редактор и результат',
          caption: 'Доработайте слайды вручную и получите готовую карусель.',
          resultCarousel: {
            proofType: 'workflow-result',
            title: '5 причин делать карусели с ИИ',
            label: 'Карусель с ИИ',
            format: '4:5',
            slideCount: 5,
            width: 1122,
            height: 1402,
            mode: 'Ручная правка',
            images: aiCarouselResultSlides,
          },
          decorative: false,
          fallbackVisualType: 'editor_result',
        },
      ],
      featureChips: [
        'Любой исходный материал',
        'Готовые структуры',
        'Проверка и перегенерация текста',
        'AI, шаблоны, анимация и бесшовный формат',
        'Форматы 4:5, 1:1 и 9:16',
        'Фон, персонаж, CTA и ручное редактирование',
      ],
      cta: null,
    },
    pageSpecificVisualProof: {
      proofType: 'page-specific',
      eyebrow: 'Доказательство результата',
      title: 'Как структура превращается в готовую карусель',
      description: 'Отдельный proof-блок показывает последовательность готовых слайдов после выбора шаблона, исходника, текстов и визуального направления.',
      label: 'Карусель по шаблону',
      format: '4:5',
      slideCount: aiCarouselResultSlides.length,
      width: 1122,
      height: 1402,
      mode: 'Готовые слайды',
      images: aiCarouselResultSlides,
    },
    howToUse: [
      {
        title: 'Выберите тип карусели',
        body: 'Сначала определите задачу: обучить, объяснить ошибку, показать кейс, презентовать услугу или собрать лид-магнит. От этого зависит порядок слайдов и сила CTA.',
      },
      {
        title: 'Добавьте контекст в GoToFlow',
        body: 'Укажите тему, аудиторию, желаемый тон и формат результата. GoToFlow помогает подготовить готовую структуру и текстовые блоки для каждого слайда.',
      },
      {
        title: 'Проверьте логику по слайдам',
        body: 'Перед публикацией убедитесь, что каждый слайд ведет к следующему, тезисы не повторяются, обещания реалистичны, а финальный CTA соответствует цели карусели.',
      },
    ],
    faq: [
      {
        question: 'Что такое шаблон карусели Instagram?',
        answer: 'Это готовая структура слайдов, адаптированная под конкретную задачу: обучение, разбор ошибки, презентацию продукта или кейс. Шаблон определяет, как построить обложку, внутренние слайды и финальный CTA.',
      },
      {
        question: 'Как выбрать подходящий шаблон карусели?',
        answer: 'Определите цель карусели: обучить, вовлечь, продать или привлечь подписчиков. Для обучения подходят чек-листы и гайды, для вовлечения — разборы ошибок, для продажи — кейсы и анонсы продукта.',
      },
      {
        question: 'Какие форматы шаблонов доступны на этой странице?',
        answer: 'Экспертный чек-лист, проблема и решение, разбор ошибки, кейс «до/после» и анонс продукта или услуги. Каждый формат подходит под конкретные задачи и типы аудитории.',
      },
      {
        question: 'Сколько слайдов должна содержать карусель?',
        answer: 'Instagram технически позволяет добавить в карусель до 20 фото или видео. В GoToFlow карусель может содержать до 10 слайдов — для большинства экспертных и продающих публикаций этого достаточно.',
      },
      {
        question: 'Можно ли использовать свою тему и текст?',
        answer: 'Да. GoToFlow позволяет задать тему, аудиторию, тон и формат. Система создаёт готовую карусель с вашим контекстом, которую можно дополнить и отредактировать.',
      },
      {
        question: 'GoToFlow создаёт только текст или полную карусель?',
        answer: 'GoToFlow создаёт полную карусель: обложку, структуру слайдов, текст, визуальную подачу и финальный CTA. Результат можно сразу использовать или доработать.',
      },
      {
        question: 'Эти шаблоны заменяют работу автора?',
        answer: 'Нет. Шаблоны — это прочная структурная основа. GoToFlow собирает готовый результат, но перед публикацией автору полезно проверить визуальные акценты и добавить личные примеры.',
      },
      {
        question: 'Чем эта страница отличается от генератора каруселей?',
        answer: 'Здесь фокус на выборе структуры и сценария будущей карусели. Генератор помогает быстро создать саму карусель, когда тема и формат уже выбраны.',
      },
      {
        question: 'Можно ли адаптировать шаблон под свою нишу?',
        answer: 'Да. Каждый шаблон задаёт логику и последовательность слайдов, которые можно наполнить контентом из любой ниши: маркетинг, фитнес, образование, IT, финансы.',
      },
      {
        question: 'Какой размер карусели использовать в Instagram?',
        answer: 'Стандартный размер — 1080×1080 (квадрат) или 1080×1350 пикселей (портрет). Портретный формат занимает больше места в ленте и привлекает больше внимания.',
      },
      {
        question: 'Что проверить перед публикацией карусели?',
        answer: 'Убедитесь, что каждый слайд ведёт к следующему, тезисы не повторяются, обложка цепляет внимание, финальный CTA соответствует цели и обещания реалистичны.',
      },
      {
        question: 'Можно ли перегенерировать текст или отдельные слайды?',
        answer: 'Да. В GoToFlow можно проверить текст, изменить формулировки, перегенерировать отдельные части результата и доработать слайды перед публикацией.',
      },
    ],
    relatedSeoPages: [],
    relatedSeoPaths: [],
    relatedProductToolPaths: ['/ru/generator-karuselej-instagram'],
    contextualLinks: [
      {
        label: 'ИИ генератор каруселей',
        href: '/ru/ai-generator-karuselej',
      },
    ],
    relatedBlogSlugs: ['shablony-karuseley-v-instagram', 'kak-sdelat-karusel-dlya-instagram-s-ii', 'razmer-karuseli-v-instagram'],
    breadcrumbs: [
      { label: 'Главная', path: '/ru' },
      { label: 'Карусели Instagram', path: '/ru/templates/instagram-carousel' },
    ],
    schemaType: 'WebPage',
    published: true,
    noindex: false,
    state: 'indexable_approved',
    sitemapEligible: true,
    routeReviewApproved: true,
    approvedByHuman: true,
    indexationApproved: true,
    indexationApproval: {
      approved: true,
      approvedBy: 'Fast Magic',
      approvedAt: '2026-07-11',
      notes: 'Approved after final workflow-card correction, product truth correction, mobile regression, rendered HTML, sitemap, schema, and build gates.',
    },
    contentReviewedByHuman: true,
    uniquenessReviewedByHuman: true,
    internalLinksReviewedByHuman: true,
    ctaReviewedByHuman: true,
    productClaimsReviewedByHuman: true,
    review: {
      owner: 'GoToFlow',
      contentReviewedAt: '2026-07-11',
      productClaimsReviewedAt: '2026-07-11',
      assetsReviewedAt: '2026-07-11',
      seoReviewedAt: '2026-07-11',
      productVersion: 'seo-pages-2026-07-11',
    },
    designReference: '/ru',
    urlOrigin: 'seo_registry_candidate',
    urlOriginEvidence: [
      'scratch/seo-demand-imports/2026-07-06/gotoflow_seo_action_map_FINAL_REVIEW_WITH_SITEMAP_2026-07-08.csv',
      'scratch/seo-demand-imports/2026-07-06/seo-route-only-manual-check-plan-2026-07-08.csv',
      'scratch/seo-demand-imports/2026-07-06/seo-url-origin-ledger-2026-07-08.csv',
    ],
    intentOwner: 'ru-template-instagram-carousel',
    routeOwner: 'ru-template-instagram-carousel',
    canonicalOwner: '/ru/templates/instagram-carousel',
    riskLevel: 'low',
    manualReviewReason: 'Safe new registry template page approved for indexation after final mobile, rendered HTML, product truth, and sitemap gates.',
    createdFromActionMapRowIds: ['seed-noindex-ru-templates-instagram-carousel'],
    notes: [
      'Selected as the first complete SEO Pages Engine noindex_review page because planning sources mark it safe_new_registry_page with low route risk.',
      'Template discovery intent is separate from protected Instagram carousel generator routes; related product route remains the existing owner for generator intent.',
      'Commercial template-selection intent is separated from the informational article /ru/blog/shablony-karuseley-v-instagram.',
    ],
    lastUpdated: '2026-07-11',
    ownershipDecision: p0OwnershipDecisions.templateSeed,
  },
];

const decisionToDefaultState = (decision) => {
  if (decision === 'safe_new_registry_page') return 'quarantined_review';
  return 'planning_only';
};

const normalizeLegacySeoPage = (page) => {
  const protectedOwner = getProtectedRouteOwner(page.path);
  const hasApprovedMigration = hasApprovedEngineRouteMigration(page);
  const approvedByHuman = page.approvedByHuman === true || page.ownershipDecision?.approvedByHuman === true;
  const indexationApproved = page.indexationApproved === true;
  const state = page.state || decisionToDefaultState(page.ownershipDecision?.decision);
  const noindex = state === 'indexable_approved' ? page.noindex === true : true;
  const relatedSeoPaths = page.relatedSeoPaths || (page.relatedSeoPages || [])
    .map((idOrPath) => (
      typeof idOrPath === 'string' && idOrPath.startsWith('/')
        ? idOrPath
        : rawSeoPages.find((candidate) => candidate.id === idOrPath)?.path
    ))
    .filter(Boolean);

  return {
    ...page,
    state,
    templateVariant: page.templateVariant || getDefaultTemplateVariantForPageType(page.pageType),
    primaryIntent: page.primaryIntent || page.searchIntent || page.primaryKeyword,
    urlOrigin: page.urlOrigin || (protectedOwner ? 'existing_sitemap_product_tool' : 'seo_registry_candidate'),
    urlOriginEvidence: page.urlOriginEvidence || [
      'src/content/seoPages/index.js',
      'scratch/seo-demand-imports/2026-07-06/seo-url-origin-ledger-2026-07-08.csv',
    ],
    intentOwner: page.intentOwner || page.ownershipDecision?.existingOwnerStatus || page.id,
    routeOwner: page.routeOwner || protectedOwner?.owner || page.id,
    canonicalOwner: page.canonicalOwner || protectedOwner?.owner || page.path,
    approvedByHuman,
    routeReviewApproved: page.routeReviewApproved === true,
    indexationApproved,
    noindex,
    sitemapEligible: state === 'indexable_approved' && approvedByHuman && indexationApproved && !noindex && !protectedOwner,
    designReference: page.designReference || (page.language === 'ru' ? '/ru' : '/'),
    relatedSeoPaths,
    relatedProductToolPaths: page.relatedProductToolPaths || page.ownershipDecision?.intentOverlapPaths?.filter((item) => item.startsWith('/ru/') && !item.startsWith('/ru/blog/')) || [],
    riskLevel: page.riskLevel || (protectedOwner || page.ownershipDecision?.migrationRequired ? 'critical' : 'medium'),
    manualReviewReason: page.manualReviewReason || page.ownershipDecision?.reason || 'Requires SEO engine architecture approval before runtime/indexation changes.',
    createdFromActionMapRowIds: page.createdFromActionMapRowIds || [],
    notes: page.notes || [],
    published: state === 'noindex_review' || state === 'indexable_approved',
    hasApprovedMigration,
  };
};

export const seoPages = rawSeoPages.map(normalizeLegacySeoPage);

const requiredSeoPageFields = [
  'id',
  'language',
  'pageType',
  'slug',
  'path',
  'title',
  'description',
  'h1',
  'heroSubtitle',
  'primaryKeyword',
  'secondaryKeywords',
  'searchIntent',
  'priority',
  'commercialValue',
  'productBridge',
  'cta',
  'sections',
  'faq',
  'relatedSeoPages',
  'relatedBlogSlugs',
  'breadcrumbs',
  'schemaType',
  'published',
  'noindex',
  'lastUpdated',
  'ownershipDecision',
];

const routePrefixForType = (pageType) => SEO_PAGE_TYPE_ROUTES[pageType];

export const buildSeoPagePath = ({ language, pageType, slug }) => {
  const prefix = language === 'ru' ? '/ru' : '';
  const typePrefix = routePrefixForType(pageType);

  if (typePrefix === undefined) {
    throw new Error(`Unknown SEO page type: ${pageType}`);
  }

  return [prefix || '/', typePrefix, slug]
    .filter(Boolean)
    .join('/')
    .replace(/\/{2,}/g, '/');
};

export const getAllSeoPages = () => [...seoPages];

export const getSeoPageRouteCollision = (page) => getProtectedRouteOwner(page?.path)?.owner || EXISTING_RU_ROUTE_OWNERS[page?.path] || null;

export const hasApprovedSeoRouteMigration = (page) => Boolean(
  hasApprovedEngineRouteMigration(page)
);

export const isSeoPageRouteAllowed = (page) => {
  return isSeoPageRoutable(page);
};

export const getPublishedSeoPages = () => seoPages.filter(isSeoPageRouteAllowed);

export const isIndexableSeoPage = (page) => isSeoPageIndexable(page);

export const getIndexableSeoPages = () => seoPages.filter(isIndexableSeoPage);

export const getSeoPagesForSitemap = () => getSeoPagesEligibleForSitemap(seoPages);

export const getSeoPagesForPrerender = () => getSeoPagesEligibleForPrerender(seoPages);

export const getSeoPageRecordById = (id) => seoPages.find((page) => page.id === id) || null;

export const getSeoPageById = (id) => getPublishedSeoPages().find((page) => page.id === id) || null;

export const getSeoPageRecordByPath = (path) => seoPages.find((page) => page.path === path) || null;

export const getSeoPageByPath = (path) => getPublishedSeoPages().find((page) => page.path === path) || null;

export const getSeoPageByRoute = ({ language = 'ru', pageType, slug, path }) => (
  getPublishedSeoPages().find((page) => (
    page.language === language &&
    page.pageType === pageType &&
    page.slug === slug &&
    (!path || page.path === path)
  )) || null
);

export const getPublishedSeoPagesByType = (pageType) => (
  getPublishedSeoPages().filter((page) => page.pageType === pageType)
);

export const getIndexableSeoPagesByType = (pageType) => (
  getIndexableSeoPages().filter((page) => page.pageType === pageType)
);

export const validateSeoPages = (pages = seoPages) => {
  const ids = new Set();
  const paths = new Set();
  const errors = [...validateSeoPagesContract(pages)];

  pages.forEach((page) => {
    requiredSeoPageFields.forEach((field) => {
      if (!(field in page)) {
        errors.push(`${page.id || '(missing id)'} is missing ${field}`);
      }
    });

    if (!SEO_PAGE_TYPES.includes(page.pageType)) {
      errors.push(`${page.id} has invalid pageType: ${page.pageType}`);
    }

    if (!SEO_INTENT_OWNERSHIP_DECISIONS.includes(page.ownershipDecision?.decision)) {
      errors.push(`${page.id} has invalid ownershipDecision.decision: ${page.ownershipDecision?.decision}`);
    }

    const routeOwner = getSeoPageRouteCollision(page);
    const hasApprovedMigration = hasApprovedSeoRouteMigration(page);

    if (routeOwner && page.published === true && !hasApprovedMigration) {
      errors.push(`${page.id} route collision at ${page.path}: existing route owner wins (${routeOwner}). Add an approved explicit migration before publishing this registry page.`);
    }

    if (page.ownershipDecision?.decision !== 'safe_new_registry_page' && !hasApprovedMigration && page.published === true) {
      errors.push(`${page.id} cannot be published as a registry page with ownership decision ${page.ownershipDecision?.decision}. Existing/update/merge/manual-review decisions must stay non-routable until resolved.`);
    }

    if (page.ownershipDecision?.migrationRequired === true) {
      const migration = page.ownershipDecision.migration;

      if (!migration) {
        errors.push(`${page.id} requires explicit migration documentation`);
      } else {
        SEO_MIGRATION_REQUIRED_FIELDS.forEach((field) => {
          if (!(field in migration)) {
            errors.push(`${page.id} migration is missing ${field}`);
          }
        });
      }
    }

    const expectedPaths = [buildSeoPagePath(page)];

    if (page.language === 'ru' && page.pageType === 'tool') {
      expectedPaths.push(`/ru/${page.slug}`);
    }

    if (!expectedPaths.includes(page.path)) {
      errors.push(`${page.id} path should be one of ${expectedPaths.join(', ')}, got ${page.path}`);
    }

    if (ids.has(page.id)) {
      errors.push(`Duplicate SEO page id: ${page.id}`);
    }
    ids.add(page.id);

    if (paths.has(page.path)) {
      errors.push(`Duplicate SEO page path: ${page.path}`);
    }
    paths.add(page.path);
  });

  return errors;
};

const validationErrors = validateSeoPages();

if (validationErrors.length > 0) {
  throw new Error(`Invalid SEO page registry:\n${validationErrors.join('\n')}`);
}
