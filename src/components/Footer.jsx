import React, { useState } from 'react';
import { PrivacyPolicy } from './PrivacyPolicy';
import { TermsOfService } from './TermsOfService';
import { UserConsent } from './UserConsent';
import { Logo } from './Header';

export const Footer = () => {
  const [modal, setModal] = useState(null); // 'privacy' | 'terms' | 'consent' | null

  return (
    <>
      {/* Modals */}
      {modal === 'privacy' && <PrivacyPolicy onClose={() => setModal(null)} />}
      {modal === 'terms'   && <TermsOfService onClose={() => setModal(null)} />}
      {modal === 'consent' && <UserConsent onClose={() => setModal(null)} />}

      <footer className="relative z-10 w-full bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">

          {/* Top row: Logo left, links right */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-12">

            {/* Logo */}
            <Logo />

            {/* Legal links */}
            <nav className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-3">
              <button
                onClick={() => setModal('privacy')}
                className="text-[11px] text-zinc-500 hover:text-white transition-colors duration-300 font-medium cursor-pointer"
              >
                Политика конфиденциальности
              </button>
              <button
                onClick={() => setModal('terms')}
                className="text-[11px] text-zinc-500 hover:text-white transition-colors duration-300 font-medium cursor-pointer"
              >
                Оферта
              </button>
              <button
                onClick={() => setModal('consent')}
                className="text-[11px] text-zinc-500 hover:text-white transition-colors duration-300 font-medium cursor-pointer"
              >
                Согласие на обработку данных
              </button>
              <a
                href="mailto:gotoflow.io@gmail.com"
                className="text-[11px] text-zinc-500 hover:text-white transition-colors duration-300 font-medium"
              >
                Контакты
              </a>
            </nav>
          </div>

          {/* Bottom copyright — centered on mobile, left-aligned on desktop */}
          <div className="mt-10 md:mt-14 pt-6 border-t border-white/[0.04]">
            <p className="text-[11px] text-zinc-500 font-medium text-center md:text-left">
              © 2026 GoToFlow. Все права защищены.
            </p>
          </div>

        </div>
      </footer>
    </>
  );
};
