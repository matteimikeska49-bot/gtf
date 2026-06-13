import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  extractFrontmatterAndBody,
  isLivePublishedFrontmatter,
  stripCodeForTemplateGuardrails
} from './blog-template-guardrails.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const ARTICLES_DIR = path.join(ROOT, 'src/content/blog/articles');
const SOURCE_OF_TRUTH = path.join(ROOT, 'docs/product/gotoflow-capabilities.md');

const REQUIRED_SOURCE_PHRASES = [
  'GoToFlow — это end-to-end система создания каруселей',
  'Нельзя писать',
  'GoToFlow только пишет текст',
  'Canva делает дизайн, а GoToFlow только структуру'
];

const RULES = [
  {
    id: 'text-only-en',
    reason: 'GoToFlow must not be reduced to a text-only assistant.',
    re: /\bGoToFlow\b[^.\n]{0,80}\b(?:only|just)\b[^.\n]{0,30}\b(?:writes?|generates?|creates?)\b[^.\n]{0,30}\b(?:text|copy|content)\b/i
  },
  {
    id: 'text-generator-en',
    reason: 'GoToFlow must not be described as just a text generator or AI content assistant.',
    re: /\bGoToFlow\b[^.\n]{0,80}\b(?:is|as)\b[^.\n]{0,30}\b(?:just|only|simply)\b[^.\n]{0,30}\b(?:a\s+)?(?:text generator|AI content assistant|content assistant)\b/i
  },
  {
    id: 'structure-only-en',
    reason: 'GoToFlow must not be reduced to structure-only work.',
    re: /\bGoToFlow\b[^.\n]{0,80}\b(?:only|just)\b[^.\n]{0,30}\b(?:helps?|assists?|works?)\b[^.\n]{0,30}\b(?:with|on)\b[^.\n]{0,20}\bstructure\b/i
  },
  {
    id: 'prepare-then-design-en',
    reason: 'GoToFlow must not be framed as preparing content for design elsewhere.',
    re: /\bGoToFlow\b[^.\n]{0,100}\b(?:prepare|prepares|generate|generates|write|writes)\b[^.\n]{0,50}\b(?:content|copy|text)\b[^.\n]{0,80}\b(?:then|afterward|afterwards)\b[^.\n]{0,50}\b(?:design|Canva|another design tool|elsewhere)\b/i
  },
  {
    id: 'addon-after-tool-en',
    reason: 'GoToFlow must not be positioned as an add-on after Canva, Midjourney, ChatGPT, or Gemini.',
    re: /\b(?:use|open|try|need|needs?|needed)\b[^.\n]{0,50}\bGoToFlow\b[^.\n]{0,50}\bafter\b[^.\n]{0,30}\b(?:Canva|Midjourney|ChatGPT|Gemini)\b|\bGoToFlow\b[^.\n]{0,50}\b(?:after|following)\b[^.\n]{0,30}\b(?:Canva|Midjourney|ChatGPT|Gemini)\b/i
  },
  {
    id: 'canva-design-gotoflow-structure-en',
    reason: 'Canva comparisons must not say Canva does design while GoToFlow only handles structure.',
    re: /\bCanva\b[^.\n]{0,80}\bdesign\b[^.\n]{0,120}\bGoToFlow\b[^.\n]{0,80}\b(?:only|just)?[^.\n]{0,30}\bstructure\b/i
  },
  {
    id: 'random-generation-en',
    reason: 'GoToFlow must not be described as random carousel generation.',
    re: /\bGoToFlow\b[^.\n]{0,80}\b(?:random|randomly)\b[^.\n]{0,40}\b(?:generates?|creates?)\b[^.\n]{0,40}\bcarousels?\b/i
  },
  {
    id: 'negative-block-en',
    reason: 'SEO articles must not use negative GoToFlow framing blocks.',
    re: /^(?:#{1,4}\s*)?(?:Cons of GoToFlow|GoToFlow cons|Disadvantages of GoToFlow|Where GoToFlow is weaker|Why GoToFlow is worse)\b/im
  },
  {
    id: 'roadmap-weakness-en',
    reason: 'Roadmap items must not be framed as GoToFlow weaknesses.',
    re: /\bGoToFlow\b[^.\n]{0,80}\b(?:is not suitable|does not work|doesn't work|cannot|can't|does not allow|doesn't allow|is weak)\b[^.\n]{0,80}\b(?:seamless|panoramic|animation|animated|editable text|analytics|scenario|script|own photos?)\b/i
  },
  {
    id: 'text-only-ru',
    reason: 'GoToFlow нельзя сужать до генератора текста.',
    re: /\bGoToFlow\b[^.\n]{0,80}только[^.\n]{0,30}(?:пишет|генерирует|созда[её]т|готовит)[^.\n]{0,30}(?:текст|контент|копи)/i
  },
  {
    id: 'structure-only-ru',
    reason: 'GoToFlow нельзя сужать до работы только со структурой.',
    re: /\bGoToFlow\b[^.\n]{0,80}только[^.\n]{0,50}(?:структур|сценари|помогает[^.\n]{0,30}структур|работает[^.\n]{0,30}структур|делает[^.\n]{0,30}структур|собирает[^.\n]{0,30}структур)/i
  },
  {
    id: 'text-generator-ru',
    reason: 'GoToFlow нельзя описывать как текстовый генератор.',
    re: /(?:текстов(?:ый|ые|ого|ых)\s+генератор(?:ы|а|ов)?|генератор(?:ы|а|ов)?\s+текста)[^.\n]{0,80}(?:включая\s+)?GoToFlow\b|\bGoToFlow\b[^.\n]{0,80}(?:текстов(?:ый|ые|ого|ых)\s+генератор|генератор\s+текста)/i
  },
  {
    id: 'addon-after-tool-ru',
    reason: 'GoToFlow нельзя позиционировать как шаг после Canva, Midjourney, ChatGPT или Gemini.',
    re: /\bGoToFlow\b[^.\n]{0,60}(?:нужен|используется|используйте|подключайте)[^.\n]{0,30}после[^.\n]{0,30}\b(?:Canva|Midjourney|ChatGPT|Gemini)\b|(?:сначала|сперва)[^.\n]{0,80}\b(?:Canva|Midjourney|ChatGPT|Gemini)\b[^.\n]{0,80}(?:потом|затем)[^.\n]{0,50}\bGoToFlow\b/i
  },
  {
    id: 'canva-design-gotoflow-structure-ru',
    reason: 'Сравнение с Canva не должно сводить GoToFlow к структуре.',
    re: /\bCanva\b[^.\n]{0,80}дизайн[^.\n]{0,120}\bGoToFlow\b[^.\n]{0,80}(?:только[^.\n]{0,30})?структур/i
  },
  {
    id: 'random-generation-ru',
    reason: 'GoToFlow нельзя описывать как случайную генерацию каруселей.',
    re: /\bGoToFlow\b[^.\n]{0,80}генерирует[^.\n]{0,40}случайн(?:ые|ую|о)[^.\n]{0,40}карусел/i
  },
  {
    id: 'negative-block-ru',
    reason: 'В SEO-статьях нельзя использовать негативные блоки про GoToFlow.',
    re: /^(?:#{1,4}\s*)?(?:Минусы GoToFlow|Недостатки GoToFlow|Где GoToFlow слабее|Чего не хватает GoToFlow|Почему GoToFlow хуже)\b/im
  },
  {
    id: 'roadmap-weakness-ru',
    reason: 'Roadmap-фичи нельзя подавать как слабости GoToFlow.',
    re: /\bGoToFlow\b[^.\n]{0,80}(?:не подходит|не умеет|нельзя|нет|слаб(?:ее|о|ый)|не позволяет)[^.\n]{0,80}(?:seamless|бесшовн|панорам|анимац|анимирован|редактируем(?:ый|ого|ым)?\s+текст|аналитик|сценар|свои\s+фото|собственн(?:ые|ых)\s+фото)/i
  }
];

function assertSourceOfTruth() {
  if (!fs.existsSync(SOURCE_OF_TRUTH)) {
    console.error(`❌ Missing product source of truth: ${path.relative(ROOT, SOURCE_OF_TRUTH)}`);
    process.exit(1);
  }

  const text = fs.readFileSync(SOURCE_OF_TRUTH, 'utf8');
  const missing = REQUIRED_SOURCE_PHRASES.filter((phrase) => !text.includes(phrase));
  if (missing.length > 0) {
    console.error(`❌ Product source of truth is missing required phrases: ${missing.join('; ')}`);
    process.exit(1);
  }
}

function normalizeText(text) {
  return stripCodeForTemplateGuardrails(text)
    .replace(/`[^`\n]*`/g, '')
    .replace(/\*\*([^*\n]+)\*\*/g, '$1')
    .replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '$1')
    .replace(/__([^_\n]+)__/g, '$1')
    .replace(/\r/g, '');
}

function lineForIndex(text, index) {
  return text.slice(0, index).split('\n').length;
}

function findIssuesInText(text) {
  const normalized = normalizeText(text);
  const issues = [];

  for (const rule of RULES) {
    const match = rule.re.exec(normalized);
    if (!match) continue;

    const snippet = normalized
      .slice(Math.max(0, match.index - 70), Math.min(normalized.length, match.index + match[0].length + 70))
      .replace(/\s+/g, ' ')
      .trim();

    issues.push({
      ruleId: rule.id,
      reason: rule.reason,
      line: lineForIndex(normalized, match.index),
      snippet
    });
  }

  return issues;
}

function runSmokeTest() {
  const bad = 'Canva делает дизайн, а GoToFlow только структуру.';
  const good = 'Canva — ручной дизайн-редактор. GoToFlow — система создания готовой карусели от идеи до результата.';

  const badIssues = findIssuesInText(bad);
  const goodIssues = findIssuesInText(good);

  if (badIssues.length === 0) {
    console.error('❌ Smoke test failed: bad positioning example was not blocked.');
    process.exit(1);
  }

  if (goodIssues.length > 0) {
    console.error('❌ Smoke test failed: good positioning example produced a false positive.');
    goodIssues.forEach((issue) => console.error(`  - ${issue.ruleId}: ${issue.snippet}`));
    process.exit(1);
  }

  console.log('✅ Product positioning smoke test passed.');
  console.log(`- Bad example blocked by: ${badIssues.map((issue) => issue.ruleId).join(', ')}`);
  console.log('- Good Canva comparison accepted.');
}

function scanArticles() {
  const files = fs.readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith('.md') && !file.startsWith('_') && !file.startsWith('test-'));

  let scanned = 0;
  const errors = [];

  for (const file of files) {
    const filePath = path.join(ARTICLES_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { frontmatter, body } = extractFrontmatterAndBody(content);
    if (!isLivePublishedFrontmatter(frontmatter)) continue;

    scanned += 1;
    const issues = findIssuesInText(`${frontmatter}\n${body}`);
    for (const issue of issues) {
      errors.push(`[P0] ${file}:${issue.line} violates GoToFlow product source of truth (${issue.ruleId}). ${issue.reason} Snippet: "${issue.snippet}"`);
    }
  }

  console.log('\n🔍 Blog Product Positioning Check');
  console.log(`- Source of truth: ${path.relative(ROOT, SOURCE_OF_TRUTH)}`);
  console.log(`- Published articles scanned: ${scanned}`);
  console.log(`- Rules loaded: ${RULES.length}`);

  if (errors.length > 0) {
    console.error(`\n❌ Errors (${errors.length}):`);
    errors.forEach((error) => console.error(`  - ${error}`));
    console.error('\n❌ Product positioning check failed.');
    process.exit(1);
  }

  console.log('\n✅ Product positioning checks passed successfully.');
}

assertSourceOfTruth();

if (process.argv.includes('--smoke')) {
  runSmokeTest();
} else {
  scanArticles();
}
