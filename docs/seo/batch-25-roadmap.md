# Batch 25 Roadmap

This roadmap defines the strict operational sequence to scale the GoToFlow SEO Publishing Platform from single-article tests to a mass-production system of 25 quality articles per batch.

## Stage D — Batch Foundation (Current)
**Goal:** Create the strategic SEO and content rules to govern mass generation.

### Stage D1: Foundation Docs
- **Inputs:** Current template and platform capabilities.
- **Outputs:** Brief template, anti-cannibalization rules, internal linking rules, mockup validation plan.
- **QA Gates:** Manual review of docs.
- **Done Criteria:** Docs exist in `docs/seo/`.
- **What not to do:** Do not generate any markdown articles yet.

### Stage D2: Topic Map
- **Inputs:** Keyword research.
- **Outputs:** `src/content/blog/topic-map.json` with 20-30 entries grouped by cluster.
- **QA Gates:** Check for identical intents across different clusters.
- **Done Criteria:** JSON file populated with targets.
- **What not to do:** Do not overlap EN and RU intents without explicit language mapping.

### Stage D3: Brief Generation
- **Inputs:** `topic-map.json`, `article-brief-template.md`.
- **Outputs:** 10 to 25 completed briefs.
- **QA Gates:** Manual review of product-led angles and anti-AI-water hooks.
- **Done Criteria:** All briefs approved.
- **What not to do:** Do not let the AI skip the brief stage and write the article directly.

### Stage D4: Batch Status Manager
- **Inputs:** Briefs.
- **Outputs:** `src/content/blog/batch-status.json` tracking system.
- **QA Gates:** Ensure every slug is tracked.
- **Done Criteria:** JSON accurately reflects current pipeline.

### Stage D5, D6, D7: Technical Enforcements
- **Inputs:** Rule docs (cannibalization, linking, mockups).
- **Outputs:** Updated `scripts/check-blog-publishing.mjs`.
- **QA Gates:** CI/CD pipeline fails if an EN article uses a RU mockup, or if a link points to 404.
- **Done Criteria:** Script strictly enforces boundaries.
- **What not to do:** Do not bypass tests.

---

## Stage E — Batch 10 Test Run
**Goal:** Test the automated generation and QA pipelines on a smaller subset (10 articles).

- **Inputs:** 10 Approved Briefs.
- **Outputs:** 10 Markdown drafts (`published: false`, `noindex: true`).
- **QA Gates:**
  1. `check:blog` passes (Frontmatter, Mockups).
  2. `check:blog:render` passes (No 500s).
  3. `check:blog:visual` passes (Screenshots look good, no horizontal overflow).
- **Done Criteria:** 10 drafts successfully deployed as hidden previews on production.
- **What not to do:** Do not set `published: true` immediately.

---

## Stage F — Batch 25 Publishing
**Goal:** Safely release 25 articles to production and monitor SEO impact.

- **Inputs:** 25 verified drafts from Stage E/F.
- **Outputs:** 25 Published pages.
- **QA Gates:**
  1. Automated sitemap verification.
  2. Index and routing verification.
  3. Search Console manual submission check for indexation blocks.
- **Done Criteria:** Articles are live, 200 OK, in sitemap, with `noindex: false`, and starting to rank.
- **What not to do:** Do not mass publish without a post-deploy verification script to ensure no 404s were introduced.
