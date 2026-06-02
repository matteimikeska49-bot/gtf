import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ARTICLES_DIR = path.join(__dirname, '../src/content/blog/articles');
const TOPIC_MAP_PATH = path.join(__dirname, '../src/content/blog/topic-map.json');

console.log('🔍 Starting anti-cannibalization check...\n');

let hasP0Error = false;
let warnings = [];
let conflicts = [];

// 1. Read topic map
let topicMap = [];
try {
  const content = fs.readFileSync(TOPIC_MAP_PATH, 'utf-8');
  topicMap = JSON.parse(content);
} catch (e) {
  console.error(`❌ Failed to read topic-map.json: ${e.message}`);
  process.exit(1);
}

// 2. Read markdown articles
const articles = [];
try {
  const files = fs.readdirSync(ARTICLES_DIR);
  for (const file of files) {
    if (!file.endsWith('.md') || file.startsWith('_')) continue;
    const content = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf-8');
    
    // Parse frontmatter
    const getMatch = (regex) => {
      const match = content.match(regex);
      return match ? match[1].trim() : null;
    };
    
    const slug = getMatch(/^slug:\s*["']?([^"'\n]+)["']?/m) || file.replace(/\.md$/, '');
    const language = getMatch(/^language:\s*["']?([^"'\n]+)["']?/m) || 'en';
    const primaryKeyword = getMatch(/^primaryKeyword:\s*["']?([^"'\n]+)["']?/m);
    
    articles.push({ file, slug, language, primaryKeyword, content });
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
    conflicts.push(`Duplicate targetSlug in topic-map.json: ${slugKey}`);
    hasP0Error = true;
  }
  topicSlugs.add(slugKey);
  
  if (entry.primaryKeyword) {
    const kwKey = `${entry.language}:${entry.primaryKeyword.toLowerCase()}`;
    if (topicKeywords.has(kwKey)) {
      conflicts.push(`Duplicate primaryKeyword in topic-map.json: ${kwKey}`);
      hasP0Error = true;
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
    conflicts.push(`Duplicate slug in markdown articles: ${slugKey} (File: ${article.file})`);
    hasP0Error = true;
  }
  mdSlugs.add(slugKey);
  
  if (article.primaryKeyword) {
    const kwKey = `${article.language}:${article.primaryKeyword.toLowerCase()}`;
    if (mdKeywords.has(kwKey)) {
      conflicts.push(`Duplicate primaryKeyword in markdown articles: ${kwKey} (File: ${article.file})`);
      hasP0Error = true;
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
