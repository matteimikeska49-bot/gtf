import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PRODUCTION_ARTIFACT_MARKERS, findVisiblePlatformFootnoteMarkers, hasStarredHref } from './blog-template-guardrails.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT, 'dist');
const ARTICLES_DIR = path.join(ROOT, 'src/content/blog/articles');
const SITEMAP_PATH = path.join(DIST_DIR, 'sitemap.xml');
const EN_BLOG_INDEX_PATH = path.join(DIST_DIR, 'blog/index.html');
const RU_BLOG_INDEX_PATH = path.join(DIST_DIR, 'ru/blog/index.html');
const BATCH_STATUS_PATH = path.join(ROOT, 'src/content/blog/batch-status.json');

console.log('🔍 Starting Rendered HTML Checks...\n');

if (!fs.existsSync(DIST_DIR)) {
  console.log('⚠️ dist/ directory not found. Please run "npm run build" first.');
  process.exit(1);
}

const sitemapContent = fs.existsSync(SITEMAP_PATH) ? fs.readFileSync(SITEMAP_PATH, 'utf-8') : '';
const enBlogIndex = fs.existsSync(EN_BLOG_INDEX_PATH) ? fs.readFileSync(EN_BLOG_INDEX_PATH, 'utf-8') : '';
const ruBlogIndex = fs.existsSync(RU_BLOG_INDEX_PATH) ? fs.readFileSync(RU_BLOG_INDEX_PATH, 'utf-8') : '';

const batchStatus = fs.existsSync(BATCH_STATUS_PATH) ? JSON.parse(fs.readFileSync(BATCH_STATUS_PATH, 'utf8')) : [];
const d53Topics = ['text-to-carousel-ai', 'instagram-carousel-hooks', 'tekst-v-karusel-neyroset', 'content-calendar-to-carousel', 'b2b-keysy-v-linkedin-karusel'];

let totalErrors = 0;
let totalWarnings = 0;
let scannedCount = 0;
let publishedChecked = 0;
let draftChecked = 0;

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

function checkHtmlFile(filePath, data, isD53) {
  const errors = [];
  const warnings = [];

  const expectedRoute = data.language === 'ru' ? `/ru/blog/${data.slug}` : `/blog/${data.slug}`;
  const htmlPath = path.join(DIST_DIR, expectedRoute, 'index.html');

  const isPublished = data.published === true && data.noindex === false;
  const isDraft = data.published === false || data.noindex === true;

  if (isPublished) publishedChecked++;
  else draftChecked++;

  let htmlContent = '';
  if (fs.existsSync(htmlPath)) {
    htmlContent = fs.readFileSync(htmlPath, 'utf8');
  } else if (isPublished) {
    errors.push(`[P0] Published article HTML is missing from dist: ${htmlPath}`);
  }

  // Blog Index checks
  const blogIndexToCheck = data.language === 'ru' ? ruBlogIndex : enBlogIndex;
  const isLinkedFromBlogIndex = blogIndexToCheck.includes(`href="${expectedRoute}"`) || blogIndexToCheck.includes(`href="${expectedRoute}/"`);
  
  const sitemapUrl = `https://gotoflow.io${expectedRoute}`;
  const isInSitemap = sitemapContent.includes(`<loc>${sitemapUrl}</loc>`);

  if (isPublished) {
    if (!isInSitemap) errors.push(`[P0] Published article missing from sitemap: ${sitemapUrl}`);
    if (!isLinkedFromBlogIndex) errors.push(`[P0] Published article missing from blog index: ${expectedRoute}`);
  }

  if (isDraft) {
    if (isInSitemap) errors.push(`[P0] Draft/noindex article is in sitemap (SEO Leak): ${sitemapUrl}`);
    if (isLinkedFromBlogIndex) errors.push(`[P0] Draft/noindex article is in public blog index: ${expectedRoute}`);
  }

  // if (isD53) {
  //   if (isInSitemap) errors.push(`[P0] D53 article is in sitemap (CRITICAL LEAK): ${sitemapUrl}`);
  //   if (isLinkedFromBlogIndex) errors.push(`[P0] D53 article is in public blog index (CRITICAL LEAK): ${expectedRoute}`);
  // }

  if (htmlContent) {
    const lowerHtml = htmlContent.toLowerCase();

    // Indexability checks
    const hasNoindex = /<meta\s+name="robots"\s+content="[^"]*noindex[^"]*"/i.test(htmlContent);
    if (isPublished && hasNoindex) {
      errors.push(`[P0] Published article HTML contains 'noindex'`);
    }
    if (isDraft && !hasNoindex) {
      errors.push(`[P0] Draft preview HTML is missing 'noindex'`);
    }

    // Canonical matching
    const canonicalMatch = htmlContent.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
    const renderedCanonical = canonicalMatch ? canonicalMatch[1] : null;
    const expectedCanonical = data.canonical || `https://gotoflow.io${expectedRoute}`;
    if (!renderedCanonical) {
      errors.push(`[P0] Missing canonical tag`);
    } else if (renderedCanonical !== expectedCanonical) {
      errors.push(`[P0] Canonical mismatch. Expected: ${expectedCanonical}, Found: ${renderedCanonical}`);
    }

    // Title / Meta
    const titleMatch = htmlContent.match(/<title>([^<]+)<\/title>/i);
    if (!titleMatch) {
      errors.push(`[P0] Missing <title> tag`);
    } else {
      let decodedTitle = titleMatch[1].replace(/&amp;/g, '&');
      // allow some difference if standard suffix is added, but it shouldn't be empty
      if (!decodedTitle.includes(data.title.replace(/&/g, '&amp;'))) {
         // rough check
         if (!decodedTitle.includes('GoToFlow')) {
            warnings.push(`Rendered title doesn't match frontmatter or typical brand format.`);
         }
      }
    }

    const descMatch = htmlContent.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
    if (!descMatch) {
      errors.push(`[P0] Missing meta description tag`);
    } else {
      let decodedDesc = descMatch[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&');
      if (data.description && !decodedDesc.includes(data.description.substring(0, 30))) {
        warnings.push(`Rendered description differs significantly from frontmatter.`);
      }
    }

    // Artifacts checks
    const artifacts = [
      ...PRODUCTION_ARTIFACT_MARKERS,
      ':::mockup', '[!product]', 'InlineProductBlock', '<ArticleFinalCta', 'quickAnswer:', 'finalCta:', '\n---\n', 'TODO', 'TBD', 'lorem ipsum',
      'if exists', 'if available', 'future cross-link after publication', 'else / fallback'
    ];
    artifacts.forEach(str => {
      if (htmlContent.includes(str)) errors.push(`[P0] Raw artifact leaked: "${str}"`);
    });
    if (/(?<!\*)\*\([^)]+\)\*(?!\*)/.test(htmlContent)) {
      errors.push(`[P0] Raw artifact leaked: "*(...)*"`);
    }
    if (htmlContent.includes('&lt;span class=')) errors.push(`[P0] Escaped JSX found: "&lt;span class="`);
    if (hasStarredHref(htmlContent)) errors.push(`[P0] Href with literal * leaked to rendered HTML`);
    findVisiblePlatformFootnoteMarkers(htmlContent, { html: true }).forEach((finding) => {
      errors.push(`[P0] Visible platform footnote marker leaked to rendered HTML: "${finding.marker}" (${finding.text})`);
    });

    // Schema checks
    if (!htmlContent.includes('"@type":"Article"') && !htmlContent.includes('"@type":"BlogPosting"')) {
      errors.push(`[P0] Missing Article/BlogPosting schema`);
    }
    
    // FAQ Schema
    const hasFaqSchema = htmlContent.includes('"@type":"FAQPage"');
    if (data.hasFaq && !hasFaqSchema) {
      errors.push(`[P0] Missing FAQPage schema despite frontmatter having FAQ`);
    } else if (!data.hasFaq && hasFaqSchema) {
      errors.push(`[P0] FAQPage schema found but frontmatter has no FAQ`);
    }

    // V2 DOM Checks (only for live published non-legacy articles)
    // We assume if it has quickAnswer, it's a V2 article
    if (data.hasQuickAnswer) {
        if (!htmlContent.includes('shadow-[0_24px_120px_rgba(236,72,153,0.08)]') && !htmlContent.includes('bg-pink-500/10')) {
            errors.push(`[P0] Quick Answer block is not rendered in HTML (missing signature classes)`);
        }
    }
    // Check Meta/Date block
    if (data.lastReviewed || data.updatedAt) {
        if (!lowerHtml.includes('последнее обновление') && !lowerHtml.includes('last reviewed') && !lowerHtml.includes('updated') && !lowerHtml.includes('обновлено')) {
             errors.push(`[P0] Meta/Date block is not rendered in HTML (missing date labels)`);
        }
    }

    // Explore / Final CTA / FAQ sections
    if (data.hasFaq && !htmlContent.includes('id="faq"')) {
        errors.push(`[P0] FAQ section is not rendered in HTML (missing id="faq")`);
    }
    if (data.hasExplore && !htmlContent.includes('id="explore-more"') && !htmlContent.includes('id="related-articles"')) {
        errors.push(`[P0] Explore section is not rendered in HTML (missing id="explore-more")`);
    }
    // Final CTA usually has secondaryHref and "Explore more" link inside
    if (!htmlContent.includes('from-pink-500/10') && !htmlContent.includes('from-pink-500/20')) {
         // rough check for final CTA container
         // just check if there's a CTA
    }

    // Duplications
    const h1Count = (htmlContent.match(/<h1[^>]*>/gi) || []).length;
    if (h1Count > 1) errors.push(`[P0] Duplicate <h1 tag rendered (${h1Count} found)`);

    const faqVisibleCount = (htmlContent.match(/id="faq"/gi) || []).length;
    if (faqVisibleCount > 1) errors.push(`[P0] Duplicate visible FAQ sections rendered.`);
  }

  if (errors.length > 0 || warnings.length > 0) {
    console.log(`\n${errors.length > 0 ? '❌' : '⚠️'} ${expectedRoute}`);
    errors.forEach(e => {
      console.log(`  - ${e}`);
      totalErrors++;
    });
    warnings.forEach(w => {
      console.log(`  - ${w}`);
      totalWarnings++;
    });
  }
}

const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md') && f !== '_template.md');

for (const file of files) {
  const filePath = path.join(ARTICLES_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) continue;
  
  const frontmatter = match[1];
  const slug = getYamlValue(frontmatter, 'slug') || file.replace('.md', '');
  if (slug.startsWith('test-')) continue;

  const data = {
    slug,
    language: getYamlValue(frontmatter, 'language') || 'en',
    published: getYamlValue(frontmatter, 'published') === true,
    noindex: getYamlValue(frontmatter, 'noindex') === true,
    canonical: getYamlValue(frontmatter, 'canonical'),
    title: getYamlValue(frontmatter, 'title'),
    description: getYamlValue(frontmatter, 'description'),
    hasFaq: /^faq:/m.test(frontmatter),
    hasExplore: /^explore:/m.test(frontmatter),
    hasQuickAnswer: /^quickAnswer:/m.test(frontmatter),
    lastReviewed: getYamlValue(frontmatter, 'lastReviewed'),
    updatedAt: getYamlValue(frontmatter, 'updatedAt'),
    isV2Test: slug.startsWith('test-')
  };

  const isD53 = d53Topics.includes(slug);
  scannedCount++;
  
  checkHtmlFile(filePath, data, isD53);
}

console.log(`\n📊 Scanned HTML mappings: ${scannedCount} (${publishedChecked} published, ${draftChecked} draft)`);

if (totalErrors > 0) {
  console.log(`\n❌ FAIL: Rendered HTML output check found ${totalErrors} errors.`);
  process.exit(1);
} else {
  console.log('\n✅ PASS: Rendered HTML output check passed.');
  if (totalWarnings > 0) {
    console.log(`⚠️  Total Warnings: ${totalWarnings}`);
  }
  process.exit(0);
}
