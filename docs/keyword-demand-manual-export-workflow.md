# Manual Keyword Demand Workflow

## Why manual export first?
Building API integrations for Google Search Console, Yandex Webmaster, Yandex Wordstat, and Ahrefs/Semrush requires OAuth credentials, API keys, and handling quota limits. To unblock the GoToFlow SEO pipeline immediately without faking demand data, we are using a manual CSV export workflow as the foundational demand layer.

## How it works
1. You export keyword data from SEO tools.
2. You place the CSV file in `src/content/blog/demand-sources/`.
3. You run `npm run import:keyword-demand`.
4. The script updates `src/content/blog/keyword-candidates.json`.

Published-article backfills are allowed only as hygiene records. They connect an already published URL to keyword/topic/score maps, but they are not a substitute for fresh demand export unless an exact imported source already exists.

## Data Sources

### Google Search Console / Yandex Webmaster
- **Used for**: Post-publish performance signals.
- **Rules**: This proves a topic is getting real impressions/clicks. It is not generic search volume, but it can validate demand for published articles.

### Yandex Wordstat
- **Used for**: Exact search volume for RU market.
- **Rules**: Wordstat data CAN be considered exact volume if the volume is a real number. 
- **Export format**: Must contain `keyword` and `volume`.

### Google Trends
- **Used for**: Trend signals (rising/stable/declining).
- **Rules**: Google Trends provides relative interest (0-100), not exact volume. A Google Trends import will NEVER set `exactVolumeKnown` to true.

### Paid Tools (Ahrefs/Semrush)
- **Used for**: Exact volume, difficulty, and CPC for EN/Global markets.

## Current Limitations
- Imports are manual CSV/JSON exports, not live API pulls.
- GSC and Yandex Webmaster prove post-publish impressions/clicks, not generic search volume.
- Google Trends proves relative interest only; it does not provide exact volume.
- EN exact volume, difficulty, and CPC are mostly absent until Ahrefs/Semrush or equivalent data is imported.
- Use `published_article_backfill` only with `exactVolumeKnown: false` and `requiresDemandRefresh: true` unless a real imported source is matched.

## Rules for Exact Volume
- **What counts**: Ahrefs volume, Semrush volume, Wordstat precise frequency.
- **What does NOT count**: Google Trends interest score, AI estimation, manual intuition.
- AI estimate is never exact volume (`exactVolumeKnown` must be `false`).
- No topic should be selected purely from intuition once real data is available.
