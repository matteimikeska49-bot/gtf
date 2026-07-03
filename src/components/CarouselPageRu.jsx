import { Link } from 'react-router-dom';
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MainLayout } from './MainLayout';
import { CookieBanner } from './CookieBanner';
import { TestimonialsSection } from './TestimonialsSection';
import { SEOHeadRu, CarouselHeroRu, CarouselShowcaseRu, CarouselProblemRu, CarouselComparisonRu } from './carousel/CarouselSectionsRu';
import { CarouselHowItWorksRu, CarouselDifferentiationRu, CarouselSEOBlockRu, CarouselFAQRu, CarouselBottomCTARu } from './carousel/CarouselSections2Ru';
import { ProductRelatedResources } from './ProductRelatedResources';
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
    <ProductRelatedResources blocks={[
      {
        title: "Другие инструменты:",
        links: [
          { url: "/ru/generator-karuselej-linkedin", label: "Генератор каруселей для LinkedIn" },
          { url: "/ru/generator-kontenta", label: "AI-генератор контента" }
        ]
      }
    ]} />
    <TestimonialsSection />
    <CarouselFAQRu />
    <CarouselBottomCTARu />
    <Footer />
    <CookieBanner />
  </MainLayout>
);
