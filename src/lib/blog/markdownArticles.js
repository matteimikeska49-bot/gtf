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

const isBlankOrComment = (line) => {
  const trimmed = line.trim();
  return !trimmed || trimmed.startsWith('#');
};

const indentation = (line) => line.match(/^\s*/)?.[0].length || 0;

const splitKeyValue = (text) => {
  const index = text.indexOf(':');
  if (index === -1) return [text.trim(), ''];
  return [text.slice(0, index).trim(), text.slice(index + 1).trim()];
};

const stripQuotes = (value) => {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
};

const parseScalar = (value) => {
  const trimmed = value.trim();

  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (trimmed === 'null') return null;
  if (trimmed === '[]') return [];
  if (trimmed === '{}') return {};
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);

  return stripQuotes(trimmed);
};

const nextContentLine = (lines, startIndex) => {
  let index = startIndex;
  while (index < lines.length && isBlankOrComment(lines[index])) index += 1;
  return index;
};

const parseBlock = (lines, startIndex, indent) => {
  const firstIndex = nextContentLine(lines, startIndex);
  const firstLine = lines[firstIndex];

  if (!firstLine || indentation(firstLine) < indent) {
    return { value: null, index: firstIndex };
  }

  if (indentation(firstLine) === indent && firstLine.trim().startsWith('- ')) {
    return parseArray(lines, firstIndex, indent);
  }

  return parseObject(lines, firstIndex, indent);
};

const parseObject = (lines, startIndex, indent) => {
  const value = {};
  let index = startIndex;

  while (index < lines.length) {
    if (isBlankOrComment(lines[index])) {
      index += 1;
      continue;
    }

    const lineIndent = indentation(lines[index]);
    const trimmed = lines[index].trim();

    if (lineIndent < indent || trimmed.startsWith('- ')) break;
    if (lineIndent > indent) {
      index += 1;
      continue;
    }

    const [key, rawValue] = splitKeyValue(trimmed);
    if (!key) {
      index += 1;
      continue;
    }

    if (rawValue) {
      value[key] = parseScalar(rawValue);
      index += 1;
    } else {
      const nested = parseBlock(lines, index + 1, indent + 2);
      value[key] = nested.value;
      index = nested.index;
    }
  }

  return { value, index };
};

const parseArrayObjectProperties = (lines, startIndex, indent, initialObject) => {
  const value = { ...initialObject };
  let index = startIndex;

  while (index < lines.length) {
    if (isBlankOrComment(lines[index])) {
      index += 1;
      continue;
    }

    const lineIndent = indentation(lines[index]);
    const trimmed = lines[index].trim();

    if (lineIndent < indent || (lineIndent === indent - 2 && trimmed.startsWith('- '))) break;
    if (lineIndent !== indent || trimmed.startsWith('- ')) break;

    const [key, rawValue] = splitKeyValue(trimmed);
    if (rawValue) {
      value[key] = parseScalar(rawValue);
      index += 1;
    } else {
      const nested = parseBlock(lines, index + 1, indent + 2);
      value[key] = nested.value;
      index = nested.index;
    }
  }

  return { value, index };
};

function parseArray(lines, startIndex, indent) {
  const value = [];
  let index = startIndex;

  while (index < lines.length) {
    if (isBlankOrComment(lines[index])) {
      index += 1;
      continue;
    }

    const lineIndent = indentation(lines[index]);
    const trimmed = lines[index].trim();

    if (lineIndent < indent || !trimmed.startsWith('- ')) break;
    if (lineIndent > indent) {
      index += 1;
      continue;
    }

    const itemText = trimmed.slice(2).trim();

    if (!itemText) {
      const nested = parseBlock(lines, index + 1, indent + 2);
      value.push(nested.value);
      index = nested.index;
      continue;
    }

    const isQuoted = (itemText.startsWith('"') && itemText.endsWith('"')) || (itemText.startsWith("'") && itemText.endsWith("'"));

    if (itemText.includes(':') && !isQuoted) {
      const [key, rawValue] = splitKeyValue(itemText);
      const initialObject = {
        [key]: rawValue ? parseScalar(rawValue) : null,
      };
      const parsed = parseArrayObjectProperties(lines, index + 1, indent + 2, initialObject);
      value.push(parsed.value);
      index = parsed.index;
      continue;
    }

    value.push(parseScalar(itemText));
    index += 1;
  }

  return { value, index };
}

export function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);

  if (!match) {
    return { data: {}, body: markdown };
  }

  const [, frontmatter, body] = match;
  const lines = frontmatter.split('\n');
  const parsed = parseObject(lines, 0, 0).value;

  return { data: parsed, body: body.trim() };
}

const toArticle = ([path, raw]) => {
  const fileName = getFileName(path);
  const { data, body } = parseFrontmatter(raw);
  const missingFields = REQUIRED_ARTICLE_FIELDS.filter((field) => !(field in data));
  const slug = data.slug || fileName.replace(/\.md$/, '');

  return {
    ...data,
    body,
    fileName,
    path,
    slug,
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

export const getMarkdownArticleBySlug = (slug, options = {}) => {
  const article = markdownArticles.find((item) => item.slug === slug);

  if (!article) return null;
  if (options.publicOnly && !isPublicMarkdownArticle(article)) return null;

  return article;
};
