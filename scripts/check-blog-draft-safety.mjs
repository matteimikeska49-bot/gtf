import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const articlesDir = path.join(ROOT_DIR, 'src/content/blog/articles');
const batchStatusPath = path.join(ROOT_DIR, 'src/content/blog/batch-status.json');

const batchStatus = JSON.parse(fs.readFileSync(batchStatusPath, 'utf8'));
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md') && f !== '_template.md');

let scannedCount = 0;
let draftCount = 0;
let publishedCount = 0;
let errors = [];
let warnings = [];
const d53Topics = ['text-to-carousel-ai', 'instagram-carousel-hooks', 'tekst-v-karusel-neyroset', 'content-calendar-to-carousel', 'b2b-keysy-v-linkedin-karusel'];

function extractData(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, body: content };
  
  const frontmatterStr = match[1];
  const data = {};
  
  if (/^slug:\s*["']?([^"'\n]+?)["']?$/m.test(frontmatterStr)) data.slug = frontmatterStr.match(/^slug:\s*["']?([^"'\n]+?)["']?$/m)[1];
  if (/^language:\s*["']?([^"'\n]+?)["']?$/m.test(frontmatterStr)) data.language = frontmatterStr.match(/^language:\s*["']?([^"'\n]+?)["']?$/m)[1];
  
  const pubMatch = frontmatterStr.match(/^published:\s*(true|false)/m);
  if (pubMatch) data.published = pubMatch[1] === 'true';

  const previewMatch = frontmatterStr.match(/^preview:\s*(true|false)/m);
  if (previewMatch) data.preview = previewMatch[1] === 'true';

  const noindexMatch = frontmatterStr.match(/^noindex:\s*(true|false)/m);
  if (noindexMatch) data.noindex = noindexMatch[1] === 'true';

  const approvedMatch = frontmatterStr.match(/^approvedForPublish:\s*(true|false)/m);
  if (approvedMatch) data.approvedForPublish = approvedMatch[1] === 'true';

  if (/^canonical:\s*["']?([^"'\n]+?)["']?$/m.test(frontmatterStr)) data.canonical = frontmatterStr.match(/^canonical:\s*["']?([^"'\n]+?)["']?$/m)[1];

  return { data, body: match[2] };
}

for (const file of files) {
  scannedCount++;
  const filePath = path.join(articlesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const { data } = extractData(content);
  const slug = data.slug || file.replace('.md', '');

  if (slug.startsWith('test-')) continue;

  const isDraft = data.published === false || data.preview === true;
  if (isDraft) draftCount++;
  else publishedCount++;

  const isD53 = d53Topics.includes(slug);

  // 1. Validate allowed state combinations
  if (data.published === false && data.noindex === false) {
    errors.push(`Article "${slug}": published is false but noindex is false. Unsafe indexation state.`);
  }
  if (data.preview === true && data.noindex === false) {
    errors.push(`Article "${slug}": preview is true but noindex is false. Unsafe indexation state.`);
  }
  if (data.approvedForPublish === false && data.published === true) {
    errors.push(`Article "${slug}": published is true but approvedForPublish is false.`);
  }

  // 2. D53 strict requirements
  if (isD53) {
    if (data.published !== false) errors.push(`D53 Article "${slug}": published must be false.`);
    if (data.noindex !== true) errors.push(`D53 Article "${slug}": noindex must be true.`);
    if (data.preview !== true) errors.push(`D53 Article "${slug}": preview must be true.`);
    if (data.approvedForPublish !== false) errors.push(`D53 Article "${slug}": approvedForPublish must be false.`);
  }

  // 3. Batch status agreement
  const batchRec = batchStatus.find(b => b.slug === slug);
  if (batchRec) {
    if (batchRec.status === 'published' && data.published !== true) {
      errors.push(`Article "${slug}": batch-status is published but frontmatter published is ${data.published}.`);
    }
    if (batchRec.status === 'draft' && data.published === true) {
      errors.push(`Article "${slug}": batch-status is draft but frontmatter published is true.`);
    }
  } else if (isD53) {
    errors.push(`D53 Article "${slug}": missing from batch-status.json.`);
  }

  // 4. Canonical
  if (!data.canonical) {
    warnings.push(`Article "${slug}": missing canonical URL.`);
  } else if (data.language === 'ru' && !data.canonical.includes('/ru/')) {
    errors.push(`Article "${slug}": Russian article canonical is missing /ru/ path.`);
  }
}

console.log(`\n🔒 Draft & Noindex Safety Check Results:`);
console.log(`- Scanned Articles: ${scannedCount}`);
console.log(`- Published: ${publishedCount}`);
console.log(`- Drafts: ${draftCount}`);

let d53Safe = true;
if (errors.some(e => e.includes('D53'))) d53Safe = false;
console.log(`- D53 Status: ${d53Safe ? 'Safe' : 'Unsafe'}`);

if (warnings.length > 0) {
  console.log(`\n⚠️ Warnings (${warnings.length}):`);
  warnings.slice(0, 10).forEach(w => console.log(`  - ${w}`));
  if (warnings.length > 10) console.log(`  ...and ${warnings.length - 10} more warnings`);
}

if (errors.length > 0) {
  console.error(`\n❌ Errors (${errors.length}):`);
  errors.forEach(e => console.error(`  - ${e}`));
  console.error(`\n❌ Check failed. Fix draft safety errors above.`);
  process.exit(1);
}

console.log(`\n✅ Draft safety checks passed successfully.`);
