# SEO Route Intent Ownership Guardrail

Date: 2026-07-08

## Why This Exists

The RU URL inventory found that Russian product, tool, scenario, legal, hub, and blog routes already exist. A new non-blog SEO registry page must therefore never become routable or indexable just because a registry record exists.

The immediate incident was `/ru/ii-generator-karuseley`: a P0 SEO registry record used a path that already belonged to an existing RU product/tool route. The permanent rule is broader: every current and future SEO registry page needs route ownership and intent ownership before it can route or enter sitemap/prerender.

## Route Sources To Check

Future batches must check:

- `src/App.jsx` hard-coded routes
- Existing product/tool components and aliases
- Existing RU scenario/use-case route patterns
- Existing landing, legal, and hub pages
- RU blog articles under `src/content/blog/articles/*.md`
- `src/content/blog/intent-map.json` when intent ownership is relevant
- `src/content/seoPages/index.js`
- `prerender.mjs`
- `dist/sitemap.xml` when present
- Future route config or data files that generate pages
- Docs only when they document route ownership or planned route ownership

## Route Collision Definition

A route collision exists when a SEO registry page path equals an existing non-registry production route path.

The registry must report the conflict clearly. A conflicting registry page must not silently override the existing route owner.

## Intent Cannibalization Definition

An intent cannibalization risk exists when a new registry page has the same or very similar SEO intent as an existing page or article, even if the URL is different.

Intent overlap is not a deletion instruction. It is an ownership decision that determines whether the keyword should become a new page, update an existing page, merge into another page, support a blog article, or stay in manual review.

## Allowed Decisions

Registry ownership decisions must use one of:

- `safe_new_registry_page`
- `update_existing_page_instead`
- `merge_into_existing_page`
- `supporting_blog_article`
- `faq_h2_only`
- `secondary_keyword_only`
- `manual_review_required`
- `explicit_migration_required`

## Explicit Migration Rule

If a registry page uses a path that already belongs to an existing route, it can only become routable after an explicit migration decision.

Required migration fields:

- `oldRouteOwner`
- `newRouteOwner`
- `migrationReason`
- `canonicalDecision`
- `noindexDecision`
- `sitemapDecision`
- `rollbackPlan`
- `approvedByHuman`

`approvedByHuman` must be `false` by default. Without human approval, the existing route owner wins.

## Runtime And Build Enforcement

The registry now stores ownership decisions in `src/content/seoPages/index.js`.

The registry helpers only expose pages for routing, hubs, sitemap, and prerender when ownership allows it:

- `getPublishedSeoPages()`
- `getSeoPageByRoute()`
- `getSeoPageByPath()`
- `getSeoPagesForSitemap()`
- `getSeoPagesForPrerender()`

The check script is:

- `scripts/check-seo-route-intent-ownership.mjs`

The build script runs this guard before Vite:

- `npm run build`

This check rebuilds route inventory from `App.jsx`, RU blog markdown, `prerender.mjs`, `dist/sitemap.xml`, and the SEO registry. It fails if a published registry page collides with a non-registry route owner without approved migration, if an unresolved ownership decision is routable, or if noindex registry pages enter sitemap/prerender helper output.

## Future Batch Process

Before adding or activating any SEO registry page:

1. Add the full registry record with planning, keyword, and intent data.
2. Add an explicit `ownershipDecision`.
3. Run `npm run check:seo-route-intent`.
4. If the page collides with an existing route, keep it non-routable unless the migration fields are complete and human-approved.
5. If the page overlaps an existing SEO intent, classify it with one of the allowed decisions.
6. Only `safe_new_registry_page` or human-approved explicit migrations may become routable.
7. Only published, route-allowed, non-noindex pages may enter sitemap or prerender.

## Current P0 Audit Outcome

Safe noindex registry pages:

- `/ru/vk-post-generator`
- `/ru/telegram-post-generator`

These remain:

- `published: true`
- `noindex: true`
- `ownershipDecision.decision: safe_new_registry_page`

Update-existing or migration-review backlog:

- `/ru/generator-karuseley`
- `/ru/ii-generator-karuseley`
- `/ru/generator-postov-dlya-socsetey`
- `/ru/instagram-carousel-generator`
- `/ru/instagram-post-generator`
- `/ru/linkedin-carousel-generator`

These are preserved in the registry as planning/keyword/content data, but are not active routable registry pages.

## Existing Route Owner Wins

The existing route owner wins unless a human-approved migration exists.

For `/ru/ii-generator-karuseley`, the existing route owner is the RU carousel product/tool route. The registry record remains preserved as migration-review backlog, but it does not route, sitemap, or prerender.

## Backlog

The current update-existing/migration-review backlog is:

- `scratch/seo-demand-imports/2026-07-06/seo-p0-update-existing-backlog-2026-07-08.csv`
