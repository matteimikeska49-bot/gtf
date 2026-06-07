import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const topicMapPath = path.join(ROOT_DIR, 'src/content/blog/topic-map.json');
const keywordCandidatesPath = path.join(ROOT_DIR, 'src/content/blog/keyword-candidates.json');

let errors = [];
let warnings = [];
let coveredApprovedTopics = 0;

try {
  if (!fs.existsSync(topicMapPath) || !fs.existsSync(keywordCandidatesPath)) {
    console.error("❌ Missing topic-map.json or keyword-candidates.json");
    process.exit(1);
  }

  const topicMap = JSON.parse(fs.readFileSync(topicMapPath, 'utf8'));
  const keywordCandidates = JSON.parse(fs.readFileSync(keywordCandidatesPath, 'utf8'));

  if (!Array.isArray(topicMap) || !Array.isArray(keywordCandidates)) {
    console.error("❌ JSON files must contain arrays");
    process.exit(1);
  }

  const approvedTopics = topicMap.filter(t => 
    t.publishStatus === 'published' || 
    t.publishStatus === 'ready' || 
    t.publishStatus === 'draft' || 
    t.publishStatus === 'approved' ||
    t.decision === 'approved'
  );

  for (const topic of approvedTopics) {
    const keywordRecord = keywordCandidates.find(k => 
      k.keyword === topic.primaryKeyword || k.targetSlug === topic.targetSlug
    );

    if (!keywordRecord) {
      errors.push(`Topic "${topic.targetSlug || topic.primaryKeyword}" is approved/ready but has no keyword record.`);
      continue;
    }

    coveredApprovedTopics++;

    // Check required fields
    const requiredFields = ['keyword', 'language', 'targetSlug', 'intent', 'source', 'lastChecked', 'confidence'];
    for (const field of requiredFields) {
      if (!keywordRecord[field]) {
        errors.push(`Keyword record for "${keywordRecord.keyword}" is missing required field: ${field}`);
      }
    }

    if (typeof keywordRecord.exactVolumeKnown !== 'boolean') {
      errors.push(`Keyword record for "${keywordRecord.keyword}" must have boolean exactVolumeKnown`);
    }

    // Language mismatch
    if (topic.language && keywordRecord.language && topic.language !== keywordRecord.language) {
      errors.push(`Language mismatch for "${keywordRecord.keyword}": Topic is ${topic.language}, Keyword is ${keywordRecord.language}`);
    }

    // If exactVolumeKnown is true
    if (keywordRecord.exactVolumeKnown) {
      if (typeof keywordRecord.volume !== 'number') {
        errors.push(`Keyword "${keywordRecord.keyword}" claims exactVolumeKnown but volume is not a number`);
      }
      if (keywordRecord.source === 'manual_serp_ai_estimate' || keywordRecord.source === 'existing_topic_map') {
        errors.push(`Keyword "${keywordRecord.keyword}" claims exactVolumeKnown but source is ${keywordRecord.source}`);
      }
      if (!keywordRecord.sourceUrl && !keywordRecord.evidence) {
        errors.push(`Keyword "${keywordRecord.keyword}" claims exactVolumeKnown but lacks sourceUrl or evidence`);
      }
    }

    // If volume exists but source is missing
    if (keywordRecord.volume !== null && !keywordRecord.source) {
      errors.push(`Keyword "${keywordRecord.keyword}" has volume but missing source`);
    }

    // Warnings
    if (keywordRecord.volume === null) warnings.push(`Keyword "${keywordRecord.keyword}" has no volume data yet`);
    if (keywordRecord.difficulty === null) warnings.push(`Keyword "${keywordRecord.keyword}" has no difficulty data yet`);
    if (keywordRecord.cpc === null) warnings.push(`Keyword "${keywordRecord.keyword}" has no cpc data yet`);

    if (keywordRecord.source === 'manual_pending') warnings.push(`Keyword "${keywordRecord.keyword}" source is manual_pending`);
    if (keywordRecord.source === 'manual_serp_ai_estimate') warnings.push(`Keyword "${keywordRecord.keyword}" source is manual_serp_ai_estimate`);
    if (keywordRecord.source === 'existing_topic_map') warnings.push(`Keyword "${keywordRecord.keyword}" source is existing_topic_map`);

    if (keywordRecord.futureDataSources) {
      const fd = keywordRecord.futureDataSources;
      if (fd.googleSearchConsole === 'not_connected') warnings.push(`Keyword "${keywordRecord.keyword}": GSC not connected`);
    }
  }

  console.log(`\n🔍 Keyword Check Results:`);
  console.log(`- Total Keyword Records: ${keywordCandidates.length}`);
  console.log(`- Covered Approved Topics: ${coveredApprovedTopics}/${approvedTopics.length}`);

  if (warnings.length > 0) {
    console.log(`\n⚠️ Warnings (${warnings.length}):`);
    // Only show first 5 warnings to avoid spam
    warnings.slice(0, 5).forEach(w => console.log(`  - ${w}`));
    if (warnings.length > 5) console.log(`  ...and ${warnings.length - 5} more warnings`);
  }

  if (errors.length > 0) {
    console.error(`\n❌ Errors (${errors.length}):`);
    errors.forEach(e => console.error(`  - ${e}`));
    console.error(`\n❌ Check failed. Fix errors above.`);
    process.exit(1);
  }

  console.log(`\n✅ Keyword checks passed successfully.`);
} catch (err) {
  console.error("❌ Exception during keyword check:", err);
  process.exit(1);
}
