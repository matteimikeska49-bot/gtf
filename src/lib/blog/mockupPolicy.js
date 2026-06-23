export const MOCKUP_POLICY = {
  'topic-input': {
    meaning: 'Input / Brief / Source',
    visualRepresents: 'GoToFlow UI для ввода темы, текста, ссылки, исходника, промпта.',
    allowedIntentKeywords: [
      'idea', 'topic', 'input', 'prompt', 'source', 'text', 'brief',
      'тема', 'идея', 'ввод', 'промпт', 'исходник', 'текст', 'ссылка', 'бриф'
    ],
    allowedOwnerContextKeywords: [],
    forbiddenContextKeywords: [],
    forbiddenWithoutOwnerContextKeywords: []
  },
  'result-preview': {
    meaning: 'Finished Carousel / Result',
    visualRepresents: 'готовый результат внутри GoToFlow: preview, slides, carousel output.',
    allowedIntentKeywords: [
      'result', 'preview', 'output', 'final', 'carousel', 'ready', 'finished',
      'результат', 'превью', 'готовая', 'карусель', 'итог', 'публикация'
    ],
    allowedOwnerContextKeywords: [],
    forbiddenContextKeywords: [
      'problem', 'mistake', 'generic', 'limitations',
      'проблема', 'ошибка', 'минусы', 'недостатки', 'ошибки', 'ловушка'
    ],
    forbiddenWithoutOwnerContextKeywords: []
  },
  'format-settings': {
    meaning: 'Format / Export Settings',
    visualRepresents: 'настройки формата, размера, канала, экспорта, публикации.',
    allowedIntentKeywords: [
      'format', 'settings', 'export', 'publish', 'size', 'channel',
      'формат', 'настройки', 'экспорт', 'публикация', 'размер', 'канал'
    ],
    allowedOwnerContextKeywords: [],
    forbiddenContextKeywords: [],
    forbiddenWithoutOwnerContextKeywords: []
  },
  'style-choice': {
    meaning: 'Visual Style / Branding',
    visualRepresents: 'GoToFlow UI выбора визуального стиля / бренда / дизайна.',
    allowedIntentKeywords: [
      'style', 'visual', 'design', 'brand', 'branding', 'look', 'template', 'tone',
      'стиль', 'визуал', 'дизайн', 'бренд', 'оформление', 'шаблон', 'тон'
    ],
    allowedOwnerContextKeywords: [
      'gotoflow', 'workflow', 'end-to-end', 'practical scenario', 'практический сценарий',
      'брендинг', 'визуальное кодирование', 'визуальный стиль', 'дизайн', 'стиль',
      'brand', 'branding', 'visual style'
    ],
    forbiddenContextKeywords: [],
    forbiddenWithoutOwnerContextKeywords: [
      'template ai editors', 'generic ai editors', 'third-party editors', 'alternatives',
      'competitors', 'canva', 'figma', 'chatgpt-only', 'шаблонные ai-редакторы',
      'шаблонные редакторы', 'универсальные редакторы', 'сторонние редакторы',
      'альтернативы', 'конкуренты', 'ручной метод', 'способ', 'редактор', 'редакторы'
    ]
  }
};
