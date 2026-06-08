# SEO Article Brief Template

## 1. Basic metadata
- Working title:
- Language:
- Article type:
- Funnel stage:
- Search intent:
- Audience:

## Stage 1: Keyword Demand
- Primary keyword:
- Keyword database record:
- Demand evidence source:
- Last checked date:
- Demand confidence:
- Exact volume known:
- Volume/Difficulty/CPC (if known):
- Notes on missing volume data:
- Secondary keywords:

## Stage 2: Topic Priorities
- Topic Score ID:
- Priority Tier: {P1/P2/P3/HOLD}
- Final Priority Score: {Score}
- Scoring Reason:

## Stage 3: Product Reality Claims
- Product Capability IDs Used: {e.g. textToCarousel, linkedinCarouselGeneration}
- Allowed Claims: {Insert from product-capabilities.json}
- Forbidden Claims: {Insert from product-capabilities.json}
- Safer Wording: {If partially supported, provide the cautious phrasing required}

## Stage 4: Intent Ownership
- Intent ID: {Insert from intent-map.json}
- Intent Role: {Owner or Supporting}
- Owner/Supporting Status:
- Forbidden Near-Duplicates:

## Stage 5: Cluster Authority
- Cluster ID: {Insert from cluster-authority-map.json}
- Article Role: {e.g. hub, supporting, comparison}
- Hub Link/Slug: {Link to Hub article if supporting}
- Supporting Links: {Links to any supporting articles if Hub}
- Related Product Route: {MUST be an approved route from the list}
- Internal Linking Plan:

## Publish Safety
- published: false
- noindex: true
- preview: true
- approvedForPublish: false

## 2. Product-led angle
- How does our product solve the search intent?
- The one specific problem we solve:
- Why use our product over alternatives:

## 3. Recommended structure
- H1: [Optimized title]
- Intro: Hook the reader, address intent immediately.
- H2: Core solution / main answer
- H2: Step-by-step or list
- H2: Frequently asked questions (optional but recommended)

## 4. Key points to cover
- Point 1
- Point 2
- Point 3

## 5. Tone and Style guidelines
- Professional yet approachable.
- Short sentences and paragraphs (1-3 sentences max).
- No fluff, no long-winded intros.
- Direct, actionable advice.


## Product-led Body Link
* You must include exactly one natural markdown link to the product route in the body text (excluding the finalCta).
* Product Route: `[Insert productRoute here]`
* Anchor Text Plan: `[Describe anchor context, e.g. "Try the AI carousel maker"]`
* Forbidden: Do not claim unsupported features near the link. Do not use `[!product]` or `<InlineProductBlock />`.
