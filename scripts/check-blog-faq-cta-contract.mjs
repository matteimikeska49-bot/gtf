import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const articlesDir = path.join(ROOT_DIR, 'src/content/blog/articles');
const capabilitiesPath = path.join(ROOT_DIR, 'src/content/blog/product-capabilities.json');

const capabilities = JSON.parse(fs.readFileSync(capabilitiesPath, 'utf8'));
const d53Topics = ['text-to-carousel-ai', 'instagram-carousel-hooks', 'tekst-v-karusel-neyroset', 'content-calendar-to-carousel', 'b2b-keysy-v-linkedin-karusel'];

let errors = [];
let warnings = [];
let scannedCount = 0;
let strictCount = 0;

const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md') && f !== '_template.md');

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, body: content };
  
  const frontmatterStr = match[1];
  const data = {
    faq: [],
    finalCta: {},
    preview: false,
    published: undefined,
    priorityTier: null
  };
  
  // Quick and dirty manual extraction for specific keys
  if (/^slug:\s*["']?([^"'\n]+?)["']?$/m.test(frontmatterStr)) {
    data.slug = frontmatterStr.match(/^slug:\s*["']?([^"'\n]+?)["']?$/m)[1];
  }
  if (/^preview:\s*true/m.test(frontmatterStr)) data.preview = true;
  if (/^published:\s*true/m.test(frontmatterStr)) data.published = true;
  if (/^priorityTier:\s*["']?(P[1-3]|HOLD)["']?/m.test(frontmatterStr)) {
    data.priorityTier = frontmatterStr.match(/^priorityTier:\s*["']?(P[1-3]|HOLD)["']?/m)[1];
  }

  // Extract FAQ
  let inFaq = false;
  let inCta = false;
  
  const lines = frontmatterStr.split('\n');
  for (const line of lines) {
    if (line.startsWith('faq:')) {
      inFaq = true; inCta = false; continue;
    }
    if (line.startsWith('finalCta:')) {
      inCta = true; inFaq = false; continue;
    }
    if (line.match(/^[a-zA-Z0-9]+:/) && !line.startsWith('  ')) {
      inFaq = false; inCta = false;
    }
    
    if (inFaq) {
      if (line.match(/^\s+-\s+question:\s+/) || line.match(/^\s+question:\s+/)) data.faq.push('q');
      else if (line.match(/^\s+answer:\s+/)) data.faq.push('a');
      else if (line.match(/^\s+-\s+q:\s+/) || line.match(/^\s+q:\s+/)) data.faq.push('badQ');
      else if (line.match(/^\s+a:\s+/)) data.faq.push('badA');
    }
    
    if (inCta) {
      const parts = line.trim().split(':');
      if (parts.length > 1) {
        data.finalCta[parts[0].trim()] = parts.slice(1).join(':').trim();
      }
    }
  }

  return { data, body: match[2] };
}

for (const file of files) {
  scannedCount++;
  const filePath = path.join(articlesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const { data, body } = extractFrontmatter(content);
  const slug = data.slug || file.replace('.md', '');

  if (slug.startsWith('test-')) continue;

  const isD53 = d53Topics.includes(slug);
  const isDraftPreview = data.preview === true || data.published === false;
  const isHighPriority = data.priorityTier === 'P1' || data.priorityTier === 'P2';
  
  const isStrict = isD53 || isDraftPreview || isHighPriority;

  if (!isStrict) {
    // Check if legacy article leaks raw html or bad sections but keep it as warning
    if (body.match(/^##\s+FAQ/im) || body.match(/^##\s+Frequently Asked Questions/im)) {
      warnings.push(`Legacy article "${slug}" contains duplicate body FAQ header.`);
    }
    if (body.includes('[!product]') || body.includes('<InlineProductBlock')) {
      warnings.push(`Legacy article "${slug}" contains forbidden body product block.`);
    }
    continue;
  }

  strictCount++;

  // FAQ rules
  if (data.faq.length === 0) {
    // If strict, FAQ is pretty much expected, but maybe not strictly required by contract if empty, 
    // Wait, D59 contract says `faq` is optional, but if defined it must be strictly structured.
  } else {
    if (data.faq.includes('badQ') || data.faq.includes('badA')) {
      errors.push(`Article "${slug}": frontmatter FAQ uses forbidden 'q' or 'a' keys.`);
    }
    // Checking pairs
    const qs = data.faq.filter(x => x === 'q').length;
    const as = data.faq.filter(x => x === 'a').length;
    if (qs !== as || qs === 0) {
      errors.push(`Article "${slug}": frontmatter FAQ missing 'question' or 'answer' for some items, or empty.`);
    }
  }

  // CTA rules
  if (Object.keys(data.finalCta).length === 0) {
    errors.push(`Article "${slug}": frontmatter finalCta is missing or empty.`);
  } else {
    if (!data.finalCta.title || !data.finalCta.text || !data.finalCta.buttonText) {
      errors.push(`Article "${slug}": frontmatter finalCta missing required keys (title, text, buttonText).`);
    }
    if (data.finalCta.description) errors.push(`Article "${slug}": finalCta uses forbidden 'description' key.`);
    if (data.finalCta.linkText) errors.push(`Article "${slug}": finalCta uses forbidden 'linkText' key.`);
    if (data.finalCta.link) errors.push(`Article "${slug}": finalCta uses forbidden 'link' key.`);
    
    // HTML in CTA check
    const ctaString = JSON.stringify(data.finalCta);
    if (/<[a-z]+[ >]/.test(ctaString) && !ctaString.includes('<br>')) {
      errors.push(`Article "${slug}": raw HTML found in finalCta.`);
    }
  }

  // Body duplication rules
  if (body.match(/^##\s+FAQ/im) || body.match(/^##\s+Frequently Asked Questions/im) || body.match(/^##\s+Частые вопросы/im)) {
    if (data.faq.length > 0) {
      errors.push(`Article "${slug}": body markdown contains duplicate FAQ section while frontmatter FAQ exists.`);
    }
  }

  if (body.includes('[!product]')) {
    errors.push(`Article "${slug}": body contains forbidden [!product] directive.`);
  }
  if (body.includes('<InlineProductBlock')) {
    errors.push(`Article "${slug}": body contains forbidden <InlineProductBlock /> JSX component.`);
  }
  if (body.includes('<ArticleFinalCta')) {
    errors.push(`Article "${slug}": body contains forbidden <ArticleFinalCta /> JSX component.`);
  }
  
  // Generic body CTA check (if it looks like a big promotional block)
  if (body.match(/^##\s+(Ready to|Try GoToFlow|Start creating)/im)) {
    warnings.push(`Article "${slug}": body might contain a hardcoded CTA section. Rely on finalCta instead.`);
  }
}

console.log(`\n🔍 FAQ + CTA Single Source Contract Check Results:`);
console.log(`- Scanned Articles: ${scannedCount}`);
console.log(`- Strict Targets: ${strictCount}`);
console.log(`- D53 Status: Audited`);

if (warnings.length > 0) {
  console.log(`\n⚠️ Warnings (${warnings.length}):`);
  warnings.slice(0, 10).forEach(w => console.log(`  - ${w}`));
  if (warnings.length > 10) console.log(`  ...and ${warnings.length - 10} more warnings`);
}

if (errors.length > 0) {
  console.error(`\n❌ Errors (${errors.length}):`);
  errors.forEach(e => console.error(`  - ${e}`));
  console.error(`\n❌ Check failed. Fix FAQ/CTA contract errors above.`);
  process.exit(1);
}

console.log(`\n✅ FAQ + CTA contract checks passed successfully.`);
