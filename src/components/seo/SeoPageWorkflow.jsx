import { SeoPageSection } from './SeoPageSection';

export const SeoPageWorkflow = ({
  sections = [],
  eyebrow = 'Controlled layout',
  heading = 'Структура страницы',
  id,
  dataSeoSection,
  dataSeoProof,
  cardMarker,
}) => {
  if (!sections.length) return null;

  return (
    <section
      id={id}
      data-seo-section={dataSeoSection}
      data-seo-proof={dataSeoProof}
      className="py-16 md:py-20"
    >
      <div className="mb-8 max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">{eyebrow}</p>
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{heading}</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {sections.map((section) => (
          <div key={section.id} data-seo-proof-card={cardMarker}>
            <SeoPageSection section={section} />
          </div>
        ))}
      </div>
    </section>
  );
};
