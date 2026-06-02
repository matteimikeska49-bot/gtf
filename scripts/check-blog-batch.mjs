import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ARTICLES_DIR = path.join(__dirname, '../src/content/blog/articles');
const BATCH_STATUS_PATH = path.join(__dirname, '../src/content/blog/batch-status.json');

console.log('📦 Starting batch status check...\n');

let hasP0Error = false;
let conflicts = [];

let batchData = [];
try {
  const content = fs.readFileSync(BATCH_STATUS_PATH, 'utf-8');
  batchData = JSON.parse(content);
} catch (e) {
  console.error(`❌ Failed to read batch-status.json: ${e.message}`);
  process.exit(1);
}

if (!Array.isArray(batchData)) {
  console.error(`❌ batch-status.json must be an array of objects.`);
  process.exit(1);
}

batchData.forEach((entry, i) => {
  const indexStr = `[Index ${i}]`;
  
  // Required fields
  if (!entry.batchId) conflicts.push(`${indexStr} Missing batchId`);
  if (!entry.articleId) conflicts.push(`${indexStr} Missing articleId`);
  if (!entry.title) conflicts.push(`${indexStr} Missing title`);
  if (!entry.slug) conflicts.push(`${indexStr} Missing slug`);
  if (!entry.language) conflicts.push(`${indexStr} Missing language`);
  if (!entry.cluster) conflicts.push(`${indexStr} Missing cluster`);
  if (!entry.primaryKeyword) conflicts.push(`${indexStr} Missing primaryKeyword`);
  if (!entry.status) conflicts.push(`${indexStr} Missing status`);

  if (entry.approvedForPublish === true) {
    if (entry.published !== true) {
      conflicts.push(`${entry.articleId || entry.slug} has approvedForPublish:true but published is not true`);
      hasP0Error = true;
    }
    if (entry.noindex === true) {
      conflicts.push(`${entry.articleId || entry.slug} has approvedForPublish:true but noindex is true`);
      hasP0Error = true;
    }
    if (entry.preview === true) {
      conflicts.push(`${entry.articleId || entry.slug} has approvedForPublish:true but preview is true`);
      hasP0Error = true;
    }
  }

  // Markdown file status
  const mdPath = path.join(ARTICLES_DIR, `${entry.slug}.md`);
  const mdExists = fs.existsSync(mdPath);
  
  if (['idea', 'brief', 'hold', 'optimize_existing_route'].includes(entry.status)) {
    // Ok if markdown doesn't exist yet
  } else if (['draft', 'draft_preview', 'qa_failed', 'qa_passed', 'ready_to_publish', 'published'].includes(entry.status)) {
    if (!mdExists) {
      conflicts.push(`Status is '${entry.status}' but markdown file missing: ${entry.slug}.md`);
      hasP0Error = true;
    } else {
      // Validate frontmatter vs status
      const content = fs.readFileSync(mdPath, 'utf-8');
      const isPublished = /^published:\s*true\b/m.test(content);
      const isNoindex = /^noindex:\s*true\b/m.test(content);
      const isPreview = /^preview:\s*true\b/m.test(content);
      
      if (['draft', 'draft_preview', 'qa_passed', 'ready_to_publish'].includes(entry.status)) {
        if (isPublished) conflicts.push(`${entry.slug}.md has published:true but status is ${entry.status}`);
        if (!isNoindex) conflicts.push(`${entry.slug}.md has noindex:false but status is ${entry.status}`);
      }
      
      if (entry.status === 'published') {
        if (!isPublished) conflicts.push(`${entry.slug}.md has published:false but status is published`);
        if (isNoindex) conflicts.push(`${entry.slug}.md has noindex:true but status is published`);
      }
      
      if (isPreview && !['draft', 'draft_preview', 'qa_passed', 'ready_to_publish'].includes(entry.status)) {
         conflicts.push(`${entry.slug}.md has preview:true which is only allowed in draft states.`);
      }
    }
  } else {
    conflicts.push(`${indexStr} Unknown status: ${entry.status}`);
  }

  // QA Gate checks
  if (['ready_to_publish', 'published'].includes(entry.status)) {
    if (entry.qaStatus !== 'passed') conflicts.push(`${entry.articleId} is ${entry.status} but qaStatus is not passed`);
    if (entry.visualQaStatus !== 'passed') conflicts.push(`${entry.articleId} is ${entry.status} but visualQaStatus is not passed`);
  }
  
  if (entry.status === 'published') {
    if (entry.productionVerificationStatus !== 'passed') {
      conflicts.push(`${entry.articleId} is published but productionVerificationStatus is not passed`);
    }
  }
});

// Report
if (conflicts.length > 0) {
  console.log('🚨 P0 BATCH STATUS CONFLICTS FOUND:');
  conflicts.forEach(c => console.log(`  - ${c}`));
  hasP0Error = true;
} else {
  console.log('✅ No P0 batch status errors found.');
}

if (hasP0Error) {
  console.error('\n❌ FAIL: Batch status check failed.');
  process.exit(1);
} else {
  console.log('\n✅ PASS: Batch status check passed.');
  process.exit(0);
}
