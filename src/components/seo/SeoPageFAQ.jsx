import { useState, useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { SEO_ANALYTICS_EVENTS } from '../../content/seoPages/releaseContracts';
import { trackSeoEvent } from './seoAnalytics';

export const SeoPageFAQ = ({ items = [], page }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const faqIdPrefix = useId();
  if (!items.length) return null;

  return (
    <section id="faq-section" className="border-t border-white/[0.08] py-16 md:py-20">
      <div className="mb-8 max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          Частые{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">вопросы</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-3">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const answerId = `faq-answer-${faqIdPrefix.replace(/:/g, '')}-${index}`;
          return (
            <button
              key={item.question}
              type="button"
              onClick={() => {
                setOpenIndex(isOpen ? null : index);
                if (!isOpen) {
                  trackSeoEvent(SEO_ANALYTICS_EVENTS.faqOpen, page, {
                    faq_index: index,
                    faq_question: item.question,
                  });
                }
              }}
              aria-expanded={isOpen}
              aria-controls={isOpen ? answerId : undefined}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 text-left transition-colors hover:border-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50"
            >
              <span className="flex items-start justify-between gap-5">
                <span className="text-base font-semibold leading-6 text-white">{item.question}</span>
                <ChevronDown className={`mt-1 h-4 w-4 shrink-0 text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </span>
              {isOpen && <span id={answerId} className="mt-4 block text-sm leading-7 text-zinc-400">{item.answer}</span>}
            </button>
          );
        })}
      </div>
    </section>
  );
};
