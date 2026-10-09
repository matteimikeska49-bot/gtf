# GoToFlow — Final Review Packet / Google Indexation Recovery
Дата исходного batch: 2026-10-09; bounded reconciliation: 2026-10-10. Статус: **REVIEW-ONLY DRAFT / PUBLICATION BLOCKED**.

## 0. Current bounded release-contract reconciliation

Parent `6e4c6f12441f6ca68abc3e869b0a5b18908b3c31`; base/remote main `a8aa8530c2f4e2b684239eb43c5b142ba10c005f`, повторно проверены. Owner разрешил техническое согласование committed dist, evidence false positives, полного PR scope и строгой классификации. Это **не** acceptance editorial debt, не снижение порогов и не HUMAN approval. Все результаты ниже относятся к текущим source/render hashes §8; §9.1 заменён текущим route/rule BEFORE→AFTER comparison. Остальные старые narrative receipts остаются историческими, если прямо не повторены здесь.

- Release scope теперь base→current (committed + staged + unstaged + untracked), **52 статьи** даже после commit. Editorial/mockup active scope и ownership-only/separator comparisons используют тот же immutable base. Неудачный Git resolution блокирует, а не превращается в пустой scope. Все source checks выполняются, последующие ошибки не скрываются за верхнеуровневым `&&`.
- Default scope guard остаётся source-only. Production-artifact mode не является allowlist bypass: он запускает независимый temporary Vite/prerender build, проверяет полный inventory и bytes **299 artifacts / 204 routes**, body/JSON-LD/assets/robots/точный lastmod, запрещает symlinks/extra output и fixture overrides, связывает доказательство с неизменившимся build-input hash. `build.json` отдельно проверяется как timestamp/history marker, **не exact revision evidence**. Нельзя выдать PASS по старой 24-page semantic projection.
- Два E01 false positives устранены только для typed canonical observations в maintenance JSON/technical table cells. Настоящие template assertions и production-source rules не выключены; исходные audit report/manifest byte-identical (hashes ниже).
- `check-release-findings.mjs` сравнивает один strict scope на clean base и current: exact route/rule/source/messages, thresholds и source/checker hashes; lint также связывается с exact offending source line/config hash. Classification никогда не превращает FAIL в PASS. Regression fixtures ловят новые/дублирующиеся findings, ухудшение, смену правил и попытку bypass artifact rebuild.
- Полезные bounded additions: CTA fulfilment/checklist example; engagement measurement checklist; RU offer example без выдуманных результатов; LinkedIn hook→source→slides review; illustrative handoff document sequence. Пять numeric reductions больше не ухудшают прежний floor; **не** объявлены semantic PASS. Одна дополнительная H2 deficiency устранена. Actual modification dates согласованы, lastReviewed не фабриковался. Два новых draft-word positioning flags из предыдущего homepage narrowing убраны нейтральными labels «Rewriting instead of publishing / Переписывание вместо публикации», без возврата timing claims.

| Final check | Result |
| --- | --- |
| Unit/regression | **27/27 PASS**; scope, typed-evidence/cross-line assertion negative cases, numeric/duplicate/rule changes, full body/schema/asset/robots/lastmod tamper, inventory/symlink and fixture-bypass blocking |
| Build / dates / rendered contracts | **PASS**, 204 prerender; source/date/render checks completed on stable sources |
| SEO source / Product Truth / crawl / fixtures | **PASS**, 55/55 fixtures, cross-system contradictions0; crawl checked52 articles for duplicate keys,0 errors |
| Project state / manifest / indexation | **PASS**,211 routes;195/195 sitemap;204/204 rendered lifecycle;noindex/redirect sitemap hits0;unintended base→head disposition transitions0 |
| Frozen / conversion / internal links | **PASS**,50/50 source-byte unchanged;49/49 applicable rendered semantic projections unchanged,1 runtime-only N/A;37/37 direct-app CTA;41 contextual+4 commercial links preserved |
| Content/Template | **BLOCKED:66** vs base77:29 improved-but-failing,37 identical diagnostics,11 resolved.38 body floors+8 H2 floors+20 structural findings. New/worsened current findings0 **under unchanged editorial predicates**, not independent semantic approval |
| Frontmatter | **BLOCKED:36**, exact same diagnostics on strict clean base. Missing genuine governance/research/publish evidence is not fabricated |
| Lint | **BLOCKED:61** vs base63; exact rule/message/offending-source-line/config comparison;2 resolved,0 new. No lint rule disabled |
| Positioning / quality | **BLOCKED:5+1** same base findings; frozen source not rewritten to make validators green |
| Full production-artifact parity | **BLOCKED:21 HTML byte differences**. Independent inventory and other278 artifacts match;20 first-difference contexts show animated styles,1 shows cookie banner presence. These are NOT normalized away and NOT declared harmless/approved. Fixed-clock read-only probes did not establish reproducibility; renderer/runtime unchanged |
| Browser QA | **BLOCKED**, all52 changed articles tested desktop/mobile:52 HTTP200;pageErrors0;layout/language/disclaimer/directive flags0. External Google/Yandex analytics requests fail (`ERR_CONNECTION_CLOSED`); assertions/analytics remain enabled. Source/render hashes and failed URLs are in receipt |
| Homepage producer QA |4 EN/RU desktop/mobile observations:10 non-empty sections each,0 horizontal overflow/empty headings/page exceptions/randomuser. New neutral labels present. Initial image checks included pending/hidden lazy variants; a follow-up decode probe did not complete and was stopped. **No final image-load/independent visual PASS claimed**; supplied screenshots are producer observations only |
| Publication / semantic | **BLOCKED**; exact-artifact independent/HUMAN verdict absent. Automated receipts never supply HUMAN approval |
| Full canonical release | **FAIL:6/10 stage groups PASS**. Blocking:fast source,content/template,lint,full artifact parity. Legacy metadata diagnostic groups2/2 PASS. Performance NOT_MEASURED |

Reproduce: `npm run check:blog:release -- --base-ref a8aa8530c2f4e2b684239eb43c5b142ba10c005f`; `node scripts/check-release-findings.mjs <clean-worktree-at-that-base>`; `BLOG_QA_BASE_URL=http://127.0.0.1:56433 node scripts/check-blog-visual.mjs --pr-scope`. Browser discovery uses resolved routes, so missing frontmatter slug cannot silently omit a changed article. All assertions stay intact.

Current local receipts (ignored, not production source): `tmp/release-findings.json` SHA256 `cb1485e68d6f99d94cc2185e242dfde0f8c96422712cfab392a205af3f51f974`; `tmp/production-artifact-parity.json` SHA256 `7dbaaebe374520da5d52026c65caa3338ee3043da8c4d29ccec15877e95a5f25`; `tmp/blog-visual-qa/report.json` SHA256 `0d2a21547bfe6ed0c9a635d2e20bf0560b9458b05fd0447067aa8a440210a3a3`. They are reproducible diagnostic evidence, not approval records. Original report SHA256 `e4264d1892145bda604a776ae04e0ea2d658e3ad2855bddbf3568a6956339c1b`; original manifest `37f44f12d038afd28dbe9fd75699484a777b40bca78add431f7dcfdcabffed97` unchanged.

Local interrupted attempts on partial dist or broken shared dependencies are NOT final verdicts. The shared symlink was preserved; exact unchanged-lockfile dependencies restored only in this isolated worktree; no package/lock changes or audit-fix performed. npm reported28 vulnerability advisories; their remediation is not claimed here.

**One bounded decision block — no blanket acceptance:** legacy floors/structural/governance debt → commission exact-artifact independent dispositions on §9.1/§9.3 and genuine records (revise genuinely incomplete answers, never pad) → remains blocked until approved corrections/dispositions exist. Non-reproducible capture → require a reproducible complete DOM capture including client UI, or an explicitly reviewed narrow parity policy with negative tests → do not waive21 differences now. Browser/semantic/trust → obtain working-environment resource/visible-image verification and independent exact-hash verdict → no Ready/merge before these and machine gates close. These are unresolved requirements, not new approvals.

Workflows and main/Draft branch rechecked before handoff; no additional feature/PR production trigger found. Production safety relies on Owner-confirmed main-only deployment with previews disabled. **Same Draft PR19 only;Ready=0,Merge=0,Deploy=0,Source transition=0,CI polling=0.** Skill Orqestra SEO informed full artifact binding, frozen invariants and fail-closed publication boundary. No new SEO audit or large separate report.

Final evidence-guard hardening also blocks cross-line JSON assertions (canonical observation plus a separate template/source-of-truth instruction). Focused template checks and27 regression tests were rerun after that hardening. Full build/browser/parity receipts are the preceding stable production-input run snapshots, not a claimed full re-run after this checker-only change; production source/generated artifact bytes did not change. Receipt hashes identify the actual captured runs, not an approval for a later commit.

## 0.1 Historical corrective update at parent6e4 (superseded by §0)

Это bounded correction существующего batch на ветке `codex/google-indexation-quality-recovery`, parent `22fa522d14411ae608750814211103aa91695ab4`. Remote main повторно проверен: `a8aa8530c2f4e2b684239eb43c5b142ba10c005f`. Ни нового аудита, ни нового PR, ни publication approval нет. Owner разрешил только обновление этого review-only Draft.

**Текущий результат определяется §0 и повторно вычисленным inventory §8.** Остальные narrative/check receipts в §1–7 и §9 сохранены как исторический first-handoff snapshot, получивший NEEDS REVISION; их старые числа, copy и browser hashes не выдаются за текущие. В таблице §2 также актуализированы F02/F23. Raw исторические report/manifest сохранены byte-for-byte.

### Исправления

- [ai-carousel-generator.md](../../src/content/blog/articles/ai-carousel-generator.md): восстановлены exact base `articleRole: hub`, `hubSlug: ai-carousel-generator`, `articleType: primary product hub`. Metadata описывает informational hub, а создание остаётся на коммерческом owner. Подтверждённого отдельного решения на supporting transition не найдено; прежняя смена роли отозвана. Canonical, approved route owners и frozen scope не менялись. Существующее несовпадение frontmatter с intent/cluster maps уже есть на base, не исправлялось новым недоказанным решением; PASS этих map checkers не доказывает согласование всех editorial roles.
- [product-capabilities.json](../../src/content/blog/product-capabilities.json): animated/seamless остаются supported согласно существующему Product Truth; `lastVerified` возвращён на `2026-07-11`. Notes прямо отделяют Owner decision от runtime capability test: 9 октября новый тест возможностей не выполнялся.
- [linkedin-document-post-examples.md](../../src/content/blog/articles/linkedin-document-post-examples.md): Quick Answer, FAQ и body согласованы на PDF/PPT/PPTX/DOC/DOCX; добавлена [официальная инструкция LinkedIn](https://www.linkedin.com/help/linkedin/answer/a519831). Пять illustrative formats сохранены, реальные клиентские результаты не придуманы. Raw body 5055, floor8000 и H2 deficit остаются FAIL.
- [facebook-post-ideas-for-small-business.md](../../src/content/blog/articles/facebook-post-ideas-for-small-business.md) и [kak-napisat-post-v-vk-s-pomoshyu-ii.md](../../src/content/blog/articles/kak-napisat-post-v-vk-s-pomoshyu-ii.md): добавлены полезные source→slide sequence→review→export→manual upload примеры, явно illustrative. Убраны выдуманная сумма клиентской экономии, безусловный результат формата и обещание месяца posts в final CTA. Устранены четыре старых practical/carousel-bridge diagnostics, без padding; реальные modification dates обновлены.
- [en.js](../../src/i18n/en.js) / [ru.js](../../src/i18n/ru.js): только active homepage benchmarks «60 seconds/секунд», «10 hours/часов», «5 tools/сервисов» и «3 hours/часа» сужены до проверяемого workflow. Замена сохранена в непустых hero/metrics/CTA blocks; ключи не используются frozen callers. Это не claim-specific подтверждение остальных marketing assertions: growth/instant/one-click framing и происхождение существующих interface screenshots всё ещё требуют независимого review/evidence. Testimonials не включались обратно.
- [HeroSection.jsx](../../src/components/HeroSection.jsx): устранены unused hook и нестабильная effect dependency. [seoPages/index.js](../../src/content/seoPages/index.js): удалён только ранний duplicate `state`, позднее идентичное значение сохранено. Indexation disposition не менялся.

### Текущие проверки и ограничения

| Проверка | Фактический результат |
| --- | --- |
| Финальный production build / render / dates | PASS: 204 prerender; 148 published HTML / 153 blog mappings; date fixtures12/12. Committed generated artifacts обновлены |
| SEO release / independent temporary build parity | PASS exit0; 55/55 fixtures; Product Truth contradictions0; performance NOT_MEASURED, не semantic approval |
| State / manifest / lifecycle / indexation | PASS: 211 routes; sitemap195/195; rendered204/204; noindex/redirect sitemap hits0; unintended base→head transitions0 |
| Local HTTP / source-dist robots | PASS: 204/204 HTTP200 с exact artifact bytes; robots byte parity |
| Frozen / CTA / linking | PASS: 50 source-byte unchanged,49 rendered content projections unchanged,1 runtime-only N/A; все37 CTA прямо в existing app;41 contextual и4 commercial edges сохранены. Это не измерение conversion |
| Existing unit / focused blog diagnostics | 20/20 PASS; 18 focused commands PASS с предупреждениями, explicit full PR scope52 articles. Typecheck script/config отсутствует: NOT_APPLICABLE |
| Content/Template, explicit same52 scope на base/current | FAIL:77→67 (38 floors +29 structural). Новых route/rule families нет при отдельном сравнении с нормализацией только чисел Body/H2;10 старых violations устранены. Новые числа не identity-equal baseline PASS и не semantic verdict |
| Frontmatter / positioning / quality | FAIL:36 exact same-base frontmatter violations;5 same-base positioning rules;1 same-base quality claim в protected article. Не вставлены фиктивные approvals/research/publish flags |
| Lint | FAIL:61 errors/0 warnings против base63/1. Две ошибки и warning исправлены; остальной debt не признан автоматически допустимым |
| Canonical blog release | FAIL exit1,6/9 blocking groups: Task scope safety, Fast source safety, Content/template. Build/render PASS. Existing runner видит working-tree delta4 articles, НЕ все52 уже committed в PR; full52 checks выполнены отдельно, это не замена canonical PASS |
| D01 / E01 | FAIL: required dist против source-only guard; два lexical findings в неизменённом историческом evidence. Никакие contracts/validators/thresholds не менялись |
| Independent semantic / publication | BLOCKED: прежний independent verdict NEEDS REVISION; нового exact-artifact PASS нет. Producer не присваивает его себе |

Browser: unchanged full checker завершил137/137 HTTP200,137FAIL, без pageExceptions/новых layout/directive/mockup/disclaimer flags. Этот full run выполнен после article corrections, **до последнего homepage-only i18n rebuild**; report147264bytes SHA256 `3aad3eab027c40f364aaa4494bc89422a2c4e2f7afc980063537b4d1e7349f6d`. Новый full-final-browser PASS не заявляется. Console families: ERR_CONNECTION_CLOSED и ERR_TIMED_OUT. Read-only network probe вне sandbox точно установил failed scripts `www.googletagmanager.com/gtag/js` и `/gtm.js`; страница HTTP200 без JS exceptions. Причина внешней сети и состояние production analytics не установлены; scripts/consent/network не отключались.

После финальной сборки четыре исправленные статьи проверены desktop/mobile: корректные H1/CTA, без JS exceptions/overflow/empty headings/broken images; часть visits повторно показывает GTM failures. Два старых full-checker language flags — слово Workflow в headings protected RU pages, не новый UI label. Не ослаблен matcher и не изменён freeze.

Homepage после финальной сборки проверен с explicit EN preference и RU route, desktop1440×1000/mobile390×844: четыре HTTP200;10 top-level sections в каждом случае с ненулевой высотой/текстом;overflow0,empty headings0,bad images0,randomuser0; перечисленные timing benchmarks в visible text отсутствуют. Producer осмотрел новые hero/full-page screenshots в ignored `tmp/blog-visual-qa/current-*`; это не independent/HUMAN approval и не production QA. Существующие cards/illustration/product interface blocks не пустые; выдуманная статистика/новые отзывы не добавлены.

### Один блок необходимых решений — PROPOSED, NOT APPROVED

| Проблема → рекомендуемое решение → последствия |
| --- |
| D01/E01 и неполный PR scope runner → отдельно разрешить минимальную согласованную правку существующих contract/checks: allowlist только deterministic generated production artifacts с independent rebuild/source parity; evidence SEO metadata не считать producer template; release scope задавать явным base→head52 manifest. Реальные template references, лишние artifacts, drift/freeze/indexation failures продолжают блокировать. Пока Owner не разрешил и правка не проверена, machine gate FAIL |
| Legacy editorial/frontmatter/lint debt → принять точный maintenance boundary только для этого52-article artifact inventory (§8), с route/rule-bound dispositions после независимого review: содержательно доработать реальные deficits, для старых floors оценить реальную достаточность без padding, использовать только настоящие historical approval records. Не просится blanket exemption, lowering thresholds или массовое выставление approval flags. Любая будущая revision требует нового review; пока решения нет, все перечисленные FAIL остаются blocking |
| U01/browser/остаточные trust claims → получить независимый exact-source/render verdict и browser evidence в окружении с проверяемой загрузкой dependencies; для неподтверждённых оставшихся claims дать provenance либо конкретный NEEDS REVISION/narrowing. Ни approval этой maintenance policy, ни доказательство старого baseline не разрешает публикацию без этих gates |

**Publication Readiness: BLOCKED.** Review-only commit/push разрешены Owner, но Draft→Ready, merge, deploy, indexing requests и Orqestra source transition запрещены. Skill Orqestra SEO использован для project-local ownership, artifact binding, frozen invariants и этой границы. Новый большой отчёт/SEO batch не создавался: §8 обновлён механически, текущий итог — только этот addendum.

---

## Исторический first-handoff snapshot (NEEDS REVISION; superseded by §0/§8)

### Краткий итог для независимого проверяющего

- Все 27 изменившихся сообщений объяснены в §2: старый floor присутствовал на main; ни одному случаю не выдан baseline publication PASS. Шесть старых structural diagnostics устранены, текущий Content/Template итог — 71 error, а не PASS.
- Все 32 необоснованных app→marketing detours исправлены; все 37 primary CTA используют существующий app entry. Routing/label parity доказана; registration/generation и conversion uplift не измерялись (§4, §9.6).
- В ключевых статьях исправлены реальные promise/count/workflow/claim defects; семь точных source diffs приложены (§3, §9.7). Новые примеры явно illustrative, не customer evidence.
- Homepage не стал пустым после удаления недостоверного social proof; выполнен EN/RU desktop/mobile producer visual review. Оставшиеся timing/trust claims требуют отдельной provenance либо разрешённого сужения (§5).
- Production build, SEO release, state/manifest/indexation, crawl hygiene, date/render checks, local HTTP 204/204 и unit 20/20 прошли (§7). Full browser QA, strict content/frontmatter, lint и canonical blog release остаются FAIL с точными причинами.
- Решения F/M/S/D/E/T/U в §6 — запросы, не approvals. Independent/HUMAN semantic verdict отсутствует. Generated-dist/source-only contract conflict не обходился.
- Для начала review достаточно §2–7; §8–9 — exact hash/diagnostic/copy/diff evidence. Frozen source/content сохранены. Единственный batch не committed/pushed/published.

## 1. Граница и воспроизводимость

Это продолжение единого подготовленного implementation batch, не новый indexation/ranking audit. Рабочая ветка `codex/google-indexation-quality-recovery`, worktree `/private/tmp/gtf-google-indexation-recovery`. Base/HEAD: `a8aa8530c2f4e2b684239eb43c5b142ba10c005f`; base tree: `b39b8857bf964f2e26ed5d8b118297d36ae29ba5`. Remote main был read-only проверен в начале этой работы; нового handoff нет.

Сохранены исходные 70 source files / 52 Markdown articles и единый batch. Orqestra, validators, shared blog renderer, referral helper, route/ownership/lifecycle contracts не изменялись. Нет commit, push, PR, merge, deploy, source transition, indexing request или paid call.

Первичный [отчёт](2026-10-09-google-indexation-recovery.md) и [manifest](2026-10-09-google-recovery-manifest.json) — исторический pre-review checkpoint. **Его AFTER CTA, source/render hashes и check receipts не являются текущим final AFTER.** JSON сохранён byte-for-byte. Этот packet supersedes именно review/readiness/AFTER-часть, не переписывает исходные BEFORE или 79-URL исследование. Исторический GSC статус не обновлялся; текущий Google результат остаётся UNKNOWN там, где нет отдельного Owner observation.

Handoff formatting note: trailing whitespace в приложенных diff-цитатах нормализован перед Draft PR. Точные source/render bytes и SHA-256 в §8 не изменены; цитаты служат для чтения, а hashes — для byte-bound проверки. Утверждения «нет commit/push/PR» выше описывают pre-handoff review snapshot; отдельное одноразовое Owner-разрешение на review-only handoff фиксируется в Draft PR и не снимает publication blockers.

Orqestra SEO skill использован для exact-source/project-local ownership, frozen checks и publication boundary. Owner явно требует оценивать смысл изменённого сообщения, а не называть новый счётчик новой ошибкой. Это не отменяет действующий strict release gate и не даёт producer права выставить независимый semantic PASS.

## 2. Решения по всем 27 изменившимся Content/Template findings

Правило: неизменённый `scripts/check-blog-content-template.mjs` проверяет `body.trim().length` (raw Markdown, включая синтаксис ссылок), минимум из articleType; сообщение имеет вид `P0: Content depth too thin for <type>. Body chars: X (min N).` Это structural/editorial floor, **не независимая оценка полезности**.

Ни один из 27 URL не стал впервые thin: clean main уже нарушал тот же floor. Новые числа появились из конкретного content/link delta; в одном случае изменена описательная articleType label при сохранении 6000. Это подтверждает происхождение старого дефекта, но **не подтверждает соответствие publication contract**. Все 27 остаются FAIL. Ни route-specific exemption, ни blanket baseline PASS не создано.

Свежий сопоставимый scoped run: clean main 77 violations → final 71; 38 floor + 33 non-floor. Аналитическое сопоставление route/rule (не обход validator) не обнаружило новых rule families; шесть старых structural violations больше не воспроизводятся. Для всех 27 “нет новой floor-регрессии” означает только continuity этого правила. Независимый reviewer ещё должен подтвердить отсутствие user-value ухудшения; это не self-awarded semantic PASS.

В таблице F01–F27 — **предлагаемые, ещё НЕ принятые** route/artifact-bound Owner decisions. Каждое должно ссылаться на полный source/render hash в §8 и точную оставшуюся violation; варианты: approve bounded legacy-maintenance disposition с явным governance решением либо запросить содержательное дополнение под тот же intent. Ни один вариант автоматически не превращает текущий checker в PASS. Любое изменение артефакта аннулирует прежнюю hash-bound оценку.

| Decision | Source / route в §8 | BEFORE: clean main, exact | AFTER: existing manifest, exact | FINAL: current checker, exact | Почему изменилось / содержательное решение | Publication disposition |
| --- | --- | --- | --- | --- | --- | --- |
| F01 | [ai-carousel-content-strategy.md](../../src/content/blog/articles/ai-carousel-content-strategy.md) | P0: Content depth too thin for guide. Body chars: 4354 (min 8000). | P0: Content depth too thin for guide. Body chars: 4565 (min 8000). | P0: Content depth too thin for guide. Body chars: 4565 (min 8000). | Добавлена contextual-ссылка на календарь; raw Markdown включает длину URL. Полезная связность улучшена, сам краткий strategy-текст всё ещё требует редакторской оценки. | Старый floor остаётся FAIL; новая floor-регрессия не установлена. Independent semantic verdict PENDING; отдельное hash-bound решение требуется. |
| F02 | [ai-carousel-generator.md](../../src/content/blog/articles/ai-carousel-generator.md) | P0: Content depth too thin for primary product hub. Body chars: 3508 (min 6000). | P0: Content depth too thin for how-to. Body chars: 3590 (min 6000). | P0: Content depth too thin for primary product hub. Body chars: 3857 (min 6000). | PR19 review correction: restored exact base articleRole=hub, hubSlug=ai-carousel-generator and articleType=primary product hub. Metadata explains the informational hub and retains the commercial action. Earlier supporting-role change is withdrawn; no new ownership decision is asserted. Factual/workflow/CTA corrections retained; same 6000 floor remains FAIL. | Старый floor остаётся FAIL; новая floor-регрессия не установлена. Independent semantic verdict PENDING; отдельное hash-bound решение требуется. |
| F03 | [ai-carousel-workflow.md](../../src/content/blog/articles/ai-carousel-workflow.md) | P0: Content depth too thin for how_to. Body chars: 4146 (min 6000). | P0: Content depth too thin for how_to. Body chars: 4344 (min 6000). | P0: Content depth too thin for how_to. Body chars: 4344 (min 6000). | Добавлен переход к подбору тем; algorithm/PDF boost заменён описанием формата. Новый floor не появился. | Старый floor остаётся FAIL; новая floor-регрессия не установлена. Independent semantic verdict PENDING; отдельное hash-bound решение требуется. |
| F04 | [best-carousel-cta-examples.md](../../src/content/blog/articles/best-carousel-cta-examples.md) | P0: Content depth too thin for guide. Body chars: 3800 (min 8000). | P0: Content depth too thin for guide. Body chars: 3749 (min 8000). | P0: Content depth too thin for guide. Body chars: 3749 (min 8000). | Удалено обещание алгоритмической награды за saves; оставлен способ сформулировать конкретное действие. Укорочение не доказывает потерю полезного примера. | Старый floor остаётся FAIL; новая floor-регрессия не установлена. Independent semantic verdict PENDING; отдельное hash-bound решение требуется. |
| F05 | [chatgpt-for-social-media-marketing.md](../../src/content/blog/articles/chatgpt-for-social-media-marketing.md) | P0: Content depth too thin for guide. Body chars: 4819 (min 8000). | P0: Content depth too thin for guide. Body chars: 4938 (min 8000). | P0: Content depth too thin for guide. Body chars: 4938 (min 8000). | Неподтверждённые 80% заменены объяснением задачи. Старый structural finding о practical section больше не воспроизводится; floor остаётся. | Старый floor остаётся FAIL; новая floor-регрессия не установлена. Independent semantic verdict PENDING; отдельное hash-bound решение требуется. |
| F06 | [content-calendar-to-carousel.md](../../src/content/blog/articles/content-calendar-to-carousel.md) | P0: Content depth too thin for guide. Body chars: 1171 (min 8000). | P0: Content depth too thin for guide. Body chars: 5461 (min 8000). | P0: Content depth too thin for guide. Body chars: 5461 (min 8000). | Вместо четырёх общих шагов — явно fictional план на четыре недели с восемью briefs, источниками, review и ручной публикацией. Не реальный клиентский кейс и не bulk scheduler. | Старый floor остаётся FAIL; новая floor-регрессия не установлена. Independent semantic verdict PENDING; отдельное hash-bound решение требуется. |
| F07 | [dizayn-karuseley-neyroset-vs-canva.md](../../src/content/blog/articles/dizayn-karuseley-neyroset-vs-canva.md) | P0: Content depth too thin for thought-leadership/comparison. Body chars: 3640 (min 6000). | P0: Content depth too thin for thought-leadership/comparison. Body chars: 3840 (min 6000). | P0: Content depth too thin for thought-leadership/comparison. Body chars: 3840 (min 6000). | Сравнение Canva/AI согласовано с ранее утверждёнными animation/seamless capability. Это устранение противоречия Product Truth, не новый SEO intent. | Старый floor остаётся FAIL; новая floor-регрессия не установлена. Independent semantic verdict PENDING; отдельное hash-bound решение требуется. |
| F08 | [facebook-post-ideas-for-small-business.md](../../src/content/blog/articles/facebook-post-ideas-for-small-business.md) | P0: Content depth too thin for guide. Body chars: 3186 (min 8000). | P0: Content depth too thin for guide. Body chars: 3243 (min 8000). | P0: Content depth too thin for guide. Body chars: 3243 (min 8000). | Алгоритмическая награда за комментарии заменена целью обсуждения. Старые отсутствие carousel bridge/practical section остаются отдельно; новое сообщение не выдаёт им PASS. | Старый floor остаётся FAIL; новая floor-регрессия не установлена. Independent semantic verdict PENDING; отдельное hash-bound решение требуется. |
| F09 | [how-to-brainstorm-carousel-topics-with-ai.md](../../src/content/blog/articles/how-to-brainstorm-carousel-topics-with-ai.md) | P0: Content depth too thin for how_to. Body chars: 4523 (min 6000). | P0: Content depth too thin for how_to. Body chars: 4603 (min 6000). | P0: Content depth too thin for how_to. Body chars: 4603 (min 6000). | Выдуманные проценты/временные обещания заменены реальными вопросами и planning/review. Дополнительный useful workflow link, не доказательство достаточной глубины. | Старый floor остаётся FAIL; новая floor-регрессия не установлена. Independent semantic verdict PENDING; отдельное hash-bound решение требуется. |
| F10 | [how-to-build-a-personal-brand-on-linkedin-with-ai.md](../../src/content/blog/articles/how-to-build-a-personal-brand-on-linkedin-with-ai.md) | P0: Content depth too thin for guide. Body chars: 3991 (min 8000). | P0: Content depth too thin for guide. Body chars: 3992 (min 8000). | P0: Content depth too thin for guide. Body chars: 3992 (min 8000). | Универсальная пропорция 80/20 ограничена условиями выбора материала. В corrective pass FAQ с обещанием leads за 3–6 месяцев заменён проверкой собственного cadence/results; FAQ не входит в body counter. | Старый floor остаётся FAIL; новая floor-регрессия не установлена. Independent semantic verdict PENDING; отдельное hash-bound решение требуется. |
| F11 | [how-to-increase-instagram-engagement-with-carousels.md](../../src/content/blog/articles/how-to-increase-instagram-engagement-with-carousels.md) | P0: Content depth too thin for guide. Body chars: 3976 (min 8000). | P0: Content depth too thin for guide. Body chars: 3904 (min 8000). | P0: Content depth too thin for guide. Body chars: 3802 (min 8000). | Удалены универсальные dwell-time/reach обещания и предположение о повторном показе со второго слайда. Теперь opening/sequence review; более короткий текст не сохраняет ложное причинное утверждение. | Старый floor остаётся FAIL; новая floor-регрессия не установлена. Independent semantic verdict PENDING; отдельное hash-bound решение требуется. |
| F12 | [how-to-make-an-instagram-carousel-with-ai.md](../../src/content/blog/articles/how-to-make-an-instagram-carousel-with-ai.md) | P0: Content depth too thin for how-to. Body chars: 3250 (min 6000). | P0: Content depth too thin for how-to. Body chars: 4146 (min 6000). | P0: Content depth too thin for how-to. Body chars: 4146 (min 6000). | Добавлены релевантные workflow/idea/storytelling/checking links. Значительная часть роста raw chars — link syntax, а не новые доказанные кейсы; floor остаётся. | Старый floor остаётся FAIL; новая floor-регрессия не установлена. Independent semantic verdict PENDING; отдельное hash-bound решение требуется. |
| F13 | [how-to-scale-your-smm-agency-with-ai.md](../../src/content/blog/articles/how-to-scale-your-smm-agency-with-ai.md) | P0: Content depth too thin for guide. Body chars: 3602 (min 8000). | P0: Content depth too thin for guide. Body chars: 3639 (min 8000). | P0: Content depth too thin for guide. Body chars: 3639 (min 8000). | Удалён универсальный split 80/20. Дополнительно Quick Answer с 15h→2h и capacity 10–15 clients заменён измерением собственного workflow; эти поля не увеличивают body chars. | Старый floor остаётся FAIL; новая floor-регрессия не установлена. Independent semantic verdict PENDING; отдельное hash-bound решение требуется. |
| F14 | [instagram-carousel-ideas.md](../../src/content/blog/articles/instagram-carousel-ideas.md) | P0: Content depth too thin for listicle. Body chars: 4910 (min 6000). | P0: Content depth too thin for listicle. Body chars: 4932 (min 6000). | P0: Content depth too thin for listicle. Body chars: 4932 (min 6000). | Убрано утверждение, что идея составляет ровно 10% работы; сохранены существующие идеи/структура. | Старый floor остаётся FAIL; новая floor-регрессия не установлена. Independent semantic verdict PENDING; отдельное hash-bound решение требуется. |
| F15 | [instagram-carousel-storytelling.md](../../src/content/blog/articles/instagram-carousel-storytelling.md) | P0: Content depth too thin for guide. Body chars: 4469 (min 8000). | P0: Content depth too thin for guide. Body chars: 4597 (min 8000). | P0: Content depth too thin for guide. Body chars: 4597 (min 8000). | Гарантированное algorithm/abandonment объяснение заменено reader-purpose и связью с CTA examples. Старый floor сохранён. | Старый floor остаётся FAIL; новая floor-регрессия не установлена. Independent semantic verdict PENDING; отдельное hash-bound решение требуется. |
| F16 | [kak-napisat-ekspertnyj-post.md](../../src/content/blog/articles/kak-napisat-ekspertnyj-post.md) | P0: Content depth too thin for guide. Body chars: 2506 (min 8000). | P0: Content depth too thin for guide. Body chars: 2627 (min 8000). | P0: Content depth too thin for guide. Body chars: 2771 (min 8000). | 99% scroll-by и 30% ad-waste заменены bounded вопросом/проверкой источника. Дополнительно псевдоопыт «аудит для 15 магазинов» заменён требованием документированного факта либо явной illustrative маркировки. Это устранение риска выдуманного кейса, не новый intent. | Старый floor остаётся FAIL; новая floor-регрессия не установлена. Independent semantic verdict PENDING; отдельное hash-bound решение требуется. |
| F17 | [kak-peredelat-statyu-v-karusel-linkedin.md](../../src/content/blog/articles/kak-peredelat-statyu-v-karusel-linkedin.md) | P0: Content depth too thin for how-to/use-case. Body chars: 3313 (min 6000). | P0: Content depth too thin for how-to/use-case. Body chars: 3361 (min 6000). | P0: Content depth too thin for how-to/use-case. Body chars: 3361 (min 6000). | Case framing и трёхсекундный shopper claim заменены инструкцией и проверкой условий доставки; removed one-minute promise. Прежний how-to/use-case floor и Quick Answer deficit остаются. | Старый floor остаётся FAIL; новая floor-регрессия не установлена. Independent semantic verdict PENDING; отдельное hash-bound решение требуется. |
| F18 | [kak-pisat-prodayushchie-posty-s-ii.md](../../src/content/blog/articles/kak-pisat-prodayushchie-posty-s-ii.md) | P0: Content depth too thin for guide. Body chars: 3308 (min 8000). | P0: Content depth too thin for guide. Body chars: 3304 (min 8000). | P0: Content depth too thin for guide. Body chars: 3304 (min 8000). | 80% business-failure claim заменён source-based AIDA reasoning; сокращение не удаляет подтверждённую статистику, поскольку её evidence отсутствует. | Старый floor остаётся FAIL; новая floor-регрессия не установлена. Independent semantic verdict PENDING; отдельное hash-bound решение требуется. |
| F19 | [kak-sdelat-shablon-dlya-postov-v-canva.md](../../src/content/blog/articles/kak-sdelat-shablon-dlya-postov-v-canva.md) | P0: Content depth too thin for guide. Body chars: 3166 (min 8000). | P0: Content depth too thin for guide. Body chars: 4140 (min 8000). | P0: Content depth too thin for guide. Body chars: 4140 (min 8000). | Добавлена реальная ручная Canva copy/layout/export/check последовательность и official Help reference, не выдуманная кнопка global-style. Product-led workflow finding всё ещё есть: checker требует своей структуры; это не новый дефект. | Старый floor остаётся FAIL; новая floor-регрессия не установлена. Independent semantic verdict PENDING; отдельное hash-bound решение требуется. |
| F20 | [linkedin-carousel-hooks.md](../../src/content/blog/articles/linkedin-carousel-hooks.md) | P0: Content depth too thin for listicle/guide. Body chars: 4893 (min 6000). | P0: Content depth too thin for listicle/guide. Body chars: 4888 (min 6000). | P0: Content depth too thin for listicle/guide. Body chars: 4888 (min 6000). | Выдуманная population/email statistic и algorithm dwell inference заменены hook checklist с требованием настоящих чисел/условий. | Старый floor остаётся FAIL; новая floor-регрессия не установлена. Independent semantic verdict PENDING; отдельное hash-bound решение требуется. |
| F21 | [linkedin-content-strategy-for-founders.md](../../src/content/blog/articles/linkedin-content-strategy-for-founders.md) | P0: Content depth too thin for guide. Body chars: 4135 (min 8000). | P0: Content depth too thin for guide. Body chars: 4585 (min 8000). | P0: Content depth too thin for guide. Body chars: 4585 (min 8000). | Добавлены personal-brand/hooks bridges; формат документа описан как способ подачи, не гарантия эффективности. | Старый floor остаётся FAIL; новая floor-регрессия не установлена. Independent semantic verdict PENDING; отдельное hash-bound решение требуется. |
| F22 | [linkedin-creator-tools-guide.md](../../src/content/blog/articles/linkedin-creator-tools-guide.md) | P0: Content depth too thin for guide. Body chars: 4373 (min 8000). | P0: Content depth too thin for guide. Body chars: 4511 (min 8000). | P0: Content depth too thin for guide. Body chars: 4647 (min 8000). | Исправлены uploaded-PDF vs pasted-text инструкция, eligibility/notifications/account metrics и perfect-render/algorithm claims. Дополнительно top-creators/high-save-rate обобщения заменены критериями reusable reference и readable pages; screen area не доказывает attention. | Старый floor остаётся FAIL; новая floor-регрессия не установлена. Independent semantic verdict PENDING; отдельное hash-bound решение требуется. |
| F23 | [linkedin-document-post-examples.md](../../src/content/blog/articles/linkedin-document-post-examples.md) | P0: Content depth too thin for guide. Body chars: 3185 (min 8000). | P0: Content depth too thin for guide. Body chars: 4803 (min 8000). | P0: Content depth too thin for guide. Body chars: 5055 (min 8000). | Обещание 10 заменено фактическими 5 форматами; у каждого появились sample hook и outline. Why-it-works guarantees заменены Reader purpose. Это иллюстрации, не реальные customer results; floor/3-H2 deficit не закрыты. PR19 correction: Quick Answer, FAQ and body now agree on PDF/PPT/PPTX/DOC/DOCX, with official LinkedIn upload evidence; still five illustrative examples, not customer results. | Старый floor остаётся FAIL; новая floor-регрессия не установлена. Independent semantic verdict PENDING; отдельное hash-bound решение требуется. |
| F24 | [social-media-post-ideas-for-business.md](../../src/content/blog/articles/social-media-post-ideas-for-business.md) | P0: Content depth too thin for guide. Body chars: 5847 (min 8000). | P0: Content depth too thin for guide. Body chars: 5901 (min 8000). | P0: Content depth too thin for guide. Body chars: 5901 (min 8000). | Обещание algorithm/reach от активности заменено конкретной задачей вопроса к аудитории; bounded correction сохраняет список идей. | Старый floor остаётся FAIL; новая floor-регрессия не установлена. Independent semantic verdict PENDING; отдельное hash-bound решение требуется. |
| F25 | [temy-dlya-postov-v-linkedin.md](../../src/content/blog/articles/temy-dlya-postov-v-linkedin.md) | P0: Content depth too thin for guide. Body chars: 6954 (min 8000). | P0: Content depth too thin for guide. Body chars: 7077 (min 8000). | P0: Content depth too thin for guide. Body chars: 7077 (min 8000). | Фиксированная доля экспертного контента и reach-гарантии заменены source-backed выбором смеси. Старый floor не устранён одной ссылкой/формулировкой. | Старый floor остаётся FAIL; новая floor-регрессия не установлена. Independent semantic verdict PENDING; отдельное hash-bound решение требуется. |
| F26 | [text-to-carousel-ai.md](../../src/content/blog/articles/text-to-carousel-ai.md) | P0: Content depth too thin for guide. Body chars: 1022 (min 8000). | P0: Content depth too thin for guide. Body chars: 1205 (min 8000). | P0: Content depth too thin for guide. Body chars: 3590 (min 8000). | Добавлен явно fictional checklist→5 slides worked example, source/condition/attribution/privacy review и phone/export checks. Три H2 вместо одного и practical finding устранён; floor и min-4-H2 всё ещё FAIL. | Старый floor остаётся FAIL; новая floor-регрессия не установлена. Independent semantic verdict PENDING; отдельное hash-bound решение требуется. |
| F27 | [viral-linkedin-post-examples.md](../../src/content/blog/articles/viral-linkedin-post-examples.md) | P0: Content depth too thin for guide. Body chars: 5033 (min 8000). | P0: Content depth too thin for guide. Body chars: 4929 (min 8000). | P0: Content depth too thin for guide. Body chars: 4435 (min 8000). | Сохранены 10 hook frameworks, но invented financial/speed/ATS/virality claims и mixed-language строка заменены bounded реальными задачами. CTA text теперь реально рендерится; product-workflow finding устранён. Меньший raw объём отражает удаление неподтверждённых обещаний. | Старый floor остаётся FAIL; новая floor-регрессия не установлена. Independent semantic verdict PENDING; отдельное hash-bound решение требуется. |

## 3. Ключевые страницы — фактическое содержание, не вывод из PASS

### content-calendar-to-carousel

Source: [content-calendar-to-carousel.md](../../src/content/blog/articles/content-calendar-to-carousel.md). Exact hashes — §8.

BEFORE metadata:

```yaml
title: "How to Turn Your Content Calendar into a Month of Carousels"
description: "Learn a proven workflow to convert your monthly content calendar into 30 days of high-quality carousels using AI automation."
```

AFTER metadata:

```yaml
title: "Content Calendar to Carousel: An Illustrative Four-Week Plan"
description: "Turn a content calendar into eight carousel briefs with an illustrative four-week plan, source checks, slide outlines, review, and manual publishing."
```

BEFORE обещал proven workflow, 30 days/high-quality и Month, но body — 1 H2/1171 raw chars и четыре общих шага. AFTER title/H1 — illustrative four-week plan; таблица восемь конкретных briefs (4 недели ×2), источник/угол/формат/следующее действие, пример превращения строки в material/slide sequence, source checks, review/export/manual publishing. Читатель может составить рабочую карточку для одного выпуска; это не обещание bulk generation, автопоста или 30 готовых outputs. FAQ5, H2=4; raw5461 ниже floor8000 — human decision F06, не PASS.

### linkedin-document-post-examples

Source: [linkedin-document-post-examples.md](../../src/content/blog/articles/linkedin-document-post-examples.md). Exact hashes — §8.

BEFORE metadata:

```yaml
title: "10 LinkedIn Document Post Examples That Work"
description: "Discover 10 highly effective LinkedIn document post examples. Learn how to format PDFs to maximize engagement, reach, and lead generation."
```

AFTER metadata:

```yaml
title: "5 LinkedIn Document Post Examples: Illustrative Formats"
description: "Explore five illustrative LinkedIn document post formats, with sample hooks, slide outlines, and guidance for choosing a format for your own source material."
```

BEFORE title/H1 «10…That Work», description maximized reach/leads; на деле пять headings с форматами. AFTER title/H1 «5…Illustrative Formats», five actual formats сохранены, добавлены sample hooks и slide outlines: framework, teardown, tool stack, cheat sheet, personal story. Why-it-works причинность заменена Reader purpose. Это иллюстративные форматы, не пять измеренных viral/customer cases. Raw4800/floor8000 и H2=3/min4 — F23.

### text-to-carousel-ai

Source: [text-to-carousel-ai.md](../../src/content/blog/articles/text-to-carousel-ai.md). Exact hashes — §8.

BEFORE metadata:

```yaml
title: "How to Convert Text to Carousel for Instagram & LinkedIn with AI"
description: "Learn how to transform any text snippet, article, or note into a highly engaging carousel for Instagram and LinkedIn using an AI carousel maker."
```

AFTER metadata:

```yaml
title: "How to Convert Text to Carousel for Instagram & LinkedIn with AI"
description: "Turn a text snippet, article, or note into a carousel: prepare the source, review a slide outline, check the result, and export for Instagram or LinkedIn."
```

BEFORE1022raw chars: один H2, generic 4 steps, обещание highly engaging/5–10 slides. AFTER3590raw chars: явно fictional landing-page checklist → five distinct slides, защита source meaning/conditions/attribution/privacy, экспорт и просмотр на телефоне, manual publication. Реальное consumer объяснение добавлено; отсутствующий product screenshot не выдан за output. Product-led links/source→output chain есть; H2=3/min4 и floor8000 — F26.

### viral-linkedin-post-examples

Source: [viral-linkedin-post-examples.md](../../src/content/blog/articles/viral-linkedin-post-examples.md). Exact hashes — §8.

BEFORE metadata:

```yaml
title: 'How to Write a Viral LinkedIn Post: Breakdown of 10 Hooks'
description: Discover the anatomy of a viral LinkedIn post. We break down 10 proven hooks and frameworks that generate massive reach, and explain why they work.
```

AFTER metadata:

```yaml
title: 'How to Write a Viral LinkedIn Post: Breakdown of 10 Hooks'
description: Ten illustrative hook formats for a viral LinkedIn post idea, with reader-purpose breakdowns. Adapt them to real facts; they are not verified viral cases.
```

BEFORE «10 proven hooks…massive reach»; fake $1M business, 48h profitability, large revenue/loss examples, ATS bypass, mixed-language traffic statement. AFTER description/intro explicitly illustrative,10hook frameworks сохранены; each Reader purpose задаёт bounded factual task/source conditions. Quick Answer не обещает virality, image/document superiority и external-link suppression не объявлены доказанными. Product bridge сохранён. Raw4435/floor8000,H2=2/min4,QuickAnswer3/required4–5 — F27, не padding.

### ai-carousel-generator

Source: [ai-carousel-generator.md](../../src/content/blog/articles/ai-carousel-generator.md). Exact hashes — §8.

BEFORE metadata:

```yaml
title: "The Ultimate AI Carousel Generator: From Text to Design in Seconds"
description: "Discover how an AI carousel generator can replace manual design in Canva or Photoshop. Transform your text into professional, high-performing carousels instantly."
```

AFTER metadata:

```yaml
title: "AI Carousel Generator Workflow: From Source to Finished Slides"
description: "Compare manual layout with an AI carousel generator workflow: prepare a source, structure slides, review copy and design, and export for publication."
```

BEFORE «Ultimate…in Seconds», primary product hub label, 30–45 minutes/manual и45→2-minute benchmark, optimal-slide и гарантированное внимание. AFTER «Workflow: From Source to Finished Slides», informational manual-vs-AI explanation, source/sequence/fact/readability review, export; неподтверждённые timing/optimal/attention claims удалены полностью в этих passages. Supporting relation с text-to-carousel hub и maker сохраняются. URL/canonical/owner не менялись, redirect не создан. Floor6000 — F02. GSC-selected canonical и реальное SERP intent overlap остаются UNKNOWN; lexical cannibalization PASS не доказывает Google outcome.

### kak-peredelat-statyu-v-karusel-linkedin

Source: [kak-peredelat-statyu-v-karusel-linkedin.md](../../src/content/blog/articles/kak-peredelat-statyu-v-karusel-linkedin.md). Exact hashes — §8.

BEFORE metadata:

```yaml
title: "Как переделать статью в карусель LinkedIn: Инструкция и кейс"
description: "Узнайте, как быстро переупаковать статьи из блога в вирусные PDF-карусели для LinkedIn. Пошаговая инструкция и автоматизация с помощью ИИ."
```

AFTER metadata:

```yaml
title: "Как переделать статью в карусель LinkedIn: пошаговая инструкция"
description: "Узнайте, как быстро переупаковать статьи из блога в PDF-карусели для LinkedIn. Пошаговая инструкция и автоматизация с помощью ИИ."
```

BEFORE metadata обещали «Инструкция и кейс» без verified case, «вирусные», automation «за 1 минуту» и «покупатели…за3секунды». AFTER metadata — пошаговая инструкция, body — source adaptation и delivery-condition example, no timing/reach promise. Existing H1 сохраняет тот же instructional intent. Sourcereview не подменяется invented client results. Raw3361/floor6000 и Quick Answer3 — F17.

### kak-sdelat-shablon-dlya-postov-v-canva

Source: [kak-sdelat-shablon-dlya-postov-v-canva.md](../../src/content/blog/articles/kak-sdelat-shablon-dlya-postov-v-canva.md). Exact hashes — §8.

BEFORE metadata:

```yaml
title: 'Как сделать шаблон для постов: Переход от Canva к нейросетям'
description: Гайд по созданию шаблонов для постов и каруселей в социальных сетях. Почему старые шаблоны Canva часто устаревают для рутинных задач и как нейросети ускоряют дизайн.
```

AFTER metadata:

```yaml
title: 'Как сделать шаблон для постов: Переход от Canva к нейросетям'
description: Гайд по созданию шаблонов для постов и каруселей в социальных сетях. Почему старые шаблоны Canva часто устаревают для рутинных задач и как нейросети ускоряют дизайн.
```

BEFORE сразу объявлял, что Canva-шаблоны умирают, не давал пригодной последовательности сборки. AFTER сначала ручной Canva workflow: взять формат, сделать образец, скопировать страницы, перенести текст, проверить оформление/экспорт; clear checks на text/contrast/layout. Использован existing official Help reference; не придумана одна кнопка глобального стиля. Сравнение AI учитывает ранее supported animated/seamless capability. Title/description прежние; raw4140/floor8000 и product-led workflow structural finding — F19.

У последних corrections фактические примеры помечены illustrative, а не “verified customer outcome”. Длина, новые links или min-H2 не заменяют доказательство полноты ответа. Примеры не добавлены только ради8000; route/canonical/lifecycle/ownership для этих страниц не изменены.

## 4. Все37 CTA: label → intent → реальный href → conversion workflow

Clean main рендерил все37 в `https://app.gotoflow.io/`. Старые `href/buttonHref` frontmatter были inert, а не выполняемым обещанием routing. Pre-review пакет сделал32 `primaryHref` реально ведущими на маркетинговый owner. Это изменяло conversion path; соответствующая product-page intent сама по себе не обосновывала лишний шаг для Create/Start/Try.

Corrective decision: у всех32 удалён `primaryHref`; все37 используют неизменённый referral-aware renderer default. Никакой выдуманной app deep link/авторизации/instant output нет. App entry может потребовать sign-in; выбор source → creation → review → export соответствует текущим capability contracts. Product discovery/navigation остаётся inline и в secondary Explore, отдельно от primary conversion action. Это восстановление continuity, **не доказанный conversion uplift**. App onboarding/генерация, signup и paid calls не выполнялись.

| Input # | Route / verified local preview | User intent / continuation | Button label BEFORE → FINAL | Pre-review actual href | FINAL rendered href | Решение / проверка |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [/blog/facebook-post-ideas-for-small-business](http://127.0.0.1:56433/blog/facebook-post-ideas-for-small-business/) | Article idea/source → content/carousel creation | Create Posts Now | /ai-content-generator | https://app.gotoflow.io/ | Убран необоснованный extra marketing hop; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |
| 4 | [/ru/blog/generaciya-postov-karuseley](http://127.0.0.1:56433/ru/blog/generaciya-postov-karuseley/) | Article idea/source → content/carousel creation | Создать карусель бесплатно | https://app.gotoflow.io/ | https://app.gotoflow.io/ | App default сохранён; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |
| 9 | [/blog/linkedin-document-post-examples](http://127.0.0.1:56433/blog/linkedin-document-post-examples/) | LinkedIn/source → document/carousel | Try for Free | /linkedin-carousel-maker | https://app.gotoflow.io/ | Убран необоснованный extra marketing hop; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |
| 12 | [/ru/blog/chatgpt-prompty-dlya-kopirajtera](http://127.0.0.1:56433/ru/blog/chatgpt-prompty-dlya-kopirajtera/) | Article idea/source → content/carousel creation | Создать карусель в GoToFlow | https://app.gotoflow.io/ | https://app.gotoflow.io/ | App default сохранён; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |
| 14 | [/ru/blog/kak-napisat-post-v-vk-s-pomoshyu-ii](http://127.0.0.1:56433/ru/blog/kak-napisat-post-v-vk-s-pomoshyu-ii/) | VK source → post/visual | Создать готовый контент | /ru/vk-post-generator | https://app.gotoflow.io/ | Убран необоснованный extra marketing hop; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |
| 15 | [/blog/instagram-carousel-ideas](http://127.0.0.1:56433/blog/instagram-carousel-ideas/) | Instagram idea/source → carousel | Start Creating | /instagram-carousel-maker | https://app.gotoflow.io/ | Убран необоснованный extra marketing hop; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |
| 19 | [/ru/blog/neyroset-dlya-postov](http://127.0.0.1:56433/ru/blog/neyroset-dlya-postov/) | Article idea/source → content/carousel creation | Попробовать бесплатно | https://app.gotoflow.io/ | https://app.gotoflow.io/ | App default сохранён; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |
| 21 | [/blog/linkedin-carousel-size-and-specs](http://127.0.0.1:56433/blog/linkedin-carousel-size-and-specs/) | LinkedIn/source → document/carousel | Create a Carousel Now | /linkedin-carousel-maker | https://app.gotoflow.io/ | Убран необоснованный extra marketing hop; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |
| 23 | [/blog/instagram-carousel-cover-ideas](http://127.0.0.1:56433/blog/instagram-carousel-cover-ideas/) | Instagram idea/source → carousel | Create a Carousel | /instagram-carousel-maker | https://app.gotoflow.io/ | Убран необоснованный extra marketing hop; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |
| 27 | [/blog/how-to-schedule-linkedin-carousel](http://127.0.0.1:56433/blog/how-to-schedule-linkedin-carousel/) | LinkedIn/source → document/carousel | Create LinkedIn Carousel | /linkedin-carousel-maker | https://app.gotoflow.io/ | Убран необоснованный extra marketing hop; source/render parity PASS. Publishing/scheduling явно отдельный шаг. |
| 28 | [/blog/how-to-build-a-personal-brand-on-linkedin-with-ai](http://127.0.0.1:56433/blog/how-to-build-a-personal-brand-on-linkedin-with-ai/) | LinkedIn/source → document/carousel | Try GoToFlow | /linkedin-carousel-maker | https://app.gotoflow.io/ | Убран необоснованный extra marketing hop; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |
| 29 | [/ru/blog/kak-napisat-ekspertnyj-post](http://127.0.0.1:56433/ru/blog/kak-napisat-ekspertnyj-post/) | Article idea/source → content/carousel creation | Упаковать Опыт | https://app.gotoflow.io/ | https://app.gotoflow.io/ | App default сохранён; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |
| 31 | [/blog/content-calendar-to-carousel](http://127.0.0.1:56433/blog/content-calendar-to-carousel/) | One calendar brief → one carousel | Start Batch Creating → Create a carousel | /ai-carousel-maker | https://app.gotoflow.io/ | Убран необоснованный extra marketing hop; source/render parity PASS. Label не обещает отсутствующий batch-generation. |
| 33 | [/blog/ai-carousel-generator](http://127.0.0.1:56433/blog/ai-carousel-generator/) | Article idea/source → content/carousel creation | Try GoToFlow for Free | /ai-carousel-maker | https://app.gotoflow.io/ | Убран необоснованный extra marketing hop; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |
| 34 | [/ru/blog/temy-dlya-postov-v-linkedin](http://127.0.0.1:56433/ru/blog/temy-dlya-postov-v-linkedin/) | LinkedIn/source → document/carousel | Создать Пост | /ru/ii-generator-postov-dlya-linkedin | https://app.gotoflow.io/ | Убран необоснованный extra marketing hop; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |
| 38 | [/blog/ai-instagram-carousel-generator](http://127.0.0.1:56433/blog/ai-instagram-carousel-generator/) | Instagram idea/source → carousel | Try GoToFlow For Free | /instagram-carousel-maker | https://app.gotoflow.io/ | Убран необоснованный extra marketing hop; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |
| 39 | [/ru/blog/kak-pisat-prodayushchie-posty-s-ii](http://127.0.0.1:56433/ru/blog/kak-pisat-prodayushchie-posty-s-ii/) | Article idea/source → content/carousel creation | Создать карусель | /ru/generator-kontenta | https://app.gotoflow.io/ | Убран необоснованный extra marketing hop; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |
| 40 | [/blog/ai-social-media-manager](http://127.0.0.1:56433/blog/ai-social-media-manager/) | Content creation, not scheduling/autopilot | Start Automating Your Content → Create Carousel Content | /ai-carousel-maker | https://app.gotoflow.io/ | Убран необоснованный extra marketing hop; source/render parity PASS. Label больше не обещает automation. |
| 41 | [/blog/linkedin-content-strategy-for-founders](http://127.0.0.1:56433/blog/linkedin-content-strategy-for-founders/) | LinkedIn/source → document/carousel | Create a Carousel Free | /linkedin-carousel-maker | https://app.gotoflow.io/ | Убран необоснованный extra marketing hop; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |
| 46 | [/blog/ai-facebook-post-generator](http://127.0.0.1:56433/blog/ai-facebook-post-generator/) | Article idea/source → content/carousel creation | Try the Content Generator | /ai-content-generator | https://app.gotoflow.io/ | Убран необоснованный extra marketing hop; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |
| 47 | [/blog/guide-to-ai-social-media-post-generators](http://127.0.0.1:56433/blog/guide-to-ai-social-media-post-generators/) | Article idea/source → content/carousel creation | Try It Now | /ai-content-generator | https://app.gotoflow.io/ | Убран необоснованный extra marketing hop; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |
| 48 | [/blog/linkedin-carousel-ideas](http://127.0.0.1:56433/blog/linkedin-carousel-ideas/) | LinkedIn/source → document/carousel | Create a LinkedIn carousel | /linkedin-carousel-maker | https://app.gotoflow.io/ | Убран необоснованный extra marketing hop; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |
| 49 | [/blog/ai-carousel-workflow](http://127.0.0.1:56433/blog/ai-carousel-workflow/) | Article idea/source → content/carousel creation | Try the Workflow | /ai-carousel-maker | https://app.gotoflow.io/ | Убран необоснованный extra marketing hop; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |
| 50 | [/blog/repurpose-blog-post-linkedin-carousel-ai](http://127.0.0.1:56433/blog/repurpose-blog-post-linkedin-carousel-ai/) | LinkedIn/source → document/carousel | Create a LinkedIn carousel | /linkedin-carousel-maker | https://app.gotoflow.io/ | Убран необоснованный extra marketing hop; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |
| 51 | [/blog/how-to-brainstorm-carousel-topics-with-ai](http://127.0.0.1:56433/blog/how-to-brainstorm-carousel-topics-with-ai/) | Article idea/source → content/carousel creation | Create a Carousel with AI | /ai-carousel-maker | https://app.gotoflow.io/ | Убран необоснованный extra marketing hop; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |
| 52 | [/blog/ai-carousel-content-strategy](http://127.0.0.1:56433/blog/ai-carousel-content-strategy/) | Article idea/source → content/carousel creation | Start Building Carousels | /ai-carousel-maker | https://app.gotoflow.io/ | Убран необоснованный extra marketing hop; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |
| 56 | [/ru/blog/dizayn-karuseley-neyroset-vs-canva](http://127.0.0.1:56433/ru/blog/dizayn-karuseley-neyroset-vs-canva/) | Article idea/source → content/carousel creation | Создать карусель | https://app.gotoflow.io/ | https://app.gotoflow.io/ | App default сохранён; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |
| 57 | [/blog/linkedin-pdf-carousel](http://127.0.0.1:56433/blog/linkedin-pdf-carousel/) | LinkedIn/source → document/carousel | Create a PDF Carousel | /linkedin-carousel-maker | https://app.gotoflow.io/ | Убран необоснованный extra marketing hop; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |
| 58 | [/blog/carousel-post-mistakes](http://127.0.0.1:56433/blog/carousel-post-mistakes/) | Article idea/source → content/carousel creation | Create a Carousel | /ai-carousel-maker | https://app.gotoflow.io/ | Убран необоснованный extra marketing hop; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |
| 59 | [/blog/social-media-post-ideas-for-business](http://127.0.0.1:56433/blog/social-media-post-ideas-for-business/) | Article idea/source → content/carousel creation | Create a Post Now | /ai-content-generator | https://app.gotoflow.io/ | Убран необоснованный extra marketing hop; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |
| 61 | [/blog/how-to-repurpose-podcasts-into-ai-carousels](http://127.0.0.1:56433/blog/how-to-repurpose-podcasts-into-ai-carousels/) | Audio/video → reviewed carousel | Repurpose Your Content | /ai-carousel-maker | https://app.gotoflow.io/ | Убран необоснованный extra marketing hop; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |
| 62 | [/blog/youtube-to-linkedin-carousel-ai](http://127.0.0.1:56433/blog/youtube-to-linkedin-carousel-ai/) | LinkedIn/source → document/carousel | Start Creating | /linkedin-carousel-maker | https://app.gotoflow.io/ | Убран необоснованный extra marketing hop; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |
| 64 | [/blog/how-to-scale-your-smm-agency-with-ai](http://127.0.0.1:56433/blog/how-to-scale-your-smm-agency-with-ai/) | Agency source → carousel, no special agency entry | Try GoToFlow for Agencies → Try GoToFlow | /ai-carousel-maker | https://app.gotoflow.io/ | Убран необоснованный extra marketing hop; source/render parity PASS. Нет неподтверждённого agency-specific workflow. |
| 69 | [/blog/how-to-increase-instagram-engagement-with-carousels](http://127.0.0.1:56433/blog/how-to-increase-instagram-engagement-with-carousels/) | Instagram idea/source → carousel | Try AI Carousel Maker | /instagram-carousel-maker | https://app.gotoflow.io/ | Убран необоснованный extra marketing hop; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |
| 70 | [/blog/chatgpt-for-social-media-marketing](http://127.0.0.1:56433/blog/chatgpt-for-social-media-marketing/) | Article idea/source → content/carousel creation | Try GoToFlow | /ai-carousel-maker | https://app.gotoflow.io/ | Убран необоснованный extra marketing hop; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |
| 75 | [/blog/linkedin-carousel-hooks](http://127.0.0.1:56433/blog/linkedin-carousel-hooks/) | LinkedIn/source → document/carousel | Create a Carousel | /linkedin-carousel-maker | https://app.gotoflow.io/ | Убран необоснованный extra marketing hop; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |
| 78 | [/blog/best-carousel-cta-examples](http://127.0.0.1:56433/blog/best-carousel-cta-examples/) | Article idea/source → content/carousel creation | Try Carousel Maker Free | /ai-carousel-maker | https://app.gotoflow.io/ | Убран необоснованный extra marketing hop; source/render parity PASS. Source preparation / review / export; нет platform-specific app deep link. |

37/37 rendered label/href parity — PASS. Изначально риск ухудшения flow относился ко всем32 строкам с pre-review local marketing href; теперь таких primary destinations0. Пять исходных app defaults (input4/12/19/29/56) сохраняют путь. Labels: input31 “Start Batch Creating”→“Create a carousel”,40 “Start Automating Your Content”→“Create Carousel Content”,64 “Try GoToFlow for Agencies”→“Try GoToFlow”. Это снимает обещание неподтверждённого batch/autopilot/special-agency entry; не добавляет новый capability.

Точечный live-local DOM test: calendar с `?utm_source=local_review` даёт final href `https://app.gotoflow.io/?utm_source=local_review`; canonical страницы остаётся без query. Нет перехода в приложение. Existing `getAppUrlWithRef` и blog renderer сохранены byte-identical к base, что не подменяет тесты app registration/generation.

Primary CTA copy указывает исходник/идею и существующий creation workflow; timing, perfect sizing, auto-posting и performance гарантии в исправленных формулировках не добавлены. Независимый reviewer должен отдельно оценить точную page-specific связь и оставшуюся boilerplate-конверсию; producer не объявляет semantic CTA PASS для всех37.

## 5. Homepage / Product Trust — фактический BEFORE/AFTER

Проверка выполнена через существующий локальный preview и browser DOM/screenshots, EN и RU, desktop 1440×1000 и mobile390×844. Проверены hero, Showcase и desktop pricing; полный DOM inventory всех десяти оставшихся sections и нижний CTA просмотрены отдельно. Это producer visual QA, не HUMAN visual approval и не доказательство поведения приложения.

| Блок | Clean main BEFORE | FINAL AFTER | Проверка / граница |
| --- | --- | --- | --- |
| User count в Showcase | +10k / already creating | Source → slides / структура, текст, дизайн, export | Нет нового числа вместо старого. Badge остаётся непустым; width соответствует viewport |
| Bottom CTA social proof | Join thousands / Присоединяйтесь к тысячам | Source material → structure/copy/design → review/export | Общий i18n key используется homepage BottomCTA, не frozen commercial CTA |
| Testimonials | Публичные attributed quotes, результаты/time/cost/84% и клиентский trust framing | Homepage +9 non-frozen commercial callers передают enabled=false | Component возвращает null, не пустую рамку. Original quotes/attribution не переписаны; включение требует точного evidence |
| Avatars / stars | Randomuser portraits, user alt и five-star graphics в Showcase | Удалены из non-frozen блоков | Homepage DOM: randomuser images=0; новые fake portraits не добавлены |
| Hero metric | Dummy84.2% с chart | Illustration / Not product or customer data; RU эквивалент | Visual card сохранена, числовой результат не изображает измерение |
| Showcase likes/views | 980–10K likes,3.2K–25K views | Example / Not performance data (RU Пример / Не данные об эффективности) | Значения больше не отображаются как customer performance |
| Текст внутри demo images | King of reach3x,100K followers/“actually worked”,10h/75%, RU record reach, medical/language/result обещания | Активный homepage набор —3 existing neutral illustrative layout pairs, loop duplicate →6 image nodes | Осмотрены все20 locale assets. Неподтверждённые claims внутри пикселей не скрыты одной подписью — такие карточки исключены из active homepage selection |
| Active illustration assets |10 placeholder pairs c category mismatch | Personal brand EN4/RU9; food EN3/RU3; education/checklist EN6/RU10 | Все6 loads complete/naturalWidth>0; alt “Illustrative layout”, не доказанный AI/customer output. Asset bytes не изменены/не удалены |
| Product screenshots | Existing interface images в Tool/Differentiation blocks | Без замены/редактирования pixels | Никакого нового real-output/case доказательства не придумано. Screen origins/version/permission требуют Owner provenance review; это не новый продуктовый walkthrough |
| Animation progress | HowItWorks timer показывает0→100% | Не менялся | Source: локальный scripted illustration, НЕ elapsed performance/production metric. Не использовать его как benchmark evidence |
| Frozen surfaces | Testimonials/counts/claims на protected carousel callers | Без изменений | enabled default=true сохранён. Нельзя объявлять sitewide claims cleanup завершённым; frozen WAIT_MEASUREMENT до14–21октября |

По DOM: desktop document scrollWidth1425≤1440; mobile375≤390; empty H1/H2/H3=0; все десять sections имеют content и ненулевую высоту. Визуально Showcase не стал пустой лентой:3cards повторяются в marquee; clipping краевых cards намеренный, а не document overflow. Удалённая Testimonials section не оставила fixed-height placeholder; FAQ непосредственно предшествует Pricing. Первые frames после native scroll были пустыми из-за entry-animation/lazy image timing; после загрузки повторный screenshot показывает content. Это ограничение snapshot timing, не самостоятельно объявленный persistent rendering defect.

**Остаточные trust/evidence вопросы T01:** homepage по-прежнему содержит ранее существовавшие “First result / Ready in60seconds”, “Save up to10hours a week”, “One process instead of5tools” и marketing growth framing. В этом pass нет измеренного benchmark, оснований выборки/условий или независимого подтверждения всех таких assertions. Они не стали доказанными от удаления +10k/84.2%. Owner/reviewer должен либо дать действующую claim-specific provenance/conditions, либо разрешить bounded narrowing на точных homepage/i18n/render hashes в §8. Frozen элементы не включаются автоматически в это разрешение.

**T02:** ранее публичные testimonial quotes/stats могут вернуться только с атрибуцией, согласием, точным текстом/источником, условиями metrics и актуальностью. Нельзя заменить их новыми выдуманными клиентами. Сейчас re-enable не запрошен.

Public images с отброшенными claims сохранены как существующие bytes. Это не доказательство очистки любых иных callers этих assets: этот pass исправляет именно active homepage selection. Никакой watermark/provenance removal или генерации fake screenshots нет.


## 6. Publication Readiness — классификация и обязательные решения

**PUBLICATION READINESS FAIL.** Пакет подготовлен для review, не для commit/push. Машинный SEO PASS, continuity baseline или данный producer report не являются независимым semantic/user-value approval.

| Категория | Фактически найдено | Статус / следующий допустимый шаг |
| --- | --- | --- |
| Реальные новые проблемы подготовленного checkpoint |32app→marketing CTA detours без обоснования; оставшиеся false timing/virality/financial claims в ключевых passages; performance promises внутри showcase pixels | Исправлены в этом corrective pass; exact final technical parity и hashes ниже. Это не заявка на semantic PASS |
| Подтверждённый старый baseline | Content71 vs clean77; все38thin routes уже thin; structural defects/36frontmatter errors/5positioning errors/quality “идеально”/lint63+1 воспроизводятся на base | Не маскируются “зелёным baseline”. Changed published articles входят в strict project release scope; часть known errors всё ещё технически blocking. Unrelated/frozen ошибки не чинятся ради PASS |
| Changed message, не новый тип ошибки |27thin findings: exact BEFORE/checkpoint/FINAL в §2; Hero unused variable line366→367 | Изменилось диагностическое расположение/число; причинность объяснена source delta. По строгому matching это не identity-equal baseline receipt. Нужен документированный review disposition, не изменение validator |
| Ограничения validator | Raw Markdown chars включают link syntax; практическая секция определяется regex, а не полнотой ответа | Ни добавленный URL, ни слово “workflow/example” не доказывает user value. Exact mechanical FAIL сохраняется даже если реальный полезный section уже есть |
| Новые evidence-document checker findings | Template-reference lexical check считает поле URL SEO metadata в историческом evidence объявлением live route эталоном | Это false semantic interpretation, но настоящий machine FAIL. Исторический JSON не переписан; checker не ослаблен. Нужно явное scoped решение по размещению/семантике immutable evidence либо отдельно авторизованная точечная корректировка check contract |
| Preview/runtime limitation | В full existing visual QA сторонние resource errors приводят к FAIL на clean main и candidate | Это не доказанный GoToFlow outage и не runtime PASS. Exact local HTTP/render parity не освобождает от проверки browser errors в нормальном разрешённом environment |
| Owner approvals/evidence | Ни новых keyword/topic records, research approvals, brief approvals, ни approvedForPublish не сфабриковано | Предоставить настоящие project records там, где требует strict frontmatter; или принять точный legacy-maintenance boundary. Ни blanket exemption, ни массовое выставление approval flags недопустимы |
| Independent review | Intent completeness, factual/passage value, title-body promise, native integration, CTA relevance, hero/topic relevance, performance/trust evidence | MISSING. Решение PASS/NEEDS_REVISION/FAIL должен дать независимый reviewer или HUMAN по final hashes; producer не подменяет этот этап |

### Owner decisions, точный bounded список

- **F01–F27:** ровно27строк §2, по каждому exact route + sourceSHA256 + renderSHA256 в §8, конкретная оставшаяся floor violation, корректировки и новая count. Запрос — решить полезность bounded legacy maintenance на данном артефакте либо вернуть NEEDS_REVISION с конкретным information need. До решения каждый floor FAIL. Не просится освобождение всего блога/типа/будущих revisions.
- **F28–F38 (unchanged floor cases):** ещё11 текущих thin findings, не вошедших в changed-message27, перечислены отдельно в §9. Они identity-equal baseline по этому правилу, но full project current-scope gate всё ещё падает. Review обязан различать старую debt и право публикации; этот packet не создаёт нового разрешения.
- **M01:**36missing-frontmatter records §9 для изменённых published articles. Exact baseline повторяется. Нужны реальные missing approvals/research records и publish state, не invented keyword/score/approval. Незаполненная мета не закрывается floor decision.
- **S01:**33current structural violations §9 (H2/QuickAnswer/practical/product bridge). Некоторые regex false negatives требуют passage-level review; при реальной неполноте нужен содержательный ответ на читательскую задачу. Не добавлять FAQ/heading только ради числа.
- **D01:** согласовать явно противоречащие действующие правила generated-dist и source-only guard на exact diff/сборке (§7). Без отдельного governance решения либо разрешённой contract-consistent реализации guard остаётся FAIL; не удалять/stash dist и не объявлять его “не source”.
- **E01:** template-reference evidence false positives: фактические поля страниц в receipt — SEO URL данные, **не** объявление live article шаблоном. Сохранить evidence provenance. Не менять validators в этой задаче и не скрывать finding путём переименования/удаления receipts.
- **T01/T02:** §5, exact homepage/i18n/render hashes; measured timing/social-proof provenance либо отдельно разрешённое сужение, и условия возможного re-enable testimonials. Не расширять frozen scope.
- **U01:** независимый/HUMAN exact-artifact Final User Value и visual verdict по текущему batch. Required: intent-specific passages, real reader outcome, factual/claim evidence, differences from approved controls; словоcount/структура/ссылки не заменяют этот verdict.

Все решения здесь **PROPOSED / NOT APPROVED**. Они не могут выдать себя за release-green. При изменении источника/рендера нужно заново проверить и привязать review к новым hashes.

## 7. Source-only guard vs committed dist; проверочные receipts

[Project publication contract](../blog-production-system.md) line1184 требует: если production берёт dist, после build коммитить dist. Тот же документ line1314 и неизменённый `scripts/check-task-scope.mjs` запрещают tracked `dist/` и sitemap dumps даже в `--changed-only` и explicit allowlist. Canonical `check:blog:release` всегда запускает этот guard. Production rebuild меняет shared assets/их references на всех204routes; frozen content не обязан оставаться byte-identical HTML.

Одновременно выполнить обе machine policies для обязательного generated dist невозможно. Это конкретный **CONTRACT CONFLICT**, а не право проигнорировать безопасность. Не использованы skip flags, не удалены/stashed dist, не понижен severity, guard/scripts/Approved contracts не редактировались. Минимальный следующий шаг — явное Owner решение по данному maintenance build/точному artifact set, согласующее expected generated files со source-only boundary; если нужен executable guard change, он требует отдельной авторизации. Human approval не автоматически исправляет machine FAIL.

Первые попытки build и independent dist sync в sandbox завершились `listen EPERM 127.0.0.1`. Повторные разрешённые запускы существующих checks использовали только локальные порты. Это execution-environment limitation, не ошибка production code. Финальные results ниже отделены от этих неуспешных попыток.


Первый повтор SEO release был ошибочно начат одновременно с canonical rebuild: checker увидел временно очищенный dist. Это race последовательности QA, не publication defect. После завершения финальной сборки весь `check:seo:release` повторён последовательно и прошёл (exit0); неуспешная промежуточная попытка не скрыта.

### 7.1 Повторно выполненные проверки — финальный scope

Canonical `check:blog:release` receipt относится к финальным source/build artifacts, до дописывания этого packet. После добавления packet source/render hashes повторно проверяются; template-reference и scope guard повторены отдельно. Ни skip/release waiver, ни validator edits нет. Exit status ниже — фактический nested check, не exit0 JSON-wrapper.

| Check | Result | Evidence / limitation |
| --- | --- | --- |
| Production build +204prerender (canonical release Build/render stage) | PASS | Final source includes AI-generator claim correction; generated dist синхронизирован |
| `check:seo:release` | PASS, exit0 |55fixture tests, cross-system Product Truth, independent temporary rebuild/dist parity, shared layout,24SEO-page HTML checks. **Performance NOT_MEASURED**, runtime URL этой части не provided |
| `node --test scripts/tests/*.test.mjs` |20/20PASS | Date/hub/source-truth fixtures; не independent semantic approval |
| Canonical `check:blog:release` | FAIL, exit1 |3blocking groups:Task scope safety / Fast source safety / Content/template. Build-render stage прошёл; Fast group short-circuits на template-reference evidence findings |
| `node scripts/check-task-scope.mjs --changed-only` (after packet) | FAIL, exit1 |278tracked changes:70source+208generated dist files;5untracked:2new bundles+3maintenance documents. Expected source-only/committed-dist contradiction, no files hidden |
| `check:blog:content-template` | FAIL |71P0errors:38floor+33structural vs77same-scope clean main; exactlist§9 |
| `check:blog:frontmatter-contract` | FAIL |36exact-identical clean-base errors, real records missing§9 |
| `check:blog:product-positioning` | FAIL |5same-base rules§9, часть lexical; нет suppression |
| `check:blog:quality-contract` | FAIL |1same-base error на protected article§9 |
| `check:blog:template-references` | FAIL |2new evidence-document lexical false positives; packet не добавил новых errors;46warnings. Immutable checkpoint сохранён |
| `lint` | FAIL |63errors+1warning и на base;0new diagnostics, Hero line shift§9 |
| Typecheck | NOT_APPLICABLE / NOT_RUN | В existing JS package нет typecheck script/config. Не выдан фиктивный PASS |
| Local exact HTTP/artifact parity |204/204PASS | status200 и response bytes равны final HTML; source/read-only query test отдельно§4 |
| CTA render / ownership / lifecycle frozen comparison | PASS, mechanical only |37/37app href/labels;211route state identities unchanged;50protected sources unchanged,49semantic render projections unchanged+1runtime N/A |
| `check:blog:visual:run` | FAIL, exit1 |137/137failed,137HTTP200. Console resource errors;2pre-existing wrong-language-label flags;1final navigation timeout, подробнее ниже |
| `check:blog:render:run` | Historical checkpoint FAIL, NOT fresh final receipt | Previous existing runtime run:134failed/3passed (same resource family reproduced on base). Не используется как final PASS; final browser QA137+HTTP204 покрывают отдельные свойства, но не заменяют runtime gate |
| `git diff --check` | PASS | Повторён на final packet; no whitespace suppression |
| `check:seo-state` | PASS, exit0 | 211resolved;195/195indexable/sitemap;204prerender;8redirect/8noindex; sitemap noindex0/redirect0; rendered lifecycle204/204. |
| `check:orqestra-seo-manifest` | PASS, exit0 | Existing committed manifest valid, deterministic/current. |
| `check:seo-indexation-regression` | PASS, exit0 | 204existing routes,204same disposition,9base-noindex; unintended transitions0. |
| `check:seo:crawl-hygiene` | PASS, exit0 | 5592rendered links;47current RU carousel ownership/CTA pages;52changed Markdown duplicate keys0. |
| `check:seo:dates` | PASS, exit0 | 12date unit fixtures plus source/render/sitemap parity; unknown dates не invented. |
| `check:blog:render-only` | PASS, exit0 | 148published HTML;153mappings включая5drafts. |
| `check:blog:editorial-product-qa` | PASS, exit0 | Existing scope; warnings/legacy exceptions остаются advisory, не independent value proof. |
| `check:blog:faq-cta-contract` | PASS, exit0 | Existing scope; warnings/legacy exceptions остаются advisory, не independent value proof. |
| `check:blog:product-claims` | PASS, exit0 | Existing scope; warnings/legacy exceptions остаются advisory, не independent value proof. |
| `check:blog:internal-link-flow` | PASS, exit0 | Existing scope; warnings/legacy exceptions остаются advisory, не independent value proof. |
| `check:blog:product-led-links` | PASS, exit0 | Existing scope; warnings/legacy exceptions остаются advisory, не independent value proof. |
| `check:blog:v2-layout-contract` | PASS, exit0 | Existing scope; warnings/legacy exceptions остаются advisory, не independent value proof. |
| `check:blog:language-consistency` | PASS, exit0 | Existing scope; warnings/legacy exceptions остаются advisory, не independent value proof. |
| `check:blog:seo-meta-hardening` | PASS, exit0 | Existing scope; warnings/legacy exceptions остаются advisory, не independent value proof. |
| `check:blog:schema-hardening` | PASS, exit0 | Existing scope; warnings/legacy exceptions остаются advisory, не independent value proof. |
| `check:blog:intent-ownership` | PASS, exit0 | Existing scope; warnings/legacy exceptions остаются advisory, не independent value proof. |
| `check:blog:cluster-map` | PASS, exit0 | Existing scope; warnings/legacy exceptions остаются advisory, не independent value proof. |
| `check:blog:cannibalization` | PASS, exit0 | Existing scope; warnings/legacy exceptions остаются advisory, не independent value proof. |
| `check:blog:brief-alignment` | PASS, exit0 | Existing scope; warnings/legacy exceptions остаются advisory, не independent value proof. |
| `check:blog:mockup-relevance` | PASS, exit0 | Existing scope; warnings/legacy exceptions остаются advisory, не independent value proof. |
| `check:blog:topics` | PASS, exit0 | 0approved topics pending generation — не research approval текущих52articles. |
| `check:blog:batch-workflow` | PASS, exit0 | 73batch articles,5D53hold; no publishable D53 — не publish clearance этого batch. |
| `check:blog:draft-safety` | PASS, exit0 | Existing scope; warnings/legacy exceptions остаются advisory, не independent value proof. |
| `check:blog:keywords` | PASS, exit0 | Existing scope; warnings/legacy exceptions остаются advisory, не independent value proof. |
| `check:blog:topic-score` | PASS, exit0 | Existing scope; warnings/legacy exceptions остаются advisory, не independent value proof. |
| `check:blog:batch` | PASS, exit0 | Existing scope; warnings/legacy exceptions остаются advisory, не independent value proof. |

### 7.2 Browser QA — exact final vs clean main, не blanket baseline PASS

Clean main report:165593bytes SHA256 `0f840e7613a39813b5c391e1d4f6637a1a82545fa47af5d4a5545ff26ca3830d`; final report:165357bytes SHA256 `6b0d29f89418f497823f7fa1a0697abca67d55d5ba17cbf5de3692a380682654`. Existing local artifacts: [base report](/private/tmp/gtf-google-recovery-base/tmp/blog-visual-qa/report.json), [final report](/private/tmp/gtf-google-indexation-recovery/tmp/blog-visual-qa/report.json). Screenshots referenced внутри JSON; ignored QA files не новые published assets.

Same137route set, включая draft/test routes; slug-based discovery не полная resolved registry всех153blog mappings. Поэтому137checks нельзя назвать полным semantic review всего сайта. Оба reports:137HTTP200,137FAIL; common console error family:

```text
Failed to load resource: net::ERR_CONNECTION_CLOSED
```

133route console arrays совпадают точно; у4различается multiplicity того же error. Не установлен конкретный failed endpoint по тексту console alone; сторонние resources были видны в local runtime, но этот receipt сам не доказывает причину connection close или production incident. Analytics/security/network не отключались для PASS. Нет новых Vite overlay/raw directive/undefined/null/overflow/mockup language/disclaimer flags. Wrong-language-label flags уже были на base для `/ru/blog/generator-karuseley-dlya-vk/` и `/ru/blog/karusel-ili-setka-v-instagram/`; frozen debt не редактируется. Warnings213base→211final, наличие warnings не semantic approval.

**Отдельный final-only browser finding:** `/ru/blog/pervyy-post-vkontakte-s-ii/` — `Navigation timeout of 30000 ms exceeded`. Source этой страницы не изменён. Existing local HTTP200/byte parity проходит; точечная повторная CUA navigation отобразила реальный H1 «Подготовка первого поста: структура приветствия», полный article/FAQ/CTA/footer, browser error log пуст. Это опровергает постоянную недоступность при последующей проверке, но **не стирает** timeout и не даёт full automated visual PASS. Не увеличен timeout, не ослаблены assertions, checker/report не редактировались. Причина intermittency не доказана; exact full-browser gate остаётся FAIL до корректного повторного operational QA в разрешённом environment.

Предыдущий pre-last-source run также137FAIL с общей console family; он не привязан к последней AI-generator правке и не используется как current receipt. Production load/indexing/Google recrawl не измерялись. Homepage EN/RU producer visual наблюдения§5 — отдельная проверка, не подмена этого gate.


## 8. Exact artifacts — source/render binding

Все FINAL bytes/SHA-256 в §8 повторно вычислены после corrective changes для Draft PR19 и финального production build. BEFORE остаётся привязан к base `a8aa8530c2f4e2b684239eb43c5b142ba10c005f`. Это **review-only artifacts**, не deployed production. Build marker содержит pre-commit parent `22fa522d14411ae608750814211103aa91695ab4`; он не доказывает deployment нового commit. Ни publication, ни source transition не выполнены.

### 8.1 Все 70 изменённых source files

Base SHA256 привязан к чистому base; FINAL — к текущему worktree. Данные локальных helper receipts только измеряют существующие файлы; новый runtime registry/validator не создан.

| Source | BEFORE bytes / SHA256 | FINAL bytes / SHA256 |
| --- | --- | --- |
| [src/App.jsx](/private/tmp/gtf-google-indexation-recovery/src/App.jsx) | 9413 / `0fa1591d93cdd87bb61ca03d2fad82df58722b53169a260cff6ca1cfaf795767` | 9429 / `7ce47d75a540c3ae230349fe4443c882cfcf32931a284398c2b9e3df42f16f24` |
| [src/components/AIContentPage.jsx](/private/tmp/gtf-google-indexation-recovery/src/components/AIContentPage.jsx) | 45699 / `bdc7bb544f9ce37b9f7b87e182eeb356571bce4aead9dd88f20df1404179e739` | 45051 / `420cb851988609fa8832983c62a1704d4ee0d16c09f2523c1fe2be38f07b442c` |
| [src/components/AIContentPageRu.jsx](/private/tmp/gtf-google-indexation-recovery/src/components/AIContentPageRu.jsx) | 51040 / `05d6c8da3507e3cc1f014e6bc1cff2ac99f94cdae51544053807e2c9c2954e40` | 51136 / `4b76e13cb92527a6ef7ffb413227f3bd6f5df5b43ba5eb0150148bcaac8b8555` |
| [src/components/carousel/CarouselSections.jsx](/private/tmp/gtf-google-indexation-recovery/src/components/carousel/CarouselSections.jsx) | 21079 / `5de3ab744de28c057a0d12c893fdd097fa4bf1c4a97f597f8b7e45ec56f4e9c0` | 20737 / `12c7cbcafbd59ca99a612b2bf62b996b98ec04ebe0646ea7bfde6b8880264ce2` |
| [src/components/CarouselPage.jsx](/private/tmp/gtf-google-indexation-recovery/src/components/CarouselPage.jsx) | 1752 / `d3ae6df67da804417e3a4daf87a9e8e2608904b91c68fabb032673bede6dbc5b` | 1768 / `bea4d64aa08a1e4d9c2fabd95e6aa820917f443874fb27d63424c5930c24b8a6` |
| [src/components/HeroSection.jsx](/private/tmp/gtf-google-indexation-recovery/src/components/HeroSection.jsx) | 25239 / `c880a7b22daffe2f9e890f17aaf754da73deb7ff5a7271931e7f7bf5ad214920` | 25427 / `498e462fae9aba92f315acf3bb958e3a91bbf59e1ab7816d4a31d101159d3a09` |
| [src/components/InstagramPostPage.jsx](/private/tmp/gtf-google-indexation-recovery/src/components/InstagramPostPage.jsx) | 45350 / `70fd502ed50fd5a6d937dc78a5bb669b29cabbd23d270d4293fb38195c37f832` | 44709 / `0f61773a4dbb79a46d4df8c276ea106136f24760570315dca9a346a56196d433` |
| [src/components/InstagramPostPageRu.jsx](/private/tmp/gtf-google-indexation-recovery/src/components/InstagramPostPageRu.jsx) | 60261 / `4f3c9e96a56bd68938ed82e9791bf69a375418e512464f2af71e8b45bc9a4787` | 59634 / `6ad8846ff187df2a1d0b0b14470e4662fd5338a90bea68c45b995e741c8ea46b` |
| [src/components/LinkedInCarouselPage.jsx](/private/tmp/gtf-google-indexation-recovery/src/components/LinkedInCarouselPage.jsx) | 45893 / `f6d44567cf6daae5a918afde31aad213ca7c2615d6480efd87e5f216d3dccfe4` | 45248 / `e0e9a7149f676128062cfde5629be5a7f8def57b3c70f0dc4f037b6103938ed7` |
| [src/components/LinkedInCarouselPageRu.jsx](/private/tmp/gtf-google-indexation-recovery/src/components/LinkedInCarouselPageRu.jsx) | 50599 / `52c92a07b68ce4708b27dd1374850345417fe14b007b3fc2c7157e1ac39f9a70` | 49968 / `3d02f8c8a0499de36bc9b059f146019c09e143e2af63dd17beae88ee1330bcec` |
| [src/components/LinkedInPostPage.jsx](/private/tmp/gtf-google-indexation-recovery/src/components/LinkedInPostPage.jsx) | 45328 / `39a960371b84995b58aebc0b41cc304f0fd1fe19828be80fe19b44de26a34e2a` | 44687 / `a0bb03d3faac734cb3d210e4929f6d1ac1fbada451429bf2152fd30cede6bbdb` |
| [src/components/LinkedInPostPageRu.jsx](/private/tmp/gtf-google-indexation-recovery/src/components/LinkedInPostPageRu.jsx) | 50606 / `a915a01dedf37c0f9ffceed0768ea8b0c0e55375d81aafdc22baa04e04b27d2c` | 49981 / `7744eaad197daa2bc21a704b2edd118da97bdda9b391209af28903bce9b154c9` |
| [src/components/ShowcaseSlider.jsx](/private/tmp/gtf-google-indexation-recovery/src/components/ShowcaseSlider.jsx) | 9417 / `2233d1adc8d9ebd918d25cbdbb7a34b6460a07816e3c869818e487e502a76fb7` | 6678 / `fc819a87eb3b55ed9650a593c3f0d581457aceecc2398c5efda7098eb92f23d7` |
| [src/components/TestimonialsSection.jsx](/private/tmp/gtf-google-indexation-recovery/src/components/TestimonialsSection.jsx) | 6844 / `d0dc0760faed69bf6f2daac76c97e828792dc80ecf0b71e4a749001db60f98ef` | 7046 / `8afd10311ab37ff46448d8998e6a3578798b0f9dafd5af45800a1b43ab35a3ec` |
| [src/content/blog/articles/ai-carousel-content-strategy.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/ai-carousel-content-strategy.md) | 8681 / `29a51b80f7947befb7ea17bc9c6250ab327c49ddebf8b286ad67c6f32ea9c7ca` | 8873 / `b8ed92231ef5390e13eff60329b50dba82e1a3435fdcc852d3ef6a817e411978` |
| [src/content/blog/articles/ai-carousel-generator.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/ai-carousel-generator.md) | 6613 / `ead2221ccb80a17c0451eb2fea29f12b73d4f6537c6023997e671d8285f90a90` | 7250 / `323e05631ae0838f93c6fb3b5218658707aaa18b8642cd296445276392b7fd4b` |
| [src/content/blog/articles/ai-carousel-workflow.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/ai-carousel-workflow.md) | 8546 / `efae085c07fd36b0ca73208d9dd75e5b53f6797addf28206f18b6df12293ff6b` | 8715 / `e746f3f478f6ddfc6f3c160b5f8feee063bc0be1bfa44548a3a76e6ee24a7ded` |
| [src/content/blog/articles/ai-content-creation.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/ai-content-creation.md) | 17191 / `aa9f309575c64895fa67052cdf4980d2ca72e0a9b6254249ad9b26365121bd13` | 18605 / `c7a24a85d91fcf51518d9a44962bb29231a59c55b4a8dc199e00075ac307b466` |
| [src/content/blog/articles/ai-content-writing.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/ai-content-writing.md) | 13775 / `d8ed3f0aafe6e3383202d9695feffb433f49e04b06a602a93708cfb4f66cc57f` | 13806 / `8449c3b3cc1373a9215d7ec0b720f2764105b8b2454647c4698693adaa93d274` |
| [src/content/blog/articles/ai-facebook-post-generator.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/ai-facebook-post-generator.md) | 10884 / `e80d9be3d7f4ef1e94d6069107aee69dbf75ead0d266530ea0c2f60d8838c442` | 11060 / `e5ab2b41502e4fd7d83576abcc9c23f51e1055ed6ae18f32d95a978719a21a63` |
| [src/content/blog/articles/ai-instagram-carousel-generator.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/ai-instagram-carousel-generator.md) | 25108 / `e644b617162e8ef924891da4c3cebb87a07495ddaa24a91c14f7f5124b2f6d2d` | 25072 / `600f16e440d77180207688ddbe8dfbde7d7e081bf2534bed0583aa2a29c3adfb` |
| [src/content/blog/articles/ai-social-media-manager.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/ai-social-media-manager.md) | 7550 / `9f8e9fb29051318e81bf4855c1e984d3cea5a26b018811bfed083232ad8535f9` | 7493 / `1f3a93660315600608ab48ec37832fb2d4aa6d2b9b358308281f1d30128f372d` |
| [src/content/blog/articles/best-carousel-cta-examples.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/best-carousel-cta-examples.md) | 6832 / `5e5b87bd9fb1ed8eee119de9aea2b0c7b99246453cea482205db5c38ff9c5595` | 7538 / `8dc15eb753d1b32aa44539b407ea5e69bbab8ae53c0eecd5ef874d9ccd2e453f` |
| [src/content/blog/articles/carousel-post-mistakes.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/carousel-post-mistakes.md) | 8563 / `8a1ae434e47309e81dc19be8b4cfb59b0f1fd506e8e20e9751a647856190363f` | 8536 / `dfa127f5906ea7b5070bd3c8a7999d4c02e646a65e54089ca17648048aeb94cb` |
| [src/content/blog/articles/chatgpt-for-social-media-marketing.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/chatgpt-for-social-media-marketing.md) | 7842 / `2d4a42d0b67057af15f68869ef891e6e9b93a043f69ddef0653fbcf0ed5d6d6b` | 7940 / `def6d0a6e4036e141b05fa4a0363b7879fbcb53edf616268f8e0e4c6f410aa4d` |
| [src/content/blog/articles/chatgpt-prompty-dlya-kopirajtera.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/chatgpt-prompty-dlya-kopirajtera.md) | 13810 / `71162784f9c3313b5798394166edec76fc018755ba462caaccb6e58acd0030a4` | 13751 / `e74a7ef3ae06b854cb58a24c7d7bbcb8eeaf1d8ee67a7f537db77d6b390b4575` |
| [src/content/blog/articles/content-calendar-to-carousel.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/content-calendar-to-carousel.md) | 3998 / `0f46c98d973026ada200f7297ef510f16db52f3573b5106f95b1fc01dd34812f` | 8809 / `271e3a93e12ecc7f5cb2c03207e76d547050a965dd8acc91d53496ba227a5783` |
| [src/content/blog/articles/dizayn-karuseley-neyroset-vs-canva.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/dizayn-karuseley-neyroset-vs-canva.md) | 12022 / `9d4e6d4febf1cddb93ae45bc497702cd5a053536bbdcc6a85da985e476abbdd8` | 12393 / `288ee57e6476d2d41aa9a1b6a8d4249f67e07e9185f2fa94c8b4f14a8fb93feb` |
| [src/content/blog/articles/facebook-post-ideas-for-small-business.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/facebook-post-ideas-for-small-business.md) | 6197 / `87eac7616ebf8331196409ef1c05d29a4f69e03d220526a41e858ec0ff862215` | 7042 / `730148485854bae4d20153c48c8cdfb7870c2ec04c7f7033181c66df53486d84` |
| [src/content/blog/articles/foto-dlya-posta-instagram-vizual-s-ii.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/foto-dlya-posta-instagram-vizual-s-ii.md) | 16368 / `46ce42e4dfa094e043cb90c187d3c89d8fd591b08f380a7600c0727cf81476c1` | 16682 / `9dc9063165e26dab7c8adc61d7f984ef369166ef9208ce1cf07df3857759660c` |
| [src/content/blog/articles/generaciya-postov-karuseley.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/generaciya-postov-karuseley.md) | 16897 / `008c6c7d718f690f9059479a4957e30c2580156f31d4b48bb593f3b4e0bab898` | 16924 / `4b816615d460073d41ba35cacdd5be06a026cffad2ffe00c44f711881db97980` |
| [src/content/blog/articles/guide-to-ai-social-media-post-generators.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/guide-to-ai-social-media-post-generators.md) | 5961 / `77de1724c6526fc548e3cf99b391eadb569dad12648c69f0f73c9e00cd573709` | 5918 / `44a40f3e6c89741c8e2a2575b03cb17c8861900d8bc161747264842c8323780d` |
| [src/content/blog/articles/how-to-brainstorm-carousel-topics-with-ai.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/how-to-brainstorm-carousel-topics-with-ai.md) | 8838 / `3d918d9565d49ee2221e02c2949364b81d35669e356290e59f7f1345b486bd5e` | 8875 / `252e2d0aa0d843bea57b34a286bef8314bd73e0810b111d8f63849bb766b6ef5` |
| [src/content/blog/articles/how-to-build-a-personal-brand-on-linkedin-with-ai.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/how-to-build-a-personal-brand-on-linkedin-with-ai.md) | 7184 / `aae7654de0ed02d90892ae974647d220458c2660223714e85e1a7737a36363f8` | 7176 / `4dd33845ddf83b9930daccbee9dfd4c582ecb57e9493502fa18d89acf7884ae6` |
| [src/content/blog/articles/how-to-increase-instagram-engagement-with-carousels.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/how-to-increase-instagram-engagement-with-carousels.md) | 7081 / `2140acf0eaea6cf8b855ee02ba85eb2a3cbf2a45f88b16ce68fe1eed9d3ac22e` | 7527 / `6dd6852eda75ca452079428f08e96b17f10c259221ce57909f6bbb4d72f611cd` |
| [src/content/blog/articles/how-to-make-an-instagram-carousel-with-ai.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/how-to-make-an-instagram-carousel-with-ai.md) | 7926 / `6f90ffdc185b9dbce7cdee8289f58b643912d1f6e87db708985ef635b38aaa73` | 8822 / `6b7c3a6492c1c544fbd8e99b30774a18e674e3dda117d6fabef60e5cce498e17` |
| [src/content/blog/articles/how-to-make-linkedin-carousel-with-ai.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/how-to-make-linkedin-carousel-with-ai.md) | 14176 / `2c0ee5dafde78247b1abe5f56f895cfe3c633072d8f0ee5050443691196bad86` | 15723 / `0667b9fe83e3aac657a7b0c38fa3ffb3f4cb41dddf342005e1bc3d89f1e1e4df` |
| [src/content/blog/articles/how-to-repurpose-podcasts-into-ai-carousels.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/how-to-repurpose-podcasts-into-ai-carousels.md) | 8423 / `df7ef6bff869e6b0a19ec6b03a7e5e192d3061d7276ab4c0257b4bfab4b34f49` | 8407 / `32621228bacdd969aa9d6da82597699464bc430290e240bb2783313ff670d952` |
| [src/content/blog/articles/how-to-scale-your-smm-agency-with-ai.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/how-to-scale-your-smm-agency-with-ai.md) | 6836 / `2ee91723182d21bccebe6eb2cebc2cece77ce4931700b8dc4178f17218f8069b` | 6729 / `aaea844220fe2728f3a4237e9af29262c7670d65663afad26108beb0649974a4` |
| [src/content/blog/articles/how-to-schedule-linkedin-carousel.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/how-to-schedule-linkedin-carousel.md) | 10808 / `95de75b2089ec8195d5061d03e22300a9590d96792bbc2b8edffe56a5e752c4d` | 10733 / `444dc56e1e165740444db3a5cba8f991659f10890bd461081a8a2e0366a848ed` |
| [src/content/blog/articles/ii-post-dlya-socsetej.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/ii-post-dlya-socsetej.md) | 24297 / `4ddaba412eddb37801daf946ff6f295495272fedeff9e3f47bebb9e4bd706ddd` | 24283 / `85dac82aa9478165014bbe750dd15de8a6cff0f3202c5285f1ca8d510d0e8f98` |
| [src/content/blog/articles/instagram-carousel-cover-ideas.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/instagram-carousel-cover-ideas.md) | 9464 / `1ea8007d6b896d37733ad0daac5d54b0bc2f4ce2a7c7d011f8663939436e84a7` | 9428 / `803eca0d671605730a3534b08969e86cddf85ef6f5d736f782bffc996991726d` |
| [src/content/blog/articles/instagram-carousel-ideas.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/instagram-carousel-ideas.md) | 9176 / `402a87a6f149786a24ec6ef8bbc5df579d4e9c1ec5ee324db4cd465532453a8c` | 9163 / `d4561a660f751e27d1b9daa47c29982415c88c8a7ac67e09429a7f6b254880af` |
| [src/content/blog/articles/instagram-carousel-storytelling.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/instagram-carousel-storytelling.md) | 7357 / `94988e60b5d0dfbb1f73fe06c109d03342c8297905ccf2c7fc3260c34930395f` | 7461 / `641c1dc419aaf9d35db0990a9f01ede2695e178118de9380406165d252da0d42` |
| [src/content/blog/articles/kak-napisat-ekspertnyj-post.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/kak-napisat-ekspertnyj-post.md) | 9162 / `cd8aeb004296484ba089974bd1379d21616dcd5cf3cb958b56292ee5bbcc6753` | 9667 / `085c831c3c0b3747532b5820d9b716d80273f4deee3a31dae74399c984684fac` |
| [src/content/blog/articles/kak-napisat-post-v-vk-s-pomoshyu-ii.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/kak-napisat-post-v-vk-s-pomoshyu-ii.md) | 9302 / `5dbf04b5eb7068bbc52a0deb839f1ae25c6c893a51f6dd1d578fc546b6fb72f6` | 10408 / `0874ceb6f721068cae28c8cd06d7b0083efa691aca9187905e17319b70c724ff` |
| [src/content/blog/articles/kak-peredelat-statyu-v-karusel-linkedin.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/kak-peredelat-statyu-v-karusel-linkedin.md) | 11148 / `6854ef9997a45498cfafb65e967031cf45e51c80f672d1f2df89047ad93b4055` | 11375 / `1b1f11324dfa833d093a037337a5986adec700985f30cf0dee5b2d68e2bc0a78` |
| [src/content/blog/articles/kak-pisat-prodayushchie-posty-s-ii.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/kak-pisat-prodayushchie-posty-s-ii.md) | 9859 / `ed1c6b9c3a4d1b9f40986fd96da4fbd23577cfc68a759073320ccb45cbc9e874` | 11174 / `e3a0291fdf1ed89419d50d60da8ac2061c4a8dfbb2f31ff3682ce4934fd0abff` |
| [src/content/blog/articles/kak-sdelat-karusel-linkedin-s-ai.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/kak-sdelat-karusel-linkedin-s-ai.md) | 28975 / `76c076cd9f9524833ebe55ace9a38182a68890af3722a20ec1f2e9e3b9b37bc7` | 29580 / `01402b7df1836577e18ad6533d1f5a08f272e35d8833815e4d31a669845b9149` |
| [src/content/blog/articles/kak-sdelat-post-v-instagram-s-ii.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/kak-sdelat-post-v-instagram-s-ii.md) | 16469 / `13bfc00977b886b515908f5b1f0ed11af9ddbd6947b359a32e66ed9c38415ce3` | 17537 / `7bd9e4c3b8c1d255161b7b7e37e9be739f9922ca41aef52229965affaba0de83` |
| [src/content/blog/articles/kak-sdelat-shablon-dlya-postov-v-canva.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/kak-sdelat-shablon-dlya-postov-v-canva.md) | 10077 / `3833784034cce169632e2ebe0fac9aef16d6599728644c9db38f4feba6c92d86` | 11683 / `2d4b8838aac9dbf2d656fb523e73cd3752d6ea652d6981f2cce29861b858e7d8` |
| [src/content/blog/articles/kontent-plan-dlya-vk.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/kontent-plan-dlya-vk.md) | 23318 / `d04ee281b3bda2e1e2d8decb23d6219761a7d057bf85723ccff384442dc4e9a7` | 23593 / `f192a2c3a11b04e605ca18b8fb9978d215fd18f2d5b42d1c771662881039be22` |
| [src/content/blog/articles/linkedin-carousel-hooks.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/linkedin-carousel-hooks.md) | 8046 / `4e1e3c4931f2111bc9ea2b520ad195f6e2655d4e29a89b37ef3c6b3bb5c22e33` | 8712 / `6f1828c49f7745de295af7e3812980b2a2ad7c99a39f8676ec90087393f8f2af` |
| [src/content/blog/articles/linkedin-carousel-ideas.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/linkedin-carousel-ideas.md) | 13586 / `82883ee5f13016137c116f25d3a7b86e3d97ed484f07afba322089449728bd58` | 13549 / `87fce36eff2fcc3cd21f4b90731b6d8ab904f17d0b81ed2cb44efd4b0554ee3c` |
| [src/content/blog/articles/linkedin-carousel-size-and-specs.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/linkedin-carousel-size-and-specs.md) | 6038 / `7caf9765d766e9fdea12719bc5ea40e7d5f1450911ffe55c22b3580f3eee992c` | 6009 / `a738aea7fccdf676767a1386eabafb1a18f978852480431a198b805515f5c8a4` |
| [src/content/blog/articles/linkedin-content-strategy-for-founders.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/linkedin-content-strategy-for-founders.md) | 7397 / `3ddeba0f7177b28ad12c5c03baed048beb890d5556aaf65ff59175fae42eb629` | 7836 / `a8d6cb15f5dd460e7c89d50d07251585bf6f0df4c0e30e58f78fe27f229e80d8` |
| [src/content/blog/articles/linkedin-creator-tools-guide.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/linkedin-creator-tools-guide.md) | 7482 / `3cc5c80141b348b903423981934aaa3320017b5a8ce4a60a66e7db5694f5672a` | 7805 / `182aa0819c73dba50472703134f240e1449b13b7cdb4719eaf82689861d5c433` |
| [src/content/blog/articles/linkedin-document-post-examples.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/linkedin-document-post-examples.md) | 6137 / `cccc4d6295d54fbc9ff15e319cc82ad6e6c1939fad100d9cc6485f34062adf45` | 8155 / `035a400dfe2c6235663b643edd8d333651474bafb1b41f84c6abbb901963bc14` |
| [src/content/blog/articles/linkedin-pdf-carousel.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/linkedin-pdf-carousel.md) | 5789 / `40a6bc9e1aaf5d43e828327e507bb44d6b4e3f9c801ae649739ddf4e44ca4b8b` | 5766 / `8ac3be9aaea7a4b3474d4ec6be2e28e0ad9a48ff8235d7aeb6bddeb06aa1925c` |
| [src/content/blog/articles/neyroset-dlya-postov.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/neyroset-dlya-postov.md) | 27633 / `92a0bdcfb762ddbdb0336042028a27a20e6e20d0eaa5955266611e6146b8b6b3` | 29139 / `5f891ea82b38026789b56c61128b2373ed0be673e6b98f4ebc92742b87cb26cd` |
| [src/content/blog/articles/repurpose-blog-post-linkedin-carousel-ai.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/repurpose-blog-post-linkedin-carousel-ai.md) | 11516 / `f8d85542401d779bfb814c13bcf6b7eb2e315e8001a9dd29aaa9b6553449b995` | 11481 / `8abb48974226cd5aedd5559de4f0e6f10b5a396e8e708c4e6d81eee9fef0a568` |
| [src/content/blog/articles/social-media-post-ideas-for-business.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/social-media-post-ideas-for-business.md) | 8785 / `43111f27d690ca2b98973825474546d527470c80458f8d88bc73b04552245b2a` | 8800 / `acce1be02f3c8af42ecfac610abc3273d16ca49f621295eb6eaebbb547a1e071` |
| [src/content/blog/articles/temy-dlya-postov-v-linkedin.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/temy-dlya-postov-v-linkedin.md) | 16815 / `edbfa53ec41e26395bd8fa18585f1a4d2aceba6fd6db27bd2f678132ee69c03c` | 16975 / `5e18a1eee9162a991985cbd083285affdd233b4cb2d969a21a8456ced31b2d70` |
| [src/content/blog/articles/text-to-carousel-ai.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/text-to-carousel-ai.md) | 4046 / `20d1bfa0712d18328782c6defd28349652530ae2802057900f5cf21be314341d` | 6705 / `22c3c58c6b423a8566aa898f7915d694d0cd0d05877a8903df06602c0b96ee2e` |
| [src/content/blog/articles/viral-linkedin-post-examples.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/viral-linkedin-post-examples.md) | 8028 / `21187806e683bf0042a508213ae009b7f2170d6ff2ed2ac43d1189eab1c78dc1` | 8086 / `d2f113d9d03977bd50dddbb9aa9f5bf0961a8849f77c527b9c65db88b67ca7e3` |
| [src/content/blog/articles/youtube-to-linkedin-carousel-ai.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/youtube-to-linkedin-carousel-ai.md) | 6514 / `9149a57ce698322225893f56ebbbda76c712acbfa9e0ac3e84eadd849bc3b309` | 6472 / `9687b3c46c26fbb30969ab86063c9638285dc04b0257be69c54e1e18e8fd3a1b` |
| [src/content/blog/product-capabilities.json](/private/tmp/gtf-google-indexation-recovery/src/content/blog/product-capabilities.json) | 21190 / `ce1a553376d4d424be3851ee99be191d10a24057fd3d3de00ef9bbd23c3000da` | 21460 / `bd11963c80dca6fde40dc49dbb4b4e7c31a15cf882d978bb130cc02738368e4e` |
| [src/content/seoPages/index.js](/private/tmp/gtf-google-indexation-recovery/src/content/seoPages/index.js) | 421083 / `d75c957ba739fb5bc5513075f1105de56e231df7082ffbabb4f18ffc8d44aaaf` | 421119 / `9da8cc026d0c195cd6149e2bd91ef540f7a6db2f47849489f71a87b68dedda9b` |
| [src/i18n/en.js](/private/tmp/gtf-google-indexation-recovery/src/i18n/en.js) | 50191 / `366689cd2b45d072460ccda1f13630c4dac9422358e21183e906515b725750b2` | 50238 / `e9b89cf47f8194800daca3bef6c74bb6a3d5ed42649bc9f16ed99ec0837ea215` |
| [src/i18n/ru.js](/private/tmp/gtf-google-indexation-recovery/src/i18n/ru.js) | 45571 / `2a153892adccdc73acfc668240e61af89000dff317a9f26cb2f4f64addab4129` | 45749 / `ab49ab4e37dc73ffbbc56eab68f478eafda0d514557373fd29de7a3a0e49e76e` |

### 8.2 F01–F27 — exact route-bound approval targets

Review decision должен указать route, source SHA и HTML SHA вместе; approved source/routes/owners не заменяются этой таблицей.

| Decision | Route / source | FINAL source SHA256 | FINAL HTML SHA256 |
| --- | --- | --- | --- |
| F01 | [/blog/ai-carousel-content-strategy](http://127.0.0.1:56433/blog/ai-carousel-content-strategy/); [src/content/blog/articles/ai-carousel-content-strategy.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/ai-carousel-content-strategy.md) | `b8ed92231ef5390e13eff60329b50dba82e1a3435fdcc852d3ef6a817e411978` | `5953988b2a4c0b93b65293ba518a656b61841f4770923b6c787350a4a5202347` |
| F02 | [/blog/ai-carousel-generator](http://127.0.0.1:56433/blog/ai-carousel-generator/); [src/content/blog/articles/ai-carousel-generator.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/ai-carousel-generator.md) | `323e05631ae0838f93c6fb3b5218658707aaa18b8642cd296445276392b7fd4b` | `1bf4ab1c4f198e480d59c79fd8ea204194fab47585c0d8bc4c8dba2deed9c1e6` |
| F03 | [/blog/ai-carousel-workflow](http://127.0.0.1:56433/blog/ai-carousel-workflow/); [src/content/blog/articles/ai-carousel-workflow.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/ai-carousel-workflow.md) | `e746f3f478f6ddfc6f3c160b5f8feee063bc0be1bfa44548a3a76e6ee24a7ded` | `ce4a105356b548cd8645eb4b1cc265269e1a46df373b9067a0978d690ebf397a` |
| F04 | [/blog/best-carousel-cta-examples](http://127.0.0.1:56433/blog/best-carousel-cta-examples/); [src/content/blog/articles/best-carousel-cta-examples.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/best-carousel-cta-examples.md) | `8dc15eb753d1b32aa44539b407ea5e69bbab8ae53c0eecd5ef874d9ccd2e453f` | `b4ca1c982143775aad1d16fb5b7f4774ba704cbfc8c154f90710b21e13003562` |
| F05 | [/blog/chatgpt-for-social-media-marketing](http://127.0.0.1:56433/blog/chatgpt-for-social-media-marketing/); [src/content/blog/articles/chatgpt-for-social-media-marketing.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/chatgpt-for-social-media-marketing.md) | `def6d0a6e4036e141b05fa4a0363b7879fbcb53edf616268f8e0e4c6f410aa4d` | `20c6592fe46ba5aaffe60d982f198dc3c1751237332219d1bfbafeb93c70dbb7` |
| F06 | [/blog/content-calendar-to-carousel](http://127.0.0.1:56433/blog/content-calendar-to-carousel/); [src/content/blog/articles/content-calendar-to-carousel.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/content-calendar-to-carousel.md) | `271e3a93e12ecc7f5cb2c03207e76d547050a965dd8acc91d53496ba227a5783` | `d6a1f024fb9c3beb9d8fbb50bc15ccb7800444b6672fa633d22b6277203b3548` |
| F07 | [/ru/blog/dizayn-karuseley-neyroset-vs-canva](http://127.0.0.1:56433/ru/blog/dizayn-karuseley-neyroset-vs-canva/); [src/content/blog/articles/dizayn-karuseley-neyroset-vs-canva.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/dizayn-karuseley-neyroset-vs-canva.md) | `288ee57e6476d2d41aa9a1b6a8d4249f67e07e9185f2fa94c8b4f14a8fb93feb` | `087335aa77105a1374dab0b04ffd532383cab59043cbd8b7b1c45a69bdab5921` |
| F08 | [/blog/facebook-post-ideas-for-small-business](http://127.0.0.1:56433/blog/facebook-post-ideas-for-small-business/); [src/content/blog/articles/facebook-post-ideas-for-small-business.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/facebook-post-ideas-for-small-business.md) | `730148485854bae4d20153c48c8cdfb7870c2ec04c7f7033181c66df53486d84` | `74988353a55b6f9df3bc2f01f6647f32f98aa72a6a41eb9b35ab2bb87d6becc8` |
| F09 | [/blog/how-to-brainstorm-carousel-topics-with-ai](http://127.0.0.1:56433/blog/how-to-brainstorm-carousel-topics-with-ai/); [src/content/blog/articles/how-to-brainstorm-carousel-topics-with-ai.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/how-to-brainstorm-carousel-topics-with-ai.md) | `252e2d0aa0d843bea57b34a286bef8314bd73e0810b111d8f63849bb766b6ef5` | `fd8d0832c064401f8482c9148f7c41e3cd81cf8de7d1977fb6f89904efa00692` |
| F10 | [/blog/how-to-build-a-personal-brand-on-linkedin-with-ai](http://127.0.0.1:56433/blog/how-to-build-a-personal-brand-on-linkedin-with-ai/); [src/content/blog/articles/how-to-build-a-personal-brand-on-linkedin-with-ai.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/how-to-build-a-personal-brand-on-linkedin-with-ai.md) | `4dd33845ddf83b9930daccbee9dfd4c582ecb57e9493502fa18d89acf7884ae6` | `6ffe29cb7c4beab434e3e965489e7681139fad4090bf5677bda8cfcfb1c47d0e` |
| F11 | [/blog/how-to-increase-instagram-engagement-with-carousels](http://127.0.0.1:56433/blog/how-to-increase-instagram-engagement-with-carousels/); [src/content/blog/articles/how-to-increase-instagram-engagement-with-carousels.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/how-to-increase-instagram-engagement-with-carousels.md) | `6dd6852eda75ca452079428f08e96b17f10c259221ce57909f6bbb4d72f611cd` | `1a523acf77161b80697131835c39424217b30335111445254f0d6e85857caa61` |
| F12 | [/blog/how-to-make-an-instagram-carousel-with-ai](http://127.0.0.1:56433/blog/how-to-make-an-instagram-carousel-with-ai/); [src/content/blog/articles/how-to-make-an-instagram-carousel-with-ai.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/how-to-make-an-instagram-carousel-with-ai.md) | `6b7c3a6492c1c544fbd8e99b30774a18e674e3dda117d6fabef60e5cce498e17` | `d1d9f4462215dcfbe0a75d8850184887a9d67dfd2729d37fe4c2e8ba26a0727b` |
| F13 | [/blog/how-to-scale-your-smm-agency-with-ai](http://127.0.0.1:56433/blog/how-to-scale-your-smm-agency-with-ai/); [src/content/blog/articles/how-to-scale-your-smm-agency-with-ai.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/how-to-scale-your-smm-agency-with-ai.md) | `aaea844220fe2728f3a4237e9af29262c7670d65663afad26108beb0649974a4` | `2e43e54b7abdae5137b79dd876930aa598ecbb2d815699b79cf417a5d1b4cf84` |
| F14 | [/blog/instagram-carousel-ideas](http://127.0.0.1:56433/blog/instagram-carousel-ideas/); [src/content/blog/articles/instagram-carousel-ideas.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/instagram-carousel-ideas.md) | `d4561a660f751e27d1b9daa47c29982415c88c8a7ac67e09429a7f6b254880af` | `a0ca5808e67e3b1c8484c305455fbca1b0b30633fb766fb87f56267f4804ac04` |
| F15 | [/blog/instagram-carousel-storytelling](http://127.0.0.1:56433/blog/instagram-carousel-storytelling/); [src/content/blog/articles/instagram-carousel-storytelling.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/instagram-carousel-storytelling.md) | `641c1dc419aaf9d35db0990a9f01ede2695e178118de9380406165d252da0d42` | `8bdf7877b5d259b2c7f01f5c3f671bdc08a85c5739d96ee9869ce00419fad0d3` |
| F16 | [/ru/blog/kak-napisat-ekspertnyj-post](http://127.0.0.1:56433/ru/blog/kak-napisat-ekspertnyj-post/); [src/content/blog/articles/kak-napisat-ekspertnyj-post.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/kak-napisat-ekspertnyj-post.md) | `085c831c3c0b3747532b5820d9b716d80273f4deee3a31dae74399c984684fac` | `639500c28475d22d2ccbb249f2c780a98300bee96d7445db211d4da3f342121f` |
| F17 | [/ru/blog/kak-peredelat-statyu-v-karusel-linkedin](http://127.0.0.1:56433/ru/blog/kak-peredelat-statyu-v-karusel-linkedin/); [src/content/blog/articles/kak-peredelat-statyu-v-karusel-linkedin.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/kak-peredelat-statyu-v-karusel-linkedin.md) | `1b1f11324dfa833d093a037337a5986adec700985f30cf0dee5b2d68e2bc0a78` | `ea9ac29b11fe04d9d40572f6a7ce7e7b7e0d293a7daaa8b848c05ba88790982c` |
| F18 | [/ru/blog/kak-pisat-prodayushchie-posty-s-ii](http://127.0.0.1:56433/ru/blog/kak-pisat-prodayushchie-posty-s-ii/); [src/content/blog/articles/kak-pisat-prodayushchie-posty-s-ii.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/kak-pisat-prodayushchie-posty-s-ii.md) | `e3a0291fdf1ed89419d50d60da8ac2061c4a8dfbb2f31ff3682ce4934fd0abff` | `53cadc3b9cad6e6963d7fb66ed06e64aed93555e83b0f58150f2e2ac159f9599` |
| F19 | [/ru/blog/kak-sdelat-shablon-dlya-postov-v-canva](http://127.0.0.1:56433/ru/blog/kak-sdelat-shablon-dlya-postov-v-canva/); [src/content/blog/articles/kak-sdelat-shablon-dlya-postov-v-canva.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/kak-sdelat-shablon-dlya-postov-v-canva.md) | `2d4b8838aac9dbf2d656fb523e73cd3752d6ea652d6981f2cce29861b858e7d8` | `118959c6ff4c4024e9817134839ddadb132fa821888f9941456c4f85376cba0b` |
| F20 | [/blog/linkedin-carousel-hooks](http://127.0.0.1:56433/blog/linkedin-carousel-hooks/); [src/content/blog/articles/linkedin-carousel-hooks.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/linkedin-carousel-hooks.md) | `6f1828c49f7745de295af7e3812980b2a2ad7c99a39f8676ec90087393f8f2af` | `b59a6900ef78c2a638a39b2114435d29011fd6bee8e907de8f2de6d05515fb27` |
| F21 | [/blog/linkedin-content-strategy-for-founders](http://127.0.0.1:56433/blog/linkedin-content-strategy-for-founders/); [src/content/blog/articles/linkedin-content-strategy-for-founders.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/linkedin-content-strategy-for-founders.md) | `a8d6cb15f5dd460e7c89d50d07251585bf6f0df4c0e30e58f78fe27f229e80d8` | `2366296efc10e405bf18554e2bcf6378250a632b865375bffcf352026d1e1832` |
| F22 | [/blog/linkedin-creator-tools-guide](http://127.0.0.1:56433/blog/linkedin-creator-tools-guide/); [src/content/blog/articles/linkedin-creator-tools-guide.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/linkedin-creator-tools-guide.md) | `182aa0819c73dba50472703134f240e1449b13b7cdb4719eaf82689861d5c433` | `e63e8ded099d89d17c7c47fc0d8e1659c49c2b2caa99a6b7459b98706b7a06d1` |
| F23 | [/blog/linkedin-document-post-examples](http://127.0.0.1:56433/blog/linkedin-document-post-examples/); [src/content/blog/articles/linkedin-document-post-examples.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/linkedin-document-post-examples.md) | `035a400dfe2c6235663b643edd8d333651474bafb1b41f84c6abbb901963bc14` | `67c492badebbe7218edd16252c240a895d45229b28568ba16ad65ce99834d59c` |
| F24 | [/blog/social-media-post-ideas-for-business](http://127.0.0.1:56433/blog/social-media-post-ideas-for-business/); [src/content/blog/articles/social-media-post-ideas-for-business.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/social-media-post-ideas-for-business.md) | `acce1be02f3c8af42ecfac610abc3273d16ca49f621295eb6eaebbb547a1e071` | `d1d7ae11dc6dd838348e5617b5db3c792401e45b0268d9a4dc3618ac2078fe46` |
| F25 | [/ru/blog/temy-dlya-postov-v-linkedin](http://127.0.0.1:56433/ru/blog/temy-dlya-postov-v-linkedin/); [src/content/blog/articles/temy-dlya-postov-v-linkedin.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/temy-dlya-postov-v-linkedin.md) | `5e18a1eee9162a991985cbd083285affdd233b4cb2d969a21a8456ced31b2d70` | `d9a594685b0d7e62f69cabcfd26246a00b119d47269ace50129caf5b3a817137` |
| F26 | [/blog/text-to-carousel-ai](http://127.0.0.1:56433/blog/text-to-carousel-ai/); [src/content/blog/articles/text-to-carousel-ai.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/text-to-carousel-ai.md) | `22c3c58c6b423a8566aa898f7915d694d0cd0d05877a8903df06602c0b96ee2e` | `9dd14643a3e100f5d0b58f2c08e4b967166ad1b4470f68799549f47b4e33d056` |
| F27 | [/blog/viral-linkedin-post-examples](http://127.0.0.1:56433/blog/viral-linkedin-post-examples/); [src/content/blog/articles/viral-linkedin-post-examples.md](/private/tmp/gtf-google-indexation-recovery/src/content/blog/articles/viral-linkedin-post-examples.md) | `d2f113d9d03977bd50dddbb9aa9f5bf0961a8849f77c527b9c65db88b67ca7e3` | `f79a11e0dc283ae8d64b76f4169e3c2d4704c7dbe3ebd548bf3bdda10a03fe5f` |

### 8.3 Manifest, robots, sitemap и contracts (authorized changes disclosed)

| Artifact | Bytes | FINAL SHA256 |
| --- | --- | --- |
| [.orqestra/project-seo-state.json](/private/tmp/gtf-google-indexation-recovery/.orqestra/project-seo-state.json) | 154553 | `3964293f017febca0e2e9ebc7bc3eb7d546a47d6c044af50db08e22f8bffae27` |
| [dist/sitemap.xml](/private/tmp/gtf-google-indexation-recovery/dist/sitemap.xml) | 43316 | `f7553908de43b5a20bd78f9126604a0b116a99001e11ff59af6f918e7226bef2` |
| [public/robots.txt](/private/tmp/gtf-google-indexation-recovery/public/robots.txt) | 846 | `a5d235e27b2f18ee3e9b145629f0bd6815752bc87c9252c2492697023c2a46af` |
| [dist/robots.txt](/private/tmp/gtf-google-indexation-recovery/dist/robots.txt) | 846 | `a5d235e27b2f18ee3e9b145629f0bd6815752bc87c9252c2492697023c2a46af` |
| [dist/build.json](/private/tmp/gtf-google-indexation-recovery/dist/build.json) | 157 | `914469b9d7e7c46587cd010665a777e49d7a5ee3e210019588241ab74669d4fb` |

Manifest current/deterministic; noindex/redirect membership остаётся запрещено. Sitemap date changes связаны с source updatedAt, не с новым review/build timestamp. Robots source/dist byte parity:846bytes с одинаковым SHA. Route-level SEO state и ownership unchanged. Build marker не является independent deployed-SHA evidence.

Final generated bundles (old filenames replaced by normal build, no hand-written asset changes):

| Bundle | Bytes | FINAL SHA256 |
| --- | --- | --- |
| `dist/assets/index-B4q7i5uz.css` |121965|`0280bb2835b04103e23a726024047a587fd784c6ed3d3df4f76556afef8e9a4a`|
| `dist/assets/index-DYbWZ85-.js` |3972928|`65c1c17ee110360fac2cab7f510bfc99670f0f1c2687cf0b63058d0c2c4407b6`|

| Contract / renderer (scope changes disclosed in §0) | Bytes | FINAL SHA256 |
| --- | --- | --- |
| [scripts/check-blog-content-template.mjs](/private/tmp/gtf-google-indexation-recovery/scripts/check-blog-content-template.mjs) | 26976 | `cc17290d8e49614bd39446dc63692c05a1c528cd0356a1c61894e3a866d487f3` |
| [scripts/check-task-scope.mjs](/private/tmp/gtf-google-indexation-recovery/scripts/check-task-scope.mjs) | 4417 | `fcbe00b83871f5423681b311318643f4e20abef87cf2ebeccbf5656638a8fc1c` |
| [scripts/check-blog-release.mjs](/private/tmp/gtf-google-indexation-recovery/scripts/check-blog-release.mjs) | 5035 | `6e540bb8b57dee7e5712a740530b6d82fcfa2e2d85dd515ae9191010e596cc5f` |
| [scripts/check-blog-frontmatter-contract.mjs](/private/tmp/gtf-google-indexation-recovery/scripts/check-blog-frontmatter-contract.mjs) | 16996 | `db7d7852fc556e7412be8410c71c1f8377ce9f209ebea078b751466c59b92368` |
| [scripts/check-blog-product-positioning.mjs](/private/tmp/gtf-google-indexation-recovery/scripts/check-blog-product-positioning.mjs) | 27926 | `ac8209953f5679954442d2a2849b3e0da570d24170f8f5eb6568a3dd19394f8a` |
| [scripts/check-blog-quality-contract.mjs](/private/tmp/gtf-google-indexation-recovery/scripts/check-blog-quality-contract.mjs) | 6772 | `7459fea327d40bfd73b012c7e89fe26ccc250b28505ee23d49edae360afbbf4e` |
| [src/components/blog/templates/MarkdownSeoArticleTemplateV2.jsx](/private/tmp/gtf-google-indexation-recovery/src/components/blog/templates/MarkdownSeoArticleTemplateV2.jsx) | 53839 | `10bc44662c7fa2ebef7cb5a7fd86410b2291cf88198abd4fa9227569147599f2` |
| [src/utils/url.js](/private/tmp/gtf-google-indexation-recovery/src/utils/url.js) | 1153 | `ccc363d24203d492e663c7cb44390ba13ce0dbb1f448f27b5fab646a97a92386` |
| [docs/blog-production-system.md](/private/tmp/gtf-google-indexation-recovery/docs/blog-production-system.md) | 47741 | `b8d15dc2fb577a3a870633a13967405c2d757afe9796058ed632f0651c94a788` |

Additional bounded release tooling, exact current source binding:

| Source | Bytes | FINAL SHA256 |
| --- | --- | --- |
| [scripts/check-release-findings.mjs](/private/tmp/gtf-google-indexation-recovery/scripts/check-release-findings.mjs) | 6662 | `fb095cfb9e23ba47b398a5f4cea2515f1463fd070be155a5225a39a46c3ca857` |
| [scripts/check-blog-visual.mjs](/private/tmp/gtf-google-indexation-recovery/scripts/check-blog-visual.mjs) | 16743 | `54d8ff64748ba41916d378cf37af4496f315bfb39e1025bd8251f6ce391e2bd8` |
| [scripts/check-blog-template-references.mjs](/private/tmp/gtf-google-indexation-recovery/scripts/check-blog-template-references.mjs) | 4447 | `9ca836706a35c265ae031c3ad21c27d80928e3376f6c20e2de9ccc806cbed103` |
| [scripts/check-seo-dist-sync.mjs](/private/tmp/gtf-google-indexation-recovery/scripts/check-seo-dist-sync.mjs) | 18279 | `69dc22a2419fece92dc70b92904da3f10abe92c7af7b912b3773d01df574900f` |
| [scripts/lib/production-artifact-parity.mjs](/private/tmp/gtf-google-indexation-recovery/scripts/lib/production-artifact-parity.mjs) | 1987 | `71701957bbac27a8374692b3594e4db2d9ae9324fa2b005b2bb1db8c25bbc101` |
| [scripts/lib/reference-evidence.mjs](/private/tmp/gtf-google-indexation-recovery/scripts/lib/reference-evidence.mjs) | 2013 | `3c10dec60d37b421854454c78a189fc5bb8d36b328a027161ef94d80cd05ae5e` |
| [scripts/lib/release-findings.mjs](/private/tmp/gtf-google-indexation-recovery/scripts/lib/release-findings.mjs) | 2329 | `fbc2f77dfbf44df9d1a37ccddbe0c687c2eb35744600c5029739f4cd5d2548a4` |
| [scripts/lib/release-scope.mjs](/private/tmp/gtf-google-indexation-recovery/scripts/lib/release-scope.mjs) | 1077 | `97e17b868556b085de592d4089ac07857b3c52827c564289f89305f15575b2fa` |
| [scripts/tests/release-reconciliation.test.mjs](/private/tmp/gtf-google-indexation-recovery/scripts/tests/release-reconciliation.test.mjs) | 7029 | `ebf91edbf042b9fb6a2dae21b9f4b330eca1955cb85cb9fe0e8ac3664cf966cf` |

Active homepage image bytes не редактировались:

| Asset | Bytes | Base = FINAL SHA256 |
| --- | --- | --- |
| [public/images/niches/en/content-en-4.webp](/private/tmp/gtf-google-indexation-recovery/public/images/niches/en/content-en-4.webp) | 312818 | `dc4841c0a0134ca7384541eeb257f37272e0c2f1ed417d2ae9051189307c98d6` |
| [public/images/niches/ru/content-ru-9.webp](/private/tmp/gtf-google-indexation-recovery/public/images/niches/ru/content-ru-9.webp) | 264396 | `d0ed20d79cf9a89007476d53e54046471d6ee89b49b8f87d38bba480e2a03f2e` |
| [public/images/niches/en/content-en-3.webp](/private/tmp/gtf-google-indexation-recovery/public/images/niches/en/content-en-3.webp) | 158176 | `9b81525d9fcc0d6efc80714b352110328cdc730b338b29ee9109f09525b99c5b` |
| [public/images/niches/ru/content-ru-3.webp](/private/tmp/gtf-google-indexation-recovery/public/images/niches/ru/content-ru-3.webp) | 144102 | `c69472f9e9ec578f9cdc7d057b7576bcdf7b4df15937d285cd34d0058e588c08` |
| [public/images/niches/en/content-en-6.webp](/private/tmp/gtf-google-indexation-recovery/public/images/niches/en/content-en-6.webp) | 278218 | `2f3ff1cbbbbc426bff3290b0d9daead3d35b6a93340cc43e5ccc4e2f5fcbd009` |
| [public/images/niches/ru/content-ru-10.webp](/private/tmp/gtf-google-indexation-recovery/public/images/niches/ru/content-ru-10.webp) | 155306 | `d1f1842ad407adf6a45f734b20fd47d4adc66eccd1387e0527795b0bb7e5358b` |

Historical checkpoint manifest:619276bytes, SHA256 `37f44f12d038afd28dbe9fd75699484a777b40bca78add431f7dcfdcabffed97` (unchanged). Original report with explicit checkpoint notice:83468bytes, SHA256 `e4264d1892145bda604a776ae04e0ea2d658e3ad2855bddbf3568a6956339c1b`. These receipts не подменяют current AFTER.

### 8.4 Frozen verification — 50 protected routes

Все50 source-byte unchanged;49 comparable prerender semantic projections unchanged. Один route runtime-only, rendered comparison N/A — не заявлен как HTML byte parity. Projection сравнивает видимый content/head/links, исключая generated bundle references; raw HTML hashes всё равно приведены ниже. Freeze до14–21октября сохраняется; нет нового RU carousel rewriting.

| Route | Unchanged source SHA256 | Source parity | Rendered content parity |
| --- | --- | --- | --- |
| `/ru/blog/tekst-v-karusel-neyroset` | `cc7d723176253378be11f376886b98efc82943443334e47f3ab71b6fc22cc735` | unchanged | unchanged |
| `/ru/blog/ii-dlya-karuseley` | `6de42033714fde1b15ffa13acbc132a7efc3f8b8a94870e37b10d38fe99d917a` | unchanged | unchanged |
| `/ru/blog/kak-napisat-tekst-dlya-karuseli-s-ii` | `ec96931ed91f5db552e28d128c7eeb1e12731cd01aa92b160ddbf234f8bfe8bb` | unchanged | N/A: runtime-only |
| `/ru/blog/besshovnaya-karusel-v-instagram` | `9b708b00bdca6cdede6df9d9bef68d27a6e962ec65a0e2133b1af9111b005d1c` | unchanged | unchanged |
| `/ru/blog/razmer-karuseli-v-instagram` | `e1198cb36936e6b29d6919238acac1eee5559a77f5b4fba422c89101a45e3078` | unchanged | unchanged |
| `/ru/blog/algoritm-instagram-karuseli` | `d794b75fee7134bff6ac999ee1adf7a927b472991612219c3c6c26c205d1d163` | unchanged | unchanged |
| `/ru/blog/chitabelnost-teksta-v-karuselyah` | `e33709f90cff960462ca3d977a8606bc727486433c25fcd28bccee97eb1b56c0` | unchanged | unchanged |
| `/ru/blog/karusel-ili-setka-v-instagram` | `6b56f7c4e09863a152c4644b2465965c350bf6afdfd7d1543e66fef6171a7fe7` | unchanged | unchanged |
| `/ru/blog/kak-narezat-foto-dlya-karuseli` | `96b7517e2b93cf276ade9ac6d6a4720259a1bdab3d563b8537d5bf0b7cc64173` | unchanged | unchanged |
| `/ru/blog/gorizontalnye-i-vertikalnye-foto-v-karuseli` | `209cf40c78dad8258d15376b029061a5422a2e30d12321c99b72a7e916615627` | unchanged | unchanged |
| `/ru/blog/pochemu-instagram-obrezaet-foto-v-karuseli` | `3805ea69836f6684a652e0b3b8e009adfbd023a4919e150ded2b798775805bf3` | unchanged | unchanged |
| `/ru/blog/kak-uvelichit-sohraneniya-karuseley` | `c740cfd03d66e42ccdb40eddeac6ecc36206895755aea8a8eb0ea3050db00bb1` | unchanged | unchanged |
| `/ru/blog/cta-dlya-karuseley-instagram-s-ii` | `c81d7cda6b0d763a0e6535799528e6829d5a84a5851b2e9c16ad11b98616efdb` | unchanged | unchanged |
| `/ru/blog/kak-ispolzovat-midjourney-dlya-postov` | `deda10e2e7598d9319e63fa30111767603acde8980370317c78df024e5bcc8f1` | unchanged | unchanged |
| `/ru/blog/shablony-karuseley-v-instagram` | `e58bfc7098c96a2b38942a157ccc5510ead6df3341908716b042593d26e8ecf5` | unchanged | unchanged |
| `/ru/blog/animaciya-v-karuselyah-instagram` | `87bb243f2d7b843c990e887bdcaeee2a1f5b0f6223c2e1e8b8aff320f45cbb9d` | unchanged | unchanged |
| `/ru/blog/avtovoronka-v-instagram-cherez-karuseli` | `83bc6e1efbba94f72f99c7f49a9e6402272486bb3152c5a3983c6bb99f439c5a` | unchanged | unchanged |
| `/ru/blog/chto-takoe-karusel-v-instagram` | `7c62da6619250e84101e5a70276cfdae579a4cafb5bf29c8fc28b7d71d626cbe` | unchanged | unchanged |
| `/ru/blog/huki-dlya-karuseli-instagram` | `cc3c4732375787b4200b9d91595c5f31cb24fd7b2da4489c853fc4b56960f2d0` | unchanged | unchanged |
| `/ru/blog/idei-dlya-karuseli-instagram` | `a6c1a6496c0b736229c03f4364867af89a4186f84ed6557fee17d8fbd106dfa0` | unchanged | unchanged |
| `/ru/blog/kak-povisit-ohvaty-v-instagram-s-pomoshyu-karuseley` | `19cab3fcef4af538b0fae397df2dbc0b8ca50052bced1ce0d3a49880c579e18f` | unchanged | unchanged |
| `/ru/blog/kak-sdelat-karusel-dlya-instagram-s-ii` | `63228f8b3b1795f650d0caf98e23c5da3d9a1e39900eeb2f3a9645e429e0f3d7` | unchanged | unchanged |
| `/ru/blog/oblozhka-dlya-karuseli-instagram` | `246299b6305c03e4415a32cae813e8d2e3fa589072f62785857f1e419206bb36` | unchanged | unchanged |
| `/ru/blog/oshibki-v-karuselyah-instagram` | `9273748b5ee0c4e6160e3dde029e8e9d7a9c61fb3fbe10f2659ddb1337946338` | unchanged | unchanged |
| `/ru/blog/primery-karuseley-instagram` | `8667217dc40376399d4fcc49ad9af051f7b671332485c9c806832ef506c7897e` | unchanged | unchanged |
| `/ru/blog/prompty-dlya-karuseley-v-instagram` | `ee92af936cb087f391a2ed9d82ce1584bec3f587087c7f5bc648ce2b960c6416` | unchanged | unchanged |
| `/ru/blog/reels-ili-karuseli-chto-vybrat` | `76f815a683b83025c9a7788f4315fe564204b16485b6369df90757a81535bc4a` | unchanged | unchanged |
| `/ru/blog/trendovye-shrifty-dlya-karuseley` | `eabdc41bbd631bc75b36a6fd02f340d652ac486661008c56069e869b89de260f` | unchanged | unchanged |
| `/ru/blog/kak-oformit-keys-v-instagram` | `d6aa82c255006e4d1fcf936aee091c268fb2a8669499a2b32e0fc7dc950a0c91` | unchanged | unchanged |
| `/ru/blog/karusel-dlya-instagram` | `e12f46d1f7fba0f0048ceacac2401dc15d2621e0273ee5e24309b248b54af335` | unchanged | unchanged |
| `/ru/blog/kak-pridumat-temu-dlya-karuseli-s-ii` | `bba53680567a045cf90f8fc7a7ce4e1545317490df6247bcb2a01cc76bccc232` | unchanged | unchanged |
| `/ru/blog/kak-sdelat-karusel-iz-video-s-ii` | `eb31e38a16564b2501bfeab50327e07c1b9284e79b5d2fe552de48953f940a26` | unchanged | unchanged |
| `/ru/blog/karusel-dlya-lichnogo-brenda-s-ii` | `e4f5405fb59023232f0bba22f3d4f3e349c2c07d0a9dd2502136c71245f552da` | unchanged | unchanged |
| `/ru/blog/karusel-dlya-otzyvov-s-ii` | `0551dd940757c8bedb2b6414c10ed50c2931fcf5f605fa37a654e0f327fb0f05` | unchanged | unchanged |
| `/ru/blog/karusel-dlya-zapuska-produkta-s-ii` | `1efd166b4c228289ee11070e7d2757602f77edcf255fd52e04b2066363405e60` | unchanged | unchanged |
| `/ru/blog/karuseli-dlya-ekspertov-s-ii` | `3f82910d938c8148bc98d941d28ee87425ee78fda836e588ccab2b1ea2d65829` | unchanged | unchanged |
| `/ru/blog/karuseli-dlya-onlayn-shkol-s-ii` | `5c4ea82d5c7f5035bafcb86014f5f1317d47860ca0b4eb455c7346b237616eb4` | unchanged | unchanged |
| `/ru/blog/karuseli-dlya-smm-agentstva-s-ii` | `7321e3ce944d152f623b9d83beb19e46cdf451adf0dfe155171fd3dd192abe12` | unchanged | unchanged |
| `/ru/blog/psihologiya-karuseley-kak-uderzhat-vnimanie` | `07df2e73088fe2fb3dcfd526986d0788af9beac3a6489b76bd6611ed82f86587` | unchanged | unchanged |
| `/ru/blog/kakoy-ii-sozdast-post-karusel` | `2f1155b49bafec668d613cfbb62e8ec35d0c39f1acdcf6c251be822061d2560a` | unchanged | unchanged |
| `/ru/blog/gde-delat-posty-karuseli-s-ii` | `a3b9dce76af8b32512fc740dfa6bbaed117478ed3aeec77fc5560eccf6c69733` | unchanged | unchanged |
| `/ru/blog/konstruktor-karuseley-onlayn` | `056f3d2ace12f198045bac0eb2b3866cd17500871401f119752ab9e34b3190d3` | unchanged | unchanged |
| `/ru/blog/kak-sozdat-karusel-s-chatgpt` | `308e0ee22fec9468496419c804598db169820ca2de56f8181cb57f090b298fcb` | unchanged | unchanged |
| `/ru/blog/massovoe-sozdanie-karuseley-s-ii` | `2146a5eba1a614b4032768d899144b039c0f5e184f6d3f90821d175d1e358db4` | unchanged | unchanged |
| `/ru/blog/analiz-kontenta-konkurentov-v-socsetyah` | `e7a21b0776bca5d6452a58d24b041d4313ecd97e49c4c7fd1d5d3172af1a1bdd` | unchanged | unchanged |
| `/ru/blog/pererabotka-kontenta-dlya-socsetey` | `c5ff29e9fac4fdc3183473157cab1fd3cd3ba0234b791a983fabfdbd5afdb977` | unchanged | unchanged |
| `/ru/blog/infografika-dlya-socsetey` | `caf96e34b1e4121fa531e2e7115de72efb15f57090efa1d1eaecff171bf7c1ac` | unchanged | unchanged |
| `/ru/blog/mnogostranichnye-karuseli-prezentacii` | `e2589396e687259c8240f8bd542073ccfcefd9b4cc06edf0ce6c8aa5bb88a679` | unchanged | unchanged |
| `/ru/ii-generator-karuseley` | `46928f75e3d64c5c27978b848dfab58ea0cb0d98b3c16fb564dd82e9bad58ae1` | unchanged | unchanged |
| `/ru/generator-karuselej-instagram` | `46928f75e3d64c5c27978b848dfab58ea0cb0d98b3c16fb564dd82e9bad58ae1` | unchanged | unchanged |

### 8.5 Полный rendered artifact inventory

204/204 local HTTP200 с bytes exactly equal FINAL dist. Base HTML принадлежит clean-base artifact set; shared bundle names изменились. Это не semantic approval каждого unchanged page и не production verification.

<details>
<summary>Все204HTML: preview, bytes и полные BEFORE/FINAL SHA256</summary>

| Route / HTML | BEFORE bytes / SHA256 | FINAL bytes / SHA256 |
| --- | --- | --- |
| [/](http://127.0.0.1:56433/); [dist/index.html](/private/tmp/gtf-google-indexation-recovery/dist/index.html) | 245273 / `e53e652d47d8212162e4798e695539f9f3635b0cd0ae5322d4cad004a2d5f04d` | 152010 / `64d56e00b62bfbf2b2ef182f8d7c9f4265a060b1455d0e20bd8b6a447816a1d8` |
| [/ai-carousel-maker](http://127.0.0.1:56433/ai-carousel-maker/); [dist/ai-carousel-maker/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ai-carousel-maker/index.html) | 172566 / `04f8034800efe6eaac0033655a53aa2514f38174c326442d65c51a7201592b28` | 109823 / `3e439f3e547d588ab8eced1091f85d1e3705466a299f7ad004bc56b0ebf320c7` |
| [/ai-content-generator](http://127.0.0.1:56433/ai-content-generator/); [dist/ai-content-generator/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ai-content-generator/index.html) | 171367 / `f0d8fe1197bf442acb1c4d6603057b5af1bde77c27eab74ecf698feaed850071` | 108320 / `24fde0d613229dd6e8597374c78f68f2bd9ec9585727d6cb8d6ea758e81cb150` |
| [/ai-instagram-post-generator](http://127.0.0.1:56433/ai-instagram-post-generator/); [dist/ai-instagram-post-generator/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ai-instagram-post-generator/index.html) | 167529 / `91f62c9d72ddd2d895f44529647f3ea058ea7da327570444e3a3912026d7108c` | 104485 / `27d01f3df634ebceee9fe7d656cf965c082abe8b4ff79c731532c0ffe3329d18` |
| [/ai-linkedin-post-generator](http://127.0.0.1:56433/ai-linkedin-post-generator/); [dist/ai-linkedin-post-generator/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ai-linkedin-post-generator/index.html) | 115599 / `db55dc218a44baba79b0eb83e0abfafabc3598affee3ca5259d7a92f129d9a5f` | 115599 / `b5cbfabbd852e7474e043765acec6ff78dc98ed828bd1c5a094dc18d80a7d353` |
| [/ai-post-maker](http://127.0.0.1:56433/ai-post-maker/); [dist/ai-post-maker/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ai-post-maker/index.html) | 167310 / `b4f94d7d171ee0493f588cb61470de800aca9fee02cdf3adad01aea75caac25f` | 104270 / `6c52d15a8397fd27aa8995e1f01f2a2eede4a52ef2c6746f3c8131953b9351e9` |
| [/blog](http://127.0.0.1:56433/blog/); [dist/blog/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/index.html) | 143897 / `184b624b7a886ee87a3ccdd9d61990c35f7f9fb90db5af99a2f6a1b74cf615b2` | 144382 / `58d0d647cd33c6dc4e1d801caf9e137755340a4df755a0e198931286effcd37d` |
| [/blog/ai-carousel-content-strategy](http://127.0.0.1:56433/blog/ai-carousel-content-strategy/); [dist/blog/ai-carousel-content-strategy/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/ai-carousel-content-strategy/index.html) | 48303 / `7a59f3466e17939ff49899e0659ce75ca38ce27503d08ce05f0513416ec95085` | 48773 / `5953988b2a4c0b93b65293ba518a656b61841f4770923b6c787350a4a5202347` |
| [/blog/ai-carousel-generator](http://127.0.0.1:56433/blog/ai-carousel-generator/); [dist/blog/ai-carousel-generator/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/ai-carousel-generator/index.html) | 42777 / `85f1d0235a14f0f3a4557da595e7720df00aa72c94c50dc26dca67d49fbd6a4f` | 44018 / `1bf4ab1c4f198e480d59c79fd8ea204194fab47585c0d8bc4c8dba2deed9c1e6` |
| [/blog/ai-carousel-maker-vs-manual-design](http://127.0.0.1:56433/blog/ai-carousel-maker-vs-manual-design/); [dist/blog/ai-carousel-maker-vs-manual-design/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/ai-carousel-maker-vs-manual-design/index.html) | 59790 / `ccdd0fc36dab52762ac2d9084f381ab1218183343b1cd0b455f2861cd0a666ce` | 59790 / `c6a75c05a3c92e53dbdf7ccb7e89209e493aed472c6b589e971f8c7e3acdf83c` |
| [/blog/ai-carousel-workflow](http://127.0.0.1:56433/blog/ai-carousel-workflow/); [dist/blog/ai-carousel-workflow/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/ai-carousel-workflow/index.html) | 49480 / `22e1fce5f76bc59ebbb9495962a3ceb9a82590d7492e34f0c81758d216d469a5` | 49927 / `ce4a105356b548cd8645eb4b1cc265269e1a46df373b9067a0978d690ebf397a` |
| [/blog/ai-content-creation](http://127.0.0.1:56433/blog/ai-content-creation/); [dist/blog/ai-content-creation/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/ai-content-creation/index.html) | 69318 / `42f45cf155a7b87159e2270a4915fd006bbec9d684961f589aa4dabba404d1a9` | 72286 / `7de744b35b76bb7b9e91e91b7061ed8c24c014d7b2dbaf0e98a1f143afdac3e1` |
| [/blog/ai-content-marketing-strategy](http://127.0.0.1:56433/blog/ai-content-marketing-strategy/); [dist/blog/ai-content-marketing-strategy/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/ai-content-marketing-strategy/index.html) | 42268 / `0835e730ab98ffa9921cf0e20111ec3647de2e23e6b2b31b50638038d2ab6643` | 42268 / `6e0435492a8af8ee83f04b769a22453570e699a58e72972d534cddd1915be528` |
| [/blog/ai-content-writing](http://127.0.0.1:56433/blog/ai-content-writing/); [dist/blog/ai-content-writing/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/ai-content-writing/index.html) | 60588 / `82ec8ef52cec504c7933f7245a746f243685194e4d26a62fafd36122ceb76d77` | 60619 / `977e5b7b8975bbe2e7be04d72a6b7e9477fd5d017de73318ebd2a1652f98449f` |
| [/blog/ai-facebook-post-generator](http://127.0.0.1:56433/blog/ai-facebook-post-generator/); [dist/blog/ai-facebook-post-generator/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/ai-facebook-post-generator/index.html) | 56174 / `f8116ed6129dc3a7d3819d2a46423b4e40dd89d909068589178d6335df24a8c7` | 56565 / `858e5ced21012812611f8df201c3f31901d721ed0ca139a5c5f4c755738183bf` |
| [/blog/ai-instagram-carousel-generator](http://127.0.0.1:56433/blog/ai-instagram-carousel-generator/); [dist/blog/ai-instagram-carousel-generator/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/ai-instagram-carousel-generator/index.html) | 141035 / `371bc9cc5733a90d067b950e0a9f335e4573482ffa43db87976d5a311fc9d939` | 141035 / `aa53ec95f602dbf6e73be3a54c0045d5ad448a5dc017470333d8519c0e122860` |
| [/blog/ai-instagram-post-generator](http://127.0.0.1:56433/blog/ai-instagram-post-generator/); [dist/blog/ai-instagram-post-generator/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/ai-instagram-post-generator/index.html) | 45089 / `fa004f196542cf5ab732e7b7cc2bf30232ba3e68e8aff01bb5ea2bd30fd53a38` | 45089 / `7054cda4971d38d47916269e28fb0aa5be54c89080bdaa95a20ce18524ff651a` |
| [/blog/ai-linkedin-carousel-strategy-for-b2b-founders](http://127.0.0.1:56433/blog/ai-linkedin-carousel-strategy-for-b2b-founders/); [dist/blog/ai-linkedin-carousel-strategy-for-b2b-founders/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/ai-linkedin-carousel-strategy-for-b2b-founders/index.html) | 49602 / `8996b5d9f7578ddebf843e704a3979d5f58f256e9719fdc821d3a74b59538580` | 49602 / `2fc9e627d2dd6678e7e995578514ee54be37397a3f8f0d059651f6bf3f9171be` |
| [/blog/ai-linkedin-post-generator](http://127.0.0.1:56433/blog/ai-linkedin-post-generator/); [dist/blog/ai-linkedin-post-generator/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/ai-linkedin-post-generator/index.html) | 55667 / `304d9f992480cd74edc2c14582e6c3078545b75778914103f1fe1d2dc31dfe79` | 55667 / `0e9bc3dbc3b67c3c6f68a570e95d555906c3075983abea45146d283790b5f85e` |
| [/blog/ai-social-media-manager](http://127.0.0.1:56433/blog/ai-social-media-manager/); [dist/blog/ai-social-media-manager/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/ai-social-media-manager/index.html) | 48957 / `8e73885aff2698c726e3e3395cc5bd8cfb0ec295c0121e8391e33a5f99b777d8` | 48951 / `f117958f148a734de57f7e5beb72cdf53e5daf51a38aad786ce079453f216e36` |
| [/blog/b2b-case-study-linkedin-carousel](http://127.0.0.1:56433/blog/b2b-case-study-linkedin-carousel/); [dist/blog/b2b-case-study-linkedin-carousel/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/b2b-case-study-linkedin-carousel/index.html) | 39413 / `8d6c91b59c65d1a5ad891ab7d98ed6206407c28963aaa6dcdfbf99de2ed53b0f` | 39413 / `f4eabe70dac69239e993088ce66c803642b7c5ab80743a041b4816600b08e2ea` |
| [/blog/best-ai-carousel-generators](http://127.0.0.1:56433/blog/best-ai-carousel-generators/); [dist/blog/best-ai-carousel-generators/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/best-ai-carousel-generators/index.html) | 97946 / `f6a01e936f365002ba388799ec31d7b83579f5ce766a7583148a05cad6b88634` | 97946 / `a0bff565df64a8c1ac60017fdf9bc8f93e58664ae3ad221a6eab03f90fb47e37` |
| [/blog/best-carousel-cta-examples](http://127.0.0.1:56433/blog/best-carousel-cta-examples/); [dist/blog/best-carousel-cta-examples/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/best-carousel-cta-examples/index.html) | 48013 / `ba9e6402b635fd6adf1f8b41f3c475664f21bda273b3f05626033f2a0df8619d` | 49112 / `b4ca1c982143775aad1d16fb5b7f4774ba704cbfc8c154f90710b21e13003562` |
| [/blog/best-free-ai-post-generators](http://127.0.0.1:56433/blog/best-free-ai-post-generators/); [dist/blog/best-free-ai-post-generators/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/best-free-ai-post-generators/index.html) | 41698 / `2ef7f38f51e4dc120b9fec9bb654a15d0f33aa22858f44110b53826a379550e6` | 41698 / `130116913fd6f405b1a2d5206ad14cb7d111d5c60db1e87ff3cd7d4afa3f6384` |
| [/blog/best-instagram-carousel-examples](http://127.0.0.1:56433/blog/best-instagram-carousel-examples/); [dist/blog/best-instagram-carousel-examples/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/best-instagram-carousel-examples/index.html) | 63366 / `8081220780510e8e7968ce45e13402213b6026148cb87948b2e10322d5c94a4a` | 63366 / `a2cf0b58a952874b5d7517f45f7a56e960e95130bd58945c4756eaa9cdfdad1c` |
| [/blog/best-linkedin-carousel-examples](http://127.0.0.1:56433/blog/best-linkedin-carousel-examples/); [dist/blog/best-linkedin-carousel-examples/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/best-linkedin-carousel-examples/index.html) | 55156 / `625b7802a9146590cfef88d8e7d3ca39e56b06e7366640c43205162867c7b55e` | 55156 / `d1ca03aba654d3d6e0d90d87d7f627db1b03d33b46f00da718cb172272b8e1ee` |
| [/blog/carousel-post-mistakes](http://127.0.0.1:56433/blog/carousel-post-mistakes/); [dist/blog/carousel-post-mistakes/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/carousel-post-mistakes/index.html) | 49325 / `b5e432d5d5f14c3a11092dc6ae87a4d730f19a80753b455fe3fc42d80eafd156` | 49327 / `60b5dc6473ed6a7a271ae4b90176c856c5c9132fc4885872fa4f7a464b6558e6` |
| [/blog/chatgpt-for-social-media-marketing](http://127.0.0.1:56433/blog/chatgpt-for-social-media-marketing/); [dist/blog/chatgpt-for-social-media-marketing/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/chatgpt-for-social-media-marketing/index.html) | 47439 / `15eaa2fa724bb81cbb15f275fbb9412f088601bb4e7f9e1e9f27565b95cfcd89` | 47619 / `20c6592fe46ba5aaffe60d982f198dc3c1751237332219d1bfbafeb93c70dbb7` |
| [/blog/content-calendar-to-carousel](http://127.0.0.1:56433/blog/content-calendar-to-carousel/); [dist/blog/content-calendar-to-carousel/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/content-calendar-to-carousel/index.html) | 38177 / `fdbf8dd889f770bfc471181da234d5f948d76195fa44a6613097b3bedaf15c9e` | 48215 / `d6a1f024fb9c3beb9d8fbb50bc15ccb7800444b6672fa633d22b6277203b3548` |
| [/blog/facebook-post-ideas-for-small-business](http://127.0.0.1:56433/blog/facebook-post-ideas-for-small-business/); [dist/blog/facebook-post-ideas-for-small-business/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/facebook-post-ideas-for-small-business/index.html) | 44576 / `ea9937be13b47097d8f2ac26765b58f473dc93eeec87c305efc7c7a02de230e9` | 45878 / `74988353a55b6f9df3bc2f01f6647f32f98aa72a6a41eb9b35ab2bb87d6becc8` |
| [/blog/guide-to-ai-social-media-post-generators](http://127.0.0.1:56433/blog/guide-to-ai-social-media-post-generators/); [dist/blog/guide-to-ai-social-media-post-generators/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/guide-to-ai-social-media-post-generators/index.html) | 42673 / `2dc20655866f5854fb424b7c61bc22a21a7dc6e196503b52e15d26c5a38d66ea` | 42669 / `d2767948e79353c7d371447cf046653cf74c22065b06a400f06998d33cf5660f` |
| [/blog/how-to-brainstorm-carousel-topics-with-ai](http://127.0.0.1:56433/blog/how-to-brainstorm-carousel-topics-with-ai/); [dist/blog/how-to-brainstorm-carousel-topics-with-ai/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/how-to-brainstorm-carousel-topics-with-ai/index.html) | 51902 / `4b0c6b4c3ce681b43206b8ba732fe6b3192c9bcdd04d6d93f456cac53bf4e5e7` | 51969 / `fd8d0832c064401f8482c9148f7c41e3cd81cf8de7d1977fb6f89904efa00692` |
| [/blog/how-to-build-a-personal-brand-on-linkedin-with-ai](http://127.0.0.1:56433/blog/how-to-build-a-personal-brand-on-linkedin-with-ai/); [dist/blog/how-to-build-a-personal-brand-on-linkedin-with-ai/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/how-to-build-a-personal-brand-on-linkedin-with-ai/index.html) | 47610 / `450d63427c9cea594609a79e54fe57b8c390bd8b1678edd8907ba667665773f7` | 47711 / `6ffe29cb7c4beab434e3e965489e7681139fad4090bf5677bda8cfcfb1c47d0e` |
| [/blog/how-to-increase-instagram-engagement-with-carousels](http://127.0.0.1:56433/blog/how-to-increase-instagram-engagement-with-carousels/); [dist/blog/how-to-increase-instagram-engagement-with-carousels/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/how-to-increase-instagram-engagement-with-carousels/index.html) | 47777 / `4d3456f68b16cd9be3d7b5b2bfcd883f84211f84896e2e1f977e23f0fd1fe0ef` | 48615 / `1a523acf77161b80697131835c39424217b30335111445254f0d6e85857caa61` |
| [/blog/how-to-make-an-instagram-carousel-with-ai](http://127.0.0.1:56433/blog/how-to-make-an-instagram-carousel-with-ai/); [dist/blog/how-to-make-an-instagram-carousel-with-ai/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/how-to-make-an-instagram-carousel-with-ai/index.html) | 55604 / `452bab743d151c0b518b8ea7ae01ba7dc69f26c9c4c98e365de6da334b71fcfa` | 57526 / `d1d9f4462215dcfbe0a75d8850184887a9d67dfd2729d37fe4c2e8ba26a0727b` |
| [/blog/how-to-make-linkedin-carousel-with-ai](http://127.0.0.1:56433/blog/how-to-make-linkedin-carousel-with-ai/); [dist/blog/how-to-make-linkedin-carousel-with-ai/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/how-to-make-linkedin-carousel-with-ai/index.html) | 92217 / `e12973d69224f93a83b36cc492eef762a6982fc9d6befe57c3d23b03e53e6914` | 95756 / `2493bef9748408db6456cde7eaa150e21b0b2d831f1379a0b179c4d2f714fb8d` |
| [/blog/how-to-post-a-carousel-on-linkedin](http://127.0.0.1:56433/blog/how-to-post-a-carousel-on-linkedin/); [dist/blog/how-to-post-a-carousel-on-linkedin/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/how-to-post-a-carousel-on-linkedin/index.html) | 43526 / `a38ef11a473ec81f4a96a7acb1cb1d666b0f4b0fcc3ee4cffb40435a9ef155f4` | 43526 / `3386b3ee1dcd3b87802f034eceda158d8ffa6ddd8569c877002555906c353e83` |
| [/blog/how-to-repurpose-podcasts-into-ai-carousels](http://127.0.0.1:56433/blog/how-to-repurpose-podcasts-into-ai-carousels/); [dist/blog/how-to-repurpose-podcasts-into-ai-carousels/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/how-to-repurpose-podcasts-into-ai-carousels/index.html) | 49410 / `ce36aaeac2a4269b6a5049c318705668af9c5dd3d5a42bbf1383cf1e7a2d120d` | 49423 / `f543acc9db7af7825ff386bc4ed683355398e0a583210400d4fd2c5b60c9e082` |
| [/blog/how-to-scale-your-smm-agency-with-ai](http://127.0.0.1:56433/blog/how-to-scale-your-smm-agency-with-ai/); [dist/blog/how-to-scale-your-smm-agency-with-ai/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/how-to-scale-your-smm-agency-with-ai/index.html) | 46835 / `dfb452415d721ba9199d4e74527aab75bb1711f42b172142d4c434d091099188` | 46783 / `2e43e54b7abdae5137b79dd876930aa598ecbb2d815699b79cf417a5d1b4cf84` |
| [/blog/how-to-schedule-linkedin-carousel](http://127.0.0.1:56433/blog/how-to-schedule-linkedin-carousel/); [dist/blog/how-to-schedule-linkedin-carousel/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/how-to-schedule-linkedin-carousel/index.html) | 53185 / `13bf28f1ae2c47ac02e4030cbb96d346c08dd102a8bd764044b97083e4ed8291` | 53145 / `bbdb92bfac61d0303679b2e878f56b55befa84405d2f7d83f09ede24329f98b5` |
| [/blog/how-to-write-a-b2b-linkedin-post](http://127.0.0.1:56433/blog/how-to-write-a-b2b-linkedin-post/); [dist/blog/how-to-write-a-b2b-linkedin-post/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/how-to-write-a-b2b-linkedin-post/index.html) | 44023 / `b116cba8405adc51a8e200cc9b26fb9080fe7e27d0fdd79242882c8d502a4b39` | 44023 / `2c273510fd5eb9952b5915df547c85721f5c3179d3d9faf73ebe2d297f3427b6` |
| [/blog/instagram-carousel-cover-ideas](http://127.0.0.1:56433/blog/instagram-carousel-cover-ideas/); [dist/blog/instagram-carousel-cover-ideas/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/instagram-carousel-cover-ideas/index.html) | 60136 / `10946281213f4ccc349abea86112a572f4ae8409d5648fe2666cc25c6aeabebc` | 60136 / `9a2e7cd8120aba5c3b77040ba379544538fb760769c9ca4e8fa584150c9d5af4` |
| [/blog/instagram-carousel-hooks](http://127.0.0.1:56433/blog/instagram-carousel-hooks/); [dist/blog/instagram-carousel-hooks/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/instagram-carousel-hooks/index.html) | 42444 / `8e04ef94267219b2c1063e3d2f952e5d6819f30e2cd0215cbe1c5959b30f4dde` | 42444 / `7e0242eb533c8b91d8f2423dfffa6af2d67e06e774cec9fe9530f73a025843c7` |
| [/blog/instagram-carousel-ideas](http://127.0.0.1:56433/blog/instagram-carousel-ideas/); [dist/blog/instagram-carousel-ideas/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/instagram-carousel-ideas/index.html) | 61255 / `910608f9e53f9349ef2d1237215692f52af41cfbaeb55ba926e1df9509e05d14` | 61272 / `a0ca5808e67e3b1c8484c305455fbca1b0b30633fb766fb87f56267f4804ac04` |
| [/blog/instagram-carousel-post](http://127.0.0.1:56433/blog/instagram-carousel-post/); [dist/blog/instagram-carousel-post/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/instagram-carousel-post/index.html) | 40022 / `3461d292ebcc2166df52041f2774a10cf3bd23e5773ba4a90492f0e3e53bd4e8` | 40022 / `86d5f20f7aa7443eb955da5f5baa9e93a5fa79dfe6e39a39e3fd460e7ec98948` |
| [/blog/instagram-carousel-prompts](http://127.0.0.1:56433/blog/instagram-carousel-prompts/); [dist/blog/instagram-carousel-prompts/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/instagram-carousel-prompts/index.html) | 78414 / `f08429ae196a7a36f4c6041a04408e0262dfc40cb512908e05016d06a4468663` | 78414 / `5f3f4c66d54ca9640e35ea8f899a1d1159123d8b75d8b8f8dd1929e0b9f44257` |
| [/blog/instagram-carousel-storytelling](http://127.0.0.1:56433/blog/instagram-carousel-storytelling/); [dist/blog/instagram-carousel-storytelling/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/instagram-carousel-storytelling/index.html) | 51215 / `06db389a94f813ee78b3033f23611a2852db90fa49b3d9fdf6fcc61b35383765` | 51578 / `8bdf7877b5d259b2c7f01f5c3f671bdc08a85c5739d96ee9869ce00419fad0d3` |
| [/blog/instagram-carousel-templates](http://127.0.0.1:56433/blog/instagram-carousel-templates/); [dist/blog/instagram-carousel-templates/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/instagram-carousel-templates/index.html) | 57015 / `64709b84cc9fcf3d74363aa1e7c02e296bcd80098060522d9e0445d84d0c69ed` | 57015 / `5fce59b20945f46107c8ba1bc7ed32904bb63a13e0907e68d944dbe8e385c661` |
| [/blog/instagram-post-size-guide](http://127.0.0.1:56433/blog/instagram-post-size-guide/); [dist/blog/instagram-post-size-guide/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/instagram-post-size-guide/index.html) | 54445 / `6e69a1e37aac0a43995325275ce2760f79c72eb5c816df87f8a81dd034c6f44e` | 54445 / `00a98ef59cebd09309a290e0e4c2f25d183819b5985b99bcbb809e9fa9c7cf41` |
| [/blog/linkedin-carousel-from-pdf-ai](http://127.0.0.1:56433/blog/linkedin-carousel-from-pdf-ai/); [dist/blog/linkedin-carousel-from-pdf-ai/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/linkedin-carousel-from-pdf-ai/index.html) | 42122 / `93c3a9e1b8a50cec8c6230577a64cf3eb5a4efea5ab326eae0dd9576308f80c5` | 42122 / `042a37b060c1ab630996ecc34dd40c8fc7bbefac6e676ca52747387052e92fc9` |
| [/blog/linkedin-carousel-hooks](http://127.0.0.1:56433/blog/linkedin-carousel-hooks/); [dist/blog/linkedin-carousel-hooks/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/linkedin-carousel-hooks/index.html) | 56558 / `1692a26aa2f3f2e612d3fa625c5c330e30daac34beaa379c833f0a0ed2602b26` | 57393 / `b59a6900ef78c2a638a39b2114435d29011fd6bee8e907de8f2de6d05515fb27` |
| [/blog/linkedin-carousel-ideas](http://127.0.0.1:56433/blog/linkedin-carousel-ideas/); [dist/blog/linkedin-carousel-ideas/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/linkedin-carousel-ideas/index.html) | 87753 / `371cd697a434acf7de80ef03f3edc7ec304cc30e0d273d428b90a70231a39b52` | 87758 / `00d1d3e23fcd0cb9bb03c4bf43d69d3a1626296602b5d1df29320d9f54c8efa1` |
| [/blog/linkedin-carousel-prompts](http://127.0.0.1:56433/blog/linkedin-carousel-prompts/); [dist/blog/linkedin-carousel-prompts/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/linkedin-carousel-prompts/index.html) | 95604 / `8f4217600e28d5484b6271935529c4d00f3241c6f15583a447015da71269ae51` | 95604 / `2bcc588f257570ef2a3076b19b679c91ef71749c53915055dda959cb95a1788f` |
| [/blog/linkedin-carousel-size-and-specs](http://127.0.0.1:56433/blog/linkedin-carousel-size-and-specs/); [dist/blog/linkedin-carousel-size-and-specs/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/linkedin-carousel-size-and-specs/index.html) | 44095 / `e0ae5ab596913641ef0fd2d070408ffe692075cbee5d81a59b78ac43e2643fdb` | 44108 / `b1d0e96d65f7bb67f23e38b17ab9b84b81ee02d7b2223211797136812058bfe1` |
| [/blog/linkedin-content-strategy-for-founders](http://127.0.0.1:56433/blog/linkedin-content-strategy-for-founders/); [dist/blog/linkedin-content-strategy-for-founders/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/linkedin-content-strategy-for-founders/index.html) | 48341 / `60ca099fa7a492cfa4228170d58b854a40a1f300268987d60a2f5b8c81077568` | 49240 / `2366296efc10e405bf18554e2bcf6378250a632b865375bffcf352026d1e1832` |
| [/blog/linkedin-creator-tools-guide](http://127.0.0.1:56433/blog/linkedin-creator-tools-guide/); [dist/blog/linkedin-creator-tools-guide/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/linkedin-creator-tools-guide/index.html) | 47920 / `7cdb37a4b7661e7b77e63bd5bda21c97f07a49a7bd066b690d4a6f61452d34ca` | 48278 / `e63e8ded099d89d17c7c47fc0d8e1659c49c2b2caa99a6b7459b98706b7a06d1` |
| [/blog/linkedin-document-post-examples](http://127.0.0.1:56433/blog/linkedin-document-post-examples/); [dist/blog/linkedin-document-post-examples/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/linkedin-document-post-examples/index.html) | 46210 / `0421acd7108142a29b2f190420448ffa3bd59e0459001e4d3205e169a49410df` | 46306 / `67c492badebbe7218edd16252c240a895d45229b28568ba16ad65ce99834d59c` |
| [/blog/linkedin-pdf-carousel](http://127.0.0.1:56433/blog/linkedin-pdf-carousel/); [dist/blog/linkedin-pdf-carousel/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/linkedin-pdf-carousel/index.html) | 42209 / `8ee33bc0174ed4251a7a886a37d73100660d8a01606b98c54fe89c6cb81d0d1f` | 42228 / `28f8f9da753b6a7c654b238e14bda22337060b39b834125e96d609e66e7c77b4` |
| [/blog/repurpose-blog-post-linkedin-carousel-ai](http://127.0.0.1:56433/blog/repurpose-blog-post-linkedin-carousel-ai/); [dist/blog/repurpose-blog-post-linkedin-carousel-ai/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/repurpose-blog-post-linkedin-carousel-ai/index.html) | 65870 / `fc2fe5411e41c47605cbb5e4e34478da87d46e06059fdc2fb0bc2b302b5bb6eb` | 65870 / `aca320e9c96ff41ff26b2d90f7983f65b677d6c4b19fb2b0743283c4a1710411` |
| [/blog/social-media-post-ideas-for-business](http://127.0.0.1:56433/blog/social-media-post-ideas-for-business/); [dist/blog/social-media-post-ideas-for-business/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/social-media-post-ideas-for-business/index.html) | 54140 / `76fcbf79178ccd2f37f77773b1f43b89afa0e8def3aeae121d57868159c0758b` | 54194 / `d1d7ae11dc6dd838348e5617b5db3c792401e45b0268d9a4dc3618ac2078fe46` |
| [/blog/text-to-carousel-ai](http://127.0.0.1:56433/blog/text-to-carousel-ai/); [dist/blog/text-to-carousel-ai/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/text-to-carousel-ai/index.html) | 40053 / `85c9a3551638cb2f8175126ec489445952076b68ab48f752888442eefbd5700f` | 46757 / `9dd14643a3e100f5d0b58f2c08e4b967166ad1b4470f68799549f47b4e33d056` |
| [/blog/turn-video-into-carousel-with-ai](http://127.0.0.1:56433/blog/turn-video-into-carousel-with-ai/); [dist/blog/turn-video-into-carousel-with-ai/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/turn-video-into-carousel-with-ai/index.html) | 50714 / `15f5b525c3530cb2334f1c35fb000d0eb47b322f5f4c42f26b1674bdd577418f` | 50714 / `d6870612b3d67303b67a749ec2cfa7b47012dc2980e5487c7a5385bfeab09371` |
| [/blog/viral-linkedin-post-examples](http://127.0.0.1:56433/blog/viral-linkedin-post-examples/); [dist/blog/viral-linkedin-post-examples/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/viral-linkedin-post-examples/index.html) | 53526 / `07bcaa0a68cc7053d9750f6c502ed532e23409474ff49cb0e77ac24f53fe9787` | 53926 / `f79a11e0dc283ae8d64b76f4169e3c2d4704c7dbe3ebd548bf3bdda10a03fe5f` |
| [/blog/youtube-to-linkedin-carousel-ai](http://127.0.0.1:56433/blog/youtube-to-linkedin-carousel-ai/); [dist/blog/youtube-to-linkedin-carousel-ai/index.html](/private/tmp/gtf-google-indexation-recovery/dist/blog/youtube-to-linkedin-carousel-ai/index.html) | 47342 / `6576cddd16adbd6375b995a506792ae459cad930c677f7a5f67cfe54e135c965` | 47342 / `21310567f3859ba97612aa36325995fa77834027a8f1766662d474d96f1bf1ad` |
| [/carousel-maker](http://127.0.0.1:56433/carousel-maker/); [dist/carousel-maker/index.html](/private/tmp/gtf-google-indexation-recovery/dist/carousel-maker/index.html) | 172364 / `69d47fcac55f86ae0e0f73acba4bd7743ace9ac0e231905931532928f5706068` | 109621 / `6b96745b3fbe8f62a72772a4aa9446e83a048fd6ea299c1cfe5ac59da4756b6d` |
| [/carousel/create](http://127.0.0.1:56433/carousel/create/); [dist/carousel/create/index.html](/private/tmp/gtf-google-indexation-recovery/dist/carousel/create/index.html) | 172362 / `f2345e2b15a41af4ec75959f904db1b000651c9d6c748ca277b33367211bb59e` | 109621 / `d29e49f008f1cd9c0f9130fbdbffc44c338c36435a594e09d60323c0e1957a1e` |
| [/instagram-carousel-maker](http://127.0.0.1:56433/instagram-carousel-maker/); [dist/instagram-carousel-maker/index.html](/private/tmp/gtf-google-indexation-recovery/dist/instagram-carousel-maker/index.html) | 168689 / `264d77e569c181adf5542fca11fec8b94f3865c235f47c305c8c026c1e79aafe` | 105948 / `a07dc2850ab7a34a1c2624eb580b2328c2842b1828d93a4231199e59b9ad6ce7` |
| [/linkedin-carousel-maker](http://127.0.0.1:56433/linkedin-carousel-maker/); [dist/linkedin-carousel-maker/index.html](/private/tmp/gtf-google-indexation-recovery/dist/linkedin-carousel-maker/index.html) | 170827 / `ab467c3405ae2b979e69af21bd2d98dbe489e990ab5e59fba2c3fa39a66a21c8` | 107782 / `9588d7e90da65c465caed2d295954aef5a5dbcde1da2e7bff73117fb5687e4f1` |
| [/linkedin-post-generator](http://127.0.0.1:56433/linkedin-post-generator/); [dist/linkedin-post-generator/index.html](/private/tmp/gtf-google-indexation-recovery/dist/linkedin-post-generator/index.html) | 115819 / `c0bcf6ca592da3a7b9d8ecb4b7063c48be89aa34460fd8eaf71869318b294a31` | 115819 / `984aeeb876d7de3fa1e4828a541299554b53a82902d4096adfbdb799554b3553` |
| [/personal-data-consent](http://127.0.0.1:56433/personal-data-consent/); [dist/personal-data-consent/index.html](/private/tmp/gtf-google-indexation-recovery/dist/personal-data-consent/index.html) | 31061 / `ec881888d2638b839a13f183bfd8a53586da125843fbb18ba5e7e5f609ce40c5` | 31061 / `00504f90987cec8b39b28e6b42db65f1a09da450df9d955dc87caf75b3854994` |
| [/politika](http://127.0.0.1:56433/politika/); [dist/politika/index.html](/private/tmp/gtf-google-indexation-recovery/dist/politika/index.html) | 38639 / `20cb2db431788a3ab5e7fa0232b2674dfd4eb17cfd2dd50f55d83806e4856d0b` | 38639 / `2172be6d5b4ffb4382d0d636fd60fdf938bd21c6acc180554e73c5ca94124e4c` |
| [/pricing](http://127.0.0.1:56433/pricing/); [dist/pricing/index.html](/private/tmp/gtf-google-indexation-recovery/dist/pricing/index.html) | 42239 / `34504c8ca985019d6439ed520a9e21a1483b46661d9b1cdb03be210b2e81a3c9` | 42239 / `97edeff58677737cceaa458e6186b1571c427997090567210d5206afe70c1928` |
| [/privacy-policy](http://127.0.0.1:56433/privacy-policy/); [dist/privacy-policy/index.html](/private/tmp/gtf-google-indexation-recovery/dist/privacy-policy/index.html) | 43153 / `46a437c78cb7391b4bdf0100e8b5aebd3839607a82b1683eacee20009e5eb38b` | 43153 / `9ed9ac1d07137aed7c93b06b40fb6d15e7b192dfebcfe9bae15329814654c0f1` |
| [/refund-policy](http://127.0.0.1:56433/refund-policy/); [dist/refund-policy/index.html](/private/tmp/gtf-google-indexation-recovery/dist/refund-policy/index.html) | 33750 / `2852c8af79b0bf2fcc57b82b9a31a36a7c99a6bba684c722120efbe0328db3e0` | 33750 / `59db1cf712729a0dd3607af33165a32d17e366ec916967f96a5115cea4e4f1f9` |
| [/ru](http://127.0.0.1:56433/ru/); [dist/ru/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/index.html) | 259090 / `f9784e6d2a3b4e5155fb140d7a58124a61c78b4271ea9c30d1d6bb686daa0ae8` | 157246 / `c2dcab21db79a3a3cb81624df71bf08ac28c16e04ebee5c93c84b7f0f137ff9f` |
| [/ru/ai-generator-karuselej](http://127.0.0.1:56433/ru/ai-generator-karuselej/); [dist/ru/ai-generator-karuselej/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/ai-generator-karuselej/index.html) | 203702 / `dba573b944186917f507cd85d13a2bfbff707f49f5061da7cb77399a55751194` | 203703 / `e4f1112573bcd2dde60828d3f18a17f73f0f73418cfd6111e5f50a554021f4a0` |
| [/ru/alternatives/canva-dlya-karuseley](http://127.0.0.1:56433/ru/alternatives/canva-dlya-karuseley/); [dist/ru/alternatives/canva-dlya-karuseley/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/alternatives/canva-dlya-karuseley/index.html) | 131712 / `8bcaee64ed4e154b8d13df9cb27d327a056b992874a9df4912d606fee556e1d4` | 131712 / `ccd5cad3b6046fd21962b6f20e8117dc9a304c7201595eb8809a2828b40e0f52` |
| [/ru/alternatives/chatgpt-dlya-karuseley](http://127.0.0.1:56433/ru/alternatives/chatgpt-dlya-karuseley/); [dist/ru/alternatives/chatgpt-dlya-karuseley/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/alternatives/chatgpt-dlya-karuseley/index.html) | 130082 / `a32dfe5fceb3ae04303ee7aecc094f7f67b4bbd90a08ecb134dddc5315251189` | 130082 / `66b123d988254190c4606f442eba6197504f2c3c180488bba14ed6dcbc45f140` |
| [/ru/blog](http://127.0.0.1:56433/ru/blog/); [dist/ru/blog/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/index.html) | 225659 / `3ee1730ce4d19809b45cd588cd4d53be501dda6f35f8c15f9226b99967cf81ee` | 225646 / `a735940279b45599a47ba38877024ddbc9f6498652d10a3e79b809b967219d79` |
| [/ru/blog/algoritm-instagram-karuseli](http://127.0.0.1:56433/ru/blog/algoritm-instagram-karuseli/); [dist/ru/blog/algoritm-instagram-karuseli/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/algoritm-instagram-karuseli/index.html) | 67719 / `ad3009e56e93c771e99adef71635d2ce32f3d70ac46daac402a97a9503445bf5` | 67719 / `d623356c8550480ed655043f5deeba8166d7a5a0cafd822b952575d917a78379` |
| [/ru/blog/analiz-kontenta-konkurentov-v-socsetyah](http://127.0.0.1:56433/ru/blog/analiz-kontenta-konkurentov-v-socsetyah/); [dist/ru/blog/analiz-kontenta-konkurentov-v-socsetyah/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/analiz-kontenta-konkurentov-v-socsetyah/index.html) | 71419 / `ef8f64f8d2fc2dfec0f4a1bdd91f3932bf7f0fa772fc431505efe09d549cec6e` | 71419 / `1a585b549c76c5ac66cfa9196397085a1047242a02226c6ef8f2f748ab429ad6` |
| [/ru/blog/animaciya-v-karuselyah-instagram](http://127.0.0.1:56433/ru/blog/animaciya-v-karuselyah-instagram/); [dist/ru/blog/animaciya-v-karuselyah-instagram/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/animaciya-v-karuselyah-instagram/index.html) | 53374 / `6aad5355394974debb2f62ef6d02159daa4f90e7076549c6a5c9023c10497da9` | 53374 / `6d75ad7464e01137e93d840e2c2358eebe0e08e3414fcba6a8101e9c0a3099fa` |
| [/ru/blog/audit-kontenta-dlya-socsetey](http://127.0.0.1:56433/ru/blog/audit-kontenta-dlya-socsetey/); [dist/ru/blog/audit-kontenta-dlya-socsetey/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/audit-kontenta-dlya-socsetey/index.html) | 69086 / `5f599d7663e09d3cbe61cc56ff7d8b4540ce3f6926ba342b2128ff88423e4427` | 69086 / `a63d7c7a9c1c3985c27fac8832020df0c8d9f2c88ee19c97786358a70f63662e` |
| [/ru/blog/avtovoronka-v-instagram-cherez-karuseli](http://127.0.0.1:56433/ru/blog/avtovoronka-v-instagram-cherez-karuseli/); [dist/ru/blog/avtovoronka-v-instagram-cherez-karuseli/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/avtovoronka-v-instagram-cherez-karuseli/index.html) | 56337 / `6e3b4e1e119043070b4bb6125e2c72b652ef25a2f103df7ce967af20136f623c` | 56337 / `d111c778d02d9b21c67a5f4519b4b8c384ab5b74d7ed4434685bc4c2599da52e` |
| [/ru/blog/b2b-keysy-v-linkedin-karusel](http://127.0.0.1:56433/ru/blog/b2b-keysy-v-linkedin-karusel/); [dist/ru/blog/b2b-keysy-v-linkedin-karusel/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/b2b-keysy-v-linkedin-karusel/index.html) | 43744 / `d37d8ddc69969aeb3830e684e1bfa7edc97f9a7b782a5f2dbd1c24d1a937c8ac` | 43744 / `0299938dae938185e2f2741014433f1400b5854d0ac8e0460843a736ab61228a` |
| [/ru/blog/b2b-kontent-dlya-socsetey](http://127.0.0.1:56433/ru/blog/b2b-kontent-dlya-socsetey/); [dist/ru/blog/b2b-kontent-dlya-socsetey/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/b2b-kontent-dlya-socsetey/index.html) | 71343 / `5ad1b92dd7d826112c3417715ad35eabd74b603e81e62bf3e238c9dfc02d7b4c` | 71343 / `77bf954b868c89016cbe4dc4ab8168a684d7e5882fdd8ce94ea26c6caefd6d44` |
| [/ru/blog/besshovnaya-karusel-v-instagram](http://127.0.0.1:56433/ru/blog/besshovnaya-karusel-v-instagram/); [dist/ru/blog/besshovnaya-karusel-v-instagram/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/besshovnaya-karusel-v-instagram/index.html) | 51562 / `691e6108747d8d16563342d38410f12f70fde7a4c9c4656b1af0b8b05a4154e7` | 51562 / `7446abf2806ed8a5555dbddcf9da5ee44b3389fe540534a7a6efc44db6005e36` |
| [/ru/blog/chatgpt-prompty-dlya-kopirajtera](http://127.0.0.1:56433/ru/blog/chatgpt-prompty-dlya-kopirajtera/); [dist/ru/blog/chatgpt-prompty-dlya-kopirajtera/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/chatgpt-prompty-dlya-kopirajtera/index.html) | 60615 / `e82cf9b3964e0b22aed22f44e3f79a2f072da0666217485045eb69ceefb9854b` | 60615 / `bddd131852707b0672ff61e4f6882f315b5e70bf0b02264074c62754b84b79ca` |
| [/ru/blog/chitabelnost-teksta-v-karuselyah](http://127.0.0.1:56433/ru/blog/chitabelnost-teksta-v-karuselyah/); [dist/ru/blog/chitabelnost-teksta-v-karuselyah/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/chitabelnost-teksta-v-karuselyah/index.html) | 68339 / `01949fb1fee5549b14a31c01d62e04446b0c6a8bbb332cc79faadb6d4fbd3d5c` | 68339 / `52ee72995c95b07f1ec0c35eab49b1ec252bc795f26ddc4176a94a0e2898c1cb` |
| [/ru/blog/chto-takoe-karusel-v-instagram](http://127.0.0.1:56433/ru/blog/chto-takoe-karusel-v-instagram/); [dist/ru/blog/chto-takoe-karusel-v-instagram/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/chto-takoe-karusel-v-instagram/index.html) | 47185 / `494b5e9856aabbf78435a8b5e9af068fbcbab78428de549f3ff28bcc1ead3fa1` | 47185 / `3126ba6bc271a7c66151434f4877b458b713a522dc8efea90bfdf6c25b0fae63` |
| [/ru/blog/cta-dlya-karuseley-instagram-s-ii](http://127.0.0.1:56433/ru/blog/cta-dlya-karuseley-instagram-s-ii/); [dist/ru/blog/cta-dlya-karuseley-instagram-s-ii/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/cta-dlya-karuseley-instagram-s-ii/index.html) | 55144 / `b7f2409b67863788d772da47a573caf2b290f50caa2d64abc201363743d6dc46` | 55144 / `7c32759298b52d44fe822f4ec87a2c6f82de6e184941a33731dde124ea5a42bf` |
| [/ru/blog/dizayn-karuseley-neyroset-vs-canva](http://127.0.0.1:56433/ru/blog/dizayn-karuseley-neyroset-vs-canva/); [dist/ru/blog/dizayn-karuseley-neyroset-vs-canva/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/dizayn-karuseley-neyroset-vs-canva/index.html) | 59740 / `2c77c73626030b8a80543f971ff82d1f9b59efda08ed8629ff4b0aac0d375957` | 60160 / `087335aa77105a1374dab0b04ffd532383cab59043cbd8b7b1c45a69bdab5921` |
| [/ru/blog/foto-dlya-posta-instagram-vizual-s-ii](http://127.0.0.1:56433/ru/blog/foto-dlya-posta-instagram-vizual-s-ii/); [dist/ru/blog/foto-dlya-posta-instagram-vizual-s-ii/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/foto-dlya-posta-instagram-vizual-s-ii/index.html) | 60861 / `1a2dda78aa048c63725dec8cec32ff7d698b732b4db8344ccea6021494677e27` | 61424 / `5bde4fe549b751d99c743cc555e23f9b500c250b7e6926f9fe24010da08d7a12` |
| [/ru/blog/gde-delat-posty-karuseli-s-ii](http://127.0.0.1:56433/ru/blog/gde-delat-posty-karuseli-s-ii/); [dist/ru/blog/gde-delat-posty-karuseli-s-ii/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/gde-delat-posty-karuseli-s-ii/index.html) | 93366 / `44e2445edc656b4a8f859e33ece8acaf39345c8e5eae87f244aff8b90fb1ef92` | 93366 / `b216ed24aa77ebf2a71d9d2d681642cf05ccce843da82fe3a71272e4b1560e56` |
| [/ru/blog/generaciya-postov-karuseley](http://127.0.0.1:56433/ru/blog/generaciya-postov-karuseley/); [dist/ru/blog/generaciya-postov-karuseley/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/generaciya-postov-karuseley/index.html) | 60656 / `b5afdb29893d0ad7998f88b68bca884d94a8bb7a7947bdb3ae1cc67313f663f1` | 60720 / `fd1ec710d8c51f7ba06042a6e1f48b2eba1bff1a0ff780b5a2ab5a09db30604b` |
| [/ru/blog/generator-karuseley-dlya-vk](http://127.0.0.1:56433/ru/blog/generator-karuseley-dlya-vk/); [dist/ru/blog/generator-karuseley-dlya-vk/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/generator-karuseley-dlya-vk/index.html) | 61583 / `22085cc75bdb82c09a8b6dfc762546586c1f0ae123dfb4a3dc882f500958418b` | 61583 / `ca7861da548a07c52e8140a167fa6af33ba211c0bc9cd8d6ca285ee3ce2e47b4` |
| [/ru/blog/generator-vizualnyh-postov-ai](http://127.0.0.1:56433/ru/blog/generator-vizualnyh-postov-ai/); [dist/ru/blog/generator-vizualnyh-postov-ai/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/generator-vizualnyh-postov-ai/index.html) | 64568 / `a1bbf02a4a7a9bfac65db2ee33a663d7277930086c47ece396f58ff7d1e449d4` | 64568 / `badd4271f0d2f03af3254fe1c70237321c8d7a730707f746cda2a2520e187490` |
| [/ru/blog/gorizontalnye-i-vertikalnye-foto-v-karuseli](http://127.0.0.1:56433/ru/blog/gorizontalnye-i-vertikalnye-foto-v-karuseli/); [dist/ru/blog/gorizontalnye-i-vertikalnye-foto-v-karuseli/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/gorizontalnye-i-vertikalnye-foto-v-karuseli/index.html) | 60721 / `72f6cc669e85c67842cbea951bfdf2ee927eb329d4c6ae2e3e7ff9d709fd4e94` | 60721 / `601ddb9f36f7ac641ea2b687a4b59a20e0727a7d9b3315144371323ff3987a8b` |
| [/ru/blog/huki-dlya-karuseli-instagram](http://127.0.0.1:56433/ru/blog/huki-dlya-karuseli-instagram/); [dist/ru/blog/huki-dlya-karuseli-instagram/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/huki-dlya-karuseli-instagram/index.html) | 59758 / `1c2d079307fb823571fad6d753cc653c4031370dd30fbe7853c203eb4c280409` | 59758 / `b59dfc83fb7bdd5a018d7f2010f7ac162dd196f91e8e554a090894bb16030eb8` |
| [/ru/blog/idei-dlya-karuseli-instagram](http://127.0.0.1:56433/ru/blog/idei-dlya-karuseli-instagram/); [dist/ru/blog/idei-dlya-karuseli-instagram/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/idei-dlya-karuseli-instagram/index.html) | 68660 / `b324e85fdbc1a54bd7c44f4be0439a6a61b77935bd3569f215e5d910ac33e8c6` | 68660 / `e1f96adbb2c90f6b8362b3103a6e298146e62e19b891e97e81710c4ac02dda3d` |
| [/ru/blog/idei-karuselej-linkedin](http://127.0.0.1:56433/ru/blog/idei-karuselej-linkedin/); [dist/ru/blog/idei-karuselej-linkedin/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/idei-karuselej-linkedin/index.html) | 72165 / `5514377705e4fc2a704ee98ca9e6009b1d57411b7439aebc08fdfbc200f4e1b4` | 72165 / `3f047ad265bcd49f9e87a236355fff1ad9326e5540a0bcf064e623d439a072c5` |
| [/ru/blog/ii-dlya-karuseley](http://127.0.0.1:56433/ru/blog/ii-dlya-karuseley/); [dist/ru/blog/ii-dlya-karuseley/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/ii-dlya-karuseley/index.html) | 52303 / `0f6f12b86d9f8feaf6794409ce79d2552aa53065fcb212343d85a25ab36fe8b0` | 52303 / `a7d93440ad4b24e967b221b5a988a2a07945cd56f8a76a1f3ded37751461b461` |
| [/ru/blog/ii-post-dlya-socsetej](http://127.0.0.1:56433/ru/blog/ii-post-dlya-socsetej/); [dist/ru/blog/ii-post-dlya-socsetej/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/ii-post-dlya-socsetej/index.html) | 76428 / `77b1d3ba85fb19bc70c71e289e2136fbccc548f6525088c6745615d2d1102966` | 76414 / `49960cb90fd0d4555b89770435d5ecd189962dc9e2411a32810447eb5a7aefd4` |
| [/ru/blog/ii-tekst-dlya-posta](http://127.0.0.1:56433/ru/blog/ii-tekst-dlya-posta/); [dist/ru/blog/ii-tekst-dlya-posta/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/ii-tekst-dlya-posta/index.html) | 63925 / `e5e4cba5077e3db0775a0049b9f93dc994ea076a118794cdde1f167dc78ba6b1` | 63925 / `ad3ce3a60030437e90dd73f111f1727fd4a1652f2d94e11ed0a3fb477e46f1c5` |
| [/ru/blog/infografika-dlya-socsetey](http://127.0.0.1:56433/ru/blog/infografika-dlya-socsetey/); [dist/ru/blog/infografika-dlya-socsetey/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/infografika-dlya-socsetey/index.html) | 71238 / `9ac6e221de99c7d03a31c2d05eae85fc9a97fab9f83b7227a5f1a6727016ed6b` | 71238 / `d98c7e006bfa579fc4f65c364c47665d74d3f9357765427c3b95bab1ac24f49d` |
| [/ru/blog/kak-ispolzovat-midjourney-dlya-postov](http://127.0.0.1:56433/ru/blog/kak-ispolzovat-midjourney-dlya-postov/); [dist/ru/blog/kak-ispolzovat-midjourney-dlya-postov/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/kak-ispolzovat-midjourney-dlya-postov/index.html) | 69736 / `87b8c5df6d6212366cbd3973a40861bcd6f4985a5461102cc30453a93442af05` | 69736 / `f55c2b1ba595f717dd85ecd34db51d55e0584c895b0de4e0170306a2f392689c` |
| [/ru/blog/kak-napisat-ekspertnyj-post](http://127.0.0.1:56433/ru/blog/kak-napisat-ekspertnyj-post/); [dist/ru/blog/kak-napisat-ekspertnyj-post/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/kak-napisat-ekspertnyj-post/index.html) | 47922 / `7190062c91c90c7e5ce2dcfceac683fd8684226716d9965ba4904f88e2919022` | 48471 / `639500c28475d22d2ccbb249f2c780a98300bee96d7445db211d4da3f342121f` |
| [/ru/blog/kak-napisat-post-v-vk-s-pomoshyu-ii](http://127.0.0.1:56433/ru/blog/kak-napisat-post-v-vk-s-pomoshyu-ii/); [dist/ru/blog/kak-napisat-post-v-vk-s-pomoshyu-ii/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/kak-napisat-post-v-vk-s-pomoshyu-ii/index.html) | 49191 / `46bb5da29cf73feff3bdbea59dbcffc99105f0c7dee9d14f7f1d341b92f50a20` | 50693 / `c6c420654ac01219500f78515f6ef69473713fb51a6fb031ae1212dbe4d1d912` |
| [/ru/blog/kak-narezat-foto-dlya-karuseli](http://127.0.0.1:56433/ru/blog/kak-narezat-foto-dlya-karuseli/); [dist/ru/blog/kak-narezat-foto-dlya-karuseli/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/kak-narezat-foto-dlya-karuseli/index.html) | 61666 / `4c7ef52a2033a61d752f780bd3f828f6064d0db0c6bdaff79b834290b48b7869` | 61666 / `12232701c5bdcd7f88bb7662149b2234aa7b9a1b737062db20f18fa011cf8008` |
| [/ru/blog/kak-oformit-keys-v-instagram](http://127.0.0.1:56433/ru/blog/kak-oformit-keys-v-instagram/); [dist/ru/blog/kak-oformit-keys-v-instagram/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/kak-oformit-keys-v-instagram/index.html) | 47939 / `131e1c53e4e028de9dbd6a15298ddb315036f45cfe65a4e3f8d80468cded2751` | 47939 / `1538045fa4fbef8105433b13d23f48f658807d9f19fc0657023c491ec55434ff` |
| [/ru/blog/kak-peredelat-statyu-v-karusel-linkedin](http://127.0.0.1:56433/ru/blog/kak-peredelat-statyu-v-karusel-linkedin/); [dist/ru/blog/kak-peredelat-statyu-v-karusel-linkedin/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/kak-peredelat-statyu-v-karusel-linkedin/index.html) | 58748 / `c016316c6c4f33ceb63128d2073fd3a5b52c04a74b642bb957a65f732a7f5a0c` | 59097 / `ea9ac29b11fe04d9d40572f6a7ce7e7b7e0d293a7daaa8b848c05ba88790982c` |
| [/ru/blog/kak-peredelat-youtube-v-karusel-linkedin](http://127.0.0.1:56433/ru/blog/kak-peredelat-youtube-v-karusel-linkedin/); [dist/ru/blog/kak-peredelat-youtube-v-karusel-linkedin/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/kak-peredelat-youtube-v-karusel-linkedin/index.html) | 53918 / `b1361ca3e826472973f946882e544c4826ad831e0809da3500a7c110e5b47725` | 53918 / `8252c2f716a213e4cde5114dd955caf51f7007e88617cc7003c35ce53a1db34b` |
| [/ru/blog/kak-pisat-prodayushchie-posty-s-ii](http://127.0.0.1:56433/ru/blog/kak-pisat-prodayushchie-posty-s-ii/); [dist/ru/blog/kak-pisat-prodayushchie-posty-s-ii/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/kak-pisat-prodayushchie-posty-s-ii/index.html) | 52301 / `8a39ec80c9bfe67de88be4233503c49639bb3d9bec9dee54693a702d652aefda` | 54189 / `53cadc3b9cad6e6963d7fb66ed06e64aed93555e83b0f58150f2e2ac159f9599` |
| [/ru/blog/kak-povisit-ohvaty-v-instagram-s-pomoshyu-karuseley](http://127.0.0.1:56433/ru/blog/kak-povisit-ohvaty-v-instagram-s-pomoshyu-karuseley/); [dist/ru/blog/kak-povisit-ohvaty-v-instagram-s-pomoshyu-karuseley/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/kak-povisit-ohvaty-v-instagram-s-pomoshyu-karuseley/index.html) | 47203 / `6c106f488e876a649bdd31b9796feb9ca9a8ce4c7b2593ac50810e4325eef128` | 47203 / `d194829004c088d031c476b715f0fc460310b6959bf6e54d35531425cc0208f6` |
| [/ru/blog/kak-pridumat-temu-dlya-karuseli-s-ii](http://127.0.0.1:56433/ru/blog/kak-pridumat-temu-dlya-karuseli-s-ii/); [dist/ru/blog/kak-pridumat-temu-dlya-karuseli-s-ii/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/kak-pridumat-temu-dlya-karuseli-s-ii/index.html) | 56249 / `e5885ebb2327df02b4782c11c7d622afdb4a3b33fb47c8b8bd1217ed6ea90f3e` | 56249 / `10bc4a5c512702cfe2c3d30058bf1d1d2917abd41768c6726518ab039083ae43` |
| [/ru/blog/kak-sdelat-karusel-dlya-instagram-s-ii](http://127.0.0.1:56433/ru/blog/kak-sdelat-karusel-dlya-instagram-s-ii/); [dist/ru/blog/kak-sdelat-karusel-dlya-instagram-s-ii/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/kak-sdelat-karusel-dlya-instagram-s-ii/index.html) | 73884 / `7bba8073afc74e8578752247245694123224211bc88b00b20787fac3952cc602` | 73884 / `9eed3fd90455a9ca3c207064a61f61e54d0f65ba326225eb626f439d755e739f` |
| [/ru/blog/kak-sdelat-karusel-iz-video-s-ii](http://127.0.0.1:56433/ru/blog/kak-sdelat-karusel-iz-video-s-ii/); [dist/ru/blog/kak-sdelat-karusel-iz-video-s-ii/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/kak-sdelat-karusel-iz-video-s-ii/index.html) | 59396 / `da37a2ff2e233a0ddbbef4c009bc094a08bf9dff098c5b96dafb28cbab67fb4d` | 59396 / `fe772eb0a95808f4e95abd482eb8b39d77e9563f43a78f820812b0b9f692e245` |
| [/ru/blog/kak-sdelat-karusel-linkedin-s-ai](http://127.0.0.1:56433/ru/blog/kak-sdelat-karusel-linkedin-s-ai/); [dist/ru/blog/kak-sdelat-karusel-linkedin-s-ai/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/kak-sdelat-karusel-linkedin-s-ai/index.html) | 127337 / `f32bb506c6c103da204731c417a60e001be107e7e91b180790d54cd09b3ce812` | 128440 / `703f3fddc169e9408da318af846c8cb249cfbf46054e8ff0d2ad691e047175ce` |
| [/ru/blog/kak-sdelat-post-v-instagram-s-ii](http://127.0.0.1:56433/ru/blog/kak-sdelat-post-v-instagram-s-ii/); [dist/ru/blog/kak-sdelat-post-v-instagram-s-ii/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/kak-sdelat-post-v-instagram-s-ii/index.html) | 60352 / `fada86461fb94b67c0297998adfc4a22aa7efa66ec6c89d6b4cc2857d1ce9928` | 62148 / `6e99ded86d089b87467ae42c67564e352c1f95690bf3825843521739585e54d6` |
| [/ru/blog/kak-sdelat-shablon-dlya-postov-v-canva](http://127.0.0.1:56433/ru/blog/kak-sdelat-shablon-dlya-postov-v-canva/); [dist/ru/blog/kak-sdelat-shablon-dlya-postov-v-canva/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/kak-sdelat-shablon-dlya-postov-v-canva/index.html) | 54536 / `f8174d3d6d7cd41ef2a3cb356eed75b60db7bbfe8ab8a3cabe425ffa48ae73f6` | 58714 / `118959c6ff4c4024e9817134839ddadb132fa821888f9941456c4f85376cba0b` |
| [/ru/blog/kak-sostavit-kontent-plan-s-pomoshyu-chatgpt](http://127.0.0.1:56433/ru/blog/kak-sostavit-kontent-plan-s-pomoshyu-chatgpt/); [dist/ru/blog/kak-sostavit-kontent-plan-s-pomoshyu-chatgpt/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/kak-sostavit-kontent-plan-s-pomoshyu-chatgpt/index.html) | 68072 / `d34b52010fe3f767e61aec141ae2a4a13784d3277804f4e5ed8b62f44f8eb6ce` | 68072 / `08d3cb5f47dc2afcf41f45dd3a99513b346661487231ea2f8c625c6aad4755c6` |
| [/ru/blog/kak-sozdat-karusel-s-chatgpt](http://127.0.0.1:56433/ru/blog/kak-sozdat-karusel-s-chatgpt/); [dist/ru/blog/kak-sozdat-karusel-s-chatgpt/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/kak-sozdat-karusel-s-chatgpt/index.html) | 73842 / `ad2678b2075fb0205aee7bad612aef1a83d9487bf3b01d2c051b1fda46c2888a` | 73842 / `d5873d277b80cc480b9d71878163524aee7ffcdc12ed9d1034c7cebf3c30eaf6` |
| [/ru/blog/kak-uvelichit-sohraneniya-karuseley](http://127.0.0.1:56433/ru/blog/kak-uvelichit-sohraneniya-karuseley/); [dist/ru/blog/kak-uvelichit-sohraneniya-karuseley/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/kak-uvelichit-sohraneniya-karuseley/index.html) | 56702 / `f5aafcb659c4e126c9062cfaf749df06a709e3929fe3d6d57c8e25126f29e2fd` | 56702 / `c2437a7c684b14009474bce12f6fd90cec7d3338b31e28524ccdcb49d0bc7304` |
| [/ru/blog/kak-vesti-linkedin-v-2026](http://127.0.0.1:56433/ru/blog/kak-vesti-linkedin-v-2026/); [dist/ru/blog/kak-vesti-linkedin-v-2026/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/kak-vesti-linkedin-v-2026/index.html) | 48614 / `dee29feacd90d912a452746633b529745db5c1d548508a98ee7be66b3be29e89` | 48614 / `1fe25caf250df189370c58208e717f3596d0a9d2ffdb372158b06cc445bebd0d` |
| [/ru/blog/kak-vesti-telegram-kanal-biznesu](http://127.0.0.1:56433/ru/blog/kak-vesti-telegram-kanal-biznesu/); [dist/ru/blog/kak-vesti-telegram-kanal-biznesu/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/kak-vesti-telegram-kanal-biznesu/index.html) | 53431 / `fc6ee799bc0d9f472a4b9a8ba514e863ade8dcaff22ea4884f577505d8e2a8bd` | 53431 / `d8da4338787a307a420463448278dba22c8c00f8a386436ffc7e19d8c5834372` |
| [/ru/blog/kak-vylozhit-karusel-v-instagram](http://127.0.0.1:56433/ru/blog/kak-vylozhit-karusel-v-instagram/); [dist/ru/blog/kak-vylozhit-karusel-v-instagram/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/kak-vylozhit-karusel-v-instagram/index.html) | 61178 / `e930744cd51632075d7d6037083f422a19f3360b48e6e305ad784725f49681b5` | 61178 / `db97731dbabdfdab0113fe0cdbe29368530db6476cfc3cff21587ad0a95c2553` |
| [/ru/blog/kak-zarabatyvat-na-sozdanii-karuseley](http://127.0.0.1:56433/ru/blog/kak-zarabatyvat-na-sozdanii-karuseley/); [dist/ru/blog/kak-zarabatyvat-na-sozdanii-karuseley/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/kak-zarabatyvat-na-sozdanii-karuseley/index.html) | 52698 / `8fd9768bdc81aa96de3290782090c56bc0601568032fb5591570733a6bd4c75f` | 52698 / `0e1541337637452fa2a9e7b15af3bad8f7665d7ed3c6ceb5828418ff4586a865` |
| [/ru/blog/kakie-posty-delat-v-instagram-idei](http://127.0.0.1:56433/ru/blog/kakie-posty-delat-v-instagram-idei/); [dist/ru/blog/kakie-posty-delat-v-instagram-idei/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/kakie-posty-delat-v-instagram-idei/index.html) | 63585 / `630eddec3a40b2ad0cdd63cf20ffec1b60860d411cbdc0ac08ca61e2d5743e06` | 63585 / `b37e1b9b2bb1f04602996d6f23b39aaf9aea461798d3a582cabfd13a596ac455` |
| [/ru/blog/kakoy-ii-sozdast-post-karusel](http://127.0.0.1:56433/ru/blog/kakoy-ii-sozdast-post-karusel/); [dist/ru/blog/kakoy-ii-sozdast-post-karusel/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/kakoy-ii-sozdast-post-karusel/index.html) | 76938 / `5b8301d09533a438ed33881c3ccb90ee86fff62a96f74489d73db5958fb59689` | 76938 / `0ee30a496b36a7ef95b518f32097e17d4b7a53f8e39819a5a577708b2dd933c9` |
| [/ru/blog/karusel-dlya-instagram](http://127.0.0.1:56433/ru/blog/karusel-dlya-instagram/); [dist/ru/blog/karusel-dlya-instagram/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/karusel-dlya-instagram/index.html) | 53443 / `bf4cb21229c2bcf0ad66859be166926a301f35f0d61d956a62fe18aa23961297` | 53443 / `cacc214482f84c56b488bde9490df3c5f063c7bf7f7e3ca3f79be8ce13328cad` |
| [/ru/blog/karusel-dlya-lichnogo-brenda-s-ii](http://127.0.0.1:56433/ru/blog/karusel-dlya-lichnogo-brenda-s-ii/); [dist/ru/blog/karusel-dlya-lichnogo-brenda-s-ii/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/karusel-dlya-lichnogo-brenda-s-ii/index.html) | 56036 / `e65710f3424995d6e2d58fcbeb77f000ff019ed5a4afa965e8184b29788e4c9b` | 56036 / `03b97913e6c5cb6c2e5fde421500800e49fb0a9d85c547686cf1d8ca7e04504b` |
| [/ru/blog/karusel-dlya-otzyvov-s-ii](http://127.0.0.1:56433/ru/blog/karusel-dlya-otzyvov-s-ii/); [dist/ru/blog/karusel-dlya-otzyvov-s-ii/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/karusel-dlya-otzyvov-s-ii/index.html) | 57546 / `70ce052d3829647360edd39a27f6bf0968a9d31a6f99b33d4bd2f9481401508a` | 57546 / `5f6be62f50d7dc8671ce227db771d080f9f9bb13a54198d195374dd2774eaed1` |
| [/ru/blog/karusel-dlya-zapuska-produkta-s-ii](http://127.0.0.1:56433/ru/blog/karusel-dlya-zapuska-produkta-s-ii/); [dist/ru/blog/karusel-dlya-zapuska-produkta-s-ii/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/karusel-dlya-zapuska-produkta-s-ii/index.html) | 60013 / `5110d9149513ade9a886f7167b9c7837846984d438d01db8a12cf9055bf06b79` | 60013 / `c49b828611697fe4eb7cd89ac4c9982eaa1a52a78dc015f972726e3b7ce85324` |
| [/ru/blog/karusel-ili-setka-v-instagram](http://127.0.0.1:56433/ru/blog/karusel-ili-setka-v-instagram/); [dist/ru/blog/karusel-ili-setka-v-instagram/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/karusel-ili-setka-v-instagram/index.html) | 70862 / `36be7da1c3681cd1bfebc9a111ca9dce020ba5dc443282d6fb9b85f65760dd84` | 70862 / `dc373a210787ab1332cbf3456bb6a58802d4d600a04c6d3355c1b21d9c783f73` |
| [/ru/blog/karuseli-dlya-ekspertov-s-ii](http://127.0.0.1:56433/ru/blog/karuseli-dlya-ekspertov-s-ii/); [dist/ru/blog/karuseli-dlya-ekspertov-s-ii/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/karuseli-dlya-ekspertov-s-ii/index.html) | 55162 / `de637fc569893fed56e3847e22d2a836893d512c2f66ec7c060db037e72d8426` | 55162 / `6d3dc2846ff0dad19efe1b7af8418169d0df45ede7ef4d8d932618257870203c` |
| [/ru/blog/karuseli-dlya-onlayn-shkol-s-ii](http://127.0.0.1:56433/ru/blog/karuseli-dlya-onlayn-shkol-s-ii/); [dist/ru/blog/karuseli-dlya-onlayn-shkol-s-ii/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/karuseli-dlya-onlayn-shkol-s-ii/index.html) | 56060 / `b27c4b8321fd863866bc8186119d77444f7953a1105735ab9d6f73cbf3b4873c` | 56060 / `5a6380d8599f39d23819a0063d922f30d7806a113bcfb78e8674d1cc2fbb163e` |
| [/ru/blog/karuseli-dlya-smm-agentstva-s-ii](http://127.0.0.1:56433/ru/blog/karuseli-dlya-smm-agentstva-s-ii/); [dist/ru/blog/karuseli-dlya-smm-agentstva-s-ii/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/karuseli-dlya-smm-agentstva-s-ii/index.html) | 58347 / `26d91ea72bb0e147f21ff0dab6bae9a85782c30708c1df691ec58f769ed5b9e3` | 58347 / `0a57c88b0b79bfadc08bb4ddefd3ce6339d3721dc63ca8082bd669ee4fc896ad` |
| [/ru/blog/konstruktor-karuseley-onlayn](http://127.0.0.1:56433/ru/blog/konstruktor-karuseley-onlayn/); [dist/ru/blog/konstruktor-karuseley-onlayn/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/konstruktor-karuseley-onlayn/index.html) | 67643 / `a833ce3a6910b19cb7baeae7f41b5c0da8377671a4e4d5feca0e03fdbbd4c718` | 67643 / `e43a4b4294c53e39cb45c2e05b1aa5188be09a60898ca92c722a3f223bfc069f` |
| [/ru/blog/kontent-dlya-lichnogo-brenda](http://127.0.0.1:56433/ru/blog/kontent-dlya-lichnogo-brenda/); [dist/ru/blog/kontent-dlya-lichnogo-brenda/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/kontent-dlya-lichnogo-brenda/index.html) | 71704 / `46d102b74b3f2099ec2858198f228aed0601f58986fc339c056a47e44be5142f` | 71704 / `504c0f154a4125136919e10cf8a471df00538c0eea07fa87250c051f09b15eff` |
| [/ru/blog/kontent-plan-dlya-vk](http://127.0.0.1:56433/ru/blog/kontent-plan-dlya-vk/); [dist/ru/blog/kontent-plan-dlya-vk/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/kontent-plan-dlya-vk/index.html) | 68683 / `9a4f7dddb13d9666b12669e5e84a6bfcf1b3a8aa562dc6f49babbdf3fea27816` | 69140 / `7d4d1254f62f486959fceb3af44a0c76f001db63eff34b1f0f339e012aa6d143` |
| [/ru/blog/kontent-voronka-dlya-socsetey](http://127.0.0.1:56433/ru/blog/kontent-voronka-dlya-socsetey/); [dist/ru/blog/kontent-voronka-dlya-socsetey/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/kontent-voronka-dlya-socsetey/index.html) | 68457 / `6367245f4e6f6c3eed003f32dd603c23b294f05c10434c0a790bca755a804285` | 68457 / `7a09a6260113a407d5d62997904e45c9f87778d7dc34be78890c81e588ac3c20` |
| [/ru/blog/krasivye-posty-dlya-vk-oformlenie](http://127.0.0.1:56433/ru/blog/krasivye-posty-dlya-vk-oformlenie/); [dist/ru/blog/krasivye-posty-dlya-vk-oformlenie/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/krasivye-posty-dlya-vk-oformlenie/index.html) | 60324 / `7de2dd9586419ab876a3ac056525d818f64a6642bbada70bd80b5c3c2032ce16` | 60324 / `5c71e8ab62daa03321ad71bd653029ac9b971c6a4ea3281f0feca2f9313dd540` |
| [/ru/blog/luchshie-ai-generatory-karuselej](http://127.0.0.1:56433/ru/blog/luchshie-ai-generatory-karuselej/); [dist/ru/blog/luchshie-ai-generatory-karuselej/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/luchshie-ai-generatory-karuselej/index.html) | 126730 / `369e4884f5763d8d36e43f08abdcd1913c8ea9d7c64d8b768dac36fcd3399ef6` | 126730 / `3639d2d0819454a4cc1fb10de9786dcaf2b7617079be36dc1219777ae4f6cd0d` |
| [/ru/blog/massovoe-sozdanie-karuseley-s-ii](http://127.0.0.1:56433/ru/blog/massovoe-sozdanie-karuseley-s-ii/); [dist/ru/blog/massovoe-sozdanie-karuseley-s-ii/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/massovoe-sozdanie-karuseley-s-ii/index.html) | 61805 / `12a606ceb960a14b3aac6bbd0c879c71cd5e25c517fa177a8e2a0606ed8d1632` | 61805 / `4db85515ca467d304c56d794e6173bbad0be8c233beb598bdcb5a3b504edcacc` |
| [/ru/blog/mnogostranichnye-karuseli-prezentacii](http://127.0.0.1:56433/ru/blog/mnogostranichnye-karuseli-prezentacii/); [dist/ru/blog/mnogostranichnye-karuseli-prezentacii/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/mnogostranichnye-karuseli-prezentacii/index.html) | 63944 / `4f1d955d64be0a7d24b6967168d229104454ac24d0bee2e01f8154749d7c06ec` | 63944 / `7ed4554e18be60fb9f9dc6f5e5dfd95bd3e51394e2e5f38bf5afc50e0505a27a` |
| [/ru/blog/neyroset-dlya-napisaniya-postov-obzor](http://127.0.0.1:56433/ru/blog/neyroset-dlya-napisaniya-postov-obzor/); [dist/ru/blog/neyroset-dlya-napisaniya-postov-obzor/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/neyroset-dlya-napisaniya-postov-obzor/index.html) | 47553 / `b67c309749a2a6c5b4d3b8a6ec8fe41360bb3dd15e7203d7710732641b193571` | 47553 / `cac482c59142c7ed81cc67fe0f6ccf8b0b11c491807e60104c82f217ba6d2540` |
| [/ru/blog/neyroset-dlya-postov](http://127.0.0.1:56433/ru/blog/neyroset-dlya-postov/); [dist/ru/blog/neyroset-dlya-postov/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/neyroset-dlya-postov/index.html) | 75194 / `b2e302f00192a7310fdb3fbf96e0d07724b4f19c2a3af155a6736c403fa2edc8` | 77787 / `ac7bfdfa1fe498d6fe0f0ce21dfe6b302fad8d7a5303da4fecca87b8aa0436d4` |
| [/ru/blog/oblozhka-dlya-karuseli-instagram](http://127.0.0.1:56433/ru/blog/oblozhka-dlya-karuseli-instagram/); [dist/ru/blog/oblozhka-dlya-karuseli-instagram/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/oblozhka-dlya-karuseli-instagram/index.html) | 47828 / `d6152baf21f3cb98799561794dc589f73fd1f483008b0d749ebb2d09e8c6354e` | 47828 / `04f5ba172b5ead5e9ab6a63f83d0f628413d02ebe12021b4122908bc45ec48a7` |
| [/ru/blog/oshibki-v-karuselyah-instagram](http://127.0.0.1:56433/ru/blog/oshibki-v-karuselyah-instagram/); [dist/ru/blog/oshibki-v-karuselyah-instagram/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/oshibki-v-karuselyah-instagram/index.html) | 47780 / `a9e508d3cb1fee7728e3270d49e97efc1632413717b19d4ea14bb5e1a1ab9bbe` | 47780 / `70f1ca5bb74865d97ab8bb09f5533619c737f59faf67f54b68dfc9f1f2f90d51` |
| [/ru/blog/pererabotka-kontenta-dlya-socsetey](http://127.0.0.1:56433/ru/blog/pererabotka-kontenta-dlya-socsetey/); [dist/ru/blog/pererabotka-kontenta-dlya-socsetey/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/pererabotka-kontenta-dlya-socsetey/index.html) | 70097 / `f52cf26d634de64652728682ac03ea4a173ddef92ca321ab47d8b8806e15b31f` | 70097 / `5264120202fbd4073fa8afd7e8df18954d3b26566f81b2a7bacec190806b54e4` |
| [/ru/blog/pervyy-post-vkontakte-s-ii](http://127.0.0.1:56433/ru/blog/pervyy-post-vkontakte-s-ii/); [dist/ru/blog/pervyy-post-vkontakte-s-ii/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/pervyy-post-vkontakte-s-ii/index.html) | 62319 / `6947b3a6d183e49a88331b141c01ac50826753cdf6c9077795ef887c59318a46` | 62319 / `34618939e3106223e5e927e46e52bb63eb15b386d7e22695ac4c2c7932991389` |
| [/ru/blog/pochemu-instagram-obrezaet-foto-v-karuseli](http://127.0.0.1:56433/ru/blog/pochemu-instagram-obrezaet-foto-v-karuseli/); [dist/ru/blog/pochemu-instagram-obrezaet-foto-v-karuseli/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/pochemu-instagram-obrezaet-foto-v-karuseli/index.html) | 61935 / `890a8e6a2b51c12bea3cb98a015aa788bcb775cef4086324c888d59aa5a91cb5` | 61935 / `a83d2d1fb38dad55f872059a7ecfebd92f4e6efa54c517b49a9173b82cc345c8` |
| [/ru/blog/post-znakomstvo-v-instagram](http://127.0.0.1:56433/ru/blog/post-znakomstvo-v-instagram/); [dist/ru/blog/post-znakomstvo-v-instagram/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/post-znakomstvo-v-instagram/index.html) | 67804 / `709ba89718e0e2ae7fdd140cfb4ef5113220cf8d94cd97e27d486eb3c1a5c7a1` | 67804 / `c939969f2f7b2bb1adabb24a62023e4f92726216320888bedf54903fe8ac07d9` |
| [/ru/blog/primery-karuseley-instagram](http://127.0.0.1:56433/ru/blog/primery-karuseley-instagram/); [dist/ru/blog/primery-karuseley-instagram/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/primery-karuseley-instagram/index.html) | 69585 / `cffbd87033814fc3716ee3dd95c1e786eef885e18be80d1803976d9fbbc55311` | 69585 / `fddea59e03ff0c7cee75508ecdd9b3dafae2ddfd9d906840e2aae494d38e18e8` |
| [/ru/blog/primery-karuseley-linkedin](http://127.0.0.1:56433/ru/blog/primery-karuseley-linkedin/); [dist/ru/blog/primery-karuseley-linkedin/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/primery-karuseley-linkedin/index.html) | 61954 / `89a776b60f8fa00d379a0ba2624e1b8bc7886ee6e0c0d803ece76cfbe2d0314f` | 61954 / `884362a59b68532bfcbad83dd36ca4b0c837445dd25dc18adfb6d6aa385c6566` |
| [/ru/blog/prompty-dlya-karuseley-linkedin](http://127.0.0.1:56433/ru/blog/prompty-dlya-karuseley-linkedin/); [dist/ru/blog/prompty-dlya-karuseley-linkedin/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/prompty-dlya-karuseley-linkedin/index.html) | 59922 / `afa28f7e0db8f4f58461d86397f197cca8cfb1002eb668cc2c6ade9eab7812c2` | 59922 / `bb80fc26ed81de6ce59f0994fef6090fb79f6823c8646c0153a30839406ac573` |
| [/ru/blog/prompty-dlya-karuseley-v-instagram](http://127.0.0.1:56433/ru/blog/prompty-dlya-karuseley-v-instagram/); [dist/ru/blog/prompty-dlya-karuseley-v-instagram/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/prompty-dlya-karuseley-v-instagram/index.html) | 69241 / `8e90a086335c2b0fb32ec24b91ecc60390b6bd29580996bf66c949827aa457b4` | 69241 / `2c79b724d03485b78d2ff062645b933e50c4195e59936a90195d9ef5ca10839d` |
| [/ru/blog/psihologiya-karuseley-kak-uderzhat-vnimanie](http://127.0.0.1:56433/ru/blog/psihologiya-karuseley-kak-uderzhat-vnimanie/); [dist/ru/blog/psihologiya-karuseley-kak-uderzhat-vnimanie/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/psihologiya-karuseley-kak-uderzhat-vnimanie/index.html) | 57975 / `5c2592f5394eac720c885627e94a6a92302c6554290a66e5cac53e64e3d32581` | 57975 / `434a644db47d23ce8028b10150b4501cb3981b39aca36a5756bc357fe4ab4c85` |
| [/ru/blog/razmer-foto-dlya-posta-vk-formaty](http://127.0.0.1:56433/ru/blog/razmer-foto-dlya-posta-vk-formaty/); [dist/ru/blog/razmer-foto-dlya-posta-vk-formaty/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/razmer-foto-dlya-posta-vk-formaty/index.html) | 60246 / `9f426f1299b3720602eddef779fdfaf90d7e8fcab37cfa506c50b82524e18857` | 60246 / `27d6cc46335aea9eda3106b4812f1382461359c6f4db69240adeb30f4fd8ed39` |
| [/ru/blog/razmer-karuseli-v-instagram](http://127.0.0.1:56433/ru/blog/razmer-karuseli-v-instagram/); [dist/ru/blog/razmer-karuseli-v-instagram/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/razmer-karuseli-v-instagram/index.html) | 64941 / `0ce665f9f13068fcb4e813a35d15fd278b4ad602dcda3c406a6896c14b008a16` | 64941 / `4c6c39b3b042f287a26d8eaef6cbb9c2a55e62a994557106d14a0d88ad23e56e` |
| [/ru/blog/razmer-posta-v-instagram-v-pikselih](http://127.0.0.1:56433/ru/blog/razmer-posta-v-instagram-v-pikselih/); [dist/ru/blog/razmer-posta-v-instagram-v-pikselih/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/razmer-posta-v-instagram-v-pikselih/index.html) | 59423 / `db4789683e5b31c309002b833ba69cffd8a9291f53f886a0635c70e0e2430bfc` | 59423 / `dbe77fe8c90c2a1f2f02dfe8f0ec848e7215b17fa5286b2cbd3ab77665050d8c` |
| [/ru/blog/reels-ili-karuseli-chto-vybrat](http://127.0.0.1:56433/ru/blog/reels-ili-karuseli-chto-vybrat/); [dist/ru/blog/reels-ili-karuseli-chto-vybrat/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/reels-ili-karuseli-chto-vybrat/index.html) | 53458 / `da9e3a591236b1f32f710c5bda48d3b846d98911a34a296a912b984c82f5c48a` | 53458 / `b76c13cb8a207c239e67cdeea24c06fdf8915504222ed77679ab10b3a843f8db` |
| [/ru/blog/rubriki-dlya-socsetey](http://127.0.0.1:56433/ru/blog/rubriki-dlya-socsetey/); [dist/ru/blog/rubriki-dlya-socsetey/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/rubriki-dlya-socsetey/index.html) | 66699 / `123b91d7faa4a28c6fd76992116f354fb71f9078ba31de9b3bac19730cc04063` | 66699 / `3c2dcd5aa9cc7269c278d3e0b9263a8968fa9e6017c33da7a20e290c4b893315` |
| [/ru/blog/shablony-karuseley-v-instagram](http://127.0.0.1:56433/ru/blog/shablony-karuseley-v-instagram/); [dist/ru/blog/shablony-karuseley-v-instagram/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/shablony-karuseley-v-instagram/index.html) | 70993 / `2552c4276816c9cc2e4c64b72c8c2d0a70fae29569dba9482f15c0b2ac555319` | 70993 / `4cab97e2ad6ba640a59c62bef727eecfa91a6659b8bbd4e7977dd27ec40587da` |
| [/ru/blog/struktura-prodayuschego-posta-v-telegram](http://127.0.0.1:56433/ru/blog/struktura-prodayuschego-posta-v-telegram/); [dist/ru/blog/struktura-prodayuschego-posta-v-telegram/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/struktura-prodayuschego-posta-v-telegram/index.html) | 53116 / `9c352a2a43d223d14eba916b5260393594064bbdb0c0e1afb74489cf16052597` | 53116 / `b45571f64f5543f99018931e14bfe29072bba981feb393fa760025ac20046b3b` |
| [/ru/blog/tekst-i-foto-dlya-posta-instagram](http://127.0.0.1:56433/ru/blog/tekst-i-foto-dlya-posta-instagram/); [dist/ru/blog/tekst-i-foto-dlya-posta-instagram/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/tekst-i-foto-dlya-posta-instagram/index.html) | 61123 / `cfc0bb79a53b8985291957fcb0b4959e2ea667464db1178653a2a34810fcee25` | 61123 / `f1b4f18442bb3b9f8b0c6b0d825bdec0df5d07780069c67b7baf7459c529c97c` |
| [/ru/blog/tekst-v-karusel-neyroset](http://127.0.0.1:56433/ru/blog/tekst-v-karusel-neyroset/); [dist/ru/blog/tekst-v-karusel-neyroset/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/tekst-v-karusel-neyroset/index.html) | 43419 / `1b57af1f3a55582a332396d5783f72b6badde4d83cc3c5bd92ac98a0aaa04150` | 43419 / `a5ee369697572fb87ff95aa82630c61affab89f813fddd3d79a67be701501549` |
| [/ru/blog/temy-dlya-postov-v-linkedin](http://127.0.0.1:56433/ru/blog/temy-dlya-postov-v-linkedin/); [dist/ru/blog/temy-dlya-postov-v-linkedin/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/temy-dlya-postov-v-linkedin/index.html) | 78802 / `65f172c4238e192c7bb148e203b1d4a4ab183c677711d77d5dbe7bcbd109498b` | 79012 / `d9a594685b0d7e62f69cabcfd26246a00b119d47269ace50129caf5b3a817137` |
| [/ru/blog/temy-postov-dlya-gruppy-vkontakte](http://127.0.0.1:56433/ru/blog/temy-postov-dlya-gruppy-vkontakte/); [dist/ru/blog/temy-postov-dlya-gruppy-vkontakte/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/temy-postov-dlya-gruppy-vkontakte/index.html) | 63734 / `e111fe6e54e7f414bcf5c1bf5d5e58caeee7fc5d55055715a3b56f3e08f3e88b` | 63734 / `3659671074a14f4850b5d812a372bd5ba6a34fad551195b20ae9af4ea04b4808` |
| [/ru/blog/trendovye-shrifty-dlya-karuseley](http://127.0.0.1:56433/ru/blog/trendovye-shrifty-dlya-karuseley/); [dist/ru/blog/trendovye-shrifty-dlya-karuseley/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/blog/trendovye-shrifty-dlya-karuseley/index.html) | 54697 / `0b1f7fe232dc662339a99d42bbfd52c63dc6528e233fe1a8cff5d322b950d98f` | 54697 / `212aea41972aeceb80343ae4cef39b9ab35cd1ff1ef63d6e3f15c66d7b6e3ded` |
| [/ru/examples/instagram-carousel](http://127.0.0.1:56433/ru/examples/instagram-carousel/); [dist/ru/examples/instagram-carousel/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/examples/instagram-carousel/index.html) | 126976 / `f112afb6d6f33a0a9b13082b05b5200fcd9b4d2ee20a16b8ddf4579ebd6a5d70` | 126976 / `b04dc8b01ab992d01eb82f9b87f5b826cf55ae407fc4e227ce0d5693936ec248` |
| [/ru/generator-kartinok-dlya-karuseli](http://127.0.0.1:56433/ru/generator-kartinok-dlya-karuseli/); [dist/ru/generator-kartinok-dlya-karuseli/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/generator-kartinok-dlya-karuseli/index.html) | 135013 / `15077c5a13ec7020770f843e1a05e81910e301183c21a724e621ab2e037cfb15` | 135013 / `0bfb57fa1595c516dc6231293140299e49c7239e2d541ccd781b99007f66f374` |
| [/ru/generator-karuselej-instagram](http://127.0.0.1:56433/ru/generator-karuselej-instagram/); [dist/ru/generator-karuselej-instagram/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/generator-karuselej-instagram/index.html) | 203508 / `0e57209337af7ebfbededd6316a4748a2cb8e82b5a88a2a9829d2d69960af06b` | 203508 / `e0e426fa576dc4a7e048dc10ac3d474332110d46f4a1ba502dd5656a59f16246` |
| [/ru/generator-karuselej-linkedin](http://127.0.0.1:56433/ru/generator-karuselej-linkedin/); [dist/ru/generator-karuselej-linkedin/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/generator-karuselej-linkedin/index.html) | 195190 / `79889ec400710707e5811ec11dd1e2625f6bb370bebf5b9521e1ee5f7c5422e6` | 128012 / `4ea7b52d4dc8ffbcf6997ec5b73d26f8c659070b57e2dac14b954c5367178a4f` |
| [/ru/generator-karuselej-telegram](http://127.0.0.1:56433/ru/generator-karuselej-telegram/); [dist/ru/generator-karuselej-telegram/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/generator-karuselej-telegram/index.html) | 133640 / `8a482ae82ddbbf120041937eb6afba0a93ff82798e7642b2109ba5d071246f81` | 133640 / `48da3c8fa70e55d8d68a99d97da7bf6e40bb670db3ad8cf1cedd45c709d94726` |
| [/ru/generator-karuselej-vk](http://127.0.0.1:56433/ru/generator-karuselej-vk/); [dist/ru/generator-karuselej-vk/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/generator-karuselej-vk/index.html) | 134176 / `2693e6530753af79bddbf3ac05fc4162fcfa675cd2524c9ef1b3172bbb7f6bf7` | 134176 / `8aedadf1d0471e2171c986689b8106a8ef341881aac88af47b236827e55adc21` |
| [/ru/generator-kontenta](http://127.0.0.1:56433/ru/generator-kontenta/); [dist/ru/generator-kontenta/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/generator-kontenta/index.html) | 198440 / `98e70290d0d6d5f4b30e8759b16a9c4cf6e1fa75ae215cc21da3f309c4e993c3` | 131964 / `64b11aec085ef5e65d6265caeed9198c198f0370622ae664169844452ad3dd4a` |
| [/ru/generator-postov-instagram](http://127.0.0.1:56433/ru/generator-postov-instagram/); [dist/ru/generator-postov-instagram/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/generator-postov-instagram/index.html) | 210424 / `982bd4c0aad229c07b3dd25f736df168148999575e6edddc895f7621c9161765` | 143250 / `9de844e47d96aa7147d277c86d2b8105aadd317e122ecee3b978e084b39b6048` |
| [/ru/generator-prodayushchih-postov](http://127.0.0.1:56433/ru/generator-prodayushchih-postov/); [dist/ru/generator-prodayushchih-postov/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/generator-prodayushchih-postov/index.html) | 137292 / `33459f29212fa7453825829c0e1a6c65c9af398ce64ae63cd6f1364f3637ddd7` | 137292 / `78335cac6857e81aa1de4fb6fbd3d527bacff922af4cb845f76ce43935538ee2` |
| [/ru/generator-reklamnyh-postov](http://127.0.0.1:56433/ru/generator-reklamnyh-postov/); [dist/ru/generator-reklamnyh-postov/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/generator-reklamnyh-postov/index.html) | 130807 / `938cc4d0609bb1ad43c48f266555425b8ae923dbc9f7bdc39dcad1feb3b93d25` | 130807 / `d348c4d10c01f981c0d04ee70937c7378f47c0b785049d2b886ad7e3c94c2d31` |
| [/ru/generator-teksta-dlya-posta](http://127.0.0.1:56433/ru/generator-teksta-dlya-posta/); [dist/ru/generator-teksta-dlya-posta/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/generator-teksta-dlya-posta/index.html) | 135978 / `e1c0310439f91b3cb6afaf30fe7adb4406c0fb83a683ac86354dcb015ddcf1ba` | 135978 / `dd8db6f536741cbf031151d16e7bf83123b715f1f5b2b3160d104088b48c3f09` |
| [/ru/ii-generator-karuseley](http://127.0.0.1:56433/ru/ii-generator-karuseley/); [dist/ru/ii-generator-karuseley/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/ii-generator-karuseley/index.html) | 203896 / `0c62ee6e2b36bc10f95505bc36038bc441da9b2d38cca32b8154ecf299737b8c` | 203896 / `25001ebf8e1e20f1d484fe1875b5c13880ef4a8c09c4d6e910d9a3b3459912e8` |
| [/ru/ii-generator-kontenta](http://127.0.0.1:56433/ru/ii-generator-kontenta/); [dist/ru/ii-generator-kontenta/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/ii-generator-kontenta/index.html) | 198241 / `d5fc11ee49d36dc8eb49f4ee2b953f356db81330a016e99e242d8ad67f3a46e9` | 131765 / `15dccccbca540d216029396d4735332e773f84cb961bad10ec982793f81d38ad` |
| [/ru/ii-generator-postov-dlya-instagram](http://127.0.0.1:56433/ru/ii-generator-postov-dlya-instagram/); [dist/ru/ii-generator-postov-dlya-instagram/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/ii-generator-postov-dlya-instagram/index.html) | 210209 / `c044ae94a7b0c00d8bb63d5e680168d6b7c913a229951785785bbef80238c85e` | 143036 / `1c6ecea0457b680efba77799146e5bb62b80727ab1982bee13134c3dbdcd3251` |
| [/ru/ii-generator-postov-dlya-linkedin](http://127.0.0.1:56433/ru/ii-generator-postov-dlya-linkedin/); [dist/ru/ii-generator-postov-dlya-linkedin/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/ii-generator-postov-dlya-linkedin/index.html) | 191714 / `c57a1e4be7972f3d128eb1fe8f76fefcc099150248c93190b85ab3ad055d92b0` | 124539 / `efe25b2b469aea4ee0d9e77a45e04d772c174d2580f8eb06295bd805cab9018b` |
| [/ru/politika](http://127.0.0.1:56433/ru/politika/); [dist/ru/politika/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/politika/index.html) | 39158 / `1fa5d10273f05821ca37dac6d0922d1ca8a6c4e735b9c8c4564d05d186647ad2` | 39158 / `296cd318ff775499cca860d2ebbf602e66e46a4d9297e43eeed7469a0eed1115` |
| [/ru/polzovatelskoe-soglashenie](http://127.0.0.1:56433/ru/polzovatelskoe-soglashenie/); [dist/ru/polzovatelskoe-soglashenie/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/polzovatelskoe-soglashenie/index.html) | 40200 / `182880431685d3ffa24db83d00a44350961636436ad215dc7fce0f6194dd5de0` | 40200 / `689baaf6cd065a2f31950d28dc8da46c90fa39e56c2809eb877ad882ad76b2ab` |
| [/ru/prompts/instagram-carousel](http://127.0.0.1:56433/ru/prompts/instagram-carousel/); [dist/ru/prompts/instagram-carousel/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/prompts/instagram-carousel/index.html) | 127884 / `82a81cc8e9212eee6be7a3923e00a870c99ebcfe9aff5fd2e2a2e48236ca58a6` | 127884 / `0bbcaff34816070ea0d823c344aaaa9f12fa80a16054d589ddc2bd9d01dcf273` |
| [/ru/soglasie-na-obrabotku-personalnyh-dannyh](http://127.0.0.1:56433/ru/soglasie-na-obrabotku-personalnyh-dannyh/); [dist/ru/soglasie-na-obrabotku-personalnyh-dannyh/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/soglasie-na-obrabotku-personalnyh-dannyh/index.html) | 30210 / `3612944aca4ad047a12e2cfe3f719caf700f70414c98b6b302e02b41b4e113bd` | 30210 / `b91ad2b8779339ea632e02c70c0eec0d4979a26b479cc1064fb42773795aa31a` |
| [/ru/telegram-post-generator](http://127.0.0.1:56433/ru/telegram-post-generator/); [dist/ru/telegram-post-generator/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/telegram-post-generator/index.html) | 135122 / `8ea7831572e121e2f3448d2bc171b556d355f487efb10f84ae14a2bce91d98b2` | 135122 / `d5373e9f32114104fd9deed1869a1ec136266e5e9854263209f5c4484b61506a` |
| [/ru/templates/instagram-carousel](http://127.0.0.1:56433/ru/templates/instagram-carousel/); [dist/ru/templates/instagram-carousel/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/templates/instagram-carousel/index.html) | 139833 / `310d73f69fbb1abd516aafd2944a5f7790c874d16473d83f8c6cd46de045912c` | 139833 / `881f8a5eb6ed24fc2d2cbc58dd213ba2f2273ff744946939a29ad87be24d9e4c` |
| [/ru/tools/luchshie-servisy-dlya-karuseley](http://127.0.0.1:56433/ru/tools/luchshie-servisy-dlya-karuseley/); [dist/ru/tools/luchshie-servisy-dlya-karuseley/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/tools/luchshie-servisy-dlya-karuseley/index.html) | 130391 / `1b7f6c60c03f9bea5cdedbda5c932828a7afd401ec67eea8624adfa8e5a01326` | 130391 / `b3a03114cd3e967993c5f2e31c721e4f497c9a47e4a6bc33740f303da040093d` |
| [/ru/ugc-creator-terms](http://127.0.0.1:56433/ru/ugc-creator-terms/); [dist/ru/ugc-creator-terms/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/ugc-creator-terms/index.html) | 80953 / `1baaa63b63061b836d72da5d1c876ea08f7ace66c91ec200b81295a9af1cbd7b` | 80953 / `ed3fa09401b3697474e99b055c0cfd9161998f76a50fd46312fbf624a8a3a89c` |
| [/ru/use-cases/besshovnaya-karusel-instagram](http://127.0.0.1:56433/ru/use-cases/besshovnaya-karusel-instagram/); [dist/ru/use-cases/besshovnaya-karusel-instagram/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/use-cases/besshovnaya-karusel-instagram/index.html) | 136658 / `6860e64f6c698d4d9b0b40861dcadcef85d6316721cd7b0b7819c9795cb22acf` | 136658 / `0eab87182b67726a05cb933a65d7847122c4e34b6518ffef4e4d63ff9b27df42` |
| [/ru/use-cases/carousels-for-beauty](http://127.0.0.1:56433/ru/use-cases/carousels-for-beauty/); [dist/ru/use-cases/carousels-for-beauty/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/use-cases/carousels-for-beauty/index.html) | 125658 / `730574cdc83f13e30457ac2c72ec89411e4d09c795a564280f8d9c48bf0f84a1` | 125658 / `3bd86b0fa34706077532d8562fc686bd8f9f42b712013adf6f7db4970186e382` |
| [/ru/use-cases/carousels-for-experts](http://127.0.0.1:56433/ru/use-cases/carousels-for-experts/); [dist/ru/use-cases/carousels-for-experts/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/use-cases/carousels-for-experts/index.html) | 125528 / `866b89157f9a1624619777f3ad9208a1f4829b13167f866e0065bae58f1f6960` | 125528 / `9581ddb6cfd5758136d664bba3ca160bae0a26ae7f5fac0c10086bf981793e71` |
| [/ru/use-cases/carousels-for-smm](http://127.0.0.1:56433/ru/use-cases/carousels-for-smm/); [dist/ru/use-cases/carousels-for-smm/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/use-cases/carousels-for-smm/index.html) | 125450 / `ce54db304f56741301c16a5aa9d3509a38ebc6b5520c3789f9bad4fabe7f6279` | 125450 / `018b170f8046303f2239504001454e2eeb26f3d7733f88d4b180d3bc55f695e4` |
| [/ru/use-cases/foto-v-karusel](http://127.0.0.1:56433/ru/use-cases/foto-v-karusel/); [dist/ru/use-cases/foto-v-karusel/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/use-cases/foto-v-karusel/index.html) | 133982 / `92a4a52eb839deb8f3bbfaf353b9e4bd106e927713841fb49997751d71a1e82d` | 133982 / `5462f56fe024624976fe56b4fc15843a7d723c89e19307e9fd2d567211c99fef` |
| [/ru/use-cases/pdf-v-karusel](http://127.0.0.1:56433/ru/use-cases/pdf-v-karusel/); [dist/ru/use-cases/pdf-v-karusel/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/use-cases/pdf-v-karusel/index.html) | 132987 / `612e98a5ae6e3e1a7937048a799baa4571f35cc71c69d16abb9c46e1ebf4a7a6` | 132987 / `3fac6a409c7a8ad73d61f3d3b078cd0bcba9bf99e6087fe2092b5981aab10374` |
| [/ru/use-cases/social-content-for-business](http://127.0.0.1:56433/ru/use-cases/social-content-for-business/); [dist/ru/use-cases/social-content-for-business/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/use-cases/social-content-for-business/index.html) | 126562 / `96f8d46aa51c71d92ee9fe0c3068a290b125c82417da16806a7682a1038b7020` | 126562 / `27f43e47bb64a878926a3a3ac3993ceedc70e99ad8bace77751569b91aa07666` |
| [/ru/use-cases/tekst-v-karusel](http://127.0.0.1:56433/ru/use-cases/tekst-v-karusel/); [dist/ru/use-cases/tekst-v-karusel/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/use-cases/tekst-v-karusel/index.html) | 138995 / `81fa525d676ee6f83267e222856ff7f9d99ca70b2212a4f9b33fe458bcbcee86` | 138995 / `5ff9f66c87e4dd78b55e10daf7851f8562d820cae8c817f597a458c5c37f011b` |
| [/ru/use-cases/video-v-karusel](http://127.0.0.1:56433/ru/use-cases/video-v-karusel/); [dist/ru/use-cases/video-v-karusel/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/use-cases/video-v-karusel/index.html) | 133925 / `83bc0fac65eae54ed966c9a174fd9e87267ad56133b846388c93dabf87e9a4a1` | 133925 / `8525f3119b63d0d37b617b8ef8215116714a093939a73919f989ea8b622e68a7` |
| [/ru/vk-post-generator](http://127.0.0.1:56433/ru/vk-post-generator/); [dist/ru/vk-post-generator/index.html](/private/tmp/gtf-google-indexation-recovery/dist/ru/vk-post-generator/index.html) | 134738 / `cd7dfa606392d054b7c91118e83ab17f64d58adcfd83242b4e8b65fd69cae578` | 134815 / `93d6b65f4d27b0eb78dea7986b445054dc3838b617cbb596771c784287954e66` |
| [/terms-of-service](http://127.0.0.1:56433/terms-of-service/); [dist/terms-of-service/index.html](/private/tmp/gtf-google-indexation-recovery/dist/terms-of-service/index.html) | 47646 / `32b0f3185a0621dce4f1040721f41dc34e1e0bbc790bbc2d9341c8bb581523be` | 47646 / `29b126255c297138a3cc7f80b827efa813ba60add21ae0d64a6144fe7ae67e03` |

</details>

## 9. Exact remaining findings и reviewer observations

### 9.1 Current full-PR Content/Template comparison (66 BLOCKED)

Same strict52-article scope, immutable base a8aa8530, exact BEFORE/AFTER messages. Source hashes and final render hashes are in §8.1/§8.2/§8.5. Rule source is scripts/check-blog-content-template.mjs: base SHA256 20905e313ebbd1f01ea3289d9abcc1c3be26b35040a1df4df44fcc509f4c9df3; current cc17290d8e49614bd39446dc63692c05a1c528cd0356a1c61894e3a866d487f3. The only checker delta changes Git comparison HEAD to immutable release base; editorial predicates and thresholds are identical. No diagnostic is accepted or waived. Numeric improvement is not semantic PASS.

| Route / exact source | BEFORE rule/message | CURRENT rule/message | Classification / decision |
| --- | --- | --- | --- |
| [/blog/ai-carousel-content-strategy](http://127.0.0.1:56433/blog/ai-carousel-content-strategy/); ai-carousel-content-strategy.md | P0: Content depth too thin for guide. Body chars: 4354 (min 8000). | P0: Content depth too thin for guide. Body chars: 4565 (min 8000). | IMPROVED — BLOCKED |
| [/blog/ai-carousel-generator](http://127.0.0.1:56433/blog/ai-carousel-generator/); ai-carousel-generator.md | P0: Content depth too thin for primary product hub. Body chars: 3508 (min 6000). | P0: Content depth too thin for primary product hub. Body chars: 3857 (min 6000). | IMPROVED — BLOCKED |
| [/blog/ai-carousel-workflow](http://127.0.0.1:56433/blog/ai-carousel-workflow/); ai-carousel-workflow.md | P0: Content depth too thin for how_to. Body chars: 4146 (min 6000). | P0: Content depth too thin for how_to. Body chars: 4344 (min 6000). | IMPROVED — BLOCKED |
| [/blog/ai-carousel-workflow](http://127.0.0.1:56433/blog/ai-carousel-workflow/); ai-carousel-workflow.md | P0: Missing practical examples/scenarios/mistakes/comparison section. | P0: Missing practical examples/scenarios/mistakes/comparison section. | SAME DIAGNOSTIC — BLOCKED |
| [/blog/ai-social-media-manager](http://127.0.0.1:56433/blog/ai-social-media-manager/); ai-social-media-manager.md | P0: Content depth too thin for guide. Body chars: 4285 (min 8000). | P0: Content depth too thin for guide. Body chars: 4285 (min 8000). | SAME DIAGNOSTIC — BLOCKED |
| [/blog/ai-social-media-manager](http://127.0.0.1:56433/blog/ai-social-media-manager/); ai-social-media-manager.md | P0: Quick Answer must be a YAML block-list with 4-5 non-empty items. | P0: Quick Answer must be a YAML block-list with 4-5 non-empty items. | SAME DIAGNOSTIC — BLOCKED |
| [/blog/ai-social-media-manager](http://127.0.0.1:56433/blog/ai-social-media-manager/); ai-social-media-manager.md | P0: Missing practical examples/scenarios/mistakes/comparison section. | P0: Missing practical examples/scenarios/mistakes/comparison section. | SAME DIAGNOSTIC — BLOCKED |
| [/blog/best-carousel-cta-examples](http://127.0.0.1:56433/blog/best-carousel-cta-examples/); best-carousel-cta-examples.md | P0: Content depth too thin for guide. Body chars: 3800 (min 8000). | P0: Content depth too thin for guide. Body chars: 4452 (min 8000). | IMPROVED — BLOCKED |
| [/blog/carousel-post-mistakes](http://127.0.0.1:56433/blog/carousel-post-mistakes/); carousel-post-mistakes.md | P0: Content depth too thin for guide. Body chars: 4303 (min 8000). | P0: Content depth too thin for guide. Body chars: 4303 (min 8000). | SAME DIAGNOSTIC — BLOCKED |
| [/blog/chatgpt-for-social-media-marketing](http://127.0.0.1:56433/blog/chatgpt-for-social-media-marketing/); chatgpt-for-social-media-marketing.md | P0: Content depth too thin for guide. Body chars: 4819 (min 8000). | P0: Content depth too thin for guide. Body chars: 4938 (min 8000). | IMPROVED — BLOCKED |
| [/blog/chatgpt-for-social-media-marketing](http://127.0.0.1:56433/blog/chatgpt-for-social-media-marketing/); chatgpt-for-social-media-marketing.md | P0: Insufficient depth structure for guide. H2 count: 2 (min 4). | P0: Insufficient depth structure for guide. H2 count: 2 (min 4). | SAME DIAGNOSTIC — BLOCKED |
| [/ru/blog/chatgpt-prompty-dlya-kopirajtera](http://127.0.0.1:56433/ru/blog/chatgpt-prompty-dlya-kopirajtera/); chatgpt-prompty-dlya-kopirajtera.md | P0: Content depth too thin for guide. Body chars: 5698 (min 8000). | P0: Content depth too thin for guide. Body chars: 5698 (min 8000). | SAME DIAGNOSTIC — BLOCKED |
| [/blog/content-calendar-to-carousel](http://127.0.0.1:56433/blog/content-calendar-to-carousel/); content-calendar-to-carousel.md | P0: Content depth too thin for guide. Body chars: 1171 (min 8000). | P0: Content depth too thin for guide. Body chars: 5461 (min 8000). | IMPROVED — BLOCKED |
| [/ru/blog/dizayn-karuseley-neyroset-vs-canva](http://127.0.0.1:56433/ru/blog/dizayn-karuseley-neyroset-vs-canva/); dizayn-karuseley-neyroset-vs-canva.md | P0: Content depth too thin for thought-leadership/comparison. Body chars: 3640 (min 6000). | P0: Content depth too thin for thought-leadership/comparison. Body chars: 3840 (min 6000). | IMPROVED — BLOCKED |
| [/ru/blog/dizayn-karuseley-neyroset-vs-canva](http://127.0.0.1:56433/ru/blog/dizayn-karuseley-neyroset-vs-canva/); dizayn-karuseley-neyroset-vs-canva.md | P0: Quick Answer must be a YAML block-list with 4-5 non-empty items. | P0: Quick Answer must be a YAML block-list with 4-5 non-empty items. | SAME DIAGNOSTIC — BLOCKED |
| [/blog/facebook-post-ideas-for-small-business](http://127.0.0.1:56433/blog/facebook-post-ideas-for-small-business/); facebook-post-ideas-for-small-business.md | P0: Content depth too thin for guide. Body chars: 3186 (min 8000). | P0: Content depth too thin for guide. Body chars: 4066 (min 8000). | IMPROVED — BLOCKED |
| [/blog/guide-to-ai-social-media-post-generators](http://127.0.0.1:56433/blog/guide-to-ai-social-media-post-generators/); guide-to-ai-social-media-post-generators.md | P0: Content depth too thin for guide. Body chars: 2822 (min 8000). | P0: Content depth too thin for guide. Body chars: 2822 (min 8000). | SAME DIAGNOSTIC — BLOCKED |
| [/blog/guide-to-ai-social-media-post-generators](http://127.0.0.1:56433/blog/guide-to-ai-social-media-post-generators/); guide-to-ai-social-media-post-generators.md | P0: Missing practical examples/scenarios/mistakes/comparison section. | P0: Missing practical examples/scenarios/mistakes/comparison section. | SAME DIAGNOSTIC — BLOCKED |
| [/blog/how-to-brainstorm-carousel-topics-with-ai](http://127.0.0.1:56433/blog/how-to-brainstorm-carousel-topics-with-ai/); how-to-brainstorm-carousel-topics-with-ai.md | P0: Content depth too thin for how_to. Body chars: 4523 (min 6000). | P0: Content depth too thin for how_to. Body chars: 4603 (min 6000). | IMPROVED — BLOCKED |
| [/blog/how-to-build-a-personal-brand-on-linkedin-with-ai](http://127.0.0.1:56433/blog/how-to-build-a-personal-brand-on-linkedin-with-ai/); how-to-build-a-personal-brand-on-linkedin-with-ai.md | P0: Content depth too thin for guide. Body chars: 3991 (min 8000). | P0: Content depth too thin for guide. Body chars: 3992 (min 8000). | IMPROVED — BLOCKED |
| [/blog/how-to-build-a-personal-brand-on-linkedin-with-ai](http://127.0.0.1:56433/blog/how-to-build-a-personal-brand-on-linkedin-with-ai/); how-to-build-a-personal-brand-on-linkedin-with-ai.md | P0: Missing practical examples/scenarios/mistakes/comparison section. | P0: Missing practical examples/scenarios/mistakes/comparison section. | SAME DIAGNOSTIC — BLOCKED |
| [/blog/how-to-increase-instagram-engagement-with-carousels](http://127.0.0.1:56433/blog/how-to-increase-instagram-engagement-with-carousels/); how-to-increase-instagram-engagement-with-carousels.md | P0: Content depth too thin for guide. Body chars: 3976 (min 8000). | P0: Content depth too thin for guide. Body chars: 4484 (min 8000). | IMPROVED — BLOCKED |
| [/blog/how-to-increase-instagram-engagement-with-carousels](http://127.0.0.1:56433/blog/how-to-increase-instagram-engagement-with-carousels/); how-to-increase-instagram-engagement-with-carousels.md | P0: Quick Answer must be a YAML block-list with 4-5 non-empty items. | P0: Quick Answer must be a YAML block-list with 4-5 non-empty items. | SAME DIAGNOSTIC — BLOCKED |
| [/blog/how-to-make-an-instagram-carousel-with-ai](http://127.0.0.1:56433/blog/how-to-make-an-instagram-carousel-with-ai/); how-to-make-an-instagram-carousel-with-ai.md | P0: Content depth too thin for how-to. Body chars: 3250 (min 6000). | P0: Content depth too thin for how-to. Body chars: 4146 (min 6000). | IMPROVED — BLOCKED |
| [/blog/how-to-make-an-instagram-carousel-with-ai](http://127.0.0.1:56433/blog/how-to-make-an-instagram-carousel-with-ai/); how-to-make-an-instagram-carousel-with-ai.md | P0: Quick Answer must be a YAML block-list with 4-5 non-empty items. | P0: Quick Answer must be a YAML block-list with 4-5 non-empty items. | SAME DIAGNOSTIC — BLOCKED |
| [/blog/how-to-make-linkedin-carousel-with-ai](http://127.0.0.1:56433/blog/how-to-make-linkedin-carousel-with-ai/); how-to-make-linkedin-carousel-with-ai.md | P0: Quick Answer must be a YAML block-list with 4-5 non-empty items. | P0: Quick Answer must be a YAML block-list with 4-5 non-empty items. | SAME DIAGNOSTIC — BLOCKED |
| [/blog/how-to-repurpose-podcasts-into-ai-carousels](http://127.0.0.1:56433/blog/how-to-repurpose-podcasts-into-ai-carousels/); how-to-repurpose-podcasts-into-ai-carousels.md | P0: Content depth too thin for how_to. Body chars: 3980 (min 6000). | P0: Content depth too thin for how_to. Body chars: 3980 (min 6000). | SAME DIAGNOSTIC — BLOCKED |
| [/blog/how-to-scale-your-smm-agency-with-ai](http://127.0.0.1:56433/blog/how-to-scale-your-smm-agency-with-ai/); how-to-scale-your-smm-agency-with-ai.md | P0: Content depth too thin for guide. Body chars: 3602 (min 8000). | P0: Content depth too thin for guide. Body chars: 3639 (min 8000). | IMPROVED — BLOCKED |
| [/blog/how-to-scale-your-smm-agency-with-ai](http://127.0.0.1:56433/blog/how-to-scale-your-smm-agency-with-ai/); how-to-scale-your-smm-agency-with-ai.md | P0: Quick Answer must be a YAML block-list with 4-5 non-empty items. | P0: Quick Answer must be a YAML block-list with 4-5 non-empty items. | SAME DIAGNOSTIC — BLOCKED |
| [/blog/instagram-carousel-cover-ideas](http://127.0.0.1:56433/blog/instagram-carousel-cover-ideas/); instagram-carousel-cover-ideas.md | P0: Content depth too thin for guide. Body chars: 6550 (min 8000). | P0: Content depth too thin for guide. Body chars: 6550 (min 8000). | SAME DIAGNOSTIC — BLOCKED |
| [/blog/instagram-carousel-cover-ideas](http://127.0.0.1:56433/blog/instagram-carousel-cover-ideas/); instagram-carousel-cover-ideas.md | P0: Insufficient depth structure for guide. H2 count: 3 (min 4). | P0: Insufficient depth structure for guide. H2 count: 3 (min 4). | SAME DIAGNOSTIC — BLOCKED |
| [/blog/instagram-carousel-ideas](http://127.0.0.1:56433/blog/instagram-carousel-ideas/); instagram-carousel-ideas.md | P0: Content depth too thin for listicle. Body chars: 4910 (min 6000). | P0: Content depth too thin for listicle. Body chars: 4932 (min 6000). | IMPROVED — BLOCKED |
| [/blog/instagram-carousel-ideas](http://127.0.0.1:56433/blog/instagram-carousel-ideas/); instagram-carousel-ideas.md | P0: Quick Answer must be a YAML block-list with 4-5 non-empty items. | P0: Quick Answer must be a YAML block-list with 4-5 non-empty items. | SAME DIAGNOSTIC — BLOCKED |
| [/blog/instagram-carousel-storytelling](http://127.0.0.1:56433/blog/instagram-carousel-storytelling/); instagram-carousel-storytelling.md | P0: Content depth too thin for guide. Body chars: 4469 (min 8000). | P0: Content depth too thin for guide. Body chars: 4597 (min 8000). | IMPROVED — BLOCKED |
| [/ru/blog/kak-napisat-ekspertnyj-post](http://127.0.0.1:56433/ru/blog/kak-napisat-ekspertnyj-post/); kak-napisat-ekspertnyj-post.md | P0: Content depth too thin for guide. Body chars: 2506 (min 8000). | P0: Content depth too thin for guide. Body chars: 2771 (min 8000). | IMPROVED — BLOCKED |
| [/ru/blog/kak-napisat-ekspertnyj-post](http://127.0.0.1:56433/ru/blog/kak-napisat-ekspertnyj-post/); kak-napisat-ekspertnyj-post.md | P0: Insufficient depth structure for guide. H2 count: 3 (min 4). | P0: Insufficient depth structure for guide. H2 count: 3 (min 4). | SAME DIAGNOSTIC — BLOCKED |
| [/ru/blog/kak-napisat-post-v-vk-s-pomoshyu-ii](http://127.0.0.1:56433/ru/blog/kak-napisat-post-v-vk-s-pomoshyu-ii/); kak-napisat-post-v-vk-s-pomoshyu-ii.md | P0: Content depth too thin for guide. Body chars: 2603 (min 8000). | P0: Content depth too thin for guide. Body chars: 3207 (min 8000). | IMPROVED — BLOCKED |
| [/ru/blog/kak-napisat-post-v-vk-s-pomoshyu-ii](http://127.0.0.1:56433/ru/blog/kak-napisat-post-v-vk-s-pomoshyu-ii/); kak-napisat-post-v-vk-s-pomoshyu-ii.md | P0: Insufficient depth structure for guide. H2 count: 3 (min 4). | P0: Insufficient depth structure for guide. H2 count: 3 (min 4). | SAME DIAGNOSTIC — BLOCKED |
| [/ru/blog/kak-peredelat-statyu-v-karusel-linkedin](http://127.0.0.1:56433/ru/blog/kak-peredelat-statyu-v-karusel-linkedin/); kak-peredelat-statyu-v-karusel-linkedin.md | P0: Content depth too thin for how-to/use-case. Body chars: 3313 (min 6000). | P0: Content depth too thin for how-to/use-case. Body chars: 3361 (min 6000). | IMPROVED — BLOCKED |
| [/ru/blog/kak-peredelat-statyu-v-karusel-linkedin](http://127.0.0.1:56433/ru/blog/kak-peredelat-statyu-v-karusel-linkedin/); kak-peredelat-statyu-v-karusel-linkedin.md | P0: Quick Answer must be a YAML block-list with 4-5 non-empty items. | P0: Quick Answer must be a YAML block-list with 4-5 non-empty items. | SAME DIAGNOSTIC — BLOCKED |
| [/ru/blog/kak-pisat-prodayushchie-posty-s-ii](http://127.0.0.1:56433/ru/blog/kak-pisat-prodayushchie-posty-s-ii/); kak-pisat-prodayushchie-posty-s-ii.md | P0: Content depth too thin for guide. Body chars: 3308 (min 8000). | P0: Content depth too thin for guide. Body chars: 3963 (min 8000). | IMPROVED — BLOCKED |
| [/ru/blog/kak-pisat-prodayushchie-posty-s-ii](http://127.0.0.1:56433/ru/blog/kak-pisat-prodayushchie-posty-s-ii/); kak-pisat-prodayushchie-posty-s-ii.md | P0: Quick Answer must be a YAML block-list with 4-5 non-empty items. | P0: Quick Answer must be a YAML block-list with 4-5 non-empty items. | SAME DIAGNOSTIC — BLOCKED |
| [/ru/blog/kak-sdelat-karusel-linkedin-s-ai](http://127.0.0.1:56433/ru/blog/kak-sdelat-karusel-linkedin-s-ai/); kak-sdelat-karusel-linkedin-s-ai.md | P0: Quick Answer must be a YAML block-list with 4-5 non-empty items. | P0: Quick Answer must be a YAML block-list with 4-5 non-empty items. | SAME DIAGNOSTIC — BLOCKED |
| [/ru/blog/kak-sdelat-shablon-dlya-postov-v-canva](http://127.0.0.1:56433/ru/blog/kak-sdelat-shablon-dlya-postov-v-canva/); kak-sdelat-shablon-dlya-postov-v-canva.md | P0: Content depth too thin for guide. Body chars: 3166 (min 8000). | P0: Content depth too thin for guide. Body chars: 4140 (min 8000). | IMPROVED — BLOCKED |
| [/ru/blog/kak-sdelat-shablon-dlya-postov-v-canva](http://127.0.0.1:56433/ru/blog/kak-sdelat-shablon-dlya-postov-v-canva/); kak-sdelat-shablon-dlya-postov-v-canva.md | P0: Missing product-led workflow section. | P0: Missing product-led workflow section. | SAME DIAGNOSTIC — BLOCKED |
| [/blog/linkedin-carousel-hooks](http://127.0.0.1:56433/blog/linkedin-carousel-hooks/); linkedin-carousel-hooks.md | P0: Content depth too thin for listicle/guide. Body chars: 4893 (min 6000). | P0: Content depth too thin for listicle/guide. Body chars: 5576 (min 6000). | IMPROVED — BLOCKED |
| [/blog/linkedin-carousel-ideas](http://127.0.0.1:56433/blog/linkedin-carousel-ideas/); linkedin-carousel-ideas.md | P0: Quick Answer must be a YAML block-list with 4-5 non-empty items. | P0: Quick Answer must be a YAML block-list with 4-5 non-empty items. | SAME DIAGNOSTIC — BLOCKED |
| [/blog/linkedin-carousel-size-and-specs](http://127.0.0.1:56433/blog/linkedin-carousel-size-and-specs/); linkedin-carousel-size-and-specs.md | P0: Content depth too thin for guide. Body chars: 2965 (min 8000). | P0: Content depth too thin for guide. Body chars: 2965 (min 8000). | SAME DIAGNOSTIC — BLOCKED |
| [/blog/linkedin-carousel-size-and-specs](http://127.0.0.1:56433/blog/linkedin-carousel-size-and-specs/); linkedin-carousel-size-and-specs.md | P0: Missing practical examples/scenarios/mistakes/comparison section. | P0: Missing practical examples/scenarios/mistakes/comparison section. | SAME DIAGNOSTIC — BLOCKED |
| [/blog/linkedin-content-strategy-for-founders](http://127.0.0.1:56433/blog/linkedin-content-strategy-for-founders/); linkedin-content-strategy-for-founders.md | P0: Content depth too thin for guide. Body chars: 4135 (min 8000). | P0: Content depth too thin for guide. Body chars: 4585 (min 8000). | IMPROVED — BLOCKED |
| [/blog/linkedin-creator-tools-guide](http://127.0.0.1:56433/blog/linkedin-creator-tools-guide/); linkedin-creator-tools-guide.md | P0: Content depth too thin for guide. Body chars: 4373 (min 8000). | P0: Content depth too thin for guide. Body chars: 4647 (min 8000). | IMPROVED — BLOCKED |
| [/blog/linkedin-document-post-examples](http://127.0.0.1:56433/blog/linkedin-document-post-examples/); linkedin-document-post-examples.md | P0: Content depth too thin for guide. Body chars: 3185 (min 8000). | P0: Content depth too thin for guide. Body chars: 5055 (min 8000). | IMPROVED — BLOCKED |
| [/blog/linkedin-document-post-examples](http://127.0.0.1:56433/blog/linkedin-document-post-examples/); linkedin-document-post-examples.md | P0: Insufficient depth structure for guide. H2 count: 3 (min 4). | P0: Insufficient depth structure for guide. H2 count: 3 (min 4). | SAME DIAGNOSTIC — BLOCKED |
| [/blog/linkedin-pdf-carousel](http://127.0.0.1:56433/blog/linkedin-pdf-carousel/); linkedin-pdf-carousel.md | P0: Content depth too thin for guide. Body chars: 2732 (min 8000). | P0: Content depth too thin for guide. Body chars: 2732 (min 8000). | SAME DIAGNOSTIC — BLOCKED |
| [/blog/linkedin-pdf-carousel](http://127.0.0.1:56433/blog/linkedin-pdf-carousel/); linkedin-pdf-carousel.md | P0: Insufficient depth structure for guide. H2 count: 3 (min 4). | P0: Insufficient depth structure for guide. H2 count: 3 (min 4). | SAME DIAGNOSTIC — BLOCKED |
| [/blog/linkedin-pdf-carousel](http://127.0.0.1:56433/blog/linkedin-pdf-carousel/); linkedin-pdf-carousel.md | P0: Missing practical examples/scenarios/mistakes/comparison section. | P0: Missing practical examples/scenarios/mistakes/comparison section. | SAME DIAGNOSTIC — BLOCKED |
| [/blog/repurpose-blog-post-linkedin-carousel-ai](http://127.0.0.1:56433/blog/repurpose-blog-post-linkedin-carousel-ai/); repurpose-blog-post-linkedin-carousel-ai.md | P0: Content depth too thin for guide. Body chars: 7467 (min 8000). | P0: Content depth too thin for guide. Body chars: 7467 (min 8000). | SAME DIAGNOSTIC — BLOCKED |
| [/blog/social-media-post-ideas-for-business](http://127.0.0.1:56433/blog/social-media-post-ideas-for-business/); social-media-post-ideas-for-business.md | P0: Content depth too thin for guide. Body chars: 5847 (min 8000). | P0: Content depth too thin for guide. Body chars: 5901 (min 8000). | IMPROVED — BLOCKED |
| [/ru/blog/temy-dlya-postov-v-linkedin](http://127.0.0.1:56433/ru/blog/temy-dlya-postov-v-linkedin/); temy-dlya-postov-v-linkedin.md | P0: Content depth too thin for guide. Body chars: 6954 (min 8000). | P0: Content depth too thin for guide. Body chars: 7077 (min 8000). | IMPROVED — BLOCKED |
| [/blog/text-to-carousel-ai](http://127.0.0.1:56433/blog/text-to-carousel-ai/); text-to-carousel-ai.md | P0: Content depth too thin for guide. Body chars: 1022 (min 8000). | P0: Content depth too thin for guide. Body chars: 3590 (min 8000). | IMPROVED — BLOCKED |
| [/blog/text-to-carousel-ai](http://127.0.0.1:56433/blog/text-to-carousel-ai/); text-to-carousel-ai.md | P0: Insufficient depth structure for guide. H2 count: 1 (min 4). | P0: Insufficient depth structure for guide. H2 count: 3 (min 4). | IMPROVED — BLOCKED |
| [/blog/viral-linkedin-post-examples](http://127.0.0.1:56433/blog/viral-linkedin-post-examples/); viral-linkedin-post-examples.md | P0: Content depth too thin for guide. Body chars: 5033 (min 8000). | P0: Content depth too thin for guide. Body chars: 5269 (min 8000). | IMPROVED — BLOCKED |
| [/blog/viral-linkedin-post-examples](http://127.0.0.1:56433/blog/viral-linkedin-post-examples/); viral-linkedin-post-examples.md | P0: Insufficient depth structure for guide. H2 count: 2 (min 4). | P0: Insufficient depth structure for guide. H2 count: 2 (min 4). | SAME DIAGNOSTIC — BLOCKED |
| [/blog/viral-linkedin-post-examples](http://127.0.0.1:56433/blog/viral-linkedin-post-examples/); viral-linkedin-post-examples.md | P0: Quick Answer must be a YAML block-list with 4-5 non-empty items. | P0: Quick Answer must be a YAML block-list with 4-5 non-empty items. | SAME DIAGNOSTIC — BLOCKED |
| [/blog/youtube-to-linkedin-carousel-ai](http://127.0.0.1:56433/blog/youtube-to-linkedin-carousel-ai/); youtube-to-linkedin-carousel-ai.md | P0: Content depth too thin for how-to/use-case. Body chars: 3607 (min 6000). | P0: Content depth too thin for how-to/use-case. Body chars: 3607 (min 6000). | SAME DIAGNOSTIC — BLOCKED |
| [/blog/youtube-to-linkedin-carousel-ai](http://127.0.0.1:56433/blog/youtube-to-linkedin-carousel-ai/); youtube-to-linkedin-carousel-ai.md | P0: Missing practical examples/scenarios/mistakes/comparison section. | P0: Missing practical examples/scenarios/mistakes/comparison section. | SAME DIAGNOSTIC — BLOCKED |

Resolved diagnostics (11): the individual rule no longer fails, not a publication verdict for its article.

- src/content/blog/articles/chatgpt-for-social-media-marketing.md: P0: Missing practical examples/scenarios/mistakes/comparison section.
- src/content/blog/articles/content-calendar-to-carousel.md: P0: Insufficient depth structure for guide. H2 count: 1 (min 4).
- src/content/blog/articles/content-calendar-to-carousel.md: P0: Missing practical examples/scenarios/mistakes/comparison section.
- src/content/blog/articles/facebook-post-ideas-for-small-business.md: P0: Missing carousel bridge.
- src/content/blog/articles/facebook-post-ideas-for-small-business.md: P0: Missing practical examples/scenarios/mistakes/comparison section.
- src/content/blog/articles/how-to-increase-instagram-engagement-with-carousels.md: P0: Missing practical examples/scenarios/mistakes/comparison section.
- src/content/blog/articles/kak-napisat-post-v-vk-s-pomoshyu-ii.md: P0: Missing carousel bridge.
- src/content/blog/articles/kak-napisat-post-v-vk-s-pomoshyu-ii.md: P0: Missing practical examples/scenarios/mistakes/comparison section.
- src/content/blog/articles/linkedin-creator-tools-guide.md: P0: Missing practical examples/scenarios/mistakes/comparison section.
- src/content/blog/articles/text-to-carousel-ai.md: P0: Missing practical examples/scenarios/mistakes/comparison section.
- src/content/blog/articles/viral-linkedin-post-examples.md: P0: Missing product-led workflow section.

### 9.2 Historical additional floor targets F28–F38 (current comparison in §9.1)

Исторический перечень дополнительных targets, не текущий verdict: изменения отдельных сообщений теперь классифицированы в §9.1, а текущие source/render hashes — в §8. Это не blanket grandfathering. Нужны отдельные route/artifact-bound decisions либо substantive revision; старые числовые строки ниже нельзя выдавать за current evidence.

| Decision | Exact remaining error |
| --- | --- |
| F28 | ai-social-media-manager.md: P0: Content depth too thin for guide. Body chars: 4285 (min 8000). |
| F29 | carousel-post-mistakes.md: P0: Content depth too thin for guide. Body chars: 4303 (min 8000). |
| F30 | chatgpt-prompty-dlya-kopirajtera.md: P0: Content depth too thin for guide. Body chars: 5698 (min 8000). |
| F31 | guide-to-ai-social-media-post-generators.md: P0: Content depth too thin for guide. Body chars: 2822 (min 8000). |
| F32 | how-to-repurpose-podcasts-into-ai-carousels.md: P0: Content depth too thin for how_to. Body chars: 3980 (min 6000). |
| F33 | instagram-carousel-cover-ideas.md: P0: Content depth too thin for guide. Body chars: 6550 (min 8000). |
| F34 | kak-napisat-post-v-vk-s-pomoshyu-ii.md: P0: Content depth too thin for guide. Body chars: 2603 (min 8000). |
| F35 | linkedin-carousel-size-and-specs.md: P0: Content depth too thin for guide. Body chars: 2965 (min 8000). |
| F36 | linkedin-pdf-carousel.md: P0: Content depth too thin for guide. Body chars: 2732 (min 8000). |
| F37 | repurpose-blog-post-linkedin-carousel-ai.md: P0: Content depth too thin for guide. Body chars: 7467 (min 8000). |
| F38 | youtube-to-linkedin-carousel-ai.md: P0: Content depth too thin for how-to/use-case. Body chars: 3607 (min 6000). |

Resolved six pre-existing structural diagnostics (mechanical resolution ≠ user-value proof):

```text
chatgpt-for-social-media-marketing.md: P0: Missing practical examples/scenarios/mistakes/comparison section.
content-calendar-to-carousel.md: P0: Insufficient depth structure for guide. H2 count: 1 (min 4).
content-calendar-to-carousel.md: P0: Missing practical examples/scenarios/mistakes/comparison section.
linkedin-creator-tools-guide.md: P0: Missing practical examples/scenarios/mistakes/comparison section.
text-to-carousel-ai.md: P0: Missing practical examples/scenarios/mistakes/comparison section.
viral-linkedin-post-examples.md: P0: Missing product-led workflow section.
```

### 9.3 Exact strict frontmatter errors (36, identical baseline)

Missing keyword/topic/research/approval fields не заполнены фиктивными record IDs, scores или `approvedForPublish=true`. Противоречие legacy-live state и current strict-maintenance contract требует настоящих records/Owner decision M01. Не означает, что Google видит36technical noindex pages.

```text
- Article "ai-facebook-post-generator": missing required fields: preview, approvedForPublish, keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, mockupStatus
- Article "ai-instagram-carousel-generator": missing required fields: language, approvedForPublish, keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, quickAnswerTitle
- Article "ai-social-media-manager": missing required fields: slug, preview, approvedForPublish, keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, mockupStatus
- Article "best-carousel-cta-examples": missing required fields: preview, approvedForPublish, keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, relatedProductRoute, quickAnswerTitle, mockupStatus
- Article "chatgpt-for-social-media-marketing": missing required fields: slug, preview, approvedForPublish, keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, mockupStatus
- Article "chatgpt-prompty-dlya-kopirajtera": missing required fields: slug, preview, approvedForPublish, keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, mockupStatus
- Article "dizayn-karuseley-neyroset-vs-canva": missing required fields: approvedForPublish, keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, relatedProductRoute, quickAnswerTitle
- Article "facebook-post-ideas-for-small-business": missing required fields: preview, approvedForPublish, keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, relatedProductRoute, quickAnswerTitle, mockupStatus
- Article "generaciya-postov-karuseley": missing required fields: preview, approvedForPublish, keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, relatedProductRoute, mockupStatus
- Article "guide-to-ai-social-media-post-generators": missing required fields: preview, approvedForPublish, keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, relatedProductRoute, quickAnswerTitle, mockupStatus
- Article "how-to-build-a-personal-brand-on-linkedin-with-ai": missing required fields: slug, preview, approvedForPublish, keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, mockupStatus
- Article "how-to-increase-instagram-engagement-with-carousels": missing required fields: slug, preview, approvedForPublish, keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, mockupStatus
- Article "how-to-make-linkedin-carousel-with-ai": missing required fields: keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, quickAnswerTitle
- Article "how-to-scale-your-smm-agency-with-ai": missing required fields: slug, preview, approvedForPublish, keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, mockupStatus
- Article "how-to-schedule-linkedin-carousel": missing required fields: preview, approvedForPublish, keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, mockupStatus
- Article "instagram-carousel-cover-ideas": missing required fields: preview, approvedForPublish, keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, relatedProductRoute, quickAnswerTitle, mockupStatus
- Article "instagram-carousel-ideas": missing required fields: approvedForPublish, keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, relatedProductRoute, quickAnswerTitle, mockupStatus
- Article "instagram-carousel-storytelling": missing required fields: slug, preview, approvedForPublish, keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, mockupStatus
- Article "kak-napisat-ekspertnyj-post": missing required fields: preview, approvedForPublish, keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, relatedProductRoute, quickAnswerTitle, mockupStatus
- Article "kak-napisat-post-v-vk-s-pomoshyu-ii": missing required fields: preview, approvedForPublish, keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, relatedProductRoute, quickAnswerTitle, mockupStatus
- Article "kak-peredelat-statyu-v-karusel-linkedin": missing required fields: approvedForPublish, keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, relatedProductRoute, quickAnswerTitle
- Article "kak-pisat-prodayushchie-posty-s-ii": missing required fields: slug, preview, approvedForPublish, keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, mockupStatus
- Article "kak-sdelat-karusel-linkedin-s-ai": missing required fields: keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, quickAnswerTitle
- Article "kak-sdelat-shablon-dlya-postov-v-canva": missing required fields: slug, preview, approvedForPublish, keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, mockupStatus
- Article "linkedin-carousel-hooks": missing required fields: keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, quickAnswerTitle
- Article "linkedin-carousel-ideas": missing required fields: keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, quickAnswerTitle
- Article "linkedin-carousel-size-and-specs": missing required fields: preview, approvedForPublish, keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, relatedProductRoute, quickAnswerTitle, mockupStatus
- Article "linkedin-content-strategy-for-founders": missing required fields: preview, approvedForPublish, keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, relatedProductRoute, quickAnswerTitle, mockupStatus
- Article "linkedin-creator-tools-guide": missing required fields: slug, preview, approvedForPublish, keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, mockupStatus
- Article "linkedin-document-post-examples": missing required fields: preview, approvedForPublish, keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, relatedProductRoute, quickAnswerTitle, mockupStatus
- Article "linkedin-pdf-carousel": missing required fields: preview, approvedForPublish, keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, relatedProductRoute, quickAnswerTitle, mockupStatus
- Article "repurpose-blog-post-linkedin-carousel-ai": missing required fields: approvedForPublish, keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, relatedProductRoute
- Article "social-media-post-ideas-for-business": missing required fields: preview, approvedForPublish, keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, relatedProductRoute, quickAnswerTitle, mockupStatus
- Article "temy-dlya-postov-v-linkedin": missing required fields: preview, approvedForPublish, keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, relatedProductRoute, quickAnswerTitle, mockupStatus
- Article "viral-linkedin-post-examples": missing required fields: slug, preview, approvedForPublish, keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug, mockupStatus
- Article "youtube-to-linkedin-carousel-ai": missing required fields: keywordRecord, topicScoreId, finalPriorityScore, priorityTier, productCapabilityIds, intentId, clusterId, articleRole, hubSlug
```

### 9.4 Positioning, quality, lint — exact baseline debt

Positioning5errors повторяются на чистом base; часть regex смешивает input/draft-procedure с product output, но это не снимает checker FAIL. Не возвращено обещание perfect output ради позиционирования.

```text
- [P0] src/components/InstagramPostPageRu.jsx:37 positions a product output as unfinished (draft-output-ru). Видимый продуктовый текст должен обещать готовый результат, а не черновик. Snippet: "я Instagram', heroSubtitle: <>GoToFlow помогает превратить тему или черновик в пост для Instagram: придумать хук, собрать основной текст, визуальн"
- [P0] src/components/seo/template-page/SeoPageTemplateCategories.jsx:11 positions a product output as unfinished (draft-output-en). Visible product copy must promise a finished or publish-ready result, not a draft. Snippet: "list' : 'Чек-лист'}</div> {(isEnglish ? ['Define the post goal', 'Draft a clear hook', 'Add verified details'] : ['Определить цель карусели',"
- [P0] src/components/seo/template-page/SeoProductWorkflowShowcase.jsx:230 positions a product output as unfinished (draft-output-en). Visible product copy must promise a finished or publish-ready result, not a draft. Snippet: "ap-1.5 text-[9px] text-zinc-400"> {visualData.variant !== 'text-draft' && ( <> <span className="rounded-md border border-"
- [P0] src/components/seo/template-page/SeoReadyCarouselShowcase.jsx:13 positions a product output as unfinished (draft-output-en). Visible product copy must promise a finished or publish-ready result, not a draft. Snippet: "page.readyCarouselShowcaseCta || { label: isEnglish ? 'Prepare a draft' : 'Подготовить результат', href: 'https://app.gotoflow.io',"
- [P0] src/components/seo/template-page/SeoReadyCarouselShowcase.jsx:93 positions a product output as unfinished (draft-output-ru). Видимый продуктовый текст должен обещать готовый результат, а не черновик. Snippet: "00"> {isEnglish ? 'Editable draft' : 'Редактируемый черновик'} </span> <p className="mt-5 text-lg"
```

Quality contract (same clean-base error; protected article):

```text
pererabotka-kontenta-dlya-socsetey.md: Misleading claim detected: 'идеально'
```

Lint:63errors+1warning и на clean main, и на final. Multiset comparison учитывает duplicate messages one-to-one:0added/0removed, только Hero `isMobile` line366→367. Это location drift, не новый unused variable. Не исправлены unrelated lint defects и не выдан PASS.

<details>
<summary>Полный current lint diagnostic inventory</summary>

| File:line:column | Rule | Severity | Message |
| --- | --- | --- | --- |
| extract_seo.js:1:12 | no-undef | 2 | 'require' is not defined. |
| extract_seo.js:2:14 | no-undef | 2 | 'require' is not defined. |
| extract_seo.js:27:47 | no-undef | 2 | '__dirname' is not defined. |
| extract_seo.js:54:12 | no-unused-vars | 2 | 'e' is defined but never used. |
| extract_seo.js:54:15 | no-empty | 2 | Empty block statement. |
| src/components/AIContentPage.jsx:4:10 | no-unused-vars | 2 | 'motion' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/AIContentPageRu.jsx:4:10 | no-unused-vars | 2 | 'motion' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/BottomCTA.jsx:3:10 | no-unused-vars | 2 | 'motion' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/CookieBanner.jsx:2:10 | no-unused-vars | 2 | 'motion' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/DifferentiationSection.jsx:2:10 | no-unused-vars | 2 | 'motion' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/FAQSection.jsx:2:10 | no-unused-vars | 2 | 'motion' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/HeroSection.jsx:3:10 | no-unused-vars | 2 | 'motion' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/HeroSection.jsx:19:6 | react-hooks/exhaustive-deps | 1 | React Hook useEffect has a missing dependency: 'badges'. Either include it or remove the dependency array. |
| src/components/HeroSection.jsx:367:9 | no-unused-vars | 2 | 'isMobile' is assigned a value but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/HowItWorksSection.jsx:2:10 | no-unused-vars | 2 | 'motion' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/InstagramPostPage.jsx:4:10 | no-unused-vars | 2 | 'motion' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/InstagramPostPageRu.jsx:4:10 | no-unused-vars | 2 | 'motion' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/LinkedInCarouselPage.jsx:3:10 | no-unused-vars | 2 | 'motion' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/LinkedInCarouselPageRu.jsx:3:10 | no-unused-vars | 2 | 'motion' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/LinkedInPostPage.jsx:4:10 | no-unused-vars | 2 | 'motion' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/LinkedInPostPageRu.jsx:5:10 | no-unused-vars | 2 | 'motion' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/PricingPage.jsx:4:10 | no-unused-vars | 2 | 'motion' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/PricingPage.jsx:61:28 | no-unused-vars | 2 | 'Icon' is defined but never used. |
| src/components/PricingSection.jsx:2:10 | no-unused-vars | 2 | 'motion' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/PrivacyPolicy.jsx:2:10 | no-unused-vars | 2 | 'motion' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/ProblemSection.jsx:2:10 | no-unused-vars | 2 | 'motion' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/RuAICarouselGeneratorPage.jsx:3:10 | no-unused-vars | 2 | 'motion' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/TermsOfService.jsx:2:10 | no-unused-vars | 2 | 'motion' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/ToolsSection.jsx:2:10 | no-unused-vars | 2 | 'motion' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/ToolsSection.jsx:8:31 | no-unused-vars | 2 | 'Icon' is defined but never used. |
| src/components/UnifiedSystem.jsx:3:10 | no-unused-vars | 2 | 'motion' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/UserConsent.jsx:2:10 | no-unused-vars | 2 | 'motion' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/blog/templates/MarkdownSeoArticleTemplateV2.jsx:756:38 | no-unused-vars | 2 | 'isRu' is assigned a value but never used. |
| src/components/blog/templates/MarkdownSeoArticleTemplateV2.jsx:1040:26 | no-unused-vars | 2 | 'isRu' is defined but never used. |
| src/components/blog/templates/MarkdownSeoArticleTemplateV2.jsx:1155:31 | no-unused-vars | 2 | 'variant' is defined but never used. |
| src/components/carousel/CarouselSections.jsx:1:17 | no-unused-vars | 2 | 'useState' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/carousel/CarouselSections.jsx:3:10 | no-unused-vars | 2 | 'motion' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/carousel/CarouselSections2.jsx:3:10 | no-unused-vars | 2 | 'motion' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/carousel/CarouselSections2Ru.jsx:3:10 | no-unused-vars | 2 | 'motion' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/carousel/CarouselSectionsRu.jsx:1:17 | no-unused-vars | 2 | 'useState' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/carousel/CarouselSectionsRu.jsx:3:10 | no-unused-vars | 2 | 'motion' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/pricing/BillingToggle.jsx:2:10 | no-unused-vars | 2 | 'motion' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/pricing/PlanCard.jsx:3:10 | no-unused-vars | 2 | 'motion' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/pricing/PlanCard.jsx:7:14 | react-refresh/only-export-components | 2 | Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components. |
| src/components/pricing/PriceDisplay.jsx:2:10 | no-unused-vars | 2 | 'motion' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/components/pricing/PriceDisplay.jsx:5:14 | react-refresh/only-export-components | 2 | Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components. |
| src/components/seo/SeoSectionHeading.jsx:1:14 | react-refresh/only-export-components | 2 | Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components. |
| src/components/seo/SeoSectionHeading.jsx:11:14 | react-refresh/only-export-components | 2 | Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components. |
| src/components/seo/template-page/SeoProductWorkflowShowcase.jsx:108:35 | no-unused-vars | 2 | 'Icon' is defined but never used. |
| src/content/seoPages/helpers/contentReadiness.js:4:3 | no-unused-vars | 2 | 'getTemplateSectionOrder' is defined but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/content/seoPages/helpers/contentReadiness.js:198:7 | no-unused-vars | 2 | 'getRequirementText' is assigned a value but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/content/seoPages/helpers/validation.js:55:7 | no-unused-vars | 2 | 'hasCta' is assigned a value but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/content/seoPages/index.js:371:7 | no-unused-vars | 2 | 'seamlessGuideItems' is assigned a value but never used. Allowed unused vars must match /^[A-Z_]/u. |
| src/content/seoPages/index.js:4812:3 | no-unused-vars | 2 | 'workflowTitle' is defined but never used. |
| src/content/seoPages/index.js:4814:3 | no-unused-vars | 2 | 'formatsTitle' is defined but never used. |
| src/content/seoPages/index.js:4820:3 | no-unused-vars | 2 | 'finalCtaTitle' is defined but never used. |
| src/content/seoPages/index.js:6769:5 | no-dupe-keys | 2 | Duplicate key 'state'. |
| src/context/LanguageContext.jsx:68:7 | react-hooks/set-state-in-effect | 2 | Error: Calling setState synchronously within an effect can trigger cascading renders  Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following: * Update external systems with the latest state from React. * Subscribe for updates from some external system, calling setState in a callback function when external state changes.  Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).    66 \|   67 \|     if (routeLang) { > 68 \|       setLangState(routeLang);      \|       ^^^^^^^^^^^^ Avoid calling setState() directly within an effect   69 \|       return;   70 \|     }   71 \| |
| src/context/LanguageContext.jsx:86:5 | react-hooks/set-state-in-effect | 2 | Error: Calling setState synchronously within an effect can trigger cascading renders  Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following: * Update external systems with the latest state from React. * Subscribe for updates from some external system, calling setState in a callback function when external state changes.  Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).    84 \|   // Sync lang state when URL changes (e.g., browser back/forward)   85 \|   useEffect(() => { > 86 \|     setLangState(getInitialLang(location.pathname));      \|     ^^^^^^^^^^^^ Avoid calling setState() directly within an effect   87 \|   }, [location.pathname]);   88 \|   89 \|   // Update <html lang>, canonical, and hreflang when language changes |
| src/context/LanguageContext.jsx:218:14 | react-refresh/only-export-components | 2 | Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components. |
| src/hooks/useIsMobile.js:23:5 | react-hooks/set-state-in-effect | 2 | Error: Calling setState synchronously within an effect can trigger cascading renders  Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following: * Update external systems with the latest state from React. * Subscribe for updates from some external system, calling setState in a callback function when external state changes.  Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).    21 \|   22 \|     // Set initial value from the media-query (more reliable than innerWidth) > 23 \|     setIsMobile(mql.matches);      \|     ^^^^^^^^^^^ Avoid calling setState() directly within an effect   24 \|   25 \|     // Modern browsers support addEventListener on MediaQueryList   26 \|     mql.addEventListener('change', onChange); |
| src/utils/schemaGenerator.js:40:53 | no-unused-vars | 2 | 'lang' is assigned a value but never used. |
| src/utils/url.js:13:12 | no-unused-vars | 2 | 'error' is defined but never used. |
| src/utils/url.js:39:12 | no-unused-vars | 2 | 'error' is defined but never used. |

</details>

### 9.5 Body/structure observations всех52изменённых Markdown

Ни один count не означает SEMANTIC PASS. `raw chars` — тот же body counter механического floor; `plain chars/words` исключают Markdown link syntax/images/directive markers и body FAQ section. Navigation/breadcrumbs/footer/frontmatter/CTA не включены. В иных телах возможны repeated prose: агрегат не deduplicated semantic-depth score, повторные passages не засчитываются как доказательство глубины. Reviewer обязан отдельно проверять coverage/filler.

Project text-depth bands (existing contract, не новые квоты):Short how-to/answer6000–10000chars;Guide10000–18000;Comparison12000–22000;Pillar20000–35000. Нельзя механически сменить articleType на Short ради меньшего floor. Artifact-specific approved word band здесь **NOT ESTABLISHED**: тип/intent/research baseline должны обосновать её либо narrow exception; producer не создаёт blanket универсальное word minimum.

Read-only same-language base corpus observations (indexable published):EN57articles,301486plainchars/48747words;RU91articles,513015chars/70598words. Corpus ratios≈6.18EN/7.27RUcharacters-per-word — описательная калибровка, не user-value доказательство/перенос английской квоты на русский. Строки ниже позволяют review видеть фактическую длину и реальные residual rules без padding.

| Route | Existing articleType | Words | Plain chars | Raw chars | H2 | FAQ | Quick Answer items | Current Content/Template errors |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [/blog/ai-carousel-content-strategy](http://127.0.0.1:56433/blog/ai-carousel-content-strategy/) | guide | 666 | 4297 | 4565 | 5 | 5 | 5 | Content depth too thin for guide. Body chars: 4565 (min 8000). |
| [/blog/ai-carousel-generator](http://127.0.0.1:56433/blog/ai-carousel-generator/) | how-to | 599 | 3729 | 3857 | 4 | 5 | 4 | Content depth too thin for how-to. Body chars: 3857 (min 6000). |
| [/blog/ai-carousel-workflow](http://127.0.0.1:56433/blog/ai-carousel-workflow/) | how_to | 654 | 4034 | 4344 | 6 | 5 | 5 | Content depth too thin for how_to. Body chars: 4344 (min 6000).; Missing practical examples/scenarios/mistakes/comparison section. |
| [/blog/ai-content-creation](http://127.0.0.1:56433/blog/ai-content-creation/) | pillar | 2169 | 13970 | 14660 | 8 | 5 | 4 | 0 (machine only; semantic PENDING) |
| [/blog/ai-content-writing](http://127.0.0.1:56433/blog/ai-content-writing/) | guide | 1544 | 9705 | 9979 | 6 | 5 | 4 | 0 (machine only; semantic PENDING) |
| [/blog/ai-facebook-post-generator](http://127.0.0.1:56433/blog/ai-facebook-post-generator/) | workflow_article | 1158 | 7177 | 7584 | 5 | 5 | 4 | 0 (machine only; semantic PENDING) |
| [/blog/ai-instagram-carousel-generator](http://127.0.0.1:56433/blog/ai-instagram-carousel-generator/) | comparison_article | 3270 | 19996 | 20921 | 13 | 6 | 4 | 0 (machine only; semantic PENDING) |
| [/blog/ai-social-media-manager](http://127.0.0.1:56433/blog/ai-social-media-manager/) | guide | 658 | 4105 | 4285 | 4 | 5 | 3 | Content depth too thin for guide. Body chars: 4285 (min 8000).; Quick Answer must be a YAML block-list with 4-5 non-empty items.; Missing practical examples/scenarios/mistakes/comparison section. |
| [/blog/best-carousel-cta-examples](http://127.0.0.1:56433/blog/best-carousel-cta-examples/) | guide | 585 | 3512 | 3749 | 4 | 5 | 4 | Content depth too thin for guide. Body chars: 3749 (min 8000). |
| [/blog/carousel-post-mistakes](http://127.0.0.1:56433/blog/carousel-post-mistakes/) | guide | 695 | 4053 | 4303 | 6 | 5 | 5 | Content depth too thin for guide. Body chars: 4303 (min 8000). |
| [/blog/chatgpt-for-social-media-marketing](http://127.0.0.1:56433/blog/chatgpt-for-social-media-marketing/) | guide | 747 | 4757 | 4938 | 2 | 5 | 4 | Content depth too thin for guide. Body chars: 4938 (min 8000).; Insufficient depth structure for guide. H2 count: 2 (min 4). |
| [/blog/content-calendar-to-carousel](http://127.0.0.1:56433/blog/content-calendar-to-carousel/) | guide | 913 | 5376 | 5461 | 4 | 5 | 4 | Content depth too thin for guide. Body chars: 5461 (min 8000). |
| [/blog/facebook-post-ideas-for-small-business](http://127.0.0.1:56433/blog/facebook-post-ideas-for-small-business/) | guide | 501 | 3092 | 3243 | 4 | 5 | 4 | Content depth too thin for guide. Body chars: 3243 (min 8000).; Missing carousel bridge.; Missing practical examples/scenarios/mistakes/comparison section. |
| [/blog/guide-to-ai-social-media-post-generators](http://127.0.0.1:56433/blog/guide-to-ai-social-media-post-generators/) | guide | 462 | 2736 | 2822 | 4 | 5 | 4 | Content depth too thin for guide. Body chars: 2822 (min 8000).; Missing practical examples/scenarios/mistakes/comparison section. |
| [/blog/how-to-brainstorm-carousel-topics-with-ai](http://127.0.0.1:56433/blog/how-to-brainstorm-carousel-topics-with-ai/) | how_to | 706 | 4321 | 4603 | 5 | 5 | 5 | Content depth too thin for how_to. Body chars: 4603 (min 6000). |
| [/blog/how-to-build-a-personal-brand-on-linkedin-with-ai](http://127.0.0.1:56433/blog/how-to-build-a-personal-brand-on-linkedin-with-ai/) | guide | 612 | 3845 | 3992 | 5 | 5 | 4 | Content depth too thin for guide. Body chars: 3992 (min 8000).; Missing practical examples/scenarios/mistakes/comparison section. |
| [/blog/how-to-increase-instagram-engagement-with-carousels](http://127.0.0.1:56433/blog/how-to-increase-instagram-engagement-with-carousels/) | guide | 598 | 3647 | 3802 | 4 | 5 | 3 | Content depth too thin for guide. Body chars: 3802 (min 8000).; Quick Answer must be a YAML block-list with 4-5 non-empty items.; Missing practical examples/scenarios/mistakes/comparison section. |
| [/blog/how-to-make-an-instagram-carousel-with-ai](http://127.0.0.1:56433/blog/how-to-make-an-instagram-carousel-with-ai/) | how-to | 608 | 3688 | 4146 | 4 | 5 | 3 | Content depth too thin for how-to. Body chars: 4146 (min 6000).; Quick Answer must be a YAML block-list with 4-5 non-empty items. |
| [/blog/how-to-make-linkedin-carousel-with-ai](http://127.0.0.1:56433/blog/how-to-make-linkedin-carousel-with-ai/) | how-to | 1835 | 11099 | 11995 | 6 | 7 | 3 | Quick Answer must be a YAML block-list with 4-5 non-empty items. |
| [/blog/how-to-repurpose-podcasts-into-ai-carousels](http://127.0.0.1:56433/blog/how-to-repurpose-podcasts-into-ai-carousels/) | how_to | 594 | 3739 | 3980 | 5 | 5 | 5 | Content depth too thin for how_to. Body chars: 3980 (min 6000). |
| [/blog/how-to-scale-your-smm-agency-with-ai](http://127.0.0.1:56433/blog/how-to-scale-your-smm-agency-with-ai/) | guide | 536 | 3500 | 3639 | 4 | 5 | 3 | Content depth too thin for guide. Body chars: 3639 (min 8000).; Quick Answer must be a YAML block-list with 4-5 non-empty items. |
| [/blog/how-to-schedule-linkedin-carousel](http://127.0.0.1:56433/blog/how-to-schedule-linkedin-carousel/) | workflow_article | 1058 | 6713 | 7080 | 5 | 5 | 4 | 0 (machine only; semantic PENDING) |
| [/blog/instagram-carousel-cover-ideas](http://127.0.0.1:56433/blog/instagram-carousel-cover-ideas/) | guide | 1018 | 6206 | 6550 | 3 | 5 | 4 | Content depth too thin for guide. Body chars: 6550 (min 8000).; Insufficient depth structure for guide. H2 count: 3 (min 4). |
| [/blog/instagram-carousel-ideas](http://127.0.0.1:56433/blog/instagram-carousel-ideas/) | listicle | 763 | 4642 | 4932 | 4 | 5 | 3 | Content depth too thin for listicle. Body chars: 4932 (min 6000).; Quick Answer must be a YAML block-list with 4-5 non-empty items. |
| [/blog/instagram-carousel-storytelling](http://127.0.0.1:56433/blog/instagram-carousel-storytelling/) | guide | 726 | 4355 | 4597 | 4 | 5 | 4 | Content depth too thin for guide. Body chars: 4597 (min 8000). |
| [/blog/linkedin-carousel-hooks](http://127.0.0.1:56433/blog/linkedin-carousel-hooks/) | listicle/guide | 772 | 4540 | 4888 | 6 | 5 | 4 | Content depth too thin for listicle/guide. Body chars: 4888 (min 6000). |
| [/blog/linkedin-carousel-ideas](http://127.0.0.1:56433/blog/linkedin-carousel-ideas/) | article | 1541 | 9663 | 10223 | 13 | 6 | 3 | Quick Answer must be a YAML block-list with 4-5 non-empty items. |
| [/blog/linkedin-carousel-size-and-specs](http://127.0.0.1:56433/blog/linkedin-carousel-size-and-specs/) | guide | 462 | 2816 | 2965 | 4 | 5 | 4 | Content depth too thin for guide. Body chars: 2965 (min 8000).; Missing practical examples/scenarios/mistakes/comparison section. |
| [/blog/linkedin-content-strategy-for-founders](http://127.0.0.1:56433/blog/linkedin-content-strategy-for-founders/) | guide | 686 | 4306 | 4585 | 5 | 5 | 4 | Content depth too thin for guide. Body chars: 4585 (min 8000). |
| [/blog/linkedin-creator-tools-guide](http://127.0.0.1:56433/blog/linkedin-creator-tools-guide/) | guide | 691 | 4482 | 4647 | 5 | 5 | 4 | Content depth too thin for guide. Body chars: 4647 (min 8000). |
| [/blog/linkedin-document-post-examples](http://127.0.0.1:56433/blog/linkedin-document-post-examples/) | guide | 718 | 4535 | 4800 | 3 | 5 | 4 | Content depth too thin for guide. Body chars: 4800 (min 8000).; Insufficient depth structure for guide. H2 count: 3 (min 4). |
| [/blog/linkedin-pdf-carousel](http://127.0.0.1:56433/blog/linkedin-pdf-carousel/) | guide | 418 | 2604 | 2732 | 3 | 5 | 4 | Content depth too thin for guide. Body chars: 2732 (min 8000).; Insufficient depth structure for guide. H2 count: 3 (min 4).; Missing practical examples/scenarios/mistakes/comparison section. |
| [/blog/repurpose-blog-post-linkedin-carousel-ai](http://127.0.0.1:56433/blog/repurpose-blog-post-linkedin-carousel-ai/) | guide | 1164 | 7186 | 7467 | 8 | 5 | 5 | Content depth too thin for guide. Body chars: 7467 (min 8000). |
| [/blog/social-media-post-ideas-for-business](http://127.0.0.1:56433/blog/social-media-post-ideas-for-business/) | guide | 920 | 5628 | 5901 | 7 | 5 | 4 | Content depth too thin for guide. Body chars: 5901 (min 8000). |
| [/blog/text-to-carousel-ai](http://127.0.0.1:56433/blog/text-to-carousel-ai/) | guide | 527 | 3405 | 3590 | 3 | 5 | 4 | Content depth too thin for guide. Body chars: 3590 (min 8000).; Insufficient depth structure for guide. H2 count: 3 (min 4). |
| [/blog/viral-linkedin-post-examples](http://127.0.0.1:56433/blog/viral-linkedin-post-examples/) | guide | 636 | 4134 | 4435 | 2 | 5 | 3 | Content depth too thin for guide. Body chars: 4435 (min 8000).; Insufficient depth structure for guide. H2 count: 2 (min 4).; Quick Answer must be a YAML block-list with 4-5 non-empty items. |
| [/blog/youtube-to-linkedin-carousel-ai](http://127.0.0.1:56433/blog/youtube-to-linkedin-carousel-ai/) | how-to/use-case | 555 | 3370 | 3607 | 5 | 5 | 4 | Content depth too thin for how-to/use-case. Body chars: 3607 (min 6000).; Missing practical examples/scenarios/mistakes/comparison section. |
| [/ru/blog/chatgpt-prompty-dlya-kopirajtera](http://127.0.0.1:56433/ru/blog/chatgpt-prompty-dlya-kopirajtera/) | guide | 726 | 5371 | 5698 | 5 | 5 | 4 | Content depth too thin for guide. Body chars: 5698 (min 8000). |
| [/ru/blog/dizayn-karuseley-neyroset-vs-canva](http://127.0.0.1:56433/ru/blog/dizayn-karuseley-neyroset-vs-canva/) | thought-leadership/comparison | 500 | 3642 | 3840 | 5 | 5 | 3 | Content depth too thin for thought-leadership/comparison. Body chars: 3840 (min 6000).; Quick Answer must be a YAML block-list with 4-5 non-empty items. |
| [/ru/blog/foto-dlya-posta-instagram-vizual-s-ii](http://127.0.0.1:56433/ru/blog/foto-dlya-posta-instagram-vizual-s-ii/) | how_to | 840 | 6023 | 6378 | 7 | 5 | 5 | 0 (machine only; semantic PENDING) |
| [/ru/blog/generaciya-postov-karuseley](http://127.0.0.1:56433/ru/blog/generaciya-postov-karuseley/) | workflow_article | 845 | 6376 | 6691 | 5 | 5 | 4 | 0 (machine only; semantic PENDING) |
| [/ru/blog/ii-post-dlya-socsetej](http://127.0.0.1:56433/ru/blog/ii-post-dlya-socsetej/) | guide | 1331 | 9887 | 10364 | 7 | 5 | 4 | 0 (machine only; semantic PENDING) |
| [/ru/blog/kak-napisat-ekspertnyj-post](http://127.0.0.1:56433/ru/blog/kak-napisat-ekspertnyj-post/) | guide | 363 | 2654 | 2771 | 3 | 5 | 4 | Content depth too thin for guide. Body chars: 2771 (min 8000).; Insufficient depth structure for guide. H2 count: 3 (min 4). |
| [/ru/blog/kak-napisat-post-v-vk-s-pomoshyu-ii](http://127.0.0.1:56433/ru/blog/kak-napisat-post-v-vk-s-pomoshyu-ii/) | guide | 345 | 2471 | 2603 | 3 | 5 | 4 | Content depth too thin for guide. Body chars: 2603 (min 8000).; Insufficient depth structure for guide. H2 count: 3 (min 4).; Missing carousel bridge.; Missing practical examples/scenarios/mistakes/comparison section. |
| [/ru/blog/kak-peredelat-statyu-v-karusel-linkedin](http://127.0.0.1:56433/ru/blog/kak-peredelat-statyu-v-karusel-linkedin/) | how-to/use-case | 447 | 3192 | 3361 | 5 | 5 | 3 | Content depth too thin for how-to/use-case. Body chars: 3361 (min 6000).; Quick Answer must be a YAML block-list with 4-5 non-empty items. |
| [/ru/blog/kak-pisat-prodayushchie-posty-s-ii](http://127.0.0.1:56433/ru/blog/kak-pisat-prodayushchie-posty-s-ii/) | guide | 438 | 3163 | 3304 | 4 | 5 | 3 | Content depth too thin for guide. Body chars: 3304 (min 8000).; Quick Answer must be a YAML block-list with 4-5 non-empty items. |
| [/ru/blog/kak-sdelat-karusel-linkedin-s-ai](http://127.0.0.1:56433/ru/blog/kak-sdelat-karusel-linkedin-s-ai/) | how-to | 1833 | 13239 | 14045 | 15 | 7 | 3 | Quick Answer must be a YAML block-list with 4-5 non-empty items. |
| [/ru/blog/kak-sdelat-post-v-instagram-s-ii](http://127.0.0.1:56433/ru/blog/kak-sdelat-post-v-instagram-s-ii/) | how_to | 906 | 6415 | 6847 | 8 | 5 | 5 | 0 (machine only; semantic PENDING) |
| [/ru/blog/kak-sdelat-shablon-dlya-postov-v-canva](http://127.0.0.1:56433/ru/blog/kak-sdelat-shablon-dlya-postov-v-canva/) | guide | 539 | 3918 | 4140 | 5 | 5 | 4 | Content depth too thin for guide. Body chars: 4140 (min 8000).; Missing product-led workflow section. |
| [/ru/blog/kontent-plan-dlya-vk](http://127.0.0.1:56433/ru/blog/kontent-plan-dlya-vk/) | how_to | 1237 | 9365 | 9680 | 13 | 5 | 4 | 0 (machine only; semantic PENDING) |
| [/ru/blog/neyroset-dlya-postov](http://127.0.0.1:56433/ru/blog/neyroset-dlya-postov/) | guide | 1653 | 12707 | 13214 | 7 | 5 | 4 | 0 (machine only; semantic PENDING) |
| [/ru/blog/temy-dlya-postov-v-linkedin](http://127.0.0.1:56433/ru/blog/temy-dlya-postov-v-linkedin/) | guide | 998 | 6784 | 7077 | 10 | 5 | 4 | Content depth too thin for guide. Body chars: 7077 (min 8000). |

### 9.6 Exact final CTA copy / context, все37

§4 показывает routing и labels; ниже полный source-owned final primary block для meaning review. Это existing frontmatter, а не новый URL→content registry. App entry остаётся общим: login/credit/input/generation steps не запускались, deep-link preset/scheduler/bulk flow не заявляется. Independent reviewer должен отклонить boilerplate там, где оно не продолжает материал; при отсутствии доказательства uplift не утверждается.

| Route | Title | Text / description | Microcopy | Actual primary href |
| --- | --- | --- | --- | --- |
| `/blog/facebook-post-ideas-for-small-business` | Create your next month of Facebook posts | Use our AI tools to structure and create engaging community-focused content. | Brainstorming made simple | https://app.gotoflow.io/ |
| `/ru/blog/generaciya-postov-karuseley` | Перейдите на автоматическую генерацию | Создавайте карусели для LinkedIn и Инстаграм из темы или исходных материалов, затем проверяйте и экспортируйте результат. | Бесплатно — карта не нужна | https://app.gotoflow.io/ |
| `/blog/linkedin-document-post-examples` | Create a document post from your source | Choose one of these formats and turn your source material into slide copy, design, and a finished carousel. | No design skills needed | https://app.gotoflow.io/ |
| `/ru/blog/chatgpt-prompty-dlya-kopirajtera` | Превратите идею в готовую карусель | Используйте ChatGPT как необязательный инструмент для идей, а GoToFlow — как основной workflow: структура, текст по слайдам, визуальная подача, CTA и готовая карусель для экспорта. |  | https://app.gotoflow.io/ |
| `/ru/blog/kak-napisat-post-v-vk-s-pomoshyu-ii` | Ускорьте создание контента для ВК | Превратите идею в готовый пост или карусель: GoToFlow поможет собрать текст, структуру, визуальную логику, CTA и результат для экспорта. | Проверьте результат перед экспортом | https://app.gotoflow.io/ |
| `/blog/instagram-carousel-ideas` | Turn your idea into a carousel | Use GoToFlow to turn an idea, link, or source into structure, slide copy, visual design, CTA, and a ready-to-publish Instagram carousel for export. | Free to try — No design skills needed | https://app.gotoflow.io/ |
| `/ru/blog/neyroset-dlya-postov` | Готовы создавать контент быстрее? | Превратите ваши идеи в структурированную карусель и текст поста, готовые к публикации. | Бесплатно — карта не нужна | https://app.gotoflow.io/ |
| `/blog/linkedin-carousel-size-and-specs` | Stop struggling with dimensions | Create a LinkedIn carousel from your source, then check readability, page size, and the export before uploading. | Optimized for mobile and desktop | https://app.gotoflow.io/ |
| `/blog/instagram-carousel-cover-ideas` | Design your covers faster | Use our AI carousel maker to quickly generate cover layouts and full slide decks, then fine-tune them before publishing. | Ready-to-use templates | https://app.gotoflow.io/ |
| `/blog/how-to-schedule-linkedin-carousel` | Stop designing slides manually | GoToFlow turns your ideas, links, and text into a LinkedIn PDF carousel you can review and export. Publishing or scheduling is a separate step. | Free — No credit card required | https://app.gotoflow.io/ |
| `/blog/how-to-build-a-personal-brand-on-linkedin-with-ai` | Turn founder insights into finished carousels | Use GoToFlow to move from an idea, voice note, link, or source to structure, slide copy, visual design, CTA, and a ready-to-publish LinkedIn carousel for export. |  | https://app.gotoflow.io/ |
| `/ru/blog/kak-napisat-ekspertnyj-post` | Перестаньте писать тексты 'в стол' | Оформляйте свои знания так, чтобы их хотели читать и сохранять. Соберите структуру, текст и визуальную подачу своего экспертного материала. | Превращает текст в дизайн | https://app.gotoflow.io/ |
| `/blog/content-calendar-to-carousel` | Turn one calendar entry into a carousel | Use the source and slide outline from your plan to create the structure, copy, and design, then review and export the result. |  | https://app.gotoflow.io/ |
| `/blog/ai-carousel-generator` | Generate Your First Carousel Now | Turn your source into slide structure, copy and design, then review and export the finished carousel. | Free - No credit card required | https://app.gotoflow.io/ |
| `/ru/blog/temy-dlya-postov-v-linkedin` | Превратите идею в пост | Выберите любую тему из списка и оформите её в виде карусели или текстового поста с помощью ИИ. | Без навыков дизайна | https://app.gotoflow.io/ |
| `/blog/ai-instagram-carousel-generator` | Still creating carousels manually? | Turn a topic, link, video, or rough note into a structured Instagram carousel with angle, hook, slide flow, copy, and visual direction. |  | https://app.gotoflow.io/ |
| `/ru/blog/kak-pisat-prodayushchie-posty-s-ii` | Соберите продающую карусель в GoToFlow | Превратите оффер или источник в структуру, текст по слайдам, визуальную подачу, CTA и готовую карусель для экспорта в одном workflow. |  | https://app.gotoflow.io/ |
| `/blog/ai-social-media-manager` | Create carousels faster and cleaner | Use GoToFlow as the end-to-end carousel workflow: source analysis, structure, slide copy, visual design, CTA, and a ready-to-publish carousel for export. |  | https://app.gotoflow.io/ |
| `/blog/linkedin-content-strategy-for-founders` | Ready to scale your personal brand? | Use GoToFlow to turn founder insights into structure, slide copy, visual design, CTA, and a ready-to-publish LinkedIn carousel for export. |  | https://app.gotoflow.io/ |
| `/blog/ai-facebook-post-generator` | Need more than just text for Facebook? | GoToFlow turns your ideas into publish-ready visual content, complete with text and design. | Free — No credit card required | https://app.gotoflow.io/ |
| `/blog/guide-to-ai-social-media-post-generators` | Ready to upgrade your workflow? | Use GoToFlow to turn a source into structured copy, carousel design, and an export you can review. | Review before export | https://app.gotoflow.io/ |
| `/blog/linkedin-carousel-ideas` | Create a LinkedIn carousel from your idea | Turn an idea, topic, link, or outline into a structured LinkedIn carousel you can review, adjust, and export. | Free to try - No design skills needed | https://app.gotoflow.io/ |
| `/blog/ai-carousel-workflow` | Stop doing the manual work | Upgrade your workflow. Let AI handle source analysis, structure, slide copy, visual direction, and layout while you focus on the idea. Create a ready-to-publish carousel today. | Free — No credit card required | https://app.gotoflow.io/ |
| `/blog/repurpose-blog-post-linkedin-carousel-ai` | Ready to turn your articles into carousels? | Let GoToFlow transform your existing blog posts, links, and notes into structured, design-ready LinkedIn carousels. |  | https://app.gotoflow.io/ |
| `/blog/how-to-brainstorm-carousel-topics-with-ai` | Have a great topic but no time to design? | Stop wrestling with blank slides. Turn your rough topic into a structured carousel, then review and export. | Free — No credit card required | https://app.gotoflow.io/ |
| `/blog/ai-carousel-content-strategy` | Ready to scale your content production? | Stop designing carousels one by one. Turn your source materials into slide structure, copy, and design, then review each carousel before export. | Free — No credit card required | https://app.gotoflow.io/ |
| `/ru/blog/dizayn-karuseley-neyroset-vs-canva` | Соберите карусель целиком в GoToFlow | GoToFlow закрывает production workflow от идеи или источника до структуры, текста по слайдам, визуального дизайна, CTA и готовой карусели для экспорта. | Попробуйте бесплатно | https://app.gotoflow.io/ |
| `/blog/linkedin-pdf-carousel` | Create LinkedIn PDFs without the hassle | Skip the complex design tools. Create slide structure, copy, and design, then review the PDF and its upload preview. | Fast and easy export | https://app.gotoflow.io/ |
| `/blog/carousel-post-mistakes` | Stop making formatting mistakes | Let AI handle the slide constraints, text limits, and layout. Turn your text into structured slides, then check the copy and layout before export. | Free — No credit card required | https://app.gotoflow.io/ |
| `/blog/social-media-post-ideas-for-business` | Stop staring at a blank screen | Turn your ideas into fully designed posts using our AI content generator. |  | https://app.gotoflow.io/ |
| `/blog/how-to-repurpose-podcasts-into-ai-carousels` | Sitting on hours of recorded content? | Don't let your webinars and podcasts go to waste. Turn audio, video, notes, or one topic into structured carousels, then review and export. | Free — No credit card required | https://app.gotoflow.io/ |
| `/blog/youtube-to-linkedin-carousel-ai` | Stop wasting hours on repurposing | Turn your YouTube videos into ready LinkedIn carousels you can review, adjust, and export. |  | https://app.gotoflow.io/ |
| `/blog/how-to-scale-your-smm-agency-with-ai` | Scale carousel production with GoToFlow | Give your team one end-to-end workflow for source analysis, structure, slide copy, visual design, CTA, and ready-to-publish carousel exports. |  | https://app.gotoflow.io/ |
| `/blog/how-to-increase-instagram-engagement-with-carousels` | Build the full carousel in GoToFlow | Turn a topic or source into structure, slide copy, visual design, CTA, and a ready-to-publish Instagram carousel for export with GoToFlow. |  | https://app.gotoflow.io/ |
| `/blog/chatgpt-for-social-media-marketing` | Turn the idea into a finished carousel | Use ChatGPT for optional brainstorming, then use GoToFlow as the primary workflow for source analysis, structure, slide copy, visual design, CTA, and a ready-to-publish carousel export. |  | https://app.gotoflow.io/ |
| `/blog/linkedin-carousel-hooks` | Ready to Test Your Hooks? | Take these hooks and turn them into a ready carousel you can review, adjust, and export. |  | https://app.gotoflow.io/ |
| `/blog/best-carousel-cta-examples` | Stop struggling with carousel design | Create slide structure, copy, design, and a final CTA in your browser, then review and export. |  | https://app.gotoflow.io/ |


### 9.7 Passage-level BEFORE/AFTER семи ключевых страниц

В §3 concise reader-facing analysis. Здесь exact unified source diff с context2 для независимого reviewer: минус — clean main, плюс — final. Это позволяет проверить реальные paragraphs, headings, examples, metadata/FAQ/CTA без повторного расследования. Review на rendered counterpart привязан к §8; source diff сам по себе не semantic verdict. Ни одна из этих статей не назначается эталоном production template.

<details>
<summary>Полный BEFORE/AFTER ключевых passages и frontmatter</summary>

```diff
diff --git a/src/content/blog/articles/ai-carousel-generator.md b/src/content/blog/articles/ai-carousel-generator.md
index 44316b5f..7917709f 100644
--- a/src/content/blog/articles/ai-carousel-generator.md
+++ b/src/content/blog/articles/ai-carousel-generator.md
@@ -1,6 +1,6 @@
 ---
-title: "The Ultimate AI Carousel Generator: From Text to Design in Seconds"
+title: "AI Carousel Generator Workflow: From Source to Finished Slides"
 slug: "ai-carousel-generator"
-description: "Discover how an AI carousel generator can replace manual design in Canva or Photoshop. Transform your text into professional, high-performing carousels instantly."
+description: "Compare manual layout with an AI carousel generator workflow: prepare a source, structure slides, review copy and design, and export for publication."
 language: "en"
 primaryKeyword: "ai carousel generator"
@@ -12,15 +12,16 @@ productCapabilityIds: ["textToCarousel"]
 intentId: "en:ai-carousel-generator"
 clusterId: "en:ai-carousel-generator"
-articleRole: "hub"
-hubSlug: "ai-carousel-generator"
+articleRole: "supporting"
+hubSlug: "text-to-carousel-ai"
 canonical: "https://gotoflow.io/blog/ai-carousel-generator"
 createdAt: "2026-06-09"
+updatedAt: "2026-10-09"
 targetKeyword: "ai carousel generator"
 secondaryKeywords: "ai carousel maker, free carousel generator, text to carousel ai"
 relatedProductRoute: "/ai-carousel-maker"
-articleType: "primary product hub"
+articleType: "how-to"
 demandEvidence: "100 rising 10% / 15 imp"
-canonicalRisk: "SAFE (hub topic)"
-differentiationRule: "Hub-level guide on AI carousel generation across all platforms, serving as a primary entry point."
+canonicalRisk: "Self-canonical supporting workflow; commercial owner is /ai-carousel-maker."
+differentiationRule: "Explain source preparation, manual versus AI assembly, review and export. The commercial owner remains /ai-carousel-maker; the cluster hub remains text-to-carousel-ai."
 published: true
 noindex: false
@@ -41,16 +42,15 @@ faq:
     answer: "No, AI handles the visual heavy lifting, allowing you to focus on the message rather than pushing pixels around."
   - question: "Can I export the carousel as a PDF for LinkedIn?"
-    answer: "Yes, our tool supports exporting directly to PDF, which is the required format for swipeable LinkedIn carousels."
+    answer: "Yes, GoToFlow supports PDF export for a LinkedIn document post. Review the exported document and upload preview before publishing."
   - question: "How is an AI carousel maker different from Canva?"
-    answer: "Canva provides static templates where you must manually write copy and adjust layouts. An AI generator automates both the copywriting structure and the layout generation."
+    answer: "Compare the actual workflow rather than assuming a design editor only has static templates. GoToFlow connects source analysis, slide structure, copy and design in one carousel creation process; review the result before export."
   - question: "Is it possible to edit the text on the slides after generation?"
     answer: "Absolutely. You can edit any slide, change colors, or rewrite hooks before the final export."
   - question: "Does the AI automatically split long text into slides?"
-    answer: "Yes, the AI analyzes your content and automatically paces it across 5-10 slides for optimal reader engagement."
+    answer: "GoToFlow analyses the source and proposes a slide sequence. Check that the chosen number of slides fits the message and that each slide remains readable; a slide count does not guarantee engagement."

 finalCta:
   title: "Generate Your First Carousel Now"
-  text: "Stop dragging and dropping. Generate your carousel in seconds and get back to growing your business."
-  buttonHref: "/ai-carousel-maker"
+  text: "Turn your source into slide structure, copy and design, then review and export the finished carousel."
   buttonText: "Try GoToFlow for Free"
   microcopy: "Free - No credit card required"
@@ -59,9 +59,9 @@ finalCta:
 ---

-# The Ultimate AI Carousel Generator: From Text to Design in Seconds
+# AI Carousel Generator Workflow: From Source to Finished Slides

-If you are spending more than 5 minutes designing a social media carousel, you are losing valuable time. The modern solution isn't another batch of pre-made templates—it's an **AI carousel generator**.
+Manual layout can require repeated adjustments; whether generation helps depends on your source and review needs. The modern solution isn't another batch of pre-made templates—it's an **AI carousel generator**.

-By turning text directly into beautifully formatted, multi-slide designs, an AI generator bridges the gap between your ideas and your audience's feed, saving you hours of tedious work.
+An AI generator combines source text, slide structure, copy, and visual design in one creation workflow. You still need to check whether the result preserves your meaning and is readable in the intended format.

 ## Manual Design vs. AI Workflow: Why Switch?
@@ -74,10 +74,10 @@ Many creators rely on template tools like Canva. While powerful, templates have
 - Re-align elements that get pushed out of place.

-This manual tweaking easily eats up 30-45 minutes per post.
+The time needed for manual layout varies with the source, design, and revisions; this guide does not present a measured timing benchmark.

-### The Speed of AI Text-to-Design
-An AI carousel generator flips this workflow. Instead of starting with a blank canvas, you start with your content. You paste your text or prompt, and the AI automatically paces the content across the optimal number of slides, writes a compelling hook, and formats the design instantly.
+### From Source to Review
+An AI carousel generator starts with your content rather than a blank canvas. Provide the text or topic, then review the proposed opening, slide sequence, copy, and layout. Choose the number of slides according to the explanation, not an assumed optimal count.

-A 45-minute chore becomes a 2-minute review process.
+Generation does not remove fact-checking or editorial decisions. Compare the slides with the source and revise omissions or repetitions before export; the time required depends on the material and changes.

 ## How to Use GoToFlow to Generate Carousels
@@ -109,6 +109,6 @@ Manual design software is better suited when:
 Even with an AI handling the design, remember these principles:

-1. **Overcrowding slides:** Don't cram a full paragraph onto one slide. If a slide takes more than 5 seconds to read, the user will scroll past.
-2. **Weak hooks:** The first slide must make a specific, irresistible promise. If the hook is boring, no one will swipe to slide two.
+1. **Overcrowding slides:** Inspect each page on a phone. Split a crowded explanation without losing its conditions or context; reading time alone does not establish whether someone will continue.
+2. **Unclear hooks:** The first slide should introduce the question the following slides answer. Check that the sequence delivers that promise instead of relying on a claim that everyone will keep reading.
 3. **Forgetting the CTA:** Every carousel must end with a clear Call to Action. Tell the user what to do next—whether that's visiting your profile, leaving a comment, or saving the post.

diff --git a/src/content/blog/articles/content-calendar-to-carousel.md b/src/content/blog/articles/content-calendar-to-carousel.md
index d83232b1..534ed42a 100644
--- a/src/content/blog/articles/content-calendar-to-carousel.md
+++ b/src/content/blog/articles/content-calendar-to-carousel.md
@@ -1,6 +1,6 @@
 ---
-title: "How to Turn Your Content Calendar into a Month of Carousels"
+title: "Content Calendar to Carousel: An Illustrative Four-Week Plan"
 slug: "content-calendar-to-carousel"
-description: "Learn a proven workflow to convert your monthly content calendar into 30 days of high-quality carousels using AI automation."
+description: "Turn a content calendar into eight carousel briefs with an illustrative four-week plan, source checks, slide outlines, review, and manual publishing."
 language: "en"
 primaryKeyword: "content calendar to carousel"
@@ -23,31 +23,30 @@ mockupReason: "No perfectly matching mockup is available for this exact topic vi
 author: "GoToFlow Team"
 createdAt: "2026-06-07"
-updatedAt: "2026-10-07"
+updatedAt: "2026-10-09"
 canonical: "https://gotoflow.io/blog/content-calendar-to-carousel"

-quickAnswerTitle: "How to batch create carousels?"
+quickAnswerTitle: "How do you turn a content calendar into carousels?"
 quickAnswer:
   - "List out your topics in a content calendar (e.g., Notion or Google Sheets)."
   - "Feed each topic into an AI content generator."
   - "Generate the text and visual slides simultaneously."
-  - "Schedule your exported carousels."
+  - "Review and export each carousel, then publish or schedule it on the chosen platform."

 faq:
   - question: "How long does it take to create a month of carousels?"
-    answer: "Using an AI generator, you can batch create 10-15 carousels in under an hour."
+    answer: "There is no fixed completion time. It depends on the source material, number of posts, fact checking, design review, and publishing preparation. Plan review time for every carousel."
   - question: "Do carousels perform better than single images?"
-    answer: "Yes, carousels typically generate higher engagement and reach because they increase dwell time."
+    answer: "Not necessarily. Choose a carousel when a sequence helps explain the topic, and compare outcomes in your own account. A format alone does not guarantee reach or engagement."
   - question: "How many carousels should I post per week?"
-    answer: "For maximum growth, aim for 2-3 high-quality carousels per week on Instagram or LinkedIn."
+    answer: "Choose a cadence you can sustain. The example below uses two posts per week to demonstrate planning, not as a universal growth recommendation."
   - question: "Can I schedule the exported carousels?"
-    answer: "Yes, you can upload the exported files to tools like Buffer, Hootsuite, or native platform schedulers."
+    answer: "GoToFlow creates and exports the carousel. Publish it manually or use a separate scheduler that supports your platform and file type. Check that support before choosing a publication slot."
   - question: "What should I include in my content calendar?"
     answer: "Focus on a mix of educational tips, industry insights, and case studies to keep your audience engaged."

 finalCta:
-  title: "Batch Create Your Social Media Content"
-  text: "Turn your ideas into a month's worth of carousels in minutes with our AI content generator."
-  buttonHref: "/ai-content-generator"
-  buttonText: "Start Batch Creating"
+  title: "Turn one calendar entry into a carousel"
+  text: "Use the source and slide outline from your plan to create the structure, copy, and design, then review and export the result."
+  buttonText: "Create a carousel"
   secondaryText: "Explore Instagram carousel hooks →"
   secondaryHref: "/blog/instagram-carousel-hooks"
@@ -64,17 +63,46 @@ explore:


-## The Batch Creation Workflow
+## Start With a Source, Not Just a Publication Date

-Creating content day-by-day leads to burnout. The most efficient creators use a content calendar and batch-produce their posts.
+A content calendar becomes a production plan when each entry names a reader question, a source, a slide angle, a reviewer, and a next action. A row labelled “Tuesday: marketing tips” does not yet tell you what to create. A row labelled “Tuesday: how to check a landing-page form, using our documented review checklist” does.

-With an [AI Content Generator](/ai-content-generator) and a reliable [AI Carousel Maker](/ai-carousel-maker), this process becomes incredibly fast.
-For each calendar entry, the [text-to-carousel workflow](/blog/text-to-carousel-ai) explains how to turn the chosen message into a slide sequence before batching the next post.
+Choose a publication rhythm that leaves room for checking the material. The plan below uses eight posts over four weeks. It is an **illustrative editorial example for a fictional landing-page consultant**, not a customer case, an actual GoToFlow output, or a tested growth formula. Replace the topics and sources with material you own or have permission to use. No new customer statistics are needed to follow this example.

-### 4-Step Framework for a Month of Content
+## An Illustrative Four-Week Carousel Calendar

-1. **Ideation**: Spend 20 minutes listing 15 core ideas related to your niche in a spreadsheet or Notion calendar.
-2. **AI Generation**: Take each idea and plug it into GoToFlow. The AI will flesh out the points and generate the carousel design.
-3. **Review and Polish**: Quickly review the batch. Adjust brand colors or text phrasing if necessary.
-4. **Schedule**: Export the PDFs (for LinkedIn) or image sequences (for Instagram) and load them into your scheduling tool.
+The Tuesday and Thursday slots are sample appointments, not an algorithm recommendation. Monday is for preparing sources and briefs; Wednesday is for review; Friday is for recording observations and preparing the next week. The other days are deliberately unassigned rather than filled with posts just to reach a quota.

-By focusing on workflow and using AI to handle the heavy lifting of design and formatting, you can maintain consistency without the stress of daily content creation.
+| Week / slot | Reader question and hook | Source to prepare | Slide outline | Final action |
+| --- | --- | --- | --- | --- |
+| 1 / Tuesday | “What should I check before publishing a landing page?” | Your pre-launch checklist | Goal → headline → offer → form → checklist | Save the checklist |
+| 1 / Thursday | “Why does this offer feel unclear?” | A labelled demonstration page you may show | Context → unclear phrase → clearer version → explanation → review question | Review one offer statement |
+| 2 / Tuesday | “How do I test a signup form?” | Your documented manual test procedure | Prerequisites → input → submit → expected response → record the result | Run the check on a test page |
+| 2 / Thursday | “What belongs in a handoff brief?” | A blank brief with no client data | Audience → goal → source → acceptance checks → owner | Fill in your own brief |
+| 3 / Tuesday | “How do I shorten a headline without changing its promise?” | An explicitly invented copy example | Original → meaning to retain → revision → trade-off → checklist | Compare two honest versions |
+| 3 / Thursday | “Which screenshot helps explain a page problem?” | Permission-cleared screenshots or labelled mockups | Question → relevant area → annotation → explanation → source | Choose one explanatory image |
+| 4 / Tuesday | “What did our review process miss?” | Your actual review notes, anonymised where necessary | Context → missed check → consequence → process change → lesson | Update the checklist |
+| 4 / Thursday | “How should I prepare next month's content?” | Notes from the seven previous posts | Useful questions → missing sources → repeated angles → next briefs → review date | Prepare the next source list |
+
+If the real review notes for week four do not exist, do not invent a failure or improvement. Use the post to explain how to keep review notes, label it as an instructional example, and change the hook accordingly. Each entry can stand alone; a reader does not need to see the previous seven posts to understand it.
+
+## Turn One Row Into a Finished Carousel
+
+### Prepare the Brief
+
+Take week one, Tuesday. The reader needs a pre-launch checklist, not a general essay about marketing. Write down the checks you can explain and remove any claim you cannot support. Decide what belongs on the cover, what needs a short example, and what the reader should do at the end. Keep one main check per slide so the sequence remains legible.
+
+### Create and Review the Slides
+
+Use the [text-to-carousel workflow](/blog/text-to-carousel-ai) when the source is a written checklist. GoToFlow also accepts a topic, script, link, video, audio, directly uploaded PDF/file, image, screenshot, or other user material as a source. The [AI Carousel Maker](/ai-carousel-maker) connects the source, structure, slide copy, visual direction, and design. Work through the calendar entries individually; this plan does not promise simultaneous bulk generation.
+
+Review whether each slide preserves the source meaning. For the form-testing post, distinguish an expected response from a result you actually observed. For the headline example, label invented copy as illustrative. Check names, figures, permissions, and image annotations, then inspect the slides on a phone. Editing is part of review, not proof that the initial result is correct.
+
+### Export and Publish
+
+Export the reviewed carousel in the format needed for its destination. Keep the source and review notes alongside the final file. After exporting from GoToFlow, upload the file manually or hand it to a separately verified scheduling workflow. Check the platform preview and caption before confirming publication.
+
+## Keep the Calendar Useful After Publication
+
+Record the published URL, date, and relevant platform observations against each row. Separate an operational check—was the post published correctly?—from an outcome check—did it prompt useful questions or the intended action? Do not infer that the carousel format caused a result from a single post.
+
+For the next cycle, keep angles that answered real questions, revise unclear explanations, and leave entries on hold when their sources are not ready. This turns the calendar into a repeatable editorial workflow rather than a promise to produce thirty posts regardless of evidence.
diff --git a/src/content/blog/articles/kak-peredelat-statyu-v-karusel-linkedin.md b/src/content/blog/articles/kak-peredelat-statyu-v-karusel-linkedin.md
index 05450e40..bb2f360c 100644
--- a/src/content/blog/articles/kak-peredelat-statyu-v-karusel-linkedin.md
+++ b/src/content/blog/articles/kak-peredelat-statyu-v-karusel-linkedin.md
@@ -1,7 +1,7 @@
 ---
-title: "Как переделать статью в карусель LinkedIn: Инструкция и кейс"
+title: "Как переделать статью в карусель LinkedIn: пошаговая инструкция"
 slug: "kak-peredelat-statyu-v-karusel-linkedin"
 language: "ru"
-description: "Узнайте, как быстро переупаковать статьи из блога в вирусные PDF-карусели для LinkedIn. Пошаговая инструкция и автоматизация с помощью ИИ."
+description: "Узнайте, как быстро переупаковать статьи из блога в PDF-карусели для LinkedIn. Пошаговая инструкция и автоматизация с помощью ИИ."
 primaryKeyword: "как переделать статью в карусель"
 searchIntent: "репрайз контента, адаптация текста блога под формат каруселей"
@@ -17,5 +17,5 @@ ru_meta_disclaimer: true
 canonical: "https://gotoflow.io/ru/blog/kak-peredelat-statyu-v-karusel-linkedin"
 createdAt: "2026-06-03"
-updatedAt: "2026-06-03"
+updatedAt: "2026-10-09"
 lastReviewed: "2026-06-03"
 quickAnswer:
@@ -42,5 +42,5 @@ formats:
 faq:
   - question: "Почему карусели в LinkedIn так популярны?"
-    answer: "Они занимают много места в ленте (высокий dwell time), легко читаются с телефона и алгоритм LinkedIn активно их продвигает."
+    answer: "Документ позволяет читателю последовательно посмотреть несколько страниц. Читаемость зависит от оформления, а популярность конкретного поста нужно оценивать по фактическим данным."
   - question: "Можно ли просто вставить куски текста на слайды?"
     answer: "Нет, текст нужно адаптировать. Один слайд должен содержать максимум 1-2 коротких предложения, иначе его не будут читать."
@@ -77,9 +77,9 @@ finalCta:
 Лучшие авторы в LinkedIn не пишут новые посты каждый день. Они занимаются **переупаковкой (repurposing)**. Они берут одну хорошую статью и делают из нее 3 поста, видео и карусель.

-В этой инструкции мы разберем, как правильно переделать статью в вирусную PDF-карусель для LinkedIn.
+В этой инструкции мы разберем, как правильно переделать статью в PDF-карусель для LinkedIn.

 ## Почему именно карусели в LinkedIn?

-Алгоритм LinkedIn обожает форматы, которые задерживают пользователя. PDF-карусели (документы) заставляют людей листать слайды, увеличивая время взаимодействия (dwell time). Это дает мощный сигнал алгоритму, и охват поста растет.
+PDF-карусель позволяет разложить одну мысль по страницам: сначала контекст, затем объяснение и вывод. Это способ подачи, а не обещание роста охвата. После публикации оценивайте результат по данным своего аккаунта.

 Более того, карусель — это визуальный чек-лист. Люди охотнее сохраняют и делятся короткой выжимкой, чем ссылкой на лонгрид.
@@ -97,5 +97,5 @@ type: tips
 Карусель — это не книга.
 Плохо: "Согласно последним исследованиям в области психологии потребителей, люди склонны..."
-Хорошо: "Покупатели принимают решение за 3 секунды."
+Хорошо: "Сравните условия доставки до оформления заказа." Не подставляйте выдуманные сроки или статистику ради короткого текста.
 Один слайд = одна мысль = максимум 15-20 слов.

@@ -104,5 +104,5 @@ type: tips
 :::

-## Автоматизация: Статья → Карусель за 1 минуту
+## Создание карусели из статьи с помощью ИИ

 Ручная переупаковка работает, но требует времени на редактуру и дизайн в Canva.
diff --git a/src/content/blog/articles/kak-sdelat-shablon-dlya-postov-v-canva.md b/src/content/blog/articles/kak-sdelat-shablon-dlya-postov-v-canva.md
index f9354ff9..8393a8f6 100644
--- a/src/content/blog/articles/kak-sdelat-shablon-dlya-postov-v-canva.md
+++ b/src/content/blog/articles/kak-sdelat-shablon-dlya-postov-v-canva.md
@@ -6,5 +6,5 @@ canonical: "https://gotoflow.io/ru/blog/kak-sdelat-shablon-dlya-postov-v-canva"
 relatedProductRoute: "/ru/generator-postov-instagram"
 createdAt: '2026-06-12'
-updatedAt: '2026-06-13'
+updatedAt: "2026-10-09"
 published: true
 noindex: false
@@ -16,9 +16,9 @@ faq:
     answer: Сильными заголовками (хуками) и пользой. Люди перестали лайкать посты за красивые рамочки. Контент — король.
   - question: Можно ли сделать "бесшовную" карусель через ИИ?
-    answer: Бесшовные панорамные карусели лучше собирать в специализированных графических инструментах. Для регулярных экспертных каруселей GoToFlow помогает быстрее собрать идею, структуру, текст и визуальную подачу.
+    answer: GoToFlow поддерживает бесшовные карусели. Выберите этот формат под свою задачу, затем проверьте переходы между слайдами и итоговый экспорт.
   - question: Подходят ли ИИ-генераторы для брендов со строгим гайдлайном?
-    answer: Если ваш брендбук требует специфических паттернов на фоне, вам придется использовать их как подложки. Если брендбук базируется на цветах и шрифтах — ИИ справится идеально.
+    answer: Задайте фирменные цвета и визуальные ориентиры, затем сверяйте результат с брендбуком. Совпадение со строгими требованиями нужно проверять, а не считать гарантированным.
   - question: Можно ли анимировать готовые ИИ-шаблоны?
-    answer: Некоторые ИИ-генераторы позволяют добавлять базовую анимацию, но для большинства экспертных текстовых каруселей статика (PDF или PNG) работает лучше и удерживает внимание дольше.
+    answer: GoToFlow поддерживает анимированные форматы каруселей, включая анимированный первый слайд. Выбирайте формат по задаче и проверяйте экспорт для нужной площадки; анимация сама по себе не гарантирует удержание внимания.
 explore:
   guides:
@@ -37,23 +37,32 @@ finalCta:
 quickAnswerTitle: Главное
 quickAnswer:
-  - Вместо жестких графических шаблонов с рамками, тренд 2026 года — динамическая верстка и ИИ-генерация.
+  - Начните шаблон с формата страницы, шрифтов, отступов и роли каждого слайда.
   - Вы не вставляете текст в шаблон, вы задаете нейросети тему (или готовый текст) и бренд-цвета.
   - ИИ сам распределяет текст по слайдам карусели, подбирает размер шрифта и компонует элементы.
   - GoToFlow помогает быстрее пройти полный workflow карусели: от идеи и структуры до текста, визуальной подачи и готовых слайдов.
 lastReviewed: '2026-06-13'
-updatedAt: '2026-06-13'
 ---


-Долгое время Canva была главным инструментом SMM-специалистов. Создать сетку шаблонов, менять в них текст и картинки — так работали многие эксперты. Но в 2026 году этот подход устарел.
+Повторяемый шаблон помогает сохранять оформление постов: шрифты, отступы, цвет и роли страниц. Его можно собрать вручную в Canva или использовать GoToFlow для создания карусели из исходного материала.

-Аудитория мгновенно считывает стандартные рамки и плашки из Canva, что снижает доверие (баннерная слепота). Более того, ручная подгонка текста под готовый шаблон отнимает много времени. В этой статье мы разберем, как эволюционировали шаблоны для постов и как нейросети помогают ускорить ручной труд в дизайне.
+Ниже — порядок ручной сборки и проверки шаблона, затем отличие от процесса с ИИ. Выбирайте путь по задаче: нужен ли вам точный ручной макет или связанный процесс от идеи до текста и готовых слайдов.


-## 1. Почему классические шаблоны из Canva умирают?
+## 1. Как собрать повторяемый шаблон в Canva

-*   **Узнаваемость (в плохом смысле):** Бесплатные элементы Canva используют миллионы людей. Ваш пост выглядит как пост конкурента.
+1. Создайте дизайн нужного формата или откройте подходящий шаблон. Начните с одной страницы, а не с большой библиотеки вариантов.
+2. Задайте фон, шрифт заголовка, шрифт основного текста и безопасные отступы. Проверьте короткий и длинный заголовок: оба должны оставаться читаемыми.
+3. Подготовьте разные роли страниц: обложку, объяснение, список и финальный CTA. Меняйте структуру под роль, сохраняя общую палитру.
+4. Сделайте копию базового дизайна для новой публикации, замените текст и изображения. Не редактируйте единственный исходник, если он нужен для следующего поста.
+5. Проверьте порядок страниц и экспорт. Откройте файл на телефоне и убедитесь, что шрифты, отступы и смысл не потерялись.
+
+Для повторного использования Canva описывает [создание копии дизайна](https://www.canva.com/help/duplicate-designs/). Это ручной путь: сам шаблон не выбирает за вас тему, факты и последовательность объяснения.
+
+## Когда шаблон нужно пересмотреть
+
+*   **Повторяемость:** Если публикации выглядят одинаково, проверьте, различаются ли их темы и визуальные акценты. Сам по себе готовый шаблон не доказывает потерю доверия.
 *   **Проблема верстки:** Если вы написали длинный заголовок, он не влезет в рамку старого шаблона. Приходится уменьшать шрифт, ломать сетку и портить дизайн.
-*   **Низкая вовлеченность:** Статичные рамки с паттернами отвлекают от самого важного — текста. Тренд 2026 — экстремальный минимализм.
+*   **Читаемость:** Рамки и фон не должны спорить с главным тезисом. Проверьте контраст на телефоне, а не выбирайте оформление по неподтверждённому «тренду».

 ## 2. Эволюция: От рамки к дизайн-системе (Брендбук)
@@ -89,4 +98,4 @@ updatedAt: '2026-06-13'
 2.  Выберите базовую тему (например, строгий B2B или яркий блогерский стиль).
 3.  Введите промпт (тему поста). Нейросеть предложит структуру и текст по слайдам.
-4.  Нажмите кнопку применения глобального стиля: загрузите свой аватар и выберите цвет.
+4.  Задайте доступные в интерфейсе фирменные цвета и визуальные ориентиры. Проверьте результат, не предполагая наличие отдельной кнопки «глобального стиля».
 5.  Экспортируйте готовую карусель в PDF или PNG.
diff --git a/src/content/blog/articles/linkedin-document-post-examples.md b/src/content/blog/articles/linkedin-document-post-examples.md
index 0343c108..6b263f4d 100644
--- a/src/content/blog/articles/linkedin-document-post-examples.md
+++ b/src/content/blog/articles/linkedin-document-post-examples.md
@@ -1,12 +1,12 @@
 ---
-title: "10 LinkedIn Document Post Examples That Work"
+title: "5 LinkedIn Document Post Examples: Illustrative Formats"
 slug: "linkedin-document-post-examples"
 language: "en"
-description: "Discover 10 highly effective LinkedIn document post examples. Learn how to format PDFs to maximize engagement, reach, and lead generation."
+description: "Explore five illustrative LinkedIn document post formats, with sample hooks, slide outlines, and guidance for choosing a format for your own source material."
 primaryKeyword: "linkedin document post examples"
 secondaryKeywords: ["li document examples", "pdf posts linkedin", "document carousel linkedin"]
 canonical: "https://gotoflow.io/blog/linkedin-document-post-examples"
 createdAt: 2026-06-12
-updatedAt: 2026-06-13
+updatedAt: "2026-10-09"
 published: true
 noindex: false
@@ -14,5 +14,5 @@ quickAnswer:
   - "LinkedIn document posts are PDF files uploaded natively to create a swipeable carousel experience."
   - "The best document posts use high contrast, large fonts, and a clear step-by-step structure."
-  - "Examples that work best include frameworks, cheat sheets, tear-downs, and case studies."
+  - "The five illustrative formats below cover frameworks, tear-downs, tool stacks, cheat sheets, and personal lessons."
   - "Always end your document with a clear Call to Action on the final slide."
 faq:
@@ -20,11 +20,11 @@ faq:
     answer: "A LinkedIn document post is a feature that allows users to upload PDF, PPT, or DOC files natively. LinkedIn displays these as a swipeable, carousel-like experience directly in the feed."
   - question: "What file format is best for document posts?"
-    answer: "PDF is the best file format for LinkedIn document posts. It ensures that your fonts, images, and layouts render perfectly without any formatting errors across devices."
+    answer: "PDF preserves the intended page layout. Check the exported file and the platform preview for font rendering, legibility, and cropping before publishing."
   - question: "How many pages should a document post be?"
-    answer: "The sweet spot is between 5 and 12 pages. This provides enough depth to deliver value but is short enough to keep the reader engaged until the final slide."
+    answer: "Use enough pages to explain the idea without repeating it. The illustrative outlines below use a cover, several content pages and a final action; review the actual document rather than relying on a universal page count."
   - question: "Can I include links inside a LinkedIn document?"
-    answer: "While you can technically include hyperlinks in a PDF, they are not clickable when viewed natively within the LinkedIn feed. Always place important links in the comments or your profile."
+    answer: "Make the important next step easy to find in the accompanying post or profile and test the document preview. Do not rely on an embedded PDF link as the only way a reader can reach the promised resource."
   - question: "Why do document posts get so much reach?"
-    answer: "LinkedIn algorithms favor 'dwell time' (how long a user stays on a post). Since users spend time swiping through multiple pages of a document, it signals to the algorithm that the content is engaging."
+    answer: "A document gives readers several pages to explore, but reach depends on the audience, topic, presentation, and distribution. Compare your own posts rather than expecting a format to guarantee reach."
 explore:
   tools:
@@ -37,8 +37,7 @@ explore:
       description: "See how top creators structure their carousels."
 finalCta:
-  title: "Create stunning document posts in minutes"
-  description: "Turn your ideas into high-converting LinkedIn PDFs with our AI-powered tool."
+  title: "Create a document post from your source"
+  text: "Choose one of these formats and turn your source material into slide copy, design, and a finished carousel."
   buttonText: "Try for Free"
-  href: "/linkedin-carousel-maker"
   microcopy: "No design skills needed"
   secondaryText: "Learn how to make a LinkedIn carousel →"
@@ -46,9 +45,9 @@ finalCta:
 ---

-# 10 LinkedIn Document Post Examples That Work
+# 5 LinkedIn Document Post Examples: Illustrative Formats

-LinkedIn document posts have become the secret weapon for B2B creators and founders. By uploading a simple PDF, you can create a native, swipeable carousel that captures attention and drives massive reach.
+A LinkedIn document post presents a document as a sequence of pages in the feed. Below are five illustrative formats you can adapt to your own material. These are editorial examples, not screenshots of customer posts or measured performance case studies.

-But not all documents are created equal. If you want to stop the scroll, you need the right structure. In this guide, we will look at the best **LinkedIn document post examples** and analyze why they work.
+Choose a format that answers a specific reader question. A framework explains a process; a tear-down examines evidence; a tool stack documents choices; a cheat sheet offers a reference; a personal lesson explains a decision. A format alone does not establish how widely a post will be distributed.

 ## What Makes a Great Document Post?
@@ -69,36 +68,50 @@ Never leave your reader hanging. The last page must tell them exactly what to do
 :::

-## Top LinkedIn Document Post Examples
+## Five Illustrative LinkedIn Document Post Examples
+
+:::cards
+type: examples

 ### 1. The Step-by-Step Framework
 This example breaks down a complex process into simple, actionable steps.
-* **Why it works:** It promises a tangible result and delivers it in bite-sized pieces.
+* **Reader purpose:** Show a process as discrete steps that can be checked against the source.
 * **Best for:** Educational content, how-to guides, and tutorials.
+* **Illustrative hook:** “A checklist for reviewing a landing page before launch.”
+* **Slide outline:** State the review goal → check the headline → inspect the offer → test the form → show the pre-launch checklist. Use a real page you have permission to discuss.

 ### 2. The "Tear-Down" Analysis
 Analyzing a successful ad campaign, landing page, or cold email.
-* **Why it works:** People love seeing the "behind the scenes" of what works for others.
+* **Reader purpose:** Examine a specific artefact and distinguish observations from suggested changes.
 * **Best for:** Marketers, copywriters, and consultants.
+* **Illustrative hook:** “What this landing page explains clearly—and what is still unclear.”
+* **Slide outline:** Show the page context → annotate its promise → examine supporting evidence → explain a possible revision → summarise what the reader can test. Do not invent conversion results.

 ### 3. The Tool Stack Reveal
 Sharing the exact tools, prompts, or software you use to achieve a result.
-* **Why it works:** It provides immediate, highly actionable value that users want to save for later.
+* **Reader purpose:** Explain what each tool does, why you chose it, and what work remains.
 * **Best for:** Founders, developers, and productivity experts.
+* **Illustrative hook:** “The tools in my content workflow and the job each one does.”
+* **Slide outline:** Define the workflow → describe source collection → explain creation → explain review → show the publishing handoff. Name only tools you actually use and explain the selection criterion.

 ### 4. The Industry Cheat Sheet
 A condensed summary of complex rules, metrics, or strategies.
-* **Why it works:** It acts as a reference guide, encouraging users to save the document and share it with their network.
-* **Best for:** SEO specialists, finance experts, and legal consultants.
+* **Reader purpose:** Provide a bounded reference with enough context to apply it correctly.
+* **Best for:** Specialists explaining a bounded topic.
+* **Illustrative hook:** “A pre-publication checklist for a document post.”
+* **Slide outline:** File preparation → readable type → source checks → preview checks → final action. For regulated topics, cite the applicable source and have a qualified reviewer check the content.

 ### 5. The Personal Failure-to-Success Story
 A narrative-driven document detailing a specific struggle and how you overcame it.
-* **Why it works:** It builds deep trust and authenticity while still providing a lesson.
+* **Reader purpose:** Explain an actual decision and lesson, without inventing a personal success story.
 * **Best for:** Personal branding and leadership content.
+* **Illustrative hook:** “What I changed after a project handoff went wrong.”
+* **Slide outline:** Explain the context → describe the decision → show what happened → identify the change → offer a lesson. Use your own experience; a hypothetical story must be labelled as such.
+:::

 > [!workflow]
 > **How to Replicate These Examples**
-> 1. Pick a proven format from the list above.
+> 1. Pick a format from the list above that matches your material.
 > 2. Outline your content, ensuring you have 1 intro slide, 3-7 content slides, and 1 CTA slide.
-> 3. Use an [AI Carousel Maker](/linkedin-carousel-maker) to format your text into a beautiful PDF instantly.
+> 3. Use an [AI Carousel Maker](/linkedin-carousel-maker) to create slide copy and design, review the result, and export a PDF.
 > 4. Upload the PDF natively to LinkedIn.

diff --git a/src/content/blog/articles/text-to-carousel-ai.md b/src/content/blog/articles/text-to-carousel-ai.md
index d2b238ac..613c9bae 100644
--- a/src/content/blog/articles/text-to-carousel-ai.md
+++ b/src/content/blog/articles/text-to-carousel-ai.md
@@ -2,5 +2,5 @@
 title: "How to Convert Text to Carousel for Instagram & LinkedIn with AI"
 slug: "text-to-carousel-ai"
-description: "Learn how to transform any text snippet, article, or note into a highly engaging carousel for Instagram and LinkedIn using an AI carousel maker."
+description: "Turn a text snippet, article, or note into a carousel: prepare the source, review a slide outline, check the result, and export for Instagram or LinkedIn."
 language: "en"
 primaryKeyword: "text to carousel ai"
@@ -23,5 +23,5 @@ mockupReason: "No perfectly matching mockup is available for this exact topic vi
 author: "GoToFlow Team"
 createdAt: "2026-06-07"
-updatedAt: "2026-06-07T19:12:00.860Z"
+updatedAt: "2026-10-09"
 canonical: "https://gotoflow.io/blog/text-to-carousel-ai"

@@ -35,5 +35,5 @@ quickAnswer:
 faq:
   - question: "Can I convert long articles into carousels?"
-    answer: "Yes, an AI text to carousel tool can summarize long articles into 5-10 bite-sized slides automatically."
+    answer: "GoToFlow can use an article as a source and propose a slide sequence. Review what was kept, shortened, or omitted; the appropriate slide count depends on the material."
   - question: "Is the text-to-carousel tool free?"
     answer: "GoToFlow offers free credits to test the text-to-carousel generator before subscribing."
@@ -43,5 +43,5 @@ faq:
     answer: "You can export to PDF for LinkedIn carousels or PNG/JPG image sequences for Instagram."
   - question: "Does the AI generate the hook automatically?"
-    answer: "Yes, the AI analyzes your text and creates a scroll-stopping hook for the first slide."
+    answer: "GoToFlow proposes an opening from your source. Check that it accurately introduces the following slides; a hook does not guarantee attention or reach."

 explore:
@@ -49,5 +49,5 @@ explore:
     - title: "AI Carousel Maker"
       href: "/ai-carousel-maker"
-      description: "Convert any idea or text into a professional carousel in seconds."
+      description: "Create slide structure, copy, and design from your source, then review and export."
   guides:
     - title: "Best AI Carousel Generators"
@@ -60,6 +60,5 @@ explore:
 finalCta:
   title: "Convert Your Text to a Carousel Now"
-  text: "Stop wasting hours on design. Paste your text and let AI generate a stunning carousel for Instagram or LinkedIn in seconds."
-  buttonHref: "/ai-carousel-maker"
+  text: "Use your text as the source for slide structure, copy, and design. Review the result before exporting."
   buttonText: "Try Text-to-Carousel Generator Free"
   secondaryText: "AI Carousel Generator →"
@@ -73,14 +72,38 @@ finalCta:
 ## Why Convert Text to a Carousel?

-Turning plain text into a visual carousel increases engagement on platforms like Instagram and LinkedIn. Users are more likely to swipe through visually appealing slides than read a wall of text.
+Use a carousel when a sequence of pages helps explain your text: a process, checklist, or focused argument. It is not automatically better than an ordinary text post and does not guarantee engagement.

-Using a text to carousel AI generator like GoToFlow, you can instantly turn your thoughts into content.
+GoToFlow connects source analysis, slide structure, copy, and visual design. Your review establishes whether the resulting carousel still says what the source intended.

 ### Step-by-Step Workflow

+If you are deciding between manual layout and generation, the [AI-versus-manual workflow guide](/blog/ai-carousel-generator) explains the trade-off before you start building slides.
+
 1. **Prepare your text**: Grab a paragraph, a list of tips, or a short essay.
 2. **Use an AI Generator**: Go to the [AI Carousel Maker](/ai-carousel-maker) and select the "Text / Topic" input.
 3. **Generate**: The AI will automatically split your text into logical slides, create a hook, and apply a professional design.
-4. **Publish**: Download the result and post it.
+4. **Review and export**: Check the copy and layout, download the result, and upload it to the chosen platform yourself. Content creation and export do not mean automatic publishing.
+
+## An Illustrative Text-to-Slide Example
+
+Suppose your source is this fictional internal checklist: “Before a landing-page launch, confirm the headline matches the offer, test the form with a valid submission, and check that the confirmation explains the next step.” This is a worked editorial example, not a customer result or an actual generated screenshot.
+
+An outline that preserves the source could be:
+
+1. **Cover:** Three checks before a landing-page launch.
+2. **Headline:** Does the headline describe the offer on this page? Compare the wording with the actual service.
+3. **Form:** Submit a test entry through the real form and verify the expected outcome.
+4. **Confirmation:** Does the confirmation explain what happens next and how the visitor can get help?
+5. **Final action:** Use this checklist during your own pre-launch review.
+
+The count comes from this example, not a required template for every input. Do not add a conversion percentage, testimonial, or “proven” outcome: none is present in the source. If the checklist contains private customer details, remove them or get permission before producing a public version.
+
+## Review the Transformation, Not Just the Design
+
+Compare each slide with the original text. Check that conditions, exceptions, attribution, and the order of the process survived summarisation. If a claim needs a source, retain a usable reference; generation is not verification.
+
+Read the cover and final action together. The cover should promise the material the middle slides actually deliver, and the final action should be something the reader can do. Cut repeated explanations rather than filling a fixed slide count.
+
+Then open the exported PDF or images on a phone. Look for clipped text, unreadable labels, poor contrast, and confusing transitions. For LinkedIn, review the document upload preview; for Instagram, check the image order. Publishing and account-performance measurement remain separate from creation in GoToFlow.

 #### Best Practices Checklist
@@ -89,5 +112,3 @@ Using a text to carousel AI generator like GoToFlow, you can instantly turn your
 - Review the final CTA slide to ensure it drives your desired action.

-By automating this, you save hours of manual design work while maintaining a high-quality aesthetic.
-
-
+For a broader production process, use the [source-to-carousel workflow](/blog/ai-carousel-workflow). For organising several source briefs, use the [illustrative four-week calendar](/blog/content-calendar-to-carousel). These supporting guides do not replace the commercial creation workflow in GoToFlow.
diff --git a/src/content/blog/articles/viral-linkedin-post-examples.md b/src/content/blog/articles/viral-linkedin-post-examples.md
index 3074c1a2..68fa0a75 100644
--- a/src/content/blog/articles/viral-linkedin-post-examples.md
+++ b/src/content/blog/articles/viral-linkedin-post-examples.md
@@ -1,10 +1,10 @@
 ---
 title: 'How to Write a Viral LinkedIn Post: Breakdown of 10 Hooks'
-description: Discover the anatomy of a viral LinkedIn post. We break down 10 proven hooks and frameworks that generate massive reach, and explain why they work.
+description: Ten illustrative hook formats for a viral LinkedIn post idea, with reader-purpose breakdowns. Adapt them to real facts; they are not verified viral cases.
 primaryKeyword: viral linkedin post
 canonical: "https://gotoflow.io/blog/viral-linkedin-post-examples"
 relatedProductRoute: "/linkedin-carousel-maker"
 createdAt: '2026-06-12'
-updatedAt: '2026-06-13'
+updatedAt: "2026-10-09"
 published: true
 noindex: false
@@ -12,11 +12,11 @@ language: en
 faq:
   - question: Does a post need an image to go viral on LinkedIn?
-    answer: While text-only posts can go viral, posts with native images, and especially PDF Document Posts (Carousels), have significantly higher baseline reach and engagement rates.
+    answer: Choose text, images, or a document according to what explains your material. This guide does not establish a reach advantage for any format; compare relevant results from your own account.
   - question: What happens if I go viral for the wrong reason?
     answer: '"Going viral" is only useful if it attracts your target audience. A viral post complaining about a bad date might get a huge number of views, but it will bring zero B2B leads to your business. Keep your viral hooks aligned with your professional niche.'
   - question: Are external links killing my reach?
-    answer: Yes. LinkedIn wants to keep users on LinkedIn. If you put a link to your website in the main body of the post, the post may get less distribution if readers skip it quickly or do not engage with it. Put links in the comments instead.
+    answer: A link alone does not establish why distribution changed. Put a promised resource where readers can find it, and compare actual post results before attributing an effect to link placement.
   - question: How long does a post stay "viral"?
-    answer: The LinkedIn algorithm has a "long tail." A highly engaging post can continue to circulate in feeds and generate views for 2 to 3 weeks after it was published.
+    answer: Distribution varies. Review the actual time series in your account rather than assuming a fixed two-to-three-week lifespan.
   - question: Can AI write viral posts?
     answer: AI can generate the *structures* of viral posts (like the hooks above). However, you must inject your own real-world data, personal stories, and unique opinions into those structures for them to work.
@@ -31,21 +31,20 @@ explore:
 finalCta:
   title: "Create carousels faster and cleaner"
-  description: "GoToFlow helps you structure, write, and design your carousel without starting from a blank page."
+  text: "GoToFlow helps you structure, write, and design your carousel without starting from a blank page."
   buttonText: Create an Engaging Carousel
-  secondaryText: Dive deeper into proven LinkedIn carousel hooks →
+  secondaryText: Explore LinkedIn carousel hook formats →
   secondaryHref: /blog/linkedin-carousel-hooks
 quickAnswerTitle: Quick Answer
 quickAnswer:
-  - Virality requires a combination of High Dwell Time (users stopping to read) and Velocity of Engagement (getting comments quickly after posting).
-  - The best way to achieve this is through Document Posts (PDF Carousels) paired with a highly contrarian, emotional, or ultra-specific hook.
-  - The hook earns the click, the carousel earns the dwell time, and a polarizing opinion earns the comments.
+  - A hook introduces the question the post will answer; a wording pattern does not guarantee virality.
+  - Choose a document when a slide sequence helps explain the source. Match the opening to the actual material.
+  - Use your own facts, label hypothetical examples, and measure the response rather than promising clicks or comments.
 lastReviewed: '2026-06-13'
-updatedAt: '2026-06-13'
 ---


-Going viral on LinkedIn is not about luck; it is about psychology. The LinkedIn algorithm in 2026 rewards content that stops the scroll, triggers emotion, and forces users to leave a comment.
+The ten hook examples below are illustrative editorial patterns, not verified viral posts or customer results. Adapt them to your own facts; a wording pattern alone cannot establish how widely a post will be distributed.

-The most critical component of a viral post is the **Hook**—the first two lines of text before the "see more" button. If your hook fails, your post is dead, regardless of how brilliant the rest of the content is. In this article, we break down 10 proven viral hook frameworks and explain exactly why they manipulate the algorithm (and human attention) so effectively.
+The **hook** introduces the post before the reader opens the rest. Make that introduction accurate and useful; the wording alone does not determine attention. In this article, we break down 10 illustrative hook frameworks and explain the reader question each can introduce.


@@ -54,41 +53,41 @@ The most critical component of a viral post is the **Hook**—the first two line
 ### 1. The Contrarian (The "Unpopular Opinion")
 *   **The Hook:** "Unpopular opinion: 1-on-1 meetings are a massive waste of time for managers."
-*   **Why it works:** Humans are wired to react to conflict. Half the audience will agree passionately, and the other half will disagree furiously. Both groups will flood your comment section, driving the post viral.
+*   **Reader purpose:** A reasoned disagreement introduces a question for discussion. Explain your position with facts; responses and distribution vary.

 ### 2. The Vulnerable Failure
-*   **The Hook:** "In 2024, I burned through $50,000 of my own savings and my startup failed. Here are the 3 brutal mistakes I made."
-*   **Why it works:** LinkedIn is full of fake "hustle culture" success stories. Authentic failure is incredibly rare and refreshing. People engage out of empathy and a desire to learn from expensive mistakes.
+*   **The Hook:** "What I changed after a project handoff failed."
+*   **Reader purpose:** Explain a real decision, what happened, and what you changed. Do not claim a personal failure or financial loss that did not happen.

 ### 3. The Authority Drop (The "Time/Money" Flex)
-*   **The Hook:** "I’ve analyzed over 10,000 cold emails that generated $5M in pipeline. Here is the exact template that worked best."
-*   **Why it works:** It establishes immediate, undeniable authority. It promises an insane amount of value (saving the reader the effort of analyzing 10k emails) for free.
+*   **The Hook:** "What I checked when reviewing our cold-email messages."
+*   **Reader purpose:** Describe the actual review criteria and its scope. If you use a measured result, provide the source, sample, and conditions; a large invented number is not authority.

 ### 4. The Transformation (Before & After)
-*   **The Hook:** "How I went from a burned-out teacher making $40k/year to a Tech Sales Executive making $150k/year (without knowing how to code)."
-*   **Why it works:** It is an underdog story. It provides a relatable "Point A" and an aspirational "Point B," giving hope and a clear roadmap to the reader.
+*   **The Hook:** "How my project handoff changed from unclear notes to a review checklist."
+*   **Reader purpose:** Compare a documented before and after, including what stayed difficult. Present a fictional transformation as an illustration, not your own result.

 ### 5. The Direct Challenge
-*   **The Hook:** "99% of marketers are doing LinkedIn completely wrong. Here is what the 1% are doing differently."
-*   **Why it works:** It creates an immediate sense of FOMO (Fear Of Missing Out) and attacks the reader's ego. Everyone wants to know if they are in the 1% or the 99%.
+*   **Illustrative Hook:** "Three LinkedIn publishing habits worth reviewing before your next post."
+*   **Reader purpose:** It introduces a specific review task without inventing a population statistic or attacking the reader.

 ### 6. The "How-To" Teaser
-*   **The Hook:** "Want to increase your website traffic by значительно in 30 days? Don't write more blogs. Do this instead."
-*   **Why it works:** It promises a highly desirable outcome, invalidates the common solution ("don't write blogs"), and creates a curiosity gap ("Do this instead").
+*   **The Hook:** "How to check whether a landing-page form explains the next step."
+*   **Reader purpose:** Name a bounded task and explain the steps that follow. Do not replace a practical how-to with an unsupported traffic or deadline promise.

 ### 7. The Tool Stack Reveal
-*   **The Hook:** "I run a $1M/year agency with zero full-time employees. Here are the 5 AI tools I use to automate my entire business."
-*   **Why it works:** "Listicles" of tools are highly actionable. Users love to discover new software, making this the most likely type of post to be Saved or Bookmarked (which the algorithm loves).
+*   **The Hook:** "The tools in my content workflow and the task each one supports."
+*   **Reader purpose:** Explain tools you actually use, their limits, and the review work that remains. A tool list is not evidence of revenue, staffing, or an entirely automated business.

 ### 8. The Industry Secret
-*   **The Hook:** "Recruiters will hate me for sharing this. But here is the exact keyword strategy you need to bypass the ATS screening software."
-*   **Why it works:** It positions the author as a whistleblower sharing forbidden knowledge. It makes the reader feel like an insider.
+*   **The Hook:** "What to check before submitting a role-specific CV."
+*   **Reader purpose:** Use documented requirements to explain a checklist. Do not promise to bypass screening software or imply confidential insider evidence you do not have.

 ### 9. The Time-Lapse (Speed of Execution)
-*   **The Hook:** "I built and launched a profitable SaaS product in 48 hours. Here is the minute-by-minute breakdown of how I did it."
-*   **Why it works:** The extreme time constraint creates awe and curiosity. It proves efficiency and promises a highly detailed, actionable framework inside the post.
+*   **The Hook:** "A project timeline: the decisions between our initial plan and release."
+*   **Reader purpose:** Show actual stages and dependencies. State dates or commercial results only when documented; a timeline alone does not establish speed or profitability.

 ### 10. The Empathy Anchor
 *   **The Hook:** "If you are feeling completely overwhelmed by your career right now, please read this. You are not falling behind."
-*   **Why it works:** It speaks directly to the silent anxiety that many professionals feel. It creates a safe space in a usually corporate environment, leading to deeply personal comments and high shareability.
+*   **Reader purpose:** Introduce a supportive discussion without promising a psychological outcome, comments, or shares. Offer a concrete perspective you can substantiate.


@@ -100,7 +99,7 @@ Once the hook is selected, [GoToFlow LinkedIn Carousel Maker](/linkedin-carousel
 ## The Secret Weapon: Formatting

-A viral hook will fail if the post looks like a massive block of text.
+Make the explanation readable, whether it is a text post or a document.
 *   **Use line breaks.** Treat every sentence like its own paragraph.
-*   **Use Document Posts.** Put your hook in the text caption, and put the "meat" of the content inside a 10-slide PDF Carousel. This can improve dwell time because the reader has a clear reason to keep scrolling.
+*   **Use Document Posts.** Use the caption to introduce the document and distribute the explanation across as many slides as it needs. Check that each page adds information; a ten-slide count is not a performance benchmark.

 To turn a selected hook or source into the complete document post, use [GoToFlow LinkedIn Carousel Maker](/linkedin-carousel-maker) for the structure, slide copy, visual direction, CTA, and finished PDF-ready carousel.

```

</details>

## 10. Handoff / decision boundary

**Review packet complete; publication BLOCKED.** Единый implementation batch остаётся в исходном worktree, без Git handoff. Нет самостоятельного HUMAN/independent semantic approval. Owner/reviewer получает exact27cases, all37CTAcopy/routing, публичные homepage observations, clean-base comparison и exact source/render binding.

Final self-check: все70source BEFORE/FINAL SHA256 и204render BEFORE/FINAL SHA256 в packet совпали с фактическими файлами; historical manifest SHA unchanged; незаполненных packet placeholders0. No scripts/validators/workflows/prerender machinery changed. Orqestra dirty user state unchanged. `git diff --check` проверяет tracked diff, не staging; untracked packet сохранён и hash передаётся отдельно, чтобы не создавать self-reference в документе.

Минимальная последовательность после review: получить route/artifact-bound F/M/S/T/U decisions и устранить содержательные замечания под прежний intent; разрешить D01/E01 contract/evidence issues без ослабления check; проверить browser failures в подходящем разрешённом environment; после любой corrective change заново build/check/hash. Только после обязательных publication gates отдельная явная PR авторизация может разрешить commit/push. Этот pass останавливается **сейчас**, не инициирует следующий audit/SEO batch.
