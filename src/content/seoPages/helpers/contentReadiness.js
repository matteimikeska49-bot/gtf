import {
  CAROUSEL_PRODUCT_SEO_SECTION_ORDER,
  getAllTemplateSectionIds,
  getTemplateSectionOrder,
  getTemplateVariant,
  isCarouselProductSeoPage,
  resolveTemplateSectionOrder,
} from '../templateVariants.js';
import {
  buildProductWorkflowCarouselTypes,
  buildProductWorkflowMockups,
  buildProductWorkflowSteps,
  getProductWorkflowPreset,
} from '../workflowPresets.js';
import { SEO_REQUIRED_PRODUCT_CAPABILITY_IDS } from '../productTruthRegistry.js';
import { stateAllowsRouting } from '../states.js';
import {
  SEO_APP_ORIGIN,
  SEO_DEFAULT_FAQ_POLICY,
  SEO_INDEXATION_APPROVAL_FIELDS,
  SEO_READABILITY_POLICY,
  SEO_REQUIRED_BRIEF_FIELDS,
  SEO_REQUIRED_SECTION_RELEVANCE_FIELDS,
  SEO_REVIEW_METADATA_FIELDS,
} from '../releaseContracts.js';
import { validateSeoRuntimeProductProof } from '../blueprints/exactSeoPageBlueprint.js';

export const PRODUCTION_READY_STATES = ['noindex_review', 'indexable_approved'];

export const HUMAN_REVIEW_FLAGS = [
  'contentReviewedByHuman',
  'uniquenessReviewedByHuman',
  'internalLinksReviewedByHuman',
  'ctaReviewedByHuman',
  'productClaimsReviewedByHuman',
];

export const SUPPORTED_CTA_ACTIONS = [
  'open_app',
  'start_trial',
  'create_content',
  'view_product',
  'contact_sales',
  'read_more',
];

const PLACEHOLDER_PATTERNS = [
  /\bTODO\b/iu,
  /\bTBD\b/iu,
  /lorem\s+ipsum/iu,
  /placeholder/iu,
  /coming\s+soon/iu,
  /fill\s+this/iu,
  /insert\s+(?:copy|text|content)/iu,
  /будущий\s+блок/iu,
  /плейсхолдер/iu,
  /заглушк/iu,
  /тестов(?:ый|ая|ое|ые)\s+(?:контент|страниц|элемент|cta|блок)/iu,
];

const PLATFORM_PATTERNS = [
  /\binstagram\b/giu,
  /\blinkedin\b/giu,
  /\btelegram\b/giu,
  /\bvk\b/giu,
  /\bвк\b/giu,
  /\bвконтакте\b/giu,
  /\bтелеграм(?:е|а|у|ом)?\b/giu,
  /\bинстаграм(?:е|а|у|ом)?\b/giu,
];

const SECTION_ALIASES = {
  problem: ['problem', 'pain', 'who-for', 'whoFor'],
  whatItCreates: ['whatItCreates', 'what-it-does', 'what-it-does-for-platform'],
  useCases: ['useCases', 'use-cases'],
  platformUseCases: ['platformUseCases', 'use-cases', 'useCases'],
  contentFormats: ['contentFormats', 'format', 'vk-format-guidance', 'telegram-format-guidance'],
  workflow: ['workflow', 'how-it-works'],
  howToUse: ['howToUse'],
  breakdown: ['breakdown'],
  howToCreate: ['howToCreate'],
  comparison: ['comparison'],
  whenToUseGoToFlow: ['whenToUseGoToFlow'],
  migrationBenefits: ['migrationBenefits'],
  promptGroups: ['promptGroups'],
  howToUsePrompts: ['howToUsePrompts'],
  scenario: ['scenario'],
  templateCategories: ['templateCategories', 'templates'],
  productWorkflow: ['productWorkflow'],
  benefits: ['benefits'],
  examples: ['examples'],
  quickAnswer: ['quickAnswer'],
  pageRelevantFormats: ['pageRelevantFormats', 'templateCategories', 'templateChoiceGuide'],
  readyCarouselShowcase: ['readyCarouselShowcase'],
  pageSpecificVisualProof: ['pageSpecificVisualProof'],
  templateChoiceGuide: ['templateChoiceGuide'],
  productCapabilities: ['productCapabilities'],
};

const STRUCTURED_SECTION_IDS = new Set([
  ...Object.values(SECTION_ALIASES).flat(),
  'hero',
  'faq',
  'related',
  'finalCta',
]);

const isSectionAllowedForOrder = (sectionId, requiredOrder) => (
  requiredOrder.some((requirement) => (SECTION_ALIASES[requirement] || [requirement]).includes(sectionId))
);

const textFrom = (value) => {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map(textFrom).join(' ');
  if (value && typeof value === 'object') return Object.values(value).map(textFrom).join(' ');
  return '';
};

export const normalizeSeoText = (value, { neutralizePlatforms = false } = {}) => {
  let text = textFrom(value).toLowerCase();
  if (neutralizePlatforms) {
    PLATFORM_PATTERNS.forEach((pattern) => {
      text = text.replace(pattern, ' platform ');
    });
  }
  return text
    .replace(/https?:\/\/\S+/giu, ' ')
    .replace(/[^\p{L}\p{N}]+/giu, ' ')
    .replace(/\s+/gu, ' ')
    .trim();
};

export const hasPlaceholderText = (value) => PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(textFrom(value)));

const hasMeaningfulText = (value, minLength = 12) => (
  typeof value === 'string' &&
  value.trim().length >= minLength &&
  !hasPlaceholderText(value)
);

const isProductionState = (page) => PRODUCTION_READY_STATES.includes(page?.state);

const asArray = (value) => (Array.isArray(value) ? value : []);

const getPageId = (page) => page?.id || page?.path || '(missing id)';

export const getSectionsForRequirement = (page, requirement) => {
  const aliases = SECTION_ALIASES[requirement] || [requirement];
  return asArray(page.sections).filter((section) => aliases.includes(section.id));
};

export const getStructuredItemsForRequirement = (page, requirement) => {
  const direct = page[requirement];
  if (Array.isArray(direct)) return direct;

  const fallbackByRequirement = {
    platformUseCases: page.useCases,
    howToUse: page.workflow,
    howToCreate: page.workflow,
    howToUsePrompts: page.promptGroups || page.prompts,
    migrationBenefits: page.migrationBenefits || page.benefits,
    templateCategories: page.templateCategories || page.templates,
    promptGroups: page.promptGroups || page.prompts,
    quickAnswer: page.quickAnswer ? (Array.isArray(page.quickAnswer) ? page.quickAnswer : [page.quickAnswer]) : undefined,
    pageRelevantFormats: [
      ...asArray(page.templateCategories || page.templates),
      ...(page.templateChoiceGuide ? [page.templateChoiceGuide] : []),
    ],
    readyCarouselShowcase: page.readyCarouselShowcase,
    pageSpecificVisualProof: page.pageSpecificVisualProof ? [page.pageSpecificVisualProof] : undefined,
    productWorkflow: page.productWorkflow ? [page.productWorkflow] : undefined,
    productCapabilities: page.productCapabilities?.groups,
    templateChoiceGuide: page.templateChoiceGuide ? [page.templateChoiceGuide] : undefined,
  };

  if (Array.isArray(fallbackByRequirement[requirement])) {
    return fallbackByRequirement[requirement];
  }

  return [];
};

const getRequirementText = (page, requirement) => {
  if (requirement === 'hero') return [page.h1 || page.title, page.heroSubtitle || page.description].join(' ');
  if (requirement === 'faq') return textFrom(page.faq);
  if (requirement === 'related') return textFrom([page.relatedBlogSlugs, page.relatedSeoPaths, page.relatedProductToolPaths, page.contextualLinks]);
  if (requirement === 'finalCta') return textFrom(page.finalCta);
  if (requirement === 'pageRelevantFormats') return textFrom([page.templateCategories, page.templates, page.templateChoiceGuide]);
  if (requirement === 'pageSpecificVisualProof') return textFrom(page.pageSpecificVisualProof);
  if (requirement === 'examples') return textFrom(page.examples);
  if (requirement === 'benefits') return textFrom(page.benefits || getSectionsForRequirement(page, requirement));
  if (requirement === 'productWorkflow') return textFrom(page.productWorkflow);
  if (requirement === 'productCapabilities') return textFrom(page.productCapabilities);
  return textFrom([getStructuredItemsForRequirement(page, requirement), getSectionsForRequirement(page, requirement)]);
};

const isProductSeoPage = (page) => (
  ['template_page', 'commercial_tool', 'platform_page'].includes(page?.templateVariant) ||
  ['template', 'tool', 'commercial', 'platform', 'useCase'].includes(page?.pageType)
);

const validateTextField = (errors, page, field, minLength = 12) => {
  if (!hasMeaningfulText(page[field], minLength)) {
    errors.push(`${getPageId(page)} ${field} must contain meaningful non-placeholder text.`);
  }
};

const validateSeoBrief = (errors, page) => {
  const id = getPageId(page);
  if (!page.seoBrief || typeof page.seoBrief !== 'object') {
    errors.push(`${id} production state requires seoBrief.`);
    return;
  }

  SEO_REQUIRED_BRIEF_FIELDS.forEach((field) => {
    if (!hasMeaningfulText(page.seoBrief[field], ['language', 'country'].includes(field) ? 2 : 4)) {
      errors.push(`${id} seoBrief.${field} must contain meaningful text.`);
    }
  });
};

const validateFaqPolicy = (errors, page) => {
  const id = getPageId(page);
  const policy = {
    ...SEO_DEFAULT_FAQ_POLICY,
    ...(page.faqPolicy || {}),
  };
  if (isProductSeoPage(page)) {
    policy.minItems = Math.max(policy.minItems || 0, 12);
    policy.maxItems = Math.min(policy.maxItems || 16, 16);
    policy.requireUniqueQuestions = true;
    policy.requireVisibleSchemaParity = true;
  }
  const faq = asArray(page.faq);

  if (faq.length < policy.minItems || faq.length > policy.maxItems) {
    errors.push(`${id} FAQ count must be between ${policy.minItems} and ${policy.maxItems}; got ${faq.length}.`);
  }

  if (policy.requireUniqueQuestions) {
    const questions = faq.map((item) => normalizeSeoText(item.question));
    if (new Set(questions).size !== questions.length) {
      errors.push(`${id} FAQ questions must be unique.`);
    }
  }

  if (policy.requireVisibleSchemaParity && !page.schemaType) {
    errors.push(`${id} FAQ schema parity requires a declared schemaType.`);
  }

  const normalizedQuestions = faq.map((item) => normalizeSeoText(item.question));
  if (new Set(normalizedQuestions).size !== normalizedQuestions.length) {
    errors.push(`${id} FAQ questions must be unique after normalization.`);
  }
};

const validateSectionPolicy = (errors, page, requiredOrder) => {
  const id = getPageId(page);
  if (!page.sectionPolicy || typeof page.sectionPolicy !== 'object') {
    errors.push(`${id} production state requires sectionPolicy.`);
    return;
  }

  const declaredSections = new Set(isCarouselProductSeoPage(page)
    ? requiredOrder
    : asArray(page.templateSections));

  requiredOrder.forEach((sectionId) => {
    const policy = page.sectionPolicy[sectionId];
    if (!policy || typeof policy !== 'object') {
      errors.push(`${id} sectionPolicy.${sectionId} is required.`);
      return;
    }

    SEO_REQUIRED_SECTION_RELEVANCE_FIELDS.forEach((field) => {
      if (field === 'enabled' && typeof policy[field] !== 'boolean') {
        errors.push(`${id} sectionPolicy.${sectionId}.enabled must be boolean.`);
      }
      if (field === 'reason' && !hasMeaningfulText(policy[field], 16)) {
        errors.push(`${id} sectionPolicy.${sectionId}.reason must explain why the section belongs on this page.`);
      }
    });

    if (policy.enabled === false && declaredSections.has(sectionId)) {
      errors.push(`${id} sectionPolicy.${sectionId} is disabled but present in templateSections.`);
    }
  });
};

const validateConversionContract = (errors, page) => {
  const id = getPageId(page);
  const conversion = page.conversion;
  if (!conversion || typeof conversion !== 'object') {
    errors.push(`${id} production state requires conversion metadata.`);
    return;
  }

  if (conversion.destinationType !== 'app') {
    errors.push(`${id} conversion.destinationType must be app for product-action CTAs.`);
  }
  if (conversion.destinationUrl !== SEO_APP_ORIGIN) {
    errors.push(`${id} conversion.destinationUrl must be ${SEO_APP_ORIGIN} unless a verified app deep link is documented.`);
  }
  if (!hasMeaningfulText(conversion.targetAction, 4)) {
    errors.push(`${id} conversion.targetAction must be meaningful.`);
  }
  if (!hasMeaningfulText(conversion.pageEntity, 4)) {
    errors.push(`${id} conversion.pageEntity must be meaningful.`);
  }
};

const validateIndexationGate = (errors, page) => {
  const id = getPageId(page);
  const approval = page.indexationApproval;
  if (!approval || typeof approval !== 'object') {
    errors.push(`${id} production state requires indexationApproval metadata.`);
    return;
  }

  SEO_INDEXATION_APPROVAL_FIELDS.forEach((field) => {
    if (!(field in approval)) {
      errors.push(`${id} indexationApproval.${field} is required.`);
    }
  });

  if (page.state === 'indexable_approved') {
    if (page.noindex === true) errors.push(`${id} indexable_approved page must not be noindex.`);
    if (page.sitemapEligible !== true) errors.push(`${id} indexable_approved page must be sitemapEligible.`);
    if (approval.approved !== true || page.indexationApproved !== true || page.approvedByHuman !== true) {
      errors.push(`${id} indexable_approved requires approved indexationApproval, indexationApproved, and approvedByHuman.`);
    }
    ['approvedBy', 'approvedAt'].forEach((field) => {
      if (!hasMeaningfulText(approval[field], 4)) errors.push(`${id} indexationApproval.${field} is required before indexation.`);
    });
  } else {
    if (page.noindex !== true) errors.push(`${id} non-indexable production state must remain noindex.`);
    if (page.sitemapEligible === true) errors.push(`${id} non-indexable production state must not be sitemapEligible.`);
    if (approval.approved === true || page.indexationApproved === true) {
      errors.push(`${id} non-indexable production state must not have indexation approval.`);
    }
  }
};

const validateReviewMetadata = (errors, page) => {
  const id = getPageId(page);
  const review = page.review;
  if (!review || typeof review !== 'object') {
    errors.push(`${id} production state requires review metadata.`);
    return;
  }

  SEO_REVIEW_METADATA_FIELDS.forEach((field) => {
    if (!(field in review)) {
      errors.push(`${id} review.${field} is required.`);
    }
    if (page.state === 'indexable_approved' && !hasMeaningfulText(review[field], 4)) {
      errors.push(`${id} review.${field} must be set before indexation.`);
    }
  });
};

const validateReadabilityPolicy = (errors, page) => {
  const id = getPageId(page);
  if ((page.h1 || '').length > SEO_READABILITY_POLICY.maxH1Chars) {
    errors.push(`${id} h1 is too long for the SEO readability policy.`);
  }
  if ((page.title || '').length > SEO_READABILITY_POLICY.maxTitleChars) {
    errors.push(`${id} title is too long for the SEO readability policy.`);
  }

  const descriptionLength = (page.description || '').length;
  if (
    descriptionLength < SEO_READABILITY_POLICY.minDescriptionChars ||
    descriptionLength > SEO_READABILITY_POLICY.maxDescriptionChars
  ) {
    errors.push(`${id} description length must be between ${SEO_READABILITY_POLICY.minDescriptionChars} and ${SEO_READABILITY_POLICY.maxDescriptionChars} characters.`);
  }

  if ((page.heroSubtitle || '').length > SEO_READABILITY_POLICY.maxHeroSubtitleChars) {
    errors.push(`${id} heroSubtitle is too long for the SEO readability policy.`);
  }

  asArray(page.faq).forEach((item, index) => {
    if ((item.answer || '').length > SEO_READABILITY_POLICY.maxFaqAnswerChars) {
      errors.push(`${id} faq[${index}] answer is too long for the SEO readability policy.`);
    }
  });
};

const validateStructuredItems = (errors, page, requirement, items, label, { minItems = 1 } = {}) => {
  if (!Array.isArray(items) || items.length < minItems) {
    errors.push(`${getPageId(page)} ${label} must contain at least ${minItems} item(s).`);
    return;
  }

  const seen = new Set();
  items.forEach((item, index) => {
    const title = item?.title || item?.label || item?.question || item?.name || item?.step;
    const body = item?.body || item?.description || item?.answer || item?.text || item?.content;
    const normalized = normalizeSeoText(item);

    if (!hasMeaningfulText(title, 4)) {
      errors.push(`${getPageId(page)} ${label}[${index}] must have a meaningful title/question/label.`);
    }

    if (!hasMeaningfulText(body, 12)) {
      errors.push(`${getPageId(page)} ${label}[${index}] must have meaningful explanatory text.`);
    }

    if (!normalized) {
      errors.push(`${getPageId(page)} ${label}[${index}] cannot be an empty object.`);
    } else if (seen.has(normalized)) {
      errors.push(`${getPageId(page)} ${label} contains duplicate item content: ${title || index}.`);
    }

    seen.add(normalized);
  });
};

const validateSectionObjects = (errors, page, requirement, sections) => {
  if (!sections.length) {
    errors.push(`${getPageId(page)} missing required section object for ${requirement}.`);
    return;
  }

  const seen = new Set();
  sections.forEach((section, index) => {
    if (!hasMeaningfulText(section.title, 4)) {
      errors.push(`${getPageId(page)} section ${requirement}[${index}] must have a meaningful heading.`);
    }

    if (!hasMeaningfulText(section.body, 16) && !asArray(section.bullets).length) {
      errors.push(`${getPageId(page)} section ${requirement}[${index}] must have meaningful body text or item list.`);
    }

    asArray(section.bullets).forEach((bullet, bulletIndex) => {
      if (!hasMeaningfulText(bullet, 8)) {
        errors.push(`${getPageId(page)} section ${requirement}[${index}] bullet ${bulletIndex} must be meaningful.`);
      }
    });

    const normalized = normalizeSeoText(section);
    if (!normalized) {
      errors.push(`${getPageId(page)} section ${requirement}[${index}] cannot be empty.`);
    } else if (seen.has(normalized)) {
      errors.push(`${getPageId(page)} section ${requirement} contains duplicate item content.`);
    }
    seen.add(normalized);
  });
};

const WORKFLOW_INTERNAL_LABEL_PATTERN = /\b(?:ACTIVE|MVP|BETA|COMING\s+SOON|tokens?|token\s+prices?|статус|токен(?:ы|ов)?|цена\s+токен)/iu;
const WORKFLOW_DRAFT_OUTCOME_PATTERN = /\b(?:draft|черновик|черновая|черновой|незаверш(?:енный|ённый|енная|ённая))/iu;
const RAW_HTML_PATTERN = /<[^>]+>/u;
const WORKFLOW_TYPE_AVAILABILITIES = new Set(['available', 'coming_soon']);

const isPlaceholderWorkflowHref = (href) => (
  !href ||
  href.trim() === '#' ||
  /^javascript:/iu.test(href.trim()) ||
  /todo|tbd|placeholder/iu.test(href)
);

const hasImmediateShowcaseAfterWorkflow = (page) => {
  const sections = getSeoPageRequirementOrder(page);
  const workflowIndex = sections.indexOf('productWorkflow');
  if (workflowIndex < 0) return false;
  if (sections[workflowIndex + 1] === 'readyCarouselShowcase') return true;
  return sections[workflowIndex + 1] === 'productCapabilities' &&
    sections[workflowIndex + 2] === 'readyCarouselShowcase';
};

const validateWorkflowTitle = (errors, page, workflow) => {
  const title = workflow.title || {};
  if (!hasMeaningfulText(workflow.eyebrow, 4)) {
    errors.push(`${getPageId(page)} productWorkflow eyebrow must contain meaningful text.`);
  }

  if (!hasMeaningfulText(title.before, 2)) {
    errors.push(`${getPageId(page)} productWorkflow title.before must contain meaningful text.`);
  }

  if (!hasMeaningfulText(title.accent, 3)) {
    errors.push(`${getPageId(page)} productWorkflow title.accent must contain meaningful text.`);
  }

  const fullTitle = `${title.before || ''}${title.accent || ''}${title.after || ''}`;
  if (title.accent && !fullTitle.includes(title.accent)) {
    errors.push(`${getPageId(page)} productWorkflow highlighted phrase must be present in the visible title.`);
  }
};

const validateWorkflowImages = (errors, page, workflow, context) => {
  buildProductWorkflowMockups(workflow).forEach((mockup) => {
    if (mockup.resultCarousel) {
      const carousel = mockup.resultCarousel;
      const images = carousel.images;

      if (!hasMeaningfulText(carousel.title, 8)) {
        errors.push(`${getPageId(page)} productWorkflow mockup ${mockup.id} resultCarousel title must be meaningful.`);
      }
      if (!hasMeaningfulText(carousel.label, 4)) {
        errors.push(`${getPageId(page)} productWorkflow mockup ${mockup.id} resultCarousel label must be meaningful.`);
      }
      if (!Array.isArray(images) || images.length < 2) {
        errors.push(`${getPageId(page)} productWorkflow mockup ${mockup.id} resultCarousel must contain at least 2 images.`);
      } else {
        if (Number.isFinite(carousel.slideCount) && carousel.slideCount !== images.length) {
          errors.push(`${getPageId(page)} productWorkflow mockup ${mockup.id} resultCarousel slideCount must match image count.`);
        }

        images.forEach((image, imageIndex) => {
          if (!/^\/images\/[a-z0-9/_-]+\.webp$/iu.test(image.src || '')) {
            errors.push(`${getPageId(page)} productWorkflow mockup ${mockup.id} resultCarousel image ${imageIndex} path must be a local WebP image.`);
          }
          if (context.assetExists && !context.assetExists(image.src)) {
            errors.push(`${getPageId(page)} productWorkflow mockup ${mockup.id} resultCarousel image file does not exist: ${image.src}`);
          }
          if (!hasMeaningfulText(image.alt, 12)) {
            errors.push(`${getPageId(page)} productWorkflow mockup ${mockup.id} resultCarousel image ${imageIndex} requires meaningful alt text.`);
          }
        });
      }
    }

    if (mockup.image) {
      if (!/^\/images\/[a-z0-9/_-]+\.(?:webp|png|jpe?g|svg)$/iu.test(mockup.image)) {
        errors.push(`${getPageId(page)} productWorkflow mockup ${mockup.id} image path is invalid: ${mockup.image}`);
      }

      if (context.assetExists && !context.assetExists(mockup.image)) {
        errors.push(`${getPageId(page)} productWorkflow mockup ${mockup.id} image file does not exist: ${mockup.image}`);
      }

      if (mockup.decorative !== true && !hasMeaningfulText(mockup.alt, 12)) {
        errors.push(`${getPageId(page)} productWorkflow mockup ${mockup.id} informative image requires meaningful alt text.`);
      }
    }
  });
};

const validateWorkflowCarouselTypes = (errors, page, workflow) => {
  if (workflow.preset !== 'carousel_creation') return;

  const carouselTypes = buildProductWorkflowCarouselTypes(workflow);
  if (!Array.isArray(carouselTypes) || carouselTypes.length < 2) {
    errors.push(`${getPageId(page)} productWorkflow carousel_creation must define at least 2 carouselTypes.`);
    return;
  }

  const typeIds = carouselTypes.map((type) => type.id);
  const typeLabels = carouselTypes.map((type) => normalizeSeoText(type.label));

  if (new Set(typeIds).size !== typeIds.length) {
    errors.push(`${getPageId(page)} productWorkflow carouselTypes ids must be unique.`);
  }
  if (new Set(typeLabels).size !== typeLabels.length) {
    errors.push(`${getPageId(page)} productWorkflow carouselTypes labels must be unique.`);
  }

  carouselTypes.forEach((type, index) => {
    if (!hasMeaningfulText(type.id, 2)) {
      errors.push(`${getPageId(page)} productWorkflow carouselTypes[${index}] must have a meaningful id.`);
    }
    if (!hasMeaningfulText(type.label, 2)) {
      errors.push(`${getPageId(page)} productWorkflow carouselTypes[${index}] must have a non-empty label.`);
    }
    if (!WORKFLOW_TYPE_AVAILABILITIES.has(type.availability)) {
      errors.push(`${getPageId(page)} productWorkflow carouselTypes[${index}] uses invalid availability: ${type.availability || '(missing)'}.`);
    }
    if (type.availability !== 'available' && type.active === true) {
      errors.push(`${getPageId(page)} productWorkflow carouselTypes[${index}] must not present unavailable types as active.`);
    }
    if (WORKFLOW_INTERNAL_LABEL_PATTERN.test(textFrom(type))) {
      errors.push(`${getPageId(page)} productWorkflow carouselTypes[${index}] must not expose internal product labels.`);
    }
  });
};

const validateProductWorkflowContent = (errors, page, requirement, workflow, context = {}) => {
  if (!workflow || typeof workflow !== 'object') {
    errors.push(`${getPageId(page)} productWorkflow must be defined for ${requirement}.`);
    return;
  }

  const preset = getProductWorkflowPreset(workflow.preset);
  if (!preset) {
    errors.push(`${getPageId(page)} productWorkflow uses invalid preset: ${workflow.preset || '(missing)'}.`);
    return;
  }

  validateWorkflowTitle(errors, page, workflow);
  validateWorkflowCarouselTypes(errors, page, workflow);

  if (!hasMeaningfulText(workflow.description, 30)) {
    errors.push(`${getPageId(page)} productWorkflow description must contain meaningful page-specific text.`);
  }

  const steps = buildProductWorkflowSteps(workflow);
  const stepIds = steps.map((step) => step.id);
  if (workflow.preset === 'carousel_creation' && steps.length !== 5) {
    errors.push(`${getPageId(page)} productWorkflow carousel_creation must render exactly 5 steps.`);
  }
  if (new Set(stepIds).size !== stepIds.length) {
    errors.push(`${getPageId(page)} productWorkflow step ids must be unique.`);
  }
  steps.forEach((step, index) => {
    if (!hasMeaningfulText(step.id, 3)) errors.push(`${getPageId(page)} productWorkflow step ${index} must have an id.`);
    if (!hasMeaningfulText(step.title, 4)) errors.push(`${getPageId(page)} productWorkflow step ${step.id || index} must have a meaningful title.`);
    if (!hasMeaningfulText(step.description, 12)) errors.push(`${getPageId(page)} productWorkflow step ${step.id || index} must have a meaningful description.`);
  });

  const mockups = buildProductWorkflowMockups(workflow);
  const mockupIds = mockups.map((mockup) => mockup.id);
  if (workflow.preset === 'carousel_creation' && mockups.length !== 4) {
    errors.push(`${getPageId(page)} productWorkflow carousel_creation must render exactly 4 mockup panels.`);
  }
  if (new Set(mockupIds).size !== mockupIds.length) {
    errors.push(`${getPageId(page)} productWorkflow mockup ids must be unique.`);
  }
  mockups.forEach((mockup, index) => {
    if (!hasMeaningfulText(mockup.id, 3)) errors.push(`${getPageId(page)} productWorkflow mockup ${index} must have an id.`);
    if (!hasMeaningfulText(mockup.title, 4)) errors.push(`${getPageId(page)} productWorkflow mockup ${mockup.id || index} must have a meaningful title.`);
    if (!hasMeaningfulText(mockup.caption, 12)) errors.push(`${getPageId(page)} productWorkflow mockup ${mockup.id || index} must have a meaningful caption.`);
    if (!mockup.image && !hasMeaningfulText(mockup.fallbackVisualType, 4)) {
      errors.push(`${getPageId(page)} productWorkflow mockup ${mockup.id || index} must define image or fallbackVisualType.`);
    }
  });
  validateWorkflowImages(errors, page, workflow, context);

  if (!Array.isArray(workflow.featureChips) || workflow.featureChips.length < 3) {
    errors.push(`${getPageId(page)} productWorkflow featureChips must contain at least 3 items.`);
  } else {
    if (workflow.preset === 'carousel_creation' && workflow.featureChips.length > 8) {
      errors.push(`${getPageId(page)} productWorkflow carousel_creation featureChips must contain no more than 8 items.`);
    }
    workflow.featureChips.forEach((chip, index) => {
      if (!hasMeaningfulText(chip, 2)) errors.push(`${getPageId(page)} productWorkflow featureChips[${index}] must contain meaningful text.`);
    });
  }

  if (workflow.cta) {
    if (!hasMeaningfulText(workflow.cta?.label, 4)) errors.push(`${getPageId(page)} productWorkflow CTA label must be meaningful.`);
    if (isPlaceholderWorkflowHref(workflow.cta?.href)) errors.push(`${getPageId(page)} productWorkflow CTA href must be valid and non-placeholder.`);
    if (!hasMeaningfulText(workflow.cta?.note, 12)) errors.push(`${getPageId(page)} productWorkflow CTA supporting note must be meaningful.`);
  } else if (!hasImmediateShowcaseAfterWorkflow(page) || !page.readyCarouselShowcaseCta) {
    errors.push(`${getPageId(page)} productWorkflow without CTA requires an immediately following readyCarouselShowcase with a configured CTA.`);
  }

  const workflowText = textFrom(workflow);
  if (WORKFLOW_DRAFT_OUTCOME_PATTERN.test(workflowText)) {
    errors.push(`${getPageId(page)} productWorkflow must not position the main outcome as a draft.`);
  }
  if (WORKFLOW_INTERNAL_LABEL_PATTERN.test(workflowText)) {
    errors.push(`${getPageId(page)} productWorkflow must not expose internal product labels or token pricing.`);
  }
  if (RAW_HTML_PATTERN.test(workflowText)) {
    errors.push(`${getPageId(page)} productWorkflow page data must not contain raw HTML or JSX.`);
  }
};

const validateTemplateChoiceGuideContent = (errors, page, guide) => {
  const id = getPageId(page);

  if (!guide || typeof guide !== 'object') {
    errors.push(`${id} templateChoiceGuide must be defined.`);
    return;
  }

  if (!hasMeaningfulText(guide.eyebrow, 4)) {
    errors.push(`${id} templateChoiceGuide eyebrow must contain meaningful text.`);
  }

  const title = guide.title || {};
  if (!hasMeaningfulText(title.before, 2)) {
    errors.push(`${id} templateChoiceGuide title.before must contain meaningful text.`);
  }
  if (!hasMeaningfulText(title.accent, 3)) {
    errors.push(`${id} templateChoiceGuide title.accent must contain meaningful text.`);
  }

  const fullTitle = `${title.before || ''}${title.accent || ''}${title.after || ''}`;
  if (title.accent && !fullTitle.includes(title.accent)) {
    errors.push(`${id} templateChoiceGuide accent must be present in the visible title.`);
  }

  if (!hasMeaningfulText(guide.description, 20)) {
    errors.push(`${id} templateChoiceGuide description must contain meaningful text.`);
  }

  const items = guide.items;
  if (!Array.isArray(items) || items.length < 4) {
    errors.push(`${id} templateChoiceGuide must contain at least 4 items.`);
    return;
  }
  if (items.length > 8) {
    errors.push(`${id} templateChoiceGuide must contain no more than 8 items.`);
  }

  const seenIds = new Set();
  const seenPairs = new Set();
  items.forEach((item, index) => {
    if (!hasMeaningfulText(item.id, 2)) {
      errors.push(`${id} templateChoiceGuide items[${index}] must have a meaningful id.`);
    }
    if (seenIds.has(item.id)) {
      errors.push(`${id} templateChoiceGuide items[${index}] has duplicate id: ${item.id}.`);
    }
    seenIds.add(item.id);

    if (!hasMeaningfulText(item.task, 4)) {
      errors.push(`${id} templateChoiceGuide items[${index}] must have a non-empty task.`);
    }
    if (!hasMeaningfulText(item.template, 4)) {
      errors.push(`${id} templateChoiceGuide items[${index}] must have a non-empty template.`);
    }
    if (!hasMeaningfulText(item.structure, 4)) {
      errors.push(`${id} templateChoiceGuide items[${index}] must have a non-empty structure.`);
    }

    const pair = normalizeSeoText(`${item.task}|${item.template}`);
    if (seenPairs.has(pair)) {
      errors.push(`${id} templateChoiceGuide contains duplicate task/template pair at index ${index}.`);
    }
    seenPairs.add(pair);

    if (hasPlaceholderText(item.task) || hasPlaceholderText(item.template) || hasPlaceholderText(item.structure)) {
      errors.push(`${id} templateChoiceGuide items[${index}] contains placeholder text.`);
    }
  });

  const guideText = textFrom(guide);
  if (RAW_HTML_PATTERN.test(guideText)) {
    errors.push(`${id} templateChoiceGuide must not contain raw HTML or JSX.`);
  }
};

const validateProductCapabilitiesContent = (errors, page) => {
  const id = getPageId(page);
  const capabilities = page.productCapabilities;

  if (!capabilities || typeof capabilities !== 'object') {
    errors.push(`${id} productCapabilities must be defined for product SEO pages.`);
    return;
  }

  if (!hasMeaningfulText(capabilities.eyebrow, 4)) {
    errors.push(`${id} productCapabilities eyebrow must contain meaningful text.`);
  }
  if (!hasMeaningfulText(textFrom(capabilities.heading), 12)) {
    errors.push(`${id} productCapabilities heading must contain meaningful text.`);
  }
  if (!hasMeaningfulText(capabilities.introCopy, 30)) {
    errors.push(`${id} productCapabilities introCopy must contain meaningful Product Truth context.`);
  }

  const groups = asArray(capabilities.groups);
  if (groups.length < 6 || groups.length > 8) {
    errors.push(`${id} productCapabilities groups must contain 6 to 8 canonical groups; got ${groups.length}.`);
  }

  const capabilityIds = new Set(groups.flatMap((group) => asArray(group.capabilityIds)));
  const missingIds = SEO_REQUIRED_PRODUCT_CAPABILITY_IDS.filter((capabilityId) => !capabilityIds.has(capabilityId));
  if (missingIds.length > 0) {
    errors.push(`${id} productCapabilities missing canonical capability ids: ${missingIds.join(', ')}.`);
  }

  groups.forEach((group, index) => {
    if (!hasMeaningfulText(group.id, 3)) errors.push(`${id} productCapabilities.groups[${index}] must have an id.`);
    if (!hasMeaningfulText(group.title, 4)) errors.push(`${id} productCapabilities.groups[${index}] must have a title.`);
    if (!hasMeaningfulText(group.body, 20)) errors.push(`${id} productCapabilities.groups[${index}] must have a meaningful body.`);
    if (!Array.isArray(group.capabilityIds) || group.capabilityIds.length < 1) {
      errors.push(`${id} productCapabilities.groups[${index}] must list canonical capabilityIds.`);
    }
  });

  const capabilitiesText = textFrom(capabilities);
  if (RAW_HTML_PATTERN.test(capabilitiesText)) {
    errors.push(`${id} productCapabilities must not contain raw HTML or JSX.`);
  }
  if (hasPlaceholderText(capabilities)) {
    errors.push(`${id} productCapabilities must not contain placeholders.`);
  }
};

const validateRequirementContent = (errors, page, requirement, context = {}) => {
  if (requirement === 'hero') {
    validateTextField(errors, page, 'h1', 4);
    if (!hasMeaningfulText(page.heroSubtitle || page.description, 20)) {
      errors.push(`${getPageId(page)} hero must contain meaningful supporting text.`);
    }
    return;
  }

  if (requirement === 'faq') {
    validateStructuredItems(errors, page, requirement, page.faq, 'faq');
    return;
  }

  if (requirement === 'examples') {
    validateStructuredItems(errors, page, requirement, page.examples, 'examples');
    return;
  }

  if (requirement === 'readyCarouselShowcase') {
    validateStructuredItems(errors, page, requirement, page.readyCarouselShowcase, 'readyCarouselShowcase');
    if (page.readyCarouselShowcaseCta) {
      validateShowcaseCtaContent(errors, page, page.readyCarouselShowcaseCta, context);
    }
    return;
  }

  if (requirement === 'quickAnswer') {
    const qaItems = Array.isArray(page.quickAnswer) ? page.quickAnswer : [page.quickAnswer].filter(Boolean);
    validateStructuredItems(errors, page, requirement, qaItems, 'quickAnswer');
    return;
  }

  if (requirement === 'pageRelevantFormats') {
    validateStructuredItems(errors, page, 'templateCategories', page.templateCategories || page.templates, 'templateCategories');
    validateTemplateChoiceGuideContent(errors, page, page.templateChoiceGuide);
    return;
  }

  if (requirement === 'productWorkflow') {
    validateProductWorkflowContent(errors, page, requirement, page.productWorkflow, context);
    return;
  }

  if (requirement === 'productCapabilities') {
    validateProductCapabilitiesContent(errors, page);
    return;
  }

  if (requirement === 'pageSpecificVisualProof') {
    const proof = page.pageSpecificVisualProof;
    validateStructuredItems(errors, page, requirement, proof ? [proof] : [], 'pageSpecificVisualProof');
    if (!Array.isArray(proof?.images) || proof.images.length < 3 || proof.images.length > 5) {
      errors.push(`${getPageId(page)} pageSpecificVisualProof must contain 3 to 5 images.`);
    }
    proof?.images?.forEach((image, index) => {
      if (!image?.src?.startsWith('/')) errors.push(`${getPageId(page)} pageSpecificVisualProof.images[${index}] must use a local public src.`);
      if (!hasMeaningfulText(image?.alt, 12)) errors.push(`${getPageId(page)} pageSpecificVisualProof.images[${index}] must have meaningful alt text.`);
    });
    return;
  }

  if (requirement === 'templateChoiceGuide') {
    validateTemplateChoiceGuideContent(errors, page, page.templateChoiceGuide);
    return;
  }

  if (requirement === 'benefits') {
    if (Array.isArray(page.benefits)) {
      validateStructuredItems(errors, page, requirement, page.benefits, 'benefits');
      return;
    }
    validateSectionObjects(errors, page, requirement, getSectionsForRequirement(page, requirement));
    return;
  }

  if (requirement === 'related') {
    const links = [
      ...asArray(page.relatedBlogSlugs),
      ...asArray(page.relatedSeoPaths),
      ...asArray(page.relatedProductToolPaths),
      ...asArray(page.contextualLinks).map((link) => link.href),
    ].filter(Boolean);
    if (!links.length) errors.push(`${getPageId(page)} related must include at least one internal/supporting link.`);
    return;
  }

  if (requirement === 'finalCta') {
    validateFinalCtaContent(errors, page, page.finalCta, context);
    return;
  }

  const structuredItems = getStructuredItemsForRequirement(page, requirement);
  if (structuredItems.length) {
    validateStructuredItems(errors, page, requirement, structuredItems, requirement);
    return;
  }

  validateSectionObjects(errors, page, requirement, getSectionsForRequirement(page, requirement));
};

export const getSeoPageRequirementOrder = (page) => (
  isCarouselProductSeoPage(page)
    ? CAROUSEL_PRODUCT_SEO_SECTION_ORDER
    : resolveTemplateSectionOrder(page.templateVariant, page.templateSections)
);

export const getSeoPageProductionReadinessErrors = (page, context = {}) => {
  if (!isProductionState(page)) return [];

  const errors = [];
  const id = getPageId(page);
  const requiredOrder = getSeoPageRequirementOrder(page);

  if (!requiredOrder.length) {
    errors.push(`${id} must use a templateVariant with an approved section order.`);
    return errors;
  }

  const declaredOrder = page.templateSections;
  if (isCarouselProductSeoPage(page)) {
    if (declaredOrder !== undefined) {
      errors.push(`${id} carousel product pages must not define templateSections; the executable template owns section order.`);
    }
  } else if (!Array.isArray(declaredOrder)) {
    errors.push(`${id} must define templateSections in the exact approved order for ${page.templateVariant}.`);
  } else {
    if (declaredOrder.join('|') !== requiredOrder.join('|')) {
      errors.push(`${id} templateSections must exactly match the resolved required/optional order for ${page.templateVariant}. Expected: ${requiredOrder.join(', ')}.`);
    }

    const variant = getTemplateVariant(page.templateVariant);
    if (variant) {
      const missingExplicit = (variant.requiredSections || []).filter((s) => !declaredOrder.includes(s));
      if (missingExplicit.length > 0) {
        errors.push(`${id} templateSections is missing required sections: ${missingExplicit.join(', ')}`);
      }
    }
  }

  asArray(page.sections).forEach((section) => {
    if (!STRUCTURED_SECTION_IDS.has(section.id)) {
      errors.push(`${id} has unknown or unsupported section id: ${section.id}`);
    } else if (!isSectionAllowedForOrder(section.id, requiredOrder)) {
      errors.push(`${id} section id ${section.id} is not supported by templateVariant=${page.templateVariant}.`);
    }
  });

  requiredOrder.forEach((requirement) => {
    validateRequirementContent(errors, page, requirement, context);
  });

  if (hasPlaceholderText(page)) {
    errors.push(`${id} contains placeholder/TODO/TBD/lorem ipsum/test copy.`);
  }

  validateSeoBrief(errors, page);
  validateFaqPolicy(errors, page);
  validateSectionPolicy(errors, page, requiredOrder);
  validateConversionContract(errors, page);
  validateIndexationGate(errors, page);
  validateReviewMetadata(errors, page);
  validateReadabilityPolicy(errors, page);

  HUMAN_REVIEW_FLAGS.forEach((field) => {
    if (page[field] !== true) {
      errors.push(`${id} production state requires ${field}=true.`);
    }
  });

  errors.push(...getSeoPageCtaErrors(page, context));
  errors.push(...getSeoPageInternalLinkErrors(page, context));
  errors.push(...getSeoMetadataReadinessErrors(page));
  errors.push(...validateSeoRuntimeProductProof({ page, context }));

  return errors;
};

const isForbiddenHref = (href) => (
  !href ||
  href.trim() === '#' ||
  /^javascript:/iu.test(href.trim()) ||
  /todo|tbd|placeholder/iu.test(href)
);

const getHrefPath = (href) => {
  if (typeof href !== 'string') return '';
  try {
    if (/^https?:\/\//iu.test(href)) return new URL(href).pathname.replace(/\/$/, '') || '/';
  } catch {
    return href;
  }
  return href.replace(/\/$/, '') || '/';
};

const isExternalHref = (href) => /^https?:\/\//iu.test(href || '');

const isApprovedExternalHref = (href) => /^https:\/\/app\.gotoflow\.io(?:\/|$)/iu.test(href || '');

const validatesLocaleForPage = (page, href) => {
  const path = getHrefPath(href);
  if (path === '/en' || path.startsWith('/en/')) return false;
  if (page.language === 'ru') return path === '/ru' || path.startsWith('/ru/');
  if (page.language === 'en') return path.startsWith('/') && !path.startsWith('/ru') && !path.startsWith('/en');
  return false;
};

const getTargetState = (href, context) => {
  const path = getHrefPath(href);
  return context.getSeoPageByPath?.(path)?.state || null;
};

const targetExists = (href, context) => {
  if (isExternalHref(href)) return isApprovedExternalHref(href);
  const path = getHrefPath(href);

  if (!context.internalPathExists && !context.getSeoPageByPath && !context.productToolPathExists) {
    return true;
  }

  return Boolean(
    context.internalPathExists?.(path) ||
    context.getSeoPageByPath?.(path) ||
    context.productToolPathExists?.(path)
  );
};

const getCtaTitleText = (title) => {
  if (typeof title === 'string') return title;
  if (title && typeof title === 'object') {
    return `${title.before || ''}${title.accent || ''}${title.after || ''}`;
  }
  return '';
};

const CTA_DRAFT_OUTCOME_PATTERN = /(?:\bdraft\b|черновик|черновая|черновой|черновую|незаверш(?:енный|ённый|енная|ённая))/iu;

const getDetectedPlatform = (page) => (
  page.platform ||
  page.targetPlatform ||
  page.entity?.platform ||
  page.topic?.platform ||
  null
);

const PLATFORM_MENTION_PATTERNS = {
  instagram: /\binstagram\b|инстаграм/iu,
  vk: /\bvk\b|вк\b|вконтакте/iu,
  telegram: /\btelegram\b|телеграм/iu,
  linkedin: /\blinkedin\b|линкедин/iu,
};

const validateActionLikeCta = (errors, page, cta, label, context, { requireInternal = false, requireAppDestination = false } = {}) => {
  if (!cta || typeof cta !== 'object') {
    errors.push(`${getPageId(page)} ${label} is required.`);
    return;
  }

  if (!hasMeaningfulText(cta.label, 4)) errors.push(`${getPageId(page)} ${label} label must be meaningful.`);
  if (isForbiddenHref(cta.href) && !cta.action) errors.push(`${getPageId(page)} ${label} must have a valid href or action.`);
  if (requireInternal && isExternalHref(cta.href)) errors.push(`${getPageId(page)} ${label} must use an internal href.`);
  if (requireAppDestination && !isApprovedExternalHref(cta.href)) errors.push(`${getPageId(page)} ${label} must target app.gotoflow.io.`);
  if (cta.action && !SUPPORTED_CTA_ACTIONS.includes(cta.action)) errors.push(`${getPageId(page)} ${label} uses unsupported action: ${cta.action}.`);
  if (cta.href && isExternalHref(cta.href) && !isApprovedExternalHref(cta.href)) errors.push(`${getPageId(page)} ${label} external href is not approved: ${cta.href}.`);
  if (cta.href && !isExternalHref(cta.href) && !validatesLocaleForPage(page, cta.href)) errors.push(`${getPageId(page)} ${label} href has the wrong locale or forbidden /en path: ${cta.href}.`);
  if (cta.href && !targetExists(cta.href, context)) errors.push(`${getPageId(page)} ${label} target does not exist or is not approved: ${cta.href}.`);
  const targetState = getTargetState(cta.href, context);
  if (['planning_only', 'quarantined_review'].includes(targetState)) errors.push(`${getPageId(page)} ${label} cannot target ${targetState} page: ${cta.href}.`);
  if (cta.action && cta.href && cta.action === 'open_app' && !isApprovedExternalHref(cta.href)) errors.push(`${getPageId(page)} ${label} action open_app must target app.gotoflow.io.`);
};

const validateShowcaseCtaContent = (errors, page, cta, context = {}) => {
  validateActionLikeCta(errors, page, cta, 'readyCarouselShowcase CTA', context);

  if (!hasMeaningfulText(cta?.note, 12)) {
    errors.push(`${getPageId(page)} readyCarouselShowcase CTA note must be meaningful.`);
  }

  const finalLabel = page.finalCta?.primaryAction?.label;
  if (cta?.label && finalLabel && normalizeSeoText(cta.label) === normalizeSeoText(finalLabel)) {
    errors.push(`${getPageId(page)} readyCarouselShowcase CTA label must be distinct from final CTA label.`);
  }
};

const validateFinalCtaContent = (errors, page, finalCta, context = {}) => {
  const id = getPageId(page);

  if (!finalCta || typeof finalCta !== 'object') {
    errors.push(`${id} finalCta is required for ${page.templateVariant}.`);
    return;
  }

  if (!hasMeaningfulText(finalCta.eyebrow, 4)) {
    errors.push(`${id} finalCta eyebrow must contain meaningful text.`);
  }

  const title = finalCta.title || {};
  const fullTitle = getCtaTitleText(title);
  if (!hasMeaningfulText(fullTitle, 12)) {
    errors.push(`${id} finalCta title must be complete and meaningful.`);
  }
  if (!hasMeaningfulText(title.accent, 3)) {
    errors.push(`${id} finalCta title.accent must contain meaningful text.`);
  }
  if (title.accent && !fullTitle.includes(title.accent)) {
    errors.push(`${id} finalCta accent must be present in the complete visible title.`);
  }

  if (!hasMeaningfulText(finalCta.description, 30)) {
    errors.push(`${id} finalCta description must contain meaningful page-specific text.`);
  }

  validateActionLikeCta(errors, page, finalCta.primaryAction, 'final CTA primary action', context, {
    requireAppDestination: page.conversion?.destinationType === 'app',
    requireInternal: page.conversion?.destinationType !== 'app',
  });

  if (finalCta.secondaryAction) {
    validateActionLikeCta(errors, page, finalCta.secondaryAction, 'final CTA secondary action', context);
    if (
      finalCta.primaryAction?.label &&
      finalCta.secondaryAction?.label &&
      normalizeSeoText(finalCta.primaryAction.label) === normalizeSeoText(finalCta.secondaryAction.label)
    ) {
      errors.push(`${id} finalCta secondary action label must be distinct from the primary action label.`);
    }
  }

  const ctaText = textFrom(finalCta);
  if (hasPlaceholderText(finalCta)) {
    errors.push(`${id} finalCta must not contain placeholder/TODO/TBD copy.`);
  }
  if (RAW_HTML_PATTERN.test(ctaText)) {
    errors.push(`${id} finalCta page data must not contain raw HTML or JSX.`);
  }
  if (CTA_DRAFT_OUTCOME_PATTERN.test(ctaText)) {
    errors.push(`${id} finalCta must not position the outcome as a draft.`);
  }

  const detectedPlatform = getDetectedPlatform(page);
  if (detectedPlatform && PLATFORM_MENTION_PATTERNS[detectedPlatform]) {
    Object.entries(PLATFORM_MENTION_PATTERNS).forEach(([platform, pattern]) => {
      if (platform !== detectedPlatform && pattern.test(ctaText)) {
        errors.push(`${id} finalCta mentions ${platform} but page platform is ${detectedPlatform}.`);
      }
    });
  }
};

export const getSeoPageCtaErrors = (page, context = {}) => {
  if (!isProductionState(page)) return [];
  const errors = [];
  const ctas = [
    ['primary CTA', page.cta],
    ['secondary CTA', page.secondaryCta],
    ['product workflow CTA', page.productWorkflow?.cta],
  ].filter(([, cta]) => cta);

  if (!page.cta) errors.push(`${getPageId(page)} primary CTA is required.`);
  if (!page.finalCta) errors.push(`${getPageId(page)} final CTA is required.`);

  ctas.forEach(([label, cta]) => {
    validateActionLikeCta(errors, page, cta, label, context);
  });

  return errors;
};

export const getSeoPageInternalLinkErrors = (page, context = {}) => {
  if (!isProductionState(page)) return [];
  const errors = [];
  const id = getPageId(page);
  const links = [];

  asArray(page.relatedSeoPaths).forEach((href) => links.push({ href, label: href, type: 'relatedSeoPaths' }));
  asArray(page.relatedProductToolPaths).forEach((href) => links.push({ href, label: href, type: 'relatedProductToolPaths' }));
  asArray(page.contextualLinks).forEach((link) => links.push({ href: link.href, label: link.label || link.anchor || link.title, type: 'contextualLinks' }));

  const seen = new Set();
  links.forEach((link) => {
    if (!hasMeaningfulText(link.label, 4)) errors.push(`${id} ${link.type} link must have descriptive anchor text for ${link.href}.`);
    if (link.href === page.path) errors.push(`${id} cannot link to itself: ${link.href}.`);
    if (seen.has(link.href)) errors.push(`${id} contains duplicate internal link: ${link.href}.`);
    seen.add(link.href);
    if (!validatesLocaleForPage(page, link.href)) errors.push(`${id} internal link has wrong locale or forbidden /en path: ${link.href}.`);
    if (!targetExists(link.href, context)) errors.push(`${id} internal link target does not exist: ${link.href}.`);
    const targetPage = context.getSeoPageByPath?.(getHrefPath(link.href));
    if (targetPage && !stateAllowsRouting(targetPage)) errors.push(`${id} internal link target is not routable: ${link.href}.`);
    if (targetPage && ['planning_only', 'quarantined_review'].includes(targetPage.state)) errors.push(`${id} internal link cannot target ${targetPage.state}: ${link.href}.`);
  });

  asArray(page.relatedBlogSlugs).forEach((slug) => {
    if (slug === page.slug) errors.push(`${id} relatedBlogSlugs cannot self-link by slug: ${slug}.`);
    if (context.blogSlugExists && !context.blogSlugExists(slug)) errors.push(`${id} relatedBlogSlugs contains missing/unpublished/noindex slug: ${slug}.`);
  });

  if (!links.length && !asArray(page.relatedBlogSlugs).length) {
    errors.push(`${id} must include at least one contextual or related internal/supporting link.`);
  }

  return errors;
};

export const getSeoMetadataReadinessErrors = (page) => {
  if (!isProductionState(page)) return [];
  const errors = [];
  validateTextField(errors, page, 'title', 12);
  validateTextField(errors, page, 'description', 40);
  validateTextField(errors, page, 'h1', 4);
  validateTextField(errors, page, 'primaryIntent', 8);

  const titleWords = normalizeSeoText(page.title).split(' ').filter(Boolean);
  const repeatedTitleWords = titleWords.filter((word, index) => titleWords.indexOf(word) !== index);
  if (repeatedTitleWords.length >= 3) {
    errors.push(`${getPageId(page)} title appears keyword-stuffed.`);
  }

  return errors;
};

const getProductionComparablePages = (pages) => pages.filter(isProductionState);

const getComparableText = (page) => normalizeSeoText([
  page.title,
  page.description,
  page.h1,
  page.heroSubtitle,
  page.primaryIntent,
  page.sections,
  page.examples,
  page.benefits,
  page.workflow,
  page.useCases,
  page.templates,
  page.prompts,
  page.productWorkflow,
  page.faq,
]);

const getPlatformNeutralText = (page) => normalizeSeoText([
  page.title,
  page.description,
  page.h1,
  page.heroSubtitle,
  page.primaryIntent,
  page.sections,
  page.examples,
  page.benefits,
  page.workflow,
  page.useCases,
  page.templates,
  page.prompts,
  page.productWorkflow,
  page.faq,
], { neutralizePlatforms: true });

const getFieldDuplicateErrors = (pages, field) => {
  const errors = [];
  const seen = new Map();
  getProductionComparablePages(pages).forEach((page) => {
    const normalized = normalizeSeoText(page[field]);
    if (!normalized) return;
    if (seen.has(normalized)) {
      errors.push(`${getPageId(page)} duplicates ${field} with ${seen.get(normalized)}.`);
    } else {
      seen.set(normalized, getPageId(page));
    }
  });
  return errors;
};

export const getSeoContentUniquenessErrors = (pages) => {
  const errors = [
    ...getFieldDuplicateErrors(pages, 'title'),
    ...getFieldDuplicateErrors(pages, 'description'),
    ...getFieldDuplicateErrors(pages, 'h1'),
    ...getFieldDuplicateErrors(pages, 'primaryIntent'),
  ];

  const faqSets = new Map();
  const exampleSets = new Map();
  const sectionTexts = new Map();
  const fullTexts = new Map();
  const platformNeutralTexts = new Map();

  getProductionComparablePages(pages).forEach((page) => {
    const pairs = [
      [faqSets, normalizeSeoText(page.faq), 'FAQ set'],
      [exampleSets, normalizeSeoText(page.examples), 'examples'],
      [sectionTexts, normalizeSeoText(page.sections), 'section content'],
      [fullTexts, getComparableText(page), 'full normalized content'],
      [platformNeutralTexts, getPlatformNeutralText(page), 'platform-neutral content'],
    ];

    pairs.forEach(([map, value, label]) => {
      if (!value) return;
      if (map.has(value)) {
        errors.push(`${getPageId(page)} duplicates ${label} with ${map.get(value)}.`);
      } else {
        map.set(value, getPageId(page));
      }
    });
  });

  return errors;
};

export const getSeoContentReadinessErrors = (pages, context = {}) => (
  pages.flatMap((page) => getSeoPageProductionReadinessErrors(page, context))
    .concat(getSeoContentUniquenessErrors(pages))
);

export const getSeoContentReadinessSummary = (pages) => ({
  pagesChecked: pages.length,
  productionPagesChecked: getProductionComparablePages(pages).length,
  productionStates: PRODUCTION_READY_STATES,
  humanReviewFlags: HUMAN_REVIEW_FLAGS,
  approvedSectionIds: getAllTemplateSectionIds(),
});
