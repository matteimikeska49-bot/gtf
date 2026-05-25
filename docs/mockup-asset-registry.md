## 1. Purpose

Mockup registry нужен, чтобы GoToFlow SEO articles использовали только проверенные product screenshots/mockups.

Он предотвращает:
- случайные картинки в статьях;
- несовпадение языка статьи и интерфейса на скрине;
- использование RU-скринов в EN-статьях;
- чужой UGC / Reels / social feed content в публичных статьях;
- картинки без alt/caption;
- broken image paths;
- хаос при 100+ статьях.

Главное правило:
If no approved asset fits article language, cluster, and intent, do not insert a random image.

## 2. Asset lifecycle

Статусы:

- planned — asset нужен, но ещё не снят;
- needs-rescreen — есть исходный скрин или идея, но нужен чистый финальный asset;
- approved — можно использовать в публичных SEO-статьях;
- internal-only — можно использовать в документации/внутри, но не в public SEO;
- rejected — нельзя использовать.

Правило:
Only `approved` assets can be used in public published SEO articles.

## 3. Required metadata

Каждый asset должен иметь:

- id
- path
- language
- cluster
- suitableFor
- articleTypes
- status
- alt
- caption
- priority
- source
- notes

Опционально:
- pairedAssetId
- sectionPlacement
- recommendedArticles
- requiresBlur
- privacyRisk
- lastReviewed

## 4. Language rules

Поддерживаем языки:
- ru
- en

Правила:
- RU article → RU asset.
- EN article → EN asset.
- Do not use RU screenshots in EN public articles.
- Do not use EN screenshots in RU public articles unless intentionally approved.
- If only RU asset exists and article language is EN, skip mockup until EN asset is ready.
- RU/EN pairs should share similar ids:
  - create-carousel-card-ru-01
  - create-carousel-card-en-01

## 5. Approved/current RU source candidates

Зафиксировать, что текущие RU screenshots are source candidates, not imported final files yet.

Current useful RU asset candidates:

1. dashboard-ru-01
2. create-carousel-card-ru-01
3. create-carousel-page-ru-01
4. text-topic-input-ru-01
5. upload-source-ru-01
6. structure-dropdown-ru-01
7. visual-style-selector-ru-01
8. custom-style-prompt-ru-01
9. character-block-ru-01
10. settings-block-ru-01
11. result-editor-ru-01
12. slide-editor-crop-ru-01
13. export-buttons-ru-01
14. instagram-post-text-ru-01

Status for current RU candidates:
needs-rescreen

Reason:
The final WebP files are not imported yet, and public-ready crops/EN pairs still need to be prepared.

## 6. Internal-only / rejected screenshots

Mark as internal-only or rejected:

- spy-feed-ru-01
- top-reels-feed-ru-01
- third-party-reels-feed-ru-01
- random-project-gallery-ru-01

Reason:
These may contain third-party social content, random thumbnails, non-curated examples, or screenshots that are not suitable for public SEO articles.

## 7. EN asset plan

Planned EN assets:

1. create-carousel-card-en-01
2. dashboard-en-01
3. create-carousel-empty-en-01
4. create-carousel-filled-topic-en-01
5. upload-source-en-01
6. structure-dropdown-en-01
7. visual-style-selector-en-01
8. custom-style-prompt-en-01
9. character-block-en-01
10. settings-block-en-01
11. result-editor-en-01
12. slide-editor-crop-en-01
13. export-buttons-en-01
14. projects-gallery-clean-en-01

Status:
planned

## 8. Naming convention

Use kebab-case:

{scenario}-{language}-{number}.webp

Examples:
- create-carousel-card-ru-01.webp
- create-carousel-card-en-01.webp
- result-editor-ru-01.webp
- result-editor-en-01.webp

## 9. Folder structure

Use:

public/assets/blog/mockups/ru/
public/assets/blog/mockups/en/

Do not put random screenshots directly into article folders.

## 10. Future article usage

Future markdown articles should reference mockups by id, not by random path.

Preferred future syntax:

:::mockup
id: create-carousel-card-ru-01
:::

or frontmatter:

mockups:
  - id: create-carousel-card-ru-01
    placement: after-quick-answer

Important:
This stage should prepare the registry and validation foundation. Do not implement full markdown renderer for `:::mockup` yet unless it is small and safe. Rendering can be a later stage.

## 11. Selection logic for future automation

Future article/mockup selection should work like this:

Input:
- article.language
- article.cluster
- article.articleType
- section intent
- available registry assets

Selection rules:
1. Use only status: approved.
2. Match language exactly.
3. Prefer same cluster.
4. Match suitableFor / articleTypes.
5. Prefer lower priority number.
6. If no suitable approved asset exists, return no mockup.
7. Never fallback to random assets.
8. Never use internal-only/rejected in public articles.

## 12. Validation rules

check:blog should validate registry quality:
- duplicate asset ids;
- required fields exist;
- allowed status;
- allowed language;
- path starts with `/assets/blog/mockups/`;
- approved assets must have existing files;
- needs-rescreen/planned/internal-only/rejected assets may have missing files;
- alt and caption exist for all non-rejected assets;
- rejected assets may omit caption but should have notes.
