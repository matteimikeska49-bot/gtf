import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ARTICLES_DIR = path.join(__dirname, '../src/content/blog/articles');
const TOPIC_MAP_PATH = path.join(__dirname, '../src/content/blog/topic-map.json');
const INTENT_MAP_PATH = path.join(__dirname, '../src/content/blog/intent-map.json');
const CLUSTER_MAP_PATH = path.join(__dirname, '../src/content/blog/cluster-authority-map.json');

console.log('🔍 Starting anti-cannibalization check...\n');

let hasP0Error = false;
let warnings = [];
let conflicts = [];
const releaseMode = process.env.BLOG_RELEASE_MODE === '1';
const releaseSlugs = new Set((process.env.BLOG_RELEASE_ARTICLE_SLUGS || '').split(',').filter(Boolean));
const changedPaths = new Set((process.env.BLOG_RELEASE_CHANGED_PATHS || '').split(',').filter(Boolean));
const strategyDataChanged = changedPaths.has('src/content/blog/topic-map.json');

function addConflict(message, slugs = []) {
  const affectsRelease = slugs.some((slug) => releaseSlugs.has(slug));
  if (!releaseMode || strategyDataChanged || affectsRelease) {
    conflicts.push(message);
    hasP0Error = true;
  } else {
    warnings.push(`Legacy debt (non-blocking for current release): ${message}`);
  }
}

// 1. Read topic map
let topicMap = [];
let intentMap = [];
let clusterMap = [];
try {
  const content = fs.readFileSync(TOPIC_MAP_PATH, 'utf-8');
  topicMap = JSON.parse(content);
  if (fs.existsSync(INTENT_MAP_PATH)) {
    intentMap = JSON.parse(fs.readFileSync(INTENT_MAP_PATH, 'utf-8'));
  }
  if (fs.existsSync(CLUSTER_MAP_PATH)) {
    clusterMap = JSON.parse(fs.readFileSync(CLUSTER_MAP_PATH, 'utf-8'));
  }
} catch (e) {
  console.error(`❌ Failed to read strategy JSON files: ${e.message}`);
  process.exit(1);
}

// 2. Read markdown articles
const articles = [];
try {
  const files = fs.readdirSync(ARTICLES_DIR);
  for (const file of files) {
    if (!file.endsWith('.md') || file.startsWith('_') || file.startsWith('test-')) continue;
    const content = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf-8');
    
    // Parse frontmatter
    const getMatch = (regex) => {
      const match = content.match(regex);
      return match ? match[1].trim() : null;
    };
    
    const slug = getMatch(/^slug:\s*["']?([^"'\n]+)["']?/m) || file.replace(/\.md$/, '');
    const language = getMatch(/^language:\s*["']?([^"'\n]+)["']?/m) || 'en';
    const primaryKeyword = getMatch(/^primaryKeyword:\s*["']?([^"'\n]+)["']?/m);
    const articleType = getMatch(/^articleType:\s*["']?([^"'\n]+)["']?/m);
    const searchIntent = getMatch(/^searchIntent:\s*["']?([^"'\n]+)["']?/m);
    const articleRole = getMatch(/^articleRole:\s*["']?([^"'\n]+)["']?/m);
    const intentId = getMatch(/^intentId:\s*["']?([^"'\n]+)["']?/m);
    const clusterId = getMatch(/^clusterId:\s*["']?([^"'\n]+)["']?/m);
    const relatedProductRoute = getMatch(/^relatedProductRoute:\s*["']?([^"'\n]+)["']?/m);
    
    articles.push({ file, slug, language, primaryKeyword, articleType, searchIntent, articleRole, intentId, clusterId, relatedProductRoute, content });
  }
} catch (e) {
  console.error(`❌ Failed to read articles: ${e.message}`);
  process.exit(1);
}

// 3. Checks

// 3A. Check topic-map for duplicates
const topicSlugs = new Set();
const topicKeywords = new Set();
const topicIntents = new Set();

topicMap.forEach((entry, i) => {
  const slugKey = `${entry.language}:${entry.targetSlug}`;
  if (topicSlugs.has(slugKey)) {
    addConflict(`Duplicate targetSlug in topic-map.json: ${slugKey}`, [entry.targetSlug]);
  }
  topicSlugs.add(slugKey);
  
  if (entry.primaryKeyword) {
    const kwKey = `${entry.language}:${entry.primaryKeyword.toLowerCase()}`;
    if (topicKeywords.has(kwKey)) {
      addConflict(`Duplicate primaryKeyword in topic-map.json: ${kwKey}`, [entry.targetSlug]);
    }
    topicKeywords.add(kwKey);
  }
  
  if (entry.language && entry.cluster && entry.searchIntent) {
    const intentKey = `${entry.language}:${entry.cluster}:${entry.searchIntent}`;
    if (topicIntents.has(intentKey)) {
      warnings.push(`Warning: Multiple entries in topic-map with same intent: ${intentKey}`);
    }
    topicIntents.add(intentKey);
  }
});

// 3B. Check markdown articles for duplicates
const mdSlugs = new Set();
const mdKeywords = new Set();

articles.forEach(article => {
  const slugKey = `${article.language}:${article.slug}`;
  if (mdSlugs.has(slugKey)) {
    addConflict(`Duplicate slug in markdown articles: ${slugKey} (File: ${article.file})`, [article.slug]);
  }
  mdSlugs.add(slugKey);
  
  if (article.primaryKeyword) {
    const kwKey = `${article.language}:${article.primaryKeyword.toLowerCase()}`;
    if (mdKeywords.has(kwKey)) {
      addConflict(`Duplicate primaryKeyword in markdown articles: ${kwKey} (File: ${article.file})`, [article.slug]);
    }
    mdKeywords.add(kwKey);
  }
});

// 3C. Cross-check markdown against topic map (Optional: Ensure markdown articles don't conflict with future topics)
// If a markdown article has a keyword that is in the topic map, that's fine if they are the SAME article.
// We'll warn if a markdown article slug doesn't match the topic map slug for the same keyword.
articles.forEach(article => {
  if (article.primaryKeyword) {
    const kwKey = `${article.language}:${article.primaryKeyword.toLowerCase()}`;
    const topicEntry = topicMap.find(t => t.primaryKeyword && `${t.language}:${t.primaryKeyword.toLowerCase()}` === kwKey);
    
    if (topicEntry && topicEntry.targetSlug !== article.slug) {
      warnings.push(`Mismatch: Markdown article '${article.file}' uses keyword '${article.primaryKeyword}' but its slug '${article.slug}' differs from topic-map targetSlug '${topicEntry.targetSlug}'`);
    }
  }
});

// 3D. Check for product-intent cannibalization
const productIntentPatternsEn = [
  "ai carousel maker", "ai carousel generator", "linkedin carousel maker", 
  "linkedin carousel generator", "ai content generator", "ai content generator for social media", 
  "social media content generator", "carousel maker", "carousel generator"
];
const productIntentPatternsRu = [
  "генератор каруселей", "ai генератор каруселей", "нейросеть для каруселей", 
  "генератор контента", "ai генератор контента", "генератор контента для соцсетей", 
  "генератор каруселей linkedin"
];

const recommendedRoutes = {
  "ai carousel maker": "/ai-carousel-maker",
  "ai carousel generator": "/ai-carousel-maker",
  "linkedin carousel maker": "/linkedin-carousel-maker",
  "linkedin carousel generator": "/linkedin-carousel-maker",
  "ai content generator": "/ai-content-generator",
  "ai content generator for social media": "/ai-content-generator",
  "social media content generator": "/ai-content-generator",
  "carousel maker": "/ai-carousel-maker",
  "carousel generator": "/ai-carousel-maker",
  "генератор каруселей": "/ru/ii-generator-karuseley",
  "ai генератор каруселей": "/ru/ii-generator-karuseley",
  "нейросеть для каруселей": "/ru/ii-generator-karuseley",
  "генератор контента": "/ru/generator-kontenta",
  "ai генератор контента": "/ru/generator-kontenta",
  "генератор контента для соцсетей": "/ru/generator-kontenta",
  "генератор каруселей linkedin": "/ru/generator-karuselej-linkedin"
};

const routeSlug = (route) => (route || '').replace(/^\/+/, '').split('/').filter(Boolean).pop() || '';

const findTopicEntry = (article) => topicMap.find(t =>
  (t.targetSlug === article.slug) ||
  (article.primaryKeyword && t.primaryKeyword && t.language === article.language && t.primaryKeyword.toLowerCase() === article.primaryKeyword.toLowerCase())
);

const findIntentRecord = (article) => intentMap.find(i =>
  i.intentId === article.intentId ||
  i.ownerSlug === article.slug ||
  (i.supportingSlugs || []).includes(article.slug)
);

const findClusterRole = (article) => {
  for (const cluster of clusterMap) {
    const role = (cluster.articleRoles || []).find(r => r.slug === article.slug);
    if (role) return { cluster, role };
  }
  return null;
};

const isExplicitSupportingProductArticle = (article, recommendedRoute) => {
  const topicEntry = findTopicEntry(article);
  const intentRecord = findIntentRecord(article);
  const clusterRole = findClusterRole(article);

  if (!topicEntry || !intentRecord || !clusterRole) return false;

  const productOwnedByRoute =
    intentRecord.ownerUrl === recommendedRoute ||
    intentRecord.ownerSlug === routeSlug(recommendedRoute);

  const articleListedAsSupport =
    (intentRecord.supportingSlugs || []).includes(article.slug) ||
    (intentRecord.supportingUrls || []).includes(`/blog/${article.slug}`) ||
    (intentRecord.supportingUrls || []).includes(`/ru/blog/${article.slug}`);

  const clusterMarksSupport = ['supporting', 'support'].includes((clusterRole.role.role || '').toLowerCase());

  const topicAllowsSupport =
    topicEntry.relatedProductRoute === recommendedRoute &&
    topicEntry.cannibalizationRisk !== 'high' &&
    ['support_existing_product_route', 'support_product_route'].includes(topicEntry.routeStrategy || topicEntry.recommendedAction);

  return productOwnedByRoute && articleListedAsSupport && clusterMarksSupport && topicAllowsSupport;
};

const isAllowedProductIntent = (article, recommendedRoute) => {
  const { articleType, primaryKeyword } = article;
  const type = articleType?.toLowerCase() || '';
  if (type === 'comparison' || type === 'comparison_article') return true;
  if (type === 'prompt_library') return true;
  if ((type === 'how_to' || type === 'how_to_article') && !productIntentPatternsEn.includes(primaryKeyword?.toLowerCase()) && !productIntentPatternsRu.includes(primaryKeyword?.toLowerCase())) return true;
  if (isExplicitSupportingProductArticle(article, recommendedRoute)) return true;
  return false;
};

articles.forEach(article => {
  if (article.primaryKeyword) {
    const kw = article.primaryKeyword.toLowerCase();
    const patterns = article.language === 'ru' ? productIntentPatternsRu : productIntentPatternsEn;
    
    // Check if the keyword contains any product intent pattern
    const matchedPattern = patterns.find(p => kw.includes(p));
    
    if (matchedPattern) {
      const recommendedRoute = recommendedRoutes[matchedPattern] || 'Product Route';
      if (!isAllowedProductIntent(article, recommendedRoute)) {
        const msg = `Product-intent cannibalization in article: ${article.file} (Slug: ${article.slug})\n` +
                    `    Conflicting keyword/intent: '${kw}' contains product term '${matchedPattern}'\n` +
                    `    Recommended product route: ${recommendedRoute}\n` +
                    `    Note: If this is supporting content, adjust articleType (e.g. comparison_article, prompt_library) or primaryKeyword.`;
        addConflict(msg, [article.slug]);
      }
    }
  }
});

// 4. Report
if (conflicts.length > 0) {
  console.log('🚨 P0 CONFLICTS FOUND:');
  conflicts.forEach(c => console.log(`  - ${c}`));
} else {
  console.log('✅ No P0 cannibalization conflicts found.');
}

if (warnings.length > 0) {
  console.log('\n⚠️ WARNINGS:');
  warnings.forEach(w => console.log(`  - ${w}`));
}

if (hasP0Error) {
  console.error('\n❌ FAIL: Anti-cannibalization check failed.');
  process.exit(1);
} else {
  console.log('\n✅ PASS: Anti-cannibalization check passed.');
  process.exit(0);
}
