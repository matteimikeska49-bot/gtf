# Production SEO Article Rules

These rules dictate the visual and content quality standards for all production SEO articles. They must be strictly followed during article generation and review.

1. **FAQ Size:** The FAQ section must contain a minimum of 5 questions. The optimal number is 5–7 questions.
2. **No Literal Asterisks:** Do not use markdown asterisks (`*...*` or `**...**`) to highlight CTAs or paragraphs if this content is intended to render as plain text or if it causes literal asterisks to appear on the production page.
3. **Clean HTML Output:** Production HTML must not display literal `*`, `**`, or any other raw markdown syntax around normal phrases.
3. **No Raw JSX-like Components:** Markdown article bodies must never contain component-looking tags such as `<ArticleExploreZone>`, `<RelatedArticles>`, `<SecondaryCta>`, `<FinalCta>`, `<ArticleFinalCta>`, or `<InlineProductBlock>`. FAQ, Explore/Related links, and Final CTA must be represented in YAML frontmatter. Source, dist, rendered HTML, or production HTML containing these markers is a P0 publishing blocker.
4. **Quick Answer Layout:** The "Quick Answer" block must not render as a tiny narrow card inside a huge empty container. It should take up the full available width appropriately. If the text is short, the block must remain compact or well-distributed.
5. **No Duplicate Headings:** Do not allow duplicate semantic labels/headings in the same block (e.g., having an eyebrow "КОРОТКИЙ ОТВЕТ" directly above an H2 "Краткий ответ"). Remove the redundant label so it doesn't feel repetitive.
6. **Visual QA is Mandatory:** Visual QA must be performed after build. Specifically check:
   - Hero section
   - Quick Answer block
   - Tables
   - FAQ block
   - CTAs
   - Mobile rendering

7. **Typography and line-break quality:**
   - Для всех production SEO-статей RU/EN обязательна visual QA-проверка переносов.
   - Нельзя оставлять “обгрызенные” строки: когда после двоеточия, тире или смыслового разделителя остаётся одно слово/короткий обрывок.
   - Проверять нужно H1/H2/H3, hero subtitle, CTA, Quick Answer, карточки и крупные текстовые блоки.
   - Для RU и EN переносы проверяются отдельно: русский текст часто требует другой формулировки из-за длинных слов и падежей; английский — из-за коротких служебных слов и headline-style фраз.
   - Если `text-wrap: balance` или layout не решают проблему, нужно переформулировать текст так, чтобы строки делились естественно.
   - Не жертвовать смыслом/SEO-интентом ради красивой строки, но убирать очевидно некрасивые переносы.
   - Visual QA должен включать desktop и mobile.

8. **Title Promise Fulfillment:**
   - If the title, meta description, or H1 promises a specific number (e.g., "30 ideas", "15 examples", "50 topics", "7 mistakes"), the article body MUST contain at least that many clearly enumerated, self-contained items.
   - Each item must be substantive, not filler. One-word bullet points do not count.
   - If the body contains fewer items than the title promises, either add items or change the title. A mismatch is a hard blocker for publication.

9. **Product Truth Guardrail:**
   - Do not claim that GoToFlow guarantees perfect design, automatic quality control, auto-posting, API integration, or platform-specific generators unless the feature is explicitly verified in `docs/product-reality-claims.md`.
   - Use cautious language: "helps", "can help", "assists", "помогает", "может помочь". Avoid: "guarantees", "won't allow", "automatically perfect", "гарантирует", "не позволит", "автоматически идеально".
   - CTA titles and explore tool names must match real product features. Do not invent product names (e.g., "Cover Generator") that do not exist as separate features.

10. **Freshness / Platform Limits:**
    - If an article references a specific technical limit of a social platform (e.g., Instagram carousel slide count, character limits, video length), use cautious phrasing and check for current accuracy.
    - For Instagram carousels, use: "до 20 фото или видео, если функция доступна в вашем аккаунте/регионе" (EN: "up to 20 photos or videos, where available") instead of the outdated unconditional "up to 10".
    - Platform limits change frequently. Always add a qualifier like "at the time of writing" or "where available" to avoid stale claims.

11. **Anchor Link Integrity:**
    - Any internal link using `#section-id` must point to an element with a corresponding `id` on the same page.
    - Do not use generic anchors like `#examples` unless every single article has a dedicated section with that ID. Use reliable template-generated IDs like `#explore-more`.
    - CTA secondary links (`secondaryHref`) must provide actual value: they should lead to a valid section on the page (e.g., `#explore-more`) or direct to a relevant product route.
    - Broken anchors leave the user stranded and are considered a hard UX/SEO quality issue.

12. **Final CTA Useful Secondary Link:**
    - Primary CTA is required and should lead to the product or relevant conversion path.
    - Secondary CTA is required for live blog articles unless there is a documented reason to omit it.
    - Secondary CTA must provide a meaningful next step for the reader (relevant article/guide/example/comparison), not just an anchor.
    - Secondary CTA must not be decorative or duplicate the primary CTA without adding meaning.
    - A technically valid anchor is not automatically useful. Do not use `#explore-more` in final CTA if it creates a “nothing happened” feeling.
    - Microcopy like `No credit card required` / `Без карты` must be plain text, not a link.
    - Anchor text must describe the destination honestly.
    - EN articles should primarily link to EN routes. RU articles should primarily link to RU routes.

13. **Final CTA Secondary Link Visual Affordance:**
    - Every live blog article with  must make the secondary CTA visually recognizable as a link.
    - Secondary CTA text must end with the arrow symbol .
    - Do not duplicate arrows.
    - Do not use secondary CTA as plain-looking static text.
    - Missing arrow in live published/indexable articles is a quality issue.
    - The arrow is part of UX affordance: it tells the reader this is a clickable next step.

13. **Final CTA Secondary Link Visual Affordance:**
    - Every live blog article with `finalCta.secondaryText` must make the secondary CTA visually recognizable as a link.
    - Secondary CTA text must end with the arrow symbol `→`.
    - Do not duplicate arrows.
    - Do not use secondary CTA as plain-looking static text.
    - Missing arrow in live published/indexable articles is a quality issue.
    - The arrow is part of UX affordance: it tells the reader this is a clickable next step.

14. **Strict V2 Layout Enforcement:**
    - Plain markdown body is not acceptable for production SEO articles.
    - All articles must include a `lastReviewed` or `updatedAt` field in the frontmatter.
    - `quickAnswer`, `quickAnswerTitle`, `faq`, `explore`, and `finalCta` must be in the frontmatter, never in the body.
    - The body must contain at least one valid V2 element like `:::cards`, `[!takeaway]`, `[!workflow]`, `[!tip]`, etc.
