# SEO Pages Engine Final System Gates

Date: 2026-07-11

## Scope

This pass finalized P0 system gates for the non-blog GoToFlow SEO Pages Engine. The old blog SEO system remains separate and was not modified.

Protected areas not changed:

- `src/content/blog/`
- `src/content/blog/articles/`
- `src/content/blog/intent-map.json`
- `src/content/blog/demand-sources/`

## Reference Page State

Reference page:

- Path: `/ru/templates/instagram-carousel`
- State: `noindex_review`
- `noindex`: `true`
- `sitemapEligible`: `false`
- `indexationApproved`: `false`
- Canonical: `https://gotoflow.io/ru/templates/instagram-carousel`

The page remains routable for internal review but is excluded from SEO sitemap and SEO prerender helper output.

## Implemented Gates

### App CTA Routing

Product-action CTAs now route to `https://app.gotoflow.io` unless a verified app deep link is documented.

Updated reference-page conversion CTAs:

- Hero CTA
- Category-card CTA
- Ready carousel showcase cards
- Ready carousel section CTA
- Final CTA

Existing internal product/tool route links remain internal in related-material blocks.

### CTA Truth and Analytics

Clickable SEO CTAs now dispatch SEO analytics events with page, intent, CTA position, target URL, and destination metadata.

Tracked events:

- `seo_page_view`
- `seo_hero_cta_click`
- `seo_category_cta_click`
- `seo_workflow_cta_click`
- `seo_showcase_card_click`
- `seo_showcase_cta_click`
- `seo_faq_open`
- `seo_related_link_click`
- `seo_final_cta_click`

Events push to `window.dataLayer` when available and also dispatch a `seo-analytics` browser event.

### FAQ Policy

SEO pages can declare `faqPolicy`. The reference page preserves 11 FAQ items and requires:

- minimum 11 FAQ items
- maximum 15 FAQ items
- unique FAQ questions
- visible FAQ/schema parity

### Mandatory SEO Brief

Production-state SEO pages now require a `seoBrief` with:

- entity
- primary query
- primary intent
- user job
- unique angle
- audience
- content type
- platform
- language/country
- conversion action
- product route
- cannibalization boundary

### Section Relevance

Production-state SEO pages now require `sectionPolicy` entries for the resolved section order. Disabled sections must not appear in `templateSections`.

### Product Truth Registry

Added a central product truth registry for SEO page claims:

- app origin
- supported inputs
- supported outputs
- carousel types
- editor capabilities
- supported formats
- unsupported claim categories

Product claim validation now checks carousel type availability against this registry.

### Asset Validation

Added `check-seo-assets.mjs`.

The gate validates:

- local image paths
- allowed image extensions
- missing files
- meaningful alt text
- known width/height
- oversized asset warnings

### Readability and Interaction Truth

Production readiness now checks:

- title length
- description length
- H1 length
- hero subtitle length
- FAQ answer length
- CTA href/action validity
- app-origin conversion CTAs
- no placeholder/fake CTA targets

Previously visual “button-like” category/showcase elements are now real links.

### Rendered HTML Gate

Added `check-seo-rendered-html.mjs`.

The runtime gate validates:

- canonical
- robots/noindex
- single H1
- no Article schema on SEO pages
- FAQPage schema when FAQ is present
- app-origin CTA presence
- FAQ block presence
- product workflow presence
- ready carousel showcase presence
- final CTA presence
- image alt attributes
- link/button accessible names
- mobile horizontal overflow
- basic HTML size warning

### Controlled Indexation Transition

Production pages now require `indexationApproval`.

Noindex review pages must remain:

- `noindex: true`
- `sitemapEligible: false`
- `indexationApproved: false`

Indexable pages must have explicit approval metadata before sitemap eligibility.

### Approved-Only Hreflang

SEO page head rendering now emits hreflang only for `indexable_approved` pages that are not noindex.

### Structured Data

SEO pages continue to use WebPage/WebApplication/SoftwareApplication schema plus Breadcrumb and FAQ schema where configured. Article schema is reserved for blog routes and is blocked by the rendered HTML gate for SEO pages.

### Review Metadata

Production-state SEO pages now require a `review` object. Empty owner/version/review dates are allowed for `noindex_review`, but must be filled before `indexable_approved`.

## Validation Results

Commands run:

- `npm run check:seo`
- `npx vite build --outDir /private/tmp/gotoflow-seo-engine-safe-build --emptyOutDir`
- `PRERENDER_DIST_DIR=/private/tmp/gotoflow-seo-engine-safe-build node prerender.mjs`
- `node scripts/check-seo-rendered-html.mjs --url http://127.0.0.1:4187/ru/templates/instagram-carousel --path /ru/templates/instagram-carousel`

Results:

- SEO checks: passed
- Safe Vite build: passed
- Safe prerender: passed, 169 routes
- SEO sitemap helper pages: 0
- SEO prerender helper pages: 0
- Rendered HTML gate: passed
- Article schema on SEO page: not used
- FAQ schema: present
- Canonical: correct
- Noindex: present

Warnings:

- Vite reports the existing large JS chunk warning.
- Rendered runtime gate reports 30 tap targets below 44px.
- Ownership guardrail still warns about the known `/ru/ii-generator-karuseley` route collision.
- VK/Telegram noindex pages still have supporting/overlap blog intent to review.

## Remaining Human Actions

Before indexation:

- visually review `/ru/templates/instagram-carousel` on mobile and desktop
- decide whether small tap targets must be fixed before indexation
- fill review owner, review dates, and product version metadata
- complete human product truth review for feature claims
- approve indexation one page at a time
