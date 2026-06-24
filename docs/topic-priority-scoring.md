# Topic Priority Scoring System

## Overview
The GoToFlow SEO Publishing Platform relies on data-driven prioritization. No topic should be picked purely based on intuition. To ensure we write content that matters, every approved or ready-for-draft topic must be scored.

## Scoring Model
Every topic gets individual sub-scores (1-10) and a final priority score (1-100).

### Sub-scores (1-10)
- **Demand Score (20%)**: Based on keyword evidence. Higher score = higher confidence and volume.
- **Product Fit Score (20%)**: Higher score = closer to GoToFlow core product route and conversion intent.
- **Business Value Score (20%)**: Higher score = more likely to create signups, trials, or strong positioning.
- **Cannibalization Safety Score (15%)**: Higher score = lower risk of cannibalizing existing content.
- **Difficulty Score (10%)**: Higher score = *easier* SEO opportunity (less competitive).
- **Mockup Readiness Score (10%)**: Higher score = highly relevant mockups exist.
- **Data Confidence Score (5%)**: Higher score = better source quality (GSC/Wordstat > Google Trends > AI Estimate).

### Final Priority Score
Final Priority Score = `(Demand * 0.20 + Product Fit * 0.20 + Business Value * 0.20 + Cannibalization Safety * 0.15 + Difficulty * 0.10 + Mockup Readiness * 0.10 + Data Confidence * 0.05) * 10`

## Priority Tiers
- **P1**: Must have a score >= 70. These are critical targets.
- **P2**: Mainstream topics (score < 70, or manually down-tiered due to nuanced business logic).
- **P3**: Low priority, backlogged.
- **HOLD**: High cannibalization risk, or missing critical functionality/mockup. Cannot be drafted until resolved.

## Source Confidence Hierarchy
Missing real volume does not block MVP but lowers the Data Confidence Score.
- **High**: GSC, Yandex Webmaster, precise Wordstat, Ahrefs/Semrush
- **Medium**: Google Trends
- **Low**: manual SERP analysis, AI estimate, topic_map inheritance.

### Published Article Backfill
Published articles must not sit outside the demand/topic layer. If a published article has no keyword, topic, score, intent, or cluster record, add a minimal backfill record before selecting the next batch.

Backfill rules:
- Do not invent volume, clicks, impressions, difficulty, or CPC.
- If an exact imported source exists, use it and keep the original source name.
- If no exact imported source exists, use `source: "published_article_backfill"`, `exactVolumeKnown: false`, `demandEvidence: "needs_refresh"`, `dataConfidenceScore` low, and `requiresDemandRefresh: true`.
- A backfilled published article can be scored P2/P3 for hygiene, but it should not justify new batch expansion until demand is refreshed.

## Recalculation Workflow
Because topic selection depends on demand data, scores must be recalculated when new demand evidence is imported. 

### How manual exports affect scores
- **Real data imported** (Wordstat, GSC): Dramatically increases Data Confidence and adjusts Demand score linearly with volume/impressions.
- **Google Trends data**: Increases Data Confidence over estimates, and confirms Demand.
- **Missing data**: Caps Data Confidence to 5/10 and caps Demand Score, meaning an unproven topic must have exceptionally high business/product value to reach P1.

### When to run:
1. Export manual CSVs from your tool (Wordstat/Trends/GSC) to `src/content/blog/demand-sources/`
2. Run: `npm run import:keyword-demand`
3. Run: `npm run recalculate:topic-scores`
4. Run: `npm run check:blog:topic-score`

**Strict Rule:** After any keyword import, scores MUST be recalculated before choosing topics for a batch.

## Rules
- **No draft without score**: `ready_for_draft` topics cannot exist without a score in `topic-priority-score.json`.
- **No mini-batch without score**: Mini-batch topics cannot be selected without scoring.
- **Every brief must reference**: Priority Tier and Final Priority Score must be included in the brief metadata.
- **Generation blocker**: Gemini/Codex should not begin article generation unless scoring exists.
- **Research package gate**: Active batch topics must pass `npm run check:blog:research-package` before any article generation starts.
- **Draft readiness gate**: A batch draft/brief workflow should not start unless `npm run check:blog:batch-readiness` reports `canProceedToDraft: true`. `canProceed` is a backward-compatible alias for this draft state.
- **Publish readiness gate**: A topic must exist in `topic-map.json` before it can be publish-ready. Intake plans such as `ru-wave-1-topic-plan` can support scoring and draft readiness, but `publishReady` and `canProceedToPublish` must stay false until the topic-map entry exists.
- **No publish from fallback only**: Before switching an article to `published:true` / `noindex:false`, `npm run check:blog:batch-readiness` must report `canProceedToPublish: true`.
