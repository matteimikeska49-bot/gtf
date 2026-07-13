import {
  EXACT_SEO_PAGE_BLUEPRINT,
  EXACT_SEO_PAGE_BLUEPRINT_ID,
  FORBIDDEN_BLUEPRINT_COPY_PATTERNS,
  getSeoBlueprintById,
} from '../blueprints/exactSeoPageBlueprint.js';

export const SEO_PRODUCTION_STAGES = [
  'gemini_content_design',
  'codex_draft_preview_integration',
  'human_visual_review',
  'codex_production_integration',
  'human_release_review',
];

export const SEO_STAGE_ALIASES = {
  codex_technical_integration: 'codex_production_integration',
};

export const SEO_STAGE_APPROVALS = {
  codexDraftPreviewIntegration: {
    handoffComplete: true,
  },
  humanVisualReview: {
    ownerVisualApprovalReceived: true,
    approvedForProductionIntegration: true,
  },
  codexProductionIntegration: {
    handoffComplete: true,
    ownerVisualApprovalReceived: true,
    approvedForProductionIntegration: true,
  },
  humanReleaseReview: {
    productionIntegrationCompleted: true,
    approvedForRelease: true,
  },
};

export const GEMINI_ALLOWED_PATHS = [
  'src/content/seoPages/handoffs/*.js',
  'src/content/seoPages/handoffs/*.json',
  'src/content/seoPages/handoffs/*.md',
  'src/content/seoPages/handoffs/**/*.js',
  'src/content/seoPages/handoffs/**/*.json',
  'src/content/seoPages/handoffs/**/*.md',
  'public/images/seo-handoffs/**/*',
];

export const GEMINI_FORBIDDEN_RUNTIME_PATHS = [
  'src/App.jsx',
  'src/content/seoPages/index.js',
  'src/content/seoPages/registry.js',
  'src/content/seoPages/templateVariants.js',
  'src/content/seoPages/**/templateVariants.js',
  'src/content/seoPages/states.js',
  'src/content/seoPages/schema.js',
  'src/content/seoPages/releaseContracts.js',
  'src/content/seoPages/productTruthRegistry.js',
  'src/content/seoPages/helpers/**/*.js',
  'src/components/**/*.jsx',
  'src/components/**/*.js',
  'prerender.mjs',
  'public/sitemap.xml',
  'dist/**',
  'package.json',
  'scripts/**/*.mjs',
];

export const CODEX_DRAFT_PREVIEW_ALLOWED_PATHS = [
  'src/App.jsx',
  'src/content/seoPages/index.js',
  'src/content/seoPages/pages/**/*.js',
  'src/content/seoPages/handoffs/**/*.js',
  'public/images/seo-handoffs/**/*',
];

export const CODEX_DRAFT_PREVIEW_FORBIDDEN_PATHS = [
  'src/content/seoPages/blueprints/**/*.js',
  'src/content/seoPages/templateVariants.js',
  'src/content/seoPages/**/templateVariants.js',
  'src/content/seoPages/productTruthRegistry.js',
  'src/content/seoPages/helpers/**/*.js',
  'src/content/seoPages/states.js',
  'src/content/seoPages/schema.js',
  'src/content/seoPages/releaseContracts.js',
  'src/components/**/*.jsx',
  'src/components/**/*.js',
  'prerender.mjs',
  'public/sitemap.xml',
  'dist/**',
  'package.json',
  'scripts/**/*.mjs',
];

export const CODEX_PRODUCTION_ALLOWED_PATHS = [
  'src/App.jsx',
  'src/content/seoPages/index.js',
  'src/content/seoPages/pages/**/*.js',
  'src/content/seoPages/handoffs/**/*.js',
  'src/components/seo/**/*.jsx',
  'src/components/RouteSchemaInjector.jsx',
  'src/utils/schemaGenerator.js',
  'prerender.mjs',
  'public/images/seo-handoffs/**/*',
  'dist/**',
];

export const SEO_STAGE_CONTRACT = {
  gemini_content_design: {
    purpose: 'Content/design handoff only. No production runtime integration.',
    allowedPaths: GEMINI_ALLOWED_PATHS,
    forbiddenPaths: GEMINI_FORBIDDEN_RUNTIME_PATHS,
    mayEditRuntime: false,
    routeMayExistInRuntime: false,
    sitemapMayIncludeRoute: false,
    physicalHtmlMayExist: false,
    requiresCompleteHandoff: false,
    requiresOwnerVisualApproval: false,
    requiresTechnicalApproval: false,
    requiresReleaseApproval: false,
  },
  codex_draft_preview_integration: {
    purpose: 'Noindex localhost draft preview from a complete Gemini handoff. No production release work.',
    allowedPaths: CODEX_DRAFT_PREVIEW_ALLOWED_PATHS,
    forbiddenPaths: CODEX_DRAFT_PREVIEW_FORBIDDEN_PATHS,
    mayEditRuntime: true,
    routeMayExistInRuntime: true,
    sitemapMayIncludeRoute: false,
    physicalHtmlMayExist: false,
    requiresCompleteHandoff: true,
    requiresOwnerVisualApproval: false,
    requiresProductionApproval: false,
    requiresProductionIntegrationCompleted: false,
    requiresReleaseApproval: false,
  },
  human_visual_review: {
    purpose: 'Owner visual/content/product review of the noindex localhost draft.',
    allowedPaths: [],
    forbiddenPaths: [],
    mayEditRuntime: false,
    requiresCompleteHandoff: true,
    requiresOwnerVisualApproval: false,
    requiresProductionApproval: false,
    requiresProductionIntegrationCompleted: false,
    requiresReleaseApproval: false,
  },
  codex_production_integration: {
    purpose: 'Production integration of an owner-approved complete handoff after visual review.',
    allowedPaths: CODEX_PRODUCTION_ALLOWED_PATHS,
    forbiddenPaths: [],
    mayEditRuntime: true,
    requiresCompleteHandoff: true,
    requiresOwnerVisualApproval: true,
    requiresProductionApproval: true,
    requiresProductionIntegrationCompleted: false,
    requiresReleaseApproval: false,
  },
  human_release_review: {
    purpose: 'Final release gate. Push/release only after explicit owner approval.',
    allowedPaths: [],
    forbiddenPaths: [],
    mayEditRuntime: false,
    requiresCompleteHandoff: true,
    requiresOwnerVisualApproval: true,
    requiresProductionApproval: true,
    requiresProductionIntegrationCompleted: true,
    requiresReleaseApproval: true,
  },
};

const normalizePath = (filePath) => String(filePath || '').replace(/\\/gu, '/').replace(/^\.\//u, '');

const escapeRegex = (value) => value.replace(/[.+^${}()|[\]\\]/gu, '\\$&');

export const patternToRegex = (pattern) => {
  const normalized = normalizePath(pattern);
  let source = '';
  for (let index = 0; index < normalized.length; index += 1) {
    const character = normalized[index];
    const next = normalized[index + 1];
    if (character === '*' && next === '*') {
      source += '.*';
      index += 1;
      continue;
    }
    if (character === '*') {
      source += '[^/]*';
      continue;
    }
    source += escapeRegex(character);
  }
  return new RegExp(`^${source}$`, 'u');
};

export const pathMatchesPattern = (filePath, pattern) => patternToRegex(pattern).test(normalizePath(filePath));

export const pathMatchesAnyPattern = (filePath, patterns) => (
  patterns.some((pattern) => pathMatchesPattern(filePath, pattern))
);

export const normalizeStage = (stage) => SEO_STAGE_ALIASES[stage] || stage;

export const getStageContract = (stage) => SEO_STAGE_CONTRACT[normalizeStage(stage)] || null;

export const validateStageDiff = ({ stage, changedPaths = [] }) => {
  const errors = [];
  const normalizedStage = normalizeStage(stage);
  const contract = getStageContract(normalizedStage);

  if (!contract) {
    return [`Unknown SEO production stage: ${stage}. Expected one of: ${SEO_PRODUCTION_STAGES.join(', ')}.`];
  }

  const paths = changedPaths.map(normalizePath).filter(Boolean);
  paths.forEach((filePath) => {
    if (pathMatchesAnyPattern(filePath, contract.forbiddenPaths)) {
      errors.push(`${normalizedStage} may not change forbidden path: ${filePath}`);
      return;
    }
    if (!pathMatchesAnyPattern(filePath, contract.allowedPaths)) {
      if (normalizedStage === 'gemini_content_design') {
        errors.push(`${normalizedStage} may only change explicit handoff/design paths, not: ${filePath}`);
        return;
      }
      if (normalizedStage === 'codex_draft_preview_integration') {
        errors.push(`${normalizedStage} may only change minimal draft-preview paths, not: ${filePath}`);
      }
    }
  });

  return errors;
};

const isAwaitingGemini = (value) => {
  if (!value || typeof value !== 'object') return false;
  return String(value.status || '').startsWith('awaiting_gemini');
};

const textFrom = (value) => {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map(textFrom).join(' ');
  if (value && typeof value === 'object') return Object.values(value).map(textFrom).join(' ');
  return '';
};

const hasHumanText = (value) => typeof value === 'string' && value.trim().length > 0;

const isForbiddenUserFacingText = (value) => {
  const text = textFrom(value);
  return FORBIDDEN_BLUEPRINT_COPY_PATTERNS.some((pattern) => (
    text.toLowerCase().includes(pattern.toLowerCase())
  ));
};

const slotValues = (slots, slotName) => {
  if (!slots || typeof slots !== 'object') return [];
  const value = slots[slotName];
  if (Array.isArray(value)) return value;
  return value === undefined || value === null ? [] : [value];
};

const findBlueprintSection = (blueprint, id) => blueprint.sections.find((section) => section.id === id);

const isDraftHandoff = (handoff) => handoff.contentDesignStatus === 'content_design_draft';

const isCompleteHandoff = (handoff) => (
  handoff.handoffComplete === true ||
  handoff.contentDesignStatus === 'handoff_complete' ||
  handoff.contentDesignStatus === 'complete_gemini_handoff'
);

const hasProductionApproval = (handoff) => (
  handoff.approvedForProductionIntegration === true ||
  handoff.approvedForTechnicalIntegration === true
);

const validateCopySlotValue = ({ value, allowDraftAwaiting, label, errors }) => {
  if (allowDraftAwaiting && isAwaitingGemini(value)) return;
  if (!hasHumanText(textFrom(value))) {
    errors.push(`${label} must be filled before Codex integration.`);
    return;
  }
  if (isForbiddenUserFacingText(value)) {
    errors.push(`${label} contains forbidden internal/placeholder text.`);
  }
};

const validateVisualSlotValue = ({ value, allowDraftAwaiting, label, errors, context }) => {
  if (allowDraftAwaiting && isAwaitingGemini(value)) return;

  const assetPath = typeof value === 'string' ? value : value?.assetPath || value?.componentRef;
  if (allowDraftAwaiting && isAwaitingGemini(assetPath)) return;
  if (!assetPath || typeof assetPath !== 'string') {
    errors.push(`${label} must define assetPath or componentRef before Codex integration.`);
    return;
  }
  if (/not_available|placeholder/iu.test(assetPath)) {
    errors.push(`${label} must not use placeholder or not_available visuals.`);
    return;
  }
  if (!assetPath.startsWith('/') && !assetPath.startsWith('component:')) {
    errors.push(`${label} must use a local public asset path or component: reference.`);
    return;
  }
  if (assetPath.startsWith('/') && context.assetExists && !context.assetExists(assetPath)) {
    errors.push(`${label} asset does not exist: ${assetPath}`);
  }
  if (typeof value === 'object' && value !== null && !hasHumanText(value.alt) && !assetPath.startsWith('component:')) {
    errors.push(`${label} must define alt text for image assets.`);
  }
  if (isForbiddenUserFacingText(value)) {
    errors.push(`${label} contains forbidden internal/placeholder text.`);
  }
};

export const validateHandoffStructure = (handoff, context = {}) => {
  const errors = [];
  const label = handoff?.id || handoff?.route || 'handoff';

  if (!handoff || typeof handoff !== 'object') return ['Handoff must be an object.'];
  if (handoff.blueprintId !== EXACT_SEO_PAGE_BLUEPRINT_ID) {
    errors.push(`${label} must use blueprintId ${EXACT_SEO_PAGE_BLUEPRINT_ID}.`);
  }
  const blueprint = getSeoBlueprintById(handoff.blueprintId);
  if (!blueprint) return errors;

  [
    'route',
    'primaryQuery',
    'searchIntent',
    'userJob',
    'articleBoundary',
    'generatorBoundary',
    'metadata',
    'sections',
    'ProductTruthClaims',
    'forbiddenClaims',
    'FAQ',
    'relatedLinks',
    'ownerReviewStatus',
    'handoffComplete',
    'contentDesignStatus',
    'draftPreviewIntegrationAllowed',
    'draftPreviewIntegrated',
    'ownerVisualApprovalReceived',
    'approvedForProductionIntegration',
    'productionIntegrationCompleted',
    'approvedForRelease',
  ].forEach((field) => {
    if (handoff[field] === undefined || handoff[field] === null) {
      errors.push(`${label} missing required handoff field ${field}.`);
    }
  });

  if (handoff.route === '/ru/use-cases/besshovnaya-karusel-instagram' && handoff.runtimeImported === true) {
    errors.push(`${label} must not be runtimeImported before Codex technical integration.`);
  }

  const sections = Array.isArray(handoff.sections) ? handoff.sections : [];
  const byId = new Map(sections.map((section) => [section.id, section]));
  blueprint.requiredSections.forEach((sectionId) => {
    if (!byId.has(sectionId)) errors.push(`${label} missing required blueprint section ${sectionId}.`);
  });

  const allowDraftAwaiting = isDraftHandoff(handoff) && handoff.approvedForTechnicalIntegration !== true;
  sections.forEach((section) => {
    const blueprintSection = findBlueprintSection(blueprint, section.id);
    if (!blueprintSection) {
      errors.push(`${label}.${section.id || '(missing section id)'} is not in blueprint ${blueprint.blueprintId}.`);
      return;
    }
    if (section.componentName !== blueprintSection.componentName) {
      errors.push(`${label}.${section.id} must use componentName ${blueprintSection.componentName}.`);
    }
    if (section.componentPath !== blueprintSection.componentPath) {
      errors.push(`${label}.${section.id} must use componentPath ${blueprintSection.componentPath}.`);
    }
    if (context.componentPathExists && !context.componentPathExists(section.componentPath)) {
      errors.push(`${label}.${section.id} componentPath does not exist: ${section.componentPath}`);
    }

    (blueprintSection.copySlots || []).forEach((slotName) => {
      const values = slotValues(section.copySlots, slotName);
      if (!values.length) errors.push(`${label}.${section.id} missing copy slot ${slotName}.`);
      values.forEach((value, index) => validateCopySlotValue({
        value,
        allowDraftAwaiting,
        label: `${label}.${section.id}.${slotName}[${index}]`,
        errors,
      }));
    });

    (blueprintSection.visualSlots || []).forEach((slotName) => {
      const values = slotValues(section.visualSlots, slotName);
      if (!values.length) errors.push(`${label}.${section.id} missing visual slot ${slotName}.`);
      values.forEach((value, index) => validateVisualSlotValue({
        value,
        allowDraftAwaiting,
        label: `${label}.${section.id}.${slotName}[${index}]`,
        errors,
        context,
      }));
    });
  });

  return errors;
};

const validateDraftPreviewSafety = (handoff, label) => {
  const errors = [];
  const lifecycleState = handoff.lifecycleState || handoff.state;

  if (handoff.sitemapIncluded === true || handoff.sitemapEligible === true) {
    errors.push(`${label} draft preview must not be included in sitemap.`);
  }
  if (
    handoff.indexable === true ||
    handoff.indexationApproved === true ||
    lifecycleState === 'indexable_approved'
  ) {
    errors.push(`${label} draft preview must stay noindex and non-indexable.`);
  }
  if (handoff.approvedForRelease === true) {
    errors.push(`${label} draft preview must not request release approval.`);
  }
  if (handoff.productionCanonicalApproved === true || handoff.productionSchemaApproved === true) {
    errors.push(`${label} draft preview must not approve production canonical/schema.`);
  }
  if (handoff.committedReleaseDist === true || handoff.physicalHtmlCreated === true) {
    errors.push(`${label} draft preview must not create committed release dist or physical HTML.`);
  }
  if (handoff.approvedCopyModified === true || handoff.sectionOrderModified === true || handoff.componentMapModified === true) {
    errors.push(`${label} draft preview must not modify approved copy, section order, or component map.`);
  }
  if (handoff.genericRendererCreated === true || handoff.newVariantCreated === true || handoff.blueprintModified === true) {
    errors.push(`${label} draft preview must not create generic renderers, new variants, or blueprint changes.`);
  }

  return errors;
};

export const validateStageHandoff = ({ stage, handoff, context = {} }) => {
  const errors = validateHandoffStructure(handoff, context);
  const normalizedStage = normalizeStage(stage);
  const contract = getStageContract(normalizedStage);
  const label = handoff?.id || handoff?.route || 'handoff';

  if (!contract) return [`Unknown SEO production stage: ${stage}.`];

  if (normalizedStage === 'gemini_content_design') {
    if (handoff.approvedForRelease === true || handoff.runtimeImported === true) {
      errors.push(`${label} may not request release or runtime import during Gemini content/design stage.`);
    }
    return errors;
  }

  if (normalizedStage === 'codex_draft_preview_integration') {
    errors.push(...validateDraftPreviewSafety(handoff, label));
  }

  if (contract.requiresCompleteHandoff && !isCompleteHandoff(handoff)) {
    errors.push(`${label} must be handoff_complete before ${normalizedStage}.`);
  }
  if (contract.requiresOwnerVisualApproval && handoff.ownerVisualApprovalReceived !== true) {
    errors.push(`${label} requires ownerVisualApprovalReceived before ${normalizedStage}.`);
  }
  if (contract.requiresProductionApproval && !hasProductionApproval(handoff)) {
    errors.push(`${label} requires approvedForProductionIntegration before ${normalizedStage}.`);
  }
  if (contract.requiresProductionIntegrationCompleted && handoff.productionIntegrationCompleted !== true) {
    errors.push(`${label} requires productionIntegrationCompleted before ${normalizedStage}.`);
  }
  if (contract.requiresReleaseApproval && handoff.approvedForRelease !== true) {
    errors.push(`${label} requires approvedForRelease before ${normalizedStage}.`);
  }

  return errors;
};

export const buildCompleteHandoffFromBlueprint = (overrides = {}) => ({
  id: 'fixture-complete-owner-approved-handoff',
  route: '/ru/use-cases/fixture-complete-handoff',
  blueprintId: EXACT_SEO_PAGE_BLUEPRINT_ID,
  runtimeImported: false,
  routeRegistered: false,
  sitemapIncluded: false,
  indexable: false,
  sitemapEligible: false,
  indexationApproved: false,
  lifecycleState: 'noindex_review',
  handoffComplete: true,
  contentDesignStatus: 'handoff_complete',
  draftPreviewIntegrationAllowed: true,
  draftPreviewIntegrated: false,
  ownerReviewStatus: 'approved_for_technical_integration',
  ownerVisualApprovalReceived: true,
  approvedForProductionIntegration: true,
  approvedForTechnicalIntegration: true,
  productionIntegrationCompleted: false,
  approvedForRelease: false,
  primaryQuery: 'owner approved complete fixture',
  searchIntent: 'review complete structured handoff before technical integration',
  userJob: 'Prepare an owner-reviewed SEO page from a complete handoff.',
  articleBoundary: 'Does not duplicate article content.',
  generatorBoundary: 'Does not override protected generator routes.',
  metadata: {
    title: 'Owner approved complete fixture | GoToFlow',
    description: 'Complete fixture metadata used only by the handoff checker.',
  },
  ProductTruthClaims: ['GoToFlow helps prepare carousel content for owner review.'],
  forbiddenClaims: ['automatic publishing', 'unsupported export guarantees'],
  FAQ: [
    {
      question: 'How is the handoff reviewed?',
      answer: 'The owner reviews copy, visuals, Product Truth, and release readiness before integration.',
    },
  ],
  relatedLinks: [
    {
      label: 'Instagram carousel template',
      path: '/ru/templates/instagram-carousel',
      type: 'seo_page',
    },
  ],
  sections: EXACT_SEO_PAGE_BLUEPRINT.sections
    .filter((section) => EXACT_SEO_PAGE_BLUEPRINT.requiredSections.includes(section.id))
    .map((section) => ({
      id: section.id,
      order: section.order,
      purpose: section.purpose,
      componentName: section.componentName,
      componentPath: section.componentPath,
      benchmarkRoute: section.benchmarkRoute,
      copySlots: Object.fromEntries((section.copySlots || []).map((slotName) => [
        slotName,
        'Owner approved copy with concrete audience, visual result, workflow, and action detail.',
      ])),
      visualSlots: Object.fromEntries((section.visualSlots || []).map((slotName) => [
        slotName,
        {
          type: slotName,
          assetPath: (section.assetRequirements || [])[0] || `component:${section.componentName}.${slotName}`,
          caption: 'Owner approved visual requirement.',
          alt: 'Owner approved visual proof.',
        },
      ])),
      ProductTruthClaims: ['GoToFlow helps prepare carousel content for owner review.'],
      ownerApprovalStatus: 'approved_for_technical_integration',
    })),
  ...overrides,
});
