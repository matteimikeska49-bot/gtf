import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * InputToCarouselWorkflowMockup
 * Reusable SEO visual block showing: inputs → AI workflow steps → output.
 * Pure HTML text — no images, no external assets.
 */
export const InputToCarouselWorkflowMockup = ({
  title = 'From raw input to carousel draft',
  subtitle = 'Start with a topic, link, video, article, or notes — and shape it into a structured Instagram carousel workflow.',
  inputs = ['Topic', 'Link', 'Video', 'Article', 'Notes'],
  steps = ['Angle', 'Hook', 'Slide structure', 'Slide copy', 'Visual direction'],
  output = 'Carousel draft',
}) => {
  return (
    <div className="relative my-12 md:my-16 overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02]">
      {/* Soft ambient glow */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl" aria-hidden="true">
        <div className="absolute -top-20 left-1/3 w-64 h-64 rounded-full bg-pink-500/10 blur-[70px]" />
        <div className="absolute -bottom-16 right-1/4 w-56 h-56 rounded-full bg-orange-500/10 blur-[60px]" />
      </div>

      <div className="relative z-10 p-6 md:p-10">
        {/* Header */}
        <div className="mb-8 md:mb-10 text-center">
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-3">{title}</h3>
          <p className="text-sm md:text-base text-zinc-400 leading-[1.7] max-w-xl mx-auto">{subtitle}</p>
        </div>

        {/* Main flow — desktop: row, mobile: column */}
        <div className="flex flex-col md:flex-row items-stretch md:items-start gap-4 md:gap-3">

          {/* Column 1 — Inputs */}
          <div className="flex-1 rounded-2xl border border-white/[0.08] bg-[#080808] p-5 md:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500 mb-4">Start with</p>
            <ul className="space-y-2.5">
              {inputs.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-zinc-300">
                  <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-pink-400/60" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Arrow desktop */}
          <div className="hidden md:flex items-center justify-center px-1 pt-10">
            <ArrowRight className="w-5 h-5 text-zinc-600" />
          </div>

          {/* Arrow mobile */}
          <div className="flex md:hidden justify-center">
            <svg className="w-5 h-5 text-zinc-600 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>

          {/* Column 2 — AI Steps */}
          <div className="flex-[1.4] rounded-2xl border border-pink-500/20 bg-gradient-to-b from-pink-500/[0.06] to-orange-500/[0.04] p-5 md:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-pink-400/80 mb-4">AI workflow</p>
            <ol className="space-y-2.5">
              {steps.map((step, i) => (
                <li key={step} className="flex items-center gap-3 text-sm text-zinc-200">
                  <span className="shrink-0 w-5 h-5 rounded-md bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-[10px] font-bold text-pink-300">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Arrow desktop */}
          <div className="hidden md:flex items-center justify-center px-1 pt-10">
            <ArrowRight className="w-5 h-5 text-zinc-600" />
          </div>

          {/* Arrow mobile */}
          <div className="flex md:hidden justify-center">
            <svg className="w-5 h-5 text-zinc-600 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>

          {/* Column 3 — Output */}
          <div className="flex-1 rounded-2xl border border-white/[0.08] bg-[#080808] p-5 md:p-6 flex flex-col justify-center items-center text-center gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500">Output</p>
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/25 bg-pink-500/10 px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-pink-400 shrink-0" />
              <span className="text-sm font-semibold text-pink-200">{output}</span>
            </div>
            <p className="text-xs text-zinc-500 leading-[1.6] max-w-[140px]">
              Ready to refine and design
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
