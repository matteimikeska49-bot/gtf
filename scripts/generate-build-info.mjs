import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const distPath = path.join(process.cwd(), 'dist', 'build.json');

try {
  const commit = execSync('git rev-parse HEAD').toString().trim();
  let branch = 'unknown';
  try {
    branch = execSync('git branch --show-current').toString().trim() || process.env.GITHUB_REF_NAME || 'unknown';
  } catch (e) {
    branch = process.env.GITHUB_REF_NAME || 'unknown';
  }
  
  const buildTime = new Date().toISOString();
  const buildInfo = {
    commit,
    branch,
    buildTime
  };
  
  fs.writeFileSync(distPath, JSON.stringify(buildInfo, null, 2));
  console.log(`\n✅ Build marker created: ${commit} (${branch})\n`);
} catch (e) {
  console.error('\n⚠️ Failed to create build marker', e);
}
