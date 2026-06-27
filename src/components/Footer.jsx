import React, { useState } from 'react';
import { PrivacyPolicy } from './PrivacyPolicy';
import { TermsOfService } from './TermsOfService';
import { UserConsent } from './UserConsent';
import { Logo } from './Header';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const [modal, setModal] = useState(null); // 'privacy' | 'terms' | 'consent' | null
  const { lang } = useLanguage();

  return (
    <>
      {/* Modals */}
      {modal === 'privacy' && <PrivacyPolicy onClose={() => setModal(null)} />}
      {modal === 'terms'   && <TermsOfService onClose={() => setModal(null)} />}
      {modal === 'consent' && <UserConsent onClose={() => setModal(null)} />}

      <footer className="relative z-10 w-full bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8">
            
            {/* Column 1: Brand */}
            <div className="flex flex-col items-start gap-4 lg:col-span-2">
              <Logo />
              <p className="text-[13px] text-zinc-400 font-medium leading-relaxed max-w-sm mt-2">
                {lang === 'RU' 
                  ? 'Создавайте карусели и контент быстрее с AI.' 
                  : 'Create carousels and content faster with AI.'}
              </p>
              <p className="text-[12px] text-zinc-600 font-medium mt-6">
                {lang === 'RU'
                  ? '© 2026 GoToFlow. Все права защищены.'
                  : '© 2026 GoToFlow. All rights reserved.'}
              </p>
            </div>

            {/* Column 2: Product / Tools */}
            <div className="flex flex-col items-start gap-4">
              <h3 className="text-sm font-semibold text-white tracking-wide uppercase mb-2">
                {lang === 'RU' ? 'Инструменты' : 'Tools'}
              </h3>
              <nav className="flex flex-col gap-3">
                {lang === 'RU' ? (
                  <>
                    <Link to="/ru/ii-generator-karuseley" className="text-[13px] text-zinc-400 hover:text-white transition-colors duration-300">ИИ-генератор каруселей</Link>
                    <Link to="/ru/ii-generator-kontenta" className="text-[13px] text-zinc-400 hover:text-white transition-colors duration-300">Генератор контента</Link>
                    <Link to="/ru/ii-generator-postov-dlya-instagram" className="text-[13px] text-zinc-400 hover:text-white transition-colors duration-300">Посты Instagram</Link>
                    <Link to="/ru/ii-generator-postov-dlya-linkedin" className="text-[13px] text-zinc-400 hover:text-white transition-colors duration-300">Посты LinkedIn</Link>
                    <Link to="/ru/generator-karuselej-linkedin" className="text-[13px] text-zinc-400 hover:text-white transition-colors duration-300">Карусели LinkedIn</Link>
                  </>
                ) : (
                  <>
                    <Link to="/ai-carousel-maker" className="text-[13px] text-zinc-400 hover:text-white transition-colors duration-300">AI Carousel Maker</Link>
                    <Link to="/ai-content-generator" className="text-[13px] text-zinc-400 hover:text-white transition-colors duration-300">Content Generator</Link>
                    <Link to="/ai-carousel-maker" className="text-[13px] text-zinc-400 hover:text-white transition-colors duration-300">Carousel Maker / Carousels</Link>
                    <Link to="/linkedin-carousel-maker" className="text-[13px] text-zinc-400 hover:text-white transition-colors duration-300">LinkedIn Carousels</Link>
                    <Link to="/ai-instagram-post-generator" className="text-[13px] text-zinc-400 hover:text-white transition-colors duration-300">Instagram Posts</Link>
                  </>
                )}
              </nav>
            </div>

            {/* Column 3: Resources */}
            <div className="flex flex-col items-start gap-4">
              <h3 className="text-sm font-semibold text-white tracking-wide uppercase mb-2">
                {lang === 'RU' ? 'Ресурсы' : 'Resources'}
              </h3>
              <nav className="flex flex-col gap-3">
                {lang === 'RU' ? (
                  <>
                    <Link to="/ru/blog" className="text-[13px] text-zinc-400 hover:text-white transition-colors duration-300">Блог</Link>
                    <Link to="/ru/blog/shablony-karuseley-v-instagram" className="text-[13px] text-zinc-400 hover:text-white transition-colors duration-300">Шаблоны каруселей Instagram</Link>
                  </>
                ) : (
                  <Link to="/blog" className="text-[13px] text-zinc-400 hover:text-white transition-colors duration-300">Blog</Link>
                )}
              </nav>
            </div>

            {/* Column 4: Legal */}
            <div className="flex flex-col items-start gap-4 lg:col-span-1">
              <h3 className="text-sm font-semibold text-white tracking-wide uppercase mb-2">
                {lang === 'RU' ? 'Документы' : 'Legal'}
              </h3>
              <nav className="flex flex-col gap-3">
                {lang === 'RU' ? (
                  <>
                    <Link to="/ru/politika" className="text-[13px] text-zinc-400 hover:text-white transition-colors duration-300">Политика конфиденциальности</Link>
                    <Link to="/ru/polzovatelskoe-soglashenie" className="text-[13px] text-zinc-400 hover:text-white transition-colors duration-300">Пользовательское соглашение</Link>
                    <Link to="/ru/soglasie-na-obrabotku-personalnyh-dannyh" className="text-[13px] text-zinc-400 hover:text-white transition-colors duration-300">Согласие на обработку данных</Link>
                    <Link to="/ru/ugc-creator-terms" className="text-[13px] text-zinc-400 hover:text-white transition-colors duration-300">Условия для UGC-креаторов</Link>
                  </>
                ) : (
                  <>
                    <Link to="/privacy-policy" className="text-[13px] text-zinc-400 hover:text-white transition-colors duration-300">Privacy Policy</Link>
                    <Link to="/terms-of-service" className="text-[13px] text-zinc-400 hover:text-white transition-colors duration-300">Terms of Service</Link>
                    <Link to="/personal-data-consent" className="text-[13px] text-zinc-400 hover:text-white transition-colors duration-300">Personal Data Consent</Link>
                    <Link to="/refund-policy" className="text-[13px] text-zinc-400 hover:text-white transition-colors duration-300">Refund Policy</Link>
                  </>
                )}
              </nav>
            </div>

            {/* Column 5: Social */}
            <div className="flex flex-col items-start gap-4">
              <h3 className="text-sm font-semibold text-white tracking-wide uppercase mb-2">
                {lang === 'RU' ? 'Поддержка' : 'Support'}
              </h3>
              <div className="flex flex-col gap-3">
                <a href="https://t.me/GoToFlowio" target="_blank" rel="noopener noreferrer" aria-label="GoToFlow Telegram" className="text-zinc-400 hover:text-white transition-colors duration-300 flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                  <span className="text-[13px] font-medium">Telegram</span>
                </a>
                
                {/* Instagram hidden from UI */}
                {/*
                <a href="https://instagram.com/gotoflow" target="_blank" rel="noopener noreferrer" aria-label="GoToFlow Instagram" className="text-zinc-400 hover:text-white transition-colors duration-300 flex items-center gap-2 hidden">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                */}
              </div>
            </div>

          </div>

        </div>
      </footer>
    </>
  );
};
