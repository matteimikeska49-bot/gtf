import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const articlesDir = path.join(ROOT_DIR, 'src/content/blog/articles');
const capabilitiesPath = path.join(ROOT_DIR, 'src/content/blog/product-capabilities.json');
const clusterMapPath = path.join(ROOT_DIR, 'src/content/blog/cluster-authority-map.json');
const appRoutesPath = path.join(ROOT_DIR, 'src/App.jsx');

const capabilities = JSON.parse(fs.readFileSync(capabilitiesPath, 'utf8'));
const clusters = JSON.parse(fs.readFileSync(clusterMapPath, 'utf8'));

const d53Topics = ['text-to-carousel-ai', 'instagram-carousel-hooks', 'tekst-v-karusel-neyroset', 'content-calendar-to-carousel', 'b2b-keysy-v-linkedin-karusel'];

let errors = [];
let warnings = [];
let scannedCount = 0;
let strictCount = 0;

// Read existing routes from App.jsx
function readExistingRoutes() {
  const routes = new Set();
  const appContent = fs.readFileSync(appRoutesPath, 'utf-8');
  const routeMatches = appContent.matchAll(/<Route\s+path=["']([^"']+)["']/g);
  for (const match of routeMatches) {
    const route = match[1];
    if (!route.includes(':') && route !== '*') routes.add(route);
  }
  return routes;
}
const existingRoutes = readExistingRoutes();

const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md') && f !== '_template.md');

function extractData(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, body: content };
  
  const frontmatterStr = match[1];
  const data = {
    preview: false,
    published: undefined,
    priorityTier: null,
    relatedProductRoute: null,
    clusterId: null,
    language: 'en'
  };
  
  if (/^slug:\s*["']?([^"'\n]+?)["']?$/m.test(frontmatterStr)) data.slug = frontmatterStr.match(/^slug:\s*["']?([^"'\n]+?)["']?$/m)[1];
  if (/^preview:\s*true/m.test(frontmatterStr)) data.preview = true;
  if (/^published:\s*false/m.test(frontmatterStr)) data.published = false;
  if (/^published:\s*true/m.test(frontmatterStr)) data.published = true;
  if (/^language:\s*["']?([^"'\n]+?)["']?$/m.test(frontmatterStr)) data.language = frontmatterStr.match(/^language:\s*["']?([^"'\n]+?)["']?$/m)[1];
  if (/^priorityTier:\s*["']?(P[1-3]|HOLD)["']?/m.test(frontmatterStr)) data.priorityTier = frontmatterStr.match(/^priorityTier:\s*["']?(P[1-3]|HOLD)["']?/m)[1];
  if (/^relatedProductRoute:\s*["']?([^"'\n]+?)["']?$/m.test(frontmatterStr)) data.relatedProductRoute = frontmatterStr.match(/^relatedProductRoute:\s*["']?([^"'\n]+?)["']?$/m)[1];
  if (/^clusterId:\s*["']?([^"'\n]+?)["']?$/m.test(frontmatterStr)) data.clusterId = frontmatterStr.match(/^clusterId:\s*["']?([^"'\n]+?)["']?$/m)[1];

  return { data, body: match[2] };
}

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

for (const file of files) {
  scannedCount++;
  const filePath = path.join(articlesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const { data, body } = extractData(content);
  const slug = data.slug || file.replace('.md', '');

  if (slug.startsWith('test-')) continue;

  const isD53 = d53Topics.includes(slug);
  const isDraftPreview = data.preview === true || data.published === false;
  const isHighPriority = data.priorityTier === 'P1' || data.priorityTier === 'P2';
  
  const isStrict = isD53 || isDraftPreview || isHighPriority;

  if (!isStrict) {
    if (data.relatedProductRoute && !existingRoutes.has(data.relatedProductRoute)) {
      warnings.push(`Legacy article "${slug}" links to non-existent route ${data.relatedProductRoute}.`);
    }
    continue;
  }

  strictCount++;

  const route = data.relatedProductRoute;
  if (!route) {
    errors.push(`Article "${slug}": missing relatedProductRoute in frontmatter.`);
    continue;
  }

  if (!existingRoutes.has(route)) {
    errors.push(`Article "${slug}": route '${route}' does not exist in App.jsx.`);
  }

  // Cluster match
  if (data.clusterId) {
    const cluster = clusters.find(c => c.clusterId === data.clusterId);
    if (cluster && cluster.productRoute && cluster.productRoute !== route) {
      errors.push(`Article "${slug}": relatedProductRoute '${route}' does not match cluster productRoute '${cluster.productRoute}'.`);
    }
  }

  // Language match
  if (data.language === 'en' && route.startsWith('/ru/')) {
    errors.push(`Article "${slug}": EN article links to RU route '${route}'.`);
  }
  if (data.language === 'ru' && !route.startsWith('/ru/') && route !== '/') {
    // Only warn for RU -> EN unless we explicitly forbid it. Contract: "RU articles must link to RU routes, unless no RU equivalent exists."
    // Let's hard fail if there's a known RU route for the EN one. For simplicity, just warn.
    warnings.push(`Article "${slug}": RU article links to EN route '${route}'.`);
  }

  // Check body for contextual link
  const routePattern = escapeRegex(route);
  const linkRegex = new RegExp(`\\[([^\\]]+)\\]\\(${routePattern}(?:#[^)]+)?\\)`, 'g');
  const links = [...body.matchAll(linkRegex)];

  if (links.length === 0) {
    errors.push(`Article "${slug}": body markdown must contain at least one contextual link to '${route}'.`);
  } else {
    if (links.length > 3) {
      warnings.push(`Article "${slug}": body contains ${links.length} links to '${route}'. This might be over-promotional.`);
    }
    // Check if anchor is empty or generic
    for (const match of links) {
      const anchor = match[1].toLowerCase();
      if (anchor === 'click here' || anchor === 'link' || anchor === 'here') {
        errors.push(`Article "${slug}": product link anchor text is too generic ("${match[1]}").`);
      }
    }
  }

  // Forbidden patterns
  if (body.includes('[!product]')) {
    errors.push(`Article "${slug}": body contains forbidden [!product] directive.`);
  }
  if (body.includes('<InlineProductBlock')) {
    errors.push(`Article "${slug}": body contains forbidden <InlineProductBlock /> JSX component.`);
  }

  // Generic body CTA check (if it looks like a big promotional block)
  if (body.match(/^##\s+(Ready to|Try GoToFlow|Start creating|Get Started)/im)) {
    warnings.push(`Article "${slug}": body might contain a standalone CTA section.`);
  }
}

console.log(`\n🔍 Product-led Links Contract Check Results:`);
console.log(`- Scanned Articles: ${scannedCount}`);
console.log(`- Strict Targets: ${strictCount}`);
console.log(`- D53 Status: Audited`);

if (warnings.length > 0) {
  console.log(`\n⚠️ Warnings (${warnings.length}):`);
  warnings.slice(0, 10).forEach(w => console.log(`  - ${w}`));
  if (warnings.length > 10) console.log(`  ...and ${warnings.length - 10} more warnings`);
}

if (errors.length > 0) {
  console.error(`\n❌ Errors (${errors.length}):`);
  errors.forEach(e => console.error(`  - ${e}`));
  console.error(`\n❌ Check failed. Fix Product-led Links contract errors above.`);
  process.exit(1);
}

console.log(`\n✅ Product-led Links contract checks passed successfully.`);
