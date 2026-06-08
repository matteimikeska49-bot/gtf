# FAQ + CTA Single Source Contract

This contract defines the strict single-source rules for FAQ and Final CTA blocks in GoToFlow SEO articles.

## 1. FAQ Single Source
* **Rule**: FAQ content belongs ONLY in the frontmatter `faq` array.
* **Format**:
  ```yaml
  faq:
    - question: "..."
      answer: "..."
  ```
* **Forbidden**:
  * Body markdown `## FAQ`, `## Frequently Asked Questions`, or `## Частые вопросы` when a frontmatter FAQ exists.
  * Keys `q:` and `a:` (must be `question:` and `answer:`).
  * Empty items.
  * Raw HTML/JSX.

## 2. CTA Single Source
* **Rule**: The primary/final Call To Action belongs ONLY in the frontmatter `finalCta` object.
* **Format**:
  ```yaml
  finalCta:
    title: "..."
    text: "..."
    buttonText: "..."
    microcopy: "..."
    secondaryText: "..."
    secondaryHref: "#explore-more"
  ```
* **Forbidden**:
  * Body markdown CTA blocks designed to look like the final product pitch.
  * Markdown directives like `[!product]`.
  * JSX components like `<InlineProductBlock />` or `<ArticleFinalCta />` in the body.
  * Stale keys like `description`, `linkText`, `link`.

## 3. Allowed Exceptions
* Normal contextual product links in the editorial markdown (e.g., `[try our carousel maker](/ai-carousel-maker)`) are fully allowed and encouraged as long as they are natural inline links and not standalone CTA blocks.

## Enforcement
* Runtime components (`MarkdownSeoArticleTemplateV2.jsx`) only render the FAQ and CTA from frontmatter.
* `check-blog-faq-cta-contract.mjs` hard-fails duplicate blocks, forbidden keys, and stale formats.
