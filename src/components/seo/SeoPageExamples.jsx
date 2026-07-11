export const SeoPageExamples = ({ page }) => {
  const items = [...(page.examples || []), ...(page.templates || []), ...(page.prompts || [])];
  if (!items.length) return null;

  return (
    <section className="border-t border-white/[0.08] py-16 md:py-20">
      <div className="mb-8 max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-pink-300">Examples</p>
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Примеры и форматы</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.title} className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-6">
            <h3 className="text-base font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-zinc-400">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
