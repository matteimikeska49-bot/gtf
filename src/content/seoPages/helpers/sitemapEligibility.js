import { stateAllowsIndexing, stateAllowsRouting } from '../states.js';
import { hasApprovedSeoRouteMigration, getSeoPageRouteCollision } from './routeOwnership.js';

export const isSeoPageRoutable = (page) => {
  if (!stateAllowsRouting(page)) return false;

  const routeOwner = getSeoPageRouteCollision(page);
  if (routeOwner && !hasApprovedSeoRouteMigration(page)) return false;

  return true;
};

export const isSeoPageIndexable = (page) => {
  if (!isSeoPageRoutable(page)) return false;
  return stateAllowsIndexing(page);
};

export const isSeoPageSitemapEligible = (page) => (
  Boolean(
    isSeoPageIndexable(page) &&
    page.sitemapEligible === true &&
    page.noindex !== true
  )
);

export const getSeoPagesEligibleForSitemap = (pages) => pages.filter(isSeoPageSitemapEligible);

export const getSeoPagesEligibleForPrerender = (pages) => pages.filter(isSeoPageSitemapEligible);
