import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readJson = (relativePath, fallback = []) => {
  const filePath = path.join(ROOT_DIR, relativePath);
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const topicMap = readJson('src/content/blog/topic-map.json');
const intentMap = readJson('src/content/blog/intent-map.json');
const clusterMap = readJson('src/content/blog/cluster-authority-map.json');
const topicScores = readJson('src/content/blog/topic-priority-score.json');
const keywords = readJson('src/content/blog/keyword-candidates.json');
const batchStatus = readJson('src/content/blog/batch-status.json');

const activeStatuses = new Set(['idea', 'brief', 'ready_for_draft', 'draft', 'draft_preview', 'qa_failed', 'qa_passed', 'ready_to_publish']);
const explicitSlugs = new Set([
  ...process.argv.slice(2).filter((arg) => !arg.startsWith('--')),
  ...(process.env.BLOG_BATCH_TOPICS || '').split(',').map((slug) => slug.trim()).filter(Boolean)
]);

const activeBatchEntries = batchStatus.filter((entry) => activeStatuses.has(entry.status));
const activeBatchSlugs = new Set(activeBatchEntries.map((entry) => entry.slug).filter(Boolean));

const topics = topicMap.filter((topic) => {
  if (explicitSlugs.size > 0) return explicitSlugs.has(topic.targetSlug);
  if (activeBatchSlugs.has(topic.targetSlug)) return true;
  return topic.generationStatus === 'ready_for_draft' || topic.approvalStatus === 'approved_for_draft';
});

const findKeyword = (topic) => keywords.find((keyword) =>
  keyword.targetSlug === topic.targetSlug ||
  (keyword.keyword && topic.primaryKeyword && keyword.keyword.toLowerCase() === topic.primaryKeyword.toLowerCase())
);

const findScore = (topic) => topicScores.find((score) =>
  score.targetSlug === topic.targetSlug ||
  (score.primaryKeyword && topic.primaryKeyword && score.primaryKeyword.toLowerCase() === topic.primaryKeyword.toLowerCase())
);

const findIntent = (topic) => intentMap.find((intent) =>
  intent.ownerSlug === topic.targetSlug ||
  (intent.supportingSlugs || []).includes(topic.targetSlug) ||
  intent.intentId === topic.intentId
);

const findClusterRole = (topic) => {
  for (const cluster of clusterMap) {
    const role = (cluster.articleRoles || []).find((item) => item.slug === topic.targetSlug);
    if (role) return { cluster, role };
  }
  return null;
};

const hasBrief = (topic) => {
  const candidates = [
    topic.briefPath,
    `src/content/blog/briefs/controlled-wave-1/${topic.targetSlug}.md`,
    `src/content/blog/briefs/ru-wave-1/${topic.targetSlug}.md`,
    `docs/brief-${topic.targetSlug}.md`,
    `docs/seo/briefs/batch-002/product-seo-candidates/${topic.targetSlug}.md`,
    `docs/seo/briefs/batch-002/supporting/${topic.targetSlug}.md`
  ].filter(Boolean);
  return candidates.find((candidate) => fs.existsSync(path.join(ROOT_DIR, candidate))) || null;
};

const productIntentTerms = [
  'ai carousel generator',
  'ai carousel maker',
  'linkedin carousel generator',
  'linkedin carousel maker',
  'ai content generator',
  'ai facebook post generator',
  'ai instagram post generator',
  'генератор каруселей',
  'генератор контента'
];

const isProductIntent = (topic) => productIntentTerms.some((term) => (topic.primaryKeyword || '').toLowerCase().includes(term));
const isProductRouteOwner = (intent) => Boolean(intent?.ownerUrl && intent.ownerUrl.startsWith('/') && !intent.ownerUrl.includes('/blog/'));
const isSupportingException = (topic, intent, clusterRole) =>
  Boolean(intent && clusterRole &&
    (intent.supportingSlugs || []).includes(topic.targetSlug) &&
    ['supporting', 'support'].includes((clusterRole.role.role || '').toLowerCase()) &&
    isProductRouteOwner(intent));

const blockers = [];
const warnings = [];
const topicsReady = [];
const topicsBlocked = [];
const humanReviewRequired = [];

for (const topic of topics) {
  const topicBlockers = [];
  const topicWarnings = [];
  const keyword = findKeyword(topic);
  const score = findScore(topic);
  const intent = findIntent(topic);
  const clusterRole = findClusterRole(topic);
  const briefPath = hasBrief(topic);
  const batchEntry = batchStatus.find((entry) => entry.slug === topic.targetSlug);
  const capabilityIds = topic.productCapabilityIds || topic.productCapabilityId || [];
  const normalizedCapabilities = Array.isArray(capabilityIds) ? capabilityIds : [capabilityIds].filter(Boolean);
  const needsRefresh = topic.requiresDemandRefresh || keyword?.requiresDemandRefresh || keyword?.demandDataStatus === 'needs_refresh';
  const exactVolumeKnown = Boolean(topic.exactVolumeKnown ?? keyword?.exactVolumeKnown ?? score?.keywordEvidence?.exactVolumeKnown);

  if (!keyword && !needsRefresh) topicBlockers.push('missing keyword');
  if (!intent) topicBlockers.push('missing intent owner');
  if (!clusterRole) topicBlockers.push('missing cluster');
  if (!score && !topic.fallbackAllowed) topicBlockers.push('missing topic score');
  if (!briefPath) topicBlockers.push('missing brief/research package');
  if (!topic.productAngle && !topic.decisionReason) topicBlockers.push('missing product angle');
  if (normalizedCapabilities.length === 0) topicBlockers.push('missing product capability decision');
  if (topic.mockupRequired === undefined && topic.mockupStatus === undefined) topicBlockers.push('missing mockup decision');
  if (topic.cannibalizationRisk === 'high' && !isSupportingException(topic, intent, clusterRole)) topicBlockers.push('high cannibalization risk');
  if (isProductIntent(topic) && intent && !isProductRouteOwner(intent) && !isSupportingException(topic, intent, clusterRole)) {
    topicBlockers.push('product intent is not owned by a product route');
  }
  if (batchEntry?.published === true && batchEntry.approvedForPublish !== true) topicBlockers.push('planned published:true without approval');
  if (batchEntry && ['draft', 'draft_preview', 'qa_passed', 'ready_to_publish'].includes(batchEntry.status) && batchEntry.briefStatus !== 'approved') {
    topicBlockers.push('brief is not approved/frozen');
  }

  if (!exactVolumeKnown && topic.language === 'en') topicWarnings.push('EN exact volume missing');
  if (needsRefresh) topicWarnings.push('demand source needs refresh');
  if ((score?.scores?.dataConfidenceScore ?? 10) <= 4) topicWarnings.push('low data confidence');
  if (topic.mockupStatus === 'not_available' || score?.scores?.mockupReadinessScore <= 5) topicWarnings.push('mockup not available or weak');
  if (!batchEntry?.visualQaStatus || batchEntry.visualQaStatus !== 'passed') topicWarnings.push('human visual review required before publish');

  const item = {
    slug: topic.targetSlug,
    language: topic.language,
    primaryKeyword: topic.primaryKeyword,
    priorityTier: score?.priorityTier || null,
    briefPath,
    blockers: topicBlockers,
    warnings: topicWarnings
  };

  if (topicBlockers.length > 0) {
    topicsBlocked.push(item);
    topicBlockers.forEach((blocker) => blockers.push(`${topic.targetSlug}: ${blocker}`));
  } else {
    topicsReady.push(item);
  }

  if (topicWarnings.some((warning) => warning.includes('human')) || topicBlockers.length > 0 || needsRefresh || !exactVolumeKnown) {
    humanReviewRequired.push({
      slug: topic.targetSlug,
      reasons: [...topicBlockers, ...topicWarnings]
    });
  }

  topicWarnings.forEach((warning) => warnings.push(`${topic.targetSlug}: ${warning}`));
}

if (topics.length === 0) {
  warnings.push('No active batch topics found. Passes now, but a future batch must supply approved topics or BLOG_BATCH_TOPICS.');
}

const result = {
  canProceed: blockers.length === 0,
  blockers,
  warnings,
  topicsReady,
  topicsBlocked,
  humanReviewRequired
};

console.log(JSON.stringify(result, null, 2));

if (blockers.length > 0) {
  console.error(`\n❌ Batch readiness failed with ${blockers.length} blocker(s).`);
  process.exit(1);
}

console.log(`\n✅ Batch readiness gate passed. canProceed=${result.canProceed}`);
