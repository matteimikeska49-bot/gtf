# Render Contract

This document outlines the strict rendering and HTML output rules for the GoToFlow SEO platform.

## Render source of truth
* Article frontmatter strictly drives the hero, meta tags, quick answer, FAQ, and final CTA.
* Body markdown drives editorial content only.
* Mockups render only through approved `:::mockup{slot="..."}` syntax when `mockupStatus: present`.

## Forbidden rendered artifacts
* Raw JSX (e.g., `<InlineProductBlock`).
* Raw HTML not explicitly supported by the template.
* `[!product]` syntax leaked into text.
* `:::mockup` leaked into text.
* Empty wrappers or broken components.
* Duplicate `<h1` or duplicate H1 headings.
* Duplicate FAQ sections (e.g., in frontmatter and body).
* Duplicate CTA sections.
* Placeholder text (`TODO`, `TBD`, `lorem ipsum`, `draft`).

## Draft render rule
* Drafts (`published: false` or `preview: true`) are allowed to render in local preview/dev environments.
* Drafts must remain `noindex: true`.
* Drafts must not appear in the public sitemap or production blog index.
