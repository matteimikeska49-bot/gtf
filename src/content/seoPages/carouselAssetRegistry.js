export const SEO_CAROUSEL_ASSET_REGISTRY = {
  hero: {
    instagramTemplates: [
      {
        src: '/images/niches/ru/content-ru-9.webp',
        alt: 'Пример карусели: экспертный пост',
      },
      {
        src: '/images/niches/ru/content-ru-10.webp',
        alt: 'Пример карусели: продуктовый кейс',
      },
      {
        src: '/images/niches/ru/content-ru-5.webp',
        alt: 'Пример карусели: готовый шаблон с обложкой и слайдами',
      },
    ],
    seamlessInstagram: [
      {
        src: '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-1.webp',
        alt: 'Первый слайд бесшовной карусели Instagram с началом непрерывной композиции',
      },
      {
        src: '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-5.webp',
        alt: 'Финальный слайд бесшовной карусели Instagram с продолжением общего визуала',
      },
      {
        src: '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-3.webp',
        alt: 'Центральный слайд бесшовной карусели Instagram с видимым переходом между слайдами',
      },
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
