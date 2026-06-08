# Language Consistency Contract

This document defines the strict language consistency architecture for the GoToFlow SEO platform.

## Article language rules
* `language: en` means all reader-visible content must be English.
* `language: ru` means all reader-visible content must be Russian.
* Mixed-language phrases are allowed only for product names, platform names, or unavoidable terms:
  * GoToFlow
  * LinkedIn
  * Instagram
  * AI
  * SEO
  * CTA
  * B2B
  * PDF
  * UGC

## Route rules
* EN blog: `/blog/slug`
* RU blog: `/ru/blog/slug`
* EN product routes must not be used in RU articles if RU route exists.
* RU product routes must not be used in EN articles.

## Metadata rules
* title, description, quickAnswer, FAQ, finalCta, schema-facing content must match article language.

## Mockup rules
* Mockup language must match article language.
* Mockup visible text must match language when known.
* Unknown visible text should warn for legacy and fail for strict D53/high-priority if used.

## Rollout rules
* Strict fail: D53, draft/preview, P1/P2.
* Warnings: older published legacy articles unless dangerous.
