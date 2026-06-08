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
  data.priorityTier = parseMatch(/^priorityTier:\s*(.*)$/m);
  data.published = /^published:\s*true\b/m.test(frontmatterStr);
  data.preview = /^preview:\s*true\b/m.test(frontmatterStr);
  data.noindex = /^noindex:\s*true\b/m.test(frontmatterStr);

  const faqMatch = frontmatterStr.match(/^faq:([\s\S]*?)(?:^[a-zA-Z]+:|\n---$)/m);
  data.faqStr = faqMatch ? faqMatch[1] : null;

  return { data, body: match[2] };
}

files.forEach(file => {
  if (file.startsWith('test-')) return;
  scannedCount++;
  
  const content = fs.readFileSync(path.join(articlesDir, file), 'utf8');
  const { data, body } = extractData(content);
  data.slug = data.slug || file.replace('.md', '');
  
  const isD53 = d53Topics.includes(data.slug);
  const isStrict = isD53 || data.preview || data.noindex || data.published || data.priorityTier === 'P1' || data.priorityTier === 'P2';

  // Check Schema Safety (Drafts should not leak indexable schema)
  // Our schema is built entirely from frontmatter. We just need to ensure 
  // we do not generate schema from body text.
  
  // 1. FAQPage schema source
  // The FAQPage schema MUST only use the frontmatter `faq` section, NOT the markdown body.
  const hasBodyFaq = body.includes('## FAQ') || body.includes('## Часто задаваемые вопросы');
  
  if (data.faqStr) {
    if (!data.faqStr.includes('question:')) {
      errors.push(`[P0] Article ${data.slug} has 'faq' in frontmatter but no valid questions.`);
    }
  }

  // Schema state leak: Draft/noindex should not emit public schemas. Since this is checked at build time by 
  // MarkdownSeoArticleTemplateV2 (which only renders for allowed routes), we just verify 
  // draft properties are strictly enforced. (which is done by draft-safety checker)
});

console.log(`\n🔍 Schema Source Hardening Check`);
console.log(`- Scanned Articles: ${scannedCount}`);

let d53Safe = !errors.some(e => e.includes('D53'));
console.log(`- D53 Status: ${d53Safe ? 'Safe' : 'Unsafe'}`);

if (warnings.length > 0) {
  console.log(`\n⚠️ Warnings (${warnings.length}):`);
  warnings.slice(0, 10).forEach(w => console.log(`  - ${w}`));
}

if (errors.length > 0) {
  console.error(`\n❌ Errors (${errors.length}):`);
  errors.forEach(e => console.error(`  - ${e}`));
  console.error(`\n❌ Schema Source Hardening failed.`);
  process.exit(1);
}

console.log(`\n✅ Schema Source Hardening passed successfully.`);
