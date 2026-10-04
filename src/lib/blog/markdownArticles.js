import { parseFrontmatter } from './frontmatter';
export { parseFrontmatter } from './frontmatter';

const articleModules = import.meta.glob('../../content/blog/articles/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
});

export const REQUIRED_ARTICLE_FIELDS = [
  'title',
  'slug',
  'language',
  'description',
  'primaryKeyword',
  'searchIntent',
  'cluster',
  'articleType',
  'priority',
  'published',
  'noindex',
  'canonical',
  'createdAt',
  'updatedAt',
  'lastReviewed',
  'quickAnswer',
  'faq',
  'explore',
  'finalCta',
];

const getFileName = (path) => path.split('/').pop() || '';

const toArticle = ([path, raw]) => {
  const fileName = getFileName(path);
  const { data, body } = parseFrontmatter(raw);
  const missingFields = REQUIRED_ARTICLE_FIELDS.filter((field) => !(field in data));
  const slug = data.slug || fileName.replace(/\.md$/, '');
  const language = data.language || 'en'; // Fallback to en if missing

  return {
    ...data,
    body,
    fileName,
    path,
    slug,
    language,
    isTemplate: fileName.startsWith('_'),
    missingFields,
  };
};

const markdownArticles = Object.entries(articleModules)
  .map(toArticle)
  .filter((article) => !article.isTemplate);

export const isPublicMarkdownArticle = (article) => (
  Boolean(article) &&
  article.published === true &&
  article.noindex !== true &&
  !article.isTemplate
);

export const getAllMarkdownArticles = () => [...markdownArticles];

export const getPublicMarkdownArticles = () => markdownArticles.filter(isPublicMarkdownArticle);

export const getPublicMarkdownArticlesByLanguage = (lang = 'en') => 
  getPublicMarkdownArticles().filter((article) => article.language === lang);

export const getMarkdownArticleBySlug = (slug, options = {}) => {
  const article = markdownArticles.find((item) => item.slug === slug);

  if (!article) return null;
  if (options.publicOnly && !isPublicMarkdownArticle(article)) return null;

  return article;
};
