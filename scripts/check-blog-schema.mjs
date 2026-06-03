import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ARTICLES_DIR = path.join(__dirname, '../src/content/blog/articles');
const DIST_DIR = path.join(__dirname, '../dist');

console.log('🔍 Starting Blog Schema Validation...\n');

let hasError = false;
let warnings = [];
let errors = [];

// 1. Get published articles and their expected state
const expectedArticles = [];
try {
  const files = fs.readdirSync(ARTICLES_DIR);
  for (const file of files) {
    if (!file.endsWith('.md') || file.startsWith('_') || file.startsWith('test-')) continue;
    const content = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf-8');
    
    const getMatch = (regex) => {
      const match = content.match(regex);
      return match ? match[1].trim() : null;
    };
    
    const slug = getMatch(/^slug:\s*["']?([^"'\n]+?)["']?$/m) || file.replace(/\.md$/, '');
    const language = getMatch(/^language:\s*["']?([^"'\n]+?)["']?$/m) || 'en';
    const published = getMatch(/^published:\s*(true|false)/m) === 'true';
    const preview = getMatch(/^preview:\s*(true|false)/m) === 'true';
    
    const hasVisibleFaq = content.includes('\nfaq:\n') || content.includes('\nfaq: \n');

    if (published || preview) {
      expectedArticles.push({ file, slug, language, hasVisibleFaq });
    }
  }
} catch (e) {
  console.error(`❌ Failed to read articles: ${e.message}`);
  process.exit(1);
}

// 2. Validate built HTML output for each expected article
expectedArticles.forEach(article => {
  const langPrefix = article.language === 'ru' ? 'ru/' : '';
  const htmlPath = path.join(DIST_DIR, `${langPrefix}blog/${article.slug}/index.html`);
  
  if (!fs.existsSync(htmlPath)) {
    warnings.push(`Built HTML not found for ${article.file} at ${htmlPath}. Ensure 'npm run build' is up to date.`);
    return;
  }
  
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  
  // Extract script with id="article-ld-json" or fallback
  const ldJsonMatches = [...htmlContent.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  
  if (ldJsonMatches.length === 0) {
    errors.push(`No JSON-LD schema found in built HTML for ${article.file}`);
    hasError = true;
    return;
  }

  let foundArticle = false;
  let foundBreadcrumb = false;
  let foundFAQ = false;
  
  for (const match of ldJsonMatches) {
    try {
      const schemaStr = match[1];
      const schema = JSON.parse(schemaStr);
      
      const checkGraphNode = (node) => {
        if (!node) return;
        const type = node['@type'];
        if (type === 'Article' || type === 'BlogPosting') foundArticle = true;
        if (type === 'BreadcrumbList') foundBreadcrumb = true;
        if (type === 'FAQPage') foundFAQ = true;
        
        // Detect fake data
        if (node.aggregateRating || node.review || node.offers) {
          errors.push(`Fake ratings/reviews/prices found in schema for ${article.file}`);
          hasError = true;
        }
      };

      if (schema['@graph']) {
        schema['@graph'].forEach(checkGraphNode);
      } else {
        checkGraphNode(schema);
      }
    } catch (e) {
      errors.push(`Invalid JSON-LD syntax in built HTML for ${article.file}`);
      hasError = true;
    }
  }

  if (!foundArticle) {
    errors.push(`Missing Article/BlogPosting schema for ${article.file}`);
    hasError = true;
  }
  if (!foundBreadcrumb) {
    errors.push(`Missing BreadcrumbList schema for ${article.file}`);
    hasError = true;
  }
  
  if (article.hasVisibleFaq && !foundFAQ) {
    errors.push(`Missing FAQPage schema for ${article.file} which has a visible FAQ section.`);
    hasError = true;
  }
  if (!article.hasVisibleFaq && foundFAQ) {
    errors.push(`Found FAQPage schema for ${article.file} which has NO visible FAQ section.`);
    hasError = true;
  }
});

if (errors.length > 0) {
  console.log('🚨 ERRORS FOUND:');
  errors.forEach(e => console.log(`  - ${e}`));
}

if (warnings.length > 0) {
  console.log('\n⚠️ WARNINGS:');
  warnings.forEach(w => console.log(`  - ${w}`));
}

if (hasError) {
  console.error('\n❌ FAIL: Schema validation check failed.');
  process.exit(1);
} else {
  console.log('\n✅ PASS: Schema validation check passed.');
  process.exit(0);
}
