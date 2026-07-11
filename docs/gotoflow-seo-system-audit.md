# GoToFlow SEO System Audit

Дата аудита: 2026-07-05

Область аудита: текущая SEO publishing system GoToFlow в репозитории `gotoflow.io`. Аудит выполнен в режиме read-only по системе: документы, контентная модель, prompt system, demand/topic inventory, markdown renderer, QA scripts, build/prerender/deploy, sitemap, live-verification контракты.

Не выполнялось: Stage 1 implementation, миграции, рефакторинг статей, изменение production logic, изменение `dist`, commit/push.

## 1. Executive Summary

SEO-система GoToFlow уже является не просто набором blog pages, а полноценной publishing platform вокруг markdown-статей: есть контентная модель, единый V2 article template, demand/topic planning, anti-cannibalization, product positioning rules, batch workflow, build/prerender, sitemap generation и live verification.

Главная архитектура:

- Articles живут в `src/content/blog/articles/*.md`.
- Markdown загружается через `src/lib/blog/markdownArticles.js`.
- Рендеринг идет через `src/components/blog/MarkdownBlogArticlePage.jsx` и `src/components/blog/templates/MarkdownSeoArticleTemplateV2.jsx`.
- Blog index собирает публичные markdown-статьи через `BlogHubLayout.jsx`.
- Sitemap для динамических markdown routes создается во время `npm run build` через `prerender.mjs`.
- QA-система живет в `scripts/check-blog-*.mjs` и покрывает frontmatter, SEO meta, schema, links, render, mockups, product claims, RU legal disclaimer, demand/topic readiness, release gating и live verification.

Система уже способна выпускать новые SEO-статьи безопасно, но массовый режим уровня 500 статей в месяц требует усиления операционного слоя: topic inventory, batch status discipline, llms automation, live verification closure, visual/mockup capacity и устранение нескольких пересекающихся источников правды в документах.

Самый важный вывод: GoToFlow SEO system находится в состоянии "production-capable, but not yet fully industrialized". Она подходит для controlled batches, но не для автоматического массового publishing без человеческого отбора тем, QA и post-deploy verification.

## 2. Repository Map

| Area | Path | Purpose |
| --- | --- | --- |
| Blog markdown articles | `src/content/blog/articles/` | Основной пул SEO-статей в markdown/frontmatter. |
| Article template file | `src/content/blog/articles/_template.md` | Шаблон frontmatter и структуры статьи; не публичная статья. |
| Markdown loader | `src/lib/blog/markdownArticles.js` | Загружает markdown через `import.meta.glob`, парсит frontmatter, фильтрует public/draft/noindex/template. |
| Article route page | `src/components/blog/MarkdownBlogArticlePage.jsx` | Берет article by slug, ставит head/meta/schema/canonical/noindex, вызывает template. |
| Article renderer | `src/components/blog/templates/MarkdownSeoArticleTemplateV2.jsx` | Dark premium editorial renderer для markdown SEO articles. |
| Blog index | `src/components/blog/BlogHubLayout.jsx` | Показывает blog hub, добавляет публичные markdown articles, фильтрует drafts/noindex. |
| Routes | `src/App.jsx` | Явные routes и catchall `/blog/:slug`, `/ru/blog/:slug`; старые explicit routes остаются выше catchall. |
| Demand sources | `src/content/blog/demand-sources/` | GSC, Yandex, Wordstat, Trends, classified demand, protected merged Gemini export. |
| Topic maps | `src/content/blog/topic-map.json` | Topic decisions, status, cannibalization, owner route, batch metadata. |
| Batch status | `src/content/blog/batch-status.json` | Publishing state, verification fields, batch ownership. |
| Topic scoring | `src/content/blog/topic-priority-score.json` | Priority tiers and scoring inputs for topic selection. |
| Intent map | `src/content/blog/intent-map.json` | Intent ownership and page/article ownership. |
| Cluster map | `src/content/blog/cluster-authority-map.json` | Cluster authority ownership and internal linking context. |
| Mockup registry | `src/content/blog/mockups/registry.json` | Approved mockup assets for article slots. |
| Mockup selection | `src/lib/blog/mockupRegistry.js` | Selects mockups by language, cluster, article type, capability. |
| Mockup policy | `src/lib/blog/mockupPolicy.js` | Slot semantics and forbidden/allowed context rules. |
| Product truth | `docs/product/gotoflow-capabilities.md` | Canonical product capability and positioning source. |
| Product claims | `docs/product-reality-claims.md` | Safe claim language and forbidden claim categories. |
| Production system docs | `docs/blog-production-system.md` | High-level SEO production workflow and release discipline. |
| Article template docs | `docs/seo-article-template-v2.md` | V2 layout/SEO/rendering contract. |
| Gemini prompt | `docs/gemini-seo-article-generation-prompt.md` | Article generation prompt and hard output rules. |
| RU draft protocol | `docs/gemini-ru-article-draft-protocol.md` | RU-specific generation rules, noindex drafts, AI services disclaimer logic. |
| QA docs | `docs/blog-qa-command-system.md`, `docs/check-blog-system-contract.md` | Command usage and canonical release gate logic. |
| Batch docs | `docs/batch-workflow-scaling-contract.md`, `docs/seo/batch-control-system.md`, `docs/batch-operations-playbook.md` | Batch-level control, D53/B25 gating, scale-up process. |
| Prerender/build | `prerender.mjs` | Generates static HTML routes and appends public markdown routes to `dist/sitemap.xml`. |
| Build marker | `scripts/generate-build-info.mjs` | Writes `dist/build.json` with commit, branch, buildTime. |
| Docker | `Dockerfile` | Nginx-only image; copies prebuilt `dist/`. |
| Nginx | `nginx.conf` | Static hosting, redirects, SPA fallback, cache headers, UTF-8 text. |
| Robots | `public/robots.txt` | Allows major bots and points to sitemap. |
| Sitemap seed | `public/sitemap.xml` | Static starter sitemap copied to `dist`, then extended by prerender. |
| LLM files | `public/llms.txt`, `public/llms-full.txt` | Manual/static LLM discovery files; not complete automation for all articles. |

## 3. End-to-End Pipeline

| Step | Input | System piece | Output | Gate |
| --- | --- | --- | --- | --- |
| 1. Demand import | GSC, Yandex Webmaster, Yandex Wordstat, Google Trends | `src/content/blog/demand-sources/`, `scripts/import-keyword-demand.mjs` | Normalized/classified keyword demand | Demand import audit, keyword checks |
| 2. Topic classification | Demand export, existing routes, product routes | `topic-map.json`, `intent-map.json`, `cluster-authority-map.json` | Standalone article, section expansion, FAQ, product route, or hold | Cannibalization and intent ownership |
| 3. Topic scoring | Demand, fit, intent, cluster, product capability | `topic-priority-score.json`, `scripts/recalculate-topic-scores.mjs` | P0/P1/P2/P3 priorities | `check:blog:topic-score` |
| 4. Research package | Approved topic and SERP/research context | `docs/seo/research-package-contract.md` | Research package and brief readiness | `check:blog:research-package` |
| 5. Article brief | Topic owner, product angle, internal links, mockup needs | Brief docs and Gemini prompt docs | Generation-ready brief | `check:blog:batch-readiness` |
| 6. Draft generation | Gemini prompt plus brief | `docs/gemini-seo-article-generation-prompt.md` | Markdown article draft | Draft must be `published:false`, `noindex:true`, often `preview:true` |
| 7. Article implementation | Markdown file | `src/content/blog/articles/*.md` | Renderable article route | Frontmatter, FAQ/CTA, product, links, mockup checks |
| 8. Build/render QA | Source articles and routes | `npm run build`, `prerender.mjs`, render checkers | `dist/` static HTML, sitemap, build marker | `npm run check:blog:release` |
| 9. Deploy | Prebuilt `dist/` | Dockerfile + nginx | Live static site | Deployment logs, live build marker |
| 10. Live verification | Live pages, sitemap, blog index | `check:blog:production`, `check:blog:live-verification` | Confirmed live state | Batch status should be updated only after successful verification |

Key distinction: `canProceedToDraft` is not the same as `canProceedToPublish`. Topic/research readiness can allow a draft, but publishing still needs article-level QA, build/render, sitemap, blog index, and live verification.

## 4. Content Model

### Core Article Format

Current SEO articles are markdown files with frontmatter:

```text
src/content/blog/articles/article-slug.md
```

The loader excludes files starting with `_`, so `_template.md` is not public content. Public status is determined by:

- `published === true`
- `noindex !== true`
- not `_template.md`

This public filter is used by blog index helpers and by prerender/sitemap logic.

### Required Frontmatter

The active loader contract requires these fields:

- `title`
- `slug`
- `language`
- `description`
- `primaryKeyword`
- `searchIntent`
- `cluster`
- `articleType`
- `priority`
- `published`
- `noindex`
- `canonical`
- `createdAt`
- `updatedAt`
- `lastReviewed`
- `quickAnswer`
- `faq`
- `explore`
- `finalCta`

### Optional/Extended Frontmatter

The broader production system also uses optional fields such as:

- `secondaryKeywords`
- `category`
- `funnelStage`
- `audience`
- `keyTakeaway`
- `steps`
- `prompts`
- `formats`
- `mistakes`
- `comparison`
- `workflow`
- `examples`
- `ogImage`
- `hreflang`
- `reviewFrequency`
- `requiresFreshResearch`
- `uniqueAsset`
- `batchId`
- `mockups`
- `qualityGateStatus`
- `productFit`
- `relatedProductRoute`
- `mockupStatus`
- `mockupReason`
- `preview`

Some fields are hard loader requirements; others are enforced by article quality, product-led linking, mockup, render, or batch checkers depending on current scope.

### Head/SEO Behavior

`MarkdownBlogArticlePage.jsx` controls page head behavior:

- Sets `document.title`.
- Sets HTML language.
- Sets meta description.
- Sets canonical.
- Sets robots to `noindex,nofollow` for `noindex:true`.
- Sets Open Graph/Twitter tags.
- Emits JSON-LD for Organization, WebSite, Article, Breadcrumb, and FAQPage when FAQ exists.
- Allows safe draft preview only under strict noindex/preview conditions.

### Sitemap Behavior

`prerender.mjs` reads markdown files directly, excludes `_template.md`, and appends only public markdown routes to `dist/sitemap.xml`:

- `published:true`
- `noindex:false`

Draft/noindex/test articles should not enter sitemap.

### Blog Index Behavior

`BlogHubLayout.jsx` builds the blog hub from:

- A legacy/static list for older important articles.
- `getPublicMarkdownArticlesByLanguage(lang)` for current markdown articles.

If a legacy slug also exists as public markdown, the markdown version wins and the duplicate legacy item is filtered out.

### LLM Discovery Files

`public/llms.txt` and `public/llms-full.txt` exist, but they are static/manual files. They currently document important product/blog URLs but are not an automatic full mirror of all public markdown articles. For mass publishing, this is a drift risk.

## 5. Prompt System

| File | Role | Current status |
| --- | --- | --- |
| `docs/gemini-seo-article-generation-prompt.md` | Main Gemini prompt for producing raw markdown articles from completed briefs. | Current and important. |
| `docs/gemini-ru-article-draft-protocol.md` | RU-specific draft protocol: drafts noindex, external AI service rules, no random mockups, no fake hreflang. | Current and important. |
| `docs/blog-production-system.md` | High-level SEO publishing strategy, workflow, batch discipline, canonical command notes. | Current but overlaps with newer command docs. |
| `docs/seo-article-template-v2.md` | Rendering and article layout contract for V2 template. | Current source of rendering truth. |
| `docs/blog-article-quality-contract.md` | Article type, visual block, FAQ/frontmatter and quality gate rules. | Current QA contract. |
| `docs/product/gotoflow-capabilities.md` | Product source of truth for prompts and checkers. | Canonical. |
| `docs/product-reality-claims.md` | Claim safety and allowed/forbidden wording. | Canonical for claim safety. |
| `docs/product-led-linking-contract.md` | Product link/CTA/internal product bridge rules. | Current. |
| `docs/internal-linking-rules.md` | Hub/supporting/product route and language boundary rules. | Current. |
| `docs/faq-cta-single-source-contract.md` | FAQ and final CTA must live only in frontmatter. | Current. |
| `docs/mockup-relevance-contract.md` | Mockup relevance and fallback rules. | Current. |
| `docs/seo/research-package-contract.md` | Required research package fields before drafting/publishing. | Current. |
| `docs/blog-qa-command-system.md` | QA command selection and scope guidance. | Current, but must be read with release script. |
| `docs/check-blog-system-contract.md` | Checker system contract and command discipline. | Current. |
| `docs/publish-live-verification-contract.md` | Publish/live verification lifecycle and batch-status requirements. | Current. |
| `docs/batch-workflow-scaling-contract.md` | Batch workflow and scaling discipline. | Current. |
| `docs/seo/batch-control-system.md` | Batch control mechanics. | Current. |
| `docs/seo/batch-25-roadmap.md` | Batch 25 planning and gates. | Planning document. |
| `docs/batch-operations-playbook.md` | Operational playbook for batches. | Current operational guide. |
| `docs/seo-content-plan.md` | SEO plan and topic strategy. | Planning layer. |
| `docs/seo-batch-manager.md` | Batch manager notes and topic status. | Planning/ops layer. |
| `docs/topic-priority-scoring.md` | Priority scoring methodology. | Current scoring reference. |
| `docs/DEMAND_IMPORT_REPORT.md` | Historical demand import report from 2026-06-08. | Snapshot, not live source. |
| `docs/demand-import-audit-report.md` | Demand import hygiene audit from 2026-06-23. | Snapshot, notes limitations. |
| `docs/seo/agent-operating-rules.md` | Rules for agents working on content and release tasks. | Current safety layer. |

Important finding: there is no single tiny "SEO prompt brain" file. The prompt system is distributed across production docs, product truth docs, QA contracts, demand files, and batch docs. This is powerful, but it creates risk when older docs still reference older command flows such as `check:blog` or `check:blog:full` while the current canonical release gate is `npm run check:blog:release`.

## 6. Topic Planning And Demand Inventory

### Demand Sources

Demand data lives in:

```text
src/content/blog/demand-sources/
```

Key files:

- `yandex-webmaster-queries-normalized.csv`
- `gsc-search-analytics-normalized.csv`
- `google-trends-normalized.csv`
- `yandex-wordstat-normalized.csv`
- `keyword-demand-classified.csv`
- `keyword-demand-classified.json`
- `source-manifest.json`
- `gotoflow_topic_demand_merged_for_gemini.txt`

The protected untracked merged Gemini export is a large raw demand export:

- 2,064 lines.
- 211,694 bytes.
- Data window: 2026-06-25 to 2026-07-01.
- Total unique queries: 2,032.
- Total impressions: 3,326.
- Total clicks: 171.
- Weighted average position: 6.69.

It explicitly states that it is an analytics export for Gemini Prompt 1 and that existing page/anti-cannibalization validation still must be done through repo/system files. That means this file is input demand, not a publishing decision.

### Current Planning Files

| File | Observed state |
| --- | --- |
| `src/content/blog/topic-map.json` | 64 topic records. Statuses include `published`, `approved`, `published_backfill`, `approve`, `hold`, `reject`, and empty/none. |
| `src/content/blog/batch-status.json` | 63 batch records. Statuses include `published`, `live_verified`, and `hold`. |
| `src/content/blog/topic-priority-score.json` | 91 scored topic records. P3: 50, P2: 18, P1: 18, P0: 5. |
| `src/content/blog/intent-map.json` | 71 intent ownership records. |
| `src/content/blog/cluster-authority-map.json` | 12 cluster authority records. |
| `src/content/blog/batch-25-topic-plan.json` | 5 topic records, mostly P1/P2. |

### Why Demand Does Not Equal Articles

The system does not convert every query into an article. Demand is reduced through:

- existing page ownership,
- product route ownership,
- article cluster ownership,
- anti-cannibalization checks,
- topic scoring,
- search intent classification,
- product-fit classification,
- mockup feasibility,
- batch readiness.

This explains why a large raw export can become a much smaller approved batch.

### Why "13 + 9" Can Happen

The current data shows a strict selection layer:

- 13 RU batch-3 articles are already present as published markdown articles.
- Several high-overlap/product-intent topics are held instead of becoming standalone articles.
- Some queries belong in existing article sections, FAQs, product route copy, or internal link updates.

Examples of hold/product-route protection:

- `generator-karuseley-neyroset`: `hold`, high cannibalization risk, recommended action is to optimize existing `/ru/ai-generator-karuselej`.
- `linkedin-carousel-generator`: `hold`, overlaps `/linkedin-carousel-maker`.
- `generator-karuseley-linkedin-ai`: `hold`, overlaps `/ru/generator-karuselej-linkedin`.

This is correct behavior for a system that wants to avoid cannibalization.

## 7. Article Production Rules

### SEO Rules

Articles must have:

- unique slug,
- stable canonical,
- title and description,
- correct language route,
- correct `published/noindex/preview` state,
- Article schema,
- FAQ schema only when FAQ exists,
- no raw markdown directives in rendered HTML,
- no duplicate H1,
- no duplicate FAQ blocks,
- sitemap inclusion only when public,
- blog index inclusion only when public.

### Draft Safety

Drafts and tests must use:

- `published:false`
- `noindex:true`
- usually `preview:true`

Drafts must not appear in:

- sitemap,
- blog index,
- category pages,
- related links,
- internal links from public articles.

### FAQ Rules

FAQ belongs only in frontmatter:

```yaml
faq:
  - question: "..."
    answer: "..."
```

The body must not duplicate FAQ headings/answers as an additional manual FAQ section.

### Final CTA Rules

Final CTA belongs only in frontmatter:

```yaml
finalCta:
  title: "..."
  description: "..."
  buttonText: "..."
  secondaryHref: "#explore-more"
```

The final CTA must be the last meaningful block before footer. Body markdown should not contain a separate final CTA.

### Explore/Related Rules

`explore` defines related tools and guides. The rendered `ArticleExploreZone` uses:

```html
id="explore-more"
```

It must appear before FAQ and final CTA. The final CTA secondary link should point to `#explore-more`.

### Product Positioning Rules

The product source of truth forbids positioning GoToFlow as:

- text-only,
- structure-only,
- a Canva/Midjourney/ChatGPT add-on,
- a random generator,
- draft-only,
- a product with public "cons/minuses/limitations" framing.

Competitor mentions must bridge back to GoToFlow as the safer/useful product path when relevant.

### Product Claims Rules

Claims must match supported capabilities in product docs and capability JSON. Unsupported or roadmap claims should not be phrased as live product facts.

### RU External AI Service Rules

When a published RU article discusses external AI services such as ChatGPT, Claude, Gemini, Midjourney, OpenAI, Anthropic, or similar, the system requires a compact practical note covering:

- availability in Russia may change,
- direct registration/access/payment may be limited,
- Russian bank cards may not work,
- foreign payment method may be needed,
- prices/limits can change,
- GoToFlow is available in Russia where applicable,
- GoToFlow accepts Russian bank cards where applicable.

If pricing is mentioned, the article should include freshness wording such as "на момент обновления статьи в июле 2026 года".

This rule is enforced by `scripts/check-blog-editorial-product-qa.mjs` for live published RU articles.

### RU Meta Legal Disclaimer

RU pages that mention Instagram/Facebook/Meta should not manually insert the legal footnote in article body. The central footer system handles it:

- `src/components/Footer.jsx`
- `src/components/common/RuMetaDisclaimerFootnote.jsx`

The disclaimer text must not leak into EN articles.

### Mockup Rules

Mockups must be relevant by:

- language,
- platform,
- source context,
- intent,
- article type,
- capability.

If no good asset exists, the article should use `mockupStatus: "not_available"` and explain with `mockupReason`, instead of inserting irrelevant images.

## 8. Checkers And Commands

### Composite Commands

| Command | Role | When to use |
| --- | --- | --- |
| `npm run check:blog:release` | Canonical current release gate. Runs task scope, topic/intent/cannibalization, batch workflow, fast/content/schema/build-render checks. | Before release/publish. |
| `npm run check:blog:fast` | Faster source/content/product QA bundle. | During editing. |
| `npm run check:blog:content` | Content quality/template/reference checks. | Before build or when article body changes. |
| `npm run check:blog:seo` | SEO meta/schema/link checks. | Before publish or when SEO fields change. |
| `npm run check:blog:prepublish` | Pre-publish checks without full release flow. | Draft-to-publish transition. |
| `npm run check:blog:build-render` | Build plus rendered HTML checks. | Before release. |
| `npm run check:blog:full` | Broad local QA flow. | Heavy local validation. |
| `npm run check:blog:all` | Very broad script group including full plus production-like checks. | Rare, heavy validation. |
| `npm run check:blog:deploy` | Release + production verification wrapper. | Around deployment. |
| `npm run check:blog:render` | Preview/render checks with Puppeteer. | Visual/render regressions. |
| `npm run check:blog:visual` | Visual/mobile/overflow/mockup checks. | Layout/template/mocking changes. |
| `npm run check:blog:production` | Live production check. | After deploy only. |
| `npm run check:blog:live-verification` | Live sitemap/blog index/page verification. | After deploy only. |
| `npm run check:blog:legacy-debt` | Nonblocking legacy debt visibility. | Audit/refactoring planning. |

### Individual Checkers

| Script/command | What it checks |
| --- | --- |
| `scripts/check-task-scope.mjs` | Blocks unexpected tracked changes, especially `dist`, temp files, sitemap drift, or out-of-scope files. |
| `scripts/check-blog-release.mjs` | Orchestrates the canonical release gate and separates blocking failures from legacy debt. |
| `scripts/check-blog-publishing.mjs` | Frontmatter consistency, sitemap rules, draft safety, duplicate slug, links, raw directives, RU Meta footer system. |
| `scripts/check-blog-frontmatter-contract.mjs` | Frontmatter contract and field-level publishing requirements. |
| `scripts/check-blog-faq-cta-contract.mjs` | FAQ only in frontmatter, final CTA only in frontmatter, no duplicate manual body sections. |
| `scripts/check-blog-quality-contract.mjs` | Article quality gate fields and article type/visual requirements. |
| `scripts/check-blog-product-claims.mjs` | Product capability and claim safety against capability registry. |
| `scripts/check-blog-product-positioning.mjs` | Prevents text-only/add-on/random-generator/negative positioning. |
| `scripts/check-blog-editorial-product-qa.mjs` | Editorial product QA, draft wording, RU external AI service availability/payment rules. |
| `scripts/check-blog-product-links.mjs` | Product route links and GoToFlow CTA/link correctness. |
| `scripts/check-blog-product-led-links.mjs` | Product-led body links and relatedProductRoute behavior. |
| `scripts/check-blog-links.mjs` | Internal link existence, no draft/noindex leaks, language boundaries. |
| `scripts/check-blog-internal-link-flow.mjs` | Hub/supporting/product route flow, cluster links, language and draft safety. |
| `scripts/check-blog-cannibalization.mjs` | Duplicate slug/keyword/intent/cluster and topic-map conflicts. |
| `scripts/check-blog-intent-ownership.mjs` | Intent ownership and route/page assignment. |
| `scripts/check-blog-cluster-map.mjs` | Cluster authority map consistency. |
| `scripts/check-blog-keywords.mjs` | Keyword demand/classification integrity. |
| `scripts/check-blog-topic-score.mjs` | Priority scoring consistency. |
| `scripts/recalculate-topic-scores.mjs` | Recalculates topic priority scores. |
| `scripts/import-keyword-demand.mjs` | Imports/normalizes demand data. |
| `scripts/check-blog-topic-research.mjs` | Topic research/readiness fields. |
| `scripts/check-blog-research-package.mjs` | Research package completeness before drafting/publishing. |
| `scripts/check-blog-batch-readiness.mjs` | Batch readiness: draft readiness versus publish readiness. |
| `scripts/check-blog-batch-workflow.mjs` | Batch state transitions and D53/B25-style gating. |
| `scripts/check-blog-article-review-summary.mjs` | Article review summary state. |
| `scripts/check-blog-template-references.mjs` | Template/source reference discipline. |
| `scripts/check-blog-content-template.mjs` | Content/template structural rules. |
| `scripts/check-blog-language-consistency.mjs` | EN/RU language consistency. |
| `scripts/check-blog-seo-meta.mjs` | SEO title/description/canonical basics. |
| `scripts/check-blog-seo-meta-hardening.mjs` | Stricter/nonblocking SEO meta hardening. |
| `scripts/check-blog-schema.mjs` | Schema basics. |
| `scripts/check-blog-schema-hardening.mjs` | Stricter schema checks. |
| `scripts/check-blog-render-contract.mjs` | Render contract and page artifact expectations. |
| `scripts/check-blog-render-source.mjs` | Source/render compatibility checks. |
| `scripts/check-blog-rendered-html.mjs` | Built `dist` HTML: sitemap, blog index, noindex, schema, raw artifacts, explore/FAQ IDs. |
| `scripts/check-blog-preview-routes.mjs` | Preview route status checks when preview server is running. |
| `scripts/check-blog-dist.mjs` | Built dist integrity. |
| `scripts/check-blog-mockups.mjs` | Mockup presence/path/language basics. |
| `scripts/check-blog-mockup-relevance.mjs` | Mockup semantic relevance by slot and article context. |
| `scripts/check-blog-v2-layout-contract.mjs` | V2 template layout contract. |
| `scripts/check-blog-draft-safety.mjs` | Draft/noindex/canonical/batch-status safety. |
| `scripts/check-blog-live-verification.mjs` | Live page/sitemap/blog-index verification. |
| `scripts/check-blog-production.mjs` | Live production verification including build marker and page state. |

### Important Command Interpretation

The current canonical local release gate is:

```bash
npm run check:blog:release
```

Older docs may mention `npm run check:blog` or `npm run check:blog:full`. Treat those as historical or situational unless the task explicitly asks for them.

Live commands should run only after deployment:

```bash
npm run check:blog:production
npm run check:blog:live-verification
```

## 9. Build And Deploy

### Build

`npm run build` runs:

```bash
vite build
node prerender.mjs
npm run build:marker
```

The build produces:

- Vite static assets in `dist/`.
- Prerendered static HTML pages in `dist/<route>/index.html`.
- Updated `dist/sitemap.xml`.
- `dist/build.json` with commit, branch, and buildTime.

### Prerender

`prerender.mjs`:

- Starts a local `vite preview`.
- Uses Puppeteer to load routes.
- Waits for title/canonical.
- Writes prerendered HTML files.
- Reads markdown articles directly from `src/content/blog/articles`.
- Adds public markdown routes to `dist/sitemap.xml`.
- Excludes `_template.md`, drafts, and noindex articles from sitemap.

### Docker

The Docker image is intentionally prebuilt-dist only:

```Dockerfile
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

This means Docker does not run:

- `npm install`
- `npm run build`
- Puppeteer
- Chromium
- article generation
- QA checkers

That is correct for the current architecture, but it creates one operational requirement: the committed/deployed `dist/` must be fresh and must come from a successful local build.

### Nginx

`nginx.conf` serves the static site and handles:

- Accept-Language RU root redirect for non-bots,
- `/index` redirect,
- `/ai-post-maker` redirect,
- trailing slash cleanup,
- duplicate slash cleanup,
- static HTML route resolution,
- SPA fallback for 404,
- cache headers,
- UTF-8 for `.txt` files.

### Build Marker

`scripts/generate-build-info.mjs` writes:

```json
{
  "commit": "...",
  "branch": "...",
  "buildTime": "..."
}
```

Because the production image copies prebuilt `dist/`, `/build.json` verifies the build artifact that was deployed. If deploy commit and build commit differ, the key question is whether the live `buildTime`, sitemap, and rendered HTML match the intended release.

## 10. Live Verification

After deploy, verification should check:

- `https://gotoflow.io/build.json`
- `https://gotoflow.io/sitemap.xml`
- `/blog`
- `/ru/blog`
- every newly published article URL
- canonical URL
- title
- meta description
- robots noindex absence for public pages
- Article schema
- FAQ schema when FAQ exists
- sitemap inclusion
- blog index inclusion
- no draft/noindex leaks
- no raw markdown directives
- no broken internal links
- no RU legal disclaimer leaking into EN
- RU Meta footer appears only where required
- no horizontal overflow on mobile
- mockups load and match language/context

If GitHub/source is fresh but live site is stale:

1. Check `/build.json` buildTime and commit.
2. Check deploy logs.
3. Confirm the Docker image copied the intended `dist/`.
4. Confirm `dist/sitemap.xml` contains the target routes.
5. Check CDN/browser cache.
6. Check whether production is serving an older image/container.
7. Re-run live verification after cache/deploy settles.

## 11. Current Content State

Observed markdown article state:

- Total markdown files: 146.
- Template files: 1 (`_template.md`).
- Public markdown articles: 138.
- Public EN articles: 57.
- Public RU articles: 81.
- Non-public/test/draft articles excluding template: 7.

Current non-public/test/draft markdown files:

- `b2b-social-media-post-ideas.md`
- `best-time-to-post-on-instagram.md`
- `how-to-write-carousel-copy-with-ai.md`
- `kak-napisat-tekst-dlya-karuseli-s-ii.md`
- `linkedin-carousel-ads.md`
- `test-ru-seo-template.md`
- `test-seo-template-v2.md`

### 13 RU Batch-3 Articles

These 13 batch articles are present as RU markdown articles with `published:true`, `noindex:false`, and `/ru/blog/...` canonical:

- `konstruktor-karuseley-onlayn`
- `kak-sozdat-karusel-s-chatgpt`
- `generator-karuseley-dlya-vk`
- `massovoe-sozdanie-karuseley-s-ii`
- `algoritm-instagram-karuseli`
- `chitabelnost-teksta-v-karuselyah`
- `karusel-ili-setka-v-instagram`
- `kak-narezat-foto-dlya-karuseli`
- `gorizontalnye-i-vertikalnye-foto-v-karuseli`
- `pochemu-instagram-obrezaet-foto-v-karuseli`
- `generator-vizualnyh-postov-ai`
- `mnogostranichnye-karuseli-prezentacii`
- `pervyy-post-vkontakte-s-ii`

In `batch-status.json`, these are tied to `ru-seo-batch-3-new-articles-full-22` and have `productionVerificationStatus: "pending"`. That is an important unfinished operational state.

### Existing Updated/Closed URLs

The following listed URLs are present as published markdown articles:

- `gde-delat-posty-karuseli-s-ii`
- `razmer-karuseli-v-instagram`
- `kak-sostavit-kontent-plan-s-pomoshyu-chatgpt`
- `shablony-karuseley-v-instagram`
- `kak-sozdat-karusel-s-chatgpt`
- `kak-ispolzovat-midjourney-dlya-postov`

The prompt mentions "7 of 9", but only six concrete slugs were available in the inspected request context. The seventh cannot be confirmed without its slug.

### Sitemap State

The built `dist/sitemap.xml` includes the 13 batch-3 public article URLs. The test markdown route `test-seo-template-v2` is not included in sitemap, which matches the draft/noindex rule.

### LLM Files State

`llms.txt` and `llms-full.txt` exist in `public/` and `dist/`, but they are not a complete automatically generated list of all public markdown articles. For a large publishing program, this should be treated as a maintenance gap.

## 12. Mass Publishing Assessment

| Capability | Assessment | Notes |
| --- | --- | --- |
| Markdown article engine | Strong | Articles render from markdown with frontmatter and public/draft filtering. |
| Unified V2 article template | Strong | Dark premium editorial style, Quick Answer, steps, prompts, formats, explore, FAQ, CTA. |
| SEO head/schema | Strong | Article page manages title, description, canonical, noindex, OG/Twitter, Article/Breadcrumb/FAQ schema. |
| Sitemap automation | Good | Public markdown articles are appended during prerender. |
| Blog index automation | Good | Public markdown articles are included, drafts/noindex excluded. |
| Demand inventory | Good but partially manual | Strong local files, but no live API automation and snapshots can age. |
| Topic selection | Good | Topic map, score, intent, cluster, batch status exist. Needs strict operational use. |
| Anti-cannibalization | Strong | Product route holds and topic conflicts are modeled and checked. |
| Prompt system | Strong but distributed | Many docs/contracts; risk of source-of-truth drift. |
| Product claim safety | Strong | Product truth and claim checkers exist. |
| RU legal/compliance | Strong | Central Meta footer and AI service availability/payment rules exist. |
| Mockup system | Medium | Registry and relevance checks exist, but asset capacity is a bottleneck. |
| QA automation | Strong but heavy | Many checkers; release gate exists; heavy checks need time and discipline. |
| Live verification | Medium | Scripts exist, but current batch has pending production verification status. |
| LLM discovery | Weak/medium | Files exist but appear manual/static and incomplete for mass publishing. |
| 500/month readiness | Not yet fully ready | Possible only after operational hardening and batch discipline. |

Conclusion: 500 articles/month is technically plausible with this architecture, but not safe as an immediate publishing mode. The safer path is controlled scaling:

1. Validate 3-5 articles end-to-end.
2. Run a 10-article batch with live verification closed.
3. Run a 25-article batch with topic inventory and llms update discipline.
4. Only then scale toward high-volume publishing.

## 13. Gaps/Risks

1. Multiple overlapping docs still reference different QA command flows. The current canonical command is `npm run check:blog:release`, but old guidance can confuse agents.
2. The protected merged demand export is untracked. It is useful input, but it can be lost or diverge unless intentionally promoted into the official demand workflow.
3. `batch-status.json` contains published batch articles with `productionVerificationStatus: "pending"`. This means the source/build side is ahead of the live verification record.
4. `llms.txt` and `llms-full.txt` are manual/static and not complete mirrors of public markdown articles.
5. Mass publishing can overwhelm visual/mockup QA because good mockups need slot/language/intent relevance.
6. The checker ecosystem is strong but complex. Agents can pass one subset of commands and still miss release/live requirements.
7. Demand snapshots are dated and partially manual. High-volume topic planning needs freshness discipline.
8. Product-route cannibalization risk is real, especially around generator/tool terms.
9. RU external AI service wording is strict; missing one availability/payment/freshness clause can fail QA.
10. The static Docker model requires fresh committed/deployed `dist/`; source changes alone do not update production.
11. Blog index checks may prove inclusion but not necessarily ideal UX/category hierarchy for hundreds of articles.
12. Manual human review remains necessary for usefulness, product angle, and avoiding thin content at scale.

## 14. What Not To Touch

Do not casually change:

- protected demand export `src/content/blog/demand-sources/gotoflow_topic_demand_merged_for_gemini.txt`;
- old working JSX/legacy routes unless explicitly scoped;
- published articles outside the current task;
- `Dockerfile` to run `npm run build` in production container;
- `nginx.conf` redirects unless a deploy issue requires it;
- `dist/` unless doing an intentional build/release artifact update;
- `public/sitemap.xml` as a substitute for prerendered dynamic sitemap behavior;
- RU Meta legal disclaimer in article bodies;
- EN pages with RU legal text;
- product positioning docs without updating related checkers/contracts;
- batch status manually without actual verification evidence;
- commit/push without explicit approval.

Also do not treat a demand export as permission to publish every query. Demand must pass topic ownership, cannibalization, product fit, mockup, QA, and live verification.

## 15. Recommended Next Step

The best next step is not to generate more articles immediately. The best next step is to create a single Master Topic Inventory from the current demand export and existing system files.

That inventory should classify each candidate as:

- standalone article,
- section expansion,
- FAQ expansion,
- product route optimization,
- internal link opportunity,
- hold because of cannibalization,
- reject.

Each candidate should include:

- query/keyword,
- language,
- cluster,
- intent,
- owner route,
- target slug if standalone,
- priority tier,
- product fit,
- related product route,
- mockup feasibility,
- source demand evidence,
- cannibalization risk,
- next action,
- batch id,
- readiness state.

Only after that should GoToFlow generate the next controlled batch. This will answer the core strategic question: not "how many queries do we have?", but "which pages should exist, which pages already own the demand, and which updates create the most SEO value without cannibalizing the site?"
