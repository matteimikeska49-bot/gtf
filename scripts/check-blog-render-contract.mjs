import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT, 'dist');

console.log('🔍 Starting Render HTML Checker...\n');

if (!fs.existsSync(DIST_DIR)) {
  console.log('⚠️ dist/ directory not found. Please run "npm run build" if rendered validation is needed.');
  console.log('Skipping HTML validation (dist directory missing).');
  process.exit(0);
}

const FORBIDDEN_STRINGS = [
  ':::mockup',
  '[!product]',
  '<InlineProductBlock',
  'InlineProductBlock',
  '<ArticleFinalCta',
  'ArticleFinalCta',
  'finalCta:',
  'quickAnswer:',
  '\n---\n',
  'TODO',
  'TBD',
  'lorem ipsum',
  '&lt;span class=',
  'class=\\"text-gradient-brand\\"'
];

let totalErrors = 0;
let totalWarnings = 0;
let scannedCount = 0;

function checkHtmlFile(htmlPath) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const lowerHtml = html.toLowerCase();
  const errors = [];
  const warnings = [];

  // Check forbidden strings
  FORBIDDEN_STRINGS.forEach(str => {
    if (html.includes(str)) errors.push(`[P0] Raw artifact leaked: "${str}"`);
  });

  // Duplicate H1 check
  const h1Match = html.match(/<h1[^>]*>/gi);
  if (h1Match && h1Match.length > 1) {
    errors.push(`[P0] Duplicate <h1 tag rendered (${h1Match.length} found).`);
  }

  // Duplicate FAQ
  const faqCount = (html.match(/id="faq"/gi) || []).length + (html.match(/schema\.org\/FAQPage/gi) || []).length;
  // This is a naive check. If FAQPage is generated, and there's also a visible FAQ, that's fine.
  // But if there's multiple visible FAQ zones:
  if (html.match(/id="faq"/gi) && html.match(/id="faq"/gi).length > 1) {
    errors.push(`[P0] Duplicate visible FAQ sections rendered.`);
  }

  // Missing crucial tags
  if (!html.includes('<title>') || html.match(/<title>\s*<\/title>/)) errors.push(`[P0] Empty or missing title.`);
  if (!html.includes('rel="canonical"')) errors.push(`[P0] Missing canonical link.`);
  if (!html.includes('<meta name="robots"')) errors.push(`[P0] Missing robots meta tag.`);
  if (!html.includes('<body') || html.length < 500) errors.push(`[P0] Missing or empty body content.`);

  // If FAQ schema exists, check if items are empty
  if (html.includes('schema.org/FAQPage') && (html.includes('"name":""') || html.includes('"name": ""'))) {
    errors.push(`[P0] Empty FAQ question in schema.`);
  }

  // Check if noindex is leaked onto production article (unless preview)
  // Assuming public build outputs indexable unless preview. 
  // We'll let draft-safety handle index validation.

  if (errors.length > 0) {
    console.log(`❌ ${path.relative(ROOT, htmlPath)}`);
    errors.forEach(e => {
      console.log(`  - ${e}`);
      totalErrors++;
    });
  }

  if (warnings.length > 0) {
    console.log(`⚠️ ${path.relative(ROOT, htmlPath)}`);
    warnings.forEach(w => {
      console.log(`  - ${w}`);
      totalWarnings++;
    });
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      walkDir(filePath);
    } else if (file === 'index.html') {
      const relPath = path.relative(DIST_DIR, filePath);
      if (relPath === 'blog/index.html' || relPath === 'ru/blog/index.html') return;
      scannedCount++;
      checkHtmlFile(filePath);
    }
  });
}

walkDir(path.join(DIST_DIR, 'blog'));
walkDir(path.join(DIST_DIR, 'ru/blog'));

console.log(`\n📊 Scanned HTML files: ${scannedCount}`);

if (totalErrors > 0) {
  console.log(`\n❌ FAIL: Render HTML check found ${totalErrors} errors.`);
  process.exit(1);
} else {
  console.log('\n✅ PASS: Render HTML check passed.');
  process.exit(0);
}
