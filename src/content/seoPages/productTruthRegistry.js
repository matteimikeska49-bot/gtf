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

export const getSeoProductFeatureStatus = (group, id) => (
  SEO_PRODUCT_TRUTH_REGISTRY[group]?.[id]?.status || 'unknown'
);

export const isSeoProductFeatureAvailable = (group, id) => (
  getSeoProductFeatureStatus(group, id) === 'available'
);
