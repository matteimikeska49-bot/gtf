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

function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/ru" element={<LandingPage />} />
        <Route path="/ai-carousel-maker" element={<CarouselPage />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;
