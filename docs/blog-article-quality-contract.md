# Blog Article Quality Contract

This contract defines the mandatory quality, structural, and product-fit rules for all SEO and blog articles in the GoToFlow ecosystem. It acts as a permanent gate blocking low-quality, misleading, or structurally broken articles from being published.

## 1. Article Type Classification
Every article MUST specify exactly one `articleType` in its frontmatter. Valid types and their **required** visual/content blocks are:

- `workflow_article`: Requires a product/workflow block showing the exact steps (e.g., `:::cards type:workflow`), product-fit note, CTA, and structured FAQ.
- `technical_guide`: Requires a technical specifications table, checklist, or detailed specification block, exact technical answer, product-fit note, and structured FAQ.
- `how_to`: Requires a step-by-step section, common mistakes card (`:::cards type:mistakes`), product/example block (if product-led), and structured FAQ.
- `comparison`: Requires a comparison table (`| Feature | Tool A | Tool B |`), honest product-fit boundaries, decision criteria, and CTA.
- `definition`: Requires a clear definition block, example usage, and structured FAQ.
- `listicle` / `ideas_article`: Requires examples (`:::cards type:examples`), numbered lists, and structured FAQ.
- `product_led_guide`: Requires strong product workflows, concrete examples of tool usage, and structured FAQ.

## 2. Product Fit Gate
Every article MUST answer: "Does GoToFlow solve the exact user query?"
The frontmatter MUST contain `productFit` (Allowed: `YES`, `PARTIAL`, `NO`) and `productFitExplanation`.

- `YES`: GoToFlow directly solves the problem. A product-led CTA is allowed and encouraged.
- `PARTIAL`: GoToFlow solves part of the problem. The article MUST explicitly state the limitations (e.g., "GoToFlow creates carousels but does not provide manual panoramic cropping tools").
- `NO`: GoToFlow does not solve this problem. Do not insert a misleading CTA or pretend it is the direct solution.

## 3. Visual / Product Block Gate
Text walls are prohibited for product-led articles. Articles MUST contain at least one useful visual/product block. This is tracked by `requiredVisualBlock` in the frontmatter.

Valid block types:
- `:::cards type:workflow`
- `:::cards type:examples`
- `:::mockup` (only with supported slots, do not invent them)
- Markdown tables (`| ... | ... |`)
- `:::prompts`

Rules:
- Do not invent screenshots or use fake mockups.
- Technical articles need a table.
- Workflow articles need a workflow block.

## 4. FAQ Gate
FAQ MUST be structured inside the article's frontmatter YAML array (`faq:`) and MUST NOT be written as plain markdown text underneath an `## FAQ` heading in the body.
The rendering template automatically extracts `article.faq` and renders it as an accordion with Schema.org markup.
The `faqFormat` frontmatter field must be set to `structured`.

## 5. Layout Stability Gate
- No raw markdown artifacts (e.g., `*(...)*`, empty `:::mockup` tags).
- No placeholder text (e.g., "TBD", "TODO", "Insert link here").
- No unsupported product claims (e.g., "guarantees perfect results").
- No random one-item bullet cards in huge containers.

## 6. Publish Blocker
An article CANNOT be published (`published: true`) unless its `qualityGateStatus` is explicitly set to `"passed"`.
Validation automatically fails the build if any of the above rules are violated.
