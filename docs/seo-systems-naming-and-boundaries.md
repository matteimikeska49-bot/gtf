# GoToFlow SEO Systems

## GoToFlow SEO Publishing Platform

Purpose:

- SEO articles.
- Blog pages.
- Article publishing.
- Article metadata and frontmatter.
- Intent, cluster, brief, topic, and release pipeline.
- Blog publishing checks and release gates.

Main source areas:

- `src/content/blog/`
- `src/content/blog/articles/`
- `src/content/blog/intent-map.json`
- `src/content/blog/topic-map.json`
- `src/content/blog/cluster-authority-map.json`
- `src/lib/blog/`
- `src/components/blog/`
- `scripts/check-blog-*.mjs`

Rules:

- This system is production code and source of truth for article publishing.
- It is read-only for SEO Pages Engine work.
- Do not refactor, normalize, rename, move, delete, or improve it during SEO Pages Engine audits.
- Do not put non-blog SEO/service/product page content into `src/content/blog/articles/`.
- Blog articles may support SEO pages with internal links, but they are not proof that a commercial/service URL should exist.

## GoToFlow SEO Pages Engine

Purpose:

- Non-blog SEO pages.
- Service pages.
- Tool pages.
- Commercial pages.
- Platform pages.
- Template pages.
- Prompt pages.
- Example pages.
- Alternative pages.
- Use-case pages.

Main source areas:

- `src/content/seoPages/`
- `src/components/seo/`
- `scripts/check-seo-*.mjs`

Rules:

- SEO Pages Engine content and config stay out of the blog article system.
- SEO Pages Engine pages should use landing/product/service templates, not article templates.
- SEO Pages Engine pages should follow homepage design references:
  - EN: `/`
  - RU: `/ru`
- SEO Pages Engine pages must use explicit states:
  - `planning_only`
  - `quarantined_review`
  - `noindex_review`
  - `indexable_approved`
- Routing and indexation require explicit approval gates.
- Protected product/tool routes cannot be overridden without approved migration.

## Route And Language Boundaries

English:

- `https://gotoflow.io/`
- `https://gotoflow.io/<slug>`

Russian:

- `https://gotoflow.io/ru/`
- `https://gotoflow.io/ru/<slug>`

Hard rule:

- Never create or assume `/en` routes.

Canonical rule:

- EN SEO page canonical: `https://gotoflow.io/<slug>`
- RU SEO page canonical: `https://gotoflow.io/ru/<slug>`

Hreflang rule:

- Hreflang alternates should point only to existing, valid, approved, routable counterparts.
- Do not point hreflang to `planning_only`, `quarantined_review`, or `noindex_review` pages unless explicitly documented for preview-only usage.

## Shared Rules

Rules both systems can share:

- Canonical correctness.
- Sitemap/noindex safety.
- Intent ownership.
- Duplicate/cannibalization checks.
- Internal link safety.
- Related link validation.
- Product reality checks.
- Product bridge checks.
- Build and rendered HTML QA.
- Visual/mobile QA.
- Google/Yandex readiness checks.

## Rules That Must Stay Separate

- Article schema belongs to the SEO Publishing Platform.
- Blog article layout belongs to the SEO Publishing Platform.
- SEO Pages Engine uses non-blog page schema such as WebPage, WebApplication, SoftwareApplication, or Product.
- SEO Pages Engine content must not live in `src/content/blog/articles/`.
- Blog checkers and release gates must not be modified by SEO Pages Engine audit tasks.
