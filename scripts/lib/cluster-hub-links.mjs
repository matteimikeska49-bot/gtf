import { PUBLIC_ORIGIN, normalizeRoutePath } from './project-seo-state.mjs';

export function renderedHrefPaths(html) {
  return new Set([...html.matchAll(/<a\b[^>]*\bhref\s*=\s*["']([^"']+)["']/gi)]
    .flatMap((match) => {
      try {
        const url = new URL(match[1].replaceAll('&amp;', '&'), PUBLIC_ORIGIN);
        return url.origin === PUBLIC_ORIGIN ? [normalizeRoutePath(url.pathname)] : [];
      } catch {
        return [];
      }
    }));
}

// Explicit rules and advisory declared hubs remain distinct. No rule is invented
// for a cluster whose current configuration does not require a hub link.
export function auditClusterHubLinks({ clusters, state, readHtml, includeDeclared = false }) {
  const findings = [];
  let checked = 0;
  for (const cluster of clusters) {
    const required = cluster.internalLinkingRules?.mustLinkToHub === true;
    if (!required && !includeDeclared) continue;
    if (!cluster.hubSlug) continue;
    const hub = state.entries.find((entry) => entry.article?.slug === cluster.hubSlug
      && entry.article.language === cluster.language);
    for (const role of cluster.articleRoles.filter((entry) => entry.role !== 'hub')) {
      const article = state.byPath.get(role.url);
      if (!article?.indexable || article.sourceType !== 'article') continue;
      checked += 1;
      const finding = { cluster: cluster.clusterId, route: article.path,
        hub: hub?.path ?? null, required };
      if (!hub?.indexable) {
        findings.push({ ...finding, reason: 'HUB_NOT_INDEXABLE' });
        continue;
      }
      const html = readHtml(article.path);
      if (!html) findings.push({ ...finding, reason: 'RENDERED_ARTICLE_MISSING' });
      else if (!renderedHrefPaths(html).has(hub.path)) {
        findings.push({ ...finding, reason: 'RENDERED_HUB_LINK_MISSING' });
      }
    }
  }
  return { checked, missing: findings.length, findings };
}
