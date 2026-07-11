export const SEO_URL_ORIGINS = [
  'existing_sitemap_product_tool',
  'existing_sitemap_blog',
  'existing_route_inventory',
  'existing_hardcoded_route',
  'seo_action_map_candidate',
  'seo_registry_candidate',
  'manually_inferred_candidate',
  'unknown_needs_review',
];

export const isValidSeoUrlOrigin = (urlOrigin) => SEO_URL_ORIGINS.includes(urlOrigin);

export const getUrlOriginErrors = (page) => {
  const errors = [];

  if (!isValidSeoUrlOrigin(page.urlOrigin)) {
    errors.push(`${page.id} has invalid urlOrigin: ${page.urlOrigin}`);
  }

  if (!Array.isArray(page.urlOriginEvidence) || page.urlOriginEvidence.length === 0) {
    errors.push(`${page.id} must document urlOriginEvidence.`);
  }

  if (
    page.urlOrigin === 'existing_sitemap_blog' &&
    ['noindex_review', 'indexable_approved'].includes(page.state)
  ) {
    errors.push(`${page.id} cannot use an existing blog URL origin as proof for a commercial/service SEO page.`);
  }

  if (
    page.urlOrigin === 'manually_inferred_candidate' &&
    page.state !== 'planning_only' &&
    page.state !== 'quarantined_review'
  ) {
    errors.push(`${page.id} is manually inferred and must stay planning_only or quarantined_review until manually approved.`);
  }

  if (
    page.state === 'indexable_approved' &&
    ['unknown_needs_review', 'manually_inferred_candidate'].includes(page.urlOrigin)
  ) {
    errors.push(`${page.id} cannot be indexable with urlOrigin=${page.urlOrigin}.`);
  }

  return errors;
};
