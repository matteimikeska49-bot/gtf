# SEO Pages Engine Production and Indexation Readiness Audit

Date: 2026-07-09

Scope: GoToFlow SEO Pages Engine only.

Old-system protection: the GoToFlow SEO Publishing Platform, existing blog system, article prompts, article checkers, blog routes, old product/tool pages, and blog markdown were inspected only as references and were not modified.

## Executive verdict

| Verdict | Status | Reason |
| --- | --- | --- |
| readyForTopicPlanning | Yes | The engine has a registry, origin ledger checks, route/intent ownership checks, protected-route rules, states, sitemap/prerender helpers, and planning/quarantine states. |
| readyForFirstNoindexPage | No | Current validation can accept a visually rendered but thin noindex page with empty section objects, empty FAQ/example objects, boilerplate composition, and minimally valid CTA fields. |
| readyForIndexation | No | Approved-only hreflang validation, rendered HTML validation, visual/mobile QA, semantic metadata uniqueness, and release gate checks are not implemented as blocking engine checks. |
| readyForScaledProduction | No | Similarity detection, variant-specific rendering, semantic link relevance, topic-cluster authority rules, and post-publication inspection are still manual or missing. |

The engine is a strong technical foundation, but it does not yet guarantee production-quality SEO pages. It currently guarantees safer routing and indexation lifecycle behavior better than it guarantees content usefulness, uniqueness, and rendered-page quality.

## What the engine currently guarantees

- SEO page data is centralized in `src/content/seoPages/`.
- SEO page components are centralized in `src/components/seo/`.
- Blog/article systems are separated and documented as immutable.
- Four lifecycle states exist: `planning_only`, `quarantined_review`, `noindex_review`, `indexable_approved`.
- Planning and quarantine records are not routable by default.
- Noindex/review records are excluded from SEO sitemap/prerender helper output.
- `indexable_approved` requires `approvedByHuman`, `indexationApproved`, `noindex: false`, and `sitemapEligible: true`.
- Protected product/tool/system routes are listed and route collisions are blocked unless an explicit approved migration exists.
- `/en` routes are forbidden; RU paths must live under `/ru`; EN paths must live at root.
- Article, BlogPosting, and NewsArticle schema types are blocked for SEO page records.
- WebPage, WebApplication, SoftwareApplication, and Product schema types are allowed.
- Product-claim scanning covers nested text-like fields and blocks several fake/unsupported claim classes.
- Related blog slugs, SEO paths, and protected product/tool paths are checked for basic existence/routability.
- `npm run check:seo` passes on the current registry with warnings, and currently reports zero routable/indexable SEO registry pages.

## What the engine does not yet guarantee

- It does not guarantee that required sections contain useful text, titles, bullets, examples, or answers.
- It does not guarantee section order.
- It does not guarantee a variant-specific rendered composition.
- It does not guarantee unique title, description, H1, hero, FAQ, examples, benefits, workflows, or full-page content.
- It does not guarantee semantic metadata quality beyond field presence and schema type.
- It does not validate CTA target existence, locale, product action, or intent adaptation.
- It does not validate hreflang against real approved counterpart pages.
- It does not validate rendered HTML output for SEO pages.
- It does not provide a mandatory visual/mobile release gate.
- It does not validate semantic internal-link relevance, anchors, duplicates, self-links, or broken anchors.
- It does not validate heading hierarchy, exactly one visible H1, image alt text, or empty H2/H3 blocks from rendered output.

## Template variant matrix

All seven expected variants are defined in `src/content/seoPages/templateVariants.js`.

| Variant | Required sections | Optional sections | Required order | Order enforced | Missing required sections fail | Empty required sections fail | Renderer used | Composition differs in code |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| commercial_tool | hero, problem, whatItCreates, useCases, workflow, examples, benefits, faq, related, finalCta | None defined | Listed order only | No | Yes, only for `noindex_review` and `indexable_approved` | No | `SeoPageTemplate` | No |
| platform_page | hero, platformUseCases, contentFormats, workflow, examples, benefits, faq, related, finalCta | None defined | Listed order only | No | Yes, only for `noindex_review` and `indexable_approved` | No | `SeoPageTemplate` | No |
| template_page | hero, templateCategories, examples, howToUse, faq, related, finalCta | None defined | Listed order only | No | Yes, only for `noindex_review` and `indexable_approved` | No | `SeoPageTemplate` | No |
| example_page | hero, examples, breakdown, howToCreate, related, finalCta | None defined | Listed order only | No | Yes, only for `noindex_review` and `indexable_approved` | No | `SeoPageTemplate` | No |
| alternative_page | hero, comparison, whenToUseGoToFlow, migrationBenefits, faq, related, finalCta | None defined | Listed order only | No | Yes, only for `noindex_review` and `indexable_approved` | No | `SeoPageTemplate` | No |
| prompt_page | hero, promptGroups, howToUsePrompts, examples, faq, related, finalCta | None defined | Listed order only | No | Yes, only for `noindex_review` and `indexable_approved` | No | `SeoPageTemplate` | No |
| use_case_page | hero, scenario, workflow, examples, benefits, faq, related, finalCta | None defined | Listed order only | No | Yes, only for `noindex_review` and `indexable_approved` | No | `SeoPageTemplate` | No |

Answer: different intents can receive different required data contracts, but they do not yet receive genuinely different rendered page compositions. The current renderer preserves one shared design system, but it renders the same high-level block sequence for every variant.

## Complete page contract

| Field group | Fields | planning_only | before noindex_review | before indexable_approved | Validation status |
| --- | --- | --- | --- | --- | --- |
| Identity | `id`, `language`, `path`, `slug`, `pageType`, `state`, `templateVariant` | Required | Required | Required | Automatically checked for presence and allowed values. |
| Ownership | `urlOrigin`, `urlOriginEvidence`, `intentOwner`, `routeOwner`, `canonicalOwner`, `ownershipDecision`, route collision, migration data | Required | Required | Required | Partly automated; semantic intent decision is manual/encoded. |
| Approval | `approvedByHuman`, `routeReviewApproved`, `indexationApproved`, `manualReviewReason` | Required fields | `routeReviewApproved=true` required | human and indexation approvals required | Automatically checked for state flags. |
| SEO targeting | `primaryKeyword`, `secondaryKeywords`, `primaryIntent`, `searchIntent`, topic/search scenario/value proposition | Mostly required by normalized contract | Required | Required | Field presence only; scenario/value proposition not fully structured or semantically validated. |
| Metadata | `title`, `description`, `h1`, canonical via path, robots via noindex | Required | Required | Required | Presence and lifecycle partly checked; uniqueness and semantic quality missing. |
| Content | hero, subtitle, sections, examples, workflows, benefits, comparisons, use cases, templates, prompts, FAQ | Fields required | Required section presence checked by variant | Required | Section presence is automatic; useful non-empty content is not guaranteed. |
| Links | `relatedBlogSlugs`, `relatedSeoPaths`, `relatedProductToolPaths`, breadcrumbs | Required fields | Related presence required indirectly by variant | Required | Basic existence checks; duplicate/self-link/relevance/anchor checks missing. |
| CTA | `cta.label`, `cta.href`, optional note | Required field | Final CTA presence checked | Required | Only label/href presence is checked; target/action/localization are not fully validated. |
| Technical | `schemaType`, routability, sitemap/prerender eligibility, noindex | Required | Required | Required | Strong lifecycle checks; rendered HTML checks missing. |

Synthetic read-only validation confirmed that a `noindex_review` page with empty section objects, empty FAQ/example objects, a one-character product bridge, and a basic CTA can pass `validateSeoPages()` if the required ids and state flags are present. This is a P0 blocker before producing the first real page.

## Search intent and ownership

Implemented controls:

- Duplicate registry id and duplicate registry path are blocked.
- Protected route collisions are blocked for `noindex_review` and `indexable_approved`.
- Existing product/tool routes are protected in `protectedRoutes.js`.
- Ownership decisions include `safe_new_registry_page`, `update_existing_page_instead`, `merge_into_existing_page`, `supporting_blog_article`, `faq_h2_only`, `secondary_keyword_only`, `manual_review_required`, and `explicit_migration_required`.
- The route/intent guardrail inspects App routes, RU blog articles, blog intent map entries, prerender routes, sitemap routes, and registry records.
- Blog URL origin cannot justify a commercial runtime state.
- `/en` route creation is blocked by locale rules.

Gaps:

- Duplicate normalized slug detection is not explicit.
- Duplicate primary intent is not automatically blocked across registry records.
- Blog overlap is surfaced as warnings/manual review, not semantic cannibalization scoring.
- Page type and template variant are mostly selected by static record fields and defaults, not by an automated intent classifier.
- Intent class distinctions are documented/encoded, but not deeply validated against page copy.

## Content completeness

The engine prevents some missing structures after a page reaches `noindex_review` or `indexable_approved`. It does not prevent thin pages.

Current automatic checks:

- Required fields must exist.
- Required variant sections must be represented.
- FAQ must be an array with at least one item when `faq` is required.
- Examples/templates/prompts must be an array with at least one item when that section is required.
- CTA must have `label` and `href`.
- Product-claim scanner blocks several unsupported/fake claims.

Missing checks:

- Section title/body non-empty validation.
- Bullet quality or minimum meaningful items.
- FAQ question/answer non-empty validation.
- Example title/body non-empty validation.
- Placeholder/TODO/lorem ipsum validation.
- Duplicate section item validation.
- Useful product/value explanation validation.
- Intent-specific completeness beyond section ids.
- Intelligent completeness scoring by section usefulness.

Answer: yes, a visually attractive but thin page can pass current validation. This is P0.

## Content uniqueness

| Control | Status |
| --- | --- |
| Duplicate title | Missing |
| Duplicate description | Missing |
| Duplicate H1 | Missing |
| Duplicate primary intent | Missing |
| Duplicate hero | Missing |
| Duplicate FAQ set | Missing |
| Duplicate examples | Missing |
| Duplicate benefits | Missing |
| Duplicate workflows | Missing |
| Duplicate internal-link sets | Missing |
| Full-page content similarity | Missing |
| Platform-name substitution detection | Missing |
| Identical section composition for unrelated intents | Missing |

A mandatory manual uniqueness gate is required before `noindex_review` until automated similarity checks exist. A page must not be considered production-ready only because metadata differs.

## Internal linking

Supported link types:

- Blog support links via `relatedBlogSlugs`.
- SEO page links via `relatedSeoPaths`.
- Existing product/tool links via `relatedProductToolPaths`.
- Breadcrumb links.
- CTA destination links.

Automatic validation:

- Related blog slug must be public, published, and not noindex.
- Related SEO path must exist in the registry.
- A routable page cannot link to a non-routable SEO page through `relatedSeoPaths`.
- Related product/tool paths must be protected known routes or registry records.

Missing or manual:

- No self-link check.
- No duplicate link check.
- No semantic relevance check.
- No meaningful anchor check beyond rendered title/description.
- No broken-anchor check.
- No complete locale check for every link target.
- No public/indexable-page rule for all link classes.
- No validation that supporting blog content links back to the main SEO page.
- Links are manually selected, automatically validated only for basic existence.

## CTA and product bridge

Supported:

- Primary CTA in hero.
- Final CTA block.
- CTA label and href.
- Optional CTA note.
- External app target support through `getAppUrlWithRef()`.
- Product bridge text rendered in benefits and final CTA.

Missing:

- Secondary CTA is not structured in the contract.
- CTA type is not structured.
- Product action is not structured.
- CTA target is not validated for existence/routability/localization.
- CTA is not checked for intent adaptation or boilerplate reuse.
- CTA href is not checked against unsupported product action claims except through text scanning of label/note.
- RU pages mentioning foreign AI tools do not have a structured availability/payment context field.

This is P0 for the first production noindex page because CTA validation is part of the production page contract, even though a human can manually review the first page.

## Metadata and on-page SEO

Implemented:

- `SeoPageSEOHead` sets document title, meta description, robots, OG/Twitter metadata, canonical, optional hreflang, and JSON-LD.
- Locale rules validate `/ru` and root EN path/canonical constraints when canonical fields are present.
- Schema type blocks Article/BlogPosting/NewsArticle.

Missing:

- Unique SEO title validation.
- Unique SEO description validation.
- Unique H1 validation.
- Semantic title/H1 alignment checks.
- Keyword stuffing checks.
- Heading hierarchy checks.
- Exactly one rendered H1 validation.
- Empty H2/H3 rendered checks.
- Image alt checks where relevant.
- Descriptive anchor validation.
- Metadata unsupported-functionality scanning beyond generic claim text patterns.
- Metadata copied-between-pages detection.

Metadata validation is mostly structural, not semantic.

## Crawlability and indexability

Lifecycle status:

| State | Current behavior |
| --- | --- |
| planning_only | Not routable, not indexable, not sitemap eligible. |
| quarantined_review | Not routable by default; not indexable; not sitemap eligible. |
| noindex_review | Routable only with `routeReviewApproved=true` and `noindex=true`; not sitemap eligible. |
| indexable_approved | Routable and indexable only with approval flags, `noindex:false`, and sitemap eligibility. |

Strong controls:

- Noindex pages cannot enter SEO sitemap helper output.
- SEO prerender uses the same eligibility as sitemap.
- Planning records cannot become public through registry helpers.
- Route collisions prevent registry takeover without approved migration.
- Current SEO sitemap helper pages: 0.
- Current SEO prerender helper pages: 0.

Gaps:

- Canonical existence is generated at runtime but not verified from rendered HTML.
- Removed/rejected candidates are protected by helper state rules, but dist/sitemap checks depend on current local `dist`.
- Public release gate is not a separate blocking command.

## Language and hreflang

Implemented:

- EN SEO pages must live at root paths.
- RU SEO pages must live under `/ru`.
- `/en` paths, canonicals, and hreflang URLs are forbidden.
- RU design reference must be `/ru`; EN design reference must be `/`.
- Hreflang syntax/path locale is checked if `page.hreflang` exists.

Missing:

- Hreflang is not validated against real approved counterpart pages.
- Hreflang is not blocked from pointing to `planning_only` or `quarantined_review` counterparts.
- Hreflang is not checked against missing routes beyond locale/path syntax.

Classification: approved-only hreflang validation is P1 before indexation, not P0 before the first noindex page.

## Schema

Supported:

- WebPage.
- WebApplication.
- SoftwareApplication.
- Product as an allowed record type.
- FAQPage when FAQ exists.
- BreadcrumbList when breadcrumbs exist.
- Organization and WebSite graph items.

Blocked:

- Article.
- BlogPosting.
- NewsArticle.

Gaps:

- Product schema is allowed in the registry contract but not currently emitted by `SeoPageSEOHead`.
- Schema content is built from record fields but not validated against rendered visible content.
- FAQ schema can include FAQ items that may be hidden behind collapsed UI except the first item.
- FAQ question/answer emptiness is not validated.
- Application/product schema does not include fake ratings/prices, which is good, but there is no rendered-schema validation gate.
- Canonical URL and WebPage schema URL are aligned by construction, but not verified after rendering.

## Rendered HTML

Current support:

- Prerender can include SEO registry pages that pass `getSeoPagesForPrerender()`.
- `SeoPageSEOHead` injects title, description, canonical, robots, hreflang, and schema client-side.
- The template renders H1, hero subtitle, body sections, examples, FAQ, related links, and CTA links for routable pages.

Missing:

- No SEO Pages Engine rendered HTML checker exists.
- No check confirms title, description, canonical, robots, H1, body copy, CTA links, internal links, FAQ content, and schema in generated HTML.
- No check confirms no empty shell pages.
- Critical FAQ content beyond the first open item may be hidden until interaction.
- No check confirms noindex/indexable state in final generated HTML.
- No check confirms indexable pages have sitemap/prerender/rendered HTML consistency.

Classification: rendered HTML validation is P1 before indexation.

## Design and mobile quality

Implemented:

- Shared components use the dark homepage-like design language for RU SEO pages.
- Header, footer, layout wrapper, breadcrumbs, hero, sections, cards, FAQ, related links, and CTA blocks exist.
- Responsive Tailwind classes are present for common desktop/mobile layouts.
- One-off layouts are documented as forbidden.

Gaps:

- The design reference is implemented as shared styling but not validated against `/ru` visually.
- One-off layouts are prohibited by docs, not automatically blocked.
- Empty/oversized content can still render awkwardly because content length and empty fields are not validated.
- No visual/mobile QA command exists for SEO pages.
- No screenshot or mobile viewport gate is required before indexation.

Answer: variants can use different data structures while preserving one visual language, but they currently render through one mostly identical page composition. Visual/mobile QA is documented, not mandatory.

## Trust and claims

Implemented:

- Nested text scanning covers common text-like keys including title, description, H1, heroSubtitle, primaryIntent, primaryKeyword, productBridge, CTA label/note, sections, FAQ, examples, benefits, templates, and prompts.
- Blocked categories include unsupported guarantees, fake/absolute performance statistics, fake reviews/clients, unsupported full automation, absolute market superiority, and unsupported upload/extraction automation.
- Safe wording remains possible: `помогает подготовить`, `можно использовать для`, `удобно собрать`, `helps prepare`, `can be used to`, `helps structure`.

Gaps:

- Schema fields are indirectly safe because generated schema uses checked record text, but there is no separate schema-output claim scan.
- Fabricated case studies are not broadly detectable unless they match blocked patterns.
- Invented integrations/pricing claims are not comprehensively modeled.
- Negation/safe-context matching may let some risky sentences pass if phrased as a question or near a negation.

## Production workflow coverage

| Step | Status |
| --- | --- |
| 1. topic selected | manual |
| 2. demand/source evidence attached | implemented for URL origin evidence/ledger |
| 3. intent owner confirmed | documented and partly encoded |
| 4. route owner confirmed | implemented |
| 5. pageType selected | implemented |
| 6. templateVariant selected | implemented |
| 7. content brief created | missing |
| 8. required sections defined | implemented |
| 9. unique content produced | manual/missing gate |
| 10. examples adapted | manual/missing gate |
| 11. CTA selected | implemented structurally, weak validation |
| 12. internal links selected | manual with basic validation |
| 13. product claims validated | implemented |
| 14. metadata validated | structural only |
| 15. human content approval | documented/field exists |
| 16. noindex_review | implemented state |
| 17. page rendered | implemented route/template |
| 18. technical checks | implemented via `npm run check:seo` |
| 19. rendered HTML check | missing; P1 before indexation |
| 20. visual/mobile QA | documented only; P1 before indexation |
| 21. indexation approval | implemented field |
| 22. indexable_approved | implemented state |
| 23. sitemap inclusion | implemented helper |
| 24. post-publication inspection | missing/manual |

## P0 blockers before the first page

1. Required block content quality is not enforced.
   - Empty section objects, empty FAQ/example objects, and minimal placeholder-like product text can pass `validateSeoPages()` for `noindex_review`.

2. Variant-specific rendered composition is not implemented.
   - Seven variants define different required sections, but `SeoPageTemplate` renders one shared composition for all variants.

3. Required section order is not enforced.
   - The variant arrays define order, but validation only checks presence.

4. Mandatory uniqueness review is missing.
   - There is no automated or explicit blocking manual gate for duplicate metadata, FAQ, examples, benefits, workflows, hero text, or full-page similarity.

5. CTA validation is incomplete.
   - CTA label/href presence is checked, but target existence, locale, action type, product action, and boilerplate/intent adaptation are not.

6. Placeholder/TODO/thin-copy checks are missing.
   - The engine can render polished empty cards or low-value sections.

Exact P0 requirement: before producing the first real noindex page, add or require a blocking production-readiness validator that checks useful non-empty section content, examples, FAQ, CTA, internal links, uniqueness/manual uniqueness approval, and variant-specific composition/order.

## P1 blockers before indexation

1. Approved-only hreflang validation.
2. Rendered HTML validation for SEO pages.
3. Visual/mobile QA release gate.
4. Semantic metadata uniqueness and heading hierarchy validation.
5. Internal-link relevance/self-link/duplicate/locale/anchor checks.
6. Schema output validation against rendered visible content.
7. Indexation release command that combines content approval, technical checks, rendered HTML, mobile QA, sitemap, robots, canonical, and schema.

## P2 scaling improvements

1. Automated full-page similarity detection.
2. Automated platform-name substitution detection.
3. Topic-cluster authority scoring.
4. Post-publication live inspection.
5. Automated backlink/supporting-blog reciprocal-link planning.
6. More granular CTA types and product-action taxonomy.
7. Optional semantic scoring for metadata and section usefulness.

## Exact next implementation step

Implement a SEO Pages Engine production-readiness gate before creating the first real SEO page:

- Add a checker dedicated to page production readiness, separate from blog checkers.
- Make it fail `noindex_review` and `indexable_approved` pages when required sections have empty titles/bodies, empty examples, empty FAQ question/answers, placeholder/TODO text, missing or invalid CTA targets, missing relevant internal links, duplicate content blocks, or missing manual uniqueness approval.
- Add variant-specific composition/order validation so each template variant produces a genuinely different page structure while preserving the shared design system.
- Keep the first real page in `noindex_review`; do not open sitemap/indexation until P1 rendered HTML and visual/mobile gates exist.
