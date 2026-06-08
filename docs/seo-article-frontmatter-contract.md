# GoToFlow SEO Article Frontmatter Contract

This document defines the exact, enforceable frontmatter contract for all SEO articles.

## Core SEO Fields
* `title` (string, required): The H1 and default title tag.
* `description` (string, required): Meta description.
* `slug` (string, required): The URL slug.
* `language` (string, required): `"en"` or `"ru"`.
* `primaryKeyword` (string, required): The main search keyword.
* `canonical` (string, required): Full absolute URL, e.g., `https://gotoflow.io/blog/slug` or `https://gotoflow.io/ru/blog/slug`.
* `createdAt` (string, required): YYYY-MM-DD.
* `updatedAt` (string, optional): YYYY-MM-DD.
* `lastReviewed` (string, optional): YYYY-MM-DD.

## Publish Safety Fields
All draft/new articles must have safe defaults. Unsafe combinations will fail CI.
* `published` (boolean, required): False for drafts.
* `noindex` (boolean, required): True for drafts.
* `preview` (boolean, required): True for drafts/previews.
* `approvedForPublish` (boolean, required): False unless explicitly approved by admin.

## Stage 1-5 Alignment Fields
Articles are structurally linked to the SEO platform planning layers.
* `keywordRecord` (string, required): Must exist in `keyword-candidates.json`.
* `topicScoreId` (string, required): Must exist in `topic-priority-score.json`.
* `finalPriorityScore` (number, required): 1-100.
* `priorityTier` (string, required): `"P1"`, `"P2"`, `"P3"`, or `"HOLD"`.
* `productCapabilityIds` (array of strings, required): Must exist in `product-capabilities.json`.
* `intentId` (string, required): Must exist in `intent-map.json`.
* `clusterId` (string, required): Must exist in `cluster-authority-map.json`.
* `articleRole` (string, required): `"hub"`, `"supporting"`, `"product-led-how-to"`, etc.
* `hubSlug` (string, required): The slug of the parent hub, or itself if it is the hub.
* `relatedProductRoute` (string, required): e.g., `/` or `/instagram-carousel-maker`.

## Content Fields
* `quickAnswerTitle` (string, required): Title for the quick answer box.
* `quickAnswer` (array of strings, required): Bullet points for the quick answer box.
* `faq` (array of objects, optional): Must use strict `question` and `answer` keys. No `q`/`a`.
* `finalCta` (object, required): Must use `title`, `text`, `buttonText`, `microcopy`, `secondaryText`, `secondaryHref`.
* `explore` (object, optional): Links to related tools and guides.

## Mockup Fields
* `mockupStatus` (string, required): e.g., `"present"`, `"not_available"`, `"planned"`.
* `mockupReason` (string, required): Context for the status.

## Forbidden Fields & Patterns
* `finalCta.description`: Do not use this legacy field. Use `text`.
* `q` / `a` inside FAQ: Must use `question` / `answer`.
* `[!product]`: Unsupported markdown directive.
* Raw JSX/HTML: Forbidden in markdown body.
