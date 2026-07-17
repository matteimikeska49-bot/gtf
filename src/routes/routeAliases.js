const normalizeRoutePath = (routePath) => {
  if (!routePath || routePath === '/') return '/';
  return `/${String(routePath).replace(/^\/+/, '').replace(/\/+$/, '')}`;
};

export const APP_ROUTE_ALIASES = Object.freeze({
  '/carousel-maker': '/ai-carousel-maker',
  '/politika': '/ru/politika',
  '/ai-post-maker': '/ai-instagram-post-generator',
  '/carousel/create': '/ai-carousel-maker',
});

const ROUTE_CANONICAL_PATHS = Object.freeze({
  ...APP_ROUTE_ALIASES,
  '/ru/ai-generator-karuselej': '/ru/ii-generator-karuseley',
  '/ru/ii-generator-postov-dlya-instagram': '/ru/generator-postov-instagram',
});

export const getRouteAliasTarget = (routePath) => (
  APP_ROUTE_ALIASES[normalizeRoutePath(routePath)] || null
);

export const getRouteCanonicalPath = (routePath) => {
  const normalized = normalizeRoutePath(routePath);
  return ROUTE_CANONICAL_PATHS[normalized] || normalized;
};
