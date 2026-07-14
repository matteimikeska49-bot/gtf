import { SeoSectionHeading } from '../SeoSectionHeading';

export const SeoTemplateChoiceGuide = ({ page }) => {
  const guide = page.templateChoiceGuide;
  if (!guide || !guide.items?.length) return null;

  const title = guide.title || {};

  return (
    <section id="template-choice-guide" className="border-t border-white/[0.08] py-14 md:py-20">
      <SeoSectionHeading
        eyebrow={guide.eyebrow}
        heading={title}
        intro={guide.description}
        sectionId="template-choice-guide"
      />

      {/* Article-style surface — matches workflow step surface */}
      <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0a] px-5 py-1 md:px-7 md:py-2">
        <div className="grid gap-x-8 gap-y-0 md:grid-cols-2">
          {guide.items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 border-t border-white/[0.06] py-5 first:border-t-0 md:[&:nth-child(2)]:border-t-0"
            >
              <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-pink-500 to-orange-400" aria-hidden="true" />
              <div className="min-w-0">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.10em] text-zinc-500">
                  {item.task}
                </p>
                <p className="text-[16px] font-semibold leading-snug text-white md:text-[17px]">
                  {item.template}
                </p>
                <p className="mt-1.5 text-[14px] font-normal leading-relaxed text-zinc-400">
                  {item.structure}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
