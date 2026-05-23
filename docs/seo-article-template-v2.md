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

## Callouts / anchors rules

Использовать короткие смысловые anchors только если они помогают чтению:

- Key takeaway
- Workflow insight
- Common mistake
- Best for
- Why this matters
- Prompt tip

Правила:
- не добавлять callouts ради декора;
- 1–2 callouts на длинные text-heavy зоны достаточно;
- callout должен брать смысл из текущего текста;
- не писать длинные новые тексты в callout.

## Final CTA rules

Final CTA обязателен.

Структура:
- вопрос / боль статьи;
- короткое обещание результата;
- основная кнопка;
- microcopy;
- отдельная muted secondary-link под карточкой на `#explore-more`.

Пример EN:
Title: `Still creating carousels manually?`
Description: `Turn a topic, link, video, or rough note into a structured Instagram carousel draft.`
Button: `Try GoToFlow For Free`
Microcopy: `Free — No credit card required`
Secondary link: `Explore more carousel tools and guides →`

Пример RU:
Title: `Всё ещё собираете карусели вручную?`
Description: `Превратите тему, ссылку, видео или заметки в структурированный черновик карусели.`
Button: `Попробовать GoToFlow бесплатно`
Microcopy: `Бесплатно — карта не нужна`
Secondary link: `Посмотреть другие инструменты и гайды →`

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

## Markdown heading styling rules

- Markdown H2 inside article body must not be plain white headings.
- H2 must use GoToFlow editorial styling: white base text + subtle pink/orange gradient on the meaningful part.
- Markdown H3 must have a smaller hierarchy with accent marker/glow-dot or subtle brand accent.
- Do not manually add HTML/className inside markdown to style headings.
- Heading styling belongs to MarkdownSeoArticleTemplateV2, not to individual articles.
- Long SEO titles must use adaptive sizing.
- Quick Answer title must be controlled via quickAnswerTitle or fallback to “What you need to know”.
- These are system-level rules for all future markdown SEO articles.

## CTA count rules

- Final CTA обязателен.
- Mid-article CTA допустимы, но не больше 2–3.
- Не добавлять CTA ради декора.
- Каждый CTA должен быть логично связан с предыдущим смысловым блоком.

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
