# Blog SEO Rules Audit for SEO Pages Engine

## Executive Summary

This was a read-only audit of the GoToFlow SEO Publishing Platform to extract reusable rules for the GoToFlow SEO Pages Engine.

- Total rules found: 32
- Reusable as-is: 0
- Rules to adapt for SEO Pages Engine: 23
- Blog-only rules not copied: 2
- Already covered in SEO Pages Engine: 5
- Missing SEO Pages Engine rules: 2
- Unclear/manual review: 0
- Critical prohibitions: 12

Highest risks before topic import:

- Creating service/product URLs from blog overlap instead of URL origin proof.
- Creating duplicate/cannibalizing pages without owner, route, canonical, and intent decisions.
- Creating `/en` URLs or invalid RU paths.
- Promoting protected product/tool routes without approved migration.
- Importing topics without demand/source evidence, product reality, and cannibalization review.

Highest risks before indexation:

- Indexing pages without approval and rendered HTML QA.
- Putting noindex/review pages in sitemap.
- Using Article schema on non-blog pages.
- Linking to missing or review-only pages.
- Publishing pages with unsupported product claims, fake guarantees, or thin content.

## GoToFlow SEO Publishing Platform Audit

Content location:

- Blog article content lives in `src/content/blog/articles/`.
- Blog strategy and planning data lives in `src/content/blog/`, including `intent-map.json`, `topic-map.json`, `cluster-authority-map.json`, `topic-priority-score.json`, and related batch/status files.
- Blog rendering lives in `src/components/blog/` and `src/lib/blog/`.

Routing:

- EN blog routes use `/blog/:slug`.
- RU blog routes use `/ru/blog/:slug`.
- `src/App.jsx` has separate blog hub and article routes for EN and RU.
- `prerender.mjs` derives markdown article routes as `/blog/${slug}` or `/ru/blog/${slug}` based on article language.

Metadata:

- `docs/seo-article-frontmatter-contract.md` requires article title, description, slug, language, primaryKeyword, canonical, dates, publish fields, planning IDs, structured FAQ, explore, and final CTA.
- `scripts/check-blog-seo-meta-hardening.mjs` checks required SEO fields, title/description bounds, duplicate titles/descriptions, duplicate canonicals, canonical route matching, and date ordering.

Sitemap and prerender:

- `prerender.mjs` adds dynamic markdown article routes only when `published:true` and `noindex:false`.
- `scripts/check-blog-rendered-html.mjs` fails if a published article is missing from sitemap/blog index or if a draft/noindex article appears there.

Canonical:

- Blog canonical pattern is `https://gotoflow.io/blog/<slug>` for EN and `https://gotoflow.io/ru/blog/<slug>` for RU.
- SEO Pages Engine must adapt this to root EN pages and `/ru` RU pages, not `/blog`.

Hreflang:

- Blog article pages render `article.hreflang` alternates when present.
- This audit found rendering support, but SEO Pages Engine should add a stricter rule: alternates must point only to existing approved/routable counterparts.

Schema:

- Blog article pages emit Article schema and FAQPage schema from structured article data.
- SEO Pages Engine already blocks Article, BlogPosting, and NewsArticle schema and should keep that boundary.

Intent map:

- `scripts/check-blog-intent-ownership.mjs` checks topic owner/supporting roles in `src/content/blog/intent-map.json`.
- `scripts/check-blog-cannibalization.mjs` checks duplicate slugs/keywords and product-intent cannibalization.
- SEO Pages Engine should continue adapting these concepts through route owner, canonical owner, intent owner, URL origin, and ownership decision records.

Release checks:

- Blog release checks include task scope, topic/demand research, intent ownership, cannibalization, fast source checks, template checks, schema hardening, build, prerender, rendered HTML, and visual checks.
- SEO Pages Engine should eventually have a composed `check:seo:release` or equivalent before indexation.

Validation scripts:

- Existing article scripts live under `scripts/check-blog-*.mjs`.
- Existing non-blog SEO page scripts live under `scripts/check-seo-*.mjs`.
- This audit did not modify either system.

## Reusable Rules For GoToFlow SEO Pages Engine

See the full CSV:

- `scratch/seo-demand-imports/2026-07-06/blog-seo-rules-audit-2026-07-08.csv`

Major reusable rules:

- Draft/noindex safety should map to SEO page states.
- Published/indexable state should require explicit human and indexation approvals.
- Sitemap/prerender must include only approved indexable pages.
- Canonical must match route and language.
- Titles, descriptions, H1, primary keyword, and primary intent must be unique enough to avoid cannibalization.
- FAQ must be structured and truthful.
- Intent ownership must be explicit.
- Product-intent pages must not duplicate existing product/tool routes or articles.
- Internal links must resolve and must not point to review/noindex pages.
- RU and EN internal links must stay inside the correct locale unless documented.
- Product CTAs and links must point to real, relevant routes.
- Product claims must match actual product capabilities.
- Fake stats, reviews, guarantees, ranking promises, and unsupported automation claims must be blocked.
- RU pages that mention foreign AI services need availability/payment/freshness handling where relevant.
- EN pages must not get Russia-specific disclaimers unless the page is explicitly about Russia/CIS.
- Rendered HTML and mobile/visual QA should be required before indexation.

## Blog-Only Rules Not Copied

- Blog article content folder boundary: SEO Pages Engine must not write to `src/content/blog/articles/`.
- Article schema: Article/BlogPosting/NewsArticle schema stays with blog articles only.

These rules are not copied as implementation behavior; they are boundaries that prevent system mixing.

## Missing/Adapted SEO Pages Engine Rules

Do not implement these in this audit. Recommended later updates:

| Rule | Current coverage | Recommended update | Priority |
| --- | --- | --- | --- |
| EN `/en` prohibition | Partly implied by designReference defaults and site routes | Add SEO page validation failure for EN paths starting `/en` and RU paths not starting `/ru` | P0 before topic import |
| Hreflang approved counterpart rule | Not implemented for SEO pages | Add validator: hreflang only points to existing approved/routable/indexable counterpart pages | P1 before indexation |
| Duplicate metadata across systems | Duplicate path covered; metadata duplicates not fully covered | Check title, h1, description, primaryKeyword, primaryIntent against registry and existing route/blog inventory | P1 before indexation |
| Product capability claims | Covered in blog checkers only | Adapt product-capabilities validation for SEO page content/sections/CTA | P0 before page creation |
| RU external AI availability/payment rule | Covered in blog editorial QA | Add SEO page editorial check for RU pages mentioning external AI tools | P1 before indexation |
| EN Russia disclaimer prohibition | Documented for blog | Add SEO page editorial check for EN pages | P1 before indexation |
| Rendered HTML QA for SEO pages | Blog only | Add SEO page rendered HTML checker before indexable_approved | P1 before indexation |
| Visual/mobile QA for SEO pages | Blog only | Add SEO page visual QA checklist/checker using homepage-based layouts | P1 before indexation |

## Hard Prohibitions

| Prohibition | Source | Applies to SEO Publishing Platform | Applies to SEO Pages Engine | Enforcement status | Risk if violated |
| --- | --- | --- | --- | --- | --- |
| Do not duplicate existing article/page intent | `scripts/check-blog-cannibalization.mjs`, `scripts/check-seo-route-intent-ownership.mjs` | Yes | Yes | Enforced/partly enforced | Cannibalization and wrong owner decisions |
| Do not create route collisions | `src/content/seoPages/helpers/routeOwnership.js` | Indirect | Yes | Enforced for SEO pages | Existing product/tool route takeover |
| Do not override protected product/tool routes | `src/content/seoPages/protectedRoutes.js` | No | Yes | Enforced | Live product pages can be replaced |
| Do not put noindex pages in sitemap | `scripts/check-blog-rendered-html.mjs`, `scripts/check-seo-sitemap-eligibility.mjs` | Yes | Yes | Enforced | Conflicting crawl/indexation signals |
| Do not use Article schema for non-blog SEO pages | `src/content/seoPages/schema.js` | No | Yes | Enforced | Wrong schema classification |
| Do not invent fake product features | `docs/product-reality-claims.md`, `scripts/check-blog-product-claims.mjs` | Yes | Yes, should adapt | Blog enforced; SEO pages gap | Misleading content |
| Do not invent fake stats/reviews/guarantees | `scripts/check-blog-editorial-product-qa.mjs` | Yes | Yes, should adapt | Blog enforced; SEO pages gap | Compliance and trust risk |
| Do not link to missing pages | `scripts/check-blog-links.mjs`, `scripts/check-seo-related-links.mjs` | Yes | Yes | Enforced/partly enforced | Broken crawl paths |
| Do not add Russia-specific disclaimers to generic EN pages | `docs/gemini-ru-article-draft-protocol.md` | Yes | Yes, should adapt | Documented/blog editorial | Off-intent EN content |
| Do not publish without release/build/visual checks | `scripts/check-blog-release.mjs`, `scripts/check-blog-visual.mjs` | Yes | Yes, should adapt | Blog enforced | Broken rendered pages |
| Do not create new checkers if existing checker can be extended | User task constraint | Yes | Yes | Manual | Checker sprawl and duplicated rules |
| Do not treat related blog articles as proof for a commercial URL | `src/content/seoPages/helpers/originLedger.js` | No | Yes | Enforced | Unjustified SEO page creation |

## RU/EN Multilingual Rules

- EN pages live at root paths, not `/en`.
- RU pages live under `/ru`.
- EN canonical for SEO/service/product pages should use `https://gotoflow.io/<slug>`.
- RU canonical for SEO/service/product pages should use `https://gotoflow.io/ru/<slug>`.
- EN design reference is `/`.
- RU design reference is `/ru`.
- Validation should fail if an EN SEO page path starts with `/en`.
- Validation should fail if a RU SEO page path does not start with `/ru`.
- Hreflang alternates should point only to existing approved/routable counterparts.
- No hreflang should point to planning, quarantine, or noindex pages unless explicitly documented for preview-only use.

## RU-Specific External AI Rule

Existing rule:

- Source: `docs/gemini-ru-article-draft-protocol.md`, section “RU External AI Service Availability Rule”.
- Enforced in: `scripts/check-blog-editorial-product-qa.mjs`.
- Applies to RU content mentioning services such as ChatGPT, Claude, Gemini, Midjourney, OpenAI, Anthropic, and similar tools.

Required meaning for RU pages:

- Some foreign AI services may be unavailable from Russia or require a supported region.
- Russian bank card payment should not be treated as reliably available.
- A foreign payment method may often be needed.
- Prices, limits, and availability may change.
- If factually true for GoToFlow, bridge to GoToFlow availability in Russia and Russian card payments.

EN rule:

- Do not add Russia-specific availability/payment disclaimers to EN pages unless the page is explicitly about Russia/CIS availability.

SEO Pages Engine status:

- Not implemented yet.
- Should be adapted before RU SEO pages that mention external AI services are indexed.

## Google/Yandex Readiness Checklist

Technical:

- Indexable state only after explicit approval.
- Correct RU/EN route pattern.
- Self canonical.
- Valid hreflang only when counterpart exists and is approved/routable.
- Sitemap only for indexable approved pages.
- No noindex/review pages in sitemap.
- Rendered HTML contains real page content, not SPA fallback.
- Build/prerender validation passes.

Content:

- Unique title, description, H1, primary keyword, and primary intent.
- Clear primary intent above the fold.
- No duplicate intent with existing blog/product/SEO pages.
- Useful commercial sections, not thin keyword content.
- FAQ only if useful and truthful.
- Product CTA present.
- No keyword stuffing.
- No fake stats, fake reviews, fake guarantees, or unsupported features.
- RU external AI availability/payment note only when relevant.

Internal linking:

- Links from relevant blog/supporting pages only when safe and public.
- SEO page links to relevant existing product/tool/blog/SEO pages.
- No broken related links.
- No links to planning/quarantine/noindex pages from public indexable pages.
- Locale-aware internal links.

Schema:

- Schema appropriate to page type.
- No Article, BlogPosting, or NewsArticle schema for non-blog SEO pages.
- FAQ schema only from structured FAQ data.
- Breadcrumb schema should match actual route hierarchy.

Release:

- Ownership guardrail passes.
- Sitemap eligibility check passes.
- Related links check passes.
- Product claims checked.
- Visual/mobile QA done.
- Human approval before noindex_review.
- Human/indexation approval before indexable_approved.
- No commit/push/deploy without explicit instruction.

## SEO Pages Engine Missing/Adapted Rules

| Missing or adapted rule | Source article rule | Why SEO Pages Engine needs it | Current coverage | Recommended checker/doc update | Priority | Risk if not added | Stage |
| --- | --- | --- | --- | --- | --- | --- | --- |
| EN `/en` prohibition and RU `/ru` requirement | Blog/App route architecture | Prevent unsupported duplicate language routes | Partial | Add path/language validator | P0 | Unsupported URLs | Before topic import |
| Approved-only hreflang | Blog hreflang rendering | Avoid invalid alternates to review/noindex pages | Missing | Add hreflang validator | P1 | Bad locale signals | Before indexation |
| Cross-system duplicate metadata | Blog SEO meta hardening | Prevent duplicate snippets and intent confusion | Partial | Extend route/intent checker | P1 | Cannibalization | Before indexation |
| Product capability claim validation | Product reality claims | Service pages are claim-heavy | Missing | Adapt product claim checker to SEO pages | P0 | Misleading product claims | Before noindex_review |
| RU external AI/payment note | RU Gemini draft protocol | Needed for RU pages mentioning foreign AI tools | Missing | Add SEO editorial checker | P1 | Misleading RU guidance | Before indexation |
| EN no Russia disclaimer | RU Gemini draft protocol | Avoid irrelevant EN copy | Missing | Add SEO editorial checker | P1 | Off-intent EN pages | Before indexation |
| Rendered SEO page HTML QA | Rendered HTML checks contract | Ensure crawlable rendered pages | Missing | Add SEO rendered HTML checker | P1 | Empty/broken rendered pages | Before indexation |
| Visual/mobile QA | Blog visual QA | Landing pages must be polished and mobile-safe | Missing | Add SEO visual QA checklist/checker | P1 | Poor UX and mobile issues | Before indexation |

## Read-Only Proof

Audit-start `git diff --name-only` showed only pre-existing source integration changes:

- `package.json`
- `prerender.mjs`
- `src/App.jsx`
- `src/components/RouteSchemaInjector.jsx`
- `src/utils/schemaGenerator.js`

During this audit, the SEO Publishing Platform was read-only:

- `src/content/blog/articles/` was not modified.
- `src/content/blog/intent-map.json` was not modified.
- Existing blog routes were not modified.
- Existing blog checkers were not modified.
- Existing blog schema behavior was not modified.

Note: `git status --short src/content/blog ...` showed a pre-existing untracked demand source file under `src/content/blog/demand-sources/`. This audit did not create or modify it.

Allowed files created by this audit:

- `scratch/seo-demand-imports/2026-07-06/blog-seo-rules-audit-2026-07-08.csv`
- `docs/blog-seo-rules-audit-for-seo-pages-2026-07-08.md`
- `docs/seo-systems-naming-and-boundaries-2026-07-08.md`

## Recommendations

Exact next step before importing topics/backlog:

1. Add the missing P0 language/path validation rule to SEO Pages Engine docs/checks: EN must not use `/en`; RU must start with `/ru`.
2. Before any SEO page moves beyond `planning_only`, require URL origin proof, intent owner, route owner, canonical owner, product reality review, and cannibalization review.
3. Before any page moves to `noindex_review`, adapt product-claim safety and internal/related-link checks for SEO page content.
4. Before indexation, add rendered HTML, hreflang, RU external AI note, and visual/mobile QA gates.
