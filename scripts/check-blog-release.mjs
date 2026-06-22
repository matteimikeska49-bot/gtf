import { execFileSync, spawnSync } from 'child_process';
import path from 'path';

const ROOT = process.cwd();
const ARTICLE_PREFIX = 'src/content/blog/articles/';
const legacyOnly = process.argv.includes('--legacy-debt');

function gitLines(args) {
  try {
    return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' })
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

function getChangedPaths() {
  const working = gitLines(['diff', '--name-only', 'HEAD', '--']);
  const untracked = gitLines(['ls-files', '--others', '--exclude-standard']).filter((file) =>
    file === 'package.json'
    || file.startsWith('docs/')
    || file.startsWith('scripts/')
    || file.startsWith('src/content/blog/')
  );
  return [...new Set([...working, ...untracked])];
}

function articleSlug(file) {
  return path.basename(file, '.md');
}

const changedPaths = getChangedPaths();
const changedArticles = changedPaths
  .filter((file) => file.startsWith(ARTICLE_PREFIX) && file.endsWith('.md'))
  .map(articleSlug)
  .filter((slug) => slug !== '_template' && !slug.startsWith('test-'));

const childEnv = {
  ...process.env,
  BLOG_RELEASE_MODE: '1',
  BLOG_RELEASE_ARTICLE_SLUGS: changedArticles.join(','),
  BLOG_RELEASE_CHANGED_PATHS: changedPaths.join(',')
};

function run(label, command, args, { blocking = true } = {}) {
  console.log(`\n${'='.repeat(68)}\n${label}\n${'='.repeat(68)}`);
  const result = spawnSync(command, args, {
    cwd: ROOT,
    env: childEnv,
    encoding: 'utf8',
    stdio: 'inherit'
  });
  const passed = result.status === 0;
  console.log(`${passed ? 'PASS' : blocking ? 'FAIL' : 'LEGACY DEBT'}: ${label}`);
  return { label, passed, blocking };
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
console.log('- Scope source: tracked diff plus untracked article files');

const stages = [
  run('Task scope safety', 'node', ['scripts/check-task-scope.mjs', '--changed-only']),
  run('Topic and demand research', 'npm', ['run', 'check:blog:topics']),
  run('Intent ownership', 'npm', ['run', 'check:blog:intent-ownership']),
  run('Current-scope anti-cannibalization', 'npm', ['run', 'check:blog:cannibalization']),
  run('Current-scope batch workflow', 'npm', ['run', 'check:blog:batch-workflow']),
  run('Fast source safety checks', 'npm', ['run', 'check:blog:fast']),
  run('Content and template checks', 'npm', ['run', 'check:blog:content']),
  run('Schema source hardening', 'npm', ['run', 'check:blog:schema-hardening'])
];

const legacyResults = legacyStages.slice(0, 2).map(([label, command, args]) =>
  run(label, command, args, { blocking: false })
);

stages.push(run('Build, prerender, rendered HTML, and sitemap', 'npm', ['run', 'check:blog:build-render']));

const blockingFailures = stages.filter((stage) => stage.blocking && !stage.passed);
const legacyFailures = legacyResults.filter((stage) => !stage.passed);

console.log(`\n${'='.repeat(68)}\nSEO RELEASE REPORT\n${'='.repeat(68)}`);
console.log(`Current article scope: ${changedArticles.length}`);
console.log(`Blocking stages passed: ${stages.length - blockingFailures.length}/${stages.length}`);
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

console.log('\nRELEASE PASS: current scope is eligible for commit/push after human QA approval.');
