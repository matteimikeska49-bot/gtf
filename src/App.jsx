import React from 'react';
import { MainLayout } from './components/MainLayout';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { ToolsSection } from './components/ToolsSection';

function App() {
  return (
    <MainLayout>
      {(isDark, setIsDark) => (
        <>
          <Header isDark={isDark} setIsDark={setIsDark} />
          <HeroSection />
          <ProblemSection />
          <ToolsSection />
        </>
      )}
    </MainLayout>
  );
}

export default App;
