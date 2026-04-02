import React from 'react';
import { MainLayout } from './components/MainLayout';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { ToolsSection } from './components/ToolsSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { DifferentiationSection } from './components/DifferentiationSection';

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
        </>
      )}
    </MainLayout>
  );
}

export default App;
