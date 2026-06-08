import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const ARTICLES_DIR = path.join(ROOT, 'src/content/blog/articles');

async function checkPreviewRoutes() {
  const baseUrl = process.env.BLOG_QA_BASE_URL || 'http://localhost:4173';
  
  console.log(`🔍 Checking preview server at ${baseUrl}...`);
  try {
    const res = await fetch(`${baseUrl}/`);
    if (!res.ok) throw new Error('Not OK');
  } catch (e) {
    console.log(`\n❌ Preview server is not running. Start it with \`npm run preview\` after build, then rerun this check.\n`);
    process.exit(1);
  }

  const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md') && f !== '_template.md');
  const d53Topics = ['text-to-carousel-ai', 'instagram-carousel-hooks', 'tekst-v-karusel-neyroset', 'content-calendar-to-carousel', 'b2b-keysy-v-linkedin-karusel'];

  let errors = 0;
  
  for (const file of files) {
    const slug = file.replace('.md', '');
    if (!d53Topics.includes(slug)) continue;

    const content = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf-8');
    const langMatch = content.match(/^language:\s*["']?([^"'\n]+)["']?/m);
    const lang = langMatch ? langMatch[1] : 'en';
    const titleMatch = content.match(/^title:\s*["']?([^"'\n]+)["']?/m);
    const title = titleMatch ? titleMatch[1] : '';

    const route = lang === 'ru' ? `/ru/blog/${slug}/` : `/blog/${slug}/`;
    const url = `${baseUrl}${route}`;

    console.log(`Checking D53 route: ${url} ...`);
    
    try {
      const res = await fetch(url);
      if (res.status !== 200) {
        console.log(`  ❌ Route failed with HTTP ${res.status}`);
        errors++;
        continue;
      }
      const html = await res.text();
      // Look for title or slug in HTML roughly
      const encodedTitle = title.replace(/&/g, '&amp;');
      if (!html.includes(encodedTitle.substring(0, 20)) && !html.includes(slug)) {
        console.log(`  ❌ Route returned 200, but HTML doesn't contain the expected title/slug.`);
        errors++;
      } else {
        console.log(`  ✅ URL Verified: ${url}`);
      }
    } catch (e) {
      console.log(`  ❌ Request failed: ${e.message}`);
      errors++;
    }
  }

  if (errors > 0) {
    console.log(`\n❌ Preview routes verification failed with ${errors} errors.`);
    process.exit(1);
  } else {
    console.log(`\n✅ Preview routes verification passed. You may provide these URLs to the user.`);
    process.exit(0);
  }
}

checkPreviewRoutes().catch(e => {
  console.error(e);
  process.exit(1);
});
