import { existsSync, readdirSync, readFileSync } from 'fs';
import path from 'path';
import {
  getAllSeoPages,
  validateSeoPages,
} from '../src/content/seoPages/index.js';
import { PROTECTED_SEO_ROUTES } from '../src/content/seoPages/protectedRoutes.js';
import { SEO_CANONICAL_PRODUCT_CAPABILITIES } from '../src/content/seoPages/productTruthRegistry.js';
import { stateAllowsRouting } from '../src/content/seoPages/states.js';
import {
  getSeoContentReadinessErrors,
  getSeoContentReadinessSummary,
  getSeoPageProductionReadinessErrors,
} from '../src/content/seoPages/helpers/contentReadiness.js';
import { getTemplateSectionOrder } from '../src/content/seoPages/templateVariants.js';
import {
  EXACT_SEO_PAGE_BLUEPRINT,
  EXACT_SEO_PAGE_BLUEPRINT_ID,
  SEO_HANDOFF_STATUSES,
  SEO_PRODUCT_PROOF_CONTRACT,
  validateRenderedSeoProductProofDom,
  validateSeoBlueprintCatalog,
  validateSeoPageHandoff,
} from '../src/content/seoPages/blueprints/exactSeoPageBlueprint.js';

const errors = [];
const publicBlogSlugs = new Set(['supporting-blog']);
const protectedPaths = new Set(Object.keys(PROTECTED_SEO_ROUTES));

const blogDir = 'src/content/blog/articles';
if (existsSync(blogDir)) {
  for (const file of readdirSync(blogDir)) {
    if (!file.endsWith('.md') || file.startsWith('_')) continue;
    const source = readFileSync(path.join(blogDir, file), 'utf8');
    const slug = source.match(/^slug:\s*["']?([^"'\n]+)["']?/m)?.[1]?.trim() || file.replace(/\.md$/, '');
    const published = /^published:\s*(true|"true"|'true')\s*$/m.test(source);
    const noindex = /^noindex:\s*(true|"true"|'true')\s*$/m.test(source);
    if (published && !noindex) publicBlogSlugs.add(slug);
  }
}

const buildContext = (pages) => ({
  blogSlugExists: (slug) => publicBlogSlugs.has(slug),
  getSeoPageByPath: (routePath) => pages.find((page) => page.path === routePath) || null,
  assetExists: (assetPath) => (
    typeof assetPath === 'string' &&
    assetPath.startsWith('/') &&
    existsSync(path.join('public', assetPath))
  ),
  internalPathExists: (routePath) => (
    protectedPaths.has(routePath) ||
    pages.some((page) => page.path === routePath && stateAllowsRouting(page))
  ),
  productToolPathExists: (routePath) => protectedPaths.has(routePath),
});

const blueprintContext = {
  componentPathExists: (filePath) => existsSync(path.join(process.cwd(), filePath)),
  assetExists: (assetPath) => (
    typeof assetPath === 'string' &&
    assetPath.startsWith('/') &&
    existsSync(path.join(process.cwd(), 'public', assetPath.replace(/^\//u, '')))
  ),
};

const variantToPageType = {
  commercial_tool: 'commercial',
  platform_page: 'platform',
  template_page: 'template',
  example_page: 'example',
  alternative_page: 'alternative',
  prompt_page: 'prompt',
  use_case_page: 'useCase',
};

const typeRoutePrefix = {
  commercial: '',
  platform: 'platforms',
  template: 'templates',
  example: 'examples',
  alternative: 'alternatives',
  prompt: 'prompts',
  useCase: 'use-cases',
};

const buildPath = (pageType, slug) => {
  const prefix = typeRoutePrefix[pageType];
  return ['/ru', prefix, slug].filter(Boolean).join('/');
};

const item = (title, body) => ({ title, body });

const fixtureFaqItems = (suffix) => Array.from({ length: 12 }, (_, index) => ({
  question: `How should ${suffix} fixture question ${index + 1} be reviewed?`,
  answer: `Review fixture answer ${index + 1} for ${suffix}: verify facts, adapt wording, check product truth, and keep release approval separate from drafting.`,
}));

const fixtureUseCases = (suffix) => [
  'Expert guide',
  'Step-by-step tutorial',
  'Storytelling carousel',
  'Case study',
  'Product presentation',
  'Checklist',
].map((title, index) => item(
  `${title} ${suffix}`,
  `Concrete ${title.toLowerCase()} use case for ${suffix} with audience, goal, source material, and expected GoToFlow output ${index + 1}.`
));

const section = (id, title, body, bullets = []) => ({
  id,
  title,
  body,
  bullets,
});

const baseSectionsForVariant = (variant, slug) => {
  const required = getTemplateSectionOrder(variant);
  const sections = [];

  required.forEach((requirement) => {
    if (['hero', 'examples', 'benefits', 'faq', 'related', 'finalCta'].includes(requirement)) return;
    if ([
      'useCases',
      'platformUseCases',
      'contentFormats',
      'workflow',
      'howToUse',
      'howToCreate',
      'migrationBenefits',
      'promptGroups',
      'howToUsePrompts',
      'templateCategories',
      'comparison',
    ].includes(requirement)) return;

    sections.push(section(
      requirement,
      `${requirement} for ${slug}`,
      `Meaningful ${requirement} explanation for ${slug} with concrete context, audience value, and a clear page-specific detail.`,
      [`Specific ${requirement} item for ${slug}`]
    ));
  });

  return sections;
};

const makeCompletePage = (variant, suffix = variant) => {
  const pageType = variantToPageType[variant];
  const slug = `fixture-${suffix}`;
  const pathValue = buildPath(pageType, slug);
  const templateSections = getTemplateSectionOrder(variant);

  return {
    id: `fixture-${suffix}`,
    language: 'ru',
    pageType,
    slug,
    path: pathValue,
    state: 'noindex_review',
    templateVariant: variant,
    templateSections,
    title: `Полная SEO страница ${suffix} | GoToFlow`,
    description: `Полное описание SEO страницы ${suffix}: конкретный интент, польза для аудитории, формат результата и безопасный переход к GoToFlow.`,
    h1: `Полная SEO страница ${suffix}`,
    heroSubtitle: `Осмысленный hero subtitle для ${suffix}: что пользователь сможет подготовить, для кого это подходит и какой следующий шаг сделать.`,
    primaryIntent: `unique production intent ${suffix}`,
    primaryKeyword: `seo keyword ${suffix}`,
    secondaryKeywords: [`secondary keyword ${suffix}`],
    searchIntent: `production review ${suffix}`,
    priority: 0.5,
    commercialValue: 0.5,
    productBridge: `GoToFlow помогает подготовить структурированный черновик для ${suffix}, сохраняя финальную редактуру и проверку фактов за автором.`,
    cta: {
      label: `Создать черновик ${suffix}`,
      href: 'https://app.gotoflow.io',
      action: 'open_app',
    },
    finalCta: {
      eyebrow: `Final result ${suffix}`,
      title: {
        before: `Create a finished result for `,
        accent: `${suffix}`,
        after: ` in GoToFlow`,
      },
      description: `Use the page-specific flow for ${suffix}, review the structure and copy, then finish the result in GoToFlow.`,
      primaryAction: {
        label: `Open GoToFlow ${suffix}`,
        href: 'https://app.gotoflow.io',
        action: 'open_app',
      },
    },
    conversion: {
      destinationType: 'app',
      destinationUrl: 'https://app.gotoflow.io',
      targetAction: `create_${suffix}`,
      pageEntity: `fixture_${suffix}`,
      appDeepLinkVerified: false,
      appDeepLinkNotes: 'Fixture uses app origin fallback.',
    },
    seoBrief: {
      pageEntity: `fixture_${suffix}`,
      primaryQuery: `seo keyword ${suffix}`,
      primaryIntent: `unique production intent ${suffix}`,
      userJob: `Complete a page-specific task for ${suffix}.`,
      uniqueAngle: `Unique fixture angle for ${suffix}.`,
      audience: `Fixture audience ${suffix}.`,
      contentType: `fixture content ${suffix}`,
      platform: `fixture platform ${suffix}`,
      language: 'ru',
      country: 'RU',
      conversionAction: `create_${suffix}`,
      productRoute: 'https://app.gotoflow.io',
      cannibalizationBoundary: `Fixture boundary for ${suffix}.`,
    },
    faqPolicy: {
      minItems: variant === 'template_page' ? 12 : 1,
      maxItems: 16,
      requireUniqueQuestions: true,
      requireVisibleSchemaParity: true,
    },
    sectionPolicy: Object.fromEntries(templateSections.map((sectionId) => [
      sectionId,
      {
        enabled: true,
        reason: `Required fixture section ${sectionId} for ${suffix}.`,
      },
    ])),
    sections: baseSectionsForVariant(variant, suffix),
    useCases: fixtureUseCases(suffix),
    platformUseCases: [
      item(`Platform use case ${suffix}`, `Platform-specific use case explanation for ${suffix} with a clear channel context.`),
    ],
    contentFormats: [
      item(`Format ${suffix}`, `Useful format explanation for ${suffix} with a concrete output and editing context.`),
    ],
    workflow: [
      item(`Step one ${suffix}`, `Describe the input, audience, and goal before using GoToFlow for ${suffix}.`),
      item(`Step two ${suffix}`, `Review the generated structure, improve the copy, and verify factual details for ${suffix}.`),
    ],
    howToUse: [
      item(`How to use ${suffix}`, `Use the selected template, adapt the copy, and keep the final editorial decision for ${suffix}.`),
    ],
    howToCreate: [
      item(`How to create ${suffix}`, `Start with a clear scenario, create the first draft, and refine the final output for ${suffix}.`),
    ],
    comparison: [
      item(`Comparison side ${suffix}`, `Factual comparison context for ${suffix} without unsupported superiority claims.`),
    ],
    migrationBenefits: [
      item(`Migration benefit ${suffix}`, `Practical migration benefit for ${suffix} with safe product positioning and no fake guarantees.`),
    ],
    templateCategories: [
      item(`Template category ${suffix}`, `Useful category explanation for ${suffix} with an example of when to use it.`),
    ],
    quickAnswer: [
      item(`Quick answer ${suffix}`, `Clear, direct answer for ${suffix}.`),
    ],
    readyCarouselShowcase: [
      ...SEO_PRODUCT_PROOF_CONTRACT.canonicalReadyCarouselShowcase.assetPaths.map((imagePath, index) => ({
        ...item(`Ready carousel showcase ${suffix} ${index + 1}`, `Demonstration of the final product for ${suffix} with a concrete finished carousel visual.`),
        image: imagePath,
        width: 1080,
        height: 1350,
      })),
    ],
    readyCarouselShowcaseCta: {
      label: `Choose structure ${suffix}`,
      href: 'https://app.gotoflow.io',
      action: 'open_app',
      note: `Move from examples into the creation flow for ${suffix}.`,
    },
    promptGroups: [
      item(`Prompt group ${suffix}`, `Prompt group explanation for ${suffix} with actual prompt-like wording and usage context.`),
    ],
    howToUsePrompts: [
      item(`Prompt workflow ${suffix}`, `Choose a prompt, add context, and edit the result before publishing for ${suffix}.`),
    ],
    examples: [
      item(`Example ${suffix}`, `Specific output example for ${suffix} with a clear structure and useful context.`),
    ],
    ...(variant === 'template_page' ? {
      productWorkflow: {
        preset: 'carousel_creation',
        eyebrow: `Workflow ${suffix}`,
        title: {
          before: `Create carousel `,
          accent: `${suffix}`,
          after: ` in GoToFlow`,
        },
        description: `Concrete product workflow explanation for ${suffix} with source material, structure selection, text review, visual route, and complete carousel editing.`,
        stepOverrides: {
          source: item(`Source ${suffix}`, `Add a topic, link, video, audio, PDF, file, or ready scenario before creating ${suffix}.`),
          structure: item(`Structure ${suffix}`, `Choose a carousel structure or let GoToFlow select a relevant scenario for ${suffix}.`),
          textReview: item(`Text review ${suffix}`, `Review and edit the generated slide headings, body text, and CTA logic before visuals for ${suffix}.`),
          visualRoute: item(`Visual route ${suffix}`, `Choose AI visuals or a template-based presentation route for ${suffix}.`),
          editorResult: item(`Editor result ${suffix}`, `Refine text, slide elements, format, background, and CTA to finish the carousel for ${suffix}.`),
        },
        mockups: [
          { id: 'source-structure', title: `Source and structure ${suffix}`, caption: `Source and structure mockup for ${suffix}.`, fallbackVisualType: 'source_structure' },
          { id: 'text-review', title: `Text review ${suffix}`, caption: `Text review mockup for ${suffix}.`, fallbackVisualType: 'text_review' },
          { id: 'visual-route', title: `Visual route ${suffix}`, caption: `AI or template route mockup for ${suffix}.`, fallbackVisualType: 'ai_template' },
          {
            id: 'editor-result',
            title: `Editor result ${suffix}`,
            caption: `Editor and complete carousel mockup for ${suffix}.`,
            fallbackVisualType: 'editor_result',
            resultCarousel: {
              proofType: 'page-specific',
              title: `Page-specific result ${suffix}`,
              label: `Result ${suffix}`,
              slideCount: 5,
              images: [
                { src: '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-1.webp', alt: `Page-specific proof slide 1 ${suffix}` },
                { src: '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-2.webp', alt: `Page-specific proof slide 2 ${suffix}` },
                { src: '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-3.webp', alt: `Page-specific proof slide 3 ${suffix}` },
                { src: '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-4.webp', alt: `Page-specific proof slide 4 ${suffix}` },
                { src: '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-5.webp', alt: `Page-specific proof slide 5 ${suffix}` },
              ],
            },
          },
        ],
        featureChips: [`Source ${suffix}`, `Structure ${suffix}`, `Text review ${suffix}`, `Visual route ${suffix}`],
        cta: {
          label: `Create carousel ${suffix}`,
          href: 'https://app.gotoflow.io',
          action: 'open_app',
          note: `Complete carousel workflow for ${suffix} from source material to edited result.`,
        },
      },
    } : {}),
    ...(variant === 'template_page' ? {
      productCapabilities: {
        eyebrow: `Capabilities ${suffix}`,
        heading: `What GoToFlow supports for ${suffix}`,
        introCopy: `Canonical product capabilities for ${suffix} using the approved GoToFlow product truth registry.`,
        highlightedCapabilities: ['seamlessCarousels', 'formats4511916'],
        groups: SEO_CANONICAL_PRODUCT_CAPABILITIES,
      },
    } : {}),
    ...(variant === 'template_page' ? {
      templateChoiceGuide: {
        eyebrow: `Choice guide ${suffix}`,
        title: {
          before: `Choose template `,
          accent: `for your task`,
          after: ` ${suffix}`,
        },
        description: `Select a template structure based on your publishing goal and audience for ${suffix}.`,
        items: [
          { id: `explain-${suffix}`, task: `Explain complex topic ${suffix}`, template: `Expert breakdown ${suffix}`, structure: `problem → explanation → example → conclusion` },
          { id: `guide-${suffix}`, task: `Give step-by-step value ${suffix}`, template: `Guide or checklist ${suffix}`, structure: `cover → steps or items → summary` },
          { id: `sell-${suffix}`, task: `Sell a service ${suffix}`, template: `AIDA or problem-solution ${suffix}`, structure: `pain → solution → benefits → CTA` },
          { id: `result-${suffix}`, task: `Show a result ${suffix}`, template: `Case study ${suffix}`, structure: `initial situation → process → result → takeaway` },
        ],
      },
    } : {}),
    benefits: [
      item(`Benefit ${suffix}`, `Useful benefit explanation for ${suffix} that avoids fake outcomes and absolute promises.`),
    ],
    faq: fixtureFaqItems(suffix),
    relatedBlogSlugs: ['supporting-blog'],
    relatedSeoPages: [],
    relatedSeoPaths: [],
    relatedProductToolPaths: ['/ru/ai-generator-karuselej'],
    contextualLinks: [],
    breadcrumbs: [
      { label: 'Главная', path: '/ru' },
      { label: `Fixture ${suffix}`, path: pathValue },
    ],
    schemaType: 'WebPage',
    published: true,
    noindex: true,
    sitemapEligible: false,
    approvedByHuman: false,
    routeReviewApproved: true,
    indexationApproved: false,
    indexationApproval: {
      approved: false,
      approvedBy: '',
      approvedAt: '',
      notes: 'Fixture remains noindex_review.',
    },
    review: {
      owner: '',
      contentReviewedAt: '',
      productClaimsReviewedAt: '',
      assetsReviewedAt: '',
      seoReviewedAt: '',
      productVersion: '',
    },
    contentReviewedByHuman: true,
    uniquenessReviewedByHuman: true,
    internalLinksReviewedByHuman: true,
    ctaReviewedByHuman: true,
    productClaimsReviewedByHuman: true,
    designReference: '/ru',
    urlOrigin: 'seo_registry_candidate',
    urlOriginEvidence: ['synthetic fixture'],
    intentOwner: `fixture-${suffix}`,
    routeOwner: `fixture-${suffix}`,
    canonicalOwner: pathValue,
    riskLevel: 'medium',
    manualReviewReason: 'Synthetic noindex_review readiness fixture.',
    createdFromActionMapRowIds: [],
    notes: [],
    lastUpdated: '2026-07-09',
    ownershipDecision: {
      decision: 'safe_new_registry_page',
      reason: 'Synthetic collision-free fixture.',
      existingOwnerStatus: 'No production route; fixture only.',
    },
  };
};

const targetPage = (state, routePath) => ({
  id: `target-${state}`,
  path: routePath,
  state,
  routeReviewApproved: state === 'noindex_review',
  noindex: state !== 'indexable_approved',
  approvedByHuman: state === 'indexable_approved',
  indexationApproved: state === 'indexable_approved',
  sitemapEligible: state === 'indexable_approved',
});

const expectPass = (name, pages, contextPages = pages) => {
  const result = getSeoContentReadinessErrors(pages, buildContext(contextPages));
  const contractErrors = validateSeoPages(pages);
  if (result.length || contractErrors.length) {
    errors.push(`${name} should pass but failed:\n${[...contractErrors, ...result].join('\n')}`);
  }
};

let failingFixturesTested = 0;

const expectFail = (name, pages, contextPages = pages) => {
  failingFixturesTested += 1;
  const result = getSeoContentReadinessErrors(pages, buildContext(contextPages));
  if (!result.length) {
    errors.push(`${name} should fail but passed.`);
  }
};

const clone = (value) => JSON.parse(JSON.stringify(value));

const blueprintCatalogErrors = validateSeoBlueprintCatalog(blueprintContext);
if (blueprintCatalogErrors.length) {
  errors.push(`SEO blueprint catalog failed:\n${blueprintCatalogErrors.join('\n')}`);
}

let blueprintFixturesTested = 0;
let blueprintFixturesPassed = 0;

const blueprintRequiredSections = () => EXACT_SEO_PAGE_BLUEPRINT.sections
  .filter((sectionItem) => EXACT_SEO_PAGE_BLUEPRINT.requiredSections.includes(sectionItem.id));

const approvedCopyForSlot = (sectionItem, slotName) => (
  `Owner reviewed GoToFlow copy with concrete audience, task, result, and action detail.`
);

const approvedVisualForSlot = (sectionItem, slotName) => ({
  type: slotName,
  assetPath: (sectionItem.assetRequirements || [])[0] || `component:${sectionItem.componentName}.${slotName}`,
  caption: `Owner reviewed GoToFlow visual proof.`,
  alt: `Owner reviewed GoToFlow visual proof.`,
});

const buildBlueprintHandoffSection = (sectionItem) => ({
  id: sectionItem.id,
  order: sectionItem.order,
  purpose: sectionItem.purpose,
  componentName: sectionItem.componentName,
  componentPath: sectionItem.componentPath,
  benchmarkRoute: sectionItem.benchmarkRoute,
  copySlots: Object.fromEntries((sectionItem.copySlots || []).map((slotName) => [
    slotName,
    approvedCopyForSlot(sectionItem, slotName),
  ])),
  visualSlots: Object.fromEntries((sectionItem.visualSlots || []).map((slotName) => [
    slotName,
    approvedVisualForSlot(sectionItem, slotName),
  ])),
  requiredProps: sectionItem.acceptedProps,
  ProductTruthClaims: ['GoToFlow helps prepare content that the owner reviews before release.'],
  ownerApprovalStatus: 'approved_for_technical_integration',
});

const makeBlueprintHandoffFixture = (overrides = {}) => ({
  id: 'fixture-exact-blueprint-handoff',
  route: '/ru/templates/fixture-exact-blueprint',
  blueprintId: EXACT_SEO_PAGE_BLUEPRINT_ID,
  benchmarkRoute: EXACT_SEO_PAGE_BLUEPRINT.benchmarkRoute,
  ownerApprovalStatus: 'approved_for_technical_integration',
  codexStageRequested: true,
  releaseRequested: false,
  roleContract: {
    gemini: 'content_design_draft',
    codex: 'technical_review_after_owner_approval',
    humanOwner: SEO_HANDOFF_STATUSES,
  },
  productProofFamily: 'carousel',
  productProofModules: {
    canonicalProductWorkflow: {
      required: true,
      componentName: 'SeoProductWorkflowShowcase',
      componentPath: 'src/components/seo/template-page/SeoProductWorkflowShowcase.jsx',
      dataSource: 'page.productWorkflow',
      copySlots: ['eyebrow', 'heading.before', 'heading.accent', 'heading.after', 'description', 'stepOverrides', 'featureChips', 'cta'],
      visualSlots: ['workflowSteps', 'mockups', 'resultCarousel'],
    },
    canonicalProductCapabilities: {
      required: true,
      componentName: 'SeoPageWorkflow',
      componentPath: 'src/components/seo/SeoPageWorkflow.jsx',
      canonicalDataSource: 'SEO_CANONICAL_PRODUCT_CAPABILITIES',
      dataSource: 'page.productCapabilities',
      groups: SEO_CANONICAL_PRODUCT_CAPABILITIES,
      capabilityIds: SEO_CANONICAL_PRODUCT_CAPABILITIES.flatMap((group) => group.capabilityIds),
      highlightedCapabilities: ['seamlessCarousels', 'formats4511916'],
      introCopy: 'Fixture canonical product capabilities for the exact blueprint.',
    },
    canonicalReadyCarouselShowcase: {
      required: true,
      componentName: 'SeoReadyCarouselShowcase',
      componentPath: 'src/components/seo/template-page/SeoReadyCarouselShowcase.jsx',
      minimumExamples: 6,
      exactExamples: 6,
      examples: SEO_PRODUCT_PROOF_CONTRACT.canonicalReadyCarouselShowcase.assetPaths.map((assetPath, index) => ({
        title: `Ready carousel proof ${index + 1}`,
        assetPath,
      })),
      assetPaths: SEO_PRODUCT_PROOF_CONTRACT.canonicalReadyCarouselShowcase.assetPaths,
      cta: 'Create this carousel',
    },
    pageSpecificVisualProof: {
      required: true,
      type: 'page_specific_result_carousel',
      componentName: 'SeoPageSpecificVisualProof',
      componentPath: 'src/components/seo/template-page/SeoPageSpecificVisualProof.jsx',
      dataSource: 'page.pageSpecificVisualProof',
      assetPaths: [
        '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-1.webp',
        '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-2.webp',
        '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-3.webp',
        '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-4.webp',
        '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-5.webp',
      ],
      acceptanceRules: [
        'Rendered page-specific proof marker exists.',
        'Ready-result showcase marker exists separately.',
        'Local page-specific assets render.',
      ],
    },
  },
  sections: blueprintRequiredSections().map(buildBlueprintHandoffSection),
  ...overrides,
});

const expectBlueprintHandoffPass = (name, handoff) => {
  blueprintFixturesTested += 1;
  const result = validateSeoPageHandoff(handoff, blueprintContext);
  if (result.length) {
    errors.push(`${name} should pass but failed:\n${result.join('\n')}`);
    return;
  }
  blueprintFixturesPassed += 1;
};

const expectBlueprintHandoffFail = (name, handoff) => {
  blueprintFixturesTested += 1;
  const result = validateSeoPageHandoff(handoff, blueprintContext);
  if (!result.length) {
    errors.push(`${name} should fail but passed.`);
    return;
  }
  blueprintFixturesPassed += 1;
};

const mutateBlueprintHandoffSection = (handoff, sectionId, mutate) => {
  const sectionItem = handoff.sections.find((entry) => entry.id === sectionId);
  if (!sectionItem) throw new Error(`Missing blueprint fixture section ${sectionId}`);
  mutate(sectionItem);
  return handoff;
};

expectBlueprintHandoffPass('positive exact blueprint handoff', makeBlueprintHandoffFixture());

{
  const handoff = makeBlueprintHandoffFixture({
    id: 'fixture-post-generator-product-proof-handoff',
    route: '/ru/use-cases/fixture-post-generator',
    productProofFamily: 'content',
    primaryQuery: 'генератор постов fixture',
  });
  handoff.productProofModules.canonicalReadyResultsShowcase = {
    ...handoff.productProofModules.canonicalReadyCarouselShowcase,
    required: true,
    componentName: 'SeoReadyCarouselShowcase',
    componentPath: 'src/components/seo/template-page/SeoReadyCarouselShowcase.jsx',
  };
  delete handoff.productProofModules.canonicalReadyCarouselShowcase;
  expectBlueprintHandoffPass('post generator workflow ready results and proof', handoff);
}

{
  const handoff = makeBlueprintHandoffFixture({ productProofModules: {} });
  expectBlueprintHandoffFail('product proof missing all modules', handoff);
}

{
  const handoff = makeBlueprintHandoffFixture();
  delete handoff.productProofModules.canonicalReadyCarouselShowcase;
  expectBlueprintHandoffFail('carousel page without ready carousel proof', handoff);
}

{
  const handoff = makeBlueprintHandoffFixture();
  handoff.productProofModules.canonicalReadyCarouselShowcase.examples = [];
  handoff.productProofModules.canonicalReadyCarouselShowcase.assetPaths = [];
  expectBlueprintHandoffFail('carousel page only page-specific proof no ready carousels', handoff);
}

{
  const handoff = makeBlueprintHandoffFixture();
  handoff.productProofModules.canonicalReadyCarouselShowcase.examples = handoff.productProofModules.canonicalReadyCarouselShowcase.examples.slice(0, 3);
  handoff.productProofModules.canonicalReadyCarouselShowcase.assetPaths = handoff.productProofModules.canonicalReadyCarouselShowcase.assetPaths.slice(0, 3);
  expectBlueprintHandoffFail('ready carousel showcase with three examples', handoff);
}

{
  const handoff = makeBlueprintHandoffFixture();
  handoff.productProofModules.canonicalReadyCarouselShowcase.examples = Array.from({ length: 5 }, (_, index) => ({
    title: `Placeholder ${index + 1}`,
    assetPath: `/images/placeholder-${index + 1}.webp`,
  }));
  handoff.productProofModules.canonicalReadyCarouselShowcase.assetPaths = handoff.productProofModules.canonicalReadyCarouselShowcase.examples.map((item) => item.assetPath);
  expectBlueprintHandoffFail('ready carousel showcase with five placeholders', handoff);
}

{
  const handoff = makeBlueprintHandoffFixture();
  handoff.productProofModules.canonicalReadyCarouselShowcase.componentPath = 'src/components/seo/template-page/WrongShowcase.jsx';
  expectBlueprintHandoffFail('ready carousel showcase wrong componentPath', handoff);
}

{
  const handoff = makeBlueprintHandoffFixture();
  delete handoff.productProofModules.canonicalProductWorkflow;
  expectBlueprintHandoffFail('workflow proof absent', handoff);
}

{
  const handoff = makeBlueprintHandoffFixture();
  handoff.productProofModules.canonicalProductWorkflow.componentName = 'SeoTextCards';
  handoff.productProofModules.canonicalProductWorkflow.componentPath = 'src/components/seo/SeoPageSection.jsx';
  expectBlueprintHandoffFail('workflow replaced by text cards', handoff);
}

{
  const handoff = makeBlueprintHandoffFixture();
  delete handoff.productProofModules.pageSpecificVisualProof;
  expectBlueprintHandoffFail('page-specific visual proof absent', handoff);
}

{
  const handoff = makeBlueprintHandoffFixture();
  const oneModule = {
    required: true,
    componentName: 'SeoOneProofBlock',
    componentPath: 'src/components/seo/template-page/SeoPageSpecificVisualProof.jsx',
    examples: handoff.productProofModules.canonicalReadyCarouselShowcase.examples,
    assetPaths: handoff.productProofModules.pageSpecificVisualProof.assetPaths,
    cta: 'Create',
    acceptanceRules: ['Marker exists.', 'Assets render.', 'Separate showcase exists.'],
    type: 'page_specific_result_carousel',
    copySlots: ['eyebrow', 'heading.before', 'heading.accent', 'heading.after', 'description', 'stepOverrides', 'featureChips', 'cta'],
    visualSlots: ['workflowSteps', 'mockups', 'resultCarousel'],
  };
  handoff.productProofModules.canonicalProductWorkflow = oneModule;
  handoff.productProofModules.canonicalReadyCarouselShowcase = oneModule;
  handoff.productProofModules.pageSpecificVisualProof = oneModule;
  expectBlueprintHandoffFail('one component declared as workflow ready and proof', handoff);
}

{
  const result = validateRenderedSeoProductProofDom({
    productWorkflowMarkers: 1,
    productCapabilitiesMarkers: 1,
    productCapabilityCards: 7,
    readyResultsShowcaseMarkers: 0,
    readyResultCards: 0,
    readyResultImages: 0,
    readyResultsCtas: 0,
    pageSpecificProofMarkers: 1,
    pageSpecificProofImages: 5,
    workflowSteps: 5,
    useCasesMarkers: 1,
    visibleFaqCount: 12,
    faqSchemaParity: true,
  });
  if (!result.length) errors.push('rendered DOM missing canonical marker should fail but passed.');
  else blueprintFixturesPassed += 1;
  blueprintFixturesTested += 1;
}

{
  const result = validateRenderedSeoProductProofDom({
    productWorkflowMarkers: 1,
    productCapabilitiesMarkers: 1,
    productCapabilityCards: 7,
    readyResultsShowcaseMarkers: 1,
    readyResultCards: 5,
    readyResultImages: 0,
    readyResultsCtas: 1,
    pageSpecificProofMarkers: 1,
    pageSpecificProofImages: 5,
    workflowSteps: 5,
    useCasesMarkers: 1,
    visibleFaqCount: 12,
    faqSchemaParity: true,
  });
  if (!result.length) errors.push('rendered DOM marker but no real images should fail but passed.');
  else blueprintFixturesPassed += 1;
  blueprintFixturesTested += 1;
}

{
  const result = validateRenderedSeoProductProofDom({
    productWorkflowMarkers: 1,
    productCapabilitiesMarkers: 1,
    productCapabilityCards: 7,
    readyResultsShowcaseMarkers: 1,
    readyResultCards: 6,
    readyResultImages: 6,
    readyResultsCtas: 1,
    pageSpecificProofMarkers: 1,
    pageSpecificProofImages: 5,
    workflowSteps: 5,
    useCasesMarkers: 1,
    visibleFaqCount: 12,
    faqSchemaParity: true,
  });
  if (result.length) errors.push(`rendered DOM product proof positive fixture should pass but failed:\n${result.join('\n')}`);
  else blueprintFixturesPassed += 1;
  blueprintFixturesTested += 1;
}

[
  ['forbidden USE_CASE_PAGE visible token', 'USE_CASE_PAGE'],
  ['forbidden COMMERCIAL_TOOL visible token', 'COMMERCIAL_TOOL'],
  ['forbidden SECTION visible token', 'SECTION'],
  ['forbidden readyCarouselShowcase visible token', 'readyCarouselShowcase'],
].forEach(([name, token]) => {
  const handoff = makeBlueprintHandoffFixture();
  mutateBlueprintHandoffSection(handoff, 'hero', (sectionItem) => {
    sectionItem.copySlots.eyebrow = `Owner reviewed copy must not expose ${token}`;
  });
  expectBlueprintHandoffFail(name, handoff);
});

{
  const handoff = makeBlueprintHandoffFixture();
  mutateBlueprintHandoffSection(handoff, 'hero', (sectionItem) => {
    sectionItem.componentPath = 'src/components/seo/template-page/MissingHero.jsx';
  });
  expectBlueprintHandoffFail('blueprint handoff with nonexistent componentPath', handoff);
}

{
  const handoff = makeBlueprintHandoffFixture();
  mutateBlueprintHandoffSection(handoff, 'hero', (sectionItem) => {
    delete sectionItem.visualSlots.heroCarouselImages;
  });
  expectBlueprintHandoffFail('blueprint handoff with required visual absent', handoff);
}

{
  const handoff = makeBlueprintHandoffFixture();
  mutateBlueprintHandoffSection(handoff, 'productWorkflow', (sectionItem) => {
    sectionItem.visualSlots.mockups = {
      type: 'mockups',
      assetPath: 'mockup: not_available',
      caption: 'Owner reviewed workflow visual.',
    };
  });
  expectBlueprintHandoffFail('blueprint handoff with mockup not_available', handoff);
}

{
  const handoff = makeBlueprintHandoffFixture();
  mutateBlueprintHandoffSection(handoff, 'quickAnswer', (sectionItem) => {
    sectionItem.copySlots.body = 'placeholder';
  });
  expectBlueprintHandoffFail('blueprint handoff with placeholder copy', handoff);
}

{
  const handoff = makeBlueprintHandoffFixture();
  mutateBlueprintHandoffSection(handoff, 'readyCarouselShowcase', (sectionItem) => {
    sectionItem.copySlots['item.title'] = '';
    sectionItem.visualSlots['items.image'] = [];
  });
  expectBlueprintHandoffFail('blueprint handoff with empty showcase', handoff);
}

{
  const handoff = makeBlueprintHandoffFixture({
    ownerApprovalStatus: 'human_review',
    codexStageRequested: true,
  });
  expectBlueprintHandoffFail('Codex integration without owner approval', handoff);
}

{
  const handoff = makeBlueprintHandoffFixture({
    ownerApprovalStatus: 'technical_review',
    releaseRequested: true,
  });
  expectBlueprintHandoffFail('release without final owner approval', handoff);
}

const completeFixtures = Object.keys(variantToPageType).map((variant) => makeCompletePage(variant, variant));
completeFixtures.forEach((page) => expectPass(`complete fixture ${page.templateVariant}`, [page]));

const planningFixture = clone(makeCompletePage('commercial_tool', 'planning-incomplete'));
planningFixture.state = 'planning_only';
planningFixture.published = false;
planningFixture.routeReviewApproved = false;
planningFixture.sections = [];
planningFixture.examples = [];
planningFixture.faq = [];
planningFixture.cta = {};
planningFixture.finalCta = null;
expectPass('planning_only incomplete content fixture', [planningFixture]);

const base = makeCompletePage('commercial_tool', 'bad-base');

{
  const page = clone(base);
  page.sections = [{ id: 'problem' }, ...page.sections.filter((entry) => entry.id !== 'problem')];
  expectFail('noindex_review with empty required section object', [page]);
}

{
  const page = clone(base);
  page.examples = [];
  expectFail('noindex_review with empty examples', [page]);
}

{
  const page = clone(base);
  page.faq = [];
  expectFail('noindex_review with empty FAQ', [page]);
}

{
  const page = clone(base);
  page.sections[0].body = 'TODO';
  expectFail('noindex_review with placeholder content', [page]);
}

{
  const page = clone(base);
  page.finalCta = null;
  expectFail('missing final CTA', [page]);
}

{
  const page = clone(base);
  page.finalCta.title = { before: '', accent: '', after: '' };
  expectFail('empty final CTA title', [page]);
}

{
  const page = clone(base);
  page.finalCta.description = '';
  expectFail('empty final CTA description', [page]);
}

{
  const page = clone(base);
  page.finalCta.primaryAction.label = '';
  expectFail('missing final CTA button label', [page]);
}

{
  const page = clone(base);
  page.finalCta.primaryAction.href = '';
  expectFail('empty final CTA href', [page]);
}

{
  const page = clone(base);
  page.finalCta.title.accent = 'TODO';
  expectFail('placeholder final CTA copy', [page]);
}

{
  const page = clone(base);
  page.finalCta.description = 'Создайте черновик результата и проверьте его позже.';
  expectFail('forbidden draft wording in final CTA', [page]);
}

{
  const page = clone(base);
  page.finalCta.secondaryAction = {
    label: page.finalCta.primaryAction.label,
    href: '/ru/generator-karuselej-instagram',
  };
  expectFail('duplicate final CTA secondary action label', [page]);
}

{
  const page = clone(base);
  page.finalCta.secondaryAction = {
    label: `Compare another route ${page.slug}`,
    href: '/ru/generator-karuselej-instagram',
  };
  expectPass('valid final CTA secondary action', [page]);
}

{
  const page = clone(makeCompletePage('template_page', 'separate-showcase-final-cta'));
  expectPass('valid separate showcase CTA and final CTA', [page]);
}

{
  const page = clone(base);
  page.cta.href = '#';
  page.finalCta.primaryAction.href = '#';
  expectFail('CTA href placeholder hash', [page]);
}

{
  const page = clone(base);
  page.cta.href = '/ru/planning-target';
  page.finalCta.primaryAction.href = '/ru/planning-target';
  expectFail('CTA pointing to planning_only target', [page], [page, targetPage('planning_only', '/ru/planning-target')]);
}

{
  const page = clone(base);
  page.relatedSeoPaths = ['/ru/quarantined-target'];
  expectFail('related link pointing to quarantined_review', [page], [page, targetPage('quarantined_review', '/ru/quarantined-target')]);
}

{
  const first = clone(base);
  const second = makeCompletePage('commercial_tool', 'duplicate-title');
  second.title = first.title;
  expectFail('duplicate title', [first, second]);
}

{
  const first = clone(base);
  const second = makeCompletePage('commercial_tool', 'duplicate-h1');
  second.h1 = first.h1;
  expectFail('duplicate H1', [first, second]);
}

{
  const first = clone(base);
  const second = makeCompletePage('commercial_tool', 'duplicate-faq');
  second.faq = clone(first.faq);
  expectFail('duplicate FAQ set', [first, second]);
}

{
  const first = clone(base);
  const second = clone(first);
  second.id = 'fixture-duplicate-full-content';
  second.slug = 'fixture-duplicate-full-content';
  second.path = '/ru/fixture-duplicate-full-content';
  second.routeOwner = second.id;
  second.canonicalOwner = second.path;
  second.breadcrumbs[1].path = second.path;
  expectFail('duplicate full normalized content', [first, second]);
}

{
  const first = makeCompletePage('commercial_tool', 'instagram-platform-only');
  const second = clone(first);
  second.id = 'fixture-telegram-platform-only';
  second.slug = 'fixture-telegram-platform-only';
  second.path = '/ru/fixture-telegram-platform-only';
  second.routeOwner = second.id;
  second.canonicalOwner = second.path;
  second.breadcrumbs[1].path = second.path;
  const replacePlatform = (value) => {
    if (typeof value === 'string') return value.replace(/instagram/giu, 'Telegram');
    if (Array.isArray(value)) return value.map(replacePlatform);
    if (value && typeof value === 'object') {
      return Object.fromEntries(Object.entries(value).map(([key, itemValue]) => [key, replacePlatform(itemValue)]));
    }
    return value;
  };
  const platformPair = [replacePlatform(first), replacePlatform(second)];
  platformPair[0].title = 'Instagram platform content | GoToFlow';
  platformPair[0].h1 = 'Instagram platform content';
  platformPair[0].description = 'Instagram platform content page with the same structure and only a platform term changed.';
  platformPair[0].heroSubtitle = 'Instagram platform content helper with only the platform term changed across the page.';
  platformPair[1].title = 'Telegram platform content | GoToFlow';
  platformPair[1].h1 = 'Telegram platform content';
  platformPair[1].description = 'Telegram platform content page with the same structure and only a platform term changed.';
  platformPair[1].heroSubtitle = 'Telegram platform content helper with only the platform term changed across the page.';
  expectFail('page differing only by platform name', platformPair);
}

{
  const page = clone(base);
  page.uniquenessReviewedByHuman = false;
  expectFail('missing human uniqueness approval', [page]);
}

{
  const page = clone(base);
  page.templateSections = [...page.templateSections].reverse();
  expectFail('wrong required section order', [page]);
}

// --------------------------------------------------
// NEW FIXTURES: OPTIONAL SECTIONS CONTRACT (template_page)
// --------------------------------------------------

{
  // Fixture 1: a template_page without examples passes
  // makeCompletePage('template_page') already excludes 'examples' from templateSections
  const page = clone(makeCompletePage('template_page', 'no-examples'));
  const errors = getSeoPageProductionReadinessErrors(page);
  if (errors.length > 0) {
    console.error(`Unexpected failure for template_page without optional examples:`);
    console.error(errors);
    process.exit(1);
  }
}

{
  const page = clone(makeCompletePage('template_page', 'reference-order'));
  expectPass('template_page reference order with showcase after workflow', [page]);
}

{
  // Fixture 2: a template_page with valid examples passes
  const page = clone(makeCompletePage('template_page', 'with-examples'));
  const categoryIndex = page.templateSections.indexOf('templateCategories');
  // Insert examples after templateCategories
  page.templateSections.splice(categoryIndex + 1, 0, 'examples');
  page.sectionPolicy.examples = {
    enabled: true,
    reason: 'Optional examples section is included for this fixture.',
  };

  const errors = getSeoPageProductionReadinessErrors(page);
  if (errors.length > 0) {
    console.error(`Unexpected failure for template_page with valid optional examples:`);
    console.error(errors);
    process.exit(1);
  }
}

{
  // Fixture 3: a page declaring examples with missing/empty data fails
  const page = clone(makeCompletePage('template_page', 'empty-examples'));
  const categoryIndex = page.templateSections.indexOf('templateCategories');
  page.templateSections.splice(categoryIndex + 1, 0, 'examples');
  page.sectionPolicy.examples = {
    enabled: true,
    reason: 'Optional examples section is included for this fixture.',
  };
  page.examples = []; // empty data
  expectFail('declared examples without data', [page]);
}

{
  // Fixture 4: unknown section names fail
  const page = clone(makeCompletePage('template_page', 'unknown-section'));
  page.templateSections.push('someRandomUnknownSection');
  expectFail('unknown section in templateSections', [page]);
}

{
  // Fixture 5: duplicate section names fail
  const page = clone(makeCompletePage('template_page', 'duplicate-section'));
  page.templateSections.push('hero'); // duplicate hero
  expectFail('duplicate section in templateSections', [page]);
}

{
  const page = clone(makeCompletePage('template_page', 'duplicate-showcase'));
  page.templateSections.push('readyCarouselShowcase');
  expectFail('duplicate readyCarouselShowcase in templateSections', [page]);
}

{
  // Fixture 6: missing required section fails
  const page = clone(makeCompletePage('template_page', 'missing-required'));
  page.templateSections = page.templateSections.filter(s => s !== 'faq');
  expectFail('missing required section in templateSections', [page]);
}

{
  const page = clone(makeCompletePage('template_page', 'old-showcase-order'));
  page.templateSections = [
    'hero',
    'quickAnswer',
    'templateCategories',
    'templateChoiceGuide',
    'productWorkflow',
    'faq',
    'related',
    'readyCarouselShowcase',
    'finalCta',
  ];
  expectFail('old template_page order with showcase after related', [page]);
}

// --------------------------------------------------

{
  const page = clone(makeCompletePage('template_page', 'workflow-no-cta-valid-showcase'));
  page.productWorkflow.cta = null;
  expectPass('productWorkflow without CTA plus valid showcase CTA', [page]);
}

{
  const page = clone(makeCompletePage('template_page', 'workflow-no-cta-no-showcase-cta'));
  page.productWorkflow.cta = null;
  page.readyCarouselShowcaseCta = null;
  expectFail('productWorkflow without CTA and without showcase CTA', [page]);
}

{
  const page = clone(makeCompletePage('template_page', 'workflow-missing-cta'));
  page.productWorkflow.cta.href = '#';
  expectFail('productWorkflow placeholder CTA href', [page]);
}

{
  const page = clone(makeCompletePage('template_page', 'workflow-internal-label'));
  page.productWorkflow.mockups[0].caption = 'ACTIVE MVP token prices should never be public.';
  expectFail('productWorkflow internal product labels', [page]);
}

{
  const page = clone(makeCompletePage('template_page', 'workflow-invalid-carousel-type'));
  page.productWorkflow.carouselTypes = [
    { id: 'seamless', label: 'Seamless carousel', availability: 'roadmap' },
  ];
  expectFail('productWorkflow invalid carousel type availability', [page]);
}

{
  const page = clone(makeCompletePage('template_page', 'workflow-duplicate-carousel-types'));
  page.productWorkflow.carouselTypes = [
    { id: 'ai', label: 'Duplicate type', availability: 'available' },
    { id: 'template', label: 'Duplicate type', availability: 'available' },
  ];
  expectFail('productWorkflow duplicate carousel type labels', [page]);
}

{
  const page = clone(makeCompletePage('template_page', 'workflow-too-many-feature-chips'));
  page.productWorkflow.featureChips = [
    'Input',
    'Types',
    'Structures',
    'Text review',
    'Visual route',
    'Formats',
    'Character',
    'Manual editor',
    'Extra chip',
  ];
  expectFail('productWorkflow too many feature chips', [page]);
}

{
  const page = clone(makeCompletePage('template_page', 'workflow-missing-image'));
  page.productWorkflow.mockups[3].image = '/images/seo-workflow/missing/result.webp';
  page.productWorkflow.mockups[3].alt = 'Missing but informative product workflow image.';
  expectFail('productWorkflow missing image asset', [page]);
}

{
  const page = clone(makeCompletePage('template_page', 'guide-missing'));
  page.templateChoiceGuide = null;
  expectFail('templateChoiceGuide missing', [page]);
}

{
  const page = clone(makeCompletePage('template_page', 'guide-empty-items'));
  page.templateChoiceGuide.items = [];
  expectFail('templateChoiceGuide empty items', [page]);
}

{
  const page = clone(makeCompletePage('template_page', 'guide-duplicate-ids'));
  page.templateChoiceGuide.items[1].id = page.templateChoiceGuide.items[0].id;
  expectFail('templateChoiceGuide duplicate item ids', [page]);
}

{
  const page = clone(makeCompletePage('template_page', 'guide-placeholder-task'));
  page.templateChoiceGuide.items[0].task = 'TODO';
  expectFail('templateChoiceGuide placeholder task', [page]);
}

const registryPages = getAllSeoPages();
const registryErrors = getSeoContentReadinessErrors(registryPages, buildContext(registryPages));
const summary = getSeoContentReadinessSummary(registryPages);

console.log('SEO content readiness check');
console.log(`- registry records checked: ${summary.pagesChecked}`);
console.log(`- production records checked: ${summary.productionPagesChecked}`);
console.log(`- failing fixtures tested: ${failingFixturesTested}`);
console.log(`- passing variant fixtures tested: ${completeFixtures.length}`);
console.log(`- blueprint handoff fixtures tested: ${blueprintFixturesTested}`);
console.log(`- blueprint handoff fixtures passed: ${blueprintFixturesPassed}`);

if (registryErrors.length > 0) {
  errors.push(`Registry content readiness failed:\n${registryErrors.join('\n')}`);
}

if (errors.length > 0) {
  console.error('\nSEO content readiness check failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('SEO content readiness check passed.');
