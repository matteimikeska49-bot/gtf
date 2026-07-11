# GoToFlow SEO Page Design and Content Contract
Date: 2026-07-10 (updated)

## 1. Objective
Establish a formal design and content contract for the GoToFlow SEO Pages Engine. This document outlines the hierarchy, required visual blocks, content rules, and official SEO quality principles for commercial and template SEO pages.

## 2. Mandatory Existing-Page Reference Hierarchy
Before creating or modifying any SEO page, inspect these references in order:
1. **Homepage (`/ru`)**: Primary commercial design source — shell, typography, gradients, CTA patterns, spacing.
2. **Strong Product/SEO Page (e.g., `/ru/ii-generator-karuseley`)**: Read-only reference for visual density, section variety, real assets, comparison layout, workflow patterns.
3. **Article Template**: Read-only reference for readable body width, heading hierarchy, anchor navigation, FAQ layout.
4. **Gemini Concept**: Template-specific visual logic — preview systems, slide stacks, category gallery.

## 3. Reuse-Before-Create Rule
Before creating a new component:
- Check if an existing generic component already solves the requirement (`reuse_as_is`)
- Check if an existing SEO Engine component can be extended (`extend_existing_seo_engine_component`)
- Only if both fail, reproduce the visual pattern inside SEO Engine (`recreate_pattern_inside_seo_engine`)
- Mark as `do_not_reuse` if component is semantically incompatible or contains unsupported claims

## 4. Product Positioning: Full Carousel, Not Draft
GoToFlow creates **complete, ready-to-use** carousels from zero to finished result.
- **Banned Language**: "Черновик" (draft), "первый черновик", "подготовить черновик", "незавершённый результат"
- **Approved Language**: "Готовая карусель", "Готовый результат", "Готовая структура и текст", "Готовые слайды с текстом, визуальной подачей и CTA"
- **Acceptable**: "Перед публикацией результат можно проверить и отредактировать"
- **Rationale**: Emphasizing "drafts" undervalues the product. Users search for templates to get a finished output.

## 5. People-First and Intent-First Content
Every page must:
- Serve a clear real user intent with a defined `primaryIntent`
- Provide standalone value beyond keyword substitution
- Contain original page-specific examples
- Define: `primaryIntent`, `userExpectedOutcome`, `whySeparateUrl`, `differenceFromExistingPages`

### No Scaled Duplicate Pages
Do NOT allow:
- New pages created only by changing a platform name
- Nearly identical content across pages
- Mass-produced pages with only the keyword changed

## 6. Visible and Rendered Content Rule
Important SEO content must be present in final rendered HTML:
- title, description, canonical, robots, H1, H2/H3, body copy, FAQ, schema
- Do NOT hide critical content behind hover, canvas, or JS-only modals

## 7. Crawlable Link Rule
All internal navigation must use real crawlable `<a>` elements with valid `href` targets.
- Target must exist and be in the correct locale
- No self-links, no duplicate hrefs, no raw route paths as visible titles
- No JavaScript-only navigation where a normal link is appropriate

## 8. Schema Must Match Visible Content
- Allowed: Organization, WebSite, WebPage, WebApplication, BreadcrumbList, FAQPage
- Forbidden on non-blog pages: Article, BlogPosting, NewsArticle
- Visible FAQ and FAQPage schema data must match exactly
- No fake ratings, reviews, prices, or hidden FAQ in schema

## 9. Mobile Quality Rule
- No page-level horizontal overflow
- Previews readable on mobile (around 390px)
- Buttons have usable tap targets
- Horizontal galleries support touch and scroll-snap
- No critical content depends only on hover

## 10. Quick Answer Rule
- Must answer the primary search intent directly
- Must contain page-specific text stored in data
- Generic reusable component with contextual link support
- Move secondary information (e.g., carousel sizes) to supporting content or FAQ

## 11. Heading Accent Rule
- Use existing GoToFlow pink/orange gradient emphasis on 4-6 important headings per page
- Do NOT make every heading gradient
- Accent only the key phrase within the heading
- Implement through data-driven segments or generic accent API, not hardcoded platform JSX

## 12. Visual Asset Rule
- Every informative visual requires: local path or structured data source, responsive behavior, meaningful alt text
- Do NOT use grey skeleton lines as final public output
- Reuse approved real carousel assets where appropriate (from `/images/niches/ru/`)
- Create high-quality SVG/React visuals when images are insufficient

## 13. Output-Specific Visual Rule
The primary visual output must depend on: `pageType` + `templateVariant` + `primaryIntent`
- Template Instagram: carousel templates and completed carousels
- Telegram: Telegram post previews and formats
- LinkedIn: professional document/post previews
- Prompt page: prompts and prompt-to-result examples

## 14. Ready Carousel Showcase Rule
- Place near the end: FAQ → Related → Ready Carousel Showcase → Final CTA
- Show 5-6 visually distinct items with real approved assets
- Each item requires: image, title, type badge, audience tag, use-case description, valid CTA
- No fake engagement or social proof

## 15. FAQ Intent-Dependent Rule
- FAQ count and topics must match the specific page intent (not a fixed global count)
- 8-12 genuinely useful questions for template pages
- Questions must cover: what the template is, how to choose, available formats, practical usage
- Visible FAQ must match FAQPage schema exactly

## 16. Visual and Content Blocks (`template_page` variant)

The `template_page` variant defines a strict deterministic master order (`supportedSections`) for its sections. Some sections are mandatory (`requiredSections`) across all template pages, while others are contextual (`optionalSections`) and only rendered when explicitly declared and populated.

Every `template_page` must declare `templateSections` containing at least the mandatory sections. Validation rejects unknown sections, duplicates, and missing mandatory sections.
### 16.1 SeoQuickAnswer
- Answers the primary search intent immediately
- Contains contextual link to supporting content (e.g., size guide)

### 16.2 SeoPageAnchorNav
- Sticky navigation with human-readable labels (not "FAQ")
- Smooth scroll navigation

### 16.3 Template Categories
- Visually distinct abstract previews per category (not identical grey cards)
- Mobile horizontal scroll with snap

### 16.4 Examples Gallery (Optional)
- Contextual section for showcasing concrete niche templates or case-style examples.
- Distinct color schemes per example
- Slide-stack mockups showing cover + inner slides
- Hover CTA overlay
- When omitted from `page.templateSections`, the validation suite safely skips examples-specific data checks.

### 16.5 Product Workflow Showcase
- Use `SeoProductWorkflowShowcase` for relevant product/workflow pages.
- The first supported preset is `carousel_creation`.
- The block replaces the old 3-step `howToUse` workflow on completed carousel-related production pages.
- `howToUse` remains only as a fallback for planning/quarantined records without `productWorkflow`.
- Do not render both `productWorkflow` and legacy `howToUse` on the same page.

### 16.6 Ready Carousel Showcase
- Real carousel images from approved assets
- Type badges and audience tags
- Section-level CTA

### 16.7 FAQ
- Accordion with gradient-accented heading

### 16.8 Final CTA
- Gradient accent heading: "Выберите шаблон и создайте готовую карусель"
- Product bridge text emphasizing complete carousel, not draft

## 17. Old System Protection
The SEO Publishing Platform (articles, blog) is completely immutable. Do NOT modify:
- `src/content/blog/`, article prompts/checkers/workflow/routing/schema
- Old production SEO/product pages
- Protected routes

## 18. Technical Indexation Lifecycle
- `noindex_review`: routable for review, robots noindex, absent from sitemap
- `indexable_approved`: requires content, visual, and rendered HTML approval
- Current template page remains `noindex_review` until human approval

## 19. No Placeholder Rule
Grey skeleton lines, empty cards, and abstract wireframes are NOT acceptable as final public visuals. Every category, example, and showcase item must communicate real content through text, images, or structured visual components.

## 20. Validation
- Pages must pass full content readiness checks (`npm run check:seo`)
- All `noindex_review` pages must remain `noindex: true` and `sitemapEligible: false`
- No ranking or indexing promises in code, data, or UI

## 21. Product Workflow Showcase Contract

### 21.1 Purpose
`SeoProductWorkflowShowcase` is the shared SEO Pages Engine block for explaining a real GoToFlow product workflow as visible HTML text plus replaceable visual mockups.

It is not a blog component, not a one-off Instagram component, and not a raw prototype import.

### 21.2 `carousel_creation` Preset
The preset lives in `src/content/seoPages/workflowPresets.js` and defines the fixed logical order:

1. carousel type selection
2. source material and structure selection
3. text generation and review
4. visual settings for the selected type
5. editor and complete carousel result

Product-truth constraints:

- carousel type selection comes before source material
- source material and structure come before text review
- generated text/review comes before visual generation
- AI and template settings are represented
- seamless and animated carousel types remain visible with truthful availability
- the outcome is a complete carousel, not only a draft
- manual editing remains visible and explicit
- no public `ACTIVE`, `MVP`, `BETA`, `COMING SOON`, token pricing, fake metrics, fake reviews, or unsupported automation claims

`carousel_creation` also defines structured `carouselTypes`:

- `id`
- `label`
- `availability`: `available` or `coming_soon`

Future SEO pages may override carousel type labels and availability through page data. Do not hardcode carousel type names inside the shared component.

### 21.3 Page-Specific Fields
Every page using the block must explicitly define:

- `productWorkflow.preset`
- `productWorkflow.eyebrow`
- `productWorkflow.title.before`
- `productWorkflow.title.accent`
- `productWorkflow.title.after` when needed
- `productWorkflow.description`
- `productWorkflow.stepOverrides`
- optional `productWorkflow.carouselTypes`
- `productWorkflow.mockups`
- `productWorkflow.featureChips`
- `productWorkflow.cta`
- optional `productWorkflow.contextLabel`

Do not generate the visible H2 by blindly replacing a keyword. The heading must be written for the page intent. Only the `title.accent` phrase receives the pink/orange accent.

### 21.4 Mockup Replacement Contract
Each mockup can use either a structured fallback visual or a local image:

- `id`
- `title`
- `caption`
- `image`
- `alt`
- `objectPosition`
- `aspectRatio`
- `decorative`
- `fallbackVisualType`

Images must live under a local public asset path such as `/images/seo-workflow/` or an approved existing image folder. Informative images require useful alt text. Decorative images must set `decorative: true`.

Do not store JSX, raw HTML, or React components in page data.

### 21.5 Current Page Configuration
`/ru/templates/instagram-carousel` uses:

- `preset: "carousel_creation"`
- eyebrow: `ШАБЛОНЫ КАРУСЕЛЕЙ`
- H2: `Как создать карусель по шаблону в GoToFlow`
- accent phrase: `по шаблону`
- CTA: `Создать карусель в GoToFlow`
- CTA target: `/ru/generator-karuselej-instagram`
- final CTA eyebrow: `ГОТОВЫЙ РЕЗУЛЬТАТ`
- final CTA title: `Выберите структуру и создайте готовую карусель`
- final CTA accent: `готовую карусель`
- final CTA button: `Создать карусель в GoToFlow`
- final CTA target: `/ru/generator-karuselej-instagram`
- showcase CTA button: `Выбрать структуру и создать карусель`

The page remains:

- `state: noindex_review`
- `noindex: true`
- `sitemapEligible: false`
- `indexationApproved: false`

### 21.5.1 Page-Specific Final CTA Contract
The final CTA is page-specific content, not a universal shared heading. It must match:

- the page intent
- the page entity or platform
- the intended product action
- the actual destination route
- real GoToFlow capability

Production-ready pages must define:

- `finalCta.eyebrow`
- `finalCta.title.before`
- `finalCta.title.accent`
- `finalCta.title.after` when needed
- `finalCta.description`
- `finalCta.primaryAction.label`
- `finalCta.primaryAction.href`

The final CTA primary href must be an approved internal route. Do not use raw HTML, JSX, placeholder text, unsupported automation claims, duplicate secondary button labels, or `черновик` wording in final CTA copy.

The ready-carousel showcase CTA is a separate contract. It connects the example gallery to the creation flow; it must not become identical to the final CTA, whose role is to close the whole page and state the final outcome.

For `template_page`, the real-result showcase follows the product workflow directly:

1. hero
2. quick answer
3. template categories
4. optional examples
5. template-choice guide
6. product workflow
7. ready-carousel showcase
8. FAQ
9. related materials
10. final CTA

This keeps the narrative order: structure -> process -> interface -> result -> action -> FAQ -> related content -> final CTA. FAQ and related materials are secondary after the product proof sequence.

The workflow CTA strip may be omitted when the next section is a configured ready-carousel showcase with its own CTA. Do not render two consecutive CTA blocks between workflow and showcase. The final CTA remains page-specific and mandatory.

Variant guidance:

- `template_page`: select a structure or template mode and create the relevant finished result
- `commercial_tool`: generate or create the tool output
- `platform_page`: produce content for the named platform
- `prompt_page`: use the prompt to generate the intended result
- `example_page`: create the user's own version from the example
- `use_case_page`: name the use case and concrete outcome
- `alternative_page`: position GoToFlow honestly as an alternative without unsupported comparison claims

### 21.6 Validation Rules
Production readiness validation checks:

- valid workflow preset
- non-empty eyebrow and page-specific H2 parts
- highlighted phrase is present in the title
- non-empty description
- exactly five `carousel_creation` steps
- unique step ids
- non-empty step titles and descriptions
- at least two `carousel_creation` carousel types
- unique carousel type ids and labels
- valid carousel type availability: `available` or `coming_soon`
- unavailable carousel types must not be presented as active
- exactly four `carousel_creation` mockups
- unique mockup ids
- non-empty mockup titles and captions
- valid local image path format when supplied
- existing image assets during content-readiness checks
- alt text for informative images
- explicit structured final CTA for production-ready pages
- final CTA title completeness and accent containment
- final CTA description and primary action completeness
- final CTA primary href points to an approved internal route
- final CTA contains no placeholder copy, raw HTML/JSX, duplicate secondary action label, or `черновик` outcome wording
- optional ready-carousel showcase CTA remains distinct from the final CTA
- `template_page` deterministic order places `readyCarouselShowcase` after `productWorkflow` and before FAQ/related materials
- `productWorkflow.cta` may be omitted only when an immediately following ready-carousel showcase provides a configured CTA
- non-empty feature chips
- no more than 8 `carousel_creation` feature chips
- valid CTA label, href, and supporting note
- CTA target validity through the normal SEO checker context
- no placeholder href
- no draft-oriented main outcome
- no public internal product statuses or token pricing
- no raw HTML/JSX in page data

### 21.7 Responsive And Accessibility Rules
Desktop layout:

- top heading and lead
- left five-step lightweight vertical timeline
- right 2x2 mockup grid
- compact feature chips
- unified CTA strip

Tablet/mobile layout:

- workflow and mockups stack without horizontal overflow
- mockup text remains readable around 390px width
- CTA is full-width on mobile
- no critical content depends on hover

Accessibility:

- section has one visible H2
- step/mockup headings are visible text
- step titles use strong near-white text and must remain visually dominant over descriptions
- step descriptions use readable secondary gray text and must not compete with titles
- workflow steps are timeline entries, not large bordered cards
- feature chips are secondary informational labels, not CTA-like controls
- mockup captions are readable but quieter than primary step and mockup titles
- icons are decorative
- CTA is a real crawlable link
- informative images have useful alt text
- focus states remain visible

### 21.8 No-Overload Rule
Use the block to demonstrate the workflow, not to reproduce the entire app:

- include five steps
- include four mockups
- show carousel type selection in the first mockup when the page uses `carousel_creation`
- keep chips controlled to one or two compact rows
- keep `carousel_creation` chips to 8 or fewer items
- use one CTA strip
- do not list every control, every toggle, every template, or every editor setting
