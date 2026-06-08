# Draft & Noindex Safety Contract

This document defines the strict safety rules for publishing vs. drafts.

## Draft state
Required for all new/unapproved content:
* `published: false`
* `noindex: true`
* `preview: true`
* `approvedForPublish: false`

## Publish state
Allowed only after explicit approval:
* `published: true`
* `noindex: false`
* `preview: false`
* `approvedForPublish: true`

## Forbidden states
Hard-forbidden combinations and risks:
* `published: false` + `noindex: false`
* `preview: true` + `noindex: false`
* `approvedForPublish: false` + `published: true`
* Draft URL included in `sitemap.xml`
* Draft URL appearing in public blog index
* Published article linking to draft/noindex route
* Draft linked from public related/explore zones

## Publishing rule
No article can publish unless:
* The user explicitly approves it.
* `batch-status.json` agrees with the frontmatter.
* Frontmatter agrees.
* All checker scripts pass.
* Live verification runs only after deploy.
