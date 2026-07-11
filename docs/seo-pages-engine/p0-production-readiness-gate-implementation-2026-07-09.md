# SEO Pages Engine P0 Production Readiness Gate Implementation

Date: 2026-07-09

Audit source:

- `docs/seo-pages-engine/production-and-indexation-readiness-audit-2026-07-09.md`

Scope:

- GoToFlow SEO Pages Engine only.
- No blog markdown, blog checkers, blog routes, old product pages, topics, sitemap entries, indexation flags, commits, or pushes were changed.

## P0 Problems Fixed

The implementation adds a production-readiness gate so `noindex_review` and `indexable_approved` pages cannot pass with:

- empty required section objects
- empty examples or FAQ
- placeholder/TODO/TBD/lorem ipsum/test copy
- wrong required section order
- unknown or unsupported section ids
- missing primary or final CTA
- placeholder CTA hrefs such as `#`, empty strings, `javascript:`, TODO, or TBD
- CTA targets pointing at planning/quarantine SEO pages
- internal links to missing, duplicate, self, wrong-locale, planning, quarantine, or non-routable targets
- duplicate title, description, H1, primary intent, FAQ, examples, sections, full normalized content, or platform-substitution content
- missing human review approvals for content completeness, uniqueness, internal links, CTA relevance, and product claims

## State-Aware Validation

`planning_only` and `quarantined_review` remain soft planning/review states.

`noindex_review` and `indexable_approved` now require P0 production readiness through:

- `src/content/seoPages/helpers/contentReadiness.js`
- `src/content/seoPages/helpers/validation.js`
- `scripts/check-seo-content-readiness.mjs`

The new checker is wired into:

- `npm run check:seo`

## Required Section Rules

The gate uses the existing template variant definitions in `src/content/seoPages/templateVariants.js`.

For production states, each required variant section must:

- exist in the approved variant order
- contain meaningful non-placeholder content
- avoid empty objects and empty arrays
- avoid duplicate items within structured blocks
- avoid unknown or unsupported section ids

The gate does not enforce full content readiness for planning records.

## Variant-Specific Composition

`SeoPageTemplate` now renders from:

`templateVariant -> approved ordered section ids -> shared renderer map -> page data`

This keeps one shared design system while allowing different variants to render different section sets and section order.

No page-specific content was hardcoded in `SeoPageTemplate`, `App.jsx`, `prerender.mjs`, `schemaGenerator.js`, or shared section components.

## CTA Rules

For production states, CTA validation requires:

- primary CTA
- final CTA
- meaningful labels
- valid href or supported action
- no placeholder hrefs
- no invented `/en`
- correct locale for internal targets
- approved external target support for `https://app.gotoflow.io`
- no planning/quarantine SEO page targets
- supported CTA actions only

Editorial CTA relevance is represented by:

- `ctaReviewedByHuman: true`

## Internal-Link Rules

For production states, internal/related link validation checks:

- target existence where route context is available
- no self-links
- no duplicate hrefs
- descriptive anchors for structured internal links
- correct locale
- no invented `/en`
- no planning/quarantine SEO page targets
- no non-routable SEO page targets
- existing product/tool routes through protected route ownership
- public blog slug existence when blog context is available

Editorial link relevance is represented by:

- `internalLinksReviewedByHuman: true`

## Uniqueness Rules

The P0 gate blocks exact/normalized duplicates across production/review pages for:

- title
- description
- H1
- primary intent
- FAQ set
- examples
- section content
- full normalized content
- platform-neutral content where the only meaningful difference is a platform name

Human uniqueness approval is required through:

- `uniquenessReviewedByHuman: true`

## Human Approval Gates

Production states now require:

- `routeReviewApproved: true` through the existing state rule
- `contentReviewedByHuman: true`
- `uniquenessReviewedByHuman: true`
- `internalLinksReviewedByHuman: true`
- `ctaReviewedByHuman: true`
- `productClaimsReviewedByHuman: true`

These are not required for `planning_only`.

## Files Changed

- `src/content/seoPages/helpers/contentReadiness.js`
- `src/content/seoPages/helpers/validation.js`
- `src/content/seoPages/templateVariants.js`
- `src/components/seo/SeoPageTemplate.jsx`
- `src/components/seo/SeoPageWorkflow.jsx`
- `src/components/seo/SeoPageBenefits.jsx`
- `scripts/check-seo-content-readiness.mjs`
- `package.json`
- `src/content/seoPages/README.md`
- `src/content/seoPages/SYSTEM_MANIFEST.md`
- `src/content/seoPages/ENGINE_FILES.md`
- `docs/seo-pages-engine/p0-production-readiness-gate-implementation-2026-07-09.md`

## Exact Commands

```bash
node scripts/check-seo-content-readiness.mjs
npm run check:seo
./node_modules/.bin/vite build --outDir /private/tmp/gotoflow-seo-pages-p0-production-gate --emptyOutDir
```

## Fixture Coverage

The checker proves failure for:

1. `noindex_review` with empty required section object
2. `noindex_review` with empty examples
3. `noindex_review` with empty FAQ
4. `noindex_review` with placeholder content
5. missing final CTA
6. CTA href `#`
7. CTA pointing to `planning_only` target
8. related link pointing to `quarantined_review`
9. duplicate title
10. duplicate H1
11. duplicate FAQ set
12. duplicate full normalized content
13. page differing only by platform name
14. missing human uniqueness approval
15. wrong required section order

The checker also proves:

- incomplete `planning_only` content can pass planning validation
- a complete fixture for each template variant can pass

## What Remains P1

- approved-only hreflang validation
- rendered HTML validation
- visual/mobile release gate
