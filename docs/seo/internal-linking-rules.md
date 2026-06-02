# Internal Linking Rules

Internal linking distributes PageRank, establishes Topical Authority, and guides users through the funnel. For Batch 25, internal linking must be deliberate, not random.

## 1. ArticleExploreZone Configuration

The `MarkdownSeoArticleTemplateV2` uses an `ArticleExploreZone` at the bottom of the article.
- The LLM must select **exactly 2 or 3** highly relevant links for this zone in the frontmatter `explore_links` or markdown body (depending on the template implementation).
- These links MUST match the language of the article (RU to RU, EN to EN).

## 2. Permitted Link Targets

**DO LINK TO:**
- Published Pillar pages (e.g., `/ai-carousel-maker`, `/ru/generator-kontenta`).
- Published Blog articles (e.g., `/blog/linkedin-carousel-prompts`).
- Articles in the *same batch* that are guaranteed to be published simultaneously.

**DO NOT LINK TO:**
- Pages with `published: false` or `noindex: true`.
- Draft/Preview routes (e.g., linking to `/blog/test-seo-template-v2` in a production article).
- Non-existent slugs (results in 404s and hurts SEO).

## 3. Pillar and Supporting Relationships

- **Supporting -> Pillar (Mandatory):** Every Informational/How-to article MUST contain at least one contextual link high up in the body to its parent Transactional Pillar page. 
  - *Example:* "Instagram Carousel Ideas" must link to the "AI Carousel Maker".
- **Pillar -> Supporting (Optional/Contextual):** Pillar pages can link down to supporting guides in a "Resources" section, but the primary goal of a Pillar is conversion (CTA), not sending users away to read more.

## 4. Cross-Language Linking

- **Strict Isolation:** An EN article should NEVER link to a `/ru/` route in the body or explore zone, and vice versa. Language switching is handled at the app level, not inside content.

## 5. Product & Tool Links

- Every article should have a natural product-led hook (GoToFlowProductAngle).
- This hook should use a contextual hyperlink to the relevant tool. 
- *Anchor Text Rules:* Do not use "click here". Use descriptive anchor text like "try the AI carousel generator" or "generate LinkedIn carousels".

## 6. Validation and QA

Before a batch is published, a QA script must verify:
1. All `href` targets inside the markdown exist in `topic-map.json` (as published) or in the static app routes.
2. No `href` points to a known 404 or a `draft` status article.
3. No identical blocks of links are repeated blindly across 25 articles (avoiding boilerplate footprints). Explore links should vary based on the specific `cluster`.
