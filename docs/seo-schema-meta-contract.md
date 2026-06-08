# SEO Meta & Schema Contract

This document defines the strict SEO metadata and schema rules for the GoToFlow SEO platform.

## Required SEO fields
* `title`
* `description`
* `slug`
* `language`
* `canonical`
* `primaryKeyword`
* `createdAt`
* `updatedAt`
* `lastReviewed`
* `published`
* `noindex`
* `preview`
* `approvedForPublish`

## Title rules
* Must be unique enough across articles.
* No raw keyword stuffing.
* Language-consistent.
* Recommended length: 40–70 chars.
* Hard warning outside 30–80 chars.

## Description rules
* Must be unique enough across articles.
* Language-consistent.
* Recommended length: 120–160 chars.
* Hard warning outside 90–180 chars.

## Canonical rules
* EN: `https://gotoflow.io/blog/slug`
* RU: `https://gotoflow.io/ru/blog/slug`
* No duplicate canonicals.

## Robots rules
* Draft: `noindex`
* Published: indexable unless explicitly blocked.

## Schema rules
* Article schema uses frontmatter `title`, `description`, `canonical`, and dates.
* FAQPage schema uses frontmatter `faq` only.
* No schema from body FAQ.
* No published/indexable schema state for draft/noindex content.
* Schema language matches frontmatter language.
