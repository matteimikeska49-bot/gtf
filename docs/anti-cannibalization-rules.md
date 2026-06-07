# Anti-Cannibalization Rules

## 1. Goal
Prevent multiple articles or product pages from competing for the same search intent and keywords.

## 2. Topic Map Checks
Before generating any new article, the topic MUST be verified against:
- **Existing slugs**: No duplicates allowed.
- **Primary keywords**: Must be unique across published and planned content.
- **Product page intent**: "Blog intent vs product intent" split. Transactional intent like "carousel maker" belongs to product pages. Informational intent like "how to make a carousel" belongs to the blog.
- **Same-language duplicates**: Do not write two English articles covering the exact same query (e.g., "repurpose blog" vs "turn article into carousel").
- **RU/EN localized pairs**: Localized articles must strictly target their respective language intent without blending. Ensure the translated topic doesn't accidentally cannibalize a different term.
- **Existing published article intent**: Even if keywords differ slightly, if the user intent is identical, MERGE instead of creating a new article.
