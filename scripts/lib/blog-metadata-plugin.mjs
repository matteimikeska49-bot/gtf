import fs from 'node:fs';
import { parseFrontmatter } from '../../src/lib/blog/frontmatter.js';

// Derived at build time from the same Markdown, never a second content registry.
export const blogMetadataPlugin = () => ({
  name: 'blog-frontmatter-only',
  enforce: 'pre',
  load(id) {
    const query = id.endsWith('.md?blog-metadata') ? '?blog-metadata'
      : id.endsWith('.md?blog-slug') ? '?blog-slug'
        : id.endsWith('.md?blog-source') ? '?blog-source' : null;
    if (!query) return null;
    const file = id.slice(0, -query.length);
    const source = fs.readFileSync(file, 'utf8');
    // Preserve every source byte, including Markdown hard-break spaces, while
    // keeping the generated JS string free of physical trailing whitespace.
    // A plain raw string is rewritten to a multiline literal by the minifier.
    if (query === '?blog-source') return `export default JSON.parse(${JSON.stringify(JSON.stringify(source))});`;
    const { data } = parseFrontmatter(source);
    const value = query === '?blog-slug'
      ? data.slug || file.split(/[\\/]/).pop().replace(/\.md$/, '') : data;
    return `export default ${JSON.stringify(value)};`;
  },
  handleHotUpdate(context) {
    if (!context.file.endsWith('.md')) return;
    // Invalidate the derived metadata as well as the lazy raw content in preview/dev.
    return [...context.server.moduleGraph.getModulesByFile(context.file) || []];
  },
});
