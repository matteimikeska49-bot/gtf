import { ResultCarouselStack } from './SeoProductWorkflowShowcase';
import { SeoSectionHeading } from '../SeoSectionHeading';

export const SeoPageSpecificVisualProof = ({ page }) => {
  const proof = page.pageSpecificVisualProof;
  if (!proof?.images?.length) return null;

  return (
    <section
      id="page-specific-proof"
      data-seo-section="page-specific-proof"
      className="border-t border-white/[0.08] py-14 md:py-20"
    >
      <SeoSectionHeading
        eyebrow={proof.eyebrow}
        heading={proof.heading}
        intro={proof.description}
        sectionId="page-specific-proof"
        className="mb-9 max-w-3xl"
      />

      <div className="max-w-5xl">
        <ResultCarouselStack resultCarousel={proof} />
      </div>
    </section>
  );
};
