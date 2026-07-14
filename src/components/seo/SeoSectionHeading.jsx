export const isTypedSeoHeading = (heading) => (
  Boolean(
    heading &&
    typeof heading === 'object' &&
    typeof heading.before === 'string' &&
    typeof heading.accent === 'string' &&
    typeof heading.after === 'string'
  )
);

export const getSeoHeadingText = (heading) => (
  isTypedSeoHeading(heading)
    ? `${heading.before}${heading.accent}${heading.after}`
    : String(heading || '')
);

export const SeoSectionHeading = ({
  eyebrow,
  heading,
  intro,
  sectionId,
  className = 'mb-10 max-w-3xl',
  introClassName = 'mt-4 max-w-2xl text-base font-normal leading-7 text-zinc-400',
}) => {
  const typedHeading = isTypedSeoHeading(heading) ? heading : null;
  const plainHeading = typedHeading ? '' : String(heading || '');
  if (!typedHeading && !plainHeading) return null;

  return (
    <div className={className}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-pink-300">
          {eyebrow}
        </p>
      )}
      <h2
        data-seo-heading={sectionId || 'true'}
        className="text-3xl font-bold tracking-tight text-white md:text-4xl"
        style={{ textWrap: 'balance' }}
      >
        {typedHeading ? (
          <>
            {typedHeading.before}
            <span
              data-seo-heading-accent={sectionId || 'true'}
              className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent"
            >
              {typedHeading.accent}
            </span>
            {typedHeading.after}
          </>
        ) : plainHeading}
      </h2>
      {intro && (
        <p className={introClassName} style={{ textWrap: 'pretty' }}>
          {intro}
        </p>
      )}
    </div>
  );
};
