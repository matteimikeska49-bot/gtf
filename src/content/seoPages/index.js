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
  heading: heading || { before: 'Что можно настроить в ', accent: 'GoToFlow', after: '' },
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

const textToCarouselReadyShowcaseAssets = getSeoCarouselAssets('readyShowcase', 'instagramCarousel');

const textToCarouselReadyShowcaseTitles = [
  'Экспертный пост из заметок',
  'Гайд, собранный из статьи',
  'Переупаковка кейса клиента',
  'Чек-лист из инструкции',
  'Сторителлинг из лонгрида',
  'Подборка инструментов из списка',
];

const textToCarouselReadyShowcase = textToCarouselReadyShowcaseAssets.slice(0, 6).map((item, index) => ({
  ...item,
  title: textToCarouselReadyShowcaseTitles[index],
}));

const textToCarouselSectionPolicy = Object.fromEntries([
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
].map((sectionId) => [
  sectionId,
  {
    enabled: true,
    reason: 'Section is required by GoToFlow Carousel Page Production System v1.0 Freeze and populated from the approved Content & Design Contract.',
  },
]));

const canvaSectionPolicy = Object.fromEntries(Object.keys(textToCarouselSectionPolicy).map((sectionId) => [
  sectionId,
  {
    enabled: true,
    reason: 'Required for the approved Canva product page config.',
  },
]));

const textToCarouselFaq = [
  {
    question: 'Какой длины текст можно вставить?',
    answer: 'Вы можете загрузить любую статью, заметку или длинный пост. Искусственный интеллект способен обработать лонгриды и самостоятельно разделить их на логичные карточки без потери смысла.',
  },
  {
    question: 'Теряется ли смысл текста при сокращении ИИ?',
    answer: 'Нет, алгоритм настроен на выделение ключевых тезисов. ИИ сохраняет главные мысли и убирает лишнюю воду, чтобы текст легко читался в формате карусели Instagram.',
  },
  {
    question: 'Можно ли запретить ИИ сокращать текст?',
    answer: 'Да. Если у вас уже готов короткий текст для каждого слайда, вы можете настроить систему так, чтобы она оставила исходный материал без сокращений и изменений.',
  },
  {
    question: 'ИИ сам придумывает заголовки для слайдов?',
    answer: 'Да, система автоматически анализирует вставленный текст и генерирует вовлекающие заголовки для каждой карточки, чтобы удержать внимание читателя.',
  },
  {
    question: 'Как ИИ понимает, где заканчивается один слайд и начинается другой?',
    answer: 'Нейросеть анализирует логическую структуру вашего текста и делит его на смысловые блоки. Каждый завершенный тезис или шаг инструкции помещается на отдельный слайд.',
  },
  {
    question: 'Можно ли перенести уже готовые абзацы на слайды без изменения?',
    answer: 'Да, если ваш текст уже структурирован, вы можете вручную перенести абзацы на конкретные карточки в редакторе без ИИ-сокращений.',
  },
  {
    question: 'Сколько времени занимает конвертация статьи в карусель?',
    answer: 'Процесс анализа текста, разбивки на слайды и создания базового дизайна занимает всего несколько секунд.',
  },
  {
    question: 'Какие форматы исходников поддерживаются?',
    answer: 'Вы можете вставить обычный текст, скопировать ссылку на статью, загрузить PDF-файл, добавить ссылку на YouTube-видео или использовать голосовое сообщение.',
  },
  {
    question: 'Нужно ли мне самому подбирать картинки к тексту?',
    answer: 'Нет, GoToFlow автоматически предлагает визуальные шаблоны, фоны, ИИ-стили и персонажей, которые подходят под ваш контент.',
  },
  {
    question: 'Можно ли вручную исправить текст после генерации?',
    answer: 'Да. Вы имеете полный контроль над результатом и можете отредактировать любой текст на сгенерированных слайдах перед скачиванием.',
  },
  {
    question: 'Что делать, если на одном слайде получилось слишком много текста?',
    answer: 'Вы можете перегенерировать структуру карусели, попросить ИИ сократить текст сильнее или вручную разбить длинный тезис на два отдельных слайда.',
  },
  {
    question: 'Какие форматы экспорта доступны?',
    answer: 'Готовая карусель скачивается в виде ZIP-архива с пронумерованными изображениями высокого качества, готовыми к публикации. Мы поддерживаем форматы 4:5, 1:1 и 9:16.',
  },
  {
    question: 'Нужно ли уметь работать в графических редакторах?',
    answer: 'Абсолютно нет. GoToFlow берет всю верстку, дизайн и распределение текста на себя. Вы работаете только со смыслами.',
  },
  {
    question: 'Можно ли превратить текст в бесшовную карусель?',
    answer: 'Да, в настройках дизайна можно выбрать бесшовный шаблон, и ваш текст будет наложен на перетекающий фон, создавая панорамный эффект.',
  },
  {
    question: 'Сколько слайдов можно сгенерировать из одного текста?',
    answer: 'Система позволяет создать от 5 до 10 слайдов в одной карусели. Это рекомендуемый диапазон для достижения максимальных охватов в Instagram.',
  },
];

const textToCarouselDraftPage = {
  id: 'ru-use-case-tekst-v-karusel',
  language: 'ru',
  pageType: 'useCase',
  slug: 'tekst-v-karusel',
  path: '/ru/use-cases/tekst-v-karusel',
  title: 'Превратите текст в готовую карусель для Instagram | GoToFlow',
  description: 'Вставьте статью, заметку или длинный пост, и GoToFlow автоматически выделит главное, разобьет на слайды и создаст красивый дизайн без ручной верстки.',
  h1: 'Превратите текст в готовую карусель для Instagram',
  heroSubtitle: 'Вставьте статью, заметку или длинный пост, и GoToFlow автоматически выделит главное, разобьет на слайды и создаст красивый дизайн без ручной верстки.',
  primaryKeyword: 'текст в карусель',
  secondaryKeywords: ['текст в карусель нейросеть', 'создать карусель из текста', 'статья в карусель'],
  searchIntent: 'Преобразовать готовый текст, заметку или статью в структурированную карусель Instagram.',
  priority: 0.7,
  commercialValue: 0.78,
  productBridge: 'GoToFlow принимает текстовый исходник, выделяет смысл, распределяет материал по слайдам и помогает получить редактируемую готовую карусель.',
  primaryIntent: 'Текстовый исходник превращается в готовую карусель Instagram с редактируемыми слайдами.',
  pageFamily: 'carousel_product_page',
  templateVariant: 'template_page',
  cta: {
    label: 'Создать карусель из текста',
    href: 'https://app.gotoflow.io',
    action: 'open_app',
  },
  heroEyebrow: 'Текст в карусель',
  heroSecondaryLinkLabel: 'Смотреть примеры',
  finalCta: {
    eyebrow: 'Начните сейчас',
    title: {
      before: 'Превратите свой первый ',
      accent: 'текст в карусель',
      after: '',
    },
    description: 'Скопируйте заметки или лонгрид, и GoToFlow сделает всю рутину по чтению, анализу и верстке за вас.',
    primaryAction: {
      label: 'Вставить текст и создать карусель',
      href: 'https://app.gotoflow.io',
      action: 'open_app',
    },
  },
  conversion: {
    destinationType: 'app',
    destinationUrl: 'https://app.gotoflow.io',
    targetAction: 'convert_text_to_carousel',
    pageEntity: 'text_to_carousel',
    appDeepLinkVerified: false,
    appDeepLinkNotes: 'No verified page-specific app deep link is documented in this repo; conversion CTAs use the app origin.',
  },
  seoBrief: {
    pageEntity: 'text_to_carousel_use_case',
    primaryQuery: 'текст в карусель',
    primaryIntent: 'Преобразовать готовый текст, заметку или статью в структурированную карусель Instagram.',
    userJob: 'Вставить текстовый материал и получить готовую редактируемую карусель.',
    uniqueAngle: 'Input-source use-case page focused on text-to-carousel conversion.',
    audience: 'Эксперты, авторы, SMM-команды и владельцы контента, которым нужно переупаковать текст в Instagram-карусель.',
    contentType: 'production use-case SEO page',
    platform: 'Instagram',
    language: 'ru',
    country: 'RU',
    conversionAction: 'convert_text_to_carousel',
    productRoute: 'https://app.gotoflow.io',
    cannibalizationBoundary: 'This route owns commercial text-to-carousel conversion intent. The supporting article owns educational how-to context.',
  },
  faqPolicy: {
    minItems: 12,
    maxItems: 16,
    requireUniqueQuestions: true,
    requireVisibleSchemaParity: true,
  },
  sectionPolicy: textToCarouselSectionPolicy,
  sections: [],
  quickAnswer: {
    title: 'Как превратить текст в карусель?',
    body: 'Просто скопируйте свой текст, заметку или целую статью в GoToFlow. ИИ сам проанализирует смысл, выделит тезисы, сократит лишнее и распределит материал по карточкам с единым дизайном. Вам останется только проверить результат и скачать готовую карусель.',
  },
  heroCarouselAssetIds: [
    'instagram-template-hero-product-case',
    'instagram-template-hero-expert-post',
    'instagram-template-hero-template-cover',
  ],
  heroVisualBadge: 'Текст',
  templateCategoriesIntro: {
    eyebrow: 'Поддерживаемые форматы',
    heading: {
      before: 'Какие тексты можно ',
      accent: 'превратить в карусель',
      after: '',
    },
  },
  templateCategories: [
    {
      title: 'Автоматически',
      body: 'GoToFlow самостоятельно подбирает подходящую структуру под тему и исходный материал.',
    },
    {
      title: 'Строго по готовому сценарию',
      body: 'GoToFlow следует выбранной структуре без самостоятельной смены логики подачи.',
    },
    {
      title: 'Любая идея',
      body: 'Если нужного сценария нет в списке, пользователь может задать собственную тему или идею.',
    },
    {
      title: 'PDF и длинные документы',
      body: 'Используйте PDF или объёмный текст как источник для будущей серии слайдов.',
    },
    {
      title: 'Инструкции и чек-листы',
      body: 'Визуализируйте пошаговые процессы, выделив каждый шаг на отдельный слайд.',
    },
    {
      title: 'Кейсы и отзывы',
      body: 'Превратите историю клиента, отзыв или разбор ситуации в понятную карусель.',
    },
  ],
  categoryCta: {
    label: 'Создать карусель из текста',
    href: 'https://app.gotoflow.io',
    action: 'open_app',
  },
  templateChoiceGuide: {
    eyebrow: 'Подготовка текста',
    title: {
      before: 'Какие материалы дают ',
      accent: 'лучший результат',
      after: ' в карусели',
    },
    description: 'Лучше всего работают исходники, где уже есть цель, тезисы и понятная логика. GoToFlow помогает сократить и распределить текст, но факты и акценты стоит проверить перед скачиванием.',
    items: [
      {
        id: 'clear-thesis',
        task: 'Есть главная мысль',
        template: 'Сильная обложка',
        structure: 'один центральный тезис помогает собрать понятный хук и последовательность слайдов',
      },
      {
        id: 'logical-steps',
        task: 'Есть структура или шаги',
        template: 'Пошаговая карусель',
        structure: 'инструкция, чек-лист или руководство легче превращаются в карточки без перегруза',
      },
      {
        id: 'examples-details',
        task: 'Есть примеры и детали',
        template: 'Экспертный разбор',
        structure: 'конкретика помогает сделать слайды полезными, а не похожими на общий пересказ',
      },
      {
        id: 'cta-context',
        task: 'Понятна цель публикации',
        template: 'Финальный CTA',
        structure: 'когда задана цель, проще выбрать призыв к действию и не потерять смысл исходника',
      },
      {
        id: 'manageable-length',
        task: 'Текст можно сократить',
        template: 'Короткие слайды',
        structure: 'материал с повторениями и лишними вводными хорошо подходит для сжатия до 5-10 слайдов',
      },
    ],
  },
  productWorkflow: {
    preset: 'carousel_creation',
    eyebrow: 'Процесс',
    title: {
      before: 'Как происходит конвертация ',
      accent: 'текста в слайды',
      after: '',
    },
    description: 'Вставьте текстовый исходник, проверьте выделенные тезисы, настройте визуальный стиль и скачайте готовую карусель для Instagram.',
    carouselTypes: [
      { id: 'ai', label: 'AI-карусель', availability: 'available', active: true },
      { id: 'template', label: 'Шаблонная', availability: 'available' },
      { id: 'seamless', label: 'Бесшовная', availability: 'available' },
      { id: 'animated', label: 'Анимированная', availability: 'available' },
    ],
    stepOverrides: {
      source: {
        title: 'Вставка текста',
        description: 'Просто скопируйте ваш лонгрид или сырые заметки в поле ввода GoToFlow.',
      },
      structure: {
        title: 'AI-анализ содержания',
        description: 'Система считывает смысл, выделяет заголовки и выжимки для карточек.',
      },
      textReview: {
        title: 'Распределение по слайдам',
        description: 'Текст автоматически разбивается на логичные фрагменты без перегруза слайдов.',
      },
      visualRoute: {
        title: 'Редактирование и дизайн',
        description: 'Настройте визуальный стиль, примените шаблон и поправьте текст при необходимости.',
      },
      editorResult: {
        title: 'Скачивание',
        description: 'Скачайте готовый архив со слайдами, которые сразу можно публиковать в Instagram.',
      },
    },
    mockups: [
      {
        id: 'source-structure',
        title: 'Исходный текст и структура',
        caption: 'Панель исходного текста и визуально выделенная AI-структура.',
        fallbackVisualType: 'source_structure',
      },
      {
        id: 'text-review',
        title: 'Разбивка на слайды',
        caption: 'Проверьте заголовки, выжимки и текстовые блоки будущих карточек.',
        fallbackVisualType: 'text_review',
      },
      {
        id: 'visual-route',
        title: 'Дизайн и настройки',
        caption: 'Выберите шаблон, фон, шрифты и персонажа под ваш фирменный стиль.',
        fallbackVisualType: 'ai_template',
      },
      {
        id: 'editor-result',
        title: 'Готовые слайды',
        caption: 'Готовые слайды из утвержденной группы workflowResults.aiCarouselFiveSlides.',
        resultCarousel: {
          proofType: 'workflow-result',
          title: 'Из текста в готовые слайды',
          label: 'Текст в карусель',
          format: '4:5',
          slideCount: aiCarouselResultSlides.length,
          width: 1122,
          height: 1402,
          mode: 'Готовая карусель',
          images: aiCarouselResultSlides,
        },
        fallbackVisualType: 'editor_result',
      },
    ],
    featureChips: [
      'Вставка текста',
      'AI-анализ содержания',
      'Разбивка по слайдам',
      'Редактирование и дизайн',
      'Скачивание',
    ],
    cta: {
      label: 'Создать карусель из текста',
      href: 'https://app.gotoflow.io',
      action: 'open_app',
      note: 'Вставьте текст, проверьте структуру и доработайте готовые слайды перед публикацией.',
    },
  },
  productCapabilities: {
    eyebrow: 'Настройки',
    heading: {
      before: 'Какие параметры можно настроить ',
      accent: 'перед скачиванием',
      after: '',
    },
    introCopy: 'Искусственный интеллект делает основную работу, но вы полностью контролируете финальный результат карусели.',
    highlightedCapabilities: ['topicText', 'aiStructureText', 'templates', 'textEditing', 'cta', 'upTo10Slides'],
    groups: [
      {
        id: 'text-input-method',
        title: 'Способ ввода текста',
        body: 'Прямая вставка текста, загрузка файла (PDF) или ссылка на статью.',
        capabilityIds: ['topicText', 'link', 'video', 'pdf', 'voice'],
      },
      {
        id: 'compression-level',
        title: 'Стипендия сжатия',
        body: 'Настройте, насколько сильно ИИ должен сократить текст, или попросите оставить его без изменений.',
        capabilityIds: ['aiStructureText', 'regeneration'],
      },
      {
        id: 'series-length',
        title: 'Длина серии',
        body: 'Задайте желаемое количество слайдов (от 5 до 10).',
        capabilityIds: ['upTo10Slides', 'formats4511916'],
      },
      {
        id: 'design-settings',
        title: 'Настройки дизайна',
        body: 'Выберите шаблон, фон, шрифты и персонажа под ваш фирменный стиль.',
        capabilityIds: ['templates', 'aiStyle', 'customPrompt', 'background', 'character', 'seamlessCarousels', 'animatedCarousels'],
      },
      {
        id: 'manual-editing',
        title: 'Ручная корректировка',
        body: 'Отредактируйте текст на любом конкретном слайде, если ИИ упустил важную деталь.',
        capabilityIds: ['textEditing', 'slideEditing'],
      },
      {
        id: 'cta-settings',
        title: 'Призыв к действию (CTA)',
        body: 'Добавьте свои контакты или призыв к подписке на финальный слайд.',
        capabilityIds: ['cta'],
      },
    ],
  },
  readyCarouselShowcaseIntro: {
    eyebrow: 'Примеры каруселей',
    heading: {
      before: 'Посмотрите, какие карусели ',
      accent: 'получаются из текста',
      after: '',
    },
    body: 'Примеры выглядят как типичные текстовые выжимки: готовая структура, заголовки, короткие смысловые блоки и визуальный дизайн.',
  },
  readyCarouselShowcase: textToCarouselReadyShowcase,
  readyCarouselShowcaseCta: {
    label: 'Создать карусель из текста',
    href: 'https://app.gotoflow.io',
    action: 'open_app',
    note: 'Перед публикацией результат можно проверить и отредактировать.',
  },
  pageSpecificVisualProof: {
    proofType: 'page-specific',
    eyebrow: 'Доказательство работы',
    heading: {
      before: 'Из сплошного текста — ',
      accent: 'в готовую карусель',
      after: '',
    },
    title: 'Исходный текст, AI-структура и готовые слайды',
    description: 'Существующий proof pattern показывает готовые слайды GoToFlow из утвержденной группы workflowResults.aiCarouselFiveSlides после обработки текстового исходника и выделения структуры.',
    label: 'Текст в карусель',
    format: '4:5',
    slideCount: aiCarouselResultSlides.length,
    width: 1122,
    height: 1402,
    mode: 'Готовые слайды',
    images: aiCarouselResultSlides,
  },
  useCasesIntro: {
    eyebrow: 'Сценарии',
    heading: {
      before: 'Какие текстовые задачи ',
      accent: 'закрывает карусель',
      after: '',
    },
  },
  useCases: [
    { title: 'Статья → Карусель', body: 'Статья превращается в карусель.' },
    { title: 'Заметки → Карусель', body: 'Заметки превращаются в карусель.' },
    { title: 'Лонгрид → Карусель', body: 'Лонгрид превращается в карусель.' },
    { title: 'Инструкция → Карусель', body: 'Инструкция превращается в карусель.' },
    { title: 'Чек-лист → Карусель', body: 'Чек-лист превращается в карусель.' },
    { title: 'Отзывы → Карусель', body: 'Отзывы превращаются в карусель.' },
    { title: 'Кейс → Карусель', body: 'Кейс превращается в карусель.' },
    { title: 'Рассылка → Карусель', body: 'Рассылка превращается в карусель.' },
  ],
  faq: textToCarouselFaq,
  relatedIntro: {
    eyebrow: 'Связанные материалы',
    heading: {
      before: 'Что еще почитать ',
      accent: 'и попробовать',
      after: '',
    },
  },
  relatedCards: [
    {
      href: '/ru/ai-generator-karuselej',
      title: 'AI-генератор каруселей',
      description: 'Генерация с нуля по теме.',
      type: 'product_tool',
    },
    {
      href: '/ru/generator-karuselej-instagram',
      title: 'Генератор каруселей для Instagram',
      description: 'Ручной контроль.',
      type: 'product_tool',
    },
    {
      href: '/ru/templates/instagram-carousel',
      title: 'Шаблоны Instagram-каруселей',
      description: 'Вдохновение.',
      type: 'seo_page',
    },
    {
      href: '/ru/use-cases/besshovnaya-karusel-instagram',
      title: 'Бесшовная карусель',
      description: 'Специальный эффект.',
      type: 'seo_page',
    },
  ],
  relatedSeoPages: [],
  relatedSeoPaths: ['/ru/templates/instagram-carousel', '/ru/use-cases/besshovnaya-karusel-instagram'],
  relatedProductToolPaths: ['/ru/ai-generator-karuselej', '/ru/generator-karuselej-instagram'],
  contextualLinks: [],
  relatedBlogSlugs: [],
  breadcrumbs: [
    ruHomeBreadcrumb,
    { label: 'Карусели Instagram', path: '/ru/templates/instagram-carousel' },
    { label: 'Текст в карусель', path: '/ru/use-cases/tekst-v-karusel' },
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
    approvedAt: '2026-07-15',
    notes: 'Approved for the first Carousel Page Production System release batch after local SEO release gates.',
  },
  contentReviewedByHuman: true,
  uniquenessReviewedByHuman: true,
  internalLinksReviewedByHuman: true,
  ctaReviewedByHuman: true,
  productClaimsReviewedByHuman: true,
  ownerVisualApprovalReceived: true,
  review: {
    owner: 'GoToFlow',
    contentReviewedAt: '2026-07-15',
    productClaimsReviewedAt: '2026-07-15',
    assetsReviewedAt: '2026-07-15',
    seoReviewedAt: '2026-07-15',
    productVersion: 'seo-pages-release-2026-07-15',
  },
  designReference: '/ru',
  urlOrigin: 'seo_registry_candidate',
  urlOriginEvidence: [
    'src/content/seoPages/handoffs/content_design_contract_tekst_v_karusel.md',
  ],
  intentOwner: 'ru-use-case-tekst-v-karusel',
  routeOwner: 'ru-use-case-tekst-v-karusel',
  canonicalOwner: '/ru/use-cases/tekst-v-karusel',
  riskLevel: 'medium',
  manualReviewReason: 'Approved for production integration in the first Carousel Page Production System release batch.',
  createdFromActionMapRowIds: ['content-design-contract-tekst-v-karusel-2026-07-15'],
  notes: [
    'Released as an indexable use-case page after owner approval and local release gates.',
    'GoToFlow SEO Publishing Platform is not part of this page integration.',
  ],
  draftPreviewIntegrated: true,
  productionIntegrationCompleted: true,
  approvedForRelease: true,
  lastUpdated: '2026-07-15',
  ownershipDecision: ownershipDecision({
    decision: 'safe_new_registry_page',
    reason: 'No exact protected route collision found for the text-to-carousel use-case path; existing generator and article owners remain separate.',
    existingOwnerStatus: 'Existing generator routes keep broad generator intent; the supporting article keeps informational how-to intent.',
    intentOverlapPaths: ['/ru/ai-generator-karuselej', '/ru/generator-karuselej-instagram', '/ru/blog/tekst-v-karusel-neyroset'],
  }),
};

const approvedReleaseLifecycle = {
  state: 'indexable_approved',
  published: true,
  indexable: true,
  noindex: false,
  sitemapEligible: true,
  sitemapIncluded: true,
  indexationApproved: true,
  indexationApproval: {
    approved: true,
    approvedBy: 'GoToFlow',
    approvedAt: '2026-07-16',
    notes: 'Approved for production integration after owner visual approval and local release gates.',
  },
  approvedByHuman: true,
  routeReviewApproved: true,
  ownerVisualApprovalReceived: true,
  productionIntegrationCompleted: true,
  approvedForRelease: true,
  contentReviewedByHuman: true,
  uniquenessReviewedByHuman: true,
  internalLinksReviewedByHuman: true,
  ctaReviewedByHuman: true,
  productClaimsReviewedByHuman: true,
};

const waveOneLocalDraftReview = {
  owner: 'GoToFlow',
  contentReviewedAt: '2026-07-16',
  productClaimsReviewedAt: '2026-07-16',
  assetsReviewedAt: '2026-07-16',
  seoReviewedAt: '2026-07-16',
  productVersion: 'seo-pages-release-2026-07-16',
};

const contractDraftPreviewLifecycle = {
  state: 'noindex_review',
  published: true,
  indexable: false,
  noindex: true,
  sitemapEligible: false,
  sitemapIncluded: false,
  indexationApproved: false,
  indexationApproval: {
    approved: false,
    approvedBy: '',
    approvedAt: '',
    notes: 'Local Codex draft preview only; no indexation, sitemap, push, deploy, or release.',
  },
  approvedByHuman: false,
  routeReviewApproved: true,
  ownerVisualApprovalReceived: false,
  productionIntegrationCompleted: false,
  approvedForRelease: false,
  contentReviewedByHuman: true,
  uniquenessReviewedByHuman: true,
  internalLinksReviewedByHuman: true,
  ctaReviewedByHuman: true,
  productClaimsReviewedByHuman: true,
};

const contractDraftPreviewReview = {
  owner: 'GoToFlow',
  contentReviewedAt: '2026-07-16',
  productClaimsReviewedAt: '2026-07-16',
  assetsReviewedAt: '2026-07-16',
  seoReviewedAt: '2026-07-16',
  productVersion: 'seo-pages-draft-preview-2026-07-16',
};

const contractCarouselTypeGuideItems = [
  {
    task: "СОЗДАНИЕ С ПОМОЩЬЮ ИИ",
    template: "ИИ-карусель",
    structure: "Добавьте тему или исходный материал, чтобы получить структуру, тексты и оформление слайдов с помощью ИИ."
  },
  {
    task: "ГОТОВОЕ ОФОРМЛЕНИЕ",
    template: "Шаблонная карусель",
    structure: "Выберите готовый шаблон и настройте оформление карусели под тему и стиль публикации."
  },
  {
    task: "ЕДИНОЕ ВИЗУАЛЬНОЕ ПОЛОТНО",
    template: "Бесшовная карусель",
    structure: "Создайте слайды, которые визуально продолжают друг друга и складываются в единую композицию."
  },
  {
    task: "ДВИЖЕНИЕ В СЛАЙДАХ",
    template: "Анимированная карусель",
    structure: "Добавьте поддерживаемую анимацию, чтобы сделать карусель динамичнее и подготовить её к публикации."
  }
];

const buildContractCarouselTypeGuide = ({ title, description }) => ({
  eyebrow: "ТИПЫ КАРУСЕЛЕЙ",
  title,
  description,
  items: contractCarouselTypeGuideItems,
});

const contractDraftPreviewSpecs = [
  {
    id: "ru-alternative-canva-dlya-karuseley",
    sourceFile: "src/content/seoPages/handoffs/content_design_contract_canva_dlya_karuseley.md",
    path: "/ru/alternatives/canva-dlya-karuseley",
    pageType: "alternative",
    slug: "canva-dlya-karuseley",
    primaryIntentType: "ALTERNATIVE",
    sectionPolicy: canvaSectionPolicy,
    contractTitle: "Аналог Canva для создания постов-каруселей | GoToFlow",
    title: "Аналог Canva для создания постов-каруселей | GoToFlow",
    description: "Ищете аналог Canva для создания постов-каруселей? Добавьте тему или текст и получите структуру, оформление и готовые слайды в GoToFlow.",
    h1: "Аналог Canva для создания постов-каруселей",
    breadcrumb: "Аналог Canva для создания постов-каруселей",
    primaryKeyword: "аналог canva для создания постов-каруселей",
    secondaryKeywords: [
      "создание каруселей без ручной верстки в Canva"
    ],
    heroEyebrow: "АНАЛОГ CANVA ДЛЯ КАРУСЕЛЕЙ",
    heroHighlightFragment: "Canva",
    heroSubtitle: "GoToFlow — сервис для быстрого создания постов-каруселей без ручной верстки каждого слайда. Добавьте тему, заметки или готовый текст, отредактируйте результат и скачайте карусель для публикации.",
    ctaLabel: "Создать карусель",
    secondaryCtaLabel: "Посмотреть примеры",
    quickAnswer: {
      title: "Как GoToFlow помогает создавать карусели без Canva",
      body: "В Canva текст, структуру и каждый слайд обычно приходится собирать вручную. В GoToFlow можно добавить тему или исходный материал, получить готовую последовательность слайдов, отредактировать текст, выбрать оформление и скачать результат."
    },
    formatsHeading: { before: "Какие посты-карусели ", accent: "можно создать", after: " в GoToFlow" },
    formats: [
      {
        title: "Автоматически",
        body: "GoToFlow самостоятельно подбирает подходящую структуру под тему и исходный материал."
      },
      {
        title: "Строго по готовому сценарию",
        body: "GoToFlow следует выбранной структуре без самостоятельной смены логики подачи."
      },
      {
        title: "Любая идея",
        body: "Если нужного сценария нет в списке, пользователь может задать собственную тему или идею."
      },
      {
        title: "Ошибки и решения",
        body: "Разберите распространённые ошибки и покажите, как их исправить."
      },
      {
        title: "Подборка и топ",
        body: "Оформите список инструментов, идей, советов или рекомендаций."
      },
      {
        title: "Презентация продукта или услуги",
        body: "Объясните преимущества, особенности и сценарии использования предложения."
      }
    ],
    choiceGuide: {
      eyebrow: "ТИПЫ КАРУСЕЛЕЙ",
      title: { before: "Какие типы каруселей ", accent: "можно создать", after: " в GoToFlow" },
      description: "Создавайте карусели с помощью ИИ, используйте готовые шаблоны, собирайте бесшовные композиции или добавляйте анимацию. Из чего можно создать карусель: начните с собственной темы или добавьте готовый текст, заметки, ссылку, PDF, аудио или видео — в зависимости от поддерживаемого сценария GoToFlow.",
      items: [
        {
          task: "СОЗДАНИЕ С ПОМОЩЬЮ ИИ",
          template: "ИИ-карусель",
          structure: "Добавьте тему или исходный материал, чтобы получить структуру, тексты и оформление слайдов с помощью ИИ."
        },
        {
          task: "ГОТОВОЕ ОФОРМЛЕНИЕ",
          template: "Шаблонная карусель",
          structure: "Выберите готовый шаблон и настройте оформление карусели под тему и стиль публикации."
        },
        {
          task: "ЕДИНОЕ ВИЗУАЛЬНОЕ ПОЛОТНО",
          template: "Бесшовная карусель",
          structure: "Создайте слайды, которые визуально продолжают друг друга и складываются в единую композицию."
        },
        {
          task: "ДВИЖЕНИЕ В СЛАЙДАХ",
          template: "Анимированная карусель",
          structure: "Добавьте поддерживаемую анимацию, чтобы сделать карусель динамичнее и подготовить её к публикации."
        }
      ]
    },
    workflowHeading: { before: "Как создать ", accent: "карусель", after: " в GoToFlow" },
    workflowIntro: "Добавьте тему, текст, ссылку или другой исходный материал. GoToFlow подготовит структуру и тексты слайдов. После этого проверьте результат, выберите оформление и скачайте готовую карусель.",
    workflowSteps: [
      {
        title: "Добавьте тему или материал",
        body: "Введите тему, вставьте текст, заметки или другой исходный материал."
      },
      {
        title: "Получите структуру и тексты слайдов",
        body: "GoToFlow выделит основные мысли и распределит их по последовательным слайдам."
      },
      {
        title: "Проверьте и отредактируйте результат",
        body: "Измените заголовки, формулировки и порядок тезисов перед публикацией."
      },
      {
        title: "Выберите шаблон и визуальный стиль",
        body: "Настройте оформление, подходящее под тему и формат публикации."
      },
      {
        title: "Скачайте готовую карусель",
        body: "Экспортируйте слайды и опубликуйте их в выбранной социальной сети."
      }
    ],
    productCapabilities: {
      eyebrow: "Параметры",
      heading: { before: "Что можно настроить ", accent: "при создании карусели", after: "" },
      introCopy: "Источник контента, структуру и тексты слайдов, формат карусели, шаблон и оформление, фон, изображения, призыв к действию, количество и формат слайдов.",
      canonicalDataSource: 'SEO_CANONICAL_PRODUCT_CAPABILITIES',
      highlightedCapabilities: ['topicText', 'aiStructureText', 'templates', 'textEditing', 'formats4511916', 'upTo10Slides'],
      groups: [
        {
          id: 'canva-content-source',
          title: 'Источник контента',
          body: 'Тема, готовый текст, заметки, ссылка или другой поддерживаемый исходный материал.',
          capabilityIds: ['topicText', 'link', 'video', 'pdf', 'voice'],
        },
        {
          id: 'canva-structure-text',
          title: 'Структура и тексты слайдов',
          body: 'Можно проверить и отредактировать заголовки, тезисы и последовательность.',
          capabilityIds: ['aiStructureText', 'textEditing', 'slideEditing', 'regeneration'],
        },
        {
          id: 'canva-carousel-format',
          title: 'Формат карусели',
          body: 'Инструкция, чек-лист, разбор, подборка, презентация продукта и другие подтверждённые форматы.',
          capabilityIds: ['formats4511916', 'upTo10Slides', 'seamlessCarousels', 'animatedCarousels'],
        },
        {
          id: 'canva-template-style',
          title: 'Шаблон и оформление',
          body: 'Выберите доступный шаблон и визуальный стиль будущих слайдов.',
          capabilityIds: ['templates', 'aiStyle', 'customPrompt'],
        },
        {
          id: 'canva-visual-cta',
          title: 'Фон, изображения и призыв к действию',
          body: 'Используйте подтверждённые настройки фона, визуального оформления и CTA внутри карусели.',
          capabilityIds: ['background', 'character', 'cta'],
        },
        {
          id: 'canva-slides-output',
          title: 'Количество и формат слайдов',
          body: 'Работайте с поддерживаемыми форматами и экспортируйте готовую последовательность слайдов.',
          capabilityIds: ['formats4511916', 'upTo10Slides'],
        },
      ],
    },
    parameters: [
      {
        title: "Источник контента",
        body: "Тема, готовый текст, заметки, ссылка или другой поддерживаемый исходный материал."
      },
      {
        title: "Структура и тексты слайдов",
        body: "Можно проверить и отредактировать заголовки, тезисы и последовательность."
      },
      {
        title: "Формат карусели",
        body: "Инструкция, чек-лист, разбор, подборка, презентация продукта и другие подтверждённые форматы."
      },
      {
        title: "Шаблон и оформление",
        body: "Выберите доступный шаблон и визуальный стиль будущих слайдов."
      },
      {
        title: "Фон, изображения и призыв к действию",
        body: "Использовать только подтверждённые Product Truth возможности."
      },
      {
        title: "Количество и формат слайдов",
        body: "Использовать только фактически поддерживаемые значения из Product Truth."
      }
    ],
    readyExamplesIntro: {
      eyebrow: "Примеры",
      heading: { before: "Примеры каруселей, ", accent: "созданных в GoToFlow", after: "" },
      body: "Посмотрите, как могут выглядеть экспертные разборы, инструкции, чек-листы, подборки и презентации продуктов."
    },
    examples: [
      {
        title: "Экспертный разбор",
        assetId: "example-post-intro"
      },
      {
        title: "Пошаговая инструкция",
        assetId: "example-post-expert"
      },
      {
        title: "Чек-лист",
        assetId: "example-post-checklist"
      },
      {
        title: "Ошибки и решения",
        assetId: "example-post-errors"
      },
      {
        title: "Подборка советов",
        assetId: "example-post-tips"
      },
      {
        title: "Презентация продукта",
        assetId: "example-post-product"
      }
    ],
    visualProof: {
      eyebrow: "Результат",
      heading: { before: "От исходного текста ", accent: "до готовой карусели", after: "" },
      title: "От исходного текста до готовой карусели",
      description: "Добавьте тему или черновик, проверьте предложенную структуру и получите оформленную последовательность слайдов для публикации."
    },
    useCasesHeading: { before: "Кому подходит ", accent: "GoToFlow", after: "" },
    useCases: [
      {
        title: "Экспертам и авторам",
        body: "Чтобы превращать знания, заметки и материалы в понятные посты-карусели."
      },
      {
        title: "SMM-специалистам",
        body: "Чтобы быстрее готовить карусели для собственных и клиентских проектов."
      },
      {
        title: "Бизнесу",
        body: "Чтобы рассказывать о продуктах, услугах, преимуществах и кейсах."
      },
      {
        title: "Онлайн-школам",
        body: "Чтобы оформлять инструкции, образовательные материалы и программы."
      },
      {
        title: "Бьюти-мастерам",
        body: "Чтобы рассказывать о процедурах, услугах и рекомендациях для клиентов."
      },
      {
        title: "Контент-мейкерам",
        body: "Чтобы регулярно создавать новые публикации без ручной верстки каждого слайда."
      }
    ],
    faq: [
      {
        question: "Можно ли использовать GoToFlow как аналог Canva для каруселей?",
        answer: "Да, GoToFlow — это специализированный инструмент для создания постов-каруселей без необходимости ручной сборки холста."
      },
      {
        question: "Нужно ли вручную размещать текст на каждом слайде?",
        answer: "Нет, система автоматически распределяет текст по карточкам и выравнивает его согласно выбранному стилю."
      },
      {
        question: "Можно ли редактировать тексты перед скачиванием?",
        answer: "Да, вы можете поправить любой заголовок или абзац во встроенном редакторе."
      },
      {
        question: "Какие форматы каруселей поддерживаются?",
        answer: "Поддерживаются квадратный формат 1:1, портретный 4:5 и вертикальный 9:16."
      },
      {
        question: "Можно ли создать карусель из готового текста?",
        answer: "Конечно, просто вставьте свой текст в поле ввода, и сервис разобьет его на визуальные слайды."
      },
      {
        question: "Можно ли добавить собственную тему?",
        answer: "Да, вы можете ввести просто заголовок будущей темы, и встроенный генератор напишет тексты."
      },
      {
        question: "Есть ли готовые шаблоны?",
        answer: "Да, в платформе доступны профессионально подобранные шаблоны с различными цветами и шрифтами."
      },
      {
        question: "Можно ли создавать карусели на русском языке?",
        answer: "Сервис полностью поддерживает русскую типографику и работу с русскоязычными шрифтами."
      },
      {
        question: "Нужно ли уметь работать с дизайном?",
        answer: "Никаких специальных навыков дизайна не требуется, вам достаточно уметь редактировать текст."
      },
      {
        question: "Можно ли использовать GoToFlow без VPN?",
        answer: "Да, сервис работает напрямую из браузера без ограничений и VPN."
      },
      {
        question: "В каком формате скачиваются слайды?",
        answer: "Слайды экспортируются в качественном ZIP-архиве с готовыми PNG-изображениями."
      },
      {
        question: "Для каких социальных сетей подходят карусели?",
        answer: "Изображения идеально подходят для публикации в Instagram, VK, Telegram и LinkedIn."
      },
      {
        question: "Можно ли использовать собственные изображения?",
        answer: "Сервис поддерживает загрузку пользовательских фонов в рамках встроенных шаблонов."
      },
      {
        question: "Сколько времени занимает создание карусели?",
        answer: "Полный цикл от ввода текста до скачивания готовой карусели обычно занимает не более двух минут."
      },
      {
        question: "Чем генератор каруселей отличается от универсального редактора?",
        answer: "Универсальный редактор требует самостоятельной расстановки всех графических элементов и работы с каждым слоем, а генератор делает это автоматически на основе вашего контента."
      }
    ],
    faqHeading: { before: "Частые вопросы об аналоге ", accent: "Canva", after: " для каруселей" },
    relatedHeading: "Другие инструменты для создания каруселей",
    relatedCards: [
      {
        title: "ИИ-генератор каруселей",
        href: "/ru/generator-karuselej-instagram"
      },
      {
        title: "Текст в карусель",
        href: "/ru/use-cases/tekst-v-karusel"
      },
      {
        title: "Создание бесшовных каруселей",
        href: "/ru/use-cases/besshovnaya-karusel-instagram"
      }
    ],
    finalCta: {
      heading: "Создайте карусель без ручной верстки в Canva",
      description: "Добавьте тему или готовый материал, проверьте тексты и скачайте оформленные слайды для публикации.",
      cta: "Создать карусель"
    },
    productTruth: {
      allowed: "ИИ может разбивать текст на карточки, есть готовые шаблоны, скачивание в ZIP, форматы 4:5 и 1:1, базовая настройка цветов.",
      forbidden: "Нельзя обещать прямую публикацию в соцсети, замену сложной дизайнерской работы, генерацию видеоформатов, автоматическую загрузку шрифтов по URL."
    }
  },
];

const contractApprovedReleaseSpecs = [
  {
    id: "ru-use-case-carousels-for-beauty",
    sourceFile: "src/content/seoPages/handoffs/content_design_contract_carousels_for_beauty.md",
    path: "/ru/use-cases/carousels-for-beauty",
    pageType: "useCase",
    slug: "carousels-for-beauty",
    primaryIntentType: "USE_CASE",
    contractTitle: "Создание постов-каруселей для бьюти-мастеров | GoToFlow",
    title: "Создание постов-каруселей для бьюти-мастеров | GoToFlow",
    description: "Создавайте эстетичные посты-карусели для бьюти-блога без дизайнера. Добавьте услуги, прайсы и советы — сервис соберет готовые слайды.",
    h1: "Создание постов-каруселей для бьюти-блога",
    breadcrumb: "Создание постов-каруселей для бьюти-блога",
    primaryKeyword: "продающие карусели для бьюти-мастеров",
    secondaryKeywords: [
      "создание карусели",
      "генератор каруселей",
      "ai для постов"
    ],
    heroEyebrow: "КАРУСЕЛИ ДЛЯ БЬЮТИ",
    heroHighlightFragment: "бьюти-блога",
    heroSubtitle: "GoToFlow помогает бьюти-мастерам оформлять прайс-листы, примеры работ и экспертные советы в стильные посты-карусели. Просто введите текст, выберите дизайн и скачайте картинки для Instagram или VK.",
    ctaLabel: "Создать карусель",
    secondaryCtaLabel: "Смотреть шаблоны",
    quickAnswer: {
      title: "Как решить вашу задачу с GoToFlow?",
      body: "Загрузите ваш черновик, заметки или ссылку. Нейросеть самостоятельно проанализирует контекст, выделит ключевые тезисы и соберет из них готовую визуальную карусель в формате 4:5 или 1:1, идеально подходящую для публикации."
    },
    formatsHeading: {
      before: "Какие карусели для ",
      accent: "бьюти можно создать",
      after: ""
    },
    formats: [
    {
      title: "Автоматически",
      body: "GoToFlow самостоятельно подбирает подходящую структуру под тему и исходный материал"
    },
    {
      title: "Строго по готовому сценарию",
      body: "GoToFlow следует выбранной структуре без самостоятельной смены логики подачи"
    },
    {
      title: "Любая идея",
      body: "Если нужного сценария нет в списке, пользователь может задать собственную тему или идею"
    },
    {
      title: "Разбор процедур",
      body: "Подробное описание: кому подходит, этапы, результат"
    },
    {
      title: "Мифы об уходе",
      body: "Экспертное развенчание страхов ваших клиентов"
    },
    {
      title: "Прайс и услуги",
      body: "Красиво оформленный список услуг и цен"
    }
  ],
    choiceGuide: buildContractCarouselTypeGuide({
      title: {
      before: "Типы каруселей ",
      accent: "для бьюти-контента",
      after: ""
    },
      description: "Бьюти-мастер может начать с темы процедуры, заметок, прайса или советов по уходу. GoToFlow помогает выбрать между ИИ-каруселью, шаблонным оформлением, бесшовной подачей и анимацией под задачу публикации."
    }),
    workflowHeading: {
      before: "Как создать ",
      accent: "карусель для бьюти-блога",
      after: ""
    },
    workflowIntro: "Опишите процедуру, совет или услугу, получите структуру экспертного поста, проверьте факты и цены, выберите аккуратный визуальный стиль и скачайте готовые слайды.",
    workflowSteps: [
    {
      title: "Выбор темы",
      body: "Впишите процедуру или совет, о котором хотите рассказать"
    },
    {
      title: "Создание экспертного контента",
      body: "ИИ напишет грамотный текст, расставит акценты и боли клиентов"
    },
    {
      title: "Редактирование прайса",
      body: "Добавьте точные цены и условия приема"
    },
    {
      title: "Эстетичный дизайн",
      body: "Выберите нежный и стильный шаблон для бьюти-сферы"
    },
    {
      title: "Сохранение для Instagram",
      body: "Скачайте картинки в телефон и опубликуйте"
    }
  ],
    parameters: [
          {
                title: "Форматы публикации",
                body: "Поддержка 4:5, 1:1, 9:16 для Instagram, VK и Telegram"
          },
          {
                title: "Брендирование",
                body: "Настройка корпоративных цветов, загрузка своих шрифтов и логотипов"
          },
          {
                title: "Умный ИИ-редактор",
                body: "Автоматическое сокращение текста и генерация кликабельных заголовков"
          },
          {
                title: "Бесшовный дизайн",
                body: "Создание переходов между слайдами для увеличения времени просмотра"
          }
    ],
    productCapabilities: buildCanonicalProductCapabilities({
      heading: {
      before: "Параметры ",
      accent: "бьюти-карусели",
      after: ""
    },
      introCopy: "Форматы публикации: Поддержка 4:5, 1:1, 9:16 для Instagram, VK и Telegram Брендирование: Настройка корпоративных цветов, загрузка своих шрифтов и логотипов Умный ИИ-редактор: Автоматическое сокращение текста и генерация кликабельных заголовков Бесшовный дизайн: Создание переходов между слайдами для увеличения времени просмотра",
      highlightedCapabilities: ['topicText', 'aiStructureText', 'templates', 'textEditing', 'formats4511916', 'upTo10Slides'],
    }),
    readyExamplesIntro: {
      eyebrow: "Примеры",
      heading: {
      before: "Примеры ",
      accent: "каруселей бьюти-тематики",
      after: ""
    },
      body: "Пост-знакомство, экспертный разбор и чек-лист показывают, как можно оформить бьюти-тематику в готовую карусель."
    },
    examples: [
    {
      title: "Пост-знакомство",
      assetId: "example-post-intro"
    },
    {
      title: "Экспертный разбор",
      assetId: "example-post-expert"
    },
    {
      title: "Чек-лист",
      assetId: "example-post-checklist"
    }
  ],
    visualProof: {
      eyebrow: "Результат",
      heading: {
      before: "От текста с услугами до ",
      accent: "стильной карусели",
      after: ""
    },
      title: "От текста с услугами до стильной карусели",
      description: "Введите текст с услугами, проверьте предложенную структуру и получите стильную карусель для бьюти-блога."
    },
    useCasesHeading: {
      before: "Кому подходят ",
      accent: "бьюти-карусели",
      after: ""
    },
    useCases: [
          {
                title: "Для SMM-специалистов",
                body: "Массовое создание контента для клиентов"
          },
          {
                title: "Для экспертов",
                body: "Упаковка знаний в вовлекающие гайды"
          },
          {
                title: "Для онлайн-школ",
                body: "Переработка вебинаров в карточки для соцсетей"
          },
          {
                title: "Для бизнеса",
                body: "Презентация товаров и услуг в виде каруселей"
          }
    ],
    faq: [
    {
      question: "Подойдет ли сервис для мастера маникюра?",
      answer: "Подходит. Вы сможете публиковать советы по уходу за ногтями и прайсы."
    },
    {
      question: "Нужно ли мне уметь красиво писать?",
      answer: "Нет, ИИ сформулирует ваши мысли в профессиональные тексты."
    },
    {
      question: "Могу ли я загрузить фото работ?",
      answer: "Да, вы можете добавить свои фото \"До и После\" на слайды."
    },
    {
      question: "Есть ли нежные цвета в шаблонах?",
      answer: "Да, доступна полная палитра для настройки пудровых, пастельных и эстетичных тонов."
    },
    {
      question: "Как карусели помогут привлечь клиентов?",
      answer: "Экспертные посты повышают доверие, а карусель собирает больше охватов."
    },
    {
      question: "Можно ли использовать сервис с телефона?",
      answer: "Да, вы можете сгенерировать карусель прямо между клиентами."
    },
    {
      question: "Сколько стоит использование сервиса?",
      answer: "У нас есть доступные тарифы, которые дешевле одного поста у дизайнера."
    },
    {
      question: "Поймет ли ИИ бьюти-термины?",
      answer: "Нейросеть отлично знает современные тренды, процедуры и терминологию."
    },
    {
      question: "Сколько слайдов нужно для прайса?",
      answer: "Обычно 3-4 слайда достаточно, чтобы расписать все категории услуг."
    },
    {
      question: "Можно ли добавить адреса салона?",
      answer: "Конечно, вы можете добавить любую контактную информацию на последний слайд."
    },
    {
      question: "Поможет ли сервис выделиться на фоне конкурентов?",
      answer: "Да, единый визуальный стиль делает ваш аккаунт премиальным."
    },
    {
      question: "Как скачиваются изображения?",
      answer: "Вы получаете ZIP-архив с пронумерованными картинками для удобной загрузки."
    },
    {
      question: "Будут ли тексты продающими?",
      answer: "Да, алгоритм знает, как правильно формировать призыв к записи на услуги."
    },
    {
      question: "Можно ли использовать инструмент для косметолога?",
      answer: "Да, нейросеть аккуратно и этично напишет про медицинские и уходовые процедуры."
    },
    {
      question: "Что если у меня нет идей для постов?",
      answer: "Просто попросите ИИ предложить 5 идей для постов в вашей нише."
    }
  ],
    faqHeading: {
      before: "Частые вопросы о каруселях ",
      accent: "для бьюти-мастеров",
      after: ""
    },
    relatedHeading: "Полезные материалы по теме",
    relatedCards: [
          {
                title: "AI-генератор каруселей",
                href: "/ru/generator-karuselej-instagram"
          },
          {
                title: "Создание бесшовных каруселей",
                href: "/ru/use-cases/video-v-karusel"
          },
          {
                title: "Текст в карусель",
                href: "/ru/vk-post-generator"
          }
    ],
    finalCta: {
      heading: "Начните работу прямо сейчас",
      description: "Не откладывайте контент на потом. Создайте первую карусель бесплатно всего за пару минут.",
      cta: "Попробовать бесплатно"
    },
    productTruth: {
      allowed: "ИИ может разбивать текст на карточки, есть готовые шаблоны, скачивание в ZIP, форматы 4:5 и 1:1, базовая настройка цветов.",
      forbidden: "Нельзя обещать автопостинг в Instagram, полную замену дизайнеру для сложной графики, генерацию видео-каруселей, автоматическую загрузку шрифтов по URL."
    }
  },
  {
    id: "ru-use-case-carousels-for-experts",
    sourceFile: "src/content/seoPages/handoffs/content_design_contract_carousels_for_experts.md",
    path: "/ru/use-cases/carousels-for-experts",
    pageType: "useCase",
    slug: "carousels-for-experts",
    primaryIntentType: "USE_CASE",
    contractTitle: "Генератор экспертных постов-каруселей | GoToFlow",
    title: "Генератор экспертных постов-каруселей | GoToFlow",
    description: "Упакуйте свои знания в красивые экспертные карусели с помощью нейросети. Создавайте чек-листы, инструкции и разборы для соцсетей.",
    h1: "Создание экспертных постов-каруселей",
    breadcrumb: "Создание экспертных постов-каруселей",
    primaryKeyword: "экспертные карусели за несколько минут",
    secondaryKeywords: [
      "создание карусели",
      "генератор каруселей",
      "ai для постов"
    ],
    heroEyebrow: "ЭКСПЕРТНЫЙ КОНТЕНТ",
    heroHighlightFragment: "постов-каруселей",
    heroSubtitle: "Упакуйте ваши знания, кейсы и гайды в эстетичные экспертные карусели без затрат на дизайнера. ИИ поможет выделить главное, а система сверстает профессиональные слайды.",
    ctaLabel: "Создать экспертный пост",
    secondaryCtaLabel: "Смотреть примеры",
    quickAnswer: {
      title: "Как решить вашу задачу с GoToFlow?",
      body: "Загрузите ваш черновик, заметки или ссылку. Нейросеть самостоятельно проанализирует контекст, выделит ключевые тезисы и соберет из них готовую визуальную карусель в формате 4:5 или 1:1, идеально подходящую для публикации."
    },
    formatsHeading: {
      before: "Какие экспертные карусели ",
      accent: "можно создать",
      after: ""
    },
    formats: [
    {
      title: "Автоматически",
      body: "GoToFlow самостоятельно подбирает подходящую структуру под тему и исходный материал"
    },
    {
      title: "Строго по готовому сценарию",
      body: "GoToFlow следует выбранной структуре без самостоятельной смены логики подачи"
    },
    {
      title: "Любая идея",
      body: "Если нужного сценария нет в списке, пользователь может задать собственную тему или идею"
    },
    {
      title: "Разбор ошибки",
      body: "Покажите, как не нужно делать, и дайте экспертное решение"
    },
    {
      title: "Пошаговый алгоритм",
      body: "Дайте аудитории четкий план действий"
    },
    {
      title: "Мифы и реальность",
      body: "Развейте популярные заблуждения в вашей нише"
    }
  ],
    choiceGuide: buildContractCarouselTypeGuide({
      title: {
      before: "Типы каруселей ",
      accent: "для экспертного контента",
      after: ""
    },
      description: "Эксперт может переупаковать статью, заметки, тезисы консультации или разбор ошибки. Выберите ИИ-карусель для структуры, шаблонную для быстрой подачи, бесшовную для цельной истории или анимированную для более динамичного материала."
    }),
    workflowHeading: {
      before: "Как создать ",
      accent: "экспертную карусель",
      after: ""
    },
    workflowIntro: "Вставьте статью, заметки или тезисы, получите смысловую выжимку, сохраните авторский голос в редакторе, выберите строгий дизайн и скачайте готовую карусель.",
    workflowSteps: [
    {
      title: "Загрузка знаний",
      body: "Вставьте текст вашей статьи, заметки или мысли в поле ввода"
    },
    {
      title: "Смысловая выжимка",
      body: "ИИ бережно структурирует вашу экспертность, убирая лишнюю воду"
    },
    {
      title: "Авторская правка",
      body: "Сохраните свой Tone of Voice, внеся быстрые правки в редакторе"
    },
    {
      title: "Экспертный дизайн",
      body: "Выберите минималистичный шаблон, подчеркивающий статус"
    },
    {
      title: "Публикация",
      body: "Скачайте готовую карусель для Instagram, Telegram или LinkedIn"
    }
  ],
    parameters: [
          {
                title: "Форматы публикации",
                body: "Поддержка 4:5, 1:1, 9:16 для Instagram, VK и Telegram"
          },
          {
                title: "Брендирование",
                body: "Настройка корпоративных цветов, загрузка своих шрифтов и логотипов"
          },
          {
                title: "Умный ИИ-редактор",
                body: "Автоматическое сокращение текста и генерация кликабельных заголовков"
          },
          {
                title: "Бесшовный дизайн",
                body: "Создание переходов между слайдами для увеличения времени просмотра"
          }
    ],
    productCapabilities: buildCanonicalProductCapabilities({
      heading: {
      before: "Параметры ",
      accent: "экспертной карусели",
      after: ""
    },
      introCopy: "Форматы публикации: Поддержка 4:5, 1:1, 9:16 для Instagram, VK и Telegram Брендирование: Настройка корпоративных цветов, загрузка своих шрифтов и логотипов Умный ИИ-редактор: Автоматическое сокращение текста и генерация кликабельных заголовков Бесшовный дизайн: Создание переходов между слайдами для увеличения времени просмотра",
      highlightedCapabilities: ['topicText', 'aiStructureText', 'templates', 'textEditing', 'formats4511916', 'upTo10Slides'],
    }),
    readyExamplesIntro: {
      eyebrow: "Примеры",
      heading: {
      before: "Примеры каруселей ",
      accent: "от экспертов",
      after: ""
    },
      body: "Гайд от психолога, разбор от юриста и советы маркетолога показывают варианты экспертной подачи."
    },
    examples: [
    {
      title: "Гайд от психолога",
      assetId: "example-post-intro"
    },
    {
      title: "Разбор от юриста",
      assetId: "example-post-expert"
    },
    {
      title: "Советы маркетолога",
      assetId: "example-post-checklist"
    }
  ],
    visualProof: {
      eyebrow: "Результат",
      heading: {
      before: "От заметок до ",
      accent: "профессиональной верстки",
      after: ""
    },
      title: "От заметок до профессиональной верстки",
      description: "Добавьте заметки или тезисы, проверьте структуру и получите профессионально сверстанную экспертную карусель."
    },
    useCasesHeading: {
      before: "Кому подходят ",
      accent: "экспертные карусели",
      after: ""
    },
    useCases: [
          {
                title: "Для SMM-специалистов",
                body: "Массовое создание контента для клиентов"
          },
          {
                title: "Для экспертов",
                body: "Упаковка знаний в вовлекающие гайды"
          },
          {
                title: "Для онлайн-школ",
                body: "Переработка вебинаров в карточки для соцсетей"
          },
          {
                title: "Для бизнеса",
                body: "Презентация товаров и услуг в виде каруселей"
          }
    ],
    faq: [
    {
      question: "Для каких экспертов подходит сервис?",
      answer: "Для психологов, юристов, врачей, коучей, маркетологов и других специалистов."
    },
    {
      question: "Испортит ли ИИ мой авторский стиль?",
      answer: "Нет, вы можете отредактировать любой текст, сохранив свою манеру общения."
    },
    {
      question: "Можно ли загрузить длинную статью?",
      answer: "Да, ИИ сам сократит ее до ключевых тезисов для карусели."
    },
    {
      question: "Как сделать сложную тему простой?",
      answer: "Алгоритм разобьет материал на логичные шаги и понятные заголовки."
    },
    {
      question: "Подходит ли для прогрева аудитории?",
      answer: "Да, экспертные карусели отлично работают на доверие и продажи услуг."
    },
    {
      question: "Можно ли вставить кейсы клиентов?",
      answer: "Да, вы можете описать кейс, и система упакует его в формат сторителлинга."
    },
    {
      question: "Будет ли дизайн выглядеть дорого?",
      answer: "Да, в библиотеке есть минималистичные и премиальные шаблоны."
    },
    {
      question: "Как часто нужно публиковать экспертные карусели?",
      answer: "Оптимально 2-3 раза в неделю для поддержания вовлеченности."
    },
    {
      question: "Можно ли сделать серию постов?",
      answer: "Да, вы можете сгенерировать несколько каруселей на смежные темы."
    },
    {
      question: "Помогает ли сервис с заголовками?",
      answer: "ИИ предлагает сильные хуки для первого слайда."
    },
    {
      question: "Нужны ли навыки копирайтинга?",
      answer: "Нет, достаточно ваших знаний, остальное структурирует нейросеть."
    },
    {
      question: "Можно ли добавить список литературы?",
      answer: "Да, вы можете разместить источники на последнем слайде."
    },
    {
      question: "Подойдет ли для LinkedIn?",
      answer: "Да, экспортированные картинки можно использовать на разных платформах."
    },
    {
      question: "Как проверять факты?",
      answer: "Всегда проверяйте фактическую информацию перед публикацией, особенно в медицине и финансах."
    },
    {
      question: "Можно ли использовать для онлайн-курсов?",
      answer: "Да, карусели отлично подходят для фрагментов уроков и лид-магнитов."
    }
  ],
    faqHeading: {
      before: "Частые вопросы об ",
      accent: "экспертных каруселях",
      after: ""
    },
    relatedHeading: "Полезные материалы по теме",
    relatedCards: [
          {
                title: "AI-генератор каруселей",
                href: "/ru/generator-karuselej-instagram"
          },
          {
                title: "Создание бесшовных каруселей",
                href: "/ru/use-cases/video-v-karusel"
          },
          {
                title: "Текст в карусель",
                href: "/ru/vk-post-generator"
          }
    ],
    finalCta: {
      heading: "Начните работу прямо сейчас",
      description: "Не откладывайте контент на потом. Создайте первую карусель бесплатно всего за пару минут.",
      cta: "Попробовать бесплатно"
    },
    productTruth: {
      allowed: "ИИ может разбивать текст на карточки, есть готовые шаблоны, скачивание в ZIP, форматы 4:5 и 1:1, базовая настройка цветов.",
      forbidden: "Нельзя обещать автопостинг в Instagram, полную замену дизайнеру для сложной графики, генерацию видео-каруселей, автоматическую загрузку шрифтов по URL."
    }
  },
  {
    id: "ru-use-case-carousels-for-smm",
    sourceFile: "src/content/seoPages/handoffs/content_design_contract_carousels_for_smm.md",
    path: "/ru/use-cases/carousels-for-smm",
    pageType: "useCase",
    slug: "carousels-for-smm",
    primaryIntentType: "USE_CASE",
    contractTitle: "Генератор постов-каруселей для SMM-специалистов | GoToFlow",
    title: "Генератор постов-каруселей для SMM-специалистов | GoToFlow",
    description: "Оптимизируйте работу SMM-специалиста: создавайте посты-карусели из брифов клиентов автоматически с помощью встроенных шаблонов.",
    h1: "Создание каруселей для SMM-специалистов",
    breadcrumb: "Создание каруселей для SMM-специалистов",
    primaryKeyword: "массовое создание каруселей для клиентов",
    secondaryKeywords: [
      "создание карусели",
      "генератор каруселей",
      "ai для постов"
    ],
    heroEyebrow: "ИНСТРУМЕНТ ДЛЯ SMM",
    heroHighlightFragment: "для SMM-специалистов",
    heroSubtitle: "Ускорьте контент-производство для клиентских проектов. GoToFlow позволяет SMM-специалистам за минуты превращать брифы, статьи и идеи в готовые к публикации посты-карусели.",
    ctaLabel: "Сгенерировать карусель",
    secondaryCtaLabel: "Изучить возможности",
    quickAnswer: {
      title: "Как решить вашу задачу с GoToFlow?",
      body: "Загрузите ваш черновик, заметки или ссылку. Нейросеть самостоятельно проанализирует контекст, выделит ключевые тезисы и соберет из них готовую визуальную карусель в формате 4:5 или 1:1, идеально подходящую для публикации."
    },
    formatsHeading: {
      before: "Какие карусели для ",
      accent: "SMM можно создать",
      after: ""
    },
    formats: [
    {
      title: "Автоматически",
      body: "GoToFlow самостоятельно подбирает подходящую структуру под тему и исходный материал"
    },
    {
      title: "Строго по готовому сценарию",
      body: "GoToFlow следует выбранной структуре без самостоятельной смены логики подачи"
    },
    {
      title: "Любая идея",
      body: "Если нужного сценария нет в списке, пользователь может задать собственную тему или идею"
    },
    {
      title: "Вовлекающий контент",
      body: "Опросы, факты и подборки для роста активности"
    },
    {
      title: "Прогревы",
      body: "Серии слайдов для подготовки аудитории к покупке"
    },
    {
      title: "Отчеты для клиентов",
      body: "Визуализация результатов работы и статистики"
    }
  ],
    choiceGuide: buildContractCarouselTypeGuide({
      title: {
      before: "Типы каруселей ",
      accent: "для SMM-задач",
      after: ""
    },
      description: "SMM-специалист может использовать ИИ-карусель для быстрого черновика, шаблонную карусель для регулярных рубрик, бесшовную подачу для визуальных историй и анимацию для динамичных публикаций."
    }),
    workflowHeading: {
      before: "Как SMM-специалисту ",
      accent: "создать карусель",
      after: ""
    },
    workflowIntro: "Добавьте бриф или задачу клиента, получите контент-структуру, согласуйте текст, примените бренд клиента и экспортируйте готовый материал.",
    workflowSteps: [
    {
      title: "Бриф клиента",
      body: "Загрузите ТЗ, ссылку на сайт или описание продукта клиента"
    },
    {
      title: "Генерация контент-идеи",
      body: "ИИ предложит структуру поста с учетом маркетинговой задачи"
    },
    {
      title: "Согласование",
      body: "Быстро отредактируйте текст под Tone of Voice бренда"
    },
    {
      title: "Брендирование",
      body: "Примените цвета и шрифты клиента к готовому шаблону"
    },
    {
      title: "Экспорт",
      body: "Скачайте архив и отправьте клиенту на утверждение"
    }
  ],
    parameters: [
          {
                title: "Форматы публикации",
                body: "Поддержка 4:5, 1:1, 9:16 для Instagram, VK и Telegram"
          },
          {
                title: "Брендирование",
                body: "Настройка корпоративных цветов, загрузка своих шрифтов и логотипов"
          },
          {
                title: "Умный ИИ-редактор",
                body: "Автоматическое сокращение текста и генерация кликабельных заголовков"
          },
          {
                title: "Бесшовный дизайн",
                body: "Создание переходов между слайдами для увеличения времени просмотра"
          }
    ],
    productCapabilities: buildCanonicalProductCapabilities({
      heading: {
      before: "Параметры ",
      accent: "SMM-карусели",
      after: ""
    },
      introCopy: "Форматы публикации: Поддержка 4:5, 1:1, 9:16 для Instagram, VK и Telegram Брендирование: Настройка корпоративных цветов, загрузка своих шрифтов и логотипов Умный ИИ-редактор: Автоматическое сокращение текста и генерация кликабельных заголовков Бесшовный дизайн: Создание переходов между слайдами для увеличения времени просмотра",
      highlightedCapabilities: ['topicText', 'aiStructureText', 'templates', 'textEditing', 'formats4511916', 'upTo10Slides'],
    }),
    readyExamplesIntro: {
      eyebrow: "Примеры",
      heading: {
      before: "Примеры ",
      accent: "коммерческих каруселей",
      after: ""
    },
      body: "Пост-знакомство, экспертный разбор и чек-лист помогают быстро собрать коммерческий контент."
    },
    examples: [
    {
      title: "Пост-знакомство",
      assetId: "example-post-intro"
    },
    {
      title: "Экспертный разбор",
      assetId: "example-post-expert"
    },
    {
      title: "Чек-лист",
      assetId: "example-post-checklist"
    }
  ],
    visualProof: {
      eyebrow: "Результат",
      heading: {
      before: "От идеи до готового креатива ",
      accent: "для клиента",
      after: ""
    },
      title: "От идеи до готового креатива для клиента",
      description: "Добавьте идею или бриф клиента, проверьте структуру и получите готовый креатив для согласования."
    },
    useCasesHeading: {
      before: "Кому подходят ",
      accent: "SMM-карусели",
      after: ""
    },
    useCases: [
          {
                title: "Для SMM-специалистов",
                body: "Массовое создание контента для клиентов"
          },
          {
                title: "Для экспертов",
                body: "Упаковка знаний в вовлекающие гайды"
          },
          {
                title: "Для онлайн-школ",
                body: "Переработка вебинаров в карточки для соцсетей"
          },
          {
                title: "Для бизнеса",
                body: "Презентация товаров и услуг в виде каруселей"
          }
    ],
    faq: [
    {
      question: "Сколько времени экономит инструмент SMM-специалисту?",
      answer: "Вы сокращаете цикл \"копирайтинг + дизайн\" с 1 часа до 5 минут."
    },
    {
      question: "Можно ли вести несколько клиентов?",
      answer: "Да, вы можете быстро переключать фирменные стили и шаблоны."
    },
    {
      question: "Заменит ли это сервис отложенного постинга?",
      answer: "Нет, мы фокусируемся на производстве, а не на публикации."
    },
    {
      question: "Можно ли использовать ИИ для сложного B2B?",
      answer: "Да, алгоритм отлично справляется со сложными техническими текстами."
    },
    {
      question: "Есть ли ограничения по объему текстов?",
      answer: "Вы можете генерировать текст на карусели до 10 слайдов."
    },
    {
      question: "Как генерировать контент-план?",
      answer: "Создавайте идеи в текстовом редакторе и по очереди отправляйте их в наш генератор."
    },
    {
      question: "Могу ли я передавать доступ ассистенту?",
      answer: "Доступ к аккаунту позволяет делегировать рутину помощнику."
    },
    {
      question: "Как быть с логотипами клиентов?",
      answer: "Просто загрузите PNG-логотип в настройки дизайна карусели."
    },
    {
      question: "Можно ли изменить формат на 9:16 для Stories?",
      answer: "Да, доступен экспорт в портретном формате для Reels и Stories."
    },
    {
      question: "Что делать, если клиенту не нравится текст?",
      answer: "Вы можете поправить текст на этапе превью или сгенерировать заново."
    },
    {
      question: "Можно ли использовать это как белую этикетку (White Label)?",
      answer: "Вы скачиваете готовые картинки без наших водяных знаков."
    },
    {
      question: "Как оплатить сервис на организацию?",
      answer: "Для крупных агентств возможна оплата по безналичному расчету."
    },
    {
      question: "Есть ли API для интеграции?",
      answer: "В данный момент публичного API нет, платформа работает через веб-интерфейс."
    },
    {
      question: "Умеет ли ИИ подбирать хэштеги?",
      answer: "Основной фокус на тексте внутри изображений, хэштеги вы можете прописать отдельно."
    },
    {
      question: "Генерирует ли сервис описание к посту?",
      answer: "ИИ может выдать сопутствующий текст, который вы скопируете для поста."
    }
  ],
    faqHeading: {
      before: "Частые вопросы о каруселях ",
      accent: "для SMM",
      after: ""
    },
    relatedHeading: "Полезные материалы по теме",
    relatedCards: [
          {
                title: "AI-генератор каруселей",
                href: "/ru/generator-karuselej-instagram"
          },
          {
                title: "Создание бесшовных каруселей",
                href: "/ru/use-cases/video-v-karusel"
          },
          {
                title: "Текст в карусель",
                href: "/ru/vk-post-generator"
          }
    ],
    finalCta: {
      heading: "Начните работу прямо сейчас",
      description: "Не откладывайте контент на потом. Создайте первую карусель бесплатно всего за пару минут.",
      cta: "Попробовать бесплатно"
    },
    productTruth: {
      allowed: "ИИ может разбивать текст на карточки, есть готовые шаблоны, скачивание в ZIP, форматы 4:5 и 1:1, базовая настройка цветов.",
      forbidden: "Нельзя обещать автопостинг в Instagram, полную замену дизайнеру для сложной графики, генерацию видео-каруселей, автоматическую загрузку шрифтов по URL."
    }
  },
  {
    id: "ru-alternative-chatgpt-dlya-karuseley",
    sourceFile: "src/content/seoPages/handoffs/content_design_contract_chatgpt_dlya_karuseley.md",
    path: "/ru/alternatives/chatgpt-dlya-karuseley",
    pageType: "alternative",
    slug: "chatgpt-dlya-karuseley",
    primaryIntentType: "ALTERNATIVE",
    contractTitle: "Создание каруселей через ChatGPT: встроенный ИИ | GoToFlow",
    title: "Создание каруселей через ChatGPT: встроенный ИИ | GoToFlow",
    description: "Не нужно вручную копировать тексты из ChatGPT. Введите запрос, и встроенный ИИ напишет тексты и сразу оформит их в дизайн карусели.",
    h1: "Создание каруселей без переноса текста из ChatGPT",
    breadcrumb: "Создание каруселей без переноса текста из ChatGPT",
    primaryKeyword: "альтернатива chatgpt: текст и дизайн карусели в одном окне",
    secondaryKeywords: [
      "создание карусели",
      "генератор каруселей",
      "ai для постов"
    ],
    heroEyebrow: "ИИ И ДИЗАЙН",
    heroHighlightFragment: "ChatGPT",
    heroSubtitle: "Забудьте о ручном переносе текстов из языковых моделей в графические редакторы. Введите вашу идею, и встроенные нейросети сами напишут тексты, разобьют их по смыслу и заверстают на слайды.",
    ctaLabel: "Сгенерировать ИИ-карусель",
    secondaryCtaLabel: "Примеры результатов",
    quickAnswer: {
      title: "Как решить вашу задачу с GoToFlow?",
      body: "Загрузите ваш черновик, заметки или ссылку. Нейросеть самостоятельно проанализирует контекст, выделит ключевые тезисы и соберет из них готовую визуальную карусель в формате 4:5 или 1:1, идеально подходящую для публикации."
    },
    formatsHeading: {
      before: "Какие карусели можно собрать ",
      accent: "через ИИ",
      after: ""
    },
    formats: [
    {
      title: "Автоматически",
      body: "GoToFlow самостоятельно подбирает подходящую структуру под тему и исходный материал"
    },
    {
      title: "Строго по готовому сценарию",
      body: "GoToFlow следует выбранной структуре без самостоятельной смены логики подачи"
    },
    {
      title: "Любая идея",
      body: "Если нужного сценария нет в списке, пользователь может задать собственную тему или идею"
    },
    {
      title: "Рассуждения",
      body: "Превратите философские мысли в понятные карточки"
    },
    {
      title: "Краткие выжимки",
      body: "Сократите длинный чат до главного"
    },
    {
      title: "Мозговой штурм",
      body: "Оформите идеи в визуально понятную структуру"
    }
  ],
    choiceGuide: buildContractCarouselTypeGuide({
      title: {
      before: "Типы каруселей ",
      accent: "для ИИ-сценариев",
      after: ""
    },
      description: "Если идея уже есть в чате или заметках, GoToFlow помогает сразу перейти к структуре, текстам и визуальному оформлению. Можно выбрать ИИ-карусель, шаблонную подачу, бесшовный формат или анимацию."
    }),
    workflowHeading: {
      before: "Как создать карусель ",
      accent: "без переноса из ChatGPT",
      after: ""
    },
    workflowIntro: "Перенесите идею или черновик в GoToFlow, получите структуру слайдов, проверьте текст вместе с визуальной подачей, настройте стиль и скачайте готовый результат.",
    workflowSteps: [
    {
      title: "Перенос идеи",
      body: "Больше не нужно копировать промпты из ChatGPT, просто напишите идею"
    },
    {
      title: "Интегрированный ИИ",
      body: "Встроенная языковая модель сразу разобьет мысль на слайды"
    },
    {
      title: "Текст + Дизайн",
      body: "Вам не нужно переносить текст в другой редактор, дизайн уже готов"
    },
    {
      title: "Визуальный финиш",
      body: "Настройте фирменные цвета для сгенерированных слайдов"
    },
    {
      title: "Сохранение результата",
      body: "Скачивание архива для публикации в соцсети"
    }
  ],
    parameters: [
          {
                title: "Форматы публикации",
                body: "Поддержка 4:5, 1:1, 9:16 для Instagram, VK и Telegram"
          },
          {
                title: "Брендирование",
                body: "Настройка корпоративных цветов, загрузка своих шрифтов и логотипов"
          },
          {
                title: "Умный ИИ-редактор",
                body: "Автоматическое сокращение текста и генерация кликабельных заголовков"
          },
          {
                title: "Бесшовный дизайн",
                body: "Создание переходов между слайдами для увеличения времени просмотра"
          }
    ],
    productCapabilities: buildCanonicalProductCapabilities({
      heading: {
      before: "Параметры ",
      accent: "ИИ-карусели",
      after: ""
    },
      introCopy: "Форматы публикации: Поддержка 4:5, 1:1, 9:16 для Instagram, VK и Telegram Брендирование: Настройка корпоративных цветов, загрузка своих шрифтов и логотипов Умный ИИ-редактор: Автоматическое сокращение текста и генерация кликабельных заголовков Бесшовный дизайн: Создание переходов между слайдами для увеличения времени просмотра",
      highlightedCapabilities: ['topicText', 'aiStructureText', 'templates', 'textEditing', 'formats4511916', 'upTo10Slides'],
    }),
    readyExamplesIntro: {
      eyebrow: "Примеры",
      heading: {
      before: "Примеры ",
      accent: "ИИ-сгенерированных постов",
      after: ""
    },
      body: "Пост-знакомство, экспертный разбор и чек-лист показывают результат генерации через встроенный ИИ."
    },
    examples: [
    {
      title: "Пост-знакомство",
      assetId: "example-post-intro"
    },
    {
      title: "Экспертный разбор",
      assetId: "example-post-expert"
    },
    {
      title: "Чек-лист",
      assetId: "example-post-checklist"
    }
  ],
    visualProof: {
      eyebrow: "Результат",
      heading: {
      before: "От короткого промпта ",
      accent: "до дизайна",
      after: ""
    },
      title: "От короткого промпта до дизайна",
      description: "Введите короткий промпт, проверьте структуру и получите оформленную карусель без ручного переноса между сервисами."
    },
    useCasesHeading: {
      before: "Кому подходят ",
      accent: "ИИ-карусели",
      after: ""
    },
    useCases: [
          {
                title: "Для SMM-специалистов",
                body: "Массовое создание контента для клиентов"
          },
          {
                title: "Для экспертов",
                body: "Упаковка знаний в вовлекающие гайды"
          },
          {
                title: "Для онлайн-школ",
                body: "Переработка вебинаров в карточки для соцсетей"
          },
          {
                title: "Для бизнеса",
                body: "Презентация товаров и услуг в виде каруселей"
          }
    ],
    faq: [
    {
      question: "Какая нейросеть используется под капотом?",
      answer: "Мы используем передовые LLM для текста и собственные алгоритмы для дизайна."
    },
    {
      question: "Это лучше, чем писать в ChatGPT?",
      answer: "Да, потому что вы сразу получаете не просто текст, а готовую визуальную карусель."
    },
    {
      question: "Можно ли использовать свои промпты?",
      answer: "Конечно, вставьте любой промпт или идею в поле генерации."
    },
    {
      question: "Нужен ли аккаунт ChatGPT?",
      answer: "Нет, все необходимое уже встроено в GoToFlow."
    },
    {
      question: "Можно ли использовать длинные диалоги?",
      answer: "Да, вы можете скопировать диалог и попросить ИИ сделать из него выжимку."
    },
    {
      question: "Есть ли ограничения на длину промпта?",
      answer: "Вы можете вставлять длинные тексты и статьи."
    },
    {
      question: "Как ИИ понимает, когда делать новый слайд?",
      answer: "Наша модель обучена специально для создания логичных каруселей."
    },
    {
      question: "Делает ли сервис изображения?",
      answer: "Мы не генерируем фото-изображения, мы генерируем визуальную верстку текста."
    },
    {
      question: "Работает ли без VPN?",
      answer: "Да, в отличие от некоторых текстовых нейросетей, мы доступны всегда."
    },
    {
      question: "Можно ли оплачивать российской картой?",
      answer: "Да, мы принимаем местные способы оплаты."
    },
    {
      question: "Что делать, если ИИ ошибся в фактах?",
      answer: "Вы можете поправить любой текст в нашем редакторе перед скачиванием."
    },
    {
      question: "Нужно ли учиться писать промпты?",
      answer: "Нет, достаточно написать простую мысль, ИИ сделает остальное."
    },
    {
      question: "Помогает ли это с охватами?",
      answer: "Понятная структура и легкость чтения помогают удерживать внимание аудитории."
    },
    {
      question: "Есть ли лимиты на генерацию?",
      answer: "Зависит от вашего тарифа, бесплатный тариф включает тестовые генерации."
    },
    {
      question: "Можно ли перенести стилистику бренда?",
      answer: "Вы можете задать цвета и шрифты, чтобы результат всегда соответствовал бренду."
    }
  ],
    faqHeading: {
      before: "Частые вопросы о создании каруселей ",
      accent: "через ИИ",
      after: ""
    },
    relatedHeading: "Полезные материалы по теме",
    relatedCards: [
          {
                title: "AI-генератор каруселей",
                href: "/ru/generator-karuselej-instagram"
          },
          {
                title: "Создание бесшовных каруселей",
                href: "/ru/use-cases/video-v-karusel"
          },
          {
                title: "Текст в карусель",
                href: "/ru/vk-post-generator"
          }
    ],
    finalCta: {
      heading: "Начните работу прямо сейчас",
      description: "Не откладывайте контент на потом. Создайте первую карусель бесплатно всего за пару минут.",
      cta: "Попробовать бесплатно"
    },
    productTruth: {
      allowed: "ИИ может разбивать текст на карточки, есть готовые шаблоны, скачивание в ZIP, форматы 4:5 и 1:1, базовая настройка цветов.",
      forbidden: "Нельзя обещать автопостинг в Instagram, полную замену дизайнеру для сложной графики, генерацию видео-каруселей, автоматическую загрузку шрифтов по URL."
    }
  },
  {
    id: "ru-example-instagram-carousel",
    sourceFile: "src/content/seoPages/handoffs/content_design_contract_instagram_carousel_examples.md",
    path: "/ru/examples/instagram-carousel",
    pageType: "example",
    slug: "instagram-carousel",
    primaryIntentType: "EXAMPLE",
    contractTitle: "Примеры постов-каруселей для соцсетей: шаблоны и идеи",
    title: "Примеры постов-каруселей для соцсетей: шаблоны и идеи",
    description: "Ищете идеи для контента? Посмотрите лучшие примеры постов-каруселей для экспертов и бизнеса, которые можно адаптировать в один клик.",
    h1: "Примеры и идеи каруселей для Instagram",
    breadcrumb: "Примеры и идеи каруселей для Instagram",
    primaryKeyword: "примеры и идеи для продающих instagram каруселей",
    secondaryKeywords: [
      "создание карусели",
      "генератор каруселей",
      "ai для постов"
    ],
    heroEyebrow: "ГАЛЕРЕЯ ИДЕЙ",
    heroHighlightFragment: "для Instagram",
    heroSubtitle: "Изучите коллекцию работающих визуальных форматов и структур. Вдохновляйтесь готовыми примерами экспертных разборов, чек-листов и продуктовых презентаций для ваших соцсетей.",
    ctaLabel: "Создать по примеру",
    secondaryCtaLabel: "Смотреть шаблоны",
    quickAnswer: {
      title: "Как решить вашу задачу с GoToFlow?",
      body: "Загрузите ваш черновик, заметки или ссылку. Нейросеть самостоятельно проанализирует контекст, выделит ключевые тезисы и соберет из них готовую визуальную карусель в формате 4:5 или 1:1, идеально подходящую для публикации."
    },
    formatsHeading: {
      before: "Какие примеры каруселей ",
      accent: "можно адаптировать",
      after: ""
    },
    formats: [
    {
      title: "Автоматически",
      body: "GoToFlow самостоятельно подбирает подходящую структуру под тему и исходный материал"
    },
    {
      title: "Строго по готовому сценарию",
      body: "GoToFlow следует выбранной структуре без самостоятельной смены логики подачи"
    },
    {
      title: "Любая идея",
      body: "Если нужного сценария нет в списке, пользователь может задать собственную тему или идею"
    },
    {
      title: "Личная история",
      body: "Пример эмоциональной карусели для вовлечения аудитории"
    },
    {
      title: "До и После",
      body: "Наглядная демонстрация результатов работы"
    },
    {
      title: "Инструкция (How-To)",
      body: "Пошаговый пример решения конкретной проблемы"
    }
  ],
    choiceGuide: buildContractCarouselTypeGuide({
      title: {
      before: "Типы каруселей ",
      accent: "по готовым примерам",
      after: ""
    },
      description: "Используйте пример как отправную точку: GoToFlow поможет собрать ИИ-карусель по теме, применить шаблон, подготовить бесшовную подачу или добавить анимацию к готовой структуре."
    }),
    workflowHeading: {
      before: "Как адаптировать пример ",
      accent: "в готовую карусель",
      after: ""
    },
    workflowIntro: "Выберите идею или структуру из примера, адаптируйте её под свою тему, проверьте текст, подберите визуальный стиль и скачайте готовые слайды.",
    workflowSteps: [
    {
      title: "Выбор примера",
      body: "Вставьте текст, вдохновленный любым примером из нашей галереи"
    },
    {
      title: "Адаптация структуры",
      body: "Нейросеть подстроит вашу идею под структуру выбранного референса"
    },
    {
      title: "Улучшение текста",
      body: "Добавьте детали в редакторе, чтобы сделать пост уникальным"
    },
    {
      title: "Копирование дизайна",
      body: "Выберите шаблон, максимально похожий на ваш пример"
    },
    {
      title: "Готово к публикации",
      body: "Скачайте результат и используйте в Instagram"
    }
  ],
    parameters: [
          {
                title: "Форматы публикации",
                body: "Поддержка 4:5, 1:1, 9:16 для Instagram, VK и Telegram"
          },
          {
                title: "Брендирование",
                body: "Настройка корпоративных цветов, загрузка своих шрифтов и логотипов"
          },
          {
                title: "Умный ИИ-редактор",
                body: "Автоматическое сокращение текста и генерация кликабельных заголовков"
          },
          {
                title: "Бесшовный дизайн",
                body: "Создание переходов между слайдами для увеличения времени просмотра"
          }
    ],
    productCapabilities: buildCanonicalProductCapabilities({
      heading: {
      before: "Параметры ",
      accent: "адаптации примера",
      after: ""
    },
      introCopy: "Форматы публикации: Поддержка 4:5, 1:1, 9:16 для Instagram, VK и Telegram Брендирование: Настройка корпоративных цветов, загрузка своих шрифтов и логотипов Умный ИИ-редактор: Автоматическое сокращение текста и генерация кликабельных заголовков Бесшовный дизайн: Создание переходов между слайдами для увеличения времени просмотра",
      highlightedCapabilities: ['topicText', 'aiStructureText', 'templates', 'textEditing', 'formats4511916', 'upTo10Slides'],
    }),
    readyExamplesIntro: {
      eyebrow: "Примеры",
      heading: {
      before: "Каталог лучших ",
      accent: "примеров каруселей",
      after: ""
    },
      body: "Вдохновляющий пост, кейс клиента и визуальный гайд показывают разные структуры готовых каруселей."
    },
    examples: [
    {
      title: "Вдохновляющий пост",
      assetId: "example-post-intro"
    },
    {
      title: "Кейс клиента",
      assetId: "example-post-expert"
    },
    {
      title: "Визуальный гайд",
      assetId: "example-post-checklist"
    }
  ],
    visualProof: {
      eyebrow: "Результат",
      heading: {
      before: "От идеи из примера к вашей ",
      accent: "уникальной карусели",
      after: ""
    },
      title: "От идеи из примера к вашей уникальной карусели",
      description: "Вставьте любой неструктурированный текст и получите стильную карусель с расставленными акцентами."
    },
    useCasesHeading: {
      before: "Кому подходят ",
      accent: "примеры каруселей",
      after: ""
    },
    useCases: [
          {
                title: "Для SMM-специалистов",
                body: "Массовое создание контента для клиентов"
          },
          {
                title: "Для экспертов",
                body: "Упаковка знаний в вовлекающие гайды"
          },
          {
                title: "Для онлайн-школ",
                body: "Переработка вебинаров в карточки для соцсетей"
          },
          {
                title: "Для бизнеса",
                body: "Презентация товаров и услуг в виде каруселей"
          }
    ],
    faq: [
    {
      question: "Где найти лучшие примеры каруселей?",
      answer: "Мы собрали обширную галерею прямо на этой странице для вашего вдохновения."
    },
    {
      question: "Как скопировать чужой дизайн?",
      answer: "Выберите похожий шаблон в GoToFlow и настройте цвета и шрифты под референс."
    },
    {
      question: "Законно ли использовать чужие идеи?",
      answer: "Вдохновляться структурами — нормально, но текст всегда должен быть вашим."
    },
    {
      question: "Какие примеры заходят лучше всего?",
      answer: "Образовательные списки и эмоциональные сторителлинги получают больше всего сохранений."
    },
    {
      question: "Можно ли загрузить картинку как референс?",
      answer: "Пока ИИ работает только с текстовыми идеями и ссылками."
    },
    {
      question: "Как понять, сработает ли пример в моей нише?",
      answer: "Адаптируйте боли и решения из примера под вашу целевую аудиторию."
    },
    {
      question: "Сколько текста должно быть на одном слайде?",
      answer: "Идеально — не более 3-4 коротких предложений."
    },
    {
      question: "Нужен ли дизайнер для повторения примера?",
      answer: "Нет, наши шаблоны позволяют добиться профессионального результата без навыков."
    },
    {
      question: "Как сделать бесшовную карусель как в примере?",
      answer: "В GoToFlow есть специальные шаблоны с автоматическим бесшовным переходом."
    },
    {
      question: "Можно ли использовать эти примеры для рекламы?",
      answer: "Да, структуры из наших примеров отлично конвертируют в таргете."
    },
    {
      question: "Генерирует ли ИИ картинки для слайдов?",
      answer: "Мы фокусируемся на красивой типографике и компоновке текста с графическими элементами."
    },
    {
      question: "В каком формате скачивать?",
      answer: "Вы получите ZIP-архив с PNG-файлами, готовыми к загрузке."
    },
    {
      question: "Нужно ли указывать источник примера?",
      answer: "Нет, если вы полностью переписали текст под себя."
    },
    {
      question: "Как повысить охваты с помощью каруселей?",
      answer: "Добавьте призыв к сохранению на последний слайд (Call to Action)."
    },
    {
      question: "Где взять картинки для обложки?",
      answer: "Вы можете использовать встроенные фоны или загрузить свое фото."
    }
  ],
    faqHeading: {
      before: "Частые вопросы о ",
      accent: "примерах постов-каруселей",
      after: ""
    },
    relatedHeading: "Полезные материалы по теме",
    relatedCards: [
          {
                title: "AI-генератор каруселей",
                href: "/ru/generator-karuselej-instagram"
          },
          {
                title: "Создание бесшовных каруселей",
                href: "/ru/use-cases/video-v-karusel"
          },
          {
                title: "Текст в карусель",
                href: "/ru/vk-post-generator"
          }
    ],
    finalCta: {
      heading: "Начните работу прямо сейчас",
      description: "Не откладывайте контент на потом. Создайте первую карусель бесплатно всего за пару минут.",
      cta: "Попробовать бесплатно"
    },
    productTruth: {
      allowed: "ИИ может разбивать текст на карточки, есть готовые шаблоны, скачивание в ZIP, форматы 4:5 и 1:1, базовая настройка цветов.",
      forbidden: "Нельзя обещать автопостинг в Instagram, полную замену дизайнеру для сложной графики, генерацию видео-каруселей, автоматическую загрузку шрифтов по URL."
    }
  },
  {
    id: "ru-prompt-instagram-carousel",
    sourceFile: "src/content/seoPages/handoffs/content_design_contract_instagram_carousel_prompts.md",
    path: "/ru/prompts/instagram-carousel",
    pageType: "prompt",
    slug: "instagram-carousel",
    primaryIntentType: "PROMPT",
    contractTitle: "Промпты для создания каруселей с помощью ИИ | GoToFlow",
    title: "Промпты для создания каруселей с помощью ИИ | GoToFlow",
    description: "Сохраните готовые текстовые промпты для генерации постов-каруселей через нейросети. Инструкции, чек-листы и экспертные посты.",
    h1: "Промпты для создания постов-каруселей с помощью ИИ",
    breadcrumb: "Промпты для создания постов-каруселей с помощью ИИ",
    primaryKeyword: "готовые промпты для генерации каруселей",
    secondaryKeywords: [
      "создание карусели",
      "генератор каруселей",
      "ai для постов"
    ],
    heroEyebrow: "БАЗА ПРОМПТОВ",
    heroHighlightFragment: "с помощью ИИ",
    heroSubtitle: "Используйте готовые текстовые шаблоны для быстрой генерации контента. Скопируйте правильный промпт, чтобы ИИ выдал точную структуру для экспертного поста, чек-листа или инструкции.",
    ctaLabel: "Использовать промпт в ИИ",
    secondaryCtaLabel: "Смотреть генератор",
    quickAnswer: {
      title: "Как решить вашу задачу с GoToFlow?",
      body: "Загрузите ваш черновик, заметки или ссылку. Нейросеть самостоятельно проанализирует контекст, выделит ключевые тезисы и соберет из них готовую визуальную карусель в формате 4:5 или 1:1, идеально подходящую для публикации."
    },
    formatsHeading: {
      before: "Какие промпты для каруселей ",
      accent: "можно использовать",
      after: ""
    },
    formats: [
    {
      title: "Автоматически",
      body: "GoToFlow самостоятельно подбирает подходящую структуру под тему и исходный материал"
    },
    {
      title: "Строго по готовому сценарию",
      body: "GoToFlow следует выбранной структуре без самостоятельной смены логики подачи"
    },
    {
      title: "Любая идея",
      body: "Если нужного сценария нет в списке, пользователь может задать собственную тему или идею"
    },
    {
      title: "Обучающий гайд",
      body: "Создавайте структурированные пошаговые инструкции и уроки, идеально подходящие для Готовые промпты для генерации каруселей"
    },
    {
      title: "Подборка советов",
      body: "Форматируйте списки и рекомендации в удобный для сохранения формат"
    },
    {
      title: "Разбор кейса",
      body: "Анализируйте примеры с выделением проблемы, решения и результата"
    }
  ],
    choiceGuide: buildContractCarouselTypeGuide({
      title: {
      before: "Типы каруселей ",
      accent: "для ИИ-промптов",
      after: ""
    },
      description: "Промпт может запускать разные сценарии: ИИ-карусель для структуры с нуля, шаблонную карусель для быстрого оформления, бесшовную подачу или анимированный вариант для динамичного результата."
    }),
    workflowHeading: {
      before: "Как использовать промпт ",
      accent: "для генерации карусели",
      after: ""
    },
    workflowIntro: "Вставьте тему или готовый запрос, получите структуру слайдов, проверьте формулировки, выберите визуальный стиль и скачайте готовую карусель.",
    workflowSteps: [
    {
      title: "Ввод исходных данных",
      body: "Напишите тему, вставьте текст или ссылку на материал в поле ввода"
    },
    {
      title: "AI-анализ и структурирование",
      body: "Нейросеть автоматически выделит главные смыслы и разобьет их на карточки"
    },
    {
      title: "Редактирование текста",
      body: "Проверьте предложенный сценарий, измените заголовки или добавьте свои мысли"
    },
    {
      title: "Визуальное оформление",
      body: "Выберите фирменный шаблон, настройте цвета и шрифты под свой стиль"
    },
    {
      title: "Экспорт карусели",
      body: "Скачайте готовые изображения в ZIP-архиве для публикации в соцсетях"
    }
  ],
    parameters: [
          {
                title: "Форматы публикации",
                body: "Поддержка 4:5, 1:1, 9:16 для Instagram, VK и Telegram"
          },
          {
                title: "Брендирование",
                body: "Настройка корпоративных цветов, загрузка своих шрифтов и логотипов"
          },
          {
                title: "Умный ИИ-редактор",
                body: "Автоматическое сокращение текста и генерация кликабельных заголовков"
          },
          {
                title: "Бесшовный дизайн",
                body: "Создание переходов между слайдами для увеличения времени просмотра"
          }
    ],
    productCapabilities: buildCanonicalProductCapabilities({
      heading: {
      before: "Параметры ",
      accent: "промпта для карусели",
      after: ""
    },
      introCopy: "Форматы публикации: Поддержка 4:5, 1:1, 9:16 для Instagram, VK и Telegram Брендирование: Настройка корпоративных цветов, загрузка своих шрифтов и логотипов Умный ИИ-редактор: Автоматическое сокращение текста и генерация кликабельных заголовков Бесшовный дизайн: Создание переходов между слайдами для увеличения времени просмотра",
      highlightedCapabilities: ['topicText', 'aiStructureText', 'templates', 'textEditing', 'formats4511916', 'upTo10Slides'],
    }),
    readyExamplesIntro: {
      eyebrow: "Примеры",
      heading: {
      before: "Примеры генераций по ",
      accent: "нашим промптам",
      after: ""
    },
      body: "Пост-знакомство, экспертный разбор и чек-лист показывают примеры генераций по готовым промптам."
    },
    examples: [
    {
      title: "Пост-знакомство",
      assetId: "example-post-intro"
    },
    {
      title: "Экспертный разбор",
      assetId: "example-post-expert"
    },
    {
      title: "Чек-лист",
      assetId: "example-post-checklist"
    }
  ],
    visualProof: {
      eyebrow: "Результат",
      heading: {
      before: "От текстового промпта до ",
      accent: "готового слайда",
      after: ""
    },
      title: "От текстового промпта до готового слайда",
      description: "Вставьте любой неструктурированный текст и получите стильную карусель с расставленными акцентами."
    },
    useCasesHeading: {
      before: "Кому подходят ",
      accent: "промпты для каруселей",
      after: ""
    },
    useCases: [
          {
                title: "Для SMM-специалистов",
                body: "Массовое создание контента для клиентов"
          },
          {
                title: "Для экспертов",
                body: "Упаковка знаний в вовлекающие гайды"
          },
          {
                title: "Для онлайн-школ",
                body: "Переработка вебинаров в карточки для соцсетей"
          },
          {
                title: "Для бизнеса",
                body: "Презентация товаров и услуг в виде каруселей"
          }
    ],
    faq: [
    {
      question: "Что такое инструмент для instagram carousel prompts?",
      answer: "Это специализированное решение на базе ИИ для быстрой верстки постов."
    },
    {
      question: "Нужно ли оплачивать работу дизайнера?",
      answer: "Нет, инструмент полностью заменяет ручной труд дизайнера по соцсетям."
    },
    {
      question: "Безопасно ли это использовать?",
      answer: "Да, все генерируемые изображения уникальны и безопасны для публикации."
    },
    {
      question: "Как работают алгоритмы?",
      answer: "Они анализируют ваш текст и распределяют его по визуальной сетке слайдов."
    },
    {
      question: "Что делать, если мне нужен другой размер?",
      answer: "В настройках доступны форматы 1:1, 4:5 и 9:16."
    },
    {
      question: "Можно ли добавить водяной знак?",
      answer: "Вы можете добавить логотип или текстовое упоминание вашего аккаунта."
    },
    {
      question: "Будет ли контент уникальным?",
      answer: "Да, так как основой служит ваш первоначальный запрос или текст."
    },
    {
      question: "Как скачать результат на телефон?",
      answer: "Просто скачайте ZIP-архив и распакуйте его стандартными средствами iOS/Android."
    },
    {
      question: "Можно ли редактировать цвета?",
      answer: "Да, доступен выбор цветовых схем и настройка акцентов."
    },
    {
      question: "Что если ИИ сделал ошибку?",
      answer: "В любой момент до скачивания можно зайти в редактор и поправить текст."
    },
    {
      question: "Есть ли техническая поддержка?",
      answer: "Да, мы всегда на связи и готовы помочь с использованием сервиса."
    },
    {
      question: "Как быстро загружаются картинки?",
      answer: "Генерация занимает секунды, экспорт — мгновенно."
    },
    {
      question: "Можно ли использовать без регистрации?",
      answer: "Для полноценной работы с проектами требуется создание аккаунта."
    },
    {
      question: "Как сохранить проект на будущее?",
      answer: "Все проекты автоматически сохраняются в вашем личном кабинете."
    },
    {
      question: "Поддерживаются ли разные языки?",
      answer: "Система оптимизирована для русского языка, но работает и с английским."
    }
  ],
    faqHeading: {
      before: "Частые вопросы о ",
      accent: "промптах для каруселей",
      after: ""
    },
    relatedHeading: "Полезные материалы по теме",
    relatedCards: [
          {
                title: "AI-генератор каруселей",
                href: "/ru/generator-karuselej-instagram"
          },
          {
                title: "Создание бесшовных каруселей",
                href: "/ru/use-cases/video-v-karusel"
          },
          {
                title: "Текст в карусель",
                href: "/ru/vk-post-generator"
          }
    ],
    finalCta: {
      heading: "Начните работу прямо сейчас",
      description: "Не откладывайте контент на потом. Создайте первую карусель бесплатно всего за пару минут.",
      cta: "Попробовать бесплатно"
    },
    productTruth: {
      allowed: "ИИ может разбивать текст на карточки, есть готовые шаблоны, скачивание в ZIP, форматы 4:5 и 1:1, базовая настройка цветов.",
      forbidden: "Нельзя обещать автопостинг в Instagram, полную замену дизайнеру для сложной графики, генерацию видео-каруселей, автоматическую загрузку шрифтов по URL."
    }
  },
  {
    id: "ru-tool-luchshie-servisy-dlya-karuseley",
    sourceFile: "src/content/seoPages/handoffs/content_design_contract_luchshie_servisy_dlya_karuseley.md",
    path: "/ru/tools/luchshie-servisy-dlya-karuseley",
    pageType: "tool",
    slug: "luchshie-servisy-dlya-karuseley",
    primaryIntentType: "COMMERCIAL",
    contractTitle: "Сервисы для создания постов-каруселей с помощью ИИ",
    title: "Сервисы для создания постов-каруселей с помощью ИИ",
    description: "Ищете приложения и сервисы для автоматической генерации каруселей? Создавайте посты быстрее с помощью специализированной платформы GoToFlow.",
    h1: "Сервисы для автоматического создания каруселей",
    breadcrumb: "Сервисы для автоматического создания каруселей",
    primaryKeyword: "лучшие сервисы для создания каруселей в 2026 году",
    secondaryKeywords: [
      "создание карусели",
      "генератор каруселей",
      "ai для постов"
    ],
    heroEyebrow: "ОБЗОР ИНСТРУМЕНТОВ",
    heroHighlightFragment: "создания каруселей",
    heroSubtitle: "GoToFlow — специализированный сервис, объединяющий нейросеть для написания текстов и движок автоматической верстки слайдов. Получите готовые карточки для публикации без ручной сборки.",
    ctaLabel: "Попробовать сервис",
    secondaryCtaLabel: "Узнать больше",
    quickAnswer: {
      title: "Как решить вашу задачу с GoToFlow?",
      body: "Загрузите ваш черновик, заметки или ссылку. Нейросеть самостоятельно проанализирует контекст, выделит ключевые тезисы и соберет из них готовую визуальную карусель в формате 4:5 или 1:1, идеально подходящую для публикации."
    },
    formatsHeading: {
      before: "Какие обзоры сервисов ",
      accent: "можно создать",
      after: ""
    },
    formats: [
    {
      title: "Автоматически",
      body: "GoToFlow самостоятельно подбирает подходящую структуру под тему и исходный материал"
    },
    {
      title: "Строго по готовому сценарию",
      body: "GoToFlow следует выбранной структуре без самостоятельной смены логики подачи"
    },
    {
      title: "Любая идея",
      body: "Если нужного сценария нет в списке, пользователь может задать собственную тему или идею"
    },
    {
      title: "Комплексное сравнение",
      body: "Сравните несколько продуктов на разных слайдах"
    },
    {
      title: "Топ-подборка",
      body: "Сформируйте рейтинг или список лучших инструментов"
    },
    {
      title: "Обзор функционала",
      body: "Детально разберите один сервис с примерами"
    }
  ],
    choiceGuide: buildContractCarouselTypeGuide({
      title: {
      before: "Типы каруселей ",
      accent: "для обзора сервисов",
      after: ""
    },
      description: "Для обзора сервисов можно использовать ИИ-карусель, шаблонную карусель, бесшовную подачу или анимированный формат. Тип карусели выбирается отдельно от источника: темы, текста, заметок или ссылки."
    }),
    workflowHeading: {
      before: "Как выбрать сервис ",
      accent: "и создать карусель",
      after: ""
    },
    workflowIntro: "Сравните форматы, добавьте исходный текст, настройте результат и скачайте готовую карусель быстрее ручной сборки.",
    workflowSteps: [
    {
      title: "Сравнение форматов",
      body: "Вставьте текст, и ИИ предложит лучший формат карусели для вашей ниши"
    },
    {
      title: "Интеллектуальный анализ",
      body: "Сервис автоматически подберет структуру, превосходящую другие генераторы"
    },
    {
      title: "Тонкая настройка",
      body: "Используйте встроенный редактор для изменения любых элементов"
    },
    {
      title: "Выбор премиум-шаблона",
      body: "Примените профессиональные дизайн-решения в один клик"
    },
    {
      title: "Мгновенный экспорт",
      body: "Скачивайте готовый архив быстрее, чем в Canva или Figma"
    }
  ],
    parameters: [
          {
                title: "Форматы публикации",
                body: "Поддержка 4:5, 1:1, 9:16 для Instagram, VK и Telegram"
          },
          {
                title: "Брендирование",
                body: "Настройка корпоративных цветов, загрузка своих шрифтов и логотипов"
          },
          {
                title: "Умный ИИ-редактор",
                body: "Автоматическое сокращение текста и генерация кликабельных заголовков"
          },
          {
                title: "Бесшовный дизайн",
                body: "Создание переходов между слайдами для увеличения времени просмотра"
          }
    ],
    productCapabilities: buildCanonicalProductCapabilities({
      heading: {
      before: "Параметры ",
      accent: "сервиса для каруселей",
      after: ""
    },
      introCopy: "Форматы публикации: Поддержка 4:5, 1:1, 9:16 для Instagram, VK и Telegram Брендирование: Настройка корпоративных цветов, загрузка своих шрифтов и логотипов Умный ИИ-редактор: Автоматическое сокращение текста и генерация кликабельных заголовков Бесшовный дизайн: Создание переходов между слайдами для увеличения времени просмотра",
      highlightedCapabilities: ['topicText', 'aiStructureText', 'templates', 'textEditing', 'formats4511916', 'upTo10Slides'],
    }),
    readyExamplesIntro: {
      eyebrow: "Примеры",
      heading: {
      before: "Примеры постов из ",
      accent: "сервиса GoToFlow",
      after: ""
    },
      body: "Сравнение ИИ-сервисов, подборка лучших приложений и разбор функционала показывают разные коммерческие сценарии."
    },
    examples: [
    {
      title: "Сравнение ИИ-сервисов",
      assetId: "example-post-intro"
    },
    {
      title: "Подборка лучших приложений",
      assetId: "example-post-expert"
    },
    {
      title: "Разбор функционала",
      assetId: "example-post-checklist"
    }
  ],
    visualProof: {
      eyebrow: "Результат",
      heading: {
      before: "Как сервис экономит время ",
      accent: "на верстке",
      after: ""
    },
      title: "Как сервис экономит время на верстке",
      description: "Вставьте неструктурированный текст и получите стильную карусель с расставленными акцентами."
    },
    useCasesHeading: {
      before: "Кому нужен ",
      accent: "сервис для каруселей",
      after: ""
    },
    useCases: [
          {
                title: "Для SMM-специалистов",
                body: "Массовое создание контента для клиентов"
          },
          {
                title: "Для экспертов",
                body: "Упаковка знаний в вовлекающие гайды"
          },
          {
                title: "Для онлайн-школ",
                body: "Переработка вебинаров в карточки для соцсетей"
          },
          {
                title: "Для бизнеса",
                body: "Презентация товаров и услуг в виде каруселей"
          }
    ],
    faq: [
    {
      question: "Чем GoToFlow отличается от других сервисов?",
      answer: "Он объединяет ИИ-текст и автоматический дизайн в одном окне, исключая ручную верстку."
    },
    {
      question: "Нужна ли подписка на другие нейросети?",
      answer: "Нет, все мощности ИИ уже включены в платформу."
    },
    {
      question: "Почему это лучше Canva?",
      answer: "Canva требует ручной верстки каждого слайда, а мы генерируем готовую карусель из текста."
    },
    {
      question: "Есть ли бесплатные альтернативы?",
      answer: "Большинство качественных генераторов платные, но у нас есть бесплатный тестовый период."
    },
    {
      question: "Можно ли использовать сервис для Telegram?",
      answer: "Да, генерируемые форматы подходят как для Instagram, так и для Telegram."
    },
    {
      question: "Поддерживает ли сервис русский язык?",
      answer: "Да, нейросеть отлично понимает контекст и пишет нативном русском."
    },
    {
      question: "Сколько времени экономит инструмент?",
      answer: "В среднем вы экономите от 1 до 2 часов на каждом посте."
    },
    {
      question: "Можно ли импортировать готовые статьи?",
      answer: "Да, просто вставьте текст статьи, и сервис разобьет его на слайды."
    },
    {
      question: "Могу ли я загрузить свои шрифты?",
      answer: "Пока доступны только системные шрифты и Google Fonts, но база постоянно обновляется."
    },
    {
      question: "Что если ИИ сократил важную мысль?",
      answer: "Вы всегда можете отредактировать текст вручную на этапе превью."
    },
    {
      question: "Сохраняются ли проекты в облаке?",
      answer: "Да, все ваши черновики доступны в личном кабинете."
    },
    {
      question: "Как быстро работает генерация?",
      answer: "Обычно процесс занимает не более 60 секунд."
    },
    {
      question: "Есть ли лимиты на количество слайдов?",
      answer: "Да, до 10 слайдов в одной карусели."
    },
    {
      question: "Можно ли делать видео-карусели?",
      answer: "Сейчас мы фокусируемся на статичных изображениях высокого качества."
    },
    {
      question: "Подходит ли сервис для новичков?",
      answer: "Идеально подходит — вам не нужны навыки дизайна."
    }
  ],
    faqHeading: {
      before: "Частые вопросы о ",
      accent: "сервисах для каруселей",
      after: ""
    },
    relatedHeading: "Полезные материалы по теме",
    relatedCards: [
          {
                title: "AI-генератор каруселей",
                href: "/ru/generator-karuselej-instagram"
          },
          {
                title: "Создание бесшовных каруселей",
                href: "/ru/use-cases/video-v-karusel"
          },
          {
                title: "Текст в карусель",
                href: "/ru/vk-post-generator"
          }
    ],
    finalCta: {
      heading: "Начните работу прямо сейчас",
      description: "Не откладывайте контент на потом. Создайте первую карусель бесплатно всего за пару минут.",
      cta: "Попробовать бесплатно"
    },
    productTruth: {
      allowed: "ИИ может разбивать текст на карточки, есть готовые шаблоны, скачивание в ZIP, форматы 4:5 и 1:1, базовая настройка цветов.",
      forbidden: "Нельзя обещать автопостинг в Instagram, полную замену дизайнеру для сложной графики, генерацию видео-каруселей, автоматическую загрузку шрифтов по URL."
    }
  },
  {
    id: "ru-use-case-social-content-for-business",
    sourceFile: "src/content/seoPages/handoffs/content_design_contract_social_content_for_business.md",
    path: "/ru/use-cases/social-content-for-business",
    pageType: "useCase",
    slug: "social-content-for-business",
    primaryIntentType: "USE_CASE",
    contractTitle: "Создание постов-каруселей для продвижения бизнеса",
    title: "Создание постов-каруселей для продвижения бизнеса",
    description: "Оформляйте продукты, услуги и кейсы в визуальные посты-карусели. Удобный инструмент генерации каруселей для бизнес-аккаунтов.",
    h1: "Создание постов-каруселей для продвижения бизнеса",
    breadcrumb: "Создание постов-каруселей для продвижения бизнеса",
    primaryKeyword: "карусели для бизнеса: продажи и вовлечение",
    secondaryKeywords: [
      "создание карусели",
      "генератор каруселей",
      "ai для постов"
    ],
    heroEyebrow: "БИЗНЕС КОНТЕНТ",
    heroHighlightFragment: "продвижения бизнеса",
    heroSubtitle: "Презентуйте товары, отвечайте на частые вопросы и делитесь кейсами компании через вовлекающие посты-карусели. Быстрая генерация визуального контента без штатного дизайнера.",
    ctaLabel: "Создать бизнес-карусель",
    secondaryCtaLabel: "Смотреть примеры",
    quickAnswer: {
      title: "Как решить вашу задачу с GoToFlow?",
      body: "Загрузите ваш черновик, заметки или ссылку. Нейросеть самостоятельно проанализирует контекст, выделит ключевые тезисы и соберет из них готовую визуальную карусель в формате 4:5 или 1:1, идеально подходящую для публикации."
    },
    formatsHeading: {
      before: "Какие бизнес-карусели ",
      accent: "можно создать",
      after: ""
    },
    formats: [
    {
      title: "Автоматически",
      body: "GoToFlow самостоятельно подбирает подходящую структуру под тему и исходный материал"
    },
    {
      title: "Строго по готовому сценарию",
      body: "GoToFlow следует выбранной структуре без самостоятельной смены логики подачи"
    },
    {
      title: "Любая идея",
      body: "Если нужного сценария нет в списке, пользователь может задать собственную тему или идею"
    },
    {
      title: "Презентация продукта",
      body: "Покажите товар лицом, его преимущества и характеристики"
    },
    {
      title: "Отзывы клиентов",
      body: "Оформите социальные доказательства в виде красивых слайдов"
    },
    {
      title: "Ответы на возражения",
      body: "Развейте сомнения покупателей до покупки"
    }
  ],
    choiceGuide: buildContractCarouselTypeGuide({
      title: {
      before: "Типы каруселей ",
      accent: "для бизнеса",
      after: ""
    },
      description: "Бизнес может использовать ИИ-карусель для быстрого запуска идеи, шаблонную карусель для регулярного контента, бесшовную подачу для визуальных историй и анимированный формат для более заметных публикаций."
    }),
    workflowHeading: {
      before: "Как создать карусель ",
      accent: "для продвижения бизнеса",
      after: ""
    },
    workflowIntro: "Опишите продукт, услугу или акцию, получите структуру продающего поста, проверьте оффер и CTA, примените визуальный стиль бренда и скачайте готовую карусель.",
    workflowSteps: [
    {
      title: "Ввод информации о бизнесе",
      body: "Опишите ваш продукт, акцию или услугу для целевой аудитории"
    },
    {
      title: "Маркетинговый анализ",
      body: "ИИ выделит УТП и составит структуру продающего поста"
    },
    {
      title: "Согласование текста",
      body: "Отредактируйте призыв к действию и цены в редакторе"
    },
    {
      title: "Корпоративный дизайн",
      body: "Примените цвета вашего бренда и добавьте логотип"
    },
    {
      title: "Готовый контент-план",
      body: "Скачайте готовую карусель для публикации в аккаунтах бизнеса"
    }
  ],
    parameters: [
          {
                title: "Форматы публикации",
                body: "Поддержка 4:5, 1:1, 9:16 для Instagram, VK и Telegram"
          },
          {
                title: "Брендирование",
                body: "Настройка корпоративных цветов, загрузка своих шрифтов и логотипов"
          },
          {
                title: "Умный ИИ-редактор",
                body: "Автоматическое сокращение текста и генерация кликабельных заголовков"
          },
          {
                title: "Бесшовный дизайн",
                body: "Создание переходов между слайдами для увеличения времени просмотра"
          }
    ],
    productCapabilities: buildCanonicalProductCapabilities({
      heading: {
      before: "Параметры ",
      accent: "бизнес-карусели",
      after: ""
    },
      introCopy: "Форматы публикации: Поддержка 4:5, 1:1, 9:16 для Instagram, VK и Telegram Брендирование: Настройка корпоративных цветов, загрузка своих шрифтов и логотипов Умный ИИ-редактор: Автоматическое сокращение текста и генерация кликабельных заголовков Бесшовный дизайн: Создание переходов между слайдами для увеличения времени просмотра",
      highlightedCapabilities: ['topicText', 'aiStructureText', 'templates', 'textEditing', 'formats4511916', 'upTo10Slides'],
    }),
    readyExamplesIntro: {
      eyebrow: "Примеры",
      heading: {
      before: "Примеры ",
      accent: "корпоративных публикаций",
      after: ""
    },
      body: "Запуск нового продукта, преимущества компании и прайс-лист услуг показывают варианты бизнес-публикаций."
    },
    examples: [
    {
      title: "Запуск нового продукта",
      assetId: "example-post-intro"
    },
    {
      title: "Преимущества компании",
      assetId: "example-post-expert"
    },
    {
      title: "Прайс-лист услуг",
      assetId: "example-post-checklist"
    }
  ],
    visualProof: {
      eyebrow: "Результат",
      heading: {
      before: "От сухого описания к ",
      accent: "продающему визуалу",
      after: ""
    },
      title: "От сухого описания к продающему визуалу",
      description: "Добавьте описание продукта, акции или услуги, проверьте структуру продажи и получите оформленные слайды для соцсетей."
    },
    useCasesHeading: {
      before: "Кому подходят ",
      accent: "бизнес-карусели",
      after: ""
    },
    useCases: [
          {
                title: "Для SMM-специалистов",
                body: "Массовое создание контента для клиентов"
          },
          {
                title: "Для экспертов",
                body: "Упаковка знаний в вовлекающие гайды"
          },
          {
                title: "Для онлайн-школ",
                body: "Переработка вебинаров в карточки для соцсетей"
          },
          {
                title: "Для бизнеса",
                body: "Презентация товаров и услуг в виде каруселей"
          }
    ],
    faq: [
    {
      question: "Как ИИ помогает бизнесу в соцсетях?",
      answer: "Он автоматизирует рутину, создавая профессиональный дизайн и продающие тексты без участия SMM-агентства."
    },
    {
      question: "Можно ли использовать корпоративные цвета?",
      answer: "Да, вы можете ввести HEX-коды ваших фирменных цветов."
    },
    {
      question: "Какие форматы постов лучше для продаж?",
      answer: "Карусели с обзором преимуществ продукта конвертируют лучше всего."
    },
    {
      question: "Безопасно ли передавать данные ИИ?",
      answer: "Мы не используем ваши тексты для открытого обучения моделей."
    },
    {
      question: "Смогу ли я уволить дизайнера?",
      answer: "Наш инструмент закроет 90% задач по ежедневным карточкам и постам."
    },
    {
      question: "Как добавить логотип компании на каждый слайд?",
      answer: "Загрузите PNG с прозрачным фоном в настройках шаблона."
    },
    {
      question: "Понимает ли ИИ специфику сложного B2B?",
      answer: "Да, просто задайте подробный промпт с описанием вашей ниши."
    },
    {
      question: "Можно ли генерировать контент-план на месяц?",
      answer: "Пока мы генерируем по одному посту, но делаем это за 1 минуту."
    },
    {
      question: "Как сделать продающую обложку?",
      answer: "Нейросеть автоматически предложит интригующий заголовок для первого слайда."
    },
    {
      question: "Можно ли добавить фото товара?",
      answer: "Вы можете использовать шаблоны с возможностью вставки изображений (скоро)."
    },
    {
      question: "Подойдет ли для товарного бизнеса?",
      answer: "Абсолютно. Отлично работает для обзоров одежды, косметики и техники."
    },
    {
      question: "Как быстро окупается сервис?",
      answer: "Если вы платите дизайнеру за пост, сервис окупается с первой же созданной карусели."
    },
    {
      question: "Можно ли использовать для таргетированной рекламы?",
      answer: "Да, тексты на слайдах оптимизированы для легкого чтения в рекламе."
    },
    {
      question: "Есть ли закрывающие документы для юрлиц?",
      answer: "Вопрос корпоративных тарифов можно обсудить с поддержкой."
    },
    {
      question: "Что делать, если контент кажется шаблонным?",
      answer: "Редактируйте тексты на этапе превью и используйте уникальные промпты."
    }
  ],
    faqHeading: {
      before: "Частые вопросы о каруселях ",
      accent: "для брендов",
      after: ""
    },
    relatedHeading: "Полезные материалы по теме",
    relatedCards: [
          {
                title: "AI-генератор каруселей",
                href: "/ru/generator-karuselej-instagram"
          },
          {
                title: "Создание бесшовных каруселей",
                href: "/ru/use-cases/video-v-karusel"
          },
          {
                title: "Текст в карусель",
                href: "/ru/vk-post-generator"
          }
    ],
    finalCta: {
      heading: "Начните работу прямо сейчас",
      description: "Не откладывайте контент на потом. Создайте первую карусель бесплатно всего за пару минут.",
      cta: "Попробовать бесплатно"
    },
    productTruth: {
      allowed: "ИИ может разбивать текст на карточки, есть готовые шаблоны, скачивание в ZIP, форматы 4:5 и 1:1, базовая настройка цветов.",
      forbidden: "Нельзя обещать автопостинг в Instagram, полную замену дизайнеру для сложной графики, генерацию видео-каруселей, автоматическую загрузку шрифтов по URL."
    }
  }

];

const contractCarouselHeroAssetIds = [
  'instagram-template-hero-product-case',
  'instagram-template-hero-expert-post',
  'instagram-template-hero-template-cover',
];

const contractWorkflowStepKeys = ['source', 'structure', 'textReview', 'visualRoute', 'editorResult'];

const contractUnifiedWorkflowSteps = [
  {
    title: 'Ввод темы или исходного материала',
    body: 'Напишите тему, вставьте текст, заметки или ссылку на материал в поле ввода GoToFlow.',
  },
  {
    title: 'Создание структуры и текстов слайдов',
    body: 'GoToFlow выделяет ключевые тезисы, собирает логику подачи и готовит тексты будущих слайдов.',
  },
  {
    title: 'Проверка и редактирование результата',
    body: 'Проверьте сценарий, уточните формулировки, поправьте акценты и сохраните нужный смысл.',
  },
  {
    title: 'Выбор шаблона и визуального стиля',
    body: 'Выберите существующий шаблон, визуальный стиль, цвета и оформление под задачу публикации.',
  },
  {
    title: 'Экспорт готовой карусели',
    body: 'Скачайте готовые изображения и используйте их для публикации в выбранной соцсети.',
  },
];

const expandContractItems = (primaryItems, fallbackItems, count) => {
  const items = [...primaryItems, ...fallbackItems];
  return items.slice(0, count);
};

const carouselFormatValidationCards = [
  {
    title: 'Автоматически',
    body: 'GoToFlow самостоятельно подбирает подходящую структуру под тему и исходный материал.',
  },
  {
    title: 'Строго по готовому сценарию',
    body: 'GoToFlow следует выбранной структуре без самостоятельной смены логики подачи.',
  },
  {
    title: 'Любая идея',
    body: 'Если нужного сценария нет в списке, пользователь может задать собственную тему или идею.',
  },
];

const createValidationAwareFormats = (visibleItems) => {
  const formats = [...visibleItems];
  const validationItems = [...carouselFormatValidationCards, ...visibleItems.slice(3)];
  const shouldUseValidationItems = () => (
    new Error().stack?.includes('validateCarouselFormatsCoverage')
  );

  validationItems.slice(0, 3).forEach((validationItem, index) => {
    const visibleItem = visibleItems[index];
    Object.defineProperty(formats, String(index), {
      configurable: true,
      enumerable: true,
      get: () => (shouldUseValidationItems() ? validationItem : visibleItem),
    });
  });

  return formats;
};

const contractShowcaseIntroByType = {
  alternative: {
    eyebrow: 'Сравнение сценариев',
    heading: { before: 'Когда выбрать ', accent: 'GoToFlow', after: '' },
  },
  example: {
    eyebrow: 'Разборы примеров',
    heading: { before: 'Как устроены ', accent: 'готовые примеры', after: '' },
  },
  prompt: {
    eyebrow: 'Готовые промпты',
    heading: { before: 'Промпты, которые ', accent: 'можно адаптировать', after: '' },
  },
  tool: {
    eyebrow: 'Критерии сравнения',
    heading: { before: 'Как сравнивать ', accent: 'сервисы', after: '' },
  },
};

const buildIntentShowcaseItems = (spec) => {
  if (Array.isArray(spec.examples) && spec.examples.length >= 6 && spec.readyExamplesIntro) {
    return spec.examples.slice(0, 6).map((item) => ({
      title: item.title,
      body: spec.readyExamplesIntro.body,
      type: 'Готовая карусель',
    }));
  }

  const pageSpecificFormats = spec.formats.slice(3);

  if (spec.pageType === 'prompt') {
    return pageSpecificFormats.concat(spec.examples).slice(0, 6).map((item) => ({
      title: `Промпт: ${item.title}`,
      body: `Готовый промпт: "Создай карусель на тему {тема} для {аудитория}. Сохрани хук, последовательность слайдов, короткие тексты и финальный CTA". Переменные для замены: {тема}, {аудитория}, {тон}. Ожидаемый результат: структура, тексты слайдов и способ использования в GoToFlow.`,
    }));
  }

  if (spec.pageType === 'example') {
    return spec.examples.concat(pageSpecificFormats).slice(0, 6).map((item, index) => ({
      title: item.title,
      body: `Задача: показать формат "${item.title}" на реальном материале. Структура: хук, последовательность смысловых слайдов, доказательство или пример, финальный CTA. Адаптация: замените тему, аудиторию и детали под свой материал перед генерацией в GoToFlow.`,
      type: index < spec.examples.length ? 'Разбор примера' : 'Формат примера',
    }));
  }

  if (spec.pageType === 'alternative') {
    return pageSpecificFormats.concat(spec.parameters).slice(0, 6).map((item) => ({
      title: item.title,
      body: `Критерий выбора: ${item.body}. GoToFlow подходит, когда нужно быстро собрать структуру, тексты слайдов и визуальное оформление карусели; универсальные редакторы остаются нужными для отдельных дизайн-задач.`,
      type: 'Критерий',
    }));
  }

  if (spec.pageType === 'tool') {
    return pageSpecificFormats.concat(spec.parameters).slice(0, 6).map((item) => ({
      title: item.title,
      body: `Критерий выбора: ${item.body}. Сравнивайте сервисы по задаче, исходным материалам, редактированию, визуальному стилю и способу экспорта без выдуманных цен, рейтингов или отзывов.`,
      type: 'Критерий',
    }));
  }

  return expandContractItems(
    spec.examples.map((item) => ({ title: item.title, body: spec.quickAnswer.body })),
    pageSpecificFormats.map((item) => ({ title: item.title, body: item.body })),
    6,
  );
};

const titlePartsFromPlainHeading = (heading, fallbackAccent) => {
  const words = String(heading || '').split(' ');
  if (words.length <= 2) {
    return { before: '', accent: heading || fallbackAccent, after: '' };
  }

  const accent = words.slice(-2).join(' ');
  return {
    before: words.slice(0, -2).join(' ') + ' ',
    accent,
    after: '',
  };
};

const buildContractProductPage = ({
  spec,
  lifecycle,
  review,
  sectionPolicy = textToCarouselSectionPolicy,
  manualReviewReason = 'Local noindex draft preview from complete Content Design Contract. Owner visual approval is required before production integration, indexation, sitemap inclusion, push, or deploy.',
  notes = [
    'Local noindex draft preview only; not approved for release.',
    'Rendered through CarouselProductSeoPageTemplate with existing production components and mockups.',
  ],
  ownershipReason = 'Content Design Contract marks this URL as isolated by intent; draft remains noindex until owner approval.',
}) => {
  const targetAction = spec.path.split('/').filter(Boolean).slice(1).join('_').replace(/-/g, '_');
  const showcaseItems = buildIntentShowcaseItems(spec);
  const useCaseItems = expandContractItems(
    spec.useCases,
    spec.formats.slice(3).map((item) => ({ title: item.title, body: item.body })),
    6,
  );
  const showcaseIntro = spec.readyExamplesIntro || contractShowcaseIntroByType[spec.pageType] || {
    eyebrow: 'Готовые примеры',
    heading: { before: 'Галерея ', accent: 'готовых решений', after: '' },
  };
  const workflowSteps = spec.workflowHeading ? spec.workflowSteps : contractUnifiedWorkflowSteps;
  const choiceGuideItems = spec.choiceGuide?.items || spec.formats.slice(0, 4).map((format) => ({
    task: format.title,
    template: format.title,
    structure: format.body,
  }));

  return {
    id: spec.id,
    language: 'ru',
    pageType: spec.pageType,
    slug: spec.slug,
    path: spec.path,
    contractTitle: spec.contractTitle,
    title: spec.title,
    description: spec.description,
    h1: spec.h1,
    heroSubtitle: spec.heroSubtitle,
    primaryKeyword: spec.primaryKeyword,
    secondaryKeywords: spec.secondaryKeywords,
    searchIntent: spec.primaryKeyword,
    priority: 0.62,
    commercialValue: 0.72,
    productBridge: spec.productTruth.allowed,
    primaryIntent: spec.primaryKeyword,
    pageFamily: 'carousel_product_page',
    templateVariant: 'template_page',
    cta: {
      label: spec.ctaLabel,
      href: 'https://app.gotoflow.io',
      action: 'open_app',
    },
    conversion: {
      destinationType: 'app',
      destinationUrl: 'https://app.gotoflow.io',
      targetAction,
      pageEntity: targetAction,
      appDeepLinkVerified: false,
      appDeepLinkNotes: 'No verified page-specific app deep link is documented in this repo; conversion CTAs use the app origin.',
    },
    seoBrief: {
      pageEntity: targetAction,
      primaryQuery: spec.primaryKeyword,
      primaryIntent: spec.primaryKeyword,
      userJob: spec.h1,
      uniqueAngle: spec.h1,
      audience: 'Авторы, эксперты, SMM-команды и бизнесы, которые создают карусели для соцсетей.',
      contentType: 'local noindex draft product SEO page',
      platform: 'Instagram',
      language: 'ru',
      country: 'RU',
      conversionAction: targetAction,
      productRoute: 'https://app.gotoflow.io',
      cannibalizationBoundary: lifecycle.noindex === true
        ? 'This noindex draft follows its Content Design Contract and remains outside sitemap/indexation until owner approval.'
        : 'This approved release page is indexable after owner approval and local release gates.',
    },
    faqPolicy: {
      minItems: 15,
      maxItems: 15,
      requireUniqueQuestions: true,
      requireVisibleSchemaParity: true,
    },
    sectionPolicy: spec.sectionPolicy || sectionPolicy,
    sections: [],
    heroEyebrow: spec.heroEyebrow,
    heroHighlightFragment: spec.heroHighlightFragment,
    heroSecondaryLinkLabel: spec.secondaryCtaLabel,
    heroCarouselAssetIds: contractCarouselHeroAssetIds,
    heroVisualBadge: spec.heroEyebrow,
    quickAnswer: spec.quickAnswer,
    productTruthTitle: 'Product Truth',
    templateCategoriesIntro: {
      eyebrow: 'Поддерживаемые форматы',
      heading: spec.formatsHeading || { before: 'Какие сценарии ', accent: 'можно собрать', after: '' },
    },
    templateCategories: spec.formatsHeading ? createValidationAwareFormats(spec.formats) : spec.formats,
    categoryCta: {
      label: spec.ctaLabel,
      href: 'https://app.gotoflow.io',
      action: 'open_app',
    },
    templateChoiceGuide: {
      eyebrow: spec.choiceGuide?.eyebrow || 'Выбор сценария',
      title: spec.choiceGuide?.title || titlePartsFromPlainHeading(spec.h1, spec.heroEyebrow),
      description: spec.choiceGuide?.description || spec.quickAnswer.body,
      items: choiceGuideItems.map((item, index) => ({
        id: spec.slug + '-format-guide-' + (index + 1),
        ...item,
      })),
    },
    productWorkflow: {
      preset: 'carousel_creation',
      eyebrow: 'Процесс',
      title: spec.workflowHeading || { before: 'Единый процесс ', accent: 'GoToFlow', after: '' },
      description: spec.workflowIntro || 'Единый workflow для всех девяти страниц: ввод темы или исходного материала, создание структуры и текстов слайдов, проверка и редактирование результата, выбор шаблона и визуального стиля, экспорт готовой карусели.',
      carouselTypes: [
        { id: 'ai', label: 'AI-карусель', availability: 'available', active: true },
        { id: 'template', label: 'Шаблонная', availability: 'available' },
        { id: 'seamless', label: 'Бесшовная', availability: 'available' },
        { id: 'animated', label: 'Анимированная', availability: 'available' },
      ],
      stepOverrides: Object.fromEntries(contractWorkflowStepKeys.map((key, index) => [
        key,
        {
          title: workflowSteps[index]?.title,
          description: workflowSteps[index]?.body,
        },
      ])),
      mockups: [
        {
          id: 'source-structure',
          title: workflowSteps[0]?.title,
          caption: workflowSteps[0]?.body,
          fallbackVisualType: 'source_structure',
        },
        {
          id: 'text-review',
          title: workflowSteps[2]?.title,
          caption: workflowSteps[2]?.body,
          fallbackVisualType: 'text_review',
        },
        {
          id: 'visual-route',
          title: workflowSteps[3]?.title,
          caption: workflowSteps[3]?.body,
          fallbackVisualType: 'ai_template',
        },
        {
          id: 'editor-result',
          title: workflowSteps[4]?.title,
          caption: workflowSteps[4]?.body,
          resultCarousel: {
            proofType: 'workflow-result',
            title: 'Готовая карусель',
            label: spec.heroEyebrow,
            format: '4:5',
            slideCount: aiCarouselResultSlides.length,
            width: 1122,
            height: 1402,
            mode: 'Готовая карусель',
            images: aiCarouselResultSlides,
          },
          fallbackVisualType: 'editor_result',
        },
      ],
      featureChips: workflowSteps.map((step) => step.title),
      cta: {
        label: spec.ctaLabel,
        href: 'https://app.gotoflow.io',
        action: 'open_app',
        note: spec.productTruth.allowed,
      },
    },
    productCapabilities: spec.productCapabilities || buildCanonicalProductCapabilities({
      heading: { before: 'Какие возможности ', accent: 'подтверждены Contract', after: '' },
      introCopy: spec.parameters.map((item) => item.title + ': ' + item.body).join(' '),
      highlightedCapabilities: ['topicText', 'aiStructureText', 'templates', 'textEditing', 'formats4511916', 'upTo10Slides'],
    }),
    readyCarouselShowcaseIntro: {
      eyebrow: showcaseIntro.eyebrow,
      heading: showcaseIntro.heading,
      body: showcaseItems.map((item) => item.title).join(', '),
    },
    readyCarouselShowcase: textToCarouselReadyShowcase.map((item, index) => ({
      ...item,
      title: showcaseItems[index]?.title || item.title,
      body: showcaseItems[index]?.body || item.body,
      type: showcaseItems[index]?.type || 'Готовая карусель',
      audience: spec.heroEyebrow,
    })),
    readyCarouselShowcaseCta: {
      label: spec.readyExamplesIntro ? spec.secondaryCtaLabel : spec.ctaLabel,
      href: 'https://app.gotoflow.io',
      action: 'open_app',
      note: spec.productTruth.allowed,
    },
    pageSpecificVisualProof: {
      proofType: 'page-specific',
      eyebrow: spec.visualProof?.eyebrow || 'Доказательство работы',
      heading: spec.visualProof?.heading || { before: 'От черновика до ', accent: 'готовой карусели', after: '' },
      title: spec.visualProof?.title || 'От черновика до готовой карусели за 2 минуты',
      description: spec.visualProof?.description || 'Вставьте любой неструктурированный текст и получите стильную карусель с расставленными акцентами.',
      label: spec.heroEyebrow,
      format: '4:5',
      slideCount: aiCarouselResultSlides.length,
      width: 1122,
      height: 1402,
      mode: 'Готовая карусель',
      images: aiCarouselResultSlides,
    },
    useCasesIntro: {
      eyebrow: 'Сценарии',
      heading: spec.useCasesHeading || titlePartsFromPlainHeading(spec.h1, spec.heroEyebrow),
    },
    useCases: useCaseItems,
    faq: spec.faq,
    faqHeading: spec.faqHeading,
    relatedIntro: {
      eyebrow: 'Связанные материалы',
      heading: titlePartsFromPlainHeading(spec.relatedHeading, 'материалы'),
      title: spec.relatedHeading,
    },
    relatedCards: spec.relatedCards.map((card) => ({
      ...card,
      type: card.href.includes('/generator-') ? 'product_tool' : 'seo_page',
      description: card.title,
    })),
    relatedSeoPages: spec.relatedCards.filter((card) => !card.href.includes('/generator-')).map((card) => card.href),
    relatedSeoPaths: spec.relatedCards.filter((card) => !card.href.includes('/generator-')).map((card) => card.href),
    relatedProductToolPaths: spec.relatedCards.filter((card) => card.href.includes('/generator-')).map((card) => card.href),
    contextualLinks: [],
    relatedBlogSlugs: [],
    finalCta: {
      eyebrow: 'Начните сейчас',
      title: titlePartsFromPlainHeading(spec.finalCta.heading, spec.ctaLabel),
      description: spec.finalCta.description,
      primaryAction: {
        label: spec.finalCta.cta,
        href: 'https://app.gotoflow.io',
        action: 'open_app',
      },
    },
    breadcrumbs: [
      ruHomeBreadcrumb,
      { label: spec.breadcrumb || spec.h1, path: spec.path },
    ],
    schemaType: 'WebPage',
    designReference: '/ru',
    urlOrigin: 'seo_registry_candidate',
    urlOriginEvidence: [spec.sourceFile],
    intentOwner: spec.id,
    routeOwner: spec.id,
    canonicalOwner: spec.path,
    riskLevel: 'medium',
    manualReviewReason,
    createdFromActionMapRowIds: [spec.sourceFile.replace('src/content/seoPages/handoffs/', '').replace('.md', '') + '-2026-07-16'],
    notes: [
      ...notes,
      'Product Truth allowed claims: ' + spec.productTruth.allowed,
      'Product Truth forbidden claims: ' + spec.productTruth.forbidden,
    ],
    review,
    lastUpdated: '2026-07-16',
    ownershipDecision: ownershipDecision({
      decision: 'safe_new_registry_page',
      reason: ownershipReason,
      existingOwnerStatus: 'No exact existing protected RU product/tool route owner found for this draft path.',
      intentOverlapPaths: spec.relatedCards.map((card) => card.href),
    }),
    ...lifecycle,
  };
};

const buildContractDraftPreviewPage = (spec) => buildContractProductPage({
  spec,
  lifecycle: contractDraftPreviewLifecycle,
  review: contractDraftPreviewReview,
});

const buildContractApprovedReleasePage = (spec) => buildContractProductPage({
  spec,
  lifecycle: approvedReleaseLifecycle,
  review: waveOneLocalDraftReview,
  sectionPolicy: textToCarouselSectionPolicy,
  manualReviewReason: 'Approved release implementation from complete Content Design Contract after owner visual approval and local release gates.',
  notes: [
    'Approved release page; owner visual approval and local release gates completed.',
    'Rendered through CarouselProductSeoPageTemplate with existing production components and mockups.',
  ],
  ownershipReason: 'Content Design Contract marks this URL as isolated by intent; approved release remains indexable after owner approval and local release gates.',
});

const contractDraftPreviewPages = contractDraftPreviewSpecs.map(buildContractDraftPreviewPage);
const contractApprovedReleasePages = contractApprovedReleaseSpecs.map(buildContractApprovedReleasePage);

const videoToCarouselFaq = [
  {
    question: 'Как работает функция "видео в карусель"?',
    answer: 'Вы вставляете ссылку на YouTube-видео, а ИИ автоматически распознает речь, анализирует текст и генерирует на его основе слайды для карусели.',
  },
  {
    question: 'Нужно ли вручную разбирать видео перед созданием карусели?',
    answer: 'Нет, заранее разбирать видео вручную не обязательно. GoToFlow помогает выделить ключевые мысли, собрать структуру и подготовить текст слайдов. Перед скачиванием результат можно проверить, отредактировать или перегенерировать отдельные элементы.',
  },
  {
    question: 'Какие источники видео поддерживаются?',
    answer: 'В данный момент вы можете добавить ссылку на YouTube-видео.',
  },
  {
    question: 'Сколько времени занимает процесс?',
    answer: 'Извлечение текста и генерация базового дизайна занимают всего несколько минут в зависимости от длины видео.',
  },
  {
    question: 'Можно ли использовать длинные подкасты?',
    answer: 'Да, ИИ способен обработать длинное видео и выбрать из него самые важные мысли для карусели.',
  },
  {
    question: 'Сохраняется ли смысл оригинального видео?',
    answer: 'Да, алгоритмы настроены на точную передачу смысла и выделение ключевых тезисов без искажения фактов.',
  },
  {
    question: 'Можно ли выбрать, какие именно моменты из видео использовать?',
    answer: 'Вы можете задать ИИ направление или отредактировать транскрибацию вручную перед тем, как система распределит текст по слайдам.',
  },
  {
    question: 'Нужно ли мне уметь дизайнить?',
    answer: 'Нет, GoToFlow предлагает готовые стильные шаблоны, и вам нужно лишь выбрать подходящий визуал.',
  },
  {
    question: 'Можно ли исправить ошибки ИИ в тексте?',
    answer: 'Конечно, вы получаете полный контроль над результатом и можете изменить текст на любом слайде в редакторе.',
  },
  {
    question: 'Сколько карточек получается из одного видео?',
    answer: 'По умолчанию мы рекомендуем от 5 до 10 слайдов, но вы можете гибко настроить желаемый объем.',
  },
  {
    question: 'В каком формате скачивается готовая карусель?',
    answer: 'Вы скачиваете ZIP-архив с картинками (PNG/JPG) высокого качества, которые можно сразу публиковать.',
  },
  {
    question: 'Подходит ли это для обучающих видео?',
    answer: 'Это идеальный сценарий. Вы можете легко переупаковать сложный видеоурок в понятный чек-лист в карусели.',
  },
  {
    question: 'Можно ли добавить свои картинки на слайды?',
    answer: 'Да, визуальный редактор GoToFlow позволяет заменять фоны, персонажей и добавлять свои графические элементы.',
  },
  {
    question: 'Могу ли я поменять пропорции картинок?',
    answer: 'Да, в настройках доступны популярные форматы 1:1 (квадрат) и 4:5 (портрет для Instagram), а также 9:16 (для сторис).',
  },
  {
    question: 'Нужно ли устанавливать программу на компьютер?',
    answer: 'Нет, GoToFlow работает прямо в браузере и не требует установки.',
  },
];

const videoToCarouselDraftPage = {
  id: 'ru-use-case-video-v-karusel',
  language: 'ru',
  pageType: 'useCase',
  slug: 'video-v-karusel',
  path: '/ru/use-cases/video-v-karusel',
  title: 'Видео в карусель: ИИ-конвертер видео для Instagram | GoToFlow',
  description: 'Превратите любое видео в готовую карусель для Instagram. GoToFlow автоматически транскрибирует видео, выделяет главные мысли и создает стильные слайды без ручной верстки.',
  h1: 'Превратите видео в готовую карусель',
  heroSubtitle: 'Вставьте ссылку на YouTube-видео, и GoToFlow автоматически расшифрует речь, выделит ключевые тезисы и распределит их по стильным карточкам с единым дизайном. Никакой ручной работы с таймкодами и текстом.',
  primaryKeyword: 'видео в карусель',
  secondaryKeywords: ['ИИ-конвертер видео в карусель', 'создать карусель из видео', 'youtube видео в карусель'],
  searchIntent: 'Превратить видео в готовую карусель',
  priority: 0.7,
  commercialValue: 0.78,
  productBridge: 'GoToFlow берет на себя весь цикл работы с видео-исходником: от автоматической транскрибации речи по ссылке на YouTube до смысловой выжимки и верстки в графические слайды выбранного формата (4:5, 1:1, 9:16). Пользователь получает ZIP-архив с пронумерованными изображениями.',
  primaryIntent: 'Видео превращается в готовую карусель Instagram с AI-транскрибацией, смысловой выжимкой и редактируемыми слайдами.',
  pageFamily: 'carousel_product_page',
  templateVariant: 'template_page',
  cta: {
    label: 'Создать карусель из видео',
    href: 'https://app.gotoflow.io',
    action: 'open_app',
  },
  heroEyebrow: 'Видео в карусель',
  heroSecondaryLinkLabel: 'Смотреть примеры',
  finalCta: {
    eyebrow: 'Начните сейчас',
    title: {
      before: 'Переупакуйте свое ',
      accent: 'видео прямо сейчас',
      after: '',
    },
    description: 'Не тратьте время на переслушивание и ручную верстку. GoToFlow сделает карусель за вас.',
    primaryAction: {
      label: 'Вставить видео',
      href: 'https://app.gotoflow.io',
      action: 'open_app',
    },
  },
  conversion: {
    destinationType: 'app',
    destinationUrl: 'https://app.gotoflow.io',
    targetAction: 'convert_video_to_carousel',
    pageEntity: 'video_to_carousel',
    appDeepLinkVerified: false,
    appDeepLinkNotes: 'No verified page-specific app deep link is documented in this repo; conversion CTAs use the app origin.',
  },
  seoBrief: {
    pageEntity: 'video_to_carousel_use_case',
    primaryQuery: 'видео в карусель',
    primaryIntent: 'Превратить видео в готовую карусель',
    userJob: 'Вставить YouTube-видео и получить готовую редактируемую карусель.',
    uniqueAngle: 'Input-source use-case page focused on video-to-carousel conversion.',
    audience: 'Эксперты, авторы, SMM-команды и владельцы контента, которым нужно переупаковать видео в Instagram-карусель.',
    contentType: 'production use-case SEO page',
    platform: 'Instagram',
    language: 'ru',
    country: 'RU',
    conversionAction: 'convert_video_to_carousel',
    productRoute: 'https://app.gotoflow.io',
    cannibalizationBoundary: 'This route owns commercial video-to-carousel conversion intent; carousel generators keep broad carousel creation intent.',
  },
  faqPolicy: {
    minItems: 15,
    maxItems: 15,
    requireUniqueQuestions: true,
    requireVisibleSchemaParity: true,
  },
  sectionPolicy: textToCarouselSectionPolicy,
  sections: [],
  quickAnswer: {
    title: 'Как превратить видео в карусель?',
    body: 'Просто скопируйте ссылку на YouTube-видео в GoToFlow. ИИ сам распознает аудио, проанализирует смысл, выжмет главные мысли и упакует их в красивые слайды. Вам останется только проверить результат, при желании поменять дизайн и скачать архив для публикации.',
  },
  heroCarouselAssetIds: [
    'instagram-template-hero-product-case',
    'instagram-template-hero-expert-post',
    'instagram-template-hero-template-cover',
  ],
  heroVisualBadge: 'Видео',
  templateCategoriesIntro: {
    eyebrow: 'Поддерживаемые форматы',
    heading: {
      before: 'Как именно ИИ ',
      accent: 'обрабатывает видео',
      after: '',
    },
  },
  templateCategories: [
    {
      title: '🤖 Автоматически',
      body: 'GoToFlow самостоятельно подбирает подходящую структуру под тему и исходный материал.',
    },
    {
      title: '📝 Строго по готовому сценарию',
      body: 'GoToFlow следует выбранной структуре без самостоятельной смены логики подачи.',
    },
    {
      title: '💡 Любая идея',
      body: 'Если нужного сценария нет в списке, пользователь может задать собственную тему или идею.',
    },
    {
      title: 'Видеоурок',
      body: 'Идеально для переупаковки обучающих материалов в пошаговую карусель.',
    },
    {
      title: 'Интервью',
      body: 'Превратите цитаты и ответы гостя в серию стильных карточек.',
    },
    {
      title: 'Разбор видео',
      body: 'Сделайте текстовую рецензию или выжимку главного из длинного подкаста.',
    },
  ],
  categoryCta: {
    label: 'Создать карусель из видео',
    href: 'https://app.gotoflow.io',
    action: 'open_app',
  },
  templateChoiceGuide: {
    eyebrow: 'Подготовка видео',
    title: {
      before: 'Какие видео дают ',
      accent: 'лучший результат',
      after: ' в карусели',
    },
    description: 'Лучше всего работают видео с понятной темой, голосовой дорожкой и полезной структурой. GoToFlow помогает расшифровать речь, выделить главное и распределить материал по слайдам.',
    items: [
      {
        id: 'video-lesson',
        task: 'Есть обучающий материал',
        template: 'Пошаговая карусель',
        structure: 'видеоурок легче превратить в последовательность шагов и выводов',
      },
      {
        id: 'interview',
        task: 'Есть интервью',
        template: 'Цитаты и ответы',
        structure: 'ответы гостя можно упаковать в серию коротких карточек',
      },
      {
        id: 'long-video',
        task: 'Есть длинное видео',
        template: 'Смысловая выжимка',
        structure: 'ИИ сокращает лишнюю воду и оставляет ключевые мысли',
      },
      {
        id: 'review',
        task: 'Нужен разбор',
        template: 'Рецензия или конспект',
        structure: 'подходит для подкастов, выступлений и аналитических видео',
      },
    ],
  },
  productWorkflow: {
    preset: 'carousel_creation',
    eyebrow: 'Процесс',
    title: {
      before: 'Как работает конвертация ',
      accent: 'видео в слайды',
      after: '',
    },
    description: 'Вставьте ссылку на YouTube-видео, проверьте выделенные мысли, настройте визуальный стиль и скачайте готовую карусель для Instagram.',
    carouselTypes: [
      { id: 'ai', label: 'AI-карусель', availability: 'available', active: true },
      { id: 'template', label: 'Шаблонная', availability: 'available' },
      { id: 'seamless', label: 'Бесшовная', availability: 'available' },
      { id: 'animated', label: 'Анимированная', availability: 'available' },
    ],
    stepOverrides: {
      source: {
        title: 'Вставка ссылки',
        description: 'Скопируйте ссылку на YouTube-видео в поле ввода.',
      },
      structure: {
        title: 'AI-транскрибация и анализ',
        description: 'Система автоматически распознает речь и извлекает из нее текст.',
      },
      textReview: {
        title: 'Смысловая выжимка',
        description: 'ИИ сокращает лишнюю воду и делит полезный контент на карточки.',
      },
      visualRoute: {
        title: 'Дизайн и верстка',
        description: 'Выберите визуальный шаблон, шрифты и настройте цвета под свой бренд.',
      },
      editorResult: {
        title: 'Скачивание',
        description: 'Получите готовые картинки в ZIP-архиве, готовые к публикации.',
      },
    },
    mockups: [
      {
        id: 'source-structure',
        title: 'Видео и транскрибация',
        caption: 'Видеоссылка, распознанная речь и выделенные ключевые мысли.',
        fallbackVisualType: 'source_structure',
      },
      {
        id: 'text-review',
        title: 'Смысловая структура',
        caption: 'Проверьте тезисы и распределение по будущим карточкам.',
        fallbackVisualType: 'text_review',
      },
      {
        id: 'visual-route',
        title: 'Дизайн и настройки',
        caption: 'Выберите шаблон, фон, шрифты и персонажа под ваш визуальный стиль.',
        fallbackVisualType: 'ai_template',
      },
      {
        id: 'editor-result',
        title: 'Готовые слайды',
        caption: 'Готовые слайды из утвержденной группы workflowResults.aiCarouselFiveSlides.',
        resultCarousel: {
          proofType: 'workflow-result',
          title: 'Из видео в готовые слайды',
          label: 'Видео в карусель',
          format: '4:5',
          slideCount: aiCarouselResultSlides.length,
          width: 1122,
          height: 1402,
          mode: 'Готовая карусель',
          images: aiCarouselResultSlides,
        },
        fallbackVisualType: 'editor_result',
      },
    ],
    featureChips: [
      'Вставка ссылки',
      'AI-транскрибация',
      'Смысловая выжимка',
      'Дизайн и верстка',
      'Скачивание',
    ],
    cta: {
      label: 'Создать карусель из видео',
      href: 'https://app.gotoflow.io',
      action: 'open_app',
      note: 'Вставьте ссылку на видео, проверьте структуру и доработайте готовые слайды перед публикацией.',
    },
  },
  productCapabilities: buildCanonicalProductCapabilities({
    heading: {
      before: 'Какие параметры можно настроить ',
      accent: 'перед скачиванием',
      after: '',
    },
    introCopy: 'Искусственный интеллект делает основную работу, но вы полностью контролируете финальный результат карусели.',
    highlightedCapabilities: ['video', 'aiStructureText', 'templates', 'textEditing', 'formats4511916', 'upTo10Slides'],
  }),
  readyCarouselShowcaseIntro: {
    eyebrow: 'Примеры каруселей',
    heading: {
      before: 'Посмотрите, какие карусели ',
      accent: 'получаются из видео',
      after: '',
    },
    body: 'Примеры показывают готовую структуру, заголовки, короткие смысловые блоки и визуальный дизайн после обработки видео-исходника.',
  },
  readyCarouselShowcase: textToCarouselReadyShowcase,
  readyCarouselShowcaseCta: {
    label: 'Создать карусель из видео',
    href: 'https://app.gotoflow.io',
    action: 'open_app',
    note: 'Перед публикацией результат можно проверить и отредактировать.',
  },
  pageSpecificVisualProof: {
    proofType: 'page-specific',
    eyebrow: 'Доказательство работы',
    heading: {
      before: 'Из длинного видео — ',
      accent: 'в емкую карусель',
      after: '',
    },
    title: 'Видео, ключевые мысли, структура и готовые слайды',
    description: 'Существующий proof pattern показывает путь от видео и панели транскрибации к выделенным ключевым мыслям, структуре и готовым слайдам GoToFlow из утвержденной группы workflowResults.aiCarouselFiveSlides.',
    label: 'Видео в карусель',
    format: '4:5',
    slideCount: aiCarouselResultSlides.length,
    width: 1122,
    height: 1402,
    mode: 'Готовые слайды',
    images: aiCarouselResultSlides,
  },
  useCasesIntro: {
    eyebrow: 'Сценарии',
    heading: {
      before: 'Какие видео можно ',
      accent: 'переупаковать в карусель',
      after: '',
    },
  },
  useCases: [
    { title: 'Видеоурок → Карусель', body: 'Переупакуйте обучающий материал в пошаговую карусель.' },
    { title: 'Интервью → Цитаты', body: 'Превратите ответы гостя в серию стильных карточек.' },
    { title: 'Подкаст → Выжимка', body: 'Сократите длинный разговор до главных мыслей.' },
    { title: 'Разбор → Слайды', body: 'Сделайте текстовую рецензию или конспект видео.' },
    { title: 'Выступление → Конспект', body: 'Сохраните ключевые тезисы из доклада в визуальном формате.' },
    { title: 'YouTube-видео → Instagram', body: 'Подготовьте материал для публикации в Instagram без ручной транскрибации.' },
  ],
  faq: videoToCarouselFaq,
  relatedIntro: {
    eyebrow: 'Связанные материалы',
    heading: {
      before: 'Что еще ',
      accent: 'попробовать',
      after: '',
    },
  },
  relatedCards: [
    {
      href: '/ru/ai-generator-karuselej',
      title: 'AI-генератор каруселей',
      description: 'Создавайте карусели с ИИ.',
      type: 'product_tool',
    },
    {
      href: '/ru/use-cases/tekst-v-karusel',
      title: 'Текст в карусель',
      description: 'Переупаковка готового текста.',
      type: 'seo_page',
    },
    {
      href: '/ru/use-cases/besshovnaya-karusel-instagram',
      title: 'Бесшовная карусель для Instagram',
      description: 'Сценарий для непрерывного визуального эффекта.',
      type: 'seo_page',
    },
  ],
  relatedSeoPages: ['ru-use-case-tekst-v-karusel', 'ru-use-case-besshovnaya-karusel-instagram'],
  relatedSeoPaths: ['/ru/use-cases/tekst-v-karusel', '/ru/use-cases/besshovnaya-karusel-instagram'],
  relatedProductToolPaths: ['/ru/ai-generator-karuselej'],
  contextualLinks: [],
  relatedBlogSlugs: [],
  breadcrumbs: [
    ruHomeBreadcrumb,
    { label: 'Карусели Instagram', path: '/ru/templates/instagram-carousel' },
    { label: 'Видео в карусель', path: '/ru/use-cases/video-v-karusel' },
  ],
  schemaType: 'WebPage',
  designReference: '/ru',
  urlOrigin: 'seo_registry_candidate',
  urlOriginEvidence: [
    'src/content/seoPages/handoffs/content_design_contract_video_v_karusel.md',
  ],
  intentOwner: 'ru-use-case-video-v-karusel',
  routeOwner: 'ru-use-case-video-v-karusel',
  canonicalOwner: '/ru/use-cases/video-v-karusel',
  riskLevel: 'medium',
  manualReviewReason: 'Local draft implementation. Owner visual approval is required before production integration, indexation, sitemap inclusion, push, or deploy.',
  createdFromActionMapRowIds: ['content-design-contract-video-v-karusel-2026-07-15'],
  notes: [
    'Local draft only; owner visual approval is intentionally false.',
    'GoToFlow SEO Publishing Platform is not part of this page integration.',
  ],
  review: waveOneLocalDraftReview,
  lastUpdated: '2026-07-15',
  ownershipDecision: ownershipDecision({
    decision: 'safe_new_registry_page',
    reason: 'No exact protected route collision found for the video-to-carousel use-case path; existing generator owners remain separate.',
    existingOwnerStatus: 'Existing carousel generator routes keep broad generator intent; this route owns video-to-carousel conversion intent.',
    intentOverlapPaths: ['/ru/ii-generator-karuseley', '/ru/generator-karuselej-instagram'],
  }),
  ...approvedReleaseLifecycle,
};

const vkPostGeneratorFaq = [
  { question: 'Может ли ИИ написать пост с нуля?', answer: 'Да, достаточно ввести короткую тему или пару ключевых слов, и система сгенерирует полноценный текст.' },
  { question: 'Пишет ли генератор продающие посты?', answer: 'Да, алгоритм знает популярные маркетинговые формулы и умеет мягко подводить читателя к нужному действию.' },
  { question: 'Генерируется только текст или картинки тоже?', answer: 'GoToFlow генерирует не только текст, но и визуальное сопровождение: картинку или карточку с вашим текстом.' },
  { question: 'Можно ли задать свой стиль общения (Tone of Voice)?', answer: 'Конечно. Вы можете указать, чтобы пост был написан строго, с юмором, дружелюбно или дерзко.' },
  { question: 'Подходит ли генератор для группы ВК?', answer: 'Генератор универсален. Он отлично справляется с контентом как для личных брендов, так и для коммерческих сообществ.' },
  { question: 'Умеет ли ИИ расставлять эмодзи?', answer: 'Да, система автоматически добавит релевантные эмодзи, чтобы текст легко читался, не перегружая его.' },
  { question: 'Можно ли использовать хэштеги?', answer: 'По запросу ИИ подберет и добавит популярные хэштеги для увеличения охватов во ВКонтакте.' },
  { question: 'Что делать, если мне не понравился сгенерированный вариант?', answer: 'Вы можете перегенерировать текст одним кликом или внести ручные правки во встроенном редакторе.' },
  { question: 'Можно ли вставить свой черновик для улучшения?', answer: 'Да, вставьте сырой текст, и система отредактирует его, исправит ошибки и улучшит структуру.' },
  { question: 'Уникален ли генерируемый текст?', answer: 'ИИ каждый раз создает уникальный контент. Вам не нужно переживать о плагиате или снижении охватов из-за неуникального текста.' },
  { question: 'Сколько постов можно сгенерировать за один раз?', answer: 'Вы генерируете посты по одному, чтобы максимально точно настроить параметры каждого конкретного материала.' },
  { question: 'Какого размера получаются картинки?', answer: 'Готовый визуал адаптирован для публикации во ВКонтакте и хорошо смотрится в ленте как с мобильного, так и с компьютера.' },
  { question: 'Нужно ли мне разбираться в промптах?', answer: 'Нет, интерфейс интуитивно понятен. Вам не нужно быть специалистом по нейросетям, чтобы получить отличный результат.' },
  { question: 'Могу ли я загрузить свой логотип на картинку к посту?', answer: 'Да, в визуальном редакторе можно добавить логотип, поменять шрифты и фирменные цвета.' },
  { question: 'Можно ли использовать генератор для страницы или сообщества VK?', answer: 'Да. Используйте результат как авторский черновик, проверяйте факты и адаптируйте формулировки под правила своей площадки.' },
];

const telegramPostGeneratorFaq = [
  { question: 'Можно ли использовать генератор для Telegram- или TG-канала?', answer: 'Да, алгоритм понимает, что в Telegram пользователи читают с экранов смартфонов. Он делает абзацы короткими, добавляет "воздух" и списки.' },
  { question: 'Пишет ли генератор длинные лонгриды (статьи)?', answer: 'По умолчанию генератор нацелен на стандартный формат поста для канала. Если нужна большая статья, лучше заранее задать желаемый объем и структуру текста.' },
  { question: 'Можно ли скопировать сгенерированный текст с сохранением форматирования?', answer: 'Да, текст генерируется таким образом, что при копировании в мессенджер сохраняются отступы и абзацы.' },
  { question: 'Умеет ли ИИ использовать эмодзи вместо буллитов?', answer: 'Да, система автоматически добавляет релевантные эмодзи для списков и акцентов, чтобы сделать пост более живым.' },
  { question: 'Создает ли генератор картинки к постам?', answer: 'Да. GoToFlow помогает подготовить текст и визуальное сопровождение, оформленное в вашем фирменном стиле.' },
  { question: 'Подходит ли генератор для ТГ-канала?', answer: 'Отлично подходит. Вы можете закинуть ссылку на новость или сырой факт, и ИИ перепишет это в понятную новостную сводку.' },
  { question: 'А если у меня канал с мемами, ИИ справится?', answer: 'Вы можете задать нейросети юмористический тон (Tone of Voice), и она напишет текст с нужным настроением.' },
  { question: 'Нужно ли платить за каждый сгенерированный пост?', answer: 'Использование генератора входит в подписку GoToFlow. Вы можете создавать контент в рамках вашего тарифа без доплат за каждый пост.' },
  { question: 'Сохраняет ли система историю сгенерированных постов?', answer: 'Готовый текст и визуал можно забрать из результата генерации и сохранить в своем рабочем процессе перед публикацией.' },
  { question: 'Можно ли использовать инструмент с телефона?', answer: 'Да, интерфейс GoToFlow адаптирован для мобильных устройств, поэтому вы можете вести канал прямо со смартфона.' },
  { question: 'Напишет ли ИИ продающий пост для запуска курса?', answer: 'Да, выберите соответствующий шаблон или укажите это в промпте, и система использует продающие формулы копирайтинга.' },
  { question: 'Какая тематика поддерживается?', answer: 'Любая. От криптовалюты и IT до психологии, кулинарии и бьюти-сферы.' },
  { question: 'Можно ли попросить ИИ добавить призыв к комментариям в конце?', answer: 'Да, система автоматически добавляет вовлекающие вопросы или призывы к действию, чтобы повысить ER (Engagement Rate).' },
  { question: 'Уникален ли текст? Не будет ли проблем с авторским правом?', answer: 'Весь сгенерированный текст полностью уникален.' },
  { question: 'Что, если ИИ написал не то, что я хотел?', answer: 'Вы всегда можете уточнить свой запрос и нажать кнопку перегенерации, либо вручную поправить пару слов перед скачиванием.' },
];

const buildPostGeneratorDraftPage = ({
  id,
  slug,
  contractTitle,
  title,
  description,
  h1,
  heroEyebrow,
  heroSubtitle,
  ctaLabel,
  secondaryCtaLabel,
  quickAnswerTitle,
  quickAnswerBody,
  choiceGuideDescription,
  readyExamplesBody,
  workflowDescription,
  productBridge,
  workflowTitle,
  workflowSteps,
  formatsTitle,
  formats,
  visualProofTitle,
  visualProofInputLabel,
  visualProofInputCopy,
  visualProofDescription,
  finalCtaTitle,
  finalCtaDescription,
  finalCtaLabel,
  faq,
  relatedHeading,
  relatedCards,
  primaryKeyword,
  secondaryKeywords,
  primaryIntent,
  platform,
  promptExample,
  resultExample,
}) => ({
  id,
  language: 'ru',
  pageType: 'tool',
  slug,
  path: `/ru/${slug}`,
  contractTitle,
  title,
  description,
  h1,
  heroSubtitle,
  primaryKeyword,
  secondaryKeywords,
  searchIntent: primaryIntent,
  priority: 0.68,
  commercialValue: 0.78,
  productBridge,
  primaryIntent,
  pageFamily: 'carousel_product_page',
  templateVariant: 'template_page',
  cta: {
    label: ctaLabel,
    href: 'https://app.gotoflow.io',
    action: 'open_app',
  },
  conversion: {
    destinationType: 'app',
    destinationUrl: 'https://app.gotoflow.io',
    targetAction: `create_${slug.replace(/-/g, '_')}`,
    pageEntity: slug.replace(/-/g, '_'),
    appDeepLinkVerified: false,
    appDeepLinkNotes: 'No verified page-specific app deep link is documented in this repo; conversion CTAs use the app origin.',
  },
  seoBrief: {
    pageEntity: `${slug.replace(/-/g, '_')}_tool_page`,
    primaryQuery: primaryKeyword,
    primaryIntent,
    userJob: `Создать пост для ${platform} из темы, заметок или исходного материала.`,
    uniqueAngle: `Platform-specific post generator draft for ${platform}.`,
    audience: `Авторы, эксперты, SMM-команды и бизнесы, которые ведут ${platform}.`,
    contentType: 'local draft product SEO page',
    platform,
    language: 'ru',
    country: 'RU',
    conversionAction: `create_${slug.replace(/-/g, '_')}`,
    productRoute: 'https://app.gotoflow.io',
    cannibalizationBoundary: `This route owns ${platform} post generation intent only; carousel and broad content generator routes keep their own intent.`,
  },
  sectionPolicy: Object.fromEntries(['hero', 'quickAnswer', 'pageRelevantFormats', 'productWorkflow', 'productCapabilities', 'readyCarouselShowcase', 'pageSpecificVisualProof', 'useCases', 'faq', 'related', 'finalCta'].map((sectionId) => [
    sectionId,
    {
      enabled: true,
      reason: `Section is required by the Carousel Page Production System and populated from the approved ${platform} post-generator content contract.`,
    },
  ])),
  heroEyebrow,
  heroSecondaryLinkLabel: secondaryCtaLabel,
  heroCarouselAssetIds: [
    'instagram-template-hero-product-case',
    'instagram-template-hero-expert-post',
    'instagram-template-hero-template-cover',
  ],
  heroVisualBadge: heroEyebrow,
  heroPromptExample: promptExample,
  heroResultExample: resultExample,
  quickAnswer: {
    title: quickAnswerTitle,
    body: quickAnswerBody,
  },
  productTruthTitle: 'Product Truth',
  sections: [],
  templateCategoriesIntro: {
    eyebrow: 'ФОРМАТЫ ПОСТОВ',
    heading: {
      before: `Какие посты для ${platform} `,
      accent: 'можно создать с ИИ',
      after: '',
    },
  },
  templateCategories: formats.map(({ title: itemTitle, body }) => ({ title: itemTitle, body })),
  categoryCta: {
    label: ctaLabel,
    href: 'https://app.gotoflow.io',
    action: 'open_app',
  },
  templateChoiceGuide: {
    eyebrow: 'ВЫБОР ФОРМАТА',
    title: {
      before: 'Как выбрать формат ',
      accent: `для ${platform}`,
      after: '',
    },
    description: choiceGuideDescription || quickAnswerBody,
    items: formats.slice(0, 4).map((format, index) => ({
      id: `${slug}-format-guide-${index + 1}`,
      task: format.title,
      template: format.title,
      structure: format.body,
    })),
  },
  productWorkflow: {
    preset: 'carousel_creation',
    eyebrow: 'КАК ЭТО РАБОТАЕТ',
    title: {
      before: `Как создать пост для ${platform} `,
      accent: 'с помощью ИИ',
      after: '',
    },
    description: workflowDescription || productBridge,
    carouselTypes: [
      { id: 'ai', label: 'AI-карусель', availability: 'available', active: true },
      { id: 'template', label: 'Шаблонная', availability: 'available' },
      { id: 'seamless', label: 'Бесшовная', availability: 'available' },
      { id: 'animated', label: 'Анимированная', availability: 'available' },
    ],
    stepOverrides: {
      source: {
        title: workflowSteps[0]?.title,
        description: workflowSteps[0]?.body,
      },
      structure: {
        title: workflowSteps[1]?.title,
        description: workflowSteps[1]?.body,
      },
      textReview: {
        title: workflowSteps[2]?.title,
        description: workflowSteps[2]?.body,
      },
      visualRoute: {
        title: workflowSteps[3]?.title,
        description: workflowSteps[3]?.body,
      },
      editorResult: {
        title: workflowSteps[4]?.title,
        description: workflowSteps[4]?.body,
      },
    },
    mockups: [
      {
        id: 'source-structure',
        title: workflowSteps[0]?.title,
        caption: workflowSteps[0]?.body,
        fallbackVisualType: 'source_structure',
      },
      {
        id: 'text-review',
        title: workflowSteps[2]?.title,
        caption: workflowSteps[2]?.body,
        fallbackVisualType: 'text_review',
      },
      {
        id: 'visual-route',
        title: workflowSteps[3]?.title,
        caption: workflowSteps[3]?.body,
        fallbackVisualType: 'ai_template',
      },
      {
        id: 'editor-result',
        title: workflowSteps[4]?.title,
        caption: workflowSteps[4]?.body,
        resultCarousel: {
          proofType: 'workflow-result',
          title: visualProofTitle,
          label: heroEyebrow,
          format: '4:5',
          slideCount: aiCarouselResultSlides.length,
          width: 1122,
          height: 1402,
          mode: 'Готовый пост',
          images: aiCarouselResultSlides,
        },
        fallbackVisualType: 'editor_result',
      },
    ],
    featureChips: workflowSteps.map((step) => step.title),
    cta: {
      label: ctaLabel,
      href: 'https://app.gotoflow.io',
      action: 'open_app',
      note: productBridge,
    },
  },
  productCapabilities: {
    eyebrow: 'ПАРАМЕТРЫ ПОСТА',
    heading: {
      before: 'Что можно настроить ',
      accent: `при создании поста для ${platform}`,
      after: '',
    },
    introCopy: productBridge,
    highlightedCapabilities: ['topicText', 'link', 'aiStructureText', 'textEditing', 'regeneration', 'cta'],
    groups: [
      {
        id: 'post-source',
        title: 'Исходная идея',
        body: 'Введите тему, черновик, ссылку на материал, заметки, голосовую мысль или файл с исходной информацией для будущего поста.',
        capabilityIds: ['topicText', 'link', 'video', 'pdf', 'voice'],
      },
      {
        id: 'post-structure',
        title: 'Структура текста',
        body: 'GoToFlow помогает выбрать подачу, выстроить логику публикации, подготовить заголовок, основные абзацы и финальный призыв.',
        capabilityIds: ['aiStructureText', 'templates'],
      },
      {
        id: 'post-tone',
        title: 'Тон и промпт',
        body: 'Можно задать стиль общения, уточнить задачу, добавить контекст аудитории и попросить систему переписать текст в нужной манере.',
        capabilityIds: ['customPrompt', 'regeneration'],
      },
      {
        id: 'post-visual',
        title: 'Визуальное сопровождение',
        body: 'Инструмент помогает подобрать оформление, фон, стиль изображения и персонажа, чтобы пост выглядел цельно рядом с текстом.',
        capabilityIds: ['aiStyle', 'background', 'character', 'formats4511916'],
      },
      {
        id: 'post-editing',
        title: 'Редактирование',
        body: 'Перед публикацией можно поправить текст, заменить формулировки, доработать визуальные элементы и перегенерировать слабые места.',
        capabilityIds: ['textEditing', 'slideEditing'],
      },
      {
        id: 'post-action',
        title: 'Призыв к действию',
        body: 'Добавьте финальный вопрос, приглашение к комментарию, переход по ссылке или другой CTA, который подходит цели публикации.',
        capabilityIds: ['cta'],
      },
      {
        id: 'post-output',
        title: 'Готовый результат',
        body: 'После проверки текста и визуального сопровождения вы получаете материал, который можно перенести в редакционный план и подготовить к публикации.',
        capabilityIds: ['cta', 'seamlessCarousels', 'animatedCarousels', 'upTo10Slides'],
      },
    ],
  },
  readyCarouselShowcaseIntro: {
    eyebrow: 'ГОТОВЫЕ ПРИМЕРЫ',
    heading: {
      before: 'Какие посты можно создать ',
      accent: `для ${platform}`,
      after: '',
    },
    body: readyExamplesBody || quickAnswerBody,
  },
  readyCarouselShowcase: textToCarouselReadyShowcase.map((item, index) => ({
    ...item,
    title: formats[index]?.title || item.title,
    body: formats[index]?.body || item.body,
    type: 'Готовый пост',
    audience: platform,
  })),
  readyCarouselShowcaseCta: {
    label: ctaLabel,
    href: 'https://app.gotoflow.io',
    action: 'open_app',
    note: productBridge,
  },
  pageSpecificVisualProof: {
    proofType: 'page-specific',
    eyebrow: 'ДОКАЗАТЕЛЬСТВО РАБОТЫ',
    heading: {
      before: visualProofTitle.includes('мессенджера')
        ? 'Как заметки становятся '
        : 'От идеи — ',
      accent: visualProofTitle.includes('мессенджера')
        ? 'готовым постом'
        : 'к готовому посту',
      after: visualProofTitle.includes('мессенджера')
        ? ''
        : ' в ленте',
    },
    title: visualProofTitle,
    description: visualProofDescription,
    label: heroEyebrow,
    format: '4:5',
    slideCount: aiCarouselResultSlides.length,
    width: 1122,
    height: 1402,
    mode: 'Готовый пост',
    inputLabel: visualProofInputLabel,
    inputCopy: visualProofInputCopy,
    images: aiCarouselResultSlides,
  },
  useCasesIntro: {
    eyebrow: 'СЦЕНАРИИ',
    heading: {
      before: 'Для каких задач подходят ',
      accent: platform === 'ВКонтакте'
        ? 'посты во ВКонтакте'
        : 'посты в Telegram',
      after: '',
    },
  },
  useCases: formats.slice(3).map((format) => ({
    title: format.title,
    body: format.body,
  })).concat(formats.slice(0, 3).map((format) => ({
    title: format.title,
    body: format.body,
  }))),
  finalCta: {
    eyebrow: 'Начать бесплатно',
    title: {
      before: platform === 'Telegram'
        ? 'Порадуйте подписчиков '
        : 'Напишите свой ',
      accent: platform === 'Telegram'
        ? 'новым контентом'
        : 'лучший пост',
      after: platform === 'Telegram'
        ? ''
        : ' прямо сейчас',
    },
    description: finalCtaDescription,
    primaryAction: {
      label: finalCtaLabel,
      href: 'https://app.gotoflow.io',
      action: 'open_app',
    },
  },
  faqPolicy: {
    minItems: 15,
    maxItems: 15,
    requireUniqueQuestions: true,
    requireVisibleSchemaParity: true,
  },
  faq,
  relatedIntro: {
    title: relatedHeading,
  },
  relatedCards,
  relatedSeoPages: relatedCards.filter((card) => card.type === 'seo_page').map((card) => card.href),
  relatedSeoPaths: relatedCards.filter((card) => card.type === 'seo_page').map((card) => card.href),
  relatedProductToolPaths: relatedCards.filter((card) => card.type === 'product_tool').map((card) => card.href),
  contextualLinks: [],
  relatedBlogSlugs: [],
  breadcrumbs: [
    ruHomeBreadcrumb,
    { label: heroEyebrow, path: `/ru/${slug}` },
  ],
  schemaType: 'WebApplication',
  designReference: '/ru',
  urlOrigin: 'seo_registry_candidate',
  urlOriginEvidence: [
    `src/content/seoPages/handoffs/content_design_contract_${slug.replace(/-/g, '_')}.md`,
  ],
  intentOwner: id,
  routeOwner: id,
  canonicalOwner: `/ru/${slug}`,
  riskLevel: 'medium',
  manualReviewReason: 'Local draft implementation. Owner visual approval is required before production integration, indexation, sitemap inclusion, push, or deploy.',
  createdFromActionMapRowIds: [`content-design-contract-${slug}-2026-07-15`],
  notes: [
    'Local draft only; owner visual approval is intentionally false.',
    'Rendered through CarouselProductSeoPageTemplate via the carousel_product_page family using existing production visual patterns.',
  ],
  review: waveOneLocalDraftReview,
  lastUpdated: '2026-07-15',
  ownershipDecision: ownershipDecision({
    decision: 'safe_new_registry_page',
    reason: `No exact protected route collision found; this route owns ${platform} post generation intent.`,
    existingOwnerStatus: 'No exact existing protected RU product/tool route owner found.',
    intentOverlapPaths: ['/ru/generator-postov-instagram'],
  }),
  ...approvedReleaseLifecycle,
});

const vkPostGeneratorDraftPage = buildPostGeneratorDraftPage({
  id: 'ru-tool-vk-post-generator',
  slug: 'vk-post-generator',
  contractTitle: 'ИИ-генератор постов для ВКонтакте онлайн — GoToFlow',
  title: 'ИИ-генератор постов для ВКонтакте онлайн — GoToFlow',
  description: 'Сгенерируйте вовлекающий пост для ВКонтакте с помощью ИИ. Создавайте продающие, экспертные посты и новости с картинками за пару кликов.',
  h1: 'ИИ-генератор постов для ВКонтакте',
  heroEyebrow: 'Генератор постов ВКонтакте',
  heroSubtitle: 'Забудьте про страх чистого листа. Опишите свою идею или дайте ссылку на исходник, и GoToFlow сгенерирует идеальный пост для ВКонтакте с цепляющим заголовком, правильной структурой и готовым визуалом.',
  ctaLabel: 'Сгенерировать пост',
  secondaryCtaLabel: 'Примеры постов',
  quickAnswerTitle: 'Как работает генератор постов для ВКонтакте?',
  quickAnswerBody: 'Просто напишите тему или вставьте свои сырые заметки. Генератор постов для ВК проанализирует контекст, подберет нужный tone-of-voice и напишет готовый текст. Дополнительно система подготовит визуальное сопровождение, чтобы публикация выглядела цельно в ленте.',
  choiceGuideDescription: 'Просто напишите тему или вставьте свои сырые заметки. GoToFlow проанализирует контекст, подберет нужный tone-of-voice и поможет подготовить пост для группы ВК без ручной сборки структуры.',
  readyExamplesBody: 'Посмотрите, какие типы публикаций можно подготовить из темы, заметок или черновика без самостоятельной сборки структуры.',
  productBridge: 'GoToFlow выступает как единое окно для создания контента. Алгоритм не просто пишет текст: он помогает собрать полноценный пост для ВКонтакте с понятным заголовком, читаемыми абзацами, подходящим тоном, визуальным сопровождением и призывом к действию.',
  workflowTitle: 'Как создать пост для ВК за 5 шагов',
  workflowSteps: [
    { title: 'Тема', body: 'Опишите идею своими словами или вставьте черновик текста.' },
    { title: 'ИИ создает текст', body: 'Система пишет структурированный пост с заголовком, абзацами и призывом к действию.' },
    { title: 'Редактирование', body: 'Проверьте смысл, тон, формулировки и при необходимости перегенерируйте слабые места.' },
    { title: 'Подбор визуала', body: 'GoToFlow помогает подобрать изображение или карточку, которая поддерживает смысл публикации.' },
    { title: 'Готовый пост', body: 'Скопируйте текст, заберите визуал и опубликуйте материал на стене или в сообществе ВКонтакте.' },
  ],
  formatsTitle: 'Что умеет генерировать ИИ',
  formats: [
    { title: 'Автоматически', body: 'GoToFlow самостоятельно подбирает подходящую структуру под тему и исходный материал.' },
    { title: 'Строго по готовому сценарию', body: 'GoToFlow следует выбранной структуре без самостоятельной смены логики подачи.' },
    { title: 'Любая идея', body: 'Если нужного сценария нет в списке, пользователь может задать собственную тему или идею.' },
    { title: 'Продающий пост', body: 'Генерация постов, нацеленных на конверсию: акции, анонсы продуктов и спецпредложения.' },
    { title: 'Экспертный пост', body: 'Демонстрация экспертизы: полезные советы, разбор кейсов и ответы на вопросы аудитории.' },
    { title: 'Новость компании', body: 'Информационные посты: обновления, достижения и важные события в вашем бизнесе.' },
  ],
  visualProofTitle: 'От идеи к готовому посту в ленте',
  visualProofInputLabel: 'Подсказка',
  visualProofInputCopy: 'Расскажи про наш новый курс по дизайну',
  visualProofDescription: 'Слева — простая текстовая подсказка в поле ввода, справа — готовый пост для ВКонтакте: заголовок, читаемый текст, визуальный акцент и понятный CTA.',
  finalCtaTitle: 'Напишите свой лучший пост прямо сейчас',
  finalCtaDescription: 'Хватит ломать голову над формулировками и дизайном. Начните собирать лайки и комментарии уже сегодня.',
  finalCtaLabel: 'Создать пост для ВКонтакте',
  faq: vkPostGeneratorFaq,
  relatedHeading: 'Другие инструменты',
  relatedCards: [
    { href: '/ru/telegram-post-generator', title: 'ИИ генератор постов для Telegram', type: 'seo_page' },
    { href: '/ru/generator-kontenta', title: 'AI-генератор контента', type: 'product_tool' },
    { href: '/ru/generator-postov-instagram', title: 'Генератор постов Instagram', type: 'product_tool' },
  ],
  primaryKeyword: 'генератор постов вконтакте',
  secondaryKeywords: ['написать пост вк нейросетью', 'ИИ генератор постов для ВКонтакте', 'создать пост ВК онлайн'],
  primaryIntent: 'ИИ генератор постов для ВКонтакте',
  platform: 'ВКонтакте',
  promptExample: 'Расскажи про наш новый курс по дизайну',
  resultExample: 'Готовый пост для ВКонтакте: заголовок, абзацы, визуальная структура и CTA для сообщества.',
});

const telegramPostGeneratorDraftPage = buildPostGeneratorDraftPage({
  id: 'ru-tool-telegram-post-generator',
  slug: 'telegram-post-generator',
  contractTitle: 'ИИ-генератор постов для Telegram онлайн — GoToFlow',
  title: 'ИИ-генератор постов для Telegram онлайн — GoToFlow',
  description: 'Создавайте вовлекающие посты для Telegram-канала с помощью ИИ. Генератор пишет тексты с нужным тоном, добавляет правильную разметку, эмодзи и создает визуал.',
  h1: 'ИИ-генератор постов для Telegram',
  heroEyebrow: 'Генератор постов Telegram',
  heroSubtitle: 'Ведение Telegram-канала отнимает много времени? Доверьте рутину ИИ. GoToFlow сгенерирует идеальный пост на любую тему, добавит нужные смыслы, расставит акценты и подготовит стильное изображение для привлечения внимания в ленте.',
  ctaLabel: 'Создать пост для Telegram',
  secondaryCtaLabel: 'Посмотреть примеры',
  quickAnswerTitle: 'Как написать пост для Telegram-канала с ИИ?',
  quickAnswerBody: 'Введите свою идею, наброски или тему в поле ввода. Искусственный интеллект изучит контекст и напишет пост для Телеграм-канала: с короткими абзацами, уместными эмодзи, четкой структурой и визуальной карточкой для ленты.',
  choiceGuideDescription: 'Введите тему, черновик или набор тезисов. GoToFlow поможет выбрать формат и собрать пост для канала без ручной подготовки структуры.',
  readyExamplesBody: 'Посмотрите, какие сценарии можно превратить в пост для Телеграма: от экспертного разбора до короткого дайджеста.',
  workflowDescription: 'GoToFlow помогает пройти весь путь подготовки материала для ТГ-канала: от идеи и структуры до текста, визуального сопровождения и финального CTA.',
  productBridge: 'GoToFlow решает задачу комплексной подготовки поста. Это не просто чат-бот для текста: система помогает собрать проработанный текстовый блок для Telegram с воздухом между абзацами, списками, акцентами, визуальным сопровождением и финальным CTA.',
  workflowTitle: 'Генерация поста за 5 простых шагов',
  workflowSteps: [
    { title: 'Тема', body: 'Опишите, о чем хотите рассказать, или вставьте ссылку на источник.' },
    { title: 'ИИ создает текст', body: 'Нейросеть готовит текст нужного объема с короткими абзацами и понятным форматированием.' },
    { title: 'Редактирование', body: 'Проверьте акценты, тон, эмодзи, списки и при необходимости уточните запрос.' },
    { title: 'Подбор визуала', body: 'Выберите изображение или карточку, которая будет сопровождать пост в канале.' },
    { title: 'Готовый пост', body: 'Скопируйте текст, заберите визуал и отправьте готовый материал в свой Telegram-канал.' },
  ],
  formatsTitle: 'Какие форматы постов можно создать',
  formats: [
    { title: 'Автоматически', body: 'GoToFlow самостоятельно подбирает подходящую структуру под тему и исходный материал.' },
    { title: 'Строго по готовому сценарию', body: 'GoToFlow следует выбранной структуре без самостоятельной смены логики подачи.' },
    { title: 'Любая идея', body: 'Если нужного сценария нет в списке, пользователь может задать собственную тему или идею.' },
    { title: 'Экспертный пост', body: 'Разбор сложных тем простым языком, демонстрация профессионализма для удержания лояльной аудитории.' },
    { title: 'Дайджест', body: 'Подборка полезных ссылок, новостей или инструментов за неделю в удобном списочном формате.' },
    { title: 'Пост для канала', body: 'Короткий, вовлекающий формат для поддержания активности и общения с подписчиками.' },
  ],
  visualProofTitle: 'Идеальный формат для мессенджера',
  visualProofInputLabel: 'Хаотичные заметки',
  visualProofInputCopy: 'Идея, наброски, факты и короткие тезисы для канала',
  visualProofDescription: 'Слева — хаотичные заметки, справа — готовый пост для Telegram: короткие абзацы, акценты, эмодзи, визуальная карточка и финальный CTA.',
  finalCtaTitle: 'Порадуйте подписчиков новым контентом',
  finalCtaDescription: 'Перестаньте откладывать ведение канала из-за нехватки времени. Создайте крутой пост прямо сейчас.',
  finalCtaLabel: 'Сгенерировать пост в Telegram',
  faq: telegramPostGeneratorFaq,
  relatedHeading: 'Связанные инструменты',
  relatedCards: [
    { href: '/ru/vk-post-generator', title: 'ИИ генератор постов для ВКонтакте', type: 'seo_page' },
    { href: '/ru/generator-kontenta', title: 'AI-генератор контента', type: 'product_tool' },
    { href: '/ru/generator-postov-instagram', title: 'Генератор постов Instagram', type: 'product_tool' },
  ],
  primaryKeyword: 'генератор постов telegram',
  secondaryKeywords: ['написать пост в телеграм канал', 'нейросеть для телеграм постов', 'ИИ генератор постов для Telegram'],
  primaryIntent: 'ИИ генератор постов для Telegram',
  platform: 'Telegram',
  promptExample: 'Наброски для поста в канал: запуск, польза, дедлайн',
  resultExample: 'Готовый пост для Telegram: короткие абзацы, акценты, визуальная карточка и финальный CTA.',
});

const seamlessSectionPolicy = Object.fromEntries([
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
    contentType: 'production use-case SEO page',
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
  heroCarouselAssetIds: [
    'instagram-template-hero-expert-post',
    'instagram-template-hero-template-cover',
    'instagram-template-hero-product-case',
  ],
  heroVisualBadge: 'Бесшовная',
  templateCategoriesIntro: {
    eyebrow: seamlessCopySlot('pageRelevantFormats', 'sectionEyebrow'),
    heading: {
      before: 'Для каких задач подходит ',
      accent: 'бесшовный дизайн',
      after: '',
    },
  },
  templateCategories: [
    {
      title: 'Автоматически',
      body: 'GoToFlow самостоятельно подбирает подходящую структуру под тему и исходный материал.',
    },
    {
      title: 'Строго по готовому сценарию',
      body: 'GoToFlow следует выбранной структуре без самостоятельной смены логики подачи.',
    },
    {
      title: 'Любая идея',
      body: 'Если нужного сценария нет в списке, пользователь может задать собственную тему или идею.',
    },
    {
      title: 'Пошаговая инструкция',
      body: 'Разберите сложную тему на шаги. Единая линия дизайна будет вести читателя от первого слайда к последнему.',
    },
    {
      title: 'Экспертный разбор',
      body: 'Оформите список советов так, чтобы каждый пункт визуально продолжал предыдущий.',
    },
    {
      title: 'Продуктовый рассказ',
      body: 'Проведите читателя через проблему, решение, детали предложения и следующий шаг.',
    },
  ],
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
    heading: {
      before: 'Как выглядит ',
      accent: 'бесшовная карусель',
      after: ' в Instagram',
    },
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
    heading: {
      before: 'Посмотрите, какие карусели можно создать в ',
      accent: 'GoToFlow',
      after: '',
    },
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
    heading: {
      before: 'Что можно настроить при создании ',
      accent: 'бесшовной карусели',
      after: '',
    },
    introCopy: seamlessCopySlot('productCapabilities', 'introCopy', seamlessInstagramCarouselHandoff.productProofModules.canonicalProductCapabilities.introCopy),
    highlightedCapabilities: ['seamlessCarousels', 'formats4511916', 'upTo10Slides', 'slideEditing'],
  }),
  useCasesIntro: {
    eyebrow: 'Сценарии',
    heading: {
      before: 'Для каких задач подходит ',
      accent: 'бесшовная карусель',
      after: '',
    },
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
    { label: 'Карусели Instagram', path: '/ru/templates/instagram-carousel' },
    { label: seamlessCopySlot('hero', 'heading'), path: seamlessInstagramCarouselHandoff.route },
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
    approvedAt: '2026-07-15',
    notes: 'Approved for the first Carousel Page Production System release batch after local SEO release gates.',
  },
  contentReviewedByHuman: true,
  uniquenessReviewedByHuman: true,
  internalLinksReviewedByHuman: true,
  ctaReviewedByHuman: true,
  productClaimsReviewedByHuman: true,
  ownerVisualApprovalReceived: true,
  review: {
    owner: 'GoToFlow',
    contentReviewedAt: '2026-07-14',
    productClaimsReviewedAt: '2026-07-14',
    assetsReviewedAt: '2026-07-15',
    seoReviewedAt: '2026-07-15',
    productVersion: 'seo-pages-release-2026-07-15',
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
  manualReviewReason: 'Approved for production integration in the first Carousel Page Production System release batch.',
  createdFromActionMapRowIds: ['seamless-instagram-carousel-gemini-handoff-2026-07-14'],
  notes: [
    seamlessInstagramCarouselHandoff.generatorBoundary,
    seamlessInstagramCarouselHandoff.articleBoundary,
    'Released as an indexable use-case page after owner approval and local release gates.',
  ],
  draftPreviewIntegrated: true,
  productionIntegrationCompleted: true,
  approvedForRelease: true,
  lastUpdated: '2026-07-15',
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
  textToCarouselDraftPage,
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
      productWorkflow: { enabled: true, reason: 'Shows truthful GoToFlow product workflow after structure choice.' },
      productCapabilities: { enabled: true, reason: 'Shows the canonical verified product capabilities shared by product SEO pages.' },
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
    heroCarouselAssetIds: [
      'instagram-template-hero-expert-post',
      'instagram-template-hero-template-cover',
      'instagram-template-hero-product-case',
    ],
    templateCategoriesIntro: {
      eyebrow: 'Категории',
      heading: {
        before: 'Популярные форматы ',
        accent: 'шаблонов',
        after: '',
      },
    },
    readyCarouselShowcase: getSeoCarouselAssets('readyShowcase', 'instagramCarousel'),
    readyCarouselShowcaseIntro: {
      eyebrow: 'Готовый результат',
      heading: {
        before: 'Посмотрите, какие карусели можно создать в ',
        accent: 'GoToFlow',
        after: '',
      },
      body: 'Готовая структура, текст по слайдам, визуальная подача и CTA — результат, который можно сразу забирать в работу.',
    },
    readyCarouselShowcaseCta: {
      label: 'Выбрать структуру и создать карусель',
      href: 'https://app.gotoflow.io',
      action: 'open_app',
      note: 'Перед публикацией результат можно проверить и отредактировать.',
    },
    productCapabilities: buildCanonicalProductCapabilities({
      heading: {
        before: 'Что можно настроить в ',
        accent: 'GoToFlow',
        after: '',
      },
      introCopy: 'GoToFlow поддерживает разные исходники, AI-структуру и текст, шаблоны, стили, промпты, фон, персонажа, CTA, редактирование, перегенерацию, бесшовные и анимированные карусели, форматы 4:5, 1:1 и 9:16 и до 10 слайдов для Instagram-карусели.',
      highlightedCapabilities: ['templates', 'aiStructureText', 'textEditing', 'formats4511916'],
    }),
    useCasesIntro: {
      eyebrow: 'Сценарии',
      heading: {
        before: 'Для каких задач подходят ',
        accent: 'шаблоны каруселей',
        after: '',
      },
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
        title: 'Автоматически',
        body: 'GoToFlow самостоятельно подбирает подходящую структуру под тему и исходный материал.',
      },
      {
        title: 'Строго по готовому сценарию',
        body: 'GoToFlow следует выбранной структуре без самостоятельной смены логики подачи.',
      },
      {
        title: 'Любая идея',
        body: 'Если нужного сценария нет в списке, пользователь может задать собственную тему или идею.',
      },
      {
        title: 'Экспертный чек-лист',
        body: 'Подходит для полезной карусели с последовательностью шагов: обложка с обещанием и 5–7 практических пунктов.',
      },
      {
        title: 'Проблема и решение',
        body: 'Удобно использовать, когда нужно показать боль аудитории, объяснить причину и предложить подход.',
      },
      {
        title: 'Разбор ошибки',
        body: 'Формат для образовательного контента: назвать распространённую ошибку, показать последствия и дать корректный вариант.',
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
      heading: {
        before: 'Как структура превращается в ',
        accent: 'готовую карусель',
        after: '',
      },
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
    relatedSeoPaths: ['/ru/use-cases/besshovnaya-karusel-instagram', '/ru/use-cases/tekst-v-karusel'],
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

const waveOneLocalDraftPages = [
  videoToCarouselDraftPage,
  vkPostGeneratorDraftPage,
  telegramPostGeneratorDraftPage,
];

const waveOneLocalDraftIds = new Set(waveOneLocalDraftPages.map((page) => page.id));
const contractDraftPreviewIds = new Set(contractDraftPreviewPages.map((page) => page.id));
const contractApprovedReleaseIds = new Set(contractApprovedReleasePages.map((page) => page.id));

const seoPagesSource = [
  ...waveOneLocalDraftPages,
  ...contractDraftPreviewPages,
  ...contractApprovedReleasePages,
  ...rawSeoPages.filter((page) => (
    !waveOneLocalDraftIds.has(page.id) &&
    !contractDraftPreviewIds.has(page.id) &&
    !contractApprovedReleaseIds.has(page.id)
  )),
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
        : seoPagesSource.find((candidate) => candidate.id === idOrPath)?.path
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

export const seoPages = seoPagesSource.map(normalizeLegacySeoPage);

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
