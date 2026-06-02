export const MOCKUP_SLOT_MAP = {
  'topic-input': {
    type: 'text-topic',
    layout: 'inline',
    suitableFor: ['input', 'text-topic', 'workflow-step'],
  },
  'result-preview': {
    type: 'result',
    layout: 'featured',
    suitableFor: ['result', 'editor-preview', 'product-workflow'],
  },
  'format-settings': {
    type: 'settings',
    layout: 'compact',
    suitableFor: ['settings', 'format', 'slide-count', 'cta'],
  },
  'style-choice': {
    type: 'visual-style',
    layout: 'compact',
    suitableFor: ['visual-style', 'style-selection'],
  },
};

export const VALID_MOCKUP_SLOTS = Object.keys(MOCKUP_SLOT_MAP);

export const getMockupSlotDefinition = (slot) => MOCKUP_SLOT_MAP[slot] || null;
