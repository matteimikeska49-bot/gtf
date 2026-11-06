# Analytics repair — historical receipt, 23 October 2026

> The current landing-only scope and subsequent PR corrections are documented in [24 October recovery](2026-10-24-landing-analytics-recovery.md). The application/registration blockers below belong to the earlier broader scope; they are not prerequisites for the current landing release.

Based on `matteimikeska49-bot/gtf` main `531567bab47692b08e81586d5274553e25375dcc`, following the 2026-10-23 read-only audit. This is a Draft PR, not deployment or account-side certification.

## Source and deployment boundaries

The landing repository is verified. Its Dockerfile copies committed `dist`; Owner previously confirmed Coolify main-only production deployment and disabled previews in the PR19 release record. This change must stay on a feature branch; no Merge/Deploy or CI waiting is authorized.

The connected GitHub repository inventory, local project inventory and relevant local candidates did not identify the application source. Production app serves its own Express/Vite application and unconditional GTM; its HTML Last-Modified at audit was 2026-10-22. Those observations do not identify its repository, branch, deployment SHA or platform. The Owner has been asked for the exact app repository and read-only deployment identity. No application source, backend, GTM configuration or account settings are modified here. Do not claim that the existing production app now obeys consent.

## Implemented landing behavior

- `gtf_consent_v2` is an explicit choice record: `{version:2,necessary:true,optional:boolean,updatedAt:ISO}`. On production it uses `Domain=gotoflow.io; Path=/; Secure; SameSite=Lax`, with a 180-day expiry. Missing, malformed, future-dated or expired records never grant tracking. The value is a privacy choice, not an authentication credential.
- Both old affirmative formats require a new choice: historical `cookiesAccepted=true` could have meant Learn more, and old structured records contain a fixed date. Old explicit refusal is preserved without inventing a date. Explicit new choices remove old local keys. Cookie-blocked browsers can apply an explicit choice only to the current document, not silently grant it elsewhere.
- Cookie settings reopen the existing banner. RU now has an explicit Reject control. Existing page design/content is otherwise retained; these are the controls required to grant/revoke optional processing.
- Reject/withdrawal sets the shared refusal first, disables GA, destructs Metrica, clears the known analytics cookies and campaign session data, and reloads to unload third-party timers/listeners. Cooperating open documents check the authoritative cookie on focus/visibility/storage and every second. Cross-origin propagation has a maximum polling delay; an already dispatched request cannot be recalled.
- Metrica uses `defer:true` and a single explicit hit owner for initial consented load, pushState, replaceState and popstate. Identical sanitized URLs are deduplicated. GA4 keeps its existing single config and native history pageviews; no manual GA page_view or new conversion is introduced.
- The unmapped custom `seo_page_view` emission is removed from SeoPageRoute. Native GA4/Metrica views cover the route. Existing consent-gated SEO CTA events are unchanged; no GTM mappings/goals are created.
- Campaign keys are limited to `utm_source`, `utm_medium`, `utm_campaign`, `utm_id`, `utm_content`, `utm_term`, with bounded marketing values. Values containing email/URL syntax or long digit strings are rejected. This contract is not permission to put personal data in UTM values.
- Before consent, campaign continuity is current-document memory only. After consent, the accepted campaign can survive internal navigation and reload in sessionStorage and is forwarded to app CTAs. Reject clears it and forwards no marketing campaign. No arbitrary current-page query is copied. Existing normalized business `ref` handling and explicit destination product parameters remain intact.
- Before SDK startup and consented history changes, the address query is restricted to safe UTM, normalized `ref` and `lang=en|ru`. Unknown query fields cannot enter automatic GA4 page URLs. Paths, anchors, canonical and sitemap are unchanged. No page_location override is used, because it suppressed native GA history views during testing.

## Required application companion change — NOT implemented

Once source/deployment are established, the actual app must read the same v2 cookie BEFORE its unconditional GTM/noscript paths, default to no tracking, respect both explicit refusal and missing choice, and apply the same withdrawal lifecycle. Its dataLayer producers must be consent-gated too. Do not simply copy the landing provider loader into app: current GTM resource version 4 already initializes GA4/Metrica on the app host and maps `virtual_page_view` to page_view/hit. Preserve one owner per provider and avoid double initialization.

Integrate settings in the real app, validate its authorized SPA routes, and coordinate deployment of both repositories. The browser test's app page is explicitly a local cookie-contract fixture, not the product or a substitute for its implementation. Existing production app tracking after landing Reject remains a production blocker outside this PR's available source.

## Independent registration reconciliation — superseded scope

The earlier candidate included an offline aggregate comparison helper. It was removed from PR #20 on 24 October because the Owner explicitly excluded registrations from the landing recovery scope. No backend or registration behavior was changed.

## Validation and remaining production work

Validation results and exact artifact checks are recorded below before PR publication. Browser payload/status evidence is separate from account-side report inclusion. Required final checks after Owner-coordinated deployment: both real hosts, saved/missing/rejected/withdrawn consent across open tabs, GA/YM single views for actual app routes, safe campaign attribution, and existing-account vs new-account reporting. No real registration is created by this task. Account-side receipt, historical comparison and app integration remain BLOCKED rather than PASS.

### Completed candidate checks

- Existing focused consent test file updated for the new contract: **8/8 unit tests PASS**, including legacy refusal/affirmative migration, dated v2 choice, shared-cookie revocation, deduplicated route hits, campaign filtering and aggregate-only reconciliation.
- Final single full browser run: **6/6 scenarios PASS**, isolated Chrome for Testing, production hostname requests intercepted to the local candidate. EN/RU acceptance flows each produced four GA4 pageviews corresponding to initial load, SPA, fresh return from the app fixture, and reload, with HTTP 204 observed on initial and fresh-document loads; no token/email query in those URLs. The two batched SPA collect requests had payload evidence but no final HTTP status before navigation to the fixture: their transport completion remains UNKNOWN, not PASS. No extra initial GA pageview was observed. Scripts returned HTTP 200. Actual Metrica view payloads were observed, including SPA hits. Withdrawn/rejected documents sent no further optional requests in the observation interval and removed analytics cookies.
- Real CTA click preserved accepted whitelist UTM and shared choice into the **fixture**. This is not a product-app E2E PASS. A fixture refusal also stopped the cooperating landing document.
- Targeted ESLint and `git diff --check`: **PASS**.
- `npm run build`, full prerender, date checks and project SEO-state contract: **PASS**. Contract reported indexable sitemap parity 195/195 and lifecycle parity 204/204.
- `python3 scripts/check-analytics-seo-parity.py --base 531567bab47692b08e81586d5274553e25375dcc`: **204 HTML documents, zero semantic differences**, retaining metadata, structured data, content, links and structure, excluding executable scripts and versioned build asset URLs. `dist/sitemap.xml` is byte-unchanged.
- Committed dist is rebuilt because production copies dist. Numerous generated HTML/JS asset references change; this is not an SEO/content edit. The build marker identifies the input base/branch, not a claim that this candidate was deployed.

Browser evidence is written locally to `tmp/analytics-qa/consent-repair.json` and deliberately not committed with transient visitor/session IDs. Google CDP also reports ERR_ABORTED after observed HTTP 204; network response and payload evidence are retained separately from account inclusion. Account-side receive/goals, real app integration, app deployment identity and actual backend/analytics registration counts: **BLOCKED**. No CI waiting, Merge or Deploy performed.
