# RU carousel / factual / crawl hygiene corrective batch

Date: 2026-10-06. Base: `b609239ec95e93b1c4d2139cec4728585a9a6a7e`.
Remote GoToFlow main and Orqestra approved/deployed/resolved source matched this base before implementation. This is bounded maintenance, not a new ranking audit or source transition.

## Ownership and runtime fixes

- Checked 47 current indexable RU carousel cluster pages: 27 Instagram-specific and 20 generic/cross-platform. The separate publishing guide's existing Instagram bridge is retained.
- Changed 46 existing Markdown articles; no new articles or indexable routes. Informational title, slug, searchIntent, canonical, hreflang and lifecycle are unchanged. Existing `updatedAt` fields record this maintenance; sitemap dates continue to come from declared project metadata.
- Instagram commercial bridges now use `/ru/generator-karuselej-instagram`, including the incorrect post-generator CTA in `kak-sdelat-karusel-dlya-instagram-s-ii` and contextual/Explore links across the supporting layer.
- Generic bridges use `/ru/ii-generator-karuseley`, including the incorrect/missing final CTA destinations in `gde-delat-posty-karuseli-s-ii`, `massovoe-sozdanie-karuseley-s-ii`, and `mnogostranichnye-karuseli-prezentacii`.
- Runtime `FinalCta` reads **primaryHref**, not `href`/`buttonHref`. Set the real field in current carousel frontmatter instead of changing the shared renderer or unrelated articles.
- Reconciled the existing cluster/intent/topic declarations. The Instagram saves and CTA articles join the existing Instagram cluster; the cross-platform presentation article joins the existing generic cluster. Corrected the text-to-carousel map's historical `/blog/` namespace typo to its already-existing `/ru/blog/` URL; no URL migration occurred.
- The historical `kak-napisat-tekst-dlya-karuseli-s-ii` draft/noindex article remains unchanged. Validators use actual resolved lifecycle rather than a stale cluster role status to select current rendered pages.
- Link validators now consult existing resolved Project SEO State instead of an incomplete static route list/JSX-only scan. New independent source/render guardrails cover the whole current RU carousel cluster layer.

## Confirmed factual corrections

- `karusel-dlya-instagram`: corrected three Instagram technical-limit statements to up to 20 photos/videos, with account/region availability caveat. Kept GoToFlow's confirmed product limit at 10. Ten-slide examples and recommendations are not mechanically converted.
- `commercialBatchSpecs.js`: the LinkedIn FAQ now identifies `/linkedin-post-generator` as current and `/ai-linkedin-post-generator` as its legacy redirect. Redirect implementation is untouched.
- `animaciya-v-karuselyah-instagram`: animated/seamless modes are live according to current Product Truth, not roadmap.
- The Instagram AI how-to and presentation adaptation article now distinguish manually copied PDF text from unsupported direct PDF source upload. PDF export remains supported and unchanged.
- An old “10 is the Instagram limit” sentence in a historical planning handoff is not imported into runtime; no historical plan is rewritten.

## Query policy and discovery sources

Official syntax reference: [Yandex Clean-param](https://yandex.ru/support/webmaster/ru/robot-workings/clean-param).

Three explicit rules in the existing Yandex group; no wildcard parameter names, blanket cleanup, new disallow or URL-specific redirects:

1. Sitewide attribution: `ref`, `partner`, `referral`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `utm_id`, `yclid`, `gclid`, `fbclid`, `_openstat`. These do not select landing-page SEO content. Ref storage and app attribution are preserved.
2. Sitewide observed debug/security residue: `_ym_debug`, `need_sec_link`, `sec_link_scene`. No production content selector consumes them.
3. Observed payment-return names, scoped to `/ru`: `OutSum`, `InvId`, `SignatureValue`, `IsTest`, `Culture`, `Shp_intent_id`, `Shp_product_code`, `Shp_provider`, `Shp_purchase_type`. These are crawler document normalization only, not browser/callback mutation. Names were obtained from existing authorized indexing evidence without publishing sensitive query values.

`lang` is deliberately excluded: nginx consumes it for language preference. Neither browser query propagation nor referral/payment code is changed; a regression fixture proves those values still reach the app.

| Observed family | Current discovery finding |
| --- | --- |
| `ref=test123`, `ref=partner_test` | NOT PRESENT IN CURRENT CODE / HISTORICAL-EXTERNAL: no hardcoded source/production HTML navigation targets. Attribution code can preserve externally supplied ref values; it does not seed these values. |
| `need_sec_link`, `sec_link_scene` | NOT PRESENT IN CURRENT CODE / HISTORICAL-EXTERNAL as navigation targets; incoming residue is normalized for Yandex. |
| `OutSum`, `InvId`, `Shp_*` | NOT PRESENT IN CURRENT CODE / HISTORICAL-EXTERNAL as landing navigation targets; the landing repository is not the payment processor. Incoming parameters remain preserved. |
| `NOCLICK_` | NOT PRESENT IN CURRENT CODE / HISTORICAL-EXTERNAL; HTTP 404 verified. |
| `/api/health` | NOT PRESENT IN CURRENT CODE / HISTORICAL-EXTERNAL as SEO/navigation target; HTTP 404 verified. |
| `\|` / `%7C` path | NOT PRESENT IN CURRENT CODE / HISTORICAL-EXTERNAL; observed malformed path returns HTTP 404. |
| old `10-best-instagram-carousel-examples-to-inspire…` slug family | NOT PRESENT IN CURRENT CODE / HISTORICAL-EXTERNAL; representative nonexistent path returns HTTP 404. |

No real current static discovery source was found to remove; no invented junk redirect was added. These classifications do not prove the original external sender. Regression fixtures contain dummy examples deliberately, but scripts are not bundled into the production app. Existing noindex test-preview routes stay excluded from sitemap and current page navigation.

## Metrika and HTTP behavior

`index.html` sends `location.href` to Metrika. Existing authorized Webmaster integration read surfaces do not expose the crawl-by-counter toggle, so its enabled state and causal attribution are **not confirmed**.

**OWNER UI CHECK REQUIRED**: Yandex Webmaster → GoToFlow site → **Индексирование → Обход по счетчикам**. Inspect the counter toggle and **Примеры страниц**. [Official instructions](https://yandex.ru/support/webmaster/ru/indexing-options/link-metrica).

No UI automation, credential changes or counter setting mutations were performed.

Read-only live HTTP checks confirmed both money pages 200/self-canonical; legacy LinkedIn 301 to current owner; photo use-case 200 with `noindex, nofollow`; NOCLICK_, health, malformed pipe, old/nonexistent probes 404.

Unknown paths retain HTTP 404 even though the fallback body inherits homepage `index, follow` and homepage canonical. They do not emit a self-canonical unknown document. `try_files ... =404` and `error_page 404 /index.html` are unchanged and protected by negative fixtures; no `=200` fallback is introduced. A local Docker image fetch was unavailable and its test client was stopped; no test container or production deployment was created.

## Verification

- Production build: PASS, 204 prerender routes.
- Resolved state / manifest stale check: PASS; 211 routes; manifest regenerated deterministically and remains unchanged because route/file identity and indexation are unchanged.
- Sitemap parity: 195/195; noindex hits 0; redirect hits 0. Only declared maintenance lastmods change.
- Rendered lifecycle/canonical/hreflang: 204/204 PASS.
- Base-to-head indexation: 204 existing rendered routes unchanged; unintended transitions 0.
- Crawl/navigation and rendered commercial ownership: 5,510 anchors, 47 current carousel pages, errors 0.
- SEO fixtures: 48/48 PASS, including wrong owner, inert href-only CTA, map drift, non-content-only Clean-param, junk targets, preservation of attribution/payment, 404 status and draft lifecycle cases.
- Blog links, strict product-led links, internal link flow, intent ownership, cluster map, product claims, rendered HTML and schema: PASS (existing legacy warnings remain).
- Source robots equals generated robots: PASS.
- Changed JavaScript ESLint / syntax checks and `git diff --check`: PASS.
- Full `check:seo:release` / independent fresh-dist comparison: PASS. The initial sandbox bind error was resolved by allowing the same existing local preview verification command, without changing assertions. Lighthouse/PageSpeed is unavailable locally: performance was not measured; no scores or performance improvement are claimed.

Known unrelated baseline: the global `check:blog:product-links` reports six unchanged errors in four untouched articles: `b2b-case-study-linkedin-carousel`, `generator-vizualnyh-postov-ai`, `kak-sostavit-kontent-plan-s-pomoshyu-chatgpt`, `neyroset-dlya-postov`. Clean approved base reports nine; this batch fixes the three carousel-related errors and introduces none. No test/assertion is disabled to hide the remaining debt. Whole current carousel ownership is separately enforced in `check:seo:crawl-hygiene` and the global checker.

Money-page H1/title and shared rendering code are unchanged. Orqestra, nginx, workflow configuration, referral/Metrika runtime, paid providers, migrations, source transitions and production deployment are outside the diff. The dirty legacy GoToFlow checkout was not touched.
