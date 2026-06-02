import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MOCKUP_SLOT_MAP, VALID_MOCKUP_SLOTS } from '../src/lib/blog/mockupSlots.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ARTICLES_DIR = path.join(__dirname, '../src/content/blog/articles');

const REGISTRY_PATH = path.join(__dirname, '../src/content/blog/mockups/registry.json');

console.log('🖼️  Starting strict mockup language check...\n');

let hasP0Error = false;
let conflicts = [];

// 1. Extract approved assets from registry.json
const slotAssets = { en: {}, ru: {} };

try {
  const registryContent = fs.readFileSync(REGISTRY_PATH, 'utf-8');
  const registry = JSON.parse(registryContent);
  const assets = registry.assets || [];
  
  assets.forEach(asset => {
    if (asset.status === 'approved' && asset.suitableFor) {
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
    
    // Parse language
    const langMatch = content.match(/^language:\s*["']?([^"'\n]+)["']?/m);
    const language = langMatch ? langMatch[1].trim() : 'en';
    
    // Check for raw markdown images
    if (/!\[.*?\]\(.*?\)/.test(content)) {
      conflicts.push(`Raw markdown image found in ${file}. Use :::mockup{slot="..."} instead.`);
      hasP0Error = true;
    }
    
    // Check for raw HTML images
    if (/<img\b/i.test(content)) {
      conflicts.push(`Raw <img> tag found in ${file}. Use :::mockup{slot="..."} instead.`);
      hasP0Error = true;
    }

    // Check for direct paths or extensions (basic check outside frontmatter if possible, but let's just do a global check and ignore standard frontmatter fields if needed, or just a simple check for common paths)
    if (/(?<!\w)(\/mockups\/|\/images\/|\.webp|\.png|\.jpg)(?!\w)/i.test(content)) {
       // Only fail if it's not a known valid exception, but user strictly said fail on these paths
       conflicts.push(`Direct image path or extension found in ${file}. Use :::mockup{slot="..."} instead.`);
       hasP0Error = true;
    }

    // Check for old mockup syntax
    if (/:::mockup\s+name=["']?([^"'\s]+)["']?/i.test(content)) {
      conflicts.push(`Old mockup syntax (name="...") found in ${file}. Use :::mockup{slot="..."} instead.`);
      hasP0Error = true;
    }

    // Check new slot-based mockups
    const mockupRegex = /:::mockup\{slot=["']?([^"'\s}]+)["']?\}/g;
    let match;
    const slotsFound = [];

    while ((match = mockupRegex.exec(content)) !== null) {
      const slotName = match[1];
      slotsFound.push(slotName);
      
      // Slot exists?
      if (!VALID_MOCKUP_SLOTS.includes(slotName)) {
        conflicts.push(`Invalid mockup slot '${slotName}' in ${file}. Not found in shared mockup slot map.`);
        hasP0Error = true;
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
          conflicts.push(`Language mismatch in ${file}: slot '${slotName}' has no approved '${language}' assets, but has '${otherLang}' assets.`);
        } else {
          conflicts.push(`No approved assets found for slot '${slotName}' in language '${language}' in ${file}.`);
        }
        hasP0Error = true;
      }
    }
    
    if (slotsFound.length > 0) {
      console.log(`📄 ${file} (${language}): found slots [${slotsFound.join(', ')}]`);
    } else {
      console.log(`📄 ${file} (${language}): no mockups found.`);
    }
  }
} catch (e) {
  console.error(`❌ Failed to read articles: ${e.message}`);
  process.exit(1);
}

// 3. Report
if (conflicts.length > 0) {
  console.log('\n🚨 P0 MOCKUP CONFLICTS FOUND:');
  conflicts.forEach(c => console.log(`  - ${c}`));
} else {
  console.log('\n✅ No P0 mockup errors found.');
}

if (hasP0Error) {
  console.error('\n❌ FAIL: Mockup language check failed.');
  process.exit(1);
} else {
  console.log('\n✅ PASS: Mockup language check passed.');
  process.exit(0);
}
