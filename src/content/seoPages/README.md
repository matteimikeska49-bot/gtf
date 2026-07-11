# Start Here

Before changing the GoToFlow SEO Pages Engine, read:

- `SYSTEM_MANIFEST.md`
- `ENGINE_FILES.md`
- `docs/seo-pages-engine/README.md`

GoToFlow SEO Publishing Platform is a separate immutable article system and must not be modified during SEO Pages Engine work.

# Non-Blog SEO Page Engine

This folder owns non-blog SEO/service/product page data and runtime rules.

Blog articles and non-blog SEO pages are separate systems. Do not put product, service, commercial, platform, template, prompt, example, use-case, or alternative page content into `src/content/blog/articles/`.

## Architecture

The SEO page engine follows the blog system pattern without copying the blog layout or Article schema:

content/data -> metadata contract -> page state -> templateVariant -> centralized renderer -> centralized routing -> head/schema -> sitemap/prerender eligibility -> validation gates -> visual QA -> human approval -> indexation

## Primary Design Reference

RU non-blog SEO/product pages must visually follow `/ru`:

- premium dark layout
- gradient/glow style
- large commercial hero typography
- homepage-level spacing
- polished CTA blocks
- commercial landing page structure

Do not invent a new design per URL.

## Folder Roles

- `index.js`: compatibility export and normalized registry API.
- `registry.js`: registry API re-export for future page modules.
- `states.js`: allowed lifecycle states and routing/indexation policy.
- `templateVariants.js`: controlled template variants and required section model.
- `protectedRoutes.js`: protected existing product/tool/system owners.
- `schema.js`: allowed non-blog SEO schema types.
- `helpers/`: route ownership, sitemap eligibility, origin, intent, locale/path, product-claim, related-link, and validation rules.
- `pages/ru/`: reserved home for future RU page records after architecture approval.

## States

- `planning_only`: backlog/action-map only, not routable, not indexable, not in sitemap.
- `quarantined_review`: candidate data exists, not routable unless explicitly route-review approved, not indexable, not in sitemap.
- `noindex_review`: routable for manual QA only, robots noindex, excluded from sitemap, requires `routeReviewApproved: true`.
- `indexable_approved`: routable, indexable, sitemap eligible, requires `approvedByHuman: true` and `indexationApproved: true`.

## Metadata Contract

Every SEO page record must define:

- identity and route: `id`, `path`, `language`, `pageType`
- lifecycle: `state`, `approvedByHuman`, `routeReviewApproved`, `indexationApproved`, `noindex`, `sitemapEligible`
- layout: `templateVariant`, `designReference`
- SEO: `title`, `description`, `h1`, `primaryIntent`, `primaryKeyword`, `secondaryKeywords`, `schemaType`
- ownership: `urlOrigin`, `urlOriginEvidence`, `intentOwner`, `routeOwner`, `canonicalOwner`
- content blocks: `sections`, `faq`, `cta`, and page-specific `finalCta` for production-ready pages
- links: `relatedBlogSlugs`, `relatedSeoPaths`, `relatedProductToolPaths`
- risk/control: `riskLevel`, `manualReviewReason`, `createdFromActionMapRowIds`, `notes`

## P0 Language And Product-Claim Rules

- EN non-blog SEO pages live at root paths such as `/example-page`.
- RU non-blog SEO pages live under `/ru`, such as `/ru/example-page`.
- Never create `/en` SEO page routes, canonicals, or hreflang URLs.
- EN pages use `designReference: "/"`.
- RU pages use `designReference: "/ru"`.
- Product/service copy must not claim fake features, fake stats, fake reviews, unsupported guarantees, unsupported full automation, direct publishing, or absolute market superiority.
- Safe wording is allowed when a capability is uncertain: `помогает подготовить`, `можно использовать для`, `удобно собрать`, `helps prepare`, `can be used to`, `helps structure`.

## CTA Rules

- `finalCta` is page-specific and must match the page intent, entity, product action, actual destination route, and real product capability.
- `finalCta` must not fall back to one universal generic heading across indexable or production-ready pages.
- `readyCarouselShowcaseCta` is separate from `finalCta`: showcase CTA moves the reader from examples into the creation flow, while final CTA closes the whole page with the intended outcome.
- Production-ready pages must define structured final CTA copy with `eyebrow`, `title.before/accent/after`, `description`, and `primaryAction`.
- Final CTA primary href must be an approved internal route. Missing, placeholder, raw HTML/JSX, duplicate secondary labels, or forbidden `черновик` wording fails readiness.

## Protected Routes

Existing product/tool pages win over the registry. Known protected RU owners include:

- `/ru/ai-generator-karuselej`
- `/ru/ii-generator-karuseley`
- `/ru/generator-kontenta`
- `/ru/generator-postov-instagram`
- `/ru/generator-karuselej-linkedin`

Additional hard-coded aliases are also protected in `protectedRoutes.js`.

## Validation

Run:

```bash
npm run check:seo
```

Or individually:

```bash
node scripts/check-seo-pages.mjs
node scripts/check-seo-origin-ledger.mjs
node scripts/check-seo-route-intent-ownership.mjs
node scripts/check-seo-related-links.mjs
node scripts/check-seo-sitemap-eligibility.mjs
node scripts/check-seo-product-claims.mjs
node scripts/check-seo-content-readiness.mjs
```

## Adding Future Pages

1. Prove URL origin in the URL origin ledger.
2. Confirm no protected product/tool or blog owner already owns the URL or intent.
3. Create a page record with complete metadata.
4. Start at `planning_only` or `quarantined_review`.
5. Move to `noindex_review` only after human approval for route QA.
6. Move to `indexable_approved` only after human approval, indexation approval, route/intent/sitemap validation, visual QA, and schema checks.

## SEO PAGES MASS PRODUCTION CONTRACT

1. **System Boundaries:** The SEO Pages Engine (`src/content/seoPages`) is strictly for commercial, tool, and template pages. Blog articles (`src/content/blog`) remain separate.
2. **Page Lifecycle:** Pages move from `planning_only` -> `noindex_review` -> `indexable_approved`.
3. **Product Truth:** Claims about availability, slide limits, and processing time must match the `ProductTruthRegistry`. Do not promise features that are only in the roadmap.
4. **Language/hreflang:** SEO pages are primarily RU-only unless an explicit EN counterpart is built. Do not use fake hreflang tags.
5. **Shared Layout:** All pages MUST use the global `<Header />` and `<Footer />` components without wrapping them in page-specific styling that restricts layout.
6. **Intent Ownership:** Ensure each page owns a unique search intent. Do not create duplicate pages for the exact same query.
7. **Cannibalization:** Verified through `check-seo-route-intent-ownership.mjs`.
8. **Assets:** Ensure all images use lazy loading (except LCP hero image), contain width/height, and serve via standard routes without local paths.
9. **Schema:** Use `FAQPage`, `BreadcrumbList`, `WebPage`, `WebSite`, `Organization`. `Article` and `BlogPosting` are strictly forbidden for template pages.
10. **Analytics:** Ensure standard tracking events are fired on CTA clicks and FAQ interactions.
11. **Committed Dist:** Source changes MUST be accompanied by an updated `dist/` directory generated by `npm run build`.
12. **Local Release Gate:** Run `npm run check:seo:release` and ensure 0 errors before committing.
13. **Build/Prerender:** `npm run build` must cleanly generate static HTML in `dist/`.
14. **Commit/Push:** Commit both source changes and `dist/` changes simultaneously.
15. **Coolify:** Auto-deploys from the `dist/` directory on the `main` branch.
16. **Live Verification:** Run `npm run check:seo:live -- --route=/ru/...` after deployment to verify production indexing factors.
17. **Lighthouse:** Manually measure production URLs and maintain >90 Desktop / >85 Mobile performance.
18. **Search Console:** Post-deploy, manually request indexing in GSC via URL Inspection.
19. **Yandex:** Post-deploy, manually request re-indexing in Yandex Webmaster.
20. **Monitoring:** Monitor CTR, position, and impressions for 30 days post-launch.
21. **Failure Conditions:** If the shared layout breaks, the build fails, or the live page returns a soft 404, the release is considered failed and must be reverted or hotfixed immediately.
