import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveProjectSeoState } from './lib/project-seo-state.mjs';
import { isRuCarouselCluster, validateCarouselOwnership } from './lib/carousel-ownership.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const attribution = 'ref partner referral utm_source utm_medium utm_campaign utm_content utm_term utm_id yclid gclid fbclid _openstat'.split(' ');
const residue = '_ym_debug need_sec_link sec_link_scene'.split(' ');
const payment = 'OutSum InvId SignatureValue IsTest Culture Shp_intent_id Shp_product_code Shp_provider Shp_purchase_type'.split(' ');

export function validateRobotsPolicy(source, generated = source) {
  const errors = [];
  if (source !== generated) errors.push('source/generated robots differ');
  const groups = source.split(/\n\s*\n/);
  const yandex = groups.find(group => /^User-agent:\s*Yandex\s*$/mi.test(group)) || '';
  if (!/^Allow:\s*\/\s*$/m.test(yandex)) errors.push('Yandex crawl allowance missing');
  const allowed = new Set([...attribution, ...residue, ...payment]);
  const seen = new Set();
  for (const match of source.matchAll(/^Clean-param:\s*(\S+)(?:[ \t]+(\S+))?[ \t]*$/gm)) {
    if (!yandex.includes(match[0])) errors.push('Clean-param outside Yandex group');
    if (match[0].length > 500) errors.push('Clean-param exceeds Yandex length limit');
    for (const name of match[1].split('&')) {
      if (!allowed.has(name)) errors.push(`unverified content parameter ${name}`);
      if (payment.includes(name) && match[2] !== '/ru') errors.push(`payment parameter ${name} is not scoped to /ru`);
      if (!payment.includes(name) && match[2]) errors.push(`unexpected scope for ${name}`);
      seen.add(name);
    }
  }
  for (const name of allowed) if (!seen.has(name)) errors.push(`missing Clean-param ${name}`);
  if (!/^Sitemap: https:\/\/gotoflow\.io\/sitemap\.xml$/m.test(source)) errors.push('sitemap declaration missing');
  return errors;
}

export function validateNavigationTarget(href) {
  let url;
  try { url = new URL(href.replaceAll('&amp;', '&'), 'https://gotoflow.io'); } catch { return ['invalid href']; }
  if (!['gotoflow.io', 'app.gotoflow.io'].includes(url.hostname)) return [];
  const errors = [];
  if (['test123', 'partner_test'].includes(url.searchParams.get('ref'))) errors.push('test referral');
  if (url.hostname === 'gotoflow.io') {
    if (/\||%7c/i.test(url.pathname)) errors.push('malformed pipe path');
    if (/NOCLICK_|\/api\/health(?:\/|$)|\/test-(?:ru-seo|seo-template)|\/10-best-instagram-carousel-examples-to-inspire/i.test(url.pathname)) errors.push('test/service/historical navigation target');
    if (payment.some(name => url.searchParams.has(name)) || residue.some(name => url.searchParams.has(name))) errors.push('service query in internal navigation');
  }
  return errors;
}

export function validatePublishedFacts(text) {
  const errors = [];
  for (const sentence of text.split(/[.!?\n]/)) {
    if (/Instagram|Инстаграм/i.test(sentence) && !/GoToFlow/i.test(sentence)
      && /(?:поддерживает\s+до\s+10|(?:supports|allows|up to|maximum of)\s+(?:up to\s+)?10\s+(?:photos|videos|files|slides)|2[–-]10\s+(?:изображений|photos))/i.test(sentence)) errors.push('stale Instagram platform limit');
  }
  if (/ai-linkedin-post-generator remains the current EN route/.test(text)) errors.push('stale LinkedIn current route claim');
  if (/Animated-форматы остаются отдельным направлением развития продукта/.test(text)) errors.push('live animated capability described as roadmap');
  return errors;
}

export function validateNginx404Contract(config) {
  const errors = [];
  if (!/try_files\s+\$uri\s+\$uri\/index\.html\s+\$uri\/\s+=404;/.test(config)) errors.push('unknown path must terminate with 404');
  if (!/error_page\s+404\s+\/index\.html;/.test(config) || /error_page\s+404\s+=/.test(config)) errors.push('SPA fallback must preserve HTTP 404, not rewrite status');
  return errors;
}

export function checkCrawlHygiene(projectRoot = root) {
  const errors = validateRobotsPolicy(fs.readFileSync(path.join(projectRoot, 'public/robots.txt'), 'utf8'), fs.readFileSync(path.join(projectRoot, 'dist/robots.txt'), 'utf8'));
  errors.push(...validateNginx404Contract(fs.readFileSync(path.join(projectRoot, 'nginx.conf'), 'utf8')));
  const state = resolveProjectSeoState(projectRoot);
  const routes = new Map(state.entries.map(entry => [entry.path, entry]));
  let links = 0;
  let carouselPages = 0;
  for (const entry of state.entries.filter(entry => entry.prerender && !entry.path.includes('test-'))) {
    const htmlPath = path.join(projectRoot, 'dist', entry.path.replace(/^\//, ''), 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
      links++;
      errors.push(...validateNavigationTarget(match[1]).map(error => `${entry.path}: ${error}: ${match[1]}`));
    }
  }
  const articlesDir = path.join(projectRoot, 'src/content/blog/articles');
  for (const file of fs.readdirSync(articlesDir).filter(file => file.endsWith('.md') && !file.startsWith('_') && !file.startsWith('test-'))) {
    const text = fs.readFileSync(path.join(articlesDir, file), 'utf8');
    if (/^published:\s*false/m.test(text)) continue;
    errors.push(...validatePublishedFacts(text).map(error => `${file}: ${error}`));
  }
  const commercial = fs.readFileSync(path.join(projectRoot, 'src/content/seoPages/commercialBatchSpecs.js'), 'utf8');
  errors.push(...validatePublishedFacts(commercial));
  const clusters = JSON.parse(fs.readFileSync(path.join(projectRoot, 'src/content/blog/cluster-authority-map.json'), 'utf8')).filter(isRuCarouselCluster);
  const intents = JSON.parse(fs.readFileSync(path.join(projectRoot, 'src/content/blog/intent-map.json'), 'utf8'));
  const topics = JSON.parse(fs.readFileSync(path.join(projectRoot, 'src/content/blog/topic-map.json'), 'utf8'));
  for (const cluster of clusters) for (const role of cluster.articleRoles) {
    const resolved = routes.get(role.url);
    if (!resolved) { errors.push(`${role.slug}: cluster URL is not a resolved project route`); continue; }
    // Historical cluster roles can mention draft/noindex articles. Their actual
    // lifecycle, not the stale editorial status label, controls rendered checks.
    if (!resolved.indexable || !resolved.prerender) continue;
    carouselPages++;
    const content = fs.readFileSync(path.join(articlesDir, `${role.slug}.md`), 'utf8');
    errors.push(...validateCarouselOwnership(content, { slug: role.slug, cluster,
      intent: intents.find(intent => intent.ownerUrl === role.url), topic: topics.find(topic => topic.targetSlug === role.slug) }));
    const html = fs.readFileSync(path.join(projectRoot, 'dist', role.url.slice(1), 'index.html'), 'utf8');
    // Isolate the actual final CTA, not header/navigation links to the same owner.
    const finalSection = html.match(/<section class="text-center">([\s\S]*?)<\/section>/)?.[1] || '';
    const renderedPrimary = finalSection.match(/<a\b[^>]*href="([^"]+)"/)?.[1];
    if (renderedPrimary !== cluster.productRoute) errors.push(`${role.slug}: rendered final CTA ${renderedPrimary} differs from ${cluster.productRoute}`);
  }
  return { errors, links, carouselPages };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { errors, links, carouselPages } = checkCrawlHygiene();
  console.log(`Crawl hygiene: ${links} rendered navigation links, ${carouselPages} current RU carousel ownership/CTA pages checked, ${errors.length} errors.`);
  errors.forEach(error => console.error(error));
  if (errors.length) process.exit(1);
}
