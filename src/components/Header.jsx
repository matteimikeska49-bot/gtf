import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export const Logo = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex items-center gap-2.5 cursor-pointer transition-transform hover:scale-105">
      <div className="relative w-9 h-9 flex items-center justify-center">
         <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-orange-400 rounded-lg blur-[6px] opacity-70" />
         <div className="relative w-full h-full bg-[#0a0a0a] border border-white/10 rounded-xl flex items-center justify-center overflow-hidden">
            {!imgError ? (
              <img 
                src="/images/logo.png" 
                alt="Logo" 
                onError={() => setImgError(true)}
                className="w-[95%] h-[95%] object-contain"
              />
            ) : (
              <svg viewBox="0 0 24 24" fill="none" className="w-[65%] h-[65%]">
                <path d="M18.36 5.64A9 9 0 1 0 18.36 18.36" stroke="url(#logo-grad-h)" strokeWidth="3.5" strokeLinecap="round" />
                <defs>
                  <linearGradient id="logo-grad-h" x1="0" y1="0" x2="24" y2="24">
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>
              </svg>
            )}
         </div>
      </div>
      <span className="text-xl font-extrabold tracking-tight text-white">GoToFlow</span>
    </div>
  );
};

import { useLanguage } from '../context/LanguageContext';

export const Header = () => {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.05] bg-[#050505]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <Logo />



        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <div className="flex items-center rounded-full border border-white/10 bg-white/[0.04] overflow-hidden p-0.5">
            {['RU', 'EN'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider transition-all duration-200 ${
                  lang === l
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* CTA — desktop */}
          <button className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-pink-500 to-orange-500 shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_35px_rgba(236,72,153,0.5)] hover:scale-105 active:scale-[0.98] transition-all duration-300 border border-pink-400/20">
            {t('common.startFree')}
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* CTA — mobile */}
          <button className="md:hidden flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-xs text-white bg-gradient-to-r from-pink-500 to-orange-500 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
            {t('common.start')}
          </button>
        </div>
      </div>
    </header>
  );
};
