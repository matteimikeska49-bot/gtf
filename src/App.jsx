import React from 'react';
import { MainLayout } from './components/MainLayout';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { ToolsSection } from './components/ToolsSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { DifferentiationSection } from './components/DifferentiationSection';
import { FAQSection } from './components/FAQSection';
import { FinalCTASection } from './components/FinalCTASection';
import { Footer } from './components/Footer';

function App() {
  return (
    <MainLayout>
      {(isDark, setIsDark) => (
        <>
          <Header isDark={isDark} setIsDark={setIsDark} />
          <HeroSection />
          <ProblemSection />
          <ToolsSection />
          <HowItWorksSection />
          <DifferentiationSection />
          <FAQSection />
          <FinalCTASection />
          <Footer />
        </>
      )}
    </MainLayout>
  );
}

export default App;
