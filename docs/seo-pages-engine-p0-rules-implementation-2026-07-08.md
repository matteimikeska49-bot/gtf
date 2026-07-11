# SEO Pages Engine P0 Rules Implementation - 2026-07-08

## Source Audit Reference

This implementation follows the P0 missing/adapted rules from the Blog SEO Rules Audit:

- EN pages live at root paths.
- RU pages live under `/ru`.
- `/en` routes, canonicals, and hreflang URLs are forbidden.
- SEO Pages Engine content must block fake product features, fake stats, fake reviews, unsupported guarantees, unsupported automation claims, and absolute superiority claims.

## P0 Language/Path Rule

Implemented in:

- `src/content/seoPages/helpers/localeRules.js`
- `src/content/seoPages/helpers/validation.js`

Validation now enforces:

- `language: "en"` pages must use root paths without `/en` or `/ru`.
- `language: "ru"` pages must use `/ru` paths.
- EN pages must use `designReference: "/"`.
- RU pages must use `designReference: "/ru"`.
- Canonical-like page fields, when present, must not invent `/en` and must match the page language/path.
- Hreflang URLs must not invent `/en`; `ru` alternates must use `/ru`, and `en`/`x-default` alternates must use root paths.

## P0 Product Claim Rule

Implemented in:

- `src/content/seoPages/helpers/productClaims.js`
- `scripts/check-seo-product-claims.mjs`
- `package.json`

The checker scans SEO Pages Engine registry text fields:

- `title`
- `description`
- `h1`
- `heroSubtitle`
- `primaryIntent`
- `primaryKeyword`
- `productBridge`
- `sections`
- `faq`
- `cta`
- `examples`
- `benefits`
- `templates`
- `prompts`

Blocked claim categories:

- Unsupported guarantees.
- Fake or absolute performance statistics.
- Fake reviews or client-count claims.
- Unsupported full automation or direct publishing claims.
- Absolute market superiority claims.
- Unsupported upload/extraction automation claims.

Allowed safe wording:

- `помогает подготовить`
- `можно использовать для`
- `удобно собрать`
- `helps prepare`
- `can be used to`
- `helps structure`

The checker also avoids blocking questions and explicit negative/safety wording, so FAQ entries can safely explain that GoToFlow does not directly publish posts or that users should avoid invented results.

## Files Changed

- `package.json`
- `scripts/check-seo-product-claims.mjs`
- `src/content/seoPages/README.md`
- `src/content/seoPages/helpers/localeRules.js`
- `src/content/seoPages/helpers/productClaims.js`
- `src/content/seoPages/helpers/validation.js`
- `docs/seo-pages-engine-p0-rules-implementation-2026-07-08.md`

## Commands Run

- `git diff --name-only`
- `git diff --stat`
- `node scripts/check-seo-pages.mjs`
- `node scripts/check-seo-origin-ledger.mjs`
- `node scripts/check-seo-route-intent-ownership.mjs`
- `node scripts/check-seo-related-links.mjs`
- `node scripts/check-seo-sitemap-eligibility.mjs`
- `node scripts/check-seo-product-claims.mjs`
- `npm run check:seo`
- `./node_modules/.bin/vite build --outDir /private/tmp/gotoflow-seo-engine-p0-rules-build --emptyOutDir`

## SEO Publishing Platform Confirmation

This implementation did not modify:

- `src/content/blog/`
- `src/content/blog/articles/`
- `src/content/blog/intent-map.json`
- Blog routing
- Blog checkers
- Blog docs
- Blog schema behavior
- Existing blog release gates

## Not Changed

- No SEO pages were created.
- No topics were imported.
- No new routes were added.
- No sitemap/indexation logic was changed.
- No page was made routable.
- No page was made indexable.
- No existing product/tool page was changed.
- No commit or push was performed.

## Remaining P1 Rules

- Approved-only hreflang validation against existing approved/routable counterpart pages.
- Rendered HTML and visual/mobile QA gate for SEO Pages Engine before indexation.
