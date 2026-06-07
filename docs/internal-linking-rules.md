# Internal Linking Rules

## 1. Core Rule
Use ONLY valid, real internal routes starting with `/`. Never hallucinate URLs.

## 2. Cross-Language Prevention
- **EN to EN**: English articles MUST only link to `/blog/...` or English product pages.
- **RU to RU**: Russian articles MUST only link to `/ru/blog/...` or `/ru/...` product pages.
- **Hard failure**: Any link crossing language boundaries (e.g., RU article linking to EN product) is a P0 error.

## 3. Product Route Relevance
Ensure the linked product route matches the article's topic and language.
- EN Carousel article -> `/linkedin-carousel-maker`
- RU Carousel article -> `/ru/generator-karuselej-linkedin`

## 4. Draft & Noindex Safety
- **No linking to drafts**: A published article MUST NOT link to a draft (`published: false`).
- **No linking to noindex**: A published article MUST NOT link to a `noindex: true` page.
- **Orphan prevention**: Every published article should have at least one internal link pointing to it.
