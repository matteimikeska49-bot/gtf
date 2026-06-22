import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  extractFrontmatterAndBody,
  getYamlValue,
  getYamlBlock,
  isLivePublishedFrontmatter,
  findRawJsxLikeTags
} from './blog-template-guardrails.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const articlesDir = path.join(ROOT_DIR, 'src/content/blog/articles');

let errors = [];
let warnings = [];
let scannedCount = 0;
let strictCount = 0;

const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md') && f !== '_template.md');

const FORBIDDEN_OVERCLAIMS = [
    '$5000', '300%', '90%', '20% conversion', '3 hours → 15 minutes', '3 часа', '8 to 7-10', '<ArticleExploreZone', '<RelatedArticles', '<SecondaryCta', '<FinalCta', '<ArticleFinalCta', '<InlineProductBlock'
];

const BATCH_22_FILES = new Set([
    "reels-ili-karuseli-chto-vybrat",
    "kak-zarabatyvat-na-sozdanii-karuseley",
    "trendovye-shrifty-dlya-karuseley",
    "chatgpt-prompty-dlya-kopirajtera",
    "avtovoronka-v-instagram-cherez-karuseli",
    "struktura-prodayuschego-posta-v-telegram",
    "kak-vesti-telegram-kanal-biznesu",
    "kak-sdelat-shablon-dlya-postov-v-canva",
    "animaciya-v-karuselyah-instagram",
    "kak-pisat-prodayushchie-posty-s-ii",
    "kak-ispolzovat-midjourney-dlya-postov",
    "kak-sostavit-kontent-plan-s-pomoshyu-chatgpt",
    "how-to-increase-instagram-engagement-with-carousels",
    "how-to-scale-your-smm-agency-with-ai",
    "chatgpt-for-social-media-marketing",
    "linkedin-creator-tools-guide",
    "how-to-build-a-personal-brand-on-linkedin-with-ai",
    "instagram-carousel-storytelling",
    "viral-linkedin-post-examples",
    "ai-social-media-manager",
    "ii-post-dlya-socsetej",
    "kakoy-ii-sozdast-post-karusel",
    "gde-delat-posty-karuseli-s-ii",
    "ai-content-creation",
    "ai-content-writing"
]);

for (const file of files) {
  scannedCount++;
  const filePath = path.join(articlesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  const { frontmatter, body } = extractFrontmatterAndBody(content);
  if (!frontmatter) continue;

  const isLivePublished = isLivePublishedFrontmatter(frontmatter);
  const slug = getYamlValue(frontmatter, 'slug') || file.replace('.md', '');

  // For this rule we only care about newly published articles or those that are in Batch 22 explicitly.
  // We apply the strict V2 layout contract to all published articles unless they are legacy explicitly ignored.
  // We'll enforce this for all articles that are published = true and noindex = false.
  
  if (!isLivePublished || slug.startsWith('test-')) {
      continue;
  }
  
  const createdAt = getYamlValue(frontmatter, 'createdAt');
  
  // Enforce strict V2 layout rules ONLY on Batch 22 and any newly created articles (>= 2026-06-13).
  // Older articles remain untouched unless they are part of the new enforcement scope.
  let isNewOrBatch = BATCH_22_FILES.has(slug);
  if (!isNewOrBatch && createdAt && createdAt >= "2026-06-13") {
      isNewOrBatch = true;
  }
  
  if (!isNewOrBatch) {
      continue;
  }

  strictCount++;

  // 1. Check Frontmatter for date block
  const hasLastReviewed = getYamlValue(frontmatter, 'lastReviewed');
  const hasUpdatedAt = getYamlValue(frontmatter, 'updatedAt');
  const hasPublishedAt = getYamlValue(frontmatter, 'publishedAt');
  const hasDate = getYamlValue(frontmatter, 'date');
  
  if (!hasLastReviewed && !hasUpdatedAt && !hasPublishedAt && !hasDate) {
      errors.push(`Article "${slug}": frontmatter is missing a date field required for the V2 meta block (lastReviewed, updatedAt, etc).`);
  }

  // 2. Check Frontmatter for Quick Answer
  const quickAnswerBlock = getYamlBlock(frontmatter, 'quickAnswer');
  const qaTitle = getYamlValue(frontmatter, 'quickAnswerTitle');
  if (!quickAnswerBlock.exists || quickAnswerBlock.lines.length === 0) {
      errors.push(`Article "${slug}": frontmatter quickAnswer is missing or empty.`);
  }
  if (!qaTitle) {
      errors.push(`Article "${slug}": frontmatter quickAnswerTitle is missing.`);
  }

  // 3. Check Frontmatter for Core V2 Elements
  const faqBlock = getYamlBlock(frontmatter, 'faq');
  const exploreBlock = getYamlBlock(frontmatter, 'explore');
  const ctaBlock = getYamlBlock(frontmatter, 'finalCta');
  
  if (!faqBlock.exists || !exploreBlock.exists || !ctaBlock.exists) {
      errors.push(`Article "${slug}": frontmatter must contain 'faq', 'explore', and 'finalCta' blocks.`);
  }

  // 4. Check Body for V2 layout markers (at least one)
  const hasV2Layout = body.includes(':::cards') || 
                      body.includes('[!takeaway]') || 
                      body.includes('[!tip]') || 
                      body.includes('[!workflow]') || 
                      body.includes('[!mistake]') || 
                      body.includes(':::mockup') ||
                      body.includes(':::prompts');
                      
  if (!hasV2Layout) {
      errors.push(`Article "${slug}": body is missing V2 layout markers (cards, callouts, mockups). Plain markdown is not allowed for V2 published SEO articles.`);
  }

  
  // 6. Enforce Mockups for V2 Articles
  const mockupStatus = getYamlValue(frontmatter, 'mockupStatus');
  const mockupReason = getYamlValue(frontmatter, 'mockupReason') || '';
  
  if (mockupStatus === 'not_available' && BATCH_22_FILES.has(slug)) {
      if (mockupReason.length < 30 || (!mockupReason.includes('system exception') && !mockupReason.includes('no-ui-required'))) {
          errors.push(`Article "${slug}": mockupStatus is 'not_available' without a strict system reason. Must include 'system exception' or 'no-ui-required' and be >30 chars.`);
      }
  }
  
  const hasMockupMarker = body.includes(':::mockup');
  if (!hasMockupMarker && mockupStatus === 'present') {
      errors.push(`Article "${slug}": mockupStatus is 'present' but body is missing ':::mockup'.`);
  }

  // 5. Check Body for Forbidden tags/patterns
  const cleanBody = body.replace(/`[^`]*`/g, ''); // strip inline code blocks for basic search
  if (cleanBody.includes('---')) {
      errors.push(`Article "${slug}": body contains standalone '---' which is forbidden.`);
  }
  if (cleanBody.match(/href=["'][^"']*\*[^"']*["']/i) || cleanBody.match(/\]\([^)]*\*[^)]*\)/)) {
      errors.push(`Article "${slug}": body contains an href with a literal '*'.`);
  }
  
  for (const claim of FORBIDDEN_OVERCLAIMS) {
      if (cleanBody.includes(claim)) {
          errors.push(`Article "${slug}": body contains forbidden phrase/tag: '${claim}'.`);
      }
  }
}

console.log(`\n🔍 V2 Layout Contract Check Results:`);
console.log(`- Scanned Articles: ${scannedCount}`);
console.log(`- Strict Published Targets: ${strictCount}`);

if (errors.length > 0) {
  console.error(`\n❌ Errors (${errors.length}):`);
  errors.forEach(e => console.error(`  - ${e}`));
  console.error(`\n❌ Check failed. Fix V2 layout contract errors above.`);
  process.exit(1);
}

console.log(`\n✅ V2 Layout contract checks passed successfully.`);
