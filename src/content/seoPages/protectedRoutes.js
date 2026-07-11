export const PROTECTED_RU_PRODUCT_TOOL_ROUTES = {
  '/ru/ai-generator-karuselej': {
    owner: 'App.jsx:RuAICarouselGeneratorPage',
    reason: 'Existing sitemap/indexable RU carousel product/tool page.',
  },
  '/ru/generator-karuselej-instagram': {
    owner: 'App.jsx:RuAICarouselGeneratorPage',
    reason: 'Existing RU Instagram carousel product/tool alias route.',
  },
  '/ru/ii-generator-karuseley': {
    owner: 'App.jsx:RuAICarouselGeneratorPage',
    reason: 'Existing sitemap/indexable RU AI carousel product/tool page. Registry migration is not approved.',
  },
  '/ru/generator-kontenta': {
    owner: 'App.jsx:AIContentPageRu',
    reason: 'Existing sitemap/indexable RU content generator product/tool page.',
  },
  '/ru/ii-generator-kontenta': {
    owner: 'App.jsx:AIContentPageRu',
    reason: 'Existing RU AI content generator product/tool alias route.',
  },
  '/ru/generator-postov-instagram': {
    owner: 'App.jsx:InstagramPostPageRu',
    reason: 'Existing sitemap/indexable RU Instagram post generator product/tool page.',
  },
  '/ru/ii-generator-postov-dlya-instagram': {
    owner: 'App.jsx:InstagramPostPageRu',
    reason: 'Existing RU AI Instagram post generator product/tool alias route.',
  },
  '/ru/generator-karuselej-linkedin': {
    owner: 'App.jsx:LinkedInCarouselPageRu',
    reason: 'Existing sitemap/indexable RU LinkedIn carousel generator product/tool page.',
  },
  '/ru/ii-generator-postov-dlya-linkedin': {
    owner: 'App.jsx:LinkedInPostPageRu',
    reason: 'Existing RU AI LinkedIn post generator product/tool alias route.',
  },
};

export const PROTECTED_RU_SYSTEM_ROUTES = {
  '/ru': { owner: 'App.jsx:LandingPage', reason: 'RU homepage and primary SEO/product design reference.' },
  '/ru/blog': { owner: 'App.jsx:BlogPageRu', reason: 'RU blog hub.' },
  '/ru/politika': { owner: 'App.jsx:PrivacyPolicyPage', reason: 'Legal route.' },
  '/ru/polzovatelskoe-soglashenie': { owner: 'App.jsx:RuTermsOfServicePage', reason: 'Legal route.' },
  '/ru/soglasie-na-obrabotku-personalnyh-dannyh': { owner: 'App.jsx:RuPersonalDataConsentPage', reason: 'Legal route.' },
  '/ru/ugc-creator-terms': { owner: 'App.jsx:UgcCreatorTermsRu', reason: 'Legal/terms route.' },
};

export const PROTECTED_SEO_ROUTES = {
  ...PROTECTED_RU_SYSTEM_ROUTES,
  ...PROTECTED_RU_PRODUCT_TOOL_ROUTES,
};

export const getProtectedRouteOwner = (routePath) => PROTECTED_SEO_ROUTES[routePath] || null;

export const isProtectedSeoRoute = (routePath) => Boolean(getProtectedRouteOwner(routePath));
