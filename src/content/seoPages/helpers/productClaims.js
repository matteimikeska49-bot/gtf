import { getSeoProductFeatureStatus } from '../productTruthRegistry.js';
import { buildProductWorkflowCarouselTypes } from '../workflowPresets.js';

const SAFE_WORDING_PATTERNS = [
  /помогает\s+подготовить/iu,
  /можно\s+использовать\s+для/iu,
  /удобно\s+собрать/iu,
  /helps\s+prepare/iu,
  /can\s+be\s+used\s+to/iu,
  /helps\s+structure/iu,
];

const NEGATION_PATTERN = /\b(?:не|нет|нельзя|not|does\s+not|do\s+not|cannot|can't|without\s+claiming)\b/iu;
const QUESTION_PATTERN = /\?\s*$/u;

const BLOCKED_CLAIM_PATTERNS = [
  {
    label: 'unsupported guarantee',
    pattern: /\b(?:guarantees?|guaranteed|guaranteed\s+result|guaranteed\s+results)\b|гарантиру(?:ет|ют)|гарантированн(?:о|ый|ая|ые)\s+результат/iu,
  },
  {
    label: 'fake or absolute performance statistic',
    pattern: /\b(?:100%\s+(?:result|results|accuracy|growth|reach|engagement|conversion)|(?:increase|boost|grow)\s+[^.!?\n]{0,50}\b\d{2,3}%|\d{2,3}%\s+(?:more|higher|growth|conversion))\b|(?:100%\s+(?:результат|точност|рост|охват|конверси)|увелич(?:ит|ивает)[^.!?\n]{0,50}\d{2,3}%|\d{2,3}%\s+(?:рост|больше|выше))/iu,
  },
  {
    label: 'fake reviews or clients',
    pattern: /\b(?:trusted\s+by\s+\d+|used\s+by\s+\d+|real\s+customer\s+reviews?\s+included|verified\s+client\s+reviews?)\b|(?:нам\s+доверяют\s+\d+|используют\s+\d+|реальные\s+отзывы\s+клиентов\s+включены|проверенные\s+отзывы\s+клиентов)/iu,
  },
  {
    label: 'unsupported full automation',
    pattern: /\b(?:fully\s+automatic|creates?\s+and\s+publishes?\s+automatically|one[-\s]?click\s+(?:publishing|scheduling)|auto[-\s]?publishes?|publishes?\s+directly\s+to\s+(?:instagram|linkedin|telegram|vk))\b|(?:полностью\s+автоматическ|без\s+участия\s+человека|в\s+один\s+клик\s+(?:публикует|планирует)|автоматически\s+публикует|публикует\s+автоматически|публикует\s+напрямую\s+в\s+(?:instagram|linkedin|telegram|vk|вк|телеграм))/iu,
  },
  {
    label: 'absolute market superiority',
    pattern: /\b(?:best\s+in\s+the\s+world|world'?s\s+best|#1\s+(?:ai\s+)?(?:tool|generator|platform))\b|(?:лучший\s+в\s+мире|самый\s+лучший|номер\s+1\s+(?:инструмент|генератор|платформа))/iu,
  },
  {
    label: 'unsupported upload or extraction automation',
    pattern: /\b(?:uploads?\s+and\s+extracts?\s+any\s+pdf|extracts?\s+any\s+pdf\s+automatically|automatically\s+extracts?\s+from\s+any\s+video)\b|(?:автоматически\s+извлекает\s+из\s+любого\s+(?:pdf|видео)|загружает\s+и\s+извлекает\s+любой\s+pdf)/iu,
  },
];

const TEXT_FIELD_KEYS = new Set([
  'title',
  'description',
  'h1',
  'heroSubtitle',
  'primaryIntent',
  'primaryKeyword',
  'productBridge',
  'label',
  'note',
  'text',
  'body',
  'question',
  'answer',
  'bullets',
  'examples',
  'benefits',
  'templates',
  'prompts',
  'sections',
  'faq',
  'cta',
]);

const shouldScanString = (path) => path.some((part) => TEXT_FIELD_KEYS.has(part));

const collectTextFields = (value, path = []) => {
  if (typeof value === 'string') {
    return shouldScanString(path) ? [{ path: path.join('.'), text: value }] : [];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectTextFields(item, [...path, String(index)]));
  }

  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) => collectTextFields(item, [...path, key]));
  }

  return [];
};

const hasSafeContext = (text) => (
  SAFE_WORDING_PATTERNS.some((pattern) => pattern.test(text)) ||
  NEGATION_PATTERN.test(text) ||
  QUESTION_PATTERN.test(text.trim())
);

export const getSeoProductClaimErrors = (page) => {
  const errors = [];
  const id = page.id || page.path || '(missing id)';

  collectTextFields(page).forEach(({ path, text }) => {
    if (!text.trim() || hasSafeContext(text)) return;

    BLOCKED_CLAIM_PATTERNS.forEach(({ label, pattern }) => {
      if (pattern.test(text)) {
        errors.push(`${id} has ${label} in ${path}: "${text.trim()}"`);
      }
    });
  });

  buildProductWorkflowCarouselTypes(page.productWorkflow || {}).forEach((type) => {
    const status = getSeoProductFeatureStatus('carouselTypes', type.id);
    if (type.availability === 'available' && status !== 'available') {
      errors.push(`${id} productWorkflow carousel type ${type.id} is presented as available but Product Truth Registry status is ${status}.`);
    }
  });

  return errors;
};

export const getSeoProductClaimSummary = (pages) => ({
  pagesScanned: pages.length,
  safeWordingAllowed: SAFE_WORDING_PATTERNS.map((pattern) => pattern.source),
  blockedClaimTypes: BLOCKED_CLAIM_PATTERNS.map((item) => item.label),
});
