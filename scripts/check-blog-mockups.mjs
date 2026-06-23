import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { MOCKUP_SLOT_MAP, VALID_MOCKUP_SLOTS } from '../src/lib/blog/mockupSlots.js';
import { MOCKUP_POLICY } from '../src/lib/blog/mockupPolicy.js';

function getActiveArticleFiles() {
  const activeFiles = new Set();
  const args = process.argv.slice(2);
  args.forEach(arg => {
    if (arg.includes('src/content/blog/articles/')) {
      activeFiles.add(path.resolve(arg));
    }
  });
  if (activeFiles.size > 0) return Array.from(activeFiles);
  try {
    const diff = execSync('git diff --name-only', { encoding: 'utf-8' });
    const cachedDiff = execSync('git diff --cached --name-only', { encoding: 'utf-8' });
    let allDiffs = diff + '\n' + cachedDiff;
    if (!allDiffs.trim()) {
      const headDiff = execSync('git diff --name-only HEAD~1..HEAD', { encoding: 'utf-8' });
      allDiffs = headDiff;
    }
    allDiffs.split('\n').forEach(line => {
      if (line.includes('src/content/blog/articles/') && line.endsWith('.md')) {
        activeFiles.add(path.resolve(line.trim()));
      }
    });
  } catch (e) {
    console.error("Exec error:", e);
  }
  return Array.from(activeFiles);
}

const activeArticleFiles = getActiveArticleFiles();
console.log(`🔍 Active article files detected: ${activeArticleFiles.length}`);


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ARTICLES_DIR = path.join(__dirname, '../src/content/blog/articles');

const REGISTRY_PATH = path.join(__dirname, '../src/content/blog/mockups/registry.json');

console.log('🖼️  Starting strict mockup language check...\n');

let hasP0Error = false;
let conflicts = [];
let warnings = [];
let legacyDebt = [];
let legacyDebtFiles = new Set();
let activeP0Count = 0;
let activeP1Count = 0;


// 1. Extract approved assets from registry.json
const slotAssets = { en: {}, ru: {} };
let approvedAssets = [];

const getPriorityWeight = (priority) => {
  if (priority === 'high' || priority === 1) return 1;
  if (priority === 'medium' || priority === 2) return 2;
  if (priority === 'low' || priority === 3) return 3;
  return 99;
};

const matchesValue = (assetValue, filterValue) => {
  if (!filterValue) return true;
  if (Array.isArray(assetValue)) return assetValue.includes(filterValue);
  return assetValue === filterValue;
};

const getApprovedMockups = (filters = {}) => {
  return approvedAssets
    .filter(asset => !filters.language || asset.language === filters.language)
    .filter(asset => matchesValue(asset.cluster, filters.cluster))
    .filter(asset => matchesValue(asset.articleTypes, filters.articleType))
    .filter(asset => {
      if (!filters.suitableFor) return true;
      const filterSuitable = Array.isArray(filters.suitableFor) ? filters.suitableFor : [filters.suitableFor];
      const assetSuitable = Array.isArray(asset.suitableFor) ? asset.suitableFor : [asset.suitableFor];
      return filterSuitable.some(slot => assetSuitable.includes(slot));
    })
    .sort((a, b) => getPriorityWeight(a.priority) - getPriorityWeight(b.priority));
};

const getMockupSelectionForArticle = (article, options = {}) => {
  const baseFilters = {
    language: article.language,
    suitableFor: options.suitableFor,
  };

  const selectionSteps = [
    {
      matchLevel: 'exact',
      filters: {
        ...baseFilters,
        cluster: article.cluster,
        articleType: article.articleType,
      },
    },
    {
      matchLevel: 'clusterFallback',
      filters: {
        ...baseFilters,
        cluster: article.cluster,
      },
    },
    {
      matchLevel: 'articleTypeFallback',
      filters: {
        ...baseFilters,
        articleType: article.articleType,
      },
    },
    {
      matchLevel: 'languageSlotFallback',
      filters: baseFilters,
    },
  ];

  for (const step of selectionSteps) {
    const mockups = getApprovedMockups(step.filters);
    if (mockups.length > 0) {
      return {
        asset: mockups[0],
        matchLevel: step.matchLevel,
        filters: step.filters,
      };
    }
  }

  return {
    asset: null,
    matchLevel: 'none',
    filters: baseFilters,
  };
};

const isStronglyVisualArticle = ({ articleType, pageType, searchIntent, cluster }) => {
  const typeText = `${articleType || ''} ${pageType || ''}`.toLowerCase();
  const intentText = `${searchIntent || ''} ${cluster || ''}`.toLowerCase();

  const requiredTypes = [
    'comparison',
    'comparison_article',
    'guide',
    'how-to',
    'how_to',
    'how_to_article',
    'thought-leadership/comparison',
    'tutorial',
    'use_case_article',
    'how-to/use-case',
    'ideas_article',
    'examples_article',
    'visual guide',
    'visual_guide',
    'listicle',
    'ideas',
    'best-tools'
  ];

  const typeRequiresMockup = requiredTypes.some(type => typeText.includes(type));
  const visualIntent = /(carousel|карусел|examples?|примеры|design|дизайн|workflow|воркфлоу|comparison|сравнен|before\/after|до\/после)/i.test(intentText);
  const promptLibraryOnly = typeText.includes('prompt_library') || typeText.includes('prompts');

  return typeRequiresMockup || (visualIntent && !promptLibraryOnly);
};

const assetUsage = new Map();

try {
  const registryContent = fs.readFileSync(REGISTRY_PATH, 'utf-8');
  const registry = JSON.parse(registryContent);
  const assets = registry.assets || [];
  approvedAssets = assets.filter(asset => asset.status === 'approved');
  
  approvedAssets.forEach(asset => {
    if (asset.suitableFor) {
      asset.suitableFor.forEach(slot => {
        if (!slotAssets[asset.language]) slotAssets[asset.language] = {};
        if (!slotAssets[asset.language][slot]) slotAssets[asset.language][slot] = [];
        slotAssets[asset.language][slot].push(asset);
      });
    }
  });
} catch (e) {
  console.error(`❌ Failed to read registry.json: ${e.message}`);
  process.exit(1);
}

// 2. Check markdown articles
try {
  const files = fs.readdirSync(ARTICLES_DIR);
  for (const file of files) {
    if (!file.endsWith('.md') || file.startsWith('_')) continue;
    const content = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf-8');
    
    const fullPath = path.resolve(path.join(ARTICLES_DIR, file));
    const isActiveArticle = activeArticleFiles.some(af => af === fullPath);

    const reportArticleError = (msg, isDowngradable) => {
      if (isDowngradable && !isActiveArticle) {
        legacyDebt.push(`P1 LEGACY DEBT: Mockup structural issue outside active scope
file: ${file}
original severity: P0
reason: ${msg}
migration needed: yes`);
        legacyDebtFiles.add(file);
      } else {
        conflicts.push(msg);
        if (isActiveArticle) activeP0Count++;
        hasP0Error = true;
      }
    };


    // Parse language
    const langMatch = content.match(/^language:\s*["']?([^"'\n]+)["']?/m);
    const language = langMatch ? langMatch[1].trim() : 'en';

    const slugMatch = content.match(/^slug:\s*["']?([^"'\n]+)["']?/m);
    const slug = slugMatch ? slugMatch[1].trim() : file.replace('.md', '');
    
    const typeMatch = content.match(/^articleType:\s*["']?([^"'\n]+)["']?/m);
    const articleType = typeMatch ? typeMatch[1].trim() : '';

    const pageTypeMatch = content.match(/^pageType:\s*["']?([^"'\n]+)["']?/m);
    const pageType = pageTypeMatch ? pageTypeMatch[1].trim() : '';

    const clusterMatch = content.match(/^cluster:\s*["']?([^"'\n]+)["']?/m);
    const cluster = clusterMatch ? clusterMatch[1].trim() : '';

    const searchIntentMatch = content.match(/^searchIntent:\s*["']?([^"'\n]+)["']?/m);
    const searchIntent = searchIntentMatch ? searchIntentMatch[1].trim() : '';

    const publishedMatch = content.match(/^published:\s*(true|false)/m);
    const published = publishedMatch ? publishedMatch[1] === 'true' : false;

    const previewMatch = content.match(/^preview:\s*(true|false)/m);
    const preview = previewMatch ? previewMatch[1] === 'true' : false;

    const mockupStatusMatch = content.match(/^mockupStatus:\s*["']?([^"'\n]+)["']?/m);
    const mockupStatus = mockupStatusMatch ? mockupStatusMatch[1].trim() : '';

    const mockupReasonMatch = content.match(/^mockupReason:\s*["']?([^"'\n]+)["']?/m);
    const mockupReason = mockupReasonMatch ? mockupReasonMatch[1].trim() : '';
    
    // Check for raw markdown images
    if (/!\[.*?\]\(.*?\)/.test(content)) {
      reportArticleError(`Raw markdown image found in ${file}. Use :::mockup{slot=\"...\"} instead.`, false);
    }
    
    // Check for raw HTML images
    if (/<img\b/i.test(content)) {
      reportArticleError(`Raw <img> tag found in ${file}. Use :::mockup{slot=\"...\"} instead.`, false);
    }

    // Check for direct paths or extensions (basic check outside frontmatter if possible, but let's just do a global check and ignore standard frontmatter fields if needed, or just a simple check for common paths)
    if (/(?<!\w)(\/mockups\/|\/images\/|\.webp|\.png|\.jpg)(?!\w)/i.test(content)) {
       // Only fail if it's not a known valid exception, but user strictly said fail on these paths
       reportArticleError(`Direct image path or extension found in ${file}. Use :::mockup{slot=\"...\"} instead.`, false);
    }

    // Check for old mockup syntax
    if (/:::mockup\s+name=["']?([^"'\s]+)["']?/i.test(content)) {
      reportArticleError(`Old mockup syntax (name=\"...\") found in ${file}. Use :::mockup{slot=\"...\"} instead.`, false);
    }

    // Check new slot-based mockups
    const lines = content.split('\n');
    let currentH2 = '';
    let currentH3 = '';
    const slotsFound = [];
    const articleAssetUsage = new Map();

    for (let i = 0; i < lines.length; i++) {
      const lineText = lines[i];
      if (lineText.startsWith('## ')) {
        currentH2 = lineText.substring(3).trim();
        currentH3 = ''; // Reset H3 when a new H2 appears
      } else if (lineText.startsWith('### ')) {
        currentH3 = lineText.substring(4).trim();
      }

      const mockupMatch = /:::mockup\{slot=["']?([^"'\s}]+)["']?\}/.exec(lineText);
      if (!mockupMatch) continue;

      const slotName = mockupMatch[1];
      slotsFound.push(slotName);

      const nearestHeading = currentH3 || currentH2 || '';
      const nearestHeadingLower = nearestHeading.toLowerCase();

      // Semantic placement rules
      const policy = MOCKUP_POLICY[slotName];
      if (policy) {
        const hasForbidden = policy.forbiddenContextKeywords.some(kw => nearestHeadingLower.includes(kw));
        if (hasForbidden) {
          reportArticleError(`P0: Mockup semantic placement error\nfile: ${file}\nline: ${i + 1}\nslot: ${slotName}\nnearest heading: ${nearestHeading}\nreason: forbidden context keyword found for this slot\nexpected: placement under relevant positive section`, true);
        }

        const hasForbiddenGeneric = policy.forbiddenWithoutOwnerContextKeywords.some(kw => nearestHeadingLower.includes(kw));
        const hasOwnerContext = policy.allowedOwnerContextKeywords.some(kw => nearestHeadingLower.includes(kw));

        if (hasForbiddenGeneric && !hasOwnerContext) {
          reportArticleError(`P0: Mockup semantic placement error\nfile: ${file}\nline: ${i + 1}\nslot: ${slotName}\nnearest heading: ${nearestHeading}\nreason: generic/competitor context without GoToFlow-owned workflow context\nexpected: placement under GoToFlow-owned context`, true);
        }

        const hasPositive = policy.allowedIntentKeywords.some(kw => nearestHeadingLower.includes(kw));
        if (!hasPositive && !hasOwnerContext) {
          warnings.push(`P1: Mockup placement needs semantic review\nfile: ${file}\nline: ${i + 1}\nslot: ${slotName}\nnearest heading: ${nearestHeading}\nexpected intent: requires one of: ${policy.allowedIntentKeywords.slice(0, 5).join(', ')}...`);
          if (isActiveArticle) activeP1Count++;
        }
      }
      
      // Slot exists?
      if (!VALID_MOCKUP_SLOTS.includes(slotName)) {
        reportArticleError(`Invalid mockup slot '${slotName}' in ${file}. Not found in shared mockup slot map.`, false);
        continue;
      }
      
      // Check if there's an approved asset for this language and slot
      const suitableFor = MOCKUP_SLOT_MAP[slotName]?.suitableFor || [];
      const availableAssets = suitableFor.flatMap(key => slotAssets[language]?.[key] || []);
      if (availableAssets.length === 0) {
        // Is there an asset for the OTHER language?
        const otherLang = language === 'en' ? 'ru' : 'en';
        const otherAssets = suitableFor.flatMap(key => slotAssets[otherLang]?.[key] || []);
        
        if (otherAssets.length > 0) {
          reportArticleError(`Language mismatch in ${file}: slot '${slotName}' has no approved '${language}' assets, but has '${otherLang}' assets.`, false);
        } else {
          reportArticleError(`No approved assets found for slot '${slotName}' in language '${language}' in ${file}.`, false);
        }
      }

      const selection = getMockupSelectionForArticle({
        language,
        cluster,
        articleType,
      }, {
        suitableFor,
      });

      if (selection.asset) {
        const assetKey = selection.asset.path || selection.asset.id;
        const assetLabel = selection.asset.id || selection.asset.path || 'unknown asset';

        if (selection.matchLevel !== 'exact') {
          warnings.push(
            `Fallback mockup selection: article '${slug}', slot '${slotName}', asset '${assetLabel}' (${selection.asset.path || 'no path'}), fallback level '${selection.matchLevel}'. Recommended action: approve a more specific asset for this cluster/articleType or document why this fallback is intentional.`
          );
          if (isActiveArticle) activeP1Count++;
        }

        if (!articleAssetUsage.has(assetKey)) articleAssetUsage.set(assetKey, 0);
        articleAssetUsage.set(assetKey, articleAssetUsage.get(assetKey) + 1);
        if (articleAssetUsage.get(assetKey) > 1) {
          warnings.push(
            `Repeated mockup inside one article: article '${slug}' uses asset '${assetLabel}' (${selection.asset.path || 'no path'}) more than once. Recommended action: use distinct section-specific assets when available.`
          );
          if (isActiveArticle) activeP1Count++;
        }

        if (published || preview) {
          if (!assetUsage.has(assetKey)) {
            assetUsage.set(assetKey, {
              id: selection.asset.id || assetKey,
              path: selection.asset.path || assetKey,
              slugs: new Set(),
            });
          }
          assetUsage.get(assetKey).slugs.add(slug);
        }
      }
    }
    
    if (slotsFound.length > 0 && mockupStatus === 'not_available') {
      reportArticleError(`Article ${file} has mockup slots but mockupStatus is 'not_available'. Use mockupStatus: 'present' or remove the status.`, true);
    }

    if (slotsFound.length > 0 && mockupStatus && !['present'].includes(mockupStatus)) {
      reportArticleError(`Article ${file} has mockup slots and invalid mockupStatus '${mockupStatus}'. Use 'present' or omit it.`, true);
    }

    if (mockupStatus === 'not_available' && mockupReason.length < 20) {
      reportArticleError(`Article ${file} uses mockupStatus: 'not_available' but lacks a meaningful mockupReason of at least 20 characters.`, true);
    }

    const requiresMockup = isStronglyVisualArticle({ articleType, pageType, searchIntent, cluster });

    // Enforcement of minimum mockups
    if (slotsFound.length === 0) {
      if (requiresMockup && mockupStatus !== 'not_available') {
        reportArticleError(`Article ${file} of type '${articleType || pageType}' MUST have at least 1 mockup slot OR set mockupStatus: 'not_available' with a meaningful mockupReason.`, true);
      }

      if (mockupStatus === 'present') {
        reportArticleError(`Article ${file} uses mockupStatus: 'present' but has no mockup slots.`, true);
      }
    }

    if (slotsFound.length > 0) {
      console.log(`📄 ${file} (${language}): found slots [${slotsFound.join(', ')}]`);
    } else {
      console.log(`📄 ${file} (${language}): no mockups found.`);
    }

    const distHtmlPath = path.join(__dirname, '../dist', language === 'ru' ? 'ru/blog' : 'blog', slug, 'index.html');
    if (fs.existsSync(distHtmlPath)) {
      const htmlContent = fs.readFileSync(distHtmlPath, 'utf-8');
      
      const mockupBlockRegex = /data-blog-mockup="true"/g;
      let renderedMockupsCount = 0;
      let match;
      while ((match = mockupBlockRegex.exec(htmlContent)) !== null) {
        renderedMockupsCount++;
        const blockContent = htmlContent.substring(match.index, match.index + 2000);
        const imgMatch = blockContent.match(/<img([^>]+)>/);
        if (imgMatch) {
           const imgAttrs = imgMatch[1];
           const srcMatch = imgAttrs.match(/src="([^"]+)"/);
           const altMatch = imgAttrs.match(/alt="([^"]+)"/);
           
           if (!srcMatch || !srcMatch[1].includes('/mockups/')) {
              conflicts.push(`Article ${file} rendered a mockup but the src path is missing or invalid: ${srcMatch ? srcMatch[1] : 'null'}`);
              hasP0Error = true;
           }
           if (!altMatch || !altMatch[1] || altMatch[1].trim() === '') {
              conflicts.push(`Article ${file} rendered a mockup but the alt text is missing or empty.`);
              hasP0Error = true;
           }
        } else {
           conflicts.push(`Article ${file} has a mockup container but no <img> tag was found inside it.`);
           hasP0Error = true;
        }
      }

      if (slotsFound.length > 0 && renderedMockupsCount !== slotsFound.length) {
        reportArticleError(`Article ${file} has ${slotsFound.length} mockup slots in markdown, but found ${renderedMockupsCount} rendered mockups in built HTML.`, false);
      }
    }
  }
} catch (e) {
  console.error(`❌ Failed to read articles: ${e.message}`);
  process.exit(1);
}

assetUsage.forEach(({ id, path: assetPath, slugs }) => {
  if (slugs.size > 3) {
    warnings.push(
      `Repeated mockup asset usage: asset '${id}' (${assetPath}) is used across ${slugs.size} published/preview articles: ${Array.from(slugs).sort().join(', ')}. Recommended action: create or approve more section-specific assets before scaling the next batch.`
    );
  }
});

// 3. Report
if (warnings.length > 0) {
  console.log('\\n⚠️  MOCKUP WARNINGS:');
  warnings.forEach(w => console.log(`  - ${w}`));
}

if (legacyDebt.length > 0) {
  console.log('\\n📉 LEGACY DEBT (P1):');
  legacyDebt.forEach(d => console.log(`${d}\\n`));
}

if (conflicts.length > 0) {
  console.log('\\n🚨 P0 MOCKUP CONFLICTS FOUND:');
  conflicts.forEach(c => console.log(`  - ${c}`));
} else {
  console.log('\\n✅ No P0 mockup errors found.');
}

console.log('\\n📊 Mockup checker summary:');
console.log(`- active article files checked: ${activeArticleFiles.length}`);
console.log(`- P0 active errors: ${activeP0Count}`);
console.log(`- P1 active warnings: ${activeP1Count}`);
console.log(`- legacy debt items: ${legacyDebt.length}`);
console.log(`- outside-scope files with debt: ${legacyDebtFiles.size}`);

if (hasP0Error) {
  console.error('\\n❌ FAIL: Mockup language check failed.');
  process.exit(1);
} else {
  console.log('\\n✅ PASS: Mockup language check passed.');
  process.exit(0);
}
