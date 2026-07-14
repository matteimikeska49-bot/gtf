import { SeoPageSection } from './SeoPageSection';
import { SeoSectionHeading } from './SeoSectionHeading';

export const SeoPageWorkflow = ({
  sections = [],
  eyebrow = 'Controlled layout',
  heading = 'Структура страницы',
  description,
  id,
  dataSeoSection,
  dataSeoProof,
  cardMarker,
  variant = 'cards',
}) => {
  if (!sections.length) return null;
  const compact = variant === 'compact-list';

  return (
    <section
      id={id}
      data-seo-section={dataSeoSection}
      data-seo-proof={dataSeoProof}
      className="py-16 md:py-20"
    >
      <SeoSectionHeading
        eyebrow={eyebrow}
        heading={heading}
        intro={description}
        sectionId={dataSeoProof || dataSeoSection || id || 'workflow'}
        className="mb-8 max-w-3xl"
      />

      {compact ? (
        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0a] px-5 py-1 md:px-7 md:py-2">
          <div className="grid gap-x-8 gap-y-0 md:grid-cols-2">
            {sections.map((section, index) => (
              <div
                key={section.id}
                data-seo-proof-card={cardMarker}
                className="flex min-w-0 gap-4 border-t border-white/[0.06] py-5 first:border-t-0 md:[&:nth-child(2)]:border-t-0"
              >
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-pink-500 to-orange-400" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.10em] text-zinc-500">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="text-[16px] font-semibold leading-snug text-white md:text-[17px]" style={{ textWrap: 'balance' }}>
                    {section.title || section.label || section.name}
                  </h3>
                  {(section.body || section.description || section.text || section.content) && (
                    <p className="mt-1.5 text-[14px] font-normal leading-relaxed text-zinc-400" style={{ textWrap: 'pretty' }}>
                      {section.body || section.description || section.text || section.content}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {sections.map((section) => (
            <div key={section.id} data-seo-proof-card={cardMarker}>
              <SeoPageSection section={section} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
