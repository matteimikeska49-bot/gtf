# SEO VK/Telegram Noindex Review Pages

Date: 2026-07-08

## Scope

This review covers the first two safe non-blog SEO registry review pages:

- `/ru/vk-post-generator`
- `/ru/telegram-post-generator`

Both pages remain centralized in `src/content/seoPages/index.js` and render through `src/components/seo/`. No blog markdown, blog articles, route definitions, sitemap logic, prerender logic, commits, pushes, or deploy steps were changed.

## What Was Improved

### `/ru/vk-post-generator`

- Clarified that the page owns VK-specific tool intent, not a generic all-social-networks intent.
- Expanded the H1 support copy, description, product bridge, sections, examples, and FAQ around:
  - generator posts for VK;
  - posts for VK groups and communities;
  - VK content ideas and rubrics;
  - VK post structure;
  - text blocks for VK cards and visual formats;
  - safe language around preparing drafts, not unsupported automation.
- Added clearer examples for group/community posts, cards, event announcements, and VK rubric ideas.
- Kept supporting blog links only to existing published RU markdown articles.
- Limited related SEO page links to currently routable safe registry pages.

### `/ru/telegram-post-generator`

- Clarified that the page owns Telegram-specific tool intent, not a generic all-social-networks intent.
- Expanded the H1 support copy, description, product bridge, sections, examples, and FAQ around:
  - generator posts for Telegram;
  - Telegram channel posts;
  - Telegram business channel content;
  - Telegram post structure;
  - short and long Telegram post formats;
  - safe language around preparing drafts, not unsupported automation.
- Added clearer examples for short channel posts, long expert posts, announcements, and publication series.
- Kept supporting blog links only to existing published RU markdown articles.
- Limited related SEO page links to currently routable safe registry pages.

## Why Pages Remain Noindex

Both pages are still review pages:

- `published: true`
- `noindex: true`
- excluded from SEO registry sitemap helpers
- excluded from SEO registry prerender helpers

They should stay noindex until visual QA, final product claim review, cannibalization review, and human SEO approval are complete.

## Validation Results

| Check | Result |
|---|---|
| `/ru/vk-post-generator` registry route | Pass: routable through SEO registry helper |
| `/ru/telegram-post-generator` registry route | Pass: routable through SEO registry helper |
| Published state | Pass: both remain `published: true` |
| Noindex state | Pass: both remain `noindex: true` |
| Sitemap status | Pass: both excluded from `getSeoPagesForSitemap()` |
| Prerender status | Pass: both excluded from `getSeoPagesForPrerender()` |
| Article schema | Pass: registry pages use `WebPage + WebApplication`, not `Article` |
| Breadcrumbs | Pass: registry breadcrumbs exist and SSR-rendered route includes breadcrumb nav |
| Canonical | Pass: canonical is generated as `https://gotoflow.io${page.path}` |
| CTA blocks | Pass: SSR-rendered route includes primary and final CTA blocks |
| FAQ | Pass: both pages include and SSR-render FAQ |
| Related SEO links | Pass: only cross-link between the two currently routable safe noindex registry pages |
| Related blog links | Pass: all referenced markdown files exist, are RU, and are published |
| Blog markdown safety | Pass: no blog markdown diff |
| Dist/public safety | Pass: no `dist` or `public` status changes |
| Existing `/ru/ii-generator-karuseley` owner | Pass: hard-coded `RuAICarouselGeneratorPage` route is still defined before registry catch-all |
| Ownership guardrail | Pass: `npm run check:seo-route-intent` |
| Build | Pass: non-mutating Vite build to `/private/tmp/gotoflow-seo-vk-telegram-build` |

## Related Blog Articles Verified

VK page:

- `/ru/blog/kak-napisat-post-v-vk-s-pomoshyu-ii`
- `/ru/blog/generator-karuseley-dlya-vk`
- `/ru/blog/temy-postov-dlya-gruppy-vkontakte`

Telegram page:

- `/ru/blog/kak-vesti-telegram-kanal-biznesu`
- `/ru/blog/struktura-prodayuschego-posta-v-telegram`
- `/ru/blog/ii-post-dlya-socsetej`

## Remaining Fixes Before Indexation

### `/ru/vk-post-generator`

- Run a human visual review in browser on desktop and mobile.
- Confirm product/legal wording does not imply unsupported VK publishing automation.
- Decide whether supporting blog pages should add safe contextual links to this noindex page later.
- Re-check cannibalization against broad `/ru/generator-kontenta` and VK supporting articles.
- Only after approval, change indexation deliberately in a separate task.

### `/ru/telegram-post-generator`

- Run a human visual review in browser on desktop and mobile.
- Confirm product/legal wording does not imply unsupported Telegram publishing automation.
- Decide whether supporting blog pages should add safe contextual links to this noindex page later.
- Re-check cannibalization against broad `/ru/generator-kontenta` and Telegram supporting articles.
- Only after approval, change indexation deliberately in a separate task.

## Validation Limitations

The sandbox blocked starting a local Vite preview server on `127.0.0.1`, and the escalation request was rejected by the approval system. Route/render QA was completed with registry helpers, static route inspection, Vite SSR rendering without binding a port, ownership guardrail, related-link file validation, and a non-mutating production build to `/private/tmp`.

## Recommended Next Step

Visually review these two noindex pages in a browser on desktop and mobile. If approved, open indexation one page at a time in a later, explicit task that checks sitemap/prerender/canonical/robots again.
