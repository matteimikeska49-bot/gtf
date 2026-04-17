import React from 'react';
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

function App() {
  return (
    <LanguageProvider>
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
    </LanguageProvider>
  );
}

export default App;
