# SEO Demand 00E — Full Article Owner Backlog Report

summary:
  repairedTopicsReceived: 6212
  validatedRowsReceived: 6212
  previous00DRoadmapCandidates: 500
  articleOwnersCreated: 5054
  approve: 271
  approveLater: 1580
  needsReview: 3203
  blockers: 470
  sectionFaqOnly: 688
  rejectedOrHold: 470
  duplicateGroups: 4
  targetMinimum: 1000
  targetReached: yes
  gapIfAny: 0
  reasonIfGap: No gap. Safe and human-reviewable article-owner backlog exceeds the minimum target.

Optional inputs missing:

- scratch/seo-demand-imports/2026-07-06/seo-00d-rejected-or-deferred.csv

## Why the previous 500-only roadmap is not enough

00D intentionally created a limited first roadmap of 500 deduped candidates for production planning. That was useful for wave planning, but it compressed the wider demand pool into a small execution-oriented list. The current business goal is different: expose a broad human-reviewable backlog of article owners so the user can approve, reject, merge, or defer topics manually before any production stage.

## How over-deduplication was avoided

00E does not collapse topics merely because they share a platform, broad cluster, article type, funnel stage, or the word carousel/post/generator. It keeps separate owner opportunities when the task, platform, audience, user outcome, article type, or product bridge can support a distinct H1, outline, FAQ set, CTA, and internal-link role. Exact conflicts, unsafe topics, product-route-owned topics, existing-owner conflicts, and section/FAQ-only topics are routed out of the article-owner backlog. Duplicate approve families were demoted to NEEDS_REVIEW rather than deleted.

## How existing articles were protected from cannibalization

The expansion uses 00C fields such as owner_type, slug_status, product_route_conflict, cannibalization_risk_final, recommended_owner_url, and existing article slugs from src/content/blog/articles/. High-risk, exact-conflict, product-route, and existing-article-owned topics are not marked prompt2Eligible. Section and FAQ intents are moved into seo-00e-section-faq-only.csv.

## Top 50 safest APPROVE article owners

| ID | Keyword | Slug | Platform | Type | Priority |
| --- | --- | --- | --- | --- | --- |
| owner_00330 | инста карусель формат фото | insta-karusel-format-foto | Instagram | format guide | P0 |
| owner_00337 | какой инстаразмер для карусели | kakoy-instarazmer-dlya-karuseli | Instagram | format guide | P0 |
| owner_00359 | карусель инста размер | karusel-insta-razmer | Instagram | format guide | P0 |
| owner_00360 | карусель инста формат | karusel-insta-format | Instagram | format guide | P0 |
| owner_00389 | размер поста в инста карусель | razmer-posta-v-insta-karusel | Instagram | format guide | P0 |
| owner_00396 | размеры каруселей инста | razmery-karuseley-insta | Instagram | format guide | P0 |
| owner_00413 | формат 3 4 карусель инста | format-3-4-karusel-insta | Instagram | format guide | P0 |
| owner_00436 | формат карусели в инста | format-karuseli-v-insta | Instagram | format guide | P0 |
| owner_00451 | формат пост карусель для инста | format-post-karusel-dlya-insta | Instagram | format guide | P0 |
| owner_00467 | фрейм для поста карусели размер инста | freym-dlya-posta-karuseli-razmer-insta | Instagram | format guide | P0 |
| owner_00757 | дизайн карусели в инста как сделать | dizayn-karuseli-v-insta-kak-sdelat | Instagram | how-to | P0 |
| owner_00324 | в каком приложении лучше делать посты карусели | v-kakom-prilozhenii-luchshe-delat-posty-karuseli | Social media | comparison | P0 |
| owner_00325 | лучшее приложение для текстовых каруселей | luchshee-prilozhenie-dlya-tekstovyh-karuseley | Social media | comparison | P0 |
| owner_00326 | что лучше работает для эксперта посты карусели или видео | chto-luchshe-rabotaet-dlya-eksperta-posty-karuseli-ili-video | Social media | comparison | P0 |
| owner_00334 | какие фото лучше делать для карусели напиши их размеры например 16 9 | kakie-foto-luchshe-delat-dlya-karuseli-napishi-ih-razmery-naprimer-16-9 | Social media | comparison | P0 |
| owner_00447 | формат карусель с инфографикой это примеры | format-karusel-s-infografikoy-eto-primery | Social media | examples article | P0 |
| owner_00804 | аи для создания поста карусели примеры инструкция | ai-dlya-sozdaniya-posta-karuseli-primery-instrukciya | Social media | examples article | P0 |
| owner_00805 | карусель в инсте примеры | karusel-v-inste-primery | Social media | examples article | P0 |
| owner_00806 | карусель пост с информацией пример | karusel-post-s-informaciey-primer | Social media | examples article | P0 |
| owner_00807 | пост карусель примеры | post-karusel-primery | Social media | examples article | P0 |
| owner_00809 | примеры дизайна поста карусели в инсте | primery-dizayna-posta-karuseli-v-inste | Social media | examples article | P0 |
| owner_00810 | примеры каруселей в инст | primery-karuseley-v-inst | Social media | examples article | P0 |
| owner_00811 | примеры крутых каруселей в инсте | primery-krutyh-karuseley-v-inste | Social media | examples article | P0 |
| owner_00327 | как выкладывать в одну карусель фото разных форматов | kak-vykladyvat-v-odnu-karusel-foto-raznyh-formatov | Social media | format guide | P0 |
| owner_00328 | добавить в карусель инсты разные размеры | dobavit-v-karusel-insty-raznye-razmery | Social media | format guide | P0 |
| owner_00329 | как загрузить карусели в инсту чтобы был формат 9 16 | kak-zagruzit-karuseli-v-instu-chtoby-byl-format-9-16 | Social media | format guide | P0 |
| owner_00331 | как в инсте в карусели сделать фото разного размера | kak-v-inste-v-karuseli-sdelat-foto-raznogo-razmera | Social media | format guide | P0 |
| owner_00332 | в инсте размер поста карусели | v-inste-razmer-posta-karuseli | Social media | format guide | P0 |
| owner_00333 | какие размеры у карусели инсты | kakie-razmery-u-karuseli-insty | Social media | format guide | P0 |
| owner_00335 | какого формата карусель в инсте | kakogo-formata-karusel-v-inste | Social media | format guide | P0 |
| owner_00336 | какое соотношение сторон выбрать для карусели в инст | kakoe-sootnoshenie-storon-vybrat-dlya-karuseli-v-inst | Social media | format guide | P0 |
| owner_00338 | какой размер используется для поста карусели | kakoy-razmer-ispolzuetsya-dlya-posta-karuseli | Social media | format guide | P0 |
| owner_00339 | какой размер карусели в инсте 4 5 | kakoy-razmer-karuseli-v-inste-4-5 | Social media | format guide | P0 |
| owner_00340 | какой размер слайдо для поста карусели в инсте | kakoy-razmer-slaydo-dlya-posta-karuseli-v-inste | Social media | format guide | P0 |
| owner_00341 | какой размер у карусели в инсте | kakoy-razmer-u-karuseli-v-inste | Social media | format guide | P0 |
| owner_00342 | какой сейчас размер фото для поста карусели | kakoy-seychas-razmer-foto-dlya-posta-karuseli | Social media | format guide | P0 |
| owner_00343 | какой формат должен быть у фоток на карусель в инсте | kakoy-format-dolzhen-byt-u-fotok-na-karusel-v-inste | Social media | format guide | P0 |
| owner_00344 | какой формат изображения в карусели инсты | kakoy-format-izobrazheniya-v-karuseli-insty | Social media | format guide | P0 |
| owner_00345 | какой формат картинок в карусели в инстограмме | kakoy-format-kartinok-v-karuseli-v-instogramme | Social media | format guide | P0 |
| owner_00346 | какой формат каруселей в инст | kakoy-format-karuseley-v-inst | Social media | format guide | P0 |
| owner_00347 | какой формат карусели в инсте | kakoy-format-karuseli-v-inste | Social media | format guide | P0 |
| owner_00348 | какой формат для поста карусели использовать на камере айфон 14 | kakoy-format-dlya-posta-karuseli-ispolzovat-na-kamere-ayfon-14 | Social media | format guide | P0 |
| owner_00349 | какой формат в посте карусели | kakoy-format-v-poste-karuseli | Social media | format guide | P0 |
| owner_00350 | какой формат у карусели в инсте | kakoy-format-u-karuseli-v-inste | Social media | format guide | P0 |
| owner_00351 | какой формат фото в инсте в карусели | kakoy-format-foto-v-inste-v-karuseli | Social media | format guide | P0 |
| owner_00352 | в каком размере выложить фото в инст в карусель чтобы оно не обрезалось | v-kakom-razmere-vylozhit-foto-v-inst-v-karusel-chtoby-ono-ne-obrezalos | Social media | format guide | P0 |
| owner_00353 | в каком размере нужно делать фото в каруселях инст | v-kakom-razmere-nuzhno-delat-foto-v-karuselyah-inst | Social media | format guide | P0 |
| owner_00354 | карусели в инст размер | karuseli-v-inst-razmer | Social media | format guide | P0 |
| owner_00355 | для карусели какой формат | dlya-karuseli-kakoy-format | Social media | format guide | P0 |
| owner_00356 | для карусели поста какой нужен размер | dlya-karuseli-posta-kakoy-nuzhen-razmer | Social media | format guide | P0 |

## Top 200 prompt2Eligible article owners

| ID | Keyword | Slug | Cluster | Platform | Type | Priority |
| --- | --- | --- | --- | --- | --- | --- |
| owner_00011 | ins post size | ins-post-size | ai_post_generation | Social media | format guide | P0 |
| owner_00012 | inst post size | inst-post-size | ai_post_generation | Social media | format guide | P0 |
| owner_00013 | posts size | posts-size | ai_post_generation | Social media | format guide | P0 |
| owner_00026 | social media posting examples | social-media-posting-examples | ai_post_generation | Social media | examples article | P0 |
| owner_00035 | templates for posts and carousels | templates-for-posts-and-carousels | templates | Instagram | template page | P0 |
| owner_00324 | в каком приложении лучше делать посты карусели | v-kakom-prilozhenii-luchshe-delat-posty-karuseli | ai_carousel_generation | Social media | comparison | P0 |
| owner_00325 | лучшее приложение для текстовых каруселей | luchshee-prilozhenie-dlya-tekstovyh-karuseley | ai_carousel_generation | Social media | comparison | P0 |
| owner_00326 | что лучше работает для эксперта посты карусели или видео | chto-luchshe-rabotaet-dlya-eksperta-posty-karuseli-ili-video | ai_carousel_generation | Social media | comparison | P0 |
| owner_00327 | как выкладывать в одну карусель фото разных форматов | kak-vykladyvat-v-odnu-karusel-foto-raznyh-formatov | ai_carousel_generation | Social media | format guide | P0 |
| owner_00328 | добавить в карусель инсты разные размеры | dobavit-v-karusel-insty-raznye-razmery | ai_carousel_generation | Social media | format guide | P0 |
| owner_00329 | как загрузить карусели в инсту чтобы был формат 9 16 | kak-zagruzit-karuseli-v-instu-chtoby-byl-format-9-16 | ai_carousel_generation | Social media | format guide | P0 |
| owner_00330 | инста карусель формат фото | insta-karusel-format-foto | ai_carousel_generation | Instagram | format guide | P0 |
| owner_00331 | как в инсте в карусели сделать фото разного размера | kak-v-inste-v-karuseli-sdelat-foto-raznogo-razmera | ai_carousel_generation | Social media | format guide | P0 |
| owner_00332 | в инсте размер поста карусели | v-inste-razmer-posta-karuseli | ai_carousel_generation | Social media | format guide | P0 |
| owner_00333 | какие размеры у карусели инсты | kakie-razmery-u-karuseli-insty | ai_carousel_generation | Social media | format guide | P0 |
| owner_00334 | какие фото лучше делать для карусели напиши их размеры например 16 9 | kakie-foto-luchshe-delat-dlya-karuseli-napishi-ih-razmery-naprimer-16-9 | ai_carousel_generation | Social media | comparison | P0 |
| owner_00335 | какого формата карусель в инсте | kakogo-formata-karusel-v-inste | ai_carousel_generation | Social media | format guide | P0 |
| owner_00336 | какое соотношение сторон выбрать для карусели в инст | kakoe-sootnoshenie-storon-vybrat-dlya-karuseli-v-inst | ai_carousel_generation | Social media | format guide | P0 |
| owner_00337 | какой инстаразмер для карусели | kakoy-instarazmer-dlya-karuseli | ai_carousel_generation | Instagram | format guide | P0 |
| owner_00338 | какой размер используется для поста карусели | kakoy-razmer-ispolzuetsya-dlya-posta-karuseli | ai_carousel_generation | Social media | format guide | P0 |
| owner_00339 | какой размер карусели в инсте 4 5 | kakoy-razmer-karuseli-v-inste-4-5 | ai_carousel_generation | Social media | format guide | P0 |
| owner_00340 | какой размер слайдо для поста карусели в инсте | kakoy-razmer-slaydo-dlya-posta-karuseli-v-inste | ai_carousel_generation | Social media | format guide | P0 |
| owner_00341 | какой размер у карусели в инсте | kakoy-razmer-u-karuseli-v-inste | ai_carousel_generation | Social media | format guide | P0 |
| owner_00342 | какой сейчас размер фото для поста карусели | kakoy-seychas-razmer-foto-dlya-posta-karuseli | ai_carousel_generation | Social media | format guide | P0 |
| owner_00343 | какой формат должен быть у фоток на карусель в инсте | kakoy-format-dolzhen-byt-u-fotok-na-karusel-v-inste | ai_carousel_generation | Social media | format guide | P0 |
| owner_00344 | какой формат изображения в карусели инсты | kakoy-format-izobrazheniya-v-karuseli-insty | ai_carousel_generation | Social media | format guide | P0 |
| owner_00345 | какой формат картинок в карусели в инстограмме | kakoy-format-kartinok-v-karuseli-v-instogramme | ai_carousel_generation | Social media | format guide | P0 |
| owner_00346 | какой формат каруселей в инст | kakoy-format-karuseley-v-inst | ai_carousel_generation | Social media | format guide | P0 |
| owner_00347 | какой формат карусели в инсте | kakoy-format-karuseli-v-inste | ai_carousel_generation | Social media | format guide | P0 |
| owner_00348 | какой формат для поста карусели использовать на камере айфон 14 | kakoy-format-dlya-posta-karuseli-ispolzovat-na-kamere-ayfon-14 | ai_carousel_generation | Social media | format guide | P0 |
| owner_00349 | какой формат в посте карусели | kakoy-format-v-poste-karuseli | ai_carousel_generation | Social media | format guide | P0 |
| owner_00350 | какой формат у карусели в инсте | kakoy-format-u-karuseli-v-inste | ai_carousel_generation | Social media | format guide | P0 |
| owner_00351 | какой формат фото в инсте в карусели | kakoy-format-foto-v-inste-v-karuseli | ai_carousel_generation | Social media | format guide | P0 |
| owner_00352 | в каком размере выложить фото в инст в карусель чтобы оно не обрезалось | v-kakom-razmere-vylozhit-foto-v-inst-v-karusel-chtoby-ono-ne-obrezalos | ai_carousel_generation | Social media | format guide | P0 |
| owner_00353 | в каком размере нужно делать фото в каруселях инст | v-kakom-razmere-nuzhno-delat-foto-v-karuselyah-inst | ai_carousel_generation | Social media | format guide | P0 |
| owner_00354 | карусели в инст размер | karuseli-v-inst-razmer | ai_carousel_generation | Social media | format guide | P0 |
| owner_00355 | для карусели какой формат | dlya-karuseli-kakoy-format | ai_carousel_generation | Social media | format guide | P0 |
| owner_00356 | для карусели поста какой нужен размер | dlya-karuseli-posta-kakoy-nuzhen-razmer | ai_carousel_generation | Social media | format guide | P0 |
| owner_00357 | карусель 3 4 формат | karusel-3-4-format | ai_carousel_generation | Social media | format guide | P0 |
| owner_00358 | карусель инст формат | karusel-inst-format | ai_carousel_generation | Social media | format guide | P0 |
| owner_00359 | карусель инста размер | karusel-insta-razmer | ai_carousel_generation | Instagram | format guide | P0 |
| owner_00360 | карусель инста формат | karusel-insta-format | ai_carousel_generation | Instagram | format guide | P0 |
| owner_00361 | карусель в инсте какой формат | karusel-v-inste-kakoy-format | ai_carousel_generation | Social media | format guide | P0 |
| owner_00362 | карусель в инсте размер | karusel-v-inste-razmer | ai_carousel_generation | Social media | format guide | P0 |
| owner_00363 | карусель инсты формат | karusel-insty-format | ai_carousel_generation | Social media | format guide | P0 |
| owner_00364 | карусель может ли быть разных размеров | karusel-mozhet-li-byt-raznyh-razmerov | ai_carousel_generation | Social media | format guide | P0 |
| owner_00365 | карусель как формат контента определение | karusel-kak-format-kontenta-opredelenie | ai_carousel_generation | Social media | format guide | P0 |
| owner_00366 | переформировать размер под пост карусель | pereformirovat-razmer-pod-post-karusel | ai_carousel_generation | Social media | format guide | P0 |
| owner_00367 | пост карусель в иг какой формат фото | post-karusel-v-ig-kakoy-format-foto | ai_carousel_generation | Social media | format guide | P0 |
| owner_00368 | пост карусель размер в инсте | post-karusel-razmer-v-inste | ai_carousel_generation | Social media | format guide | P0 |
| owner_00370 | пост карусель соотношение сторон | post-karusel-sootnoshenie-storon | ai_carousel_generation | Social media | format guide | P0 |
| owner_00371 | пост карусель формат | post-karusel-format | ai_carousel_generation | Social media | format guide | P0 |
| owner_00372 | посты для карусели размер | posty-dlya-karuseli-razmer | ai_carousel_generation | Social media | format guide | P0 |
| owner_00373 | посты карусель каких размеров в инсианрам | posty-karusel-kakih-razmerov-v-insianram | ai_carousel_generation | Social media | format guide | P0 |
| owner_00374 | что такое продажи в формате карусель | chto-takoe-prodazhi-v-formate-karusel | ai_carousel_generation | Social media | format guide | P0 |
| owner_00375 | прст карусель формат | prst-karusel-format | ai_carousel_generation | Social media | format guide | P0 |
| owner_00376 | размер бесшовного поста карусели пост один 1080х1080 | razmer-besshovnogo-posta-karuseli-post-odin-1080h1080 | ai_carousel_generation | Social media | format guide | P0 |
| owner_00377 | размер вертикального макета для карусели в соц сетях | razmer-vertikalnogo-maketa-dlya-karuseli-v-soc-setyah | ai_carousel_generation | Social media | format guide | P0 |
| owner_00378 | размер изображения для карусели | razmer-izobrazheniya-dlya-karuseli | ai_carousel_generation | Social media | format guide | P0 |
| owner_00379 | размер кадра а карусели в инст | razmer-kadra-a-karuseli-v-inst | ai_carousel_generation | Social media | format guide | P0 |
| owner_00380 | размер картинки для карусели | razmer-kartinki-dlya-karuseli | ai_carousel_generation | Social media | format guide | P0 |
| owner_00381 | размер картинки для поста в иг карусель | razmer-kartinki-dlya-posta-v-ig-karusel | ai_carousel_generation | Social media | format guide | P0 |
| owner_00382 | размер для карусели инст | razmer-dlya-karuseli-inst | ai_carousel_generation | Social media | format guide | P0 |
| owner_00383 | размер карусели в инсте | razmer-karuseli-v-inste | ai_carousel_generation | Social media | format guide | P0 |
| owner_00384 | размер карусели для инсты | razmer-karuseli-dlya-insty | ai_carousel_generation | Social media | format guide | P0 |
| owner_00385 | размер карусели когда смотришь в ленте | razmer-karuseli-kogda-smotrish-v-lente | ai_carousel_generation | Social media | format guide | P0 |
| owner_00386 | размер для карусель в инсте | razmer-dlya-karusel-v-inste | ai_carousel_generation | Social media | format guide | P0 |
| owner_00388 | размер пост каруселя в интсе | razmer-post-karuselya-v-intse | ai_carousel_generation | Social media | format guide | P0 |
| owner_00389 | размер поста в инста карусель | razmer-posta-v-insta-karusel | ai_carousel_generation | Instagram | format guide | P0 |
| owner_00390 | размер поста карусели | razmer-posta-karuseli | ai_carousel_generation | Social media | format guide | P0 |
| owner_00391 | размер для поста карусель | razmer-dlya-posta-karusel | ai_carousel_generation | Social media | format guide | P0 |
| owner_00392 | размер слайда карусели в инсте | razmer-slayda-karuseli-v-inste | ai_carousel_generation | Social media | format guide | P0 |
| owner_00393 | размер слайдов для карусели инст | razmer-slaydov-dlya-karuseli-inst | ai_carousel_generation | Social media | format guide | P0 |
| owner_00394 | размер фото для карусели | razmer-foto-dlya-karuseli | ai_carousel_generation | Social media | format guide | P0 |
| owner_00395 | размер фото постов карусели | razmer-foto-postov-karuseli | ai_carousel_generation | Social media | format guide | P0 |
| owner_00396 | размеры каруселей инста | razmery-karuseley-insta | ai_carousel_generation | Instagram | format guide | P0 |
| owner_00397 | размеры для карусели в инсте | razmery-dlya-karuseli-v-inste | ai_carousel_generation | Social media | format guide | P0 |
| owner_00398 | размеры поста карусели | razmery-posta-karuseli | ai_carousel_generation | Social media | format guide | P0 |
| owner_00399 | как размеры фото для каруселей | kak-razmery-foto-dlya-karuseley | ai_carousel_generation | Social media | format guide | P0 |
| owner_00400 | для роста а карусели какой формат кадра должен быть | dlya-rosta-a-karuseli-kakoy-format-kadra-dolzhen-byt | ai_carousel_generation | Social media | format guide | P0 |
| owner_00401 | сгенерировать размер слайда под пост карусель | sgenerirovat-razmer-slayda-pod-post-karusel | ai_carousel_generation | Social media | format guide | P0 |
| owner_00402 | как сделать публикацию карусель в формате рассказа о кейсе ювелирного украшения | kak-sdelat-publikaciyu-karusel-v-formate-rasskaza-o-keyse-yuvelirnogo-ukrasheniya | ai_carousel_generation | Social media | format guide | P0 |
| owner_00403 | сделать размеры под карусель какие параметры | sdelat-razmery-pod-karusel-kakie-parametry | ai_carousel_generation | Social media | format guide | P0 |
| owner_00404 | как сделать стильную информативную карусель | kak-sdelat-stilnuyu-informativnuyu-karusel | ai_carousel_generation | Social media | format guide | P0 |
| owner_00405 | как создать карусель из фото в формате 16 9 | kak-sozdat-karusel-iz-foto-v-formate-16-9 | ai_carousel_generation | Social media | format guide | P0 |
| owner_00406 | соотношение каруселей | sootnoshenie-karuseley | ai_carousel_generation | Social media | format guide | P0 |
| owner_00407 | соотношение для поста карусели | sootnoshenie-dlya-posta-karuseli | ai_carousel_generation | Social media | format guide | P0 |
| owner_00408 | соотношение сторон для карусели | sootnoshenie-storon-dlya-karuseli | ai_carousel_generation | Social media | format guide | P0 |
| owner_00409 | соотношение сторон в каруселях | sootnoshenie-storon-v-karuselyah | ai_carousel_generation | Social media | format guide | P0 |
| owner_00410 | существует ли российские приложения позволяющие создавать формат публикации социальных сетях такие как карусель где сочетается шрифты визуал и так далее с легкостью в хорошем качестве типа иностранный канвы | suschestvuet-li-rossiyskie-prilozheniya-pozvolyayuschie-sozdavat-format-publikacii-socialn | ai_carousel_generation | Social media | format guide | P0 |
| owner_00411 | тредс размеры карусели | treds-razmery-karuseli | ai_carousel_generation | Threads | format guide | P0 |
| owner_00412 | увеличить размер фото онлайн чтобы сделать бесшовную карусель | uvelichit-razmer-foto-onlayn-chtoby-sdelat-besshovnuyu-karusel | ai_carousel_generation | Social media | format guide | P0 |
| owner_00413 | формат 3 4 карусель инста | format-3-4-karusel-insta | ai_carousel_generation | Instagram | format guide | P0 |
| owner_00414 | формат 3 к 4 карусели в инсте | format-3-k-4-karuseli-v-inste | ai_carousel_generation | Social media | format guide | P0 |
| owner_00415 | формат бесшовной карусели параметры | format-besshovnoy-karuseli-parametry | ai_carousel_generation | Social media | format guide | P0 |
| owner_00416 | формат горизонтальной карусели | format-gorizontalnoy-karuseli | ai_carousel_generation | Social media | format guide | P0 |
| owner_00417 | формат до фото карусели | format-do-foto-karuseli | ai_carousel_generation | Social media | format guide | P0 |
| owner_00418 | формат иг карусель размер 430 765 | format-ig-karusel-razmer-430-765 | ai_carousel_generation | Social media | format guide | P0 |
| owner_00419 | формат изображений для поста карусели | format-izobrazheniy-dlya-posta-karuseli | ai_carousel_generation | Social media | format guide | P0 |
| owner_00420 | формат изображения в карусель | format-izobrazheniya-v-karusel | ai_carousel_generation | Social media | format guide | P0 |
| owner_00421 | формат изображения для поста карусели инструкция | format-izobrazheniya-dlya-posta-karuseli-instrukciya | ai_carousel_generation | Social media | format guide | P0 |
| owner_00422 | формат инсиа постов карусели | format-insia-postov-karuseli | ai_carousel_generation | Social media | format guide | P0 |
| owner_00423 | формат инсты карусель | format-insty-karusel | ai_carousel_generation | Social media | format guide | P0 |
| owner_00424 | формат кадра для поста карусели | format-kadra-dlya-posta-karuseli | ai_carousel_generation | Social media | format guide | P0 |
| owner_00425 | формат картинки для карусели | format-kartinki-dlya-karuseli | ai_carousel_generation | Social media | format guide | P0 |
| owner_00426 | формат каруселей 3 4 | format-karuseley-3-4 | ai_carousel_generation | Social media | format guide | P0 |
| owner_00427 | формат для каруселей в инст | format-dlya-karuseley-v-inst | ai_carousel_generation | Social media | format guide | P0 |
| owner_00428 | формат каруселей в инсте | format-karuseley-v-inste | ai_carousel_generation | Social media | format guide | P0 |
| owner_00429 | формат для каруселей какой цифры | format-dlya-karuseley-kakoy-cifry | ai_carousel_generation | Social media | format guide | P0 |
| owner_00430 | формат каруселей в максе соотношение | format-karuseley-v-makse-sootnoshenie | ai_carousel_generation | Social media | format guide | P0 |
| owner_00431 | формат каруселей тест | format-karuseley-test | ai_carousel_generation | Social media | format guide | P0 |
| owner_00432 | формат каруселек | format-karuselek | ai_carousel_generation | Social media | format guide | P0 |
| owner_00433 | формат карусели | format-karuseli | ai_carousel_generation | Social media | format guide | P0 |
| owner_00434 | формат карусели длинный сколько | format-karuseli-dlinnyy-skolko | ai_carousel_generation | Social media | format guide | P0 |
| owner_00435 | формат карусели инст | format-karuseli-inst | ai_carousel_generation | Social media | format guide | P0 |
| owner_00436 | формат карусели в инста | format-karuseli-v-insta | ai_carousel_generation | Instagram | format guide | P0 |
| owner_00437 | формат карусели в инсте | format-karuseli-v-inste | ai_carousel_generation | Social media | format guide | P0 |
| owner_00438 | формат карусели в инсту | format-karuseli-v-instu | ai_carousel_generation | Social media | format guide | P0 |
| owner_00439 | формат карусели в интс | format-karuseli-v-ints | ai_carousel_generation | Social media | format guide | P0 |
| owner_00440 | формат для карусели в интсграмм | format-dlya-karuseli-v-intsgramm | ai_carousel_generation | Social media | format guide | P0 |
| owner_00441 | формат карусели кадра | format-karuseli-kadra | ai_carousel_generation | Social media | format guide | P0 |
| owner_00442 | формат карусели какой | format-karuseli-kakoy | ai_carousel_generation | Social media | format guide | P0 |
| owner_00443 | формат карусели в пикселях | format-karuseli-v-pikselyah | ai_carousel_generation | Social media | format guide | P0 |
| owner_00444 | формат карусели размер | format-karuseli-razmer | ai_carousel_generation | Social media | format guide | P0 |
| owner_00445 | формат карусели в соц сети это какой формат фото по цифрам | format-karuseli-v-soc-seti-eto-kakoy-format-foto-po-cifram | ai_carousel_generation | Social media | format guide | P0 |
| owner_00446 | формат карусель что это такое | format-karusel-chto-eto-takoe | ai_carousel_generation | Social media | format guide | P0 |
| owner_00447 | формат карусель с инфографикой это примеры | format-karusel-s-infografikoy-eto-primery | ai_carousel_generation | Social media | examples article | P0 |
| owner_00448 | формат контента карусель | format-kontenta-karusel | ai_carousel_generation | Social media | format guide | P0 |
| owner_00449 | формат плашек для инст карусели | format-plashek-dlya-inst-karuseli | ai_carousel_generation | Social media | format guide | P0 |
| owner_00450 | формат пост карусели в инст | format-post-karuseli-v-inst | ai_carousel_generation | Social media | format guide | P0 |
| owner_00451 | формат пост карусель для инста | format-post-karusel-dlya-insta | ai_carousel_generation | Instagram | format guide | P0 |
| owner_00452 | формат поста карусели | format-posta-karuseli | ai_carousel_generation | Social media | format guide | P0 |
| owner_00453 | формат для постов каруселей в инт | format-dlya-postov-karuseley-v-int | ai_carousel_generation | Social media | format guide | P0 |
| owner_00454 | формат постов в карусели | format-postov-v-karuseli | ai_carousel_generation | Social media | format guide | P0 |
| owner_00455 | формат публикаций в инсте в карусели | format-publikaciy-v-inste-v-karuseli | ai_carousel_generation | Social media | format guide | P0 |
| owner_00456 | формат размер картинок для карусели | format-razmer-kartinok-dlya-karuseli | ai_carousel_generation | Social media | format guide | P0 |
| owner_00457 | формат размер карусель пост | format-razmer-karusel-post | ai_carousel_generation | Social media | format guide | P0 |
| owner_00458 | формат слайдов карусели в инст | format-slaydov-karuseli-v-inst | ai_carousel_generation | Social media | format guide | P0 |
| owner_00459 | формат фото для каруселей | format-foto-dlya-karuseley | ai_carousel_generation | Social media | format guide | P0 |
| owner_00460 | формат фото для карусели | format-foto-dlya-karuseli | ai_carousel_generation | Social media | format guide | P0 |
| owner_00461 | формат фоток в карусели в инсте | format-fotok-v-karuseli-v-inste | ai_carousel_generation | Social media | format guide | P0 |
| owner_00462 | форматы для карусели | formaty-dlya-karuseli | ai_carousel_generation | Social media | format guide | P0 |
| owner_00463 | как фото подогнать под размер карусели в иг | kak-foto-podognat-pod-razmer-karuseli-v-ig | ai_carousel_generation | Social media | format guide | P0 |
| owner_00464 | фото пост карусель размер | foto-post-karusel-razmer | ai_carousel_generation | Social media | format guide | P0 |
| owner_00465 | фото для постов каруселей в инсте размер | foto-dlya-postov-karuseley-v-inste-razmer | ai_carousel_generation | Social media | format guide | P0 |
| owner_00466 | фоторамка карусель размер фотографий | fotoramka-karusel-razmer-fotografiy | ai_carousel_generation | Social media | format guide | P0 |
| owner_00467 | фрейм для поста карусели размер инста | freym-dlya-posta-karuseli-razmer-insta | ai_carousel_generation | Instagram | format guide | P0 |
| owner_00468 | какой формат видео для карусели | kakoy-format-video-dlya-karuseli | ai_carousel_generation | Social media | format guide | P0 |
| owner_00469 | соотношение сторон видео карусель | sootnoshenie-storon-video-karusel | ai_carousel_generation | Social media | format guide | P0 |
| owner_00470 | формат фото и видео для постов каруселей | format-foto-i-video-dlya-postov-karuseley | ai_carousel_generation | Social media | format guide | P0 |
| owner_00744 | бесшовная карусель в инсте как сделать фото | besshovnaya-karusel-v-inste-kak-sdelat-foto | ai_carousel_generation | Social media | how-to | P0 |
| owner_00747 | как выглядят посты карусели | kak-vyglyadyat-posty-karuseli | ai_carousel_generation | Social media | how-to | P0 |
| owner_00748 | как выложить бесшовно в карусель фото | kak-vylozhit-besshovno-v-karusel-foto | ai_carousel_generation | Social media | how-to | P0 |
| owner_00749 | как выложить в инст фото вертикальное и горизонтальное в одну карусель | kak-vylozhit-v-inst-foto-vertikalnoe-i-gorizontalnoe-v-odnu-karusel | ai_carousel_generation | Social media | how-to | P0 |
| owner_00750 | как выложить в инсту карусель и добавить тихо звук | kak-vylozhit-v-instu-karusel-i-dobavit-tiho-zvuk | ai_carousel_generation | Social media | how-to | P0 |
| owner_00751 | как выложить пост карусель в макс | kak-vylozhit-post-karusel-v-maks | ai_carousel_generation | Social media | how-to | P0 |
| owner_00752 | как делать бесшовную карусель бесплатно без приложения | kak-delat-besshovnuyu-karusel-besplatno-bez-prilozheniya | ai_carousel_generation | Social media | tool article | P0 |
| owner_00753 | как делать интересные шрифты на фото в карусель | kak-delat-interesnye-shrifty-na-foto-v-karusel | ai_carousel_generation | Social media | how-to | P0 |
| owner_00754 | как делать красивый шрифт в каруселях | kak-delat-krasivyy-shrift-v-karuselyah | ai_carousel_generation | Social media | how-to | P0 |
| owner_00755 | как делать пост карусель | kak-delat-post-karusel | ai_carousel_generation | Social media | how-to | P0 |
| owner_00756 | как делать прикольный шрифт на каруселе | kak-delat-prikolnyy-shrift-na-karusele | ai_carousel_generation | Social media | how-to | P0 |
| owner_00757 | дизайн карусели в инста как сделать | dizayn-karuseli-v-insta-kak-sdelat | ai_carousel_generation | Instagram | how-to | P0 |
| owner_00758 | как добавит фото в карусель | kak-dobavit-foto-v-karusel | ai_carousel_generation | Social media | how-to | P0 |
| owner_00759 | как добавить карусель в иг | kak-dobavit-karusel-v-ig | ai_carousel_generation | Social media | how-to | P0 |
| owner_00760 | как запостить карусель | kak-zapostit-karusel | ai_carousel_generation | Social media | how-to | P0 |
| owner_00761 | как запустить карусель в инсте | kak-zapustit-karusel-v-inste | ai_carousel_generation | Social media | how-to | P0 |
| owner_00762 | как зарабатывать на карусели | kak-zarabatyvat-na-karuseli | ai_carousel_generation | Social media | how-to | P0 |
| owner_00763 | как зарабатывать на мобильной карусели | kak-zarabatyvat-na-mobilnoy-karuseli | ai_carousel_generation | Social media | how-to | P0 |
| owner_00764 | как в инсте выкладывается карусель | kak-v-inste-vykladyvaetsya-karusel | ai_carousel_generation | Social media | how-to | P0 |
| owner_00765 | как в карусели в инсте сделать обложку | kak-v-karuseli-v-inste-sdelat-oblozhku | ai_carousel_generation | Social media | how-to | P0 |
| owner_00766 | как в карусели написать призыв к щариси клиента хук | kak-v-karuseli-napisat-prizyv-k-scharisi-klienta-huk | ai_carousel_generation | Social media | how-to | P0 |
| owner_00767 | карусель в соц сетях как сделать | karusel-v-soc-setyah-kak-sdelat | ai_carousel_generation | Social media | how-to | P0 |
| owner_00770 | как пишут на картинках листай карусель в постах | kak-pishut-na-kartinkah-listay-karusel-v-postah | ai_carousel_generation | Social media | how-to | P0 |
| owner_00772 | как постить пост карусель | kak-postit-post-karusel | ai_carousel_generation | Social media | how-to | P0 |
| owner_00773 | как продвигать посты карусели | kak-prodvigat-posty-karuseli | ai_carousel_generation | Social media | how-to | P0 |
| owner_00774 | как рисовать карусель канал быстро | kak-risovat-karusel-kanal-bystro | ai_carousel_generation | Social media | how-to | P0 |
| owner_00775 | как сделать в инсте бесшовную карусель | kak-sdelat-v-inste-besshovnuyu-karusel | ai_carousel_generation | Social media | how-to | P0 |
| owner_00776 | как сделать картинки для поста карусели | kak-sdelat-kartinki-dlya-posta-karuseli | ai_carousel_generation | Social media | how-to | P0 |
| owner_00777 | как сделать карусель или решение по данному скрину | kak-sdelat-karusel-ili-reshenie-po-dannomu-skrinu | ai_carousel_generation | Social media | how-to | P0 |
| owner_00778 | как сделать карусель из одного фото | kak-sdelat-karusel-iz-odnogo-foto | ai_carousel_generation | Social media | how-to | P0 |
| owner_00779 | как сделать карусельки а инсте | kak-sdelat-karuselki-a-inste | ai_carousel_generation | Social media | how-to | P0 |
| owner_00780 | как сделать посты карусели для бьюти блога | kak-sdelat-posty-karuseli-dlya-byuti-bloga | ai_carousel_generation | Social media | how-to | P0 |
| owner_00781 | как сделать слайды для карусели | kak-sdelat-slaydy-dlya-karuseli | ai_carousel_generation | Social media | how-to | P0 |
| owner_00782 | как смонтировать бесшовную карусель | kak-smontirovat-besshovnuyu-karusel | ai_carousel_generation | Social media | how-to | P0 |
| owner_00783 | как собрать готовые фото в карусели | kak-sobrat-gotovye-foto-v-karuseli | ai_carousel_generation | Social media | how-to | P0 |
| owner_00784 | как создавать бесплатно карусели для постов в блог | kak-sozdavat-besplatno-karuseli-dlya-postov-v-blog | ai_carousel_generation | Social media | how-to | P0 |
| owner_00785 | как создавать карусель в инст быстро | kak-sozdavat-karusel-v-inst-bystro | ai_carousel_generation | Social media | how-to | P0 |
| owner_00786 | как создавать карусель в инсте | kak-sozdavat-karusel-v-inste | ai_carousel_generation | Social media | how-to | P0 |
| owner_00787 | как создавать эстетичные карусели | kak-sozdavat-estetichnye-karuseli | ai_carousel_generation | Social media | how-to | P0 |
| owner_00788 | как создать каруселей для соц сетей | kak-sozdat-karuseley-dlya-soc-setey | ai_carousel_generation | Social media | how-to | P0 |
| owner_00791 | туториал как сделать пост карусель где текст идет потвсем фото | tutorial-kak-sdelat-post-karusel-gde-tekst-idet-potvsem-foto | ai_carousel_generation | Social media | how-to | P0 |
| owner_00792 | как через комп загрузить карусель через проф панель в инсте | kak-cherez-komp-zagruzit-karusel-cherez-prof-panel-v-inste | ai_carousel_generation | Social media | how-to | P0 |
| owner_00793 | как экспортировать карусель из cloud | kak-eksportirovat-karusel-iz-cloud | ai_carousel_generation | Social media | how-to | P0 |
| owner_00794 | ясно как сделать текст в карусели | yasno-kak-sdelat-tekst-v-karuseli | ai_carousel_generation | Social media | how-to | P0 |
| owner_00795 | как добавить видео в пост карусель | kak-dobavit-video-v-post-karusel | ai_carousel_generation | Social media | how-to | P0 |
| owner_00796 | как в карусель вставить видео прям на слайд | kak-v-karusel-vstavit-video-pryam-na-slayd | ai_carousel_generation | Social media | how-to | P0 |
| owner_00797 | как разрезать видео для бесшовной карусели | kak-razrezat-video-dlya-besshovnoy-karuseli | ai_carousel_generation | Social media | how-to | P0 |
| owner_00798 | что избавляет от эффекта карусели в психологии восприятия греется ставрополь | chto-izbavlyaet-ot-effekta-karuseli-v-psihologii-vospriyatiya-greetsya-stavropol | ai_carousel_generation | Social media | guide | P0 |
| owner_00799 | экспертный пост карусель | ekspertnyy-post-karusel | ai_carousel_generation | Social media | guide | P0 |
| owner_00800 | генерация каруселей с текстом на русском языке без ошибок | generaciya-karuseley-s-tekstom-na-russkom-yazyke-bez-oshibok | ai_carousel_generation | Social media | problem-solver | P1 |

## Cluster distribution

| Cluster | Count |
| --- | ---: |
| unknown_review | 1700 |
| image_generation | 1316 |
| ai_carousel_generation | 501 |
| instagram_posts | 500 |
| ai_post_generation | 425 |
| instagram_carousels | 270 |
| vk_posts | 158 |
| problem_solver | 156 |
| canva_figma_workflow | 6 |
| visual_design | 6 |
| templates | 5 |
| linkedin_b2b | 4 |
| content_plan | 3 |
| niche_use_cases | 3 |
| product_route | 1 |

## Platform distribution

| Platform | Count |
| --- | ---: |
| Social media | 2738 |
| Instagram | 2083 |
| VK | 160 |
| LinkedIn | 21 |
| Telegram | 19 |
| Website | 18 |
| Marketplace | 6 |
| Facebook | 3 |
| YouTube | 3 |
| Pinterest | 2 |
| Threads | 1 |

## Article type distribution

| ArticleType | Count |
| --- | ---: |
| guide | 2074 |
| tool article | 1373 |
| how-to | 621 |
| format guide | 549 |
| glossary | 168 |
| workflow article | 126 |
| problem-solver | 69 |
| comparison | 36 |
| examples article | 33 |
| template page | 5 |

## Language distribution

| Language | Count |
| --- | ---: |
| ru | 4732 |
| en | 322 |

## Examples of raw query variants grouped into one article owner

| Group | Owner | Queries | Reason |
| --- | --- | --- | --- |
| dup_00001 | owner_00719 | шрифт карусель \| шрифт карусель 2019 | Same or near-same slug family. 00E preserves human-reviewable owners where user outcome may differ, but flags the group to prevent accidental cannibalization. |
| dup_00002 | owner_00931 | написать пост \| написать пост 18 | Same or near-same slug family. 00E preserves human-reviewable owners where user outcome may differ, but flags the group to prevent accidental cannibalization. |
| dup_00003 | owner_03438 | продвижение инстаграм \| продвижение инстаграм 2026 | Same or near-same slug family. 00E preserves human-reviewable owners where user outcome may differ, but flags the group to prevent accidental cannibalization. |
| dup_00004 | owner_03968 | трендовый шрифт \| трендовый шрифт 2026 | Same or near-same slug family. 00E preserves human-reviewable owners where user outcome may differ, but flags the group to prevent accidental cannibalization. |

## Examples of similar topics kept separate because user outcome differs

| ID | Keyword | Platform | Outcome |
| --- | --- | --- | --- |
| owner_00018 | format post ig | Instagram | Decide whether this should become an article, section, FAQ, product route task or later backlog item. |
| owner_00019 | ig post format | Instagram | Decide whether this should become an article, section, FAQ, product route task or later backlog item. |
| owner_00020 | ig post ratio | Instagram | Decide whether this should become an article, section, FAQ, product route task or later backlog item. |
| owner_00021 | ig post sizing | Instagram | Decide whether this should become an article, section, FAQ, product route task or later backlog item. |
| owner_00022 | post ig ratio | Instagram | Decide whether this should become an article, section, FAQ, product route task or later backlog item. |
| owner_00024 | ratio for ig post | Instagram | Decide whether this should become an article, section, FAQ, product route task or later backlog item. |
| owner_00027 | ig canvas size | Instagram | Know what must be checked for current platform dimensions before production. |
| owner_00028 | instagram canvas size | Instagram | Know what must be checked for current platform dimensions before production. |
| owner_00029 | instagram canvas sizes | Instagram | Know what must be checked for current platform dimensions before production. |
| owner_00030 | instagram canvas specs | Instagram | Decide whether this should become an article, section, FAQ, product route task or later backlog item. |

## Notes

- prompt2Eligible is yes only for APPROVE rows.
- APPROVE_LATER and NEEDS_REVIEW rows are deliberately retained for human approval, not production.
- No markdown articles, content packages, article briefs, source files, build outputs, sitemap, llms, or production code were changed.

ready for human approval of full article owner backlog
