# SEO P0 Batch Implementation - 2026-07-08

## Pages Created Or Updated

All P0 pages are Russian, `published: true`, and `noindex: true`.

| Path | Page type | Primary keyword | Status |
| --- | --- | --- | --- |
| `/ru/generator-karuseley` | `commercial` | `генератор каруселей` | Updated from seed placeholder |
| `/ru/ii-generator-karuseley` | `commercial` | `ИИ генератор каруселей` | Added to registry and routed through SEO page template |
| `/ru/generator-postov-dlya-socsetey` | `commercial` | `генератор постов для соцсетей` | Added |
| `/ru/instagram-carousel-generator` | `tool` | `генератор каруселей для Instagram` | Added |
| `/ru/instagram-post-generator` | `tool` | `генератор постов для Instagram` | Added |
| `/ru/vk-post-generator` | `tool` | `генератор постов для ВК` | Added |
| `/ru/telegram-post-generator` | `tool` | `генератор постов для Telegram` | Added |
| `/ru/linkedin-carousel-generator` | `tool` | `генератор каруселей для LinkedIn` | Added |

The earlier non-P0 seed pages `/ru/platforms/instagram-carousel` and `/ru/templates/instagram-carousel` were preserved.

## Noindex Status

All 8 P0 pages are:

- `published: true`
- `noindex: true`

Runtime smoke test confirmed each page renders:

- `meta[name="robots"]` = `noindex, nofollow`
- canonical = `https://gotoflow.io{path}`
- `BreadcrumbList` schema
- no `Article` schema

## Sitemap And Prerender Status

Registry validation:

- Total SEO registry entries: `10`
- P0 entries: `8`
- Indexable SEO pages for sitemap: `0`
- Indexable SEO pages for prerender: `0`

The P0 pages are excluded from `getSeoPagesForSitemap()` and `getSeoPagesForPrerender()` because all are noindex.

The existing hard-coded prerender route for `/ru/ii-generator-karuseley` was removed because that URL is now a noindex P0 registry page.

## Routing Notes

The P0 brief requires `pageType: tool` pages at root-level `/ru/...` paths. The route resolver was updated so:

- `/ru/:slug` can resolve root-level `commercial` and `tool` SEO pages.
- `/ru/tools/:slug` only resolves pages whose canonical registry path is actually under `/ru/tools/...`.
- `/ru/tools/instagram-carousel-generator` returns the 404 page, avoiding a duplicate URL for `/ru/instagram-carousel-generator`.

`RouteSchemaInjector` now skips paths owned by the SEO registry so legacy static schema does not conflict with registry-driven SEO schema.

## Validation Results

Commands/checks run:

- Registry validation with `node --input-type=module`
- Related blog slug filesystem check
- Puppeteer smoke test against `npm run dev -- --host 127.0.0.1 --port 4186 --strictPort`
- Safe non-mutating build:
  - `npm --ignore-scripts run build -- --outDir /private/tmp/gotoflow-p0-build-review --emptyOutDir`

Results:

- Registry validates with `errors: []`.
- All 8 P0 pages route correctly.
- All 8 P0 pages render `noindex, nofollow`.
- All 8 P0 pages are excluded from sitemap/prerender indexable lists.
- All related blog slugs used by SEO pages exist as markdown filenames.
- Existing blog route `/ru/blog/karusel-dlya-instagram` still works.
- Existing blog route still renders `Article` schema.
- New SEO pages do not use `Article` schema.
- Breadcrumbs render on P0 SEO pages.
- Metadata, canonical, and robots meta render on P0 SEO pages.
- `/ru/tools` hub route works and lists published tool pages.
- Safe non-mutating build passed.

## Changed Files

Intentional implementation files:

- `src/content/seoPages/index.js`
- `src/components/seo/SeoPageRoute.jsx`
- `src/components/RouteSchemaInjector.jsx`
- `src/App.jsx`
- `prerender.mjs`
- `docs/seo-p0-batch-implementation-2026-07-08.md`

Previously created foundation files remain part of the broader uncommitted foundation work.

## Known Gaps / TODOs

- P0 pages are ready for internal/live visual review only, not indexing.
- The `/ru/ii-generator-karuseley` URL now renders the noindex registry page instead of the older hard-coded product page during this P0 review stage.
- Tool pages are intentionally root-level because the P0 brief requested those exact paths.
- No final indexation approval has been made.

## Recommended Next Step

Visually review the 8 noindex P0 pages, fix content/layout issues, then approve selected pages for indexation one by one.
