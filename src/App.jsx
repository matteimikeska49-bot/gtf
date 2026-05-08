import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { MainLayout } from './components/MainLayout';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ShowcaseSlider } from './components/ShowcaseSlider';
import { ProblemSection } from './components/ProblemSection';
import { UnifiedSystem } from './components/UnifiedSystem';
import { ToolsSection } from './components/ToolsSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { DifferentiationSection } from './components/DifferentiationSection';
import { FAQSection } from './components/FAQSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PricingSection } from './components/PricingSection';
import { BottomCTA } from './components/BottomCTA';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { CarouselPage } from './components/CarouselPage';
import { CarouselPageRu } from './components/CarouselPageRu';
import { AIContentPage } from './components/AIContentPage';
import { InstagramPostPage } from './components/InstagramPostPage';
import { AIContentPageRu } from './components/AIContentPageRu';
import { InstagramPostPageRu } from './components/InstagramPostPageRu';
import { LinkedInCarouselPage } from './components/LinkedInCarouselPage';
import { LinkedInCarouselPageRu } from './components/LinkedInCarouselPageRu';
import { BlogPage } from './components/BlogPage';
import { BlogPageRu } from './components/BlogPageRu';
import { LinkedInCarouselIdeasPage } from './components/blog/LinkedInCarouselIdeasPage';
import { LinkedInCarouselIdeasPageRu } from './components/blog/LinkedInCarouselIdeasPageRu';
import { NotFoundPage } from './components/NotFoundPage';
const LandingPage = () => (
  <MainLayout>
    <Header />
    <HeroSection />
    <ShowcaseSlider />
    <ProblemSection />
    <UnifiedSystem />
    <ToolsSection />
    <HowItWorksSection />
    <DifferentiationSection />
    <FAQSection />
    <TestimonialsSection />
    <PricingSection />
    <BottomCTA />
    <Footer />
    <CookieBanner />
  </MainLayout>
);

import { ScrollToTop } from './components/ScrollToTop';
import { RouteSchemaInjector } from './components/RouteSchemaInjector';

function App() {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <RouteSchemaInjector />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/ru" element={<LandingPage />} />
        <Route path="/ai-carousel-maker" element={<CarouselPage />} />
        <Route path="/ru/ai-generator-karuselej" element={<CarouselPageRu />} />
        <Route path="/ai-content-generator" element={<AIContentPage />} />
        <Route path="/ai-instagram-post-generator" element={<InstagramPostPage />} />
        <Route path="/ru/generator-kontenta" element={<AIContentPageRu />} />
        <Route path="/ru/generator-postov-instagram" element={<InstagramPostPageRu />} />
        <Route path="/linkedin-carousel-maker" element={<LinkedInCarouselPage />} />
        <Route path="/ru/generator-karuselej-linkedin" element={<LinkedInCarouselPageRu />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/linkedin-carousel-ideas" element={<LinkedInCarouselIdeasPage />} />
        <Route path="/ru/blog/idei-karuselej-linkedin" element={<LinkedInCarouselIdeasPageRu />} />
        <Route path="/ru/blog" element={<BlogPageRu />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;
