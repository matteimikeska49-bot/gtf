import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { normalizeContentDate } from '../src/utils/contentDates.js';
import { canonicalUrl, resolveProjectSeoState } from './lib/project-seo-state.mjs';

const attr = (tag, name) => tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, 'i'))?.[1] || '';
const jsonLd = (html) => [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
  .flatMap((match) => {
    const parsed = JSON.parse(match[1]);
    return (Array.isArray(parsed) ? parsed : [parsed]).flatMap((item) => item['@graph'] || [item]);
  });

// Check the semantic fields independently of the resolver's priority logic.
export function validateDateArtifacts({ metadata, html, sitemapBlock, schemaType = 'Article', visible = true }) {
  const errors = [];
  const published = normalizeContentDate(metadata.publishedAt);
  const updated = normalizeContentDate(metadata.updatedAt);
  const modified = updated && (!published || updated >= published) ? updated : null;
  const reviewed = normalizeContentDate(metadata.lastReviewed);
  const lastmod = sitemapBlock.match(/<lastmod>([^<]*)<\/lastmod>/)?.[1] || null;
  if (lastmod !== (modified || published)) errors.push('sitemap lastmod must describe modification/publication, never review or authoring');
  if (updated && published && updated < published) errors.push('updatedAt precedes confirmed publication');
  let nodes = [];
  try { nodes = jsonLd(html).filter((item) => item['@type'] === schemaType); }
  catch { errors.push('invalid JSON-LD'); }
  if (!nodes.length) errors.push(`missing ${schemaType} schema`);
  for (const node of nodes) {
    if ((node.datePublished || null) !== published) errors.push('datePublished does not match confirmed publishedAt');
    if ((node.dateModified || null) !== modified) errors.push('dateModified does not match valid updatedAt');
  }
  if (visible) {
    const language = metadata.language === 'ru' ? 'ru' : 'en';
    const labels = language === 'ru'
      ? { published: 'Опубликовано', modified: 'Обновлено', reviewed: 'Редакционная проверка' }
      : { published: 'Published', modified: 'Updated', reviewed: 'Last reviewed' };
    for (const [role, expected] of Object.entries({ published, modified, reviewed })) {
      const tags = [...html.matchAll(/<time\b[^>]*>[\s\S]*?<\/time>/gi)].map((match) => match[0])
        .filter((tag) => attr(tag, 'data-content-date') === role);
      if (expected && !tags.length) errors.push(`missing visible ${role} date`);
      if (!expected && tags.length) errors.push(`fabricated visible ${role} date`);
      for (const tag of tags) {
        if (attr(tag, 'datetime') !== expected) errors.push(`visible ${role} datetime mismatch`);
        const index = html.indexOf(tag);
        if (!html.slice(Math.max(0, index - 90), index).includes(`${labels[role]}:`)) errors.push(`incorrect ${language} ${role} label`);
        if (!tag.replace(/<[^>]+>/g, '').trim()) errors.push(`empty visible ${role} date`);
      }
    }
  }
  return errors;
}

export function checkContentDates(root) {
  const state = resolveProjectSeoState(root);
  const sitemap = fs.readFileSync(path.join(root, 'dist/sitemap.xml'), 'utf8');
  const blocks = new Map([...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => [
    match[1].match(/<loc>([^<]*)<\/loc>/)?.[1], match[1],
  ]));
  const errors = [], gaps = [];
  let articles = 0, seoPages = 0, published = 0, modified = 0;
  for (const entry of state.sitemapEntries) {
    const block = blocks.get(canonicalUrl(entry.path)) || '';
    const lastmod = block.match(/<lastmod>([^<]*)<\/lastmod>/)?.[1];
    if (lastmod && normalizeContentDate(lastmod) !== lastmod) errors.push(`${entry.path}: invalid sitemap date ${lastmod}`);
    if (!entry.article && !entry.seoPage) continue;
    const metadata = entry.article || { updatedAt: entry.seoPage.lastUpdated };
    const html = fs.readFileSync(path.join(root, 'dist', entry.path.slice(1), 'index.html'), 'utf8');
    const issues = validateDateArtifacts({ metadata, html, sitemapBlock: block,
      schemaType: entry.article ? 'Article' : 'WebPage', visible: Boolean(entry.article) });
    errors.push(...issues.map((issue) => `${entry.path}: ${issue}`));
    if (entry.article) {
      articles++;
      if (normalizeContentDate(metadata.publishedAt)) published++;
      else gaps.push(`${entry.path}: publication unknown; createdAt/date not promoted`);
      if (normalizeContentDate(metadata.updatedAt)) modified++;
      else gaps.push(`${entry.path}: modification unknown (${metadata.updatedAt || 'not declared'}); lastmod/dateModified omitted`);
      for (const key of ['publishedAt', 'updatedAt', 'lastReviewed']) {
        if (metadata[key] && !normalizeContentDate(metadata[key])) gaps.push(`${entry.path}: unsupported ${key}=${metadata[key]}`);
      }
    } else seoPages++;
  }
  console.log(`Content date parity: ${articles} articles / ${seoPages} SEO pages; confirmed publication=${published}, declared full modification=${modified}.`);
  console.log(`Evidence gaps (not fabricated): ${gaps.length}.`);
  gaps.filter((gap) => !gap.includes('publication unknown')).forEach((gap) => console.log(`- ${gap}`));
  if (errors.length) throw new Error(errors.join('\n'));
  console.log('Content date source/render/schema/sitemap parity passed.');
  return { articles, seoPages, published, modified, gaps };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  checkContentDates(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'));
}
