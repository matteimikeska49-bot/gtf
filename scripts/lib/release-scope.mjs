import { execFileSync } from 'node:child_process';
import path from 'node:path';

export function resolveReleaseScope(root, requestedBase = process.env.BLOG_RELEASE_BASE_REF) {
  const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
  const base = requestedBase
    ? git('rev-parse', '--verify', `${requestedBase}^{commit}`)
    : git('merge-base', 'HEAD', 'origin/main');
  if (!/^[a-f0-9]{40}$/.test(base)) throw new Error('Release base must resolve to an immutable Git commit.');
  // A PR review includes committed changes AND the current index/working tree.
  const paths = [...new Set([
    ...git('diff', '--name-only', base, '--').split('\n'),
    ...git('ls-files', '--others', '--exclude-standard').split('\n'),
  ].filter(Boolean))].sort();
  const articles = paths.filter((file) => file.startsWith('src/content/blog/articles/')
    && file.endsWith('.md') && !/^(_template|test-)/.test(path.basename(file)))
    .map((file) => path.basename(file, '.md'));
  return { base, head: git('rev-parse', 'HEAD'), paths, articles };
}
