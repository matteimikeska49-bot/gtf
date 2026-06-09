# Demand Import Audit Report

## Import Overview
- Total Keyword Records: 613
- RU Records: 329
- EN Records: 284
- Files Imported: 6

## Source Signals
- Top RU Demand Signals:
  1. ии для постов (3081)
  2. нейросеть для постов (2664)
  3. карусель для инстаграм (2383)
  4. карусель ии (1343)
  5. как сделать карусель в инстаграм (1090)
- Top EN Demand Signals:
  1. instagram carousel (232)
  2. ai carousels (32)
  3. instagram carousel templates (9)
- Top GSC Impressions:
  1. content generator (228)
  2. ai instagram post generator (80)
  3. instagram post generator (53)
  4. instagram posts generator (24)
  5. generate content (20)
- Top Yandex Webmaster Signals:
  1. gotoflow (9)
  2. создание каруселей ии готофлов (6)
  3. генерация постов каруселей (3)

## D53 Impact
- `text-to-carousel-ai`: Supported by "ai carousels" / "content generator" demand signals. Final topic score: 72 (P1).
- `instagram-carousel-hooks`: Supported by "instagram carousel" demand. Final topic score: 61 (P2).
- `content-calendar-to-carousel`: Supported by broad content generation demand. Final topic score: 69 (P2).
- `tekst-v-karusel-neyroset`: Supported by strong RU demand "нейросеть для постов" / "карусель ии". Final topic score: 73 (P1).
- `b2b-keysy-v-linkedin-karusel`: Niche B2B topic, lower pure volume but high product fit. Final topic score: 73 (P1).

## Batch 25 Recommendations
- **Strongest clusters to target next:**
  - AI Instagram Post Generator (high GSC clicks/impressions and Yandex volume)
  - AI tools for social media posts (very high RU volume: "ии для постов", "нейросеть для постов")
## Corrected Decision

* D53 can be published as evidence-backed mini-batch: Yes, after explicit user approval.
* Batch 25 can start now: No.
* Batch 25 can start only after D53 publish + deploy + live verification + user approval.
* Next action: Publish D53 mini-batch only if user explicitly approves.

## D53 Publish Gate

Before D53 publish:

* user explicit approval required;
* run `npm run check:blog:full`;
* publish state transition;
* commit/push;
* wait deploy;
* run `npm run check:blog:live-verification`;
* update `batch-status.json` to `live_verified`.

## Batch 25 Gate

Batch 25 requires:

* D53 live verification passed;
* no systemic publish/deploy/indexing issues;
* only P1/P2 demand-backed topics;
* user approval to start topic selection.
