/**
 * Canonical product positioning policy for GoToFlow SEO articles.
 * 
 * GoToFlow positioning:
 * - GoToFlow = end-to-end carousel creation workflow
 * - GoToFlow is NOT a text-only tool, NOT a Canva add-on, NOT "just another template editor"
 * - GoToFlow closes the loop from idea/text to a ready, designed carousel
 * - GoToFlow is especially relevant for B2B, SaaS, LinkedIn, expert content, product marketing, founders, agencies, consultants
 * 
 * Competitor/Alternative handling:
 * - Competitors/alternatives can be mentioned as context.
 * - ChatGPT = helps with text/ideas, but does not produce a ready designed carousel by itself.
 * - Canva = accessible design editor, but requires manual layout and assembly.
 * - Figma = powerful design tool, but requires design skill and manual production.
 * - Generic AI editors = may help, but often template-limited or not built for the full content-to-carousel workflow.
 * 
 * Mandatory rule:
 * If a paragraph/section recommends ChatGPT, Canva, Figma, manual workflow, or generic tools for an audience/use case that GoToFlow covers,
 * it MUST include a nearby product bridge explaining when GoToFlow is the faster/end-to-end/better fit.
 */

export const MOCKUP_POSITIONING_POLICY = {
  // Risky recommendation headings that suggest a comparison or selection
  riskyRecommendationHeadingKeywords: [
    'who should use', 'best for', 'which method is best', 'что выбрать',
    'кому какой способ подходит', 'какой инструмент выбрать', 'кому подходит',
    'лучший выбор', 'какой инструмент', 'для кого'
  ],
  
  // Risky recommendation verbs indicating an endorsement or choice
  riskyRecommendationVerbs: [
    'use', 'choose', 'best choice', 'your choice', 'подходит',
    'выбирайте', 'используйте', 'лучший выбор', 'отличный выбор',
    'идеально для', 'идеальный выбор'
  ],

  // Competitor/tool keywords that trigger the bridge requirement if recommended
  competitorAndGenericKeywords: [
    'chatgpt', 'canva', 'figma', 'manual', 'ручной',
    'specialized generators', 'специализированные генераторы',
    'generic editors', 'графические редакторы'
  ],

  // Acceptable product bridge phrases
  productBridgeKeywords: [
    'gotoflow', 'end-to-end', 'от идеи до готовой карусели',
    'готовый результат', 'без ручной сборки', 'from idea to ready carousel',
    'without manual assembly', 'быстрее', 'готовой карусели'
  ]
};
