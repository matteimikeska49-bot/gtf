import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { assessMaintenanceReview } from '../lib/maintenance-review.mjs';

const hash = text => crypto.createHash('sha256').update(text).digest('hex');
function fixture() {
  const source = 'src/content/blog/articles/article.md';
  const files = { [source]: 'article', 'dist/blog/article/index.html': '<article>useful</article>', 'checker.mjs': 'strict',
    'scripts/check-blog-content-template.mjs': 'strict', 'scripts/check-blog-frontmatter-contract.mjs': 'strict', 'eslint.config.js': 'strict' };
  const finding = { source, rule: 'floor', message: '5000 / 8000', metric: { value: 5000, minimum: 8000 },
    before: { metric: { value: 4000, minimum: 8000 } }, blocking: true,
    classification: 'IMPROVED_LEGACY_STILL_BLOCKING', sourceAfterSha256: hash(files[source]), ruleAfterSha256: hash('strict') };
  const row = { source, route: '/blog/article', sourceSha256: hash(files[source]), render: 'dist/blog/article/index.html', renderSha256: hash(files['dist/blog/article/index.html']) };
  return { files, scope: { base: 'base', head: 'head', articles: ['article'] },
    diagnostic: { base: 'base', head: 'head', articles: ['article'], checks: [
      { kind: 'content', complete: true, sameEditorialRules: true, checkerAfterSha256: hash('strict'), afterStatus: 1, findings: [structuredClone(finding)] },
      ...['frontmatter', 'lint'].map(kind => ({ kind, complete: true, sameEditorialRules: true, checkerAfterSha256: hash('strict'), afterStatus: 0, findings: [] }))] },
    decisions: { base: 'base', checkerHashes: { 'checker.mjs': hash('strict') }, articles: [row], legacyLint: [] },
    evidence: { base: 'base', articles: [row], findings: [{ kind: 'content', findings: [finding] }] },
    read: file => files[file] };
}

test('exact improved legacy produces an individual HUMAN hold, never publication PASS', () => {
  const result = assessMaintenanceReview(fixture());
  assert.deepEqual(result.errors, []);
  assert.equal(result.publication, 'BLOCKED_PENDING_HUMAN_AND_EXTERNAL_GATES');
  assert.equal(result.holds[0].blocking, true);
  assert.equal(result.articles[0].humanDecision, 'PENDING_NOT_APPROVED');
});

test('new duplicate, worse floor and missing baseline cannot become legacy holds', () => {
  for (const change of [f => f.diagnostic.checks[0].findings.push(structuredClone(f.diagnostic.checks[0].findings[0])),
    f => { f.diagnostic.checks[0].findings[0].metric.value = 3000; },
    f => { f.evidence.findings = []; }]) {
    const f = fixture(); change(f);
    assert.ok(assessMaintenanceReview(f).errors.some(error => error.startsWith('NEW_WORSE_OR_UNRESOLVED')));
  }
});

test('source/checker drift, foreign scope, stale head and unparsed failures fail closed', () => {
  for (const change of [f => { f.files['checker.mjs'] = 'lower floor'; },
    f => { f.files['src/content/blog/articles/article.md'] = 'changed'; },
    f => f.scope.articles.push('new-article'), f => { f.diagnostic.head = 'stale'; },
    f => { delete f.files['dist/blog/article/index.html']; },
    f => { f.diagnostic.checks[1].afterStatus = 1; }]) {
    const f = fixture(); change(f);
    assert.ok(assessMaintenanceReview(f).errors.length > 0);
  }
});

test('lint requires exact unchanged source/line and consumes each historical occurrence', () => {
  const f = fixture();
  f.files['component.jsx'] = 'existing hook';
  const lint = { source: 'component.jsx', rule: 'hooks', message: 'existing error', lineText: 'existing hook',
    sourceAfterSha256: hash('existing hook'), sourceBeforeSha256: hash('existing hook'),
    ruleAfterSha256: hash('strict'),
    before: { lineText: 'existing hook' }, blocking: true };
  f.decisions.legacyLint = [{ source: lint.source, rule: lint.rule, messageSha256: hash(lint.message), sourceSha256: hash('existing hook') }];
  f.evidence.findings.push({ kind: 'lint', findings: [lint] });
  f.diagnostic.checks[2].afterStatus = 1;
  f.diagnostic.checks[2].findings = [structuredClone(lint)];
  assert.deepEqual(assessMaintenanceReview(f).errors, []);
  f.diagnostic.checks[2].findings.push(structuredClone(lint));
  assert.ok(assessMaintenanceReview(f).errors.some(error => error.startsWith('LINT_REGRESSION')));
});
