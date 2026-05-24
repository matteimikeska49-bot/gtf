# Gemini SEO Article Generation Prompt

## 1. Purpose
This prompt is designed to instruct Gemini (or another AI agent) to generate a complete, production-ready Markdown SEO article for the GoToFlow Publishing Platform. It ensures strict compliance with our frontmatter schema, callout rules, freshness requirements, and internal linking structure.

## 2. When to Use
Use this prompt template whenever you need to generate a new blog post or SEO guide. Do not use this for minor edits. Provide this exact prompt along with the specific article brief to generate a ready-to-publish `.md` file.

## 3. Input Data for Gemini
Before generating the article, Gemini must receive the following context (if any data is missing, Gemini should create an "Assumptions" block rather than hallucinating critical URLs):
- `language`: (en / ru)
- `primaryKeyword`: 
- `secondaryKeywords`: 
- `searchIntent`: 
- `audience`: 
- `funnelStage`: 
- `cluster`: 
- `articleType`: 
- `targetSlug`: 
- `targetCanonical`: 
- `competitors / SERP notes`: 
- `unique angle`: 
- `GoToFlow product angle`: 
- `related product/tool links`: 
- `related guide links`: 
- `required CTA`: 
- `freshness date / lastReviewed`: 
- `publication status`: (draft or ready)

## 4. Strict Generation Rules
1. **Output Format**: Output ONLY the raw Markdown file content. Do not include introductory or concluding conversational text.
2. **No Hallucinations**: Do not invent URLs. Use only the provided allowlist for internal links.
3. **No Duplicate Sections**: Do not write the Quick Answer or FAQ in the body text—they belong exclusively in the frontmatter.
4. **Final CTA**: Do not manually write a final CTA in the body text. It is handled via frontmatter.
5. **No HTML**: Do not use HTML tags or `className` attributes inside the Markdown body.

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
- For repeated sections like Common mistakes, Pro tips, Best for, Key takeaways, or Workflow insights, use H3 subsections or compact markdown lists instead.
- Use `[!mistake]`, `[!tip]`, `[!takeaway]`, `[!workflow]`, `[!bestfor]` only for one highlighted point inside a larger section.
- Product and related blocks are allowed, but they should be separated by meaningful content.
- Test/template pages may show callout examples, but production articles should not stack callouts.

- `> [!takeaway]` - Key takeaway text.
- `> [!why]` - Why this matters text.
- `> [!mistake]` - Common mistake text.
- `> [!tip]` - Practical tip.
- `> [!workflow]` - Workflow insight.
- `> [!bestfor]` - Best for specific audience/use case.

Bad:
```markdown
> [!mistake]
> First mistake.

> [!mistake]
> Second mistake.

> [!mistake]
> Third mistake.
```

Good:
```markdown
## Common mistakes

### 1. First mistake
Explanation.

### 2. Second mistake
Explanation.

### 3. Third mistake
Explanation.
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
3. If publication status is 'draft', set `published: false` and `noindex: true`.
4. Do NOT write the FAQ or Final CTA in the body text. They belong ONLY in the frontmatter.
5. finalCta schema is STRICT: `title`, `text` (NOT description), `buttonText`, `href` (required, from allowlist), `microcopy`, `secondaryText`, and `secondaryHref` (e.g., "#explore-more").
6. Place exactly ONE `[!product]` CTA in the first third of the article.
7. Place exactly ONE `[!related]` block after a major section. DO NOT place it near the product CTA, and DO NOT place it inside lists or prompt groups.
8. Use ONLY the approved internal links provided in the brief or the standard allowlist. Do not hallucinate URLs.
9. If writing a prompt library, use H2 for the main section, H3 for groups, and ordered lists for the prompts themselves. Do not interrupt this structure with callouts.

Begin.
```
