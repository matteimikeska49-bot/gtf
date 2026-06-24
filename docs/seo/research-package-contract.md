# Research Package Contract

Before a new SEO article is drafted, the topic must have a research package. The package can be explicit in a brief or derived from the existing demand/topic maps, but the required fields must be present.

Required fields:

```yaml
topicId:
targetSlug:
language:
primaryKeyword:
secondaryKeywords:
demandEvidence:
exactVolumeKnown:
sourceFiles:
score:
priorityTier:
searchIntent:
intentOwner:
clusterId:
articleRole:
cannibalizationRisk:
cannibalizationDecision:
productAngle:
productCapabilityIds:
mockupRequired:
mockupSlots:
internalLinks:
competitorContext:
serpRefreshNeeded:
briefPath:
approvedByUser:
approvalStatus:
intakeSource:
topicMapPresent:
draftReady:
publishReady:
canProceedToDraft:
canProceedToPublish:
publishBlockers:
```

Gate command:

```bash
npm run check:blog:research-package
```

Rules:

- Missing keyword, score, intent, cluster, product angle, product capability decision, mockup decision, or brief blocks active batch topics.
- `exactVolumeKnown: false` is allowed only when the package honestly marks demand as weak or needing refresh.
- `cannibalizationRisk: high` blocks the topic unless the product route owns the intent and the article is explicitly supporting.
- Published legacy articles may be backfilled for hygiene, but backfill records do not approve a new batch expansion by themselves.
- User approval must be represented by `approvalStatus`, `approvedByUser`, or an equivalent approved brief/batch-status field before drafting.
- `ru-wave-1-topic-plan` is an intake source for draft/brief readiness only. It can support `draftReady: true`, but it is not the publish source of truth.
- `topic-map.json` is required for `publishReady: true`. If `topicMapPresent: false`, the report must keep `publishReady: false` and include `missing topic-map entry` in `publishBlockers`.
- `draftReady` and `publishReady` are separate states. `canProceedToDraft` means the brief/draft package is usable; `canProceedToPublish` means the topic is represented in `topic-map.json` and all publish checks pass.

Batch command:

```bash
npm run check:blog:batch-readiness
```

The batch readiness report returns `canProceed`, `canProceedToDraft`, `canProceedToPublish`, draft-ready topics, publish-ready topics, publish-blocked topics, blockers, publish blockers, warnings, and human-review items.

`canProceed` is a backward-compatible alias for `canProceedToDraft`. Publish flows must use only `canProceedToPublish`.
