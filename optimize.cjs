const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');

const replaceRules = [
  { regex: /blur-\[150px\]/g, replacement: 'blur-[80px] md:blur-[150px]' },
  { regex: /blur-\[140px\]/g, replacement: 'blur-[60px] md:blur-[140px]' },
  { regex: /blur-\[120px\]/g, replacement: 'blur-[60px] md:blur-[120px]' },
  { regex: /blur-\[100px\]/g, replacement: 'blur-[50px] md:blur-[100px]' },
  { regex: /blur-\[170px\]/g, replacement: 'blur-[80px] md:blur-[170px]' },
  { regex: /blur-\[70px\]/g, replacement: 'blur-[40px] md:blur-[70px]' },
  { regex: /blur-\[50px\]/g, replacement: 'blur-[30px] md:blur-[50px]' },
  { regex: /className="animate-ping/g, replacement: 'className="md:animate-ping' },
  { regex: /className="absolute inset-0 animate-pulse/g, replacement: 'className="absolute inset-0 md:animate-pulse' }
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      
      for (const rule of replaceRules) {
        if (rule.regex.test(content)) {
          content = content.replace(rule.regex, rule.replacement);
          modified = true;
        }
      }
      
      // Additional replacements for Framer Motion animate and filter in Problem sections
      if (content.includes('animate={{ opacity: [0.35,0.55,0.35]')) {
         content = content.replace(/animate=\{\{ opacity: \[0\.35,0\.55,0\.35\], scale: \[1,1\.05,1\] \}\}/g, "animate={isMobile ? {opacity:0.35, scale:1} : { opacity: [0.35,0.55,0.35], scale: [1,1.05,1] }}");
         modified = true;
      }
      if (content.includes('filter: \'blur(100px)\'')) {
         content = content.replace(/filter: 'blur\(100px\)'/g, "filter: isMobile ? 'blur(60px)' : 'blur(100px)'");
         modified = true;
      }
      
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDir(componentsDir);
