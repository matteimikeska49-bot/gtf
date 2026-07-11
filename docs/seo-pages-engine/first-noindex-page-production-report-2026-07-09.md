# First SEO Pages Engine Noindex Review Page Production Report

Date: 2026-07-09

## Selected Candidate

- Path: `/ru/templates/instagram-carousel`
- Language: `ru`
- Page type: `template`
- Template variant: `template_page`
- Primary keyword: `шаблоны каруселей instagram`
- Primary intent: choosing an Instagram carousel structure/template before preparing a draft in GoToFlow.
- State: `noindex_review`
- Routable for review: yes
- Indexation approved: no
- Sitemap eligible: no

## Why This Candidate Was Selected

Planning sources mark `/ru/templates/instagram-carousel` as a safe new registry page with low route risk:

- `scratch/seo-demand-imports/2026-07-06/gotoflow_seo_action_map_FINAL_REVIEW_WITH_SITEMAP_2026-07-08.csv`
- `scratch/seo-demand-imports/2026-07-06/seo-route-only-manual-check-plan-2026-07-08.csv`
- `scratch/seo-demand-imports/2026-07-06/seo-url-origin-ledger-2026-07-08.csv`

The page is separate from protected product/tool generator routes because it owns template discovery intent, not generator ownership intent. Existing product/tool pages remain the owners for generator workflows.

## Content Completed

- Unique hero title and subtitle for Instagram carousel templates.
- Template categories: expert checklist, problem/solution, mistake breakdown, case/do-before-after, product/service announcement.
- Output examples for experts, agencies, and small businesses.
- How-to-use workflow for choosing a structure, adding context in GoToFlow, and editing before publication.
- FAQ covering author review, suitable carousel types, long/short structures, and the difference from generator pages.
- Related links to existing RU supporting blog articles and an existing protected product/tool route.
- Primary CTA and final CTA to `https://app.gotoflow.io`.

## Page State

- `state`: `noindex_review`
- `published`: `true`
- `routeReviewApproved`: `true`
- `noindex`: `true`
- `sitemapEligible`: `false`
- `approvedByHuman`: `false`
- `indexationApproved`: `false`

The page is ready for local/review routing, but it is not ready for indexation.

## Validation Results

Commands run:

- `node scripts/check-seo-pages.mjs`: passed
- `node scripts/check-seo-origin-ledger.mjs`: passed
- `node scripts/check-seo-route-intent-ownership.mjs`: passed with existing warnings unrelated to this page
- `node scripts/check-seo-related-links.mjs`: passed
- `node scripts/check-seo-sitemap-eligibility.mjs`: passed
- `node scripts/check-seo-product-claims.mjs`: passed
- `node scripts/check-seo-content-readiness.mjs`: passed
- `npm run check:seo`: passed
- `./node_modules/.bin/vite build --outDir /private/tmp/gotoflow-first-seo-noindex-page --emptyOutDir`: passed

Known existing warnings from route/intent ownership guardrail:

- `/ru/ii-generator-karuseley` matches an existing route owner and the existing owner wins.
- `/ru/ii-generator-karuseley` is in sitemap as an existing indexable route owner while the registry record is not routable.
- `/ru/vk-post-generator` still has supporting/overlap content to review.
- `/ru/telegram-post-generator` still has supporting/overlap content to review.

## Rendered DOM Inspection

Rendered via local preview of the safe build output.

- Title: `Шаблоны каруселей Instagram для экспертов | GoToFlow`
- Description: present and matches registry copy.
- Canonical: `https://gotoflow.io/ru/templates/instagram-carousel`
- Robots: `noindex, nofollow`
- H1 count: 1
- H1: `Шаблоны каруселей Instagram`
- FAQ visible: yes
- Related links visible: yes
- CTA links visible: yes
- Template category content visible: yes
- Schema types: `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `FAQPage`
- Article schema absent: yes

Route-specific prerendered HTML file was not generated because noindex review SEO pages are intentionally excluded from sitemap/prerender helpers.

## Sitemap And Prerender

- `getIndexableSeoPages()`: no selected page included.
- SEO sitemap helper pages: 0
- SEO prerender helper pages: 0
- `/ru/templates/instagram-carousel` is absent from the safe build sitemap output.

## Blog And Old SEO System Safety

- No blog markdown files were modified.
- No blog articles were created.
- No old product/tool routes were changed by this task.
- Existing protected product/tool routes remain the owners for generator intent.

## Remaining Before Indexation

- Approved-only hreflang validation.
- Final rendered HTML approval.
- Visual/mobile release approval.
- Manual approval to change state to `indexable_approved`.
- Manual approval to set `approvedByHuman: true`, `indexationApproved: true`, `noindex: false`, and `sitemapEligible: true`.

## Recommended Next Step

Open the local review URL and visually review `/ru/templates/instagram-carousel` on desktop and mobile. If approved later, move toward indexation one page at a time through the release gate.
