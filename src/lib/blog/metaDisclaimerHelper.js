import { getMockupsForArticle } from './mockupRegistry';

const META_RESTRICTED_REGEX = /(^|[^a-zа-яё0-9_])(instagram(?:'s)?|facebook(?:'s)?|meta(?:'s)?|инстаграм[а-яё]*|фейсбук[а-яё]*|мет[аеуой]+)(?![a-zа-яё0-9_])/i;
const META_REPLACE_REGEX = /(^|[^a-zа-яё0-9_])(instagram(?:'s)?|facebook(?:'s)?|meta(?:'s)?|инстаграм[а-яё]*|фейсбук[а-яё]*|мет[аеуой]+)(?![a-zа-яё0-9_]|\*)/gi;

export const containsMetaRestrictedTerms = (text) => {
  if (!text) return false;
  return META_RESTRICTED_REGEX.test(text);
};

export const applyRuAutoStar = (text, isRu = false) => {
  if (!isRu || typeof text !== 'string') return text;
  return text.replace(META_REPLACE_REGEX, '$1$2*');
};

export const articleContainsMetaRestrictedTerms = (article) => {
  if (!article || article.language !== 'ru') return false;

  const textFields = [
    article.title,
    article.description,
    article.body,
    article.quickAnswerTitle,
    article.keyTakeaway,
    ...(article.quickAnswer || []).map(q => typeof q === 'string' ? q : `${q.title || ''} ${q.text || ''}`),
    ...(article.faq || []).map(f => `${f.question || ''} ${f.answer || ''}`),
    ...(article.steps || []).map(s => `${s.phase || ''} ${s.items?.map(i => `${i.title || ''} ${i.text || ''}`).join(' ') || ''}`),
    ...(article.prompts || []).map(p => `${p.title || ''} ${p.text || ''}`),
    ...(article.formats || []).map(f => `${f.title || ''} ${f.text || ''} ${f.example || ''}`),
    article.explore?.tools?.map(t => `${t.title || ''} ${t.description || ''}`).join(' '),
    article.explore?.guides?.map(g => `${g.title || ''} ${g.description || ''}`).join(' '),
    article.finalCta ? `${article.finalCta.title || ''} ${article.finalCta.description || ''} ${article.finalCta.buttonText || ''} ${article.finalCta.microcopy || ''} ${article.finalCta.secondaryText || ''}` : '',
  ].filter(Boolean);

  if (textFields.some(containsMetaRestrictedTerms)) return true;

  return false;
};

export const mockupsContainMetaRestrictedTerms = (article) => {
  if (!article || article.language !== 'ru' || !article.body) return false;
  
  const mockupMatches = article.body.match(/:::mockup\s*\{([^}]+)\}/g);
  if (!mockupMatches) return false;

  const typeToSuitableFor = {
    'result': ['result', 'editor-preview', 'product-workflow'],
    'text-topic': ['input', 'text-topic', 'workflow-step'],
    'file-video': ['input', 'file-video', 'workflow-step'],
    'settings': ['settings', 'format', 'slide-count', 'cta'],
    'character': ['character', 'reference-photo', 'personalization'],
    'visual-style': ['visual-style', 'style-selection'],
    'custom-style': ['custom-style', 'style-prompt']
  };

  for (const match of mockupMatches) {
    const typeMatch = match.match(/type\s*=\s*"([^"]+)"/);
    if (typeMatch) {
      const type = typeMatch[1];
      const suitableFor = typeToSuitableFor[type];
      if (suitableFor) {
        const mockups = getMockupsForArticle(article, { suitableFor, limit: 1 });
        if (mockups.length > 0) {
          const mockup = mockups[0];
          const mockupText = `${mockup.id} ${mockup.title || ''} ${mockup.alt || ''} ${mockup.caption || ''} ${(mockup.tags || []).join(' ')} ${(mockup.suitableFor || []).join(' ')}`;
          if (containsMetaRestrictedTerms(mockupText)) {
            return true;
          }
        }
      }
    }
  }

  return false;
};

export const shouldShowRuMetaDisclaimer = (article) => {
  if (!article || article.language !== 'ru') return false;
  return articleContainsMetaRestrictedTerms(article) || mockupsContainMetaRestrictedTerms(article);
};
