import { isValidSeoPageState } from '../states.js';
import {
  CAROUSEL_PRODUCT_SEO_SECTION_ORDER,
  getTemplateVariant,
  hasValidTemplateVariant,
  isCarouselProductSeoPage,
} from '../templateVariants.js';
import { isBlockedSeoSchemaType, isValidSeoSchemaType } from '../schema.js';
import { getRouteOwnershipErrors } from './routeOwnership.js';
import { getUrlOriginErrors } from './originLedger.js';
import { getIntentOwnershipErrors } from './intentOwnership.js';
import { getLocaleRuleErrors } from './localeRules.js';
import { getSeoPageProductionReadinessErrors, getSeoContentUniquenessErrors } from './contentReadiness.js';

export const REQUIRED_SEO_PAGE_FIELDS = [
  'id',
  'path',
  'language',
  'pageType',
  'state',
  'templateVariant',
  'title',
  'description',
  'h1',
  'primaryIntent',
  'primaryKeyword',
  'secondaryKeywords',
  'urlOrigin',
  'urlOriginEvidence',
  'intentOwner',
  'routeOwner',
  'canonicalOwner',
  'approvedByHuman',
  'routeReviewApproved',
  'indexationApproved',
  'noindex',
  'sitemapEligible',
  'designReference',
  'relatedBlogSlugs',
  'relatedSeoPaths',
  'relatedProductToolPaths',
  'faq',
  'sections',
  'cta',
  'schemaType',
  'riskLevel',
  'manualReviewReason',
  'createdFromActionMapRowIds',
  'notes',
];

const hasText = (value) => typeof value === 'string' && value.trim().length > 0;
const hasItems = (value) => Array.isArray(value) && value.length > 0;
const hasCta = (cta) => Boolean(cta?.label && cta?.href);
const findSection = (page, names) => (
  (page.sections || []).some((section) => names.includes(section.id)) ||
  (page.templateSections || []).some((section) => names.includes(section))
);

export const getTemplateSectionPresence = (page) => ({
  hero: hasText(page.h1) && hasText(page.heroSubtitle || page.description),
  problem: findSection(page, ['problem', 'pain', 'who-for', 'whoFor']),
  whatItCreates: findSection(page, ['whatItCreates', 'what-it-does', 'what-it-does-for-platform']),
  useCases: hasItems(page.useCases) || findSection(page, ['useCases', 'use-cases', 'scenario']),
  workflow: findSection(page, ['workflow', 'how-it-works', 'howToUse', 'howToCreate']),
  quickAnswer: Boolean(page.quickAnswer) || findSection(page, ['quickAnswer']),
  examples: hasItems(page.examples) || findSection(page, ['examples']),
  readyCarouselShowcase: hasItems(page.readyCarouselShowcase) || findSection(page, ['readyCarouselShowcase']),
  pageSpecificVisualProof: Boolean(page.pageSpecificVisualProof?.images?.length) || findSection(page, ['pageSpecificVisualProof']),
  productWorkflow: Boolean(page.productWorkflow) || findSection(page, ['productWorkflow']),
  productCapabilities: Boolean(page.productCapabilities?.groups?.length) || findSection(page, ['productCapabilities']),
  benefits: findSection(page, ['benefits', 'who-for', 'whoFor']) || hasText(page.productBridge),
  faq: hasItems(page.faq),
  related: hasItems(page.relatedBlogSlugs) || hasItems(page.relatedSeoPaths) || hasItems(page.relatedProductToolPaths),
  finalCta: Boolean(page.finalCta),
  platformUseCases: findSection(page, ['platformUseCases', 'use-cases', 'useCases']),
  contentFormats: findSection(page, ['contentFormats', 'format', 'vk-format-guidance', 'telegram-format-guidance']),
  templateCategories: hasItems(page.templateCategories) || hasItems(page.templates) || findSection(page, ['templateCategories', 'templates']),
  howToUse: findSection(page, ['howToUse', 'workflow']),
  breakdown: findSection(page, ['breakdown', 'examples']),
  howToCreate: findSection(page, ['howToCreate', 'workflow']),
  comparison: findSection(page, ['comparison']),
  whenToUseGoToFlow: findSection(page, ['whenToUseGoToFlow']) || hasText(page.productBridge),
  migrationBenefits: findSection(page, ['migrationBenefits', 'benefits']) || hasText(page.productBridge),
  promptGroups: findSection(page, ['promptGroups']) || hasItems(page.prompts),
  howToUsePrompts: findSection(page, ['howToUsePrompts', 'howToUse']),
  scenario: findSection(page, ['scenario', 'use-cases', 'useCases']),
  templateChoiceGuide: Boolean(page.templateChoiceGuide) || findSection(page, ['templateChoiceGuide']),
});

export const getMissingRequiredTemplateSections = (page) => {
  const variant = getTemplateVariant(page.templateVariant);
  if (!variant) return [];

  const presence = getTemplateSectionPresence(page);
  return variant.requiredSections.filter((section) => !presence[section]);
};

export const getTemplateSectionOrderErrors = (page) => {
  if (isCarouselProductSeoPage(page)) {
    const errors = [];
    if (page.templateSections !== undefined) {
      errors.push(`${page.id} carousel product pages must not declare templateSections; fixed order is ${CAROUSEL_PRODUCT_SEO_SECTION_ORDER.join(', ')}.`);
    }
    const forbiddenFields = [
      'componentName',
      'componentPath',
      'renderer',
      'rendererId',
      'layoutVariant',
      'componentVariant',
      'arbitrarySections',
      'sectionOrder',
    ];
    forbiddenFields.forEach((field) => {
      if (page[field] !== undefined) errors.push(`${page.id} carousel product page config must not contain architectural field ${field}.`);
    });
    if (Array.isArray(page.sections) && page.sections.length > 0) {
      errors.push(`${page.id} carousel product page config must not add arbitrary sections.`);
    }
    if (!Array.isArray(page.heroCarouselImages) || page.heroCarouselImages.length !== 3) {
      errors.push(`${page.id} carousel product page must define exactly 3 heroCarouselImages.`);
    }
    if (!Array.isArray(page.readyCarouselShowcase) || page.readyCarouselShowcase.length !== 6) {
      errors.push(`${page.id} carousel product page must define exactly 6 readyCarouselShowcase cards.`);
    }
    if (!Array.isArray(page.productWorkflow?.mockups) || page.productWorkflow.mockups.length !== 4) {
      errors.push(`${page.id} carousel product page must define exactly 4 productWorkflow mockup panels.`);
    }
    if (!page.pageSpecificVisualProof?.images?.length) {
      errors.push(`${page.id} carousel product page must define typed pageSpecificVisualProof data.`);
    }
    return errors;
  }

  const variant = getTemplateVariant(page.templateVariant);
  if (!variant || !page.templateSections || !Array.isArray(page.templateSections)) return [];

  const errors = [];
  const declared = page.templateSections;
  const uniqueDeclared = new Set(declared);

  // 1. Check for duplicates
  if (declared.length !== uniqueDeclared.size) {
    errors.push(`${page.id} has duplicate sections in templateSections.`);
  }

  // 2. Check for unknown sections
  const allowedSections = new Set([
    ...(variant.requiredSections || []),
    ...(variant.optionalSections || [])
  ]);
  const unknown = declared.filter((s) => !allowedSections.has(s));
  if (unknown.length > 0) {
    errors.push(`${page.id} has unknown or unsupported templateSections: ${unknown.join(', ')}`);
  }

  // 3. Ensure all required sections are explicitly listed
  const missingExplicit = (variant.requiredSections || []).filter((s) => !uniqueDeclared.has(s));
  if (missingExplicit.length > 0) {
    errors.push(`${page.id} templateSections is missing required sections: ${missingExplicit.join(', ')}`);
  }

  return errors;
};

export const validateSeoPageContract = (page) => {
  const errors = [];

  REQUIRED_SEO_PAGE_FIELDS.forEach((field) => {
    if (!(field in page)) {
      errors.push(`${page.id || '(missing id)'} is missing ${field}`);
    }
  });

  if (!isValidSeoPageState(page.state)) {
    errors.push(`${page.id} has invalid state: ${page.state}`);
  }

  if (!hasValidTemplateVariant(page.templateVariant)) {
    errors.push(`${page.id} has invalid templateVariant: ${page.templateVariant}`);
  }

  errors.push(...getLocaleRuleErrors(page));

  if (isBlockedSeoSchemaType(page.schemaType)) {
    errors.push(`${page.id} uses blocked non-blog SEO schemaType: ${page.schemaType}`);
  }

  if (!isValidSeoSchemaType(page.schemaType)) {
    errors.push(`${page.id} has invalid schemaType: ${page.schemaType}`);
  }

  const missingSections = getMissingRequiredTemplateSections(page);
  if (missingSections.length > 0 && ['noindex_review', 'indexable_approved'].includes(page.state)) {
    errors.push(`${page.id} templateVariant=${page.templateVariant} is missing required sections: ${missingSections.join(', ')}`);
  }

  if (page.state === 'noindex_review' && page.routeReviewApproved !== true) {
    errors.push(`${page.id} noindex_review requires routeReviewApproved=true.`);
  }

  if (page.state === 'indexable_approved') {
    if (page.approvedByHuman !== true) errors.push(`${page.id} indexable_approved requires approvedByHuman=true.`);
    if (page.indexationApproved !== true) errors.push(`${page.id} indexable_approved requires indexationApproved=true.`);
    if (page.noindex === true) errors.push(`${page.id} indexable_approved cannot be noindex.`);
    if (page.sitemapEligible !== true) errors.push(`${page.id} indexable_approved requires sitemapEligible=true.`);
  }

  errors.push(...getUrlOriginErrors(page));
  errors.push(...getIntentOwnershipErrors(page));
  errors.push(...getRouteOwnershipErrors(page));
  errors.push(...getSeoPageProductionReadinessErrors(page));
  errors.push(...getTemplateSectionOrderErrors(page));

  return errors;
};

export const validateSeoPagesContract = (pages) => {
  const ids = new Set();
  const paths = new Set();
  const errors = [];

  pages.forEach((page) => {
    errors.push(...validateSeoPageContract(page));

    if (ids.has(page.id)) errors.push(`Duplicate SEO page id: ${page.id}`);
    ids.add(page.id);

    if (paths.has(page.path)) errors.push(`Duplicate SEO page path: ${page.path}`);
    paths.add(page.path);
  });

  errors.push(...getSeoContentUniquenessErrors(pages));

  return errors;
};
