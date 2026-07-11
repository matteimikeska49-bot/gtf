# SEO Action Map: Sitemap-Aware Ownership - 2026-07-08

## Why Sitemap Is Required

Sitemap presence is a strong signal that a URL is currently intended as an indexable route owner. A future SEO registry page must not silently reuse a sitemap URL unless the work is explicitly updating that existing owner or a human-approved migration exists.

## Current Sitemap Findings

- Total sitemap URLs: 160
- RU sitemap URLs: 92
- Duplicate sitemap loc values: 0
- Placeholder route patterns in sitemap: 0
- Routeable noindex registry URLs in sitemap: 0
- Sitemap-only URLs needing check: 68
- Route-only URLs needing check: 17

## Current Indexable RU Product / Tool Owners

- /ru/ai-generator-karuselej: in_sitemap
- /ru/ii-generator-karuseley: in_sitemap
- /ru/generator-kontenta: in_sitemap
- /ru/generator-postov-instagram: in_sitemap
- /ru/generator-karuselej-linkedin: in_sitemap

## Current Noindex Registry Review Pages

- /ru/vk-post-generator: noindex_review_not_in_sitemap, approvedByHuman=false
- /ru/telegram-post-generator: noindex_review_not_in_sitemap, approvedByHuman=false

## Status Values

Allowed `sitemapStatus`: `in_sitemap`, `not_in_sitemap`, `noindex_review_not_in_sitemap`, `route_only_needs_check`, `sitemap_only_needs_check`, `unknown`.

Allowed `existingRouteStatus`: `existing_indexable_route`, `existing_route_not_in_sitemap`, `existing_blog_article`, `existing_registry_noindex`, `new_route_candidate`, `conflict`, `unknown`.

Allowed `action`: `create_new_registry_page_noindex_review`, `create_new_registry_page_after_approval`, `update_existing_page_instead`, `merge_into_existing_page`, `keep_as_supporting_blog_article`, `use_as_faq_h2`, `keep_as_secondary_keyword`, `manual_review_required`, `explicit_migration_required`, `hold_not_deleted`.

## How Future Batches Must Pass Checks

1. Check route inventory first.
2. Check sitemap presence before assigning a target path.
3. Check registry status and noindex status.
4. Treat sitemap URLs as existing indexable owners.
5. Treat route-only URLs as manual review, not automatically safe.
6. Keep noindex registry review URLs out of sitemap.
7. Use explicit migration fields and `approvedByHuman: true` before any registry takeover of an existing route.

## Current Action Map Summary

- File: `scratch/seo-demand-imports/2026-07-06/gotoflow_seo_action_map_FINAL_REVIEW_WITH_SITEMAP_2026-07-08.csv`
- Total rows: 22
- create_new_registry_page_noindex_review: 4
- explicit_migration_required: 1
- manual_review_required: 8
- update_existing_page_instead: 9

## Next Step

Use the sitemap-aware final action map to choose the next safe batch: either update existing indexable product/tool pages or visually review the two noindex registry pages before indexation.
