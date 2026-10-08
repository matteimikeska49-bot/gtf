# Publication and freshness dates — bounded technical intervention (2026-10-08)

Base: `aee620f4bdcd0917662045665dd07ba1edb86048` (current GitHub main including merged PRs #12–17; operational approved/deployed/resolved source independently matched before implementation). No Orqestra changes, source transition, paid calls, merge or deploy.

## Findings and scope

- 148 indexable Markdown articles and 23 indexable SEO registry pages inspected through the runtime/build date paths. All 148 Article schemas previously omitted dates.
- 57 articles had a newer declared updatedAt hidden by an older lastReviewed. 77 RU articles with lastReviewed rendered the misleading block heading “Последнее обновление” for a review.
- Three updatedAt values were month-only `2026-06`; the browser padded a day while sitemap silently fell back to a legacy authoring date. Five articles had no updatedAt and sitemap instead used review/createdAt.
- SEO registry lastUpdated values are full dates. Non-blog SEO schema types remain unchanged; the WebPage node now receives the same declared modification as sitemap. No Article schema is introduced for SEO pages.
- Only three article metadata values are changed. All 156 Markdown source bodies and all non-date frontmatter fields remain unchanged; route/cluster/intent/owner maps and robots sources are unchanged.
- Existing full dates in other article/SEO declarations are retained as project editorial metadata. This pass does not turn each historical commit, link edit, review or build into an automatic update date, and does not claim independently verified deployment dates for every historical article.

## Authoritative event contract

One pure shared helper, `src/utils/contentDates.js`, supplies runtime and build:

- `publishedAt`: only an evidenced first-publication date. Legacy `createdAt` and `date` remain authoring/import metadata; they do not establish publication.
- `updatedAt`: declared substantive editorial modification. Review never overrides it, whether older or newer.
- `lastReviewed`: separate review event, labelled “Редакционная проверка” / “Last reviewed”, never “last updated”.
- Full calendar dates and timezone-bearing ISO timestamps are normalized without calendar rollover. Month-only values remain unknown, not the first day of a month.
- HTML displays the known events separately with exact `time[datetime]` values. A date alone does not claim that the entire article is currently accurate.
- Article datePublished/dateModified use only their matching event. Sitemap uses the same modified event, then confirmed publication; if neither is known, only lastmod is omitted, not the URL.
- No today/build-time/file-mtime default or Git-derived automatic date.
- `npm run check:seo:dates` is mandatory in postbuild. Twelve regression tests plus an independent semantic-field → rendered HTML / every matching JSON-LD node / sitemap validator cover all 171 applicable indexable pages. Mutation fixtures prove wrong review priority, stale datetime, invented publication and conflicting lastmod fail.

This follows [publication-date semantics](https://developers.google.com/search/docs/appearance/publication-dates) and [significant-change lastmod guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap); it does not promise ranking recovery.

## Two protected RU corrections — BEFORE → AFTER

| Route | Source update | Visible event | Sitemap / Article dateModified |
| --- | --- | --- | --- |
| `/ru/blog/luchshie-ai-generatory-karuselej` | `2026-06` → `2026-06-11` | imprecise June 2026 → Updated 11 June 2026 | `2024-03-22` / absent → `2026-06-11` / `2026-06-11` |
| `/ru/blog/kak-vylozhit-karusel-v-instagram` | `2026-06-21` → `2026-06-24` | review-only 21 June → Updated 24 June + Editorial review 21 June | `2026-06-21` / absent → `2026-06-24` / `2026-06-24` |

Evidence: `54c526bcd1fe8a12a7ef058cd7ad76703d617b1e` adds the overview's substantive Quick Answer on 11 June. Later CTA/link/layout/footnote edits do not auto-advance it. For the posting guide, `e99fbb250903309f617d992d722a8fdcce7845ab` rewrites the instruction and practical advice on 24 June; `20df32cc342cc305f8d17170c0ef5c0bc1045f63` corrects reader-facing language that same day. October ownership/link edits are not used as update evidence. Historical sitemap values 14 May / 29 July were not authoritative editorial event records and are not mechanically restored.

Additional confirmed partial-date repair: `/blog/ai-instagram-carousel-generator` updatedAt `2026-06` → `2026-06-11`. Commit `28ad86b0ad9f37c5985244b6be4490e3fbbfebf9` introduces its substantive four-item Quick Answer on 11 June. Subsequent single-phrase/CTA or rendering changes do not auto-advance the date. This follows the same content-evidence rule as the RU overview; source copy/links remain unchanged.

## Remaining evidence gaps

No current article declares publishedAt. Repository authoring/import metadata, published=true, first committed dist or a commit called “Publish” do not alone prove the exact first live-publication day. Thus all 148 datePublished values remain absent rather than inventing dates. Future confirmed publication input is supported and tested.

Six modification dates remain unknown; their lastmod/dateModified are omitted:

- `/blog/ai-carousel-generator`: no updatedAt.
- `/blog/ai-content-creation`, `/blog/ai-content-writing`: review only, not a declared substantive modification.
- `/ru/blog/idei-karuselej-linkedin`: `2026-06`; no day invented for the legacy month.
- `/ru/blog/gde-delat-posty-karuseli-s-ii`, `/ru/blog/kakoy-ii-sozdast-post-karusel`: review only.

The remaining month-only source value is preserved as uncertainty, not published as a full date. Known review events remain visible. Owner/editor evidence of actual publication or a substantive update may fill these cases later; no mass historical-date replacement is performed.

## RU carousel measurement intervention register

This is a new technical intervention, separate from PRs #12–17. Record its eventual merge/deploy time independently before interpreting the 14–21 October measurement. None is deployed by this task.

All 47 current project-declared RU carousel supporting articles are listed below so display changes cannot be silently attributed to the earlier experiment. Before shows the selected hero/freshness event; after shows separate events (ISO timestamps reduce to their declared calendar day). RU review block heading changes to “Редакционная проверка”; formatting now includes day. All Article nodes gain valid declared dateModified where available; no datePublished is invented.

| Protected article | Display BEFORE → AFTER | lastmod BEFORE → AFTER |
| --- | --- | --- |
| `/ru/blog/algoritm-instagram-karuseli` | review 2026-07-04 → update 2026-10-06; review 2026-07-04 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/analiz-kontenta-konkurentov-v-socsetyah` | review 2026-08-13 → update 2026-10-06; review 2026-08-13 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/animaciya-v-karuselyah-instagram` | review 2026-06-13 → update 2026-10-06; review 2026-06-13 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/avtovoronka-v-instagram-cherez-karuseli` | review 2026-06-13 → update 2026-10-06; review 2026-06-13 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/besshovnaya-karusel-v-instagram` | review 2026-06-09 → update 2026-10-06; review 2026-06-09 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/chitabelnost-teksta-v-karuselyah` | review 2026-07-04 → update 2026-10-06; review 2026-07-04 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/chto-takoe-karusel-v-instagram` | update 2026-10-06 → update 2026-10-06 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/cta-dlya-karuseley-instagram-s-ii` | review 2026-06-18 → update 2026-10-06; review 2026-06-18 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/gde-delat-posty-karuseli-s-ii` | review 2026-07-05 → review 2026-07-05 | 2026-07-05 → omitted |
| `/ru/blog/gorizontalnye-i-vertikalnye-foto-v-karuseli` | review 2026-07-04 → update 2026-10-06; review 2026-07-04 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/huki-dlya-karuseli-instagram` | review 2026-06-20 → update 2026-10-06; review 2026-06-20 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/idei-dlya-karuseli-instagram` | review 2026-06-03 → update 2026-10-06; review 2026-06-03 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/ii-dlya-karuseley` | review 2026-06-09 → update 2026-06-09; review 2026-06-09 | 2026-06-09 → 2026-06-09 |
| `/ru/blog/infografika-dlya-socsetey` | review 2026-08-13 → update 2026-10-06; review 2026-08-13 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/kak-ispolzovat-midjourney-dlya-postov` | review 2026-07-05 → update 2026-10-06; review 2026-07-05 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/kak-narezat-foto-dlya-karuseli` | review 2026-07-04 → update 2026-10-06; review 2026-07-04 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/kak-oformit-keys-v-instagram` | update 2026-10-06 → update 2026-10-06 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/kak-povisit-ohvaty-v-instagram-s-pomoshyu-karuseley` | update 2026-10-06 → update 2026-10-06 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/kak-pridumat-temu-dlya-karuseli-s-ii` | review 2026-06-18 → update 2026-10-06; review 2026-06-18 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/kak-sdelat-karusel-dlya-instagram-s-ii` | review 2026-06-20 → update 2026-10-06; review 2026-06-20 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/kak-sdelat-karusel-iz-video-s-ii` | review 2026-06-17 → update 2026-10-06; review 2026-06-17 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/kak-sozdat-karusel-s-chatgpt` | review 2026-07-05 → update 2026-10-06; review 2026-07-05 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/kak-uvelichit-sohraneniya-karuseley` | review 2026-06-18 → update 2026-10-06; review 2026-06-18 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/kakoy-ii-sozdast-post-karusel` | review 2026-07-05 → review 2026-07-05 | 2026-07-05 → omitted |
| `/ru/blog/karusel-dlya-instagram` | review 2026-06-09 → update 2026-10-06; review 2026-06-09 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/karusel-dlya-lichnogo-brenda-s-ii` | review 2026-06-18 → update 2026-10-06; review 2026-06-18 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/karusel-dlya-otzyvov-s-ii` | review 2026-06-18 → update 2026-10-06; review 2026-06-18 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/karusel-dlya-zapuska-produkta-s-ii` | review 2026-06-18 → update 2026-10-06; review 2026-06-18 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/karusel-ili-setka-v-instagram` | review 2026-07-04 → update 2026-10-06; review 2026-07-04 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/karuseli-dlya-ekspertov-s-ii` | review 2026-06-18 → update 2026-10-06; review 2026-06-18 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/karuseli-dlya-onlayn-shkol-s-ii` | review 2026-06-18 → update 2026-10-06; review 2026-06-18 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/karuseli-dlya-smm-agentstva-s-ii` | review 2026-06-17 → update 2026-10-06; review 2026-06-17 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/konstruktor-karuseley-onlayn` | review 2026-07-04 → update 2026-10-06; review 2026-07-04 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/massovoe-sozdanie-karuseley-s-ii` | review 2026-07-05 → update 2026-10-06; review 2026-07-05 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/mnogostranichnye-karuseli-prezentacii` | review 2026-07-04 → update 2026-10-06; review 2026-07-04 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/oblozhka-dlya-karuseli-instagram` | update 2026-10-06 → update 2026-10-06 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/oshibki-v-karuselyah-instagram` | update 2026-10-06 → update 2026-10-06 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/pererabotka-kontenta-dlya-socsetey` | review 2026-08-13 → update 2026-10-06; review 2026-08-13 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/pochemu-instagram-obrezaet-foto-v-karuseli` | review 2026-07-04 → update 2026-10-06; review 2026-07-04 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/primery-karuseley-instagram` | review 2026-06-03 → update 2026-10-06; review 2026-06-03 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/prompty-dlya-karuseley-v-instagram` | review 2026-06-03 → update 2026-10-06; review 2026-06-03 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/psihologiya-karuseley-kak-uderzhat-vnimanie` | review 2026-06-18 → update 2026-10-06; review 2026-06-18 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/razmer-karuseli-v-instagram` | review 2026-07-04 → update 2026-10-06; review 2026-07-04 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/reels-ili-karuseli-chto-vybrat` | review 2026-06-13 → update 2026-10-06; review 2026-06-13 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/shablony-karuseley-v-instagram` | review 2026-07-04 → update 2026-10-06; review 2026-07-04 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/tekst-v-karusel-neyroset` | update 2026-10-06 → update 2026-10-06 | 2026-10-06 → 2026-10-06 |
| `/ru/blog/trendovye-shrifty-dlya-karuseley` | review 2026-06-13 → update 2026-10-06; review 2026-06-13 | 2026-10-06 → 2026-10-06 |

The two principal routes above are additionally protected even if not in the 47-role cluster projection. Protected product owners `/ru/ii-generator-karuseley` and `/ru/generator-karuselej-instagram` keep titles/H1/body/CTA/canonical/robots and ownership; their registry/static dates do not change. Rendering/build references and date-only markup are expected derived changes. No keyword/ranking pass or carousel remediation is performed.

## Verification

- Date regressions 12/12; existing cluster/stage2 unit tests 8/8.
- Production build/prerender 204/204; source/render/schema/sitemap date parity 148 Article + 23 SEO WebPage nodes; 142 valid declared Article modification dates, 6 omitted.
- Project SEO state, manifest deterministic/current, indexation regression: 195/195 sitemap parity, noindex hits 0, redirect hits 0, 204 unchanged indexation dispositions.
- Existing intent ownership, cluster map, internal-link flow, Product Truth/factual/crawl hygiene checks pass with existing warnings. Crawl hygiene verifies 47 protected ownership/CTA pages and the three changed articles' duplicate frontmatter keys.
- All article bodies/non-date frontmatter unchanged. Rendered title/H1/H2, description, canonical, hreflang and robots unchanged across 204 routes; blog-hub card ordering may change from the two corrected updatedAt values (same heading set/URL set). One regenerated article no longer captures the transient CookieBanner duplicate privacy-policy link; its page/content links are unchanged.
- Blog schema/metadata/render checks pass with existing warnings for draft HTML and metadata lengths.
- Canonical blog release: initial source-only pass was 7/9; final run with Owner-required tracked dist is 6/9, NOT aggregate PASS. Two content failures reproduce exactly on clean base with the same three-article scope: quality claim `идеально` in unchanged `pererabotka-kontenta-dlya-socsetey.md`; existing three-item Quick Answer in `luchshie-ai-generatory-karuselej.md`. The third failure is the existing source-only task-scope guard rejecting required generated dist (explained below). No unrelated content repair or assertion weakening.
- Focused ESLint: new date helper and newly changed edges clean; four unchanged unused-variable errors in the shared template/schema helper reproduce on base (base has an additional now-removed unused catch binding). No new lint regression.
- Full `npm run lint`: 63 errors / 1 warning vs clean base 64 errors / 1 warning. Multiset comparison by file, rule and message gives zero new violations; removed unused catch binding accounts for the one improvement. Full lint is baseline FAIL, not aggregate PASS.
- Targeted `check:blog:template-contract` also retains the same three legacy required-field errors, reproduced verbatim with the same three-article scope on clean base; they are not date regressions. No contract is relaxed.
- Existing source-only task-scope guard passes before generated build. It forbids tracked dist whereas this Owner task explicitly requires committed production dist; it is not weakened. Generated dist is checked separately for parity.
- Full SEO release uses its existing independent temporary build for dist-sync, not self-comparison. Lighthouse/performance unavailable locally remains the existing explicit warning, not a measured PASS.
- Local preview: `http://127.0.0.1:62572/`; actual DOM dates and Article schema inspected on the two RU routes and an EN route. RU date badges also checked at 393×852 with no horizontal overflow; original viewport restored. No runtime date disagreement.

Generated production artifacts include article date markup/schema, SEO WebPage modification schema, derived hub-card dates, shared bundle references and sitemap date corrections/omissions. Sitemap locations/lifecycle and Orqestra manifest remain unchanged. No merge/deploy/source transition/CI polling. See PR for exact changed-file list and build marker; its pre-commit build SHA is not exact deployment evidence.

## Changed source files (19) and generated output

- Shared date/schema runtime: `src/utils/contentDates.js`, `src/utils/schemaGenerator.js`.
- Consumers: `src/components/blog/templates/MarkdownSeoArticleTemplateV2.jsx`, `src/components/blog/MarkdownBlogArticlePage.jsx`, `src/components/blog/BlogHubLayout.jsx`, `src/components/RouteSchemaInjector.jsx`, `src/components/seo/SeoPageSEOHead.jsx`.
- Article metadata only: `src/content/blog/articles/luchshie-ai-generatory-karuselej.md`, `src/content/blog/articles/kak-vylozhit-karusel-v-instagram.md`, `src/content/blog/articles/ai-instagram-carousel-generator.md`.
- Build/state/checks: `scripts/lib/project-seo-state.mjs`, `scripts/check-project-seo-state.mjs`, `scripts/check-blog-rendered-html.mjs`, `scripts/check-content-dates.mjs`, `scripts/tests/content-dates.test.mjs`, `package.json`.
- Active documentation: `docs/blog-production-system.md`, `docs/seo-article-template-v2.md`, this maintenance report.
- Generated: committed `dist/` HTML, assets, sitemap and build marker. `.orqestra/project-seo-state.json`, robots, nginx, route/owner/intent/cluster source remain byte-identical.
