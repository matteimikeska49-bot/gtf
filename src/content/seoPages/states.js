export const SEO_PAGE_STATES = {
  planning_only: {
    routable: false,
    indexable: false,
    sitemapEligible: false,
    approvalRequired: 'origin_owner_before_runtime',
  },
  quarantined_review: {
    routable: false,
    indexable: false,
    sitemapEligible: false,
    approvalRequired: 'routeReviewApproved_before_runtime',
  },
  noindex_review: {
    routable: true,
    indexable: false,
    sitemapEligible: false,
    approvalRequired: 'routeReviewApproved',
  },
  indexable_approved: {
    routable: true,
    indexable: true,
    sitemapEligible: true,
    approvalRequired: 'approvedByHuman_and_indexationApproved',
  },
};

export const SEO_PAGE_STATE_NAMES = Object.keys(SEO_PAGE_STATES);

export const isValidSeoPageState = (state) => Boolean(SEO_PAGE_STATES[state]);

export const getSeoPageStatePolicy = (state) => SEO_PAGE_STATES[state] || null;

export const stateAllowsRouting = (page) => {
  if (!page || !isValidSeoPageState(page.state)) return false;
  if (page.state === 'planning_only') return false;
  if (page.state === 'quarantined_review') return page.routeReviewApproved === true;
  if (page.state === 'noindex_review') return page.routeReviewApproved === true && page.noindex === true;
  if (page.state === 'indexable_approved') {
    return page.approvedByHuman === true && page.indexationApproved === true && page.noindex !== true;
  }
  return false;
};

export const stateAllowsIndexing = (page) => (
  Boolean(
    page &&
    page.state === 'indexable_approved' &&
    page.approvedByHuman === true &&
    page.indexationApproved === true &&
    page.noindex !== true &&
    page.sitemapEligible === true
  )
);
