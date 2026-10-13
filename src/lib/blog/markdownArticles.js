import { toArticle, isPublicMarkdownArticle } from './articleRecord.js';
export { parseFrontmatter } from './frontmatter';
export { REQUIRED_ARTICLE_FIELDS } from './articleRecord.js';
export { isPublicMarkdownArticle } from './articleRecord.js';

const articleModules = import.meta.glob('../../content/blog/articles/*.md', {
  eager: true,
  import: 'default',
  query: '?blog-metadata',
});

const markdownArticles = Object.entries(articleModules)
  .map(toArticle)
  .filter((article) => !article.isTemplate);

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
