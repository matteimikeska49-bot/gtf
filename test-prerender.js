import puppeteer from 'puppeteer';
(async () => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));
  await page.goto('http://localhost:4173', {waitUntil: 'networkidle0', timeout: 30000});
  console.log("Root children count:", await page.evaluate(() => document.querySelector('#root').childElementCount));
  await browser.close();
})();
