// Editorial dates, not build time or file mtime. Unknown precision stays unknown.
export function normalizeContentDate(value) {
  if (typeof value !== 'string') return null;
  const input = value.trim();
  const match = input.match(/^(\d{4})-(\d{2})-(\d{2})(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2}))?$/);
  if (!match) return null;
  const [, year, month, day] = match;
  const date = new Date(`${year}-${month}-${day}T00:00:00Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== `${year}-${month}-${day}`) return null;
  if (input.includes('T') && !Number.isFinite(Date.parse(input))) return null;
  return `${year}-${month}-${day}`;
}

export function resolveContentDates(metadata = {}) {
  // createdAt/date are legacy authoring/import fields, NOT proof of publication.
  const published = normalizeContentDate(metadata.publishedAt);
  const updated = normalizeContentDate(metadata.updatedAt);
  const modified = updated && (!published || updated >= published) ? updated : null;
  const reviewed = normalizeContentDate(metadata.lastReviewed);
  return { published, modified, reviewed, lastmod: modified || published };
}

export function formatContentDate(value, language = 'en', month = 'long') {
  const date = normalizeContentDate(value);
  if (!date) return null;
  return new Date(`${date}T00:00:00Z`).toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', {
    month, day: 'numeric', year: 'numeric', timeZone: 'UTC',
  });
}

export const CONTENT_DATE_LABELS = Object.freeze({
  en: { published: 'Published', modified: 'Updated', reviewed: 'Last reviewed' },
  ru: { published: 'Опубликовано', modified: 'Обновлено', reviewed: 'Редакционная проверка' },
});
