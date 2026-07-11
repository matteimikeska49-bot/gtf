# SEO Pages Engine Implementation Report

Date: 2026-07-08

## What Was Built

Built the reusable non-blog SEO/service/product page engine foundation. This was engine work only:

- no production SEO pages created;
- no new URLs added;
- no candidate pages added to sitemap;
- no candidate pages made indexable;
- no blog markdown changed;
- no existing product/tool pages changed.

## Blog Architecture Copied

The blog system contributed the architectural pattern:

- centralized content source;
- explicit metadata contract;
- language-aware routing;
- published/noindex lifecycle concept;
- centralized renderer;
- centralized head/schema;
- sitemap/prerender discovery;
- validation scripts and release gates;
- batch planning through scratch/docs artifacts.

## Intentionally Not Copied

- Blog article layout was not copied.
- Article/BlogPosting schema was not copied.
- Blog markdown was not used for SEO pages.
- Blog articles were not treated as commercial page proof.

## Final Folder Structure

- `src/content/seoPages/README.md`
- `src/content/seoPages/index.js`
- `src/content/seoPages/registry.js`
- `src/content/seoPages/schema.js`
- `src/content/seoPages/states.js`
- `src/content/seoPages/templateVariants.js`
- `src/content/seoPages/protectedRoutes.js`
- `src/content/seoPages/pages/ru/README.md`
- `src/content/seoPages/helpers/routeOwnership.js`
- `src/content/seoPages/helpers/sitemapEligibility.js`
- `src/content/seoPages/helpers/originLedger.js`
- `src/content/seoPages/helpers/intentOwnership.js`
- `src/content/seoPages/helpers/relatedLinks.js`
- `src/content/seoPages/helpers/validation.js`
- `src/components/seo/SeoPageTemplate.jsx`
- `src/components/seo/SeoPageHead.jsx`
- `src/components/seo/SeoPageHero.jsx`
- `src/components/seo/SeoPageSection.jsx`
- `src/components/seo/SeoPageBenefits.jsx`
- `src/components/seo/SeoPageWorkflow.jsx`
- `src/components/seo/SeoPageExamples.jsx`
- `src/components/seo/SeoPageFAQ.jsx`
- `src/components/seo/SeoPageCTA.jsx`
- `src/components/seo/SeoPageRelatedLinks.jsx`
- `scripts/check-seo-pages.mjs`
- `scripts/check-seo-origin-ledger.mjs`
- `scripts/check-seo-route-intent-ownership.mjs`
- `scripts/check-seo-related-links.mjs`
- `scripts/check-seo-sitemap-eligibility.mjs`

## State Model

- `planning_only`: not routable, not indexable, not in sitemap.
- `quarantined_review`: not routable by default, not indexable, not in sitemap.
- `noindex_review`: routable for QA with robots noindex, excluded from sitemap.
- `indexable_approved`: routable, indexable, sitemap eligible only with approval.

## Template Variants

- `commercial_tool`
- `platform_page`
- `template_page`
- `example_page`
- `alternative_page`
- `prompt_page`
- `use_case_page`

Template variants define required sections and prevent custom per-URL layouts.

## Metadata Contract

The contract is implemented in `helpers/validation.js`. It requires explicit identity, state, template, SEO, ownership, approval, related-link, schema, and risk metadata.

## Protected Routes

`protectedRoutes.js` defines protected existing owners. Existing hard-coded product/tool routes win unless an explicit approved migration exists.

Protected known RU product/tool owners include:

- `/ru/ai-generator-karuselej`
- `/ru/ii-generator-karuseley`
- `/ru/generator-kontenta`
- `/ru/generator-postov-instagram`
- `/ru/generator-karuselej-linkedin`

Additional hard-coded aliases are protected as well.

## Current Candidate Status

The current registry records are retained as data but are not production-ready:

| Path | State | Routable | Indexable | Sitemap eligible | Reason |
|---|---|---:|---:|---:|---|
| `/ru/vk-post-generator` | `quarantined_review` | no | no | no | Candidate is not human-approved. |
| `/ru/telegram-post-generator` | `quarantined_review` | no | no | no | Candidate is not human-approved. |
| `/ru/ii-generator-karuseley` | `planning_only` | no | no | no | Existing product/tool route owner wins. |

No registry pages are currently returned by the SEO sitemap/prerender helpers.

## Validation Scripts

Added:

- `scripts/check-seo-pages.mjs`
- `scripts/check-seo-origin-ledger.mjs`
- `scripts/check-seo-related-links.mjs`
- `scripts/check-seo-sitemap-eligibility.mjs`

Extended by centralized helpers:

- `scripts/check-seo-route-intent-ownership.mjs`

Added safe aggregate:

- `npm run check:seo`

## Remaining Blockers Before Creating Pages

- Human approval of this architecture.
- Human selection of URL candidates from the corrected origin ledger.
- URL origin proof for each candidate.
- Intent owner proof for each candidate.
- Design review against `/ru` homepage.
- Route review approval before `noindex_review`.
- Indexation approval before `indexable_approved`.

## Exact Next Step

Review and approve the SEO page engine architecture. After approval, select approved URL candidates from the corrected origin ledger and move only approved candidates into `noindex_review` through the controlled `templateVariant` system.
