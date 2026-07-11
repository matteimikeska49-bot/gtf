import { getProtectedRouteOwner } from '../protectedRoutes.js';

export const SEO_MIGRATION_REQUIRED_FIELDS = [
  'oldRouteOwner',
  'newRouteOwner',
  'migrationReason',
  'canonicalDecision',
  'noindexDecision',
  'sitemapDecision',
  'rollbackPlan',
  'approvedByHuman',
];

export const hasApprovedSeoRouteMigration = (page) => Boolean(
  page?.ownershipDecision?.migrationRequired === true &&
  page.ownershipDecision?.migration?.approvedByHuman === true &&
  page.ownershipDecision?.approvedByHuman === true &&
  page.approvedByHuman === true
);

export const getSeoPageRouteCollision = (page) => getProtectedRouteOwner(page?.path)?.owner || null;

export const getRouteOwnershipErrors = (page) => {
  const errors = [];
  const protectedOwner = getProtectedRouteOwner(page.path);
  const hasApprovedMigration = hasApprovedSeoRouteMigration(page);

  if (
    protectedOwner &&
    !hasApprovedMigration &&
    ['noindex_review', 'indexable_approved'].includes(page.state)
  ) {
    errors.push(`${page.id} path ${page.path} is protected by ${protectedOwner.owner}. Registry pages cannot override protected routes without approved migration.`);
  }

  if (page.ownershipDecision?.migrationRequired === true) {
    const migration = page.ownershipDecision.migration;

    if (!migration) {
      errors.push(`${page.id} requires explicit migration documentation.`);
    } else {
      SEO_MIGRATION_REQUIRED_FIELDS.forEach((field) => {
        if (!(field in migration)) {
          errors.push(`${page.id} migration is missing ${field}.`);
        }
      });
    }
  }

  return errors;
};
