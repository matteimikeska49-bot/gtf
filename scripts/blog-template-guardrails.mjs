export const RAW_COMPONENT_MARKERS = [
  'ArticleExploreZone',
  'RelatedArticles',
  'SecondaryCta',
  'FinalCta',
  'ArticleFinalCta',
  'InlineProductBlock'
];

export const PRODUCTION_ARTIFACT_MARKERS = [
  ...RAW_COMPONENT_MARKERS,
  '8 to 7-10'
];

export const LEGACY_MISSING_EXPLORE_EXCEPTIONS = new Set([
  'ai-carousel-generator',
  'ai-linkedin-post-generator',
  'besshovnaya-karusel-v-instagram',
  'how-to-make-linkedin-carousel-with-ai',
  'idei-karuselej-linkedin',
  'ii-dlya-karuseley',
  'instagram-carousel-post',
  'kak-sdelat-karusel-linkedin-s-ai',
  'linkedin-carousel-from-pdf-ai',
  'linkedin-carousel-ideas',
  'neyroset-dlya-postov',
  'razmer-karuseli-v-instagram'
]);

const TOP_LEVEL_KEY_RE = /^[A-Za-z0-9_]+:\s*/;
const FORBIDDEN_SECONDARY_HREFS = new Set(['#explore-more', '#examples', '#productRoute']);

export function extractFrontmatterAndBody(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return { frontmatter: '', body: content };
  return { frontmatter: match[1], body: match[2] };
}

export function stripCodeForTemplateGuardrails(markdown) {
  const lines = markdown.split('\n');
  const cleanLines = [];
  let inFence = false;

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inFence = !inFence;
      cleanLines.push('');
      continue;
    }
    cleanLines.push(inFence ? '' : line);
  }

  return cleanLines.join('\n').replace(/`[^`\n]*`/g, '');
}

export function findRawJsxLikeTags(markdownBody) {
  const cleanBody = stripCodeForTemplateGuardrails(markdownBody);
  const matches = cleanBody.match(/<\/?[A-Z][A-Za-z0-9]*(?=[\s/>])[^>\n]*(?:>|$)/g) || [];
  const markerMatches = RAW_COMPONENT_MARKERS.filter((marker) => cleanBody.includes(`<${marker}`) || cleanBody.includes(`</${marker}`));
  return [...new Set([...matches, ...markerMatches])];
}

export function findRawComponentMarkers(text) {
  return RAW_COMPONENT_MARKERS.filter((marker) => text.includes(marker));
}

export function hasStarredHref(text) {
  return /href=["'][^"']*\*[^"']*["']/i.test(text) || /\]\([^)]*\*[^)]*\)/.test(text);
}

export function getYamlValue(frontmatter, key) {
  const regex = new RegExp(`^${key}:\\s*["']?([^"'\n]+)["']?\\s*$`, 'm');
  const match = frontmatter.match(regex);
  if (!match) return undefined;
  const value = match[1].trim();
  if (value === 'true') return true;
  if (value === 'false') return false;
  return value;
}

export function getYamlBlock(frontmatter, key) {
  const lines = frontmatter.split('\n');
  const startIndex = lines.findIndex((line) => line.startsWith(`${key}:`));
  if (startIndex === -1) return { exists: false, inline: '', lines: [], text: '' };

  const inline = lines[startIndex].slice(key.length + 1).trim();
  const blockLines = [];
  for (let index = startIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (TOP_LEVEL_KEY_RE.test(line)) break;
    blockLines.push(line);
  }

  return {
    exists: true,
    inline,
    lines: blockLines,
    text: inline ? [inline, ...blockLines].join('\n') : blockLines.join('\n')
  };
}

export function getNestedYamlValue(block, key) {
  const regex = new RegExp(`^\\s+${key}:\\s*(.*)$`, 'm');
  const match = block.text.match(regex);
  if (!match) return '';
  return match[1].trim().replace(/^["']|["']$/g, '');
}

export function isLivePublishedFrontmatter(frontmatter) {
  return getYamlValue(frontmatter, 'published') === true && getYamlValue(frontmatter, 'noindex') === false;
}

export function getTemplateContractIssues(frontmatter, slug) {
  const issues = [];
  const warnings = [];
  const faqBlock = getYamlBlock(frontmatter, 'faq');
  const exploreBlock = getYamlBlock(frontmatter, 'explore');
  const finalCtaBlock = getYamlBlock(frontmatter, 'finalCta');

  const faqQuestions = faqBlock.text.match(/^\s*-\s+question:\s*\S/gm) || [];
  const faqAnswers = faqBlock.text.match(/^\s+answer:\s*\S/gm) || [];
  if (!faqBlock.exists) {
    issues.push('frontmatter faq is missing');
  } else if (faqQuestions.length < 5) {
    issues.push(`frontmatter faq has ${faqQuestions.length} questions; live articles require at least 5`);
  } else if (faqQuestions.length !== faqAnswers.length) {
    issues.push(`frontmatter faq has ${faqQuestions.length} questions but ${faqAnswers.length} answers`);
  }

  const exploreHrefs = exploreBlock.text.match(/^\s+(?:-\s+)?href:\s*["']?\/[^"'\n]*["']?\s*$/gm) || [];
  const exploreTitles = exploreBlock.text.match(/^\s+(?:-\s+)?title:\s*\S/gm) || [];
  if (!exploreBlock.exists) {
    if (LEGACY_MISSING_EXPLORE_EXCEPTIONS.has(slug)) {
      warnings.push('legacy exception: frontmatter explore is missing and must be migrated before future republish');
    } else {
      issues.push('frontmatter explore is missing');
    }
  } else if (exploreHrefs.length === 0 || exploreTitles.length === 0) {
    issues.push('frontmatter explore must contain at least one titled internal link');
  }

  const title = getNestedYamlValue(finalCtaBlock, 'title');
  const text = getNestedYamlValue(finalCtaBlock, 'text');
  const description = getNestedYamlValue(finalCtaBlock, 'description');
  const buttonText = getNestedYamlValue(finalCtaBlock, 'buttonText');
  const secondaryText = getNestedYamlValue(finalCtaBlock, 'secondaryText');
  const secondaryHref = getNestedYamlValue(finalCtaBlock, 'secondaryHref');

  if (!finalCtaBlock.exists) {
    issues.push('frontmatter finalCta is missing');
  } else {
    if (!title) issues.push('frontmatter finalCta.title is missing');
    if (!text && !description) issues.push('frontmatter finalCta.text is missing');
    if (!text && description) warnings.push('legacy alias: finalCta.description is used instead of finalCta.text');
    if (!buttonText) issues.push('frontmatter finalCta.buttonText is missing');
    if (!secondaryText) {
      issues.push('frontmatter finalCta.secondaryText is missing');
    } else if (!secondaryText.includes('→')) {
      issues.push('frontmatter finalCta.secondaryText must include →');
    }
    if (!secondaryHref) {
      issues.push('frontmatter finalCta.secondaryHref is missing');
    } else if (FORBIDDEN_SECONDARY_HREFS.has(secondaryHref)) {
      issues.push(`frontmatter finalCta.secondaryHref must not be ${secondaryHref}`);
    }
  }

  if (hasStarredHref(frontmatter)) {
    issues.push('frontmatter contains href with a literal *');
  }

  return { issues, warnings };
}
