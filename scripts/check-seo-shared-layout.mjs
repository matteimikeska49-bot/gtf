import fs from 'fs';
import path from 'path';
import { getSeoPagesForPrerender } from '../src/content/seoPages/index.js';

const rootDir = process.cwd();
const distDir = path.resolve(process.env.SEO_SHARED_LAYOUT_DIST || path.join(rootDir, 'dist'));
const errors = [];
const warnings = [];

const forbiddenLayoutNames = [
  'SeoHeader',
  'SeoFooter',
  'TemplateHeader',
  'TemplateFooter',
  'HeaderV2',
  'FooterV2',
  'LegacyHeader',
  'LegacyFooter',
];

const requiredRoutes = [
  '/',
  '/ru',
  '/ru/generator-karuselej-instagram',
  '/ru/ii-generator-karuseley',
  '/ru/blog',
  '/ru/blog/kak-sdelat-karusel-dlya-instagram-s-ii',
  '/ru/templates/instagram-carousel',
];

const normalizeRoute = (route) => route.replace(/\/+$/, '') || '/';
const routeToHtmlPath = (route) => (
  route === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, route.replace(/^\//, ''), 'index.html')
);

const walkFiles = (dir, result = []) => {
  if (!fs.existsSync(dir)) return result;
  fs.readdirSync(dir).forEach((entry) => {
    const filePath = path.join(dir, entry);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) walkFiles(filePath, result);
    else if (/\.(js|jsx|ts|tsx)$/.test(entry)) result.push(filePath);
  });
  return result;
};

const countMatches = (text, pattern) => (text.match(pattern) || []).length;

const checkSource = () => {
  const sourceFiles = [
    ...walkFiles(path.join(rootDir, 'src', 'components', 'seo')),
    ...walkFiles(path.join(rootDir, 'src', 'content', 'seoPages')),
  ];

  sourceFiles.forEach((filePath) => {
    const relativePath = path.relative(rootDir, filePath);
    const source = fs.readFileSync(filePath, 'utf8');
    forbiddenLayoutNames.forEach((name) => {
      if (source.includes(name)) {
        errors.push(`${relativePath}: forbidden route-specific layout token found: ${name}`);
      }
    });
  });
};

const checkRenderedRoute = (route) => {
  const normalizedRoute = normalizeRoute(route);
  const htmlPath = routeToHtmlPath(normalizedRoute);
  if (!fs.existsSync(htmlPath)) {
    errors.push(`${normalizedRoute}: physical HTML is missing at ${path.relative(rootDir, htmlPath)}.`);
    return;
  }

  const html = fs.readFileSync(htmlPath, 'utf8');
  const headerCount = countMatches(html, /<header\b/gi);
  const footerCount = countMatches(html, /<footer\b/gi);
  const headerIndex = html.search(/<header\b/i);
  const footerIndex = html.search(/<footer\b/i);
  const mainIndex = html.search(/<main\b/i);
  const h1Index = html.search(/<h1\b/i);

  if (headerCount !== 1) errors.push(`${normalizedRoute}: expected exactly one <header>, found ${headerCount}.`);
  if (footerCount !== 1) errors.push(`${normalizedRoute}: expected exactly one <footer>, found ${footerCount}.`);

  forbiddenLayoutNames.forEach((name) => {
    if (html.includes(name)) errors.push(`${normalizedRoute}: rendered HTML contains forbidden layout marker ${name}.`);
  });

  if (headerIndex < 0 || footerIndex < 0) return;
  if (mainIndex >= 0 && headerIndex > mainIndex) {
    errors.push(`${normalizedRoute}: shared header appears after page content.`);
  }
  if (mainIndex >= 0 && footerIndex < mainIndex) {
    errors.push(`${normalizedRoute}: shared footer appears before page content.`);
  }
  if (h1Index >= 0 && headerIndex > h1Index) {
    errors.push(`${normalizedRoute}: shared header appears after primary page content.`);
  }
  if (h1Index >= 0 && footerIndex < h1Index) {
    errors.push(`${normalizedRoute}: shared footer appears before primary page content.`);
  }
  if (!/GoToFlow/.test(html)) warnings.push(`${normalizedRoute}: GoToFlow brand text not found in rendered HTML.`);
};

console.log('SEO shared layout guard');
console.log(`- dist: ${distDir}`);

checkSource();

const routes = [...new Set([
  ...requiredRoutes.map(normalizeRoute),
  ...getSeoPagesForPrerender().map((page) => normalizeRoute(page.path)),
])];

routes.forEach(checkRenderedRoute);

warnings.forEach((warning) => console.warn(`WARNING: ${warning}`));

if (errors.length > 0) {
  console.error('\nSEO shared layout guard failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`- routes checked: ${routes.join(', ')}`);
console.log('SEO shared layout guard passed.');
