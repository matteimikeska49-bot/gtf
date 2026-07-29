import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');

const articlesDir = path.join(ROOT_DIR, 'src/content/blog/articles');
const clusterMapPath = path.join(ROOT_DIR, 'src/content/blog/cluster-authority-map.json');
const mockupRegistryPath = path.join(ROOT_DIR, 'src/content/blog/mockups/registry.json');
const mockupDecisionsPath = path.join(ROOT_DIR, 'src/content/blog/mockup-decisions.json');

const clusterMap = JSON.parse(fs.readFileSync(clusterMapPath, 'utf8'));
const mockupRegistry = JSON.parse(fs.readFileSync(mockupRegistryPath, 'utf8'));
const mockupDecisions = fs.existsSync(mockupDecisionsPath) ? JSON.parse(fs.readFileSync(mockupDecisionsPath, 'utf8')) : [];

const EN_PRODUCTS = ['/', '/ai-carousel-maker', '/ai-content-generator', '/ai-instagram-post-generator', '/ai-post-maker', '/linkedin-carousel-maker', '/carousel/create'];
const RU_PRODUCTS = ['/ru', '/ru/ii-generator-karuseley', '/ru/ii-generator-karuseley', '/ru/generator-kontenta', '/ru/generator-postov-instagram', '/ru/generator-karuselej-linkedin'];

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
    return m ? m[1].trim() : null;
  };

  data.slug = parseMatch(/^slug:\s*["']?([^"'\n]+?)["']?$/m);
  data.language = parseMatch(/^language:\s*["']?([^"'\n]+?)["']?$/m);
  data.title = parseMatch(/^title:\s*["']?([^"'\n]+?)["']?$/m);
  data.description = parseMatch(/^description:\s*["']?([^"'\n]+?)["']?$/m);
  data.canonical = parseMatch(/^canonical(?:Url)?:\s*["']?([^"'\n]+?)["']?$/m);
  data.clusterId = parseMatch(/^clusterId:\s*["']?([^"'\n]+?)["']?$/m);
  data.priorityTier = parseMatch(/^priorityTier:\s*["']?([^"'\n]+?)["']?$/m);

  data.published = /^published:\s*true\b/m.test(frontmatterStr);
  data.preview = /^preview:\s*true\b/m.test(frontmatterStr);
  data.noindex = /^noindex:\s*true\b/m.test(frontmatterStr);

  // Extract blocks to test language
  const quickAnswerMatch = frontmatterStr.match(/^quickAnswer:([\s\S]*?)(?:^[a-zA-Z]+:|\n---$)/m);
  if (quickAnswerMatch) data.quickAnswer = quickAnswerMatch[1];
  
  const faqMatch = frontmatterStr.match(/^faq:([\s\S]*?)(?:^[a-zA-Z]+:|\n---$)/m);
  if (faqMatch) data.faq = faqMatch[1];

  const ctaMatch = frontmatterStr.match(/^finalCta:([\s\S]*?)(?:^[a-zA-Z]+:|\n---$)/m);
  if (ctaMatch) data.finalCta = ctaMatch[1];

  return { data, body: match[2], frontmatterStr };
}

function countCyrillic(str) {
  if (!str) return 0;
  const matches = str.match(/[\u0400-\u04FF]/g);
  return matches ? matches.length : 0;
}

function countLatin(str) {
  if (!str) return 0;
  const matches = str.match(/[a-zA-Z]/g);
  return matches ? matches.length : 0;
}

function analyzeLanguageRatio(text) {
  if (!text) return { cyrillicRatio: 0, totalChars: 0 };
  const cyr = countCyrillic(text);
  const lat = countLatin(text);
  const total = cyr + lat;
  return {
    cyrillicRatio: total > 0 ? cyr / total : 0,
    totalChars: total
  };
}

files.forEach(file => {
  if (file.startsWith('test-')) return;
  scannedCount++;
  
  const content = fs.readFileSync(path.join(articlesDir, file), 'utf8');
  const { data, body, frontmatterStr } = extractData(content);
  data.slug = data.slug || file.replace('.md', '');
  
  const isD53 = d53Topics.includes(data.slug);
  const isStrict = isD53 || data.preview || data.noindex || !data.published || data.priorityTier === 'P1' || data.priorityTier === 'P2';

  if (!data.language || !['en', 'ru'].includes(data.language)) {
    if (isStrict) errors.push(`[P0] Article ${data.slug} missing valid 'language' (must be 'en' or 'ru').`);
    else warnings.push(`Legacy article ${data.slug} missing valid 'language'.`);
    return; // Can't proceed without language
  }

  // Check canonical
  if (data.canonical) {
    if (data.language === 'en' && data.canonical.includes('/ru/blog/')) {
      if (isStrict) errors.push(`[P0] Canonical Language Mismatch: EN article ${data.slug} uses RU canonical ${data.canonical}.`);
      else warnings.push(`Canonical Language Mismatch: EN article ${data.slug} uses RU canonical.`);
    }
    if (data.language === 'ru' && !data.canonical.includes('/ru/blog/')) {
      if (isStrict) errors.push(`[P0] Canonical Language Mismatch: RU article ${data.slug} uses EN canonical ${data.canonical}.`);
      else warnings.push(`Canonical Language Mismatch: RU article ${data.slug} uses EN canonical.`);
    }
  }

  // Check Product Routes usage in Frontmatter
  const productMatchRegex = /(?:url|href|secondaryHref|relatedProductRoute):\s*["']?(\/[^"'\s]+)["']?/g;
  let match;
  while ((match = productMatchRegex.exec(frontmatterStr)) !== null) {
    const url = match[1];
    if (data.language === 'ru' && EN_PRODUCTS.includes(url)) {
      if (isStrict) errors.push(`[P0] RU article ${data.slug} links to EN product route ${url}.`);
    }
    if (data.language === 'en' && RU_PRODUCTS.includes(url)) {
      if (isStrict) errors.push(`[P0] EN article ${data.slug} links to RU product route ${url}.`);
    }
  }

  // Check text content language
  const titleStats = analyzeLanguageRatio(data.title);
  const descStats = analyzeLanguageRatio(data.description);
  const bodyStats = analyzeLanguageRatio(body);
  const qaStats = analyzeLanguageRatio(data.quickAnswer);
  const faqStats = analyzeLanguageRatio(data.faq);
  const ctaStats = analyzeLanguageRatio(data.finalCta);

  if (data.language === 'ru') {
    if (titleStats.totalChars > 0 && titleStats.cyrillicRatio < 0.2) errors.push(`[P0] RU article ${data.slug} title lacks Cyrillic text.`);
    if (descStats.totalChars > 0 && descStats.cyrillicRatio < 0.2) errors.push(`[P0] RU article ${data.slug} description lacks Cyrillic text.`);
    if (bodyStats.totalChars > 0 && bodyStats.cyrillicRatio < 0.2) errors.push(`[P0] RU article ${data.slug} body lacks Cyrillic text.`);
    if (qaStats.totalChars > 0 && qaStats.cyrillicRatio < 0.2) errors.push(`[P0] RU article ${data.slug} quickAnswer lacks Cyrillic text.`);
    if (faqStats.totalChars > 0 && faqStats.cyrillicRatio < 0.2) errors.push(`[P0] RU article ${data.slug} faq lacks Cyrillic text.`);
    if (ctaStats.totalChars > 0 && ctaStats.cyrillicRatio < 0.2) errors.push(`[P0] RU article ${data.slug} finalCta lacks Cyrillic text.`);
    
    if (bodyStats.totalChars > 0 && bodyStats.cyrillicRatio < 0.8) warnings.push(`RU article ${data.slug} body contains a high amount of Latin characters (${((1-bodyStats.cyrillicRatio)*100).toFixed(1)}%). Check for mixed language.`);
  } else {
    // English
    if (titleStats.cyrillicRatio > 0.05) errors.push(`[P0] EN article ${data.slug} title contains Cyrillic.`);
    if (descStats.cyrillicRatio > 0.05) errors.push(`[P0] EN article ${data.slug} description contains Cyrillic.`);
    if (bodyStats.cyrillicRatio > 0.05) errors.push(`[P0] EN article ${data.slug} body contains Cyrillic.`);
    if (qaStats.cyrillicRatio > 0.05) errors.push(`[P0] EN article ${data.slug} quickAnswer contains Cyrillic.`);
    if (faqStats.cyrillicRatio > 0.05) errors.push(`[P0] EN article ${data.slug} faq contains Cyrillic.`);
    if (ctaStats.cyrillicRatio > 0.05) errors.push(`[P0] EN article ${data.slug} finalCta contains Cyrillic.`);
  }

  // Check cluster mapping language
  if (data.clusterId) {
    const cluster = clusterMap.find(c => c.clusterId === data.clusterId);
    if (cluster && cluster.language !== data.language) {
      if (isStrict) errors.push(`[P0] Language Mismatch: Article ${data.slug} is ${data.language} but mapped to ${cluster.language} cluster ${data.clusterId}.`);
    }
  }

  // Check Mockups
  // 1. Mockup shortcodes in body
  const mockupRegex = /:::mockup\s*\{([^}]+)\}/g;
  let mMatch;
  while ((mMatch = mockupRegex.exec(body)) !== null) {
    const props = mMatch[1];
    const assetIdMatch = props.match(/assetId=["']([^"']+)["']/);
    if (assetIdMatch) {
      const assetId = assetIdMatch[1];
      const asset = mockupRegistry.find(a => a.id === assetId);
      if (asset) {
        if (asset.language !== 'agnostic' && asset.language !== data.language) {
          if (isStrict) errors.push(`[P0] Mockup Language Mismatch: Article ${data.slug} uses mockup ${assetId} of language ${asset.language}.`);
          else warnings.push(`Mockup Language Mismatch: Legacy article ${data.slug} uses mockup ${assetId} of language ${asset.language}.`);
        }
        if (asset.visibleText === 'unknown') {
          warnings.push(`Article ${data.slug} uses mockup ${assetId} with 'unknown' visibleText.`);
        }
      }
    }
  }

  // 2. Mockup decisions
  const decision = mockupDecisions.find(d => d.topicSlug === data.slug);
  if (decision && decision.mockups) {
    decision.mockups.forEach(m => {
      const asset = mockupRegistry.find(a => a.id === m.assetId);
      if (asset && asset.language !== 'agnostic' && asset.language !== data.language) {
         if (isStrict) errors.push(`[P0] Mockup Decision Mismatch: Article ${data.slug} assigned mockup ${m.assetId} of language ${asset.language}.`);
      }
    });
  }

});

console.log(`\n🗣️ Language Consistency Check`);
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
  console.error(`\n❌ Language consistency check failed.`);
  process.exit(1);
}

console.log(`\n✅ Language consistency check passed successfully.`);
