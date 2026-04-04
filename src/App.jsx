import React, { useState } from 'react';
import { MainLayout } from './components/MainLayout';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ShowcaseSlider } from './components/ShowcaseSlider';
import { ProblemSection } from './components/ProblemSection';
import { ToolsSection } from './components/ToolsSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { DifferentiationSection } from './components/DifferentiationSection';
import { FAQSection } from './components/FAQSection';
import { FinalCTASection } from './components/FinalCTASection';
import { Footer } from './components/Footer';

function App() {
  const [lang, setLang] = useState('RU');

  return (
    <MainLayout>
      <Header lang={lang} setLang={setLang} />
      <HeroSection lang={lang} />
      <ShowcaseSlider />
      <ProblemSection />
      <ToolsSection />
      <HowItWorksSection />
      <DifferentiationSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </MainLayout>
  );
}

export default App;
