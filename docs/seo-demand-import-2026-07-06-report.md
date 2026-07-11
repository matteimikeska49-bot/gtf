# SEO Demand Import 2026-07-06 — Raw Files Processing Report

## 1. Executive summary

- Raw files found: 48
- Files/source units processed: 61
- Duplicate files/source units found: 3
- Unreadable files/source units: 1
- Total raw rows: 20354
- Unique normalized queries: 12559
- Topic opportunities created: 11465
- Excluded queries count: 484
- Queries requiring human review: 578
- Bucket distribution: core=3056, close=5884, adjacent=2578, manual=557, trash=463, unsafe=21
- Pre-existing git changes recorded and untouched: ?? docs/gotoflow-seo-system-audit.md; ?? src/content/blog/demand-sources/gotoflow_topic_demand_merged_for_gemini.txt

## 2. Source inventory summary

| Source type | Files | Raw rows | Unique queries | Notes |
| --- | --- | --- | --- | --- |
| google_search_console | 4 | 2072 | 909 | query rows normalized when query column existed; URL-only rows used as owner context |
| unknown_csv | 12 | 399 | 0 | query rows normalized when query column existed; URL-only rows used as owner context |
| unreadable | 1 | 0 | 0 | query rows normalized when query column existed; URL-only rows used as owner context |
| url_inventory | 2 | 244 | 0 | query rows normalized when query column existed; URL-only rows used as owner context |
| wordstat_similar_queries | 1 | 17 | 17 | query rows normalized when query column existed; URL-only rows used as owner context |
| wordstat_top_queries | 38 | 8498 | 8271 | query rows normalized when query column existed; URL-only rows used as owner context |
| yandex_url_analytics | 2 | 3196 | 1059 | query rows normalized when query column existed; URL-only rows used as owner context |
| yandex_webmaster_queries | 2 | 5942 | 2991 | query rows normalized when query column existed; URL-only rows used as owner context |

## 3. Duplicate file summary

| Duplicate file | Duplicate of | Reason |
| --- | --- | --- |
| gotoflow.io-Performance-on-Search-2026-07-06.zip::Вид в поиске.csv | src_0008 | same SHA-256 content hash |
| gotoflow.io_b3c05cba65db6c5.csv.gz | src_0020 | same SHA-256 content hash |
| gotoflow.io_d4614eeeb7cd1a4c9113d445.csv.gz | src_0022 | same SHA-256 content hash |

## 4. Query decision summary

| Decision | Count | Meaning |
| --- | --- | --- |
| use_as_topic_source | 10928 | retained as topic-source opportunity |
| merge_into_topic | 610 | same intent grouped under another topic |
| needs_human_review | 537 | kept but requires SERP/safety review |
| exclude_as_trash | 463 | excluded from topics as unrelated |
| exclude_as_unsafe | 21 | excluded due unsafe/bad-claim intent |

## 5. Relevance bucket summary

| Bucket | Count | How handled |
| --- | --- | --- |
| close_relevant | 5884 | used as topic source unless grouped |
| core_relevant | 3056 | used as topic source unless grouped |
| adjacent_relevant | 2578 | preserved for later topic expansion |
| manual_review | 557 | held as review/hold opportunity |
| trash | 463 | excluded and listed in review file |
| unsafe_or_bad_claim | 21 | excluded or review-gated for safety |

## 6. Topic opportunity distribution

| Cluster | Total topics | Core | Close | Adjacent | Needs review |
| --- | --- | --- | --- | --- | --- |
| ai_post_generation | 2665 | 45 | 2605 | 11 | 4 |
| image_generation | 2413 | 0 | 80 | 2328 | 5 |
| unknown_review | 1928 | 0 | 1418 | 0 | 510 |
| ai_carousel_generation | 1459 | 1459 | 0 | 0 | 0 |
| instagram_carousels | 1120 | 1120 | 0 | 0 | 0 |
| instagram_posts | 1056 | 13 | 1034 | 8 | 1 |
| vk_posts | 272 | 1 | 253 | 18 | 0 |
| problem_solver | 184 | 0 | 184 | 0 | 0 |
| templates | 133 | 54 | 64 | 5 | 10 |
| linkedin_b2b | 82 | 64 | 18 | 0 | 0 |
| prompts | 80 | 61 | 13 | 6 | 0 |
| visual_design | 42 | 0 | 0 | 42 | 0 |
| canva_figma_workflow | 10 | 0 | 0 | 10 | 0 |
| product_route | 10 | 3 | 0 | 0 | 7 |
| content_plan | 8 | 8 | 0 | 0 | 0 |
| niche_use_cases | 3 | 0 | 3 | 0 | 0 |

## 7. Top 100 topic opportunities preview

| topic_id | primary_query | suggested_h1 | cluster | intent | suggested_role | source_strength | reason |
| --- | --- | --- | --- | --- | --- | --- | --- |
| topic_00001 | #generator instagram | #generator instagram | unknown_review | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00002 | +extra small girls on yandex | +extra small girls on yandex | unknown_review | hold_research | hold | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00003 | 0 просмотров рилс инстаграм | 0 просмотров рилс инстаграм | unknown_review | hold_research | standalone_article | weak | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00004 | 1 91 1 | 1 91 1 | unknown_review | hold_research | hold | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00005 | 1 ай картинки | 1 ай картинки | image_generation | hold_research | standalone_article | weak | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00006 | 1 пост инстаграм | 1 пост инстаграм | instagram_posts | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00007 | 100 дней каникулы посты для вк | 100 дней каникулы посты для вк | vk_posts | hold_research | standalone_article | weak | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00008 | 1080 1350 пикселей | 1080 1350 пикселей | unknown_review | hold_research | hold | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00009 | 1080 x 1350 instagram | 1080 x 1350 instagram | unknown_review | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00010 | 1080 на 1350 соотношение сторон | 1080 на 1350 соотношение сторон | unknown_review | hold_research | hold | strong | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00011 | 1080 на 1350 это какое соотношение | 1080 на 1350 это какое соотношение | unknown_review | hold_research | hold | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00012 | 1080x1350 это какой формат | 1080x1350 это какой формат | unknown_review | format_guide | hold | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00013 | 1080×1350 это какой размер | 1080×1350 это какой размер | unknown_review | format_guide | hold | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00014 | 1080х1350 | 1080х1350 | unknown_review | hold_research | hold | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00015 | 12 июня день россии написать пост | 12 июня день россии написать пост | ai_post_generation | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00016 | 12 июня праздник написать пост | 12 июня праздник написать пост | ai_post_generation | hold_research | standalone_article | weak | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00017 | 14600 дней написать пост день рождения | 14600 дней написать пост день рождения | ai_post_generation | hold_research | standalone_article | weak | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00018 | 18 картинки голые девушки ии | 18 картинки голые девушки ии | image_generation | generator | standalone_article | weak | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00019 | 18 посты в инстаграм | 18 посты в инстаграм | instagram_posts | hold_research | standalone_article | weak | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00020 | 20 постов в инстаграм | 20 постов в инстаграм | instagram_posts | hold_research | standalone_article | weak | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00021 | 20 шаблонов каруселей в канва | 20 шаблонов каруселей в канва | templates | template | standalone_article | strong | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00022 | 2025 картинки ии | 2025 картинки ии | image_generation | generator | standalone_article | weak | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00023 | 2026 шрифт для инстаграма | 2026 шрифт для инстаграма | unknown_review | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00024 | 22 июня пост для вк | 22 июня пост для вк | vk_posts | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00025 | 24 поиск алиса ai картинки видео | 24 поиск алиса ai картинки видео | image_generation | generator | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00026 | 3 поста для инстаграм | 3 поста для инстаграм | instagram_posts | hold_research | standalone_article | weak | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00027 | 3d дизайнер картинки | 3d дизайнер картинки | image_generation | hold_research | standalone_article | weak | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00028 | 3д ии stl онлайн по картинке | 3д ии stl онлайн по картинке | image_generation | generator | standalone_article | weak | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00029 | 3д модель по фото нейросеть | 3д модель по фото нейросеть | ai_post_generation | hold_research | standalone_article | strong | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00030 | 3д нейросеть | 3д нейросеть | ai_post_generation | hold_research | standalone_article | strong | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00031 | 4 5 post | 4 5 post | ai_post_generation | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00032 | 4x5 instagram size | 4x5 instagram size | unknown_review | format_guide | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00033 | 5 нейросетей | 5 нейросетей | ai_post_generation | hold_research | standalone_article | strong | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00034 | 5 пост написать | 5 пост написать | ai_post_generation | hold_research | standalone_article | strong | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00035 | 5 тем для постов вк | 5 тем для постов вк | vk_posts | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00036 | 6 нейросетей | 6 нейросетей | ai_post_generation | hold_research | standalone_article | strong | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00037 | 67 картинка ии | 67 картинка ии | image_generation | generator | standalone_article | weak | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00038 | 8 нейросетей | 8 нейросетей | ai_post_generation | hold_research | standalone_article | strong | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00039 | 9 ая картинка | 9 ая картинка | image_generation | hold_research | standalone_article | weak | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00040 | 9 нейросетей | 9 нейросетей | ai_post_generation | hold_research | standalone_article | strong | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00041 | 9 постов инстаграм | 9 постов инстаграм | instagram_posts | hold_research | standalone_article | weak | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00042 | @lina_permoments instagram блог | @lina_permoments instagram блог | unknown_review | hold_research | standalone_article | strong | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00043 | afmeting instagram post | Afmeting instagram post | instagram_posts | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00044 | afmeting post instagram | Afmeting post instagram | instagram_posts | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00045 | ai art картинки | Ai art картинки | image_generation | hold_research | standalone_article | weak | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00046 | ai carousel | Ai carousel | ai_carousel_generation | hold_research | standalone_article | strong | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00047 | ai carousel creator | Ai carousel creator | ai_carousel_generation | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00048 | ai carousel generator | Ai carousel generator | ai_carousel_generation | hold_research | standalone_article | strong | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00049 | ai carousel generator playwright puppeteer node js open source github 2026 | Ai carousel generator playwright puppeteer node js open source github 2026 | ai_carousel_generation | hold_research | standalone_article | strong | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00050 | ai carousel maker | Ai carousel maker | ai_carousel_generation | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00051 | ai carousel post maker | Ai carousel post maker | ai_carousel_generation | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00052 | ai carousels | Ai carousels | ai_carousel_generation | hold_research | standalone_article | strong | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00053 | ai content generation tools for webflow seo | Ai content generation tools for webflow seo | unknown_review | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00054 | ai content generator | Ai content generator | ai_post_generation | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00055 | ai content generator for social media | Ai content generator for social media | ai_post_generation | hold_research | standalone_article | strong | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00056 | ai content marketing plan | Ai content marketing plan | unknown_review | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00057 | ai content marketing strategy | Ai content marketing strategy | unknown_review | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00058 | ai content strategy | Ai content strategy | unknown_review | hold_research | standalone_article | strong | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00059 | ai corusels | Ai corusels | unknown_review | hold_research | hold | strong | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00060 | ai for instagram | Ai for instagram | unknown_review | hold_research | standalone_article | strong | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00061 | ai for instagram free | Ai for instagram free | unknown_review | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00062 | ai for instagram post | Ai for instagram post | instagram_posts | hold_research | standalone_article | strong | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00063 | ai for instagram posts | Ai for instagram posts | instagram_posts | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00064 | ai for linkedin posts | Ai for linkedin posts | linkedin_b2b | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00065 | ai generate content | Ai generate content | unknown_review | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00066 | ai generated instagram posts | Ai generated instagram posts | instagram_posts | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00067 | ai generated linkedin posts | Ai generated linkedin posts | linkedin_b2b | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00068 | ai generator instagram | Ai generator instagram | unknown_review | hold_research | standalone_article | strong | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00069 | ai generator картинок | Ai generator картинок | image_generation | generator | standalone_article | weak | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00070 | ai gif из картинки | Ai gif из картинки | image_generation | hold_research | standalone_article | weak | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00071 | ai gpt картинки | Ai gpt картинки | image_generation | hold_research | standalone_article | weak | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00072 | ai hentai картинки | Ai hentai картинки | image_generation | hold_research | standalone_article | weak | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00073 | ai ig post | Ai ig post | ai_post_generation | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00074 | ai ig post generator | Ai ig post generator | ai_post_generation | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00075 | ai instagram carousel generator | Ai instagram carousel generator | instagram_carousels | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00076 | ai instagram content | Ai instagram content | unknown_review | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00077 | ai instagram content generator | Ai instagram content generator | ai_post_generation | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00078 | ai instagram copy link | Ai instagram copy link | unknown_review | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00079 | ai instagram photo generator | Ai instagram photo generator | unknown_review | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00080 | ai instagram post | Ai instagram post | instagram_posts | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00081 | ai instagram post generator | Ai instagram post generator | instagram_posts | hold_research | standalone_article | strong | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00082 | ai instagram post generator free | Ai instagram post generator free | instagram_posts | hold_research | standalone_article | strong | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00083 | ai instagram post maker | Ai instagram post maker | instagram_posts | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00084 | ai instagram posts | Ai instagram posts | instagram_posts | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00085 | ai instagram posts generator | Ai instagram posts generator | instagram_posts | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00086 | ai linkedin carousel generator | Ai linkedin carousel generator | linkedin_b2b | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00087 | ai linkedin generator | Ai linkedin generator | unknown_review | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00088 | ai linkedin post | Ai linkedin post | linkedin_b2b | hold_research | standalone_article | strong | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00089 | ai linkedin post generator | Ai linkedin post generator | linkedin_b2b | hold_research | standalone_article | strong | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00090 | ai linkedin post writer | Ai linkedin post writer | linkedin_b2b | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00091 | ai linkedin posts generator | Ai linkedin posts generator | linkedin_b2b | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00092 | ai midjourney pikabu ru story neyroset_midjourney_kak_sozdavat_izobrazheniya_kotoryie_vyiglyadyat_kak_rabotyi_professionalnyikh_khudozhnikov_1 | Ai midjourney pikabu ru story neyroset_midjourney_kak_sozdavat_izobrazheniya_kotoryie_vyiglyadyat_kak_rabotyi_professionalnyikh_khudozhnikov_1 | unknown_review | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00093 | ai nsfw картинки | Ai nsfw картинки | image_generation | hold_research | standalone_article | weak | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00094 | ai photo generator instagram | Ai photo generator instagram | unknown_review | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00095 | ai porn картинки | Ai porn картинки | image_generation | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00096 | ai post | Ai post | ai_post_generation | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00097 | ai post generator | Ai post generator | ai_post_generation | hold_research | standalone_article | strong | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00098 | ai post generator for instagram | Ai post generator for instagram | instagram_posts | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00099 | ai post generator free | Ai post generator free | ai_post_generation | hold_research | standalone_article | strong | relevant demand signal preserved for SEO backlog; not a final article decision |
| topic_00100 | ai powered content generator | Ai powered content generator | ai_post_generation | hold_research | standalone_article | medium | relevant demand signal preserved for SEO backlog; not a final article decision |

## 8. Excluded queries review summary

- Excluded as duplicate: 0
- Excluded as trash: 463
- Excluded as unsafe: 21
- Excluded due unreadable/bad data: 0
- Examples are preserved in `seo-excluded-queries-review.csv` with reconsideration conditions.

## 9. Adjacent opportunities preserved

- Designer/image/design queries were kept where they can connect to visual social content production.
- Templates, visual content, niche content, SMM, and post design demand were retained for semantic review.
- Broad AI image/content queries were not automatically discarded; only clearly unrelated/adult/piracy/entertainment/software intents were excluded.

## 10. Risks and limitations

- Files may contain duplicates; duplicate source units are inventoried and retained in evidence.
- Wordstat lacks site-level URL owner signal.
- GSC/Yandex metrics are not directly comparable and should be reviewed as separate evidence streams.
- URL analytics covers only the exported period and owner URL signals are preliminary.
- Final anti-cannibalization must happen later through the existing GoToFlow system.

## 11. Recommended next step

Recommended stage: 00B Gemini / GPT semantic backlog stage.

Input files:
- `scratch/seo-demand-imports/2026-07-06/seo-topic-opportunities-all.csv`
- `scratch/seo-demand-imports/2026-07-06/seo-topic-source-map.csv`
- `scratch/seo-demand-imports/2026-07-06/seo-query-decision-log.csv`
- `docs/seo-demand-import-2026-07-06-report.md`

Do not write articles yet.
