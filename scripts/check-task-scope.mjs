import path from 'path';
import { execFileSync } from 'child_process';

const ROOT = process.cwd();

function runGit(args) {
  return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' });
}

function normalizeFile(file) {
  const absolute = path.resolve(ROOT, file);
  const relative = path.relative(ROOT, absolute).split(path.sep).join('/');
  if (!relative || relative === '..' || relative.startsWith('../')) {
    throw new Error(`Allowed path must stay inside the repository: ${file}`);
  }
  return relative;
}

const args = process.argv.slice(2);
const changedOnly = args.includes('--changed-only');
const allowedArgs = args.filter((arg) => arg !== '--changed-only');
if (allowedArgs.length === 0 && !changedOnly) {
  console.error('Usage: node scripts/check-task-scope.mjs <allowed-file> [allowed-file ...]');
  process.exit(1);
}

let allowed;
try {
  allowed = new Set(allowedArgs.map(normalizeFile));
} catch (error) {
  console.error(`Scope configuration error: ${error.message}`);
  process.exit(1);
}

const trackedChanged = runGit(['diff', '--name-only', '--diff-filter=ACDMRTUXB', 'HEAD', '--'])
  .split('\n')
  .map((file) => file.trim())
  .filter(Boolean);
const untracked = runGit(['ls-files', '--others', '--exclude-standard'])
  .split('\n')
  .map((file) => file.trim())
  .filter(Boolean);

const forbiddenTracked = trackedChanged.filter((file) =>
  file.startsWith('dist/')
  || file.startsWith('scratch/')
  || /(?:^|\/)sitemap(?:-index)?\.xml$/i.test(file)
  || /(?:^|\/)(?:temp|tmp)[^/]*$/i.test(file)
  || /\.zip$/i.test(file)
);
const outsideScope = changedOnly ? [] : trackedChanged.filter((file) => !allowed.has(file));
const allowedUntracked = untracked.filter((file) => allowed.has(file));
const otherUntracked = untracked.filter((file) => !allowed.has(file));

console.log('\nTask Scope Check');
console.log(`- Mode: ${changedOnly ? 'changed files safety' : 'explicit allowlist'}`);
console.log(`- Allowed files: ${allowed.size}`);
console.log(`- Changed tracked files: ${trackedChanged.length}`);
console.log(`- Allowed untracked files: ${allowedUntracked.length}`);
console.log(`- Other untracked files (warning only): ${otherUntracked.length}`);

if (trackedChanged.length > 0) {
  console.log('\nChanged tracked files:');
  trackedChanged.forEach((file) => console.log(`  - ${file}`));
}

if (allowedUntracked.length > 0) {
  console.log('\nAllowed untracked files:');
  allowedUntracked.forEach((file) => console.log(`  - ${file}`));
}

if (otherUntracked.length > 0) {
  console.log('\nWarning: untracked files outside task scope were left untouched:');
  otherUntracked.slice(0, 20).forEach((file) => console.log(`  - ${file}`));
  if (otherUntracked.length > 20) {
    console.log(`  ...and ${otherUntracked.length - 20} more`);
  }
}

if (forbiddenTracked.length > 0) {
  console.error('\nFAIL: generated, temporary, archive, or sitemap files entered the tracked diff:');
  forbiddenTracked.forEach((file) => console.error(`  - ${file}`));
}

if (outsideScope.length > 0) {
  console.error('\nFAIL: changed tracked files outside the declared task scope:');
  outsideScope.forEach((file) => console.error(`  - ${file}`));
}

if (forbiddenTracked.length > 0 || outsideScope.length > 0) {
  process.exit(1);
}

console.log(changedOnly
  ? '\nPASS: tracked diff contains no generated or forbidden files.'
  : '\nPASS: tracked diff is limited to the declared task scope.');
