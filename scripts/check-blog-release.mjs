import { spawnSync } from 'child_process';
import fs from 'node:fs';
import { resolveReleaseScope } from './lib/release-scope.mjs';
import { assessMaintenanceReview } from './lib/maintenance-review.mjs';

const ROOT = process.cwd();
const legacyOnly = process.argv.includes('--legacy-debt');
const maintenanceIndex = process.argv.indexOf('--maintenance-review');
const maintenanceBase = maintenanceIndex < 0 ? null : process.argv[maintenanceIndex + 1];
if (maintenanceIndex >= 0 && (!maintenanceBase || maintenanceBase.startsWith('--'))) throw new Error('--maintenance-review requires a clean base worktree.');

const baseIndex = process.argv.indexOf('--base-ref');
if (baseIndex !== -1 && !process.argv[baseIndex + 1]) throw new Error('--base-ref requires a Git ref.');
const scope = resolveReleaseScope(ROOT, baseIndex === -1 ? undefined : process.argv[baseIndex + 1]);
const changedPaths = scope.paths;
const changedArticles = scope.articles;

const childEnv = {
  ...process.env,
  BLOG_RELEASE_MODE: '1',
  BLOG_RELEASE_BASE_REF: scope.base,
  BLOG_RELEASE_ARTICLE_SLUGS: changedArticles.join(','),
  BLOG_RELEASE_CHANGED_PATHS: changedPaths.join(',')
};

let maintenance;
if (maintenanceBase) {
  const result = spawnSync('node', ['scripts/check-maintenance-review.mjs', maintenanceBase], { cwd: ROOT, env: childEnv, stdio: 'inherit' });
  if (result.status !== 0) process.exit(1);
  maintenance = JSON.parse(fs.readFileSync('tmp/maintenance-review.json', 'utf8'));
}
const heldCommands = new Set(['check:blog:frontmatter-contract', 'check:blog:content-template']);
const heldScripts = new Set(['scripts/check-blog-frontmatter-contract.mjs', 'scripts/check-blog-content-template.mjs']);

function run(label, command, args, { blocking = true } = {}) {
  console.log(`\n${'='.repeat(68)}\n${label}\n${'='.repeat(68)}`);
  const result = spawnSync(command, args, {
    cwd: ROOT,
    env: childEnv,
    encoding: 'utf8',
    stdio: 'inherit'
  });
  const passed = result.status === 0;
  const held = !passed && !!maintenance && (label === 'Lint'
    || (command === 'npm' && args[0] === 'run' && heldCommands.has(args[1]))
    || (command === 'node' && heldScripts.has(args[0])));
  console.log(`${passed ? 'PASS' : held ? 'EXACT LEGACY HOLD (NOT PASS)' : blocking ? 'FAIL' : 'LEGACY DEBT'}: ${label}`);
  return { label, passed, blocking, held };
}

const packageScripts = JSON.parse(fs.readFileSync('package.json', 'utf8')).scripts;
function group(label, script) {
  // These diagnostic groups must not hide later failures behind shell &&.
  const commands = packageScripts[script].split(' && ');
  const results = commands.map((command) => {
    const match = command.match(/^npm run ([a-z0-9:-]+)$/);
    if (!match) {
      const nodeScript = command.match(/^node (scripts\/[a-z0-9-]+\.mjs)$/);
      if (!nodeScript) throw new Error(`Unsupported source check group command: ${command}`);
      return run(`${label}: ${nodeScript[1]}`, 'node', [nodeScript[1]]);
    }
    return packageScripts[match[1]].includes(' && ')
      ? group(`${label}: ${match[1]}`, match[1])
      : run(`${label}: ${match[1]}`, 'npm', ['run', match[1]]);
  });
  return { label, passed: results.every((result) => result.passed),
    held: results.some(result => result.held) && results.every(result => result.passed || result.held), blocking: true };
}

const legacyStages = [
  ['Legacy SEO meta hardening', 'npm', ['run', 'check:blog:seo-meta-hardening']],
  ['Legacy SEO metadata', 'npm', ['run', 'check:blog:seo-meta']],
  ['Legacy anti-cannibalization baseline', 'npm', ['run', 'check:blog:cannibalization']],
  ['Legacy batch workflow baseline', 'npm', ['run', 'check:blog:batch-workflow']]
];

if (legacyOnly) {
  const results = legacyStages.map(([label, command, args]) => run(label, command, args));
  process.exit(results.some((result) => !result.passed) ? 1 : 0);
}

console.log('\nCanonical SEO Release Gate');
console.log(`- Changed paths: ${changedPaths.length}`);
console.log(`- Current article scope: ${changedArticles.length > 0 ? changedArticles.join(', ') : '(no changed articles; system-only release)'}`);
console.log(`- Scope source: ${scope.base} → ${scope.head} + index/working tree/untracked files`);

const stages = [
  run('Topic and demand research', 'npm', ['run', 'check:blog:topics']),
  run('Intent ownership', 'npm', ['run', 'check:blog:intent-ownership']),
  run('Current-scope anti-cannibalization', 'npm', ['run', 'check:blog:cannibalization']),
  run('Current-scope batch workflow', 'npm', ['run', 'check:blog:batch-workflow']),
  group('Fast source safety checks', 'check:blog:fast'),
  group('Content and template checks', 'check:blog:content'),
  run('Lint', 'npm', ['run', 'lint']),
  run('Schema source hardening', 'npm', ['run', 'check:blog:schema-hardening'])
];

const legacyResults = legacyStages.slice(0, 2).map(([label, command, args]) =>
  run(label, command, args, { blocking: false })
);

// Maintenance validates the already prepared dist, then the mandatory scope
// stage independently builds/prerenders the entire project and proves byte
// parity. This avoids two equivalent builds; there is no skip-build override.
const buildStage = run(maintenance ? 'Prepared rendered HTML and sitemap (independent build required next)'
  : 'Build, prerender, rendered HTML, and sitemap', 'npm', ['run', maintenance ? 'check:blog:render-only' : 'check:blog:build-render']);
stages.push(buildStage);
// Evaluate the final artifacts, not the obsolete pre-build dist. No boolean
// waiver: this invokes an independent production build and compares artifacts.
stages.push(buildStage.passed ? run('Task scope and reproducible production artifacts', 'node', [
  'scripts/check-task-scope.mjs', '--changed-only', '--production-artifacts',
]) : { label: 'Task scope and reproducible production artifacts (blocked by failed build)', passed: false, blocking: true });

if (maintenance) {
  maintenance = assessMaintenanceReview({ scope: resolveReleaseScope(ROOT, scope.base),
    decisions: JSON.parse(fs.readFileSync('docs/maintenance/2026-10-11-pr19-maintenance-decisions.json', 'utf8')),
    evidence: JSON.parse(fs.readFileSync('docs/maintenance/2026-10-10-pr19-final-test-receipt.json', 'utf8')),
    diagnostic: JSON.parse(fs.readFileSync('tmp/release-findings.json', 'utf8')),
    read: file => fs.readFileSync(file) });
  stages.push({ label: 'Final exact maintenance source/rule binding', passed: maintenance.errors.length === 0, blocking: true });
  maintenance.stages = stages;
  fs.writeFileSync('tmp/maintenance-review.json', JSON.stringify(maintenance, null, 2) + '\n');
}
const blockingFailures = stages.filter((stage) => stage.blocking && !stage.passed && !stage.held);
const legacyFailures = legacyResults.filter((stage) => !stage.passed);

console.log(`\n${'='.repeat(68)}\nSEO RELEASE REPORT\n${'='.repeat(68)}`);
console.log(`Current article scope: ${changedArticles.length}`);
console.log(`Stages PASS: ${stages.filter(stage => stage.passed).length}/${stages.length}; exact legacy HOLD: ${stages.filter(stage => stage.held).length}; new/unresolved blocking failures: ${blockingFailures.length}`);
console.log(`Legacy debt diagnostics failing: ${legacyFailures.length}/${legacyResults.length}`);
console.log('Manual QA still required: search-intent satisfaction, factual accuracy, paragraph novelty, useful examples, and visual relevance.');

if (blockingFailures.length > 0) {
  console.error('\nRELEASE BLOCKED:');
  blockingFailures.forEach((stage) => console.error(`- ${stage.label}`));
  process.exit(1);
}

if (legacyFailures.length > 0) {
  console.log('\nKnown legacy debt was reported above and did not originate in the current release scope.');
}

if (maintenance) {
  console.log('\nMAINTENANCE TECHNICAL CHECKS COMPLETE; exact legacy findings remain HOLD, not PASS.');
  console.error('PUBLICATION BLOCKED: genuine artifact-bound HUMAN acceptance and outstanding analytics/performance evidence remain required. No historical records fabricated.');
  process.exit(1);
}

console.log('\nRELEASE PASS: current scope is eligible for commit/push after human QA approval.');
