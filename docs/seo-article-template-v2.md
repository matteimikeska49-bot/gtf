# GoToFlow SEO Article Template v2

## Purpose

Этот шаблон нужен для массовой публикации EN/RU SEO-статей GoToFlow.
Цель — быстро выпускать много статей по единому dark premium product-led editorial шаблону без ручного редизайна каждой страницы.

Эталонная страница:
`/blog/ai-instagram-carousel-generator`

## Mandatory release contract

Before committing or pushing any new or edited SEO article, run `npm run check:blog:release`. This is the canonical gate combining current-scope strategy, article contracts, build/prerender, rendered HTML, and sitemap validation. `npm run check:blog:fast` is diagnostic only and never constitutes publish approval.

Changed published markdown files are automatically strict. Existing corpus debt remains visible through `npm run check:blog:legacy-debt`; it must not be hidden or “fixed” with fake values in an unrelated batch.

Draft/hold content uses `published: false` and `noindex: true` and needs a real slug, language, and title/working title. Do not add fake canonical, product capability, CTA, Explore, mockup, or product-route values. Full V2 production fields are required when the article enters publish-ready state.

Minimum character counts do not establish article quality. Do not repeat headings, duplicate paragraphs, expand conclusions with generic AI prose, or add filler solely to pass a threshold. The release gate blocks obvious repetition; a human reviewer remains responsible for intent coverage, factual accuracy, useful examples, and non-redundant prose.

## Core principles

- Не делать уникальный дизайн под каждую статью.
- Использовать reusable article patterns.
- Сначала мапить готовый текст по блокам шаблона.
- Структура должна быть scan-friendly.
- Статья не должна выглядеть как “white text on black”.
- Статья не должна превращаться в лендинг.
- Product-led блоки должны быть встроены естественно.
- EN/RU версии должны использовать один паттерн, но тексты CTA и блоков адаптируются под язык и intent статьи.

## Topic approval gate before article generation

1. No article generation before keyword demand + SERP + intent + product reality + cannibalization + mockup readiness are recorded.
2. `demandSource`, `exactVolumeKnown`, and `fallbackAllowed` are strictly required for approved topics.
3. Unknown exact volume is acceptable only as a warning, not hidden. Exact volume should be added later from Ahrefs/Semrush/Wordstat/GSC when available.
4. AI/SERP synthesis demand source is acceptable for controlled Wave 2, but must be visible as a warning.
5. Do not invent search volume. Use `demandConfidence` when exact volume is unknown.
6. Topics must be marked approve/revise/hold/reject.
7. "Best tools / alternatives" topics require fresh competitor research.
8. Product capability must be confirmed before promising workflows.
9. Visual/how-to/comparison/examples articles must include native mockup plan.
10. Approved topics can move to draft generation only after `check:blog:topics` passes.

## Content Guardrails & Template Compliance
- Before generating or editing a new SEO markdown article, open the live fixture, markdown fixture, template file, and renderer:
  - `docs/product/gotoflow-capabilities.md`
  - `src/content/blog/articles/test-seo-template-v2.md`
  - `src/content/blog/articles/_template.md`
  - `src/components/blog/templates/MarkdownSeoArticleTemplateV2.jsx`
- `docs/product/gotoflow-capabilities.md` is the canonical product source of truth for GoToFlow positioning, capabilities, comparisons, roadmap framing, forbidden negative framing, and misleading-claim rules. Before writing or editing a GoToFlow article, the agent must check whether the article positioning matches this file.
- GoToFlow is an end-to-end carousel creation system: source/idea, analysis, structure, slide copy, visual style/design, own photos, AI characters, slides, CTA, and export — from zero to a ready carousel in minutes. Supported inputs include a topic, script, text, link, Reels, YouTube or TikTok video, audio, PDF, image, screenshot, or user photo. Never reduce GoToFlow to text-only, structure-only, Canva/Midjourney/ChatGPT add-on, or random AI carousel generation.
- The agent must not invent product limitations, must not frame GoToFlow through “minuses”, and must not describe roadmap items as strategic weaknesses.
- **GoToFlow product-positive comparison rule:** Canva, Figma, Midjourney, ChatGPT, Claude, and other tools may appear only as context, manual alternatives, or optional supporting tools. Never make another tool the main next step. Never write GoToFlow cons/minuses/weaknesses/limitations. Every comparison must natively lead to GoToFlow as the primary end-to-end workflow and the final CTA must point to GoToFlow.
- Never emit component-looking tags in `.md` body. Raw tags such as `<ArticleExploreZone>`, `<RelatedArticles>`, `<SecondaryCta>`, `<FinalCta>`, `<ArticleFinalCta>`, or `<InlineProductBlock>` are P0 blockers.
- FAQ, Explore/Related links, and Final CTA belong in YAML frontmatter (`faq`, `explore`, `finalCta`), not in markdown body. If raw JSX-like tags are found in source or dist, publishing is blocked.
- Minimum 5 FAQ questions required for all product-led SEO articles.
- User-facing "draft/черновик" positioning is strictly forbidden. GoToFlow produces a "ready carousel" / "готовая карусель".
- The final CTA must be product-led, well-structured (e.g. `> [!product]`), and contain an internal product link.
- Examples articles must contain at least 5 concrete examples (with hook, logic, CTA idea, etc.), not just generic formats.
- Hooks articles must deliver the exact number of hooks promised in the numeric title (e.g., "15 hooks").
- YouTube articles must be product-realistic and not overclaim (e.g., no "AI handles the entire workflow").
- **Blog Article Quality Contract:** All articles must adhere to the rules in `docs/blog-article-quality-contract.md`.
- **Mandatory Frontmatter:** `articleType`, `productFit`, `productFitExplanation`, `requiredVisualBlock`, `faqFormat`, and `qualityGateStatus` are strictly required.
- **FAQ Enforcement:** `faq` must be an array in frontmatter. Markdown headings like `## FAQ` with unstructured text below are forbidden.
- Compliance is enforced by `check:blog:content-template` and `check:blog:quality-contract`.

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

Допускается маленькая muted secondary-link под CTA-card. Обычно она ведёт прямо на следующий релевантный published guide/tool. `#explore-more` допустим только для явно обозначенной навигации к same-page related section.

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
- Prompt/code examples must be mobile-safe: avoid long single-line fenced code blocks, split prompt instructions into short lines, and never create horizontal scrolling inside the article body.

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
> Use GoToFlow to turn rough ideas into ready carousel workflows.
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
text: `Turn a topic, link, video, or rough note into a structured, ready-to-publish Instagram carousel.`
buttonText: `Try GoToFlow For Free`
href: `/linkedin-carousel-maker`
microcopy: `Free — No credit card required`
secondaryText: `Read the LinkedIn carousel posting guide →`
secondaryHref: `/blog/how-to-post-a-carousel-on-linkedin`

Пример RU:
title: `Всё ещё собираете карусели вручную?`
text: `Превратите тему, ссылку, видео или заметки в структурированную карусель, готовую к публикации.`
buttonText: `Попробовать GoToFlow бесплатно`
href: `/ru/generator-karuselej-linkedin`
microcopy: `Бесплатно — карта не нужна`
secondaryText: `Смотреть гайд по размеру карусели →`
secondaryHref: `/ru/blog/razmer-karuseli-v-instagram`

Правила:
- CTA-текст адаптируется под тему статьи;
- CTA-текст адаптируется под язык статьи;
- не копировать дословно один CTA во все статьи;
- дизайн CTA остаётся единым;
- CTA должен использовать корректную app/ref логику через существующую функцию, если она используется в проекте.
- Final CTA secondary links are not decorative: use the next best relevant published route from `explore.tools` or `explore.guides`. `/blog` and `/ru/blog` are fallback only. `secondaryHref: "#explore-more"` is allowed only with explicit same-page wording such as `К связанным материалам ниже →` or `See related materials below →`, and requires a matching `id="explore-more"` before the Final CTA. Missing, draft, or misleading targets are P0.

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
- **Related Links**: Any links in `explore`, `finalCta`, or markdown body must be valid internal paths and must NOT point to draft or 404 pages. Final CTA secondary links should use a specific relevant published route; `/blog` and `/ru/blog` are fallback only. `#explore-more` is allowed only when the label explicitly describes navigation to the same-page related section.

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
- Final CTA secondary link must point to the next best relevant published guide/tool; use `#explore-more` only for explicit same-page navigation wording
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

**Machine-readable source of truth for mockup meaning and owner-context policy: `src/lib/blog/mockupPolicy.js`**
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
- Insert mockups only with `:::mockup{slot="..."}` in the exact section where the visual helps the reader understand the point (semantic placement).
- **Slot-to-Intent Map:** The surrounding heading (H2/H3) must semantically match the slot. For example, `topic-input` matches "idea/prompt/text/ввод", `result-preview` matches "result/carousel/ready/карусель/готов", `format-settings` matches "settings/format/size/размер", `style-choice` matches "style/design/brand/дизайн".
- **Forbidden Placement:** Mockups MUST NOT be placed under sections discussing manual work (e.g., "manual", "without AI", "ручной"), competitors/third-party tools (e.g., "Canva", "Figma", "Photoshop"), or problems/mistakes (e.g., "problem", "mistake", "ошибка", "минус").
- **Checker Behavior:**
  - Semantic mismatches (no positive keywords) trigger a **P1 Warning**.
  - Placing a mockup under a forbidden/negative heading triggers a **P0 Error** and blocks the build.
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

## Finished-output wording rule

- GoToFlow output must never be described as `draft`, `first draft`, `copy-ready structure`, `copy-ready carousel results`, `черновик` or `черновая работа`.
- This applies to title/meta, Quick Answer, FAQ, body product bridges, Explore labels, Final CTA and CTA buttons.
- Unfinished user input should be called notes, rough notes, source text, existing materials, заметки, исходный текст or материалы.
- Approved output wording: finished carousel, export-ready carousel, publish-ready content, готовая карусель, готовый контент, результат для экспорта.
- Internal publication status may still use `draft` for unpublished/noindex files; that state must never leak into user-facing copy.

## Scope Guard for article tasks

1. Declare the exact allowed article, checker, template, and documentation files before editing.
2. Do not run mass replacements over `src/content/blog/articles/*.md`, `src/content/blog/articles/**/*.md`, or the complete article directory without separate explicit approval.
3. Run `git diff --name-only` after each edit pass and stop when a tracked file falls outside scope.
4. Do not modify legacy published articles to silence a checker unless they belong to the current task.
5. Before commit, run `npm run check:task-scope -- <allowed-file> ...` and stage only the reviewed paths.
6. `git add .` is forbidden.

## Visible Title Rule
Do not include `| GoToFlow` or `— GoToFlow` in the frontmatter `title` field. The `title` field is used for the visible H1 and breadcrumbs, which must NOT contain the brand suffix. The system will automatically append `| GoToFlow` for SEO meta tags when rendering.
