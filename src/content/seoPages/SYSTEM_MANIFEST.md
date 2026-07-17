# GoToFlow SEO Pages Engine - System Manifest

## System Identity

Name:
GoToFlow SEO Pages Engine

Purpose:
Non-blog SEO/service/product/commercial pages.

This system owns non-blog landing-style SEO pages: service pages, product/tool pages, commercial pages, platform pages, template pages, prompt pages, example pages, alternative pages, and use-case pages.

## Separate Immutable System

Name:
GoToFlow SEO Publishing Platform

Purpose:
SEO articles and blog publishing.

Rules:

- SEO Publishing Platform is a separate production system.
- It is read-only during SEO Pages Engine work.
- Its files, prompts, workflow, folders, checkers, and articles must not be moved or changed.
- It may only be used as an architectural and rule reference.
- SEO Pages Engine content must never be placed in `src/content/blog/articles/`.
- An existing blog article is not proof that a commercial/service URL should be created.
- The protected file `src/content/blog/demand-sources/gotoflow_topic_demand_merged_for_gemini.txt` must not be modified, moved, renamed, deleted, staged, or included in SEO Pages Engine work.

## Canonical Locations

| Location | Purpose | Ownership | Allowed changes | Forbidden changes |
| --- | --- | --- | --- | --- |
| `src/content/seoPages/` | Core SEO page registry, states, rules, helpers, manifests, page data. | GoToFlow SEO Pages Engine | Add/update approved engine rules, planning records, manifests, helpers, and registry entries. | Blog article content, one-off layouts, unrelated product/page code, old-system files. |
| `src/components/seo/` | Shared SEO page renderers and visual components. | GoToFlow SEO Pages Engine | Update centralized SEO page components and templates. | One-off page-specific components, blog article layout, individual page content. |
| `scripts/check-seo-*.mjs` | SEO Pages Engine validation scripts. | GoToFlow SEO Pages Engine | Add/update SEO Pages Engine checks. | Blog checker behavior, article release gates, broad unrelated scripts. |
| `docs/seo-pages-engine/` | New-system documentation entry point. | GoToFlow SEO Pages Engine | Add/update concise new-system docs and indexes. | Moving old docs, duplicating article workflow, editing blog docs. |
| `scratch/seo-demand-imports/` | Research, ledgers, inventories, audits, action maps, topic planning. | Planning/audit data for SEO systems | Add new planning/audit outputs. | Treating scratch data as production registry, editing protected blog demand sources. |
| `package.json` | Shared command integration. | Shared site infrastructure | Minimal command wiring for SEO checks when explicitly approved. | Dependency churn, unrelated scripts, blog release behavior changes. |
| `src/App.jsx` | Shared route integration. | Shared site infrastructure | Minimal centralized SEO route/hub wiring when explicitly approved. | Individual page content, one-off SEO page layouts, overriding protected routes. |
| `prerender.mjs` | Shared prerender/sitemap integration. | Shared site infrastructure | Minimal centralized helper integration for approved/indexable SEO pages. | Individual URL hardcoding from registry candidates, noindex sitemap leaks. |
| `src/components/RouteSchemaInjector.jsx` | Shared schema routing bridge. | Shared site infrastructure | Minimal centralized schema exclusion/integration for SEO pages. | Individual metadata, page content, blog schema changes. |
| `src/utils/schemaGenerator.js` | Shared schema helpers. | Shared site infrastructure | Generic reusable schema helper additions when explicitly approved. | Article schema for SEO pages, individual page-specific schema content. |

## Actual File Inventory

The complete current file map is maintained in:

- `src/content/seoPages/ENGINE_FILES.md`

Current engine groups:

- Core files: `src/content/seoPages/README.md`, `index.js`, `registry.js`, `schema.js`, `states.js`, `templateVariants.js`, `workflowPresets.js`, `protectedRoutes.js`, `pages/ru/README.md`, planning manifests under `src/content/seoPages/planning/`, exact reusable blueprints under `src/content/seoPages/blueprints/`, and helpers under `src/content/seoPages/helpers/`.
- Component files: all files under `src/components/seo/`.
- Checker files: all `scripts/check-seo-*.mjs`.
- Documentation files: `docs/seo-pages-engine/README.md` and existing SEO Pages Engine reports under `docs/`.
- Planning/audit files: relevant ledgers, inventories, action maps, route audits, and topic plans under `scratch/seo-demand-imports/`.
- Shared integration files: `package.json`, `src/App.jsx`, `prerender.mjs`, `src/components/RouteSchemaInjector.jsx`, `src/utils/schemaGenerator.js`.

Do not list hypothetical files as if they exist. Update `ENGINE_FILES.md` when new engine files are intentionally added.

## Shared Infrastructure

Actual SEO Pages Engine usage in shared files:

- `package.json`: defines `check:seo` and `check:seo-route-intent`.
- `src/App.jsx`: imports `SeoPageRoute` and registers centralized SEO hub/dynamic routes after protected product/tool routes.
- `prerender.mjs`: imports `getSeoPagesForPrerender()` and `getSeoPagesForSitemap()` from the registry.
- `src/components/RouteSchemaInjector.jsx`: imports `getSeoPageByPath()` to avoid article-style schema injection for registry-owned SEO paths.
- `src/utils/schemaGenerator.js`: provides generic WebPage/WebApplication/SoftwareApplication/FAQ/Breadcrumb schema helpers used by SEO pages.

Rules:

- These files are shared.
- They are not the home of SEO page content.
- Changes must remain minimal and centralized.
- No individual-page logic is allowed there.

## Protected Routes

Protected existing product/tool routes cannot be overridden unless an explicit migration is approved.

Current protected route ownership is centralized in:

- `src/content/seoPages/protectedRoutes.js`
- `src/content/seoPages/helpers/routeOwnership.js`

Protected examples include:

- `/ru/ai-generator-karuselej`
- `/ru/generator-karuselej-instagram`
- `/ru/ii-generator-karuseley`
- `/ru/generator-kontenta`
- `/ru/ii-generator-kontenta`
- `/ru/generator-postov-instagram`
- `/ru/ii-generator-postov-dlya-instagram`
- `/ru/generator-karuselej-linkedin`
- `/ru/ii-generator-postov-dlya-linkedin`

## Page States

| State | Permits | Prohibits |
| --- | --- | --- |
| `planning_only` | Backlog and planning records. | Runtime routing, indexation, sitemap/prerender inclusion. |
| `quarantined_review` | Candidate records for review; routing only if `routeReviewApproved` is explicitly true. | Indexation, sitemap/prerender inclusion, production-ready status. |
| `noindex_review` | Manual QA routing with `routeReviewApproved: true` and robots noindex. | Indexation and sitemap inclusion. |
| `indexable_approved` | Routing, indexation, sitemap/prerender eligibility after `approvedByHuman: true`, `indexationApproved: true`, `noindex: false`, and validation. | Any indexable state without explicit approvals and ownership validation. |

## Future Page Workflow

1. Topic/source import.
2. Candidate created as `planning_only`.
3. URL origin proof.
4. Intent ownership check.
5. Collision/cannibalization review.
6. `templateVariant` selection.
7. Human approval.
8. `noindex_review`.
9. Content and visual implementation.
10. Technical validation.
11. Rendered HTML and visual/mobile QA.
12. Indexation approval.
13. `indexable_approved`.
14. Sitemap eligibility.

## Language Rules

- EN: `https://gotoflow.io/<slug>`
- RU: `https://gotoflow.io/ru/<slug>`
- Never `/en`.
- EN design reference: `/`
- RU design reference: `/ru`

Implemented rule sources:

- `src/content/seoPages/helpers/localeRules.js`
- `src/content/seoPages/helpers/validation.js`

## Design and Composition Rules

- EN pages use `/` as the primary visual reference.
- RU pages use `/ru` as the primary visual reference.
- SEO pages use centralized template variants.
- Variants define a strict deterministic order of `supportedSections` combining `requiredSections` and `optionalSections`.
- Pages must explicitly declare `templateSections` and populate the necessary data.
- `template_page` narrative order is structure -> product process -> canonical product capabilities -> real result -> page-specific use cases -> FAQ -> related content -> final CTA.
- For `template_page`, `productCapabilities` follows `productWorkflow`, `readyCarouselShowcase` follows `productCapabilities`, and `useCases` appears before `faq` and `related`.
- Validation enforces the presence of all required sections and silently ignores omitted optional sections without failing readiness.
- No one-off custom layouts.
- No blog/article layout for commercial SEO pages.

## Exact SEO Page Blueprint and Handoff Gates

Canonical reusable blueprint:

- `src/content/seoPages/blueprints/exactSeoPageBlueprint.js`

The first approved blueprint is based on the existing `/ru/templates/instagram-carousel` implementation. It records the real section order, component names, component paths, accepted data props, required copy slots, required visual slots, existing asset paths, protected reference routes, and handoff validation rules.

This blueprint is a production handoff contract. It is not a new runtime renderer, not a new template variant, not a page record, not a sitemap source, and not permission to create batch pages.

Canonical stage contract and page-specific handoffs:

- `src/content/seoPages/handoffs/stageContract.js`
- `src/content/seoPages/handoffs/seamlessInstagramCarouselHandoff.js`

Production stages:

- `gemini_content_design`
- `codex_draft_preview_integration`
- `human_visual_review`
- `codex_production_integration`
- `human_release_review`

Gemini content/design stage may only change explicit handoff/design paths such as `src/content/seoPages/handoffs/*.js` and separately approved `public/images/seo-handoffs/**/*` assets. It may not change runtime routes, the registry, template variants, React renderers, shared components, Header/Footer, sitemap, lifecycle/schema/prerender implementation, `dist`, checkers, package scripts, Product Truth Registry, or runtime page files.

Codex draft-preview integration may build a noindex localhost draft before owner visual approval, but only after a complete Gemini handoff: `handoffComplete: true`, `contentDesignStatus: handoff_complete`, filled copy slots, filled visual slots, valid component paths, valid Product Truth claims, no placeholders, and no internal labels. Draft preview must stay `noindex_review` or equivalent, with `indexable: false`, `sitemapEligible: false`, `indexationApproved: false`, `approvedForRelease: false`, no committed release dist, no production schema/canonical approval, and no push.

Human visual review is required after localhost draft preview. The owner reviews text, composition, real visuals, mobile layout, blueprint fit, Product Truth, and absence of internal labels or generic placeholders. Automated checks do not replace this review.

Codex production integration may change production runtime only after the owner approves the visual draft: `ownerVisualApprovalReceived: true` and `approvedForProductionIntegration: true`. Codex may not rewrite approved copy, change section order, replace approved components, create a generic renderer, or create a new variant without returning to Gemini/human review.

Human release review blocks push/release until production integration is complete and `approvedForRelease: true`.

The command `npm run check:seo:stage -- --stage=gemini_content_design` enforces the current git diff and handoff state. It also supports `--stage=codex_draft_preview_integration`, `--stage=codex_production_integration`, and `--stage=human_release_review`.

Full production pipeline:

1. demand/intent/cluster/brief
2. Gemini complete handoff
3. Codex noindex localhost draft
4. human visual approval
5. Codex production integration
6. lifecycle/release/build/prerender/dist
7. human release approval
8. Gemini push
9. Coolify
10. live SEO gate
11. live visual review
12. Lighthouse/PageSpeed
13. Google/Yandex indexing

Gemini responsibilities:

- Choose the approved blueprint.
- Fill complete human-readable copy for every required copy slot.
- Select real local visual assets or approved component visual references for every required visual slot.
- Draft metadata, FAQ, CTA, related links, Product Truth claims, and localhost review notes.
- Fix owner feedback before Codex integration.
- REQUIRED MANUAL GUARDRAIL: A human reviewer MUST manually verify that the generated H1 does NOT contain informational patterns (e.g. "Как создать...", "Что такое...") without explicit confirmation in the Demand Master (check the Score v2 and Primary queries).

Gemini is forbidden to:

- Invent new variants, renderers, routes, sitemap entries, or release approvals.
- Expose registry keys, section IDs, lifecycle states, implementation labels, placeholders, or `mockup: not_available` in visible copy.
- Substitute generic cards for mapped components.

Codex responsibilities:

- Verify blueprint ID, component paths, props, assets, route ownership, intent ownership, schema, accessibility, Product Truth, build, prerender, sitemap eligibility, committed dist, and local commit readiness.
- Wire only owner-approved content into existing registry/runtime systems.
- Keep the existing Header/Footer and protected product/tool routes intact.

Codex is forbidden to:

- Rewrite approved copy, change approved section order, replace approved components, insert placeholder visuals, create generic renderers, or push/release without final owner approval.

Human owner approval states:

- `content_design_draft`
- `human_review`
- `approved_for_technical_integration`
- `technical_review`
- `approved_for_release`

Gates:

- Gemini work may remain in `content_design_draft` or `human_review`.
- Codex integration is blocked until `approved_for_technical_integration`.
- Technical validation may move through `technical_review`.
- Push, sitemap release, and public release are blocked until `approved_for_release`.

Forbidden visible strings and patterns include:

- `USE_CASE_PAGE`
- `COMMERCIAL_TOOL`
- `SECTION`
- raw section IDs such as `readyCarouselShowcase` and `productWorkflow`
- raw variant keys such as `template_page`, `commercial_tool`, and `use_case_page`
- lifecycle states such as `planning_only`, `quarantined_review`, `noindex_review`, and `indexable_approved`
- placeholders such as `TODO`, `TBD`, `placeholder`, `not_available`, and `mockup: not_available`

The readiness checker imports the blueprint and proves both a valid handoff fixture and failing handoff fixtures. Future blueprint changes must update the checker fixtures in the same commit.

## Mandatory Product Proof Modules

Every future exact-blueprint product SEO page must carry the full mandatory product-page module set before it can enter `noindex_review`:

- canonical product workflow: `SeoProductWorkflowShowcase` from `src/components/seo/template-page/SeoProductWorkflowShowcase.jsx`, rendered with `data-seo-proof="product-workflow"`, real workflow steps, product interface mockups, and no text-card substitute.
- canonical product capabilities: `SeoPageWorkflow` from `src/components/seo/SeoPageWorkflow.jsx`, rendered with `data-seo-proof="product-capabilities"`, backed by `SEO_CANONICAL_PRODUCT_CAPABILITIES` from `src/content/seoPages/productTruthRegistry.js`, and preserving every required capability ID.
- canonical ready results showcase: `SeoReadyCarouselShowcase` from `src/components/seo/template-page/SeoReadyCarouselShowcase.jsx`, rendered with `data-seo-proof="ready-results-showcase"`, at least five result/example cards, at least five real local images/previews, non-empty src/alt data, a CTA, and no placeholder or page-specific handoff assets reused as the canonical gallery.
- page-specific visual proof: a separate page-specific result block rendered with `data-seo-proof="page-specific-result"`, using local assets tied to the target query and not sharing the same DOM node or image set as the ready-results showcase.
- separate use cases: rendered with `data-seo-section="use-cases"` and kept distinct from product capabilities and editing controls.
- FAQ: rendered with `data-seo-section="faq"`, 12 to 16 unique product SEO questions, and FAQPage schema matching visible questions, answers, order, and count 1:1.
- related links: approved related blog/product/SEO targets only.
- final CTA: page-specific, truthful, and tied to the approved product action.

Carousel product pages require `canonicalProductWorkflow`, `canonicalProductCapabilities`, `canonicalReadyCarouselShowcase`, and `pageSpecificVisualProof` in `productProofModules`.

Post/content product pages require `canonicalProductWorkflow`, `canonicalProductCapabilities`, `canonicalReadyResultsShowcase`, and `pageSpecificVisualProof` in `productProofModules`.

`handoffComplete`, `draftPreviewIntegrationAllowed`, `draftPreviewIntegrated`, `productionIntegrationCompleted`, and `approvedForRelease` are blocked unless product proof modules are present, component paths match the blueprint, assets exist, rendered proof markers validate, FAQ count/parity validates, and runtime data matches the handoff. The stage checker for `codex_draft_preview_integration` must receive the runtime page and fail when Codex skips, shortens, or substitutes any mandatory proof module.

## CTA Contract

- Production-ready SEO pages must define page-specific `finalCta` data instead of relying on a universal generic fallback.
- `finalCta` must match the page intent, entity, product action, destination route, and real GoToFlow capability.
- `finalCta` uses structured data: `eyebrow`, `title.before`, `title.accent`, `title.after`, `description`, and `primaryAction`.
- `finalCta.primaryAction.href` must be an approved internal route for production-ready pages.
- `readyCarouselShowcaseCta` is a separate optional contract for the lower example gallery. Its role is to connect examples to the creation flow, not to duplicate the final page CTA.
- A `productWorkflow` CTA may be omitted when `readyCarouselShowcase` follows immediately and provides the immediate action CTA.
- Avoid duplicated consecutive CTA blocks between workflow and ready-result showcase.
- Validation fails missing, empty, placeholder, raw HTML/JSX, duplicate secondary-label, invalid href, and forbidden `черновик` final CTA wording.
- Variant guidance: `template_page` CTAs should reference selecting a structure/template mode and creating the finished result; `commercial_tool` CTAs should reference generating the tool output; `platform_page` CTAs should reference producing content for the named platform; `prompt_page` CTAs should reference using the prompt; `example_page` CTAs should bridge from example to the user's own version; `use_case_page` CTAs should name the scenario outcome; `alternative_page` CTAs should position GoToFlow honestly as an alternative.

## Validation Commands

| Command | Script file | Purpose | Current result |
| --- | --- | --- | --- |
| `npm run check:seo` | `package.json` | Runs all SEO Pages Engine checks. | Pass |
| `node scripts/check-seo-pages.mjs` | `scripts/check-seo-pages.mjs` | Registry contract, state, locale, schema, template validation. | Pass |
| `node scripts/check-seo-origin-ledger.mjs` | `scripts/check-seo-origin-ledger.mjs` | URL origin ledger validation. | Pass |
| `node scripts/check-seo-route-intent-ownership.mjs` | `scripts/check-seo-route-intent-ownership.mjs` | Route collision and intent ownership guardrail. | Pass with known review warnings |
| `node scripts/check-seo-related-links.mjs` | `scripts/check-seo-related-links.mjs` | Related blog/SEO/product link validation. | Pass |
| `node scripts/check-seo-sitemap-eligibility.mjs` | `scripts/check-seo-sitemap-eligibility.mjs` | Sitemap/prerender/noindex eligibility validation. | Pass |
| `node scripts/check-seo-product-claims.mjs` | `scripts/check-seo-product-claims.mjs` | Product capability, fake claims, guarantees, automation, stats, review claim guardrail. | Pass |
| `node scripts/check-seo-content-readiness.mjs` | `scripts/check-seo-content-readiness.mjs` | P0 noindex/indexable production-readiness validation for sections, CTA, links, uniqueness, approvals, and variant composition. | Pass |

## Mandatory Future-Agent Instructions

Every future SEO Pages Engine task must begin by reading:

- `src/content/seoPages/SYSTEM_MANIFEST.md`
- `src/content/seoPages/ENGINE_FILES.md`

Every future agent must:

- run `git status --short`
- identify pre-existing changes
- avoid the SEO Publishing Platform
- avoid unrelated files
- avoid `git add .`
- modify only explicitly approved new-system files

## Recommended Selective Staging Groups

Do not run `git add .`. Use exact paths only after human approval.

### 1. SEO Pages Engine core

- `src/content/seoPages/README.md`
- `src/content/seoPages/SYSTEM_MANIFEST.md`
- `src/content/seoPages/ENGINE_FILES.md`
- `src/content/seoPages/index.js`
- `src/content/seoPages/registry.js`
- `src/content/seoPages/schema.js`
- `src/content/seoPages/states.js`
- `src/content/seoPages/templateVariants.js`
- `src/content/seoPages/workflowPresets.js`
- `src/content/seoPages/protectedRoutes.js`
- `src/content/seoPages/pages/ru/README.md`
- `src/content/seoPages/helpers/intentOwnership.js`
- `src/content/seoPages/helpers/localeRules.js`
- `src/content/seoPages/helpers/originLedger.js`
- `src/content/seoPages/helpers/productClaims.js`
- `src/content/seoPages/helpers/contentReadiness.js`
- `src/content/seoPages/helpers/relatedLinks.js`
- `src/content/seoPages/helpers/routeOwnership.js`
- `src/content/seoPages/helpers/sitemapEligibility.js`
- `src/content/seoPages/helpers/validation.js`

### 2. SEO Pages Engine components

- `src/components/seo/SeoHubPage.jsx`
- `src/components/seo/SeoPageBenefits.jsx`
- `src/components/seo/SeoPageCTA.jsx`
- `src/components/seo/SeoPageExamples.jsx`
- `src/components/seo/SeoPageFAQ.jsx`
- `src/components/seo/SeoPageHead.jsx`
- `src/components/seo/SeoPageHero.jsx`
- `src/components/seo/SeoPageRelatedLinks.jsx`
- `src/components/seo/SeoPageRoute.jsx`
- `src/components/seo/SeoPageSEOHead.jsx`
- `src/components/seo/SeoPageSection.jsx`
- `src/components/seo/SeoPageTemplate.jsx`
- `src/components/seo/SeoPageWorkflow.jsx`
- `src/components/seo/template-page/SeoProductWorkflowShowcase.jsx`

### 3. SEO Pages Engine checkers

- `scripts/check-seo-origin-ledger.mjs`
- `scripts/check-seo-pages.mjs`
- `scripts/check-seo-product-claims.mjs`
- `scripts/check-seo-content-readiness.mjs`
- `scripts/check-seo-related-links.mjs`
- `scripts/check-seo-route-intent-ownership.mjs`
- `scripts/check-seo-sitemap-eligibility.mjs`

### 4. SEO Pages Engine documentation

- `docs/seo-pages-engine/README.md`
- `docs/seo-pages-engine-acceptance-audit-2026-07-08.md`
- `docs/seo-pages-engine-implementation-report-2026-07-08.md`
- `docs/seo-pages-engine-p0-rules-implementation-2026-07-08.md`
- `docs/seo-pages-system-architecture-2026-07-08.md`
- `docs/seo-pages-system-architecture-audit-2026-07-08.md`
- `docs/seo-page-registry-implementation-2026-07-08.md`
- `docs/seo-page-system-audit-2026-07-08.md`
- `docs/seo-route-intent-ownership-guardrail-2026-07-08.md`
- `docs/seo-url-origin-ledger-2026-07-08.md`
- `docs/seo-action-map-sitemap-aware-ownership-2026-07-08.md`
- `docs/seo-ru-url-inventory-and-p0-collision-audit-2026-07-08.md`
- `docs/seo-sitemap-audit-2026-07-08.md`
- `docs/blog-seo-rules-audit-for-seo-pages-2026-07-08.md`
- `docs/blog-seo-rules-audit.md`
- `docs/seo-systems-naming-and-boundaries-2026-07-08.md`
- `docs/seo-systems-naming-and-boundaries.md`

### 5. Shared integration changes

- `package.json`
- `src/App.jsx`
- `prerender.mjs`
- `src/components/RouteSchemaInjector.jsx`
- `src/utils/schemaGenerator.js`

Stage only if the shared integration diff is reviewed and accepted separately.

### 6. Planning/audit files

- `scratch/seo-demand-imports/2026-07-06/seo-url-origin-ledger-2026-07-08.csv`
- `scratch/seo-demand-imports/2026-07-06/seo-ru-url-inventory-2026-07-08.csv`
- `scratch/seo-demand-imports/2026-07-06/seo-p0-route-and-intent-collision-audit-2026-07-08.csv`
- `scratch/seo-demand-imports/2026-07-06/seo-existing-product-tool-upgrade-plan-2026-07-08.csv`
- `scratch/seo-demand-imports/2026-07-06/seo-new-registry-noindex-review-plan-2026-07-08.csv`
- `scratch/seo-demand-imports/2026-07-06/seo-p0-update-existing-backlog-2026-07-08.csv`
- `scratch/seo-demand-imports/2026-07-06/seo-route-only-manual-check-plan-2026-07-08.csv`
- `scratch/seo-demand-imports/2026-07-06/gotoflow_seo_action_map_FINAL_REVIEW_WITH_SITEMAP_2026-07-08.csv`
- `scratch/seo-demand-imports/2026-07-06/blog-seo-rules-audit.csv`
- `scratch/seo-demand-imports/2026-07-06/blog-seo-rules-audit-2026-07-08.csv`

### 7. Protected and unrelated files that must be excluded

- `src/content/blog/`
- `src/content/blog/articles/`
- `src/content/blog/intent-map.json`
- `src/content/blog/demand-sources/`
- `src/content/blog/demand-sources/gotoflow_topic_demand_merged_for_gemini.txt`
- `scripts/check-blog-*.mjs`
- existing blog/article docs and prompts
- generated build output
- temporary files
- unrelated pre-existing source changes not accepted as part of the SEO Pages Engine
