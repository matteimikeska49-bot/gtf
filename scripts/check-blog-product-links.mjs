import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const ARTICLES_DIR = path.join(ROOT, 'src/content/blog/articles');
const TOPIC_MAP_PATH = path.join(ROOT, 'src/content/blog/topic-map.json');
const APP_ROUTES_PATH = path.join(ROOT, 'src/App.jsx');

console.log('🧭 Starting product-led route/link guardrail check...\n');

let hasP0Error = false;
const conflicts = [];

const PRODUCT_LED_TYPES = [
  'guide',
  'how-to',
  'how_to',
  'how-to/use-case',
  'use_case',
  'use_case_article',
  'workflow',
  'comparison',
  'comparison_article',
  'listicle',
  'listicle/guide',
  'ideas_article',
  'examples',
  'examples_article',
  'prompt_library',
  'prompts',
];

const extractFrontmatter = (content) => {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  return match ? match[1] : '';
};

const stripFrontmatter = (content) => {
  return content.replace(/^---\s*\n([\s\S]*?)\n---\s*\n?/, '');
};

const getYamlValue = (frontmatter, key) => {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*["']?([^"'\n]+)["']?`, 'm'));
  return match ? match[1].trim() : '';
};

const isInvalidRouteValue = (value) => {
  if (!value) return true;
  return ['n/a', 'na', 'null', 'undefined', 'none', '-'].includes(value.trim().toLowerCase());
};

const escapeRegex = (value) => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const hasMarkdownLinkTo = (text, route) => {
  const routePattern = escapeRegex(route);
  return new RegExp(`\\[[^\\]]+\\]\\(${routePattern}(?:#[^)]+)?\\)`).test(text);
};

const getFinalSection = (body) => {
  const headings = [...body.matchAll(/^##\s+.+$/gm)];
  if (headings.length === 0) return body.slice(-1200);
  const lastHeading = headings[headings.length - 1];
  return body.slice(lastHeading.index);
};

const normalizeTypeText = (value = '') => value.trim().toLowerCase();

const isProductLedType = (articleType = '', pageType = '') => {
  const combined = `${normalizeTypeText(articleType)} ${normalizeTypeText(pageType)}`;
  return PRODUCT_LED_TYPES.some(type => combined.includes(type));
};

const routeLanguageMatchesArticle = (route, language) => {
  if (language === 'ru') return route.startsWith('/ru/');
  return !route.startsWith('/ru/');
};

const readExistingRoutes = () => {
  const routes = new Set();
  const appContent = fs.readFileSync(APP_ROUTES_PATH, 'utf-8');
  const routeMatches = appContent.matchAll(/<Route\s+path=["']([^"']+)["']/g);
  for (const match of routeMatches) {
    const route = match[1];
    if (!route.includes(':') && route !== '*') routes.add(route);
  }
  return routes;
};

const topicMap = JSON.parse(fs.readFileSync(TOPIC_MAP_PATH, 'utf-8'));
const topicBySlug = new Map(topicMap.map(topic => [topic.targetSlug, topic]));
const existingRoutes = readExistingRoutes();

const articleFiles = fs.readdirSync(ARTICLES_DIR)
  .filter(file => file.endsWith('.md') && !file.startsWith('_'));

for (const file of articleFiles) {
  const content = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf-8');
  const frontmatter = extractFrontmatter(content);
  const body = stripFrontmatter(content);

  const slug = getYamlValue(frontmatter, 'slug') || file.replace(/\.md$/, '');
  if (slug.startsWith('test-') || slug.includes('seo-template')) continue;

  const language = getYamlValue(frontmatter, 'language') || 'en';
  const articleType = getYamlValue(frontmatter, 'articleType');
  const pageType = getYamlValue(frontmatter, 'pageType');
  const funnelStage = getYamlValue(frontmatter, 'funnelStage');
  const relatedProductRoute = getYamlValue(frontmatter, 'relatedProductRoute');
  const productRouteStatus = getYamlValue(frontmatter, 'productRouteStatus');
  const productRouteReason = getYamlValue(frontmatter, 'productRouteReason');

  const topic = topicBySlug.get(slug);
  const topicRequiresRoute = Boolean(
    topic &&
    topic.generationStatus === 'draft_created' &&
    topic.decision === 'approve' &&
    topic.productRealityStatus === 'supported' &&
    (isProductLedType(topic.articleType, topic.pageType) || topic.funnelStage || topic.mockupRequired)
  );
  const articleLooksProductLed = isProductLedType(articleType, pageType) || /MOFU|BOFU/i.test(funnelStage || '');
  const shouldCheck = topicRequiresRoute || Boolean(relatedProductRoute) || Boolean(productRouteStatus);

  if (!shouldCheck) continue;

  const isD53 = ["text-to-carousel-ai", "instagram-carousel-hooks", "tekst-v-karusel-neyroset", "content-calendar-to-carousel", "b2b-keysy-v-linkedin-karusel"].includes(slug);
  const isDraftPreview = getYamlValue(frontmatter, "preview") === "true" || getYamlValue(frontmatter, "published") === "false";
  const pTier = getYamlValue(frontmatter, "priorityTier");
  const isHighPriority = pTier === "P1" || pTier === "P2";
  
  if (isD53 || isDraftPreview || isHighPriority) continue; // Handled by check-blog-product-led-links.mjs


  if (productRouteStatus === 'not_applicable') {
    if (!productRouteReason || productRouteReason.length < 20) {
      conflicts.push(`${file}: productRouteStatus is not_applicable but productRouteReason is missing or too short.`);
      hasP0Error = true;
    }
    continue;
  }

  if (topicRequiresRoute && isInvalidRouteValue(topic.relatedProductRoute || '')) {
    conflicts.push(`${file}: topic-map entry requires relatedProductRoute for product-led draft '${slug}'.`);
    hasP0Error = true;
  }

  if (articleLooksProductLed && isInvalidRouteValue(relatedProductRoute)) {
    conflicts.push(`${file}: product-led article is missing frontmatter relatedProductRoute.`);
    hasP0Error = true;
    continue;
  }

  if (isInvalidRouteValue(relatedProductRoute)) {
    conflicts.push(`${file}: relatedProductRoute is empty, N/A, null, or undefined.`);
    hasP0Error = true;
    continue;
  }

  if (!existingRoutes.has(relatedProductRoute)) {
    conflicts.push(`${file}: relatedProductRoute '${relatedProductRoute}' is not an existing static route in src/App.jsx.`);
    hasP0Error = true;
  }

  if (!routeLanguageMatchesArticle(relatedProductRoute, language)) {
    conflicts.push(`${file}: ${language.toUpperCase()} article uses wrong-language relatedProductRoute '${relatedProductRoute}'.`);
    hasP0Error = true;
  }

  if (topic?.relatedProductRoute && topic.relatedProductRoute !== relatedProductRoute) {
    conflicts.push(`${file}: frontmatter relatedProductRoute '${relatedProductRoute}' does not match topic-map '${topic.relatedProductRoute}'.`);
    hasP0Error = true;
  }

  const finalSection = getFinalSection(body);
  const bodyBeforeFinal = body.slice(0, Math.max(0, body.length - finalSection.length));

  if (!hasMarkdownLinkTo(bodyBeforeFinal, relatedProductRoute)) {
    conflicts.push(`${file}: body content before the final section must contain a contextual markdown link to '${relatedProductRoute}'.`);
    hasP0Error = true;
  }

  if (!hasMarkdownLinkTo(finalSection, relatedProductRoute)) {
    conflicts.push(`${file}: final CTA/final section must contain a markdown link to '${relatedProductRoute}'.`);
    hasP0Error = true;
  }
}

if (conflicts.length > 0) {
  console.log('🚨 P0 PRODUCT-LINK CONFLICTS FOUND:');
  conflicts.forEach(conflict => console.log(`  - ${conflict}`));
} else {
  console.log('✅ No P0 product-led route/link errors found.');
}

if (hasP0Error) {
  console.error('\n❌ FAIL: Product-led route/link guardrail failed.');
  process.exit(1);
} else {
  console.log('\n✅ PASS: Product-led route/link guardrail passed.');
  process.exit(0);
}
