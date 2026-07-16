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

const localDraftLifecycle = {
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
    notes: 'Local draft remains noindex until owner visual approval and a separate production/indexation decision.',
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

const waveOneLocalDraftReview = {
  owner: 'GoToFlow',
  contentReviewedAt: '',
  productClaimsReviewedAt: '',
  assetsReviewedAt: '',
  seoReviewedAt: '',
  productVersion: 'wave-1-local-draft',
};

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
  ...localDraftLifecycle,
};

const vkPostGeneratorFaq = [
  { question: 'Может ли ИИ написать пост с нуля?', answer: 'Да, достаточно ввести короткую тему или пару ключевых слов, и система сгенерирует полноценный текст.' },
  { question: 'Пишет ли генератор продающие посты?', answer: 'Да, алгоритм знает популярные маркетинговые формулы и умеет мягко подводить читателя к нужному действию.' },
  { question: 'Генерируется только текст или картинки тоже?', answer: 'GoToFlow генерирует не только текст, но и визуальное сопровождение: картинку или карточку с вашим текстом.' },
  { question: 'Можно ли задать свой стиль общения (Tone of Voice)?', answer: 'Конечно. Вы можете указать, чтобы пост был написан строго, с юмором, дружелюбно или дерзко.' },
  { question: 'Подходит ли это для личной страницы и паблика?', answer: 'Генератор универсален. Он отлично справляется с контентом как для личных брендов, так и для коммерческих сообществ.' },
  { question: 'Умеет ли ИИ расставлять эмодзи?', answer: 'Да, система автоматически добавит релевантные эмодзи, чтобы текст легко читался, не перегружая его.' },
  { question: 'Можно ли использовать хэштеги?', answer: 'По запросу ИИ подберет и добавит популярные хэштеги для увеличения охватов во ВКонтакте.' },
  { question: 'Что делать, если мне не понравился сгенерированный вариант?', answer: 'Вы можете перегенерировать текст одним кликом или внести ручные правки во встроенном редакторе.' },
  { question: 'Можно ли вставить свой черновик для улучшения?', answer: 'Да, вставьте сырой текст, и система отредактирует его, исправит ошибки и улучшит структуру.' },
  { question: 'Уникален ли генерируемый текст?', answer: 'ИИ каждый раз создает уникальный контент. Вам не нужно переживать о плагиате или снижении охватов из-за неуникального текста.' },
  { question: 'Сколько постов можно сгенерировать за один раз?', answer: 'Вы генерируете посты по одному, чтобы максимально точно настроить параметры каждого конкретного материала.' },
  { question: 'Какого размера получаются картинки?', answer: 'Готовый визуал адаптирован для публикации во ВКонтакте и хорошо смотрится в ленте как с мобильного, так и с компьютера.' },
  { question: 'Нужно ли мне разбираться в промптах?', answer: 'Нет, интерфейс интуитивно понятен. Вам не нужно быть специалистом по нейросетям, чтобы получить отличный результат.' },
  { question: 'Могу ли я загрузить свой логотип на картинку к посту?', answer: 'Да, в визуальном редакторе можно добавить логотип, поменять шрифты и фирменные цвета.' },
  { question: 'Безопасно ли использовать ИИ для ведения группы ВК?', answer: 'Абсолютно. Алгоритмы ВКонтакте не пессимизируют качественный авторский контент, даже если он был создан с помощью нейросетей.' },
];

const telegramPostGeneratorFaq = [
  { question: 'Учитывает ли ИИ специфику Telegram?', answer: 'Да, алгоритм понимает, что в Telegram пользователи читают с экранов смартфонов. Он делает абзацы короткими, добавляет "воздух" и списки.' },
  { question: 'Пишет ли генератор длинные лонгриды (статьи)?', answer: 'По умолчанию генератор нацелен на стандартный формат поста для канала. Если нужна большая статья, лучше заранее задать желаемый объем и структуру текста.' },
  { question: 'Можно ли скопировать сгенерированный текст с сохранением форматирования?', answer: 'Да, текст генерируется таким образом, что при копировании в мессенджер сохраняются отступы и абзацы.' },
  { question: 'Умеет ли ИИ использовать эмодзи вместо буллитов?', answer: 'Да, система автоматически добавляет релевантные эмодзи для списков и акцентов, чтобы сделать пост более живым.' },
  { question: 'Создает ли генератор картинки к постам?', answer: 'Да. GoToFlow не только пишет текст, но и помогает подготовить визуальное сопровождение, оформленное в вашем фирменном стиле.' },
  { question: 'Подходит ли это для новостных каналов?', answer: 'Отлично подходит. Вы можете закинуть ссылку на новость или сырой факт, и ИИ перепишет это в понятную новостную сводку.' },
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
    eyebrow: 'Форматы постов',
    heading: {
      before: formatsTitle.includes('Что умеет')
        ? 'Что умеет '
        : 'Какие форматы ',
      accent: formatsTitle.includes('Что умеет')
        ? 'генерировать ИИ'
        : 'постов',
      after: formatsTitle.includes('Что умеет')
        ? ''
        : ' можно создать',
    },
  },
  templateCategories: formats.map(({ title: itemTitle, body }) => ({ title: itemTitle, body })),
  categoryCta: {
    label: ctaLabel,
    href: 'https://app.gotoflow.io',
    action: 'open_app',
  },
  templateChoiceGuide: {
    eyebrow: 'Выбор формата',
    title: {
      before: 'Как выбрать формат ',
      accent: `для ${platform}`,
      after: '',
    },
    description: quickAnswerBody,
    items: formats.slice(0, 4).map((format, index) => ({
      id: `${slug}-format-guide-${index + 1}`,
      task: format.title,
      template: format.title,
      structure: format.body,
    })),
  },
  productWorkflow: {
    preset: 'carousel_creation',
    eyebrow: 'Как это работает',
    title: {
      before: 'Как работает генерация ',
      accent: `поста для ${platform}`,
      after: '',
    },
    description: productBridge,
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
      note: quickAnswerBody,
    },
  },
  productCapabilities: {
    eyebrow: 'Параметры поста',
    heading: {
      before: 'Какие параметры можно настроить ',
      accent: `для ${platform}`,
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
    eyebrow: 'Готовые примеры',
    heading: {
      before: 'Какие посты можно ',
      accent: `создать для ${platform}`,
      after: '',
    },
    body: quickAnswerBody,
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
    eyebrow: 'Доказательство работы',
    heading: {
      before: visualProofTitle.includes('мессенджера')
        ? 'Как заметки становятся '
        : 'От идеи — ',
      accent: visualProofTitle.includes('мессенджера')
        ? 'готовым постом'
        : 'готовым постом',
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
    eyebrow: 'Сценарии',
    heading: {
      before: 'Какие задачи закрывает ',
      accent: `${platform}-пост`,
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
  ...localDraftLifecycle,
});

const vkPostGeneratorDraftPage = buildPostGeneratorDraftPage({
  id: 'ru-tool-vk-post-generator',
  slug: 'vk-post-generator',
  contractTitle: 'ИИ-генератор постов для ВКонтакте онлайн — GoToFlow',
  title: 'ИИ-генератор постов для ВКонтакте онлайн — GoToFlow',
  description: 'Сгенерируйте вовлекающий пост для ВКонтакте с помощью ИИ. Создавайте продающие, экспертные посты и новости с картинками за пару кликов.',
  h1: 'ИИ генератор постов для ВКонтакте',
  heroEyebrow: 'Генератор постов ВК',
  heroSubtitle: 'Забудьте про страх чистого листа. Опишите свою идею или дайте ссылку на исходник, и GoToFlow сгенерирует идеальный пост для ВКонтакте с цепляющим заголовком, правильной структурой и готовым визуалом.',
  ctaLabel: 'Сгенерировать пост',
  secondaryCtaLabel: 'Примеры постов',
  quickAnswerTitle: 'Как работает генератор постов для ВКонтакте?',
  quickAnswerBody: 'Просто напишите тему или вставьте свои сырые заметки. Наш искусственный интеллект проанализирует контекст, подберет нужный tone-of-voice и напишет готовый пост. Дополнительно система подготовит визуальное сопровождение, чтобы публикация выглядела цельно в ленте ВК.',
  productBridge: 'GoToFlow выступает как единое окно для создания контента. Алгоритм не просто пишет текст: он помогает собрать полноценный пост для ВКонтакте с понятным заголовком, читаемыми абзацами, подходящим тоном, визуальным сопровождением и призывом к действию.',
  workflowTitle: 'Как создать пост для ВК за 5 шагов',
  workflowSteps: [
    { title: 'Тема', body: 'Опишите идею своими словами или вставьте черновик текста.' },
    { title: 'ИИ создает текст', body: 'Система пишет структурированный пост с заголовком, абзацами и призывом к действию.' },
    { title: 'Редактирование', body: 'Проверьте смысл, тон, формулировки и при необходимости перегенерируйте слабые места.' },
    { title: 'Подбор визуала', body: 'GoToFlow помогает подобрать изображение или карточку, которая поддерживает смысл публикации.' },
    { title: 'Готовый пост', body: 'Скопируйте текст, заберите визуал и опубликуйте материал на стене или в сообществе ВК.' },
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
  resultExample: 'Готовый пост для ВК: заголовок, абзацы, визуальная структура и CTA для сообщества.',
});

const telegramPostGeneratorDraftPage = buildPostGeneratorDraftPage({
  id: 'ru-tool-telegram-post-generator',
  slug: 'telegram-post-generator',
  contractTitle: 'ИИ-генератор постов для Telegram онлайн — GoToFlow',
  title: 'ИИ-генератор постов для Telegram онлайн — GoToFlow',
  description: 'Создавайте вовлекающие посты для Telegram-канала с помощью ИИ. Генератор пишет тексты с нужным тоном, добавляет правильную разметку, эмодзи и создает визуал.',
  h1: 'ИИ генератор постов для Telegram',
  heroEyebrow: 'Генератор постов Telegram',
  heroSubtitle: 'Ведение Telegram-канала отнимает много времени? Доверьте рутину ИИ. GoToFlow сгенерирует идеальный пост на любую тему, добавит нужные смыслы, расставит акценты и подготовит стильное изображение для привлечения внимания в ленте.',
  ctaLabel: 'Создать пост для Telegram',
  secondaryCtaLabel: 'Посмотреть примеры',
  quickAnswerTitle: 'Как написать пост для Telegram-канала с ИИ?',
  quickAnswerBody: 'Введите свою идею, наброски или тему в поле ввода. Искусственный интеллект изучит контекст и напишет пост, подходящий под формат Telegram: с короткими абзацами, уместными эмодзи, четкой структурой и визуальной карточкой для ленты канала.',
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
  visualProofDescription: 'Слева — хаотичные заметки, справа — готовый Telegram-пост: короткие абзацы, акценты, эмодзи, визуальная карточка и финальный CTA.',
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
  resultExample: 'Готовый Telegram-пост: короткие абзацы, акценты, визуальная карточка и финальный CTA.',
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

const seoPagesSource = [
  ...waveOneLocalDraftPages,
  ...rawSeoPages.filter((page) => !waveOneLocalDraftIds.has(page.id)),
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
