# Product-led Linking Contract

This document defines the strict editorial and technical rules for embedding product links in SEO articles.

## Product-led body link rule
* Each new/draft/high-priority article must include at least one natural contextual markdown link to the correct product route in its main body text.
* The product link must be useful in context, solving the reader's problem.
* The product link must **not** be a standalone CTA block or button.
* The final promotional CTA belongs ONLY in the `finalCta` frontmatter block, never in the body markdown.
* Set `finalCta.primaryHref` to the commercial owner. The current renderer does not use `href` or `buttonHref` as its primary destination; those fields alone fall back to the app.

## Route alignment rule
* The body product link must match exactly the `relatedProductRoute` defined in the frontmatter.
* The route must match the assigned cluster's product route (from `cluster-authority-map.json`).
* RU generic/cross-platform carousel bridges use `/ru/ii-generator-karuseley`; Instagram-specific carousel bridges use `/ru/generator-karuselej-instagram`. Keep technical/informational intent owners and their article URLs unchanged.
* The route must be compatible with the assigned `productCapabilityIds`.
* The route must strictly observe language boundaries:
  * EN articles must link to EN routes.
  * RU articles must link to RU routes, unless no RU equivalent exists and cross-linking is explicitly allowed.
* The route must exist in resolved Project SEO State, including both `src/App.jsx` routes and pages assembled from the SEO registry.

## Forbidden product body patterns
* Directives like `[!product]`.
* JSX components like `<InlineProductBlock />`, `<ArticleFinalCta />`, or any raw product card components.
* Standalone promotional CTA blocks in the markdown body (e.g. `## Try GoToFlow Today`).
* Claims of unsupported features near the product link.

## Allowed product body patterns
Contextual, natural links are required. Examples:
* `You can use [GoToFlow's AI carousel maker](/ai-carousel-maker) to turn the outline into slides.`
* `For LinkedIn-specific workflows, use the [LinkedIn carousel maker](/linkedin-carousel-maker).`
* `Для русскоязычных каруселей можно использовать [AI-генератор каруселей](/ru/ii-generator-karuseley).`
