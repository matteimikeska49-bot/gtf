# GoToFlow SEO Publishing Platform

## Purpose

GoToFlow строит не генератор SEO-текстов, а систему массового производства качественных, полезных, индексируемых статей.

Главная цепочка:

topic
→ keyword / intent research
→ competitor / SERP analysis
→ content brief
→ unique article draft
→ template mapping
→ markdown / frontmatter
→ preview QA
→ build QA
→ publish
→ analytics / update

Главный принцип:

структура и дизайн — шаблонные;
содержание, angle, examples, FAQ, CTA, related links — уникальные под конкретный search intent.

Отдельно зафиксировать:
Не публиковать SEO-мусор.
Каждая статья должна закрывать конкретный intent и давать practical outcome.

---

## Current foundation

1. Эталонная визуальная статья:
   /blog/ai-instagram-carousel-generator

2. Rulebook шаблона:
   docs/seo-article-template-v2.md

3. Старые рабочие JSX-статьи нельзя трогать при создании markdown-engine:
   - /blog/ai-instagram-carousel-generator
   - /blog/how-to-make-linkedin-carousel-with-ai
   - /blog/best-ai-carousel-generators

4. Markdown-engine для новых статей должен создаваться рядом со старыми страницами, не ломая их.

## Implementation roadmap & Strategy

Вся стратегическая информация по roadmap, готовности системы, масштабированию, RU-адаптации и ассетам вынесена в отдельный документ:

👉 **[SEO Publishing Roadmap & Strategy](docs/seo-publishing-roadmap.md)**

## Content brief and topic map

- before generating an article, create/check a content brief;
- use `docs/seo-content-plan.md` to prevent duplicates and cannibalization;
- use `docs/seo-content-brief-template.md` before Gemini generation;
- batch publishing starts from topic map, not random topics.

## Batch manager

- batch publishing must use `docs/seo-batch-manager.md`;
- do not generate random batches without topic map and briefs;
- batches must pass quality gates before publishing;
- first production batch should be 5 articles maximum;
- each batch needs a batch QA report.

---

## QA & Deployment

### Automated publishing checks

Before publishing any article, you **MUST** run the automated publishing checks. This script validates frontmatter consistency, sitemap inclusion, missing fields, duplicate slugs, and internal links safety.

1. **Run full build** to generate the latest `dist/sitemap.xml` and prerender routes:
   `npm run build`
2. **Run blog checks**:
   `npm run check:blog`

**Check rules:**
- **P0 Errors** will block publishing (process exits with code 1). You must fix them.
- **Warnings** should be fixed based on priority but will not block CI. Missing freshness meta or internal links will trigger warnings.
- **Draft safety**: Draft/noindex articles must NOT appear in sitemap or blog index.
- **Link safety**: Internal `explore`, `finalCta`, and body links must not lead to draft articles or 404s.

Future articles are published purely through frontmatter updates, but only after passing the `npm run check:blog` checks.

### SEO indexability quality gate

**Главное правило:** Mass publishing is useless if articles are not indexable, crawlable, rendered correctly, and discoverable in search.

Before any article is published, it must pass indexability QA:

- `published:true`
- `noindex:false`
- correct canonical
- included in sitemap
- included in blog index/category page
- production URL returns 200
- curl/prerendered HTML contains real article content, not empty SPA fallback
- title/meta/description are unique and present
- robots.txt allows crawling and points to sitemap
- no links to draft/noindex pages
- no broken internal links
- no obvious keyword cannibalization
- article is not thin/generic AI content
- mobile rendering is safe
- after deploy: verify live URL, sitemap, canonical, noindex, and indexing status in Google Search Console / Yandex Webmaster when needed

**For RU:**
- correct `/ru/blog/...` URL architecture
- hreflang EN/RU
- RU canonical
- RU sitemap inclusion
- local RU intent, not literal EN translation

### Repeated callout QA

Правила:
- During content QA, reject articles where Gemini stacks 3+ callouts in a row.
- Before accepting a batch, scan all markdown articles in the batch for repeated callout stacks, not only the article currently being previewed.
- Convert repeated callouts into structured `:::cards` markdown blocks.
- Repeated callout labels create visual noise and reduce readability.
- `check:blog` warns on repeated callout stacks and unclosed `:::cards` blocks.
- test/template pages are allowed to show consecutive callout examples.
- This rule is important for mass publishing because AI often overuses decorative blocks.
### Production Build Verification

1. Topic selection
2. Keyword / intent research
3. Competitor / SERP analysis
4. Content brief
5. Unique article draft
6. Template mapping
7. Markdown / frontmatter
8. Preview QA
9. Build QA
10. Publish
11. Analytics / update

---

## Topic selection rules

Для каждой темы определять:

- primary keyword
- language
- cluster
- search intent
- audience
- business value
- product relevance
- funnel stage
- article type
- priority

Фокусные кластеры GoToFlow:

- LinkedIn carousel
- Instagram carousel
- AI carousel maker
- AI content generator
- Content repurposing
- Social media workflow
- Prompt libraries
- Best tools / comparisons
- Creator tools
- AI writing workflows

---

## Keyword and intent research rules

Перед написанием статьи агент должен понять:

- что пользователь ищет;
- какую задачу хочет решить;
- какой результат ожидает;
- какой формат ответа нужен;
- где GoToFlow помогает естественно.

Правило:
Статья должна закрывать intent уже в первой трети.

---

## Competitor / SERP analysis rules

Research-agent должен изучить конкурентов и определить:

- какие H2/H3 есть у топ-страниц;
- что они покрывают;
- какие FAQ повторяются;
- чего не хватает;
- какие examples/prompts/formats нужны;
- где конкуренты поверхностные;
- как встроить GoToFlow полезно, а не рекламно.

Правило:
Не копировать конкурентов.
Использовать анализ для coverage + unique angle.

---

## Content brief requirements

Без brief статью не писать.

Brief должен включать:

- primary keyword
- language
- search intent
- audience
- funnel stage
- article type
- priority
- user problem
- practical outcome
- GoToFlow product angle
- competitor coverage
- competitor gaps
- unique angle
- unique asset / value block
- H2/H3 structure
- Quick Answer
- step phases, if relevant
- prompts, if relevant
- formats / examples, if relevant
- common mistakes, if relevant
- FAQ
- related product links
- related guides
- Final CTA
- secondary CTA link text
- word count range
- requiresFreshResearch
- publication status

---

## Article writing rules

Статья должна быть:

- полезной;
- конкретной;
- readable;
- scan-friendly;
- product-led, но не рекламной;
- без воды;
- без generic AI phrasing;
- без keyword stuffing;
- не рерайтом конкурентов;
- не лендингом (не превращать SEO-статьи в агрессивные лендинги);
- с практическим результатом для пользователя.

Также:
- production article должен иметь visible freshness meta;
- каждая статья должна иметь 1–2 contextual internal links/product bridges, если релевантно intent;

Главный вопрос перед публикацией:

“Пользователь после чтения реально сможет что-то сделать?”

Если нет — статья не публикуется.

Запрещённые признаки:

- generic AI-water;
- одинаковые H2;
- переспам ключами;
- одинаковые examples;
- одинаковые CTA;
- одинаковые related links;
- текст без practical outcome.

---

## Word count rules

Не гнать объём ради объёма.

Рекомендации:

- Short how-to / answer: 6 000–10 000 знаков
- Guide: 10 000–18 000 знаков
- Comparison / best tools: 12 000–22 000 знаков
- Pillar article: 20 000–35 000 знаков

Главное:
закрыть intent, не добивать объём водой.

---

## Article type rules

Поддерживаемые articleType:

- how-to
- comparison
- best-tools
- ideas
- prompts
- alternatives
- definition
- pillar

Зачем:
разные типы требуют разной структуры, объёма, CTA, FAQ и optional blocks.

---

## Priority rules

Поддерживать priority:

- P0 — high-intent / money pages;
- P1 — важные кластерные статьи;
- P2 — supporting / long-tail статьи.

---

## Fresh research rules

Для нестабильных тем обязательно:

requiresFreshResearch: true

Это темы:

- best tools
- pricing
- alternatives
- comparisons
- 2026
- platform updates
- model/tool capabilities

Если requiresFreshResearch: true, писать без свежего поиска нельзя.

---

## Unique asset / unique value block

У каждой сильной статьи должен быть хотя бы один уникальный актив:

- prompt library
- checklist
- framework
- comparison table
- example carousel structure
- mistakes list
- workflow map
- scorecard
- template
- mini case

Brief должен содержать поле:
unique asset / unique value block

---

## Template mapping rules

Готовый текст раскладывается по GoToFlow SEO article template v2:

Hero
→ Intro / problem card
→ Quick Answer
→ Product-led workflow / bridge
→ Main explanation
→ Step-by-step phases, if relevant
→ Examples / formats grid, if relevant
→ Prompt accordion, if relevant
→ Common mistakes / pitfalls, if relevant
→ Conclusion
→ ArticleExploreZone / Related guides
→ FAQ
→ Final CTA

## Template-first visual rules

- During Stage 2C/markdown implementation, article markdown must stay clean content.
- Agents must not manually style headings or lists in markdown.
- Long lists should be solved through template list styling (e.g. subtle card rows for ordered lists).
- If a visual issue appears across heading/body rhythm, fix the template, not a single article.
- H1/H2/H3 and list styling is part of the reusable template.
- New articles should not introduce one-off visual classes.
- Product/related placement должен быть логичным:
  - mid-article CTA and related links are mandatory when relevant, but they must be separated by meaningful content;
  - final CTA does not replace contextual CTA;
  - related link blocks should support internal linking, not interrupt reading flow.
- Нельзя вставлять related block внутрь длинной библиотеки промптов или списков так, чтобы он ломал чтение.
- Template-first rule: если CTA выглядит неправильно (например, кнопка рендерится как inline-текст внутри абзаца), исправлять рендер в шаблоне (MarkdownSeoArticleTemplateV2.jsx), а не вручную стилизовать HTML/markdown внутри контента.
- If three or more articles need the same special structure (e.g. advanced prompt grouping), create an optional reusable block (like PromptGroupsBlock) later instead of one-off markup.
- Использовать Markdown callout blocks (`> [!type]`) для смысловых акцентов. Callouts помогают избежать text wall и должны использоваться как часть массового article template, но они не заменяют полноценную структуру статьи.

---

## Required article blocks

Описать обязательные блоки:

### Hero
- badge
- H1
- короткий description
- основной intent
- dark premium style

### Intro / problem card
Не голый текст.
Текст должен быть на dark premium подложке.

### Quick Answer
Обязателен в первой трети статьи:
- 4–5 коротких пунктов
- не дублирует step-by-step
- отвечает на intent
- может иметь Key takeaway
- не делать 8–10 карточек

### Main explanation
Не делать “белый текст на чёрном фоне простынёй”.
Разбивать на readable sections.

### Conclusion
Перед нижней зоной статьи.

### ArticleExploreZone
Обязателен.
id="explore-more"

### FAQ
Обязателен почти для всех SEO-статей.

### Final CTA
Последний смысловой блок перед footer.

---

## Optional article blocks library

Опциональные блоки — это библиотека, а не обязательный состав каждой статьи.

Правило:
В каждой статье выбирать максимум 2–4 optional blocks под search intent.
Не добавлять блоки ради красоты или длины.

Список optional blocks:

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

Добавить правила выбора:

How-to:
- Step phases
- Prompt accordion
- Checklist
- Common mistakes

Best tools / comparison:
- Comparison table
- Decision guide
- Use-case cards
- Proof block if real data exists

Prompts:
- Copy-ready snippets
- Prompt accordion
- Before / After
- Checklist

Ideas / hooks:
- Examples grid
- Copy-ready snippets
- Carousel example gallery
- Checklist

Product / workflow:
- Product workflow mockup
- Manual vs GoToFlow
- Mini case / example result
- Use-case cards

---

## Social proof / testimonials rules

Testimonials можно использовать только если:

- отзыв реальный;
- есть разрешение;
- релевантен теме;
- не выглядит фейком;
- статья ближе к выбору инструмента / покупке.

Нельзя придумывать отзывы.

Если реальных отзывов нет, использовать:
- mini case
- example result
- workflow comparison

---

## Blog / Content Hub rules

Нужна видимая база материалов:

- /blog
- category / hub pages
- Explore GoToFlow guides blocks
- Learn more blocks на продуктовых страницах
- content hub blocks в нижних зонах статей

Направления:

- AI Carousel Guides
- LinkedIn Carousel Guides
- Instagram Content Ideas
- AI Content Workflow
- Prompt Libraries
- Best Tools

Правило:
Блог не должен быть набором разрозненных URL.

---

## Mockup / approved asset registry

Смысл:
- articles should use mockups only from registry;
- no random screenshots;
- language must match article language;
- no third-party social feeds in public SEO articles;
- if no approved asset fits intent, skip mockup;
- future articles should reference assets by id;
- check:blog validates registry.

Папки:
- `public/assets/blog/mockups/ru/`
- `public/assets/blog/mockups/en/`

Registry:
`src/content/blog/mockups/registry.json`

---

## Product-led visual blocks

В шаблоне должны поддерживаться optional visual blocks:

- product workflow mockup
- carousel example gallery
- before/after comparison
- prompt library preview
- checklist/downloadable-style block
- mini table/comparison
- examples grid
- use-case cards
- screenshots/mockups with captions
- related carousel examples near bottom

Использовать только если усиливает intent статьи.

---

## Internal linking rules

В каждой статье обязателен:

ArticleExploreZone
id="explore-more"

Порядок:

Conclusion
→ ArticleExploreZone
→ FAQ
→ Final CTA

Внутри:
- related product/tool links
- related guides

Правила:
- ссылки подбираются под intent статьи;
- не копировать один набор во все статьи;
- проверять routes;
- не вести на 404;
- не вести на drafts;
- не добавлять нерелевантные ссылки ради SEO;
- не добавлять ссылки после Final CTA.

---

## Final CTA rules

Структура:

- вопрос / боль статьи
- короткое обещание результата
- основная кнопка
- microcopy
- secondary muted link на #explore-more

Secondary link:
href="#explore-more"

CTA адаптируется под:
- язык
- тему
- intent
- product angle

Один и тот же CTA не копировать во все статьи.

---

## EN/RU adaptation rules

👉 **[RU/EN Blog Architecture Decision](docs/ru-en-blog-architecture.md)**

RU/EN articles must follow architecture doc;
RU content is adaptation, not literal translation;
canonical/hreflang/indexability are P0 quality gates.

EN:
- international SaaS tone
- headings на английском
- CTA на английском
- FAQ на английском
- microcopy на английском
- без русских кальк

RU:
- не дословный перевод EN
- RU search intent
- русские формулировки
- RU CTA
- RU FAQ
- RU examples
- естественная подача
- microcopy на русском

---

## LLM / AI-search readiness

Для LLM/AI Search закладывать:

- direct answer вверху
- ясные H2/H3
- FAQ
- definitions
- step-by-step
- списки
- tables/comparisons
- examples
- prompts
- clear entity mentions
- internal links

Сущности:
- GoToFlow
- AI carousel maker
- LinkedIn carousel
- Instagram carousel
- AI content generator
- content workflow

---

## Markdown / frontmatter rules

Новые статьи:

src/content/blog/articles/article-slug.md

Frontmatter = паспорт статьи.

Обязательные поля:

- title
- slug
- language
- description
- primaryKeyword
- searchIntent
- cluster
- articleType
- priority
- published
- noindex
- canonical
- createdAt
- updatedAt
- lastReviewed
- quickAnswer
- faq
- explore
- finalCta

Опциональные поля:

- secondaryKeywords
- category
- funnelStage
- audience
- keyTakeaway
- steps
- prompts
- formats
- mistakes
- comparison
- workflow
- examples
- ogImage
- hreflang
- reviewFrequency
- requiresFreshResearch
- uniqueAsset
- batchId
- mockups

---

## Published / noindex rules

Черновики и тесты:

published: false
noindex: true

Готовые статьи:

published: true
noindex: false

Правила:
- unpublished не попадает в sitemap;
- unpublished не попадает в /blog;
- unpublished не попадает в related links;
- unpublished не попадает в category pages;
- test pages не индексируются.

---

## “Deserves indexing?” check

Перед publication:

“Эта статья заслуживает быть в индексе?”

Если нет:
published: false
noindex: true

---

## Sitemap rules

Сразу заложить:

- sitemap.xml
- sitemap-blog.xml
- sitemap-pages.xml

Позже:

- sitemap-index.xml
- sitemap-blog-1.xml
- sitemap-blog-2.xml

В sitemap попадают только:

published: true
noindex: false

---

## Canonical rules

У каждой статьи уникальный canonical:

https://gotoflow.io/blog/slug

Нельзя:
- одинаковый canonical у разных статей;
- canonical на test/draft;
- canonical на несуществующий URL;
- canonical на неправильный язык.

---

## Hreflang / localization rules

Если есть EN/RU версии одной темы:

/blog/how-to-make-linkedin-carousel-with-ai
/ru/blog/kak-sdelat-linkedin-karusel-s-ai

Нужно:
- EN canonical на EN;
- RU canonical на RU;
- hreflang связи;
- RU как локальная адаптация, не перевод.

---

## Blog index / categories / pagination

Нужны:

- /blog
- /blog/category/linkedin-carousel
- /blog/category/instagram-carousel
- /blog/category/ai-content-generator
- /blog/page/2

Category/tag pages должны быть под контролем и не становиться thin pages.

---

## Tag policy

Не плодить 200 тегов.

Правило:
теги только если они реально нужны для навигации.

Tag pages не должны быть thin pages.

---

## Content inventory

Нужен реестр:

docs/seo-content-plan.md

или таблица.

Поля:
- keyword
- slug
- language
- cluster
- intent
- articleType
- priority
- status
- published
- noindex
- canonical
- related links
- lastReviewed
- performance
- batchId

Статусы:
- idea
- research
- brief ready
- draft ready
- markdown ready
- preview checked
- published
- needs update
- archived
- merged
- redirected

---

## Topic clusters

Кластеры обязательны:

- LinkedIn carousel
- Instagram carousel
- AI carousel maker
- AI content generator
- Content repurposing
- Social media workflow
- Prompt libraries
- Best tools / comparisons

---

## Anti-duplicate / cannibalization rules

Перед созданием статьи проверять:

- похожий slug
- похожий primary keyword
- похожий intent
- похожая статья в кластере

Правило:
один главный intent = одна главная статья.

Остальные — supporting articles с другим углом.

---

## No orphan pages rules

Ни одна опубликованная статья не должна быть сиротой.

У каждой опубликованной статьи должны быть входящие ссылки:

- /blog
- category page
- related guides
- sitemap
- hub/pillar page, если есть

---

## Link checker rules

Перед публикацией пачки проверять:

- internal links
- CTA links
- ArticleExploreZone links
- anchors
- canonical URLs
- sitemap URLs
- draft/noindex links

Запрещено:
- links на 404
- links на drafts
- links на localhost
- broken anchors
- links после Final CTA

---

## Prerender / curl HTML check

Проверять HTML:

curl -L https://gotoflow.io/blog/slug

В HTML должно быть:
- title
- h1
- meta description
- canonical
- article body
- FAQ
- CTA / explore content

---

## Build / performance rules

При 1000+ статьях следить:

- build time
- bundle size
- markdown parsing не в runtime
- не грузить весь article index на каждую страницу
- lazy loading
- image optimization
- prerender stability

---

## Images / OG rules

Для статей нужны:

- default OG image
- custom OG для важных статей
- WebP/JPEG optimization
- alt text
- fallback, если изображения нет
- не грузить тяжёлые картинки

---

## Update policy / content decay

Поля:

- createdAt
- updatedAt
- lastReviewed
- reviewFrequency

Чаще обновлять:
- best tools
- pricing
- alternatives
- comparisons
- 2026
- platform features

---

## Archive / merge / redirect rules

Статусы:

- archived
- merged
- redirected

Если статья удаляется или объединяется:

старый URL → 301 → новый URL

Нельзя просто удалять страницы.

---

## Analytics rules

Отслеживать:

- Google Search Console
- Yandex Webmaster
- GA / Метрика
- impressions
- clicks
- CTR
- average position
- page views
- scroll depth
- CTA clicks
- ArticleExploreZone clicks
- registrations/trials
- cluster performance

---

## CI / quality gates

Нужны команды:

- npm run build
- npm run check:links
- npm run check:sitemap
- npm run check:blog
- npm run check:duplicates

Проверять:
- duplicate slugs
- missing title/meta
- missing canonical
- broken internal links
- draft in sitemap
- noindex true у published
- related links на draft
- missing FAQ
- missing Final CTA
- missing Quick Answer
- missing freshness meta (lastReviewed/updatedAt/createdAt) and valid date formats
- missing contextual CTA (> [!product] / > [!related]) in guide/how-to/prompts articles
- horizontal overflow
- mobile issues
- test pages in index
- published false in sitemap

---

## Batch publishing rules

Не всё, что сгенерировано, публикуется.

Пачка проходит:

- research QA
- brief QA
- content QA
- markdown QA
- build
- preview
- link check
- sitemap check
- mobile spot check
- commit/push

Масштабирование:

1 тест
→ 3 статьи
→ 5 статей
→ 10 статей
→ 20 статей

Если production берёт dist, после build обязательно коммитить dist.

---

## Batch ID / rollback

Каждой пачке давать ID:

batch-YYYY-MM-DD-001

Фиксировать, какие статьи вошли.

Если пачка плохая или сломала сайт — проще откатить.

---

## Gemini article generation workflow

1. Research / brief.
2. Gemini generates draft markdown using:
   `docs/gemini-seo-article-generation-prompt.md`
3. Code-agent saves markdown file as draft:
   published: false
   noindex: true
4. Run:
   npm run build
   npm run check:blog
5. Open preview URL.
6. Human visual/content QA.
7. Only after approval:
   published: true
   noindex: false
   npm run build
   npm run check:blog
   commit/push.

## Roles / model usage

Gemini:
- research;
- brief;
- draft article;
- semantic structure;
- FAQ;
- callouts;
- internal links.

Code-agent:
- save file;
- route/build/check;
- preview;
- publish;
- commit/push.

Human:
- approve topic/brief;
- visual QA;
- final publish approval.

Без платного Claude:

Research / SERP / competitors:
Gemini Pro / Deep Research

Brief:
Gemini Pro

Draft:
Gemini Pro / GPT

Editorial polish:
GPT

Markdown / build / commit:
Codex / code-agent

Нельзя одной модели давать:

research → 20 статей → markdown → build → push

Процесс делится на этапы.

---

## What agents must NOT do

Запрещено:

- придумывать новый дизайн под каждую статью;
- трогать старые рабочие статьи при создании markdown-engine;
- удалять тексты;
- менять slug без причины;
- менять SEO/meta/schema без причины;
- публиковать без brief;
- публиковать без build;
- вести на 404;
- вести на drafts;
- делать prompts стеной;
- делать 5+ колонок в текстовых карточках;
- делать белый блог;
- добавлять >3 mid-article CTA;
- добавлять блоки после Final CTA;
- ломать getAppUrlWithRef;
- забывать dist, если production берёт dist;
- делать 100 статей сразу без QA.

---

## Markdown tables

- comparison articles can include compact markdown tables;
- table support is template-level;
- do not replace tables with plain text manually unless table is too large;
- avoid massive tables in SEO articles.

## Automated Link & Cannibalization Checks
Refer to `docs/seo-batch-manager.md` for rules on Route/internal link checking and Anti-cannibalization checks.
