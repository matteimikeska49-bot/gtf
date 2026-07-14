import { execFileSync } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';
import { getSeoPageByPath } from '../src/content/seoPages/index.js';
import seamlessInstagramCarouselHandoff from '../src/content/seoPages/handoffs/seamlessInstagramCarouselHandoff.js';
import {
  SEO_PRODUCTION_STAGES,
  buildCompleteHandoffFromBlueprint,
  normalizeStage,
  validateStageDiff,
  validateStageHandoff,
} from '../src/content/seoPages/handoffs/stageContract.js';

const args = process.argv.slice(2);

const readArg = (name, fallback = '') => {
  const prefix = `${name}=`;
  const inline = args.find((arg) => arg.startsWith(prefix));
  if (inline) return inline.slice(prefix.length);
  const index = args.indexOf(name);
  if (index >= 0) return args[index + 1] || fallback;
  return fallback;
};

const stage = readArg('--stage', 'gemini_content_design');
const normalizedStage = normalizeStage(stage);
const base = readArg('--base', '');
const fixtureOnly = args.includes('--fixture-only');

const context = {
  componentPathExists: (filePath) => existsSync(path.join(process.cwd(), filePath)),
  assetExists: (assetPath) => (
    typeof assetPath === 'string' &&
    assetPath.startsWith('/') &&
    existsSync(path.join(process.cwd(), 'public', assetPath.replace(/^\//u, '')))
  ),
};

const stageRuntimePage = getSeoPageByPath(seamlessInstagramCarouselHandoff.route);

const fixtureRuntimePage = {
  id: 'fixture-runtime-product-proof',
  path: '/ru/use-cases/fixture-complete-handoff',
  templateVariant: 'template_page',
  templateSections: ['hero', 'quickAnswer', 'templateCategories', 'templateChoiceGuide', 'productWorkflow', 'readyCarouselShowcase', 'faq', 'related', 'finalCta'],
  productWorkflow: {
    preset: 'carousel_creation',
    mockups: [
      { id: 'source-structure', title: 'Source', caption: 'Source proof', fallbackVisualType: 'source_structure' },
      { id: 'text-review', title: 'Text', caption: 'Text proof', fallbackVisualType: 'text_review' },
      { id: 'visual-route', title: 'Visual', caption: 'Visual proof', fallbackVisualType: 'ai_template' },
      {
        id: 'editor-result',
        title: 'Result',
        caption: 'Page proof',
        resultCarousel: {
          proofType: 'page-specific',
          images: [
            { src: '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-1.webp', alt: 'Page proof 1' },
            { src: '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-2.webp', alt: 'Page proof 2' },
            { src: '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-3.webp', alt: 'Page proof 3' },
            { src: '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-4.webp', alt: 'Page proof 4' },
            { src: '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-5.webp', alt: 'Page proof 5' },
          ],
        },
      },
    ],
  },
  readyCarouselShowcase: [
    { title: 'Ready 1', image: '/images/niches/ru/content-ru-2.webp' },
    { title: 'Ready 2', image: '/images/niches/ru/content-ru-3.webp' },
    { title: 'Ready 3', image: '/images/niches/ru/content-ru-5.webp' },
    { title: 'Ready 4', image: '/images/niches/ru/content-ru-6.webp' },
    { title: 'Ready 5', image: '/images/niches/ru/content-ru-7.webp' },
  ],
  readyCarouselShowcaseCta: {
    label: 'Create',
    href: 'https://app.gotoflow.io',
  },
};

const gitLines = (argsList) => {
  const output = execFileSync('git', argsList, { encoding: 'utf8' });
  return output
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
};

const unique = (values) => [...new Set(values.filter(Boolean))];

const collectChangedPaths = (baseCommit = '') => {
  const committed = baseCommit ? gitLines(['diff', `${baseCommit}..HEAD`, '--name-only']) : [];
  const staged = gitLines(['diff', '--cached', '--name-only']);
  const unstaged = gitLines(['diff', '--name-only']);
  const untracked = gitLines(['ls-files', '--others', '--exclude-standard']);

  return {
    committed,
    staged,
    unstaged,
    untracked,
    all: unique([...committed, ...staged, ...unstaged, ...untracked]),
  };
};

const fixtures = [];

const addFixture = (name, expected, getErrors) => {
  fixtures.push({ name, expected, getErrors });
};

const incompleteHandoffFixture = {
  ...buildCompleteHandoffFromBlueprint({
    id: 'fixture-incomplete-handoff',
    handoffComplete: false,
    contentDesignStatus: 'content_design_draft',
    draftPreviewIntegrationAllowed: false,
    ownerVisualApprovalReceived: false,
    approvedForProductionIntegration: false,
    approvedForTechnicalIntegration: false,
  }),
};

addFixture('Gemini changes only handoff in working tree passes', 'pass', () => (
  validateStageDiff({
    stage: 'gemini_content_design',
    changedPaths: ['src/content/seoPages/handoffs/seamlessInstagramCarouselHandoff.js'],
  })
));

addFixture('Gemini commit containing only handoff passes', 'pass', () => (
  validateStageDiff({
    stage: 'gemini_content_design',
    changedPaths: ['src/content/seoPages/handoffs/seamlessInstagramCarouselHandoff.js'],
  })
));

addFixture('Gemini commit containing checker fails', 'fail', () => (
  validateStageDiff({
    stage: 'gemini_content_design',
    changedPaths: ['scripts/check-seo-stage-boundaries.mjs'],
  })
));

addFixture('Gemini commit containing registry fails', 'fail', () => (
  validateStageDiff({
    stage: 'gemini_content_design',
    changedPaths: ['src/content/seoPages/index.js'],
  })
));

addFixture('Gemini commit containing templateVariants fails', 'fail', () => (
  validateStageDiff({
    stage: 'gemini_content_design',
    changedPaths: ['src/content/seoPages/templateVariants.js'],
  })
));

addFixture('Gemini commit containing dist fails', 'fail', () => (
  validateStageDiff({
    stage: 'gemini_content_design',
    changedPaths: ['dist/assets/index.js'],
  })
));

addFixture('Committed forbidden change with clean working tree fails', 'fail', () => (
  validateStageDiff({
    stage: 'gemini_content_design',
    changedPaths: ['scripts/check-seo-stage-boundaries.mjs'],
  })
));

addFixture('Staged forbidden file fails', 'fail', () => (
  validateStageDiff({
    stage: 'gemini_content_design',
    changedPaths: ['src/App.jsx'],
  })
));

addFixture('Unstaged forbidden file fails', 'fail', () => (
  validateStageDiff({
    stage: 'gemini_content_design',
    changedPaths: ['src/content/seoPages/templateVariants.js'],
  })
));

addFixture('Untracked forbidden runtime file fails', 'fail', () => (
  validateStageDiff({
    stage: 'gemini_content_design',
    changedPaths: ['src/components/seo/ForbiddenRuntimeDraft.jsx'],
  })
));

addFixture('Incomplete handoff blocks draft preview integration', 'fail', () => (
  validateStageHandoff({
    stage: 'codex_draft_preview_integration',
    handoff: incompleteHandoffFixture,
    context: { ...context, runtimePage: fixtureRuntimePage },
  })
));

addFixture('Complete handoff with owner approval false allows draft preview', 'pass', () => {
  const handoff = buildCompleteHandoffFromBlueprint({
    ownerVisualApprovalReceived: false,
    approvedForProductionIntegration: false,
    approvedForTechnicalIntegration: false,
  });
  return validateStageHandoff({
    stage: 'codex_draft_preview_integration',
    handoff,
    context: { ...context, runtimePage: fixtureRuntimePage },
  });
});

addFixture('Draft preview adding route to sitemap fails', 'fail', () => (
  validateStageHandoff({
    stage: 'codex_draft_preview_integration',
    handoff: buildCompleteHandoffFromBlueprint({
      ownerVisualApprovalReceived: false,
      approvedForProductionIntegration: false,
      sitemapIncluded: true,
    }),
    context: { ...context, runtimePage: fixtureRuntimePage },
  })
));

addFixture('Draft preview setting indexable state fails', 'fail', () => (
  validateStageHandoff({
    stage: 'codex_draft_preview_integration',
    handoff: buildCompleteHandoffFromBlueprint({
      ownerVisualApprovalReceived: false,
      approvedForProductionIntegration: false,
      lifecycleState: 'indexable_approved',
      indexable: true,
      indexationApproved: true,
    }),
    context: { ...context, runtimePage: fixtureRuntimePage },
  })
));

addFixture('Draft preview modifying approved copy fails', 'fail', () => (
  validateStageHandoff({
    stage: 'codex_draft_preview_integration',
    handoff: buildCompleteHandoffFromBlueprint({
      ownerVisualApprovalReceived: false,
      approvedForProductionIntegration: false,
      approvedCopyModified: true,
    }),
    context: { ...context, runtimePage: fixtureRuntimePage },
  })
));

addFixture('Draft preview runtime skipped required product proof module fails', 'fail', () => (
  validateStageHandoff({
    stage: 'codex_draft_preview_integration',
    handoff: buildCompleteHandoffFromBlueprint({
      ownerVisualApprovalReceived: false,
      approvedForProductionIntegration: false,
    }),
    context: {
      ...context,
      runtimePage: {
        ...fixtureRuntimePage,
        readyCarouselShowcase: [],
      },
    },
  })
));

addFixture('Production integration with owner approval false fails', 'fail', () => (
  validateStageHandoff({
    stage: 'codex_production_integration',
    handoff: buildCompleteHandoffFromBlueprint({
      ownerVisualApprovalReceived: false,
      approvedForProductionIntegration: false,
      approvedForTechnicalIntegration: false,
    }),
    context: { ...context, runtimePage: fixtureRuntimePage },
  })
));

addFixture('Production integration with owner approval true passes', 'pass', () => (
  validateStageHandoff({
    stage: 'codex_production_integration',
    handoff: buildCompleteHandoffFromBlueprint(),
    context: { ...context, runtimePage: fixtureRuntimePage },
  })
));

addFixture('Release with productionIntegrationCompleted false fails', 'fail', () => (
  validateStageHandoff({
    stage: 'human_release_review',
    handoff: buildCompleteHandoffFromBlueprint({
      productionIntegrationCompleted: false,
      approvedForRelease: true,
    }),
    context,
  })
));

addFixture('Release with approvedForRelease false fails', 'fail', () => (
  validateStageHandoff({
    stage: 'human_release_review',
    handoff: buildCompleteHandoffFromBlueprint({
      productionIntegrationCompleted: true,
      approvedForRelease: false,
    }),
    context,
  })
));

addFixture('Release after all approvals passes', 'pass', () => (
  validateStageHandoff({
    stage: 'human_release_review',
    handoff: buildCompleteHandoffFromBlueprint({
      ownerReviewStatus: 'approved_for_release',
      productionIntegrationCompleted: true,
      approvedForRelease: true,
    }),
    context,
  })
));

addFixture('Live complete handoff shape does not affect incomplete fixture', 'pass', () => (
  validateStageHandoff({
    stage: 'codex_draft_preview_integration',
    handoff: buildCompleteHandoffFromBlueprint({
      ownerVisualApprovalReceived: false,
      approvedForProductionIntegration: false,
      approvedForTechnicalIntegration: false,
    }),
    context: { ...context, runtimePage: fixtureRuntimePage },
  })
));

addFixture('Complete handoff after clean stage base passes', 'pass', () => {
  const range = collectChangedPaths('');
  return validateStageDiff({
    stage: 'gemini_content_design',
    changedPaths: ['src/content/seoPages/handoffs/seamlessInstagramCarouselHandoff.js', ...range.committed.filter(() => false)],
  });
});

const fixtureFailures = [];
let fixturePasses = 0;

fixtures.forEach((fixture) => {
  const result = fixture.getErrors();
  const passed = fixture.expected === 'pass' ? result.length === 0 : result.length > 0;
  if (passed) {
    fixturePasses += 1;
    return;
  }
  fixtureFailures.push(`${fixture.name} expected ${fixture.expected} but got ${result.length ? `errors: ${result.join('; ')}` : 'no errors'}.`);
});

const errors = [];

if (!SEO_PRODUCTION_STAGES.includes(normalizedStage)) {
  errors.push(`Unknown stage ${stage}. Expected one of: ${SEO_PRODUCTION_STAGES.join(', ')}.`);
}

if (!fixtureOnly && errors.length === 0) {
  const changedPaths = collectChangedPaths(base);
  errors.push(...validateStageDiff({ stage, changedPaths: changedPaths.all }));
  errors.push(...validateStageHandoff({
    stage,
    handoff: seamlessInstagramCarouselHandoff,
    context: { ...context, runtimePage: stageRuntimePage },
  }));
}

errors.push(...fixtureFailures);

console.log('SEO stage boundary check');
console.log(`- stage: ${stage}`);
if (stage !== normalizedStage) console.log(`- normalized stage: ${normalizedStage}`);
if (base) console.log(`- base: ${base}`);
console.log(`- fixture-only: ${fixtureOnly}`);
console.log(`- fixtures tested: ${fixtures.length}`);
console.log(`- fixtures passed: ${fixturePasses}`);
if (!fixtureOnly) {
  const changedPaths = collectChangedPaths(base);
  console.log(`- committed paths checked: ${changedPaths.committed.length}`);
  console.log(`- staged paths checked: ${changedPaths.staged.length}`);
  console.log(`- unstaged paths checked: ${changedPaths.unstaged.length}`);
  console.log(`- untracked paths checked: ${changedPaths.untracked.length}`);
  console.log(`- total unique changed paths checked: ${changedPaths.all.length}`);
}

if (errors.length > 0) {
  console.error('\nSEO stage boundary check failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('SEO stage boundary check passed.');
