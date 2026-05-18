import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * InputToCarouselWorkflowMockup
 * Reusable SEO visual block showing: inputs → AI workflow steps → output.
 * Pure HTML text — no images, no external assets.
 *
 * Props:
 *   title     — heading text (string)
 *   subtitle  — description text (string)
 *   inputs    — array of input labels (string[])
 *   steps     — array of AI workflow step labels (string[])
 *   output    — output label (string)
 *   eyebrow   — optional small label above the title (string)
 */
export const InputToCarouselWorkflowMockup = ({
  title = 'From raw input to carousel draft',
  subtitle = 'Start with a topic, link, video, article, or notes — and shape it into a structured Instagram carousel workflow.',
  inputs = ['Topic', 'Link', 'Video', 'Article', 'Notes'],
  steps = ['Angle', 'Hook', 'Slide structure', 'Slide copy', 'Visual direction'],
  output = 'Carousel draft',
  eyebrow = '',
}) => {
  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="relative my-14 md:my-18 overflow-hidden rounded-3xl border border-white/[0.07] bg-[#060606]">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl" aria-hidden="true">
        <div className="absolute -top-24 left-1/4 w-72 h-72 rounded-full bg-pink-500/[0.08] blur-[80px]" />
        <div className="absolute -bottom-20 right-1/3 w-64 h-64 rounded-full bg-orange-500/[0.07] blur-[70px]" />
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-purple-500/[0.04] blur-[60px]" />
      </div>

      <div className="relative z-10 p-6 md:p-10 lg:p-12">
        {/* Header */}
        <div className="mb-8 md:mb-10 text-center">
          {eyebrow && (
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-pink-400/70 mb-3">{eyebrow}</p>
          )}
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-3 leading-snug">{title}</h3>
          <p className="text-sm md:text-base text-zinc-400 leading-[1.7] max-w-lg mx-auto">{subtitle}</p>
        </div>

        {/* Flow: Inputs → AI Workflow → Output */}
        <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-0">

          {/* Column 1 — Inputs */}
          <div className="flex-1 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 md:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500 mb-4">Start with</p>
            <div className="space-y-2.5">
              {inputs.map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-zinc-300 leading-snug">
                  <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-pink-400/60" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Arrow — desktop */}
          <div className="hidden md:flex items-center justify-center px-3 self-center">
            <div className="w-8 h-8 rounded-full border border-white/[0.08] bg-white/[0.03] flex items-center justify-center">
              <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
            </div>
          </div>
          {/* Arrow — mobile */}
          <div className="flex md:hidden justify-center py-1">
            <div className="w-7 h-7 rounded-full border border-white/[0.08] bg-white/[0.03] flex items-center justify-center">
              <svg className="w-3 h-3 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Column 2 — AI Steps */}
          <div className="flex-[1.5] rounded-2xl border border-pink-500/15 bg-gradient-to-b from-pink-500/[0.05] to-transparent p-5 md:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-pink-400/70 mb-4">AI workflow</p>
            <div className="space-y-2">
              {steps.map((step, i) => (
                <div key={step} className="flex items-center gap-3 text-sm text-zinc-200 leading-snug">
                  <span className="shrink-0 w-6 h-6 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-[10px] font-bold text-pink-300 tabular-nums">
                    {pad(i + 1)}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Arrow — desktop */}
          <div className="hidden md:flex items-center justify-center px-3 self-center">
            <div className="w-8 h-8 rounded-full border border-white/[0.08] bg-white/[0.03] flex items-center justify-center">
              <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
            </div>
          </div>
          {/* Arrow — mobile */}
          <div className="flex md:hidden justify-center py-1">
            <div className="w-7 h-7 rounded-full border border-white/[0.08] bg-white/[0.03] flex items-center justify-center">
              <svg className="w-3 h-3 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Column 3 — Output */}
          <div className="flex-1 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 md:p-6 flex flex-col justify-center items-center text-center gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500">Output</p>
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/25 bg-pink-500/[0.08] px-5 py-2.5">
              <span className="w-2 h-2 rounded-full bg-pink-400 shrink-0" />
              <span className="text-sm font-semibold text-pink-200 tracking-tight">{output}</span>
            </div>
            <p className="text-xs text-zinc-500 leading-[1.6] max-w-[160px]">
              Ready to refine and design
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
