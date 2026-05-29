# SEO Batch Manager

## 1. Purpose

SEO batch manager нужен, чтобы GoToFlow мог выпускать 5, 10, 20+ статей партиями без хаоса.

Он должен предотвращать:
- случайную генерацию тем;
- дубли;
- keyword cannibalization;
- публикацию draft/noindex страниц;
- слабые AI-generated статьи;
- битые ссылки;
- отсутствие visual QA;
- плохую индексацию.

*Batch publishing is not “generate many articles and publish them”.*
*Batch publishing is controlled production with quality gates.*

---

## 2. Batch lifecycle

1. Batch planning
2. Topic selection
3. Brief creation
4. Brief QA
5. Gemini / AI draft generation (RU Gemini draft generation must use: `docs/gemini-ru-article-draft-protocol.md`. Batch articles must not be generated from raw topics.)
6. Markdown conversion
7. `check:blog`
8. Local preview
9. Content QA
10. Visual QA
11. SEO indexability QA
12. Ready to publish
13. Controlled publish
14. Post-publish verification
15. Performance monitoring
16. Update / merge / archive if needed

---

## 3. Article statuses

- `idea`: Тема предложена, но пока не исследована.
- `research`: Идёт анализ SERP, конкурентов, интента.
- `brief`: Пишется content brief.
- `brief-approved`: Content brief готов к передаче в Gemini.
- `ai-draft`: Сырой драфт от ИИ.
- `markdown-draft`: Драфт сконвертирован в формат MDX/Markdown.
- `check-failed`: Статья не прошла скрипт `check:blog` или базовые правила сборки.
- `preview-ready`: Статья доступна для локального QA на `http://127.0.0.1:4185/blog/...`.
- `content-qa`: Идёт вычитка текста и сверка с интентом/брифом.
- `visual-qa`: Проверяется рендеринг компонентов, карточек, мобильной версии.
- `ready-to-publish`: Пройдены все проверки (контент, визуал, SEO-indexability). Ждёт команды на публикацию.
- `published`: Опубликована (`published: true`, `noindex: false`), доступна на проде.
- `needs-update`: Требует обновления или актуализации (freshness).
- `needs-merge`: Пересекается с другой статьёй, требуется слияние (cannibalization issue).
- `archived`: Статья убрана из активного оборота.
- `redirected`: Статья удалена/перенесена с настройкой редиректа 301.

---

## 4. Batch ID format

**Формат:**
`SEO-BATCH-YYYY-MM-DD-01`

**Пример:**
`SEO-BATCH-2026-05-25-01`

Каждая статья в batch должна иметь:
- `batchId`
- `status`
- `cluster`
- `priority`
- `owner/agent`
- `language`
- `canonical/slug`
- `QA status`

---

## 5. Batch tracking table

| Batch ID | Cluster | Topic | Primary keyword | Language | Article type | Priority | Status | Slug | Brief | Markdown file | Preview URL | check:blog | Content QA | Visual QA | Publish ready | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| BATCH-TBD | Content Repurposing | Repurpose Blog to LinkedIn | repurpose blog post linkedin carousel | en | how-to | P1 | markdown-draft | repurpose-blog-post-linkedin-carousel-ai | needs verification | repurpose-blog-post-linkedin-carousel-ai.md | /blog/repurpose-blog-post-linkedin-carousel-ai | passed | needs content QA | needs visual QA | no | pending QA |
| BATCH-TBD | Instagram Carousel | Instagram Carousel Prompts | instagram carousel prompts | en | prompt-library | P1 | markdown-draft | instagram-carousel-prompts | needs verification | instagram-carousel-prompts.md | /blog/instagram-carousel-prompts | passed | needs content QA | needs visual QA | no | pending QA |
| BATCH-TBD | AI Carousel Maker | AI vs Manual Design | ai carousel maker vs manual design | en | comparison | P1 | preview-ready | ai-carousel-maker-vs-manual-design | needs verification | ai-carousel-maker-vs-manual-design.md | /blog/ai-carousel-maker-vs-manual-design | passed | needs content QA | needs visual QA | no | pending QA |
| SEO-RU-BATCH-01 | AI Carousel Maker | Нейросеть для создания каруселей | нейросеть для создания каруселей | ru | best-tools | P0 | brief-draft | nejroset-dlya-sozdaniya-karuselej | docs/seo-ru-batch-01-briefs.md | not ready | not ready | not ready | not ready | not ready | no | Stage 4G: RU batch, needs SERP validation & Gemini draft |
| SEO-RU-BATCH-01 | Instagram Carousel | Как сделать карусель для Инстаграм с помощью ИИ | как сделать карусель для инстаграм | ru | how-to | P0 | markdown-draft | kak-sdelat-karusel-dlya-instagram-s-ii | docs/seo-ru-batch-01-briefs.md | kak-sdelat-karusel-dlya-instagram-s-ii.md | /ru/blog/kak-sdelat-karusel-dlya-instagram-s-ii | pending | needs content QA | needs visual QA | no | Stage 4K: First Real RU SEO Markdown Draft created, not published |
| SEO-RU-BATCH-01 | Instagram Carousel | Идеи для каруселей в Инстаграм | идеи для каруселей инстаграм | ru | ideas | P1 | brief-draft | idei-dlya-karuselej-v-instagram | docs/seo-ru-batch-01-briefs.md | not ready | not ready | not ready | not ready | not ready | no | Stage 4G: RU batch, needs SERP validation & Gemini draft |
| SEO-RU-BATCH-01 | Content Repurposing | Как из текста сделать карусель | текст в карусель | ru | guide | P0 | brief-draft | kak-iz-teksta-sdelat-karusel-dlya-socsetej | docs/seo-ru-batch-01-briefs.md | not ready | not ready | not ready | not ready | not ready | no | Stage 4G: RU batch, needs SERP validation & Gemini draft |
| SEO-RU-BATCH-01 | AI Carousel Maker | Промпты для каруселей | промпты для каруселей | ru | prompt-library | P1 | brief-draft | prompty-dlya-karuselej | docs/seo-ru-batch-01-briefs.md | not ready | not ready | not ready | not ready | not ready | no | Stage 4G: RU batch, needs SERP validation & Gemini draft |

---

## 6. Batch size rules

**Early stage:**
- 1 article test
- then 3 article format test
- then 5 article batch
- then 10 article batch
- then 20 article batch

**Do not jump to 50/100 articles before:**
- content brief process is stable;
- `check:blog` is clean;
- visual template is stable;
- controlled publish works;
- indexability checks are proven.

---

## 7. Batch quality gates

Для каждой статьи в batch должны быть gates:

### Brief QA
- primary keyword exists;
- search intent clear;
- no duplicate topic;
- cluster selected;
- product angle clear;
- related links selected;
- fresh research requirement defined.

### Markdown QA
- valid frontmatter;
- `published:false` for draft;
- `noindex:true` for draft;
- canonical matches slug;
- `finalCta` valid;
- product/related present where relevant;
- no unsupported markdown;
- no fake URLs.

### Content QA
- matches intent;
- not generic AI-water;
- practical outcome;
- unique angle;
- no unsupported stats;
- no fake claims;
- examples are useful;
- product mention is contextual.

### Visual QA
- hero okay;
- quick answer readable;
- cards/callouts not overloaded;
- tables mobile-safe;
- no horizontal overflow;
- product/related blocks look correct;
- final CTA visible.

### SEO indexability QA
- before publish:
  - `published:true` only after QA;
  - `noindex:false`;
  - correct canonical;
  - included in sitemap;
  - included in blog/category index;
  - curl/prerendered HTML contains real article content;
  - robots/sitemap okay;
  - no broken internal links;
  - no links to draft;
  - no obvious cannibalization.

---

## 8. Batch rejection rules

Статья НЕ должна переходить в `ready-to-publish`, если:

- intent unclear;
- duplicate keyword or slug;
- weak/generic AI content;
- missing product bridge;
- no internal links;
- links to draft/noindex;
- `check:blog` has errors/warnings;
- visual QA failed;
- table/card/callout rendering broken;
- no clear conclusion/CTA;
- indexability not verified.

---

## 9. Batch report format

# Batch QA Report

**Batch ID:**
**Date:**
**Total articles:**
**Passed:**
**Needs edits:**
**Rejected:**
**Published:**
**Not published:**

## Article summary

| Slug | Status | Main issue | Next action |
|---|---|---|---|

## Technical result

- `npm run build`:
- `npm run check:blog`:
- draft safety:
- sitemap:
- blog index:
- broken links:
- noindex/canonical:

## Content result

- strongest article:
- weakest article:
- cannibalization risks:
- missing briefs:
- missing assets/mockups:
- recommended articles to publish first:

---

## 10. Relationship with other docs

- `docs/seo-content-plan.md`
- `docs/seo-content-brief-template.md`
- `docs/blog-production-system.md`
- `docs/seo-publishing-roadmap.md`
- `docs/gemini-seo-article-generation-prompt.md`
- `docs/seo-article-template-v2.md`

**Объяснение:**
- content plan defines what to write;
- brief template defines how to prepare each article;
- batch manager defines how to move articles through production;
- `check:blog` validates technical and structural safety;
- roadmap defines strategic priorities.

---

## 11. Automated Checks (check:blog)

### Route/internal link checker
- published articles cannot link to draft/noindex pages;
- every internal route must exist;
- product/related/final CTA links must be validated;
- no links to test template pages;
- broken internal links block publish.

### Anti-cannibalization checks
- duplicate slug/canonical = P0;
- duplicate primaryKeyword = warning/P0 depending on publish state;
- same cluster + same intent = warning;
- draft articles targeting published keywords need differentiation before publish.

### Batch usage
Before accepting a batch:
- run `npm run check:blog`;
- fix all route/link warnings;
- review cannibalization warnings;
- do not publish articles with unresolved duplicate intent.
