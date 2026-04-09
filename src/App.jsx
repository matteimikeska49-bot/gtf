import React, { useState } from 'react';
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
import { FinalCTASection } from './components/FinalCTASection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PricingSection } from './components/PricingSection';
import { Footer } from './components/Footer';

function App() {
  const [lang, setLang] = useState('RU');

  return (
    <MainLayout>
      <Header lang={lang} setLang={setLang} />
      <HeroSection lang={lang} />
      <ShowcaseSlider />
      <ProblemSection />
      <UnifiedSystem />
      <ToolsSection />
      <HowItWorksSection />
      <DifferentiationSection />
      <FAQSection />
      <TestimonialsSection />
      <PricingSection />
      <FinalCTASection />
      <Footer />
    </MainLayout>
  );
}

export default App;
