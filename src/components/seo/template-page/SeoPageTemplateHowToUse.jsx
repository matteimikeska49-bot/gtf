export const SeoPageTemplateHowToUse = ({ page }) => {
  const steps = page.howToUse || page.workflow || [];
  if (!steps.length) return null;

  const stepIcons = [
    /* Step 1: Choose template */
    <div key="s1" className="grid grid-cols-2 gap-2">
      <div className="h-8 rounded-lg bg-pink-500/10 border border-pink-500/20" />
      <div className="h-8 rounded-lg bg-white/[0.05] border border-white/5" />
      <div className="h-8 rounded-lg bg-white/[0.05] border border-white/5" />
      <div className="h-8 rounded-lg bg-white/[0.05] border border-white/5" />
    </div>,
    /* Step 2: Add context */
    <div key="s2" className="space-y-2">
      <div className="text-[9px] text-zinc-500 uppercase tracking-wider font-semibold">Тема карусели</div>
      <div className="h-8 w-full rounded-lg bg-white/[0.05] border border-white/5 flex items-center px-3">
        <span className="text-[10px] text-zinc-400">5 ошибок в запуске...</span>
      </div>
      <div className="h-8 w-full rounded-lg bg-white/[0.05] border border-white/5 flex items-center px-3">
        <span className="text-[10px] text-zinc-400">Аудитория: эксперты</span>
      </div>
    </div>,
    /* Step 3: Ready result */
    <div key="s3" className="flex h-full items-center justify-center gap-2">
      <div className="h-16 w-10 rounded-lg bg-gradient-to-b from-pink-500/20 to-pink-500/5 border border-pink-500/20 transform -rotate-3" />
      <div className="h-16 w-10 rounded-lg bg-gradient-to-b from-orange-500/20 to-orange-500/5 border border-orange-500/20" />
      <div className="h-16 w-10 rounded-lg bg-gradient-to-b from-violet-500/20 to-violet-500/5 border border-violet-500/20 transform rotate-3" />
    </div>,
  ];

  return (
    <section className="border-t border-white/[0.08] py-16 md:py-24">
      <div className="mb-16 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-pink-300">Инструкция</p>
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          От шаблона до{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">готовой карусели</span>
        </h2>
      </div>

      <div className="mx-auto max-w-4xl">
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="relative flex flex-col rounded-3xl border border-white/[0.05] bg-white/[0.02] p-8 md:text-center">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-500/[0.15] to-orange-500/[0.15] border border-white/10 text-lg font-bold text-white md:mx-auto">
                {index + 1}
              </div>
              <h3 className="mb-3 text-lg font-semibold text-white">{step.title}</h3>
              <p className="text-sm leading-6 text-zinc-400">{step.body || step.description}</p>

              {/* UI Mockup */}
              <div className="mt-8 flex-1 rounded-xl bg-zinc-900/50 p-4 border border-white/5 ring-1 ring-white/5">
                <div className="h-full w-full rounded-lg border border-white/5 bg-white/[0.02] p-3 backdrop-blur-sm">
                  {stepIcons[index] || stepIcons[0]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
