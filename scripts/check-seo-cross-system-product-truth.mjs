import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const blogDir = path.join(rootDir, 'src/content/blog/articles');

export const PRODUCT_TRUTH = {
  maxGoToFlowSlides: 10,
  instagramTechnicalLimit: 20,
  recommendedSlides: '5-10',
  aiCarouselAvailable: true,
  templateCarouselAvailable: true,
  animatedCarouselAvailable: true,
  seamlessCarouselAvailable: true,
  supportedInputs: ['topic', 'text', 'link', 'video', 'pdf', 'voice'],
  supportedControls: ['ai-style', 'custom prompt', 'template', 'background', 'character', 'cta'],
  supportedFormats: ['4:5', '1:1', '9:16'],
};

const rules = [
  {
    key: 'roadmap_available_feature',
    severity: 'blocking',
    expected: 'AI, template, animated, and seamless carousel features are available; do not describe them as roadmap/coming soon.',
    pattern: /(?:(?:в разработке|coming soon|скоро появится|планируется|roadmap)[^.?!\n]*(?:ai|ии|анимац|animated|бесшовн|seamless|шаблон)|(?:ai|ии|анимац|animated|бесшовн|seamless|шаблон)[^.?!\n]*(?:в разработке|coming soon|скоро появится|планируется|roadmap))/i,
  },
  {
    key: 'gotoflow_20_slide_limit',
    severity: 'blocking',
    expected: 'Instagram technically allows up to 20 media items, but GoToFlow creates up to 10 slides and most carousels should use 5-10.',
    pattern: /gotoflow[^.?!\n]{0,80}(?:до|up to)\s+20\s+(?:слайд|slide|фото|photo|изображ|картин)/i,
  },
  {
    key: 'unsupported_format_claim',
    severity: 'blocking',
    expected: 'Only 4:5, 1:1, and 9:16 are confirmed supported output formats.',
    pattern: /(?:поддерживает|supports)[^.?!\n]*(?:16:9|3:2|2:3|21:9)/i,
  },
  {
    key: 'instagram_20_context_review',
    severity: 'warning',
    expected: 'Mentions of 20 media items must clearly belong to Instagram, not GoToFlow.',
    pattern: /(?:инструмент|генератор|сервис|tool|generator)[^.?!\n]{0,80}(?:до|up to)\s+20\s+(?:слайд|slide|фото|photo|изображ|картин)/i,
    ignoreWhen: (line) => /instagram|инстаграм|инстаграме/i.test(line) && !/gotoflow/i.test(line),
  },
];

export const scanProductTruthText = (text, filePath = '(fixture)') => {
  const findings = [];
  text.split('\n').forEach((line, index) => {
    rules.forEach((rule) => {
      if (rule.pattern.test(line) && !(rule.ignoreWhen?.(line))) {
        findings.push({
          path: filePath,
          line: index + 1,
          text: line.trim(),
          claimKey: rule.key,
          expected: rule.expected,
          severity: rule.severity,
        });
      }
    });
  });
  return findings;
};

export const scanProductTruthRepository = (directory = blogDir) => {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory)
    .filter((file) => file.endsWith('.md'))
    .flatMap((file) => {
      const filePath = path.join(directory, file);
      return scanProductTruthText(fs.readFileSync(filePath, 'utf8'), path.relative(rootDir, filePath));
    });
};

const runCli = () => {
  console.log('SEO cross-system product truth check');
  const findings = scanProductTruthRepository();
  const blocking = findings.filter((finding) => finding.severity === 'blocking');
  const warnings = findings.filter((finding) => finding.severity === 'warning');

  findings.forEach((finding) => {
    const prefix = finding.severity === 'blocking' ? 'ERROR' : 'WARNING';
    const stream = finding.severity === 'blocking' ? console.error : console.warn;
    stream(`${prefix}: ${finding.path}:${finding.line}`);
    stream(`  text: ${finding.text}`);
    stream(`  claimKey: ${finding.claimKey}`);
    stream(`  expected: ${finding.expected}`);
    stream(`  severity: ${finding.severity}`);
  });

  console.log(`- blocking contradictions: ${blocking.length}`);
  console.log(`- warnings: ${warnings.length}`);

  if (blocking.length > 0) {
    console.error('\nSEO cross-system product truth check failed.');
    process.exit(1);
  }

  if (warnings.length > 0) {
    console.log('SEO cross-system product truth check passed with review warnings.');
  } else {
    console.log('SEO cross-system product truth check passed.');
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  runCli();
}
