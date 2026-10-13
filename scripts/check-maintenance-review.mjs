import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { resolveReleaseScope } from './lib/release-scope.mjs';
import { assessMaintenanceReview } from './lib/maintenance-review.mjs';

const root = process.cwd();
const baseline = process.argv[2];
if (!baseline) throw new Error('Usage: node scripts/check-maintenance-review.mjs <clean-base-worktree>');
const read = file => fs.readFileSync(path.join(root, file));
const decisions = JSON.parse(read('docs/maintenance/2026-10-11-pr19-maintenance-decisions.json'));
const evidenceBytes = read(decisions.evidence.file);
if (crypto.createHash('sha256').update(evidenceBytes).digest('hex') !== decisions.evidence.sha256) throw new Error('IMMUTABLE_EVIDENCE_DRIFT');
const captured = spawnSync('node', ['scripts/check-release-findings.mjs', baseline], { cwd: root, stdio: 'inherit', env: process.env });
if (captured.status !== 0) throw new Error('DIAGNOSTIC_CAPTURE_FAILED');
const result = assessMaintenanceReview({ scope: resolveReleaseScope(root), decisions,
  diagnostic: JSON.parse(read('tmp/release-findings.json')), evidence: JSON.parse(evidenceBytes), read });
fs.writeFileSync(path.join(root, 'tmp/maintenance-review.json'), JSON.stringify(result, null, 2) + '\n');
console.log(`${result.technicalClassification}: ${result.articles.length} exact source articles; ${result.holds.length} individual holds.`);
console.log(`PUBLICATION: ${result.publication}. AI review is auxiliary, never HUMAN approval.`);
for (const error of result.errors) console.error(error);
if (result.errors.length) process.exit(1);
