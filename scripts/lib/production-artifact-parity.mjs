import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

export const sha256 = (data) => crypto.createHash('sha256').update(data).digest('hex');
export function artifactInventory(dir, prefix = '') {
  if (fs.lstatSync(dir).isSymbolicLink()) throw new Error(`Artifact symlink is forbidden: ${dir}`);
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const relative = prefix + entry.name;
    if (entry.isSymbolicLink()) throw new Error(`Artifact symlink is forbidden: ${relative}`);
    return entry.isDirectory() ? artifactInventory(path.join(dir, entry.name), `${relative}/`) : [relative];
  }).sort();
}

export function compareProductionArtifacts(committedDir, freshDir) {
  const committed = artifactInventory(committedDir).filter((file) => file !== 'build.json');
  const fresh = artifactInventory(freshDir);
  const errors = [];
  const differences = [];
  if (JSON.stringify(committed) !== JSON.stringify(fresh)) errors.push('Full production artifact inventory differs (missing or unexpected files).');
  const artifacts = fresh.map((file) => {
    const after = fs.readFileSync(path.join(freshDir, file));
    const previous = path.join(committedDir, file);
    if (fs.existsSync(previous)) {
      const before = fs.readFileSync(previous);
      if (!before.equals(after)) {
        errors.push(`${file}: full artifact bytes differ from independent production build.`);
        let first = 0;
        while (first < Math.min(before.length, after.length) && before[first] === after[first]) first += 1;
        differences.push({ file, beforeSha256: sha256(before), afterSha256: sha256(after), firstDifferentByte: first,
          beforeContext: before.subarray(Math.max(0, first - 100), first + 200).toString(),
          afterContext: after.subarray(Math.max(0, first - 100), first + 200).toString() });
      }
    }
    return { file, sha256: sha256(after) };
  });
  return { errors, differences, artifacts };
}
