export const PRODUCT_WORKFLOW_PRESETS = {
  carousel_creation: {
    label: 'Carousel creation workflow',
    outcome: 'complete_carousel',
    carouselTypes: [
      {
        id: 'ai',
        label: 'AI-карусель',
        availability: 'available',
      },
      {
        id: 'template',
        label: 'Шаблонная',
        availability: 'available',
      },
      {
        id: 'seamless',
        label: 'Бесшовная',
        availability: 'available',
      },
      {
        id: 'animated',
        label: 'Анимированная',
        availability: 'available',
      },
    ],
    steps: [
      {
        id: 'source',
        title: 'Choose carousel type',
        description: 'Select AI, template, seamless, or animated carousel format according to the task.',
      },
      {
        id: 'structure',
        title: 'Add source material and structure',
        description: 'Provide source material, then choose a scenario or let GoToFlow select a suitable structure.',
      },
      {
        id: 'textReview',
        title: 'Review slide text',
        description: 'GoToFlow creates the structure, headings, slide text, and CTA logic before visuals.',
      },
      {
        id: 'visualRoute',
        title: 'Configure visuals',
        description: 'Set AI style, template format, background, character, CTA, and other visual details.',
      },
      {
        id: 'editorResult',
        title: 'Edit the complete carousel',
        description: 'Refine slides, text, elements, format, background, and CTA in the editor.',
      },
    ],
    mockups: [
      {
        id: 'source-structure',
        title: 'Source and structure',
        caption: 'Source material and carousel structure selection.',
        fallbackVisualType: 'source_structure',
      },
      {
        id: 'text-review',
        title: 'Text review',
        caption: 'Review and edit slide texts before visuals.',
        fallbackVisualType: 'text_review',
      },
      {
        id: 'visual-route',
        title: 'AI or template',
        caption: 'Choose AI visuals or template presentation settings.',
        fallbackVisualType: 'ai_template',
      },
      {
        id: 'editor-result',
        title: 'Editor and result',
        caption: 'Manual editor controls and complete carousel result.',
        fallbackVisualType: 'editor_result',
      },
    ],
  },
};

export const PRODUCT_WORKFLOW_PRESET_NAMES = Object.keys(PRODUCT_WORKFLOW_PRESETS);

export const getProductWorkflowPreset = (presetName) => PRODUCT_WORKFLOW_PRESETS[presetName] || null;

export const hasValidProductWorkflowPreset = (presetName) => Boolean(getProductWorkflowPreset(presetName));

export const buildProductWorkflowSteps = (workflow = {}) => {
  const preset = getProductWorkflowPreset(workflow.preset);
  if (!preset) return [];

  return preset.steps.map((step) => ({
    ...step,
    ...(workflow.stepOverrides?.[step.id] || {}),
  }));
};

export const buildProductWorkflowMockups = (workflow = {}) => {
  const preset = getProductWorkflowPreset(workflow.preset);
  if (!preset) return workflow.mockups || [];
  const mockupOverrides = new Map((workflow.mockups || []).map((mockup) => [mockup.id, mockup]));

  return preset.mockups.map((mockup) => ({
    ...mockup,
    ...(mockupOverrides.get(mockup.id) || {}),
  }));
};

export const buildProductWorkflowCarouselTypes = (workflow = {}) => {
  const preset = getProductWorkflowPreset(workflow.preset);
  const baseTypes = preset?.carouselTypes || [];
  const typeOverrides = new Map((workflow.carouselTypes || []).map((type) => [type.id, type]));

  return baseTypes.map((type) => ({
    ...type,
    ...(typeOverrides.get(type.id) || {}),
  }));
};
