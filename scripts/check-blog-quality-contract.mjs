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
  
  let currentKey = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '') continue;
    
    if (line.startsWith('  - ')) { 
      // simple array parser
      continue;
    } else if (line.startsWith('  ')) { 
      // simple object parser
      continue;
    }
    
    if (line.includes(':')) {
      let [key, ...rest] = line.split(':');
      key = key.trim();
      let value = rest.join(':').trim();
      currentKey = key;
      
      if (value === '') {
        continue;
      }
      
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
    
    // We enforce for anything that opts-in
    if (!hasQualityGate) {
      continue;
    }

    countChecked++;
    let articleErrors = [];

    // 1. Check required fields
    for (const field of REQUIRED_FIELDS) {
      if (frontmatter[field] === undefined) {
        articleErrors.push(`Missing required field: ${field}`);
      }
    }

    // 2. Validate field values
    if (frontmatter.articleType && !VALID_ARTICLE_TYPES.includes(frontmatter.articleType)) {
      articleErrors.push(`Invalid articleType: ${frontmatter.articleType}`);
    }

    if (frontmatter.productFit && !VALID_PRODUCT_FIT.includes(frontmatter.productFit)) {
      articleErrors.push(`Invalid productFit: ${frontmatter.productFit}`);
    }

    if (frontmatter.productFit === 'PARTIAL' && !frontmatter.productFitExplanation) {
      articleErrors.push(`productFit is PARTIAL but productFitExplanation is empty/missing`);
    }

    if (frontmatter.published === true && frontmatter.qualityGateStatus !== 'passed') {
      articleErrors.push(`Article is published but qualityGateStatus is not 'passed' (is '${frontmatter.qualityGateStatus}')`);
    }

    if (frontmatter.faqFormat && frontmatter.faqFormat !== 'structured') {
      articleErrors.push(`faqFormat must be 'structured'`);
    }

    // 3. Visual Block Gate
    const requiredBlock = frontmatter.requiredVisualBlock || '';
    if (requiredBlock && !markdownBody.includes(requiredBlock) && !markdownBody.includes(':::mockup')) {
      if (!markdownBody.includes(':::cards') && !markdownBody.includes('|') && !markdownBody.includes(':::prompts')) {
         articleErrors.push(`Missing required visual block. Specified '${requiredBlock}' but no visual blocks found in markdown.`);
      }
    }

    // 4. FAQ Gate
    if (/##\s*(Часто задаваемые вопросы|FAQ|Frequently Asked Questions)/i.test(markdownBody)) {
      articleErrors.push(`Found '## FAQ' or '## Часто задаваемые вопросы' in markdown body. FAQ must be moved to frontmatter 'faq:' array.`);
    }

    // 5. Layout Stability (No raw artifacts)
    if (markdownBody.includes('*(For a deeper dive')) {
       articleErrors.push(`Found raw markdown artifact: '*(For a deeper dive'`);
    }
    if (/\*\([^)]+\)\*/.test(markdownBody)) {
       articleErrors.push(`Found potentially visible raw markdown artifact like '*(...)*'`);
    }
    if (markdownBody.includes(':::mockup\n\n:::') || markdownBody.includes(':::mockup\n:::')) {
       articleErrors.push(`Found empty :::mockup block`);
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
