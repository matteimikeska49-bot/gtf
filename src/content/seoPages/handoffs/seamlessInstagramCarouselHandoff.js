import {
  EXACT_SEO_PAGE_BLUEPRINT,
  EXACT_SEO_PAGE_BLUEPRINT_ID,
} from '../blueprints/exactSeoPageBlueprint.js';
import {
  SEO_CANONICAL_PRODUCT_CAPABILITIES,
  SEO_REQUIRED_PRODUCT_CAPABILITY_IDS,
} from '../productTruthRegistry.js';

const requiredBlueprintSections = EXACT_SEO_PAGE_BLUEPRINT.sections
  .filter((section) => EXACT_SEO_PAGE_BLUEPRINT.requiredSections.includes(section.id));

const seamlessHeroCarouselImages = [
  {
    type: 'image',
    assetPath: '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-1.webp',
    caption: 'Начальный слайд с общей линией, которая продолжается дальше.',
    alt: 'Начало бесшовной карусели Instagram с перетекающей визуальной линией',
  },
  {
    type: 'image',
    assetPath: '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-3.webp',
    caption: 'Средний слайд сохраняет визуальную связь с соседними карточками.',
    alt: 'Средний слайд бесшовной карусели с продолжением общей композиции',
  },
  {
    type: 'image',
    assetPath: '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-5.webp',
    caption: 'Финальный слайд завершает связанную серию и оставляет место для CTA.',
    alt: 'Финальный слайд бесшовной карусели с завершением визуальной линии',
  },
];

const seamlessUseCaseItems = [
  {
    title: 'Экспертный гайд',
    body: 'Подходит для сложной темы, где единая визуальная линия помогает вести читателя от вводного тезиса к выводу.',
  },
  {
    title: 'Пошаговая инструкция',
    body: 'Каждый шаг получает отдельный слайд, а общий фон и графика удерживают ощущение одного процесса.',
  },
  {
    title: 'Сторителлинг',
    body: 'Историю запуска, пути автора или изменения проекта можно показать как непрерывное движение через несколько слайдов.',
  },
  {
    title: 'Кейс',
    body: 'Исходная ситуация, процесс и результат выглядят связно, потому что визуальный контекст не обрывается между карточками.',
  },
  {
    title: 'Продуктовая презентация',
    body: 'Функции, выгоды и сценарии использования можно показать в одной связанной последовательности с финальным CTA.',
  },
  {
    title: 'Чек-лист',
    body: 'Пункты проверки остаются отдельными, но общая композиция делает подборку цельной и удобной для сохранения.',
  },
  {
    title: 'Подборка',
    body: 'Идеи, инструменты или ошибки можно разнести по слайдам и сохранить визуальный ритм всей серии.',
  },
  {
    title: 'Карусель доверия',
    body: 'Отзывы, аргументы и доказательства можно собрать в спокойную последовательность без разрыва визуального контекста.',
  },
];

const seamlessFaqItems = [
  {
    question: 'Что такое бесшовная карусель?',
    answer: 'Бесшовная карусель — это серия отдельных слайдов, где фон, линия или визуальный мотив продолжаются между карточками и создают ощущение единого пространства.',
  },
  {
    question: 'Нужно ли вручную совмещать слайды?',
    answer: 'Нет. GoToFlow помогает создать связанные слайды с визуальным продолжением между границами карточек. Перед скачиванием вы можете проверить, как они смотрятся рядом.',
  },
  {
    question: 'Нужно ли самостоятельно нарезать изображение?',
    answer: 'Нет. GoToFlow создает отдельные связанные слайды для карусели; вы можете проверить, отредактировать и скачать результат. Внешняя нарезка изображения не требуется.',
  },
  {
    question: 'Сколько слайдов можно создать?',
    answer: 'Для Instagram-карусели в GoToFlow доступно до 10 слайдов. Конкретная длина зависит от задачи, исходного материала и выбранной структуры.',
  },
  {
    question: 'Какие исходные материалы можно использовать?',
    answer: 'Можно начать с темы или готового текста, ссылки, видео, PDF или голосового сообщения. GoToFlow помогает превратить исходник в структуру и текст слайдов.',
  },
  {
    question: 'Можно ли отредактировать текст?',
    answer: 'Да. Тексты слайдов можно проверить, исправить и перегенерировать до скачивания карусели.',
  },
  {
    question: 'Можно ли изменить дизайн?',
    answer: 'Да. Можно выбрать AI-стиль или шаблонное направление, настроить фон, персонажа, CTA и вручную доработать слайды в редакторе.',
  },
  {
    question: 'Какие форматы поддерживаются?',
    answer: 'GoToFlow поддерживает форматы 4:5, 1:1 и 9:16. Для Instagram-карусели обычно выбирают 4:5 или 1:1.',
  },
  {
    question: 'Можно ли использовать собственный промпт?',
    answer: 'Да. Собственный промпт можно использовать для визуального направления и стиля, если нужно точнее описать желаемую подачу.',
  },
  {
    question: 'Можно ли изменить фон, персонажа и CTA?',
    answer: 'Да. Эти параметры относятся к доступным настройкам редактора: фон, персонаж и призыв к действию можно адаптировать под задачу карусели.',
  },
  {
    question: 'Чем бесшовная карусель отличается от обычной?',
    answer: 'В обычной карусели каждый слайд чаще воспринимается как отдельная карточка. В бесшовной версии визуальные элементы продолжаются между слайдами и связывают серию в одну историю.',
  },
  {
    question: 'Для каких задач подходит бесшовная карусель?',
    answer: 'Она подходит для экспертных гайдов, пошаговых инструкций, сторителлинга, кейсов, продуктовых презентаций, чек-листов, подборок и каруселей доверия.',
  },
  {
    question: 'Можно ли создать карусель без дизайнера?',
    answer: 'Да. GoToFlow помогает собрать структуру, тексты и визуальное направление, а затем дает возможность вручную проверить и доработать результат.',
  },
  {
    question: 'Сколько времени занимает создание?',
    answer: 'Время зависит от исходного материала и объема правок. Обычно быстрее начать с темы или готового текста, получить черновую структуру и затем доработать детали.',
  },
  {
    question: 'Публикует ли GoToFlow карусель автоматически?',
    answer: 'Нет. GoToFlow не публикует карусель автоматически в Instagram. Вы скачиваете готовые слайды и самостоятельно размещаете их в своем аккаунте.',
  },
  {
    question: 'Можно ли перегенерировать текст или отдельные слайды?',
    answer: 'Да. Перед скачиванием можно перегенерировать текстовые части, исправить слайды и довести карусель до нужной версии.',
  },
];

export const seamlessInstagramCarouselHandoff = {
  id: 'ru-use-case-seamless-instagram-carousel-handoff',
  route: '/ru/use-cases/besshovnaya-karusel-instagram',
  blueprintId: EXACT_SEO_PAGE_BLUEPRINT_ID,
  benchmarkRoute: EXACT_SEO_PAGE_BLUEPRINT.benchmarkRoute,
  runtimeImported: false,
  routeRegistered: false,
  sitemapIncluded: false,
  sitemapEligible: false,
  indexable: false,
  indexationApproved: false,
  lifecycleState: 'content_design_draft',
  physicalHtmlCreated: false,

  handoffComplete: true,
  contentDesignStatus: 'handoff_complete',
  draftPreviewIntegrationAllowed: true,
  draftPreviewIntegrated: false,
  ownerReviewStatus: 'approved_for_technical_integration',
  ownerVisualApprovalReceived: false,
  approvedForProductionIntegration: false,
  approvedForTechnicalIntegration: true,
  productionIntegrationCompleted: false,
  approvedForRelease: false,

  primaryQuery: 'создать бесшовную карусель instagram',
  supportingQueries: ['бесшовная карусель онлайн', 'генератор бесшовных каруселей', 'сделать бесшовную карусель'],
  searchIntent: 'Пользователь ищет инструмент, который поможет быстро собрать единую длинную панораму для Instagram без сложных редакторов дизайна.',
  userJob: 'Задать исходный материал, выбрать бесшовный шаблон, получить готовый комплект связанных слайдов с текстом, проверить их и скачать для публикации.',
  articleBoundary: 'Страница не является обучающим блогом о том, как нарезать картинку в Photoshop. Это инструмент создания готовой панорамы.',
  generatorBoundary: 'Страница фокусируется исключительно на бесшовном эффекте и не пытается заменить основной /ru/generator-karuselej-instagram.',

  metadata: {
    title: 'Создать бесшовную карусель Instagram | GoToFlow',
    description: 'Создайте бесшовную карусель для Instagram. GoToFlow собирает структуру, текст и готовые слайды до 10 карточек с визуальным продолжением. Скачайте и публикуйте.',
    canonicalPath: '/ru/use-cases/besshovnaya-karusel-instagram',
  },

  sections: requiredBlueprintSections.map((section) => {
    let copySlots = {};
    let visualSlots = {};

    if (section.id === 'sharedHeader') {
      copySlots = {};
      visualSlots = {};
    } else if (section.id === 'hero') {
      copySlots = {
        eyebrow: 'Инструмент для контента',
        heading: 'Создайте бесшовную карусель для Instagram',
        body: 'Загрузите исходный текст или тему, и GoToFlow автоматически соберет визуальный ряд. Мы подготовим правильную композицию и плавные визуальные переходы между слайдами.',
        primaryCta: 'Создать карусель',
        secondaryCta: 'Смотреть примеры',
      };
      visualSlots = {
        heroCarouselImages: seamlessHeroCarouselImages,
      };
    } else if (section.id === 'quickAnswer') {
      copySlots = {
        heading: 'Что такое бесшовная карусель?',
        body: 'Это формат поста, где визуальный фон или графика перетекают с одного слайда на другой. В Instagram это создает эффект единого пространства. GoToFlow генерирует последовательность связанных слайдов, так что вам не нужно ничего нарезать вручную.',
        contextualLink: 'Подробнее о бесшовной карусели',
      };
      visualSlots = {
        componentIcon: {
          type: 'componentRef',
          componentRef: 'component:SeoQuickAnswer.componentIcon',
          caption: 'Иконка информации',
          alt: 'Информация о бесшовной карусели',
        }
      };
    } else if (section.id === 'templateCategories') {
      copySlots = {
        sectionEyebrow: 'Популярные форматы',
        sectionHeading: 'Для каких задач подходит бесшовный дизайн',
        'item.title': ['Экспертный гайд', 'Пошаговый чек-лист', 'Кейс или портфолио'],
        'item.body': [
          'Разберите сложную тему на шаги. Единая линия дизайна будет вести читателя от первого слайда к последнему.',
          'Оформите список советов так, чтобы каждый пункт визуально цеплялся за предыдущий.',
          'Покажите результат «До/После» в едином полотне, не разрывая контекст.',
        ],
        categoryCta: 'Выбрать формат',
      };
      visualSlots = {
        componentGeneratedCategoryPreview: [
          {
            type: 'componentRef',
            componentRef: 'component:SeoPageTemplateCategories.preview-1',
            caption: 'Превью гайда',
            alt: 'Пример шаблона гайда',
          },
          {
            type: 'componentRef',
            componentRef: 'component:SeoPageTemplateCategories.preview-2',
            caption: 'Превью чек-листа',
            alt: 'Пример шаблона чек-листа',
          },
          {
            type: 'componentRef',
            componentRef: 'component:SeoPageTemplateCategories.preview-3',
            caption: 'Превью кейса',
            alt: 'Пример шаблона кейса',
          },
        ]
      };
    } else if (section.id === 'templateChoiceGuide') {
      copySlots = {
        eyebrow: 'Настройки',
        'heading.before': 'Какие параметры ',
        'heading.accent': 'можно настроить',
        'heading.after': ' перед скачиванием',
        description: 'Этот блок про настройки редактора, а не про сценарии применения: исходник, бесшовный тип, стиль, фон, персонаж, CTA и ручная проверка результата.',
        'items.task': ['Исходный материал', 'Тип карусели', 'Визуальный стиль', 'Редактирование'],
        'items.template': ['Тема, текст, ссылка, видео, PDF или голосовое', 'Бесшовная карусель', 'AI-стиль или собственный промпт', 'Текст, слайды и CTA'],
        'items.structure': [
          'добавьте контекст и задачу карусели',
          'выберите визуальное продолжение между слайдами',
          'задайте направление, фон и персонажа',
          'проверьте, исправьте и перегенерируйте части результата',
        ],
      };
      visualSlots = {
        articleStyleDecisionSurface: {
          type: 'componentRef',
          componentRef: 'component:SeoTemplateChoiceGuide.decisionSurface',
          caption: 'Визуализация выбора структуры',
          alt: 'Гид по выбору шаблонов карусели',
        }
      };
    } else if (section.id === 'productWorkflow') {
      copySlots = {
        eyebrow: 'Процесс',
        'heading.before': 'Как GoToFlow ',
        'heading.accent': 'собирает ',
        'heading.after': 'карусель',
        description: 'Пройдите путь от исходного материала до готовых связанных слайдов, которые можно проверить, отредактировать и скачать.',
        stepOverrides: [
          'Добавьте тему или исходный материал',
          'Выберите бесшовный тип карусели',
          'Проверьте структуру и текст слайдов',
          'Настройте стиль и визуальное продолжение',
          'Скачайте готовую карусель'
        ],
        featureChips: ['AI-генерация текста', 'Визуальное продолжение', 'Формат 4:5'],
        cta: 'Начать создание',
      };
      visualSlots = {
        workflowSteps: [
          { type: 'componentRef', componentRef: 'component:FALLBACK_MOCKUPS.source-structure', caption: 'Шаг 1', alt: 'Ввод темы' },
          { type: 'componentRef', componentRef: 'component:FALLBACK_MOCKUPS.text-review', caption: 'Шаг 2', alt: 'Выбор стиля' },
          { type: 'componentRef', componentRef: 'component:FALLBACK_MOCKUPS.visual-route', caption: 'Шаг 3', alt: 'Проверка текста' },
          { type: 'componentRef', componentRef: 'component:FALLBACK_MOCKUPS.visual-route', caption: 'Шаг 4', alt: 'Настройка бесшовного стиля' },
          { type: 'componentRef', componentRef: 'component:FALLBACK_MOCKUPS.visual-route', caption: 'Шаг 5', alt: 'Скачивание готовых слайдов' },
        ],
        mockups: [
          { type: 'componentRef', componentRef: 'component:FALLBACK_MOCKUPS.source-structure', caption: 'Мокап ввода', alt: 'Интерфейс ввода' },
          { type: 'componentRef', componentRef: 'component:FALLBACK_MOCKUPS.text-review', caption: 'Мокап стиля', alt: 'Выбор дизайна' },
          { type: 'componentRef', componentRef: 'component:FALLBACK_MOCKUPS.visual-route', caption: 'Мокап редактора', alt: 'Редактирование' },
          { type: 'componentRef', componentRef: 'component:FALLBACK_MOCKUPS.visual-route', caption: 'Мокап результата', alt: 'Готовые связанные слайды' },
        ],
        resultCarousel: [
          { type: 'image', assetPath: '/images/seo-workflow/carousel-result/ai-carousel-1.webp', caption: 'Слайд 1. Титульный', alt: 'Результат слайд 1' },
          { type: 'image', assetPath: '/images/seo-workflow/carousel-result/ai-carousel-2.webp', caption: 'Слайд 2. Часть графики перетекает с первого слайда.', alt: 'Результат слайд 2' },
          { type: 'image', assetPath: '/images/seo-workflow/carousel-result/ai-carousel-3.webp', caption: 'Слайд 3', alt: 'Результат слайд 3' },
          { type: 'image', assetPath: '/images/seo-workflow/carousel-result/ai-carousel-4.webp', caption: 'Слайд 4', alt: 'Результат слайд 4' },
          { type: 'image', assetPath: '/images/seo-workflow/carousel-result/ai-carousel-5.webp', caption: 'Слайд 5. Логическое завершение серии.', alt: 'Результат слайд 5' },
        ]
      };
    } else if (section.id === 'productCapabilities') {
      copySlots = {
        eyebrow: 'Возможности GoToFlow',
        heading: 'Что можно настроить в GoToFlow',
        introCopy: 'GoToFlow создает бесшовную карусель из разных исходников, помогает собрать структуру и текст, выбрать визуальный стиль, настроить фон, персонажа и CTA, затем проверить и отредактировать связанные слайды.',
        'groups.title': SEO_CANONICAL_PRODUCT_CAPABILITIES.map((group) => group.title),
        'groups.body': SEO_CANONICAL_PRODUCT_CAPABILITIES.map((group) => group.body),
      };
      visualSlots = {
        capabilityIconCards: {
          type: 'componentRef',
          componentRef: 'component:SeoPageWorkflow.productCapabilities',
          caption: 'Сетка подтвержденных возможностей продукта',
          alt: 'Возможности GoToFlow для создания каруселей',
        },
      };
    } else if (section.id === 'readyCarouselShowcase') {
      copySlots = {
        sectionEyebrow: 'Полноценные примеры',
        sectionHeading: 'Посмотрите, какие карусели можно создать в GoToFlow',
        sectionBody: 'GoToFlow генерирует полностью готовые карусели для Instagram: с продуманной структурой, качественным текстом, бесшовными переходами и призывом к действию.',
        'item.title': ['Экспертная карусель о маркетинге', 'Пошаговый гайд по Reels', 'Сторителлинг о запуске бизнеса', 'Продуктовая презентация приложения', 'Чек-лист проверки сайта'],
        'item.body': [
          'Разбор сложной темы на 8 слайдах. Градиентный фон плавно объединяет советы в единую линию повествования.',
          'Инструкция из 6 шагов. Линии дизайна переходят со слайда на слайд, ведя взгляд подписчика от начала до CTA.',
          'Яркая визуальная история с крупным шрифтом и перетекающими фотографиями автора на 10 слайдах.',
          'Обзор функций нового сервиса на 5 слайдах. Элементы интерфейса пересекают границы слайдов для эффекта объема.',
          'Контрастная карусель из 7 слайдов. Каждый новый пункт визуально цепляется за предыдущий.'
        ],
        'item.type': ['Экспертиза', 'Инструкция', 'Сторителлинг', 'Товар', 'Подборка'],
        'item.audience': ['Предприниматели', 'Блогеры', 'Подписчики', 'Покупатели', 'Специалисты'],
        showcaseCta: 'Создать такую карусель',
      };
      visualSlots = {
        'items.image': [
          { type: 'image', assetPath: '/images/niches/ru/content-ru-2.webp', caption: 'Экспертная карусель', alt: 'Пример экспертной карусели в Instagram' },
          { type: 'image', assetPath: '/images/niches/ru/content-ru-3.webp', caption: 'Пошаговый гайд', alt: 'Пример гайда в виде бесшовной карусели' },
          { type: 'image', assetPath: '/images/niches/ru/content-ru-5.webp', caption: 'Сторителлинг', alt: 'Пример карусели-истории' },
          { type: 'image', assetPath: '/images/niches/ru/content-ru-6.webp', caption: 'Презентация продукта', alt: 'Пример продуктовой карусели' },
          { type: 'image', assetPath: '/images/niches/ru/content-ru-7.webp', caption: 'Чек-лист', alt: 'Пример чек-листа в Instagram' },
        ]
      };
    } else if (section.id === 'useCases') {
      copySlots = {
        heading: 'Для каких задач подходит бесшовная карусель',
        'item.title': seamlessUseCaseItems.map((item) => item.title),
        'item.body': seamlessUseCaseItems.map((item) => item.body),
      };
      visualSlots = {
        useCaseCards: {
          type: 'componentRef',
          componentRef: 'component:SeoPageWorkflow.useCases',
          caption: 'Сценарии применения бесшовной карусели',
          alt: 'Сценарии использования бесшовной карусели',
        },
      };
    } else if (section.id === 'faq') {
      copySlots = {
        question: seamlessFaqItems.map((item) => item.question),
        answer: seamlessFaqItems.map((item) => item.answer),
      };
      visualSlots = {
        accordionChevron: { type: 'componentRef', componentRef: 'component:SeoPageFAQ.chevron', caption: 'Стрелка вниз', alt: 'Развернуть ответ' }
      };
    } else if (section.id === 'related') {
      copySlots = {
        'relatedCard.title': ['Бесшовная карусель в Instagram', 'Генератор каруселей', 'Шаблоны каруселей'],
        'relatedCard.description': [
          'Узнайте подробнее об эффекте визуального продолжения и как он помогает удерживать внимание зрителя.',
          'Основной инструмент для быстрого создания любых каруселей.',
          'Библиотека готовых структур и оформлений для постов.'
        ],
      };
      visualSlots = {
        relatedCardArrowIcon: { type: 'componentRef', componentRef: 'component:SeoPageRelatedLinks.arrow', caption: 'Стрелка', alt: 'Перейти к материалу' }
      };
    } else if (section.id === 'finalCta') {
      copySlots = {
        eyebrow: 'Начните сейчас',
        'heading.before': 'Соберите ',
        'heading.accent': 'свою карусель',
        'heading.after': ' в пару кликов',
        body: 'Выберите бесшовный формат, добавьте материал и получите готовые слайды для вашего блога.',
        primaryCta: 'Создать бесшовную карусель',
        secondaryCta: 'Посмотреть примеры',
      };
      visualSlots = {
        ctaGradientSurface: { type: 'componentRef', componentRef: 'component:FinalCtaBlock.gradientSurface', caption: 'Фон призыва', alt: 'Блок создания' }
      };
    } else if (section.id === 'sharedFooter') {
      copySlots = {};
      visualSlots = {};
    }

    return {
      id: section.id,
      order: section.order,
      purpose: section.purpose,
      componentName: section.componentName,
      componentPath: section.componentPath,
      benchmarkRoute: section.benchmarkRoute,
      requiredProps: section.acceptedProps,
      copySlots,
      visualSlots,
      ProductTruthClaims: [
        {
          status: 'verified',
          source: 'src/content/seoPages/productTruthRegistry.js',
          claim: 'Seamless carousel creation is supported with manual editing and 4:5 format up to 10 slides.',
        },
      ],
      forbiddenFallbacks: section.forbiddenFallbacks,
      ownerApprovalStatus: 'approved_for_technical_integration',
    };
  }),

  ProductTruthClaims: [
    {
      status: 'verified',
      source: 'src/content/seoPages/productTruthRegistry.js',
      rule: 'Use only confirmed GoToFlow capabilities and owner-approved workflow wording.',
    },
  ],
  forbiddenClaims: [
    'GoToFlow does not create finished slides.',
    'Custom fonts are supported.',
    'Automatic publishing is supported.',
    'Unverified export is supported.',
    'Unverified engagement percentages.',
    'quarantined_review',
  ],
  productCapabilities: {
    required: true,
    componentName: 'SeoPageWorkflow',
    componentPath: 'src/components/seo/SeoPageWorkflow.jsx',
    canonicalDataSource: 'SEO_CANONICAL_PRODUCT_CAPABILITIES',
    highlightedCapabilities: ['seamlessCarousels', 'formats4511916', 'upTo10Slides', 'slideEditing'],
    introCopy: 'GoToFlow создает бесшовную карусель из разных исходников, помогает собрать структуру и текст, выбрать визуальный стиль, настроить фон, персонажа и CTA, затем проверить и отредактировать связанные слайды.',
    groups: SEO_CANONICAL_PRODUCT_CAPABILITIES,
    capabilityIds: SEO_REQUIRED_PRODUCT_CAPABILITY_IDS,
  },
  useCases: {
    required: true,
    componentName: 'SeoPageWorkflow',
    componentPath: 'src/components/seo/SeoPageWorkflow.jsx',
    items: seamlessUseCaseItems,
  },
  FAQ: seamlessFaqItems,
  faqContract: {
    minimum: 12,
    maximum: 16,
    items: seamlessFaqItems,
    uniqueIntentRequired: true,
    visibleSchemaParityRequired: true,
  },
  relatedLinks: [
    {
      status: 'verified',
      required: true,
      allowedTargetTypes: ['approved_seo_page'],
      route: '/ru/generator-karuselej-instagram',
      anchor: 'Генератор каруселей для Instagram'
    },
    {
      status: 'verified',
      required: true,
      allowedTargetTypes: ['approved_blog_article'],
      route: '/ru/blog/besshovnaya-karusel-v-instagram',
      anchor: 'Бесшовная карусель в Instagram: подробная статья'
    },
    {
      status: 'verified',
      required: true,
      allowedTargetTypes: ['approved_seo_page'],
      route: '/ru/templates/instagram-carousel',
      anchor: 'Шаблоны Instagram-каруселей'
    }
  ],
  productProofFamily: 'carousel',
  productProofModules: {
    canonicalProductWorkflow: {
      required: true,
      componentName: 'SeoProductWorkflowShowcase',
      componentPath: 'src/components/seo/template-page/SeoProductWorkflowShowcase.jsx',
      dataSource: 'page.productWorkflow',
      copySlots: ['eyebrow', 'heading.before', 'heading.accent', 'heading.after', 'description', 'stepOverrides', 'featureChips', 'cta'],
      visualSlots: ['workflowSteps', 'mockups', 'resultCarousel'],
    },
    canonicalProductCapabilities: {
      required: true,
      componentName: 'SeoPageWorkflow',
      componentPath: 'src/components/seo/SeoPageWorkflow.jsx',
      canonicalDataSource: 'SEO_CANONICAL_PRODUCT_CAPABILITIES',
      dataSource: 'page.productCapabilities',
      groups: SEO_CANONICAL_PRODUCT_CAPABILITIES,
      capabilityIds: SEO_REQUIRED_PRODUCT_CAPABILITY_IDS,
      highlightedCapabilities: ['seamlessCarousels', 'formats4511916', 'upTo10Slides', 'slideEditing'],
      introCopy: 'GoToFlow создает бесшовную карусель из разных исходников, помогает собрать структуру и текст, выбрать визуальный стиль, настроить фон, персонажа и CTA, затем проверить и отредактировать связанные слайды.',
    },
    canonicalReadyCarouselShowcase: {
      required: true,
      componentName: 'SeoReadyCarouselShowcase',
      componentPath: 'src/components/seo/template-page/SeoReadyCarouselShowcase.jsx',
      minimumExamples: 5,
      examples: [
        { title: 'Экспертная карусель о маркетинге', assetPath: '/images/niches/ru/content-ru-2.webp' },
        { title: 'Пошаговый гайд по Reels', assetPath: '/images/niches/ru/content-ru-3.webp' },
        { title: 'Сторителлинг о запуске бизнеса', assetPath: '/images/niches/ru/content-ru-5.webp' },
        { title: 'Продуктовая презентация приложения', assetPath: '/images/niches/ru/content-ru-6.webp' },
        { title: 'Чек-лист проверки сайта', assetPath: '/images/niches/ru/content-ru-7.webp' },
      ],
      assetPaths: [
        '/images/niches/ru/content-ru-2.webp',
        '/images/niches/ru/content-ru-3.webp',
        '/images/niches/ru/content-ru-5.webp',
        '/images/niches/ru/content-ru-6.webp',
        '/images/niches/ru/content-ru-7.webp',
      ],
      cta: 'Создать такую карусель',
    },
    pageSpecificVisualProof: {
      required: true,
      type: 'page_specific_result_carousel',
      componentName: 'ResultCarouselStack',
      componentPath: 'src/components/seo/template-page/SeoProductWorkflowShowcase.jsx',
      assetPaths: [
        '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-1.webp',
        '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-2.webp',
        '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-3.webp',
        '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-4.webp',
        '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-5.webp',
      ],
      acceptanceRules: [
        'Rendered DOM contains data-seo-proof="page-specific-result".',
        'The page-specific seamless proof is separate from the ready-results showcase marker.',
        'At least three local seamless slide assets render with non-empty src values.',
        'The ready-results showcase still contains at least five canonical finished-carousel examples.',
      ],
    },
  },
  ownerComments: [],
};

export default seamlessInstagramCarouselHandoff;
