import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const articlesDir = path.join(ROOT_DIR, 'src/content/blog/articles');
const keywordPath = path.join(ROOT_DIR, 'src/content/blog/keyword-candidates.json');
const scorePath = path.join(ROOT_DIR, 'src/content/blog/topic-priority-score.json');
const capabilitiesPath = path.join(ROOT_DIR, 'src/content/blog/product-capabilities.json');
const intentMapPath = path.join(ROOT_DIR, 'src/content/blog/intent-map.json');
const clusterMapPath = path.join(ROOT_DIR, 'src/content/blog/cluster-authority-map.json');

const keywords = JSON.parse(fs.readFileSync(keywordPath, 'utf8'));
const scores = JSON.parse(fs.readFileSync(scorePath, 'utf8'));
const capabilities = JSON.parse(fs.readFileSync(capabilitiesPath, 'utf8'));
const intents = JSON.parse(fs.readFileSync(intentMapPath, 'utf8'));
const clusters = JSON.parse(fs.readFileSync(clusterMapPath, 'utf8'));

const d53Topics = ['text-to-carousel-ai', 'instagram-carousel-hooks', 'tekst-v-karusel-neyroset', 'content-calendar-to-carousel', 'b2b-keysy-v-linkedin-karusel'];

let errors = [];
let warnings = [];
let scannedCount = 0;
let alignedCount = 0;

const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md') && f !== '_template.md');

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const data = {};
  const lines = match[1].split('\n');
  for (const line of lines) {
    if (!line.includes(':')) continue;
    let [key, ...rest] = line.split(':');
    key = key.trim();
    let value = rest.join(':').trim();
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    } else if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    } else if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(s => s.trim().replace(/^"|"$/g, '').replace(/^'|'$/g, ''));
    } else if (!isNaN(Number(value)) && value !== '') {
      value = Number(value);
    }
    data[key] = value;
  }
  return data;
}

for (const file of files) {
  scannedCount++;
  const filePath = path.join(articlesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const data = parseFrontmatter(content);
  const slug = data.slug || file.replace('.md', ''); // fallback if slug is missing

  const isTest = slug.startsWith('test-');
  const isD53 = d53Topics.includes(slug);
  const isDraftPreview = data.preview === true;
  const isPublished = data.published === true;
  const isHighPriority = scores.some(s => s.targetSlug === slug && (s.priorityTier === 'P1' || s.priorityTier === 'P2'));

  if (isTest) {
    alignedCount++;
    continue;
  }

  // If it's a published legacy article, just warn unless it's a D53 draft being published
  if (isPublished && !isD53 && !isDraftPreview) {
    if (data.keywordRecord === undefined || data.intentId === undefined || data.clusterId === undefined) {
      warnings.push(`Legacy published article "${slug}" is missing alignment frontmatter fields.`);
    } else {
      alignedCount++;
    }
    continue;
  }

  // Active validation for D53, Drafts, and High Priority unpublished
  if (!isD53 && !isDraftPreview && !isHighPriority) {
    continue;
  }

  const reqFields = ['keywordRecord', 'finalPriorityScore', 'priorityTier', 'productCapabilityIds', 'intentId', 'clusterId', 'articleRole', 'relatedProductRoute', 'mockupStatus'];
  const missing = reqFields.filter(f => data[f] === undefined);

  if (missing.length > 0) {
    errors.push(`Article "${slug}" is missing required alignment fields: ${missing.join(', ')}`);
    continue; // Skip further checks if missing fundamental fields
  }

  // Validate values
  if (!keywords.some(k => k.keyword === data.keywordRecord || k.keyword === data.primaryKeyword)) {
    errors.push(`Article "${slug}": keywordRecord "${data.keywordRecord}" not found in keyword database.`);
  }

  if (!scores.some(s => s.targetSlug === slug)) {
    errors.push(`Article "${slug}": topic score not found for this slug.`);
  }

  if (Array.isArray(data.productCapabilityIds)) {
    const invalidCaps = data.productCapabilityIds.filter(id => !capabilities.some(c => c.capabilityId === id));
    if (invalidCaps.length > 0) {
      errors.push(`Article "${slug}": invalid productCapabilityIds found: ${invalidCaps.join(', ')}`);
    }
  }

  if (!intents.some(i => i.intentId === data.intentId)) {
    errors.push(`Article "${slug}": intentId "${data.intentId}" not found in intent-map.`);
  }

  const cluster = clusters.find(c => c.clusterId === data.clusterId);
  if (!cluster) {
    errors.push(`Article "${slug}": clusterId "${data.clusterId}" not found in cluster-authority-map.`);
  } else {
    const role = cluster.articleRoles.find(r => r.slug === slug);
    if (!role || role.role !== data.articleRole) {
      errors.push(`Article "${slug}": articleRole "${data.articleRole}" does not match cluster map.`);
    }
    if (cluster.productRoute !== data.relatedProductRoute) {
      errors.push(`Article "${slug}": relatedProductRoute "${data.relatedProductRoute}" does not match cluster productRoute "${cluster.productRoute}".`);
    }
  }

  if (data.published === true || data.noindex === false || data.approvedForPublish === true) {
    if (isDraftPreview) {
      errors.push(`Article "${slug}": Draft safety violation. A draft cannot be published, indexed, or approvedForPublish.`);
    }
  }

  if (errors.filter(e => e.includes(`"${slug}"`)).length === 0) {
    alignedCount++;
  }
}

console.log(`\n🔍 Brief Alignment Check Results:`);
console.log(`- Scanned Articles: ${scannedCount}`);
console.log(`- Aligned Articles: ${alignedCount}`);
console.log(`- D53 Status: Audited`);

if (warnings.length > 0) {
  console.log(`\n⚠️ Warnings (${warnings.length}):`);
  warnings.slice(0, 5).forEach(w => console.log(`  - ${w}`));
  if (warnings.length > 5) console.log(`  ...and ${warnings.length - 5} more warnings`);
}

if (errors.length > 0) {
  console.error(`\n❌ Errors (${errors.length}):`);
  errors.forEach(e => console.error(`  - ${e}`));
  console.error(`\n❌ Check failed. Fix alignment errors above.`);
  process.exit(1);
}

console.log(`\n✅ Brief + Generation Alignment checks passed successfully.`);
