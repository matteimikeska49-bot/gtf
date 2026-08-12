import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  extractFrontmatterAndBody,
  getYamlBlock,
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
  'GoToFlow input capabilities',
  'VIDEO / REELS / AUDIO / MANUALLY COPIED TEXT FROM PDF',
  'AI сам посмотрит видео, сделает транскрипцию и выделит суть',
  'GoToFlow helps turn a topic, script, text, link, Reels, YouTube or TikTok video, audio, manually copied text from a PDF, image, screenshot, or user photo',
  'GoToFlow product-positive comparison rule',
  'Do not position GoToFlow outputs as drafts.',
  'Нельзя писать',
  'GoToFlow только пишет текст',
  'Canva делает дизайн, а GoToFlow только структуру'
];

const VISIBLE_FRONTMATTER_KEYS = [
  'title',
  'description',
  'quickAnswerTitle',
  'quickAnswer',
  'faq',
  'explore',
  'finalCta'
];

const PRODUCT_COPY_ROOTS = [
  path.join(ROOT, 'src/components'),
  path.join(ROOT, 'src/i18n'),
  path.join(ROOT, 'src/data/faqSchemaData.js')
];

const DRAFT_OUTPUT_RULES = [
  {
    id: 'draft-output-en',
    reason: 'Visible product copy must promise a finished or publish-ready result, not a draft.',
    re: /\b(?:first[-\s]?draft|drafts?|copy[-\s]?ready)\b/i
  },
  {
    id: 'draft-output-ru',
    reason: 'Видимый продуктовый текст должен обещать готовый результат, а не черновик.',
    re: /чернов(?:ик(?:а|и|ов|ом|у)?|ая|ую|ые|ых|ой|ыми?)/i
  }
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
    id: 'post-chatgpt-formatter-en',
    reason: 'GoToFlow must not be framed as a post-ChatGPT formatter.',
    re: /\b(?:post-ChatGPT formatter|import the refined text into GoToFlow|copy your refined text[^.\n]{0,80}\bGoToFlow\b|refined text[^.\n]{0,80}\bGoToFlow\b)\b/i
  },
  {
    id: 'manual-transcript-required-en',
    reason: 'GoToFlow must not be framed as requiring users to transcribe video or audio elsewhere first.',
    re: /\b(?:you\s+)?(?:first\s+)?(?:need|must|have)\s+to\s+(?:convert|transcribe|run|get|create|make)[^.\n]{0,80}\b(?:audio|video|file|recording|podcast|webinar)\b[^.\n]{0,80}\b(?:text|transcript|transcription|transcription tool)\b|\bGoToFlow\b[^.\n]{0,100}\b(?:requires?|needs?|only works if)\b[^.\n]{0,80}\b(?:transcript|transcription|key takeaways|manual extraction)\b/i
  },
  {
    id: 'manual-takeaways-required-en',
    reason: 'GoToFlow must not be framed as requiring manual extraction of key takeaways first.',
    re: /\b(?:must|need to|have to|first)\b[^.\n]{0,60}\b(?:extract|identify|pull|prepare)\b[^.\n]{0,40}\b(?:key takeaways|takeaways|aha moments)\b[^.\n]{0,80}\b(?:before|then|to use|into GoToFlow)\b/i
  },
  {
    id: 'draft-only-en',
    reason: 'GoToFlow must not be framed as only creating carousel drafts.',
    re: /\b(?:carousel draft|carousel drafts|draft carousel|only creates drafts|only creates carousel drafts)\b/i
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
    re: /^(?:#{1,4}\s*)?(?:Cons of GoToFlow|GoToFlow cons|Disadvantages of GoToFlow|GoToFlow weaknesses|Weaknesses of GoToFlow|GoToFlow limitations|Limitations of GoToFlow|Downsides of GoToFlow|Where GoToFlow is weaker|Why GoToFlow is worse)\b/im
  },
  {
    id: 'negative-capability-en',
    reason: 'Articles must not frame GoToFlow through missing capabilities or limitations.',
    re: /\bGoToFlow\b[^.\n]{0,60}\b(?:does not|doesn't|cannot|can't)\b/i
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
    id: 'manual-transcript-required-ru',
    reason: 'GoToFlow нельзя описывать так, будто пользователь обязан сначала транскрибировать видео или аудио в другом месте.',
    re: /(?:сначала|сперва|вам\s+потребуется|нужно|необходимо)[^.\n]{0,70}(?:получить|сделать|создать|подготовить|вытащить)[^.\n]{0,70}(?:транскрипт|расшифровк|транскрибац|ключев(?:ые|ых)\s+тезис|key takeaways)|\bGoToFlow\b[^.\n]{0,100}(?:требует|нуж[её]н|работает\s+только)[^.\n]{0,80}(?:транскрипт|расшифровк|тезис)/i
  },
  {
    id: 'manual-takeaways-required-ru',
    reason: 'GoToFlow нельзя описывать так, будто пользователь обязан вручную выделять тезисы перед использованием.',
    re: /(?:сначала|сперва|нужно|необходимо)[^.\n]{0,60}(?:выделить|извлечь|подготовить)[^.\n]{0,60}(?:ключев(?:ые|ых)\s+тезис|главн(?:ые|ых)\s+мысл|суть)[^.\n]{0,80}(?:перед|затем|потом|в GoToFlow)/i
  },
  {
    id: 'draft-only-ru',
    reason: 'GoToFlow нельзя сужать до создания черновиков карусели.',
    re: /(?:черновик карусели|черновую карусель|только\s+созда[её]т\s+черновик|только\s+делает\s+черновик)/i
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
    re: /^(?:#{1,4}\s*)?(?:Минусы GoToFlow|Недостатки GoToFlow|Слабые стороны GoToFlow|Ограничения GoToFlow|Где GoToFlow слабее|Чего не хватает GoToFlow|Почему GoToFlow хуже)\b/im
  },
  {
    id: 'negative-capability-ru',
    reason: 'Нельзя описывать GoToFlow через отсутствие возможностей или ограничения.',
    re: /(?:\bGoToFlow\b[^.\n]{0,60}(?:не умеет|не подходит|не может)|(?:ограничение|ограничения|слабая сторона|слабые стороны)\s+GoToFlow\b)/i
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

function findDraftOutputIssues(text) {
  const normalized = normalizeText(text);
  const issues = [];

  for (const rule of DRAFT_OUTPUT_RULES) {
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

function getVisibleArticleText(frontmatter, body) {
  const visibleFrontmatter = VISIBLE_FRONTMATTER_KEYS
    .map((key) => getYamlBlock(frontmatter, key).text)
    .filter(Boolean)
    .join('\n');

  return `${visibleFrontmatter}\n${body}`;
}

function listProductCopyFiles(target) {
  if (!fs.existsSync(target)) return [];
  const stat = fs.statSync(target);
  if (stat.isFile()) return [target];

  return fs.readdirSync(target, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(target, entry.name);
    if (entry.isDirectory()) return listProductCopyFiles(entryPath);
    return /\.(?:js|jsx)$/.test(entry.name) ? [entryPath] : [];
  });
}

function scanProductCopy() {
  const errors = [];
  const files = PRODUCT_COPY_ROOTS.flatMap(listProductCopyFiles);

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, 'utf8');
    for (const issue of findDraftOutputIssues(content)) {
      errors.push(`[P0] ${path.relative(ROOT, filePath)}:${issue.line} positions a product output as unfinished (${issue.ruleId}). ${issue.reason} Snippet: "${issue.snippet}"`);
    }
  }

  return { filesScanned: files.length, errors };
}

const COMPARISON_TOOL_RE = /\b(?:Canva|Figma|Photoshop|Midjourney|ChatGPT|Claude)\b/gi;

function hasStrongProductBridge(text) {
  return /\bGoToFlow\b/i.test(text)
    && /(?:готов(?:ая|ую|ой|ые|ых)?\s+(?:к\s+публикации\s+)?карусел|ready(?:-to-publish)?\s+carousel|finished\s+carousel|экспорт|export)/i.test(text)
    && /(?:от\s+(?:идеи|источника)[\s\S]{0,180}(?:результат|карусел)|end-to-end|полный\s+цикл|структур|slide\s+copy|текст\s+по\s+слайдам|визуальн|visual|дизайн|design|CTA)/i.test(text);
}

function findComparisonBridgeWarning(frontmatter, body) {
  const normalizedBody = normalizeText(body);
  const normalizedFrontmatter = normalizeText(frontmatter);
  const matches = [...normalizedBody.matchAll(COMPARISON_TOOL_RE)];
  if (matches.length === 0) return null;

  const hasNearbyBridge = matches.some((match) => {
    const start = Math.max(0, match.index - 700);
    const end = Math.min(normalizedBody.length, match.index + match[0].length + 700);
    return hasStrongProductBridge(normalizedBody.slice(start, end));
  });
  const conclusionWindow = normalizedBody.slice(-2200);

  if (hasNearbyBridge || hasStrongProductBridge(conclusionWindow) || hasStrongProductBridge(normalizedFrontmatter)) {
    return null;
  }

  const tools = [...new Set(matches.map((match) => match[0]))].join(', ');
  return `mentions comparison tools (${tools}) without a strong nearby GoToFlow product bridge, conclusion, or final CTA.`;
}

function runSmokeTest() {
  const bad = [
    'Canva делает дизайн, а GoToFlow только структуру.',
    'You first need to convert the audio into text using a transcription tool before using GoToFlow.',
    '## Limitations of GoToFlow',
    'GoToFlow не умеет создавать готовые карусели.',
    'GoToFlow creates a draft carousel.',
    'Сгенерируйте черновик в GoToFlow.',
    'Use GoToFlow for structured, copy-ready carousel results.'
  ].join('\n');
  const good = [
    'Canva — ручной дизайн-редактор. GoToFlow — система создания готовой карусели от идеи до результата.',
    'GoToFlow helps turn rough notes or existing materials into a finished, export-ready carousel: structure, slide copy, visual direction, CTA, and a ready-to-publish result.'
  ].join('\n');

  const badIssues = findIssuesInText(bad);
  const goodIssues = findIssuesInText(good);
  const badDraftIssues = findDraftOutputIssues(bad);
  const goodDraftIssues = findDraftOutputIssues(good);

  if (badIssues.length === 0 || badDraftIssues.length < 2) {
    console.error('❌ Smoke test failed: bad positioning example was not blocked.');
    process.exit(1);
  }

  if (goodIssues.length > 0 || goodDraftIssues.length > 0) {
    console.error('❌ Smoke test failed: good positioning example produced a false positive.');
    [...goodIssues, ...goodDraftIssues].forEach((issue) => console.error(`  - ${issue.ruleId}: ${issue.snippet}`));
    process.exit(1);
  }

  const missingBridgeWarning = findComparisonBridgeWarning('', 'Create the text in ChatGPT, then finish the design in Canva.');
  const goodBridgeWarning = findComparisonBridgeWarning('', good);
  if (!missingBridgeWarning || goodBridgeWarning) {
    console.error('❌ Smoke test failed: product-positive comparison warning is not calibrated correctly.');
    process.exit(1);
  }

  console.log('✅ Product positioning smoke test passed.');
  console.log(`- Bad example blocked by: ${[...badIssues, ...badDraftIssues].map((issue) => issue.ruleId).join(', ')}`);
  console.log('- Good Canva comparison accepted.');
  console.log('- Missing GoToFlow product bridge warning detected; strong bridge accepted.');
}

function scanArticles() {
  const files = fs.readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith('.md') && !file.startsWith('_') && !file.startsWith('test-'));

  let scanned = 0;
  const errors = [];
  const warnings = [];

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
    const draftOutputIssues = findDraftOutputIssues(getVisibleArticleText(frontmatter, body));
    for (const issue of draftOutputIssues) {
      errors.push(`[P0] ${file}:${issue.line} positions a published output as unfinished (${issue.ruleId}). ${issue.reason} Snippet: "${issue.snippet}"`);
    }
    const comparisonWarning = findComparisonBridgeWarning(frontmatter, body);
    if (comparisonWarning) {
      warnings.push(`${file}: ${comparisonWarning}`);
    }
  }

  const productCopy = scanProductCopy();
  errors.push(...productCopy.errors);

  console.log('\n🔍 Blog Product Positioning Check');
  console.log(`- Source of truth: ${path.relative(ROOT, SOURCE_OF_TRUTH)}`);
  console.log(`- Published articles scanned: ${scanned}`);
  console.log(`- Product copy files scanned: ${productCopy.filesScanned}`);
  console.log(`- Rules loaded: ${RULES.length}`);

  if (warnings.length > 0) {
    console.warn(`\n⚠️ Comparison warnings (${warnings.length}):`);
    warnings.forEach((warning) => console.warn(`  - ${warning}`));
  }

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
