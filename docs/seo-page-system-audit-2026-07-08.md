# GoToFlow SEO Page System Audit

## Executive summary
- Ready for blog articles: Yes. Blog articles have a markdown-backed content registry, dynamic `/blog/:slug` and `/ru/blog/:slug` routes, article metadata, visible breadcrumbs, FAQ support, CTA/explore blocks, blog hub rendering, and automatic prerender/sitemap inclusion for published indexable markdown.
- Ready for commercial SEO pages: Partially. Several commercial/tool-like pages already exist as hand-coded routes and React components, but there is no generic SEO page registry or data-driven commercial page generator. Adding more pages currently requires editing routes, page components, metadata/schema config, prerender routes, sitemap entries, navigation/links, and QA allowlists.
- Ready for platform pages: No. There is no `/ru/platforms/...` route family, hub, data model, or template.
- Ready for use-case pages: No. There is no `/ru/use-cases/...` route family, hub, data model, or template.
- Ready for template/example pages: No as non-blog page types. Template/example topics currently appear as blog articles such as `/ru/blog/shablony-karuseley-v-instagram`, not as `/ru/templates/...` or `/ru/examples/...`.
- Ready for alternatives/comparison pages: No as non-blog page types. Comparison-style content is supported inside blog article taxonomy, but there is no `/ru/alternatives/...` route family, registry, or commercial comparison template.

Overall: the project supports a strong blog SEO system plus a small manually wired product/tool page set. It is not yet ready to scale hundreds of non-blog SEO pages without refactoring page registration, routing, sitemap, metadata, schema, internal linking, and QA checks into a shared multi-type SEO page system.

## Current routing map

Source routing lives in `src/App.jsx`.

Current source-supported route families:
- Home: `/`, `/ru`
- Existing EN product/tool pages: `/ai-carousel-maker`, `/instagram-carousel-maker`, `/ai-content-generator`, `/ai-instagram-post-generator`, `/ai-linkedin-post-generator`, `/linkedin-carousel-maker`
- Existing RU product/tool pages: `/ru/ai-generator-karuselej`, `/ru/ii-generator-karuseley`, `/ru/generator-karuselej-instagram`, `/ru/generator-kontenta`, `/ru/ii-generator-kontenta`, `/ru/generator-postov-instagram`, `/ru/ii-generator-postov-dlya-instagram`, `/ru/generator-karuselej-linkedin`, `/ru/ii-generator-postov-dlya-linkedin`
- Blog hubs: `/blog`, `/ru/blog`
- Blog article catch-alls: `/blog/:slug`, `/ru/blog/:slug`
- Legal/pricing routes: `/privacy-policy`, `/ru/politika`, `/ru/polzovatelskoe-soglashenie`, `/ru/soglasie-na-obrabotku-personalnyh-dannyh`, `/ru/ugc-creator-terms`, `/refund-policy`, `/terms-of-service`, `/personal-data-consent`, `/pricing`
- Redirect-like client routes: `/carousel-maker`, `/ai-post-maker`, `/politika`, `/carousel/create`

Requested route readiness:
- `/ru/blog/...`: supported by catch-all markdown article routes.
- `/ru/generator-karuseley`: not present. Existing source uses `/ru/ii-generator-karuseley` and `/ru/ai-generator-karuselej`; note the transliteration mismatch.
- `/ru/sozdat-karusel-online`: not present.
- `/ru/ii-generator-karuseley`: present.
- `/ru/tools/...`: not present.
- `/ru/platforms/...`: not present.
- `/ru/use-cases/...`: not present.
- `/ru/templates/...`: not present.
- `/ru/examples/...`: not present.
- `/ru/alternatives/...`: not present.

Non-blog SEO pages cannot currently be generated from a data/config registry. Existing non-blog SEO pages are manually imported and wired to specific React components in `src/App.jsx`, then manually listed in `prerender.mjs` and `public/sitemap.xml`.

## Current SEO data model

Blog article data:
- Stored as markdown files in `src/content/blog/articles/*.md`.
- Loaded through `import.meta.glob` in `src/lib/blog/markdownArticles.js`.
- Parsed with custom frontmatter parsing.
- Public article filtering is based on `published === true`, `noindex !== true`, and non-template filenames.
- Required blog fields include `title`, `slug`, `language`, `description`, `primaryKeyword`, `searchIntent`, `cluster`, `articleType`, `priority`, `published`, `noindex`, `canonical`, `createdAt`, `updatedAt`, `lastReviewed`, `quickAnswer`, `faq`, `explore`, and `finalCta`.

Generic SEO page registry:
- Not present.
- `src/components/RouteSchemaInjector.jsx` contains a static `ROUTES_CONFIG`, but it is schema-only and covers only a subset of static routes. It is not a content/page registry and does not render pages.
- There is no shared data model with `pageType`, `section`, `language`, `slug`, `title`, `description`, `canonical`, `hreflang`, `relatedLinks`, `CTA`, `breadcrumbs`, `schema`, `publishState`, and `sitemap` fields for non-blog pages.

Commercial/tool page data:
- Lives inside individual React components such as `RuAICarouselGeneratorPage.jsx`, `AIContentPageRu.jsx`, `InstagramPostPageRu.jsx`, and `LinkedInCarouselPageRu.jsx`.
- Metadata is set inside component-local `useEffect` SEO head blocks.
- Related links are passed manually through `ProductRelatedResources` blocks.

## Breadcrumb support

Breadcrumb support exists in two forms:
- Visible breadcrumbs for blog article pages in `MarkdownSeoArticleTemplateV2.jsx`. They are fixed to Home / Blog / Article.
- JSON-LD breadcrumbs through `getBreadcrumbSchema()` and either `MarkdownBlogArticlePage.jsx` or `RouteSchemaInjector.jsx`.

Limitations:
- Blog visible breadcrumbs are blog-specific and do not support nested non-blog sections.
- `RouteSchemaInjector.jsx` can represent arbitrary crumb arrays, but only for manually entered routes.
- There is no shared breadcrumb builder for Tools, Platforms, Templates, Examples, Use Cases, or Alternatives.
- No hub route like `/ru/tools` or `/ru/platforms` currently exists to act as a parent breadcrumb target.

## Sitemap support

The sitemap base file is `public/sitemap.xml`.

Current behavior:
- Static core routes and a small manually maintained route set are listed in `public/sitemap.xml`.
- `prerender.mjs` reads `src/content/blog/articles`, finds markdown files with `published: true` and not `noindex: true`, prerenders `/blog/{slug}` or `/ru/blog/{slug}`, and appends those routes to `dist/sitemap.xml`.
- Dynamic blog sitemap append entries include `loc`, `lastmod`, `changefreq`, and `priority`.

Limitations:
- Non-blog SEO pages are not discovered dynamically.
- New commercial pages must be added manually to source routes, prerender route list, and sitemap.
- Appended dynamic blog sitemap entries do not include hreflang alternates unless already manually present in the base sitemap.
- There is no sitemap registry with per-page priority, lastmod, changefreq, language alternates, or page type for commercial/tool/platform/use-case/template/example/alternative pages.

## Canonical / hreflang / metadata support

Blog articles:
- `MarkdownBlogArticlePage.jsx` sets `title`, description, robots, OG tags, Twitter tags, canonical, optional OG image, and optional `hreflang` links from article frontmatter.
- Canonical defaults to `https://gotoflow.io/{langPrefix}/blog/{slug}` when `article.canonical` is absent.

Blog hubs:
- `BlogHubLayout.jsx` sets page title, description, canonical, and EN/RU/x-default alternates for `/blog` and `/ru/blog`.

Non-blog pages:
- Existing product/tool pages set metadata in component-specific SEO head blocks.
- Canonicals and hreflang alternates are hardcoded per component or derived from `window.location.pathname` for some RU variants.

Limitations:
- No generic metadata component for all SEO page types.
- Hreflang mappings are manual and inconsistent. Example: some RU components point to EN counterparts that are not actual source routes, such as `/linkedin-post-generator`.
- `RouteSchemaInjector.jsx` duplicates some metadata-like values for schema, separate from the component SEO head values, which creates drift risk.
- No centralized canonical validation for non-blog pages.

## Internal linking support

Blog articles:
- Article frontmatter supports `explore.tools`, `explore.guides`, and `finalCta`.
- `MarkdownSeoArticleTemplateV2.jsx` renders an Explore zone and final CTA from frontmatter.
- The blog hub lists public markdown articles and has category grouping.
- Existing QA scripts focus heavily on blog links, draft links, product links, and published article checks.

Product/tool pages:
- Some product pages render `ProductRelatedResources` with manual links.
- Footer links expose a small set of tool/product and resource links.

Limitations:
- No universal internal linking map across blog, commercial pages, tools, platforms, templates, examples, use cases, and alternatives.
- No typed relationship model such as `linksTo`, `linkedFrom`, `hub`, `siblings`, `relatedArticles`, `relatedCommercialPages`, or `productRoute`.
- Commercial pages can link to articles manually, and articles can link to commercial routes through frontmatter or markdown, but there is no shared graph to enforce coverage, avoid orphan pages, or prevent broken/future links across non-blog page types.

## Navigation and hub page support

Existing support:
- `/blog` and `/ru/blog` are hub pages.
- Footer has product/tool and resource columns with hardcoded links.
- Blog hub has category sections for Guides, Prompts, Ideas, Tools & Comparisons, AI Content Workflows, and Articles.

Missing:
- No `/ru/tools` hub.
- No `/ru/platforms` hub.
- No `/ru/use-cases` hub.
- No `/ru/templates` hub.
- No `/ru/examples` hub.
- No `/ru/alternatives` hub.
- Header has no section navigation beyond logo, language switcher, and CTA.
- Footer does not currently support the requested page families as durable sections; it only exposes selected hardcoded product/resource links.

## Page template support

Blog article template:
- `MarkdownSeoArticleTemplateV2.jsx` is a feature-rich markdown article renderer with hero, visible breadcrumbs, freshness block, quick answer, body markdown, steps, prompts, formats, explore links, FAQ, mockups, and final CTA.

Blog hub template:
- `BlogHubLayout.jsx` renders localized blog hubs, categories, featured articles, article cards, and product path cards.

Existing landing/product templates:
- Product/tool pages exist as full custom React components: carousel maker, content generator, Instagram post generator, LinkedIn carousel generator, LinkedIn post generator, and RU variants.
- `ProductRelatedResources.jsx` is a small reusable related-resource block.
- `RouteSchemaInjector.jsx` provides reusable schema injection for selected static routes.

Missing for commercial SEO scale:
- No generic commercial SEO page template.
- No generic tool/platform/use-case/template/example/alternative template.
- No layout contract for reusable sections such as hero, proof, workflow, feature grid, examples, FAQ, comparison table, related pages, and CTA.
- No data-driven rendering pipeline for non-blog SEO page content.

## Schema support

Implemented:
- `Organization`
- `WebSite`
- `WebPage`
- `SoftwareApplication`
- `Article`
- `BreadcrumbList`
- `FAQPage`

Where used:
- Blog articles inject Article, BreadcrumbList, and FAQPage schema from article data.
- Static/product routes inject WebPage, SoftwareApplication, BreadcrumbList, and FAQPage via `RouteSchemaInjector.jsx` when present in `ROUTES_CONFIG` and `faqSchemaData`.

Limitations:
- Schema route config is manually maintained and incomplete.
- Some static article routes can get schema both from `RouteSchemaInjector.jsx` and `MarkdownBlogArticlePage.jsx`, creating duplicate schema risk for manually configured article paths.
- `SoftwareApplication` schema is generic and not deeply parameterized per tool/page.
- No dedicated schema handling for comparison/alternative pages, collection/hub pages, templates, examples, or use-case pages beyond generic WebPage.
- FAQ schema for non-blog pages uses a separate `faqSchemaData` map rather than the page component data, creating drift risk.

## Gaps before commercial-first SEO scale

- No single SEO page registry for non-blog pages.
- No route generator for typed SEO pages.
- No automatic prerender/sitemap inclusion for non-blog SEO pages.
- Metadata, schema, FAQ, and related links are split across multiple files and components.
- Canonical and hreflang are manual and can drift.
- Existing product page components are not suitable for hundreds of variants without duplication.
- No hub pages for the requested sections.
- No global internal linking graph.
- No typed breadcrumb model for nested sections.
- Blog QA tooling is mature, but non-blog SEO QA tooling is not.
- Existing `public/sitemap.xml` and `prerender.mjs` will become bottlenecks as route volume grows.
- Build/prerender time and memory can grow quickly if hundreds of routes are appended to one Puppeteer prerender loop without batching, concurrency control, route manifests, or failure isolation.
- Some route naming is inconsistent, especially `karuselej` vs `karuseley`, so canonical decisions must be made before publishing commercial pages.
- Static route/schema config duplication increases the risk that a page renders but has missing or stale schema/sitemap/metadata.

## Recommended implementation plan

### 1. Must do before creating pages

1. Define a canonical URL taxonomy for RU commercial SEO:
   - Decide whether the carousel root is `/ru/generator-karuseley`, `/ru/generator-karuselej`, or `/ru/ii-generator-karuseley`.
   - Define redirect/canonical rules for spelling variants before publishing.
2. Create a typed SEO page registry, for example `src/content/seo/pages/*.json` or `src/content/seo/pages/*.mdx`, with fields for:
   - `pageType`, `language`, `slug`, `path`, `section`, `title`, `description`, `canonical`, `hreflang`, `robots`, `published`, `lastmod`, `priority`, `breadcrumbs`, `faq`, `relatedLinks`, `primaryCta`, `secondaryCta`, `schema`, and template-specific content blocks.
3. Add route generation for non-blog SEO pages:
   - `/ru/tools/:slug`
   - `/ru/platforms/:slug`
   - `/ru/use-cases/:slug`
   - `/ru/templates/:slug`
   - `/ru/examples/:slug`
   - `/ru/alternatives/:slug`
   - plus any root commercial pages such as `/ru/ii-generator-karuseley`.
4. Centralize SEO head generation so canonical, hreflang, robots, OG/Twitter tags, and document language all come from the registry.
5. Centralize schema generation from the same registry.
6. Make sitemap generation data-driven from the registry plus blog articles.
7. Build a shared breadcrumb builder that supports Home / Section Hub / Detail Page and optional deeper nesting.
8. Add QA scripts for non-blog pages covering route existence, metadata, canonical, hreflang, sitemap, schema, breadcrumbs, FAQ consistency, and broken internal links.

### 2. Can do during first batch

1. Build a reusable commercial SEO landing template with blocks for hero, workflow, features, examples, FAQ, related pages, and CTA.
2. Build section hub pages for `/ru/tools`, `/ru/platforms`, `/ru/use-cases`, `/ru/templates`, `/ru/examples`, and `/ru/alternatives`.
3. Migrate current RU product/tool pages into the registry one by one, keeping the current visual components where useful.
4. Add a shared `RelatedPages` component that can render article links, commercial links, sibling links, and hub links from one schema.
5. Update footer/navigation to expose new hubs only when pages exist.
6. Add redirect/canonical handling for legacy or alternate routes.

### 3. Later improvements

1. Split sitemap generation by type or language if URL volume grows.
2. Add route-manifest based prerender batching and failure reporting.
3. Add internal linking coverage reports for hub-to-detail, detail-to-hub, sibling links, and blog-to-commercial flow.
4. Add typed schema variants for collection pages, comparison pages, examples/templates, and richer software/tool pages.
5. Add search-demand and cannibalization checks across blog and commercial SEO page types, not blog only.
6. Add preview/draft support for non-blog SEO pages with noindex safeguards similar to blog articles.

## Files inspected

- `src/App.jsx`
- `prerender.mjs`
- `public/sitemap.xml`
- `dist/sitemap.xml`
- `package.json`
- `src/lib/blog/markdownArticles.js`
- `src/content/blog/articles/_template.md`
- `src/components/blog/MarkdownBlogArticlePage.jsx`
- `src/components/blog/templates/MarkdownSeoArticleTemplateV2.jsx`
- `src/components/blog/BlogHubLayout.jsx`
- `src/components/BlogPage.jsx`
- `src/components/BlogPageRu.jsx`
- `src/components/RouteSchemaInjector.jsx`
- `src/utils/schemaGenerator.js`
- `src/data/faqSchemaData.js`
- `src/components/ProductRelatedResources.jsx`
- `src/components/Header.jsx`
- `src/components/Footer.jsx`
- `src/components/RuAICarouselGeneratorPage.jsx`
- `src/components/AIContentPage.jsx`
- `src/components/AIContentPageRu.jsx`
- `src/components/InstagramPostPage.jsx`
- `src/components/InstagramPostPageRu.jsx`
- `src/components/LinkedInCarouselPage.jsx`
- `src/components/LinkedInCarouselPageRu.jsx`
- `src/components/LinkedInPostPage.jsx`
- `src/components/LinkedInPostPageRu.jsx`
- `src/components/CarouselPage.jsx`
- `src/components/CarouselPageRu.jsx`
- `scripts/check-blog-publishing.mjs`
- `scripts/check-blog-schema.mjs`
- `scripts/check-blog-links.mjs`
- `scripts/check-blog-product-links.mjs`
- `scripts/check-blog-internal-link-flow.mjs`
- `docs/seo-schema-meta-contract.md`
- `docs/internal-linking-rules.md`
- `docs/blog-production-system.md`
- `docs/render-contract.md`
