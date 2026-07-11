import { Sparkles } from 'lucide-react';

export const SeoPageBenefits = ({ page }) => {
  const benefits = page.benefits || [];

  return (
    <section className="border-y border-white/[0.08] py-14 md:py-18">
      <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-start">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-pink-300">Product bridge</p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Как это связано с GoToFlow</h2>
        </div>
        <div className="grid gap-4">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-7">
            <Sparkles className="mb-5 h-5 w-5 text-orange-300" />
            <p className="text-base leading-8 text-zinc-300">{page.productBridge}</p>
          </div>
          {benefits.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {benefits.map((benefit) => (
                <article key={benefit.title} className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-6">
                  <h3 className="text-base font-semibold text-white">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">{benefit.body || benefit.description}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
