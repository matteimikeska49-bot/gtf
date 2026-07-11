# SEO Pages Engine Acceptance Audit - 2026-07-08

## Executive Summary

Status: accepted with conditions.

The non-blog SEO page engine architecture is accepted as a foundation for future page creation, but no new page creation or indexation should proceed until the corrected URL origin ledger is used to select a small approved batch. Current registry records are intentionally non-routable and excluded from sitemap/prerender output.

This audit did not create pages, change routes, change sitemap/indexation behavior, edit blog markdown, commit, push, or deploy.

## Architecture Verified

| Area | Result | Notes |
| --- | --- | --- |
| Content centralized | Pass | Non-blog SEO page registry content lives under `src/content/seoPages/`. |
| Template variants centralized | Pass | Variants are centralized in `src/content/seoPages/templateVariants.js`. |
| States centralized | Pass | State behavior is centralized in `src/content/seoPages/states.js`. |
| Protected routes centralized | Pass | Protected RU product/tool owners are centralized in `src/content/seoPages/protectedRoutes.js`. |
| Sitemap eligibility centralized | Pass | Sitemap/prerender eligibility is exposed through `src/content/seoPages/sitemapEligibility.js` and used by `prerender.mjs`. |
| Validation centralized | Pass | Registry contract checks are centralized in `src/content/seoPages/helpers/validation.js` and script wrappers under `scripts/check-seo-*.mjs`. |
| One-off page layouts found | No | SEO rendering is centralized in `src/components/seo/`; no separate ad hoc SEO page layouts were found during this audit. |

## Registry State Snapshot

Runtime registry inspection returned:

- Total SEO registry records: 10
- `planning_only`: 6
- `quarantined_review`: 4
- Routable SEO registry pages: 0
- SEO sitemap helper pages: 0
- SEO prerender helper pages: 0
- Registry validation errors: 0

## Protected Routes

| Path | Live owner preserved | Registry can override | Notes |
| --- | --- | --- | --- |
| `/ru/ai-generator-karuselej` | Yes | No | Protected by `App.jsx:RuAICarouselGeneratorPage`. |
| `/ru/generator-karuselej-instagram` | Yes | No | Protected alias for existing RU carousel product/tool page. |
| `/ru/ii-generator-karuseley` | Yes | No | Protected by `App.jsx:RuAICarouselGeneratorPage`; existing owner remains first in route order. |
| `/ru/generator-kontenta` | Yes | No | Protected by `App.jsx:AIContentPageRu`. |
| `/ru/ii-generator-kontenta` | Yes | No | Protected alias for existing RU content generator product/tool page. |
| `/ru/generator-postov-instagram` | Yes | No | Protected by `App.jsx:InstagramPostPageRu`. |
| `/ru/ii-generator-postov-dlya-instagram` | Yes | No | Protected alias for existing RU Instagram post generator page. |
| `/ru/generator-karuselej-linkedin` | Yes | No | Protected by `App.jsx:LinkedInCarouselPageRu`. |
| `/ru/ii-generator-postov-dlya-linkedin` | Yes | No | Protected alias for existing RU LinkedIn post generator page. |

## Current Candidates

| Path | State | Routable | Indexable | Sitemap eligible | Production ready | Reason |
| --- | --- | --- | --- | --- | --- | --- |
| `/ru/generator-karuseley` | `planning_only` | No | No | No | No | Candidate remains planning-only and requires origin/intent approval before routing. |
| `/ru/ii-generator-karuseley` | `planning_only` | No | No | No | No | Existing product/tool route owner is protected; registry record cannot take over. |
| `/ru/generator-postov-dlya-socsetey` | `planning_only` | No | No | No | No | Candidate remains planning-only and requires origin/intent approval before routing. |
| `/ru/instagram-carousel-generator` | `planning_only` | No | No | No | No | Candidate remains planning-only and requires origin/intent approval before routing. |
| `/ru/instagram-post-generator` | `planning_only` | No | No | No | No | Candidate remains planning-only and requires origin/intent approval before routing. |
| `/ru/vk-post-generator` | `quarantined_review` | No | No | No | No | Quarantined review candidate; route review is not approved. |
| `/ru/telegram-post-generator` | `quarantined_review` | No | No | No | No | Quarantined review candidate; route review is not approved. |
| `/ru/linkedin-carousel-generator` | `planning_only` | No | No | No | No | Candidate remains planning-only and requires origin/intent approval before routing. |
| `/ru/platforms/instagram-carousel` | `quarantined_review` | No | No | No | No | Quarantined review candidate; route review is not approved. |
| `/ru/templates/instagram-carousel` | `quarantined_review` | No | No | No | No | Quarantined review candidate; route review is not approved. |

## State Model Verified

| State | Routing behavior | Indexing behavior | Acceptance result |
| --- | --- | --- | --- |
| `planning_only` | Not routable | Not indexable | Pass |
| `quarantined_review` | Not routable unless explicit `routeReviewApproved` exists | Not indexable | Pass |
| `noindex_review` | Routable only with explicit route review approval | Not indexable | Pass |
| `indexable_approved` | Routable only with human/indexation approvals and `noindex: false` | Indexable only when approvals and sitemap eligibility are true | Pass |

## Template Variant System Verified

| Variant | Required sections validated |
| --- | --- |
| `commercial_tool` | Yes |
| `platform_page` | Yes |
| `template_page` | Yes |
| `example_page` | Yes |
| `alternative_page` | Yes |
| `prompt_page` | Yes |
| `use_case_page` | Yes |

Additional template validation results:

- Arbitrary layout allowed: No
- Homepage design reference required: Yes, via centralized SEO components and shared page template patterns.
- Article schema blocked: Yes. `Article`, `BlogPosting`, and `NewsArticle` are blocked for non-blog SEO pages.

## Validation Commands

| Command | Result |
| --- | --- |
| `npm run check:seo` | Pass |
| `node scripts/check-seo-pages.mjs` | Pass, covered by `npm run check:seo` |
| `node scripts/check-seo-origin-ledger.mjs` | Pass, covered by `npm run check:seo` |
| `node scripts/check-seo-route-intent-ownership.mjs` | Pass with expected review warnings for protected/overlap paths |
| `node scripts/check-seo-related-links.mjs` | Pass, covered by `npm run check:seo` |
| `node scripts/check-seo-sitemap-eligibility.mjs` | Pass; SEO sitemap helper pages: 0; prerender helper pages: 0 |
| `./node_modules/.bin/vite build --outDir /private/tmp/gotoflow-seo-engine-acceptance-build --emptyOutDir` | Pass |

Build note: Vite emitted only the existing chunk-size warning. The acceptance build wrote to `/private/tmp/gotoflow-seo-engine-acceptance-build`, not project `dist`.

## Guardrail Simulations

Fail-fast checks were simulated in memory without editing files:

- Missing required sections are rejected.
- `Article` schema on a non-blog SEO page is rejected.
- Attempted registry takeover of `/ru/ii-generator-karuseley` is rejected because the protected `App.jsx:RuAICarouselGeneratorPage` owner wins.

## Sitemap, Route, and Source Safety

| Area | Result | Notes |
| --- | --- | --- |
| Sitemap changed | No | No project sitemap file was modified by this audit. |
| Routes changed | No | This audit made no route edits. Existing hard-coded RU product routes remain before SEO registry catch-all routes. |
| Source pages created | No | No new source page/component route was created. |
| Blog markdown changed | No | `git status --short src/content/blog/articles` returned clean. |
| Existing product pages changed | No | This audit did not edit existing product/tool page components. |
| Commit | No | No commit performed. |
| Push | No | No push performed. |

## Blockers Before Page Creation

- Use the corrected URL origin ledger before selecting any page creation batch.
- Do not route registry candidates until `routeReviewApproved` is explicitly set for each approved candidate.
- Do not index any registry page until `approvedByHuman`, `indexationApproved`, `noindex: false`, and sitemap eligibility are all intentionally set.
- Resolve protected-route ownership before any migration from an existing product/tool route to the SEO registry.
- Review intent overlap warnings for `/ru/vk-post-generator` and `/ru/telegram-post-generator` before promoting either page.
- Keep all non-blog SEO content/config centralized in `src/content/seoPages/` and `src/components/seo/`.

## Recommended Next Step

If accepted, select a small approved batch from the corrected URL origin ledger and convert only approved candidates to `noindex_review` through the SEO page engine.
