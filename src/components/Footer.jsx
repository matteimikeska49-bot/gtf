import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { PrivacyPolicy } from './PrivacyPolicy';
import { TermsOfService } from './TermsOfService';
import { UserConsent } from './UserConsent';

export const Footer = () => {
  const [modal, setModal] = useState(null); // 'privacy' | 'terms' | 'consent' | null

  return (
    <>
      {/* Modals */}
      {modal === 'privacy' && <PrivacyPolicy onClose={() => setModal(null)} />}
      {modal === 'terms'   && <TermsOfService onClose={() => setModal(null)} />}
      {modal === 'consent' && <UserConsent onClose={() => setModal(null)} />}

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

          {/* Legal doc links — tiny and muted */}
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <button
              onClick={() => setModal('privacy')}
              className="text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors font-medium"
            >
              Политика конфиденциальности
            </button>
            <button
              onClick={() => setModal('terms')}
              className="text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors font-medium"
            >
              Оферта
            </button>
            <button
              onClick={() => setModal('consent')}
              className="text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors font-medium"
            >
              Согласие на обработку данных
            </button>
            <a href="mailto:gotoflow.io@gmail.com" className="text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors font-medium">
              Контакты
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-[10px] text-zinc-600 font-medium whitespace-nowrap">
            © 2026 GoToFlow · ИП Черенок А.А.
          </p>
        </div>
      </footer>
    </>
  );
};
