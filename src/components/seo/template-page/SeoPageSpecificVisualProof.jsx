import { ResultCarouselStack } from './SeoProductWorkflowShowcase';

export const SeoPageSpecificVisualProof = ({ page }) => {
  const proof = page.pageSpecificVisualProof;
  if (!proof?.images?.length) return null;

  return (
    <section
      id="page-specific-proof"
      data-seo-section="page-specific-proof"
      className="border-t border-white/[0.08] py-14 md:py-20"
    >
      <div className="mb-9 max-w-3xl">
        {proof.eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-pink-300">
            {proof.eyebrow}
          </p>
        )}
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl" style={{ textWrap: 'balance' }}>
          {proof.title}
        </h2>
        {proof.description && (
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400" style={{ textWrap: 'pretty' }}>
            {proof.description}
          </p>
        )}
      </div>

      <div className="max-w-5xl">
        <ResultCarouselStack resultCarousel={proof} />
      </div>
    </section>
  );
};
