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

  // Replace `x: -40`
  if (content.includes('x: -40')) {
    content = content.replace(/x:\s*-40/g, "x: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : -40, y: typeof window !== 'undefined' && window.innerWidth < 768 ? 24 : 0");
    changed = true;
  }
  if (content.includes('x:-40')) {
    content = content.replace(/x:-40/g, "x: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : -40, y: typeof window !== 'undefined' && window.innerWidth < 768 ? 24 : 0");
    changed = true;
  }
  
  // Replace `x: -30`
  if (content.includes('x: -30')) {
    content = content.replace(/x:\s*-30/g, "x: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : -30, y: typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 0");
    changed = true;
  }
  if (content.includes('x:-30')) {
    content = content.replace(/x:-30/g, "x: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : -30, y: typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 0");
    changed = true;
  }

  // Replace `margin: '-100px'`
  if (content.includes("margin: '-100px'")) {
    content = content.replace(/margin:\s*'-100px'/g, "margin: typeof window !== 'undefined' && window.innerWidth < 768 ? '0px' : '-100px'");
    changed = true;
  }
  
  // Replace `margin: '-80px'`
  if (content.includes("margin: '-80px'")) {
    content = content.replace(/margin:\s*'-80px'/g, "margin: typeof window !== 'undefined' && window.innerWidth < 768 ? '0px' : '-80px'");
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(f, content, 'utf-8');
    console.log(`Updated ${f}`);
  }
});

// Update index.css
const cssFile = './src/index.css';
let css = fs.readFileSync(cssFile, 'utf-8');
if (css.includes('overflow-x: hidden;')) {
  css = css.replace(/overflow-x:\s*hidden;/g, 'overflow-x: clip;');
  fs.writeFileSync(cssFile, css, 'utf-8');
  console.log('Updated index.css');
}

// Update MainLayout.jsx
const mainLayoutFile = './src/components/MainLayout.jsx';
let ml = fs.readFileSync(mainLayoutFile, 'utf-8');
if (ml.includes('overflow-hidden')) {
  ml = ml.replace(/overflow-hidden/g, 'overflow-clip');
  fs.writeFileSync(mainLayoutFile, ml, 'utf-8');
  console.log('Updated MainLayout.jsx');
}

