# SEO Pages System Architecture

Date: 2026-07-08

## Purpose

This architecture defines the reusable non-blog SEO/service/product page engine for GoToFlow.

It is not a blog system and it is not a one-page implementation. It is the controlled path for future commercial, service, product, tool, platform, template, example, prompt, use-case, and alternative pages.

## Pipeline

content/data -> metadata contract -> page state -> templateVariant -> centralized renderer -> centralized routing -> head/schema -> sitemap/prerender eligibility -> validation gates -> visual QA -> human approval -> indexation

## Design Rule

The primary RU design reference is `/ru`.

Non-blog SEO pages must follow the GoToFlow homepage design system:

- premium dark layout
- gradient/glow style
- large hero typography
- homepage-level spacing
- polished CTA blocks
- commercial landing structure

Do not create a custom visual language per URL.

## Folder Structure

- `src/content/seoPages/index.js`: normalized API and compatibility exports.
- `src/content/seoPages/registry.js`: registry API re-export.
- `src/content/seoPages/states.js`: strict state model.
- `src/content/seoPages/templateVariants.js`: controlled template variants.
- `src/content/seoPages/protectedRoutes.js`: protected route owners.
- `src/content/seoPages/schema.js`: allowed schema types.
- `src/content/seoPages/helpers/routeOwnership.js`: route collision and migration checks.
- `src/content/seoPages/helpers/sitemapEligibility.js`: routing/indexing/sitemap/prerender policy.
- `src/content/seoPages/helpers/originLedger.js`: URL origin values and rules.
- `src/content/seoPages/helpers/intentOwnership.js`: intent ownership rules.
- `src/content/seoPages/helpers/relatedLinks.js`: related-link helpers.
- `src/content/seoPages/helpers/validation.js`: metadata and template contract validation.
- `src/content/seoPages/pages/ru/README.md`: reserved future RU page-record home.
- `src/components/seo/`: centralized renderer components.
- `scripts/check-seo-*.mjs`: SEO engine validation gates.

## Page States

| State | Routable | Indexable | Sitemap eligible | Approval required |
|---|---:|---:|---:|---|
| `planning_only` | no | no | no | origin/owner decision before runtime |
| `quarantined_review` | no by default | no | no | route review approval before runtime |
| `noindex_review` | yes | no | no | `routeReviewApproved: true` |
| `indexable_approved` | yes | yes | yes | `approvedByHuman: true` and `indexationApproved: true` |

`noindex` means renderable but not indexable only when state allows routing. It does not automatically mean 404; state and `routeReviewApproved` control routing.

## Metadata Contract

Every SEO page candidate must define:

- `id`
- `path`
- `language`
- `pageType`
- `state`
- `templateVariant`
- `title`
- `description`
- `h1`
- `primaryIntent`
- `primaryKeyword`
- `secondaryKeywords`
- `urlOrigin`
- `urlOriginEvidence`
- `intentOwner`
- `routeOwner`
- `canonicalOwner`
- `approvedByHuman`
- `routeReviewApproved`
- `indexationApproved`
- `noindex`
- `sitemapEligible`
- `designReference`
- `relatedBlogSlugs`
- `relatedSeoPaths`
- `relatedProductToolPaths`
- `faq`
- `sections`
- `cta`
- `schemaType`
- `riskLevel`
- `manualReviewReason`
- `createdFromActionMapRowIds`
- `notes`

Missing required metadata fails `node scripts/check-seo-pages.mjs`.

## Template Variants

| Variant | Required sections |
|---|---|
| `commercial_tool` | hero, problem, whatItCreates, useCases, workflow, examples, benefits, faq, related, finalCta |
| `platform_page` | hero, platformUseCases, contentFormats, workflow, examples, benefits, faq, related, finalCta |
| `template_page` | hero, templateCategories, examples, howToUse, faq, related, finalCta |
| `example_page` | hero, examples, breakdown, howToCreate, related, finalCta |
| `alternative_page` | hero, comparison, whenToUseGoToFlow, migrationBenefits, faq, related, finalCta |
| `prompt_page` | hero, promptGroups, howToUsePrompts, examples, faq, related, finalCta |
| `use_case_page` | hero, scenario, workflow, examples, benefits, faq, related, finalCta |

The template variant controls layout and section order. Page data fills controlled blocks.

## URL Origin Rules

Allowed `urlOrigin` values:

- `existing_sitemap_product_tool`
- `existing_sitemap_blog`
- `existing_route_inventory`
- `existing_hardcoded_route`
- `seo_action_map_candidate`
- `seo_registry_candidate`
- `manually_inferred_candidate`
- `unknown_needs_review`

Rules:

- Existing sitemap/product-tool URLs cannot be recreated through the registry.
- Existing blog articles are support content only.
- Related blog articles are not proof for a commercial URL.
- Manual inferred candidates require manual review.
- New SEO URLs require human approval before `noindex_review`.
- `indexable_approved` requires `approvedByHuman: true` and `indexationApproved: true`.

## Protected Routes

Protected existing product/tool owners are defined in `protectedRoutes.js`.

Known protected RU sitemap/product-tool owners include:

- `/ru/ai-generator-karuselej`
- `/ru/ii-generator-karuseley`
- `/ru/generator-kontenta`
- `/ru/generator-postov-instagram`
- `/ru/generator-karuselej-linkedin`

Registry catch-alls must come after protected hard-coded routes and must never override them.

## Schema Rules

- Blog articles may use Article/BlogPosting.
- Non-blog SEO pages must not use Article schema.
- Allowed non-blog SEO schema types: `WebPage`, `WebApplication`, `SoftwareApplication`, `Product`.
- `schemaType` is explicit metadata and is validated.

## Sitemap Rules

Sitemap/prerender eligibility is centralized in `helpers/sitemapEligibility.js`.

- `planning_only`: excluded.
- `quarantined_review`: excluded.
- `noindex_review`: excluded.
- `indexable_approved`: included only with approval and indexation approval.
- Noindex registry pages must never appear in SEO sitemap helper output.

## Related Link Rules

- `relatedBlogSlugs` must point to existing published, non-noindex blog articles.
- `relatedSeoPaths` must point to known SEO registry paths; routable SEO pages may only link to routable/approved SEO pages.
- `relatedProductToolPaths` must point to protected existing product/tool routes or known SEO records.
- Blog support links are allowed but do not prove URL origin.

## Validation Commands

```bash
npm run check:seo
```

Individual gates:

```bash
node scripts/check-seo-pages.mjs
node scripts/check-seo-origin-ledger.mjs
node scripts/check-seo-route-intent-ownership.mjs
node scripts/check-seo-related-links.mjs
node scripts/check-seo-sitemap-eligibility.mjs
```

## Safe Future Page Workflow

1. Select a URL candidate from the corrected URL origin ledger.
2. Confirm the candidate is not a protected existing route and not just a blog-support topic.
3. Add complete metadata in the SEO page content system.
4. Start in `planning_only` or `quarantined_review`.
5. Move to `noindex_review` only after human route review approval.
6. Run validation and visual QA.
7. Move to `indexable_approved` only after human approval and indexation approval.
