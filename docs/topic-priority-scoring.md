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

## Rules
- **No draft without score**: `ready_for_draft` topics cannot exist without a score in `topic-priority-score.json`.
- **No mini-batch without score**: Mini-batch topics cannot be selected without scoring.
- **Every brief must reference**: Priority Tier and Final Priority Score must be included in the brief metadata.
- **Generation blocker**: Gemini/Codex should not begin article generation unless scoring exists.
