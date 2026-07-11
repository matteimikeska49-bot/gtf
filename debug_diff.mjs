import fs from 'fs';
const str1 = fs.readFileSync('dist_committed_debug.html', 'utf8');
const str2 = fs.readFileSync('dist_tmp_debug.html', 'utf8');

for (let i = 0; i < Math.min(str1.length, str2.length); i++) {
  if (str1[i] !== str2[i]) {
    console.log(`Mismatch at index ${i}`);
    console.log(`Committed: ...${str1.substring(Math.max(0, i - 50), i + 50)}...`);
    console.log(`Tmp:       ...${str2.substring(Math.max(0, i - 50), i + 50)}...`);
    break;
  }
}
if (str1.length !== str2.length) console.log(`Length diff: committed=${str1.length}, tmp=${str2.length}`);
