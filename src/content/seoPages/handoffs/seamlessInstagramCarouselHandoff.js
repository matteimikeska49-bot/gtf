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
  searchIntent: 'Пользователь ищет инструмент, который поможет быстро собрать единую серию связанных слайдов для Instagram без сложных редакторов дизайна.',
  userJob: 'Задать исходный материал, выбрать бесшовный шаблон, получить готовый комплект связанных слайдов с текстом, проверить их и скачать для публикации.',
  articleBoundary: 'Страница не является обучающим блогом о том, как нарезать картинку в Photoshop. Это инструмент создания готовых связанных слайдов.',
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
        eyebrow: 'Бесшовная карусель',
        heading: 'Создайте бесшовную карусель для Instagram',
        body: 'Загрузите исходный текст или тему, и GoToFlow автоматически соберет визуальный ряд. Мы подготовим правильную композицию и плавные переходы между слайдами.',
        primaryCta: 'Создать карусель',
        secondaryCta: 'Смотреть примеры',
      };
      visualSlots = {
        heroCarouselImages: [
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
        ]
      };
    } else if (section.id === 'anchorNav') {
      copySlots = {
        navLabels: ['Как выглядит', 'Возможности', 'Как создать', 'Примеры', 'Сценарии', 'Вопросы'],
      };
      visualSlots = {};
    } else if (section.id === 'quickAnswer') {
      copySlots = {
        heading: 'Что такое бесшовная карусель?',
        body: 'Это формат поста, где визуальный фон или графика перетекают с одного слайда на другой. В Instagram это создает эффект единого пространства. GoToFlow генерирует последовательность связанных слайдов, так что вам не нужно ничего нарезать вручную.',
        contextualLink: 'Генератор каруселей',
      };
      visualSlots = {
        componentIcon: {
          type: 'componentRef',
          componentRef: 'component:SeoQuickAnswer.componentIcon',
          caption: 'Иконка информации',
          alt: 'Информация о бесшовной карусели',
        }
      };
    } else if (section.id === 'pageRelevantFormats') {
      copySlots = {
        sectionEyebrow: 'Популярные форматы',
        sectionHeading: 'Для каких задач подходит бесшовный дизайн',
        'item.title': ['Пошаговая инструкция', 'Экспертный разбор', 'История до/после', 'Продуктовый рассказ'],
        'item.body': [
          'Разберите сложную тему на шаги. Единая линия дизайна будет вести читателя от первого слайда к последнему.',
          'Оформите список советов так, чтобы каждый пункт визуально цеплялся за предыдущий.',
          'Покажите результат в едином полотне, не разрывая контекст.',
          'Проведите читателя через проблему, решение, детали предложения и следующий шаг.',
        ],
        'items.task': ['Исходный материал', 'Тип карусели', 'Визуальный стиль', 'Редактирование'],
        'items.template': ['Тема, текст, ссылка, видео, PDF или голосовое', 'Бесшовная карусель', 'AI-стиль или собственный промпт', 'Текст, слайды и CTA'],
        'items.structure': [
          'добавьте контекст и задачу карусели',
          'выберите визуальное продолжение между слайдами',
          'задайте направление, фон и персонажа',
          'проверьте, исправьте и перегенерируйте части результата',
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
          {
            type: 'componentRef',
            componentRef: 'component:SeoPageTemplateCategories.preview-4',
            caption: 'Превью презентации',
            alt: 'Пример шаблона презентации',
          },
        ],
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
        'heading.before': 'Как создать ',
        'heading.accent': 'бесшовную карусель ',
        'heading.after': 'в GoToFlow',
        description: 'Пройдите путь от исходного материала до готовых связанных слайдов, которые можно проверить, отредактировать и скачать.',
        stepOverrides: [
          'Добавить тему или исходный материал',
          'Выбрать бесшовный тип карусели',
          'Получить структуру связанных слайдов',
          'Отредактировать текст и дизайн',
          'Скачать готовую карусель'
        ],
        featureChips: ['AI-генерация текста', 'Визуальное продолжение', 'Формат 4:5'],
        cta: 'Начать создание',
      };
      visualSlots = {
        workflowSteps: [
          { type: 'componentRef', componentRef: 'component:FALLBACK_MOCKUPS.source-structure', caption: 'Шаг 1', alt: 'Выбор исходника' },
          { type: 'componentRef', componentRef: 'component:FALLBACK_MOCKUPS.text-review', caption: 'Шаг 2', alt: 'Выбор бесшовного типа' },
          { type: 'componentRef', componentRef: 'component:FALLBACK_MOCKUPS.visual-route', caption: 'Шаг 3', alt: 'Редактирование контента и дизайна' },
          { type: 'componentRef', componentRef: 'component:FALLBACK_MOCKUPS.visual-route', caption: 'Шаг 4', alt: 'Готовый результат из связанных слайдов' },
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
        eyebrow: 'Возможности',
        heading: 'Что можно настроить при создании бесшовной карусели',
        introCopy: 'GoToFlow создает бесшовную карусель из разных исходников, помогает выбрать визуальный стиль, настроить фон, персонажа и CTA.',
        'groups.title': [
          'Исходники',
          'Настройки дизайна',
          'Форматы и длина',
          'Ручное редактирование',
          'AI-структура',
          'Завершение'
        ],
        'groups.body': [
          'Тема, текст, ссылка, видео, PDF или голосовое.',
          'Шаблоны, AI-стили, фон и персонаж.',
          '4:5, 1:1, 9:16. От 5 до 10 слайдов.',
          'Проверка текста, перегенерация и правка.',
          'Автоматическое распределение по карточкам.',
          'Финальный CTA и призыв к действию.'
        ],
      };
      visualSlots = {
        capabilityIconCards: {
          type: 'componentRef',
          componentRef: 'component:SeoPageWorkflow.productCapabilities',
          caption: 'Сетка возможностей продукта',
          alt: 'Что можно настроить при создании карусели',
        },
      };
    } else if (section.id === 'readyCarouselShowcase') {
      copySlots = {
        sectionEyebrow: 'Полноценные примеры',
        sectionHeading: 'Посмотрите, какие карусели можно создать в GoToFlow',
        sectionBody: 'GoToFlow генерирует полностью готовые карусели для Instagram: с продуманной структурой, качественным текстом, бесшовными переходами и призывом к действию.',
        'item.title': ['Экспертная карусель о маркетинге', 'Пошаговый гайд по Reels', 'Сторителлинг о запуске бизнеса', 'Продуктовая презентация приложения', 'Чек-лист проверки сайта', 'Анонс продукта в карусели'],
        'item.body': [
          'Разбор сложной темы на 8 слайдах. Градиентный фон плавно объединяет советы в единую линию повествования.',
          'Инструкция из 6 шагов. Линии дизайна переходят со слайда на слайд, ведя взгляд подписчика от начала до CTA.',
          'Яркая визуальная история с крупным шрифтом и перетекающими фотографиями автора на 10 слайдах.',
          'Обзор функций нового сервиса на 5 слайдах. Элементы интерфейса пересекают границы слайдов для эффекта объема.',
          'Контрастная карусель из 7 слайдов. Каждый новый пункт визуально цепляется за предыдущий.',
          'Короткая продающая серия: кому подходит предложение, что входит и почему стоит перейти к следующему шагу.'
        ],
        'item.type': ['Экспертиза', 'Инструкция', 'Сторителлинг', 'Товар', 'Подборка', 'Анонс'],
        'item.audience': ['Предприниматели', 'Блогеры', 'Подписчики', 'Покупатели', 'Специалисты', 'Малый бизнес'],
        showcaseCta: 'Создать такую карусель',
      };
      visualSlots = {
        'items.image': [
          { type: 'image', assetPath: '/images/niches/ru/content-ru-2.webp', caption: 'Экспертная карусель', alt: 'Пример экспертной карусели в Instagram' },
          { type: 'image', assetPath: '/images/niches/ru/content-ru-3.webp', caption: 'Пошаговый гайд', alt: 'Пример гайда в виде бесшовной карусели' },
          { type: 'image', assetPath: '/images/niches/ru/content-ru-5.webp', caption: 'Сторителлинг', alt: 'Пример карусели-истории' },
          { type: 'image', assetPath: '/images/niches/ru/content-ru-6.webp', caption: 'Презентация продукта', alt: 'Пример продуктовой карусели' },
          { type: 'image', assetPath: '/images/niches/ru/content-ru-7.webp', caption: 'Чек-лист', alt: 'Пример чек-листа в Instagram' },
          { type: 'image', assetPath: '/images/niches/ru/content-ru-8.webp', caption: 'Анонс продукта', alt: 'Пример анонса продукта в карусели' },
        ]
      };
    } else if (section.id === 'pageSpecificVisualProof') {
      copySlots = {
        eyebrow: 'Доказательство сценария',
        title: 'Как выглядит бесшовная карусель в Instagram',
        description: 'В бесшовном режиме визуальные элементы плавно пересекают границы карточек. Это создает ощущение непрерывности при свайпе.',
        label: 'Бесшовная карусель',
        mode: 'Связанные слайды',
      };
      visualSlots = {
        images: [
          { type: 'image', assetPath: '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-1.webp', caption: 'Слайд 1', alt: 'Слайд 1 бесшовной карусели Instagram' },
          { type: 'image', assetPath: '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-2.webp', caption: 'Слайд 2', alt: 'Слайд 2 бесшовной карусели Instagram' },
          { type: 'image', assetPath: '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-3.webp', caption: 'Слайд 3', alt: 'Слайд 3 бесшовной карусели Instagram' },
          { type: 'image', assetPath: '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-4.webp', caption: 'Слайд 4', alt: 'Слайд 4 бесшовной карусели Instagram' },
          { type: 'image', assetPath: '/images/seo-handoffs/seamless-instagram-carousel/seamless-slide-5.webp', caption: 'Слайд 5', alt: 'Слайд 5 бесшовной карусели Instagram' },
        ],
      };
    } else if (section.id === 'useCases') {
      copySlots = {
        heading: 'Для каких задач подходит бесшовная карусель',
        'item.title': [
          'Пошаговый гайд',
          'История',
          'Кейс',
          'Продуктовая презентация',
          'Чек-лист',
          'Подборка',
          'Экспертный разбор',
          'Карусель доверия'
        ],
        'item.body': [
          'Каждый шаг получает отдельный слайд, а фон удерживает ощущение одного процесса.',
          'Историю запуска или изменения проекта можно показать как непрерывное движение.',
          'Исходная ситуация, процесс и результат выглядят связно.',
          'Функции и выгоды можно показать в одной связанной последовательности.',
          'Пункты остаются отдельными, но общая композиция делает подборку цельной.',
          'Идеи или ошибки можно разнести по слайдам и сохранить визуальный ритм.',
          'Единая визуальная линия помогает вести читателя от вводного тезиса к выводу.',
          'Отзывы и доказательства можно собрать в спокойную последовательность.'
        ],
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
        question: [
          'Что такое бесшовная карусель?',
          'Чем бесшовная карусель отличается от обычной?',
          'Как создать бесшовную карусель?',
          'Нужен ли дизайнер для создания?',
          'Нужно ли вручную соединять слайды?',
          'Нужно ли нарезать панораму в сторонних приложениях?',
          'Какие исходники поддерживаются?',
          'Сколько слайдов можно сделать в бесшовном формате?',
          'Какие форматы изображений поддерживаются?',
          'Можно ли редактировать готовый результат?',
          'Можно ли менять визуальный стиль и фон?',
          'Можно ли добавить призыв к действию (CTA)?',
          'Подходит ли этот формат для публикации в Instagram?',
          'Как скачать готовую карусель?',
          'Сколько времени занимает создание серии?',
          'Для каких задач подходит бесшовная карусель?'
        ],
        answer: [
          'Бесшовная карусель — это серия отдельных слайдов, где фон или визуальный мотив продолжаются между карточками, создавая ощущение единого пространства.',
          'В обычной карусели каждый слайд изолирован. В бесшовной версии визуальные элементы продолжаются между карточками и связывают серию.',
          'Загрузите исходный текст или тему в GoToFlow, выберите бесшовный тип, проверьте распределение текста по слайдам и скачайте результат.',
          'Нет. GoToFlow собирает структуру, тексты и визуальное направление автоматически с возможностью ручной правки.',
          'Нет. GoToFlow генерирует готовые связанные слайды. Вручную совмещать или выравнивать переходы не нужно.',
          'Нет. Внешняя нарезка изображения не требуется. GoToFlow выдает вам отдельные файлы-слайды, готовые к загрузке.',
          'Вы можете загрузить тему, готовый текст, ссылку на статью, видео, PDF или голосовое сообщение.',
          'Для Instagram-карусели в GoToFlow доступно от 5 до 10 слайдов в зависимости от объема исходного контента.',
          'GoToFlow поддерживает форматы 4:5, 1:1 и 9:16. Для Instagram обычно выбирают 4:5 или 1:1.',
          'Да. Вы можете редактировать тексты слайдов, перегенерировать части и вносить правки перед скачиванием.',
          'Да. Можно выбрать AI-стиль, настроить фон, добавить персонажа и изменить шрифтовое решение.',
          'Да. На финальный слайд можно добавить выделенный блок с призывом к действию (CTA) и вашими контактами.',
          'Да, готовые слайды идеально подходят для загрузки в ленту Instagram в виде карусели.',
          'После завершения редактирования нажмите кнопку скачивания — вы получите ZIP-архив с пронумерованными слайдами.',
          'Обычно создание занимает несколько минут: от ввода исходника до проверки и скачивания готовых слайдов.',
          'Формат подходит для экспертных гайдов, пошаговых инструкций, сторителлинга, кейсов, продуктовых презентаций и чек-листов.'
        ]
      };
      visualSlots = {
        accordionChevron: { type: 'componentRef', componentRef: 'component:SeoPageFAQ.chevron', caption: 'Стрелка вниз', alt: 'Развернуть ответ' }
      };
    } else if (section.id === 'related') {
      copySlots = {
        eyebrow: 'Связанные материалы',
        'relatedCard.title': ['Генератор каруселей', 'Бесшовная карусель в Instagram', 'Шаблоны каруселей'],
        'relatedCard.description': [
          'Основной инструмент для быстрого создания любых каруселей.',
          'Узнайте подробнее об эффекте визуального продолжения.',
          'Библиотека готовых структур и оформлений для постов.'
        ],
      };
      visualSlots = {
        relatedCardArrowIcon: { type: 'componentRef', componentRef: 'component:SeoPageRelatedLinks.arrow', caption: 'Стрелка', alt: 'Перейти к материалу' }
      };
    } else if (section.id === 'finalCta') {
      copySlots = {
        eyebrow: 'Начните сейчас',
        'heading.before': 'Создайте ',
        'heading.accent': 'бесшовную карусель',
        'heading.after': ' в GoToFlow',
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
    introCopy: 'GoToFlow создает бесшовную карусель из разных исходников, помогает выбрать визуальный стиль, настроить фон, персонажа и CTA.',
    groups: [
      { title: 'Исходники', body: 'Тема, текст, ссылка, видео, PDF или голосовое.' },
      { title: 'Настройки дизайна', body: 'Шаблоны, AI-стили, фон и персонаж.' },
      { title: 'Форматы и длина', body: '4:5, 1:1, 9:16. От 5 до 10 слайдов.' },
      { title: 'Ручное редактирование', body: 'Проверка текста, перегенерация и правка.' },
      { title: 'AI-структура', body: 'Автоматическое распределение по карточкам.' },
      { title: 'Завершение', body: 'Финальный CTA и призыв к действию.' }
    ],
    capabilityIds: SEO_REQUIRED_PRODUCT_CAPABILITY_IDS,
  },
  useCases: {
    required: true,
    componentName: 'SeoPageWorkflow',
    componentPath: 'src/components/seo/SeoPageWorkflow.jsx',
    items: [
      { title: 'Пошаговый гайд', body: 'Каждый шаг получает отдельный слайд, а фон удерживает ощущение одного процесса.' },
      { title: 'История', body: 'Историю запуска или изменения проекта можно показать как непрерывное движение.' },
      { title: 'Кейс', body: 'Исходная ситуация, процесс и результат выглядят связно.' },
      { title: 'Продуктовая презентация', body: 'Функции и выгоды можно показать в одной связанной последовательности.' },
      { title: 'Чек-лист', body: 'Пункты остаются отдельными, но общая композиция делает подборку цельной.' },
      { title: 'Подборка', body: 'Идеи или ошибки можно разнести по слайдам и сохранить визуальный ритм.' },
      { title: 'Экспертный разбор', body: 'Единая визуальная линия помогает вести читателя от вводного тезиса к выводу.' },
      { title: 'Карусель доверия', body: 'Отзывы и доказательства можно собрать в спокойную последовательность.' }
    ],
  },
  FAQ: [
    { question: 'Что такое бесшовная карусель?', answer: 'Бесшовная карусель — это серия отдельных слайдов, где фон или визуальный мотив продолжаются между карточками, создавая ощущение единого пространства.' },
    { question: 'Чем бесшовная карусель отличается от обычной?', answer: 'В обычной карусели каждый слайд изолирован. В бесшовной версии визуальные элементы продолжаются между карточками и связывают серию.' },
    { question: 'Как создать бесшовную карусель?', answer: 'Загрузите исходный текст или тему в GoToFlow, выберите бесшовный тип, проверьте распределение текста по слайдам и скачайте результат.' },
    { question: 'Нужен ли дизайнер для создания?', answer: 'Нет. GoToFlow собирает структуру, тексты и визуальное направление автоматически с возможностью ручной правки.' },
    { question: 'Нужно ли вручную соединять слайды?', answer: 'Нет. GoToFlow генерирует готовые связанные слайды. Вручную совмещать или выравнивать переходы не нужно.' },
    { question: 'Нужно ли нарезать панораму в сторонних приложениях?', answer: 'Нет. Внешняя нарезка изображения не требуется. GoToFlow выдает вам отдельные файлы-слайды, готовые к загрузке.' },
    { question: 'Какие исходники поддерживаются?', answer: 'Вы можете загрузить тему, готовый текст, ссылку на статью, видео, PDF или голосовое сообщение.' },
    { question: 'Сколько слайдов можно сделать в бесшовном формате?', answer: 'Для Instagram-карусели в GoToFlow доступно от 5 до 10 слайдов в зависимости от объема исходного контента.' },
    { question: 'Какие форматы изображений поддерживаются?', answer: 'GoToFlow поддерживает форматы 4:5, 1:1 и 9:16. Для Instagram обычно выбирают 4:5 или 1:1.' },
    { question: 'Можно ли редактировать готовый результат?', answer: 'Да. Вы можете редактировать тексты слайдов, перегенерировать части и вносить правки перед скачиванием.' },
    { question: 'Можно ли менять визуальный стиль и фон?', answer: 'Да. Можно выбрать AI-стиль, настроить фон, добавить персонажа и изменить шрифтовое решение.' },
    { question: 'Можно ли добавить призыв к действию (CTA)?', answer: 'Да. На финальный слайд можно добавить выделенный блок с призывом к действию (CTA) и вашими контактами.' },
    { question: 'Подходит ли этот формат для публикации в Instagram?', answer: 'Да, готовые слайды идеально подходят для загрузки в ленту Instagram в виде карусели.' },
    { question: 'Как скачать готовую карусель?', answer: 'После завершения редактирования нажмите кнопку скачивания — вы получите ZIP-архив с пронумерованными слайдами.' },
    { question: 'Сколько времени занимает создание серии?', answer: 'Обычно создание занимает несколько минут: от ввода исходника до проверки и скачивания готовых слайдов.' },
    { question: 'Для каких задач подходит бесшовная карусель?', answer: 'Формат подходит для экспертных гайдов, пошаговых инструкций, сторителлинга, кейсов, продуктовых презентаций и чек-листов.' }
  ],
  faqContract: {
    minimum: 12,
    maximum: 16,
    items: [
      { question: 'Что такое бесшовная карусель?', answer: 'Бесшовная карусель — это серия отдельных слайдов, где фон или визуальный мотив продолжаются между карточками, создавая ощущение единого пространства.' },
      { question: 'Чем бесшовная карусель отличается от обычной?', answer: 'В обычной карусели каждый слайд изолирован. В бесшовной версии визуальные элементы продолжаются между карточками и связывают серию.' },
      { question: 'Как создать бесшовную карусель?', answer: 'Загрузите исходный текст или тему в GoToFlow, выберите бесшовный тип, проверьте распределение текста по слайдам и скачайте результат.' },
      { question: 'Нужен ли дизайнер для создания?', answer: 'Нет. GoToFlow собирает структуру, тексты и визуальное направление автоматически с возможностью ручной правки.' },
      { question: 'Нужно ли вручную соединять слайды?', answer: 'Нет. GoToFlow генерирует готовые связанные слайды. Вручную совмещать или выравнивать переходы не нужно.' },
      { question: 'Нужно ли нарезать панораму в сторонних приложениях?', answer: 'Нет. Внешняя нарезка изображения не требуется. GoToFlow выдает вам отдельные файлы-слайды, готовые к загрузке.' },
      { question: 'Какие исходники поддерживаются?', answer: 'Вы можете загрузить тему, готовый текст, ссылку на статью, видео, PDF или голосовое сообщение.' },
      { question: 'Сколько слайдов можно сделать в бесшовном формате?', answer: 'Для Instagram-карусели в GoToFlow доступно от 5 до 10 слайдов в зависимости от объема исходного контента.' },
      { question: 'Какие форматы изображений поддерживаются?', answer: 'GoToFlow поддерживает форматы 4:5, 1:1 и 9:16. Для Instagram обычно выбирают 4:5 или 1:1.' },
      { question: 'Можно ли редактировать готовый результат?', answer: 'Да. Вы можете редактировать тексты слайдов, перегенерировать части и вносить правки перед скачиванием.' },
      { question: 'Можно ли менять визуальный стиль и фон?', answer: 'Да. Можно выбрать AI-стиль, настроить фон, добавить персонажа и изменить шрифтовое решение.' },
      { question: 'Можно ли добавить призыв к действию (CTA)?', answer: 'Да. На финальный слайд можно добавить выделенный блок с призывом к действию (CTA) и вашими контактами.' },
      { question: 'Подходит ли этот формат для публикации в Instagram?', answer: 'Да, готовые слайды идеально подходят для загрузки в ленту Instagram в виде карусели.' },
      { question: 'Как скачать готовую карусель?', answer: 'После завершения редактирования нажмите кнопку скачивания — вы получите ZIP-архив с пронумерованными слайдами.' },
      { question: 'Сколько времени занимает создание серии?', answer: 'Обычно создание занимает несколько минут: от ввода исходника до проверки и скачивания готовых слайдов.' },
      { question: 'Для каких задач подходит бесшовная карусель?', answer: 'Формат подходит для экспертных гайдов, пошаговых инструкций, сторителлинга, кейсов, продуктовых презентаций и чек-листов.' }
    ],
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
      introCopy: 'GoToFlow создает бесшовную карусель из разных исходников, помогает выбрать визуальный стиль, настроить фон, персонажа и CTA.',
    },
    canonicalReadyCarouselShowcase: {
      required: true,
      componentName: 'SeoReadyCarouselShowcase',
      componentPath: 'src/components/seo/template-page/SeoReadyCarouselShowcase.jsx',
      minimumExamples: 6,
      exactExamples: 6,
      examples: [
        { title: 'Экспертная карусель о маркетинге', assetPath: '/images/niches/ru/content-ru-2.webp' },
        { title: 'Пошаговый гайд по Reels', assetPath: '/images/niches/ru/content-ru-3.webp' },
        { title: 'Сторителлинг о запуске бизнеса', assetPath: '/images/niches/ru/content-ru-5.webp' },
        { title: 'Продуктовая презентация приложения', assetPath: '/images/niches/ru/content-ru-6.webp' },
        { title: 'Чек-лист проверки сайта', assetPath: '/images/niches/ru/content-ru-7.webp' },
        { title: 'Анонс продукта в карусели', assetPath: '/images/niches/ru/content-ru-8.webp' },
      ],
      assetPaths: [
        '/images/niches/ru/content-ru-2.webp',
        '/images/niches/ru/content-ru-3.webp',
        '/images/niches/ru/content-ru-5.webp',
        '/images/niches/ru/content-ru-6.webp',
        '/images/niches/ru/content-ru-7.webp',
        '/images/niches/ru/content-ru-8.webp',
      ],
      cta: 'Создать такую карусель',
    },
    pageSpecificVisualProof: {
      required: true,
      type: 'page_specific_result_carousel',
      componentName: 'SeoPageSpecificVisualProof',
      componentPath: 'src/components/seo/template-page/SeoPageSpecificVisualProof.jsx',
      dataSource: 'page.pageSpecificVisualProof',
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
