# GoToFlow SEO Content Plan

## 1. Purpose

Это не просто список тем, а **content inventory / topic map**, созданный для предотвращения:
- хаотичной генерации статей;
- дублей;
- keyword cannibalization;
- слабых статей без intent;
- случайных публикаций без QA.

## 2. Content lifecycle

Статусы статьи в процессе производства:

- `idea`
- `research`
- `brief`
- `draft`
- `markdown`
- `preview`
- `content QA`
- `ready to publish`
- `published`
- `needs update`
- `archived`
- `merged / redirected`

## 3. Priority levels

- **P0** — critical cluster / product-led / high intent
- **P1** — important supporting articles
- **P2** — long-tail scale
- **P3** — experimental / low priority

## 4. Article types

- `guide`
- `how-to`
- `prompt-library`
- `comparison`
- `best-tools`
- `ideas`
- `examples`
- `checklist`
- `alternatives`
- `use-case`
- `pillar`

## 5. Core clusters

Начальная карта кластеров.

### Cluster: AI Carousel Maker
**Product pages:**
- `/ai-carousel-maker`

**Possible articles:**
- AI carousel maker vs manual design
- Best AI carousel generators
- How to create a carousel with AI
- AI carousel maker for small business
- AI carousel maker for agencies
- AI carousel maker vs Canva workflow

### Cluster: LinkedIn Carousel
**Product pages:**
- `/linkedin-carousel-maker`

**Existing / draft / planned articles:**
- linkedin-carousel-prompts
- repurpose-blog-post-linkedin-carousel-ai
- how-to-make-linkedin-carousel-with-ai
- linkedin-carousel-ideas
- LinkedIn carousel examples
- LinkedIn carousel hook formulas
- LinkedIn carousel prompt library

### Cluster: Instagram Carousel
**Product pages:**
- `/ai-instagram-post-generator`
- `/ai-carousel-maker`

**Existing / draft / planned articles:**
- ai-instagram-carousel-generator
- instagram-carousel-prompts
- Instagram carousel ideas
- Instagram carousel examples
- Instagram carousel for small business
- Instagram carousel hook prompts

### Cluster: AI Content Generator
**Product pages:**
- `/ai-content-generator`

**Possible articles:**
- AI content generator for social media
- How to repurpose content with AI
- Blog post to social media content
- AI content workflow for creators
- AI content generator vs manual content planning

### Cluster: Content Repurposing
**Product pages:**
- `/ai-content-generator`
- `/ai-carousel-maker`
- `/linkedin-carousel-maker`

**Possible articles:**
- repurpose blog post into LinkedIn carousel
- repurpose YouTube video into carousel
- repurpose podcast into social posts
- turn long-form content into carousel
- content repurposing workflow with AI

### Cluster: Creator / Small Business Workflows
**Product pages:**
- `/ai-carousel-maker`
- `/ai-content-generator`

**Possible articles:**
- content workflow for solo founders
- weekly content system for creators
- social content calendar with AI
- carousel workflow for consultants
- AI content prompts for small businesses

## 6. EN/RU note

RU topics should be planned separately from EN topics.
Use /ru/blog architecture.
Do not mark RU articles as translations unless intent matches.
Track language and localizationType in table.

**RU articles are not literal translations.**
RU should be a local adaptation based on:
- RU search intent;
- RU social platforms;
- RU terminology;
- RU examples;
- RU CTA;
- RU product routes;
- RU sitemap/hreflang when implemented.

*Do not publish RU articles until RU architecture is decided.*

## 7. Tracking table format

**For batch execution, use:**
`docs/seo-batch-manager.md`

| Batch ID | Cluster | Topic | Primary keyword | Language | Localization type | Source article | Article type | Priority | Intent | Funnel stage | Status | Slug | Existing URL | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| BATCH-TBD | LinkedIn Carousel | LinkedIn Carousel Prompts | linkedin carousel prompts | en | original | - | prompt-library | P0 | finding templates | BOFU | published | linkedin-carousel-prompts | /blog/linkedin-carousel-prompts | markdown article |
| BATCH-TBD | Content Repurposing | Repurpose Blog to LinkedIn | repurpose blog post linkedin carousel | en | original | - | how-to | P1 | repurposing workflow | MOFU | draft | repurpose-blog-post-linkedin-carousel-ai | needs verification | pending QA |
| BATCH-TBD | Instagram Carousel | Instagram Carousel Prompts | instagram carousel prompts | en | original | - | prompt-library | P1 | finding templates | BOFU | draft | instagram-carousel-prompts | needs verification | pending QA |
| BATCH-TBD | AI Carousel Maker | AI vs Manual Design | ai carousel maker vs manual design | en | original | - | comparison | P1 | comparing tools vs canva | MOFU | draft | ai-carousel-maker-vs-manual-design | needs verification | pending QA |
| BATCH-TBD | Instagram Carousel | AI Instagram Carousel Generator | ai instagram carousel generator | en | original | - | guide | P0 | informational / product | BOFU | published | ai-instagram-carousel-generator | /blog/ai-instagram-carousel-generator | legacy JSX |
| BATCH-TBD | AI Carousel Maker | Best AI Carousel Generators | best ai carousel generators | en | original | - | best-tools | P0 | evaluating software | BOFU | published | best-ai-carousel-generators | /blog/best-ai-carousel-generators | legacy JSX |
| BATCH-TBD | LinkedIn Carousel | How to Make LinkedIn Carousel with AI | how to make linkedin carousel with ai | en | original | - | how-to | P0 | learning the process | MOFU | published | how-to-make-linkedin-carousel-with-ai | /blog/how-to-make-linkedin-carousel-with-ai | legacy JSX |
| SEO-RU-BATCH-01 | AI Carousel Maker | Нейросеть для создания каруселей | нейросеть для создания каруселей | ru | adaptation | best-ai-carousel-generators | best-tools | P0 | tools & alternatives | BOFU | brief-draft | nejroset-dlya-sozdaniya-karuselej | needs verification | Stage 4G: RU batch |
| SEO-RU-BATCH-01 | Instagram Carousel | Как сделать карусель для Инстаграм с помощью ИИ | как сделать карусель для инстаграм | ru | adaptation | ai-instagram-carousel-generator | how-to | P0 | practical how-to | MOFU | draft | kak-sdelat-karusel-dlya-instagram-s-ii | needs verification | Stage 4K: First Real RU SEO Markdown Draft created, not published |
| SEO-RU-BATCH-01 | Instagram Carousel | Идеи для каруселей в Инстаграм | идеи для каруселей инстаграм | ru | original | - | ideas | P1 | content formats | TOFU/MOFU | brief-draft | idei-dlya-karuselej-v-instagram | needs verification | Stage 4G: RU batch |
| SEO-RU-BATCH-01 | Content Repurposing | Как из текста сделать карусель | текст в карусель | ru | original | - | guide | P0 | repurposing workflow | MOFU/BOFU | brief-draft | kak-iz-teksta-sdelat-karusel-dlya-socsetej | needs verification | Stage 4G: RU batch |
| SEO-RU-BATCH-01 | AI Carousel Maker | Промпты для каруселей | промпты для каруселей | ru | original | - | prompt-library | P1 | finding templates | MOFU | brief-draft | prompty-dlya-karuselej | needs verification | Stage 4G: RU batch |

*Если статус неизвестен — писать “needs verification”, не выдумывать.*

## 8. Anti-cannibalization rule

Before creating a new article, check if another article already targets:
- same primary keyword;
- same slug;
- same search intent;
- same cluster + same funnel stage.

If overlap exists:
- merge;
- differentiate angle;
- make one article pillar and another supporting;
- or do not create the article.

## Anti-Cannibalization
Refer to `docs/seo-batch-manager.md` and run `npm run check:blog` to ensure no duplicate intents or keywords.
