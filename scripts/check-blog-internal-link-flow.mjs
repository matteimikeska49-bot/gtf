import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');

const articlesDir = path.join(ROOT_DIR, 'src/content/blog/articles');
const clusterMapPath = path.join(ROOT_DIR, 'src/content/blog/cluster-authority-map.json');
const intentMapPath = path.join(ROOT_DIR, 'src/content/blog/intent-map.json');
const batchStatusPath = path.join(ROOT_DIR, 'src/content/blog/batch-status.json');

const clusterMap = JSON.parse(fs.readFileSync(clusterMapPath, 'utf8'));
const intentMap = JSON.parse(fs.readFileSync(intentMapPath, 'utf8'));
const batchStatus = JSON.parse(fs.readFileSync(batchStatusPath, 'utf8'));

const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md') && f !== '_template.md');

let scannedCount = 0;
let totalLinks = 0;
let draftViolations = 0;
let languageViolations = 0;
let warnings = [];
let errors = [];

const d53Topics = ['text-to-carousel-ai', 'instagram-carousel-hooks', 'tekst-v-karusel-neyroset', 'content-calendar-to-carousel', 'b2b-keysy-v-linkedin-karusel'];
const validPublicRoutes = new Set([
  '/', '/ru', '/ai-carousel-maker', '/ru/ai-generator-karuselej', '/ru/ii-generator-karuseley',
  '/ai-content-generator', '/ru/generator-kontenta', 
  '/ai-instagram-post-generator', '/ai-post-maker', '/ru/generator-postov-instagram', 
  '/linkedin-carousel-maker', '/ru/generator-karuselej-linkedin', 
  '/blog', '/ru/blog', '/privacy-policy', '/ru/politika', '/politika', 
  '/ru/polzovatelskoe-soglashenie', '/ru/soglasie-na-obrabotku-personalnyh-dannyh', 
  '/ru/ugc-creator-terms', '/refund-policy', '/terms-of-service', 
  '/personal-data-consent', '/pricing', '/carousel/create'
]);

function extractData(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, body: content };
  
  const frontmatterStr = match[1];
  const data = {};
  
  const parseMatch = (regex) => {
    const m = frontmatterStr.match(regex);
    return m ? m[1] : null;
  };

  data.slug = parseMatch(/^slug:\s*["']?([^"'\n]+?)["']?$/m);
  data.language = parseMatch(/^language:\s*["']?([^"'\n]+?)["']?$/m) || 'en';
  data.clusterId = parseMatch(/^clusterId:\s*["']?([^"'\n]+?)["']?$/m);
  data.articleRole = parseMatch(/^articleRole:\s*["']?([^"'\n]+?)["']?$/m);
  data.hubSlug = parseMatch(/^hubSlug:\s*["']?([^"'\n]+?)["']?$/m);
  data.relatedProductRoute = parseMatch(/^relatedProductRoute:\s*["']?([^"'\n]+?)["']?$/m);
  
  const pubMatch = frontmatterStr.match(/^published:\s*(true|false)/m);
  data.published = pubMatch ? pubMatch[1] === 'true' : false;

  const noindexMatch = frontmatterStr.match(/^noindex:\s*(true|false)/m);
  data.noindex = noindexMatch ? noindexMatch[1] === 'true' : false;

  const previewMatch = frontmatterStr.match(/^preview:\s*(true|false)/m);
  data.preview = previewMatch ? previewMatch[1] === 'true' : false;

  return { data, body: match[2], frontmatterStr };
}

function findHrefs(content) {
  const links = [];
  const regex = /\[([^\]]+)\]\((.*?)\)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const anchor = match[1].trim();
    const url = match[2].trim().split('#')[0];
    if (url.startsWith('/')) links.push({ url, anchor, source: 'markdown' });
  }
  const yamlRegex = /(?:url|href|secondaryHref):\s*["']?(\/[^"'\s]+)["']?/g;
  while ((match = yamlRegex.exec(content)) !== null) {
    const url = match[1].split('#')[0];
    links.push({ url, anchor: 'YAML', source: 'yaml' });
  }
  return links;
}

const articlesData = files.map(file => {
  const content = fs.readFileSync(path.join(articlesDir, file), 'utf8');
  const { data, body, frontmatterStr } = extractData(content);
  data.slug = data.slug || file.replace('.md', '');
  data.route = data.language === 'ru' ? `/ru/blog/${data.slug}` : `/blog/${data.slug}`;
  data.links = findHrefs(content);
  if (data.published && !data.noindex && !data.preview) {
    validPublicRoutes.add(data.route);
  }
  return data;
});

articlesData.forEach(article => {
  if (article.slug.startsWith('test-')) return;
  scannedCount++;
  
  const cluster = clusterMap.find(c => c.clusterId === article.clusterId);
  const isD53 = d53Topics.includes(article.slug);
  const isPublished = article.published && !article.noindex;

  let hasProductLink = false;
  let hasHubLink = false;

  article.links.forEach(({ url, anchor, source }) => {
    totalLinks++;
    const targetArticle = articlesData.find(a => a.route === url);
    const isTargetPublic = validPublicRoutes.has(url);
    const isTargetDraft = targetArticle && (!targetArticle.published || targetArticle.noindex || targetArticle.preview);

    // 1. Missing route
    if (!targetArticle && !isTargetPublic) {
      errors.push(`[P0] Broken link in ${article.slug}: '${url}' does not exist.`);
    }

    // 2. Draft leak
    if (isPublished && isTargetDraft) {
      draftViolations++;
      errors.push(`[P0] Draft Leak in ${article.slug}: published article links to draft '${url}'.`);
    }

    // 3. Language boundaries
    if (article.language === 'en' && url.startsWith('/ru/')) {
      languageViolations++;
      errors.push(`[P0] Lang Violation in ${article.slug}: EN article links to RU route '${url}'.`);
    }
    if (article.language === 'ru' && !url.startsWith('/ru/') && url.length > 1) { // exclude '/'
      languageViolations++;
      errors.push(`[P0] Lang Violation in ${article.slug}: RU article links to EN route '${url}'.`);
    }

    // Link counts & flags
    if (url === article.relatedProductRoute || (cluster && url === cluster.productRoute)) {
      hasProductLink = true;
    }
    if (article.articleRole === 'supporting' && article.hubSlug && url.includes(article.hubSlug)) {
      hasHubLink = true;
    }

    // Generic anchors
    if (anchor.toLowerCase() === 'click here' || anchor.toLowerCase() === 'read more') {
      warnings.push(`Generic anchor "${anchor}" used in ${article.slug} for ${url}.`);
    }
  });

  // Flow rules
  if (cluster) {
    if (article.articleRole === 'supporting' && article.hubSlug) {
      const hubArticle = articlesData.find(a => a.slug === article.hubSlug);
      // Only warn if the hub exists and is published (or if we are published, the hub MUST be published)
      if (hubArticle && hubArticle.published && !hubArticle.noindex && !hasHubLink) {
        warnings.push(`Cluster Flow: Supporting article ${article.slug} lacks link to its published hub ${article.hubSlug}.`);
      }
    }
    if (article.articleRole === 'hub' && cluster.supportingArticles && cluster.supportingArticles.length > 0) {
      let publishedSupporting = 0;
      let linkedSupporting = 0;
      cluster.supportingArticles.forEach(supp => {
        const suppArticle = articlesData.find(a => a.slug === supp);
        if (suppArticle && suppArticle.published && !suppArticle.noindex) {
          publishedSupporting++;
          if (article.links.some(l => l.url === suppArticle.route)) linkedSupporting++;
        }
      });
      if (publishedSupporting > 0 && linkedSupporting === 0) {
        warnings.push(`Cluster Flow: Hub article ${article.slug} lacks links to any of its ${publishedSupporting} published supporting articles.`);
      }
    }
  }

  if (!hasProductLink && isPublished) {
    warnings.push(`Cluster Flow: Published article ${article.slug} lacks link to product route.`);
  }

  if (isD53) {
    if (!hasProductLink) errors.push(`[P0] D53 article ${article.slug} missing product route link.`);
  }
});

console.log(`\n🔗 Internal Link Flow & Cluster Rules Check`);
console.log(`- Scanned Articles: ${scannedCount}`);
console.log(`- Total Internal Links Checked: ${totalLinks}`);

if (draftViolations > 0 || languageViolations > 0) {
  console.error(`- Draft Violations: ${draftViolations}`);
  console.error(`- Language Violations: ${languageViolations}`);
}

let d53Safe = !errors.some(e => e.includes('D53'));
console.log(`- D53 Flow Status: ${d53Safe ? 'Safe' : 'Unsafe'}`);

if (warnings.length > 0) {
  console.log(`\n⚠️ Warnings (${warnings.length}):`);
  warnings.slice(0, 10).forEach(w => console.log(`  - ${w}`));
  if (warnings.length > 10) console.log(`  ...and ${warnings.length - 10} more warnings.`);
}

if (errors.length > 0) {
  console.error(`\n❌ Errors (${errors.length}):`);
  errors.forEach(e => console.error(`  - ${e}`));
  console.error(`\n❌ Internal link flow check failed.`);
  process.exit(1);
}

console.log(`\n✅ Internal link flow and cluster rules passed successfully.`);
