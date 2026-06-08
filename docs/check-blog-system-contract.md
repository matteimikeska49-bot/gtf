# Check System Contract

This document dictates the usage rules for the `check:blog` umbrella commands.

## Which command to run when

* **Small text/frontmatter edit:** `npm run check:blog:fast`
* **Article body/template edit:** `npm run check:blog:content`
* **SEO/meta/schema edit:** `npm run check:blog:seo`
* **Before preview/publish decision:** `npm run check:blog:prepublish`
* **Before commit/push involving render or templates:** `npm run check:blog:full`
* **Validate rendered HTML explicitly after build:** `npm run check:blog:rendered-html` (Included in `render-only` and `build-render`)
* **Before final manual publish approval:** `npm run check:blog:visual`
* **To verify local preview routes:** `npm run check:blog:preview-routes`
* **After deploy:** `npm run check:blog:production`

## Preview route verification rule

Do not provide localhost URLs to the user unless they have been explicitly verified via `npm run check:blog:preview-routes` and the server is confirmed to be running.

## Rule

Do not run heavy build/render for tiny copy edits unless the edit affects rendering, routing, template, schema, publish state, or D53/batch.

But:
Before publishing, pushing render changes, deploying, or running mini-batch:
You **must** run `prepublish` or `full` as appropriate.
Never include production live checks inside local build loops.

## Live Verification Rules
- Production checks (`npm run check:blog:live-verification`) must ONLY be run after successful commit, push, and deployment.
- Never claim an article is "published" or "live" until live verification explicitly passes on the production URL.
