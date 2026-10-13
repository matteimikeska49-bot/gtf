import { toArticle } from './articleRecord.js';

// The locator is derived from the same frontmatter, not a maintained URL map.
// It respects declared slugs even when they differ from source filenames.
const slugs = import.meta.glob('../../content/blog/articles/*.md', {
  eager: true,
  import: 'default',
  query: '?blog-slug',
});
const bodies = import.meta.glob('../../content/blog/articles/*.md', {
  import: 'default',
  query: '?blog-source',
});
const requests = new Map();

export const loadMarkdownArticleBySlug = (slug) => {
  if (!requests.has(slug)) {
    const entry = Object.entries(slugs).find(([path, declared]) =>
      !path.split('/').pop().startsWith('_') && declared === slug);
    const load = entry && bodies[entry[0]];
    requests.set(slug, load
      ? load().then(raw => toArticle([entry[0], raw]))
      : Promise.resolve(null));
  }
  return requests.get(slug);
};
