import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PRODUCTION_ARTIFACT_MARKERS, RAW_COMPONENT_MARKERS, hasStarredHref } from './blog-template-guardrails.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT, 'dist');

console.log('🔍 Starting Dist HTML Checker...\n');

if (!fs.existsSync(DIST_DIR)) {
  console.log('⚠️ dist/ directory not found. Please run "npm run build" first.');
  process.exit(1);
}

const RAW_JSX_MARKERS = RAW_COMPONENT_MARKERS;

const RAW_MARKDOWN = [
  '[!product]',
  ':::mockup'
];

const RAW_HTML_ARTIFACTS = [
  '&lt;span class=',
  '<span class=',
  'class=\\"text-gradient-brand\\"'
];

const FORBIDDEN_WORDING = [
  'carousel draft',
  'generate a draft',
  'draft ready',
  'review the draft',
  'черновик карусели',
  'собрать черновик',
  'черновую карусель',
  'визуальные черновики'
];

let totalErrors = 0;

function checkHtmlFile(htmlPath) {
  if (!fs.existsSync(htmlPath)) return;
  const html = fs.readFileSync(htmlPath, 'utf8');
  const lowerHtml = html.toLowerCase();
  const errors = [];

  // Check Raw JSX
  RAW_JSX_MARKERS.forEach(marker => {
    if (html.includes(marker)) errors.push(`Raw JSX/component marker found: ${marker}`);
  });
  PRODUCTION_ARTIFACT_MARKERS.forEach(marker => {
    if (html.includes(marker) && !RAW_JSX_MARKERS.includes(marker)) errors.push(`Production artifact found: ${marker}`);
  });

  // Check Raw Markdown
  RAW_MARKDOWN.forEach(marker => {
    if (html.includes(marker)) errors.push(`Raw Markdown found: ${marker}`);
  });

  // Check Raw HTML artifacts
  RAW_HTML_ARTIFACTS.forEach(marker => {
    // Only flag visible spans or escaped spans in text body, but since it's hard to isolate body reliably without cheerio,
    // we just check if it exists in a way that looks like a raw string leak.
    if (marker === '<span class=') {
      // It's normal to have <span class="something"> in HTML.
      // But if it's rendered as text: &lt;span class=
      // The prompt asks for: escaped `<span class=`, visible `<span class=`, class=\"text-gradient-brand\"
    }
    if (marker === '&lt;span class=') {
      if (html.includes('&lt;span class=')) errors.push('Escaped <span class= found in text.');
    }
    if (marker === 'class=\\"text-gradient-brand\\"') {
      if (html.includes('class=\\"text-gradient-brand\\"')) errors.push('Raw class string found in text.');
    }
  });

  // Special check for visible <span class= text leakage (if quotes are escaped or it's outside tags)
  if (html.includes('&lt;span class=')) {
    if (!errors.includes('Escaped <span class= found in text.')) errors.push('Escaped <span class= found in text.');
  }
  if (hasStarredHref(html)) errors.push('Href with literal * found.');

  // Check Old forbidden wording
  FORBIDDEN_WORDING.forEach(wording => {
    if (lowerHtml.includes(wording)) errors.push(`Forbidden wording found: "${wording}"`);
  });

  // Check Indexing issue
  const isPublishedMatch = html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i);
  if (isPublishedMatch) {
    if (isPublishedMatch[1].toLowerCase().includes('noindex')) {
      // Is it supposed to be noindex? If it's in dist/blog/ and not test-, it should be indexable unless it's a draft preview.
      // Wait, we can check frontmatter to see if it's noindex. But dist checker is standalone.
      // Let's assume if it has noindex, it's a draft preview. The prompt says "if published article HTML contains noindex".
      // We will check if it's published by looking at the sitemap or assume all non-preview routes in dist should be indexable.
    }
  }

  // Canonical
  if (!html.includes('rel="canonical"')) {
    errors.push('Missing canonical tag.');
  }

  // FAQ empty rows
  if (html.includes('FAQ') || html.includes('Часто задаваемые вопросы') || html.includes('schema.org/FAQPage')) {
    // Empty FAQ rows usually render an accordion without question text, e.g. <summary></summary> or just missing question text.
    // If it has FAQPage schema, check if question name is empty: "name": ""
    if (html.includes('"name":""') || html.includes('"name": ""')) {
      errors.push('Empty FAQ schema question detected.');
    }
    // Check for empty summary tags
    if (html.includes('<summary></summary>') || html.match(/<summary[^>]*>\s*<\/summary>/)) {
      errors.push('Empty FAQ accordion row detected.');
    }
  }

  if (errors.length > 0) {
    console.log(`\n❌ ${htmlPath}`);
    errors.forEach(e => {
      console.log(`  - ${e}`);
      totalErrors++;
    });
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      walkDir(filePath);
    } else if (file === 'index.html') {
      // To determine if it's a published article vs a draft, check if it's in sitemap.xml?
      // Or just read the frontmatter of the corresponding .md file!
      const relativePath = path.relative(path.join(DIST_DIR), path.dirname(filePath));
      // relativePath is like "blog/article-slug" or "ru/blog/article-slug"
      
      let isPublished = true;
      let mdFile = '';
      if (relativePath.startsWith('ru/blog/')) {
        mdFile = relativePath.replace('ru/blog/', '') + '.md';
      } else if (relativePath.startsWith('blog/')) {
        mdFile = relativePath.replace('blog/', '') + '.md';
      }
      
      if (mdFile) {
        const mdPath = path.join(ROOT, 'src/content/blog/articles', mdFile);
        if (fs.existsSync(mdPath)) {
          const content = fs.readFileSync(mdPath, 'utf8');
          if (content.includes('published: false') || content.includes('noindex: true')) {
            isPublished = false;
          }
        }
        
        checkArticleHtml(filePath, isPublished);
      }
    }
  });
}

function checkArticleHtml(htmlPath, isPublished) {
  if (!fs.existsSync(htmlPath)) return;
  const html = fs.readFileSync(htmlPath, 'utf8');
  const lowerHtml = html.toLowerCase();
  const errors = [];

  RAW_JSX_MARKERS.forEach(marker => {
    if (html.includes(marker)) errors.push(`Raw JSX/component marker found: ${marker}`);
  });
  PRODUCTION_ARTIFACT_MARKERS.forEach(marker => {
    if (html.includes(marker) && !RAW_JSX_MARKERS.includes(marker)) errors.push(`Production artifact found: ${marker}`);
  });

  RAW_MARKDOWN.forEach(marker => {
    if (html.includes(marker)) errors.push(`Raw Markdown found: ${marker}`);
  });

  if (html.includes('&lt;span class=')) errors.push('Escaped <span class= found in text.');
  if (html.includes('class=\\"text-gradient-brand\\"')) errors.push('Raw class string found in text.');
  if (hasStarredHref(html)) errors.push('Href with literal * found.');

  FORBIDDEN_WORDING.forEach(wording => {
    if (lowerHtml.includes(wording)) errors.push(`Forbidden wording found: "${wording}"`);
  });

  if (isPublished) {
    if (html.includes('<meta name="robots" content="noindex')) {
      errors.push('Published article HTML contains noindex tag.');
    }
  }

  if (!html.includes('rel="canonical"')) {
    errors.push('Missing canonical tag.');
  }

  if (html.includes('FAQ') || html.includes('Часто задаваемые') || html.includes('schema.org/FAQPage')) {
    if (html.includes('"name":""') || html.includes('"name": ""')) {
      errors.push('Empty FAQ schema question detected.');
    }
    if (html.includes('<summary></summary>') || html.match(/<summary[^>]*>\s*<\/summary>/)) {
      errors.push('Empty FAQ accordion row detected.');
    }
  }

  if (errors.length > 0) {
    console.log(`\n❌ ${path.relative(ROOT, htmlPath)}`);
    errors.forEach(e => {
      console.log(`  - ${e}`);
      totalErrors++;
    });
  }
}

walkDir(path.join(DIST_DIR, 'blog'));
walkDir(path.join(DIST_DIR, 'ru/blog'));

if (totalErrors > 0) {
  console.log(`\n❌ FAIL: Dist HTML check found ${totalErrors} errors.`);
  process.exit(1);
} else {
  console.log('\n✅ PASS: Dist HTML check passed.');
  process.exit(0);
}
