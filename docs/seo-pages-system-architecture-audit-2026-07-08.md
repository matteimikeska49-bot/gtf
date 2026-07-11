# SEO Pages System Architecture Audit

Date: 2026-07-08

## Blog System Audit

The existing blog/article system is the architectural reference for scale, not the visual or schema reference for non-blog SEO pages.

| Area | Blog implementation | SEO-page architectural lesson |
|---|---|---|
| Content location | `src/content/blog/articles/*.md` | Keep many records in a centralized content area, not scattered components. |
| Metadata | YAML frontmatter parsed by `src/lib/blog/markdownArticles.js` | Require explicit metadata before runtime. |
| Required fields | `REQUIRED_ARTICLE_FIELDS` lists title, slug, language, published, noindex, canonical, FAQ, CTA, etc. | SEO pages need their own required metadata contract. |
| Slugs | `slug` frontmatter plus language-specific route prefix. | SEO pages must store explicit `path`, not infer commercial URLs from blog slugs. |
| Language | `language` field controls `/blog` vs `/ru/blog`. | SEO pages must store language and design reference; RU defaults to `/ru`. |
| Draft/public state | `published`, `noindex`, preview logic. | SEO pages need stricter states: `planning_only`, `quarantined_review`, `noindex_review`, `indexable_approved`. |
| Routing | `MarkdownBlogArticlePage` centralizes blog article rendering. | SEO pages use `SeoPageRoute` and `SeoPageTemplate` as centralized route/render entry points. |
| Head/schema | Blog head uses Article schema, BreadcrumbList, FAQPage. | SEO pages must not use Article schema; use WebPage/WebApplication/SoftwareApplication/Product where appropriate. |
| Sitemap/prerender | `prerender.mjs` discovers public markdown routes and sitemap eligibility. | SEO pages need centralized eligibility helpers, not page-by-page sitemap decisions. |
| Intent map | `src/content/blog/intent-map.json` documents article intent/ownership. | SEO pages need URL origin and intent ownership before routing/indexation. |
| Validation | Many `scripts/check-blog-*.mjs` gates verify frontmatter, links, schema, quality, render, publishing, and release. | SEO pages need equivalent dedicated gates before route QA and indexation. |
| Batch workflow | Blog batches use plans, status files, checks, and release gates. | SEO pages should be added from approved ledgers/action maps only. |

## What Must Not Be Copied

- Do not copy the blog article layout.
- Do not use Article or BlogPosting schema for non-blog SEO pages.
- Do not place SEO/product page content in `src/content/blog/articles/`.
- Do not let blog overlap prove that a commercial URL should exist.

## Architecture To Copy

- Centralized content registry.
- Explicit metadata contract.
- State and noindex/indexation controls.
- Centralized renderer.
- Centralized route lookup.
- Centralized head/schema generation.
- Centralized sitemap/prerender eligibility.
- Validation scripts that fail before release.
- Documentation and scratch ledgers for URL/intent ownership.

## Current SEO Scaffold Audit

Existing scaffold before this task:

- `src/content/seoPages/index.js` had registry records and route helpers.
- `src/components/seo/SeoPageRoute.jsx`, `SeoPageTemplate.jsx`, and `SeoPageSEOHead.jsx` existed.
- `scripts/check-seo-route-intent-ownership.mjs` existed.
- Early registry records existed for P0/noindex candidates.

Issues corrected by the engine layer:

- State model was not explicit enough.
- Template variants were not a controlled contract.
- URL origin rules were not executable code.
- Protected route rules were partly embedded in the registry.
- Related link and sitemap eligibility checks were not separate gates.
- Renderer was monolithic instead of controlled homepage-style sections.

## Current Candidate Status

Current registry records are retained as data, but none are production/indexable:

- Existing protected collision records stay `planning_only`.
- Candidate records such as `/ru/vk-post-generator` and `/ru/telegram-post-generator` are `quarantined_review`.
- No SEO registry records are currently routable.
- No SEO registry records are sitemap eligible.
