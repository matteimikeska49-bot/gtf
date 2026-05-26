# GoToFlow SEO Publishing Platform: Strategy & Roadmap

## 1. Главная цель (Core Objective)

GoToFlow SEO Publishing Platform — это не просто блог и не генератор SEO-текстов. 

**Цель:**
`Gemini / AI → structured draft → markdown article → check:blog → local preview → visual/content QA → controlled publish → analytics/update.`

Система должна позволять быстро выпускать много качественных SEO-статей без:
- SEO-мусора;
- дублей;
- cannibalization;
- случайных картинок;
- draft-страниц в индексе;
- 404-ссылок;
- плохого шаблона;
- слабых CTA;
- нерелевантных RU-переводов.

---

## 2. Что уже сделано (Completed / Mostly Completed)

- Markdown article engine for new articles.
- Article template v2.
- Draft/noindex safety.
- Local draft preview.
- Dynamic `/blog/:slug`.
- Base `check:blog`.
- Gemini generation prompt.
- `finalCta` schema validation.
- Product / related callouts.
- Freshness / reviewed date block.
- Markdown tables.
- Repeated callout guardrails.
- Blog hub redesign.
- 3 article format tests (guide / how-to, prompt library, comparison + table).

*Важно:* `:::cards` compact repeated cards сейчас pending visual QA / in progress, не считать fully completed, пока не будет принят визуал и commit.

---

## 3. Текущая оценка готовности (Current Readiness Assessment)

- **Article creation infrastructure:** 70–75%
- **Production publishing workflow:** 35–40%
- **Mass SEO factory for 100+ articles:** 20–25%
- **RU + mockups + analytics scale:** 10–15%

---

## 4. P0 Roadmap (Before Further Scaling)

1. **Finish `:::cards` compact repeated cards:**
   - Visual QA;
   - Commit;
   - Docs / check / template aligned.

2. **Content QA for 3 draft articles:**
   - `repurpose-blog-post-linkedin-carousel-ai`
   - `instagram-carousel-prompts`
   - `ai-carousel-maker-vs-manual-design`

3. **Controlled publish of 1 article:**
   - Change `published:false` → `published:true`;
   - `noindex:false`;
   - Build;
   - `check:blog`;
   - Sitemap check;
   - Blog index check;
   - Production URL check;
   - Canonical/noindex check;
   - Pass SEO indexability quality gate.

4. **Publish readiness checklist:**
   - Intent match;
   - No AI-water;
   - Product bridge;
   - Internal links;
   - Visual QA;
   - Mobile QA;
   - `check:blog` clean;
   - Sitemap/blog index ready;
   - Pass SEO indexability quality gate.

## 4.5. SEO Indexability Quality Gate (P0/P1)

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

---

## 5. P1 Roadmap (Before Batching 10+ Articles)

**Stage 4B (Closed by this step):**
- Batch manager / status system;
- Batch QA report;
- Batch status lifecycle;
- Controlled batch publishing discipline.

**Upcoming P1 tasks (after Stage 4B):**
- Anti-cannibalization checks.
- Route/internal link checker.
- Mockup / approved asset registry.
- RU architecture decision.

---

## 6. P2 Roadmap (For 100+ Articles)

- RU markdown pipeline.
- EN/RU relationship model:
  - `translationOf`;
  - `localizationType`;
  - `hreflang`;
  - `canonical`.
- RU sitemap / hreflang.
- Category pages.
- Pagination.
- Sitemap index / split sitemaps.
- OG image system.
- Blog analytics events:
  - Product CTA clicks;
  - Final CTA clicks;
  - Related clicks;
  - Scroll depth;
  - ArticleExploreZone clicks.
- Update/review policy.

---

## 7. P3 Roadmap (For 1000+ Articles)

- Content inventory database/JSON.
- Automated editorial QA scoring.
- Internal linking graph.
- Content decay monitoring.
- Archive / merge / redirect workflow.
- Build/performance scaling.
- CI quality gates.

---

## 8. Stage 4D: Mockup / Asset Registry Strategy

**Status:** Done (Stage 4D).

**Accomplished:**
- Mockup asset registry (`src/content/blog/mockups/registry.json`);
- RU/EN asset separation (`public/assets/blog/mockups/ru` and `en`);
- Asset statuses (`planned`, `needs-rescreen`, `approved`, `internal-only`, `rejected`);
- Future mockup selection logic defined;
- `check:blog` registry validation;
- Future markdown `:::mockup` renderer planned for later.

---

## 9. Stage 4E: RU/EN Blog Architecture Decision

**Status:** Done (Stage 4E).

**Accomplished:**
- RU/EN blog architecture;
- `/ru/blog` decision;
- localization fields;
- canonical/hreflang rules;
- sitemap rules;
- RU adaptation strategy;
- mockup language matching.

*Rule:* RU content should be a local adaptation, not a literal EN translation.

---

## 10. Missing Important Systems (Open Items)

- Content brief stage.
- SERP / competitor research.
- Keyword clustering / topic map.
- Publish readiness checklist.
- Controlled publish flow.
- EN/RU relationship model.
- Route/internal link checker.
- Mockup rendering block.
- OG image strategy.
- Author / reviewed-by credibility block.
- Update / decay checker.
- Blog analytics events.
- Performance QA for 1000+ articles.
- Editorial quality scoring.
