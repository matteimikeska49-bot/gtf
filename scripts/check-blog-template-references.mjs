import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const SCAN_ROOTS = ['docs', 'scripts'];
const REQUIRED_CANONICAL_FILES = [
  'docs/seo-article-template-v2.md',
  'src/components/blog/templates/MarkdownSeoArticleTemplateV2.jsx',
  'src/components/blog/MarkdownBlogArticlePage.jsx',
  'src/lib/blog/markdownArticles.js',
  'src/content/blog/articles/_template.md',
  'src/content/blog/articles/test-seo-template-v2.md'
];

const walk = (dir) => {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', 'dist', '.git'].includes(entry.name)) return [];
      return walk(fullPath);
    }
    if (!/\.(md|mjs|js|json)$/.test(entry.name)) return [];
    return [fullPath];
  });
};

const isNegated = (line) => /\bdo not\b|\bnot\b|не является|не использовать|нельзя|internal fixture only|not a production article example/i.test(line);
const hasLiveArticle = (line) => /\/blog\/ai-instagram-carousel-generator|ai-instagram-carousel-generator/i.test(line);
const hasReferenceLanguage = (line) => /canonical|reference|template source|source of truth|эталон|эталонная/i.test(line);
const hasTestFixture = (line) => /test-seo-template-v2/i.test(line);
const hasProductionExampleLanguage = (line) => /production article example|public seo article|production example|эталон|canonical reference|template reference/i.test(line);

const files = SCAN_ROOTS.flatMap((dir) => walk(path.join(ROOT, dir)));
const failures = [];
const warnings = [];

for (const file of files) {
  const relative = path.relative(ROOT, file);
  if (relative === 'scripts/check-blog-template-references.mjs') continue;
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    if (/legacy JSX/i.test(line)) {
      failures.push(`${relative}:${index + 1}: markdown articles must not be labeled legacy JSX`);
    }

    if (hasLiveArticle(line) && hasReferenceLanguage(line) && !isNegated(line)) {
      failures.push(`${relative}:${index + 1}: live article route must not be described as canonical/template/reference source`);
    }

    if (hasTestFixture(line) && hasProductionExampleLanguage(line) && !isNegated(line)) {
      failures.push(`${relative}:${index + 1}: test-seo-template-v2 must not be described as a production article example`);
    }

    if (hasLiveArticle(line) && !hasReferenceLanguage(line)) {
      warnings.push(`${relative}:${index + 1}: live article route mention is allowed only as content/route context`);
    }
  });
}

const canonicalDocs = [
  fs.readFileSync(path.join(ROOT, 'docs/seo-article-template-v2.md'), 'utf8'),
  fs.readFileSync(path.join(ROOT, 'docs/blog-production-system.md'), 'utf8')
].join('\n');

for (const required of REQUIRED_CANONICAL_FILES) {
  if (!canonicalDocs.includes(required)) {
    failures.push(`canonical template source is missing required repo file: ${required}`);
  }
}

console.log('\n🔍 Blog Template Reference Check');
console.log(`- Scanned files: ${files.length}`);
console.log(`- Required canonical files: ${REQUIRED_CANONICAL_FILES.length}`);

if (warnings.length > 0) {
  console.log(`\n⚠️ Warnings (${warnings.length}):`);
  warnings.slice(0, 12).forEach((warning) => console.log(`  - ${warning}`));
  if (warnings.length > 12) console.log(`  ...and ${warnings.length - 12} more warnings`);
}

if (failures.length > 0) {
  console.error(`\n❌ Template reference check failed with ${failures.length} issue(s):`);
  failures.forEach((failure) => console.error(`  - ${failure}`));
  process.exit(1);
}

console.log('\n✅ Template reference check passed.');
