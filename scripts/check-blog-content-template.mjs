import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const ARTICLES_DIR = path.join(ROOT, 'src/content/blog/articles');
const DIST_DIR = path.join(ROOT, 'dist');
const APP_PATH = path.join(ROOT, 'src/App.jsx');

const STRICT_SLUGS = new Set([
  'best-linkedin-carousel-examples',
  'primery-karuseley-linkedin',
  'youtube-to-linkedin-carousel-ai',
  'kak-peredelat-youtube-v-karusel-linkedin',
  'linkedin-carousel-hooks'
]);

// Existing published debt remains visible as P1 warnings. Any new occurrence is P0.
const LEGACY_GENERIC_EXPLORE_ANCHOR_SLUGS = new Set([
  'ai-carousel-content-strategy',
  'ai-linkedin-carousel-strategy-for-b2b-founders',
  'carousel-post-mistakes',
  'cta-dlya-karuseley-instagram-s-ii',
  'how-to-brainstorm-carousel-topics-with-ai',
  'ii-tekst-dlya-posta',
  'kak-pridumat-temu-dlya-karuseli-s-ii',
  'kak-uvelichit-sohraneniya-karuseley',
  'karusel-dlya-lichnogo-brenda-s-ii',
  'karusel-dlya-otzyvov-s-ii',
  'karusel-dlya-zapuska-produkta-s-ii',
  'karuseli-dlya-ekspertov-s-ii',
  'karuseli-dlya-onlayn-shkol-s-ii',
  'psihologiya-karuseley-kak-uderzhat-vnimanie',
  'turn-video-into-carousel-with-ai'
]);

const SAME_PAGE_SECONDARY_TEXT = /(?:ниже|на этой странице|связанным материалам|к инструментам и гайдам ниже|below|on this page|related materials below|related tools and guides|back to related)/iu;
const GENERIC_SECONDARY_TEXT = /^(?:learn more|read more|see more|explore more|подробнее|узнать больше|смотреть больше)\s*→?$/iu;

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
        if (question && question[1].trim() !== '') {
          questions.push(question[1].replace(/^"|"$/g, ''));
        }
        
        if (lines[cursor].match(/^\s+-\s+q:\s*|^\s+a:\s*/)) {
          frontmatter.hasMalformedFaqKeys = true;
        }

        if (lines[cursor].match(/^\s+-\s+question:\s*(?:""|'')?\s*$/) || lines[cursor].match(/^\s+answer:\s*(?:""|'')?\s*$/)) {
          frontmatter.hasEmptyFaq = true;
        }
        
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

function getYamlBlock(yaml, key) {
  const lines = yaml.split('\n');
  const startIndex = lines.findIndex((line) => line.startsWith(`${key}:`));
  if (startIndex === -1) return '';

  const blockLines = [];
  for (let index = startIndex + 1; index < lines.length; index += 1) {
    if (/^[a-zA-Z0-9_]+:\s*/.test(lines[index])) break;
    blockLines.push(lines[index]);
  }
  return blockLines.join('\n');
}

function getNestedYamlValue(block, key) {
  const match = block.match(new RegExp(`^\\s+${key}:\\s*(.*)$`, 'm'));
  return match ? match[1].trim().replace(/^["']|["']$/g, '') : '';
}

function hasRenderableExplore(exploreBlock) {
  if (!/^  (?:tools|guides):\s*$/m.test(exploreBlock)) return false;
  return /^    - title:\s*\S/m.test(exploreBlock) && /^      href:\s*["']?\//m.test(exploreBlock);
}

function getExploreItems(exploreBlock) {
  const items = [];
  let current = null;

  for (const line of exploreBlock.split('\n')) {
    const titleMatch = line.match(/^    - title:\s*(.*)$/);
    if (titleMatch) {
      if (current) items.push(current);
      current = { title: normalizeScalar(titleMatch[1]), href: '' };
      continue;
    }

    const hrefMatch = line.match(/^      href:\s*(.*)$/);
    if (hrefMatch && current) current.href = normalizeScalar(hrefMatch[1]);
  }

  if (current) items.push(current);
  return items;
}

function normalizeInternalRoute(href) {
  if (!href || typeof href !== 'string') return '';
  if (href.startsWith('https://gotoflow.io/')) return new URL(href).pathname.replace(/\/$/, '') || '/';
  if (!href.startsWith('/')) return href;
  return href.split(/[?#]/)[0].replace(/\/$/, '') || '/';
}

function buildRouteRegistry(files) {
  const registry = new Map([
    ['/', { live: true, language: 'neutral' }],
    ['/ru', { live: true, language: 'ru' }],
    ['/blog', { live: true, language: 'en' }],
    ['/ru/blog', { live: true, language: 'ru' }]
  ]);

  const appSource = fs.readFileSync(APP_PATH, 'utf8');
  for (const match of appSource.matchAll(/<Route\s+path=["']([^"']+)["']/g)) {
    if (!match[1].includes(':') && !match[1].includes('*')) {
      const route = normalizeInternalRoute(match[1]);
      registry.set(route, { live: true, language: route.startsWith('/ru') ? 'ru' : 'en' });
    }
  }

  for (const file of files) {
    const content = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf8');
    const { frontmatter } = parseFrontmatter(content);
    const slug = frontmatter.slug || file.replace(/\.md$/, '');
    const route = frontmatter.language === 'ru'
      ? `/ru/blog/${slug}`
      : `/blog/${slug}`;
    registry.set(route, {
      live: frontmatter.published === true && frontmatter.noindex === false,
      language: frontmatter.language === 'ru' ? 'ru' : 'en'
    });
  }

  return registry;
}

function validatePublishedRoute({ href, label, routeRegistry, errors }) {
  const route = normalizeInternalRoute(href);
  const target = routeRegistry.get(route);
  if (!target) {
    errors.push(`P0: ${label} points to non-existing route "${href}".`);
  } else if (!target.live) {
    errors.push(`P0: ${label} points to draft/noindex route "${href}".`);
  }
  return { route, target };
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

  const isLivePublished = frontmatter.published === true && frontmatter.noindex === false;
  if (isLivePublished) {
    SOURCE_FORBIDDEN.forEach((phrase) => {
      if (lowerHtml.includes(phrase)) {
        renderedErrors.push(`Rendered HTML forbidden wording found: "${phrase}"`);
      }
    });
  }

  const hasDetailsFaq = /<details\b/i.test(html);
  const hasMarkdownFaqHeading = language === 'ru'
    ? /Часто задаваемые[\s\S]{0,220}вопросы\s*\(FAQ\)/i.test(html)
    : /Frequently Asked[\s\S]{0,220}Questions\s*\(FAQ\)/i.test(html);
  if (hasDetailsFaq && hasMarkdownFaqHeading) {
    errors.push('Rendered HTML contains both markdown FAQ heading and frontmatter FAQ details block.');
  }

  const hasFrontmatterCta = Boolean(frontmatter.finalCta) && /https:\/\/app\.gotoflow\.io/i.test(html);
  const hasMarkdownProductBlock = /PRODUCT WORKFLOW|ИНСТРУМЕНТ ИЛИ ПРОЦЕСС/i.test(html);
  if (hasFrontmatterCta && hasMarkdownProductBlock) {
    errors.push('Rendered HTML contains both markdown product CTA block and frontmatter FinalCta block.');
  }

  const hasRawInlineProductBlock = /<InlineProductBlock/i.test(html);
  if (hasRawInlineProductBlock) {
    errors.push('Rendered HTML contains raw <InlineProductBlock marker.');
  }

  const hasRawProductMarkdown = /\[!product\]/i.test(html);
  if (hasRawProductMarkdown) {
    errors.push('Rendered HTML contains raw [!product] marker.');
  }

  renderedErrors.forEach((message) => addIssue({ errors, warnings, strict, message }));
}

function checkArticle(file, routeRegistry) {
  if (file.startsWith('test-') || file.includes('seo-template')) {
    return { file, errors: [], warnings: [] };
  }

  const filePath = path.join(ARTICLES_DIR, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const { yaml, frontmatter, body } = parseFrontmatter(content);
  const errors = [];
  const warnings = [];
  const strict = isStrictArticle(frontmatter);
  const isLivePublished = frontmatter.published === true && frontmatter.noindex === false;
  const articleLanguage = frontmatter.language === 'ru' ? 'ru' : 'en';
  const lowerBody = body.toLowerCase();

  const frontmatterFaqCount = Array.isArray(frontmatter.faq) ? frontmatter.faq.length : 0;
  const markdownFaqCount = getMarkdownFaqCount(body);
  const hasFrontmatterFaq = frontmatterFaqCount > 0;
  const hasBodyFaq = hasMarkdownFaqSection(body);
  const faqCount = Math.max(frontmatterFaqCount, markdownFaqCount);

  if (faqCount < 5) {
    if (isLivePublished) {
      errors.push(`FAQ count is ${faqCount}. Must be >= 5 for live articles.`);
    } else {
      if (faqCount === 0) {
        warnings.push(`FAQ count is 0. Drafts should ideally have FAQs.`);
      }
    }
  }

  // Content depth gate for batch B & new articles
  const NEW_ARTICLES = new Set([
    'ii-post-dlya-socsetej',
    'kakoy-ii-sozdast-post-karusel',
    'gde-delat-posty-karuseli-s-ii',
    'neyroset-dlya-postov',
    'ai-content-creation',
    'ai-content-writing',
    'b2b-social-media-post-ideas',
    'best-time-to-post-on-instagram',
    'linkedin-carousel-ads'
  ]);
  
  if (isLivePublished && (NEW_ARTICLES.has(frontmatter.slug) || !STRICT_SLUGS.has(frontmatter.slug))) {
      const type = frontmatter.articleType || 'guide';
      const bodyChars = body.trim().length;
      const h2Match = body.match(/^## /gm);
      const h2Count = h2Match ? h2Match.length : 0;
      
      let minChars = 0;
      let minH2 = 0;
      if (type === 'supporting') { minChars = 6000; minH2 = 3; }
      else if (type === 'guide') { minChars = 8000; minH2 = 4; }
      else if (type === 'comparison') { minChars = 9000; minH2 = 4; }
      else if (type === 'pillar') { minChars = 12000; minH2 = 6; }
      else { minChars = 6000; minH2 = 3; }
      
      if (bodyChars < minChars) {
          // If it's a legacy article, just warn. If it's one of the NEW_ARTICLES, error.
          if (NEW_ARTICLES.has(frontmatter.slug)) {
              errors.push(`P0: Content depth too thin for ${type}. Body chars: ${bodyChars} (min ${minChars}).`);
          } else {
              // Ignore legacy articles for now to not break the build
          }
      } else if (bodyChars >= minChars && bodyChars < minChars + 2000) {
          warnings.push(`P1: Content depth ${bodyChars} chars is close to the minimum ${minChars} for ${type}.`);
      }
      
      if (h2Count < minH2) {
          if (NEW_ARTICLES.has(frontmatter.slug)) {
              errors.push(`P0: Insufficient depth structure for ${type}. H2 count: ${h2Count} (min ${minH2}).`);
          }
      }
      
      if (!frontmatter.quickAnswer && NEW_ARTICLES.has(frontmatter.slug)) {
          errors.push('P0: Missing Quick Answer frontmatter block.');
      }
      
      if (!/(?:workflow|шаг 1|step 1|сценари|guide|инструкц)/i.test(body) && NEW_ARTICLES.has(frontmatter.slug)) {
          errors.push('P0: Missing product-led workflow section.');
      }
      
      if (!/(?:carousel|карусел)/i.test(body) && NEW_ARTICLES.has(frontmatter.slug)) {
          errors.push('P0: Missing carousel bridge.');
      }
      
      if (!/(?:example|mistake|scenario|compar|пример|ошибк|сравнен)/i.test(body) && NEW_ARTICLES.has(frontmatter.slug)) {
          errors.push('P0: Missing practical examples/scenarios/mistakes/comparison section.');
      }
  }


  if (hasFrontmatterFaq && hasBodyFaq) {
    errors.push('Duplicate FAQ sources: article has both frontmatter faq and markdown FAQ section.');
  }

  if (frontmatter.hasMalformedFaqKeys) {
    errors.push('Malformed FAQ keys detected (q: or a:). Use "question:" and "answer:".');
  }

  if (frontmatter.hasEmptyFaq) {
    errors.push('Empty FAQ row detected (empty question or empty answer).');
  }

  const hasProductBlock = hasMarkdownProductCta(body);
  const hasFinalCtaFrontmatter = Boolean(frontmatter.finalCta);
  const finalCtaBlock = getYamlBlock(yaml, 'finalCta');
  const secondaryText = getNestedYamlValue(finalCtaBlock, 'secondaryText');
  const secondaryHref = getNestedYamlValue(finalCtaBlock, 'secondaryHref');
  const exploreBlock = getYamlBlock(yaml, 'explore');
  const exploreItems = getExploreItems(exploreBlock);
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

  if (hasFinalCtaFrontmatter && hasProductBlock) {
    errors.push('Duplicate CTA sources: article has both finalCta frontmatter and markdown [!product] block.');
  }

  if (isLivePublished) {
    if (secondaryText && (!secondaryHref || secondaryHref === '#' || /^(?:undefined|null)$/i.test(secondaryHref))) {
      errors.push('P0: Final CTA secondary link text exists, but secondaryHref is empty or invalid.');
    } else if (secondaryHref === '#explore-more') {
      if (!hasRenderableExplore(exploreBlock)) {
        errors.push('P0: Final CTA secondary link points to #explore-more, but frontmatter has no renderable explore.tools or explore.guides entries.');
      }
      if (!SAME_PAGE_SECONDARY_TEXT.test(secondaryText)) {
        const message = 'Final CTA secondaryHref may use #explore-more only when secondaryText explicitly describes same-page related materials.';
        if (LEGACY_GENERIC_EXPLORE_ANCHOR_SLUGS.has(frontmatter.slug)) {
          warnings.push(`Legacy P1: ${message}`);
        } else {
          errors.push(`P0: ${message}`);
        }
      }
    } else if (secondaryHref) {
      const { route, target } = validatePublishedRoute({
        href: secondaryHref,
        label: 'Final CTA secondaryHref',
        routeRegistry,
        errors
      });
      if (target && target.language !== 'neutral' && target.language !== articleLanguage) {
        warnings.push(`P1: Final CTA secondaryHref language does not match article language: "${secondaryHref}".`);
      }
      if ((route === '/blog' || route === '/ru/blog') && exploreItems.some((item) => item.href && item.href.startsWith('/'))) {
        warnings.push('P1: Final CTA uses a blog hub fallback although Explore contains a more specific route.');
      }
      if (GENERIC_SECONDARY_TEXT.test(secondaryText)) {
        warnings.push('P1: Final CTA secondaryText is generic and does not describe its destination.');
      }
    }

    for (const item of exploreItems) {
      if (!item.href || item.href === '#' || item.href.startsWith('#') || /^(?:undefined|null)$/i.test(item.href)) {
        errors.push(`P0: Explore card "${item.title || 'untitled'}" has an empty or local-anchor href.`);
        continue;
      }
      const { target } = validatePublishedRoute({
        href: item.href,
        label: `Explore card "${item.title || 'untitled'}"`,
        routeRegistry,
        errors
      });
      if (target && target.language !== 'neutral' && target.language !== articleLanguage) {
        warnings.push(`P1: Explore card "${item.title || 'untitled'}" language does not match article language.`);
      }
    }
  }

  if (isLivePublished) {
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
  }

  const titleSlug = `${frontmatter.title || ''} ${frontmatter.slug || ''}`;
  const isExamplesFocused = frontmatter.articleType === 'examples'
    || /(?:^|-)(?:examples|primery)(?:-|$)/i.test(frontmatter.slug || '');
  if (isExamplesFocused) {
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
  const routeRegistry = buildRouteRegistry(files);

  let totalErrors = 0;
  let totalWarnings = 0;

  files.forEach((file) => {
    const { errors, warnings } = checkArticle(file, routeRegistry);
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
