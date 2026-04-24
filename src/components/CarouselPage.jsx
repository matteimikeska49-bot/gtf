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
    <CarouselFAQ />
    <CarouselBottomCTA />
    <Footer />
    <CookieBanner />
  </MainLayout>
);
