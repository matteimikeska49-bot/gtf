import { existsSync, readFileSync } from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { getSeoPageRecordByPath, getSeoPagesForPrerender } from '../src/content/seoPages/index.js';
import { validateRenderedSeoProductProofDom } from '../src/content/seoPages/blueprints/exactSeoPageBlueprint.js';
import {
  SEO_ACCESSIBILITY_POLICY,
  SEO_PERFORMANCE_POLICY,
} from '../src/content/seoPages/releaseContracts.js';

const args = new Map();
process.argv.slice(2).forEach((arg, index, list) => {
  if (arg.startsWith('--')) args.set(arg.replace(/^--/, ''), list[index + 1] || true);
});

const explicitPath = args.get('path');
const explicitPaths = args.get('paths')
  ? String(args.get('paths')).split(',').map((item) => item.trim()).filter(Boolean)
  : null;
const url = args.get('url');
const dist = args.get('dist');
const targetPaths = explicitPaths
  || (explicitPath ? [explicitPath] : null)
  || (url ? [new URL(url).pathname] : getSeoPagesForPrerender().map((page) => page.path));
let targetPath = targetPaths[0];
let pageRecord = getSeoPageRecordByPath(targetPath);
const errors = [];
const warnings = [];

const getHtmlFromDist = () => {
  if (!dist) return null;
  const distRoot = path.isAbsolute(dist) ? dist : path.join(process.cwd(), dist);
  const filePath = path.join(distRoot, targetPath.replace(/^\//, ''), 'index.html');
  if (!existsSync(filePath)) return null;
  return readFileSync(filePath, 'utf8');
};

const countMatches = (html, pattern) => (html.match(pattern) || []).length;

const normalizeText = (value) => String(value || '').trim().replace(/\s+/gu, ' ');

const faqQuestionsFromJsonLd = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.flatMap(faqQuestionsFromJsonLd);
  if (typeof value !== 'object') return [];
  const type = value['@type'];
  const types = Array.isArray(type) ? type : [type];
  const ownQuestions = types.includes('FAQPage')
    ? (value.mainEntity || []).map((entry) => normalizeText(entry?.name)).filter(Boolean)
    : [];
  const nestedQuestions = Object.values(value).flatMap(faqQuestionsFromJsonLd);
  return [...ownQuestions, ...nestedQuestions];
};

const collectFaqSchemaQuestionsFromHtml = (html) => (
  [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/giu)]
    .flatMap((match) => {
      try {
        return faqQuestionsFromJsonLd(JSON.parse(match[1]));
      } catch {
        return [];
      }
    })
);

const questionsMatch = (left, right) => (
  JSON.stringify(left.map(normalizeText)) === JSON.stringify(right.map(normalizeText))
);

const sectionOrderFromHtml = (html) => {
  const markers = [
    ['header', /<header\b/i],
    ['hero', /data-seo-hero-carousel=["']true["']/i],
    ['anchorNav', /aria-label=["']Навигация по странице["']/i],
    ['quickAnswer', /id=["']quick-answer["']/i],
    ['pageRelevantFormats', /id=["']page-relevant-formats["']/i],
    ['productWorkflow', /id=["']product-workflow["']/i],
    ['productCapabilities', /id=["']product-capabilities["']/i],
    ['readyCarouselShowcase', /id=["']ready-carousel-showcase["']/i],
    ['pageSpecificVisualProof', /id=["']page-specific-proof["']/i],
    ['useCases', /id=["']use-cases["']/i],
    ['faq', /id=["']faq-section["']/i],
    ['related', /id=["']related-content["']/i],
    ['finalCta', /id=["']final-cta["']/i],
    ['footer', /<footer\b/i],
  ];
  return markers
    .map(([id, pattern]) => ({ id, index: html.search(pattern) }))
    .filter((item) => item.index >= 0)
    .sort((left, right) => left.index - right.index)
    .map((item) => item.id);
};

const anchorTargetsMissingFromHtml = (html) => {
  const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((match) => match[1]));
  return [...html.matchAll(/<a\b[^>]*href=["']#([^"']+)["'][^>]*>/gi)]
    .map((match) => match[1])
    .filter((target) => !ids.has(target));
};

const validateHtml = (html, sourceLabel) => {
  if (!html) {
    errors.push(`No rendered HTML available for ${targetPath}.`);
    return;
  }

  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1] || '';
  const lang = html.match(/<html[^>]+lang=["']([^"']+)["']/i)?.[1] || '';
  const description = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1] || '';
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1] || '';
  const robots = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i)?.[1] || '';
  const h1Count = countMatches(html, /<h1\b/gi);
  const articleSchemaUsed = /"@type"\s*:\s*"Article"/i.test(html);
  const blogPostingSchemaUsed = /"@type"\s*:\s*"BlogPosting"/i.test(html);
  const faqSchemaUsed = /"@type"\s*:\s*"FAQPage"/i.test(html);
  const requiredSchemaTypes = ['Organization', 'WebSite', 'WebPage', 'BreadcrumbList'];

  if (!title) errors.push(`${sourceLabel} is missing <title>.`);
  if (lang !== pageRecord?.language) errors.push(`${sourceLabel} html lang mismatch: ${lang || '(missing)'}.`);
  if (!description) errors.push(`${sourceLabel} is missing meta description.`);
  if (canonical !== `https://gotoflow.io${targetPath}`) errors.push(`${sourceLabel} canonical mismatch: ${canonical || '(missing)'}.`);
  if (pageRecord?.noindex && !/noindex/i.test(robots)) errors.push(`${sourceLabel} must contain robots noindex.`);
  if (!pageRecord?.noindex && /noindex/i.test(robots)) errors.push(`${sourceLabel} must not contain robots noindex.`);
  if (SEO_ACCESSIBILITY_POLICY.requireSingleH1 && h1Count !== 1) errors.push(`${sourceLabel} must contain exactly one h1; got ${h1Count}.`);
  if (articleSchemaUsed) errors.push(`${sourceLabel} must not use Article schema.`);
  if (blogPostingSchemaUsed) errors.push(`${sourceLabel} must not use BlogPosting schema.`);
  if (pageRecord?.faq?.length && !faqSchemaUsed) errors.push(`${sourceLabel} must include FAQPage schema when FAQ is visible.`);
  requiredSchemaTypes.forEach((schemaType) => {
    if (!new RegExp(`"@type"\\s*:\\s*"${schemaType}"`, 'i').test(html)) {
      errors.push(`${sourceLabel} must include ${schemaType} schema.`);
    }
  });

  const htmlBytes = Buffer.byteLength(html);
  if (htmlBytes > SEO_PERFORMANCE_POLICY.maxHtmlBytes) {
    warnings.push(`${sourceLabel} HTML is larger than ${SEO_PERFORMANCE_POLICY.maxHtmlBytes} bytes: ${htmlBytes}.`);
  }

  if (pageRecord?.templateVariant === 'template_page') {
    const visibleFaqCount = countMatches(html, /data-seo-faq-item=["']true["']/gi);
    const faqSchemaQuestions = collectFaqSchemaQuestionsFromHtml(html);
    const expectedFaqQuestions = (pageRecord.faq || []).map((item) => item.question);
    const proofErrors = validateRenderedSeoProductProofDom({
      productWorkflowMarkers: countMatches(html, /data-seo-proof=["']product-workflow["']/gi),
      heroCarouselCards: countMatches(html, /data-seo-hero-card=["']carousel["']/gi),
      heroCarouselImages: countMatches(html, /data-seo-hero-image=["']carousel["']/gi),
      heroAssetIds: countMatches(html, /data-hero-asset-placement=["'](?:left|center|right)["']/gi),
      heroCenterAssetIds: countMatches(html, /data-hero-asset-placement=["']center["']/gi),
      seoHeadingCount: countMatches(html, /data-seo-heading=["'][^"']+["']/gi),
      seoHeadingAccentCount: countMatches(html, /data-seo-heading-accent=["'][^"']+["']/gi),
      majorH2WithoutAccent: Math.max(
        0,
        countMatches(html, /data-seo-heading=["'][^"']+["']/gi) -
          countMatches(html, /data-seo-heading-accent=["'][^"']+["']/gi),
      ),
      productCapabilitiesMarkers: countMatches(html, /data-seo-proof=["']product-capabilities["']/gi),
      productCapabilityCards: countMatches(html, /data-seo-proof-card=["']product-capability["']/gi),
      readyResultsShowcaseMarkers: countMatches(html, /data-seo-proof=["']ready-results-showcase["']/gi),
      readyResultCards: countMatches(html, /data-seo-proof-card=["']ready-carousel["']/gi),
      readyResultImages: countMatches(html, /data-seo-proof-image=["']ready-carousel["']/gi),
      readyResultsCtas: countMatches(html, /data-seo-proof-cta=["']ready-results-showcase["']/gi),
      pageSpecificProofMarkers: countMatches(html, /data-seo-proof=["']page-specific-result["']/gi),
      pageSpecificProofImages: countMatches(html, /data-seo-proof-image=["']page-specific-result["']/gi),
      workflowSteps: countMatches(html, /data-workflow-step/gi),
      workflowPanels: countMatches(html, /data-seo-proof-card=["']product-workflow-mockup["']/gi),
      useCasesMarkers: countMatches(html, /data-seo-section=["']use-cases["']/gi),
      relatedMarkers: countMatches(html, /data-seo-section=["']related-content["']/gi),
      finalCtaMarkers: countMatches(html, /data-seo-section=["']final-cta["']/gi),
      visibleFaqCount,
      faqSchemaParity: questionsMatch(faqSchemaQuestions, expectedFaqQuestions),
      headerCount: countMatches(html, /<header\b/gi),
      footerCount: countMatches(html, /<footer\b/gi),
      sectionOrder: sectionOrderFromHtml(html),
      anchorTargetsMissing: anchorTargetsMissingFromHtml(html),
      legacyTechnicalLabels: /\b(?:USE_CASE_PAGE|COMMERCIAL_TOOL|SECTION|readyCarouselShowcase)\b/.test(html),
    });
    errors.push(...proofErrors.map((error) => `${sourceLabel}: ${error}`));
  }
};

const validateRuntime = async () => {
  if (!url) return;

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || (existsSync('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome') ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined),
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    await page.waitForSelector('#seo-page-ld-json', { timeout: 10000 }).catch(() => {});

    const result = await page.evaluate(() => {
      const visible = (selector) => Boolean(document.querySelector(selector));
      const faqQuestionsFromJsonLd = (value) => {
        if (!value) return [];
        if (Array.isArray(value)) return value.flatMap(faqQuestionsFromJsonLd);
        if (typeof value !== 'object') return [];
        const type = value['@type'];
        const types = Array.isArray(type) ? type : [type];
        const ownQuestions = types.includes('FAQPage')
          ? (value.mainEntity || []).map((entry) => String(entry?.name || '').trim()).filter(Boolean)
          : [];
        const nestedQuestions = Object.values(value).flatMap(faqQuestionsFromJsonLd);
        return [...ownQuestions, ...nestedQuestions];
      };
      const visibleFaqQuestions = [...document.querySelectorAll('[data-seo-faq-item="true"]')]
        .map((item) => item.getAttribute('data-seo-faq-question') || item.textContent.trim())
        .map((item) => item.trim())
        .filter(Boolean);
      const faqSchemaQuestions = [...document.querySelectorAll('script[type="application/ld+json"]')]
        .flatMap((script) => {
          try {
            return faqQuestionsFromJsonLd(JSON.parse(script.textContent));
          } catch {
            return [];
          }
        });
      const sameQuestions = (left, right) => JSON.stringify(left.map((item) => item.replace(/\s+/g, ' ').trim())) ===
        JSON.stringify(right.map((item) => item.replace(/\s+/g, ' ').trim()));
      const linksWithoutNames = [...document.querySelectorAll('a')].filter((link) => !link.textContent.trim() && !link.getAttribute('aria-label')).length;
      const buttonsWithoutNames = [...document.querySelectorAll('button')].filter((button) => !button.textContent.trim() && !button.getAttribute('aria-label')).length;
      const imagesWithoutAlt = [...document.querySelectorAll('img')].filter((img) => !img.hasAttribute('alt')).length;
      const tapTargetsTooSmall = [...document.querySelectorAll('a, button')].filter((el) => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44);
      }).length;
      const sectionOrder = [
        ['header', 'header'],
        ['hero', '[data-seo-hero-carousel="true"]'],
        ['anchorNav', 'nav[aria-label="Навигация по странице"]'],
        ['quickAnswer', '#quick-answer'],
        ['pageRelevantFormats', '#page-relevant-formats'],
        ['productWorkflow', '#product-workflow'],
        ['productCapabilities', '#product-capabilities'],
        ['readyCarouselShowcase', '#ready-carousel-showcase'],
        ['pageSpecificVisualProof', '#page-specific-proof'],
        ['useCases', '#use-cases'],
        ['faq', '#faq-section'],
        ['related', '#related-content'],
        ['finalCta', '#final-cta'],
        ['footer', 'footer'],
      ]
        .map(([id, selector]) => ({ id, el: document.querySelector(selector) }))
        .filter((item) => item.el)
        .sort((left, right) => {
          const position = left.el.compareDocumentPosition(right.el);
          return position & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
        })
        .map((item) => item.id);
      const anchorTargetsMissing = [...document.querySelectorAll('a[href^="#"]')]
        .map((link) => link.getAttribute('href').slice(1))
        .filter((id) => id && !document.getElementById(id));

      return {
        h1Count: document.querySelectorAll('h1').length,
        hasHeroCta: visible('a[href^="https://app.gotoflow.io"]'),
        hasFaq: visible('#faq-section'),
        hasReadyShowcase: visible('#ready-carousel-showcase'),
        hasProductWorkflow: visible('#product-workflow'),
        hasFinalCta: visible('#final-cta a[href^="https://app.gotoflow.io"], #final-cta button'),
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '',
        lang: document.documentElement.getAttribute('lang') || '',
        description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
        robots: document.querySelector('meta[name="robots"]')?.getAttribute('content') || '',
        articleSchemaUsed: [...document.querySelectorAll('script[type="application/ld+json"]')].some((script) => script.textContent.includes('"Article"')),
        blogPostingSchemaUsed: [...document.querySelectorAll('script[type="application/ld+json"]')].some((script) => script.textContent.includes('"BlogPosting"')),
        faqSchemaUsed: [...document.querySelectorAll('script[type="application/ld+json"]')].some((script) => script.textContent.includes('"FAQPage"')),
        proofSnapshot: {
          heroCarouselCards: document.querySelectorAll('[data-seo-hero-card="carousel"]').length,
          heroCarouselImages: document.querySelectorAll('[data-seo-hero-image="carousel"]').length,
          heroAssetIds: document.querySelectorAll('[data-hero-asset-placement]').length,
          heroCenterAssetIds: document.querySelectorAll('[data-hero-asset-placement="center"]').length,
          seoHeadingCount: document.querySelectorAll('[data-seo-heading]').length,
          seoHeadingAccentCount: document.querySelectorAll('[data-seo-heading-accent]').length,
          majorH2WithoutAccent: [...document.querySelectorAll('[data-seo-heading]')]
            .filter((heading) => !heading.querySelector('[data-seo-heading-accent]')).length,
          productWorkflowMarkers: document.querySelectorAll('[data-seo-proof="product-workflow"]').length,
          productCapabilitiesMarkers: document.querySelectorAll('[data-seo-proof="product-capabilities"]').length,
          productCapabilityCards: document.querySelectorAll('[data-seo-proof-card="product-capability"]').length,
          readyResultsShowcaseMarkers: document.querySelectorAll('[data-seo-proof="ready-results-showcase"]').length,
          readyResultCards: document.querySelectorAll('[data-seo-proof-card="ready-carousel"]').length,
          readyResultImages: document.querySelectorAll('[data-seo-proof-image="ready-carousel"]').length,
          readyResultsCtas: document.querySelectorAll('[data-seo-proof-cta="ready-results-showcase"]').length,
          pageSpecificProofMarkers: document.querySelectorAll('[data-seo-proof="page-specific-result"]').length,
          pageSpecificProofImages: document.querySelectorAll('[data-seo-proof-image="page-specific-result"]').length,
          workflowSteps: document.querySelectorAll('[data-workflow-step]').length,
          workflowPanels: document.querySelectorAll('[data-seo-proof-card="product-workflow-mockup"]').length,
          useCasesMarkers: document.querySelectorAll('[data-seo-section="use-cases"]').length,
          relatedMarkers: document.querySelectorAll('[data-seo-section="related-content"]').length,
          finalCtaMarkers: document.querySelectorAll('[data-seo-section="final-cta"]').length,
          visibleFaqCount: visibleFaqQuestions.length,
          faqSchemaParity: sameQuestions(visibleFaqQuestions, faqSchemaQuestions),
          headerCount: document.querySelectorAll('header').length,
          footerCount: document.querySelectorAll('footer').length,
          sectionOrder,
          anchorTargetsMissing,
          legacyTechnicalLabels: /\b(?:USE_CASE_PAGE|COMMERCIAL_TOOL|SECTION|readyCarouselShowcase)\b/.test(document.body.textContent || ''),
        },
        imagesWithoutAlt,
        linksWithoutNames,
        buttonsWithoutNames,
        tapTargetsTooSmall,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      };
    });

    if (result.h1Count !== 1) errors.push(`Runtime must contain exactly one h1; got ${result.h1Count}.`);
    if (!result.hasHeroCta) errors.push('Runtime is missing app-origin CTA.');
    if (!result.hasFaq) errors.push('Runtime is missing FAQ section.');
    if (pageRecord?.templateVariant === 'template_page' && !result.hasReadyShowcase) errors.push('Runtime is missing ready carousel showcase.');
    if (!result.hasProductWorkflow) errors.push('Runtime is missing product workflow.');
    if (!result.hasFinalCta) errors.push('Runtime is missing final CTA.');
    if (result.canonical !== `https://gotoflow.io${targetPath}`) errors.push(`Runtime canonical mismatch: ${result.canonical || '(missing)'}.`);
    if (result.lang !== pageRecord?.language) errors.push(`Runtime html lang mismatch: ${result.lang || '(missing)'}.`);
    if (!result.description) errors.push('Runtime is missing meta description.');
    if (pageRecord?.noindex && !/noindex/i.test(result.robots)) errors.push('Runtime must contain robots noindex.');
    if (!pageRecord?.noindex && /noindex/i.test(result.robots)) errors.push('Runtime must not contain robots noindex.');
    if (result.articleSchemaUsed) errors.push('Runtime must not use Article schema.');
    if (result.blogPostingSchemaUsed) errors.push('Runtime must not use BlogPosting schema.');
    if (pageRecord?.faq?.length && !result.faqSchemaUsed) errors.push('Runtime must include FAQPage schema.');
    if (result.imagesWithoutAlt) errors.push(`Runtime has images without alt: ${result.imagesWithoutAlt}.`);
    if (result.linksWithoutNames) errors.push(`Runtime has links without accessible names: ${result.linksWithoutNames}.`);
    if (result.buttonsWithoutNames) errors.push(`Runtime has buttons without accessible names: ${result.buttonsWithoutNames}.`);
    if (result.tapTargetsTooSmall) warnings.push(`Runtime has tap targets below 44px: ${result.tapTargetsTooSmall}.`);
    if (result.scrollWidth > result.clientWidth) errors.push(`Runtime has horizontal overflow on mobile: ${result.scrollWidth} > ${result.clientWidth}.`);
    if (pageRecord?.templateVariant === 'template_page') {
      const proofErrors = validateRenderedSeoProductProofDom(result.proofSnapshot);
      errors.push(...proofErrors.map((error) => `Runtime: ${error}`));
    }

    const html = await page.content();
    validateHtml(html, `runtime ${url}`);
  } finally {
    await browser.close();
  }
};

for (const path of targetPaths) {
  targetPath = path;
  pageRecord = getSeoPageRecordByPath(targetPath);

  if (!pageRecord) {
    errors.push(`No SEO page registry record found for ${targetPath}.`);
    continue;
  }

  if (dist) {
    validateHtml(getHtmlFromDist(), `dist ${dist} ${targetPath}`);
  }
}
await validateRuntime();

if (!dist && !url) {
  errors.push('Provide --dist or --url for rendered HTML validation.');
}

console.log('SEO rendered HTML gate');
console.log(`- paths: ${targetPaths.join(', ')}`);
console.log(`- dist checked: ${dist || 'not provided'}`);
console.log(`- runtime checked: ${url || 'not provided'}`);
console.log(`- warnings: ${warnings.length}`);
warnings.forEach((warning) => console.warn(`- ${warning}`));

if (errors.length > 0) {
  console.error('\nSEO rendered HTML gate failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('SEO rendered HTML gate passed.');
