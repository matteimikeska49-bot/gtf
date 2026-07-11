import fs from 'fs';
import path from 'path';

console.log('🔍 Starting Cross-system Product Truth Check...');

const rootDir = process.cwd();
const blogDir = path.join(rootDir, 'src/content/blog/articles');

// True boundaries for current product
const PRODUCT_TRUTH = {
  maxInstagramSlides: 10,
  maxSupportedFormat: 'PDF',
  aiAvailable: true,
  animatedAvailable: true,
  seamlessAvailable: true
};

const rules = [
  {
    key: 'instagram_limit',
    // Flags things like "GoToFlow позволяет до 20", but allows "В инстаграм можно до 20"
    // This regex is a simple heuristic: if "20" is near "фото", "слайдов", etc. without "Instagram" context or explicitly with "GoToFlow".
    // For read-only script, we catch any mention of 20 photos as a warning to be manually checked if it implies GoToFlow can do 20.
    pattern: /до\s+20\s+(?:слайд|фото|картин|изображ)/i,
    severity: 'warning',
    expected: `Instagram limit is 20, GoToFlow limit is ${PRODUCT_TRUTH.maxInstagramSlides}`
  },
  {
    key: 'roadmap_claims',
    pattern: /(?:в разработке|coming soon|скоро появится)[^.]*(?:ai|ии|анимац|бесшовн|seamless|animated)/i,
    severity: 'blocking',
    expected: 'Features are now available, remove roadmap language'
  }
];

let warningsCount = 0;
let errorsCount = 0;

if (fs.existsSync(blogDir)) {
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
  
  files.forEach(file => {
    // Exceptions for specific articles that properly explain the 20 slide limit vs GoToFlow limit.
    if (file === 'razmer-karuseli-v-instagram.md' || file === 'shablony-karuseley-v-instagram.md') return;

    const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, idx) => {
      rules.forEach(rule => {
        if (rule.pattern.test(line)) {
          const msg = `[${rule.severity.toUpperCase()}] ${file}:${idx + 1}\n  Match: "${line.trim().substring(0, 80)}..."\n  Expected: ${rule.expected}`;
          if (rule.severity === 'blocking') {
            console.error(`❌ ${msg}`);
            errorsCount++;
          } else {
            console.warn(`⚠️  ${msg}`);
            warningsCount++;
          }
        }
      });
    });
  });
}

if (errorsCount > 0) {
  console.error(`\n❌ FAIL: Found ${errorsCount} blocking product truth contradictions.`);
  process.exit(1);
}

if (warningsCount > 0) {
  console.log(`\n✅ PASS (with warnings): Found ${warningsCount} potential product truth warnings.`);
} else {
  console.log('\n✅ PASS: Cross-system product truth check passed.');
}
