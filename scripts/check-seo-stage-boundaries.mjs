import { execFileSync } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';
import seamlessInstagramCarouselHandoff from '../src/content/seoPages/handoffs/seamlessInstagramCarouselHandoff.js';
import {
  SEO_PRODUCTION_STAGES,
  buildCompleteHandoffFromBlueprint,
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

addFixture('Gemini stage changing templateVariants.js fails', 'fail', () => (
  validateStageDiff({
    stage: 'gemini_content_design',
    changedPaths: ['src/content/seoPages/templateVariants.js'],
  })
));

addFixture('Gemini stage changing runtime registry fails', 'fail', () => (
  validateStageDiff({
    stage: 'gemini_content_design',
    changedPaths: ['src/content/seoPages/index.js'],
  })
));

addFixture('Gemini stage changing App.jsx fails', 'fail', () => (
  validateStageDiff({
    stage: 'gemini_content_design',
    changedPaths: ['src/App.jsx'],
  })
));

addFixture('Gemini stage changing dist fails', 'fail', () => (
  validateStageDiff({
    stage: 'gemini_content_design',
    changedPaths: ['dist/assets/index.js'],
  })
));

addFixture('Gemini stage creating only handoff passes', 'pass', () => (
  validateStageDiff({
    stage: 'gemini_content_design',
    changedPaths: ['src/content/seoPages/handoffs/seamlessInstagramCarouselHandoff.js'],
  })
));

addFixture('Incomplete handoff blocks Codex stage', 'fail', () => (
  validateStageHandoff({
    stage: 'codex_technical_integration',
    handoff: seamlessInstagramCarouselHandoff,
    context,
  })
));

addFixture('Owner approval false blocks Codex stage', 'fail', () => {
  const handoff = buildCompleteHandoffFromBlueprint({
    ownerVisualApprovalReceived: false,
    approvedForTechnicalIntegration: false,
  });
  return validateStageHandoff({
    stage: 'codex_technical_integration',
    handoff,
    context,
  });
});

addFixture('Owner approval true and complete handoff passes Codex stage', 'pass', () => (
  validateStageHandoff({
    stage: 'codex_technical_integration',
    handoff: buildCompleteHandoffFromBlueprint(),
    context,
  })
));

addFixture('Release approval false blocks push/release', 'fail', () => (
  validateStageHandoff({
    stage: 'human_release_review',
    handoff: buildCompleteHandoffFromBlueprint({ approvedForRelease: false }),
    context,
  })
));

addFixture('Release approval true passes human release review', 'pass', () => (
  validateStageHandoff({
    stage: 'human_release_review',
    handoff: buildCompleteHandoffFromBlueprint({
      ownerReviewStatus: 'approved_for_release',
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

if (!SEO_PRODUCTION_STAGES.includes(stage)) {
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
