import { Link } from 'react-router-dom';
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MainLayout } from './MainLayout';
import { CookieBanner } from './CookieBanner';
import { TestimonialsSection } from './TestimonialsSection';
import { SEOHead, CarouselHero, CarouselShowcase, CarouselProblem, CarouselComparison } from './carousel/CarouselSections';
import { CarouselHowItWorks, CarouselDifferentiation, CarouselSEOBlock, CarouselFAQ, CarouselBottomCTA } from './carousel/CarouselSections2';
import { ProductRelatedResources } from './ProductRelatedResources';

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
    <ProductRelatedResources blocks={[
      {
        title: "Create different types of content with AI:",
        links: [
          { url: "/linkedin-carousel-maker", label: "LinkedIn carousels" },
          { url: "/ai-instagram-post-generator", label: "Instagram posts" },
          { url: "/ai-content-generator", label: "Full content" }
        ]
      },
      {
        title: "Related guides & prompts:",
        links: [
          { url: "/blog/instagram-carousel-prompts", label: "Instagram carousel prompts" },
          { url: "/blog/linkedin-carousel-prompts", label: "LinkedIn carousel prompts" },
          { url: "/blog/best-ai-carousel-generators", label: "Best AI carousel generators" }
        ]
      }
    ]} />
    <TestimonialsSection />
    <CarouselFAQ />
    <CarouselBottomCTA />
    <Footer />
    <CookieBanner />
  </MainLayout>
);
