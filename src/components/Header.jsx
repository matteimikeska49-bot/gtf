import React from 'react';
import { ChevronRight } from 'lucide-react';

const Logo = () => (
  <div className="flex items-center gap-2.5 cursor-pointer transition-transform hover:scale-105">
    <div className="relative w-9 h-9 flex items-center justify-center">
       <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-orange-400 rounded-lg blur-[6px] opacity-70" />
       <div className="relative w-full h-full bg-[#0a0a0a] border border-white/10 rounded-xl flex items-center justify-center p-1.5">
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <path d="M18.36 5.64A9 9 0 1 0 18.36 18.36" stroke="url(#logo-grad)" strokeWidth="3.5" strokeLinecap="round" />
            <defs>
              <linearGradient id="logo-grad" x1="0" y1="0" x2="24" y2="24">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>
          </svg>
       </div>
    </div>
    <span className="text-xl font-extrabold tracking-tight text-white">
      GoToFlow
    </span>
  </div>
);

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.05] bg-[#050505]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />

        {/* Nav links — desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Возможности</a>
          <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Как это работает</a>
          <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">FAQ</a>
        </nav>

        {/* CTA */}
        <button className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-pink-500 to-orange-500 shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_35px_rgba(236,72,153,0.5)] hover:scale-105 active:scale-[0.98] transition-all duration-300 border border-pink-400/20">
          Начать бесплатно
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Mobile CTA */}
        <button className="md:hidden flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-xs text-white bg-gradient-to-r from-pink-500 to-orange-500 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
          Начать
        </button>
      </div>
    </header>
  );
};
