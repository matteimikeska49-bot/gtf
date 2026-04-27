import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src/components');
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf-8');
  if (content.includes('x: -') || content.includes('x: 4') || content.includes('x: 3')) {
    console.log(f);
  }
});
