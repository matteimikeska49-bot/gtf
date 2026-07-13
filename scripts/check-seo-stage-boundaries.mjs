import { execFileSync } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';
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
const fixtureOnly = args.includes('--fixture-only');

const context = {
  componentPathExists: (filePath) => existsSync(path.join(process.cwd(), filePath)),
  assetExists: (assetPath) => (
    typeof assetPath === 'string' &&
    assetPath.startsWith('/') &&
    existsSync(path.join(process.cwd(), 'public', assetPath.replace(/^\//u, '')))
  ),
};

const changedPathsFromStatus = () => {
  const output = execFileSync('git', ['status', '--short', '--untracked-files=all'], { encoding: 'utf8' });
  return output
    .split('\n')
    .map((line) => line.trimEnd())
    .filter(Boolean)
    .map((line) => {
      const rawPath = line.slice(3).trim();
      if (rawPath.includes(' -> ')) return rawPath.split(' -> ').pop();
      return rawPath;
    });
};

const fixtures = [];

const addFixture = (name, expected, getErrors) => {
  fixtures.push({ name, expected, getErrors });
};

addFixture('Gemini changes only handoff passes', 'pass', () => (
  validateStageDiff({
    stage: 'gemini_content_design',
    changedPaths: ['src/content/seoPages/handoffs/seamlessInstagramCarouselHandoff.js'],
  })
));

addFixture('Gemini changing runtime fails', 'fail', () => (
  validateStageDiff({
    stage: 'gemini_content_design',
    changedPaths: ['src/content/seoPages/index.js'],
  })
));

addFixture('Incomplete handoff blocks draft preview integration', 'fail', () => (
  validateStageHandoff({
    stage: 'codex_draft_preview_integration',
    handoff: seamlessInstagramCarouselHandoff,
    context,
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
    context,
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
    context,
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
    context,
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
    context,
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
    context,
  })
));

addFixture('Production integration with owner approval true passes', 'pass', () => (
  validateStageHandoff({
    stage: 'codex_production_integration',
    handoff: buildCompleteHandoffFromBlueprint(),
    context,
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
  const changedPaths = changedPathsFromStatus();
  errors.push(...validateStageDiff({ stage, changedPaths }));
  errors.push(...validateStageHandoff({
    stage,
    handoff: seamlessInstagramCarouselHandoff,
    context,
  }));
}

errors.push(...fixtureFailures);

console.log('SEO stage boundary check');
console.log(`- stage: ${stage}`);
if (stage !== normalizedStage) console.log(`- normalized stage: ${normalizedStage}`);
console.log(`- fixture-only: ${fixtureOnly}`);
console.log(`- fixtures tested: ${fixtures.length}`);
console.log(`- fixtures passed: ${fixturePasses}`);
if (!fixtureOnly) console.log(`- current changed paths checked: ${changedPathsFromStatus().length}`);

if (errors.length > 0) {
  console.error('\nSEO stage boundary check failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('SEO stage boundary check passed.');
