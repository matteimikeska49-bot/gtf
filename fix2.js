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
  let content = fs.readFileSync(f, 'utf-8');
  let changed = false;

  // Replace duration: 0.8
  if (content.includes('duration: 0.8')) {
    content = content.replace(/duration:\s*0.8/g, "duration: typeof window !== 'undefined' && window.innerWidth < 768 ? 0.6 : 0.8");
    changed = true;
  }
  if (content.includes('duration:0.8')) {
    content = content.replace(/duration:0.8/g, "duration: typeof window !== 'undefined' && window.innerWidth < 768 ? 0.6 : 0.8");
    changed = true;
  }

  // Replace duration: 0.9
  if (content.includes('duration: 0.9')) {
    content = content.replace(/duration:\s*0.9/g, "duration: typeof window !== 'undefined' && window.innerWidth < 768 ? 0.6 : 0.9");
    changed = true;
  }
  if (content.includes('duration:0.9')) {
    content = content.replace(/duration:0.9/g, "duration: typeof window !== 'undefined' && window.innerWidth < 768 ? 0.6 : 0.9");
    changed = true;
  }

  // Ensure opacity: 0 -> 1 is standard. (Already is standard in the project).
  
  if (changed) {
    fs.writeFileSync(f, content, 'utf-8');
    console.log(`Updated duration in ${f}`);
  }
});
