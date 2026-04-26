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
    <CarouselFAQRu />
    <CarouselBottomCTARu />
    <Footer />
    <CookieBanner />
  </MainLayout>
);
