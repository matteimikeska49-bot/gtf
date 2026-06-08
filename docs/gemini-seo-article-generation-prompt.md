# Gemini SEO Article Generation Prompt

## 1. Purpose
This prompt is designed to instruct Gemini (or another AI agent) to generate a complete, production-ready Markdown SEO article for the GoToFlow Publishing Platform. It ensures strict compliance with our frontmatter schema, callout rules, freshness requirements, and internal linking structure.

## 2. When to Use
Use this prompt template whenever you need to generate a new blog post or SEO guide. Do not use this for minor edits. Provide this exact prompt along with the specific article brief to generate a ready-to-publish `.md` file.

For RU markdown articles, use:
`docs/gemini-ru-article-draft-protocol.md`

RU articles must be generated from completed RU briefs and must follow RU markdown pipeline rules.

## 3. Input Data for Gemini
**Rule:** Gemini should not generate articles from a raw topic alone for production batches. For production use, Gemini should receive a completed content brief.

Before generating the article, Gemini must receive the following context via a content brief (reference: `docs/seo-content-brief-template.md`):
- keyword and keyword database record;
- demand evidence source and exactVolumeKnown;
- priority tier and final priority score;
- intent;
- audience;
- angle;
- product links;
- structure;
- related links;
- CTA;
- freshness requirement;
- mockup requirement if any.

*(If any data is missing from the brief, Gemini should create an "Assumptions" block rather than hallucinating critical URLs).*

## 4. Strict Generation Rules
1. **Output Format**: Output ONLY the raw Markdown file content. Do not include introductory or concluding conversational text.
2. **No Hallucinations / Strict Links**: Do not invent URLs. Use only the provided allowlist for internal links. Do NOT link across languages (RU to EN or EN to RU). Ensure product routes match the article language. Do NOT link to draft or noindex pages.
3. **No Duplicate Sections / Headers**: Do not write the Quick Answer or FAQ in the body text—they belong exclusively in the frontmatter. Do NOT duplicate the H1 title in the body. Do NOT use empty FAQ rows. Use exactly `question:` and `answer:` keys for FAQ, never `q:` or `a:`.
4. **Final CTA & Product Context**: Do not manually write a final CTA in the body text. It is handled via frontmatter. Provide a standard markdown link to the product in the normal body text.
5. **No HTML / JSX**: Do not use HTML tags, `<span class=...>`, raw JSX (like `<InlineProductBlock />`), or `className` attributes anywhere. Do NOT use `[!product]` or `:::mockup` blockquotes as they will leak to rendered HTML.
6. **No "Draft" Wording**: Never use wording like "carousel draft", "review the draft", or "generate a draft". Use "carousel result", "ready carousel", "slide copy", etc.
7. **Dates**: Ensure `updatedAt` is present and correct. Do not use weird date labels (e.g. "Examples Reviewed").

## 5. Frontmatter Schema
Every article MUST start with this exact YAML frontmatter block:
```yaml
---
title: "..."
slug: "..."
language: "en"
description: "..."
primaryKeyword: "..."
secondaryKeywords:
  - "..."
searchIntent: "..."
cluster: "..."
articleType: "..."
category: "..."
priority: "P1"
published: false # true ONLY if QA is passed and publication status is 'ready'
noindex: true # false ONLY if QA is passed and publication status is 'ready'
canonical: "https://gotoflow.io/blog/..."
createdAt: "YYYY-MM-DD"
updatedAt: "YYYY-MM-DD"
lastReviewed: "YYYY-MM-DD" # Must be a real review date, not just 'today'
quickAnswerTitle: "..."
quickAnswer:
  - "..."
faq:
  - question: "..."
    answer: "..."
explore:
  tools:
    - title: "..."
      href: "/..."
      description: "..."
  guides:
    - title: "..."
      href: "/blog/..."
      description: "..."
finalCta:
  title: "..."
  text: "..."
  buttonText: "..."
  href: "/..."
  microcopy: "..."
  secondaryText: "..."
  secondaryHref: "#explore-more"
---
```

## 6. Markdown Body Structure
Generate the body following this logical flow:
1. **Intro / Problem Framing**: Hook the reader.
2. **Main Explanation**: The core content answering the search intent.
3. **Step-by-step / Framework / Phases**: If relevant.
4. **Product CTA**: Insert one `[!product]` callout in the first third of the article.
5. **Examples / Formats / Prompt Groups**: Use H2/H3 for structure. Use ordered lists for prompts.
6. **Related / Internal Link**: Insert one `[!related]` callout after a major section (do not place it immediately after a product CTA, and do not interrupt lists/prompt groups).
7. **Mistakes / Pitfalls**: If relevant.
8. **Conclusion**: Brief wrap-up.

## 7. Callout Rules
Use blockquotes with specific brackets for callouts. 
Callouts are editorial accents, not repeated section cards.

Rules:
- Do not use 3+ callout blocks in a row.
- Do not turn every mistake, tip, takeaway, or insight into a separate callout.
- For repeated sections like Common mistakes, Pro tips, Best for, Key takeaways, or Workflow insights (3+ items), use the `:::cards` syntax instead of stacked callouts or plain H3s.
- Allowed card types: `mistakes`, `tips`, `takeaways`, `workflow`, `best-for`, `examples`, `checklist`, `pros-cons`, `default`.
- Use `[!mistake]`, `[!tip]`, `[!takeaway]`, `[!workflow]`, `[!bestfor]` only for one highlighted point inside a larger section.
- Product and related blocks must NOT be placed inside `:::cards`. They are standalone callouts separated by meaningful content.

- `> [!takeaway]` - Key takeaway text.
- `> [!why]` - Why this matters text.
- `> [!mistake]` - Common mistake text.
- `> [!tip]` - Practical tip.
- `> [!workflow]` - Workflow insight.
- `> [!bestfor]` - Best for specific audience/use case.

Bad (Repeated Callouts):
```markdown
> [!mistake]
> First mistake.

> [!mistake]
> Second mistake.

> [!mistake]
> Third mistake.
```

Good (Compact Cards):
```markdown
## Common mistakes

:::cards
type: mistakes

### 1. First mistake
Explanation.

### 2. Second mistake
Explanation.

### 3. Third mistake
Explanation.
:::
```

**Product CTA** (`[!product]`): Must be placed in the first third/middle of the article. Standalone link on the last line.
```markdown
> [!product]
> **Product CTA title**
> Product CTA description.
> [CTA text](/real-internal-url)
```

**Related Link** (`[!related]`): Must be placed after a major semantic block. Do not place next to `[!product]`.
```markdown
> [!related]
> **Related guide title**
> Related explanation with [link text](/real-internal-url).
```

## 8. Internal Linking Rules
Use ONLY valid, real internal routes starting with `/`. Do not invent URLs.
**Allowlist:**
- `/`
- `/blog`
- `/ai-carousel-maker`
- `/ai-content-generator`
- `/ai-instagram-post-generator`
- `/linkedin-carousel-maker`
- `/pricing`
- `/blog/linkedin-carousel-ideas`
- `/blog/best-ai-carousel-generators`
- `/blog/how-to-make-linkedin-carousel-with-ai`
- `/blog/ai-instagram-carousel-generator`
- `/blog/linkedin-carousel-prompts`

- Use 1-2 contextual internal links in the body.
- External links are only allowed if strictly necessary for the topic (e.g., citing a source).

## 9. Prompt Groups / Long Lists Rules
- Use H2 (`## Prompt Groups` or similar).
- Group items using H3 (`###`).
- Use numbered lists for prompts.
- **CRITICAL**: Do not insert `[!product]` or `[!related]` blocks *inside* the prompt groups or lists. Place them before or after the entire section.

## 10. RU / EN Rules
- **EN**: All UI, frontmatter, body content, and CTA microcopy must be in English.
- **RU**: Body content and CTA microcopy must be in Russian. Slug must be Latin transliteration. Do not literally translate EN articles; adapt to the RU search intent. `language` must be set to `ru`.

## 11. QA Checklist for Output
Before returning the output, the agent MUST verify internally:
- [ ] Is `published` and `noindex` set correctly based on draft/ready status?
- [ ] Are `[!product]` and `[!related]` separated by meaningful content?
- [ ] Are lists and Prompt Groups completely uninterrupted by callouts?
- [ ] Are all internal links from the allowlist?
- [ ] Is there exactly ZERO conversational filler before/after the markdown code block?

## 12. Copy-Paste Prompt for Gemini

```text
You are an expert SEO Content Writer and Technical Markdown Architect for the GoToFlow Publishing Platform.
Your task is to write a high-quality, deeply researched, and engaging SEO article based on the provided brief, and format it EXACTLY according to our strict Markdown and YAML frontmatter schema.

### Context & Brief:
[INSERT BRIEF DATA HERE: language, keyword, intent, URLs, freshness date, publication status, etc.]

### Rules:
1. OUTPUT ONLY RAW MARKDOWN. No intros, no explanations, no "Here is your article". Just the file content starting with `---` and ending with the conclusion.
2. Frontmatter must contain all required fields: title, slug, language, description, primaryKeyword, secondaryKeywords, searchIntent, cluster, articleType, category, priority, published, noindex, canonical, createdAt, updatedAt, lastReviewed, quickAnswerTitle, quickAnswer, faq, explore, finalCta.
3. If publication status is 'draft', set `published: false` and `noindex: true`. Do NOT leave noindex on published articles.
4. Do not invent keyword volume. Do not claim demand numbers without source.
5. Topic must reference keyword-candidates record.
6. Topic must have a topic-priority-score and cannot be in HOLD tier. Generation should not begin without a score.
7. PRODUCT REALITY: Do not claim unsupported capabilities. Do not promise direct publishing/scheduling unless `product-capabilities.json` says supported.
8. PRODUCT REALITY: Do not claim guaranteed engagement or algorithm boosts. For PDF/video workflows, use cautious wording (e.g. "paste text from PDF") unless a capability is explicitly supported. Every product claim must be compatible with `product-capabilities.json`.
9. INTENT OWNERSHIP: Every new article must have an `intent-map.json` record. Do not generate an article if it would duplicate an Owner's intent.
10. CLUSTER: Every new article must have a `cluster-authority-map.json` role. Support articles must link to their Hub and Product Route where relevant.
11. ALIGNMENT CHECK: Before generating any article, you must confirm that a keyword record exists, topic score exists, product capabilities are mapped, intent record exists, cluster role exists, product route exists, and draft publish safety values are correct (`published: false`, `noindex: true`, `preview: true`, `approvedForPublish: false`). If any of these are missing: STOP and report. Do not generate an article. Do not invent these fields. Do not create an article outside the topic-map/intent/cluster.
12. Do NOT write the FAQ or Final CTA in the body text. They belong ONLY in the frontmatter. Use EXACTLY `question:` and `answer:` keys for FAQ. Do NOT use empty FAQ rows or duplicate the H1.
13. finalCta schema is STRICT: `title`, `text` (NOT description), `buttonText`, `href` (required, from allowlist), `microcopy`, `secondaryText`, and `secondaryHref` (e.g., "#explore-more"). No raw HTML or `<span class=...>` allowed.
14. Do NOT use `[!product]` or `:::mockup` callouts or raw JSX/HTML in the body. Provide a standard markdown link to the product in the body. Avoid old "draft" wording (e.g., "carousel draft").
15. Place exactly ONE `[!related]` block after a major section. DO NOT place it inside lists or prompt groups.
16. Use ONLY the approved internal links provided in the brief or the standard allowlist. Do not hallucinate URLs. No cross-language links (RU to EN). No links to draft/noindex pages. Ensure product routes match the article language.
17. If writing a prompt library, use H2 for the main section, H3 for groups, and ordered lists for the prompts themselves. Do not interrupt this structure with callouts.

Begin.
```

18. Every article MUST include exactly one or a small number of natural product links in the body (e.g. `[Try our AI tool](/route)`).
19. The body product route MUST exactly match the `relatedProductRoute` frontmatter.
20. The body product link cannot claim unsupported capabilities.
21. No standalone CTA block in the body markdown; final CTA belongs in `finalCta` frontmatter ONLY.

22. Never insert `:::mockup{slot="..."}` unless the frontmatter `mockupStatus` is `present` and you have an approved asset.
23. If no perfectly matching mockup is available for the topic or intent, set `mockupStatus: "not_available"` and do NOT insert fallback mockups.
24. Never invent or hallucinate mockup assets.

25. Every new draft MUST be generated with `published: false`, `noindex: true`, `preview: true`, `approvedForPublish: false`.
26. NEVER set `published: true` or `noindex: false` without explicit user approval.
27. NEVER link to a draft or noindex URL from within a published article's internal links or explore zones.

28. **Internal Link Flow**: 
    - Never link a published article to a draft or noindex page.
    - If acting as a supporting article, always link to the published hub if it exists.
    - Keep links within the same language boundaries (EN -> EN, RU -> RU).
    - Do not invent broken links or link to held/rejected topics.
