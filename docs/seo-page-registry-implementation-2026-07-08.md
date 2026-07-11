# SEO Page Registry Implementation - 2026-07-08

## What was implemented

Implemented a technical foundation for non-blog SEO pages, separate from the existing markdown blog system.

The implementation adds:

- A typed, validated non-blog SEO page registry in `src/content/seoPages/`.
- Generic React routes for commercial, tool, platform, use case, template, example, prompt, and alternative SEO pages.
- A shared SEO page template that is separate from the blog article layout.
- Data-driven breadcrumbs, metadata, canonical tags, robots tags, Open Graph metadata, and JSON-LD schema for SEO pages.
- Hub page support for the requested `/ru/...` page-type hubs.
- Sitemap/prerender integration for future published, indexable SEO pages.
- Three minimal noindex test pages to validate routing and rendering.

No blog article content was migrated, deleted, or rewritten.

## New data model

The registry lives in `src/content/seoPages/index.js`.

Each SEO page supports:

- `id`
- `language`
- `pageType`
- `slug`
- `path`
- `title`
- `description`
- `h1`
- `heroSubtitle`
- `primaryKeyword`
- `secondaryKeywords`
- `searchIntent`
- `priority`
- `commercialValue`
- `productBridge`
- `cta`
- `sections`
- `faq`
- `relatedSeoPages`
- `relatedBlogSlugs`
- `breadcrumbs`
- `schemaType`
- `published`
- `noindex`
- `lastUpdated`

Optional fields currently supported by the template:

- `examples`
- `templates`
- `hreflang`

The registry validates required fields, allowed `pageType` values, generated paths, duplicate ids, and duplicate paths at module load.

## Supported Page Types

Allowed values:

- `commercial`
- `tool`
- `platform`
- `useCase`
- `template`
- `example`
- `prompt`
- `alternative`

## Supported Routes

SEO page routes:

- `/ru/:slug`
- `/ru/tools/:slug`
- `/ru/platforms/:slug`
- `/ru/use-cases/:slug`
- `/ru/templates/:slug`
- `/ru/examples/:slug`
- `/ru/prompts/:slug`
- `/ru/alternatives/:slug`

Hub routes:

- `/ru/tools`
- `/ru/platforms`
- `/ru/use-cases`
- `/ru/templates`
- `/ru/examples`
- `/ru/prompts`
- `/ru/alternatives`

Existing `/ru/blog/...` routes remain handled by the markdown blog system.

## Test Pages

Minimal test pages were added only to validate the infrastructure:

- `/ru/generator-karuseley`
- `/ru/platforms/instagram-carousel`
- `/ru/templates/instagram-carousel`

All three are `published: true` and `noindex: true`, so they are routable but excluded from sitemap and prerender automation.

## Sitemap And Prerender Behavior

`prerender.mjs` now imports `getSeoPagesForPrerender()` and `getSeoPagesForSitemap()` from the registry.

Rules:

- Include only `published: true` SEO pages.
- Exclude `noindex: true` SEO pages.
- Use the registry `path`.
- Use `lastUpdated` as sitemap `lastmod` when available.
- Keep existing static routes.
- Keep dynamic markdown article discovery separate.
- Deduplicate the final prerender route list.

Because the current test pages are noindex, the current SEO sitemap/prerender count is `0`.

## Metadata And Schema Behavior

SEO pages use `SeoPageSEOHead`, not the blog article head component.

SEO pages support:

- `document.title`
- meta description
- robots meta
- canonical
- `og:title`
- `og:description`
- `og:url`
- `twitter:*` metadata
- optional `hreflang`

Schema behavior:

- `BreadcrumbList` for SEO pages and hubs.
- `FAQPage` when `faq` exists.
- `SoftwareApplication` or `WebApplication` when `schemaType` requests it.
- `Article` schema remains in the blog article system only.

## Breadcrumb Behavior

Breadcrumbs are stored per page in the registry and rendered by the shared SEO page template.

Examples in the current seed data:

- Commercial: `Главная -> Генератор каруселей`
- Platform: `Главная -> Platforms -> Instagram Carousel`
- Template: `Главная -> Templates -> Instagram Carousel`

Hub pages generate their own two-level breadcrumbs from hub config.

## Internal Linking Behavior

SEO pages support:

- SEO page -> related SEO pages through `relatedSeoPages`
- SEO page -> related blog articles through `relatedBlogSlugs`

The shared template resolves related SEO page ids through the SEO registry and related blog slugs through the existing markdown article loader.

TODO: Add a future, explicit model for blog article -> SEO page links. This should be added without hacking existing blog related-link logic.

## How To Add A New SEO Page

1. Add a new object to `seoPages` in `src/content/seoPages/index.js`.
2. Choose a supported `pageType`.
3. Set `slug` and `path`; the registry validates that `path` matches the route prefix for the page type.
4. Add data-driven `breadcrumbs`.
5. Set `published: false` while drafting, or `published: true` and `noindex: true` for technical previews.
6. Switch to `noindex: false` only when final production SEO content is approved.
7. Add related SEO page ids and blog slugs as needed.
8. Run `npm run build` or a targeted route smoke test before publishing.

## Gaps And TODOs

- No final production SEO copy was created.
- Hubs are implemented and routable, but remain noindex while they have no indexable pages.
- No English non-blog SEO routes were added.
- Blog article -> SEO page linking needs a separate model.
- Future production pages should get real examples/templates content instead of placeholders.
- Future registry growth may warrant splitting entries by language/page type.

## Validation Results

Commands run:

- `npm run build`
- `node --input-type=module` registry validation
- Puppeteer smoke test against `npm run dev -- --host 127.0.0.1 --port 4184 --strictPort`

Results:

- Build passed.
- Vite compile passed.
- Prerender passed with `170 routes prerendered successfully`.
- Existing homepage/routes still prerendered.
- Existing blog routes still prerendered.
- Registry validation returned `total: 3`, `sitemap: 0`, `errors: []`.
- Sitemap check confirmed the noindex test SEO pages were not added.
- `/ru/generator-karuseley` rendered with canonical, noindex robots, `BreadcrumbList`, `FAQPage`, and `SoftwareApplication`; no `Article` schema.
- `/ru/platforms/instagram-carousel` rendered with canonical, noindex robots, and `BreadcrumbList`; no `Article` schema.
- `/ru/templates/instagram-carousel` rendered with canonical, noindex robots, `BreadcrumbList`, and `FAQPage`; no `Article` schema.
- `/ru/templates` hub rendered and listed published template SEO pages.
- `/ru/blog/karusel-dlya-instagram` still rendered with `Article` schema.
- `/ru` still rendered successfully.
- No mass SEO pages were created.
- No blog markdown content was edited.
