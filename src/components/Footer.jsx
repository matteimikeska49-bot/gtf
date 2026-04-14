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

          <div className="flex flex-col md:flex-row justify-between items-center md:items-center gap-8 md:gap-12">
            
            {/* Left Hand: Logo and Copyright */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <Logo />
              <p className="text-[11px] text-zinc-500 font-medium">
                © 2026 GoToFlow. Все права защищены.
              </p>
            </div>

            {/* Right Hand: Legal Links */}
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

        </div>
      </footer>
    </>
  );
};
