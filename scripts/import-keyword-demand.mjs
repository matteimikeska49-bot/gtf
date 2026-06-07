import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const DEMAND_SOURCES_DIR = path.join(ROOT_DIR, 'src/content/blog/demand-sources');
const KEYWORD_CANDIDATES_PATH = path.join(ROOT_DIR, 'src/content/blog/keyword-candidates.json');

if (!fs.existsSync(DEMAND_SOURCES_DIR)) {
  console.log("No demand-sources directory found.");
  process.exit(0);
}

const files = fs.readdirSync(DEMAND_SOURCES_DIR).filter(f => f.endsWith('.csv') && !f.endsWith('.sample.csv'));

if (files.length === 0) {
  console.log("No real import files found in demand-sources directory (only samples or empty).");
  process.exit(0);
}

let keywordCandidates = [];
if (fs.existsSync(KEYWORD_CANDIDATES_PATH)) {
  keywordCandidates = JSON.parse(fs.readFileSync(KEYWORD_CANDIDATES_PATH, 'utf8'));
}

let filesImported = 0;
let recordsUpdated = 0;
let unmatchedKeywords = [];
let warnings = [];

// Simple CSV parser
function parseCsv(content) {
  const lines = content.split('\n').filter(l => l.trim().length > 0);
  if (lines.length === 0) return [];
  const headers = lines[0].split(',').map(h => h.trim());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = values[idx];
    });
    rows.push(obj);
  }
  return rows;
}

for (const file of files) {
  const filePath = path.join(DEMAND_SOURCES_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const rows = parseCsv(content);
  
  if (rows.length === 0) continue;
  filesImported++;

  let sourceType = "manual_import";
  if (file.includes('gsc')) sourceType = "gsc_manual";
  else if (file.includes('yandex-webmaster')) sourceType = "yandex_webmaster_manual";
  else if (file.includes('wordstat')) sourceType = "yandex_wordstat_manual";
  else if (file.includes('google-trends')) sourceType = "google_trends_manual";

  for (const row of rows) {
    if (!row.keyword && !row.page) continue;
    
    // Find matching record by keyword or targetSlug/page
    const record = keywordCandidates.find(k => 
      (row.keyword && k.keyword === row.keyword) || 
      (row.page && (k.targetSlug === row.page || `/${k.targetSlug}` === row.page))
    );

    if (!record) {
      unmatchedKeywords.push(row.keyword || row.page);
      continue;
    }

    // Update fields
    if (row.volume !== undefined && row.volume !== "") {
      record.volume = Number(row.volume);
    }
    if (row.trend) record.trend = row.trend;
    
    record.source = row.source || sourceType;
    if (row.sourceUrl) record.sourceUrl = row.sourceUrl;
    if (row.lastChecked) record.lastChecked = row.lastChecked;
    else record.lastChecked = new Date().toISOString().split('T')[0];

    // Source specific logic
    if (sourceType === "google_trends_manual") {
      record.exactVolumeKnown = false;
    } else if (sourceType === "yandex_wordstat_manual" && record.volume !== null && !isNaN(record.volume)) {
      record.exactVolumeKnown = true;
    }
    
    // Performance fields (GSC / Yandex Webmaster)
    if (sourceType === "gsc_manual" || sourceType === "yandex_webmaster_manual") {
      if (!record.performance) record.performance = {};
      if (row.impressions) record.performance.impressions = Number(row.impressions);
      if (row.clicks) record.performance.clicks = Number(row.clicks);
      if (row.ctr) record.performance.ctr = row.ctr;
      if (row.position) record.performance.position = Number(row.position);
      if (row.dateRange) record.performance.dateRange = row.dateRange;
    }

    recordsUpdated++;
  }
}

fs.writeFileSync(KEYWORD_CANDIDATES_PATH, JSON.stringify(keywordCandidates, null, 2));

console.log("\n📦 Keyword Demand Import Summary:");
console.log(`- Files imported: ${filesImported}`);
console.log(`- Records updated: ${recordsUpdated}`);

if (unmatchedKeywords.length > 0) {
  console.log(`- Unmatched keywords (${unmatchedKeywords.length}):`);
  unmatchedKeywords.slice(0, 5).forEach(k => console.log(`  - ${k}`));
  if (unmatchedKeywords.length > 5) console.log(`  ...and ${unmatchedKeywords.length - 5} more`);
}

if (warnings.length > 0) {
  console.log(`\n⚠️ Warnings:`);
  warnings.forEach(w => console.log(`  - ${w}`));
}
