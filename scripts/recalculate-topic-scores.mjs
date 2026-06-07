import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const topicMapPath = path.join(ROOT_DIR, 'src/content/blog/topic-map.json');
const keywordCandidatesPath = path.join(ROOT_DIR, 'src/content/blog/keyword-candidates.json');
const topicScorePath = path.join(ROOT_DIR, 'src/content/blog/topic-priority-score.json');

const topicMap = JSON.parse(fs.readFileSync(topicMapPath, 'utf8'));
const keywords = JSON.parse(fs.readFileSync(keywordCandidatesPath, 'utf8'));

let topicScores = [];
if (fs.existsSync(topicScorePath)) {
  topicScores = JSON.parse(fs.readFileSync(topicScorePath, 'utf8'));
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

let recalculated = 0;
let downgraded = 0;
let exportNeeded = 0;

let p1Count = 0;
let p2Count = 0;
let p3Count = 0;
let holdCount = 0;

let d53Scores = {};

eligibleTopics.forEach(topic => {
  const keyword = keywords.find(k => k.keyword === topic.primaryKeyword || k.targetSlug === topic.targetSlug);
  let existingScore = topicScores.find(s => s.targetSlug === topic.targetSlug || s.primaryKeyword === topic.primaryKeyword);
  
  if (!existingScore) return; // Skip if it wasn't scored previously at all

  let keywordEvidence = { ...existingScore.keywordEvidence };
  
  if (keyword) {
    keywordEvidence = {
      source: keyword.source || "manual_serp_ai_estimate",
      confidence: keyword.confidence || "medium",
      exactVolumeKnown: keyword.exactVolumeKnown || false,
      volume: keyword.volume !== undefined ? keyword.volume : null,
      trend: keyword.trend || ""
    };
  }

  // Preserve existing sub-scores, except those affected by demand/data confidence
  let ds = existingScore.scores.demandScore;
  let dcs = existingScore.scores.dataConfidenceScore;
  const pfs = existingScore.scores.productFitScore;
  const bvs = existingScore.scores.businessValueScore;
  const css = existingScore.scores.cannibalizationSafetyScore;
  const diffs = existingScore.scores.difficultyScore;
  const mrs = existingScore.scores.mockupReadinessScore;

  // Demand score
  if (keywordEvidence.volume > 0 && (keywordEvidence.source === 'yandex_wordstat_manual' || keywordEvidence.exactVolumeKnown)) {
    if (keywordEvidence.volume > 1000) ds = 10;
    else if (keywordEvidence.volume > 300) ds = 8;
    else ds = 7;
  } else if (keyword && keyword.performance && (keyword.performance.impressions > 0 || keyword.performance.clicks > 0)) {
    if (keyword.performance.clicks > 50 || keyword.performance.impressions > 1000) ds = 9;
    else ds = 6;
  } else if (keywordEvidence.source === 'google_trends_manual' && keywordEvidence.trend === 'rising') {
    ds = 7;
  } else if (keywordEvidence.source === 'existing_topic_map' || keywordEvidence.source === 'manual_serp_ai_estimate') {
    ds = Math.min(ds, 6);
  } else {
    ds = Math.min(ds, 3);
  }

  // Data confidence score
  if (keywordEvidence.source === 'yandex_wordstat_manual' || keywordEvidence.source === 'gsc_manual' || keywordEvidence.source === 'yandex_webmaster_manual') {
    dcs = 9;
  } else if (keywordEvidence.source === 'google_trends_manual') {
    dcs = 6;
  } else if (keywordEvidence.source === 'manual_serp_ai_estimate') {
    dcs = 5;
  } else if (keywordEvidence.source === 'existing_topic_map') {
    dcs = 4;
  } else {
    dcs = 2;
  }

  let finalScore = Math.round(
    (ds * 0.20 + pfs * 0.20 + bvs * 0.20 + css * 0.15 + diffs * 0.10 + mrs * 0.10 + dcs * 0.05) * 10
  );

  let tier = "P3";
  if (finalScore >= 70 && dcs >= 4 && pfs >= 7) tier = "P1";
  else if (finalScore >= 55) tier = "P2";

  if (existingScore.priorityTier === 'HOLD') {
    tier = 'HOLD';
  } else if (existingScore.priorityTier === 'P1' && tier !== 'P1') {
    downgraded++;
  }

  existingScore.keywordEvidence = keywordEvidence;
  existingScore.scores.demandScore = ds;
  existingScore.scores.dataConfidenceScore = dcs;
  existingScore.scores.finalPriorityScore = finalScore;
  existingScore.priorityTier = tier;
  existingScore.scoringLastUpdated = new Date().toISOString().split('T')[0];
  
  if (keyword && keyword.demandDataStatus === 'estimate_only') {
    exportNeeded++;
  }

  if (tier === 'P1') p1Count++;
  else if (tier === 'P2') p2Count++;
  else if (tier === 'P3') p3Count++;
  else if (tier === 'HOLD') holdCount++;

  recalculated++;

  if (['text-to-carousel-ai', 'instagram-carousel-hooks', 'tekst-v-karusel-neyroset', 'content-calendar-to-carousel', 'b2b-keysy-v-linkedin-karusel'].includes(existingScore.targetSlug)) {
    d53Scores[existingScore.targetSlug] = { tier, finalScore };
  }
});

fs.writeFileSync(topicScorePath, JSON.stringify(topicScores, null, 2));

console.log("\n🔄 Topic Score Recalculation Summary:");
console.log(`- Topics recalculated: ${recalculated}`);
console.log(`- Tiers: P1: ${p1Count} | P2: ${p2Count} | P3: ${p3Count} | HOLD: ${holdCount}`);
console.log(`- Topics downgraded due to low data: ${downgraded}`);
console.log(`- Topics needing manual demand export: ${exportNeeded}`);
console.log(`- D53 Draft Topic Scores:`);
for (const [slug, data] of Object.entries(d53Scores)) {
  console.log(`  - ${slug}: ${data.finalScore} (${data.tier})`);
}
