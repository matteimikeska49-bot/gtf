# GoToFlow SEO Article Template v2

## Purpose

Этот шаблон нужен для массовой публикации EN/RU SEO-статей GoToFlow.
Цель — быстро выпускать много статей по единому dark premium product-led editorial шаблону без ручного редизайна каждой страницы.

Эталонная страница:
`/blog/ai-instagram-carousel-generator`

## Core principles

- Не делать уникальный дизайн под каждую статью.
- Использовать reusable article patterns.
- Сначала мапить готовый текст по блокам шаблона.
- Структура должна быть scan-friendly.
- Статья не должна выглядеть как “white text on black”.
- Статья не должна превращаться в лендинг.
- Product-led блоки должны быть встроены естественно.
- EN/RU версии должны использовать один паттерн, но тексты CTA и блоков адаптируются под язык и intent статьи.

## Required article structure

1. Hero
2. Intro / problem card
3. Quick Answer
4. Product-led workflow / bridge
5. Main explanation sections
6. Step-by-step section, if relevant
7. Examples / formats / use cases, if relevant
8. Prompt examples, if relevant
9. Common mistakes / pitfalls, if relevant
10. Conclusion
11. What else / Related guides
12. FAQ
13. Final CTA

## Bottom funnel

Всегда сохранять порядок:

Conclusion
→ What else / Related guides
→ FAQ
→ Final CTA

Final CTA должен быть последним смысловым блоком перед footer.

Не добавлять ссылки или новые блоки после Final CTA.

Допускается маленькая muted secondary-link под CTA-card, которая ведёт на `#explore-more`.

## Quick Answer rules

Quick Answer обязателен в первой трети статьи.

Правила:
- 4–5 коротких пунктов максимум.
- Не дублировать полноценный step-by-step.
- Должен быстро отвечать на поисковый intent.
- Может содержать короткий Key takeaway.
- Не превращать в длинный список карточек.

## Step-by-step rules

Если шагов больше 5, группировать по фазам.

Пример фаз:
- Define
- Structure
- Write
- Refine

Или смысловой аналог под тему статьи.

Нельзя:
- делать 7–10 одинаковых шагов подряд без фаз;
- дублировать Quick Answer;
- превращать step-by-step в длинную простыню.

## Repeated editorial sections (Cards)

Правила:
- Callouts are accents, not a layout system for every repeated item.
- Avoid 3+ consecutive callouts in production articles.
- For repeated mistakes, tips, takeaways, best-for items, or workflow insights (3+ items), use the `:::cards` markdown block instead of stacked callouts or plain H3s.
- This renders a premium compact grid of cards, rather than large repeated callout labels.
- Allowed card types: `mistakes`, `tips`, `takeaways`, `workflow`, `best-for`, `examples`, `checklist`, `pros-cons`, `default`.
- Product and related callouts should remain contextual and separated by meaningful content outside of `:::cards`.

Синтаксис:
```markdown
:::cards
type: mistakes

### 1. Title
Text content.

### 2. Title
Text content.
:::
```

## Prompt examples rules

Если в статье есть промпты, не выводить их длинной стеной.

Использовать:
- accordion;
- tabs;
- show more;
- compact prompt library.

Правила:
- первый prompt можно открыть;
- остальные свернуть;
- prompts должны оставаться полезными и читабельными;
- не превращать блок в техническую документацию.

## Examples / formats rules

Если есть форматы, типы, use cases или examples, использовать compact grid / bento.

Правила:
- максимум 4 колонки для текстовых карточек на wide desktop;
- 5+ колонок запрещены;
- mobile должен быть 1 колонка;
- карточки должны быть читаемыми;
- не делать длинную однообразную ленту.

## Markdown callout blocks

Использовать callouts только для смысловых акцентов.
Синтаксис:

> [!takeaway]
> This is a key takeaway.

> [!why]
> This is why it matters.

> [!mistake]
> This is a common mistake.

> [!tip]
> This is a pro tip.

> [!workflow]
> This is a workflow insight.

> [!bestfor]
> This is who it is best for.

> [!product]
> **Turn this into a carousel faster**
> Use GoToFlow to turn rough ideas into structured carousel drafts.
> [Try LinkedIn Carousel Maker](/linkedin-carousel-maker)

> [!related]
> **Read next**
> Learn the full process here: [How to make a LinkedIn carousel with AI](/blog/how-to-make-linkedin-carousel-with-ai)

Правила:
- использовать callouts только для смысловых акцентов;
- product callout = contextual product bridge;
  - `[!product]` должен иметь структуру: 1. bold title; 2. description; 3. standalone CTA link последней строкой.
  - шаблон рендерит standalone CTA link как button/pill (не inline в середине предложения).
- related callout = internal linking bridge;
  - `[!related]` имеет структуру: 1. optional bold title; 2. body text with inline link.
  - визуально более спокойный, чем product.
  - related block не должен разрывать длинные библиотеки/списки/Prompt Groups.
- product и related blocks нельзя ставить подряд.
  - между ними должен быть meaningful content (H2/H3 section, крупный блок, список).
  - product CTA лучше ставить в первой трети статьи (как product bridge).
  - related block лучше ставить после крупного смыслового блока, перед примерами, или перед common mistakes (но не сразу после product CTA).
- не больше 1–2 mid-article CTA/related blocks;
- не ставить после каждого раздела;
- не заменяет ArticleExploreZone и Final CTA;
- не больше 1 callout на 2–3 секции;
- не использовать HTML/className в markdown;
- если новый тип нужен в 3+ статьях — добавлять в шаблон (parseMarkdownBlocks).
- обычный blockquote `> ` без тега рендерится как стандартная цитата.

## Final CTA rules

Final CTA обязателен.

Структура:
- title: вопрос / боль статьи;
- text: короткое обещание результата (не использовать description);
- buttonText: основная кнопка;
- href: основной URL для CTA (обязателен);
- microcopy: пояснение снизу;
- secondaryText: отдельная muted secondary-link под карточкой;
- secondaryHref: ссылка для secondaryText (например, `#explore-more`).

Пример EN:
title: `Still creating carousels manually?`
text: `Turn a topic, link, video, or rough note into a structured Instagram carousel draft.`
buttonText: `Try GoToFlow For Free`
href: `/linkedin-carousel-maker`
microcopy: `Free — No credit card required`
secondaryText: `Explore more carousel tools and guides →`
secondaryHref: `#explore-more`

Пример RU:
title: `Всё ещё собираете карусели вручную?`
text: `Превратите тему, ссылку, видео или заметки в структурированный черновик карусели.`
buttonText: `Попробовать GoToFlow бесплатно`
href: `/ru/generator-karuselej-linkedin`
microcopy: `Бесплатно — карта не нужна`
secondaryText: `Посмотреть другие инструменты и гайды →`
secondaryHref: `#explore-more`

Правила:
- CTA-текст адаптируется под тему статьи;
- CTA-текст адаптируется под язык статьи;
- не копировать дословно один CTA во все статьи;
- дизайн CTA остаётся единым;
- CTA должен использовать корректную app/ref логику через существующую функцию, если она используется в проекте.

## Explore / Related rules

Блок `What else / Related guides` должен быть до FAQ и Final CTA.

Правила:
- использовать только реальные существующие routes;
- не вести на 404;
- не вести на черновики;
- product links должны быть релевантны статье;
- related guides должны помогать продолжить чтение;
- блок не должен выглядеть как свалка ссылок.

## EN/RU adaptation rules

Один шаблон — разные тексты.

Для EN:
- headings, CTA, FAQ, microcopy на английском;
- links и tool labels под EN intent.

Для RU:
- headings, CTA, FAQ, microcopy на русском;
- CTA и secondary-link адаптируются под русскоязычный intent;
- не оставлять английский текст в RU-статье, кроме названий брендов и терминов, где это уместно.

### RU Meta Disclaimer Rule
- для RU-статей Gemini может использовать слова Instagram / Facebook / Meta / Инстаграм / Фейсбук / Мета только когда это нужно по смыслу;
- Gemini **НЕ должен** вручную вставлять юридическую сноску (disclaimer) в markdown;
- шаблон автоматически добавляет RU-only legal footnote (маленькая сноска "Instagram и Facebook принадлежат Meta...");
- для EN-страниц сноска не добавляется;
- generic mentions типа “соцсети”, “social media” не требуют сноски.

## Visual style

Стиль:
- GoToFlow dark premium editorial;
- dark section-level backgrounds;
- тонкие borders;
- мягкие radial glows;
- pink/orange только как фирменные акценты;
- readable body text;
- premium SaaS editorial feel.

Запрещено:
- белый блог;
- серо-белые секции;
- random purple/neon;
- кислотные акценты;
- лендинговая перегрузка;
- horizontal overflow.

## Markdown heading and list styling rules

- Markdown H2 inside article body must not be plain white headings.
- H2 must use GoToFlow editorial styling: white base text + subtle pink/orange gradient on the meaningful part.
- Markdown H3 must have a smaller hierarchy with accent marker/glow-dot or subtle brand accent.
- Ordered lists (`<ol>`) in markdown body render as subtle card rows to prevent long text walls.
- Use ordered lists for prompts, steps, examples, and workflows.
- Do not manually add HTML/className inside markdown to style headings or lists.
- Styling belongs to MarkdownSeoArticleTemplateV2, not to individual articles.
- Long SEO titles must use adaptive sizing.
- Quick Answer title must be controlled via quickAnswerTitle or fallback to “What you need to know”.
- These are system-level rules for all future markdown SEO articles.

## Article freshness block

Использовать `lastReviewed`, `updatedAt`, `createdAt` в frontmatter.
Hero показывает `Reviewed/Updated/Published Month YYYY`.
Для fresh topics `lastReviewed` обязателен.
Также генерируется `ArticleFreshnessBlock` перед началом контента, который объясняет пользователю актуальность информации.

## Contextual CTA and related links

Production-ready статьи (guide, how-to, prompts, comparison и т.д.) должны содержать контекстные блоки:
- `> [!product]` - продуктовый CTA в первой трети статьи (обычно после первой значимой секции).
- `> [!related]` - рекомендация прочитать связанную статью, ближе к середине или концу статьи.

Эти блоки не заменяют Final CTA, а служат для контекстной навигации.
Автоматический чекер `check:blog` будет выдавать warning, если этих блоков нет в production-статье.

## 8. Requirements for Automated Publishing

All markdown articles must pass the automated publishing checks before they can be deployed to production.

- Run `npm run check:blog` to validate your article.
- **P0 Errors** (e.g. missing `slug`, duplicate `slug`, canonical mismatch, draft appearing in sitemap, or broken links) will block publication.
- **Warnings** (e.g. missing `faq`, `explore`, `finalCta`, missing freshness meta, missing internal links) should be fixed to ensure maximum SEO quality.
- **Related Links**: Any links in `explore` or `finalCta` or markdown body must be valid internal paths (starting with `/` or `https://gotoflow.io/`) and must NOT point to draft or 404 pages. `#explore-more` is allowed for secondary links.

All required frontmatter keys must remain compatible with production checks.

## 9. Conclusion

This V2 markdown system enforces:
1. Hard boundaries between Markdown (content) and JSX (design).

## CTA count rules

- Final CTA обязателен.
- Mid-article CTA допустимы, но не больше 2–3.
- Не добавлять CTA ради декора.
- Каждый CTA должен быть логично связан с предыдущим смысловым блоком.

## Gemini article generation prompt

Для создания новых markdown SEO-статей использовать:
`docs/gemini-seo-article-generation-prompt.md`

- Gemini output must pass: `npm run check:blog`
- markdown не должен содержать HTML/className;
- frontmatter должен соответствовать текущим файлам в `src/content/blog/articles`;
- callout placement rules обязательны;
- product/related/freshness/finalCta/explore/FAQ должны соответствовать шаблону.

## Future agent workflow

Перед созданием новой статьи агент должен:

1. Взять готовый текст.
2. Разложить его по блокам шаблона.
3. Определить:
   - Hero;
   - Intro/problem;
   - Quick Answer;
   - main sections;
   - step phases;
   - prompts;
   - formats/examples;
   - mistakes;
   - FAQ;
   - related links;
   - Final CTA.
4. Использовать существующие reusable patterns.
5. Не придумывать новый дизайн.
6. Проверить routes для всех links.
7. Проверить build.
8. Проверить mobile и horizontal overflow.

## What future agents must NOT do

- Не делать уникальный дизайн под каждую статью.
- Не дублировать Quick Answer и step-by-step.
- Не делать 7–10 шагов без фаз.
- Не выводить prompts стеной.
- Не использовать 5+ колонок для текстовых карточек.
- Не добавлять >3 mid-article CTA.
- Не добавлять ссылки после Final CTA.
- Не вести на 404 или черновики.
- Не ломать getAppUrlWithRef / referral logic.
- Не делать horizontal scroll.
- Не превращать статью в лендинг.
- Не делать белый/серый блог.

## Relationship with blog-production-system.md

This file describes the visual and structural GoToFlow SEO article template v2.
The full production workflow is documented in docs/blog-production-system.md.

Before creating or publishing a new SEO article, agents must read both:

1. docs/blog-production-system.md
2. docs/seo-article-template-v2.md

## Markdown publishing workflow

- новые статьи будут жить в src/content/blog/articles/
- markdown frontmatter управляет SEO, template blocks, related links, CTA, published/noindex
- test/draft articles must use published: false and noindex: true
- only published: true and noindex: false can appear in sitemap/blog/category pages
- ArticleExploreZone must use id="explore-more"
- Final CTA secondary link must point to #explore-more
- EN/RU fields must be localized

## Optional blocks library

Use only 2–4 optional blocks per article based on intent. Do not add blocks just for visual decoration or word count.
- Product workflow mockup
- Carousel example gallery
- Before / After block
- Prompt library preview
- Checklist block
- Comparison table
- Use-case cards
- Mistakes / pitfalls cards
- Mini framework block
- Related examples near bottom
- Proof / Social proof block
- Mini case / Example result block
- What you’ll get block
- Who this is for block
- When not to use this block
- Manual vs GoToFlow workflow
- Decision guide
- Copy-ready snippets
- Glossary / Definitions
- Screenshots/mockups with captions

## Mockup / screenshot registry

- mockups are selected only from approved registry
- no random images from folders
- metadata required: id, path, language, topic, suitableFor, alt, caption, priority, status
- if no approved asset matches the article intent, do not insert a random image

## Blog/content hub requirement

- blog should not be isolated pages
- /blog, category pages, article related links, and product page content hub blocks must help users discover related guides and tools

## Markdown tables

Правила:
- comparison articles may use markdown tables;
- tables are rendered by the template as scroll-safe dark premium tables;
- tables should be compact;
- avoid huge 6+ column tables;
- use tables for comparisons only when they improve scanning;
- on mobile, tables scroll inside their wrapper.

### Prompts component (:::prompts)

Для вставки нескольких связанных промптов:

```markdown
:::prompts
### Заголовок промпта 1
\`\`\`text
Ваш текст промпта
\`\`\`

### Заголовок промпта 2
\`\`\`text
Ваш текст промпта 2
\`\`\`
:::
```
Это генерирует компонент MarkdownPromptsBlock (accordion format), который поддерживает перенос строк, компактное отображение на мобильных и убирает горизонтальный скролл для длинных промптов.

## Mockup placement rules
- Мокапы не вставляются в каждую статью автоматически.
- Мокап вставляется только там, где он усиливает смысл блока.
- Gemini НЕ выбирает asset, path, image, language, layout. Gemini выбирает только смысловой slot.
- Preferred mockup syntax теперь slot-level:
  - `:::mockup{slot="topic-input"}`
  - `:::mockup{slot="result-preview"}`
  - `:::mockup{slot="format-settings"}`
  - `:::mockup{slot="style-choice"}`
- Для product-led how-to статей про создание карусели/поста/контента рекомендуется 2–4 мокапа:
  1. `slot="topic-input"` после блока про ввод темы/текста;
  2. `slot="result-preview"` после блока про результат/готовую карусель;
  3. `slot="format-settings"` после блока про формат/экспорт;
  4. `slot="style-choice"` после блока про визуальный стиль.
- Для comparison/best-tools статей обычно 0–1 product mockup, только если есть product-led section.
- Для prompt-library статей обычно 0–1 mockup, если он показывает, куда вставлять prompt/result.
- Для ideas/formats обычно 0–2 slots по смыслу.
- Старый формат `type="..." layout="..."` считается deprecated/legacy, но временно поддерживается. Использовать его в новых статьях не рекомендуется.
- Нельзя вставлять случайный mockup без смысловой связи с текстом.
- Нельзя использовать markdown image syntax или hardcoded image paths.
- RU/EN isolation строго соблюдается шаблоном: RU article gets RU mockups, EN article gets EN mockups.

### Native mockup rules for generated articles

- Mockup is not a hero decoration. It must explain a workflow, result preview, example, comparison, before/after, or concrete step.
- Insert mockups only with `:::mockup{slot="..."}` in the exact section where the visual helps the reader understand the point.
- RU articles must use RU approved assets only. EN articles must use EN approved assets only.
- Visual/how-to/comparison/example articles must include native mockup slots unless `mockupStatus: "not_available"` and a meaningful `mockupReason` explain why no approved asset fits.
- Avoid repeating the same asset across many articles in one batch. If the checker warns about repeated assets, request or approve a more specific native mockup before scaling.
- If no exact asset exists for the article cluster/type, prefer `mockupStatus: "not_available"` plus a reason over forcing an irrelevant visual.
- For Wave 2 and later, every brief must explicitly decide: mockup required yes/no, slot(s), purpose, placement section, and fallback allowed yes/no.

### Required Publishing Checks

Для любых изменений в:
- markdown template;
- article blocks;
- mockup system;
- article draft;
- Explore/CTA/FAQ;

обязательно запускать:
```bash
npm run check:blog
npm run build
npm run check:blog:render
npm run check:blog:visual
```
И сохранять/прикладывать screenshots/report из:
`tmp/blog-visual-qa/`

Агент не имеет права писать “визуально всё ок”, если не запустил `check:blog:visual`.
