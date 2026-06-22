# Blog QA Command System

The GoToFlow SEO platform uses a layered QA command architecture to balance fast iteration with strict deployment safety.

## Canonical release command

Use `npm run check:blog:release` before every SEO batch commit or push. It is the canonical release decision and covers scope safety, strategy gates, strict changed-article contracts, build/prerender, rendered HTML, and sitemap checks.

`npm run check:blog:fast` is a quick source check only. `check:blog:prepublish`, `check:blog:full`, and the older `check:blog:all` remain useful diagnostics, but they are not substitutes for the scope-aware release command. Run `npm run check:blog:legacy-debt` to inspect pre-existing corpus failures separately.

Release output distinguishes:

- **blocking**: changed article/data failures, draft leaks, current-batch intent/cannibalization/workflow failures, broken links, build/prerender/render/sitemap failures;
- **warning**: quality improvements that do not invalidate the current release;
- **legacy debt**: pre-existing corpus failures outside the changed release scope.

After push, verify the Beget/Coolify deployment and run the live verification contract. Local release success is not evidence that production has updated.

## Product source of truth

Before generating, editing, or checking GoToFlow SEO articles, follow `docs/product/gotoflow-capabilities.md`.

This file is the canonical product source of truth for GoToFlow positioning, capabilities, comparisons, roadmap framing, forbidden negative framing, and misleading-claim rules. Any article, prompt, or QA decision that contradicts `docs/product/gotoflow-capabilities.md` must be treated as incorrect.

GoToFlow is an end-to-end carousel creation system: competitor/viral research, idea, scenario, structure, copy, visual style/design, own photos, AI characters, slides, and CTA — from zero to a ready carousel in minutes. Never reduce GoToFlow to text-only, structure-only, Canva/Midjourney/ChatGPT add-on, or random AI carousel generation.

The agent must check article positioning against `docs/product/gotoflow-capabilities.md`, must not invent product limitations, must not frame GoToFlow through “minuses”, and must not describe roadmap items as strategic weaknesses.

## Fast source checks
For small markdown/frontmatter edits. No build required.
Command: `npm run check:blog:fast`
Includes:
* `check:blog:keywords`
* `check:blog:topic-score`
* `check:blog:product-claims`
* `check:blog:product-positioning`
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

`check:blog:product-positioning` scans published SEO articles against the forbidden positioning examples derived from `docs/product/gotoflow-capabilities.md`. It blocks text-only/structure-only/add-on framing, “Cons/Минусы GoToFlow” framing, random-generation claims, and roadmap items described as GoToFlow weaknesses.

### When to run Production/Live Checks
`npm run check:blog:live-verification` must ONLY be run:
1. **After** explicit user approval to publish.
2. **After** updating frontmatter/batch-status to `published: true`.
3. **After** local checks (`prepublish`, `full`) have passed.
4. **After** `git commit` and `git push`.
5. **After** the Beget/Coolify production deploy has fully finished and the production build marker has updated.
Do NOT run this locally as part of the standard editing loop.

## Batch Commands
- **Mini-batch preparation**: `npm run check:blog:batch-workflow`, `check:blog:prepublish`, `check:blog:build-render`, `check:blog:preview-routes`, `check:blog:visual`.
- **Publish wave**: `npm run check:blog:full`, then commit & push.
- **Live verification**: `npm run check:blog:live-verification` after deployment completes.
