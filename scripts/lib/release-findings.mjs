// Classification is evidence, NEVER a waiver or a successful release verdict.
export function classifyFindings(before, after, ruleUnchanged = true) {
  const remaining = [...before];
  const findings = after.map((current) => {
    const exact = remaining.findIndex((old) => old.source === current.source
      && old.rule === current.rule && old.message === current.message);
    let index = exact;
    if (index === -1 && current.metric) index = remaining.findIndex((old) => old.source === current.source
      && old.rule === current.rule && old.metric?.minimum === current.metric.minimum);
    const previous = index === -1 ? null : remaining.splice(index, 1)[0];
    let classification = 'NEW_BLOCKING';
    if (!ruleUnchanged) classification = 'RULE_CHANGED_UNRESOLVED_BLOCKING';
    else if (previous && exact !== -1) classification = 'UNCHANGED_DIAGNOSTIC_BLOCKING';
    else if (previous && current.metric) classification = current.metric.value < previous.metric.value
      ? 'WORSENED_BLOCKING' : 'IMPROVED_LEGACY_STILL_BLOCKING';
    return { ...current, before: previous, classification, blocking: true };
  });
  return [...findings, ...remaining.map((old) => ({ ...old, before: old,
    classification: ruleUnchanged ? 'RESOLVED_DIAGNOSTIC' : 'RULE_CHANGED_RESOLUTION_REQUIRES_REVIEW', blocking: false }))];
}

export function parseArticleFindings(output, kind) {
  let source;
  let inErrors = kind !== 'frontmatter';
  const results = [];
  for (const line of output.split('\n')) {
    if (kind === 'frontmatter' && /^❌ Errors \(\d+\):/.test(line)) inErrors = true;
    if (!inErrors) continue;
    const heading = line.match(/📄\s+(\S+\.md)/);
    if (heading) source = `src/content/blog/articles/${heading[1]}`;
    let message = line.match(/❌ ERR:\s*(.*)/)?.[1];
    if (kind === 'frontmatter') {
      const match = line.match(/^\s+-\s+Article "([a-z0-9-]+)":\s*(.*)$/);
      if (match) { source = `src/content/blog/articles/${match[1]}.md`; message = match[2]; }
    }
    if (!message || !source) continue;
    const metric = message.match(/^(.*?)(?:Body chars|H2 count): (\d+) \(min (\d+)\)\.$/);
    results.push({ source, rule: metric ? metric[1].trim() : message, message,
      ...(metric ? { metric: { value: Number(metric[2]), minimum: Number(metric[3]) } } : {}) });
  }
  return results;
}
