# Batch Control System

This document outlines the executable checks and safeguards for the GoToFlow SEO Publishing Platform. This system ensures that generating 25+ articles per batch does not result in broken links, keyword cannibalization, mismatched languages, or SEO leaks.

## Philosophy
This is a **continuous publishing engine**, not a one-off article factory. It is designed to safely publish batches of 3, 7, 10, or 25 articles repeatedly.

## Core Trackers
- `src/content/blog/topic-map.json`: The strategic foundation. Every target keyword, intent, and canonical risk is defined here.
- `src/content/blog/batch-status.json`: The state machine. Tracks every article from `idea` -> `draft` -> `ready_to_publish` -> `published`.

## Executable Checks (npm scripts)

1. **`npm run check:blog`** (Existing)
   - Verifies frontmatter completeness (title, slug, language, preview flags).
   
2. **`npm run check:blog:cannibalization`**
   - Ensures no two markdown articles target the same `primaryKeyword` or `slug`.
   - Ensures consistency between markdown frontmatter and `topic-map.json`.
   
3. **`npm run check:blog:links`**
   - Validates all internal `href` targets in markdown files.
   - Blocks published articles from linking to `draft` or `noindex` pages.
   - Prevents linking to 404s.
   
4. **`npm run check:blog:mockups`**
   - Enforces strict language boundaries for visual assets.
   - RU articles *must* use `ru-*` mockups. EN articles *must not* use `ru-*` mockups.
   - Blocks raw `![]()` or `<img>` usage to force slot-based `:::mockup` components.
   
5. **`npm run check:blog:batch`**
   - Validates `batch-status.json` schema.
   - Ensures markdown files reflect the exact state tracked in the batch manager (e.g., if status is `draft`, markdown must have `published: false` and `noindex: true`).
   
6. **`npm run check:blog:render` / `check:blog:visual`** (Existing)
   - Performs SSR rendering to catch 500s.
   - Takes screenshots via Puppeteer to catch horizontal overflow or visual regressions.

7. **`npm run check:blog:production`**
   - Runs *only* after deployment.
   - Crawls the live production site (`gotoflow.io`) to verify that published articles return 200, are in `sitemap.xml`, and appear in the blog index.
   - Verifies that draft-preview articles have `noindex` and are explicitly excluded from `sitemap.xml`.

## Unified Commands

- **`npm run check:blog:all`**
  - Runs all local validation, rendering, and visual QA checks. 
  - Run this *before* generating drafts, and *before* publishing.
- **`npm run check:blog:deploy`**
  - Runs `check:blog:all`, then (conceptually) deploys, and finally runs `check:blog:production`.

## Daily Publishing Workflow

1. **Planning:** Update `topic-map.json` with new targets.
2. **Briefing:** Add entries to `batch-status.json` with status `brief`. Generate markdown briefs using the template.
3. **Drafting:** Agent generates markdown articles. Status moves to `draft` (published:false, noindex:true, preview:true).
4. **Local QA:** Run `npm run check:blog:all`. If it fails, fix the conflicts.
5. **Preview Deployment:** Commit/Push to trigger Coolify.
6. **Production QA:** Run `npm run check:blog:production` to verify the drafts are safely hidden but previewable.
7. **Publishing:** Change status to `ready_to_publish`, then `published`. Flip `published: true` and `noindex: false`.
8. **Final Deployment:** Commit/Push, wait for Coolify, then run `npm run check:blog:production` to confirm indexation.
