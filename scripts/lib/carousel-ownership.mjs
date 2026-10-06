import { parseFrontmatter } from '../../src/lib/blog/frontmatter.js';

export const isRuCarouselCluster = cluster => cluster.language === 'ru'
  && ['ru:instagram-carousel', 'ru:instagram-carousel-overview', 'ru:ai-carousel-generator', 'ru:ii-carousel-generator'].includes(cluster.clusterId);

// The existing project cluster declaration owns the commercial bridge; informational
// owner URLs remain independent. No new URL-to-file or intent-owner registry.
export function validateCarouselOwnership(content, { slug, cluster, intent, topic }) {
  const { data } = parseFrontmatter(content);
  if (data.published === false || data.noindex === true || data.preview === true) return [];
  const errors = [];
  const expected = cluster.productRoute;
  if (data.clusterId && data.clusterId !== cluster.clusterId) errors.push('frontmatter cluster differs from cluster role');
  if (data.relatedProductRoute && data.relatedProductRoute !== expected) errors.push('frontmatter commercial bridge differs from cluster');
  if (intent && intent.cluster !== cluster.clusterId) errors.push('intent cluster differs from cluster role');
  if (intent?.relatedProductRoute && intent.relatedProductRoute !== expected) errors.push('intent commercial bridge differs from cluster');
  if (topic?.relatedProductRoute && topic.relatedProductRoute !== expected) errors.push('topic commercial bridge differs from cluster');
  // Runtime renders primaryHref; href alone silently falls back to the app.
  const primary = data.finalCta?.primaryHref;
  if (primary !== expected) errors.push('rendered primary creation CTA differs from cluster');
  const declaredHref = data.finalCta?.href || data.finalCta?.buttonHref;
  if (declaredHref && declaredHref !== expected) errors.push('legacy CTA declaration differs from rendered owner');
  if (!content.includes(expected)) errors.push('missing commercial bridge');
  if (cluster.clusterId.startsWith('ru:instagram-carousel')) {
    for (const competing of ['/ru/ii-generator-karuseley', '/ru/generator-postov-instagram']) {
      if (content.includes(competing)) errors.push(`competing creation bridge ${competing}`);
    }
  }
  return errors.map(error => `${slug}: ${error}`);
}
