export const SEO_INTENT_OWNERSHIP_DECISIONS = [
  'safe_new_registry_page',
  'update_existing_page_instead',
  'merge_into_existing_page',
  'supporting_blog_article',
  'faq_h2_only',
  'secondary_keyword_only',
  'manual_review_required',
  'explicit_migration_required',
];

export const isValidIntentOwnershipDecision = (decision) => (
  SEO_INTENT_OWNERSHIP_DECISIONS.includes(decision)
);

export const getIntentOwnershipErrors = (page) => {
  const errors = [];

  if (!page.intentOwner) {
    errors.push(`${page.id} must define intentOwner.`);
  }

  if (!page.routeOwner) {
    errors.push(`${page.id} must define routeOwner.`);
  }

  if (!page.canonicalOwner) {
    errors.push(`${page.id} must define canonicalOwner.`);
  }

  if (!isValidIntentOwnershipDecision(page.ownershipDecision?.decision)) {
    errors.push(`${page.id} has invalid ownershipDecision.decision: ${page.ownershipDecision?.decision}`);
  }

  if (
    page.state === 'indexable_approved' &&
    page.ownershipDecision?.decision !== 'safe_new_registry_page' &&
    page.ownershipDecision?.migration?.approvedByHuman !== true
  ) {
    errors.push(`${page.id} cannot be indexable with ownership decision ${page.ownershipDecision?.decision}.`);
  }

  return errors;
};
