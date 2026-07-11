export const SEO_APP_ORIGIN = 'https://app.gotoflow.io';

export const SEO_CONVERSION_DESTINATIONS = {
  app: SEO_APP_ORIGIN,
};

export const SEO_ANALYTICS_EVENTS = {
  pageView: 'seo_page_view',
  heroCtaClick: 'seo_hero_cta_click',
  categoryCtaClick: 'seo_category_cta_click',
  workflowCtaClick: 'seo_workflow_cta_click',
  showcaseCardClick: 'seo_showcase_card_click',
  showcaseCtaClick: 'seo_showcase_cta_click',
  faqOpen: 'seo_faq_open',
  relatedLinkClick: 'seo_related_link_click',
  finalCtaClick: 'seo_final_cta_click',
};

export const SEO_DEFAULT_FAQ_POLICY = {
  minItems: 3,
  maxItems: 12,
  requireUniqueQuestions: true,
  requireVisibleSchemaParity: true,
};

export const SEO_TEMPLATE_REFERENCE_FAQ_POLICY = {
  ...SEO_DEFAULT_FAQ_POLICY,
  minItems: 11,
  maxItems: 15,
};

export const SEO_REQUIRED_BRIEF_FIELDS = [
  'pageEntity',
  'primaryQuery',
  'primaryIntent',
  'userJob',
  'uniqueAngle',
  'audience',
  'contentType',
  'platform',
  'language',
  'country',
  'conversionAction',
  'productRoute',
  'cannibalizationBoundary',
];

export const SEO_REQUIRED_SECTION_RELEVANCE_FIELDS = [
  'enabled',
  'reason',
];

export const SEO_INDEXATION_APPROVAL_FIELDS = [
  'approved',
  'approvedBy',
  'approvedAt',
  'notes',
];

export const SEO_REVIEW_METADATA_FIELDS = [
  'owner',
  'contentReviewedAt',
  'productClaimsReviewedAt',
  'assetsReviewedAt',
  'seoReviewedAt',
  'productVersion',
];

export const SEO_READABILITY_POLICY = {
  maxH1Chars: 72,
  maxTitleChars: 65,
  minDescriptionChars: 120,
  maxDescriptionChars: 170,
  maxHeroSubtitleChars: 260,
  maxFaqAnswerChars: 420,
  minTapTargetPx: 44,
  mobileViewports: [
    { width: 390, height: 844 },
    { width: 430, height: 932 },
  ],
};

export const SEO_ASSET_POLICY = {
  allowedLocalImageExtensions: ['.webp', '.png', '.jpg', '.jpeg', '.svg'],
  recommendedMaxBytes: 500 * 1024,
  requireAltForInformativeImages: true,
  requireKnownDimensions: true,
};

export const SEO_ACCESSIBILITY_POLICY = {
  requireSingleH1: true,
  requireImgAlt: true,
  requireButtonNames: true,
  requireLinkNames: true,
  requireFocusableInteractiveElements: true,
};

export const SEO_PERFORMANCE_POLICY = {
  maxHtmlBytes: 900 * 1024,
  maxLocalImageBytes: 500 * 1024,
  targetLcpMs: 2500,
  targetCls: 0.1,
};

export const SEO_ALLOWED_SCHEMA_TYPES = [
  'WebPage',
  'WebApplication',
  'SoftwareApplication',
];

export const SEO_APPROVED_HREFLANG_STATES = ['indexable_approved'];
