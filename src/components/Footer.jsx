import React, { useState } from 'react';
import { PrivacyPolicy } from './PrivacyPolicy';
import { TermsOfService } from './TermsOfService';
import { UserConsent } from './UserConsent';
import { Logo } from './Header';
import { useLanguage } from '../context/LanguageContext';

export const Footer = () => {
  const [modal, setModal] = useState(null); // 'privacy' | 'terms' | 'consent' | null
  const { t } = useLanguage();

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
                {t('footer.copyright')}
              </p>
            </div>

            {/* Right Hand: Legal Links & Socials */}
            <div className="flex flex-col lg:flex-row items-center justify-center md:justify-end gap-6 md:gap-8">
              <nav className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-3">
                <button
                  onClick={() => setModal('privacy')}
                  className="text-[11px] text-zinc-500 hover:text-white transition-colors duration-300 font-medium cursor-pointer"
                >
                  {t('footer.privacy')}
                </button>
                <button
                  onClick={() => setModal('terms')}
                  className="text-[11px] text-zinc-500 hover:text-white transition-colors duration-300 font-medium cursor-pointer"
                >
                  {t('footer.terms')}
                </button>
                <button
                  onClick={() => setModal('consent')}
                  className="text-[11px] text-zinc-500 hover:text-white transition-colors duration-300 font-medium cursor-pointer"
                >
                  {t('footer.consent')}
                </button>
              </nav>

              {/* Separator line for larger screens */}
              <div className="hidden lg:block w-px h-4 bg-white/10" />

              {/* Social Icons */}
              <div className="flex items-center gap-5">
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors duration-300" aria-label="Telegram">
                  <svg className="w-5 h-5 -ml-0.5 -mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors duration-300" aria-label="Instagram">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
            
          </div>

        </div>
      </footer>
    </>
  );
};
