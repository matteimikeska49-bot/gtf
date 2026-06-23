import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { extractFrontmatterAndBody, getYamlValue } from './blog-template-guardrails.mjs';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ARTICLES_DIR = path.join(ROOT_DIR, 'src/content/blog/articles');
const capabilitiesPath = path.join(ROOT_DIR, 'src/content/blog/product-capabilities.json');
const batchStatusPath = path.join(ROOT_DIR, 'src/content/blog/batch-status.json');

const capabilities = fs.existsSync(capabilitiesPath)
  ? JSON.parse(fs.readFileSync(capabilitiesPath, 'utf8'))
  : [];
const batchStatus = fs.existsSync(batchStatusPath)
  ? JSON.parse(fs.readFileSync(batchStatusPath, 'utf8'))
  : [];

const forbiddenClaimRules = capabilities.flatMap((capability) =>
  (capability.forbiddenClaims || []).map((claim) => ({
    capabilityId: capability.capabilityId,
    status: capability.status,
    claim,
    regex: new RegExp(claim.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
  }))
);

const competitorPatterns = [
  'Canva',
  'Figma',
  'Adobe',
  'Buffer',
  'Hootsuite',
  'Taplio',
  'Later',
  'ChatGPT',
  'Claude',
  'Gemini',
  'Midjourney'
];

const forbiddenWords = [
  'guaranteed',
  'guarantees',
  '100%',
  'viral guarantee',
  'гарантирует',
  'гарантированно'
];

const getChangedArticleFiles = () => {
  const explicit = process.argv.slice(2).filter((arg) => arg.endsWith('.md'));
  if (explicit.length > 0) return explicit.map((file) => path.resolve(ROOT_DIR, file));

  const envSlugs = (process.env.BLOG_ARTICLE_REVIEW_SLUGS || '').split(',').map((slug) => slug.trim()).filter(Boolean);
  if (envSlugs.length > 0) return envSlugs.map((slug) => path.join(ARTICLES_DIR, `${slug}.md`));

  const changed = new Set();
  try {
    const diff = [
      execSync('git diff --name-only', { cwd: ROOT_DIR, encoding: 'utf8' }),
      execSync('git diff --cached --name-only', { cwd: ROOT_DIR, encoding: 'utf8' })
    ].join('\n');
    diff.split('\n')
      .filter((file) => file.startsWith('src/content/blog/articles/') && file.endsWith('.md'))
      .forEach((file) => changed.add(path.join(ROOT_DIR, file)));
  } catch {
    // Keep report mode resilient; no changed articles simply means no summaries.
  }

  if (changed.size > 0) return [...changed];

  const activeStatuses = new Set(['draft', 'draft_preview', 'qa_failed', 'qa_passed', 'ready_to_publish']);
  return batchStatus
    .filter((entry) => activeStatuses.has(entry.status))
    .map((entry) => path.join(ARTICLES_DIR, `${entry.slug}.md`))
    .filter((file) => fs.existsSync(file));
};

const extractYamlListBlock = (frontmatter, key) => {
  const lines = frontmatter.split('\n');
  const start = lines.findIndex((line) => line.startsWith(`${key}:`));
  if (start === -1) return [];
  const out = [];
  for (let index = start + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^[A-Za-z0-9_]+:\s*/.test(line)) break;
    const match = line.match(/^\s*-\s*["']?(.+?)["']?\s*$/);
    if (match) out.push(match[1]);
  }
  return out;
};

const extractFaqQuestions = (frontmatter) => {
  const questions = [];
  const regex = /^\s*-\s*question:\s*["']?(.+?)["']?\s*$/gm;
  let match;
  while ((match = regex.exec(frontmatter)) !== null) questions.push(match[1]);
  return questions;
};

const getAnyYamlValue = (frontmatter, key) => {
  const regex = new RegExp(`^\\s*${key}:\\s*["']?([^"'\n]+)["']?\\s*$`, 'm');
  const match = frontmatter.match(regex);
  return match ? match[1].trim() : '';
};

const extractExploreLinks = (frontmatter, body) => {
  const links = [];
  const yamlLinkRegex = /^\s*href:\s*["']?([^"'\n]+)["']?\s*$/gm;
  let yamlMatch;
  while ((yamlMatch = yamlLinkRegex.exec(frontmatter)) !== null) links.push(yamlMatch[1]);
  const mdLinkRegex = /\[[^\]]+\]\((\/[^)]+)\)/g;
  let bodyMatch;
  while ((bodyMatch = mdLinkRegex.exec(body)) !== null) links.push(bodyMatch[1]);
  return [...new Set(links)].slice(0, 20);
};

const firstParagraph = (body) => body
  .split('\n')
  .map((line) => line.trim())
  .find((line) => line && !line.startsWith('#') && !line.startsWith(':::') && !line.startsWith('>')) || '';

const findRiskyParagraphs = (body) => body
  .split(/\n{2,}/)
  .map((paragraph) => paragraph.trim())
  .filter((paragraph) => paragraph.length > 80)
  .filter((paragraph) =>
    forbiddenWords.some((word) => paragraph.toLowerCase().includes(word.toLowerCase())) ||
    /roadmap|coming soon|скоро|планируем|автопост|autopublish|schedule/i.test(paragraph)
  )
  .slice(0, 5);

const summarizeArticle = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const { frontmatter, body } = extractFrontmatterAndBody(content);
  const slug = getYamlValue(frontmatter, 'slug') || path.basename(filePath, '.md');
  const language = getYamlValue(frontmatter, 'language') || 'en';
  const primaryKeyword = getYamlValue(frontmatter, 'primaryKeyword') || '';
  const searchIntent = getYamlValue(frontmatter, 'searchIntent') || '';
  const cluster = getYamlValue(frontmatter, 'cluster') || getYamlValue(frontmatter, 'clusterId') || '';
  const articleType = getYamlValue(frontmatter, 'articleType') || '';
  const title = getYamlValue(frontmatter, 'title') || '';
  const description = getYamlValue(frontmatter, 'description') || '';
  const finalCtaHref = getAnyYamlValue(frontmatter, 'buttonHref') || getAnyYamlValue(frontmatter, 'secondaryHref') || '';
  const finalCtaText = getAnyYamlValue(frontmatter, 'buttonText') || getYamlValue(frontmatter, 'finalCta') || '';
  const headings = [...body.matchAll(/^(#{2,3})\s+(.+)$/gm)].map((match) => `${match[1]} ${match[2].trim()}`);
  const h1 = (body.match(/^#\s+(.+)$/m) || [null, title])[1];
  const quickAnswer = extractYamlListBlock(frontmatter, 'quickAnswer');
  const faqQuestions = extractFaqQuestions(frontmatter);
  const exploreLinks = extractExploreLinks(frontmatter, body);
  const competitorMentions = competitorPatterns.filter((pattern) => new RegExp(`\\b${pattern}\\b`, 'i').test(content));
  const claimRisk = forbiddenClaimRules
    .filter((rule) => rule.regex.test(content))
    .map((rule) => ({ claim: rule.claim, capabilityId: rule.capabilityId, status: rule.status }));
  const forbiddenMatches = forbiddenWords.filter((word) => content.toLowerCase().includes(word.toLowerCase()));
  const productBridgeSummary = /GoToFlow|\/ai-|\/ru\/|\/linkedin-carousel-maker/i.test(content)
    ? 'GoToFlow/product route bridge present'
    : 'No obvious GoToFlow/product route bridge found';
  const ctaRisk = [];
  if (!finalCtaHref && !/Final CTA|buttonHref|Try|Попробовать|\/ai-|\/ru\//i.test(content)) ctaRisk.push('No obvious final CTA');
  if (finalCtaHref && !finalCtaHref.startsWith('/')) ctaRisk.push('CTA href is not an internal route');
  const structureRisk = [];
  if (!h1) structureRisk.push('missing H1');
  if (headings.length < 3) structureRisk.push('few H2/H3 headings');
  if (quickAnswer.length === 0) structureRisk.push('missing quickAnswer');
  if (faqQuestions.length === 0) structureRisk.push('missing FAQ');
  if (exploreLinks.length === 0) structureRisk.push('missing Explore/internal links');
  const riskyParagraphs = findRiskyParagraphs(body);
  const humanReviewRequired = claimRisk.length > 0 || competitorMentions.length > 0 || ctaRisk.length > 0 || structureRisk.length > 0 || riskyParagraphs.length > 0;

  return {
    slug,
    language,
    primaryKeyword,
    searchIntent,
    cluster,
    articleType,
    url: language === 'ru' ? `/ru/blog/${slug}` : `/blog/${slug}`,
    title,
    h1,
    metaDescription: description,
    h2h3: headings,
    quickAnswer,
    faqQuestions,
    finalCta: { text: finalCtaText, href: finalCtaHref },
    exploreLinks,
    contentSummary: firstParagraph(body).slice(0, 260),
    intentFit: searchIntent && primaryKeyword ? 'pass' : 'warn',
    productFit: productBridgeSummary.includes('present') ? 'pass' : 'warn',
    productBridgeSummary,
    competitorRisk: competitorMentions,
    claimRisk,
    roadmapLiveClaims: claimRisk.filter((risk) => ['roadmap', 'not_supported', 'unknown'].includes(risk.status)),
    forbiddenWords: forbiddenMatches,
    riskyParagraphs,
    structureRisk,
    ctaRisk,
    missingSections: structureRisk,
    humanReviewRequired,
    whatUserShouldCheckManually: [
      'visual flow',
      'first screen',
      'product bridge',
      'final CTA',
      'competitor mentions',
      'claims that sound live/guaranteed'
    ]
  };
};

const files = getChangedArticleFiles();
const summaries = files.filter((file) => fs.existsSync(file)).map(summarizeArticle);
const result = {
  checkedArticles: summaries.length,
  summaries
};

console.log(JSON.stringify(result, null, 2));
console.log(summaries.length === 0
  ? '\n✅ Article review summary generated: no changed/active articles found.'
  : `\n✅ Article review summary generated for ${summaries.length} article(s).`
);
