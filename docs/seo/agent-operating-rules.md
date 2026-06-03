# Agent Operating Rules

Purpose: Prevent repeating the same failures during SEO publishing and platform development.

1. **Do not optimize for green QA by reducing semantic relevance.**
   Example: If a relevant link fails the checker but the production route returns 200, do not replace it with a less relevant link just to pass the checker. Fix or check the route inventory instead.

2. **Content tasks do not allow system edits.**
   If a content task requires changing scripts, helpers, prerender, routing, package.json, checkers, or CI logic, STOP and report the root cause unless system edits are explicitly approved in the current prompt.

3. **Draft-preview acceptance criteria:**
   A draft-preview page must:
   - return 200 by direct URL;
   - contain noindex in raw HTML;
   - be absent from sitemap;
   - be absent from blog index.
   **404 is FAIL.** If a draft-preview page returns 404 on the preview or production environment, it is considered a build/routing failure, not "SEO safe".

4. **QA PASS is not enough.**
   The stage goal must be met AND QA must pass.

5. **If QA fails outside approved scope:**
   STOP → generate a root cause report → ask for approval. Do not silently patch scripts, helpers, or checkers without explicit permission.

6. **Product SEO candidates:**
   Do not convert product-intent candidates into blog articles if they overlap existing product/tool routes. Mark them as `optimize_existing_route` or `hold`.

7. **System changes require explicit approval:**
   System changes require explicit separate approval unless the current prompt explicitly approves them.
