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

const files = fs.readdirSync(DEMAND_SOURCES_DIR).filter(f => 
  (f.endsWith('.csv') || f.endsWith('.json')) && !f.endsWith('.sample.csv') && !f.endsWith('manifest.json')
);

if (files.length === 0) {
  console.log("No real import files found in demand-sources directory.");
  process.exit(0);
}

let keywordCandidates = [];
if (fs.existsSync(KEYWORD_CANDIDATES_PATH)) {
  keywordCandidates = JSON.parse(fs.readFileSync(KEYWORD_CANDIDATES_PATH, 'utf8'));
}

let filesImported = 0;
let recordsUpdated = 0;
let recordsCreated = 0;
let warnings = [];

// Simple CSV parser
function parseCsv(content) {
  const lines = content.split('\n').filter(l => l.trim().length > 0);
  if (lines.length === 0) return [];
  const headers = lines[0].split(',').map(h => h.trim());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    // Basic CSV split, ignores commas inside quotes
    const regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
    const values = lines[i].split(regex).map(v => v.trim().replace(/^"|"$/g, ''));
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
  let rows = [];
  
  if (file.endsWith('.csv')) {
    rows = parseCsv(content);
  } else if (file.endsWith('.json')) {
    try {
      rows = JSON.parse(content);
      if (!Array.isArray(rows)) {
         // handle case where JSON might be an object containing arrays
         if (rows.keywords) rows = rows.keywords;
         else if (rows.data) rows = rows.data;
         else rows = [rows];
      }
    } catch (e) {
      warnings.push(`Failed to parse JSON in ${file}`);
      continue;
    }
  }
  
  if (!rows || rows.length === 0) continue;
  filesImported++;

  let sourceType = "manual_import";
  if (file.includes('gsc')) sourceType = "gsc_manual";
  else if (file.includes('yandex-webmaster')) sourceType = "yandex_webmaster_manual";
  else if (file.includes('wordstat')) sourceType = "yandex_wordstat_manual";
  else if (file.includes('google-trends')) sourceType = "google_trends_manual";
  else if (file.includes('keyword-demand-classified')) sourceType = "consolidated_demand_import";

  for (const row of rows) {
    const kw = row.keyword || row.query || row.Keys;
    const pg = row.page || row.url;
    if (!kw && !pg) continue;
    
    // Find matching record by keyword or targetSlug/page
    let record = keywordCandidates.find(k => 
      (kw && k.keyword === kw) || 
      (pg && (k.targetSlug === pg || `/${k.targetSlug}` === pg))
    );

    if (!record) {
      // Add new keyword candidate
      record = {
        keyword: kw || pg,
        targetSlug: pg ? pg.replace(/^\//, '') : '',
        language: row.language || (kw && /[а-яА-Я]/.test(kw) ? 'ru' : 'en'),
        status: "backlog"
      };
      keywordCandidates.push(record);
      recordsCreated++;
    }

    // Update fields
    if (row.volume !== undefined && row.volume !== "" && !isNaN(Number(row.volume))) {
      record.volume = Number(row.volume);
    }
    if (row.trend !== undefined) record.trend = row.trend;
    if (row.intent !== undefined) record.intent = row.intent;
    if (row.cluster !== undefined) record.cluster = row.cluster;
    
    record.source = row.source || sourceType;
    if (row.sourceUrl) record.sourceUrl = row.sourceUrl;
    else if (sourceType === "yandex_wordstat_manual" || sourceType === "consolidated_demand_import") record.sourceUrl = "https://wordstat.yandex.ru/";
    else if (sourceType === "gsc_manual") record.sourceUrl = "https://search.google.com/search-console";
    
    record.lastChecked = row.lastChecked || new Date().toISOString().split('T')[0];

    // Source specific logic
    if (sourceType === "google_trends_manual") {
      record.exactVolumeKnown = false;
    } else if ((sourceType === "yandex_wordstat_manual" || sourceType === "consolidated_demand_import") && record.volume !== undefined && record.volume !== null && !isNaN(record.volume)) {
      record.exactVolumeKnown = true;
    }
    
    // Performance fields (GSC / Yandex Webmaster)
    if (sourceType === "gsc_manual" || sourceType === "yandex_webmaster_manual" || row.impressions !== undefined) {
      if (!record.performance) record.performance = {};
      if (row.impressions !== undefined) record.performance.impressions = Number(row.impressions);
      if (row.clicks !== undefined) record.performance.clicks = Number(row.clicks);
      if (row.ctr !== undefined) record.performance.ctr = row.ctr;
      if (row.position !== undefined) record.performance.position = Number(row.position);
      if (row.dateRange !== undefined) record.performance.dateRange = row.dateRange;
    }

    recordsUpdated++;
  }
}

fs.writeFileSync(KEYWORD_CANDIDATES_PATH, JSON.stringify(keywordCandidates, null, 2));

console.log("\n📦 Keyword Demand Import Summary:");
console.log(`- Files imported: ${filesImported}`);
console.log(`- Records updated: ${recordsUpdated}`);
console.log(`- New records created: ${recordsCreated}`);

if (warnings.length > 0) {
  console.log(`\n⚠️ Warnings:`);
  warnings.forEach(w => console.log(`  - ${w}`));
}

