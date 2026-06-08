# Rendered HTML Checks Contract

## Rendered HTML rules

* Published pages must have indexable HTML.
* Draft/noindex pages must not appear in public indexes; if rendered, they must have noindex.
* Canonical must match frontmatter and route.
* Title/meta must match frontmatter.
* Article schema must match frontmatter.
* FAQ schema must use frontmatter FAQ only.

## Artifact rules

Rendered HTML must not contain:

* `:::mockup`
* `[!product]`
* `InlineProductBlock`
* `ArticleFinalCta`
* `quickAnswer:`
* `finalCta:`
* raw YAML `---`
* `TODO`
* `TBD`
* `lorem ipsum`
* escaped raw JSX like `&lt;span class=`

## Sitemap/blog index rules

* Published + noindex false articles must appear in sitemap/blog index.
* Draft/noindex/preview articles must not appear in sitemap/blog index.
* D53 drafts must not appear publicly as indexable URLs.
