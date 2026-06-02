# Anti-Cannibalization Rules

When generating 25+ SEO articles per batch, keyword cannibalization is the biggest risk. This document defines how to identify, resolve, and prevent conflicts where two or more pages target the same intent.

## 1. Differentiating Keywords and Intents

### Similar Keywords vs. Similar Intents
- **Keywords can be different, but intent is the same:** "AI carousel maker" and "carousel generator AI" have the exact same search intent (finding a tool). They should be on the SAME page.
- **Keywords can be similar, but intent is different:** "how to make a carousel" (Informational) vs "carousel maker" (Transactional). These require DIFFERENT pages.

### Conflict Detection (The "Google Test")
Before creating a new article, ask: *If a user searches both keywords, would Google show the same top 3 results?*
If yes -> **Conflict detected.**

## 2. Pillar vs. Supporting Articles Structure
- **Pillar Articles (BOFU/Transactional):** Focus on the core tool/product. Broad intent. 
  - *Example:* `ai-carousel-generator` (EN)
- **Supporting Articles (MOFU/TOFU):** Focus on specific use cases, tutorials, or long-tail questions. Must link BACK to the Pillar.
  - *Example:* `how-to-make-an-instagram-carousel-with-ai` (EN)

## 3. Pre-Generation Checks

### A. Duplicate Primary Keyword
- Check `topic-map.json` and `batch-status.json`.
- If the `primaryKeyword` already exists for the SAME language -> **DO NOT CREATE.**

### B. Duplicate Search Intent
- Check existing `searchIntent` and `targetSlug`.
- If "carousel design tips" exists, do not create "carousel design tricks" unless the angle is completely unique (e.g., specific to real estate).

### C. Similar Slugs Check
- Slugs should be distinct. `instagram-carousel-ideas` and `carousel-ideas-instagram` are a conflict. 

### D. RU/EN Relationship Validation
- A RU article and EN article can target the exact same intent (e.g., `ai-carousel-generator` and `generator-karuseley-neyroset`). This is NOT cannibalization, this is localization.
- Ensure they are explicitly marked with `language: ru` and `language: en`. (Eventually, `hreflang` tags will connect them).

## 4. Resolving Conflicts (Agent Action Plan)

If a brief or topic map entry conflicts with an existing article:

1. **Merge / Consolidate:** If the new keyword is just a variation (e.g., "AI carousel creator" vs existing "AI carousel generator"), ADD the new keyword as a `secondaryKeyword` to the existing article's brief/topic map. DO NOT write a new article.
2. **Change Angle:** If the intent is too broad, narrow the new article to a specific niche (e.g., change "carousel templates" to "LinkedIn carousel templates for B2B").
3. **Change Keyword:** Pivot to a distinct long-tail query.
4. **Mark as Supporting:** Ensure the new article acts as a long-tail supporting guide that heavily links to the existing Pillar.
5. **Redirect / Delete:** If an existing old article is cannibalizing a new Pillar, plan a 301 redirect. (Currently handled manually).

## 5. Examples in GoToFlow

- **Conflict Avoided:** `how-to-make-linkedin-carousel-with-ai` (Informational) and `linkedin-carousel-generator` (Transactional). They have similar terms, but one teaches *how*, the other is the *tool*. The "how-to" article MUST link to the "generator" article.
- **Cannibalization Risk:** Creating both `instagram-carousel-ideas` and `best-ideas-for-instagram-carousels`. These MUST be merged into one single robust article.
