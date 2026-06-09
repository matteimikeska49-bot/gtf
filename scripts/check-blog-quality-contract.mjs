import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'src/content/blog/articles');

// The required frontmatter fields for the new Quality Contract
const REQUIRED_FIELDS = [
  'articleType',
  'productFit',
  'productFitExplanation',
  'requiredVisualBlock',
  'faqFormat',
  'qualityGateStatus'
];

const VALID_ARTICLE_TYPES = [
  'workflow_article',
  'technical_guide',
  'how_to',
  'comparison',
  'definition',
  'listicle',
  'product_led_guide',
  'ideas_article',
  'guide', // Added legacy mapping
  'prompt-library'
];

const VALID_PRODUCT_FIT = ['YES', 'PARTIAL', 'NO'];

function parseFrontmatterAndBody(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, body: content };
  const data = {};
  const body = match[2];
  
  const frontmatterStr = match[1];
  const lines = frontmatterStr.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '') continue;
    
    if (line.startsWith('  - ')) continue;
    if (line.startsWith('  ')) continue;
    
    if (line.includes(':')) {
      let [key, ...rest] = line.split(':');
      key = key.trim();
      let value = rest.join(':').trim();
      
      if (value === '') continue;
      
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      } else if (value === 'true') {
        value = true;
      } else if (value === 'false') {
        value = false;
      }
      data[key] = value;
    }
  }
  
  return { data, body };
}

function checkArticleQualityContract() {
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
  let hasErrors = false;
  let countChecked = 0;

  console.log('📝 Checking Blog Article Quality Contract...\n');

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const { data: frontmatter, body: markdownBody } = parseFrontmatterAndBody(content);
    const hasQualityGate = !!frontmatter.qualityGateStatus;
    
    if (!hasQualityGate) continue;

    countChecked++;
    let articleErrors = [];

    // 1. Check required fields
    for (const field of REQUIRED_FIELDS) {
      if (frontmatter[field] === undefined) {
        articleErrors.push(`Missing required field: ${field}`);
      }
    }

    if (frontmatter.articleType && !VALID_ARTICLE_TYPES.includes(frontmatter.articleType)) {
      articleErrors.push(`Invalid articleType: ${frontmatter.articleType}`);
    }

    if (frontmatter.productFit && !VALID_PRODUCT_FIT.includes(frontmatter.productFit)) {
      articleErrors.push(`Invalid productFit: ${frontmatter.productFit}`);
    }

    if (frontmatter.productFit === 'PARTIAL') {
      if (!frontmatter.productFitExplanation) {
        articleErrors.push(`productFit is PARTIAL but productFitExplanation is empty/missing`);
      }
      if (!markdownBody.includes('GoToFlow') && !markdownBody.includes('Canva') && !markdownBody.includes('Figma')) {
         // simple heuristic for product fit section
         articleErrors.push(`productFit PARTIAL requires a visible limitation/product-fit note.`);
      }
    }

    if (frontmatter.published === true && frontmatter.qualityGateStatus !== 'passed') {
      articleErrors.push(`Article is published but qualityGateStatus is not 'passed' (is '${frontmatter.qualityGateStatus}')`);
    }

    if (frontmatter.faqFormat && frontmatter.faqFormat !== 'structured') {
      articleErrors.push(`faqFormat must be 'structured'`);
    }

    // Technical guide specific rule
    if (frontmatter.articleType === 'technical_guide') {
      if (!markdownBody.includes('|') && !markdownBody.includes(':::cards\ntype: checklist')) {
         articleErrors.push(`technical_guide requires a technical table/spec/checklist block. Mockup alone is not enough.`);
      }
    }

    // Workflow / product led guide rule
    if (['workflow_article', 'product_led_guide'].includes(frontmatter.articleType)) {
      if (!markdownBody.includes(':::cards\ntype: workflow') && !markdownBody.includes(':::mockup')) {
         articleErrors.push(`Workflow/product-led guide requires a workflow or mockup block.`);
      }
    }

    // Duplicate Quick Answer rule
    if (/##\s*(Краткий ответ|Quick Answer|Короткий ответ)/i.test(markdownBody)) {
      articleErrors.push(`Duplicate quick answer heading in body. Use frontmatter/template quickAnswer block only.`);
    }

    // Loose FAQ
    if (/##\s*(FAQ|Частые вопросы|Часто задаваемые вопросы)/i.test(markdownBody)) {
      articleErrors.push(`Loose FAQ markdown section detected. Use structured faq frontmatter only.`);
    }

    // Raw artifacts
    if (markdownBody.includes('*(For a deeper dive')) {
       articleErrors.push(`Found raw markdown artifact: '*(For a deeper dive'`);
    }
    if (/\*\([^)]+\)\*/.test(markdownBody)) {
       articleErrors.push(`Found potentially visible raw markdown artifact like '*(...)*'`);
    }
    if (/\[Link to /i.test(markdownBody)) {
       articleErrors.push(`Found potentially visible raw markdown artifact like '[Link to'`);
    }
    const rawPatterns = ['if exists', 'if available', 'future link', 'TODO', 'TBD'];
    for (const p of rawPatterns) {
      if (markdownBody.includes(p)) {
         articleErrors.push(`Found raw artifact: '${p}'`);
      }
    }
    if (markdownBody.includes(':::mockup\n\n:::') || markdownBody.includes(':::mockup\n:::')) {
       articleErrors.push(`Found empty :::mockup block`);
    }

    // Misleading claims
    const misleading = ["гарантирует", "идеально", "без ошибок", "автоматически создаёт бесшовную карусель", "seamless guaranteed"];
    for (const m of misleading) {
      if (markdownBody.toLowerCase().includes(m)) {
         // allow "идеально" if followed by "подходит", but let's just flag the strict ones for now
         if (m === 'идеально' && markdownBody.toLowerCase().includes('идеально подходит')) continue;
         articleErrors.push(`Misleading claim detected: '${m}'`);
      }
    }

    if (articleErrors.length > 0) {
      console.log(`❌ ${file} failed Quality Contract:`);
      articleErrors.forEach(err => console.log(`   - ${err}`));
      hasErrors = true;
    }
  }

  console.log(`\nChecked ${countChecked} articles.`);

  if (hasErrors) {
    console.error('\n💥 QUALITY CONTRACT FAILED. Please fix the errors above.');
    process.exit(1);
  } else {
    console.log('\n🎉 ALL ARTICLES PASSED QUALITY CONTRACT.');
    process.exit(0);
  }
}

checkArticleQualityContract();
