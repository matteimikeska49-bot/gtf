import {
  EXACT_SEO_PAGE_BLUEPRINT,
  EXACT_SEO_PAGE_BLUEPRINT_ID,
} from '../blueprints/exactSeoPageBlueprint.js';

const requiredBlueprintSections = EXACT_SEO_PAGE_BLUEPRINT.sections
  .filter((section) => EXACT_SEO_PAGE_BLUEPRINT.requiredSections.includes(section.id));

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
  userJob: 'Задать исходный материал, выбрать бесшовный шаблон, получить готовую непрерывную ленту слайдов с текстом, проверить ее и скачать для публикации.',
  articleBoundary: 'Страница не является обучающим блогом о том, как нарезать картинку в Photoshop. Это инструмент создания готовой панорамы.',
  generatorBoundary: 'Страница фокусируется исключительно на бесшовном эффекте и не пытается заменить основной /ru/generator-karuselej-instagram.',

  metadata: {
    title: 'Создать бесшовную карусель Instagram | GoToFlow',
    description: 'Создайте бесшовную карусель для Instagram. GoToFlow собирает структуру, текст и единую панораму до 10 слайдов с учетом безопасных зон. Скачайте, разрежьте и публикуйте.',
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
        body: 'Загрузите исходный текст или тему, и GoToFlow автоматически соберет 연속ный визуальный ряд. Мы подготовим правильную композицию и безопасные зоны, чтобы текст не попадал на линии разреза.',
        primaryCta: 'Создать карусель',
        secondaryCta: 'Смотреть примеры',
      };
      visualSlots = {
        heroCarouselImages: [
          {
            type: 'image',
            assetPath: '/images/niches/ru/content-ru-9.webp',
            caption: 'Первый слайд экспертной карусели.',
            alt: 'Пример начала бесшовной карусели в Instagram',
          },
          {
            type: 'image',
            assetPath: '/images/niches/ru/content-ru-10.webp',
            caption: 'Сгенерированная панорама из 5 слайдов в формате 4:5 (1080x1350). Тема: «Запуск продукта». Общий фон — глубокий темный градиент. Золотая плавная кривая пересекает все слайды. Текст строго центрирован в безопасных зонах, а линии разреза проходят по пустому фону.',
            alt: 'Средний слайд с перетекающим графическим элементом',
          },
          {
            type: 'image',
            assetPath: '/images/niches/ru/content-ru-5.webp',
            caption: 'Финальный слайд с призывом к действию.',
            alt: 'Окончание бесшовной карусели с CTA',
          },
        ]
      };
    } else if (section.id === 'quickAnswer') {
      copySlots = {
        heading: 'Что такое бесшовная карусель?',
        body: 'Это формат поста, где фон и графика плавно перетекают с одного слайда на другой. В Instagram это создает эффект единой длинной панорамы. GoToFlow генерирует такую панораму с учетом безопасных зон, чтобы вы могли легко разрезать ее на слайды.',
        contextualLink: 'Как правильно разрезать панораму',
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
        eyebrow: 'Настройка',
        'heading.before': 'Управляйте ',
        'heading.accent': 'каждой деталью',
        'heading.after': ' дизайна',
        description: 'Вам не нужно быть дизайнером. Выбирайте готовые структуры, а GoToFlow сам распределит текст и фон.',
        'items.task': ['Длинный сторителлинг', 'Инструкция (How-to)', 'Продажа услуги', 'Разбор ошибки', 'Знакомство', 'Отзывы'],
        'items.template': ['Сплошная история', 'Шаг за шагом', 'Презентация', 'Контраст', 'Визитка', 'Карусель доверия'],
        'items.structure': [
          'Текст распределен по панораме с единым градиентом.',
          'Крупные цифры на стыках слайдов.',
          'Яркий первый слайд и акцентный оффер в конце.',
          'Темный фон с яркими текстовыми блоками.',
          'Фото автора плавно переходит на второй слайд.',
          'Цитаты клиентов на едином светлом фоне.'
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
        description: 'Пройдите путь от идеи до готовой панорамы за несколько кликов.',
        stepOverrides: [
          'Выберите тему или добавьте текст',
          'Укажите бесшовный стиль оформления',
          'Проверьте текст в безопасных зонах',
          'Сгенерируйте и скачайте панораму',
          'Разрежьте панораму для Instagram'
        ],
        featureChips: ['AI-генерация текста', 'Безопасные зоны', 'Формат 4:5'],
        cta: 'Начать создание',
      };
      visualSlots = {
        workflowSteps: [
          { type: 'componentRef', componentRef: 'component:FALLBACK_MOCKUPS.source-structure', caption: 'Шаг 1', alt: 'Ввод темы' },
          { type: 'componentRef', componentRef: 'component:FALLBACK_MOCKUPS.text-review', caption: 'Шаг 2', alt: 'Выбор стиля' },
          { type: 'componentRef', componentRef: 'component:FALLBACK_MOCKUPS.visual-route', caption: 'Шаг 3', alt: 'Проверка текста' },
          { type: 'componentRef', componentRef: 'component:FALLBACK_MOCKUPS.visual-route', caption: 'Шаг 4', alt: 'Скачивание' },
          { type: 'componentRef', componentRef: 'component:FALLBACK_MOCKUPS.visual-route', caption: 'Шаг 5', alt: 'Публикация' },
        ],
        mockups: [
          { type: 'componentRef', componentRef: 'component:FALLBACK_MOCKUPS.source-structure', caption: 'Мокап ввода', alt: 'Интерфейс ввода' },
          { type: 'componentRef', componentRef: 'component:FALLBACK_MOCKUPS.text-review', caption: 'Мокап стиля', alt: 'Выбор дизайна' },
          { type: 'componentRef', componentRef: 'component:FALLBACK_MOCKUPS.visual-route', caption: 'Мокап редактора', alt: 'Редактирование' },
          { type: 'componentRef', componentRef: 'component:FALLBACK_MOCKUPS.visual-route', caption: 'Мокап результата', alt: 'Готовая панорама' },
        ],
        resultCarousel: [
          { type: 'image', assetPath: '/images/seo-workflow/carousel-result/ai-carousel-1.webp', caption: 'Слайд 1', alt: 'Результат 1' },
          { type: 'image', assetPath: '/images/seo-workflow/carousel-result/ai-carousel-2.webp', caption: 'Слайд 2. Часть текста и графики переходит с первого слайда.', alt: 'Результат 2' },
          { type: 'image', assetPath: '/images/seo-workflow/carousel-result/ai-carousel-3.webp', caption: 'Слайд 3', alt: 'Результат 3' },
          { type: 'image', assetPath: '/images/seo-workflow/carousel-result/ai-carousel-4.webp', caption: 'Слайд 4', alt: 'Результат 4' },
          { type: 'image', assetPath: '/images/seo-workflow/carousel-result/ai-carousel-5.webp', caption: 'Слайд 5. Логическое и визуальное завершение карусели.', alt: 'Результат 5' },
        ]
      };
    } else if (section.id === 'readyCarouselShowcase') {
      copySlots = {
        sectionEyebrow: 'Примеры',
        sectionHeading: 'Как выглядят готовые бесшовные слайды',
        sectionBody: 'Эти панорамы уже сгенерированы в GoToFlow. Обратите внимание, как элементы дизайна плавно пересекают границы слайдов, создавая эффект непрерывности и удерживая внимание зрителя.',
        'item.title': ['Панорама эксперта', 'Визуальная история', 'Инструкция', 'Продуктовый пост', 'Чек-лист', 'Анонс'],
        'item.body': [
          'Строгий дизайн с перетекающими световыми акцентами.',
          'Карусель, где фон меняет цвет от начала к концу.',
          'Простые линии, связывающие шаги алгоритма.',
          'Крупный объект, разделенный на два соседних слайда.',
          'Единый градиент с блоками текста по центру.',
          'Крупная типографика, выходящая за края экрана.'
        ],
        'item.type': ['Экспертиза', 'Сторителлинг', 'Гайд', 'Товар', 'Подборка', 'Новость'],
        'item.audience': ['Бизнес', 'Аудитория', 'Новички', 'Покупатели', 'Студенты', 'Подписчики'],
        showcaseCta: 'Сгенерировать карусель',
      };
      visualSlots = {
        'items.image': [
          { type: 'image', assetPath: '/images/niches/ru/content-ru-2.webp', caption: 'Пример 1', alt: 'Панорама эксперта' },
          { type: 'image', assetPath: '/images/niches/ru/content-ru-3.webp', caption: 'Пример 2', alt: 'История' },
          { type: 'image', assetPath: '/images/niches/ru/content-ru-5.webp', caption: 'Пример 3', alt: 'Инструкция' },
          { type: 'image', assetPath: '/images/niches/ru/content-ru-6.webp', caption: 'Пример 4', alt: 'Продукт' },
          { type: 'image', assetPath: '/images/niches/ru/content-ru-7.webp', caption: 'Пример 5', alt: 'Чек-лист' },
          { type: 'image', assetPath: '/images/niches/ru/content-ru-8.webp', caption: 'Пример 6', alt: 'Анонс' },
        ]
      };
    } else if (section.id === 'faq') {
      copySlots = {
        question: [
          'Нужно ли вручную совмещать слайды в редакторе?',
          'Сколько слайдов можно сделать в бесшовном формате?',
          'Можно ли отредактировать текст и дизайн?',
          'GoToFlow публикует карусель автоматически в Instagram?'
        ],
        answer: [
          'Нет, GoToFlow сам генерирует единую длинную панораму с правильной композицией. Вам останется только разрезать готовый файл на равные части.',
          'В Instagram максимальный лимит для одного поста — 10 слайдов. GoToFlow позволяет создать панораму длиной от 5 до 10 слайдов в оптимальных форматах (4:5 или 1:1).',
          'Да, вы можете редактировать текст, менять настройки шаблона, переключать ИИ-стили и заменять фон прямо в платформе.',
          'Нет. GoToFlow только создает дизайн и выдает вам готовый графический файл. Вы самостоятельно разрезаете его и публикуете.'
        ],
      };
      visualSlots = {
        accordionChevron: { type: 'componentRef', componentRef: 'component:SeoPageFAQ.chevron', caption: 'Стрелка вниз', alt: 'Развернуть ответ' }
      };
    } else if (section.id === 'related') {
      copySlots = {
        'relatedCard.title': ['Генератор каруселей', 'Нарезка карусели', 'Шаблоны каруселей'],
        'relatedCard.description': [
          'Основной инструмент для создания любых каруселей.',
          'Инструкция по нарезке панорамы.',
          'Библиотека готовых шаблонов.'
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
        body: 'Выберите бесшовный шаблон, добавьте текст и скачайте готовую панораму для вашего блога.',
        primaryCta: 'Начать бесплатно',
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
  FAQ: [
    {
      question: 'Нужно ли вручную совмещать слайды в редакторе?',
      answer: 'Нет, GoToFlow сам генерирует единую длинную панораму с правильной композицией. Вам останется только разрезать готовый файл на равные части.',
    },
    {
      question: 'Сколько слайдов можно сделать в бесшовном формате?',
      answer: 'В Instagram максимальный лимит для одного поста — 10 слайдов. GoToFlow позволяет создать панораму длиной от 5 до 10 слайдов в оптимальных форматах (4:5 или 1:1).',
    },
    {
      question: 'Можно ли отредактировать текст и дизайн?',
      answer: 'Да, вы можете редактировать текст, менять настройки шаблона, переключать ИИ-стили и заменять фон прямо в платформе.',
    },
    {
      question: 'GoToFlow публикует карусель автоматически в Instagram?',
      answer: 'Нет. GoToFlow только создает дизайн и выдает вам готовый графический файл. Вы самостоятельно разрезаете его и публикуете.',
    }
  ],
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
      route: '/ru/blog/kak-narezat-foto-dlya-karuseli',
      anchor: 'Как нарезать карусель на слайды'
    },
    {
      status: 'verified',
      required: true,
      allowedTargetTypes: ['approved_seo_page'],
      route: '/ru/templates/instagram-carousel',
      anchor: 'Шаблоны Instagram-каруселей'
    }
  ],
  ownerComments: [],
};

export default seamlessInstagramCarouselHandoff;
