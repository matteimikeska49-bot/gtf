export const SEO_SCHEMA_TYPES = [
  'WebPage',
  'WebApplication',
  'SoftwareApplication',
  'Product',
];

export const BLOCKED_SEO_SCHEMA_TYPES = [
  'Article',
  'BlogPosting',
  'NewsArticle',
];

export const isValidSeoSchemaType = (schemaType) => SEO_SCHEMA_TYPES.includes(schemaType);

export const isBlockedSeoSchemaType = (schemaType) => BLOCKED_SEO_SCHEMA_TYPES.includes(schemaType);
