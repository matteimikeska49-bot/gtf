# Blog SEO Rules Audit

## Executive Summary

This audit read the GoToFlow SEO Publishing Platform in read-only mode and extracted reusable rules for the GoToFlow SEO Pages Engine.

No existing blog article, markdown file, checker, route, schema file, sitemap logic, product page, SEO page, or package behavior was intentionally modified by this task.

Rule inventory:

- Total rules found: 32
- `reuse_as_is`: 0
- `adapt_for_seo_pages`: 23
- `blog_only`: 2
- `already_exists`: 5
- `missing`: 2

Created outputs:

- `scratch/seo-demand-imports/2026-07-06/blog-seo-rules-audit.csv`
- `docs/blog-seo-rules-audit.md`
- `docs/seo-systems-naming-and-boundaries.md`

## Systems

### GoToFlow SEO Publishing Platform

Purpose:

- SEO Articles.
- Blog.
- Publishing.
- Article release pipeline.

Main folder:

- `src/content/blog/`

Status for this task:

- Read-only.
- Source of truth.
- Not modified.

### GoToFlow SEO Pages Engine

Purpose:

- Non-blog SEO pages.
- Service pages.
- Tool pages.
- Commercial pages.
- Platform pages.
- Template pages.
- Prompt pages.
- Example pages.
- Alternative pages.
- Use-case pages.

Status for this task:

- Existing implementation inspected only for comparison.
- No source changes made.

## Files And Areas Inspected

Primary article system areas:

- `src/content/blog/`
- `src/content/blog/articles/`
- `src/content/blog/intent-map.json`
- `src/content/blog/topic-map.json`
- `src/content/blog/cluster-authority-map.json`
- `src/content/blog/topic-priority-score.json`
- `src/content/blog/product-capabilities.json`
- `src/lib/blog/`
- `src/components/blog/`
- `scripts/check-blog-*.mjs`
- `docs/`
- `package.json`
- `src/App.jsx`
- `prerender.mjs`
- `src/utils/schemaGenerator.js`
- `public/llms.txt`

SEO Pages Engine comparison areas:

- `src/content/seoPages/`
- `src/components/seo/`
- `scripts/check-seo-*.mjs`

## Rules Found

Full rule inventory is in:

- `scratch/seo-demand-imports/2026-07-06/blog-seo-rules-audit.csv`

Each row includes:

- rule name
- purpose
- source file
- exact location
- checker
- enforcement
- priority
- `canReuseForSeoPagesEngine`
- reuse mode
- risk
- Google/Yandex impact category

## Critical Prohibitions

1. Do not put SEO Pages Engine content in `src/content/blog/articles/`.
2. Do not treat blog articles as commercial/service pages.
3. Do not use Article, BlogPosting, or NewsArticle schema for non-blog SEO pages.
4. Do not create `/en` routes.
5. Do not put noindex/review pages in sitemap.
6. Do not route/index pages without explicit approval gates.
7. Do not duplicate existing article, product, or SEO page intent.
8. Do not create route collisions.
9. Do not override protected product/tool routes without approved migration.
10. Do not link public pages to draft/noindex/review pages.
11. Do not link to missing pages.
12. Do not invent product features, fake stats, fake reviews, fake guarantees, or ranking/indexation promises.
13. Do not add Russia-specific AI/payment disclaimers to generic EN pages.
14. Do not treat related blog articles as proof that a commercial/service URL should exist.
15. Do not modify blog checkers, docs, routing, schema, release gates, or markdown during SEO Pages Engine audit work.

## Reuse Matrix

| Reuse mode | Count | Meaning |
| --- | ---: | --- |
| `reuse_as_is` | 0 | No article rule can be copied without context because page type, schema, route, and layout differ. |
| `adapt_for_seo_pages` | 23 | Article-system concepts should be adapted to non-blog page states, page schemas, route patterns, and landing templates. |
| `blog_only` | 2 | Rules that must stay exclusive to article/blog publishing. |
| `already_exists` | 5 | SEO Pages Engine already has an equivalent guardrail. |
| `missing` | 2 | Required gaps found for SEO Pages Engine. |

## Google/Yandex Checklist

Technical quality:

- Correct EN root and RU `/ru` route pattern.
- No `/en` URLs.
- Self canonical.
- Valid hreflang only to existing approved/routable counterparts.
- Rendered HTML contains real content.
- No raw placeholders, TODO/TBD, raw directives, or escaped JSX.
- Build/prerender validation before release.

Crawlability:

- Approved indexable pages are in sitemap/prerender.
- Review/noindex pages are not in sitemap.
- Internal links resolve to existing pages.
- Public pages do not link to draft/noindex/review pages.

Indexability:

- Indexation only after explicit approval.
- `noindex:false` only in approved indexable state.
- Canonical matches language route.
- Robots tags match page state.

Content quality:

- Unique title, description, H1, primary keyword, and primary intent.
- Clear above-the-fold value proposition.
- Useful commercial sections, not thin keyword pages.
- FAQ only when useful and truthful.
- No keyword stuffing.
- No fake stats, reviews, guarantees, or unsupported product claims.

Internal authority:

- No duplicate/cannibalizing owner intent.
- Product/service intent has a clear owner.
- Supporting blog links are used only when public and relevant.
- Related links are real and language-correct.

Visual quality:

- Homepage-based design reference.
- Mobile QA.
- No horizontal overflow.
- CTA, FAQ, related links, and breadcrumbs render.

Release quality:

- URL origin proof exists.
- Intent owner, route owner, and canonical owner are documented.
- Protected route check passes.
- Sitemap eligibility check passes.
- Human approval before noindex review.
- Human/indexation approval before indexation.

## Missing Rules

### Missing P0: `/en` route prohibition

Source evidence:

- `public/llms.txt` lists English pages at root and Russian pages under `/ru`.
- `src/App.jsx` and blog route architecture use root EN routes and `/ru` RU routes, not `/en`.

Recommended SEO Pages Engine update:

- Validation fails if `language: "en"` page path starts with `/en`.
- Validation fails if `language: "ru"` page path does not start with `/ru`.

Priority:

- P0 before SEO page topic import.

### Missing P1: approved-only hreflang

Source evidence:

- Blog pages render `article.hreflang` when present.
- Existing rules require indexability and language correctness, but SEO Pages Engine needs a stricter page-state-aware validator.

Recommended SEO Pages Engine update:

- Hreflang alternates can point only to existing, approved, routable, valid counterpart pages.
- Do not point hreflang to planning, quarantine, or noindex review pages.

Priority:

- P1 before indexation.

## Gap Matrix

| Missing or adapted rule | Source article rule | Recommended SEO Pages Engine update | Priority | Risk if not added |
| --- | --- | --- | --- | --- |
| EN `/en` prohibition and RU `/ru` requirement | App/public URL architecture | Add language/path validator | P0 before topic import | Unsupported duplicate language URLs |
| Product capability claim validation | `docs/product-reality-claims.md`, `scripts/check-blog-product-claims.mjs` | Adapt checker for SEO page content/sections/CTA | P0 before page creation | Unsupported commercial claims |
| Product guarantees/fake stats/reviews block | `scripts/check-blog-editorial-product-qa.mjs` | Add SEO page editorial safety checker | P0 before page creation | Misleading claims |
| Approved-only hreflang | Blog hreflang rendering | Add hreflang counterpart validator | P1 before indexation | Invalid locale alternates |
| Duplicate metadata across systems | Blog SEO meta hardening | Check title/H1/description/keyword/intent across blog/product/SEO inventory | P1 before indexation | Cannibalization |
| RU external AI availability/payment note | `docs/gemini-ru-article-draft-protocol.md` | Apply only to RU SEO pages mentioning external AI tools | P1 before indexation | Misleading RU availability/payment content |
| EN no Russia-specific disclaimer | `docs/gemini-ru-article-draft-protocol.md` | Fail generic EN SEO pages with RF payment/availability disclaimers | P1 before indexation | Off-intent EN pages |
| Rendered HTML QA for SEO pages | `scripts/check-blog-rendered-html.mjs` | Add SEO rendered HTML checker | P1 before indexation | Broken/non-crawlable pages |
| Visual/mobile QA for SEO pages | `scripts/check-blog-visual.mjs` | Add SEO visual QA gate | P1 before indexation | Poor mobile/visual quality |
| SEO release gate | `scripts/check-blog-release.mjs` | Compose existing SEO checks into a page release command later | P0 before page creation | Manual release can skip blockers |

## Read-Only Confirmation

This task created only new audit outputs.

Not modified by this task:

- Blog markdown.
- `src/content/blog/articles/`.
- `src/content/blog/intent-map.json`.
- Blog routing.
- Blog schema behavior.
- Blog checkers.
- Blog release gates.
- Existing product pages.
- Existing SEO pages.
- Existing URLs or slugs.
- `package.json`.
- `prerender.mjs`.
- `src/App.jsx`.
- `src/utils/schemaGenerator.js`.

Note:

- The worktree already contained pre-existing modified source integration files before this audit.
- `git diff --name-only` still reports those pre-existing tracked changes.
- This audit did not add tracked source diffs beyond the new documentation files.

## Recommended Next Step

Before importing SEO Pages Engine topics/backlog, add the missing P0 language/path rule to the SEO Pages Engine validation plan: EN pages must live at root and never under `/en`; RU pages must live under `/ru`.
