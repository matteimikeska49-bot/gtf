import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const ARTICLES_DIR = path.join(ROOT, 'src/content/blog/articles');
const DIST_DIR = path.join(ROOT, 'dist');

const STRICT_SLUGS = new Set([
  'best-linkedin-carousel-examples',
  'primery-karuseley-linkedin',
  'youtube-to-linkedin-carousel-ai',
  'kak-peredelat-youtube-v-karusel-linkedin',
  'linkedin-carousel-hooks'
]);

const SOURCE_FORBIDDEN = [
  'draft carousel',
  'generate a draft',
  'draft in seconds',
  'carousel draft',
  'rough draft',
  'starter draft',
  'turn into a carousel draft',
  'черновик',
  'соберите черновик',
  'zero extra effort',
  'start repurposing today'
];

const OVERCLAIMS_YT = [
  'ai handles the entire workflow',
  'zero extra effort',
  'perfect transcript',
  'fully automatic publishing',
  'direct linkedin publishing',
  'unlimited video handling'
];

const normalizeScalar = (value) => {
  const trimmed = String(value || '').trim().replace(/^"|"$/g, '').replace(/^'|'$/g, '');
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (trimmed === 'null') return null;
  return trimmed;
};

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]+?)\n---/);
  if (!match) return { yaml: '', frontmatter: {}, body: content };

  const yaml = match[1];
  const body = content.slice(match[0].length);
  const frontmatter = {};
  const lines = yaml.split('\n');

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const kvMatch = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (!kvMatch) continue;

    const key = kvMatch[1];
    const rawValue = kvMatch[2];
    if (rawValue.trim()) {
      frontmatter[key] = normalizeScalar(rawValue);
      continue;
    }

    if (key === 'faq') {
      const questions = [];
      let cursor = index + 1;
      while (cursor < lines.length && !lines[cursor].match(/^[a-zA-Z0-9_]+:/)) {
        const question = lines[cursor].match(/^\s+-\s+question:\s*["']?(.+?)["']?\s*$/);
        if (question) questions.push(question[1].replace(/^"|"$/g, ''));
        cursor += 1;
      }
      frontmatter.faq = questions;
      continue;
    }

    if (key === 'finalCta') {
      frontmatter.finalCta = true;
    }
  }

  return { yaml, frontmatter, body };
}

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const hasMarkdownFaqSection = (body) =>
  /^##\s+(?:Frequently Asked Questions|Часто задаваемые вопросы)(?:\s+\(FAQ\))?\s*$/im.test(body);

const getMarkdownFaqCount = (body) => {
  const faqSectionMatch = body.match(/^##\s+(?:Frequently Asked Questions|Часто задаваемые вопросы)(?:\s+\(FAQ\))?\s*$([\s\S]*?)(?=\n##\s+|$)/im);
  if (!faqSectionMatch) return 0;
  const h3Match = faqSectionMatch[1].match(/^###\s+/gm);
  return h3Match ? h3Match.length : 0;
};

const hasMarkdownProductCta = (body) => body.includes('> [!product]');

const isStrictArticle = (frontmatter) => STRICT_SLUGS.has(frontmatter.slug);

function addIssue({ errors, warnings, strict, message }) {
  if (strict) {
    errors.push(message);
  } else {
    warnings.push(message);
  }
}

function checkRenderedHtml({ frontmatter, strict, errors, warnings }) {
  const slug = frontmatter.slug;
  const language = frontmatter.language === 'ru' ? 'ru' : 'en';
  if (!slug) return;

  const htmlPath = path.join(DIST_DIR, language === 'ru' ? 'ru/blog' : 'blog', slug, 'index.html');
  if (!fs.existsSync(htmlPath)) return;

  const html = fs.readFileSync(htmlPath, 'utf8');
  const lowerHtml = html.toLowerCase();
  const renderedErrors = [];

  SOURCE_FORBIDDEN.forEach((phrase) => {
    if (lowerHtml.includes(phrase)) {
      renderedErrors.push(`Rendered HTML forbidden wording found: "${phrase}"`);
    }
  });

  const hasDetailsFaq = /<details\b/i.test(html);
  const hasMarkdownFaqHeading = language === 'ru'
    ? /Часто задаваемые[\s\S]{0,220}вопросы\s*\(FAQ\)/i.test(html)
    : /Frequently Asked[\s\S]{0,220}Questions\s*\(FAQ\)/i.test(html);
  if (hasDetailsFaq && hasMarkdownFaqHeading) {
    renderedErrors.push('Rendered HTML contains both markdown FAQ heading and frontmatter FAQ details block.');
  }

  const hasFrontmatterCta = Boolean(frontmatter.finalCta) && /https:\/\/app\.gotoflow\.io/i.test(html);
  const hasMarkdownProductBlock = /PRODUCT WORKFLOW|ИНСТРУМЕНТ ИЛИ ПРОЦЕСС/i.test(html);
  if (hasFrontmatterCta && hasMarkdownProductBlock) {
    renderedErrors.push('Rendered HTML contains both markdown product CTA block and frontmatter FinalCta block.');
  }

  renderedErrors.forEach((message) => addIssue({ errors, warnings, strict, message }));
}

function checkArticle(file) {
  if (file.startsWith('test-') || file.includes('seo-template')) {
    return { file, errors: [], warnings: [] };
  }

  const filePath = path.join(ARTICLES_DIR, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const { frontmatter, body } = parseFrontmatter(content);
  const errors = [];
  const warnings = [];
  const strict = isStrictArticle(frontmatter);
  const lowerBody = body.toLowerCase();

  const frontmatterFaqCount = Array.isArray(frontmatter.faq) ? frontmatter.faq.length : 0;
  const markdownFaqCount = getMarkdownFaqCount(body);
  const hasFrontmatterFaq = frontmatterFaqCount > 0;
  const hasBodyFaq = hasMarkdownFaqSection(body);
  const faqCount = Math.max(frontmatterFaqCount, markdownFaqCount);

  if (faqCount < 5) {
    addIssue({
      errors,
      warnings,
      strict,
      message: `FAQ count is ${faqCount}. Must be >= 5.`
    });
  }

  if (strict && hasFrontmatterFaq && hasBodyFaq) {
    errors.push('Duplicate FAQ sources: strict article has both frontmatter faq and markdown FAQ section.');
  }

  const hasProductBlock = hasMarkdownProductCta(body);
  const hasFinalCtaFrontmatter = Boolean(frontmatter.finalCta);
  const relatedRoute = frontmatter.relatedProductRoute || '';
  const hasRelatedRouteLink = relatedRoute
    ? new RegExp(`\\]\\(${escapeRegExp(relatedRoute)}\\)`, 'i').test(body)
    : false;

  if (!hasProductBlock && !hasFinalCtaFrontmatter && (!relatedRoute || !hasRelatedRouteLink)) {
    addIssue({
      errors,
      warnings,
      strict,
      message: 'Weak Final CTA. Must use finalCta frontmatter or link to relatedProductRoute.'
    });
  }

  if (strict && hasFinalCtaFrontmatter && hasProductBlock) {
    errors.push('Duplicate CTA sources: strict article has both finalCta frontmatter and markdown [!product] block.');
  }

  SOURCE_FORBIDDEN.forEach((phrase) => {
    if (lowerBody.includes(phrase)) {
      addIssue({
        errors,
        warnings,
        strict,
        message: `Forbidden user-facing wording found: "${phrase}"`
      });
    }
  });

  const titleSlug = `${frontmatter.title || ''} ${frontmatter.slug || ''}`;
  if (titleSlug.toLowerCase().includes('examples') || titleSlug.toLowerCase().includes('примеры')) {
    const exampleMatch = body.match(/^### (?:\d+\.|Example|Пример)/gm);
    const exampleCount = exampleMatch ? exampleMatch.length : 0;
    if (exampleCount < 5) {
      addIssue({
        errors,
        warnings,
        strict,
        message: `Examples article has only ${exampleCount} examples. Must be >= 5.`
      });
    }
  }

  const titleMatch = frontmatter.title ? frontmatter.title.match(/(\d+)\s+.*(?:hooks|идеи|примера|промптов)/i) : null;
  if (titleMatch) {
    const promisedCount = parseInt(titleMatch[1], 10);
    const h3Match = body.match(/^### /gm);
    const h3Count = h3Match ? h3Match.length : 0;
    const hookItems = body.match(/(?:Hook Formula|Пример|Идея)\s+\d+|###\s+(?:Hook|Formula|Пример|Идея|\d+\.)/gi);
    const hookCount = hookItems ? hookItems.length : h3Count;

    if (hookCount < promisedCount) {
      addIssue({
        errors,
        warnings,
        strict,
        message: `Numeric title mismatch: promised ${promisedCount}, found approx ${hookCount}`
      });
    }
  }

  if (titleSlug.toLowerCase().includes('youtube')) {
    OVERCLAIMS_YT.forEach((phrase) => {
      if (lowerBody.includes(phrase)) {
        errors.push(`Overpromise found in YouTube article: "${phrase}"`);
      }
    });
  }

  checkRenderedHtml({ frontmatter, strict, errors, warnings });

  return { file, errors, warnings };
}

function runCheck() {
  console.log('🔍 Starting Content Template Check...');
  const files = fs.readdirSync(ARTICLES_DIR).filter((file) => file.endsWith('.md') && file !== '_template.md');

  let totalErrors = 0;
  let totalWarnings = 0;

  files.forEach((file) => {
    const { errors, warnings } = checkArticle(file);
    if (errors.length > 0 || warnings.length > 0) {
      console.log(`\n📄 ${file}`);
      warnings.forEach((warning) => {
        console.log(`  ⚠️ WARN: ${warning}`);
        totalWarnings += 1;
      });
      errors.forEach((error) => {
        console.log(`  ❌ ERR:  ${error}`);
        totalErrors += 1;
      });
    }
  });

  console.log('\n=============================================');
  console.log('Content Template Results');
  console.log('=============================================');
  console.log(`Checked:  ${files.length} articles`);
  console.log(`Errors:   ${totalErrors}`);
  console.log(`Warnings: ${totalWarnings}`);
  console.log(`Can proceed: ${totalErrors === 0 ? 'yes' : 'no'}`);

  if (totalErrors > 0) {
    console.log('\n❌ FAIL: Content template check failed.');
    process.exit(1);
  }

  console.log('\n✅ PASS: Content template check passed.');
  process.exit(0);
}

runCheck();
