# Mockup Language Validation Plan

The mockup registry (`src/content/blog/mockups/registry.js`) allows slot-level replacement of images inside markdown using the `:::mockup name=X` directive. This prevents raw image paths in markdown.

However, a critical risk during bulk generation (Batch 25) is the AI hallucinating mockup names or using English mockups in Russian articles (or vice versa), breaking immersion.

## 1. Current Mockup Assets Inventory

### English (EN) Approved Assets
- `ai-carousel-generator-mockup`
- `ai-post-generator-mockup`
- `linkedin-carousel-generator-mockup`
- `ai-carousel-maker-vs-manual-design`
- `ai-carousel-maker-vs-manual-design-mobile`
- `instagram-carousel-prompts`
- `linkedin-carousel-prompts`

### Russian (RU) Approved Assets
- `ru-ai-carousel-generator-mockup`
- `ru-ai-post-generator-mockup`
- `ru-linkedin-carousel-generator-mockup`
- `ru-prompty-dlya-karuseley-v-instagram`
- `ru-kak-sdelat-karusel-dlya-instagram-s-ii`

## 2. Preventing Language Mismatch

### A. Naming Convention Enforcement
- ALL Russian mockups MUST start with the prefix `ru-`.
- ALL English mockups MUST NOT start with `ru-`. (Optionally, prefix with `en-`, but currently they have no prefix).

### B. Validation Rules
- **Rule 1:** If article `language: ru`, then ANY mockup slot used in the article MUST start with `ru-`.
- **Rule 2:** If article `language: en`, then ANY mockup slot used in the article MUST NOT start with `ru-`.

## 3. Automation and Agent Workflow

1. **Brief Stage:** The `article-brief-template` explicitly demands the AI select mockups *from the approved list* matching the language.
2. **Generation Stage:** The AI agent is provided with the Exact Key list from the registry for the target language. The prompt strictly forbids inventing new keys.
3. **Intent Mapping:** 
   - Generative tools -> Use `*ai-carousel-generator-mockup` or `*linkedin-carousel-generator-mockup`.
   - Content ideas -> Use `*ai-post-generator-mockup`.
   - Prompt articles -> Use specific prompt assets like `instagram-carousel-prompts`.

## 4. Technical QA Implementation (Next Phase)

To physically prevent a mismatch from reaching production, we must update `scripts/check-blog-publishing.mjs`.

**Required Script Changes:**
```javascript
// Example validation to add to check-blog-publishing.mjs
const lang = frontmatter.language;
const mockups = extractMockups(markdownBody);

for (const mockup of mockups) {
  if (!registry[mockup]) {
    throw new Error(`Mockup ${mockup} does not exist in registry.`);
  }
  if (lang === 'ru' && !mockup.startsWith('ru-')) {
    throw new Error(`Language mismatch: RU article uses EN mockup ${mockup}`);
  }
  if (lang === 'en' && mockup.startsWith('ru-')) {
    throw new Error(`Language mismatch: EN article uses RU mockup ${mockup}`);
  }
}
```
*This guarantees that `npm run check:blog` will fail the build if the AI makes a mistake.*
