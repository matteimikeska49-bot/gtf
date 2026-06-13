import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  extractFrontmatterAndBody,
  findVisiblePlatformFootnoteMarkers,
  findRawJsxLikeTags,
  getYamlValue
} from './blog-template-guardrails.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const ARTICLES_DIR = path.join(ROOT, 'src/content/blog/articles');

const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md') && f !== '_template.md');
const d53Topics = ['text-to-carousel-ai', 'instagram-carousel-hooks', 'tekst-v-karusel-neyroset', 'content-calendar-to-carousel', 'b2b-keysy-v-linkedin-karusel'];

let scannedCount = 0;
let errors = [];
let warnings = [];

function extractData(content) {
  const { frontmatter: frontmatterStr, body } = extractFrontmatterAndBody(content);
  if (!frontmatterStr) return { data: {}, body };

  const data = {};
  
  const parseMatch = (regex) => {
    const m = frontmatterStr.match(regex);
    return m ? m[1].trim().replace(/^["']|["']$/g, '') : null;
  };

  data.slug = parseMatch(/^slug:\s*(.*)$/m);
  data.mockupStatus = parseMatch(/^mockupStatus:\s*(.*)$/m);
  data.preview = getYamlValue(frontmatterStr, 'preview') === true;
  data.published = getYamlValue(frontmatterStr, 'published');
  data.noindex = getYamlValue(frontmatterStr, 'noindex');
  data.priorityTier = parseMatch(/^priorityTier:\s*(.*)$/m);
  
  const faqMatch = frontmatterStr.match(/^faq:([\s\S]*?)(?:^[a-zA-Z]+:|\n---$)/m);
  data.faqStr = faqMatch ? faqMatch[1] : null;

  data.finalCta = /^finalCta:/m.test(frontmatterStr);

  return { data, body };
}

files.forEach(file => {
  if (file.startsWith('test-')) return;
  scannedCount++;
  
  const content = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf8');
  const { data, body } = extractData(content);
  data.slug = data.slug || file.replace('.md', '');
  const isD53 = d53Topics.includes(data.slug);
  const isStrict = isD53 || data.preview || data.priorityTier === 'P1' || data.priorityTier === 'P2';
  
  // Duplicate H1 check
  const h1Match = body.match(/^#\s/gm);
  if (h1Match && h1Match.length > 0) {
    const msg = `Article ${data.slug} contains raw markdown H1 ('#'). H1 must only come from frontmatter 'title'.`;
    warnings.push(msg);
  }

  // Duplicate FAQ
  const hasBodyFaq = body.match(/^##\s+(?:Frequently Asked Questions|Часто задаваемые вопросы)(?:\s+\(FAQ\))?\s*$/im);
  if (hasBodyFaq && data.faqStr && data.faqStr.trim().length > 0) {
    errors.push(`[P0] Article ${data.slug} has frontmatter FAQ AND body FAQ heading. This causes duplicate rendering.`);
  }

  // Body CTA checks
  if (data.finalCta && body.match(/^##\s+(?:Ready to|Get Started|Try GoToFlow|Готовы попробовать)/im)) {
    // Just a warning, some articles might have an H2 that looks like a CTA
    warnings.push(`Article ${data.slug} might have duplicate CTA heading in body alongside finalCta: true.`);
  }

  // Raw JSX-like component tags must never be emitted in markdown body.
  const rawJsxTags = findRawJsxLikeTags(body);
  if (rawJsxTags.length > 0) {
    errors.push(`[P0] Article ${data.slug} contains raw JSX-like component tag(s) in markdown body: ${rawJsxTags.join(', ')}`);
  }

  const frontmatterPlatformMarkers = findVisiblePlatformFootnoteMarkers(content.match(/^---\s*\n([\s\S]*?)\n---/)?.[1] || '');
  const bodyPlatformMarkers = findVisiblePlatformFootnoteMarkers(body);
  [...frontmatterPlatformMarkers, ...bodyPlatformMarkers].forEach((finding) => {
    errors.push(`[P0] Article ${data.slug} contains visible platform footnote marker "${finding.marker}" on line ${finding.line}: ${finding.text}`);
  });

  // Raw Artifact Checks
  const badArtifacts = [
      'if exists', 'if available', 'future cross-link after publication', 'else / fallback'
  ];
  badArtifacts.forEach(str => {
    if (body.includes(str)) {
      errors.push(`[P0] Article ${data.slug} contains raw artifact leaked: "${str}"`);
    }
  });
  
  // Specific regex checks for markdown italic wrapper artifacts *(...)*, avoiding **(...)**
  if (/(?<!\*)\*\([^)]+\)\*(?!\*)/.test(body)) {
    errors.push(`[P0] Article ${data.slug} contains raw artifact leaked: "*(...)*"`);
  }

  // Mockup leaking
  if (data.mockupStatus === 'not_available' && body.includes(':::mockup')) {
    errors.push(`[P0] Article ${data.slug} has mockupStatus: not_available but contains :::mockup directives.`);
  }

  // Empty Mockup block
  if (body.match(/:::mockup\{\s*\}\s*:::/)) {
    errors.push(`[P0] Article ${data.slug} has empty :::mockup wrappers.`);
  }
});

console.log(`\n🔍 Source Render Check`);
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
  console.error(`\n❌ Source Render Check failed.`);
  process.exit(1);
}

console.log(`\n✅ Source Render Check passed successfully.`);
