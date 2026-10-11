import crypto from 'node:crypto';

const sha256 = value => crypto.createHash('sha256').update(value).digest('hex');
const sameSet = (a, b) => JSON.stringify([...a].sort()) === JSON.stringify([...b].sort());

// A bounded review handoff, NOT a waiver, publication approval or alternate floor.
// Existing strict validators remain authoritative for new/future publication.
export function assessMaintenanceReview({ scope, diagnostic, decisions, evidence, read }) {
  const errors = [];
  const holds = [];
  const articles = [];
  const fileHash = file => {
    try { return sha256(read(file)); }
    catch { errors.push(`MISSING_ARTIFACT:${file}`); return null; }
  };
  if (scope.base !== decisions.base || diagnostic.base !== scope.base || evidence.base !== scope.base) errors.push('BASE_MISMATCH');
  if (diagnostic.head !== scope.head) errors.push('DIAGNOSTIC_HEAD_MISMATCH');
  const expected = decisions.articles.map(row => row.source.split('/').at(-1).replace(/\.md$/, ''));
  if (!sameSet(scope.articles, expected) || !sameSet(diagnostic.articles, expected)) errors.push('ARTICLE_SCOPE_MISMATCH');
  if (new Set(expected).size !== expected.length) errors.push('DUPLICATE_ARTICLE_BINDING');
  for (const [file, expectedHash] of Object.entries(decisions.checkerHashes)) {
    if (fileHash(file) !== expectedHash) errors.push(`CHECKER_DRIFT:${file}`);
  }
  for (const row of decisions.articles) {
    if (fileHash(row.source) !== row.sourceSha256) errors.push(`SOURCE_DRIFT:${row.source}`);
    const old = evidence.articles.find(item => item.source === row.source && item.route === row.route);
    if (!old || old.sourceSha256 !== row.sourceSha256) errors.push(`REVIEW_BINDING_MISSING:${row.source}`);
    articles.push({ ...row, renderSha256: fileHash(row.render), humanDecision: 'PENDING_NOT_APPROVED',
      independentAiReview: old?.independentAiSourceReview || 'MISSING',
      previousRenderSha256: row.renderSha256 });
  }
  if (!sameSet(diagnostic.checks.map(check => check.kind), ['content', 'frontmatter', 'lint'])) errors.push('CHECK_SCOPE_MISMATCH');
  for (const check of diagnostic.checks) {
    if (!check.complete) errors.push(`INCOMPLETE_DIAGNOSTIC:${check.kind}`);
    const historical = evidence.findings.find(item => item.kind === check.kind)?.findings || [];
    const remaining = [...historical]; // Consume occurrences: added duplicates cannot hide.
    const checkerPath = { content: 'scripts/check-blog-content-template.mjs',
      frontmatter: 'scripts/check-blog-frontmatter-contract.mjs', lint: 'eslint.config.js' }[check.kind];
    if (!checkerPath) { errors.push(`UNKNOWN_CHECK:${check.kind}`); continue; }
    if (fileHash(checkerPath) !== check.checkerAfterSha256) errors.push(`CHECKER_CAPTURE_DRIFT:${checkerPath}`);
    if (check.kind !== 'lint' && !check.sameEditorialRules) errors.push(`EDITORIAL_RULE_DRIFT:${check.kind}`);
    if (check.afterStatus !== 0 && !check.findings.some(item => item.blocking)) errors.push(`UNPARSED_FAILURE:${check.kind}`);
    for (const finding of check.findings.filter(item => item.blocking)) {
      if (fileHash(checkerPath) !== finding.ruleAfterSha256) errors.push(`STALE_RULE:${checkerPath}`);
      const index = remaining.findIndex(old => old.source === finding.source && old.rule === finding.rule
        && old.message === finding.message && old.sourceAfterSha256 === finding.sourceAfterSha256
        && (check.kind === 'lint' ? old.lineText === finding.lineText : old.ruleAfterSha256 === finding.ruleAfterSha256));
      const previous = index < 0 ? null : remaining.splice(index, 1)[0];
      if (fileHash(finding.source) !== finding.sourceAfterSha256) errors.push(`STALE_DIAGNOSTIC:${finding.source}`);
      const allowedEditorial = ['UNCHANGED_DIAGNOSTIC_BLOCKING', 'IMPROVED_LEGACY_STILL_BLOCKING'];
      if (check.kind === 'lint') {
        // The independently tested JSX-use precision change does not waive a
        // rule: remaining diagnostics need identical baseline source/line/rule.
        const recorded = decisions.legacyLint.find(item => item.source === finding.source && item.rule === finding.rule
          && item.messageSha256 === sha256(finding.message) && item.sourceSha256 === finding.sourceAfterSha256);
        if (!recorded || !previous || !finding.before || finding.before.lineText !== finding.lineText
          || finding.sourceBeforeSha256 !== finding.sourceAfterSha256) errors.push(`LINT_REGRESSION_OR_UNRESOLVED:${finding.source}:${finding.rule}`);
      } else if (!previous || !allowedEditorial.includes(finding.classification) || !finding.before
        || (finding.metric && finding.metric.value < finding.before.metric.value)) {
        errors.push(`NEW_WORSE_OR_UNRESOLVED:${check.kind}:${finding.source}:${finding.rule}`);
      }
      holds.push({ kind: check.kind, ...finding, disposition: check.kind === 'lint'
        ? 'EXACT_LEGACY_RUNTIME_DEBT_NOT_WAIVED' : 'EXACT_ARTIFACT_HUMAN_DECISION_REQUIRED' });
    }
  }
  return { type: 'BOUNDED_MAINTENANCE_REVIEW_NOT_APPROVAL', base: scope.base, head: scope.head,
    technicalClassification: errors.length ? 'BLOCKED' : 'NO_NEW_FINDINGS_IN_RECONCILED_CHECKS',
    publication: 'BLOCKED_PENDING_HUMAN_AND_EXTERNAL_GATES', errors, holds, articles,
    thresholdsChanged: false, fabricatedApprovals: false };
}
