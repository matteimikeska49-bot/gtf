# Landing analytics candidate — independent verification, 30 October 2026

This receipt continues Draft PR #20. The implementation remains exactly
`0b4e345911122d33401c21b05b055a0b137f2062`; this update changes documentation only.
It does not claim traffic recovery or publish private business/reporting data.

## Deployment identity

Read-only checks independently establish that the current production image and
the existing Orqestra approved/deployed source are
`531567bab47692b08e81586d5274553e25375dcc` (PR #19), not PR #20.
Production verification covered 404 committed artifacts: 399 exact byte matches
and five expected legacy aliases resolving to their canonical targets, with zero
fetch errors. The embedded build marker identifies an input revision; it is not
used alone as a deployed-SHA assertion.

## Fresh candidate checks

- `node --test scripts/tests/analytics-consent.test.mjs`: 10/10 PASS.
- `python3 scripts/check-analytics-seo-parity.py --base origin/main`: 204 HTML,
  zero semantic differences.
- `node scripts/check-project-seo-state.mjs`: 195/195 indexable sitemap parity,
  204/204 rendered lifecycle, zero noindex/redirect sitemap hits.
- `node scripts/check-seo-indexation-regression.mjs`: 204 unchanged dispositions,
  zero unintended transitions against `531567b`.
- `node scripts/generate-orqestra-project-seo-state.mjs --check`: valid/current.
- Public and committed-dist analytics bootstraps are byte-identical. Sitemap,
  robots and project manifest remain identical to main. `git diff --check` PASS.
- Four isolated browser journeys: EN/RU on desktop/mobile. No choice, Accept,
  one initial queued Metrica hit, one GA config, SPA, identical replaceState,
  Back, withdrawal, refusal after reload and preserved attribution passed;
  zero page errors. The harness waits for the normal banner/exit animations.

All vendor requests in this new local browser pass were replaced with local
no-op responses. It verifies the application integration and queued calls,
**not** Google native-history transport or reporting-account inclusion. It sent
no diagnostic events to production counters and used no personal browser profile.
The real transport receipt dated 24 October remains historical evidence and is
not relabelled as a new run.

Four separate fresh production browser smoke cases (EN/RU, desktop/mobile)
returned HTTP 200 and the expected canonical without page errors. No optional
analytics script loaded before a choice. These are read-only anonymous visits;
no real registration, checkout or payment was performed. Headless navigation
timings are diagnostic samples and do not certify Core Web Vitals or close the
previously accepted performance risk.

## Handoff and remaining verification

Existing server-side reporting access was verified read-only; the former local
credential-file restriction does not mean those sources are disconnected.
Candidate reporting-account receive and post-release source attribution still
require the actual owner release and subsequent read-only verification.

The candidate intentionally requires a new explicit choice for historical
affirmative values whose provenance is ambiguous (the old RU Learn more action
could write one). This can change the observed population again; restored SPA
views must not be presented as a promise to recover all-visitor session totals.

No new full build is claimed: the implementation and committed dist are unchanged
from the existing candidate; fresh targeted checks above apply to those bytes.
Preserve the prior build/quality receipts and their limitations.

Reuse the existing Draft PR #20. Owner alone reviews CI and decides release.
No CI wait/poll, Ready conversion, merge, deployment, analytics configuration,
source transition, production data mutation or paid provider call was performed.
