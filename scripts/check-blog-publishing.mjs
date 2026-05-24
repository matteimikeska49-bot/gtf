import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const ARTICLES_DIR = path.join(ROOT, 'src/content/blog/articles');
const SITEMAP_PATH = path.join(ROOT, 'dist/sitemap.xml');

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

// Extract all hrefs and secondaryHrefs
function extractLinks(frontmatter) {
  const hrefMatches = [...frontmatter.matchAll(/href:\s*["']?([^"'\n]+)["']?/g)];
  const secondaryHrefMatches = [...frontmatter.matchAll(/secondaryHref:\s*["']?([^"'\n]+)["']?/g)];
  return [...hrefMatches, ...secondaryHrefMatches].map(m => m[1]);
}

async function runCheck() {
  console.log('🔍 Starting Blog Publishing Pipeline Check...\n');

  let hasP0Error = false;
  let totalWarnings = 0;
  
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

  // Pass 1: Collect all slugs and publish states
  for (const file of files) {
    const filePath = path.join(ARTICLES_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const frontmatter = extractFrontmatter(content);
    if (!frontmatter) continue;

    const slug = getYamlValue(frontmatter, 'slug');
    const published = getYamlValue(frontmatter, 'published');
    
    if (slug) {
      if (published === true) publishedSlugs.add(slug);
      if (published === false) draftSlugs.add(slug);
    }
    parsedFiles.push({ file, content, frontmatter, slug, published });
  }

  // Pass 2: Validate
  for (const { file, frontmatter, slug, published } of parsedFiles) {
    console.log(`📄 Checking ${file}...`);

    const errors = [];
    const warnings = [];

    const title = getYamlValue(frontmatter, 'title');
    const canonical = getYamlValue(frontmatter, 'canonical');
    const noindex = getYamlValue(frontmatter, 'noindex');

    // P0: Presence checks
    if (!slug) errors.push(`Missing 'slug'`);
    if (!title) errors.push(`Missing 'title'`);
    if (published === undefined) errors.push(`Missing 'published' (must be true or false)`);
    if (noindex === undefined) errors.push(`Missing 'noindex' (must be true or false)`);

    // P0: Duplicate slug
    if (slug) {
      if (slugsSeen.has(slug)) {
        errors.push(`Duplicate slug '${slug}' (already used by ${slugsSeen.get(slug)})`);
      } else {
        slugsSeen.set(slug, file);
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
        const expectedCanonical = `https://gotoflow.io/blog/${slug}`;
        if (canonical !== expectedCanonical) {
          errors.push(`Canonical mismatch. Expected: ${expectedCanonical}, Found: ${canonical}`);
        }
      }

      // Check sitemap
      if (sitemapContent && slug) {
        const sitemapUrl = `<loc>https://gotoflow.io/blog/${slug}</loc>`;
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
        const sitemapUrl = `<loc>https://gotoflow.io/blog/${slug}</loc>`;
        if (sitemapContent.includes(sitemapUrl)) {
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

    // Link Validation
    const links = extractLinks(frontmatter);
    for (let link of links) {
      link = link.trim();
      if (!link) {
        errors.push(`Empty href or secondaryHref found`);
        continue;
      }
      if (link === '#explore-more') continue;
      
      let cleanLink = link.replace(/^https:\/\/gotoflow\.io/, '');
      if (!cleanLink.startsWith('/')) {
        errors.push(`Link '${link}' must be relative starting with / or absolute with https://gotoflow.io/`);
        continue;
      }

      // Check if it's pointing to a blog draft
      if (cleanLink.startsWith('/blog/')) {
        const targetSlug = cleanLink.replace('/blog/', '');
        if (draftSlugs.has(targetSlug)) {
          errors.push(`Link '${link}' points to a draft/noindex markdown article`);
        } else if (!publishedSlugs.has(targetSlug) && !ALLOWLIST_ROUTES.includes(cleanLink)) {
          errors.push(`Link '${link}' points to an unknown or unpublished blog article`);
        }
      } else if (!ALLOWLIST_ROUTES.includes(cleanLink)) {
        errors.push(`Link '${link}' is not in the ALLOWLIST_ROUTES`);
      }
    }

    // Warnings checks
    if (!getYamlValue(frontmatter, 'primaryKeyword')) warnings.push(`Missing 'primaryKeyword'`);
    if (!getYamlValue(frontmatter, 'searchIntent')) warnings.push(`Missing 'searchIntent'`);
    if (!getYamlValue(frontmatter, 'cluster')) warnings.push(`Missing 'cluster'`);
    if (!getYamlValue(frontmatter, 'lastReviewed')) warnings.push(`Missing 'lastReviewed'`);
    if (!getYamlValue(frontmatter, 'language')) warnings.push(`Missing 'language'`);
    if (!getYamlValue(frontmatter, 'description')) warnings.push(`Missing 'description'`);
    if (!getYamlValue(frontmatter, 'articleType')) warnings.push(`Missing 'articleType'`);
    if (!getYamlValue(frontmatter, 'createdAt')) warnings.push(`Missing 'createdAt'`);
    if (!getYamlValue(frontmatter, 'updatedAt')) warnings.push(`Missing 'updatedAt'`);
    if (!hasYamlKey(frontmatter, 'faq')) warnings.push(`Missing 'faq'`);
    if (!hasYamlKey(frontmatter, 'explore')) warnings.push(`Missing 'explore'`);
    if (!hasYamlKey(frontmatter, 'finalCta')) warnings.push(`Missing 'finalCta'`);

    // Output results for this file
    if (errors.length === 0 && warnings.length === 0) {
      console.log(`  ✅ All good!`);
    } else {
      errors.forEach(e => {
        console.log(`  ❌ P0: ${e}`);
        hasP0Error = true;
      });
      warnings.forEach(w => {
        console.log(`  ⚠️  Warning: ${w}`);
        totalWarnings++;
      });
    }
    console.log(''); // newline
  }

  // Final Summary
  console.log('─────────────────────────────────────────');
  console.log('📊 CHECK SUMMARY');
  if (hasP0Error) {
    console.log('❌ Status: FAILED (P0 errors found)');
    process.exit(1);
  } else {
    console.log(`✅ Status: PASSED`);
    if (totalWarnings > 0) {
      console.log(`⚠️  Total Warnings: ${totalWarnings}`);
    }
    process.exit(0);
  }
}

runCheck().catch(console.error);
