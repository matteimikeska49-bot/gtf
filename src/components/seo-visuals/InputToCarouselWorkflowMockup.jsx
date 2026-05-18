import React from 'react';
import { Sparkles, Layers, FileText, Image as ImageIcon, Zap, AlignLeft } from 'lucide-react';

export const InputToCarouselWorkflowMockup = ({
  title = 'From raw input to carousel draft',
  subtitle = 'Start with a topic, link, video, article, or notes — and shape it into a structured Instagram carousel workflow.',
  inputs = ['Topic', 'Link', 'Video', 'Article', 'Notes'],
  steps = ['Angle', 'Hook', 'Slide structure', 'Slide copy', 'Visual direction'],
  output = 'Carousel draft',
  eyebrow = '',
}) => {
  return (
    <div className="relative my-14 md:my-18 w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8 md:mb-12 text-center px-4">
        {eyebrow && (
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-pink-400 mb-4">{eyebrow}</p>
        )}
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4 leading-tight">{title}</h3>
        <p className="text-sm md:text-base text-zinc-400 leading-[1.7] max-w-2xl mx-auto">{subtitle}</p>
      </div>

      {/* Mockup Window */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0a] shadow-2xl md:rounded-[32px]">
        {/* Glow Effects */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute left-1/4 top-0 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-pink-500/[0.045] blur-[105px]" />
          <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] translate-y-1/2 rounded-full bg-orange-500/[0.045] blur-[85px]" />
        </div>

        {/* Window Chrome */}
        <div className="flex items-center gap-2 px-6 py-4 border-b border-white/[0.05] bg-[#0a0a0a]/80 backdrop-blur-md">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-zinc-800" />
            <div className="w-3 h-3 rounded-full bg-zinc-800" />
            <div className="w-3 h-3 rounded-full bg-zinc-800" />
          </div>
          <div className="mx-auto flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.03] border border-white/[0.05]">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span className="text-[11px] font-medium text-zinc-400 tracking-wide">gotoflow.io/workspace</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative z-10 grid gap-4 bg-[#050505] p-4 md:gap-5 md:p-6 lg:grid-cols-[0.9fr_1.15fr_1fr]">
          
          {/* Left: Inputs Panel */}
          <div className="rounded-xl border border-white/[0.06] bg-[#0a0a0a] p-5 shadow-inner md:rounded-2xl">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center">
                <FileText className="w-4 h-4 text-zinc-400" />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-300">01 Source</p>
            </div>
            <div className="flex flex-col gap-2.5">
              {inputs.map((item) => (
                <div key={item} className="flex items-center gap-3 p-2.5 rounded-lg border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] transition-colors group">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-500/40 group-hover:bg-pink-400 transition-colors" />
                  <span className="min-w-0 break-words text-[13px] leading-snug text-zinc-400 transition-colors group-hover:text-zinc-200">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Center: AI Processing */}
          <div className="relative overflow-hidden rounded-xl border border-pink-500/20 bg-gradient-to-b from-pink-500/[0.055] to-transparent p-5 md:rounded-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 blur-[50px] rounded-full pointer-events-none" />
            
            <div className="flex items-center gap-2.5 mb-5 relative z-10">
              <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.15)]">
                <Zap className="w-4 h-4 text-pink-400" />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-pink-100">02 AI Workflow</p>
            </div>
            
            <div className="flex flex-col gap-3 relative z-10">
              {steps.map((step, i) => (
                <div key={step} className="flex items-center gap-3.5 p-3 rounded-lg border border-pink-500/10 bg-[#0a0a0a]/60 backdrop-blur-sm relative group">
                  <div className="flex items-center justify-center w-6 h-6 rounded-md bg-pink-500/10 border border-pink-500/20 text-[10px] font-bold text-pink-400 shrink-0 tabular-nums">
                    0{i + 1}
                  </div>
                  <div className="min-w-0">
                    <span className="block break-words text-[13px] font-medium leading-snug text-white">{step}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="absolute left-[23px] top-[34px] w-px h-3 bg-pink-500/20" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Output Preview */}
          <div className="relative flex min-h-[330px] flex-col rounded-xl border border-white/[0.06] bg-[#0a0a0a] p-5 shadow-inner md:rounded-2xl lg:min-h-0">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                <Layers className="w-4 h-4 text-orange-400" />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-orange-100">03 {output}</p>
            </div>

            {/* Mini Carousel Preview */}
            <div className="relative flex min-h-[230px] flex-1 flex-col items-center justify-center overflow-hidden rounded-xl border border-white/[0.05] bg-[#111] p-4">
              <div className="pointer-events-none absolute inset-x-8 top-8 h-24 rounded-full bg-orange-500/[0.07] blur-[50px]" aria-hidden="true" />
              <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-75">
                {/* Slide 1 */}
                <div className="z-10 flex h-32 w-24 translate-x-4 -rotate-6 flex-col gap-1.5 rounded-md border border-white/[0.05] bg-[#1a1a1a] p-2 shadow-lg">
                  <div className="w-3/4 h-2 rounded-sm bg-zinc-800" />
                  <div className="w-full h-1.5 rounded-sm bg-zinc-800" />
                  <div className="w-4/5 h-1.5 rounded-sm bg-zinc-800" />
                </div>
                {/* Slide 2 */}
                <div className="z-20 flex h-40 w-32 flex-col gap-2 rounded-lg border border-orange-500/25 bg-gradient-to-br from-[#242424] to-[#111] p-3 shadow-xl shadow-black/50">
                  <div className="flex items-center gap-1.5 mb-1">
                    <AlignLeft className="w-3 h-3 text-orange-400/70" />
                    <div className="w-10 h-1.5 rounded-sm bg-orange-400/20" />
                  </div>
                  <div className="w-full h-2.5 rounded-sm bg-zinc-300" />
                  <div className="w-5/6 h-2.5 rounded-sm bg-zinc-300" />
                  <div className="w-full flex-1 rounded-sm bg-white/[0.02] mt-2 border border-white/[0.02] flex items-center justify-center">
                    <ImageIcon className="w-4 h-4 text-zinc-700" />
                  </div>
                </div>
                {/* Slide 3 */}
                <div className="z-10 flex h-32 w-24 -translate-x-4 rotate-6 flex-col gap-1.5 rounded-md border border-white/[0.05] bg-[#1a1a1a] p-2 shadow-lg">
                  <div className="w-full h-1.5 rounded-sm bg-zinc-800" />
                  <div className="w-5/6 h-1.5 rounded-sm bg-zinc-800" />
                  <div className="w-full h-10 mt-auto rounded-sm bg-zinc-800/50" />
                </div>
              </div>
              
              <div className="relative z-30 mt-auto pt-36">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                  <span className="text-[10px] font-medium text-zinc-300">Draft ready to refine</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
