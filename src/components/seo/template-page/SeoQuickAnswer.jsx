import { Link } from 'react-router-dom';

export const SeoQuickAnswer = ({ page }) => {
  const qa = page.quickAnswer;
  if (!qa) return null;

  const item = Array.isArray(qa) ? qa[0] : qa;
  if (!item) return null;

  return (
    <section className="pt-12 pb-6" id="quick-answer" data-seo-section="quick-answer">
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 md:p-8 backdrop-blur-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/15 to-orange-500/15 border border-white/10 text-pink-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-3">{item.title || item.question}</h2>
            <p className="text-zinc-300 leading-relaxed text-sm md:text-base">{item.body || item.answer}</p>
            {item.contextualLink && (
              <Link
                to={item.contextualLink.href}
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-md text-sm font-medium text-pink-300 transition-colors hover:text-pink-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60"
              >
                {item.contextualLink.label}
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
