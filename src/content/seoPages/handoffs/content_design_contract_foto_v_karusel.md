# Content Design Contract: foto v karusel

Status: local noindex draft preview.
Renderer: CarouselProductSeoPageTemplate.
Canonical draft route: `/ru/use-cases/foto-v-karusel`.

## Intent

Own only the product use-case intent:

- create a carousel from user photos;
- create a carousel from images;
- create a carousel from screenshots;
- add text structure, visual logic, and CTA around photo material.

Do not own:

- seamless carousel / panoramic continuation;
- manual panorama slicing;
- generic AI carousel generator;
- Instagram carousel generator;
- carousel templates;
- carousel prompts.

## Product Truth

Confirmed source:

- `docs/product/gotoflow-capabilities.md` section 2.1 lists images, screenshots, and user photos as supported input capabilities.
- `src/content/seoPages/productTruthRegistry.js` mirrors those inputs for SEO Product Pages.

Allowed positioning:

GoToFlow can use photos, images, or screenshots as source material and help turn them into a carousel workflow: structure, slide copy, visual direction, CTA, and ready slides for manual review and download.

Forbidden positioning:

Do not promise automatic social publishing, guaranteed performance, automatic panorama slicing, or rights-safe use of any third-party image without user review.

## Owner Boundaries

- `/ru/use-cases/foto-v-karusel`: photo/image/screenshot input to carousel.
- `/ru/use-cases/besshovnaya-karusel-instagram`: seamless visual continuation.
- `/ru/generator-karuselej-instagram`: broad Instagram carousel creation.
- `/ru/ii-generator-karuseley`: broad AI carousel generator.
- `/ru/templates/instagram-carousel`: template selection.
- `/ru/prompts/instagram-carousel`: prompt/instruction intent.
