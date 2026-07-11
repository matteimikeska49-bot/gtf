/* ─── Carousel slide type labels ─── */
const SLIDE_TYPE_LABELS = {
  cover: 'Обложка',
  content: 'Слайд',
  final: 'Итог',
};

/* ─── Color systems per example audience ─── */
const COLOR_SYSTEMS = [
  {
    // Expert — pink/rose
    coverBg: 'bg-gradient-to-br from-pink-600/35 to-rose-800/25',
    coverBorder: 'border-pink-400/30',
    contentBg: 'bg-gradient-to-br from-pink-900/25 to-zinc-900/70',
    contentBorder: 'border-pink-400/20',
    finalBg: 'bg-gradient-to-br from-rose-900/25 to-zinc-900/80',
    finalBorder: 'border-rose-400/20',
    badge: 'bg-pink-500/15 text-pink-300 border-pink-500/25',
    barCover: 'bg-pink-400/40',
    barContent: 'bg-pink-400/25',
    barFinal: 'bg-rose-400/30',
  },
  {
    // Agency — violet/indigo
    coverBg: 'bg-gradient-to-br from-violet-600/35 to-indigo-800/25',
    coverBorder: 'border-violet-400/30',
    contentBg: 'bg-gradient-to-br from-violet-900/25 to-zinc-900/70',
    contentBorder: 'border-violet-400/20',
    finalBg: 'bg-gradient-to-br from-indigo-900/25 to-zinc-900/80',
    finalBorder: 'border-indigo-400/20',
    badge: 'bg-violet-500/15 text-violet-300 border-violet-500/25',
    barCover: 'bg-violet-400/40',
    barContent: 'bg-violet-400/25',
    barFinal: 'bg-indigo-400/30',
  },
  {
    // Small biz — amber/orange
    coverBg: 'bg-gradient-to-br from-amber-600/30 to-orange-800/20',
    coverBorder: 'border-amber-400/30',
    contentBg: 'bg-gradient-to-br from-amber-900/20 to-zinc-900/70',
    contentBorder: 'border-amber-400/20',
    finalBg: 'bg-gradient-to-br from-orange-900/20 to-zinc-900/80',
    finalBorder: 'border-orange-400/20',
    badge: 'bg-amber-500/15 text-amber-300 border-amber-500/25',
    barCover: 'bg-amber-400/40',
    barContent: 'bg-amber-400/25',
    barFinal: 'bg-orange-400/30',
  },
];

/* ─── Miniature carousel preview ─── */
const CarouselPreview = ({ slides = [], colors }) => {
  if (slides.length < 3) return null;

  const [cover, content, final] = slides;

  return (
    <div className="relative aspect-[4/3] w-full" aria-hidden="true">
      {/* Back slide (final) — offset right & rotated */}
      <div
        className={`absolute right-[6%] top-[6%] h-[80%] w-[56%] rotate-[6deg] rounded-lg border ${colors.finalBorder} ${colors.finalBg} p-3 shadow-[0_4px_24px_rgba(0,0,0,0.4)]`}
      >
        <div className={`mb-1.5 inline-flex rounded-full border px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider ${colors.badge}`}>
          {SLIDE_TYPE_LABELS[final.type] || 'Итог'}
        </div>
        <div className="space-y-1.5">
          <div className={`h-1.5 w-full rounded ${colors.barFinal}`} />
          <div className={`h-1.5 w-4/5 rounded ${colors.barFinal}`} />
        </div>
        <p className="mt-2.5 line-clamp-2 text-[10px] font-semibold leading-tight text-zinc-200">{final.text}</p>
      </div>

      {/* Middle slide (content) — slight offset & rotation */}
      <div
        className={`absolute left-[18%] top-[8%] h-[80%] w-[56%] rotate-[2deg] rounded-lg border ${colors.contentBorder} ${colors.contentBg} p-3 shadow-[0_6px_28px_rgba(0,0,0,0.45)]`}
      >
        <div className={`mb-1.5 inline-flex rounded-full border px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider ${colors.badge}`}>
          {SLIDE_TYPE_LABELS[content.type] || 'Слайд'}
        </div>
        <div className="space-y-1.5">
          <div className={`h-1.5 w-full rounded ${colors.barContent}`} />
          <div className={`h-1.5 w-full rounded ${colors.barContent}`} />
          <div className={`h-1.5 w-3/5 rounded ${colors.barContent}`} />
        </div>
        <p className="mt-2.5 line-clamp-2 text-[10px] font-semibold leading-tight text-zinc-200">{content.text}</p>
      </div>

      {/* Front slide (cover) — dominant, slight counter-rotation */}
      <div
        className={`absolute left-[4%] top-[5%] flex h-[85%] w-[58%] rotate-[-3deg] flex-col rounded-lg border-2 ${colors.coverBorder} ${colors.coverBg} p-4 shadow-[0_8px_36px_rgba(0,0,0,0.5)]`}
      >
        <div className={`mb-auto inline-flex self-start rounded-full border px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider ${colors.badge}`}>
          {SLIDE_TYPE_LABELS[cover.type] || 'Обложка'}
        </div>
        <div className="mt-auto">
          <div className={`mb-2.5 h-1 w-10 rounded ${colors.barCover}`} />
          <h4 className="line-clamp-3 text-[12px] font-bold leading-snug text-white">{cover.text}</h4>
        </div>
      </div>
    </div>
  );
};

export const SeoPageTemplateExamples = ({ page }) => {
  const examples = page.examples || [];
  if (!examples.length) return null;

  return (
    <section className="border-t border-white/[0.08] py-14 md:py-20" id="examples-0">
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">Галерея</p>
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          Готовые примеры для{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">разных задач</span>
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {examples.map((item, index) => {
          const colors = COLOR_SYSTEMS[index % COLOR_SYSTEMS.length];
          const hasSlides = item.slides && item.slides.length >= 3;

          return (
            <div
              key={item.title}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-900/80 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:shadow-2xl"
            >
              {/* Carousel slide preview */}
              <div className="relative w-full overflow-hidden bg-zinc-950/60">
                {hasSlides ? (
                  <CarouselPreview slides={item.slides} colors={colors} />
                ) : (
                  <div className="aspect-[4/3] w-full bg-gradient-to-br from-zinc-800/50 to-zinc-900/80" />
                )}

                {/* Hover CTA */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                  <span className="rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-lg">Собрать такую же</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col px-5 py-4">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${colors.badge}`}>
                    {item.title}
                  </span>
                </div>
                <p className="text-[13px] leading-relaxed text-zinc-400">{item.body || item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
