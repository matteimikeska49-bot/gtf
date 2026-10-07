# Stage 2 — bounded ownership / link / source-truth repair

Base: `db60132fe8f7d824a40e95b65937ee40d1926496` (remote main and Orqestra operational approved/deployed/resolved source independently matched before work). No production mutation or source transition in this batch.

## Ownership decisions

- `/linkedin-post-generator` retains singular commercial text-post intent. `/blog/ai-linkedin-post-generator` remains indexable, self-canonical, and now owns `best ai linkedin post generators` / informational tool comparison. Its primary/target keyword, comparison intent ID, product relation, CTA and workflow links agree.
- Minimal LinkedIn split: move only that existing article from `en:linkedin-carousel` into one comparison-hub record, `en:linkedin-post-generator`. No new URL, support migration, or backlog creation. Other LinkedIn carousel members remain in their cluster. The article directs ordinary text posts to `/linkedin-post-generator` and document carousels to `/linkedin-carousel-maker`.
- `/ai-instagram-post-generator` retains singular commercial intent. Its existing blog article owns the plural comparison query; only keyword/intent/differentiation metadata changes. Its body, canonical and product link remain unchanged.
- `keywordRecord`, `topicScoreId` and historical demand/score values retain their original evidence identities; they are not claims of new measured plural-query demand or intent ownership. No keyword/ranking audit performed.
- LinkedIn comparison removes unsupported platform-performance/ranking promises and the obsolete Taplio-no-PDF assertion. Taplio's own [post-writing page](https://taplio.com/create-linkedin-post-with-ai) and [carousel/PDF page](https://taplio.com/linkedin-carousel-generator) were checked on 2026-10-07. No fabricated product limits, PDF extraction guarantees or auto-publishing claims added.

## Exact rendered-link baseline

Eight requested clusters only. Published/indexable members are resolved from project state, not stale map status labels. Destination matching is exact (not slug substring matching); draft/noindex articles do not inflate coverage.

Before ownership split: **22 missing declared hub links**, comprising **16 mandatory `mustLinkToHub=true`** plus **6 advisory declared-hub omissions**. `ru:social-content` has no explicit `mustLinkToHub` rule and `ru:vk-content` has it set to false; they are not misreported as mandatory violations and their rules are not changed.

Exact BEFORE set (article slugs; EN uses `/blog/`, RU uses `/ru/blog/`):

| Cluster | Missing source articles | Correct hub |
| --- | --- | --- |
| en:linkedin-carousel | linkedin-carousel-from-pdf-ai; ai-linkedin-post-generator; how-to-post-a-carousel-on-linkedin; ai-linkedin-carousel-strategy-for-b2b-founders; how-to-schedule-linkedin-carousel | /blog/how-to-make-linkedin-carousel-with-ai |
| en:ai-carousel-generator | content-calendar-to-carousel; ai-carousel-content-strategy; ai-carousel-workflow; how-to-brainstorm-carousel-topics-with-ai; how-to-repurpose-podcasts-into-ai-carousels; turn-video-into-carousel-with-ai | /blog/text-to-carousel-ai |
| en:instagram-carousel | instagram-carousel-hooks; instagram-post-size-guide | /blog/how-to-make-an-instagram-carousel-with-ai |
| en:instagram-post-generator | instagram-carousel-post | /blog/ai-instagram-post-generator |
| en:ai-content-workflow | ai-facebook-post-generator | /blog/ai-content-creation |
| ru:telegram-content | struktura-prodayuschego-posta-v-telegram | /ru/blog/kak-vesti-telegram-kanal-biznesu |
| ru:social-content (advisory) | ii-post-dlya-socsetej; generator-vizualnyh-postov-ai | /ru/blog/neyroset-dlya-postov |
| ru:vk-content (advisory) | razmer-foto-dlya-posta-vk-formaty; krasivye-posty-dlya-vk-oformlenie; generator-karuseley-dlya-vk; pervyy-post-vkontakte-s-ii | /ru/blog/neyroset-dlya-postov |

After reassignment, before adding links: **21 missing**, including **15 mandatory**, across **33 indexable supporting/non-hub members**. The comparison article becomes its own hub, not an artificially linked carousel supporting page. The 21 fixes are individual contextual editorial sentences in the relevant existing sections. Existing product links remain.

`scripts/check-blog-cluster-rendered-links.mjs` requires explicit cluster scope. Default checks only explicit mandatory rules; `--declared-hubs` also checks advisory declared hubs without inventing mandatory rules. Regression fixtures reject product-only, near-match, external-origin, missing-artifact and nonindexable-hub substitutions.

## Source-truth corrections

- RU B2B map URL: `/blog/b2b-keysy-v-linkedin-karusel` → `/ru/blog/b2b-keysy-v-linkedin-karusel` in cluster + intent maps. Related product: `/linkedin-carousel-maker` → `/ru/generator-karuselej-linkedin`.
- VK size article intent product: `/ru/generator-kontenta` → `/ru/vk-post-generator`.
- Add missing frontmatter relations: `ai-facebook-post-generator` → `/ai-content-generator`; `how-to-schedule-linkedin-carousel` → `/linkedin-carousel-maker`.
- Existing LinkedIn strategy article's frontmatter hub incorrectly named `text-to-carousel-ai` despite `en:linkedin-carousel`; align it to `how-to-make-linkedin-carousel-with-ai` and its new contextual link.
- Publishing/content-template link validators read the existing resolved project state instead of a stale hardcoded allowlist / App-only route inventory. No new route registry, URL→file map, or route-specific exception.
- Frontmatter ownership-only exemption requires an actual edit: an explicitly scoped unchanged article is not an ownership edit. This strengthens, not bypasses, clean-base validation.
- Actual edits receive one current `updatedAt`; sitemap lastmod is generated from existing rules. No lifecycle change is intended.
- Remove the pre-existing second `updatedAt` in the changed Telegram article: it overwrote the maintenance date. Keep one authoritative `2026-10-07` value; the existing changed-article raw-frontmatter crawl guard remains unchanged.

## Verification and limits

Legacy editorial/content findings are reproduced against the clean approved base with the same explicit 23-article scope. When a validator changes, execute that validator against unchanged approved-base files. No synthetic article edits, stale exemptions or unrelated article expansion are used to obtain a baseline.

| Check | Current / approved-base result | Classification |
| --- | --- | --- |
| Editorial/product QA | FAIL: same Canva-section P0 in the unchanged Instagram comparison body, using explicit article path arguments in both runs | Pre-existing baseline |
| Quality contract | FAIL: same `идеально` finding in `pererabotka-kontenta-dlya-socsetey` | Pre-existing baseline; unrelated source untouched |
| Product positioning | FAIL: same 5 exact rule/path/line/message findings in unrelated shared components | Pre-existing baseline |
| Publishing | FAIL: 36 / 36 identical P0 findings with the resolved-inventory validator | Pre-existing legacy metadata/mockup/link debt |
| Strict frontmatter | FAIL: same 5 articles lack legacy contract fields; two product relations repaired | Pre-existing baseline; strict scope applied on clean inputs |
| Content/template | FAIL: 25 current vs 26 base findings; remaining rules/paths existed before, observed body-character counts improve | Pre-existing editorial/metadata debt, not a new regression |

The aggregate blog release is **not reported PASS**. Source-only task scope passed before generation; that checker forbids tracked dist, whereas the approved build/deployment contract and this task require committed dist. No scope guard is weakened to hide this conflict. Generated output is separately checked for semantic/lifecycle parity. These baseline findings remain visible for Owner review; this PR does not declare the whole historical corpus publication-ready.

Focused tests: 8/8 PASS. Focused ESLint PASS. Intent ownership, cluster map, internal-link flow, product claims, keywords, FAQ/CTA, brief alignment, product-led links, mockup relevance, template references, draft safety, topic score, topic/demand and current-scope cannibalization/batch workflow checks PASS (existing warnings retained).

## Final generated-artifact verification

- Production `check:blog:build-render`: PASS, 204 prerender routes, 153 blog mappings (148 published, 5 draft).
- `check:seo:release`: PASS, including 55/55 existing negative/positive fixtures, crawl/ownership/factual guards, cross-system Product Truth, shared layout and rendered SEO-page contracts. Dist-sync uses its existing `SEO_DIST_SYNC_SKIP_BUILD=1` / `SEO_DIST_SYNC_TMP_DIST` inputs pointing to a separately built, freshly prerendered temporary dist from the exact same final source; it does not compare dist to itself. Performance was NOT measured (the existing gate explicitly warns that Lighthouse/PageSpeed is unavailable locally).
- `check:seo-state`, `check:orqestra-seo-manifest`, `check:seo-indexation-regression`, blog SEO metadata/schema/language checks: PASS.
- AFTER: **0 missing / 33 checked** with declared-hub coverage, and **0 mandatory violations / 19 checked** with explicit mandatory rules only. All 21 repairs appear as contextual links in the rendered article body; no product link was removed.
- All 204 rendered routes preserve base canonical and robots disposition. Sitemap locations unchanged: 195/195 eligible parity; noindex hits 0; redirect hits 0; unintended base→head indexation transitions 0. Updated article lastmod follows existing generation rules.
- Orqestra manifest is identical to base: 211 routes; no route-owner, canonical, lifecycle or sitemap-disposition changes. Robots source/dist and nginx redirect/config files unchanged.
- 395 local href occurrences across the 23 changed rendered articles resolve to existing project or runtime routes; broken local hrefs 0. Changed raw frontmatter duplicate top-level keys 0.
- Frozen 48 article sources and four cluster records are byte-identical. All 125 untouched published article HTML files are identical after replacing only shared JS bundle references. The two protected RU product pages retain exact content/SEO markup: their other generated differences are captured animation transforms and the demo progress frame (21% vs 22%), verified token-by-token, not content/ownership changes. No renderer/style/product source changed.
- `git diff --check`: PASS. No paid calls, merge, deploy, source transition or CI polling.

## Verified local preview

Existing `npm run preview -- --host 127.0.0.1 --port 0` reported port **56947**. All **23/23** changed routes return HTTP 200, exact prerender artifact, expected canonical and index/follow, without runtime-error markers. No new route was created. The server is left running for review when the task session remains available.

- [LinkedIn comparison](http://127.0.0.1:56947/blog/ai-linkedin-post-generator/)
- [Instagram comparison](http://127.0.0.1:56947/blog/ai-instagram-post-generator/)
- [AI carousel strategy](http://127.0.0.1:56947/blog/ai-carousel-content-strategy/)
- [AI carousel workflow](http://127.0.0.1:56947/blog/ai-carousel-workflow/)
- [Facebook workflow](http://127.0.0.1:56947/blog/ai-facebook-post-generator/)
- [LinkedIn founder strategy](http://127.0.0.1:56947/blog/ai-linkedin-carousel-strategy-for-b2b-founders/)
- [Content calendar](http://127.0.0.1:56947/blog/content-calendar-to-carousel/)
- [Topic brainstorming](http://127.0.0.1:56947/blog/how-to-brainstorm-carousel-topics-with-ai/)
- [LinkedIn upload](http://127.0.0.1:56947/blog/how-to-post-a-carousel-on-linkedin/)
- [Podcast repurposing](http://127.0.0.1:56947/blog/how-to-repurpose-podcasts-into-ai-carousels/)
- [LinkedIn scheduling](http://127.0.0.1:56947/blog/how-to-schedule-linkedin-carousel/)
- [Instagram hooks](http://127.0.0.1:56947/blog/instagram-carousel-hooks/)
- [Instagram post structure](http://127.0.0.1:56947/blog/instagram-carousel-post/)
- [Instagram dimensions](http://127.0.0.1:56947/blog/instagram-post-size-guide/)
- [LinkedIn PDF](http://127.0.0.1:56947/blog/linkedin-carousel-from-pdf-ai/)
- [Video repurposing](http://127.0.0.1:56947/blog/turn-video-into-carousel-with-ai/)
- [VK carousel](http://127.0.0.1:56947/ru/blog/generator-karuseley-dlya-vk/)
- [Visual AI workflow](http://127.0.0.1:56947/ru/blog/generator-vizualnyh-postov-ai/)
- [Social AI post](http://127.0.0.1:56947/ru/blog/ii-post-dlya-socsetej/)
- [VK presentation](http://127.0.0.1:56947/ru/blog/krasivye-posty-dlya-vk-oformlenie/)
- [First VK post](http://127.0.0.1:56947/ru/blog/pervyy-post-vkontakte-s-ii/)
- [VK dimensions](http://127.0.0.1:56947/ru/blog/razmer-foto-dlya-posta-vk-formaty/)
- [Telegram sales post](http://127.0.0.1:56947/ru/blog/struktura-prodayuschego-posta-v-telegram/)

Excluded: frozen RU Instagram/carousel experiment sources, their owner boundaries/H1/title/core intent; redirects; new routes; historical metrics/approved evidence; Orqestra implementation; production; paid providers; merge/deploy/CI polling. Committed dist is rebuilt as required by the existing deployment contract; common bundle references can change without changing frozen page content.

FOLLOW-UP (not implemented): existing editorial/depth/legacy metadata debt and stale hardcoded product positioning assumptions in unrelated checks; existing hub→supporting omissions and links present only in Explore/sidebar are not this supporting→hub missing-rendered-link batch. Do not create pages from `missingTopics` without new demand proof.

Historical Controlled Wave 1 briefs, batch-25 plan and batch-status entries still contain the old singular query/carousel positioning for these two articles. Their old metrics and verified-publish records are not rewritten as current evidence. Any future regeneration must use the current article/intent/cluster ownership, not that historical brief as-is; broader planning-state cleanup is a separate follow-up.
