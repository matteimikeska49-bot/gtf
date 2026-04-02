import React from 'react';
import { Sparkles } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative z-10 w-full bg-[#050505] border-t border-white/[0.05]">
      {/* Subtle top glow line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Logo */}
        <div className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-pink-500/20 to-orange-500/20 border border-white/10 flex items-center justify-center">
            <div className="absolute inset-0 bg-pink-500/10 blur-md rounded-xl group-hover:bg-pink-500/20 transition-colors duration-500" />
            <Sparkles className="w-4 h-4 text-pink-400 relative z-10" />
          </div>
          <span className="font-bold text-white text-lg tracking-tight">GoToFlow</span>
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap items-center justify-center gap-6">
          <a href="#" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors font-medium">
            Политика конфиденциальности
          </a>
          <a href="#" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors font-medium">
            Условия использования
          </a>
          <a href="#" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors font-medium">
            Контакты
          </a>
        </nav>

        {/* Copyright */}
        <p className="text-sm text-zinc-600 font-medium whitespace-nowrap">
          © 2026 GoToFlow
        </p>
      </div>
    </footer>
  );
};
