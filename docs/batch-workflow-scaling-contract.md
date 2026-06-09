# Batch Workflow and Scaling Contract

## Batch levels

### Single article test
Use for validating a new pipeline or new template.

### Mini-batch 3–5
Use for first scaled run.
Allowed only after Stages 1–20 are implemented.

### Batch 25
Allowed only after:
* mini-batch passes;
* user approves scaling;
* monitoring/verification workflow is stable.

## Batch states

Use standardized statuses:
* `idea`
* `keyword_pending`
* `scored`
* `brief_ready`
* `draft_preview`
* `qa_pending`
* `visual_qa_pending`
* `ready_for_manual_review`
* `approved_for_publish`
* `publishing`
* `published`
* `live_verified`
* `needs_revision`
* `hold`
* `rejected`
* `refresh_candidate`
* `merge_candidate`

## Mandatory batch gates

Before draft:
* keyword record exists;
* topic score exists;
* product reality exists;
* intent/cluster exists.

Before manual review:
* prepublish checks pass;
* build-render passes;
* visual QA passes;
* preview route verified.

Before publish:
* user explicitly approves;
* approvedForPublish true;
* full checks pass.

After publish:
* deploy finishes;
* live verification passes;
* batch-status updated.

## Failure policy

A failed article goes to:
* `needs_revision`
* `hold`
* `merge_candidate`
* `rejected`

It must not block unrelated clean articles unless the failure affects shared system checks.


## Batch 25 Gate
Batch 25 cannot start immediately after D53 publication. It requires D53 live verification first.
