import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MainLayout } from './MainLayout';
import { CookieBanner } from './CookieBanner';

/**
 * Shared layout for all legal document pages.
 * Card-style design with dark background, border, and rounded corners.
 */
export const LegalPageLayout = ({ title, effectiveDate, sections, intro, children }) => {
  return (
    <MainLayout>
      {children}
      <Header />
      <main className="pt-28 md:pt-32 pb-16 md:pb-24 px-4 md:px-6 relative z-10 w-full bg-[#050505] flex-1">
        <div className="max-w-[960px] mx-auto">
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl px-6 md:px-12 py-8 md:py-14">
            {/* Header */}
            <div className="mb-10 md:mb-14">
              <h1 className="text-2xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-3">
                {title}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                <p className="text-xs md:text-sm text-zinc-500">GoToFlow · gotoflow.io</p>
                {effectiveDate && (
                  <p className="text-xs md:text-sm text-zinc-600">{effectiveDate}</p>
                )}
              </div>
            </div>

            {/* Intro text if provided */}
            {intro && (
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 md:mb-10">
                {intro}
              </p>
            )}

            {/* Sections */}
            <div className="flex flex-col gap-8 md:gap-10">
              {Array.isArray(sections) && sections.map((sec, i) => (
                <div key={i}>
                  <h3 className="text-base md:text-lg font-bold text-white mb-3 md:mb-4 tracking-tight leading-snug">
                    {sec.title}
                  </h3>
                  <ul className="flex flex-col gap-2.5 md:gap-3">
                    {sec.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 md:gap-4 text-zinc-400 text-sm md:text-base leading-relaxed">
                        <span className="mt-[7px] md:mt-2 w-1.5 h-1.5 rounded-full bg-pink-500/50 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </MainLayout>
  );
};
