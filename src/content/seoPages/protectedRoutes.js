export const PROTECTED_RU_PRODUCT_TOOL_ROUTES = {
  '/ru/ai-generator-karuselej': {
    owner: 'App.jsx:Navigate',
    reason: 'Legacy RU carousel product URL redirects to /ru/ii-generator-karuseley.',
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
    owner: 'App.jsx:Navigate',
    reason: 'Legacy RU content generator URL redirects to /ru/generator-kontenta.',
  },
  '/ru/generator-postov-instagram': {
    owner: 'App.jsx:InstagramPostPageRu',
    reason: 'Existing sitemap/indexable RU Instagram post generator product/tool page.',
  },
  '/ru/ii-generator-postov-dlya-instagram': {
    owner: 'App.jsx:Navigate',
    reason: 'Legacy RU Instagram post URL redirects to /ru/generator-postov-instagram.',
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

export const PROTECTED_EN_PRODUCT_TOOL_ROUTES = {
  '/ai-content-generator': {
    owner: 'App.jsx:AIContentPage',
    reason: 'Existing English general content generator route.',
  },
  '/linkedin-carousel-maker': {
    owner: 'App.jsx:LinkedInCarouselPage',
    reason: 'Existing English LinkedIn document-carousel owner.',
  },
};

export const PROTECTED_SEO_ROUTES = {
  ...PROTECTED_RU_SYSTEM_ROUTES,
  ...PROTECTED_RU_PRODUCT_TOOL_ROUTES,
  ...PROTECTED_EN_PRODUCT_TOOL_ROUTES,
};

export const getProtectedRouteOwner = (routePath) => PROTECTED_SEO_ROUTES[routePath] || null;

export const isProtectedSeoRoute = (routePath) => Boolean(getProtectedRouteOwner(routePath));
