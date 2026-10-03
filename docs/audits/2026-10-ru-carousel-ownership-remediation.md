# RU carousel ownership remediation — October 2026

## Scope and source lock

- Repository: `matteimikeska49-bot/gtf`
- Approved and remote base: `4ca1e21edfba8c113b61b6a8622da9aada063962`
- Orqestra source-transition evidence: PR #156, merged as `2e972b518939aebe067dbe695624800e5c1ecf9b`
- Change class: `UPDATE_EXISTING`; no new indexable URL, taxonomy, hub, or production system
- Content-cluster decision: `REQUIRED` for intent-ownership control. Visible taxonomy and indexable cluster hubs are `NOT_NEEDED`.

The SEO PAGE and SEO ARTICLE systems remain separate. The two money pages use the existing RU product route component; the four supporting articles remain in the publishing platform.

## Root cause addressed

Yandex relevant-URL selection was receiving mixed commercial signals from two product routes and several supporting articles. Generic AI carousel creation, Instagram-specific creation, publishing instructions, an overview guide, educational AI content, and comparison content were not consistently separated by copy and internal-link destinations.

This remediation makes the two commercial owners explicit and turns the informational pages into intent-specific support instead of alternative transactional owners.

## Keyword ownership map

| Query family | Before owner ambiguity | Intended owner after | Supporting pages |
|---|---|---|---|
| Generic carousel generator / create a carousel online / AI carousel tool | Generic product H1 opened with platform names; educational and comparison pages could also look transactional | `/ru/ii-generator-karuseley` | `/ru/blog/ii-dlya-karuseley`, `/ru/blog/luchshie-ai-generatory-karuselej` |
| Instagram carousel generator / create an Instagram carousel | The dedicated product route existed, but Instagram-specific guides sent creation links to the generic carousel or Instagram post generator | `/ru/generator-karuselej-instagram` | `/ru/blog/karusel-dlya-instagram`, `/ru/blog/kak-vylozhit-karusel-v-instagram` |
| Upload / publish an Instagram carousel | Article mixed publishing instructions with links to an unrelated Instagram post generator | `/ru/blog/kak-vylozhit-karusel-v-instagram` | Instagram commercial owner only as the pre-publication creation bridge |
| What an Instagram carousel is / how the format works | Overview article used the generic product owner for Instagram-specific creation passages | `/ru/blog/karusel-dlya-instagram` | Instagram commercial owner as the conversion bridge |
| How to use AI in a carousel workflow | Educational guide already linked to the generic product owner | `/ru/blog/ii-dlya-karuseley` | Generic commercial owner |
| Best AI carousel generators / tool comparison | Comparison article already had a generic CTA, but an extra direct-creation link pointed to the LinkedIn generator | `/ru/blog/luchshie-ai-generatory-karuselej` | Generic commercial owner for users ready to create |

## Exact remediation plan

| Page | Before problem | Exact change | Business purpose |
|---|---|---|---|
| `/ru/ii-generator-karuseley` | H1 foregrounded Instagram and LinkedIn, weakening the generic owner signal | Make H1 explicitly generic/cross-platform while preserving direct app CTA and conversion layout | Consolidate generic commercial demand on the primary money page |
| `/ru/generator-karuselej-instagram` | Mid-page and final CTAs inherited generic wording | Use Instagram-specific CTA wording on the dedicated route | Keep search-to-product continuity for Instagram creation intent |
| `/ru/blog/kak-vylozhit-karusel-v-instagram` | Explore, in-body bridge, and final CTA linked carousel creation to `/ru/generator-postov-instagram` | Point only carousel-creation contexts to `/ru/generator-karuselej-instagram` | Preserve publishing intent while supporting the correct commercial owner |
| `/ru/blog/karusel-dlya-instagram` | Instagram-specific product bridge and CTA linked to generic owner | Point the Instagram-specific product route, contextual links, and final CTA to `/ru/generator-karuselej-instagram` | Keep the overview informational and route transactional users to the dedicated landing page |
| `/ru/blog/luchshie-ai-generatory-karuselej` | Two ready-to-create links pointed to the LinkedIn generator; the rendered final CTA bypassed the generic money page | Point direct generic creation and the final CTA to `/ru/ii-generator-karuseley` | Preserve comparison intent while supporting the generic owner |
| `/ru/blog/ii-dlya-karuseley` | Contextual links were correct, but the rendered final CTA bypassed the generic money page | Route the final CTA through `/ru/ii-generator-karuseley`; do not rewrite the educational body | Preserve educational intent and the already-correct generic bridge |

## Implementation and generated output

- Added route-specific generic versus Instagram headings and CTA labels in the existing shared RU carousel component.
- Added an opt-in `finalCta.primaryHref` path to the existing article template. Only the four cluster articles use it; the default final-CTA behavior for all other articles is unchanged.
- Added ownership guardrails for the four supporting articles and taught the internal-link checker to recognize static routes declared in `src/App.jsx`.
- Split the Instagram overview article into a semantic, non-indexable-map cluster so its commercial bridge can point to `/ru/generator-karuselej-instagram` without changing the established crop and size owners.
- Rebuilt production output. Six changed routes contain fresh prerendered content. All committed HTML entry points now reference the same fresh `index-Bf-psFLC.js` bundle; the two superseded bundles were removed. No sitemap URL changed.

## Intentionally untouched

- `/ru/blog/pochemu-instagram-obrezaet-foto-v-karuseli`: proven crop-query owner; no title, H1, body, or ownership change.
- `/ru/blog/razmer-karuseli-v-instagram`: size/format owner; no rewrite or ownership change.
- Orqestra, production, deployment, indexing/recrawl controls, and analytics infrastructure.

## Measurement status

`MEASUREMENT GAP`: GTM, GA4, and Yandex Metrica are present globally, and registry SEO CTAs can emit `seo_*` events. The two legacy RU money pages use direct app-navigation handlers; no universal event covering every app CTA on those pages is present. A separate change should measure `organic landing → app CTA click` without coupling that subsystem to this ownership remediation.

## Verification

- Source lock: remote `main` was rechecked at `4ca1e21edfba8c113b61b6a8622da9aada063962` before implementation. Orqestra PR #156 is merged and its canonical freeze resolves to the same SHA.
- `npm run build`: PASS; Vite production build completed and prerendered 200/200 routes.
- `npm run check:seo`: PASS.
- `npm run check:blog:internal-link-flow`: PASS with 81 pre-existing repository warnings.
- `npm run check:blog:product-led-links`: PASS.
- `npm run check:blog:cluster-map`: PASS with 12 pre-existing repository warnings.
- `npm run check:seo-route-intent`: PASS with existing cross-route review warnings.
- `npm run check:blog:render-only`: PASS; 148 rendered article files checked, with two unrelated pre-existing description warnings.
- Ownership guardrail `npm run check:blog:product-links`: the changed branch and clean base both report the same 31 unrelated legacy failures; the four new ownership assertions pass and introduce no delta.
- `npm run lint`: the changed branch and clean base both report the same 64 errors and one warning; no lint delta was introduced.
- Full `check:blog:prepublish` remains blocked by repository baseline product-positioning errors. Before commit, its changed-file strict mode also treats the two legacy articles as new-contract migrations; this PR deliberately does not invent missing demand metadata. Focused frontmatter, ownership, render, link, and SEO checks pass.
- Rendered contracts: every target has an exact self-canonical, an indexable robots state, one intended H1, and the expected owner link. The four final CTA destinations resolve to their assigned money page.
- Local preview: all six target URLs returned HTTP 200. Desktop checks at 1440 px and mobile check at 390 px showed no horizontal overflow or broken hero layout.
- Source/dist parity: all HTML entry points reference the existing new bundle, and neither removed bundle remains referenced.
- `git diff --check` for source, report, checks, and HTML: PASS. The generated JS asset is excluded because existing markdown template literals preserve intentional trailing spaces inside content strings.

## Risks

- Shared money-page rendering means route-specific text must be verified on both URLs after prerendering.
- Article footer/navigation may legitimately contain other product routes; ownership checks must target editorial creation bridges rather than ban unrelated navigation site-wide.
- Repository-wide lint, product-link, and product-positioning debt remains open and was not expanded into this bounded remediation.
- Ranking recovery is not immediate and cannot be inferred from build success.

## Post-deploy verification plan

No deployment or recrawl submission is part of this PR.

- Day 7: confirm both money pages remain indexed with the intended canonical and inspect Yandex relevant URLs for the tracked generic and Instagram query families.
- Day 14: compare position distribution, impressions, clicks, and selected landing URLs against the pre-change Topvisor/Webmaster baseline; review CTA click coverage if measurement has been added separately.
- Day 28: evaluate median/mean rank, query-level recovery, relevant-URL stability, organic landing sessions, and landing-to-app CTA rate. Investigate further only where the intended owner is still not selected.
