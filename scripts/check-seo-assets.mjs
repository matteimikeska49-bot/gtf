import { existsSync, statSync } from 'fs';
import path from 'path';
import { getAllSeoPages } from '../src/content/seoPages/index.js';
import { SEO_ASSET_POLICY } from '../src/content/seoPages/releaseContracts.js';
import { buildProductWorkflowMockups } from '../src/content/seoPages/workflowPresets.js';

const errors = [];
const warnings = [];

const publicPathFor = (assetPath) => path.join(process.cwd(), 'public', assetPath.replace(/^\//, ''));

const hasAllowedExtension = (assetPath) => (
  SEO_ASSET_POLICY.allowedLocalImageExtensions.some((ext) => assetPath.toLowerCase().endsWith(ext))
);

const checkAsset = ({ page, assetPath, alt, width, height, role }) => {
  const id = page.id || page.path;

  if (!assetPath || typeof assetPath !== 'string' || !assetPath.startsWith('/')) {
    errors.push(`${id} ${role} must use an absolute local public asset path.`);
    return;
  }

  if (!hasAllowedExtension(assetPath)) {
    errors.push(`${id} ${role} uses an unsupported image extension: ${assetPath}`);
  }

  const filePath = publicPathFor(assetPath);
  if (!existsSync(filePath)) {
    errors.push(`${id} ${role} asset is missing: ${assetPath}`);
    return;
  }

  const size = statSync(filePath).size;
  if (size > SEO_ASSET_POLICY.recommendedMaxBytes) {
    warnings.push(`${id} ${role} asset is larger than ${SEO_ASSET_POLICY.recommendedMaxBytes} bytes: ${assetPath} (${size} bytes)`);
  }

  if (SEO_ASSET_POLICY.requireAltForInformativeImages && (!alt || alt.trim().length < 12)) {
    errors.push(`${id} ${role} requires meaningful alt text: ${assetPath}`);
  }

  if (SEO_ASSET_POLICY.requireKnownDimensions && (!Number.isFinite(width) || !Number.isFinite(height))) {
    errors.push(`${id} ${role} requires known width and height: ${assetPath}`);
  }
};

const pages = getAllSeoPages();

pages.forEach((page) => {
  (page.readyCarouselShowcase || []).forEach((item, index) => {
    checkAsset({
      page,
      role: `readyCarouselShowcase[${index}]`,
      assetPath: item.image,
      alt: item.alt || `Пример карусели: ${item.title}`,
      width: item.width,
      height: item.height,
    });
  });

  buildProductWorkflowMockups(page.productWorkflow || {}).forEach((mockup) => {
    if (mockup.image) {
      checkAsset({
        page,
        role: `productWorkflow.mockups.${mockup.id}`,
        assetPath: mockup.image,
        alt: mockup.alt,
        width: mockup.width,
        height: mockup.height,
      });
    }

    mockup.resultCarousel?.images?.forEach((image, imageIndex) => {
      checkAsset({
        page,
        role: `productWorkflow.mockups.${mockup.id}.resultCarousel[${imageIndex}]`,
        assetPath: image.src,
        alt: image.alt,
        width: image.width || mockup.resultCarousel.width,
        height: image.height || mockup.resultCarousel.height,
      });
    });
  });
});

console.log('SEO assets check');
console.log(`- pages checked: ${pages.length}`);
console.log(`- warnings: ${warnings.length}`);
warnings.forEach((warning) => console.warn(`- ${warning}`));

if (errors.length > 0) {
  console.error('\nSEO assets check failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('SEO assets check passed.');
