import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ARTICLES_DIR = path.join(__dirname, '../src/content/blog/articles');

console.log('🔗 Starting internal link check...\n');

let hasP0Error = false;
let warnings = [];
let conflicts = [];

// 1. Read markdown articles and their metadata
const articles = [];
const publicRoutes = new Set([
  '/', '/ru', '/ai-carousel-maker', '/ru/ai-generator-karuselej', 
  '/ai-content-generator', '/ru/generator-kontenta', 
  '/ai-instagram-post-generator', '/ai-post-maker', '/ru/generator-postov-instagram', 
  '/linkedin-carousel-maker', '/ru/generator-karuselej-linkedin', 
  '/blog', '/ru/blog', '/privacy-policy', '/ru/politika', '/politika', 
  '/ru/polzovatelskoe-soglashenie', '/ru/soglasie-na-obrabotku-personalnyh-dannyh', 
  '/ru/ugc-creator-terms', '/refund-policy', '/terms-of-service', 
  '/personal-data-consent', '/pricing', '/carousel/create'
]);

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
    const published = /^published:\s*true\b/m.test(content);
    const noindex = /^noindex:\s*true\b/m.test(content);
    const preview = /^preview:\s*true\b/m.test(content);
    
    const route = language === 'ru' ? `/ru/blog/${slug}` : `/blog/${slug}`;
    
    articles.push({ file, route, language, published, noindex, preview, content });
    
    if (published && !noindex) {
      publicRoutes.add(route);
    }
  }
} catch (e) {
  console.error(`❌ Failed to read articles: ${e.message}`);
  process.exit(1);
}

// Helper to find all hrefs in markdown
function findHrefs(markdown) {
  const links = [];
  // Match standard markdown links: [text](url)
  const regex = /\[.*?\]\((.*?)\)/g;
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    const url = match[1].trim();
    if (url.startsWith('/')) { // Only check internal absolute paths
      links.push(url.split('#')[0]); // ignore hash for route checking
    }
  }
  return links;
}

// 2. Check internal links
articles.forEach(article => {
  const internalLinks = findHrefs(article.content);
  
  internalLinks.forEach(link => {
    // Check 1: Does the route exist at all? (Public or Draft)
    const targetArticle = articles.find(a => a.route === link);
    const isStaticPublic = publicRoutes.has(link);
    
    if (!targetArticle && !isStaticPublic) {
      conflicts.push(`Broken link in ${article.file}: Route '${link}' does not exist.`);
      hasP0Error = true;
      return;
    }

    // Check 2: If the current article is published, it CANNOT link to a draft/noindex/preview page
    if (article.published && !article.noindex) {
      if (targetArticle && (!targetArticle.published || targetArticle.noindex || targetArticle.preview)) {
        conflicts.push(`Invalid link in published ${article.file}: Cannot link to draft/noindex route '${link}'.`);
        hasP0Error = true;
      }
      
      if (link.includes('test-seo-template') || link.includes('test-ru-seo-template')) {
        conflicts.push(`Invalid link in published ${article.file}: Cannot link to test template '${link}'.`);
        hasP0Error = true;
      }
    }
  });
});

// 3. Report
if (conflicts.length > 0) {
  console.log('🚨 P0 LINK CONFLICTS FOUND:');
  conflicts.forEach(c => console.log(`  - ${c}`));
} else {
  console.log('✅ No P0 internal linking errors found.');
}

if (warnings.length > 0) {
  console.log('\n⚠️ WARNINGS:');
  warnings.forEach(w => console.log(`  - ${w}`));
}

if (hasP0Error) {
  console.error('\n❌ FAIL: Internal linking check failed.');
  process.exit(1);
} else {
  console.log('\n✅ PASS: Internal linking check passed.');
  process.exit(0);
}
