import { Link } from 'react-router-dom';
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MainLayout } from './MainLayout';
import { CookieBanner } from './CookieBanner';
import { SEOHead, CarouselHero, CarouselShowcase, CarouselProblem, CarouselComparison } from './carousel/CarouselSections';
import { CarouselHowItWorks, CarouselDifferentiation, CarouselSEOBlock, CarouselFAQ, CarouselBottomCTA } from './carousel/CarouselSections2';

export const CarouselPage = () => (
  <MainLayout>
    <SEOHead />
    <Header />
    <CarouselHero />
    <CarouselShowcase />
    <CarouselProblem />
    <CarouselComparison />
    <CarouselHowItWorks />
    <CarouselDifferentiation />
    <CarouselSEOBlock />
    <section className="py-6 px-6 bg-[#050505] relative z-10 w-full flex justify-center">
      <div className="max-w-3xl w-full p-6 md:p-8 rounded-2xl border border-white/[0.05] bg-white/[0.02]">
        <h3 className="text-white font-medium mb-4 text-base md:text-lg">Create different types of content with AI:</h3>
        <ul className="space-y-3 text-sm md:text-base">
            <li className="flex items-center gap-2"><span className="text-pink-500">•</span><Link to="/linkedin-carousel-maker" className="text-zinc-300 hover:text-pink-400 transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-pink-400/50">LinkedIn carousels</Link></li>
            <li className="flex items-center gap-2"><span className="text-pink-500">•</span><Link to="/ai-instagram-post-generator" className="text-zinc-300 hover:text-pink-400 transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-pink-400/50">Instagram posts</Link></li>
            <li className="flex items-center gap-2"><span className="text-pink-500">•</span><Link to="/ai-content-generator" className="text-zinc-300 hover:text-pink-400 transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-pink-400/50">Full content</Link></li>
        </ul>
      </div>
    </section>
    <CarouselFAQ />
    <CarouselBottomCTA />
    <Footer />
    <CookieBanner />
  </MainLayout>
);
