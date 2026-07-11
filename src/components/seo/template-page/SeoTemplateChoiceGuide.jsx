export const SeoTemplateChoiceGuide = ({ page }) => {
  const guide = page.templateChoiceGuide;
  if (!guide || !guide.items?.length) return null;

  const title = guide.title || {};

  return (
    <section id="template-choice-guide" className="border-t border-white/[0.08] py-14 md:py-20">
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-pink-300">
          {guide.eyebrow}
        </p>
        <h2
          className="text-3xl font-bold tracking-tight text-white md:text-4xl"
          style={{ textWrap: 'balance' }}
        >
          {title.before}
          <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
            {title.accent}
          </span>
          {title.after}
        </h2>
        <p
          className="mt-4 max-w-2xl text-base font-normal leading-7 text-zinc-400"
          style={{ textWrap: 'pretty' }}
        >
          {guide.description}
        </p>
      </div>

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
