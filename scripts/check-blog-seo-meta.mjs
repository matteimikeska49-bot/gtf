import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ARTICLES_DIR = path.join(__dirname, '../src/content/blog/articles');

console.log('🔍 Starting SEO Metadata check...\n');

let hasError = false;
let warnings = [];
let errors = [];

const articles = [];

try {
  const files = fs.readdirSync(ARTICLES_DIR);
  for (const file of files) {
    if (!file.endsWith('.md') || file.startsWith('_') || file.startsWith('test-')) continue;
    const content = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf-8');
    
    const getMatch = (regex) => {
      const match = content.match(regex);
      if (match) {
        let val = match[1].trim();
        // Remove wrapping quotes if they exist
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        return val;
      }
      return null;
    };
    
    const title = getMatch(/^title:\s*(.*)$/m);
    const description = getMatch(/^description:\s*(.*)$/m);
    const primaryKeyword = getMatch(/^primaryKeyword:\s*(.*)$/m);
    const canonical = getMatch(/^canonical:\s*(.*)$/m);
    const language = getMatch(/^language:\s*(.*)$/m) || 'en';
    const published = getMatch(/^published:\s*(true|false)/m) === 'true';
    const preview = getMatch(/^preview:\s*(true|false)/m) === 'true';
    const slug = getMatch(/^slug:\s*(.*)$/m) || file.replace(/\.md$/, '');
    
    // Only check published or draft preview articles
    if (published || preview) {
      articles.push({ file, slug, language, title, description, primaryKeyword, canonical });
    }
  }
} catch (e) {
  console.error(`❌ Failed to read articles: ${e.message}`);
  process.exit(1);
}

const titlesEn = new Set();
const titlesRu = new Set();
const descriptionsEn = new Set();
const descriptionsRu = new Set();
const keywordsEn = new Set();
const keywordsRu = new Set();

const isCyrillic = (text) => /[А-Яа-яЁё]/.test(text);

articles.forEach(article => {
  const { file, language, title, description, primaryKeyword, canonical } = article;
  
  // Missing fields
  if (!title) {
    errors.push(`Missing 'title' in ${file}`);
    hasError = true;
  }
  if (!description) {
    errors.push(`Missing 'description' in ${file}`);
    hasError = true;
  }
  if (!canonical) {
    errors.push(`Missing 'canonical' in ${file}`);
    hasError = true;
  }
  if (!primaryKeyword) {
    errors.push(`Missing 'primaryKeyword' in ${file}`);
    hasError = true;
  }
  
  if (title) {
    if (title.length < 30) warnings.push(`Title too short (${title.length} chars) in ${file}`);
    if (title.length > 70) warnings.push(`Title too long (${title.length} chars) in ${file}`);
    
    const titlesSet = language === 'ru' ? titlesRu : titlesEn;
    if (titlesSet.has(title.toLowerCase())) {
      warnings.push(`Duplicate title '${title}' in ${file}`);
    }
    titlesSet.add(title.toLowerCase());
    
    // Language mismatch checks
    if (language === 'en' && isCyrillic(title)) {
      warnings.push(`EN article has Cyrillic characters in title in ${file}`);
    }
    if (language === 'ru' && !isCyrillic(title)) {
      warnings.push(`RU article has no Cyrillic characters in title in ${file}`);
    }
  }
  
  if (description) {
    if (description.length < 50) warnings.push(`Description too short (${description.length} chars) in ${file}`);
    if (description.length > 160) warnings.push(`Description too long (${description.length} chars) in ${file}`);
    
    const descSet = language === 'ru' ? descriptionsRu : descriptionsEn;
    if (descSet.has(description.toLowerCase())) {
      warnings.push(`Duplicate description in ${file}`);
    }
    descSet.add(description.toLowerCase());
    
    // Language mismatch checks
    if (language === 'en' && isCyrillic(description)) {
      warnings.push(`EN article has Cyrillic characters in description in ${file}`);
    }
    if (language === 'ru' && !isCyrillic(description)) {
      warnings.push(`RU article has no Cyrillic characters in description in ${file}`);
    }
  }
  
  if (primaryKeyword) {
    const kwSet = language === 'ru' ? keywordsRu : keywordsEn;
    if (kwSet.has(primaryKeyword.toLowerCase())) {
      errors.push(`Duplicate primaryKeyword '${primaryKeyword}' in ${file}`);
      hasError = true;
    }
    kwSet.add(primaryKeyword.toLowerCase());
  }
});

if (errors.length > 0) {
  console.log('🚨 ERRORS FOUND:');
  errors.forEach(e => console.log(`  - ${e}`));
}

if (warnings.length > 0) {
  console.log('\n⚠️ WARNINGS:');
  warnings.forEach(w => console.log(`  - ${w}`));
}

if (hasError) {
  console.error('\n❌ FAIL: SEO Metadata check failed.');
  process.exit(1);
} else {
  console.log('\n✅ PASS: SEO Metadata check passed.');
  process.exit(0);
}
