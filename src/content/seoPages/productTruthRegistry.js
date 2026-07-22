export const SEO_PRODUCT_TRUTH_REGISTRY = {
  appOrigin: 'https://app.gotoflow.io',
  reviewStatus: 'approved_for_indexation',
  productVersion: 'seo-pages-2026-07-11',
  reviewedBy: 'Fast Magic',
  reviewedAt: '2026-07-11',
  supportedInputTypes: {
    topic: { status: 'available', evidence: 'docs/product/gotoflow-capabilities.md section 2.1.' },
    text: { status: 'available', evidence: 'docs/product/gotoflow-capabilities.md section 2.1.' },
    link: { status: 'available', evidence: 'docs/product/gotoflow-capabilities.md section 2.1.' },
    video: { status: 'available', evidence: 'docs/product/gotoflow-capabilities.md section 2.1.' },
    pdf: { status: 'available', evidence: 'docs/product/gotoflow-capabilities.md section 2.1.' },
    voice: { status: 'available', evidence: 'docs/product/gotoflow-capabilities.md section 2.1.' },
    image: { status: 'available', evidence: 'docs/product/gotoflow-capabilities.md section 2.1.' },
    screenshot: { status: 'available', evidence: 'docs/product/gotoflow-capabilities.md section 2.1.' },
    userPhoto: { status: 'available', evidence: 'docs/product/gotoflow-capabilities.md sections 2 and 2.1.' },
  },
  supportedOutputs: {
    completeCarousel: { status: 'available', evidence: 'docs/product/gotoflow-capabilities.md sections 1, 2, and 4.' },
    slideText: { status: 'available', evidence: 'docs/product/gotoflow-capabilities.md sections 1, 2, and 4.' },
    visualCarousel: { status: 'available', evidence: 'docs/product/gotoflow-capabilities.md sections 1, 2, and 4.' },
    directSocialPublishing: { status: 'not_supported', evidence: 'No verified direct publishing route in the SEO Pages Engine.' },
    guaranteedPerformance: { status: 'not_supported', evidence: 'SEO product claims policy forbids fake guarantees and statistics.' },
  },
  carouselTypes: {
    ai: { status: 'available', label: 'AI-карусель', evidence: 'docs/product/gotoflow-capabilities.md sections 1, 2, and 4.' },
    template: { status: 'available', label: 'Структура по шаблону', evidence: 'docs/product/gotoflow-capabilities.md: strict scenario, structure, and slide logic capabilities.' },
    seamless: { status: 'available', label: 'Бесшовная', evidence: 'User-confirmed product truth in final correction request, 2026-07-11.' },
    animated: { status: 'available', label: 'Анимированная', evidence: 'User-confirmed product truth in final correction request, 2026-07-11.' },
  },
  editorCapabilities: {
    reviewSlideTexts: { status: 'available', evidence: 'docs/product/gotoflow-capabilities.md section 2.' },
    regenerateText: { status: 'available', evidence: 'docs/product/gotoflow-capabilities.md section 3.' },
    adjustVisualStyle: { status: 'available', evidence: 'docs/product/gotoflow-capabilities.md sections 1, 2, and 4.' },
    manualEditSlides: { status: 'available', evidence: 'docs/product/gotoflow-capabilities.md section 4.' },
    publishAutomatically: { status: 'not_supported' },
  },
  supportedFormats: {
    '4:5': { status: 'available', evidence: 'SEO page uses Instagram portrait carousel output and rendered 5-slide product showcase.' },
    '1:1': { status: 'available', evidence: 'Instagram carousel page FAQ documents square format support.' },
    '9:16': { status: 'available', evidence: 'SEO workflow UI presents available format controls without promising direct publishing.' },
  },
  unsupportedClaimPatterns: [
    'direct_social_publishing',
    'one_click_publishing',
    'guaranteed_growth',
    'fake_reviews_or_clients',
    'absolute_market_superiority',
  ],
};

export const SEO_CANONICAL_PRODUCT_CAPABILITIES = [
  {
    id: 'content-sources',
    title: 'Источники контента',
    body: 'Начните с темы или готового текста, ссылки, видео, PDF, голосового сообщения, изображения, скриншота или своих фото.',
    capabilityIds: ['topicText', 'link', 'video', 'pdf', 'voice', 'image', 'screenshot', 'userPhoto'],
  },
  {
    id: 'ai-structure-text',
    title: 'AI-структура и текст',
    body: 'GoToFlow помогает собрать структуру, разложить мысль по слайдам и подготовить редактируемые тексты.',
    capabilityIds: ['aiStructureText'],
  },
  {
    id: 'templates-styles',
    title: 'Шаблоны и стили',
    body: 'Можно выбрать готовую структуру, AI-стиль или добавить собственный промпт для визуального направления.',
    capabilityIds: ['templates', 'aiStyle', 'customPrompt'],
  },
  {
    id: 'visual-controls',
    title: 'Фон, персонаж и CTA',
    body: 'В редакторе доступны настройки фона, персонажа и призыва к действию внутри карусели.',
    capabilityIds: ['background', 'character', 'cta'],
  },
  {
    id: 'editing-regeneration',
    title: 'Редактирование и перегенерация',
    body: 'Проверяйте текст, редактируйте слайды и перегенерируйте части результата перед публикацией.',
    capabilityIds: ['textEditing', 'slideEditing', 'regeneration'],
  },
  {
    id: 'carousel-types',
    title: 'Типы каруселей',
    body: 'Поддерживаются бесшовные и анимированные карусели.',
    capabilityIds: ['seamlessCarousels', 'animatedCarousels'],
  },
  {
    id: 'formats-slides',
    title: 'Форматы и слайды',
    body: 'Работайте с форматами 4:5, 1:1 и 9:16; для Instagram-карусели доступно до 10 слайдов.',
    capabilityIds: ['formats4511916', 'upTo10Slides'],
  },
];

export const SEO_REQUIRED_PRODUCT_CAPABILITY_IDS = [
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
];

export const getSeoProductFeatureStatus = (group, id) => (
  SEO_PRODUCT_TRUTH_REGISTRY[group]?.[id]?.status || 'unknown'
);

export const isSeoProductFeatureAvailable = (group, id) => (
  getSeoProductFeatureStatus(group, id) === 'available'
);
