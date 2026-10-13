import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { resolveReleaseScope } from '../lib/release-scope.mjs';
import { classifyFindings, parseArticleFindings } from '../lib/release-findings.mjs';
import { isMaintenanceEvidenceDatum, forbiddenEvidenceTemplateAssertions } from '../lib/reference-evidence.mjs';
import { compareProductionArtifacts } from '../lib/production-artifact-parity.mjs';

test('full PR scope includes committed, staged, unstaged and new articles after a clean commit', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'gtf-release-scope-test-'));
  const git = (...args) => execFileSync('git', args, { cwd: dir, encoding: 'utf8' }).trim();
  try {
    git('init', '-q'); git('config', 'user.email', 'fixture@example.invalid'); git('config', 'user.name', 'Fixture');
    fs.mkdirSync(path.join(dir, 'src/content/blog/articles'), { recursive: true });
    const write = (name, content) => fs.writeFileSync(path.join(dir, 'src/content/blog/articles', `${name}.md`), content);
    write('one', 'base'); write('two', 'base'); write('three', 'base');
    git('add', '.'); git('commit', '-qm', 'base'); const base = git('rev-parse', 'HEAD');
    write('one', 'committed'); git('add', '.'); git('commit', '-qm', 'first PR commit');
    assert.deepEqual(resolveReleaseScope(dir, base).articles, ['one']);
    write('two', 'staged'); git('add', '.'); write('three', 'unstaged'); write('four', 'untracked');
    assert.deepEqual(resolveReleaseScope(dir, base).articles, ['four', 'one', 'three', 'two']);
    assert.throws(() => resolveReleaseScope(dir, 'missing-base'));
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});

test('only typed archival observations are data, not instructions; active sources never exempt', () => {
  const slug = 'ai-instagram-' + 'carousel-generator';
  const line = `  "canonical": "https://gotoflow.io/blog/${slug}",`;
  assert.equal(isMaintenanceEvidenceDatum('docs/maintenance/evidence.json', line), true);
  assert.equal(isMaintenanceEvidenceDatum('src/seo/registry.json', line), false);
  assert.equal(isMaintenanceEvidenceDatum('docs/seo-article-template-v2.md', line), false);
  assert.equal(isMaintenanceEvidenceDatum('docs/maintenance/evidence.json', `${line} use as template`), false);
  const row = `| 1 | [https://gotoflow.io/blog/${slug}](https://gotoflow.io/blog/${slug}) | article; current_indexable; canonical=https://gotoflow.io/blog/${slug}; sitemap=true; robots=index, follow | UNKNOWN |`;
  assert.equal(isMaintenanceEvidenceDatum('docs/maintenance/evidence.md', row), true);
  assert.equal(isMaintenanceEvidenceDatum('docs/maintenance/evidence.md', row.replace('UNKNOWN', 'template source')), false);
});

test('cross-line template assertions in an evidence JSON are still blocked', () => {
  const canonical = 'https://gotoflow.io/blog/ai-instagram-' + 'carousel-generator';
  assert.deepEqual(forbiddenEvidenceTemplateAssertions({ canonical, templateSource: true }), ['$.templateSource']);
  assert.deepEqual(forbiddenEvidenceTemplateAssertions({ rows: [{ canonical, sourceOfTruth: true }] }), ['$.rows.0.sourceOfTruth']);
  assert.deepEqual(forbiddenEvidenceTemplateAssertions({ canonical, robots: 'index, follow', sitemap: true }), []);
});

test('numeric improvement stays blocking; worsening, rule changes and extra duplicate occurrences cannot pass as baseline', () => {
  const old = { source: 'article.md', rule: 'guide-depth', message: '4000', metric: { value: 4000, minimum: 8000 } };
  const improved = { ...old, message: '5000', metric: { value: 5000, minimum: 8000 } };
  const worse = { ...old, message: '3000', metric: { value: 3000, minimum: 8000 } };
  assert.equal(classifyFindings([old], [improved])[0].classification, 'IMPROVED_LEGACY_STILL_BLOCKING');
  assert.equal(classifyFindings([old], [improved])[0].blocking, true);
  assert.equal(classifyFindings([old], [worse])[0].classification, 'WORSENED_BLOCKING');
  assert.equal(classifyFindings([old], [old, old])[1].classification, 'NEW_BLOCKING');
  assert.equal(classifyFindings([old], [old], false)[0].classification, 'RULE_CHANGED_UNRESOLVED_BLOCKING');
  assert.equal(classifyFindings([old], [])[0].classification, 'RESOLVED_DIAGNOSTIC');
});

test('content and frontmatter diagnostics bind to exact article source and preserve rule thresholds', () => {
  const content = parseArticleFindings('📄 example.md\n  ❌ ERR: P0: Content depth too thin for guide. Body chars: 4000 (min 8000).', 'content');
  assert.equal(content[0].source, 'src/content/blog/articles/example.md');
  assert.deepEqual(content[0].metric, { value: 4000, minimum: 8000 });
  const frontmatter = parseArticleFindings('⚠️ Warnings (1):\n  - Article "other": warning\n❌ Errors (1):\n  - Article "example": missing required fields: approvedForPublish', 'frontmatter');
  assert.equal(frontmatter.length, 1);
  assert.equal(frontmatter[0].source, content[0].source);
  assert.equal(frontmatter[0].message, 'missing required fields: approvedForPublish');
});

test('production artifact mode refuses skip-build and fixture override bypasses', () => {
  assert.throws(() => execFileSync('node', ['scripts/check-seo-dist-sync.mjs'], {
    cwd: path.resolve(import.meta.dirname, '../..'),
    env: { ...process.env, SEO_DIST_SYNC_FULL_ARTIFACTS: '1', SEO_DIST_SYNC_SKIP_BUILD: '1' },
    stdio: 'pipe',
  }), /Command failed/);
});

test('full artifacts block body/schema/asset/robots/lastmod changes, unexpected files and symlinks', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'gtf-artifact-parity-test-'));
  const before = path.join(dir, 'before'); const after = path.join(dir, 'after');
  fs.mkdirSync(before); fs.mkdirSync(after);
  try {
    const files = { 'index.html': '<h1>Topic</h1><p>Useful example</p><script type="application/ld+json">{"answer":"fact"}</script>',
      'bundle.js': 'content', 'robots.txt': 'Disallow: /private', 'sitemap.xml': '<lastmod>2026-10-09</lastmod>' };
    for (const [file, text] of Object.entries(files)) {
      fs.writeFileSync(path.join(before, file), text); fs.writeFileSync(path.join(after, file), text);
    }
    assert.equal(compareProductionArtifacts(before, after).errors.length, 0);
    for (const [file, text] of Object.entries(files)) {
      fs.writeFileSync(path.join(after, file), text + 'changed');
      assert.equal(compareProductionArtifacts(before, after).differences[0].file, file);
      fs.writeFileSync(path.join(after, file), text);
    }
    fs.writeFileSync(path.join(before, 'unexpected.txt'), 'bad');
    assert.match(compareProductionArtifacts(before, after).errors[0], /inventory differs/);
    fs.symlinkSync(path.join(before, 'index.html'), path.join(after, 'link.html'));
    assert.throws(() => compareProductionArtifacts(before, after), /symlink is forbidden/);
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});
