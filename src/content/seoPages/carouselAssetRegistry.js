const APPROVED_STATUS = 'approved';
const HERO_PLACEMENT = 'hero';

const carouselHeroAsset = ({
  id,
  assetPath,
  alt,
  intentTags,
  allowedPlacements = [HERO_PLACEMENT],
  status = APPROVED_STATUS,
}) => ({
  id,
  assetPath,
  src: assetPath,
  alt,
  intentTags,
  allowedPlacements,
  status,
  approved: status === APPROVED_STATUS,
});

export const SEO_CAROUSEL_ASSET_REGISTRY = {
  hero: {
    instagramTemplates: [
      carouselHeroAsset({
        id: 'instagram-template-hero-expert-post',
        assetPath: '/images/niches/ru/content-ru-9.webp',
        alt: 'Пример карусели: экспертный пост',
        intentTags: ['instagram', 'carousel', 'templates', 'template-discovery'],
      }),
      carouselHeroAsset({
        id: 'instagram-template-hero-product-case',
        assetPath: '/images/niches/ru/content-ru-10.webp',
        alt: 'Пример карусели: продуктовый кейс',
        intentTags: ['instagram', 'carousel', 'templates', 'template-discovery'],
      }),
      carouselHeroAsset({
        id: 'instagram-template-hero-template-cover',
        assetPath: '/images/niches/ru/content-ru-5.webp',
        alt: 'Пример карусели: готовый шаблон с обложкой и слайдами',
        intentTags: ['instagram', 'carousel', 'templates', 'template-discovery'],
      }),
    ],
    seamlessInstagram: [
      carouselHeroAsset({
        id: 'seamless-instagram-hero-slide-1',
        assetPath: '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-1.webp',
        alt: 'Первый слайд бесшовной карусели Instagram с началом непрерывной композиции',
        intentTags: ['instagram', 'carousel', 'seamless', 'besshovnaya-karusel-instagram'],
      }),
      carouselHeroAsset({
        id: 'seamless-instagram-hero-slide-3',
        assetPath: '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-3.webp',
        alt: 'Центральный слайд бесшовной карусели Instagram с видимым переходом между слайдами',
        intentTags: ['instagram', 'carousel', 'seamless', 'besshovnaya-karusel-instagram'],
      }),
      carouselHeroAsset({
        id: 'seamless-instagram-hero-slide-5',
        assetPath: '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-5.webp',
        alt: 'Финальный слайд бесшовной карусели Instagram с продолжением общего визуала',
        intentTags: ['instagram', 'carousel', 'seamless', 'besshovnaya-karusel-instagram'],
      }),
    ],
  },
  readyShowcase: {
    instagramCarousel: [
      {
        title: 'Экспертный разбор',
        body: 'Карусель с пошаговым объяснением сложной темы. Включает обложку, 5 информационных слайдов с примерами и финальный слайд с призывом сохранить пост.',
        image: '/images/niches/ru/content-ru-2.webp',
        width: 2048,
        height: 2048,
        type: 'Обучающая',
        audience: 'Эксперты, наставники',
      },
      {
        title: 'Подборка ошибок',
        body: 'Популярный формат для привлечения внимания. Структура: обложка с провокацией, разбор каждой ошибки на отдельном слайде, и слайд с правильным решением.',
        image: '/images/niches/ru/content-ru-3.webp',
        width: 1792,
        height: 2400,
        type: 'Образовательная',
        audience: 'Эксперты, маркетологи',
      },
      {
        title: 'Продуктовый кейс',
        body: 'Структура для демонстрации результатов: исходная ситуация, процесс решения, конкретные метрики и призыв к следующему шагу.',
        image: '/images/niches/ru/content-ru-5.webp',
        width: 1792,
        height: 2400,
        type: 'Продуктовая',
        audience: 'Агентства, бизнес',
      },
      {
        title: 'Чек-лист с пользой',
        body: 'Практичная карусель с последовательностью шагов. Обложка с обещанием, 5-7 конкретных пунктов, резюме и CTA к подписке или сохранению.',
        image: '/images/niches/ru/content-ru-6.webp',
        width: 2048,
        height: 2048,
        type: 'Практическая',
        audience: 'Предприниматели, эксперты',
      },
      {
        title: 'Мини-гайд',
        body: 'Пошаговое руководство в формате карусели: введение в тему, 4-6 шагов с визуальными акцентами, итоговый чек-лист и призыв к действию.',
        image: '/images/niches/ru/content-ru-7.webp',
        width: 1792,
        height: 2400,
        type: 'Обучающая',
        audience: 'Любая аудитория',
      },
      {
        title: 'Анонс продукта',
        body: 'Карусель для мягкой продажи: кому подходит, какую задачу решает, что входит в предложение и почему стоит перейти к следующему шагу.',
        image: '/images/niches/ru/content-ru-8.webp',
        width: 1792,
        height: 2400,
        type: 'Продающая',
        audience: 'Малый бизнес, фрилансеры',
      },
    ],
  },
  workflowResults: {
    aiCarouselFiveSlides: [
      {
        src: '/images/seo-workflow/carousel-result/ai-carousel-1.webp',
        alt: 'Обложка карусели: 5 причин делать карусели с ИИ',
      },
      {
        src: '/images/seo-workflow/carousel-result/ai-carousel-2.webp',
        alt: 'Слайд карусели об экономии времени с помощью ИИ',
      },
      {
        src: '/images/seo-workflow/carousel-result/ai-carousel-3.webp',
        alt: 'Слайд карусели о большем количестве идей и форматов',
      },
      {
        src: '/images/seo-workflow/carousel-result/ai-carousel-4.webp',
        alt: 'Слайд карусели о повышении вовлеченности',
      },
      {
        src: '/images/seo-workflow/carousel-result/ai-carousel-5.webp',
        alt: 'Слайд карусели о гибкой настройке визуала',
      },
    ],
    seamlessInstagramFiveSlides: [
      {
        src: '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-1.webp',
        alt: 'Слайд 1 бесшовной карусели Instagram с началом общего визуального перехода',
      },
      {
        src: '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-2.webp',
        alt: 'Слайд 2 бесшовной карусели Instagram с продолжением композиции',
      },
      {
        src: '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-3.webp',
        alt: 'Слайд 3 бесшовной карусели Instagram с центральной частью связанного визуала',
      },
      {
        src: '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-4.webp',
        alt: 'Слайд 4 бесшовной карусели Instagram с продолжением между слайдами',
      },
      {
        src: '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-5.webp',
        alt: 'Слайд 5 бесшовной карусели Instagram с финалом непрерывной композиции',
      },
    ],
  },
};

export const getSeoCarouselAssets = (group, key) => (
  SEO_CAROUSEL_ASSET_REGISTRY[group]?.[key] || []
);

export const getSeoCarouselAssetRegistryItems = () => (
  Object.values(SEO_CAROUSEL_ASSET_REGISTRY)
    .flatMap((group) => Object.values(group))
    .flat()
    .filter((item) => item && typeof item === 'object' && item.id)
);

export const getSeoCarouselAssetById = (assetId) => (
  getSeoCarouselAssetRegistryItems().find((item) => item.id === assetId) || null
);

export const getCarouselPageIntentTags = (page = {}) => {
  const text = [
    page.path,
    page.slug,
    page.primaryKeyword,
    page.primaryIntent,
    page.searchIntent,
    page.h1,
  ].filter(Boolean).join(' ').toLowerCase();

  const tags = ['carousel'];
  if (/instagram|инстаграм/u.test(text)) tags.push('instagram');
  if (/бесшовн|seamless|besshovnaya/u.test(text)) tags.push('seamless', 'besshovnaya-karusel-instagram');
  if (/шаблон|template/u.test(text)) tags.push('templates', 'template-discovery');
  return [...new Set(tags)];
};

export const resolveSeoHeroCarouselAssets = (assetIds = []) => (
  assetIds.map((assetId) => getSeoCarouselAssetById(assetId)).filter(Boolean)
);

export const getSeoHeroAssetSelectionErrors = (page = {}) => {
  const label = page.id || page.path || 'carousel product page';
  const assetIds = page.heroCarouselAssetIds;
  const errors = [];

  if (!Array.isArray(assetIds) || assetIds.length !== 3) {
    return [`${label} heroCarouselAssetIds must contain exactly 3 approved carousel asset IDs.`];
  }

  assetIds.forEach((assetId, index) => {
    const asset = getSeoCarouselAssetById(assetId);
    if (!asset) {
      errors.push(`${label} hero asset ${index + 1} does not exist in the carousel asset registry: ${assetId}`);
      return;
    }
    if (asset.status !== APPROVED_STATUS || asset.approved !== true) {
      errors.push(`${label} hero asset ${assetId} must be approved.`);
    }
    if (!asset.allowedPlacements?.includes(HERO_PLACEMENT)) {
      errors.push(`${label} hero asset ${assetId} is not allowed for Hero placement.`);
    }
    if (/placeholder|not_available|todo|tbd|заглушк|плейсхолдер/iu.test(asset.assetPath || asset.src || asset.id || '')) {
      errors.push(`${label} hero asset ${assetId} must not be a placeholder asset.`);
    }
  });

  const centralAsset = getSeoCarouselAssetById(assetIds[1]);
  const pageIntentTags = getCarouselPageIntentTags(page);
  const centralTags = centralAsset?.intentTags || [];
  if (centralAsset && !centralTags.some((tag) => pageIntentTags.includes(tag))) {
    errors.push(`${label} central hero asset ${centralAsset.id} must match page intent tags: ${pageIntentTags.join(', ')}.`);
  }

  return errors;
};
