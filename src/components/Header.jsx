import React from 'react';
import { Sun, Moon, Globe, ChevronRight } from 'lucide-react';

const Logo = () => (
  <div className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105">
    <div className="relative w-9 h-9 flex items-center justify-center">
       <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-orange-400 rounded-lg blur-[6px] opacity-60 dark:opacity-80" />
       <div className="relative w-full h-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-xl flex items-center justify-center p-1.5 shadow-sm">
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
    <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-300">
      GoToFlow
    </span>
  </div>
);

export const Header = ({ isDark, setIsDark }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200/50 dark:border-white/5 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />
        
        <div className="flex items-center gap-2 bg-zinc-100/80 dark:bg-zinc-900/80 rounded-full p-1 border border-zinc-200/50 dark:border-zinc-800/50">
          <button 
            onClick={() => setIsDark(false)} 
            className={`p-1.5 rounded-full transition-all duration-300 ${!isDark ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'}`}
          >
            <Sun className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setIsDark(true)} 
            className={`p-1.5 rounded-full transition-all duration-300 ${isDark ? 'bg-[#1a1a1a] shadow-sm text-zinc-100 ring-1 ring-white/10' : 'text-zinc-500 hover:text-zinc-100'}`}
          >
            <Moon className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-4 bg-zinc-300 dark:bg-zinc-700 mx-1"></div>
          <button className="flex items-center gap-1 p-1.5 px-3 text-xs font-semibold tracking-wide text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            <Globe className="w-3.5 h-3.5" />
            RU
          </button>
        </div>

        <button className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-pink-500 to-orange-400 hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(236,72,153,0.3)]">
          Начать <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
