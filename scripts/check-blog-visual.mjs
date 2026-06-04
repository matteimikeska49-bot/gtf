import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const ARTICLES_DIR = path.join(ROOT, 'src/content/blog/articles');
const OUT_DIR = path.join(ROOT, 'tmp', 'blog-visual-qa');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function extractFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  return match ? match[1] : null;
}

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

  const baseUrl = process.env.BLOG_QA_BASE_URL || 'http://localhost:4173';
  console.log(`Found ${routesToCheck.length} articles to check.`);
  console.log(`Starting Visual QA via Puppeteer...\n`);

  let hasP0Errors = false;
  let report = [];
  
  const browser = await puppeteer.launch({ headless: true });

  for (const item of routesToCheck) {
    const url = `${baseUrl}${item.route}`;
    console.log(`Checking [${item.language.toUpperCase()}] ${item.route} ...`);
    
    const pageReport = {
      route: item.route,
      language: item.language,
      title: item.title,
      published: item.published,
      desktopScreenshot: null,
      mobileScreenshot: null,
      status: null,
      consoleErrors: [],
      pageErrors: [],
      hasViteOverlay: false,
      hasRawDirectives: false,
      hasUndefined: false,
      hasNull: false,
      hasHorizontalOverflowDesktop: false,
      hasHorizontalOverflowMobile: false,
      hasWrongLanguageMockup: false,
      hasWrongLanguageLabels: false,
      hasDisclaimerIssue: false,
      warnings: [],
      passed: true
    };

    try {
      const page = await browser.newPage();

      page.on('pageerror', err => {
        pageReport.pageErrors.push(err.message);
      });

      page.on('console', msg => {
        if (msg.type() === 'error') {
          pageReport.consoleErrors.push(msg.text());
        }
      });

      // Desktop test & screenshot
      await page.setViewport({ width: 1440, height: 1200 });
      const response = await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      
      if (!response.ok()) {
        pageReport.status = response.status();
        pageReport.passed = false;
        hasP0Errors = true;
        console.log(`  ❌ Route failed with status: ${response.status()}`);
        report.push(pageReport);
        await page.close();
        continue;
      }
      
      pageReport.status = response.status();
      
      // hide vite overlay for screenshot if exists
      await page.evaluate(() => {
        const overlay = document.querySelector('vite-error-overlay');
        if (overlay) overlay.style.display = 'none';
      });

      const safeName = `${item.language}-blog-${item.slug}`;
      const desktopPath = path.join(OUT_DIR, `${safeName}-desktop.png`);
      await page.screenshot({ path: desktopPath, fullPage: true });
      pageReport.desktopScreenshot = `${safeName}-desktop.png`;
      
      let evalDataDesktop = await page.evaluate(() => {
        let offendingElements = [];
        if (document.documentElement.scrollWidth > window.innerWidth + 10) {
          const allElements = document.querySelectorAll('*');
          for (const el of allElements) {
             if (el.scrollWidth > window.innerWidth && el.tagName !== 'HTML' && el.tagName !== 'BODY') {
                 const style = window.getComputedStyle(el);
                 if (style.overflowX === 'auto' || style.overflowX === 'scroll' || style.overflowX === 'hidden') continue;
                 offendingElements.push({
                    tagName: el.tagName,
                    className: el.className,
                    text: el.innerText ? el.innerText.substring(0, 50).replace(/\n/g, ' ') : ''
                 });
             }
          }
        }

        return {
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          hasViteOverlay: !!document.querySelector('vite-error-overlay'),
          bodyText: document.body.innerText,
          htmlText: document.documentElement.outerHTML,
          h1Text: document.querySelector('h1') ? document.querySelector('h1').innerText : null,
          hasWhiteCard: !!document.querySelector('.prose .bg-white, .prose [style*="background-color: rgb(255, 255, 255)"], .prose .text-slate-900'),
          offendingElements,
          hasExploreZone: !!document.querySelector('h2') && (document.body.innerText.includes('Explore more') || document.body.innerText.includes('Смотрите также')),
          hasFAQ: document.documentElement.outerHTML.includes('itemtype="https://schema.org/FAQPage"') || document.body.innerText.includes('FAQ') || document.body.innerText.includes('Часто задаваемые вопросы')
        };
      });

      if (evalDataDesktop.scrollWidth > evalDataDesktop.innerWidth + 10) {
        pageReport.hasHorizontalOverflowDesktop = true;
        pageReport.passed = false;
        hasP0Errors = true;
        pageReport.pageErrors.push(`Desktop horizontal overflow: scrollWidth=${evalDataDesktop.scrollWidth}, innerWidth=${evalDataDesktop.innerWidth}`);
        if (evalDataDesktop.offendingElements && evalDataDesktop.offendingElements.length > 0) {
            pageReport.pageErrors.push(`Offending desktop elements: ${JSON.stringify(evalDataDesktop.offendingElements)}`);
        }
      }
      
      // Mobile test & screenshot
      await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
      await page.reload({ waitUntil: 'networkidle2', timeout: 30000 });
      
      const mobilePath = path.join(OUT_DIR, `${safeName}-mobile.png`);
      await page.screenshot({ path: mobilePath, fullPage: true });
      pageReport.mobileScreenshot = `${safeName}-mobile.png`;

      let evalDataMobile = await page.evaluate(() => {
        let offendingElements = [];
        if (document.documentElement.scrollWidth > window.innerWidth + 10) {
          const allElements = document.querySelectorAll('*');
          for (const el of allElements) {
             if (el.scrollWidth > window.innerWidth && el.tagName !== 'HTML' && el.tagName !== 'BODY') {
                 const style = window.getComputedStyle(el);
                 if (style.overflowX === 'auto' || style.overflowX === 'scroll' || style.overflowX === 'hidden') continue;
                 offendingElements.push({
                    tagName: el.tagName,
                    className: el.className,
                    text: el.innerText ? el.innerText.substring(0, 50).replace(/\n/g, ' ') : ''
                 });
             }
          }
        }
        return {
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          offendingElements
        };
      });

      if (evalDataMobile.scrollWidth > evalDataMobile.innerWidth + 10) {
        pageReport.hasHorizontalOverflowMobile = true;
        pageReport.passed = false;
        hasP0Errors = true;
        pageReport.pageErrors.push(`Mobile horizontal overflow: scrollWidth=${evalDataMobile.scrollWidth}, innerWidth=${evalDataMobile.innerWidth}`);
        if (evalDataMobile.offendingElements && evalDataMobile.offendingElements.length > 0) {
            pageReport.pageErrors.push(`Offending mobile elements: ${JSON.stringify(evalDataMobile.offendingElements)}`);
        }
      }

      // Assertions
      const { bodyText, htmlText, h1Text, hasViteOverlay, hasWhiteCard, hasExploreZone, hasFAQ } = evalDataDesktop;

      if (!hasExploreZone) {
         pageReport.warnings.push('Article Explore Zone or CTA missing');
      }

      if (!hasFAQ) {
         pageReport.warnings.push('FAQ section missing');
      }

      if (hasViteOverlay) {
        pageReport.hasViteOverlay = true;
        pageReport.passed = false;
        hasP0Errors = true;
      }
      
      if (!bodyText || bodyText.trim().length < 50) {
        pageReport.passed = false;
        pageReport.pageErrors.push('Body seems empty or too short');
        hasP0Errors = true;
      }
      
      if (!h1Text) {
        pageReport.passed = false;
        pageReport.pageErrors.push('No <h1> found on page');
        hasP0Errors = true;
      }

      if (bodyText.includes(':::')) {
        pageReport.hasRawDirectives = true;
        pageReport.passed = false;
        hasP0Errors = true;
      }
      
      if (bodyText.includes('undefined')) {
        pageReport.hasUndefined = true;
        pageReport.passed = false;
        hasP0Errors = true;
      }
      
      if (bodyText.includes('ReferenceError') || bodyText.includes('TypeError')) {
        pageReport.passed = false;
        pageReport.pageErrors.push('ReferenceError or TypeError found in body');
        hasP0Errors = true;
      }
      
      if (/\bnull\b/.test(bodyText) && (bodyText.includes('is null') || bodyText.includes('null object') || bodyText.includes(': null'))) {
        pageReport.hasNull = true;
        pageReport.warnings.push('Suspicious null found in body');
      }

      const enLabels = [
        "What you need to know",
        "Related tools and guides",
        "Frequently asked questions",
        "Product Workflow",
        "Pro Tip",
        "Key Takeaway",
        "Common mistake",
        "this guide is kept up to date",
        "Step-by-step phases",
        "Workflow",
        "Phase 1",
        "Phase 2",
        "Example:",
        "thought-leadership/comparison",
        "ideas_article",
        "listicle",
        "primaryKeyword"
      ];
      
      const ruDisclaimerText = "принадлежат Meta Platforms Inc.";

      if (item.language === 'ru') {
        for (const label of enLabels) {
          if (bodyText.includes(label)) {
            pageReport.hasWrongLanguageLabels = true;
            pageReport.passed = false;
            hasP0Errors = true;
          }
        }
        
        if (/(Instagram|Facebook|Meta|Инстаграм|Фейсбук|Мета)/i.test(bodyText)) {
          if (!bodyText.includes(ruDisclaimerText)) {
            pageReport.hasDisclaimerIssue = true;
            pageReport.passed = false;
            hasP0Errors = true;
          }
        }
        
        if (htmlText.includes('/mockups/en/')) {
           pageReport.hasWrongLanguageMockup = true;
           pageReport.passed = false;
           hasP0Errors = true;
        }

      } else { // EN
        if (bodyText.includes(ruDisclaimerText) || bodyText.includes('принадлежат')) {
          pageReport.hasDisclaimerIssue = true;
          pageReport.passed = false;
          hasP0Errors = true;
        }

        if (bodyText.includes('Instagram*') || bodyText.includes('Facebook*') || bodyText.includes('Meta*')) {
          pageReport.hasDisclaimerIssue = true;
          pageReport.passed = false;
          hasP0Errors = true;
        }

        if (htmlText.includes('/mockups/ru/')) {
           pageReport.hasWrongLanguageMockup = true;
           pageReport.passed = false;
           hasP0Errors = true;
        }

        const ruLabels = [
          "Рабочий процесс",
          "Пошаговый разбор",
          "Этап 1",
          "Этап 2",
          "Пример:"
        ];
        
        for (const label of ruLabels) {
          if (bodyText.includes(label)) {
            pageReport.hasWrongLanguageLabels = true;
            pageReport.passed = false;
            hasP0Errors = true;
          }
        }
      }

      if (hasWhiteCard) {
        pageReport.warnings.push('White-card heuristic triggered (possible bright colors in dark mode)');
      }

      if (pageReport.pageErrors.length > 0) {
        pageReport.passed = false;
        hasP0Errors = true;
      }

      const filteredConsole = pageReport.consoleErrors.filter(e => !e.includes('favicon'));
      if (filteredConsole.length > 0) {
        pageReport.passed = false;
        hasP0Errors = true;
      }

      if (pageReport.passed) {
        console.log(`  ✅ Passed`);
        if (pageReport.warnings.length > 0) {
          console.log(`     Warnings: ${pageReport.warnings.length}`);
        }
      } else {
        console.log(`  ❌ FAILED`);
      }

      report.push(pageReport);
      await page.close();
    } catch (e) {
      console.log(`  ❌ Failed to check ${url}: ${e.message}`);
      hasP0Errors = true;
      pageReport.passed = false;
      pageReport.pageErrors.push(e.message);
      report.push(pageReport);
    }
  }

  await browser.close();
  
  fs.writeFileSync(path.join(OUT_DIR, 'report.json'), JSON.stringify(report, null, 2));

  console.log(`\n📊 Visual QA Summary:`);
  console.table(report.map(r => ({
    route: r.route,
    status: r.status,
    passed: r.passed,
    warnings: r.warnings.length
  })));

  if (hasP0Errors) {
    console.log('\n❌ Visual QA checks FAILED.');
    process.exit(1);
  } else {
    console.log(`\n✅ All Visual QA checks PASSED.`);
    process.exit(0);
  }
}

checkRoutes().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
