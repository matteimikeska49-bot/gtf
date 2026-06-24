# SEO Article Brief Template

This template MUST be completed and approved before generating any new article for the GoToFlow SEO Publishing Platform.

Canonical template source is repo files only:

- `docs/seo-article-template-v2.md`
- `src/components/blog/templates/MarkdownSeoArticleTemplateV2.jsx`
- `src/components/blog/MarkdownBlogArticlePage.jsx`
- `src/lib/blog/markdownArticles.js`
- `src/content/blog/articles/_template.md` as the authoring skeleton
- `src/content/blog/articles/test-seo-template-v2.md` as an internal fixture only

Do not use live production articles as template source. `/blog/ai-instagram-carousel-generator` is a live article, not a canonical template reference. `/blog/test-seo-template-v2` is not a production article example.

## 1. Meta & Strategy
- **Title (H1):** [Draft Title]
- **Slug:** `[slug-name]`
- **Language:** `[ru|en]`
- **Cluster:** `[Topic Cluster from Topic Map]`
- **Primary Keyword:** `[Keyword]`
- **Secondary Keywords:** `[Keyword 1, Keyword 2, Keyword 3]`
- **Search Intent:** `[Informational / Transactional / Investigational]`
- **Audience:** `[e.g., SMM managers, creators, founders without design skills]`
- **Article Type:** `[Pillar / How-to / Listicle / Thought-leadership]`
- **Funnel Stage:** `[TOFU / MOFU / BOFU]`

## 2. Positioning & Angle
- **Practical Outcome:** What exactly will the user achieve by the end of this article?
- **Unique Angle:** How is this better than the top 3 Google results? (e.g., "We show how to do it with ONE prompt instead of a 10-step Canva process").
- **Product Angle:** How do we naturally weave the GoToFlow product into the narrative without sounding like a cheap ad? (e.g., "Instead of doing steps 1-5 manually, paste the link here"). Must comply with `src/lib/blog/productPositioningPolicy.js`: competitors can be context, but never the final recommendation for our core use cases without a product bridge.
- **Do Not Cover / Intent Boundaries:** What should we EXCLUDE to avoid scope creep or missing the exact search intent?
- **AI-Water Risk Mitigation:** How do we avoid generic AI fluff like "In today's digital landscape..."? State the specific hook constraint.

## 3. Structure & Outline
- **H2:** [Subheading]
  - **H3:** [Sub-subheading]
- **H2:** [Subheading]
- *Add all H2s and H3s. Outline must logically cover the search intent.*

## 4. Content Requirements
- **Quick Answer Plan:** A 2-3 sentence direct answer to the primary intent, placed immediately after the intro.
- **Examples Plan:** What specific, niche examples will be used? (e.g., "Real estate carousel prompt example", "Fitness coach example"). NO generic examples.
- **Prompt / Checklist Plan:** If applicable, include the exact prompt or checklist the user can copy.
- **FAQ Plan:** 3-5 frequently asked questions from "People Also Ask" (Google).
- **Content Quality Notes:** Any additional notes on voice, tone, or formatting.

## 5. Internal Links & Ecosystem
- **Internal Links (In-body):** 
  - `[Link Text]` -> `[Target Slug]` (Must be published or in same batch)
- **Related Articles:**
  - Select relevant existing or future pages from the topic map to link at the bottom.
- **Cannibalization Check:** Which existing article is most similar? Explain why this new article has a different intent/angle.

## 6. Technical & QA
- **Required Mockup Slots:** choose from `[topic-input, result-preview, format-settings, style-choice]`
- **Approved Mockup Language:** Must strictly match the `Language` field above.
- **Publication Status:** `[draft / ready_to_publish / published]`
- **Target Publish Wave:** `[e.g., batch-4-drafts]`
- **SEO Rules:** 
  - If `draft`, MUST have `published: false` and `noindex: true`.
  - If `published`, MUST have `published: true` and `noindex: false`.

## 7. Workflow Tracking (Batch Status fields)
- **Brief Status:** `[approved / pending]`
- **Content QA Status:** `[passed / pending / failed]`
- **SEO QA Status:** `[passed / pending / failed]`
- **Mockup QA Status:** `[passed / pending / failed]`
- **Internal Links Status:** `[passed / pending / failed]`
- **Reviewer:** `[Name/System]`
- **Fail Reason:** `[null or reason]`
- **Approved For Draft:** `[true / false]`
- **Approved For Publish:** `[true / false]`
- **Production URL:** `[https://gotoflow.io/...]`

---
*Agent Prompt:* Fill out this brief completely before writing the markdown content. Request user review on the brief before proceeding to the generation phase.
