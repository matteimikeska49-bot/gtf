import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const topicMapPath = path.join(ROOT_DIR, 'src/content/blog/topic-map.json');
const topicScorePath = path.join(ROOT_DIR, 'src/content/blog/topic-priority-score.json');

let errors = [];
let warnings = [];
let coveredApprovedTopics = 0;

try {
  if (!fs.existsSync(topicMapPath) || !fs.existsSync(topicScorePath)) {
    console.error("❌ Missing topic-map.json or topic-priority-score.json");
    process.exit(1);
  }

  const topicMap = JSON.parse(fs.readFileSync(topicMapPath, 'utf8'));
  const topicScores = JSON.parse(fs.readFileSync(topicScorePath, 'utf8'));

  if (!Array.isArray(topicMap) || !Array.isArray(topicScores)) {
    console.error("❌ JSON files must contain arrays");
    process.exit(1);
  }

  const eligibleTopics = topicMap.filter(t => 
    t.publishStatus === 'published' || 
    t.publishStatus === 'ready' || 
    t.publishStatus === 'draft' || 
    t.publishStatus === 'approved' ||
    t.decision === 'approved' ||
    t.decision === 'approve' ||
    t.generationStatus === 'draft_preview'
  );

  let p1Count = 0;
  let p2Count = 0;
  let p3Count = 0;
  let holdCount = 0;

  for (const topic of eligibleTopics) {
    const scoreRecord = topicScores.find(s => 
      s.primaryKeyword === topic.primaryKeyword || s.targetSlug === topic.targetSlug
    );

    if (!scoreRecord) {
      errors.push(`Topic "${topic.targetSlug || topic.primaryKeyword}" is approved/ready but has no priority score record.`);
      continue;
    }

    coveredApprovedTopics++;

    // Check required fields
    const requiredFields = ['targetSlug', 'primaryKeyword', 'language', 'relatedProductRoute', 'scores', 'priorityTier', 'scoringReason', 'scoringLastUpdated'];
    for (const field of requiredFields) {
      if (scoreRecord[field] === undefined) {
        errors.push(`Score record for "${scoreRecord.primaryKeyword}" is missing required field: ${field}`);
      }
    }

    if (!scoreRecord.scores) continue;
    
    if (scoreRecord.scores.finalPriorityScore === undefined) {
      errors.push(`Score record for "${scoreRecord.primaryKeyword}" missing finalPriorityScore`);
    }

    // Check 1-10 constraints
    const individualScores = [
      'demandScore', 'difficultyScore', 'productFitScore', 'businessValueScore', 
      'cannibalizationSafetyScore', 'mockupReadinessScore', 'dataConfidenceScore'
    ];
    
    for (const key of individualScores) {
      const val = scoreRecord.scores[key];
      if (typeof val !== 'number' || val < 1 || val > 10) {
        errors.push(`Score "${key}" for "${scoreRecord.primaryKeyword}" must be between 1 and 10. Found: ${val}`);
      }
    }

    // Check final score 1-100
    const finalScore = scoreRecord.scores.finalPriorityScore;
    if (typeof finalScore !== 'number' || finalScore < 1 || finalScore > 100) {
      errors.push(`Final score for "${scoreRecord.primaryKeyword}" must be between 1 and 100. Found: ${finalScore}`);
    }

    // Check keyword evidence
    if (!scoreRecord.keywordEvidence) {
      errors.push(`Score record for "${scoreRecord.primaryKeyword}" missing keywordEvidence`);
    }

    // Tiers rules
    const tier = scoreRecord.priorityTier;
    if (tier === 'P1' && finalScore < 70) {
      errors.push(`Topic "${scoreRecord.primaryKeyword}" is P1 but final score is only ${finalScore} (< 70)`);
    }
    
    if (tier === 'HOLD' && finalScore > 70 && !scoreRecord.scoringReason.toLowerCase().includes('hold')) {
      errors.push(`Topic "${scoreRecord.primaryKeyword}" is HOLD with high score ${finalScore} but no "hold" reason given`);
    }

    // Warnings
    const ev = scoreRecord.keywordEvidence;
    if (ev) {
      if (ev.volume === null) warnings.push(`Topic "${scoreRecord.primaryKeyword}" volume is null`);
      if (ev.exactVolumeKnown === false) warnings.push(`Topic "${scoreRecord.primaryKeyword}" exactVolumeKnown is false`);
      if (ev.source.includes('manual_') || ev.source === 'existing_topic_map') {
        warnings.push(`Topic "${scoreRecord.primaryKeyword}" uses manual/estimated demand source: ${ev.source}`);
      }
    }
    if (scoreRecord.scores.dataConfidenceScore <= 4) warnings.push(`Topic "${scoreRecord.primaryKeyword}" has low dataConfidenceScore (<=4)`);
    if (scoreRecord.scores.mockupReadinessScore <= 5) warnings.push(`Topic "${scoreRecord.primaryKeyword}" has low mockupReadinessScore (<=5)`);
  }

  for (const scoreRecord of topicScores) {
    const tier = scoreRecord.priorityTier;
    if (tier === 'P1') p1Count++;
    else if (tier === 'P2') p2Count++;
    else if (tier === 'P3') p3Count++;
    else if (tier === 'HOLD') holdCount++;
  }

  console.log(`\n🔍 Topic Score Check Results:`);
  console.log(`- Total Scored Topics: ${topicScores.length}`);
  console.log(`- Covered Approved Topics: ${coveredApprovedTopics}/${eligibleTopics.length}`);
  console.log(`- Tiers: P1: ${p1Count} | P2: ${p2Count} | P3: ${p3Count} | HOLD: ${holdCount}`);

  if (warnings.length > 0) {
    console.log(`\n⚠️ Warnings (${warnings.length}):`);
    warnings.slice(0, 5).forEach(w => console.log(`  - ${w}`));
    if (warnings.length > 5) console.log(`  ...and ${warnings.length - 5} more warnings`);
  }

  if (errors.length > 0) {
    console.error(`\n❌ Errors (${errors.length}):`);
    errors.forEach(e => console.error(`  - ${e}`));
    console.error(`\n❌ Check failed. Fix errors above.`);
    process.exit(1);
  }

  console.log(`\n✅ Topic score checks passed successfully.`);
} catch (err) {
  console.error("❌ Exception during topic score check:", err);
  process.exit(1);
}
