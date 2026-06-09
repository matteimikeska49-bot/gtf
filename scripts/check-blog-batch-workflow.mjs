import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ARTICLES_DIR = path.join(__dirname, '../src/content/blog/articles');
const BATCH_STATUS_PATH = path.join(__dirname, '../src/content/blog/batch-status.json');
const BRIEFS_DIR = path.join(__dirname, '../docs');

console.log('📦 Starting Batch Workflow Check (Stage 20)...\n');

let hasError = false;
let conflicts = [];

let batchData = [];
try {
  const content = fs.readFileSync(BATCH_STATUS_PATH, 'utf-8');
  batchData = JSON.parse(content);
} catch (e) {
  console.error(`❌ Failed to read batch-status.json: ${e.message}`);
  process.exit(1);
}

const isMiniBatchComplete = batchData.filter(d => d.batchId === 'D53').every(d => d.status === 'published' && d.productionVerificationStatus === 'passed');
const hasBatch25 = batchData.some(d => d.batchId === 'B25');

if (hasBatch25 && !isMiniBatchComplete) {
  conflicts.push(`Batch 25 cannot start while mini-batch (D53) is not fully complete (published & verified).`);
  hasError = true;
}

let d53Count = 0;
let publishableCount = 0;
let blockedCount = 0;
let missingBriefs = 0;

batchData.forEach((entry, i) => {
  const isD53 = entry.batchId === 'D53';
  if (isD53) d53Count++;

  // 1. Every article has batch-status entry (We are iterating over them, so implicitly true, but we check if properties are missing)
  if (!entry.batchId || !entry.slug || !entry.status) {
    conflicts.push(`Entry [Index ${i}] missing required fields (batchId, slug, status).`);
    hasError = true;
  }

  // 2. D53 briefs tracking
  if (isD53) {
    const briefPath = path.join(BRIEFS_DIR, `brief-${entry.slug}.md`);
    if (!fs.existsSync(briefPath)) {
      missingBriefs++;
      conflicts.push(`D53 brief missing or untracked: docs/brief-${entry.slug}.md`);
    }
  }

  // 9. Topic score/priority
  if ((isD53 || entry.batchId === 'B25') && !entry.priorityScore && !['idea', 'rejected', 'hold'].includes(entry.status)) {
    conflicts.push(`[${entry.slug}] missing priorityScore but is active in ${entry.batchId}.`);
    hasError = true;
  }

  // 10. Intent/cluster/product references
  if ((isD53 || entry.batchId === 'B25') && (!entry.cluster || !entry.primaryKeyword)) {
    conflicts.push(`[${entry.slug}] missing intent/cluster/product mapping in ${entry.batchId}.`);
    hasError = true;
  }

  // 3. Frontmatter agreement
  const mdPath = path.join(ARTICLES_DIR, `${entry.slug}.md`);
  if (fs.existsSync(mdPath)) {
    const content = fs.readFileSync(mdPath, 'utf-8');
    const isPublished = /^published:\s*true\b/m.test(content);
    const isNoindex = /^noindex:\s*true\b/m.test(content);
    const isPreview = /^preview:\s*true\b/m.test(content);
    const hasLang = /^language:\s*([^\s]+)/m.test(content);

    // D53 strict draft checks (Rule 6)
    if (isD53 && !['published', 'live_verified'].includes(entry.status)) {
      if (isPublished) { conflicts.push(`[${entry.slug}] D53 draft leaked published:true!`); hasError = true; }
      if (!isNoindex) { conflicts.push(`[${entry.slug}] D53 draft leaked noindex:false!`); hasError = true; }
    }

    // 4. approved_for_publish gates
    if (entry.status === 'approved_for_publish' || entry.approvedForPublish) {
      if (entry.visualQaStatus !== 'passed') conflicts.push(`[${entry.slug}] approvedForPublish but visual QA not passed.`);
      if (entry.qaStatus !== 'passed') conflicts.push(`[${entry.slug}] approvedForPublish but QA not passed.`);
      // prepublish checks should be passed
      if (!isPublished && entry.status === 'published') conflicts.push(`[${entry.slug}] status is published but frontmatter is not.`);
    }

    // 5. published gates
    if (entry.status === 'published' || isPublished) {
      if (!entry.approvedForPublish) {
         conflicts.push(`[${entry.slug}] published but lack approvedForPublish true.`);
         hasError = true;
      }
      if ((isD53 || entry.batchId === 'B25') && !entry.productionVerificationStatus) {
         conflicts.push(`[${entry.slug}] published but missing productionVerificationStatus in ${entry.batchId}.`);
      }
    }
  }

  // 8. Hold/Rejected topics not active
  if (['hold', 'rejected'].includes(entry.status)) {
    blockedCount++;
    if (entry.published || entry.approvedForPublish) {
      conflicts.push(`[${entry.slug}] is hold/rejected but has active publish flags.`);
      hasError = true;
    }
  }

  if (entry.status === 'ready_to_publish') {
    publishableCount++;
  }
});

console.log(`📊 Batch Scanned: ${batchData.length} articles`);
console.log(`📌 D53 Count: ${d53Count}`);
console.log(`✅ Publishable: ${publishableCount}`);
console.log(`🛑 Blocked/Hold: ${blockedCount}`);

if (missingBriefs > 0) {
  console.log(`⚠️ Warnings: ${missingBriefs} missing or untracked briefs for active batches.`);
}

if (conflicts.length > 0) {
  console.log('\n🚨 WORKFLOW CONFLICTS FOUND:');
  conflicts.forEach(c => console.log(`  - ${c}`));
} else {
  console.log('\n✅ No workflow conflicts found.');
}

if (hasError) {
  console.error('\n❌ FAIL: Batch workflow check failed.');
  process.exit(1);
} else {
  console.log('\n✅ PASS: Batch workflow check passed.');
  process.exit(0);
}
