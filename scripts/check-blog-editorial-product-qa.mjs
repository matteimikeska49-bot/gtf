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
  "generate a draft",
  "review the draft",
  "draft ready",
  "copy-ready structure",
  "copy-ready carousel results",
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
  "сгенерируйте черновик",
  "получите черновик",
  "соберите черновик",
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

const EXTERNAL_AI_SERVICE_PATTERN = /\b(ChatGPT|Claude|Gemini|Midjourney|OpenAI|Anthropic|Cloud|cloud)\b|Клод|Клауд|клауд/u;

const RU_AI_AVAILABILITY_REQUIREMENTS = [
  {
    label: 'Russia availability/support-region note',
    pattern: /(официально\s+недоступн|недоступн[а-я\s]+из\s+РФ|поддерживаем[а-я\s]+регион)/iu
  },
  {
    label: 'Russian bank card warning',
    pattern: /(российск[а-я\s]+банк[а-я\s]+карт|российск[а-я\s]+карт[а-я\s]+(?:не\s+принима|нельзя\s+считать|могут\s+не\s+приним))/iu
  },
  {
    label: 'foreign payment method note',
    pattern: /зарубежн[а-я\s]+способ\s+оплат/iu
  },
  {
    label: 'prices/limits may change note',
    pattern: /цены[а-я,\s]+лимит[а-я,\s]+доступност[а-я\s]+могут\s+меняться/iu
  },
  {
    label: 'GoToFlow Russia availability bridge',
    pattern: /GoToFlow\s+доступен\s+в\s+РФ/iu
  },
  {
    label: 'GoToFlow Russian cards bridge',
    pattern: /GoToFlow[\s\S]{0,220}принимает\s+российск[а-я\s]+карт/iu
  }
];

const RU_AI_PRICING_PATTERN = /(ChatGPT|Claude|Gemini|Midjourney|OpenAI|Anthropic)[\s\S]{0,160}(\$\d+|стоит\s+\$|тариф|цена|стоимость|Plus|Pro|Max)/iu;
const RU_AI_PRICING_FRESHNESS_PATTERN = /на\s+момент\s+обновления\s+статьи\s+в\s+[а-яё]+\s+20\d{2}\s+года/iu;

// Check for all caps or specific bad microcopy
const FORBIDDEN_MICROCOPY = [
  "ЧИТАТЬ ТАКЖЕ",
  "READ NEXT"
];

import { MOCKUP_POSITIONING_POLICY } from '../src/lib/blog/productPositioningPolicy.js';

function getActiveArticleFiles() {
  const activeFiles = new Set();
  const args = process.argv.slice(2);
  args.forEach(arg => {
    if (arg.includes('src/content/blog/articles/')) {
      activeFiles.add(path.resolve(arg));
    }
  });
  if (activeFiles.size > 0) return Array.from(activeFiles);
  try {
    const diff = execSync('git diff --name-only', { encoding: 'utf-8' });
    const cachedDiff = execSync('git diff --cached --name-only', { encoding: 'utf-8' });
    let allDiffs = diff + '\n' + cachedDiff;
    if (!allDiffs.trim()) {
      const headDiff = execSync('git diff --name-only HEAD~1..HEAD', { encoding: 'utf-8' });
      allDiffs = headDiff;
    }
    allDiffs.split('\n').forEach(line => {
      if (line.includes('src/content/blog/articles/') && line.endsWith('.md')) {
        activeFiles.add(path.resolve(line.trim()));
      }
    });
  } catch (e) {
    console.error("Exec error:", e);
  }
  return Array.from(activeFiles);
}

const activeArticleFiles = getActiveArticleFiles();

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

function analyzeSection(sectionText, heading, errors, warnings, isActive) {
  const textLower = sectionText.toLowerCase();

  const hasCompetitor = MOCKUP_POSITIONING_POLICY.competitorAndGenericKeywords.some(kw => textLower.includes(kw));
  const hasRiskyVerb = MOCKUP_POSITIONING_POLICY.riskyRecommendationVerbs.some(kw => textLower.includes(kw));

  if (hasCompetitor && hasRiskyVerb) {
    const hasBridge = MOCKUP_POSITIONING_POLICY.productBridgeKeywords.some(kw => textLower.includes(kw));
    if (!hasBridge) {
      const msg = `Competitor/generic recommendation without GoToFlow product bridge under heading: "${heading}"`;
      if (isActive) {
        errors.push(`[P0] ${msg}`);
      } else {
        warnings.push(`[P1] ${msg}`);
      }
    }
  }
}

function checkFile(filePath, content, frontmatter, isActive) {
  const errors = [];
  const warnings = [];
  // Check that title does NOT contain | GoToFlow
  if (frontmatter.title && frontmatter.title.toLowerCase().includes('gotoflow')) {
    errors.push(`Visible title must NOT contain the brand name 'GoToFlow'. The system automatically appends it for SEO tags. Found in: "${frontmatter.title}"`);
  }

  const fileName = path.basename(filePath);
  const language = frontmatter.language || '';
  const slug = frontmatter.slug || '';
  const canonical = frontmatter.canonical || '';
  const isRuArticle = language === 'ru' || slug.startsWith('ru/') || canonical.includes('/ru/blog/');

  if (isRuArticle && EXTERNAL_AI_SERVICE_PATTERN.test(content)) {
    RU_AI_AVAILABILITY_REQUIREMENTS.forEach(({ label, pattern }) => {
      if (!pattern.test(content)) {
        const msg = `RU external AI service mention missing required availability/payment note component: ${label}`;
        if (isActive) {
          errors.push(`[P0] ${msg}`);
        } else {
          warnings.push(`[P1] ${msg}`);
        }
      }
    });

    if (RU_AI_PRICING_PATTERN.test(content) && !RU_AI_PRICING_FRESHNESS_PATTERN.test(content)) {
      const msg = 'RU external AI pricing mention must use freshness wording like "на момент обновления статьи в июле 2026 года".';
      if (isActive) {
        errors.push(`[P0] ${msg}`);
      } else {
        warnings.push(`[P1] ${msg}`);
      }
    }
  }

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

  // Check Semantic Product Positioning in Risky Sections
  const lines = content.split('\n');
  let currentHeading = null;
  let isInsideRiskySection = false;
  let sectionContent = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('#')) {
      if (isInsideRiskySection && sectionContent.length > 0) {
        analyzeSection(sectionContent.join('\n'), currentHeading, errors, warnings, isActive);
      }
      currentHeading = line;
      sectionContent = [];
      isInsideRiskySection = MOCKUP_POSITIONING_POLICY.riskyRecommendationHeadingKeywords.some(kw => line.toLowerCase().includes(kw));
    } else if (isInsideRiskySection) {
      sectionContent.push(line);
    }
  }
  if (isInsideRiskySection && sectionContent.length > 0) {
    analyzeSection(sectionContent.join('\n'), currentHeading, errors, warnings, isActive);
  }

  return { errors, warnings };
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

    const isActive = activeArticleFiles.includes(path.resolve(file));
    const { errors, warnings } = checkFile(file, content, frontmatter, isActive);

    if (errors.length > 0 || warnings.length > 0) {
      if (errors.length > 0) {
        console.error(`\n❌ Errors in ${file}:`);
        errors.forEach(e => console.error(`  - ${e}`));
        hasErrors = true;
      }
      if (warnings.length > 0) {
        console.warn(`\n⚠️ Warnings in ${file}:`);
        warnings.forEach(w => console.warn(`  - ${w}`));
      }
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
