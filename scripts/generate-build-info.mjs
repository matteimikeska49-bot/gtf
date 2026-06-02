import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const distPath = path.join(process.cwd(), 'dist', 'build.json');

let commit = 'unknown';
let branch = 'unknown';

try {
  commit = execSync('git rev-parse HEAD').toString().trim();
  branch = execSync('git branch --show-current').toString().trim() || process.env.GITHUB_REF_NAME || 'unknown';
} catch (e) {
  // Git might be unavailable (e.g. inside a Docker build with .git ignored)
  commit = process.env.SOURCE_COMMIT || process.env.COMMIT_SHA || 'unknown';
  branch = process.env.GITHUB_REF_NAME || 'unknown';
}

try {
  const buildTime = new Date().toISOString();
  const buildInfo = {
    commit,
    branch,
    buildTime
  };
  
  fs.writeFileSync(distPath, JSON.stringify(buildInfo, null, 2));
  console.log(`\n✅ Build marker created: ${commit} (${branch})\n`);
} catch (e) {
  console.error('\n⚠️ Failed to write build marker file', e);
}
