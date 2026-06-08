import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const topicMapPath = path.join(ROOT_DIR, 'src/content/blog/topic-map.json');
const clusterMapPath = path.join(ROOT_DIR, 'src/content/blog/cluster-authority-map.json');

if (!fs.existsSync(topicMapPath) || !fs.existsSync(clusterMapPath)) {
  console.error("❌ Missing required JSON files for cluster checking.");
  process.exit(1);
}

const topicMap = JSON.parse(fs.readFileSync(topicMapPath, 'utf8'));
const clusterMap = JSON.parse(fs.readFileSync(clusterMapPath, 'utf8'));

let errors = [];
let warnings = [];
let roleCount = 0;
let d53Count = 0;

const d53Topics = ['text-to-carousel-ai', 'instagram-carousel-hooks', 'tekst-v-karusel-neyroset', 'content-calendar-to-carousel', 'b2b-keysy-v-linkedin-karusel'];

const activeTopics = topicMap.filter(t => 
  t.publishStatus === 'published' || 
  t.publishStatus === 'ready' || 
  t.generationStatus === 'draft_preview'
);

const combinedActive = new Set([...activeTopics.map(t => t.targetSlug), ...d53Topics]);

const clusterIds = new Set();
clusterMap.forEach(cluster => {
  if (clusterIds.has(cluster.clusterId)) {
    errors.push(`Duplicate clusterId found: ${cluster.clusterId}`);
  }
  clusterIds.add(cluster.clusterId);
  
  if (!cluster.productRoute) errors.push(`Cluster ${cluster.clusterId} missing productRoute.`);
  if (!cluster.language) errors.push(`Cluster ${cluster.clusterId} missing language.`);

  if (cluster.supportingArticles.length > 0 && !cluster.hubArticle) {
    warnings.push(`Cluster ${cluster.clusterId} has supporting articles but no hubArticle.`);
  }
});

for (const targetSlug of combinedActive) {
  if (!targetSlug) continue;

  const isD53 = d53Topics.includes(targetSlug);
  
  // Find article role in any cluster
  let foundRole = null;
  let foundCluster = null;

  for (const cluster of clusterMap) {
    const role = cluster.articleRoles.find(r => r.slug === targetSlug);
    if (role) {
      if (foundRole) {
        errors.push(`Topic "${targetSlug}" is assigned to roles in multiple clusters or multiple times.`);
      }
      foundRole = role;
      foundCluster = cluster;
    }
  }

  if (!foundRole) {
    if (isD53) {
      errors.push(`D53 Draft Topic "${targetSlug}" has no cluster role assignment.`);
    } else {
      warnings.push(`Active legacy topic "${targetSlug}" has no cluster assignment.`);
    }
    continue;
  }

  roleCount++;
  
  if (isD53) d53Count++;

  if (!foundRole.role) errors.push(`Topic "${targetSlug}" has cluster record but missing role (hub/supporting/etc).`);
  
  // Topic language matches cluster language
  const tm = topicMap.find(t => t.targetSlug === targetSlug);
  if (tm && tm.language !== foundCluster.language) {
    errors.push(`Language mismatch: Topic "${targetSlug}" is ${tm.language} but assigned to ${foundCluster.language} cluster.`);
  }
}

console.log(`\n🔍 Cluster Authority Check Results:`);
console.log(`- Total Clusters: ${clusterMap.length}`);
console.log(`- Total Article Roles Mapped: ${roleCount}`);
console.log(`- D53 Topics Mapped: ${d53Count}/5`);

if (warnings.length > 0) {
  console.log(`\n⚠️ Warnings (${warnings.length}):`);
  warnings.slice(0, 5).forEach(w => console.log(`  - ${w}`));
  if (warnings.length > 5) console.log(`  ...and ${warnings.length - 5} more warnings`);
}

if (errors.length > 0) {
  console.error(`\n❌ Errors (${errors.length}):`);
  errors.forEach(e => console.error(`  - ${e}`));
  console.error(`\n❌ Check failed. Fix cluster mapping errors above.`);
  process.exit(1);
}

console.log(`\n✅ Cluster authority checks passed successfully.`);
