# SEO Demand 00B-R Repair Report — GoToFlow

## 1. Executive summary

- Previous semantic topics count: 9745
- Repaired semantic topics count: 6212
- Previous standalone count: 6008
- Repaired standalone count: 1059
- Previous section count: 28
- Repaired section count: 171
- Previous FAQ count: 60
- Repaired FAQ count: 380
- Previous internal linking count: 0
- Repaired internal linking count: 305
- Previous product route tasks: 3
- Repaired product route tasks: 6
- Previous HOLD count: 2240
- Repaired HOLD count: 21
- Previous reject count: 0 in backlog / prior rejects were only in decisions
- Repaired reject count: 140 source opportunities
- Previous P0/P1/P2/P3: 286/519/6954/1986
- Repaired P0/P1/P2/P3: 699/681/3074/1758
- Unsafe/adult queries removed: 140
- Previous topics grouped/split by repair: 5240
- Source opportunities rejected: 140
- Topics demoted from P0/P1: 10
- Topics promoted to P0/P1: 3923
- likely_existing_owner topics rehandled: 511
- product_route_owner topics rehandled: 20
- Pre-existing git changes recorded and untouched: ?? docs/gotoflow-seo-system-audit.md; ?? docs/seo-demand-import-2026-07-06-report.md; ?? src/content/blog/demand-sources/gotoflow_topic_demand_merged_for_gemini.txt

## 2. What was wrong in 00B

- Grouping was too weak: 11,465 source opportunities still produced 9,745 semantic topics.
- Standalone candidates were inflated while section, FAQ, product-route and internal-linking tasks were underused.
- URL analytics owner signals were not reflected strongly enough in role assignment.
- Unsafe/adult/noisy tails and unrelated queries remained near clean topics.
- Some H1s inherited raw query wording, typo variants or awkward mixed-language terms.
- Explanation and product-angle fields were too generic for 00C triage.
- Instagram topics were over-held instead of split by evergreen, format, problem, template, generator and algorithm-risk intents.

## 3. Repair methodology

- Regrouped source opportunities by platform, intent, object, niche and cleaned semantic family.
- Rewrote H1/title/slug from cleaned labels and canonical topic roles.
- Searched primary, secondary and source queries for adult/unsafe/noisy markers and removed or rejected them.
- Converted likely_existing_owner/product_route_owner topics into sections, FAQ, internal linking or product route tasks unless a separate informational intent was clear.
- Reapplied stricter P0/P1 gates: clean H1, clear intent, safe framing, direct product bridge, and no owner ambiguity.
- Split Instagram into evergreen how-to, format freshness, problem-solver, template, generator and claim-risk buckets.
- Rewrote product angles and why_* fields with topic-specific logic.

## 4. Distribution by role

| Role | Previous | Repaired | Change | Notes |
| --- | ---: | ---: | ---: | --- |
| faq_addition | 60 | 380 | 320 | question-like or compact support intents |
| hold | 1821 | 2918 | 1097 | needs manual/SERP/freshness validation |
| internal_linking_task | 0 | 305 | 305 | URL-owner demand converted into linking/anchor work |
| later_standalone | 1825 | 1373 | -452 | useful adjacent/lower priority topics |
| product_route_optimization | 3 | 6 | 3 | product route owner topics moved to route work |
| reject | 0 | 0 | 0 | unsafe/unrelated sources only in decisions, not backlog |
| section_in_existing_article | 28 | 171 | 143 | owner-signal and overlap topics moved into updates/sections |
| standalone_article | 6008 | 1059 | -4949 | clean new-owner candidates after grouping |

## 5. Distribution by priority

| Priority | Previous | Repaired | Change | Notes |
| --- | ---: | ---: | ---: | --- |
| P0 | 286 | 699 | 413 | P0/P1 cleaned with stricter quality gates |
| P1 | 519 | 681 | 162 | P0/P1 cleaned with stricter quality gates |
| P2 | 6954 | 3074 | -3880 | absorbed demoted/review/adjacent topics |
| P3 | 1986 | 1758 | -228 | absorbed demoted/review/adjacent topics |

## 6. Distribution by cluster

| Cluster | Previous topics | Repaired topics | P0 | P1 | P2 | P3 | Needs review | Notes |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| unknown_review | 1796 | 1730 | 0 | 0 | 1 | 1729 | 1730 | repaired grouping and owner handling applied |
| image_generation | 1818 | 1338 | 0 | 0 | 1338 | 0 | 19 | repaired grouping and owner handling applied |
| ai_carousel_generation | 1281 | 957 | 230 | 424 | 302 | 1 | 626 | repaired grouping and owner handling applied |
| instagram_posts | 948 | 637 | 120 | 11 | 502 | 4 | 384 | repaired grouping and owner handling applied |
| instagram_carousels | 997 | 619 | 241 | 201 | 173 | 4 | 320 | repaired grouping and owner handling applied |
| ai_post_generation | 2164 | 534 | 82 | 21 | 430 | 1 | 373 | repaired grouping and owner handling applied |
| problem_solver | 174 | 166 | 0 | 13 | 134 | 19 | 59 | repaired grouping and owner handling applied |
| vk_posts | 242 | 166 | 5 | 1 | 160 | 0 | 152 | repaired grouping and owner handling applied |
| linkedin_b2b | 63 | 15 | 10 | 2 | 3 | 0 | 5 | repaired grouping and owner handling applied |
| prompts | 77 | 11 | 6 | 2 | 3 | 0 | 3 | repaired grouping and owner handling applied |
| templates | 117 | 11 | 5 | 3 | 3 | 0 | 5 | repaired grouping and owner handling applied |
| canva_figma_workflow | 10 | 10 | 0 | 0 | 10 | 0 | 4 | repaired grouping and owner handling applied |
| visual_design | 38 | 8 | 0 | 0 | 8 | 0 | 2 | repaired grouping and owner handling applied |
| product_route | 9 | 4 | 0 | 0 | 4 | 0 | 4 | repaired grouping and owner handling applied |
| content_plan | 8 | 3 | 0 | 0 | 3 | 0 | 2 | repaired grouping and owner handling applied |
| niche_use_cases | 3 | 3 | 0 | 3 | 0 | 0 | 0 | repaired grouping and owner handling applied |

## 7. P0/P1 quality review

| ID | H1 | Cluster | Intent | Priority | Why |
| --- | ---: | ---: | ---: | ---: | --- |
| repair_sem_01461 | Генератор постов для соцсетей | ai_post_generation | generator | P0 | Created because grouped demand asks for a tool or AI workflow around “Генератор постов для соцсетей”, which maps directly to GoToFlow content generation. |
| repair_sem_06049 | Посты для ВК | vk_posts | format_guide | P0 | Created because format/size queries around “Посты для ВК” need a clear owner or update path before content creation. |
| repair_sem_00126 | Размер и формат поста в Instagram | instagram_posts | format_guide | P0 | Created because format/size queries around “Размер и формат поста в Instagram” need a clear owner or update path before content creation. |
| repair_sem_00158 | Генератор постов для Instagram | instagram_posts | generator | P0 | Created because grouped demand asks for a tool or AI workflow around “Генератор постов для Instagram”, which maps directly to GoToFlow content generation. |
| repair_sem_04612 | Промпты для каруселей и постов | prompts | prompt | P0 | Created because prompt demand around “Промпты для каруселей и постов” is close to GoToFlow’s guided AI workflow for carousels and posts. |
| repair_sem_06209 | Генератор постов для ВК | vk_posts | generator | P0 | Created because grouped demand asks for a tool or AI workflow around “Генератор постов для ВК”, which maps directly to GoToFlow content generation. |
| repair_sem_00168 | LinkedIn carousel generator | linkedin_b2b | generator | P0 | Created because grouped demand asks for a tool or AI workflow around “LinkedIn carousel generator”, which maps directly to GoToFlow content generation. |
| repair_sem_03331 | Размеры и формат карусели в Instagram | instagram_carousels | format_guide | P0 | Created because format/size queries around “Размеры и формат карусели в Instagram” need a clear owner or update path before content creation. |
| repair_sem_03338 | Размеры и формат карусели в Instagram | instagram_carousels | format_guide | P0 | Created because format/size queries around “Размеры и формат карусели в Instagram” need a clear owner or update path before content creation. |
| repair_sem_03381 | Размеры и формат карусели в Instagram | instagram_carousels | format_guide | P0 | Created because format/size queries around “Размеры и формат карусели в Instagram” need a clear owner or update path before content creation. |
| repair_sem_03398 | Размеры и формат карусели в Instagram | instagram_carousels | format_guide | P0 | Created because format/size queries around “Размеры и формат карусели в Instagram” need a clear owner or update path before content creation. |
| repair_sem_03412 | Размеры и формат карусели в Instagram | instagram_carousels | format_guide | P0 | Created because format/size queries around “Размеры и формат карусели в Instagram” need a clear owner or update path before content creation. |
| repair_sem_00050 | Ai post generator for social media | ai_post_generation | generator | P0 | Created because grouped demand asks for a tool or AI workflow around “Ai post generator for social media”, which maps directly to GoToFlow content generation. |
| repair_sem_00097 | Размеры и формат карусели в Instagram | instagram_carousels | format_guide | P0 | Created because format/size queries around “Размеры и формат карусели в Instagram” need a clear owner or update path before content creation. |
| repair_sem_03886 | Размер и формат поста в Instagram | instagram_posts | format_guide | P0 | Created because format/size queries around “Размер и формат поста в Instagram” need a clear owner or update path before content creation. |
| repair_sem_04398 | Как сделать пост в инстаграм | instagram_posts | how_to | P0 | Created because users ask for practical steps around “Как сделать пост в инстаграм”, a format where GoToFlow can connect input material to ready social content. |
| repair_sem_00161 | LinkedIn carousel content | linkedin_b2b | strategy | P0 | Created or retained because “LinkedIn carousel content” has demand evidence that may support a GoToFlow social-content backlog item after validation. |
| repair_sem_03359 | Размеры и формат карусели в Instagram | instagram_carousels | format_guide | P0 | Created because format/size queries around “Размеры и формат карусели в Instagram” need a clear owner or update path before content creation. |
| repair_sem_03363 | Размеры и формат карусели в Instagram | instagram_carousels | format_guide | P0 | Created because format/size queries around “Размеры и формат карусели в Instagram” need a clear owner or update path before content creation. |
| repair_sem_03403 | Размеры и формат карусели в Instagram | instagram_carousels | format_guide | P0 | Created because format/size queries around “Размеры и формат карусели в Instagram” need a clear owner or update path before content creation. |
| repair_sem_03875 | Размер и формат поста в Instagram | instagram_posts | format_guide | P0 | Created because format/size queries around “Размер и формат поста в Instagram” need a clear owner or update path before content creation. |
| repair_sem_04294 | Как выложить пост в инстаграм | instagram_posts | how_to | P0 | Created because users ask for practical steps around “Как выложить пост в инстаграм”, a format where GoToFlow can connect input material to ready social content. |
| repair_sem_04304 | Как добавить пост в инстаграм | instagram_posts | how_to | P0 | Created because users ask for practical steps around “Как добавить пост в инстаграм”, a format where GoToFlow can connect input material to ready social content. |
| repair_sem_03820 | Как сделать карусель в Instagram | instagram_carousels | how_to | P0 | Created because users ask for practical steps around “Как сделать карусель в Instagram”, a format where GoToFlow can connect input material to ready social content. |
| repair_sem_01875 | Как правильно написать пост | ai_post_generation | how_to | P0 | Created because users ask for practical steps around “Как правильно написать пост”, a format where GoToFlow can connect input material to ready social content. |
| repair_sem_03692 | Генератор каруселей для Instagram | instagram_carousels | generator | P0 | Created because grouped demand asks for a tool or AI workflow around “Генератор каруселей для Instagram”, which maps directly to GoToFlow content generation. |
| repair_sem_03834 | Как сделать карусель в Instagram | instagram_carousels | how_to | P0 | Created because users ask for practical steps around “Как сделать карусель в Instagram”, a format where GoToFlow can connect input material to ready social content. |
| repair_sem_01355 | Как сделать бесшовную карусель | ai_carousel_generation | how_to | P0 | Created because users ask for practical steps around “Как сделать бесшовную карусель”, a format where GoToFlow can connect input material to ready social content. |
| repair_sem_03368 | Размеры и формат карусели в Instagram | instagram_carousels | format_guide | P0 | Created because format/size queries around “Размеры и формат карусели в Instagram” need a clear owner or update path before content creation. |
| repair_sem_03764 | Как сделать карусель в Instagram | instagram_carousels | how_to | P0 | Created because users ask for practical steps around “Как сделать карусель в Instagram”, a format where GoToFlow can connect input material to ready social content. |

## 8. URL owner signal handling

- likely_existing_owner total: 511
- section: 171
- FAQ: 49
- internal linking: 291
- standalone kept: 0
- product_route_owner total: 20
- product route tasks: 6
- internal linking: 14
- standalone kept: 0

## 9. Unsafe/adult cleanup

- Total unsafe/adult/noisy markers found in repaired decisions: 140
- Removed from clean topics: 0
- Rejected: 140
| Query | Action | Reason |
| --- | ---: | --- |
| +extra small girls on yandex | rejected_after_repair | adult/NSFW intent cannot be kept inside clean GoToFlow topics |
| 18 картинки голые девушки ии | rejected_after_repair | adult/NSFW intent cannot be kept inside clean GoToFlow topics |
| ai hentai картинки | rejected_after_repair | adult/NSFW intent cannot be kept inside clean GoToFlow topics |
| ai nsfw картинки | rejected_after_repair | adult/NSFW intent cannot be kept inside clean GoToFlow topics |
| ai porn картинки | rejected_after_repair | adult/NSFW intent cannot be kept inside clean GoToFlow topics |
| ai голые женщины картинки | rejected_after_repair | adult/NSFW intent cannot be kept inside clean GoToFlow topics |
| ai картинки girl porn | rejected_after_repair | adult/NSFW intent cannot be kept inside clean GoToFlow topics |
| ai секс картинки | rejected_after_repair | adult/NSFW intent cannot be kept inside clean GoToFlow topics |
| ai хентай картинка | rejected_after_repair | adult/NSFW intent cannot be kept inside clean GoToFlow topics |
| ai хентай картинки скачать бесплатно | rejected_after_repair | adult/NSFW intent cannot be kept inside clean GoToFlow topics |
| ии картинки | rejected_after_repair | adult/NSFW intent cannot be kept inside clean GoToFlow topics |
| bbw ai хентай картинки | rejected_after_repair | adult/NSFW intent cannot be kept inside clean GoToFlow topics |
| hentai картинки анимация ии | rejected_after_repair | adult/NSFW intent cannot be kept inside clean GoToFlow topics |
| nsfw ai картинки без цензуры | rejected_after_repair | adult/NSFW intent cannot be kept inside clean GoToFlow topics |
| nsfw контент ии | rejected_after_repair | adult/NSFW intent cannot be kept inside clean GoToFlow topics |
| nsfw нейросеть | rejected_after_repair | adult/NSFW intent cannot be kept inside clean GoToFlow topics |
| porno ai картинки | rejected_after_repair | adult/NSFW intent cannot be kept inside clean GoToFlow topics |
| нейросеть картинки онлайн | rejected_after_repair | adult/NSFW intent cannot be kept inside clean GoToFlow topics |
| аи секс видео создать | rejected_after_repair | adult/NSFW intent cannot be kept inside clean GoToFlow topics |
| аи хентай создание картинок | rejected_after_repair | adult/NSFW intent cannot be kept inside clean GoToFlow topics |

## 10. Instagram cluster repair

- Instagram standalone: 502
- Instagram section: 123
- Instagram FAQ: 75
- Instagram HOLD: 2
- Evergreen and generator/template topics were not automatically held; only algorithm/policy/freshness-sensitive items remain HOLD/review.

## 11. Adjacent topics preserved

- image_generation, visual_design, templates, design without designer, pictures for posts, VK posts, Instagram posts and niche content remain in the backlog when they have a product bridge.
- They are mostly P2/later or owner-validation tasks rather than inflated P0/P1 topics.

## 12. Remaining risks

- Final repo validation still required.
- Final anti-cannibalization still required.
- Final SERP validation for HOLD/platform topics required.
- No article writing yet.
- No production readiness claim.

## 13. Recommended next step

00C Codex repo/system validation.

Input files for 00C:
- `seo-semantic-topic-backlog-repaired.csv`
- `seo-semantic-topic-decisions-repaired.csv`
- `seo-semantic-topic-groups-repaired.csv`
- `seo-semantic-topic-backlog-repaired-summary.md`
- `docs/seo-demand-00b-repair-2026-07-06-report.md`

ready for 00C repo validation after 00B-R repair
