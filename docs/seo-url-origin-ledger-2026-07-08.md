# SEO URL Origin Ledger

Date: 2026-07-08

## Why This Ledger Is Required

SEO URL work mixed existing product/tool pages, existing blog articles, and new registry candidates. That is unsafe because an existing sitemap URL can already own a commercial intent, while an article can only support a commercial URL unless an action map proves distinct commercial intent. This ledger documents URL origin, current owner, sitemap status, registry status, and allowed action before any further SEO page work.

## Corrections

- The primary design reference for non-blog SEO/product pages is the /ru homepage. Existing product/tool pages were originally based on the homepage style and should not be replaced by invented registry page layouts without approval.
- /ru/ii-generator-karuseley is an existing sitemap/indexable product/tool page owned by the hard-coded RuAICarouselGeneratorPage route. It must not be recreated as an independent registry page unless a human-approved migration exists.
- Blog articles are supporting content. Existing blog URLs do not automatically justify creating a new commercial URL.
- Registry candidates require origin proof, intent owner proof, and human approval before they can become indexable or be expanded into more pages.

## Summary

- Total URLs audited: 198
- Existing product/tool URLs: 22
- Existing blog URLs: 138
- New registry noindex candidates: 8
- Manually inferred candidates: 0
- Blocked duplicates: 1
- Manual review required: 25

## Required URL Answers

| Path | Source of URL | Current status | Existing before registry | Created by registry work | Allowed action | Reason |
|---|---|---|---|---|---|---|
| /ru/ii-generator-karuseley | existing_sitemap_product_tool | existing_indexable_product_tool | yes | yes | update_existing_page_only | Existing sitemap/indexable product-tool route owner wins; registry recreation is blocked without approved migration. |
| /ru/vk-post-generator | seo_registry_candidate | new_registry_noindex_candidate | no | yes | manual_review_required | Registry/action-map candidate is not human-approved; related blog articles are insufficient origin proof for indexation or expansion. |
| /ru/telegram-post-generator | seo_registry_candidate | new_registry_noindex_candidate | no | yes | manual_review_required | Registry/action-map candidate is not human-approved; related blog articles are insufficient origin proof for indexation or expansion. |
| /ru/blog/generator-karuseley-dlya-vk | existing_sitemap_blog | existing_indexable_blog | yes | no | keep_as_blog_support | Existing blog article is supporting content and does not automatically justify a commercial registry URL. |
| /ru/blog/kak-napisat-post-v-vk-s-pomoshyu-ii | existing_sitemap_blog | existing_indexable_blog | yes | no | keep_as_blog_support | Existing blog article is supporting content and does not automatically justify a commercial registry URL. |
| /ru/blog/temy-postov-dlya-gruppy-vkontakte | existing_sitemap_blog | existing_indexable_blog | yes | no | keep_as_blog_support | Existing blog article is supporting content and does not automatically justify a commercial registry URL. |
| /ru/blog/krasivye-posty-dlya-vk-oformlenie | existing_sitemap_blog | existing_indexable_blog | yes | no | keep_as_blog_support | Existing blog article is supporting content and does not automatically justify a commercial registry URL. |
| /ru/blog/razmer-foto-dlya-posta-vk-formaty | existing_sitemap_blog | existing_indexable_blog | yes | no | keep_as_blog_support | Existing blog article is supporting content and does not automatically justify a commercial registry URL. |

## Existing Before Registry Work

Existing product/tool owners are sitemap or hard-coded route owners. They can only be updated in place after approval. Representative product/tool owners found:

| Path | Current status | Evidence | Allowed action |
|---|---|---|---|
| / | existing_indexable_product_tool | dist/sitemap.xml ; seo-sitemap-audit CSV ; src/App.jsx exact route | update_existing_page_only |
| /ai-carousel-maker | existing_indexable_product_tool | dist/sitemap.xml ; seo-sitemap-audit CSV ; src/App.jsx exact route | update_existing_page_only |
| /ai-content-generator | existing_indexable_product_tool | dist/sitemap.xml ; seo-sitemap-audit CSV ; src/App.jsx exact route | update_existing_page_only |
| /ai-instagram-post-generator | existing_indexable_product_tool | dist/sitemap.xml ; seo-sitemap-audit CSV ; src/App.jsx exact route | update_existing_page_only |
| /blog | existing_indexable_product_tool | dist/sitemap.xml ; seo-sitemap-audit CSV ; src/App.jsx exact route | update_existing_page_only |
| /linkedin-carousel-maker | existing_indexable_product_tool | dist/sitemap.xml ; seo-sitemap-audit CSV ; src/App.jsx exact route | update_existing_page_only |
| /personal-data-consent | existing_indexable_product_tool | dist/sitemap.xml ; seo-sitemap-audit CSV ; src/App.jsx exact route | update_existing_page_only |
| /pricing | existing_indexable_product_tool | dist/sitemap.xml ; seo-sitemap-audit CSV ; src/App.jsx exact route | update_existing_page_only |
| /privacy-policy | existing_indexable_product_tool | dist/sitemap.xml ; seo-sitemap-audit CSV ; src/App.jsx exact route | update_existing_page_only |
| /refund-policy | existing_indexable_product_tool | dist/sitemap.xml ; seo-sitemap-audit CSV ; src/App.jsx exact route | update_existing_page_only |
| /ru | existing_indexable_product_tool | dist/sitemap.xml ; seo-ru-url-inventory CSV ; seo-sitemap-audit CSV ; src/App.jsx exact route ; docs/seo-p0-batch-implementation-2026-07-08.md\|docs/seo-page-registry-implementation-2026-07-08.md | update_existing_page_only |
| /ru/ai-generator-karuselej | existing_indexable_product_tool | dist/sitemap.xml ; seo-ru-url-inventory CSV ; seo-sitemap-audit CSV ; action map: existing-owner-ru-ai-generator-karuselej ; src/App.jsx exact route ; docs/seo-action-map-sitemap-aware-ownership-2026-07-08.md\|docs/seo-demand-00c-repo-validation-2026-07-06-report.md\|docs/seo-page-system-audit-2026-07-08.md\|docs/seo-production-next-step-plan-2026-07-08.md | update_existing_page_only |
| /ru/blog | existing_indexable_product_tool | dist/sitemap.xml ; seo-ru-url-inventory CSV ; seo-sitemap-audit CSV ; src/App.jsx exact route ; docs/seo-article-template-v2.md\|docs/seo-content-plan.md\|docs/seo-page-registry-implementation-2026-07-08.md\|docs/seo-page-system-audit-2026-07-08.md | update_existing_page_only |
| /ru/generator-karuselej-linkedin | existing_indexable_product_tool | dist/sitemap.xml ; seo-ru-url-inventory CSV ; seo-sitemap-audit CSV ; action map: existing-owner-ru-generator-karuselej-linkedin ; src/App.jsx exact route ; docs/seo-action-map-sitemap-aware-ownership-2026-07-08.md\|docs/seo-article-template-v2.md\|docs/seo-page-system-audit-2026-07-08.md\|docs/seo-production-next-step-plan-2026-07-08.md | update_existing_page_only |
| /ru/generator-kontenta | existing_indexable_product_tool | dist/sitemap.xml ; seo-ru-url-inventory CSV ; seo-sitemap-audit CSV ; action map: existing-owner-ru-generator-kontenta ; src/App.jsx exact route ; docs/seo-action-map-sitemap-aware-ownership-2026-07-08.md\|docs/seo-demand-00c-repo-validation-2026-07-06-report.md\|docs/seo-page-system-audit-2026-07-08.md\|docs/seo-production-next-step-plan-2026-07-08.md | update_existing_page_only |
| /ru/generator-postov-instagram | existing_indexable_product_tool | dist/sitemap.xml ; seo-ru-url-inventory CSV ; seo-sitemap-audit CSV ; action map: existing-owner-ru-generator-postov-instagram ; src/App.jsx exact route ; docs/seo-action-map-sitemap-aware-ownership-2026-07-08.md\|docs/seo-demand-00c-repo-validation-2026-07-06-report.md\|docs/seo-page-system-audit-2026-07-08.md\|docs/seo-production-next-step-plan-2026-07-08.md | update_existing_page_only |
| /ru/ii-generator-karuseley | existing_indexable_product_tool | dist/sitemap.xml ; seo-ru-url-inventory CSV ; seo-sitemap-audit CSV ; action map: existing-owner-ru-ii-generator-karuseley ; src/App.jsx exact route ; src/content/seoPages/index.js: ru-commercial-ii-generator-karuseley ; docs/seo-action-map-sitemap-aware-ownership-2026-07-08.md\|docs/seo-p0-batch-implementation-2026-07-08.md\|docs/seo-page-system-audit-2026-07-08.md\|docs/seo-production-next-step-plan-2026-07-08.md | update_existing_page_only |
| /ru/politika | existing_indexable_product_tool | dist/sitemap.xml ; seo-ru-url-inventory CSV ; seo-sitemap-audit CSV ; src/App.jsx exact route ; docs/seo-page-system-audit-2026-07-08.md\ | update_existing_page_only |
| /ru/polzovatelskoe-soglashenie | existing_indexable_product_tool | dist/sitemap.xml ; seo-ru-url-inventory CSV ; seo-sitemap-audit CSV ; src/App.jsx exact route ; docs/seo-page-system-audit-2026-07-08.md\ | update_existing_page_only |
| /ru/soglasie-na-obrabotku-personalnyh-dannyh | existing_indexable_product_tool | dist/sitemap.xml ; seo-ru-url-inventory CSV ; seo-sitemap-audit CSV ; src/App.jsx exact route ; docs/seo-page-system-audit-2026-07-08.md\ | update_existing_page_only |
| /ru/ugc-creator-terms | existing_indexable_product_tool | dist/sitemap.xml ; seo-ru-url-inventory CSV ; seo-sitemap-audit CSV ; src/App.jsx exact route ; docs/seo-page-system-audit-2026-07-08.md\ | update_existing_page_only |
| /terms-of-service | existing_indexable_product_tool | dist/sitemap.xml ; seo-sitemap-audit CSV ; src/App.jsx exact route | update_existing_page_only |

Existing blog articles remain supporting content and should keep blog ownership. The full list is in the CSV ledger.

## Created Or Proposed By Registry Work

| Path | Current status | Sitemap | Approved by human | Allowed action | Blocked reason |
|---|---|---|---|---|---|
| /ru/platforms/instagram-carousel | new_registry_noindex_candidate | no | false | manual_review_required | Registry/action-map candidate is not human-approved; related blog articles are insufficient origin proof for indexation or expansion. |
| /ru/prompts | new_registry_noindex_candidate | no | false | manual_review_required | Registry/action-map candidate is not human-approved; related blog articles are insufficient origin proof for indexation or expansion. |
| /ru/telegram-post-generator | new_registry_noindex_candidate | no | false | manual_review_required | Registry/action-map candidate is not human-approved; related blog articles are insufficient origin proof for indexation or expansion. |
| /ru/templates | new_registry_noindex_candidate | no | false | manual_review_required | Registry/action-map candidate is not human-approved; related blog articles are insufficient origin proof for indexation or expansion. |
| /ru/templates/instagram-carousel | new_registry_noindex_candidate | no | false | manual_review_required | Registry/action-map candidate is not human-approved; related blog articles are insufficient origin proof for indexation or expansion. |
| /ru/tools | new_registry_noindex_candidate | no | false | manual_review_required | Registry/action-map candidate is not human-approved; related blog articles are insufficient origin proof for indexation or expansion. |
| /ru/use-cases | new_registry_noindex_candidate | no | false | manual_review_required | Registry/action-map candidate is not human-approved; related blog articles are insufficient origin proof for indexation or expansion. |
| /ru/vk-post-generator | new_registry_noindex_candidate | no | false | manual_review_required | Registry/action-map candidate is not human-approved; related blog articles are insufficient origin proof for indexation or expansion. |

## Blocked Or Manual Review

| Path | Source | Current status | Allowed action | Reason |
|---|---|---|---|---|
| /blog/article-slug | existing_blog_article | unknown | manual_review_required |  |
| /blog/b2b-social-media-post-ideas | existing_blog_article | unknown | manual_review_required |  |
| /blog/best-time-to-post-on-instagram | existing_blog_article | unknown | manual_review_required |  |
| /blog/how-to-write-carousel-copy-with-ai | existing_blog_article | unknown | manual_review_required |  |
| /blog/linkedin-carousel-ads | existing_blog_article | unknown | manual_review_required |  |
| /ru/alternatives | seo_action_map_candidate | manual_review_candidate | manual_review_required | Route exists in inventory but not sitemap; classify as route_only_needs_check before creating or indexing anything nearby. \| Route inventory evidence exists without sitemap presence. \| Present in route inventory but absent from sitemap; route-only status needs owner check. \| SEO-хаб для страниц альтернатив. \| Documented as existing or planned route in prior audit docs. |
| /ru/examples | seo_action_map_candidate | manual_review_candidate | manual_review_required | Route exists in inventory but not sitemap; classify as route_only_needs_check before creating or indexing anything nearby. \| Route inventory evidence exists without sitemap presence. \| Present in route inventory but absent from sitemap; route-only status needs owner check. \| SEO-хаб для страниц примеров. \| Documented as existing or planned route in prior audit docs. |
| /ru/generator-karuselej-instagram | seo_action_map_candidate | manual_review_candidate | manual_review_required | Route exists in inventory but not sitemap; classify as route_only_needs_check before creating or indexing anything nearby. \| Route inventory evidence exists without sitemap presence. \| Present in route inventory but absent from sitemap; route-only status needs owner check. \| Documented as existing or planned route in prior audit docs. |
| /ru/generator-karuseley | seo_registry_candidate | manual_review_candidate | manual_review_required | Registry/backlog candidate overlaps existing route or intent ownership; keep held until owner approval. |
| /ru/generator-postov-dlya-socsetey | seo_registry_candidate | manual_review_candidate | manual_review_required | Registry/backlog candidate overlaps existing route or intent ownership; keep held until owner approval. |
| /ru/ii-generator-kontenta | seo_action_map_candidate | manual_review_candidate | manual_review_required | Route exists in inventory but not sitemap; classify as route_only_needs_check before creating or indexing anything nearby. \| Route inventory evidence exists without sitemap presence. \| Present in route inventory but absent from sitemap; route-only status needs owner check. \| RouteSchemaInjector config: Создавайте качественный контент для соцсетей с помощью ИИ. Быстрая генерация постов и каруселей. \| Создавайте качественный контент для соцсетей с помощью ИИ. Быстрая генерация постов и каруселей. \| Documented as existing or planned route in prior audit docs. |
| /ru/ii-generator-postov-dlya-instagram | seo_action_map_candidate | manual_review_candidate | manual_review_required | Route exists in inventory but not sitemap; classify as route_only_needs_check before creating or indexing anything nearby. \| Route inventory evidence exists without sitemap presence. \| Present in route inventory but absent from sitemap; route-only status needs owner check. \| RouteSchemaInjector config: Создавайте вовлекающие посты для Instagram с помощью ИИ. Быстрая генерация контента. \| Создавайте вовлекающие посты для Instagram с помощью ИИ. Быстрая генерация контента. \| Documented as existing or planned route in prior audit docs. |
| /ru/ii-generator-postov-dlya-linkedin | seo_action_map_candidate | manual_review_candidate | manual_review_required | Route exists in inventory but not sitemap; classify as route_only_needs_check before creating or indexing anything nearby. \| Route inventory evidence exists without sitemap presence. \| Present in route inventory but absent from sitemap; route-only status needs owner check. \| RouteSchemaInjector config: Создавайте профессиональные B2B посты для LinkedIn с помощью ИИ. Быстрая генерация постов для экспертов. \| Создавайте профессиональные B2B посты для LinkedIn с помощью ИИ. Быстрая генерация постов для экспертов. \| Documented as existing or planned route in prior audit docs. |
| /ru/instagram-carousel-generator | seo_registry_candidate | manual_review_candidate | manual_review_required | Registry/backlog candidate overlaps existing route or intent ownership; keep held until owner approval. |
| /ru/instagram-post-generator | seo_registry_candidate | manual_review_candidate | manual_review_required | Registry/backlog candidate overlaps existing route or intent ownership; keep held until owner approval. |
| /ru/linkedin-carousel-generator | seo_registry_candidate | manual_review_candidate | manual_review_required | Registry/backlog candidate overlaps existing route or intent ownership; keep held until owner approval. |
| /ru/platforms | seo_action_map_candidate | manual_review_candidate | manual_review_required | Route exists in inventory but not sitemap; classify as route_only_needs_check before creating or indexing anything nearby. \| Route inventory evidence exists without sitemap presence. \| Present in route inventory but absent from sitemap; route-only status needs owner check. \| SEO-хаб для страниц платформ и форматов. \| Documented as existing or planned route in prior audit docs. |
| /ru/platforms/instagram-carousel | seo_registry_candidate | new_registry_noindex_candidate | manual_review_required | Registry/action-map candidate is not human-approved; related blog articles are insufficient origin proof for indexation or expansion. |
| /ru/prompts | seo_action_map_candidate | new_registry_noindex_candidate | manual_review_required | Registry/action-map candidate is not human-approved; related blog articles are insufficient origin proof for indexation or expansion. |
| /ru/telegram-post-generator | seo_registry_candidate | new_registry_noindex_candidate | manual_review_required | Registry/action-map candidate is not human-approved; related blog articles are insufficient origin proof for indexation or expansion. |
| /ru/templates | seo_action_map_candidate | new_registry_noindex_candidate | manual_review_required | Registry/action-map candidate is not human-approved; related blog articles are insufficient origin proof for indexation or expansion. |
| /ru/templates/instagram-carousel | seo_registry_candidate | new_registry_noindex_candidate | manual_review_required | Registry/action-map candidate is not human-approved; related blog articles are insufficient origin proof for indexation or expansion. |
| /ru/tools | seo_action_map_candidate | new_registry_noindex_candidate | manual_review_required | Registry/action-map candidate is not human-approved; related blog articles are insufficient origin proof for indexation or expansion. |
| /ru/use-cases | seo_action_map_candidate | new_registry_noindex_candidate | manual_review_required | Registry/action-map candidate is not human-approved; related blog articles are insufficient origin proof for indexation or expansion. |
| /ru/vk-post-generator | seo_registry_candidate | new_registry_noindex_candidate | manual_review_required | Registry/action-map candidate is not human-approved; related blog articles are insufficient origin proof for indexation or expansion. |

## Permanent Rules

1. No new SEO page can be created unless its URL origin and intent owner are documented in the ledger or successor ownership file.
2. No registry URL can be treated as safe only because related blog articles exist. Blog articles are supporting content unless the action map proves a distinct commercial intent.
3. Existing sitemap/indexable product/tool pages are protected owners. Update them in place only after approval.
4. Registry noindex candidates must stay noindex and excluded from sitemap until human approval changes their allowed action.
5. New non-blog SEO/product pages must visually and structurally follow the GoToFlow /ru homepage design system unless a design owner approves a different template.

## Files Used

- dist/sitemap.xml
- scratch/seo-demand-imports/2026-07-06/seo-ru-url-inventory-2026-07-08.csv
- scratch/seo-demand-imports/2026-07-06/seo-sitemap-audit-2026-07-08.csv
- scratch/seo-demand-imports/2026-07-06/gotoflow_seo_action_map_FINAL_REVIEW_WITH_SITEMAP_2026-07-08.csv
- src/App.jsx
- src/content/seoPages/index.js
- src/content/blog/articles/
- src/content/blog/intent-map.json
- docs/seo-*.md

## Output

- CSV ledger: scratch/seo-demand-imports/2026-07-06/seo-url-origin-ledger-2026-07-08.csv
