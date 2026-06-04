import fs from 'fs';
import path from 'path';

console.log('🔍 Starting Topic Research Gate Check...\n');

const TOPIC_MAP_PATH = path.join(process.cwd(), 'src', 'content', 'blog', 'topic-map.json');

if (!fs.existsSync(TOPIC_MAP_PATH)) {
  console.error('❌ FATAL: topic-map.json not found.');
  process.exit(1);
}

const rawData = fs.readFileSync(TOPIC_MAP_PATH, 'utf8');
let topics;
try {
  topics = JSON.parse(rawData);
} catch (error) {
  console.error('❌ FATAL: Could not parse topic-map.json', error.message);
  process.exit(1);
}

const approvedForDraft = topics.filter(t => t.decision === 'approve' && t.generationStatus === 'ready_for_draft');

let errors = 0;
let warnings = 0;

for (const topic of approvedForDraft) {
  console.log(`\nChecking topic: ${topic.targetSlug} [${topic.primaryKeyword}]`);
  let topicErrors = 0;
  
  const requireField = (field) => {
    if (!topic[field]) {
      console.error(`  ❌ Missing required field: ${field}`);
      topicErrors++;
    }
  };

  requireField('primaryKeyword');
  requireField('language');
  requireField('searchIntent');
  requireField('cluster');
  requireField('articleType');
  requireField('demandEvidenceSummary');
  requireField('serpEvidenceSummary');
  requireField('decisionReason');

  if (topic.demandSource === undefined || topic.demandSource === null || topic.demandSource === '') {
    console.error(`  ❌ Missing required field: demandSource`);
    topicErrors++;
  }

  if (topic.exactVolumeKnown === undefined || topic.exactVolumeKnown === null) {
    console.error(`  ❌ Missing required field: exactVolumeKnown (must be true or false)`);
    topicErrors++;
  }

  if (topic.fallbackAllowed === undefined || topic.fallbackAllowed === null) {
    console.error(`  ❌ Missing required field: fallbackAllowed (must be true or false)`);
    topicErrors++;
  }

  if (topic.demandConfidence === 'unknown') {
    console.error(`  ❌ Demand confidence cannot be 'unknown' for approved topics.`);
    topicErrors++;
  }

  if (topic.productRealityStatus === 'not_confirmed' || topic.productRealityStatus === 'not_supported') {
    console.error(`  ❌ Product reality status must be 'supported' or 'partially_supported'. Found: ${topic.productRealityStatus}`);
    topicErrors++;
  }

  if (topic.cannibalizationRisk === 'high') {
    console.error(`  ❌ Cannibalization risk cannot be 'high' for approved topics.`);
    topicErrors++;
  }

  if (topic.freshResearchRequired && !topic.researchBriefExists) {
    // Note: We don't have researchBriefExists strictly defined in instructions, but we just check if it's true without a brief.
    console.error(`  ❌ Topic requires fresh research but no research brief is linked/confirmed.`);
    topicErrors++;
  }

  if (topic.mockupRequired !== undefined && topic.mockupRequired !== null) {
    if (topic.mockupRequired === true) {
      if (!topic.mockupSlots || topic.mockupSlots.length === 0) {
        console.error(`  ❌ Mockup is required but mockupSlots is empty or missing.`);
        topicErrors++;
      }
      if (!topic.mockupPurpose) {
        console.error(`  ❌ Missing mockupPurpose.`);
        topicErrors++;
      }
      if (!topic.mockupPlacement) {
        console.error(`  ❌ Missing mockupPlacement.`);
        topicErrors++;
      }
    }
  } else {
      console.error(`  ❌ Missing mockupRequired boolean decision.`);
      topicErrors++;
  }

  if (['how-to', 'listicle', 'comparison', 'guide'].includes(topic.articleType) && !topic.mockupRequired && topic.mockupRequired !== false) {
     console.error(`  ❌ Visual/how-to/comparison/examples articles must include a native mockup plan or explicit mockupRequired:false.`);
     topicErrors++;
  }

  // Warnings
  if (topic.exactVolumeKnown === false) {
    console.warn(`  ⚠️ Warning: Exact volume is unknown.`);
    warnings++;
  }
  
  if (['serp_ai_synthesis', 'ai_synthesis', 'manual_serp_without_volume'].includes(topic.demandSource) || String(topic.demandSource).includes('unverified')) {
    console.warn(`  ⚠️ Warning: Demand source is AI synthesis or unverified, not an external volume tool.`);
    warnings++;
  }

  if (topic.fallbackAllowed === true) {
    console.warn(`  ⚠️ Warning: Fallback is allowed. Ensure precision if possible.`);
    warnings++;
  }

  if (topicErrors === 0) {
    console.log(`  ✅ Passed topic checks.`);
  }
  
  errors += topicErrors;
}

console.log(`\n=============================================`);
console.log(`Topic Research Gate Results`);
console.log(`=============================================`);
console.log(`Checked:  ${approvedForDraft.length} approved topics pending draft generation`);
console.log(`Errors:   ${errors}`);
console.log(`Warnings: ${warnings}`);

if (errors > 0) {
  console.error(`\n❌ FAIL: Topic Research Gate check failed with ${errors} errors.`);
  process.exit(1);
} else {
  console.log(`\n✅ PASS: All approved future topics met research requirements.`);
}
