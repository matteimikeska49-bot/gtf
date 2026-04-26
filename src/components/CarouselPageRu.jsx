import { Link } from 'react-router-dom';
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MainLayout } from './MainLayout';
import { CookieBanner } from './CookieBanner';
import { SEOHeadRu, CarouselHeroRu, CarouselShowcaseRu, CarouselProblemRu, CarouselComparisonRu } from './carousel/CarouselSectionsRu';
import { CarouselHowItWorksRu, CarouselDifferentiationRu, CarouselSEOBlockRu, CarouselFAQRu, CarouselBottomCTARu } from './carousel/CarouselSections2Ru';

export const CarouselPageRu = () => (
  <MainLayout>
    <SEOHeadRu />
    <Header />
    <CarouselHeroRu />
    <CarouselShowcaseRu />
    <CarouselProblemRu />
    <CarouselComparisonRu />
    <CarouselHowItWorksRu />
    <CarouselDifferentiationRu />
    <CarouselSEOBlockRu />
    <section className="py-6 px-6 bg-[#050505] relative z-10 w-full flex justify-center">
      <div className="max-w-3xl w-full p-6 md:p-8 rounded-2xl border border-white/[0.05] bg-white/[0.02]">
        <h3 className="text-white font-medium mb-4 text-base md:text-lg">Создавайте разные форматы контента:</h3>
        <ul className="space-y-3 text-sm md:text-base">
            <li className="flex items-center gap-2"><span className="text-pink-500">•</span><Link to="/ru/generator-karuselej-linkedin" className="text-zinc-300 hover:text-pink-400 transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-pink-400/50">Карусели для LinkedIn</Link></li>
            <li className="flex items-center gap-2"><span className="text-pink-500">•</span><Link to="/ru/generator-postov-instagram" className="text-zinc-300 hover:text-pink-400 transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-pink-400/50">Посты для Instagram</Link></li>
            <li className="flex items-center gap-2"><span className="text-pink-500">•</span><Link to="/ru/generator-kontenta" className="text-zinc-300 hover:text-pink-400 transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-pink-400/50">Полный контент</Link></li>
        </ul>
      </div>
    </section>
    <CarouselFAQRu />
    <CarouselBottomCTARu />
    <Footer />
    <CookieBanner />
  </MainLayout>
);
