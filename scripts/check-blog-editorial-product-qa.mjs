import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { extractFrontmatterAndBody, isLivePublishedFrontmatter } from './blog-template-guardrails.mjs';

const FORBIDDEN_PRODUCT_PHRASES = [
  "GoToFlow берет готовую идею из ChatGPT",
  "готовую идею из ChatGPT",
  "после ChatGPT",
  "import the refined text into GoToFlow",
  "after ChatGPT",
  "post-ChatGPT",
  "Canva add-on",
  "Midjourney add-on",
  "separate design tool replacement",
  "carousel draft",
  "carousel drafts",
  "draft carousel",
  "only creates drafts",
  "only formats text",
  "requires you to transcribe",
  "need to transcribe",
  "first need to convert the audio into text",
  "first need to convert the video into text",
  "must first transcribe",
  "must first extract key takeaways",
  "must first extract the key takeaways",
  "manual extraction before GoToFlow",
  "черновик карусели",
  "только форматирует текст",
  "сначала сделайте текстовую расшифровку",
  "вам потребуется получить транскрипт",
  "сначала получите транскрипт",
  "сначала выделите ключевые тезисы",
  "вручную выделить ключевые тезисы"
];

const RISKY_CLAIMS = [
  "guarantees",
  "guaranteed",
  "perfectly",
  "viral guarantee",
  "100%",
  "гарантирует",
  "гарантированный",
  "гарантированно"
];

// Check for all caps or specific bad microcopy
const FORBIDDEN_MICROCOPY = [
  "ЧИТАТЬ ТАКЖЕ",
  "READ NEXT"
];

const LEGACY_ARTICLES = [
  "ai-carousel-generator.md",
  "ai-carousel-maker-vs-manual-design.md",
  "ai-instagram-post-generator.md",
  "ai-social-media-manager.md",
  "b2b-case-study-linkedin-carousel.md",
  "b2b-keysy-v-linkedin-karusel.md",
  "best-instagram-carousel-examples.md",
  "content-calendar-to-carousel.md",
  "how-to-increase-instagram-engagement-with-carousels.md",
  "how-to-make-an-instagram-carousel-with-ai.md",
  "instagram-carousel-hooks.md",
  "instagram-carousel-ideas.md",
  "instagram-carousel-post.md",
  "linkedin-carousel-from-pdf-ai.md",
  "linkedin-carousel-size-and-specs.md",
  "linkedin-creator-tools-guide.md",
  "linkedin-document-post-examples.md",
  "linkedin-pdf-carousel.md",
  "tekst-v-karusel-neyroset.md",
  "text-to-carousel-ai.md"
];

function checkFile(filePath, content) {
  const errors = [];
  const fileName = path.basename(filePath);

  // Check Product Positioning
  FORBIDDEN_PRODUCT_PHRASES.forEach(phrase => {
    // Case-insensitive check
    const regex = new RegExp(phrase, 'i');
    if (regex.test(content)) {
      errors.push(`Forbidden product phrase found: "${phrase}"`);
    }
  });

  // Check Risky Claims (skip legacy articles)
  if (!LEGACY_ARTICLES.includes(fileName)) {
    RISKY_CLAIMS.forEach(phrase => {
      // Word boundary to avoid partial matches
      const regex = new RegExp(`\\b${phrase}\\b`, 'i');
      if (regex.test(content)) {
        errors.push(`Risky claim found: "${phrase}"`);
      }
    });
  }

  // Check Microcopy
  FORBIDDEN_MICROCOPY.forEach(phrase => {
    // Case-sensitive check for microcopy (we want to catch all caps)
    if (content.includes(phrase)) {
      errors.push(`Forbidden microcopy found: "${phrase}"`);
    }
  });

  return errors;
}

function runDraftLeaksCheck() {
  console.log('Running internal link flow check (Draft Leaks)...');
  try {
    // Execute the existing internal-link-flow check
    execSync('node scripts/check-blog-internal-link-flow.mjs', { stdio: 'inherit' });
    return true;
  } catch (e) {
    console.error('Draft Leaks check failed.');
    return false;
  }
}

function main() {
  console.log('Starting Editorial & Product QA Check...');
  
  const dir = 'src/content/blog/articles';
  const files = fs.readdirSync(dir)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(dir, file));
  let hasErrors = false;
  
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const { frontmatter } = extractFrontmatterAndBody(content);
    
    // Only enforce editorial/product QA rules on live published articles
    if (!isLivePublishedFrontmatter(frontmatter)) continue;

    const errors = checkFile(file, content);
    if (errors.length > 0) {
      console.error(`\n❌ Errors in ${file}:`);
      errors.forEach(e => console.error(`  - ${e}`));
      hasErrors = true;
    }
  }

  const draftsCheckPassed = runDraftLeaksCheck();
  if (!draftsCheckPassed) {
    hasErrors = true;
  }

  if (hasErrors) {
    console.error('\n❌ Editorial/Product QA Check FAILED. Please fix the errors above.');
    process.exit(1);
  } else {
    console.log('\n✅ Editorial/Product QA Check PASSED.');
  }
}

main();
