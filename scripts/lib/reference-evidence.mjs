// Data fields are not instructions naming an article as the template. Restrict
// this distinction to maintenance receipts; prose in those files still scans.
export function isMaintenanceEvidenceDatum(file, line) {
  if (!file.startsWith('docs/maintenance/')) return false;
  if (file.endsWith('.json')) {
    return /^\s*"canonical"\s*:\s*"https:\/\/gotoflow\.io\/(?:ru\/)?blog\/[a-z0-9-]+"\s*,?\s*$/.test(line);
  }
  if (!file.endsWith('.md') || !/^\|\s*\d+\s*\|/.test(line)) return false;
  const cells = line.split('|').slice(1, -1);
  if (cells.length < 4 || !/^\s*\[https:\/\/gotoflow\.io\//.test(cells[1])) return false;
  // Only a technical cell made entirely of typed observations is data. Any
  // extra assertion, even in a historical report, remains subject to the rule.
  return cells.some((cell) => /^\s*(?:article|static|seo|redirect|hub);\s*(?:current_indexable|noindex(?:_review)?|redirect);\s*canonical=https:\/\/gotoflow\.io\/[a-z0-9/-]+;\s*sitemap=(?:true|false);\s*robots=(?:index|noindex),\s*(?:follow|nofollow)\s*$/.test(cell))
    && !/template|reference|source of truth|эталон/i.test(line);
}

export function forbiddenEvidenceTemplateAssertions(value, location = '$') {
  if (!value || typeof value !== 'object') return [];
  const live = /\/blog\/ai-instagram-carousel-generator|ai-instagram-carousel-generator/i;
  const referenceKey = /^(?:templateSource|canonicalTemplate|canonicalReference|templateReference|sourceOfTruth)$/i;
  const entries = Object.entries(value);
  const findings = [];
  for (const [key, child] of entries) {
    // Cross-line JSON must not evade the line scanner by placing an assertion
    // alongside a legitimate canonical observation in a separate property.
    if (referenceKey.test(key) && child && (live.test(JSON.stringify(child)) || live.test(String(value.canonical || '')))) {
      findings.push(`${location}.${key}`);
    }
    findings.push(...forbiddenEvidenceTemplateAssertions(child, `${location}.${key}`));
  }
  return findings;
}
