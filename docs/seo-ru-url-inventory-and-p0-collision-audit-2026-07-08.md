# RU URL Inventory and P0 Collision Audit

## Executive summary

- Total RU routes found: 132
- Total blog routes: 87
- Total hard-coded/product/tool/scenario routes: 25
- Total SEO registry routes: 10
- P0 pages checked: 8
- Route collisions found: 1
- Intent cannibalization risks found: 8
- Pages safe to keep as new registry pages: 2
- Pages that should update existing routes instead: 6
- Pages that must not be deployed until resolved: 1

The critical exact route collision is `/ru/ii-generator-karuseley`. It is now a P0 noindex registry page in the current worktree, but the same URL is documented and configured as an existing RU product/tool route: it appears in `App.jsx`, legacy schema config, FAQ schema config, historical product-page canonical logic, prior route audit docs, and many blog CTAs. This should be resolved before any further SEO page creation.

## Full RU route inventory summary

The full route inventory is in:

- `scratch/seo-demand-imports/2026-07-06/seo-ru-url-inventory-2026-07-08.csv`

Key groups found:

- App/RU hard-coded routes include product/tool pages, legal pages, blog hubs, dynamic blog patterns, and new SEO registry route patterns.
- RU blog article routes are generated from `src/content/blog/articles/*.md` through `/ru/blog/:slug`.
- SEO registry pages and hubs are generated from `src/content/seoPages/index.js`.
- Prerender includes static RU product/legal/blog hub routes and dynamic published/indexable markdown article routes.
- Sitemap status was read from `dist/sitemap.xml` plus registry sitemap helper behavior.

## P0 route collision audit

| path | pageType | primaryKeyword | conflictsWithExistingRoute | shouldUpdateExisting | shouldBeRemovedFromRegistryRouting | recommendation |
| --- | --- | --- | --- | --- | --- | --- |
| /ru/generator-karuseley | commercial | генератор каруселей | no | yes | no | manual_review_or_update_existing_product_route |
| /ru/ii-generator-karuseley | commercial | ИИ генератор каруселей | yes | yes | yes | should_update_existing_or_merge; must_not_deploy_until_resolved |
| /ru/generator-postov-dlya-socsetey | commercial | генератор постов для соцсетей | no | yes | no | manual_review_or_update_existing_product_route |
| /ru/instagram-carousel-generator | tool | генератор каруселей для Instagram | no | yes | no | manual_review_or_update_existing_product_route |
| /ru/instagram-post-generator | tool | генератор постов для Instagram | no | yes | no | manual_review_or_update_existing_product_route |
| /ru/vk-post-generator | tool | генератор постов для ВК | no | no | no | safe_new_registry_candidate_but_keep_noindex |
| /ru/telegram-post-generator | tool | генератор постов для Telegram | no | no | no | safe_new_registry_candidate_but_keep_noindex |
| /ru/linkedin-carousel-generator | tool | генератор каруселей для LinkedIn | no | yes | no | manual_review_or_update_existing_product_route |

## P0 intent cannibalization audit

- /ru/generator-karuseley: /ru/blog/tekst-v-karusel-neyroset [curated overlap; Как сделать карусель из текста с помощью нейросети] | /ru/blog/karusel-dlya-instagram [curated overlap; Карусель для Инстаграм: Полный гайд по созданию вовлекающих постов] | /ru/generator-karuselej-instagram [curated overlap; General RU site route] | /ru/ai-generator-karuselej [product/tool; AI-генератор каруселей — создать карусель за 60 секунд | GoToFlow] | /ru/blog/idei-karuselej-linkedin [blog-article; 50 идей каруселей для LinkedIn, которые реально дают охваты и заявки] | /ru/blog/kak-ispolzovat-midjourney-dlya-postov [blog-article:how_to; Как использовать Midjourney для постов и каруселей] | /ru/blog/luchshie-ai-generatory-karuselej [blog-article; Лучшие AI-генераторы каруселей в 2026 году: нейросети для Instagram, LinkedIn и соцсетей] | /ru/generator-karuselej-linkedin [product/tool; Генератор каруселей LinkedIn с AI — идеи и структура постов | GoToFlow] | /ru/generator-kontenta [product/tool; AI-генератор контента для соцсетей — посты, карусели и Reels | GoToFlow] | /ru/generator-postov-dlya-socsetey [seo-registry:commercial; Генератор постов для соцсетей] | /ru/generator-postov-instagram [product/tool; Генератор постов Instagram с AI — идеи, подписи и карусели | GoToFlow] | /ru/ii-generator-karuseley [product/tool; ИИ-генератор каруселей — создать карусель с ИИ | GoToFlow]
- /ru/ii-generator-karuseley: /ru/blog/kakoy-ii-sozdast-post-karusel [curated overlap; Какой ИИ подходит для пост-карусели: Сравнение инструментов] | /ru/ai-generator-karuselej [product/tool; AI-генератор каруселей — создать карусель за 60 секунд | GoToFlow] | /ru/blog/idei-karuselej-linkedin [blog-article; 50 идей каруселей для LinkedIn, которые реально дают охваты и заявки] | /ru/blog/kak-ispolzovat-midjourney-dlya-postov [blog-article:how_to; Как использовать Midjourney для постов и каруселей] | /ru/blog/luchshie-ai-generatory-karuselej [blog-article; Лучшие AI-генераторы каруселей в 2026 году: нейросети для Instagram, LinkedIn и соцсетей] | /ru/generator-karuselej-linkedin [product/tool; Генератор каруселей LinkedIn с AI — идеи и структура постов | GoToFlow] | /ru/generator-karuseley [seo-registry:commercial; Генератор каруселей для соцсетей] | /ru/generator-postov-dlya-socsetey [seo-registry:commercial; Генератор постов для соцсетей] | /ru/generator-postov-instagram [product/tool; Генератор постов Instagram с AI — идеи, подписи и карусели | GoToFlow] | /ru/instagram-carousel-generator [seo-registry:tool; Генератор каруселей для Instagram] | /ru/instagram-post-generator [seo-registry:tool; Генератор постов для Instagram] | /ru/linkedin-carousel-generator [seo-registry:tool; Генератор каруселей для LinkedIn]
- /ru/generator-postov-dlya-socsetey: /ru/blog/kak-ispolzovat-midjourney-dlya-postov [blog-article:how_to; Как использовать Midjourney для постов и каруселей] | /ru/blog/kak-sdelat-shablon-dlya-postov-v-canva [blog-article:article; Как сделать шаблон для постов: Переход от Canva к нейросетям] | /ru/blog/luchshie-ai-generatory-karuselej [blog-article; Лучшие AI-генераторы каруселей в 2026 году: нейросети для Instagram, LinkedIn и соцсетей] | /ru/blog/neyroset-dlya-napisaniya-postov-obzor [blog-article:article; Нейросеть для написания постов: Обзор инструментов (2026)] | /ru/blog/neyroset-dlya-postov [blog-article:guide; Нейросеть для постов: Как создавать карусели и текст вместе с ИИ] | /ru/blog/temy-dlya-postov-v-linkedin [blog-article:article; 50 Тем для постов в LinkedIn для экспертов] | /ru/blog/temy-postov-dlya-gruppy-vkontakte [blog-article:ideas_article; Темы постов для группы ВК: идеи для сообщества] | /ru/generator-karuselej-linkedin [product/tool; Генератор каруселей LinkedIn с AI — идеи и структура постов | GoToFlow] | /ru/generator-karuseley [seo-registry:commercial; Генератор каруселей для соцсетей] | /ru/generator-kontenta [product/tool; AI-генератор контента для соцсетей — посты, карусели и Reels | GoToFlow] | /ru/generator-postov-instagram [product/tool; Генератор постов Instagram с AI — идеи, подписи и карусели | GoToFlow] | /ru/ii-generator-kontenta [product/tool; ИИ-генератор контента для соцсетей | GoToFlow]
- /ru/instagram-carousel-generator: /ru/blog/idei-karuselej-linkedin [blog-article; 50 идей каруселей для LinkedIn, которые реально дают охваты и заявки] | /ru/blog/kak-ispolzovat-midjourney-dlya-postov [blog-article:how_to; Как использовать Midjourney для постов и каруселей] | /ru/blog/luchshie-ai-generatory-karuselej [blog-article; Лучшие AI-генераторы каруселей в 2026 году: нейросети для Instagram, LinkedIn и соцсетей] | /ru/generator-karuselej-instagram [product/tool; General RU site route] | /ru/generator-karuselej-linkedin [product/tool; Генератор каруселей LinkedIn с AI — идеи и структура постов | GoToFlow] | /ru/generator-karuseley [seo-registry:commercial; Генератор каруселей для соцсетей] | /ru/generator-postov-dlya-socsetey [seo-registry:commercial; Генератор постов для соцсетей] | /ru/generator-postov-instagram [product/tool; Генератор постов Instagram с AI — идеи, подписи и карусели | GoToFlow] | /ru/ii-generator-postov-dlya-instagram [product/tool; ИИ-генератор постов для Instagram | Создать пост с ИИ] | /ru/instagram-post-generator [seo-registry:tool; Генератор постов для Instagram] | /ru/linkedin-carousel-generator [seo-registry:tool; Генератор каруселей для LinkedIn] | /ru/telegram-post-generator [seo-registry:tool; Генератор постов для Telegram]
- /ru/instagram-post-generator: /ru/blog/kak-ispolzovat-midjourney-dlya-postov [blog-article:how_to; Как использовать Midjourney для постов и каруселей] | /ru/blog/kak-sdelat-shablon-dlya-postov-v-canva [blog-article:article; Как сделать шаблон для постов: Переход от Canva к нейросетям] | /ru/blog/luchshie-ai-generatory-karuselej [blog-article; Лучшие AI-генераторы каруселей в 2026 году: нейросети для Instagram, LinkedIn и соцсетей] | /ru/blog/neyroset-dlya-napisaniya-postov-obzor [blog-article:article; Нейросеть для написания постов: Обзор инструментов (2026)] | /ru/blog/neyroset-dlya-postov [blog-article:guide; Нейросеть для постов: Как создавать карусели и текст вместе с ИИ] | /ru/blog/temy-dlya-postov-v-linkedin [blog-article:article; 50 Тем для постов в LinkedIn для экспертов] | /ru/blog/temy-postov-dlya-gruppy-vkontakte [blog-article:ideas_article; Темы постов для группы ВК: идеи для сообщества] | /ru/generator-karuselej-instagram [product/tool; General RU site route] | /ru/generator-karuselej-linkedin [product/tool; Генератор каруселей LinkedIn с AI — идеи и структура постов | GoToFlow] | /ru/generator-karuseley [seo-registry:commercial; Генератор каруселей для соцсетей] | /ru/generator-postov-dlya-socsetey [seo-registry:commercial; Генератор постов для соцсетей] | /ru/generator-postov-instagram [product/tool; Генератор постов Instagram с AI — идеи, подписи и карусели | GoToFlow]
- /ru/vk-post-generator: /ru/blog/generator-karuseley-dlya-vk [blog-article:how_to; Как создать карточки (карусель) для ВКонтакте из текста] | /ru/blog/kak-ispolzovat-midjourney-dlya-postov [blog-article:how_to; Как использовать Midjourney для постов и каруселей] | /ru/blog/kak-sdelat-shablon-dlya-postov-v-canva [blog-article:article; Как сделать шаблон для постов: Переход от Canva к нейросетям] | /ru/blog/neyroset-dlya-napisaniya-postov-obzor [blog-article:article; Нейросеть для написания постов: Обзор инструментов (2026)] | /ru/blog/neyroset-dlya-postov [blog-article:guide; Нейросеть для постов: Как создавать карусели и текст вместе с ИИ] | /ru/blog/temy-dlya-postov-v-linkedin [blog-article:article; 50 Тем для постов в LinkedIn для экспертов] | /ru/blog/temy-postov-dlya-gruppy-vkontakte [blog-article:ideas_article; Темы постов для группы ВК: идеи для сообщества] | /ru/generator-karuselej-linkedin [product/tool; Генератор каруселей LinkedIn с AI — идеи и структура постов | GoToFlow] | /ru/generator-karuseley [seo-registry:commercial; Генератор каруселей для соцсетей] | /ru/generator-postov-dlya-socsetey [seo-registry:commercial; Генератор постов для соцсетей] | /ru/generator-postov-instagram [product/tool; Генератор постов Instagram с AI — идеи, подписи и карусели | GoToFlow] | /ru/ii-generator-postov-dlya-instagram [product/tool; ИИ-генератор постов для Instagram | Создать пост с ИИ]
- /ru/telegram-post-generator: /ru/blog/kak-ispolzovat-midjourney-dlya-postov [blog-article:how_to; Как использовать Midjourney для постов и каруселей] | /ru/blog/kak-sdelat-shablon-dlya-postov-v-canva [blog-article:article; Как сделать шаблон для постов: Переход от Canva к нейросетям] | /ru/blog/neyroset-dlya-napisaniya-postov-obzor [blog-article:article; Нейросеть для написания постов: Обзор инструментов (2026)] | /ru/blog/neyroset-dlya-postov [blog-article:guide; Нейросеть для постов: Как создавать карусели и текст вместе с ИИ] | /ru/blog/temy-dlya-postov-v-linkedin [blog-article:article; 50 Тем для постов в LinkedIn для экспертов] | /ru/blog/temy-postov-dlya-gruppy-vkontakte [blog-article:ideas_article; Темы постов для группы ВК: идеи для сообщества] | /ru/generator-karuselej-linkedin [product/tool; Генератор каруселей LinkedIn с AI — идеи и структура постов | GoToFlow] | /ru/generator-karuseley [seo-registry:commercial; Генератор каруселей для соцсетей] | /ru/generator-postov-dlya-socsetey [seo-registry:commercial; Генератор постов для соцсетей] | /ru/generator-postov-instagram [product/tool; Генератор постов Instagram с AI — идеи, подписи и карусели | GoToFlow] | /ru/ii-generator-postov-dlya-instagram [product/tool; ИИ-генератор постов для Instagram | Создать пост с ИИ] | /ru/ii-generator-postov-dlya-linkedin [product/tool; ИИ-генератор постов для LinkedIn | Создать пост с ИИ]
- /ru/linkedin-carousel-generator: /ru/blog/idei-karuselej-linkedin [blog-article; 50 идей каруселей для LinkedIn, которые реально дают охваты и заявки] | /ru/blog/kak-ispolzovat-midjourney-dlya-postov [blog-article:how_to; Как использовать Midjourney для постов и каруселей] | /ru/blog/luchshie-ai-generatory-karuselej [blog-article; Лучшие AI-генераторы каруселей в 2026 году: нейросети для Instagram, LinkedIn и соцсетей] | /ru/blog/temy-dlya-postov-v-linkedin [blog-article:article; 50 Тем для постов в LinkedIn для экспертов] | /ru/generator-karuselej-linkedin [product/tool; Генератор каруселей LinkedIn с AI — идеи и структура постов | GoToFlow] | /ru/generator-karuseley [seo-registry:commercial; Генератор каруселей для соцсетей] | /ru/generator-postov-dlya-socsetey [seo-registry:commercial; Генератор постов для соцсетей] | /ru/ii-generator-postov-dlya-linkedin [product/tool; ИИ-генератор постов для LinkedIn | Создать пост с ИИ] | /ru/instagram-carousel-generator [seo-registry:tool; Генератор каруселей для Instagram] | /ru/instagram-post-generator [seo-registry:tool; Генератор постов для Instagram] | /ru/telegram-post-generator [seo-registry:tool; Генератор постов для Telegram] | /ru/vk-post-generator [seo-registry:tool; Генератор постов для ВК]

## Existing Russian scenario/use-case/product/tool pages found

### Product/tool/hub route candidates

| path | routeSource | pageTypeGuess | componentOrContentSource | titleOrH1 | indexability | prerenderStatus |
| --- | --- | --- | --- | --- | --- | --- |
| /ru/ai-generator-karuselej | src/App.jsx \| src/components/RouteSchemaInjector.jsx \| prerender.mjs \| dist/sitemap.xml \| docs route audit evidence | product/tool | App.jsx:RuAICarouselGeneratorPage / \| ROUTES_CONFIG \| static ROUTES or dynamic markdown route \| built sitemap \| docs/seo-page-system-audit-2026-07-08.md or docs/gotoflow-seo-system-audit.md | AI-генератор каруселей — создать карусель за 60 секунд \| GoToFlow | indexable unless component sets noindex | listed in prerender.mjs static ROUTES |
| /ru/blog/idei-karuselej-linkedin | src/App.jsx \| src/content/blog/articles/*.md + /ru/blog/:slug \| prerender.mjs \| dist/sitemap.xml | blog-article | App.jsx:MarkdownBlogArticlePage slug="idei-karuselej-linkedin" langPrefix="ru" / \| src/content/blog/articles/idei-karuselej-linkedin.md \| static ROUTES or dynamic markdown route \| built sitemap | 50 идей каруселей для LinkedIn, которые реально дают охваты и заявки | indexable unless component sets noindex | listed in prerender.mjs static ROUTES |
| /ru/blog/luchshie-ai-generatory-karuselej | src/App.jsx \| src/components/RouteSchemaInjector.jsx \| src/content/blog/articles/*.md + /ru/blog/:slug \| prerender.mjs \| dist/sitemap.xml | blog-article | App.jsx:MarkdownBlogArticlePage slug="luchshie-ai-generatory-karuselej" langPrefix="ru" / \| ROUTES_CONFIG \| src/content/blog/articles/luchshie-ai-generatory-karuselej.md \| static ROUTES or dynamic markdown route \| built sitemap | Лучшие AI-генераторы каруселей в 2026 году: нейросети для Instagram, LinkedIn и соцсетей | indexable unless component sets noindex | listed in prerender.mjs static ROUTES |
| /ru/generator-karuselej-instagram | src/App.jsx \| prerender.mjs \| docs route audit evidence | product/tool | App.jsx:RuAICarouselGeneratorPage / \| static ROUTES or dynamic markdown route \| docs/seo-page-system-audit-2026-07-08.md or docs/gotoflow-seo-system-audit.md |  | indexable unless component sets noindex | listed in prerender.mjs static ROUTES |
| /ru/generator-karuselej-linkedin | src/App.jsx \| src/components/RouteSchemaInjector.jsx \| prerender.mjs \| dist/sitemap.xml \| docs route audit evidence | product/tool | App.jsx:LinkedInCarouselPageRu / \| ROUTES_CONFIG \| static ROUTES or dynamic markdown route \| built sitemap \| docs/seo-page-system-audit-2026-07-08.md or docs/gotoflow-seo-system-audit.md | Генератор каруселей LinkedIn с AI — идеи и структура постов \| GoToFlow | indexable unless component sets noindex | listed in prerender.mjs static ROUTES |
| /ru/generator-kontenta | src/App.jsx \| src/components/RouteSchemaInjector.jsx \| prerender.mjs \| dist/sitemap.xml \| docs route audit evidence | product/tool | App.jsx:AIContentPageRu / \| ROUTES_CONFIG \| static ROUTES or dynamic markdown route \| built sitemap \| docs/seo-page-system-audit-2026-07-08.md or docs/gotoflow-seo-system-audit.md | AI-генератор контента для соцсетей — посты, карусели и Reels \| GoToFlow | indexable unless component sets noindex | listed in prerender.mjs static ROUTES |
| /ru/generator-postov-instagram | src/App.jsx \| src/components/RouteSchemaInjector.jsx \| prerender.mjs \| dist/sitemap.xml \| docs route audit evidence | product/tool | App.jsx:InstagramPostPageRu / \| ROUTES_CONFIG \| static ROUTES or dynamic markdown route \| built sitemap \| docs/seo-page-system-audit-2026-07-08.md or docs/gotoflow-seo-system-audit.md | Генератор постов Instagram с AI — идеи, подписи и карусели \| GoToFlow | indexable unless component sets noindex | listed in prerender.mjs static ROUTES |
| /ru/ii-generator-karuseley | src/App.jsx \| src/components/RouteSchemaInjector.jsx \| src/content/seoPages/index.js \| dist/sitemap.xml \| docs route audit evidence | product/tool | App.jsx:SeoPageRoute pageType="commercial" slug="ii-generator-karuseley" / \| ROUTES_CONFIG \| SeoPageRoute -> ru-commercial-ii-generator-karuseley \| built sitemap \| docs/seo-page-system-audit-2026-07-08.md or docs/gotoflow-seo-system-audit.md | ИИ-генератор каруселей — создать карусель с ИИ \| GoToFlow | noindex via SEO registry in current worktree | not statically listed in prerender.mjs |
| /ru/ii-generator-kontenta | src/App.jsx \| src/components/RouteSchemaInjector.jsx \| prerender.mjs \| docs route audit evidence | product/tool | App.jsx:AIContentPageRu / \| ROUTES_CONFIG \| static ROUTES or dynamic markdown route \| docs/seo-page-system-audit-2026-07-08.md or docs/gotoflow-seo-system-audit.md | ИИ-генератор контента для соцсетей \| GoToFlow | indexable unless component sets noindex | listed in prerender.mjs static ROUTES |
| /ru/ii-generator-postov-dlya-instagram | src/App.jsx \| src/components/RouteSchemaInjector.jsx \| prerender.mjs \| docs route audit evidence | product/tool | App.jsx:InstagramPostPageRu / \| ROUTES_CONFIG \| static ROUTES or dynamic markdown route \| docs/seo-page-system-audit-2026-07-08.md or docs/gotoflow-seo-system-audit.md | ИИ-генератор постов для Instagram \| Создать пост с ИИ | indexable unless component sets noindex | listed in prerender.mjs static ROUTES |
| /ru/ii-generator-postov-dlya-linkedin | src/App.jsx \| src/components/RouteSchemaInjector.jsx \| prerender.mjs \| docs route audit evidence | product/tool | App.jsx:LinkedInPostPageRu / \| ROUTES_CONFIG \| static ROUTES or dynamic markdown route \| docs/seo-page-system-audit-2026-07-08.md or docs/gotoflow-seo-system-audit.md | ИИ-генератор постов для LinkedIn \| Создать пост с ИИ | indexable unless component sets noindex | listed in prerender.mjs static ROUTES |
| /ru/tools | src/App.jsx \| src/content/seoPages/index.js + src/App.jsx \| docs route audit evidence | tool | App.jsx:SeoHubPage pageType="tool" / \| SeoHubPage pageType=tool \| docs/seo-page-system-audit-2026-07-08.md or docs/gotoflow-seo-system-audit.md | Инструменты | indexable unless component sets noindex | not statically listed in prerender.mjs |
| /ru/tools/:slug | src/App.jsx \| docs route audit evidence | dynamic-route-pattern | App.jsx:SeoPageRoute pageType="tool" / \| docs/seo-page-system-audit-2026-07-08.md or docs/gotoflow-seo-system-audit.md |  | runtime depends on matched content | not statically listed in prerender.mjs |

### Scenario/use-case/content route candidates

| path | routeSource | pageTypeGuess | titleOrH1 | primaryIntentGuess | indexability |
| --- | --- | --- | --- | --- | --- |
| /ru/blog/b2b-keysy-v-linkedin-karusel | src/content/blog/articles/*.md + /ru/blog/:slug \| src/content/blog/intent-map.json \| dist/sitemap.xml | blog-article:article | Как упаковать B2B кейс в LinkedIn карусель: пошаговый гайд | Carousel generation / education | published + indexable |
| /ru/blog/kak-napisat-ekspertnyj-post | src/content/blog/articles/*.md + /ru/blog/:slug \| dist/sitemap.xml | blog-article:article | Как написать экспертный пост с помощью ИИ | Social post generation / content support | published + indexable |
| /ru/blog/kak-oformit-keys-v-instagram | src/content/blog/articles/*.md + /ru/blog/:slug \| dist/sitemap.xml | blog-article:article | Как оформить кейс в Инстаграм: Пошаговый гайд | Blog/informational | published + indexable |
| /ru/blog/kak-peredelat-statyu-v-karusel-linkedin | src/content/blog/articles/*.md + /ru/blog/:slug \| dist/sitemap.xml | blog-article:how-to/use-case | Как переделать статью в карусель LinkedIn: Инструкция и кейс | репрайз контента, адаптация текста блога под формат каруселей | published + indexable |
| /ru/blog/kak-peredelat-youtube-v-karusel-linkedin | src/content/blog/articles/*.md + /ru/blog/:slug \| dist/sitemap.xml | blog-article:how-to/use-case | Как переделать YouTube видео в карусель LinkedIn с помощью ИИ | transactional/informational | published + indexable |
| /ru/blog/kak-zarabatyvat-na-sozdanii-karuseley | src/content/blog/articles/*.md + /ru/blog/:slug \| dist/sitemap.xml | blog-article:article | Как зарабатывать на каруселях: Гайд для SMM и дизайна 2026 | Carousel generation / education | published + indexable |
| /ru/blog/karusel-dlya-lichnogo-brenda-s-ii | src/content/blog/articles/*.md + /ru/blog/:slug \| src/content/blog/intent-map.json \| dist/sitemap.xml | blog-article:guide | Карусель для личного бренда с ИИ: как упаковать экспертность в слайды | пользователь хочет понять, как продвигать личный бренд через формат каруселей и как ИИ может ускорить создание экспертного контента | published + indexable |
| /ru/blog/karuseli-dlya-ekspertov-s-ii | src/content/blog/articles/*.md + /ru/blog/:slug \| src/content/blog/intent-map.json \| dist/sitemap.xml | blog-article:guide | Карусели для экспертов с ИИ: как объяснять сложные темы простыми слайдами | пользователь (эксперт в сложной нише: юрист, врач, IT) хочет понять, как адаптировать свои знания под формат каруселей, чтобы это было понятно аудитории | published + indexable |
| /ru/blog/karuseli-dlya-onlayn-shkol-s-ii | src/content/blog/articles/*.md + /ru/blog/:slug \| src/content/blog/intent-map.json \| dist/sitemap.xml | blog-article:guide | Карусели для онлайн-школ с ИИ: как привлекать учеников через образовательный контент | пользователь (владелец школы или продюсер) ищет способы генерации полезного контента для привлечения лидов на образовательные программы | published + indexable |
| /ru/blog/karuseli-dlya-smm-agentstva-s-ii | src/content/blog/articles/*.md + /ru/blog/:slug \| src/content/blog/intent-map.json \| dist/sitemap.xml | blog-article:guide | Карусели для SMM-агентства с ИИ: как ускорить производство контента для клиентов | пользователь (SMM-менеджер или владелец агентства) ищет способы снизить затраты времени на рутинное производство контента для клиентов | published + indexable |
| /ru/use-cases | src/App.jsx \| src/content/seoPages/index.js + src/App.jsx \| docs route audit evidence | scenario/use-case | Сценарии использования | General RU site route | indexable unless component sets noindex |
| /ru/use-cases/:slug | src/App.jsx \| docs route audit evidence | dynamic-route-pattern |  | General RU site route | runtime depends on matched content |
| /ru/use-cases/... | docs route audit evidence | scenario/use-case |  | General RU site route | documentation evidence only |

## Blog/supporting article overlap

The P0 pages overlap heavily with existing RU blog support content. The most important supporting/overlap clusters are:

- Generic carousel generation: `/ru/blog/karusel-dlya-instagram`, `/ru/blog/tekst-v-karusel-neyroset`, `/ru/blog/ii-dlya-karuseley`, `/ru/blog/luchshie-ai-generatory-karuselej`.
- Instagram carousel: `/ru/blog/kak-sdelat-karusel-dlya-instagram-s-ii`, `/ru/blog/karusel-dlya-instagram`, `/ru/blog/razmer-karuseli-v-instagram`.
- Instagram post generation: `/ru/blog/kak-sdelat-post-v-instagram-s-ii`, `/ru/blog/ii-post-dlya-socsetej`, `/ru/blog/tekst-i-foto-dlya-posta-instagram`.
- LinkedIn carousel: `/ru/blog/kak-sdelat-karusel-linkedin-s-ai`, `/ru/blog/idei-karuselej-linkedin`, `/ru/blog/primery-karuseley-linkedin`.
- VK posts: `/ru/blog/kak-napisat-post-v-vk-s-pomoshyu-ii`, `/ru/blog/temy-postov-dlya-gruppy-vkontakte`, `/ru/blog/pervyy-post-vkontakte-s-ii`.
- Telegram posts: `/ru/blog/kak-vesti-telegram-kanal-biznesu`, `/ru/blog/struktura-prodayuschego-posta-v-telegram`.

## Recommendations

### 1. Safe to keep as new SEO registry pages

- `/ru/vk-post-generator`: no exact product route collision found; keep noindex and review against VK blog support content.
- `/ru/telegram-post-generator`: no exact product route collision found; keep noindex and review against Telegram blog support content.

### 2. Should update existing page instead of creating new page

- `/ru/ii-generator-karuseley`: should update/merge with the existing product route owner rather than remain an independent new registry takeover.
- `/ru/generator-karuseley`: no exact route collision, but it overlaps the existing carousel product family `/ru/ai-generator-karuselej`, `/ru/ii-generator-karuseley`, and `/ru/generator-karuselej-instagram`.
- `/ru/generator-postov-dlya-socsetey`: overlaps `/ru/generator-kontenta`, `/ru/ii-generator-kontenta`, and Instagram/LinkedIn post generator routes.
- `/ru/instagram-carousel-generator`: overlaps `/ru/generator-karuselej-instagram`.
- `/ru/instagram-post-generator`: overlaps `/ru/generator-postov-instagram` and `/ru/ii-generator-postov-dlya-instagram`.
- `/ru/linkedin-carousel-generator`: overlaps `/ru/generator-karuselej-linkedin`.

### 3. Should stay noindex review

All 8 P0 pages should stay noindex until route ownership and intent ownership are approved.

### 4. Should be removed from registry routing

- `/ru/ii-generator-karuseley` should be removed from registry routing or merged into the existing route owner unless the product team explicitly decides that the registry page replaces the old product page.

### 5. Needs manual review

- Transliteration strategy: `karuseley` vs `karuselej` is causing product-route ambiguity.
- Root-level tool strategy: P0 tool pages use `/ru/{tool}` while the foundation also supports `/ru/tools/{slug}`.
- Existing blog CTAs point to product routes that may now render noindex registry pages in the current worktree.
- The `/ru/ii-generator-karuseley` route has legacy schema/FAQ config that is currently bypassed by the SEO registry guard but still documents historical ownership.

## Files inspected

- `src/App.jsx`
- `src/components/RouteSchemaInjector.jsx`
- `src/data/faqSchemaData.js`
- `src/components/RuAICarouselGeneratorPage.jsx`
- `src/components/AIContentPageRu.jsx`
- `src/components/InstagramPostPageRu.jsx`
- `src/components/LinkedInCarouselPageRu.jsx`
- `src/components/LinkedInPostPageRu.jsx`
- `src/components/BlogPageRu.jsx`
- `src/components/blog/MarkdownBlogArticlePage.jsx`
- `src/content/blog/articles/*.md`
- `src/content/blog/intent-map.json`
- `src/content/seoPages/index.js`
- `prerender.mjs`
- `dist/sitemap.xml`
- `public/llms-full.txt`
- `docs/seo-page-system-audit-2026-07-08.md`
- `docs/gotoflow-seo-system-audit.md`

## Validation

- No source files modified by this audit script.
- No pages created beyond the requested output report files.
- No routes changed by this audit script.
- No blog markdown changed by this audit script.
- No commit.
- No push.
