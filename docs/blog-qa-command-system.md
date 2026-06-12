# Blog QA Command System

The GoToFlow SEO platform uses a layered QA command architecture to balance fast iteration with strict deployment safety.

## Fast source checks
For small markdown/frontmatter edits. No build required.
Command: `npm run check:blog:fast`
Includes:
* `check:blog:keywords`
* `check:blog:topic-score`
* `check:blog:product-claims`
* `check:blog:frontmatter-contract`
* `check:blog:faq-cta-contract`
* `check:blog:brief-alignment`
* `check:blog:language-consistency`
* `check:blog:draft-safety`
* `check:blog:internal-link-flow`
* `check:blog:product-led-links`
* `check:blog:intent-ownership`
* `check:blog:cluster-map`
* `check:blog:mockup-relevance`
* `check:blog:batch`

## Content/template checks
For article template/content integrity. No build unless needed.
Command: `npm run check:blog:content`
Includes:
* `check:blog:content-template`
* `check:blog:template-contract`
* `check:blog:product-led-links`
* `check:blog:mockup-relevance`

`check:blog:template-contract` runs the source/frontmatter/FAQ-CTA guardrails together. It blocks raw JSX-like component tags in markdown body, requires live published articles to use V2 frontmatter blocks (`faq`, `explore`, `finalCta`), and prevents Batch 22-style component markers from reaching publish.

## SEO checks
For metadata/schema validation.
Command: `npm run check:blog:seo`
Includes:
* `check:blog:seo-meta-hardening`
* `check:blog:schema-hardening`
* `check:blog:seo-meta`
* `check:blog:schema`
* `check:blog:language-consistency`

## Pre-publish checks
Before any article is allowed to publish. Validates all safety guards without doing a slow build.
Command: `npm run check:blog:prepublish`
Includes:
* `check:blog:fast`
* `check:blog:content`
* `check:blog:seo`

## Build/render checks
Requires build/dist.
Command: `npm run check:blog:build-render` (runs build + dist checks)
Command: `npm run check:blog:render-only` (assumes dist exists)
Includes:
* `check:blog:dist`
* `check:blog:render-contract`
* `check:blog:rendered-html` (Validates page-level HTML, robots, canonicals, schema output, and explicit sitemap/blog-index inclusion based on publish state).

Rendered checks grep `dist/**/*.html` for raw component markers including `ArticleExploreZone`, `RelatedArticles`, `SecondaryCta`, `FinalCta`, `ArticleFinalCta`, and `InlineProductBlock`. Any match is a P0 blocker.

## Full local checks
Before commit/push/publish. Runs build.
Command: `npm run check:blog:full`
Includes:
* `check:blog:prepublish`
* `check:blog:build-render`

## Visual QA checks
Must be run before manual publish approval, requires preview server. Not part of fast checks.
Command: `npm run check:blog:visual`
Command: `npm run check:blog:preview-routes`
Includes:
* Desktop and mobile viewport checks
* Empty section checks
* Overflow and broken image checks
* Safe preview route extraction

## Production checks
Live URL/deploy verification only.
Command: `npm run check:blog:production`
Must remain separate from local checks.

Production checks fetch canonical public URLs without cache-busting query parameters. Published canonical HTML must not contain raw component markers, starred href leaks, or known Batch 22 cleanup artifacts.

### When to run Production/Live Checks
`npm run check:blog:live-verification` must ONLY be run:
1. **After** explicit user approval to publish.
2. **After** updating frontmatter/batch-status to `published: true`.
3. **After** local checks (`prepublish`, `full`) have passed.
4. **After** `git commit` and `git push`.
5. **After** the production deploy has fully successfully finished (verify GitHub Actions or Vercel).
Do NOT run this locally as part of the standard editing loop.

## Batch Commands
- **Mini-batch preparation**: `npm run check:blog:batch-workflow`, `check:blog:prepublish`, `check:blog:build-render`, `check:blog:preview-routes`, `check:blog:visual`.
- **Publish wave**: `npm run check:blog:full`, then commit & push.
- **Live verification**: `npm run check:blog:live-verification` after deployment completes.
