import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const articlesDir = path.join(ROOT_DIR, 'src/content/blog/articles');
const capabilitiesPath = path.join(ROOT_DIR, 'src/content/blog/product-capabilities.json');

if (!fs.existsSync(capabilitiesPath)) {
  console.error("❌ Missing product-capabilities.json");
  process.exit(1);
}

const capabilities = JSON.parse(fs.readFileSync(capabilitiesPath, 'utf8'));
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md') && !f.startsWith('_'));

let totalScanned = 0;
let errors = [];
let warnings = [];
let riskyClaimsByFile = {};

// Flatten forbidden claims with their capability context
const forbiddenRules = [];
capabilities.forEach(cap => {
  if (cap.forbiddenClaims) {
    cap.forbiddenClaims.forEach(claim => {
      forbiddenRules.push({
        claimText: claim.toLowerCase(),
        regex: new RegExp(claim.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
        capabilityId: cap.capabilityId,
        status: cap.status,
        saferAlternatives: cap.saferAlternatives || []
      });
    });
  }
});

for (const file of files) {
  const filePath = path.join(articlesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  totalScanned++;

  const contentLower = content.toLowerCase();
  
  for (const rule of forbiddenRules) {
    if (rule.regex.test(contentLower)) {
      const matchPos = contentLower.indexOf(rule.claimText);
      const snippet = content.substring(Math.max(0, matchPos - 30), Math.min(content.length, matchPos + rule.claimText.length + 30)).replace(/\n/g, ' ');
      
      const reportItem = {
        claim: rule.claimText,
        capabilityId: rule.capabilityId,
        snippet: `"...${snippet}..."`
      };

      if (!riskyClaimsByFile[file]) riskyClaimsByFile[file] = [];
      riskyClaimsByFile[file].push(reportItem);

      if (rule.status === 'not_supported') {
        errors.push(`File "${file}" uses forbidden claim "${rule.claimText}" (Capability: ${rule.capabilityId} is NOT SUPPORTED). Consider: ${rule.saferAlternatives.join(' OR ')}`);
      } else if (rule.status === 'unknown') {
        warnings.push(`File "${file}" uses claim "${rule.claimText}" (Capability: ${rule.capabilityId} is UNKNOWN). Verification required.`);
      } else if (rule.status === 'partially_supported') {
        warnings.push(`File "${file}" uses forbidden absolute claim "${rule.claimText}" (Capability: ${rule.capabilityId} is PARTIALLY SUPPORTED). Use safer wording: ${rule.saferAlternatives.join(' OR ')}`);
      } else {
        // Even if supported, some specific phrases are forbidden (e.g. guaranteed reach)
        errors.push(`File "${file}" uses explicitly forbidden claim "${rule.claimText}" (Capability: ${rule.capabilityId}).`);
      }
    }
  }
}

console.log(`\n🔍 Product Claims Check Results:`);
console.log(`- Scanned files: ${totalScanned}`);

if (Object.keys(riskyClaimsByFile).length > 0) {
  console.log(`\n⚠️ Risky claims detected by file:`);
  for (const [file, claims] of Object.entries(riskyClaimsByFile)) {
    console.log(`  - ${file}:`);
    claims.forEach(c => {
      console.log(`    * "${c.claim}" [${c.capabilityId}] -> Snippet: ${c.snippet}`);
    });
  }
}

if (warnings.length > 0) {
  console.log(`\n⚠️ Warnings (${warnings.length}):`);
  warnings.forEach(w => console.log(`  - ${w}`));
}

if (errors.length > 0) {
  console.error(`\n❌ Errors (${errors.length}):`);
  errors.forEach(e => console.error(`  - ${e}`));
  console.error(`\n❌ Check failed. Fix forbidden claims in articles.`);
  process.exit(1);
}

console.log(`\n✅ Product claims checks passed successfully.`);
