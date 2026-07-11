# SEO Production Next Step Plan - 2026-07-08

This is a planning-only production readiness layer. It creates no pages, changes no routes, and keeps blog markdown separate from non-blog SEO pages.

## Inputs Used

- `scratch/seo-demand-imports/2026-07-06/seo-ru-url-inventory-2026-07-08.csv`
- `scratch/seo-demand-imports/2026-07-06/seo-sitemap-audit-2026-07-08.csv`
- `scratch/seo-demand-imports/2026-07-06/gotoflow_seo_action_map_FINAL_REVIEW_WITH_SITEMAP_2026-07-08.csv`
- `scratch/seo-demand-imports/2026-07-06/seo-p0-update-existing-backlog-2026-07-08.csv`
- `docs/seo-route-intent-ownership-guardrail-2026-07-08.md`
- `docs/seo-action-map-sitemap-aware-ownership-2026-07-08.md`
- `dist/sitemap.xml`
- `src/App.jsx`
- `src/content/seoPages/index.js`

## A. Existing Product / Tool Pages To Upgrade

### /ru/ai-generator-karuselej

- Recommended action: update_existing_page_instead
- Priority: P0
- Readiness: ready_after_canonical_owner_decision
- Risk: high
- Target primary keyword: ИИ генератор каруселей
- Target intent: Commercial product/tool owner for AI carousel generation across social platforms
- Recommended blocks: Add route-owner note for canonical pair; add platform tabs Instagram/LinkedIn/VK/Telegram; add examples by use case; strengthen comparison vs ChatGPT/Canva; add FAQ for text/video/link repurposing; add blog-support internal-link section.
- Supporting blog: /ru/blog/ii-dlya-karuseley|/ru/blog/tekst-v-karusel-neyroset|/ru/blog/kak-sozdat-karusel-s-chatgpt|/ru/blog/prompty-dlya-karuseley-v-instagram

### /ru/ii-generator-karuseley

- Recommended action: update_existing_page_instead_or_explicit_migration_required
- Priority: P0
- Readiness: not_ready_until_route_owner_collision_documented
- Risk: critical
- Target primary keyword: ИИ генератор каруселей
- Target intent: Primary existing indexable product/tool owner for RU AI carousel generation
- Recommended blocks: Resolve canonical relationship with /ru/ai-generator-karuselej; add migration note in plan only; strengthen product demo, examples, FAQ, blog-link cluster; do not activate registry page on this path.
- Supporting blog: /ru/blog/ii-dlya-karuseley|/ru/blog/luchshie-ai-generatory-karuselej|/ru/blog/kakoy-ii-sozdast-post-karusel|/ru/blog/tekst-v-karusel-neyroset

### /ru/generator-kontenta

- Recommended action: update_existing_page_instead
- Priority: P1
- Readiness: ready_for_content_upgrade
- Risk: medium
- Target primary keyword: генератор контента для соцсетей
- Target intent: Commercial owner for multi-platform AI social content generation
- Recommended blocks: Add platform matrix; add content-plan workflow; add section for post vs carousel vs reels; add FAQ for generator-postov-dlya-socsetey; add blog support links.
- Supporting blog: /ru/blog/ii-post-dlya-socsetej|/ru/blog/neyroset-dlya-postov|/ru/blog/kak-sostavit-kontent-plan-s-pomoshyu-chatgpt

### /ru/generator-postov-instagram

- Recommended action: update_existing_page_instead
- Priority: P1
- Readiness: ready_for_content_upgrade
- Risk: medium
- Target primary keyword: генератор постов Instagram
- Target intent: Commercial owner for AI Instagram post/caption generation
- Recommended blocks: Add caption-specific examples; add visual/text workflow; add Instagram post formats; add FAQ around /ru/instagram-post-generator intent; add blog links.
- Supporting blog: /ru/blog/kak-sdelat-post-v-instagram-s-ii|/ru/blog/tekst-i-foto-dlya-posta-instagram|/ru/blog/kakie-posty-delat-v-instagram-idei

### /ru/generator-karuselej-linkedin

- Recommended action: update_existing_page_instead
- Priority: P1
- Readiness: ready_for_content_upgrade
- Risk: medium
- Target primary keyword: генератор каруселей LinkedIn
- Target intent: Commercial owner for AI LinkedIn carousel generation
- Recommended blocks: Add B2B case examples; add PDF/document workflow; add repurposing section; add FAQ around /ru/linkedin-carousel-generator intent; add blog support links.
- Supporting blog: /ru/blog/kak-sdelat-karusel-linkedin-s-ai|/ru/blog/idei-karuselej-linkedin|/ru/blog/primery-karuseley-linkedin|/ru/blog/prompty-dlya-karuseley-linkedin

## B. New Registry Pages To Keep In Noindex Review

### /ru/vk-post-generator

- Registry entry: ru-tool-vk-post-generator; published=true; noindex=true; decision=safe_new_registry_page
- Sitemap status: noindex_review_not_in_sitemap
- Safe to index later: conditional_after_human_approval
- Required fixes before indexation: Clarify VK-specific workflow; add examples for group/community posts; ensure no overlap with broad content generator; add links from VK blog support pages.

### /ru/telegram-post-generator

- Registry entry: ru-tool-telegram-post-generator; published=true; noindex=true; decision=safe_new_registry_page
- Sitemap status: noindex_review_not_in_sitemap
- Safe to index later: conditional_after_human_approval
- Required fixes before indexation: Clarify Telegram-specific workflow; add examples for channel posts; ensure no overlap with broad content generator; add links from Telegram blog support pages.

## C. Route-Only / Manual-Check Plan

- /ru/generator-karuselej: manual_review_required; risk=high; Potential generic carousel route; overlaps existing carousel product family and P0 backlog. Do not create new page until owner/canonical decision.
- /ru/generator-karuselej-instagram: update_existing_page_instead; risk=medium; Hard-coded product route via RuAICarouselGeneratorPage but not in sitemap; confirm indexability and whether to add/update as Instagram carousel owner.
- /ru/ii-generator-kontenta: update_existing_page_instead; risk=medium; Hard-coded AIContentPageRu alias not in sitemap; update existing content owner or decide canonical relationship with /ru/generator-kontenta.
- /ru/ii-generator-postov-dlya-instagram: update_existing_page_instead; risk=medium; Hard-coded InstagramPostPageRu alias not in sitemap; decide canonical relationship with /ru/generator-postov-instagram.
- /ru/ii-generator-postov-dlya-linkedin: manual_review_required; risk=medium; Hard-coded LinkedInPostPageRu route not in sitemap; may need separate post-generator owner or canonical into LinkedIn carousel/post family.
- /ru/sozdat-karusel-online: manual_review_required; risk=high; Docs-only route evidence; likely broad carousel intent. Hold until route existence and owner are confirmed.
- /ru/platforms/instagram-carousel: create_new_registry_page_noindex_review; risk=low; Registry seed noindex page; keep noindex, do visual/content QA before indexation.
- /ru/templates/instagram-carousel: create_new_registry_page_noindex_review; risk=low; Registry seed noindex page; keep noindex, do template/content QA before indexation.
- /ru/tools: manual_review_required; risk=medium; SEO hub route exists but not in sitemap; decide whether hubs should be indexed after hub content quality review.
- /ru/platforms: manual_review_required; risk=medium; SEO hub route exists but not in sitemap; decide index/noindex once platform pages mature.
- /ru/templates: manual_review_required; risk=medium; SEO hub route exists but not in sitemap; decide index/noindex once template pages mature.
- /ru/examples: manual_review_required; risk=medium; SEO hub route exists but not in sitemap; decide index/noindex once example pages mature.
- /ru/prompts: manual_review_required; risk=medium; SEO hub route exists but not in sitemap; decide index/noindex once prompt pages mature.
- /ru/use-cases: manual_review_required; risk=medium; SEO hub route exists but not in sitemap; scenario hub needs owner/indexability review.
- /ru/alternatives: manual_review_required; risk=medium; SEO hub route exists but not in sitemap; alternative hub needs owner/indexability review.

## D. Blog / Supporting Content

Blog articles remain supporting assets and must stay in `src/content/blog/articles/`. They should link into the correct product/tool owner when the product page is ready, but non-blog SEO page content must not be stored as blog markdown.

## E. FAQ / H2 / Secondary Keyword Handling

Broad, messy, or overlapping demand is not deleted. It is classified as secondary keyword, FAQ/H2, supporting blog, manual review, or hold_not_deleted. The CSV plans include those classifications per product page.

## Structure Rule

- SEO registry/data: `src/content/seoPages/`
- SEO rendering components: `src/components/seo/`
- SEO validation scripts: `scripts/check-seo-*.mjs`
- SEO planning outputs: `scratch/seo-demand-imports/2026-07-06/`
- SEO docs: `docs/seo-*.md`

## Output Files

- `scratch/seo-demand-imports/2026-07-06/seo-existing-product-tool-upgrade-plan-2026-07-08.csv`
- `scratch/seo-demand-imports/2026-07-06/seo-new-registry-noindex-review-plan-2026-07-08.csv`
- `scratch/seo-demand-imports/2026-07-06/seo-route-only-manual-check-plan-2026-07-08.csv`

## Next Production Step

Start with existing indexable product/tool upgrades, especially `/ru/ii-generator-karuseley` ownership/canonical cleanup and then the broad content/Instagram/LinkedIn product owners. Keep VK/Telegram registry pages noindex until visual/content QA passes.
