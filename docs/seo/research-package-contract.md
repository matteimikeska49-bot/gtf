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

Batch command:

```bash
npm run check:blog:batch-readiness
```

The batch readiness report returns `canProceed`, blockers, warnings, ready topics, blocked topics, and human-review items. A future batch should not start when `canProceed` is false.
