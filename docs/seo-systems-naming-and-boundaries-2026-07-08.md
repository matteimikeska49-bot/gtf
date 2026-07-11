# GoToFlow SEO Systems

## GoToFlow SEO Publishing Platform

Purpose:

- SEO articles.
- Blog pages.
- Blog markdown content.
- Article metadata and frontmatter.
- Intent, cluster, brief, topic, and content pipeline.
- Article release gates.
- Blog publishing checks.

Source areas:

- `src/content/blog/`
- `src/content/blog/articles/`
- `src/content/blog/intent-map.json`
- `src/content/blog/topic-map.json`
- `src/content/blog/cluster-authority-map.json`
- `src/lib/blog/`
- `src/components/blog/`
- `scripts/check-blog-*.mjs`
- Blog/article docs in `docs/`

Important:

- The SEO Publishing Platform is the source of reusable article SEO rules.
- It was audited in read-only mode for this task.
- It must not be modified by SEO Pages Engine work.
- Blog articles can support SEO pages through internal links, but they are not proof that a commercial/service URL should exist.
- Blog article content must remain in `src/content/blog/articles/`.

## GoToFlow SEO Pages Engine

Purpose:

- Non-blog SEO, service, product, and commercial pages.
- Landing-style pages.
- Product/tool pages.
- Platform pages.
- Template pages.
- Example pages.
- Alternative pages.
- Prompt pages.
- Use-case/scenario pages.

Source areas:

- `src/content/seoPages/`
- `src/components/seo/`
- `scripts/check-seo-*.mjs`
- SEO Pages Engine docs under `docs/seo-pages-*.md`

Current architecture:

- `templateVariant` driven rendering.
- States: `planning_only`, `quarantined_review`, `noindex_review`, `indexable_approved`.
- Homepage-based design references.
- Protected route ownership.
- URL origin proof.
- Explicit approval before routing or indexation.

Important:

- SEO Pages Engine content must not be stored in `src/content/blog/articles/`.
- SEO Pages Engine pages must not use blog article layout.
- SEO Pages Engine pages must not use Article, BlogPosting, or NewsArticle schema.
- Existing product/tool routes must keep their current owner unless an explicit migration is approved.

## Route And Language Rules

- English homepage: `https://gotoflow.io/`
- English SEO/service/product pages: `https://gotoflow.io/<slug>`
- Russian homepage: `https://gotoflow.io/ru`
- Russian SEO/service/product pages: `https://gotoflow.io/ru/<slug>`
- Do not create or assume `/en` routes.
- EN design reference: `/`
- RU design reference: `/ru`
- EN canonical for SEO pages should be `https://gotoflow.io/<slug>`.
- RU canonical for SEO pages should be `https://gotoflow.io/ru/<slug>`.

## Shared Rules

Rules that both systems can share:

- Canonical correctness.
- Sitemap eligibility.
- Noindex safety.
- Internal link safety.
- Related link validation.
- Intent ownership.
- Duplicate and cannibalization checks.
- Product reality checks.
- Product bridge checks.
- Build, prerender, and rendered HTML checks.
- Visual/mobile release checks.
- Google/Yandex readiness checks.

## Rules That Must Stay Separate

- Article schema belongs to articles, not SEO/service pages.
- Blog layout belongs to articles, not landing/service/product pages.
- Blog markdown belongs in `src/content/blog/articles/`.
- SEO Pages Engine content belongs in `src/content/seoPages/`.
- SEO Pages Engine presentation belongs in `src/components/seo/`.
- Blog Publishing Platform release gates must not be refactored during SEO Pages Engine work.
- SEO Pages Engine must not treat blog overlap as URL origin proof.

## Naming

Use these names consistently:

- `GoToFlow SEO Publishing Platform` for the article/blog system.
- `GoToFlow SEO Pages Engine` for the non-blog SEO/service/product page system.
- `SEO article` only for blog/article content.
- `SEO page` only for non-blog service/product/commercial pages.
