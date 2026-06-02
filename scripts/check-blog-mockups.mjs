import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ARTICLES_DIR = path.join(__dirname, '../src/content/blog/articles');

// We don't import the registry directly because it might be a module that fails in strict node without transpilation,
// or we can parse it. For safety in a script, let's just parse the keys from registry.js text if possible.
const REGISTRY_PATH = path.join(__dirname, '../src/content/blog/mockups/registry.json');

console.log('🖼️  Starting strict mockup language check...\n');

let hasP0Error = false;
let warnings = [];
let conflicts = [];

// 1. Extract valid mockup keys from registry.json
let validMockups = new Set();
try {
  const registryContent = fs.readFileSync(REGISTRY_PATH, 'utf-8');
  const registry = JSON.parse(registryContent);
  Object.keys(registry.slots || registry).forEach(key => validMockups.add(key));
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
      conflicts.push(`Raw markdown image found in ${file}. Use :::mockup instead.`);
      hasP0Error = true;
    }
    
    // Check for raw HTML images
    if (/<img\b/i.test(content)) {
      conflicts.push(`Raw <img> tag found in ${file}. Use :::mockup instead.`);
      hasP0Error = true;
    }

    // Check mockups
    const mockupRegex = /:::mockup\s+name=["']?([^"'\s]+)["']?/g;
    let match;
    while ((match = mockupRegex.exec(content)) !== null) {
      const mockupName = match[1];
      
      // Slot exists?
      if (!validMockups.has(mockupName)) {
        conflicts.push(`Invalid mockup '${mockupName}' in ${file}. Not found in registry.`);
        hasP0Error = true;
        continue;
      }
      
      // Strict Language Validation
      // RU articles MUST use ru- prefix
      if (language === 'ru' && !mockupName.startsWith('ru-')) {
        conflicts.push(`Language mismatch in ${file}: RU article uses EN mockup '${mockupName}'. Must use 'ru-' prefix.`);
        hasP0Error = true;
      }
      
      // EN articles MUST NOT use ru- prefix
      if (language === 'en' && mockupName.startsWith('ru-')) {
        conflicts.push(`Language mismatch in ${file}: EN article uses RU mockup '${mockupName}'.`);
        hasP0Error = true;
      }
    }
  }
} catch (e) {
  console.error(`❌ Failed to read articles: ${e.message}`);
  process.exit(1);
}

// 3. Report
if (conflicts.length > 0) {
  console.log('🚨 P0 MOCKUP CONFLICTS FOUND:');
  conflicts.forEach(c => console.log(`  - ${c}`));
} else {
  console.log('✅ No P0 mockup errors found.');
}

if (hasP0Error) {
  console.error('\n❌ FAIL: Mockup language check failed.');
  process.exit(1);
} else {
  console.log('\n✅ PASS: Mockup language check passed.');
  process.exit(0);
}
