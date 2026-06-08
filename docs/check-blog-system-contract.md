# Check System Contract

This document dictates the usage rules for the `check:blog` umbrella commands.

## Which command to run when

* **Small text/frontmatter edit:** `npm run check:blog:fast`
* **Article body/template edit:** `npm run check:blog:content`
* **SEO/meta/schema edit:** `npm run check:blog:seo`
* **Before preview/publish decision:** `npm run check:blog:prepublish`
* **Before commit/push involving render or templates:** `npm run check:blog:full`
* **After deploy:** `npm run check:blog:production`

## Rule

Do not run heavy build/render for tiny copy edits unless the edit affects rendering, routing, template, schema, publish state, or D53/batch.

But:
Before publishing, pushing render changes, deploying, or running mini-batch:
You **must** run `prepublish` or `full` as appropriate.
Never include production live checks inside local build loops.
