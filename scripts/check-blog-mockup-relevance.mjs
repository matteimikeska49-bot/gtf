import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const articlesDir = path.join(ROOT_DIR, 'src/content/blog/articles');
const registryPath = path.join(ROOT_DIR, 'src/content/blog/mockups/registry.json');
const decisionsPath = path.join(ROOT_DIR, 'src/content/blog/mockup-decisions.json');
const capabilitiesPath = path.join(ROOT_DIR, 'src/content/blog/product-capabilities.json');
const clusterMapPath = path.join(ROOT_DIR, 'src/content/blog/cluster-authority-map.json');

const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const decisions = JSON.parse(fs.readFileSync(decisionsPath, 'utf8'));
const capabilities = JSON.parse(fs.readFileSync(capabilitiesPath, 'utf8'));
const clusters = JSON.parse(fs.readFileSync(clusterMapPath, 'utf8'));

const d53Topics = ['text-to-carousel-ai', 'instagram-carousel-hooks', 'tekst-v-karusel-neyroset', 'content-calendar-to-carousel', 'b2b-keysy-v-linkedin-karusel'];

let errors = [];
let warnings = [];
let scannedCount = 0;
let strictCount = 0;

const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md') && f !== '_template.md');

function extractData(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, body: content };
  
  const frontmatterStr = match[1];
  const data = {
    preview: false,
    published: undefined,
    priorityTier: null,
    clusterId: null,
    language: 'en'
  };
  
  if (/^slug:\s*["']?([^"'\n]+?)["']?$/m.test(frontmatterStr)) data.slug = frontmatterStr.match(/^slug:\s*["']?([^"'\n]+?)["']?$/m)[1];
  if (/^preview:\s*true/m.test(frontmatterStr)) data.preview = true;
  if (/^published:\s*false/m.test(frontmatterStr)) data.published = false;
  if (/^published:\s*true/m.test(frontmatterStr)) data.published = true;
  if (/^language:\s*["']?([^"'\n]+?)["']?$/m.test(frontmatterStr)) data.language = frontmatterStr.match(/^language:\s*["']?([^"'\n]+?)["']?$/m)[1];
  if (/^priorityTier:\s*["']?(P[1-3]|HOLD)["']?/m.test(frontmatterStr)) data.priorityTier = frontmatterStr.match(/^priorityTier:\s*["']?(P[1-3]|HOLD)["']?/m)[1];
  if (/^clusterId:\s*["']?([^"'\n]+?)["']?$/m.test(frontmatterStr)) data.clusterId = frontmatterStr.match(/^clusterId:\s*["']?([^"'\n]+?)["']?$/m)[1];

  return { data, body: match[2] };
}

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

  // Find :::mockup in body
  const mockupRegex = /:::mockup\{slot=["']?([^"'\s}]+)["']?\}/g;
  const slotsUsed = [];
  let m;
  while ((m = mockupRegex.exec(body)) !== null) {
    slotsUsed.push(m[1]);
  }

  if (!isStrict) {
    if (slotsUsed.length > 0) {
      warnings.push(`Legacy article "${slug}" has mockups but may not have relevance checks enforced.`);
    }
    continue;
  }

  strictCount++;
  
  const decision = decisions.find(d => d.slug === slug);
  if (!decision) {
    if (slotsUsed.length > 0) {
      errors.push(`Article "${slug}": uses :::mockup but has no mockup decision record.`);
    }
    continue;
  }

  if (decision.mockupStatus === 'present' && decision.assetsUsed.length === 0) {
    errors.push(`Article "${slug}": mockupStatus is 'present' but no assets in decision.`);
  }

  if (decision.mockupStatus === 'not_available' && slotsUsed.length > 0) {
    errors.push(`Article "${slug}": mockupStatus is 'not_available' but still contains :::mockup.`);
  }
  
  if (decision.mockupStatus === 'planned' && isHighPriority) {
    warnings.push(`Article "${slug}": mockupStatus is 'planned' for a high-priority draft.`);
  }

  for (const slot of slotsUsed) {
    if (!decision.slotsUsed.includes(slot)) {
      errors.push(`Article "${slug}": slot '${slot}' used in article is not in decision record.`);
    }
  }

  if (decision.assetsUsed.length > 0) {
    for (const assetId of decision.assetsUsed) {
      const asset = registry.assets.find(a => a.assetId === assetId);
      if (!asset) {
        errors.push(`Article "${slug}": assigned asset '${assetId}' not found in registry.`);
        continue;
      }

      if (asset.language !== data.language && asset.language !== 'multi') {
        errors.push(`Article "${slug}": selected asset language '${asset.language}' mismatches article language '${data.language}'.`);
      }

      // Check cluster mismatch
      const cluster = clusters.find(c => c.clusterId === data.clusterId);
      if (cluster && cluster.clusterName.toLowerCase().includes('instagram') && asset.platform === 'linkedin') {
        errors.push(`Article "${slug}": selected asset platform '${asset.platform}' contradicts article cluster '${cluster.clusterName}'.`);
      }
      if (cluster && cluster.clusterName.toLowerCase().includes('linkedin') && asset.platform === 'instagram') {
        errors.push(`Article "${slug}": selected asset platform '${asset.platform}' contradicts article cluster '${cluster.clusterName}'.`);
      }

      if (asset.visibleText.includes("unknown")) {
        if (isD53) {
          errors.push(`Article "${slug}": D53 topic uses unverified/unknown visibleText asset '${asset.assetId}'.`);
        } else {
          warnings.push(`Article "${slug}": uses unverified/unknown visibleText asset '${asset.assetId}'.`);
        }
      }

      for (const capId of asset.capabilityIds) {
        if (!capabilities.some(c => c.capabilityId === capId)) {
           // Maybe just warn if unknown capability
        }
      }
    }
  }
}

console.log(`\n🔍 Mockup Relevance Check Results:`);
console.log(`- Scanned Articles: ${scannedCount}`);
console.log(`- Strict Targets: ${strictCount}`);

if (warnings.length > 0) {
  console.log(`\n⚠️ Warnings (${warnings.length}):`);
  warnings.slice(0, 10).forEach(w => console.log(`  - ${w}`));
  if (warnings.length > 10) console.log(`  ...and ${warnings.length - 10} more warnings`);
}

if (errors.length > 0) {
  console.error(`\n❌ Errors (${errors.length}):`);
  errors.forEach(e => console.error(`  - ${e}`));
  console.error(`\n❌ Check failed. Fix Mockup Relevance errors above.`);
  process.exit(1);
}

console.log(`\n✅ Mockup Relevance checks passed successfully.`);
