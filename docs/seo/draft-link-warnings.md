# Draft-Link Warnings Report

This document records draft-link warnings found during the SEO URL Inventory Audit (Stage D5). These warnings occur when a draft article links to another draft, which could lead to dead links (404s) if the source article is published before the target.

## Warning 1
* **Source:** `how-to-make-an-instagram-carousel-with-ai.md` (status: `ready_to_publish`, preview: `true`)
* **Target:** `/blog/instagram-carousel-prompts` (mapped to `instagram-carousel-prompts.md`)
* **Target status:** Inactive draft (published: `false`, preview: `false`, noindex: `true`)
* **Risk:** High. If the source is published, the link will point to a 404 page because the target is an inactive draft and not rendered in production.
* **Recommended action:** **Remove link** or **Hold article**. Since the target is an inactive draft, the link should be removed from `how-to-make-an-instagram-carousel-with-ai.md` before it is published, or the source article must remain unpublished until the target is ready.

## Warning 2
* **Source:** `instagram-carousel-ideas.md` (status: `ready_to_publish`, preview: `true`)
* **Target:** `/blog/how-to-make-an-instagram-carousel-with-ai` (mapped to `how-to-make-an-instagram-carousel-with-ai.md`)
* **Target status:** Draft preview (published: `false`, preview: `true`, noindex: `true`)
* **Risk:** Medium. While both are previews and might exist in staging, if the source is published before the target, the link will 404 in production.
* **Recommended action:** **Keep only after target is published**. Both articles should be published in the same wave, or the target must be published first.
