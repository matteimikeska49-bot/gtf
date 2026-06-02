import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { VALID_MOCKUP_SLOTS } from '../src/lib/blog/mockupSlots.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const ARTICLES_DIR = path.join(ROOT, 'src/content/blog/articles');
const SITEMAP_PATH = path.join(ROOT, 'dist/sitemap.xml');
const MOCKUP_REGISTRY_PATH = path.join(ROOT, 'src/content/blog/mockups/registry.json');
const TEMPLATE_PATH = path.join(ROOT, 'src/components/blog/templates/MarkdownSeoArticleTemplateV2.jsx');
const HELPER_PATH = path.join(ROOT, 'src/lib/blog/metaDisclaimerHelper.js');

// Static allowed routes (old JSX pages, tools, root)
const ALLOWLIST_ROUTES = [
  '/', '/ru', '/ai-carousel-maker', '/ru/ai-generator-karuselej',
  '/ai-content-generator', '/ru/generator-kontenta',
  '/ai-instagram-post-generator', '/ai-post-maker', '/ru/generator-postov-instagram',
  '/linkedin-carousel-maker', '/ru/generator-karuselej-linkedin',
  '/blog', '/ru/blog',
  '/blog/ai-instagram-carousel-generator',
  '/blog/how-to-make-linkedin-carousel-with-ai',
  '/blog/best-ai-carousel-generators',
  '/blog/linkedin-carousel-ideas',
  '/ru/blog/idei-karuselej-linkedin',
  '/ru/blog/luchshie-ai-generatory-karuselej',
  '/ru/blog/kak-sdelat-karusel-linkedin-s-ai',
  '/pricing', '/privacy-policy', '/terms-of-service', '/personal-data-consent', '/refund-policy',
  '/ru/politika', '/politika', '/ru/polzovatelskoe-soglashenie', '/ru/soglasie-na-obrabotku-personalnyh-dannyh'
];

// Helper to extract frontmatter block
function extractFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (!match) return null;
  return match[1];
}

// Simple key extraction from yaml
function getYamlValue(frontmatter, key) {
  const regex = new RegExp(`^${key}:\\s*["']?([^"'\n]+)["']?`, 'm');
  const match = frontmatter.match(regex);
  if (match) {
    const val = match[1].trim();
    if (val === 'true') return true;
    if (val === 'false') return false;
    return val;
  }
  return undefined;
}

// Check if a key exists in yaml (for arrays/objects)
function hasYamlKey(frontmatter, key) {
  const regex = new RegExp(`^${key}:\\s*(.*)`, 'm');
  return regex.test(frontmatter);
}

// Extract all hrefs and secondaryHrefs from frontmatter
function extractFrontmatterLinks(frontmatter) {
  const hrefMatches = [...frontmatter.matchAll(/href:\s*["']?([^"'\n]+)["']?/g)];
  const secondaryHrefMatches = [...frontmatter.matchAll(/secondaryHref:\s*["']?([^"'\n]+)["']?/g)];
  return [...hrefMatches, ...secondaryHrefMatches].map(m => m[1]);
}

// Extract markdown links from body
function extractBodyLinks(content) {
  const body = content.replace(/^---\s*\n([\s\S]*?)\n---\s*\n?/, '');
  const linkMatches = [...body.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)];
  return linkMatches.map(m => m[1]);
}

function hasCallouts(content) {
  const body = content.replace(/^---\s*\n([\s\S]*?)\n---\s*\n?/, '');
  return {
    hasProduct: />\s*\[!product\]/i.test(body),
    hasRelated: />\s*\[!related\]/i.test(body)
  };
}

async function runCheck() {
  console.log('🔍 Starting Blog Publishing Pipeline Check...\n');

  let hasP0Error = false;
  let totalWarnings = 0;
  
  const stats = {
    totalArticles: 0,
    publishedCount: 0,
    draftCount: 0,
    errorsCount: 0,
    warningsCount: 0,
    duplicateKeywords: 0,
    brokenInternalLinks: 0,
    draftLinkViolations: 0,
    cannibalizationWarnings: 0
  };
  
  const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md') && f !== '_template.md');
  
  let sitemapContent = '';
  try {
    sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf-8');
  } catch (e) {
    console.log(`⚠️  Warning: dist/sitemap.xml not found. Please run 'npm run build' before this script to verify sitemap inclusion.\n`);
  }

  const slugsSeen = new Map();
  const publishedSlugs = new Set();
  const draftSlugs = new Set();
  const parsedFiles = [];

  let hasAutoDisclaimer = false;
  let hasAutoStar = false;
  if (fs.existsSync(HELPER_PATH) && fs.existsSync(TEMPLATE_PATH)) {
    const templateContent = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
    if (templateContent.includes('shouldShowRuMetaDisclaimer') && templateContent.includes('RuMetaDisclaimer')) {
      hasAutoDisclaimer = true;
    }
    if (templateContent.includes('applyRuAutoStar')) {
      hasAutoStar = true;
    }
  }
  if (!hasAutoDisclaimer) {
    console.log(`  ❌ P0: Automatic RU Meta disclaimer system is missing from MarkdownSeoArticleTemplateV2.jsx or helper.`);
    hasP0Error = true;
  }
  if (!hasAutoStar) {
    console.log(`  ❌ P0: Automatic RU Meta auto-star system (applyRuAutoStar) is missing.`);
    hasP0Error = true;
  }

  // Pass 1: Collect all slugs and publish states
  for (const file of files) {
    const filePath = path.join(ARTICLES_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const frontmatter = extractFrontmatter(content);
    if (!frontmatter) continue;

    const slug = getYamlValue(frontmatter, 'slug');
    const published = getYamlValue(frontmatter, 'published');
    const canonical = getYamlValue(frontmatter, 'canonical');
    const language = getYamlValue(frontmatter, 'language') || 'en';
    const primaryKeyword = getYamlValue(frontmatter, 'primaryKeyword')?.toLowerCase().trim();
    const cluster = getYamlValue(frontmatter, 'cluster')?.toLowerCase().trim();
    const searchIntent = getYamlValue(frontmatter, 'searchIntent')?.toLowerCase().trim();
    const articleType = getYamlValue(frontmatter, 'articleType')?.toLowerCase().trim();
    const title = getYamlValue(frontmatter, 'title');
    
    if (slug) {
      if (published === true) publishedSlugs.add(slug);
      if (published === false) draftSlugs.add(slug);
    }
    parsedFiles.push({ file, content, frontmatter, slug, language, published, canonical, primaryKeyword, cluster, searchIntent, articleType, title });
  }

  // Pass 2: Validate
  for (const { file, content, frontmatter, slug, language, published } of parsedFiles) {
    console.log(`📄 Checking ${file}...`);

    const errors = [];
    const warnings = [];

    const title = getYamlValue(frontmatter, 'title');
    const canonical = getYamlValue(frontmatter, 'canonical');
    const noindex = getYamlValue(frontmatter, 'noindex');
    const primaryKeyword = getYamlValue(frontmatter, 'primaryKeyword')?.toLowerCase().trim();
    const cluster = getYamlValue(frontmatter, 'cluster')?.toLowerCase().trim();
    const searchIntent = getYamlValue(frontmatter, 'searchIntent')?.toLowerCase().trim();
    const articleType = getYamlValue(frontmatter, 'articleType');

    stats.totalArticles++;
    if (published === true) stats.publishedCount++;
    if (published === false) stats.draftCount++;

    // P0: Presence checks
    if (!slug) errors.push(`Missing 'slug'`);
    if (!title) errors.push(`Missing 'title'`);
    if (published === undefined) errors.push(`Missing 'published' (must be true or false)`);
    if (noindex === undefined) errors.push(`Missing 'noindex' (must be true or false)`);

    // Check date validity
    const checkValidDate = (field) => {
      const val = getYamlValue(frontmatter, field);
      if (val) {
        const date = new Date(val);
        if (isNaN(date.getTime())) {
          errors.push(`Invalid date format for '${field}': ${val}`);
        }
      }
    };
    checkValidDate('lastReviewed');
    checkValidDate('updatedAt');
    checkValidDate('createdAt');

    // P0: Duplicate slug
    if (slug) {
      if (slugsSeen.has(slug)) {
        errors.push(`Duplicate slug '${slug}' (already used by ${slugsSeen.get(slug)})`);
      } else {
        slugsSeen.set(slug, file);
      }
    }

    // Anti-cannibalization checks
    for (const other of parsedFiles) {
      if (other.file === file) continue;
      
      if (canonical && other.canonical === canonical) {
        errors.push(`Duplicate canonical '${canonical}' (already used by ${other.file})`);
      }
      
      if (primaryKeyword && other.primaryKeyword === primaryKeyword) {
        if (published === true && other.published === true) {
          errors.push(`Duplicate primaryKeyword '${primaryKeyword}' with published article ${other.file}`);
          stats.duplicateKeywords++;
        } else if (other.published === true && published === false) {
          warnings.push(`Draft may cannibalize published article ${other.file} (same primaryKeyword: '${primaryKeyword}'). Differentiate angle before publishing.`);
          stats.cannibalizationWarnings++;
        } else if (other.published === false && published === false && other.file < file) {
          warnings.push(`Duplicate primaryKeyword '${primaryKeyword}' with draft article ${other.file}`);
          stats.duplicateKeywords++;
        }
      }

      if (cluster && searchIntent && other.cluster === cluster && other.searchIntent === searchIntent && other.file < file) {
        warnings.push(`Potential cannibalization: shares cluster '${cluster}' and searchIntent '${searchIntent}' with ${other.file}`);
        stats.cannibalizationWarnings++;
      }

      if (title && other.title === title && other.file < file) {
        warnings.push(`Duplicate title '${title}' with ${other.file}`);
        stats.cannibalizationWarnings++;
      }
    }

    // Logical Consistency Checks
    if (published === true) {
      if (noindex === true) {
        errors.push(`Contradiction: published=true but noindex=true`);
      }
      if (!canonical) {
        errors.push(`Missing 'canonical' for published article`);
      } else {
        const expectedCanonical = language === 'ru' ? `https://gotoflow.io/ru/blog/${slug}` : `https://gotoflow.io/blog/${slug}`;
        if (canonical !== expectedCanonical) {
          errors.push(`Canonical mismatch. Expected: ${expectedCanonical}, Found: ${canonical}`);
        }
      }

      // Check sitemap
      if (sitemapContent && slug) {
        const sitemapUrl = language === 'ru' ? `<loc>https://gotoflow.io/ru/blog/${slug}</loc>` : `<loc>https://gotoflow.io/blog/${slug}</loc>`;
        if (!sitemapContent.includes(sitemapUrl)) {
          errors.push(`Published article missing from dist/sitemap.xml`);
        }
      }
    }

    if (published === false) {
      if (noindex !== true) {
        errors.push(`Contradiction: published=false but noindex=false (drafts must be noindex)`);
      }
      
      // Check sitemap
      if (sitemapContent && slug) {
        const sitemapUrlEn = `<loc>https://gotoflow.io/blog/${slug}</loc>`;
        const sitemapUrlRu = `<loc>https://gotoflow.io/ru/blog/${slug}</loc>`;
        if (sitemapContent.includes(sitemapUrlEn) || sitemapContent.includes(sitemapUrlRu)) {
          errors.push(`Draft/noindex article found in dist/sitemap.xml`);
        }
      }
    }

    // Specific Exceptions
    if (file === 'test-seo-template-v2.md') {
      if (published !== false || noindex !== true) {
        errors.push(`test-seo-template-v2.md MUST be published=false and noindex=true`);
      }
    }

    // Meta Disclaimer Validation
    if (language === 'ru') {
      if (hasYamlKey(frontmatter, 'metaDisclaimer')) {
        warnings.push(`Manual metaDisclaimer field found in frontmatter. This is now handled automatically by the template.`);
      }
      if (/(^|[^a-zа-яё0-9_])(Instagram|Facebook|Meta|Инстаграм|Фейсбук|Мета)\*(?!\*)/i.test(content)) {
         warnings.push(`Manual asterisk found on restricted term (e.g. Instagram*). The template automatically adds them now, so please remove manual ones to avoid double-starring.`);
      }
      if (/принадлежат Meta Platforms Inc., деятельность которой/i.test(content)) {
         warnings.push(`Manual disclaimer text found in content. The template automatically adds it now.`);
      }
    } else {
      if (/принадлежат Meta Platforms Inc., деятельность которой/i.test(content) || hasYamlKey(frontmatter, 'metaDisclaimer')) {
        errors.push(`RU Meta disclaimer or text found in EN article!`);
      }
    }

    // Link Validation (frontmatter & body)
    const frontmatterLinks = extractFrontmatterLinks(frontmatter);
    const bodyLinksRaw = extractBodyLinks(content);
    
    let internalBodyLinksCount = 0;
    const allLinks = [...frontmatterLinks, ...bodyLinksRaw];
    
    for (let link of allLinks) {
      link = link.trim();
      if (!link) {
        errors.push(`Empty href or secondaryHref found`);
        continue;
      }
      if (link === '#explore-more') continue;
      
      if (link.startsWith('http://') || (link.startsWith('https://') && !link.startsWith('https://gotoflow.io'))) {
        warnings.push(`External link should be intentionally reviewed: '${link}'`);
        continue;
      }

      if (!link.startsWith('/') && !link.startsWith('#') && !link.startsWith('https://gotoflow.io')) {
        errors.push(`Internal link '${link}' must start with / or #`);
        stats.brokenInternalLinks++;
        continue;
      }

      // Check query params
      if (link.includes('?')) {
        warnings.push(`Query params are discouraged in internal links: '${link}'`);
      }

      let cleanLink = link.replace(/^https:\/\/gotoflow\.io/, '');
      cleanLink = cleanLink.split('#')[0].split('?')[0]; // ignore hash and query
      if (cleanLink.endsWith('/') && cleanLink !== '/') cleanLink = cleanLink.slice(0, -1);

      if (cleanLink === '' || cleanLink === '/') continue;

      if (cleanLink === '/blog/test-seo-template-v2' || cleanLink === '/ru/blog/test-ru-seo-template') {
        if (published) {
          errors.push(`Link to test template is forbidden in published article: '${link}'`);
          stats.brokenInternalLinks++;
        } else {
          warnings.push(`Link to test template found: '${link}'`);
        }
        continue;
      }

      if (cleanLink.startsWith('/blog/') || cleanLink.startsWith('/ru/blog/')) {
        const targetSlug = cleanLink.replace(/^\/(ru\/)?blog\//, '');
        if (draftSlugs.has(targetSlug)) {
          if (published) {
            errors.push(`Published article cannot link to draft/noindex article: '${link}'`);
            stats.draftLinkViolations++;
          } else {
            warnings.push(`Draft article links to another draft: '${link}'`);
            stats.draftLinkViolations++;
          }
        } else if (!publishedSlugs.has(targetSlug) && !ALLOWLIST_ROUTES.includes(cleanLink)) {
          if (published) {
            errors.push(`Link points to unknown/unpublished blog article: '${link}'`);
            stats.brokenInternalLinks++;
          } else {
            warnings.push(`Link points to unknown/unpublished blog article: '${link}'`);
            stats.brokenInternalLinks++;
          }
        }
      } else if (!ALLOWLIST_ROUTES.includes(cleanLink)) {
        if (published) {
          errors.push(`Link points to missing or non-allowlisted route: '${link}'`);
          stats.brokenInternalLinks++;
        } else {
          warnings.push(`Link points to missing or non-allowlisted route: '${link}'`);
          stats.brokenInternalLinks++;
        }
      }

      if (bodyLinksRaw.includes(link) && (cleanLink.startsWith('/') || link.startsWith('https://gotoflow.io/'))) {
        internalBodyLinksCount++;
      }
    }

    // Warnings checks
    
    if (published === true) {
      if (!getYamlValue(frontmatter, 'lastReviewed')) {
        warnings.push(`Missing 'lastReviewed' for published article`);
      }
      
      if (internalBodyLinksCount === 0) {
        warnings.push(`No contextual internal links found in article body`);
      }
      
      const targetTypes = ['guide', 'how-to', 'prompts', 'prompt-library', 'comparison', 'best-tools'];
      if (articleType && targetTypes.includes(articleType.toLowerCase())) {
        const callouts = hasCallouts(content);
        if (!callouts.hasProduct && !callouts.hasRelated) {
          warnings.push(`Missing product or related callout for articleType '${articleType}'`);
        }
      }

      }

      // Placement warnings (apply to drafts and published)
      if (file !== 'test-seo-template-v2.md' && file !== 'test-ru-seo-template.md') {
        const calloutSequenceMatch = content.match(/>\s*\[!product\]([\s\S]*?)>\s*\[!related\]/);
        if (calloutSequenceMatch) {
          const between = calloutSequenceMatch[1].replace(/>.*/g, '').trim();
          if (between.length < 100 && !between.includes('#')) {
            warnings.push(`[!related] block is placed directly after [!product]. Separate them by meaningful content.`);
          }
        }

        const promptGroupsSection = content.split('## Prompt Groups')[1];
        if (promptGroupsSection) {
          const promptGroupsContent = promptGroupsSection.split('\n## ')[0];
          if (promptGroupsContent.includes('> [!related]')) {
            const afterRelated = promptGroupsContent.split('> [!related]')[1];
            if (afterRelated.includes('\n### ') || afterRelated.match(/\n\d+\.\s/)) {
              warnings.push(`[!related] block should not be placed inside 'Prompt Groups' section to avoid interrupting the list.`);
            }
          }
        }
      }

      // Check for repeated callout blocks
      if (file !== 'test-seo-template-v2.md' && file !== 'test-ru-seo-template.md') {
        const body = content.replace(/^---\s*\n([\s\S]*?)\n---\s*\n?/, '');
        const blocks = body.split(/\n\s*\n/);
        let consecutiveCallouts = 0;
        for (const block of blocks) {
          const trimmed = block.trim();
          if (trimmed.startsWith('> [!')) {
            consecutiveCallouts++;
            if (consecutiveCallouts >= 3) {
              warnings.push(`Avoid 3+ consecutive callout blocks; callouts are editorial accents, not repeated section cards.`);
              break;
            }
          } else if (trimmed !== '') {
            consecutiveCallouts = 0;
          }
        }
      }

      // Check for Markdown tables with > 4 columns
      const tableRows = content.match(/^\|.*?\|$/gm);
      if (tableRows) {
        for (const row of tableRows) {
          const columns = row.split('|').length - 2;
          if (columns > 4) {
            warnings.push(`Markdown table has more than 4 columns; consider simplifying for mobile readability.`);
            break;
          }
        }
      }

      // Check :::cards blocks
      const cardsBlocks = content.match(/:::cards([\s\S]*?)(:::|$)/g);
      if (cardsBlocks) {
        for (const cBlock of cardsBlocks) {
          if (!cBlock.endsWith(':::') || cBlock.trim() === ':::cards') {
            warnings.push(`Cards block is not closed properly (missing ':::').`);
          }
          
          const lines = cBlock.split('\n');
          let type = 'default';
          for (let i = 0; i < Math.min(3, lines.length); i++) {
            const typeMatch = lines[i].trim().match(/^type:\s*([a-zA-Z0-9-]+)$/i);
            if (typeMatch) {
              type = typeMatch[1].toLowerCase();
              break;
            }
          }
          
          const allowedVariants = ['mistakes', 'tips', 'takeaways', 'workflow', 'best-for', 'examples', 'checklist', 'pros-cons', 'default'];
          if (!allowedVariants.includes(type)) {
            warnings.push(`Unknown cards block type '${type}'; using default styling.`);
          }
          
          let h3Count = 0;
          for (const line of lines) {
            if (line.trim().startsWith('### ')) {
              h3Count++;
            }
          }
          
          if (h3Count === 0) {
            warnings.push(`Cards block has no H3 items.`);
          } else if (h3Count < 2) {
            warnings.push(`Cards block has fewer than 2 items; use a normal callout or paragraph instead.`);
          } else if (h3Count > 8) {
            warnings.push(`Cards block has more than 8 items; consider splitting for readability.`);
          }
        }
      }

    // Check for unsupported raw directives and validate mockups
    const articleBodyText = content.replace(/^---\s*\n([\s\S]*?)\n---\s*\n?/, '');
    const rawDirectives = articleBodyText.match(/^:::[a-zA-Z0-9-]+[^\n]*/gm) || [];
    const supportedDirectives = [':::cards', ':::mockup', ':::prompts'];
    for (const directive of rawDirectives) {
      const baseDirective = directive.split('{')[0].trim();
      if (!supportedDirectives.includes(baseDirective)) {
        errors.push(`Raw unsupported directive found: ${baseDirective}`);
      }
      if (baseDirective === ':::mockup') {
        const typeMatch = directive.match(/type="([^"]+)"/);
        const layoutMatch = directive.match(/layout="([^"]+)"/);
        const slotMatch = directive.match(/slot="([^"]+)"/);
        
        if (slotMatch) {
          const slot = slotMatch[1];
          if (!VALID_MOCKUP_SLOTS.includes(slot)) {
            errors.push(`Mockup shortcode has unknown slot: ${slot}`);
          }
          if (typeMatch || layoutMatch) {
            errors.push(`Mockup shortcode cannot use both 'slot' and 'type/layout': ${directive}`);
          }
        } else {
          warnings.push(`Mockup shortcode is using deprecated type/layout format. Please use slot. ${directive}`);
          if (!typeMatch || !layoutMatch) {
            errors.push(`Mockup shortcode missing slot or type/layout: ${directive}`);
          }
        }
      }
    }

    const articleTypeStr = getYamlValue(frontmatter, 'articleType') || '';
    const searchIntentStr = getYamlValue(frontmatter, 'searchIntent') || '';
    if (articleTypeStr.includes('how-to') || searchIntentStr.includes('how-to') || articleTypeStr.includes('product-led')) {
      let hasTopicOrResult = false;
      let hasFormatOrStyle = false;

      for (const directive of rawDirectives) {
        if (directive.includes('slot="topic-input"') || directive.includes('slot="result-preview"')) {
          hasTopicOrResult = true;
        }
        if (directive.includes('slot="format-settings"') || directive.includes('slot="style-choice"')) {
          hasFormatOrStyle = true;
        }
      }

      if (!hasTopicOrResult || !hasFormatOrStyle) {
        warnings.push(`Product-led/How-to article should ideally have at least 2 mockups: one of (topic-input, result-preview) and one of (format-settings, style-choice)`);
      }
    }

    // Check for raw markdown images
    if (/!\[.*?\]\(.*?\)/.test(articleBodyText)) {
      errors.push(`Raw markdown image syntax found. Use :::mockup instead.`);
    }
    if (/<img[^>]+src=["'].*?["']/.test(articleBodyText)) {
      errors.push(`Raw img tag found. Use :::mockup instead.`);
    }

    const langMatch = frontmatter.match(/^language:\s*([^\s]+)/m);
    const lang = langMatch ? langMatch[1] : 'en';
    if (lang === 'ru') {
      const enLabels = [
        "What you need to know",
        "Related tools and guides",
        "Frequently asked questions",
        "Last reviewed",
        "this guide is kept up to date",
        "Product Workflow",
        "Pro Tip",
        "Key Takeaway"
      ];
      for (const label of enLabels) {
        if (articleBodyText.includes(label)) {
          errors.push(`English UI label in RU article: "${label}"`);
        }
      }
    }

    if (!getYamlValue(frontmatter, 'primaryKeyword')) warnings.push(`Missing 'primaryKeyword'`);
    if (!getYamlValue(frontmatter, 'searchIntent')) warnings.push(`Missing 'searchIntent'`);
    if (!getYamlValue(frontmatter, 'cluster')) warnings.push(`Missing 'cluster'`);
    if (!getYamlValue(frontmatter, 'language')) warnings.push(`Missing 'language'`);
    if (!getYamlValue(frontmatter, 'description')) warnings.push(`Missing 'description'`);
    if (!getYamlValue(frontmatter, 'articleType')) warnings.push(`Missing 'articleType'`);
    if (!getYamlValue(frontmatter, 'createdAt')) warnings.push(`Missing 'createdAt'`);
    if (!getYamlValue(frontmatter, 'updatedAt')) warnings.push(`Missing 'updatedAt'`);
    if (!hasYamlKey(frontmatter, 'faq')) warnings.push(`Missing 'faq'`);
    if (!hasYamlKey(frontmatter, 'explore')) warnings.push(`Missing 'explore'`);
    if (!hasYamlKey(frontmatter, 'finalCta')) {
      warnings.push(`Missing 'finalCta'`);
    } else {
      // Let's extract finalCta block
      const finalCtaMatch = frontmatter.match(/^finalCta:\s*\n([\s\S]*?)(?:^[a-zA-Z0-9]+:|\n---)/m);
      if (finalCtaMatch) {
        const ctaBlock = finalCtaMatch[1];
        if (!/^\s+title:/m.test(ctaBlock)) warnings.push(`finalCta missing 'title'`);
        if (!/^\s+buttonText:/m.test(ctaBlock)) warnings.push(`finalCta missing 'buttonText'`);
        if (!/^\s+href:/m.test(ctaBlock) && !/^\s+secondaryHref:/m.test(ctaBlock)) warnings.push(`finalCta missing 'href' or 'secondaryHref'`);
        if (!/^\s+href:/m.test(ctaBlock)) warnings.push(`finalCta missing main 'href'`);
        if (!/^\s+text:/m.test(ctaBlock) && !/^\s+description:/m.test(ctaBlock)) warnings.push(`finalCta missing 'text' or 'description'`);
      }
    }

    // Output results for this file
    if (errors.length === 0 && warnings.length === 0) {
      console.log(`  ✅ All good!`);
    } else {
      errors.forEach(e => {
        console.log(`  ❌ P0: ${e}`);
        hasP0Error = true;
        stats.errorsCount++;
      });
      warnings.forEach(w => {
        console.log(`  ⚠️  Warning: ${w}`);
        totalWarnings++;
        stats.warningsCount++;
      });
    }
    console.log(''); // newline
  }

  // --- Mockup Registry Validation ---
  console.log('🔍 Checking Mockup Asset Registry...\n');
  const registryStats = {
    total: 0,
    approved: 0,
    planned: 0,
    needsRescreen: 0,
    internalOnly: 0,
    rejected: 0
  };

  try {
    if (!fs.existsSync(MOCKUP_REGISTRY_PATH)) {
      console.log(`  ❌ P0: Mockup registry not found at ${MOCKUP_REGISTRY_PATH}`);
      hasP0Error = true;
    } else {
      const registryContent = fs.readFileSync(MOCKUP_REGISTRY_PATH, 'utf-8');
      const registry = JSON.parse(registryContent);
      
      if (!Array.isArray(registry.assets)) {
        console.log(`  ❌ P0: Mockup registry must contain an 'assets' array`);
        hasP0Error = true;
      } else {
        const assetIds = new Set();
        const allowedLanguages = ['ru', 'en'];
        const allowedStatuses = ['planned', 'needs-rescreen', 'approved', 'internal-only', 'rejected'];
        
        for (const asset of registry.assets) {
          registryStats.total++;
          if (asset.status === 'approved') registryStats.approved++;
          if (asset.status === 'planned') registryStats.planned++;
          if (asset.status === 'needs-rescreen') registryStats.needsRescreen++;
          if (asset.status === 'internal-only') registryStats.internalOnly++;
          if (asset.status === 'rejected') registryStats.rejected++;
          
          const reqFields = ['id', 'path', 'language', 'cluster', 'suitableFor', 'articleTypes', 'status', 'alt', 'priority', 'source'];
          for (const field of reqFields) {
            if (asset[field] === undefined) {
              console.log(`  ❌ P0: Asset '${asset.id || 'unknown'}' missing required field: ${field}`);
              hasP0Error = true;
            }
          }
          
          if (asset.id) {
            if (assetIds.has(asset.id)) {
              console.log(`  ❌ P0: Duplicate asset id in registry: '${asset.id}'`);
              hasP0Error = true;
            }
            assetIds.add(asset.id);
          }
          
          if (asset.language && !allowedLanguages.includes(asset.language)) {
            console.log(`  ❌ P0: Asset '${asset.id}' has invalid language: '${asset.language}'`);
            hasP0Error = true;
          }
          
          if (asset.status && !allowedStatuses.includes(asset.status)) {
            console.log(`  ❌ P0: Asset '${asset.id}' has invalid status: '${asset.status}'`);
            hasP0Error = true;
          }
          
          if (asset.path && !asset.path.startsWith('/assets/blog/mockups/')) {
            console.log(`  ❌ P0: Asset '${asset.id}' path must start with /assets/blog/mockups/`);
            hasP0Error = true;
          }
          
          if (asset.status === 'approved') {
            const publicPath = path.join(ROOT, 'public', asset.path);
            if (!fs.existsSync(publicPath)) {
              console.log(`  ❌ P0: Approved asset '${asset.id}' file does not exist at ${publicPath}`);
              hasP0Error = true;
            }
            if (!asset.caption) {
              console.log(`  ❌ P0: Approved asset '${asset.id}' must have a caption`);
              hasP0Error = true;
            }
            if (!asset.alt) {
              console.log(`  ❌ P0: Approved asset '${asset.id}' must have an alt`);
              hasP0Error = true;
            }
          }
          
          if (['planned', 'needs-rescreen', 'internal-only'].includes(asset.status)) {
            if (!asset.alt) {
              console.log(`  ❌ P0: Asset '${asset.id}' must have an alt (even if not approved)`);
              hasP0Error = true;
            }
            if (asset.caption === undefined) {
              console.log(`  ⚠️  Warning: Asset '${asset.id}' should ideally have a caption (status: ${asset.status})`);
              totalWarnings++;
            }
          }
          
          if (asset.status === 'rejected') {
            if (!asset.notes) {
              console.log(`  ❌ P0: Rejected asset '${asset.id}' must have notes explaining why`);
              hasP0Error = true;
            }
          }
        }
        
        console.log(`  ✅ Registry check complete: ${registryStats.total} assets found.`);
      }
    }
  } catch (e) {
    console.log(`  ❌ P0: Failed to parse mockup registry JSON: ${e.message}`);
    hasP0Error = true;
  }
  console.log('');
  // --- End Mockup Registry Validation ---

  // Final Summary
  console.log('─────────────────────────────────────────');
  console.log('📊 CHECK SUMMARY');
  console.log(`📄 Total MD Articles: ${stats.totalArticles} (${stats.publishedCount} published, ${stats.draftCount} draft)`);
  console.log(`🖼️  Mockup Assets: ${registryStats.total} (${registryStats.approved} approved, ${registryStats.planned} planned, ${registryStats.needsRescreen} needs-rescreen, ${registryStats.internalOnly} internal, ${registryStats.rejected} rejected)`);
  
  if (stats.duplicateKeywords > 0) console.log(`  - Duplicate keywords: ${stats.duplicateKeywords}`);
  if (stats.cannibalizationWarnings > 0) console.log(`  - Cannibalization warnings: ${stats.cannibalizationWarnings}`);
  if (stats.brokenInternalLinks > 0) console.log(`  - Broken internal links: ${stats.brokenInternalLinks}`);
  if (stats.draftLinkViolations > 0) console.log(`  - Draft link violations: ${stats.draftLinkViolations}`);
  
  if (hasP0Error) {
    console.log(`❌ Status: FAILED (${stats.errorsCount} P0 errors found)`);
    process.exit(1);
  } else {
    console.log(`✅ Status: PASSED`);
    if (totalWarnings > 0) {
      console.log(`⚠️  Total Warnings: ${stats.warningsCount}`);
    }
    process.exit(0);
  }
}

runCheck().catch(console.error);
