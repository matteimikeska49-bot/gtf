import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync, spawnSync } from 'node:child_process';
import { resolveReleaseScope } from './lib/release-scope.mjs';
import { classifyFindings, parseArticleFindings } from './lib/release-findings.mjs';

const root = process.cwd();
const baseline = process.argv[2];
if (!baseline) throw new Error('Usage: node scripts/check-release-findings.mjs <existing-clean-base-worktree>');
const scope = resolveReleaseScope(root);
const git = (cwd, ...args) => execFileSync('git', args, { cwd, encoding: 'utf8' }).trim();
if (git(baseline, 'rev-parse', 'HEAD') !== scope.base) throw new Error('Baseline HEAD does not match release base.');
const dirty = git(baseline, 'diff', '--name-only', 'HEAD', '--').split('\n').filter(Boolean);
if (dirty.some((file) => !file.startsWith('dist/'))) throw new Error('Baseline source is not clean.');
const env = { ...process.env, BLOG_RELEASE_MODE: '1', BLOG_RELEASE_BASE_REF: scope.base,
  BLOG_RELEASE_ARTICLE_SLUGS: scope.articles.join(','), BLOG_RELEASE_CHANGED_PATHS: scope.paths.join(',') };
const hash = (data) => crypto.createHash('sha256').update(data).digest('hex');
const receipt = { base: scope.base, head: scope.head, articles: scope.articles, verdict: 'DIAGNOSTIC_ONLY_NOT_APPROVAL', checks: [] };
for (const [kind, script] of [['content', 'scripts/check-blog-content-template.mjs'], ['frontmatter', 'scripts/check-blog-frontmatter-contract.mjs']]) {
  const run = (cwd) => spawnSync('node', [script], { cwd, env, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
  const previous = run(baseline);
  const current = run(root);
  const beforeOutput = previous.stdout + previous.stderr;
  const afterOutput = current.stdout + current.stderr;
  const before = parseArticleFindings(beforeOutput, kind);
  const after = parseArticleFindings(afterOutput, kind);
  // Scope-only checker changes do not alter editorial predicates. Any other
  // checker change is conservatively unresolved, never classified as baseline.
  const baselineChecker = git(root, 'show', `${scope.base}:${script}`);
  const normalizeScope = (text) => text.replace(/process\.env\.BLOG_RELEASE_BASE_REF \|\| 'HEAD'/g, "'HEAD'")
    .replace(/\$\{'HEAD'\}/g, 'HEAD');
  const sameRules = normalizeScope(fs.readFileSync(path.join(root, script), 'utf8').trim()) === baselineChecker;
  const findings = classifyFindings(before, after, sameRules).map((finding) => {
    let beforeSource = null;
    try { beforeSource = execFileSync('git', ['show', `${scope.base}:${finding.source}`], { cwd: root }); } catch { /* New file: no baseline. */ }
    const afterSource = fs.existsSync(path.join(root, finding.source)) ? fs.readFileSync(path.join(root, finding.source)) : null;
    const canonical = afterSource?.toString().match(/^canonical(?:Url)?:\s*["']?([^\s"']+)/m)?.[1];
    return { ...finding, route: canonical ? new URL(canonical).pathname : 'UNRESOLVED',
      sourceBeforeSha256: beforeSource ? hash(beforeSource) : null,
      sourceAfterSha256: afterSource ? hash(afterSource) : null,
      ruleBeforeSha256: hash(baselineChecker), ruleAfterSha256: hash(fs.readFileSync(path.join(root, script))) };
  });
  const declaredCount = (output) => Number(output.match(kind === 'content' ? /^Errors:\s+(\d+)/m : /^❌ Errors \((\d+)\):/m)?.[1] || 0);
  const complete = (previous.status === 0 || before.length > 0) && (current.status === 0 || after.length > 0)
    && before.length === declaredCount(beforeOutput) && after.length === declaredCount(afterOutput);
  receipt.checks.push({ kind, beforeStatus: previous.status, afterStatus: current.status, complete,
    sameEditorialRules: sameRules, beforeOutput, afterOutput, findings });
  console.log(`${kind}: ${before.length} → ${after.length}; same editorial predicates=${sameRules}; ${complete ? 'captured' : 'UNRESOLVED'}`);
  const counts = {};
  for (const item of findings) counts[item.classification] = (counts[item.classification] || 0) + 1;
  console.log(JSON.stringify(counts));
}
const lintRun = (cwd) => spawnSync('npx', ['--no-install', 'eslint', '.', '--format', 'json'], {
  cwd, env, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024,
});
const lintBefore = lintRun(baseline);
const lintAfter = lintRun(root);
const lintIssues = (cwd, output) => JSON.parse(output).flatMap((file) => file.messages.filter((issue) => issue.severity === 2).map((issue) => {
  const source = path.relative(cwd, file.filePath);
  const text = fs.readFileSync(file.filePath, 'utf8');
  const lineText = text.split('\n')[issue.line - 1];
  return { source, rule: issue.ruleId || 'parser', message: issue.message,
    line: issue.line, column: issue.column, lineText, sourceSha256: hash(text) };
}));
const lintFindings = classifyFindings(lintIssues(baseline, lintBefore.stdout), lintIssues(root, lintAfter.stdout)).map((finding) => {
  // Line numbers alone cannot establish equivalence after edits. Compare the
  // exact offending source line; ambiguous/changed locations remain unresolved.
  if (finding.before && finding.blocking && finding.before.lineText !== finding.lineText) {
    finding.classification = 'SOURCE_CHANGED_UNRESOLVED_BLOCKING';
  }
  const relative = finding.source;
  let oldSource = null;
  try { oldSource = execFileSync('git', ['show', `${scope.base}:${relative}`], { cwd: root }); } catch { /* No baseline source. */ }
  finding.sourceBeforeSha256 = oldSource ? hash(oldSource) : null;
  finding.sourceAfterSha256 = fs.existsSync(path.join(root, relative)) ? hash(fs.readFileSync(path.join(root, relative))) : null;
  const oldConfig = execFileSync('git', ['show', `${scope.base}:eslint.config.js`], { cwd: root });
  finding.ruleBeforeSha256 = hash(oldConfig);
  finding.ruleAfterSha256 = hash(fs.readFileSync(path.join(root, 'eslint.config.js')));
  if (finding.ruleBeforeSha256 !== finding.ruleAfterSha256 && finding.blocking) finding.classification = 'RULE_CHANGED_UNRESOLVED_BLOCKING';
  return finding;
});
receipt.checks.push({ kind: 'lint', beforeStatus: lintBefore.status, afterStatus: lintAfter.status,
  complete: true, beforeOutput: lintBefore.stdout, afterOutput: lintAfter.stdout, findings: lintFindings });
console.log(`lint: ${lintFindings.filter((item) => item.blocking).length} current errors; exact rule/message/source-line comparison captured (no waiver).`);
fs.mkdirSync(path.join(root, 'tmp'), { recursive: true });
fs.writeFileSync(path.join(root, 'tmp/release-findings.json'), JSON.stringify(receipt, null, 2) + '\n');
// Returning success means evidence was captured, NOT that findings were waived.
if (receipt.checks.some((check) => !check.complete)) process.exit(1);
