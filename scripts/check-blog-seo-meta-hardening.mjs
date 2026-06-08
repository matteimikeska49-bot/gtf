import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const articlesDir = path.join(ROOT_DIR, 'src/content/blog/articles');

const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md') && f !== '_template.md');
const d53Topics = ['text-to-carousel-ai', 'instagram-carousel-hooks', 'tekst-v-karusel-neyroset', 'content-calendar-to-carousel', 'b2b-keysy-v-linkedin-karusel'];

let scannedCount = 0;
let errors = [];
let warnings = [];

const titlesEn = new Set();
const titlesRu = new Set();
const descEn = new Set();
const descRu = new Set();
const canonicals = new Set();

function extractData(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, body: content };
  
  const frontmatterStr = match[1];
  const data = {};
  
  const parseMatch = (regex) => {
    const m = frontmatterStr.match(regex);
    return m ? m[1].trim().replace(/^["']|["']$/g, '') : null;
  };

  data.slug = parseMatch(/^slug:\s*(.*)$/m);
  data.language = parseMatch(/^language:\s*(.*)$/m) || 'en';
  data.title = parseMatch(/^title:\s*(.*)$/m);
  data.description = parseMatch(/^description:\s*(.*)$/m);
  data.canonical = parseMatch(/^canonical(?:Url)?:\s*(.*)$/m);
  data.primaryKeyword = parseMatch(/^primaryKeyword:\s*(.*)$/m);
  data.priorityTier = parseMatch(/^priorityTier:\s*(.*)$/m);
  
  data.createdAt = parseMatch(/^createdAt:\s*(.*)$/m);
  data.updatedAt = parseMatch(/^updatedAt:\s*(.*)$/m);
  data.lastReviewed = parseMatch(/^lastReviewed:\s*(.*)$/m);

  data.published = /^published:\s*true\b/m.test(frontmatterStr);
  data.preview = /^preview:\s*true\b/m.test(frontmatterStr);
  data.noindex = /^noindex:\s*true\b/m.test(frontmatterStr);
  data.approvedForPublish = /^approvedForPublish:\s*true\b/m.test(frontmatterStr);

  return data;
}

files.forEach(file => {
  if (file.startsWith('test-')) return;
  scannedCount++;
  
  const content = fs.readFileSync(path.join(articlesDir, file), 'utf8');
  const data = extractData(content);
  data.slug = data.slug || file.replace('.md', '');
  
  const isD53 = d53Topics.includes(data.slug);
  const isStrict = isD53 || data.preview || data.noindex || data.published || data.priorityTier === 'P1' || data.priorityTier === 'P2';

  const checkRequired = (field, name) => {
    if (!field) {
      if (isStrict) errors.push(`[P0] Article ${data.slug} missing required SEO field: ${name}.`);
      else warnings.push(`Legacy article ${data.slug} missing ${name}.`);
    }
  };

  checkRequired(data.title, 'title');
  checkRequired(data.description, 'description');
  checkRequired(data.canonical, 'canonical');
  checkRequired(data.primaryKeyword, 'primaryKeyword');
  checkRequired(data.language, 'language');
  
  if (data.title) {
    if (data.title.length < 30 || data.title.length > 80) {
      const msg = `Title length (${data.title.length}) outside safe range 30-80 for ${data.slug}.`;
      if (isD53) errors.push(`[P0] ${msg}`);
      else warnings.push(msg);
    }
    const tSet = data.language === 'ru' ? titlesRu : titlesEn;
    if (tSet.has(data.title.toLowerCase())) {
      errors.push(`[P0] Duplicate title '${data.title}' in ${data.slug}.`);
    }
    tSet.add(data.title.toLowerCase());
  }

  if (data.description) {
    if (data.description.length < 90 || data.description.length > 180) {
      const msg = `Description length (${data.description.length}) outside safe range 90-180 for ${data.slug}.`;
      if (isD53) errors.push(`[P0] ${msg}`);
      else warnings.push(msg);
    }
    const dSet = data.language === 'ru' ? descRu : descEn;
    if (dSet.has(data.description.toLowerCase())) {
      errors.push(`[P0] Duplicate description in ${data.slug}.`);
    }
    dSet.add(data.description.toLowerCase());
  }

  if (data.canonical) {
    if (canonicals.has(data.canonical.toLowerCase())) {
      errors.push(`[P0] Duplicate canonical '${data.canonical}' in ${data.slug}.`);
    }
    canonicals.add(data.canonical.toLowerCase());

    const expectedCanonical = data.language === 'ru' ? `https://gotoflow.io/ru/blog/${data.slug}` : `https://gotoflow.io/blog/${data.slug}`;
    if (data.canonical !== expectedCanonical) {
      if (isStrict) errors.push(`[P0] Canonical mismatch: Expected ${expectedCanonical}, got ${data.canonical} in ${data.slug}.`);
      else warnings.push(`Legacy article ${data.slug} canonical mismatch.`);
    }
  }

  // Date rules
  if (isStrict && !data.createdAt) {
    errors.push(`[P0] Article ${data.slug} missing createdAt date.`);
  }

  if (data.createdAt && data.updatedAt) {
    const cDate = new Date(data.createdAt);
    const uDate = new Date(data.updatedAt);
    if (uDate < cDate) {
      errors.push(`[P0] Date mismatch: updatedAt is older than createdAt in ${data.slug}.`);
    }
  }
  
  if (data.createdAt && data.lastReviewed) {
    const cDate = new Date(data.createdAt);
    const lDate = new Date(data.lastReviewed);
    if (lDate < cDate) {
      errors.push(`[P0] Date mismatch: lastReviewed is older than createdAt in ${data.slug}.`);
    }
  }
});

console.log(`\n🔍 SEO Meta Hardening Check`);
console.log(`- Scanned Articles: ${scannedCount}`);

let d53Safe = !errors.some(e => e.includes('D53'));
console.log(`- D53 Status: ${d53Safe ? 'Safe' : 'Unsafe'}`);

if (warnings.length > 0) {
  console.log(`\n⚠️ Warnings (${warnings.length}):`);
  warnings.slice(0, 10).forEach(w => console.log(`  - ${w}`));
  if (warnings.length > 10) console.log(`  ...and ${warnings.length - 10} more warnings.`);
}

if (errors.length > 0) {
  console.error(`\n❌ Errors (${errors.length}):`);
  errors.forEach(e => console.error(`  - ${e}`));
  console.error(`\n❌ SEO Meta Hardening failed.`);
  process.exit(1);
}

console.log(`\n✅ SEO Meta Hardening passed successfully.`);
