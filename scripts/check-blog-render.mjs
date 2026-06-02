import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const ARTICLES_DIR = path.join(ROOT, 'src/content/blog/articles');

// Helper to extract frontmatter block
function extractFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  return match ? match[1] : null;
}

// Simple key extraction from yaml
function getYamlValue(frontmatter, key) {
  const regex = new RegExp(`^${key}:\\s*["']?([^"'\n]+)["']?`, 'm');
  const match = frontmatter.match(regex);
  if (match) {
    const val = match[1].trim();
    if (val === 'true') return true;
    if (val === 'false') return false;
    return val;
  }
  return undefined;
}

async function checkRoutes() {
  console.log(`🔍 Discovering markdown articles in ${ARTICLES_DIR}...`);
  
  const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md') && f !== '_template.md');
  const routesToCheck = [];
  
  for (const file of files) {
    const filePath = path.join(ARTICLES_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const frontmatter = extractFrontmatter(content);
    if (!frontmatter) continue;
    
    const slug = getYamlValue(frontmatter, 'slug');
    const language = getYamlValue(frontmatter, 'language') || 'en';
    const title = getYamlValue(frontmatter, 'title');
    const published = getYamlValue(frontmatter, 'published');
    
    if (slug) {
      const route = language === 'ru' ? `/ru/blog/${slug}` : `/blog/${slug}`;
      routesToCheck.push({ route, file, slug, language, title, published });
    }
  }

  const baseUrl = 'http://127.0.0.1:4173';
  console.log(`Found ${routesToCheck.length} articles to check.`);
  console.log(`Starting runtime render check via Puppeteer...\n`);

  let hasErrors = false;
  let totalWarnings = 0;
  const browser = await puppeteer.launch({ headless: true });

  console.log('Waiting 2 seconds for server warmup...');
  await new Promise(resolve => setTimeout(resolve, 2000));

  for (const item of routesToCheck) {
    const url = `${baseUrl}${item.route}`;
    console.log(`Checking [${item.language.toUpperCase()}] ${item.route} ...`);
    
    let routeFailed = false;
    
    try {
      const page = await browser.newPage();
      let pageErrors = [];
      let consoleErrors = [];

      page.on('pageerror', err => {
        pageErrors.push(err.message);
      });

      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      const response = await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      
      if (!response.ok()) {
        console.log(`  ❌ Route failed with status: ${response.status()}`);
        routeFailed = true;
        hasErrors = true;
        await page.close();
        continue;
      }

      const evalData = await page.evaluate(() => {
        const bodyText = document.body.innerText;
        const htmlText = document.documentElement.outerHTML;
        const h1Text = document.querySelector('h1') ? document.querySelector('h1').innerText : null;
        const hasViteOverlay = !!document.querySelector('vite-error-overlay');
        const scrollWidth = document.documentElement.scrollWidth;
        const innerWidth = window.innerWidth;
        
        return {
          bodyText,
          htmlText,
          h1Text,
          hasViteOverlay,
          scrollWidth,
          innerWidth
        };
      });

      const { bodyText, htmlText, h1Text, hasViteOverlay, scrollWidth, innerWidth } = evalData;

      if (hasViteOverlay) {
        console.log(`  ❌ Vite error overlay detected!`);
        routeFailed = true;
      }

      if (!bodyText || bodyText.trim().length < 50) {
        console.log(`  ❌ Body seems empty or too short!`);
        routeFailed = true;
      }

      if (!h1Text) {
         console.log(`  ❌ No <h1> found on page!`);
         routeFailed = true;
      }

      const invalidStrings = [':::', 'undefined', 'ReferenceError', 'TypeError'];
      for (const str of invalidStrings) {
        if (bodyText.includes(str)) {
           console.log(`  ❌ Suspicious string found in body: '${str}'`);
           routeFailed = true;
        }
      }
      
      // null is trickier because it's a common word, but check for literal object representation or standalone error
      if (/\bnull\b/.test(bodyText) && (bodyText.includes('is null') || bodyText.includes('null object') || bodyText.includes(': null'))) {
         console.log(`  ⚠️ Suspicious 'null' found in body!`);
      }

      // Language checks
      const enLabels = [
        "What you need to know",
        "Related tools and guides",
        "Frequently asked questions",
        "Product Workflow",
        "Pro Tip",
        "Key Takeaway",
        "Common mistake",
        "this guide is kept up to date"
      ];
      
      const ruDisclaimerText = "принадлежат Meta Platforms Inc., деятельность которой";

      if (item.language === 'ru') {
        for (const label of enLabels) {
          if (bodyText.includes(label)) {
            console.log(`  ❌ EN UI label found in RU article: "${label}"`);
            routeFailed = true;
          }
        }
        
        if (/(Instagram|Facebook|Meta|Инстаграм|Фейсбук|Мета)/i.test(bodyText)) {
          if (!bodyText.includes(ruDisclaimerText)) {
            console.log(`  ❌ Meta mentioned but RU disclaimer is missing!`);
            routeFailed = true;
          }
        }
        
        // Mockup language isolation
        if (htmlText.includes('/mockups/en/')) {
           console.log(`  ❌ EN mockup image path found in RU article!`);
           routeFailed = true;
        }

      } else { // EN
        if (bodyText.includes(ruDisclaimerText)) {
          console.log(`  ❌ RU Meta disclaimer found in EN article!`);
          routeFailed = true;
        }
        
        // Check if there are RU labels instead of EN (heuristic)
        if (bodyText.includes('Часто задаваемые вопросы')) {
          console.log(`  ❌ RU label found in EN article!`);
          routeFailed = true;
        }

        if (bodyText.includes('Instagram*') || bodyText.includes('Facebook*') || bodyText.includes('Meta*')) {
          // It's possible someone just typed Instagram*, but it's a warning/error depending on strictness.
          console.log(`  ❌ Asterisk added to Meta properties in EN article!`);
          routeFailed = true;
        }

        if (htmlText.includes('/mockups/ru/')) {
           console.log(`  ❌ RU mockup image path found in EN article!`);
           routeFailed = true;
        }
      }

      // Horizontal overflow
      if (scrollWidth > innerWidth + 10) {
        console.log(`  ⚠️  Horizontal overflow detected: scrollWidth=${scrollWidth}, innerWidth=${innerWidth}`);
        totalWarnings++;
        // don't fail for now, just warn
      }

      if (pageErrors.length > 0) {
        console.log(`  ❌ Page errors:`, pageErrors);
        routeFailed = true;
      }

      if (consoleErrors.length > 0) {
        const filteredConsole = consoleErrors.filter(e => !e.includes('favicon'));
        if (filteredConsole.length > 0) {
          console.log(`  ❌ Console errors:`, filteredConsole);
          routeFailed = true;
        }
      }

      if (!routeFailed) {
        console.log(`  ✅ Passed (${item.published ? 'published' : 'draft'})`);
      } else {
        console.log(`  --- FAILED ---`);
        hasErrors = true;
      }

      await page.close();
    } catch (e) {
      console.log(`  ❌ Failed to check ${url}: ${e.message}`);
      hasErrors = true;
    }
  }

  await browser.close();

  if (hasErrors) {
    console.log('\n❌ Runtime render checks FAILED.');
    process.exit(1);
  } else {
    console.log(`\n✅ All ${routesToCheck.length} runtime render checks PASSED.`);
    if (totalWarnings > 0) console.log(`⚠️  Total layout warnings: ${totalWarnings}`);
    process.exit(0);
  }
}

checkRoutes().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
