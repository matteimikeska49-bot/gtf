import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import { RuAICarouselGeneratorPage } from './components/RuAICarouselGeneratorPage';
import { AIContentPage } from './components/AIContentPage';
import { InstagramPostPage } from './components/InstagramPostPage';
import { AIContentPageRu } from './components/AIContentPageRu';
import { InstagramPostPageRu } from './components/InstagramPostPageRu';
import { LinkedInCarouselPage } from './components/LinkedInCarouselPage';
import { LinkedInCarouselPageRu } from './components/LinkedInCarouselPageRu';
import { LinkedInPostPage } from './components/LinkedInPostPage';
import { LinkedInPostPageRu } from './components/LinkedInPostPageRu';
import { BlogPage } from './components/BlogPage';
import { BlogPageRu } from './components/BlogPageRu';



import { MarkdownBlogArticlePage } from './components/blog/MarkdownBlogArticlePage';
import { SeoHubPage } from './components/seo/SeoHubPage';
import { SeoPageRoute } from './components/seo/SeoPageRoute';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { RefundPolicyPage } from './components/RefundPolicyPage';
import { TermsOfServicePage } from './components/TermsOfServicePage';
import { PersonalDataConsentPage } from './components/PersonalDataConsentPage';
import { NotFoundPage } from './components/NotFoundPage';
import { PricingPage } from './components/PricingPage';
import { RuTermsOfServicePage } from './components/RuTermsOfServicePage';
import { RuPersonalDataConsentPage } from './components/RuPersonalDataConsentPage';
import { UgcCreatorTermsRu } from './components/UgcCreatorTermsRu';

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
import { getRouteAliasTarget } from './routes/routeAliases';

function App() {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <RouteSchemaInjector />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/ru" element={<LandingPage />} />
        <Route path="/ai-carousel-maker" element={<CarouselPage />} />
        <Route path="/carousel-maker" element={<Navigate to={getRouteAliasTarget('/carousel-maker')} replace />} />
        <Route path="/ai-instagram-post-generator" element={<InstagramPostPage />} />
        <Route path="/ai-linkedin-post-generator" element={<LinkedInPostPage />} />
        <Route path="/instagram-carousel-maker" element={<CarouselPage />} />
        
        {/* RU Tool Pages (200 OK SEO structure) */}
        <Route path="/ru/ai-generator-karuselej" element={<RuAICarouselGeneratorPage />} />
        <Route path="/ru/ii-generator-karuseley" element={<RuAICarouselGeneratorPage />} />
        <Route path="/ru/generator-karuselej-instagram" element={<RuAICarouselGeneratorPage />} />
        <Route path="/ai-content-generator" element={<AIContentPage />} />
        <Route path="/ai-post-maker" element={<Navigate to={getRouteAliasTarget('/ai-post-maker')} replace />} />
        <Route path="/ru/generator-kontenta" element={<AIContentPageRu />} />
        <Route path="/ru/ii-generator-kontenta" element={<AIContentPageRu />} />
        <Route path="/ru/generator-postov-instagram" element={<InstagramPostPageRu />} />
        <Route path="/ru/ii-generator-postov-dlya-instagram" element={<InstagramPostPageRu />} />
        <Route path="/linkedin-carousel-maker" element={<LinkedInCarouselPage />} />
        <Route path="/ru/generator-karuselej-linkedin" element={<LinkedInCarouselPageRu />} />
        <Route path="/ru/ii-generator-postov-dlya-linkedin" element={<LinkedInPostPageRu />} />
        <Route path="/ru/tools" element={<SeoHubPage pageType="tool" />} />
        <Route path="/ru/platforms" element={<SeoHubPage pageType="platform" />} />
        <Route path="/ru/use-cases" element={<SeoHubPage pageType="useCase" />} />
        <Route path="/ru/templates" element={<SeoHubPage pageType="template" />} />
        <Route path="/ru/examples" element={<SeoHubPage pageType="example" />} />
        <Route path="/ru/prompts" element={<SeoHubPage pageType="prompt" />} />
        <Route path="/ru/alternatives" element={<SeoHubPage pageType="alternative" />} />
        <Route path="/ru/tools/:slug" element={<SeoPageRoute pageType="tool" />} />
        <Route path="/ru/platforms/:slug" element={<SeoPageRoute pageType="platform" />} />
        <Route path="/ru/use-cases/:slug" element={<SeoPageRoute pageType="useCase" />} />
        <Route path="/ru/templates/:slug" element={<SeoPageRoute pageType="template" />} />
        <Route path="/ru/examples/:slug" element={<SeoPageRoute pageType="example" />} />
        <Route path="/ru/prompts/:slug" element={<SeoPageRoute pageType="prompt" />} />
        <Route path="/ru/alternatives/:slug" element={<SeoPageRoute pageType="alternative" />} />
        <Route path="/ru/:slug" element={<SeoPageRoute pageTypes={['commercial', 'tool']} />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/linkedin-carousel-ideas" element={<MarkdownBlogArticlePage slug="linkedin-carousel-ideas" langPrefix="en" />} />
        <Route path="/blog/best-ai-carousel-generators" element={<MarkdownBlogArticlePage slug="best-ai-carousel-generators" langPrefix="en" />} />
        <Route path="/blog/how-to-make-linkedin-carousel-with-ai" element={<MarkdownBlogArticlePage slug="how-to-make-linkedin-carousel-with-ai" />} />
        <Route path="/blog/ai-instagram-carousel-generator" element={<MarkdownBlogArticlePage slug="ai-instagram-carousel-generator" langPrefix="en" />} />
        <Route path="/blog/test-seo-template-v2" element={<MarkdownBlogArticlePage slug="test-seo-template-v2" langPrefix="en" />} />
        <Route path="/blog/linkedin-carousel-prompts" element={<MarkdownBlogArticlePage slug="linkedin-carousel-prompts" langPrefix="en" />} />
        <Route path="/ru/blog/idei-karuselej-linkedin" element={<MarkdownBlogArticlePage slug="idei-karuselej-linkedin" langPrefix="ru" />} />
        <Route path="/ru/blog/luchshie-ai-generatory-karuselej" element={<MarkdownBlogArticlePage slug="luchshie-ai-generatory-karuselej" langPrefix="ru" />} />
        <Route path="/ru/blog/kak-sdelat-karusel-linkedin-s-ai" element={<MarkdownBlogArticlePage slug="kak-sdelat-karusel-linkedin-s-ai" langPrefix="ru" />} />
        <Route path="/ru/blog" element={<BlogPageRu />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/ru/politika" element={<PrivacyPolicyPage />} />
        <Route path="/politika" element={<Navigate to={getRouteAliasTarget('/politika')} replace />} />
        <Route path="/ru/polzovatelskoe-soglashenie" element={<RuTermsOfServicePage />} />
        <Route path="/ru/soglasie-na-obrabotku-personalnyh-dannyh" element={<RuPersonalDataConsentPage />} />
        <Route path="/ru/ugc-creator-terms" element={<UgcCreatorTermsRu />} />
        <Route path="/carousel/create" element={<Navigate to={getRouteAliasTarget('/carousel/create')} replace />} />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/personal-data-consent" element={<PersonalDataConsentPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/blog/:slug" element={<MarkdownBlogArticlePage langPrefix="en" />} />
        <Route path="/ru/blog/:slug" element={<MarkdownBlogArticlePage langPrefix="ru" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;
