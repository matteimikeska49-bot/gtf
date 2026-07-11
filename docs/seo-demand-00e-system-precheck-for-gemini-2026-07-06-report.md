# SEO Demand 00E — System Precheck For Gemini Prompt 1

summary:
  total00ERowsAudited: 5054
  sentToGeminiPrompt1: 11
  sentToGeminiPrompt1WithRisk: 3172
  mergeToExistingCandidates: 248
  mergeTo00EOwnerCandidates: 1439
  sectionFaqOnlyCandidates: 184
  holdOrRejectCandidates: 0
  existingArticleConflicts: 251
  internalDuplicateGroups: 123
  targetGeminiPrompt1InputMinimum: 500
  targetReached: yes
  gapIfAny: 0
  reasonIfGap: No gap. The first Gemini Prompt 1 input shortlist contains enough system-prechecked rows.

## Purpose

This is a zero-stage system precheck package for Gemini Prompt 1. It does not make final semantic approval and does not create Prompt 2 candidates. Gemini Prompt 1 must still decide which topics are semantically valid article owners, which should merge, and which should be rejected or held.

## Method

The precheck compared all 00E article owners against existing markdown article slugs/frontmatter, intent-map owner slugs and forbidden near-duplicates, 00C validation/owner signals, 00D roadmap IDs, and internal 00E duplicate families. Rows were flagged, not silently removed. Exact same-intent and same-slug variants are mechanical merge candidates; same-user-outcome and secondary-keyword variants are sent to Gemini Prompt 1 with risk instead of being mechanically collapsed.

## Top 100 Gemini Prompt 1 input rows

| ID | Keyword | Slug | Platform | Type | Status | Reason |
| --- | --- | --- | --- | --- | --- | --- |
| owner_00324 | в каком приложении лучше делать посты карусели | v-kakom-prilozhenii-luchshe-delat-posty-karuseli | Social media | comparison | SEND_TO_GEMINI_PROMPT1 | clean system precheck: no strong existing-article or internal duplicate evidence detected |
| owner_00447 | формат карусель с инфографикой это примеры | format-karusel-s-infografikoy-eto-primery | Social media | examples article | SEND_TO_GEMINI_PROMPT1 | clean system precheck: no strong existing-article or internal duplicate evidence detected |
| owner_00433 | формат карусели | format-karuseli | Social media | format guide | SEND_TO_GEMINI_PROMPT1 | clean system precheck: no strong existing-article or internal duplicate evidence detected |
| owner_00798 | что избавляет от эффекта карусели в психологии восприятия греется ставрополь | chto-izbavlyaet-ot-effekta-karuseli-v-psihologii-vospriyatiya-greetsya-stavropol | Social media | guide | SEND_TO_GEMINI_PROMPT1 | clean system precheck: no strong existing-article or internal duplicate evidence detected |
| owner_00812 | создать карусель для продвижения рекламы онлайн бесплатно | sozdat-karusel-dlya-prodvizheniya-reklamy-onlayn-besplatno | Social media | workflow article | SEND_TO_GEMINI_PROMPT1 | clean system precheck: no strong existing-article or internal duplicate evidence detected |
| owner_00411 | тредс размеры карусели | treds-razmery-karuseli | Threads | format guide | SEND_TO_GEMINI_PROMPT1 | clean system precheck: no strong existing-article or internal duplicate evidence detected |
| owner_00026 | social media posting examples | social-media-posting-examples | Social media | examples article | SEND_TO_GEMINI_PROMPT1 | clean system precheck: no strong existing-article or internal duplicate evidence detected |
| owner_00011 | ins post size | ins-post-size | Social media | format guide | SEND_TO_GEMINI_PROMPT1 | clean system precheck: no strong existing-article or internal duplicate evidence detected |
| owner_01204 | экспертные посты | ekspertnye-posty | Social media | guide | SEND_TO_GEMINI_PROMPT1 | clean system precheck: no strong existing-article or internal duplicate evidence detected |
| owner_01206 | напиши аналитический пост для telegram следуй структуре точно структура — каждый блок на отдельной строке 📌 b заголовок b -2 предложения-лид что произошло и почему это важно именно сейчас 🟡 название секции 2-4 слова — суть факта 3-5 предложен | napishi-analiticheskiy-post-dlya-telegram-sleduy-strukture-tochno-struktura-kazhdyy-blok-n | Telegram | problem-solver | SEND_TO_GEMINI_PROMPT1 | clean system precheck: no strong existing-article or internal duplicate evidence detected |
| owner_03474 | шаблоны для постов и каруселей | shablony-dlya-postov-i-karuseley | Social media | template page | SEND_TO_GEMINI_PROMPT1 | clean system precheck: no strong existing-article or internal duplicate evidence detected |
| owner_00330 | инста карусель формат фото | insta-karusel-format-foto | Instagram | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00359, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00337 | какой инстаразмер для карусели | kakoy-instarazmer-dlya-karuseli | Instagram | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00359, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00359 | карусель инста размер | karusel-insta-razmer | Instagram | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | secondary_keyword_variant: similar to owner_00327, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00360 | карусель инста формат | karusel-insta-format | Instagram | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00359, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00389 | размер поста в инста карусель | razmer-posta-v-insta-karusel | Instagram | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00359, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00396 | размеры каруселей инста | razmery-karuseley-insta | Instagram | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00359, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00413 | формат 3 4 карусель инста | format-3-4-karusel-insta | Instagram | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00359, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00436 | формат карусели в инста | format-karuseli-v-insta | Instagram | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00359, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00451 | формат пост карусель для инста | format-post-karusel-dlya-insta | Instagram | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00359, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00467 | фрейм для поста карусели размер инста | freym-dlya-posta-karuseli-razmer-insta | Instagram | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00359, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00757 | дизайн карусели в инста как сделать | dizayn-karuseli-v-insta-kak-sdelat | Instagram | how-to | SEND_TO_GEMINI_PROMPT1_WITH_RISK | secondary_keyword_variant: similar to owner_00744, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00325 | лучшее приложение для текстовых каруселей | luchshee-prilozhenie-dlya-tekstovyh-karuseley | Social media | comparison | SEND_TO_GEMINI_PROMPT1_WITH_RISK | secondary_keyword_variant: similar to owner_00324, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00326 | что лучше работает для эксперта посты карусели или видео | chto-luchshe-rabotaet-dlya-eksperta-posty-karuseli-ili-video | Social media | comparison | SEND_TO_GEMINI_PROMPT1_WITH_RISK | secondary_keyword_variant: similar to owner_00324, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00334 | какие фото лучше делать для карусели напиши их размеры например 16 9 | kakie-foto-luchshe-delat-dlya-karuseli-napishi-ih-razmery-naprimer-16-9 | Social media | comparison | SEND_TO_GEMINI_PROMPT1_WITH_RISK | secondary_keyword_variant: similar to owner_00327, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00804 | аи для создания поста карусели примеры инструкция | ai-dlya-sozdaniya-posta-karuseli-primery-instrukciya | Social media | examples article | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00807, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00805 | карусель в инсте примеры | karusel-v-inste-primery | Social media | examples article | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00807, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00806 | карусель пост с информацией пример | karusel-post-s-informaciey-primer | Social media | examples article | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00807, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00807 | пост карусель примеры | post-karusel-primery | Social media | examples article | SEND_TO_GEMINI_PROMPT1_WITH_RISK | secondary_keyword_variant: similar to owner_00804, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00809 | примеры дизайна поста карусели в инсте | primery-dizayna-posta-karuseli-v-inste | Social media | examples article | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00807, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00810 | примеры каруселей в инст | primery-karuseley-v-inst | Social media | examples article | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00807, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00811 | примеры крутых каруселей в инсте | primery-krutyh-karuseley-v-inste | Social media | examples article | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00807, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00327 | как выкладывать в одну карусель фото разных форматов | kak-vykladyvat-v-odnu-karusel-foto-raznyh-formatov | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00328 | добавить в карусель инсты разные размеры | dobavit-v-karusel-insty-raznye-razmery | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00329 | как загрузить карусели в инсту чтобы был формат 9 16 | kak-zagruzit-karuseli-v-instu-chtoby-byl-format-9-16 | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00331 | как в инсте в карусели сделать фото разного размера | kak-v-inste-v-karuseli-sdelat-foto-raznogo-razmera | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00332 | в инсте размер поста карусели | v-inste-razmer-posta-karuseli | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00333 | какие размеры у карусели инсты | kakie-razmery-u-karuseli-insty | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00335 | какого формата карусель в инсте | kakogo-formata-karusel-v-inste | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00336 | какое соотношение сторон выбрать для карусели в инст | kakoe-sootnoshenie-storon-vybrat-dlya-karuseli-v-inst | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00338 | какой размер используется для поста карусели | kakoy-razmer-ispolzuetsya-dlya-posta-karuseli | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00339 | какой размер карусели в инсте 4 5 | kakoy-razmer-karuseli-v-inste-4-5 | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00340 | какой размер слайдо для поста карусели в инсте | kakoy-razmer-slaydo-dlya-posta-karuseli-v-inste | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00341 | какой размер у карусели в инсте | kakoy-razmer-u-karuseli-v-inste | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00342 | какой сейчас размер фото для поста карусели | kakoy-seychas-razmer-foto-dlya-posta-karuseli | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00343 | какой формат должен быть у фоток на карусель в инсте | kakoy-format-dolzhen-byt-u-fotok-na-karusel-v-inste | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00344 | какой формат изображения в карусели инсты | kakoy-format-izobrazheniya-v-karuseli-insty | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00345 | какой формат картинок в карусели в инстограмме | kakoy-format-kartinok-v-karuseli-v-instogramme | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00346 | какой формат каруселей в инст | kakoy-format-karuseley-v-inst | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00347 | какой формат карусели в инсте | kakoy-format-karuseli-v-inste | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00348 | какой формат для поста карусели использовать на камере айфон 14 | kakoy-format-dlya-posta-karuseli-ispolzovat-na-kamere-ayfon-14 | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00349 | какой формат в посте карусели | kakoy-format-v-poste-karuseli | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00350 | какой формат у карусели в инсте | kakoy-format-u-karuseli-v-inste | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00351 | какой формат фото в инсте в карусели | kakoy-format-foto-v-inste-v-karuseli | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00352 | в каком размере выложить фото в инст в карусель чтобы оно не обрезалось | v-kakom-razmere-vylozhit-foto-v-inst-v-karusel-chtoby-ono-ne-obrezalos | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00353 | в каком размере нужно делать фото в каруселях инст | v-kakom-razmere-nuzhno-delat-foto-v-karuselyah-inst | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00354 | карусели в инст размер | karuseli-v-inst-razmer | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00355 | для карусели какой формат | dlya-karuseli-kakoy-format | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00356 | для карусели поста какой нужен размер | dlya-karuseli-posta-kakoy-nuzhen-razmer | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00357 | карусель 3 4 формат | karusel-3-4-format | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00358 | карусель инст формат | karusel-inst-format | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00361 | карусель в инсте какой формат | karusel-v-inste-kakoy-format | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00362 | карусель в инсте размер | karusel-v-inste-razmer | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00363 | карусель инсты формат | karusel-insty-format | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00364 | карусель может ли быть разных размеров | karusel-mozhet-li-byt-raznyh-razmerov | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00365 | карусель как формат контента определение | karusel-kak-format-kontenta-opredelenie | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00366 | переформировать размер под пост карусель | pereformirovat-razmer-pod-post-karusel | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00367 | пост карусель в иг какой формат фото | post-karusel-v-ig-kakoy-format-foto | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00368 | пост карусель размер в инсте | post-karusel-razmer-v-inste | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00370 | пост карусель соотношение сторон | post-karusel-sootnoshenie-storon | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00371 | пост карусель формат | post-karusel-format | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00372 | посты для карусели размер | posty-dlya-karuseli-razmer | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00373 | посты карусель каких размеров в инсианрам | posty-karusel-kakih-razmerov-v-insianram | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00374 | что такое продажи в формате карусель | chto-takoe-prodazhi-v-formate-karusel | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00375 | прст карусель формат | prst-karusel-format | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00376 | размер бесшовного поста карусели пост один 1080х1080 | razmer-besshovnogo-posta-karuseli-post-odin-1080h1080 | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00377 | размер вертикального макета для карусели в соц сетях | razmer-vertikalnogo-maketa-dlya-karuseli-v-soc-setyah | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00378 | размер изображения для карусели | razmer-izobrazheniya-dlya-karuseli | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00379 | размер кадра а карусели в инст | razmer-kadra-a-karuseli-v-inst | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00380 | размер картинки для карусели | razmer-kartinki-dlya-karuseli | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00381 | размер картинки для поста в иг карусель | razmer-kartinki-dlya-posta-v-ig-karusel | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00382 | размер для карусели инст | razmer-dlya-karuseli-inst | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00383 | размер карусели в инсте | razmer-karuseli-v-inste | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00384 | размер карусели для инсты | razmer-karuseli-dlya-insty | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00385 | размер карусели когда смотришь в ленте | razmer-karuseli-kogda-smotrish-v-lente | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00386 | размер для карусель в инсте | razmer-dlya-karusel-v-inste | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00388 | размер пост каруселя в интсе | razmer-post-karuselya-v-intse | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00390 | размер поста карусели | razmer-posta-karuseli | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00391 | размер для поста карусель | razmer-dlya-posta-karusel | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00392 | размер слайда карусели в инсте | razmer-slayda-karuseli-v-inste | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00393 | размер слайдов для карусели инст | razmer-slaydov-dlya-karuseli-inst | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00394 | размер фото для карусели | razmer-foto-dlya-karuseli | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00395 | размер фото постов карусели | razmer-foto-postov-karuseli | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00397 | размеры для карусели в инсте | razmery-dlya-karuseli-v-inste | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00398 | размеры поста карусели | razmery-posta-karuseli | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00399 | как размеры фото для каруселей | kak-razmery-foto-dlya-karuseley | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00400 | для роста а карусели какой формат кадра должен быть | dlya-rosta-a-karuseli-kakoy-format-kadra-dolzhen-byt | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00401 | сгенерировать размер слайда под пост карусель | sgenerirovat-razmer-slayda-pod-post-karusel | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00402 | как сделать публикацию карусель в формате рассказа о кейсе ювелирного украшения | kak-sdelat-publikaciyu-karusel-v-formate-rasskaza-o-keyse-yuvelirnogo-ukrasheniya | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00403 | сделать размеры под карусель какие параметры | sdelat-razmery-pod-karusel-kakie-parametry | Social media | format guide | SEND_TO_GEMINI_PROMPT1_WITH_RISK | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |

## Biggest internal duplicate groups

| Owner | Count |
| --- | ---: |
| owner_01229 | 1271 |
| owner_02892 | 355 |
| owner_01162 | 327 |
| owner_04577 | 274 |
| owner_00550 | 215 |
| owner_04900 | 153 |
| owner_02686 | 131 |
| owner_00433 | 130 |
| owner_03553 | 128 |
| owner_02542 | 101 |
| owner_03896 | 96 |
| owner_03308 | 85 |
| owner_00205 | 58 |
| owner_00039 | 55 |
| owner_00760 | 49 |
| owner_03395 | 46 |
| owner_03437 | 45 |
| owner_04818 | 40 |
| owner_04507 | 35 |
| owner_03210 | 30 |

## Examples conflicting with existing articles

| ID | Keyword | Conflict | Existing | Status |
| --- | --- | --- | --- | --- |
| owner_00005 | carousel hook | likely_merge_to_existing_article | src/content/blog/articles/instagram-carousel-hooks.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_00007 | case study carousel | likely_merge_to_existing_article | src/content/blog/articles/b2b-case-study-linkedin-carousel.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_00009 | pdf carousel | likely_merge_to_existing_article | src/content/blog/articles/linkedin-pdf-carousel.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_00010 | text to carousel | likely_merge_to_existing_article | src/content/blog/articles/text-to-carousel-ai.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_00118 | instagram guide size | likely_merge_to_existing_article | src/content/blog/articles/instagram-post-size-guide.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_00157 | instagram size guide | likely_merge_to_existing_article | src/content/blog/articles/instagram-post-size-guide.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_00248 | גודל פוסט אינסטגרם | likely_merge_to_existing_article | src/content/blog/articles/how-to-brainstorm-carousel-topics-with-ai.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_00260 | instagram | likely_merge_to_existing_article | src/content/blog/articles/ai-instagram-carousel-generator.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_00312 | 홍성택 성형외과 linkedin | likely_merge_to_existing_article | src/content/blog/articles/ai-linkedin-carousel-strategy-for-b2b-founders.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_00322 | linkedin hooks | likely_merge_to_existing_article | src/content/blog/articles/linkedin-carousel-hooks.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_00472 | canva для каруселей | likely_merge_to_existing_article | src/content/blog/articles/ii-dlya-karuseley.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_00480 | аи для создания каруселей | likely_merge_to_existing_article | src/content/blog/articles/ii-dlya-karuseley.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_00484 | бесшовная карусель | likely_merge_to_existing_article | src/content/blog/articles/besshovnaya-karusel-v-instagram.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_00513 | ии для каруселей в инсте | likely_merge_to_existing_article | src/content/blog/articles/ii-dlya-karuseley.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_00522 | ии для оформления каруселей | likely_merge_to_existing_article | src/content/blog/articles/ii-dlya-karuseley.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_00526 | ии для создания каруселей | likely_merge_to_existing_article | src/content/blog/articles/ii-dlya-karuseley.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_00533 | что использовать для постов каруселей | near_slug_conflict | src/content/blog/articles/kak-ispolzovat-midjourney-dlya-postov.md | SEND_TO_GEMINI_PROMPT1_WITH_RISK |
| owner_00601 | пост карусель | likely_merge_to_existing_article | src/content/blog/articles/kakoy-ii-sozdast-post-karusel.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_00677 | текст в карусель | likely_merge_to_existing_article | src/content/blog/articles/tekst-v-karusel-neyroset.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_00680 | типографика для каруселей | likely_merge_to_existing_article | src/content/blog/articles/ii-dlya-karuseley.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_00716 | шрифт для каруселей | likely_merge_to_existing_article | src/content/blog/articles/ii-dlya-karuseley.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_00721 | шрифты для каруселей инста | likely_merge_to_existing_article | src/content/blog/articles/trendovye-shrifty-dlya-karuseley.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_00723 | шрифты для карусель | likely_merge_to_existing_article | src/content/blog/articles/trendovye-shrifty-dlya-karuseley.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_00724 | шрифты для постов каруселей | likely_merge_to_existing_article | src/content/blog/articles/trendovye-shrifty-dlya-karuseley.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_00725 | шрифты у каруселей | same_primary_intent_as_existing_article | src/content/blog/articles/trendovye-shrifty-dlya-karuseley.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_00730 | карусель из видео | likely_merge_to_existing_article | src/content/blog/articles/kak-sdelat-karusel-iz-video-s-ii.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_00842 | алиса напиши текст для поста | likely_merge_to_existing_article | src/content/blog/articles/ii-tekst-dlya-posta.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_00851 | генерация пост | likely_merge_to_existing_article | src/content/blog/articles/generaciya-postov-karuseley.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_00853 | генерация постов | likely_merge_to_existing_article | src/content/blog/articles/generaciya-postov-karuseley.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_00879 | ии для написания постов | likely_merge_to_existing_article | src/content/blog/articles/neyroset-dlya-napisaniya-postov-obzor.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_00881 | ии написать текст для поста | likely_merge_to_existing_article | src/content/blog/articles/ii-tekst-dlya-posta.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_00884 | ии пост для соцсетей | same_primary_intent_as_existing_article | src/content/blog/articles/ii-post-dlya-socsetej.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_00890 | ии текст для поста klerk ru blogs umnik 693329 | likely_merge_to_existing_article | src/content/blog/articles/ii-tekst-dlya-posta.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_00931 | написать пост | likely_merge_to_existing_article | src/content/blog/articles/kak-napisat-post-v-vk-s-pomoshyu-ii.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_01056 | написать текст для поста | likely_merge_to_existing_article | src/content/blog/articles/ii-tekst-dlya-posta.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_01104 | помоги написать текст для поста | likely_merge_to_existing_article | src/content/blog/articles/ii-tekst-dlya-posta.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_01183 | как написать креативный пост | likely_merge_to_existing_article | src/content/blog/articles/kak-napisat-ekspertnyj-post.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_02645 | instagram карусель | likely_merge_to_existing_article | src/content/blog/articles/algoritm-instagram-karuseli.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_02646 | reels или карусель | likely_merge_to_existing_article | src/content/blog/articles/reels-ili-karuseli-chto-vybrat.md | MERGE_TO_EXISTING_CANDIDATE |
| owner_02653 | бот для карусели инстаграм | likely_merge_to_existing_article | src/content/blog/articles/huki-dlya-karuseli-instagram.md | MERGE_TO_EXISTING_CANDIDATE |

## Examples kept despite similar wording

| ID | Keyword | Existing | Reason |
| --- | --- | --- | --- |
| owner_00002 | automatically create carousels | owner_00001 | same_user_outcome: similar to owner_00001, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00003 | blog to carousel | owner_00001 | same_user_outcome: similar to owner_00001, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00004 | carousel creator | owner_00001 | same_user_outcome: similar to owner_00001, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00006 | carousel post time zone kids audience | owner_00001 | same_user_outcome: similar to owner_00001, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00008 | ia carousels | owner_00001 | same_user_outcome: similar to owner_00001, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00015 | business posts | owner_00014 | same_user_outcome: similar to owner_00014, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00021 | ig post sizing | owner_00020 | same_user_outcome: similar to owner_00020, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00022 | post ig ratio | owner_00020 | same_user_outcome: similar to owner_00020, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00023 | post sizing | owner_00014 | same_user_outcome: similar to owner_00014, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00024 | ratio for ig post | owner_00020 | same_user_outcome: similar to owner_00020, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00025 | usepostify | owner_00014 | same_user_outcome: similar to owner_00014, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00028 | instagram canvas size | owner_00027 | same_user_outcome: similar to owner_00027, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00029 | instagram canvas sizes | owner_00027 | same_user_outcome: similar to owner_00027, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00030 | instagram canvas specs | owner_00027 | same_user_outcome: similar to owner_00027, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00199 | ai content generation tools for webflow seo | owner_00200 | same_user_outcome: similar to owner_00200, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00201 | ai midjourney pikabu ru story neyroset_midjourney_kak_sozdavat_izobrazheniya_kotoryie_vyiglyadyat_kak_rabotyi_professionalnyikh_khudozhnikov_1 | owner_00200 | same_user_outcome: similar to owner_00200, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00202 | contentgenerator | owner_00200 | same_user_outcome: similar to owner_00200, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00203 | social-ai nl domain | owner_00200 | same_user_outcome: similar to owner_00200, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00204 | insta generator | owner_00200 | same_user_outcome: similar to owner_00200, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00207 | ajnj rfhectkm bb | owner_00240 | same_user_outcome: similar to owner_00240, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00212 | chipflow io @ email or contact | owner_00240 | same_user_outcome: similar to owner_00240, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00219 | flutterflow io changelog release notes 2026 | owner_00240 | same_user_outcome: similar to owner_00240, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00221 | ghbkj tybt ult vj yj cjplfdfnm rhfcbde rfhectkm d bycnfuhfv | owner_00240 | same_user_outcome: similar to owner_00240, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00241 | rfr cltkfnm rfhectkm gj bvtyfv | owner_00240 | same_user_outcome: similar to owner_00240, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00243 | rfrjt kexitt ghbkj tybt lkz rfhectktq | owner_00240 | same_user_outcome: similar to owner_00240, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00249 | xthtp rfjt ghbkj tybt ltkfnm rfhectkb lkz gjcnjd d cjw ctnb | owner_00240 | same_user_outcome: similar to owner_00240, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00250 | ytwqhjyrf lkz cjplfybz rfhectktq d bycnfuhfv | owner_00240 | same_user_outcome: similar to owner_00240, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00327 | как выкладывать в одну карусель фото разных форматов | owner_00433 | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00328 | добавить в карусель инсты разные размеры | owner_00433 | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00329 | как загрузить карусели в инсту чтобы был формат 9 16 | owner_00433 | same_user_outcome: similar to owner_00433, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |

## Examples of long-tail rows preserved

| ID | Keyword | Platform | Type | Reason |
| --- | --- | --- | --- | --- |
| owner_00002 | automatically create carousels | Social media | guide | same_user_outcome: similar to owner_00001, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00003 | blog to carousel | Social media | guide | same_user_outcome: similar to owner_00001, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00004 | carousel creator | Social media | guide | same_user_outcome: similar to owner_00001, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00006 | carousel post time zone kids audience | Social media | guide | same_user_outcome: similar to owner_00001, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00008 | ia carousels | Social media | guide | same_user_outcome: similar to owner_00001, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00015 | business posts | Social media | guide | same_user_outcome: similar to owner_00014, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00016 | catchy facebook posts for businesses | Facebook | guide | secondary_keyword_variant: similar to owner_00014, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00017 | facebook post topics | Facebook | guide | secondary_keyword_variant: similar to owner_00014, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00018 | format post ig | Instagram | format guide | secondary_keyword_variant: similar to owner_00014, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00019 | ig post format | Instagram | format guide | secondary_keyword_variant: similar to owner_00014, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00020 | ig post ratio | Instagram | guide | secondary_keyword_variant: similar to owner_00014, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00021 | ig post sizing | Instagram | guide | same_user_outcome: similar to owner_00020, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00022 | post ig ratio | Instagram | guide | same_user_outcome: similar to owner_00020, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00023 | post sizing | Social media | guide | same_user_outcome: similar to owner_00014, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00024 | ratio for ig post | Instagram | guide | same_user_outcome: similar to owner_00020, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00025 | usepostify | Social media | guide | same_user_outcome: similar to owner_00014, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00033 | instagram post format | Instagram | format guide | NEEDS_REVIEW/P2; human/freshness/conflict risk should be reviewed by Gemini Prompt 1 |
| owner_00037 | best resolution for instagram | Instagram | comparison | NEEDS_REVIEW/P3; human/freshness/conflict risk should be reviewed by Gemini Prompt 1 |
| owner_00039 | aspect ratio for ig | Instagram | format guide | NEEDS_REVIEW/P3; human/freshness/conflict risk should be reviewed by Gemini Prompt 1 |
| owner_00040 | ig aspect ratio | Instagram | format guide | secondary_keyword_variant: similar to owner_00039, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00041 | ig aspect ratios | Instagram | format guide | secondary_keyword_variant: similar to owner_00039, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00042 | ig avatar size | Instagram | format guide | secondary_keyword_variant: similar to owner_00039, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00043 | ig feed size | Instagram | format guide | secondary_keyword_variant: similar to owner_00039, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00044 | ig frame size | Instagram | format guide | secondary_keyword_variant: similar to owner_00039, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00045 | ig grid dimensions | Instagram | format guide | secondary_keyword_variant: similar to owner_00039, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00046 | ig grid size | Instagram | format guide | secondary_keyword_variant: similar to owner_00039, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00047 | ig horizontal size | Instagram | format guide | secondary_keyword_variant: similar to owner_00039, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00048 | ig photo size | Instagram | format guide | secondary_keyword_variant: similar to owner_00039, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00049 | ig pic size | Instagram | format guide | secondary_keyword_variant: similar to owner_00039, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |
| owner_00050 | ig pixel size | Instagram | format guide | secondary_keyword_variant: similar to owner_00039, but this is a risk flag for Gemini Prompt 1 rather than a mechanical merge. |

## Status distribution

| Status | Count |
| --- | ---: |
| SEND_TO_GEMINI_PROMPT1_WITH_RISK | 3172 |
| MERGE_TO_00E_OWNER_CANDIDATE | 1439 |
| MERGE_TO_EXISTING_CANDIDATE | 248 |
| SECTION_FAQ_ONLY_CANDIDATE | 184 |
| SEND_TO_GEMINI_PROMPT1 | 11 |

## Reminder

Gemini Prompt 1 must do final semantic topic approval. This file only prepares system-level evidence: existing conflicts, internal duplicate flags, section/FAQ candidates, and risk-marked rows.

ready for Gemini Prompt 1 topic approval
