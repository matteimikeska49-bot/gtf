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
const ruWaveTopicPlan = readJson('src/content/blog/ru-wave-1-topic-plan.json');
const mockupDecisions = readJson('src/content/blog/mockup-decisions.json');

const parseListArg = (name) => {
  const args = process.argv.slice(2);
  const index = args.indexOf(name);
  if (index === -1) return [];
  return (args[index + 1] || '').split(',').map((item) => item.trim()).filter(Boolean);
};

if (process.argv.includes('--help')) {
  console.log(`Usage:
  node scripts/check-blog-batch-readiness.mjs [--topics <slug,slug>] [--batch <batchId>]

Checks active batch topics by default. Use --topics or --batch to verify explicit candidates.`);
  process.exit(0);
}

const activeStatuses = new Set(['idea', 'brief', 'ready_for_draft', 'draft', 'draft_preview', 'qa_failed', 'qa_passed', 'ready_to_publish']);
const explicitSlugs = new Set([
  ...parseListArg('--topics'),
  ...process.argv.slice(2).filter((arg) => !arg.startsWith('--') && !arg.includes(',')),
  ...(process.env.BLOG_BATCH_TOPICS || '').split(',').map((slug) => slug.trim()).filter(Boolean)
]);
const explicitBatches = new Set(parseListArg('--batch'));

const activeBatchEntries = batchStatus.filter((entry) => activeStatuses.has(entry.status));
const activeBatchSlugs = new Set(activeBatchEntries
  .filter((entry) => explicitBatches.size === 0 || explicitBatches.has(entry.batchId))
  .map((entry) => entry.slug)
  .filter(Boolean));

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
  intent.ownerUrl === `/blog/${topic.targetSlug}` ||
  intent.ownerUrl === `/ru/blog/${topic.targetSlug}` ||
  (intent.supportingSlugs || []).includes(topic.targetSlug) ||
  intent.intentId === topic.intentId ||
  intent.intentId === `${topic.language}:${topic.targetSlug}`
);

const findMockupDecision = (topic) => mockupDecisions.find((decision) => decision.slug === topic.targetSlug);

const canonicalRiskToGateRisk = (canonicalRisk = '') => {
  if (/high/i.test(canonicalRisk)) return 'high';
  if (/medium|moderate/i.test(canonicalRisk)) return 'medium';
  if (/low/i.test(canonicalRisk)) return 'low';
  return null;
};

const deriveCapabilityIds = (topic) => {
  const existing = topic.productCapabilityIds || topic.productCapabilityId || [];
  const normalizedExisting = Array.isArray(existing) ? existing : [existing].filter(Boolean);
  if (normalizedExisting.length > 0) return normalizedExisting;

  const route = topic.relatedProductRoute || topic.targetProductRoute || '';
  const cluster = topic.clusterId || topic.cluster || '';
  if (/generator-postov|content-generator|post-generator/i.test(route)) return ['finishedOutputPositioning'];
  if (/karusel|carousel/i.test(`${route} ${cluster}`)) return ['aiCarouselGeneration'];
  return [];
};

const topicFromPlan = (slug) => {
  const topic = topicMap.find((entry) => entry.targetSlug === slug);
  if (topic) return { ...topic, topicMapExists: true, topicSource: 'topic-map' };

  const plan = ruWaveTopicPlan.find((entry) => entry.slug === slug);
  const score = topicScores.find((entry) => entry.targetSlug === slug);
  const batchEntry = batchStatus.find((entry) => entry.slug === slug);
  if (!plan && !score && !batchEntry) {
    return {
      targetSlug: slug,
      topicMapExists: false,
      topicSource: null,
      missingTopic: true
    };
  }

  const language = plan?.language || score?.language || batchEntry?.language || 'ru';
  return {
    topicId: `${language}:${slug}`,
    targetSlug: slug,
    title: score?.title || batchEntry?.title || plan?.primaryKeyword || slug,
    language,
    primaryKeyword: plan?.primaryKeyword || score?.primaryKeyword || batchEntry?.primaryKeyword || '',
    searchIntent: plan?.intent || null,
    clusterId: plan?.clusterId || batchEntry?.cluster || score?.clusterId || null,
    articleRole: plan?.articleRole || null,
    relatedProductRoute: plan?.targetProductRoute || score?.relatedProductRoute || null,
    targetProductRoute: plan?.targetProductRoute || score?.relatedProductRoute || null,
    cannibalizationRisk: canonicalRiskToGateRisk(plan?.canonicalRisk),
    productAngle: plan?.differentiation || score?.scoringReason || null,
    decisionReason: plan?.differentiation || null,
    demandEvidenceSummary: plan?.demandEvidence || score?.keywordEvidence || null,
    exactVolumeKnown: Boolean(score?.keywordEvidence?.exactVolumeKnown || plan?.estimatedVolume),
    internalLinks: plan?.internalLinks || [],
    approvalStatus: plan?.status === 'selected' || batchEntry?.approvedForDraft ? 'approved_for_draft' : null,
    topicMapExists: false,
    topicSource: plan ? 'ru-wave-1-topic-plan' : score ? 'topic-priority-score' : 'batch-status',
    publishStatus: plan?.publishStatus || batchEntry?.publishStatus || null,
    batchId: batchEntry?.batchId || plan?.waveId || null
  };
};

const topics = explicitSlugs.size > 0
  ? [...explicitSlugs].map(topicFromPlan)
  : topicMap.filter((topic) => {
      if (activeBatchSlugs.has(topic.targetSlug)) return true;
      return topic.generationStatus === 'ready_for_draft' || topic.approvalStatus === 'approved_for_draft';
    }).map((topic) => ({ ...topic, topicMapExists: true, topicSource: 'topic-map' }));

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

const getPublishBlockers = (topic, draftBlockers) => {
  const publishBlockers = [...draftBlockers];
  if (topic.topicMapExists !== true) publishBlockers.push('missing topic-map entry');
  return publishBlockers;
};

const blockers = [];
const publishBlockers = [];
const warnings = [];
const draftReadyTopics = [];
const draftBlockedTopics = [];
const publishReadyTopics = [];
const publishBlockedTopics = [];
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
  const mockupDecision = findMockupDecision(topic);
  const normalizedCapabilities = deriveCapabilityIds(topic);
  const mockupSlots = topic.mockupSlots || topic.requiredMockupSlots || mockupDecision?.slotsUsed || [];
  const mockupStatus = topic.mockupStatus || mockupDecision?.mockupStatus || null;
  const mockupRequired = topic.mockupRequired ?? (mockupDecision ? mockupDecision.mockupStatus === 'present' : null);
  const needsRefresh = topic.requiresDemandRefresh || keyword?.requiresDemandRefresh || keyword?.demandDataStatus === 'needs_refresh';
  const exactVolumeKnown = Boolean(topic.exactVolumeKnown ?? keyword?.exactVolumeKnown ?? score?.keywordEvidence?.exactVolumeKnown);

  if (topic.missingTopic) topicBlockers.push('missing topic in topic-map and fallback topic plans');
  if (!keyword && !score?.keywordEvidence && !needsRefresh) topicBlockers.push('missing keyword or scored demand evidence');
  if (!intent) topicBlockers.push('missing intent owner');
  if (!clusterRole) topicBlockers.push('missing cluster');
  if (!score && !topic.fallbackAllowed) topicBlockers.push('missing topic score');
  if (!briefPath) topicBlockers.push('missing brief/research package');
  if (!topic.productAngle && !topic.decisionReason) topicBlockers.push('missing product angle');
  if (normalizedCapabilities.length === 0) topicBlockers.push('missing product capability decision');
  if (mockupRequired === null && !mockupStatus) topicBlockers.push('missing mockup decision');
  if (mockupRequired === true && mockupSlots.length === 0) topicBlockers.push('mockupRequired true but mockupSlots empty');
  if (topic.cannibalizationRisk === 'high' && !isSupportingException(topic, intent, clusterRole)) topicBlockers.push('high cannibalization risk');
  if (isProductIntent(topic) && intent && !isProductRouteOwner(intent) && !isSupportingException(topic, intent, clusterRole)) {
    topicBlockers.push('product intent is not owned by a product route');
  }
  if (batchEntry?.published === true && batchEntry.approvedForPublish !== true) topicBlockers.push('planned published:true without approval');
  if (batchEntry && ['draft', 'draft_preview', 'qa_passed', 'ready_to_publish'].includes(batchEntry.status) && batchEntry.briefStatus !== 'approved') {
    topicBlockers.push('brief is not approved/frozen');
  }

  if (topic.topicMapExists === false) topicWarnings.push('topic-map record missing; using fallback topic plan/score data');
  if (!keyword && score?.keywordEvidence) topicWarnings.push('keyword-candidates record missing; using scored demand evidence');
  if (!exactVolumeKnown && topic.language === 'en') topicWarnings.push('EN exact volume missing');
  if (needsRefresh) topicWarnings.push('demand source needs refresh');
  if ((score?.scores?.dataConfidenceScore ?? 10) <= 4) topicWarnings.push('low data confidence');
  if (mockupStatus === 'not_available' || (!mockupDecision && score?.scores?.mockupReadinessScore <= 5)) {
    topicWarnings.push('mockup not available or weak');
  }
  if (!batchEntry?.visualQaStatus || batchEntry.visualQaStatus !== 'passed') topicWarnings.push('human visual review required before publish');

  const topicPublishBlockers = getPublishBlockers(topic, topicBlockers);
  const draftReady = topicBlockers.length === 0;
  const publishReady = topicPublishBlockers.length === 0;

  const item = {
    slug: topic.targetSlug,
    intakeSource: topic.topicSource || 'unknown',
    topicMapPresent: topic.topicMapExists === true,
    topicSource: topic.topicSource,
    topicMapExists: topic.topicMapExists ?? true,
    keywordRecordExists: Boolean(keyword),
    scoredDemandEvidenceExists: Boolean(score?.keywordEvidence),
    draftReady,
    publishReady,
    language: topic.language,
    primaryKeyword: topic.primaryKeyword,
    priorityTier: score?.priorityTier || null,
    productCapabilityIds: normalizedCapabilities,
    mockupStatus,
    mockupDecision: mockupDecision?.decision || null,
    mockupSlots,
    briefPath,
    blockers: topicBlockers,
    publishBlockers: topicPublishBlockers,
    warnings: topicWarnings
  };

  if (draftReady) {
    draftReadyTopics.push(item);
  } else {
    draftBlockedTopics.push(item);
    topicBlockers.forEach((blocker) => blockers.push(`${topic.targetSlug}: ${blocker}`));
  }

  if (publishReady) {
    publishReadyTopics.push(item);
  } else {
    publishBlockedTopics.push(item);
    topicPublishBlockers.forEach((blocker) => publishBlockers.push(`${topic.targetSlug}: ${blocker}`));
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

const canProceedToDraft = blockers.length === 0;
const canProceedToPublish = topics.length > 0 && publishBlockers.length === 0 && publishReadyTopics.length === topics.length;
const result = {
  canProceed: canProceedToDraft,
  canProceedToDraft,
  canProceedToPublish,
  blockers,
  publishBlockers,
  warnings,
  draftReadyTopics,
  publishReadyTopics,
  publishBlockedTopics,
  topicsReady: draftReadyTopics,
  topicsBlocked: draftBlockedTopics,
  draftBlockedTopics,
  humanReviewRequired
};

console.log(JSON.stringify(result, null, 2));

if (blockers.length > 0) {
  console.error(`\n❌ Batch readiness failed with ${blockers.length} blocker(s).`);
  process.exit(1);
}

console.log(`\n✅ Batch readiness gate passed. canProceed=${result.canProceed}; canProceedToPublish=${result.canProceedToPublish}`);
