import { parseFrontmatter } from './frontmatter.js';

export const REQUIRED_ARTICLE_FIELDS = [
  'title', 'slug', 'language', 'description', 'primaryKeyword', 'searchIntent',
  'cluster', 'articleType', 'priority', 'published', 'noindex', 'canonical',
  'createdAt', 'updatedAt', 'lastReviewed', 'quickAnswer', 'faq', 'explore', 'finalCta',
];

export const isPublicMarkdownArticle = (article) => (
  Boolean(article) &&
  article.published === true &&
  article.noindex !== true &&
  !article.isTemplate
);

// Both catalog metadata and the exact full-source loader use the same record.
export const toArticle = ([path, raw]) => {
  const fileName = path.split('/').pop() || '';
  const { data, body } = typeof raw === 'string' ? parseFrontmatter(raw) : { data: raw };
  const missingFields = REQUIRED_ARTICLE_FIELDS.filter((field) => !(field in data));
  return {
    ...data,
    body,
    fileName,
    path,
    slug: data.slug || fileName.replace(/\.md$/, ''),
    language: data.language || 'en',
    isTemplate: fileName.startsWith('_'),
    missingFields,
  };
};
