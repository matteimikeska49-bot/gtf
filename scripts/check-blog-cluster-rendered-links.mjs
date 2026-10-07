import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveProjectSeoState } from './lib/project-seo-state.mjs';
import { auditClusterHubLinks } from './lib/cluster-hub-links.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const requested = args.find((arg) => arg.startsWith('--clusters='))?.slice(11).split(',');
const allClusters = JSON.parse(fs.readFileSync(path.join(root, 'src/content/blog/cluster-authority-map.json'), 'utf8'));
if (!requested?.length || requested.some((id) => !allClusters.some((cluster) => cluster.clusterId === id))) {
  throw new Error('Pass an explicit valid --clusters=id,id scope; do not audit unrelated experiments implicitly.');
}
const result = auditClusterHubLinks({
  clusters: allClusters.filter((cluster) => requested.includes(cluster.clusterId)),
  state: resolveProjectSeoState(root),
  includeDeclared: args.includes('--declared-hubs'),
  readHtml: (route) => {
    const file = path.join(root, 'dist', route.slice(1), 'index.html');
    return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
  },
});
console.log(JSON.stringify(result, null, 2));
if (result.missing > 0) process.exitCode = 1;
