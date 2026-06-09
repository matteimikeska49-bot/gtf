# Batch Operations Playbook

## How to prepare mini-batch

1. Choose 3–5 topics from priority score.
2. Confirm keyword/intent/cluster/product capability.
3. Create/update briefs.
4. Generate drafts as noindex preview.
5. Run:
   * `npm run check:blog:prepublish`
   * `npm run check:blog:build-render`
   * `npm run check:blog:preview-routes`
   * `npm run check:blog:visual`

## How to request manual review

* Provide verified preview URLs only.
* Include checklist:
  * desktop;
  * mobile;
  * hero;
  * Quick Answer;
  * body;
  * CTA;
  * FAQ;
  * visual/mocks;
  * language;
  * product fit.

## How to publish approved wave

1. Only approved articles.
2. Switch states.
3. Run:
   * `npm run check:blog:full`
4. Commit/push.
5. Wait deploy.
6. Run:
   * `npm run check:blog:live-verification`
7. Update production verification status.

## How to handle failures

* revise;
* hold;
* merge;
* reject;
* do not silently publish.


## Batch 25 Gate
Batch 25 cannot start immediately after D53 publication. It requires D53 live verification first.
