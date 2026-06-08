# Intent Ownership & Cluster Architecture

To prevent keyword cannibalization and create strong topical authority, every GoToFlow article must fit into our defined intent and cluster architecture. 

## 1. Intent Ownership (`intent-map.json`)
Every significant search intent (e.g., "how to make a LinkedIn carousel") can only be "owned" by **one** page. 

- **Owner**: The primary article meant to rank for the core search volume.
- **Supporting**: Articles that target long-tail variations, specific niches, or related questions (e.g., "b2b linkedin carousel examples").
- **Merge / Update**: If a new topic directly overlaps with an existing Owner's intent, do NOT create a new article. Update the existing one instead.

## 2. Cluster Authority Map (`cluster-authority-map.json`)
We organize articles into topical clusters. Every cluster must be tied to a specific Product Route (e.g., `/linkedin-carousel-maker`). 

- **Hub Article**: The pillar page of the cluster. Usually the highest volume owner.
- **Supporting Articles**: Topic clusters linked to the hub.

### Article Roles
- `hub`: Central pillar page.
- `supporting`: Any child page in the cluster.
- `comparison`: "X vs Y" pages.
- `prompt`: Prompt libraries.
- `examples`: Visual teardowns or inspiration.
- `product-led-how-to`: Direct product tutorials mapping to intent.

### Internal Linking Rules
1. Every supporting article MUST link up to its Hub.
2. Every article MUST link to its Cluster's Product Route.
3. Cross-language links are strictly forbidden.

## Workflow
1. Topic is approved.
2. Verify no intent conflict in `intent-map.json`.
3. Assign Owner/Supporting role and Hub link in `cluster-authority-map.json`.
4. Proceed to Brief Generation.
