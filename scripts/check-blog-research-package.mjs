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
const keywordCandidates = readJson('src/content/blog/keyword-candidates.json');
const topicScores = readJson('src/content/blog/topic-priority-score.json');
const intentMap = readJson('src/content/blog/intent-map.json');
const clusterMap = readJson('src/content/blog/cluster-authority-map.json');
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
  node scripts/check-blog-research-package.mjs [--topic <slug>] [--topics <slug,slug>]

Checks active batch topics by default. Use --topic/--topics to verify explicit repo-backed candidates.`);
  process.exit(0);
}

const activeStatuses = new Set(['idea', 'brief', 'ready_for_draft', 'draft', 'draft_preview', 'qa_failed', 'qa_passed', 'ready_to_publish']);
const activeBatchSlugs = new Set(batchStatus.filter((entry) => activeStatuses.has(entry.status)).map((entry) => entry.slug).filter(Boolean));
const cliSlugs = [
  ...parseListArg('--topic'),
  ...parseListArg('--topics'),
  ...process.argv.slice(2).filter((arg) => !arg.startsWith('--') && !arg.includes(','))
];
const envSlugs = (process.env.BLOG_BATCH_TOPICS || '').split(',').map((slug) => slug.trim()).filter(Boolean);
const explicitSlugs = new Set([...cliSlugs, ...envSlugs]);

const findKeyword = (topic) => keywordCandidates.find((keyword) =>
  keyword.targetSlug === topic.targetSlug ||
  (keyword.keyword && topic.primaryKeyword && keyword.keyword.toLowerCase() === topic.primaryKeyword.toLowerCase())
);

const findTopicScore = (topic) => topicScores.find((score) =>
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

const findBatchEntry = (topic) => batchStatus.find((entry) => entry.slug === topic.targetSlug);

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
    secondaryKeywords: [],
    searchIntent: plan?.intent || null,
    clusterId: plan?.clusterId || batchEntry?.cluster || score?.clusterId || null,
    articleRole: plan?.articleRole || null,
    relatedProductRoute: plan?.targetProductRoute || score?.relatedProductRoute || null,
    targetProductRoute: plan?.targetProductRoute || score?.relatedProductRoute || null,
    cannibalizationRisk: canonicalRiskToGateRisk(plan?.canonicalRisk),
    productAngle: plan?.differentiation || score?.scoringReason || null,
    decisionReason: plan?.differentiation || null,
    demandEvidenceSummary: plan?.demandEvidence || score?.keywordEvidence || null,
    demandSource: score?.keywordEvidence?.source || null,
    exactVolumeKnown: Boolean(score?.keywordEvidence?.exactVolumeKnown || plan?.estimatedVolume),
    internalLinks: plan?.internalLinks || [],
    approvalStatus: plan?.status === 'selected' || batchEntry?.approvedForDraft ? 'approved_for_draft' : null,
    approvedByUser: batchEntry?.approvedForDraft ? 'batch-status' : null,
    topicMapExists: false,
    topicSource: plan ? 'ru-wave-1-topic-plan' : score ? 'topic-priority-score' : 'batch-status',
    publishStatus: plan?.publishStatus || batchEntry?.publishStatus || null,
    batchId: batchEntry?.batchId || plan?.waveId || null
  };
};

const candidateTopics = explicitSlugs.size > 0
  ? [...explicitSlugs].map(topicFromPlan)
  : topicMap.filter((topic) => {
      if (activeBatchSlugs.has(topic.targetSlug)) return true;
      return topic.generationStatus === 'ready_for_draft' || topic.approvalStatus === 'approved_for_draft';
    }).map((topic) => ({ ...topic, topicMapExists: true, topicSource: 'topic-map' }));

const findScore = (topic) => topicScores.find((score) =>
  score.targetSlug === topic.targetSlug ||
  (score.primaryKeyword && topic.primaryKeyword && score.primaryKeyword.toLowerCase() === topic.primaryKeyword.toLowerCase())
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

const isSupportingProductException = (topic, intent, clusterRole) => {
  if (!intent || !clusterRole) return false;
  const listedAsSupport = (intent.supportingSlugs || []).includes(topic.targetSlug);
  const clusterSupports = ['supporting', 'support'].includes((clusterRole.role.role || '').toLowerCase());
  const productRouteOwner = intent.ownerUrl && intent.relatedProductRoute && intent.ownerUrl === intent.relatedProductRoute;
  return listedAsSupport && clusterSupports && productRouteOwner;
};

const packages = [];
const blockers = [];
const warnings = [];

for (const topic of candidateTopics) {
  const keyword = findKeyword(topic);
  const score = findTopicScore(topic) || findScore(topic);
  const intent = findIntent(topic);
  const clusterRole = findClusterRole(topic);
  const briefPath = hasBrief(topic);
  const mockupDecision = findMockupDecision(topic);
  const batchEntry = findBatchEntry(topic);
  const packageWarnings = [];
  const packageBlockers = [];

  const needsRefresh = topic.requiresDemandRefresh || keyword?.requiresDemandRefresh || keyword?.demandDataStatus === 'needs_refresh';
  const exactVolumeKnown = Boolean(topic.exactVolumeKnown ?? keyword?.exactVolumeKnown ?? score?.keywordEvidence?.exactVolumeKnown);
  const normalizedCapabilities = deriveCapabilityIds(topic);
  const mockupSlots = topic.mockupSlots || topic.requiredMockupSlots || mockupDecision?.slotsUsed || [];
  const mockupStatus = topic.mockupStatus || mockupDecision?.mockupStatus || null;
  const mockupRequired = topic.mockupRequired ?? (mockupDecision ? mockupDecision.mockupStatus === 'present' : null);
  const approvalStatus = topic.approvalStatus || topic.decision || (batchEntry?.approvedForDraft ? 'approved_for_draft' : null);

  if (topic.missingTopic) packageBlockers.push('missing topic in topic-map and fallback topic plans');
  if (!keyword && !score?.keywordEvidence && !needsRefresh) packageBlockers.push('missing keyword record or scored demand evidence');
  if (!score && !topic.fallbackAllowed) packageBlockers.push('missing topic score or honest fallback');
  if (!intent) packageBlockers.push('missing intent owner/supporting record');
  if (!clusterRole) packageBlockers.push('missing cluster role');
  if (topic.cannibalizationRisk === 'high' && !isSupportingProductException(topic, intent, clusterRole)) {
    packageBlockers.push('high cannibalization risk without supporting/product-route exception');
  }
  if (!topic.productAngle && !topic.decisionReason) packageBlockers.push('missing product angle');
  if (normalizedCapabilities.length === 0) packageBlockers.push('missing product capability decision');
  if (mockupRequired === null && !mockupStatus) packageBlockers.push('missing mockup decision');
  if (mockupRequired === true && mockupSlots.length === 0) packageBlockers.push('mockupRequired true but mockupSlots empty');
  if (!approvalStatus) packageBlockers.push('missing approvalStatus/approval decision');
  if (!briefPath) packageBlockers.push('missing brief/research package path');
  if (!topic.demandEvidenceSummary && !score?.keywordEvidence && !keyword) packageBlockers.push('missing demand evidence');

  if (topic.topicMapExists === false) packageWarnings.push('topic-map record missing; using fallback topic plan/score data');
  if (!keyword && score?.keywordEvidence) packageWarnings.push('keyword-candidates record missing; using scored demand evidence');
  if (!exactVolumeKnown) packageWarnings.push('exact demand missing');
  if (needsRefresh) packageWarnings.push('demand source needs refresh');
  if ((score?.scores?.dataConfidenceScore ?? 10) <= 4) packageWarnings.push('low data confidence');
  if (topic.serpRefreshNeeded) packageWarnings.push('SERP refresh needed');
  if (mockupStatus === 'not_available' || (!mockupDecision && score?.scores?.mockupReadinessScore <= 5)) {
    packageWarnings.push('mockup weak/not available');
  }

  const researchPackage = {
    topicId: topic.topicId || `${topic.language}:${topic.targetSlug}`,
    targetSlug: topic.targetSlug,
    topicSource: topic.topicSource,
    topicMapExists: topic.topicMapExists ?? true,
    keywordRecordExists: Boolean(keyword),
    scoredDemandEvidenceExists: Boolean(score?.keywordEvidence),
    language: topic.language,
    primaryKeyword: topic.primaryKeyword,
    secondaryKeywords: topic.secondaryKeywords || [],
    demandEvidence: topic.demandEvidenceSummary || score?.keywordEvidence || keyword?.demandEvidence || null,
    exactVolumeKnown,
    sourceFiles: [keyword?.source, topic.demandSource].filter(Boolean),
    score: score?.scores?.finalPriorityScore ?? score?.finalPriorityScore ?? null,
    priorityTier: score?.priorityTier || topic.priority || null,
    searchIntent: topic.searchIntent,
    intentOwner: intent?.ownerSlug || intent?.ownerUrl || null,
    clusterId: clusterRole?.cluster?.clusterId || topic.clusterId || topic.cluster || null,
    articleRole: clusterRole?.role?.role || topic.articleRole || null,
    cannibalizationRisk: topic.cannibalizationRisk,
    cannibalizationDecision: topic.decisionNote || topic.recommendedAction || null,
    productAngle: topic.productAngle || topic.decisionReason || null,
    productCapabilityIds: normalizedCapabilities,
    mockupRequired,
    mockupStatus,
    mockupDecision: mockupDecision?.decision || null,
    mockupSlots,
    internalLinks: topic.internalLinks || topic.relatedArticles || [],
    competitorContext: topic.competitorContext || null,
    serpRefreshNeeded: Boolean(topic.serpRefreshNeeded || !topic.serpEvidenceSummary),
    briefPath,
    approvedByUser: topic.approvedByUser || null,
    approvalStatus
  };

  packages.push({ ...researchPackage, blockers: packageBlockers, warnings: packageWarnings });
  packageBlockers.forEach((blocker) => blockers.push(`${topic.targetSlug}: ${blocker}`));
  packageWarnings.forEach((warning) => warnings.push(`${topic.targetSlug}: ${warning}`));
}

const result = {
  checkedTopics: packages.length,
  blockers,
  warnings,
  packages
};

console.log(JSON.stringify(result, null, 2));

if (blockers.length > 0) {
  console.error(`\n❌ Research package gate failed with ${blockers.length} blocker(s).`);
  process.exit(1);
}

if (packages.length === 0) {
  console.log('\n✅ Research package gate passed: no active batch topics are currently approved for draft.');
} else {
  console.log(`\n✅ Research package gate passed for ${packages.length} topic(s).`);
}
