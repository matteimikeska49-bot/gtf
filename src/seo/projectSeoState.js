const page = (path, lastmod, priority = 0.7, changefreq = 'monthly') => ({
  path,
  lastmod,
  priority,
  changefreq,
});

const HREFLANG_GROUPS = [
  ['/', '/ru'],
  ['/ai-carousel-maker', '/ru/ii-generator-karuseley'],
  ['/instagram-carousel-maker', '/ru/generator-karuselej-instagram'],
  ['/ai-content-generator', '/ru/generator-kontenta'],
  ['/ai-instagram-post-generator', '/ru/generator-postov-instagram'],
  ['/linkedin-carousel-maker', '/ru/generator-karuselej-linkedin'],
  ['/linkedin-post-generator', '/ru/ii-generator-postov-dlya-linkedin'],
  ['/blog', '/ru/blog'],
  ['/privacy-policy', '/ru/politika'],
  ['/terms-of-service', '/ru/polzovatelskoe-soglashenie'],
  ['/personal-data-consent', '/ru/soglasie-na-obrabotku-personalnyh-dannyh'],
];

const hreflangByPath = new Map(HREFLANG_GROUPS.flatMap(([enPath, ruPath]) => {
  const alternates = [
    { lang: 'en', path: enPath },
    { lang: 'ru', path: ruPath },
    { lang: 'x-default', path: enPath },
  ];
  return [[enPath, alternates], [ruPath, alternates]];
}));

// Canonical project-local declarations for direct, indexable routes that are not
// owned by the SEO Pages registry or Markdown article frontmatter.
export const STATIC_SEO_ROUTES = Object.freeze([
  page('/', '2026-07-30', 1, 'weekly'),
  page('/ru', '2026-07-30', 0.9, 'weekly'),
  page('/ai-carousel-maker', '2026-09-18', 0.8, 'weekly'),
  page('/instagram-carousel-maker', '2026-09-18', 0.8, 'weekly'),
  page('/ai-content-generator', '2026-06-22', 0.8, 'weekly'),
  page('/ru/generator-kontenta', '2026-07-29', 0.8, 'weekly'),
  page('/ai-instagram-post-generator', '2026-06-21', 0.8, 'weekly'),
  page('/ru/generator-postov-instagram', '2026-07-29', 0.8, 'weekly'),
  page('/ru/ii-generator-karuseley', '2026-10-04', 0.8, 'weekly'),
  page('/ru/generator-karuselej-instagram', '2026-10-04', 0.8, 'weekly'),
  page('/linkedin-carousel-maker', '2026-06-21', 0.8, 'weekly'),
  page('/ru/generator-karuselej-linkedin', '2026-07-29', 0.8, 'weekly'),
  page('/ru/ii-generator-postov-dlya-linkedin', '2026-07-29', 0.8, 'weekly'),
  page('/blog', '2026-06-04', 0.7, 'weekly'),
  page('/ru/blog', '2026-06-04', 0.7, 'weekly'),
  page('/privacy-policy', '2026-06-20', 0.5),
  page('/ru/politika', '2026-06-20', 0.5),
  page('/refund-policy', '2026-05-13', 0.5),
  page('/terms-of-service', '2026-06-20', 0.5),
  page('/ru/polzovatelskoe-soglashenie', '2026-06-20', 0.5),
  page('/personal-data-consent', '2026-05-13', 0.5),
  page('/ru/soglasie-na-obrabotku-personalnyh-dannyh', '2026-06-20', 0.5),
  page('/ru/ugc-creator-terms', '2026-05-26', 0.5),
  page('/pricing', '2026-05-13', 0.6),
].map((entry) => Object.freeze({
  ...entry,
  hreflang: hreflangByPath.get(entry.path) || [],
})));

// These routes are real application endpoints, but they are not independently
// indexable/prerendered pages. Concrete child pages are owned by the SEO registry.
export const RUNTIME_ONLY_ROUTE_PATHS = Object.freeze([
  '/ru/tools',
  '/ru/platforms',
  '/ru/use-cases',
  '/ru/templates',
  '/ru/examples',
  '/ru/prompts',
  '/ru/alternatives',
]);

export const DYNAMIC_ROUTE_PATTERNS = Object.freeze([
  '/ru/tools/:slug',
  '/ru/platforms/:slug',
  '/ru/use-cases/:slug',
  '/ru/templates/:slug',
  '/ru/examples/:slug',
  '/ru/prompts/:slug',
  '/ru/alternatives/:slug',
  '/ru/:slug',
  '/blog/:slug',
  '/ru/blog/:slug',
  '*',
]);
