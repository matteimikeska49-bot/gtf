import puppeteer from 'puppeteer';

async function checkRoutes() {
  const routes = [
    '/ru/blog/kak-sdelat-karusel-dlya-instagram-s-ii',
    '/ru/blog/test-ru-seo-template',
    '/blog/linkedin-carousel-prompts'
  ];
  const baseUrl = 'http://127.0.0.1:4173';

  console.log(`Starting runtime render check for ${routes.length} routes...`);

  let hasErrors = false;
  const browser = await puppeteer.launch({ headless: true });

  for (const route of routes) {
    const url = `${baseUrl}${route}`;
    console.log(`\nChecking ${url} ...`);
    
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
        hasErrors = true;
        await page.close();
        continue;
      }

      // Check Vite overlay
      const hasViteOverlay = await page.evaluate(() => {
        return !!document.querySelector('vite-error-overlay');
      });

      if (hasViteOverlay) {
        console.log(`  ❌ Vite error overlay detected!`);
        hasErrors = true;
      }

      // Check empty body
      const bodyText = await page.evaluate(() => document.body.innerText.trim());
      if (!bodyText || bodyText.length < 50) {
        console.log(`  ❌ Body seems empty or too short!`);
        hasErrors = true;
      }

      // Check for raw `:::`
      if (bodyText.includes(':::')) {
        console.log(`  ❌ Raw ':::' found in rendered text!`);
        hasErrors = true;
      }

      // Check for undefined / null text
      if (bodyText.includes('undefined') || bodyText.includes('null')) {
        console.log(`  ❌ Suspicious 'undefined' or 'null' text found!`);
        hasErrors = true;
      }
      
      // Check for expected heading
      const h1Text = await page.evaluate(() => {
        const h1 = document.querySelector('h1');
        return h1 ? h1.innerText : null;
      });

      if (!h1Text) {
        console.log(`  ❌ No <h1> found on page!`);
        hasErrors = true;
      }

      if (pageErrors.length > 0) {
        console.log(`  ❌ Page errors:`, pageErrors);
        hasErrors = true;
      }

      if (consoleErrors.length > 0) {
        // filter out some benign errors if necessary, but keep it strict
        const filteredConsole = consoleErrors.filter(e => !e.includes('favicon'));
        if (filteredConsole.length > 0) {
          console.log(`  ❌ Console errors:`, filteredConsole);
          hasErrors = true;
        }
      }

      if (!hasErrors) {
        console.log(`  ✅ Render check passed for ${route}`);
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
    console.log('\n✅ All runtime render checks PASSED.');
    process.exit(0);
  }
}

checkRoutes().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
