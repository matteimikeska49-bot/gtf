import fs from 'fs';
import path from 'path';
import { getSeoPagesForPrerender } from '../src/content/seoPages/index.js';

console.log('🔍 Starting Shared Layout Guard...');

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const srcSeoDir = path.join(rootDir, 'src/components/seo');

const errors = [];

// 1. Source Contract: Verify forbidden headers are not imported or created
const forbiddenPatterns = ['SeoHeader', 'SeoFooter', 'TemplateHeader', 'TemplateFooter', 'HeaderV2', 'FooterV2'];
const walkSync = (dir, filelist = []) => {
  if (!fs.existsSync(dir)) return filelist;
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      filelist.push(dirFile);
    }
  });
  return filelist;
};

const seoComponentFiles = walkSync(srcSeoDir).filter(f => f.endsWith('.jsx') || f.endsWith('.js'));
for (const file of seoComponentFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  for (const forbidden of forbiddenPatterns) {
    if (content.includes(forbidden)) {
      errors.push(`[SOURCE P0] Forbidden layout component "${forbidden}" found in ${path.relative(rootDir, file)}`);
    }
  }
}

// 2. Rendered Contract: Verify single header/footer in dist
if (!fs.existsSync(distDir)) {
  console.log('⚠️ dist/ directory not found. Skipping rendered layout check. Please run build first.');
} else {
  const seoPages = getSeoPagesForPrerender();
  const routesToCheck = [
    'ru',
    'ru/generator-karuselej-instagram',
    'ru/blog',
    ...seoPages.map(p => p.path.replace(/^\//, ''))
  ];

  routesToCheck.forEach(route => {
    const htmlPath = path.join(distDir, route, 'index.html');
    if (fs.existsSync(htmlPath)) {
      const html = fs.readFileSync(htmlPath, 'utf-8');
      
      const headerCount = (html.match(/<header\b/gi) || []).length;
      const footerCount = (html.match(/<footer\b/gi) || []).length;
      
      if (headerCount !== 1) errors.push(`[RENDER P0] [${route}] Expected exactly 1 <header>, found ${headerCount}`);
      if (footerCount !== 1) errors.push(`[RENDER P0] [${route}] Expected exactly 1 <footer>, found ${footerCount}`);

      // Basic semantic check for shared elements
      if (!html.includes('GoToFlow')) {
          errors.push(`[RENDER P0] [${route}] Does not appear to contain GoToFlow brand terms, indicating broken layout.`);
      }
    }
  });
}

if (errors.length > 0) {
  console.error('\n❌ FAIL: Shared Layout Check failed:');
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
}

console.log('✅ PASS: Shared Layout Check passed.');
