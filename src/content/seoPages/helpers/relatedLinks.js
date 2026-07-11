export const normalizeRelatedSeoPaths = (page) => (
  Array.isArray(page.relatedSeoPaths)
    ? page.relatedSeoPaths
    : (page.relatedSeoPages || []).map((idOrPath) => (
      typeof idOrPath === 'string' && idOrPath.startsWith('/') ? idOrPath : ''
    )).filter(Boolean)
);

export const getRelatedLinkErrors = (page, context = {}) => {
  const errors = [];
  const {
    blogSlugExists = () => true,
    seoPathExists = () => true,
    productToolPathExists = () => true,
  } = context;

  (page.relatedBlogSlugs || []).forEach((slug) => {
    if (!blogSlugExists(slug)) {
      errors.push(`${page.id} relatedBlogSlugs contains missing or unpublished article slug: ${slug}`);
    }
  });

  (page.relatedSeoPaths || []).forEach((relatedPath) => {
    if (!seoPathExists(relatedPath)) {
      errors.push(`${page.id} relatedSeoPaths contains non-routable or unapproved SEO path: ${relatedPath}`);
    }
  });

  (page.relatedProductToolPaths || []).forEach((relatedPath) => {
    if (!productToolPathExists(relatedPath)) {
      errors.push(`${page.id} relatedProductToolPaths contains missing protected product/tool path: ${relatedPath}`);
    }
  });

  return errors;
};
