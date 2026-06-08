# Publish / Live Verification Contract

This document defines the strict workflow, state transitions, and verification requirements for publishing GoToFlow SEO articles to production.

## Publish approval rule

No article can be published unless the user explicitly approves. An automated agent cannot switch an article from draft to published on its own initiative without user permission.

## State transition

**Draft state:**
```json
"published": false,
"noindex": true,
"preview": true,
"approvedForPublish": false
```

**Approved publish state:**
```json
"published": true,
"noindex": false,
"preview": false,
"approvedForPublish": true
```

## Required pre-publish checks

Before commit/push of a newly approved article, the following local checks MUST be run and pass:
* `npm run check:blog:prepublish`
* `npm run check:blog:full`

## Required post-deploy checks

After the deployment has completed, live verification is mandatory. The live checker (`npm run check:blog:live-verification`) must verify the following on production:
* live HTTP 200
* canonical correct
* robots indexable for published article
* title/meta present
* Article schema present
* FAQ schema present if FAQ exists
* sitemap includes published URL
* blog index includes published URL
* raw artifacts absent
* noindex absent for published article

For drafts (D53), they must be verified as NOT in the live sitemap and NOT in the live blog index.

## Verification record

`batch-status.json` should track the verification lifecycle for each article:
* `productionVerificationStatus`: 'pending', 'verified', 'failed'
* `productionVerifiedAt`: ISO date string when verification passed
* `productionVerificationCommit`: Git hash at the time of verification
* `productionUrl`: The live URL
* `verificationReportId`: if available
* `reverificationRequired`: boolean
* `reverificationReason`: string explanation if needed
