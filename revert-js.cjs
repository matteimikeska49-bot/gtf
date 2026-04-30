const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');

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
      
      // Revert ProblemSection framer motion changes
      const regexAnimate = /animate=\{isMobile \? \{opacity:0\.35, scale:1\} : \{ opacity: \[0\.35,0\.55,0\.35\], scale: \[1,1\.05,1\] \}\}/g;
      if (regexAnimate.test(content)) {
         content = content.replace(regexAnimate, "animate={{ opacity: [0.35,0.55,0.35], scale: [1,1.05,1] }}");
         modified = true;
      }
      
      const regexAnimate2 = /animate=\{isMobile \? \{ opacity: 0\.2, scale: 1 \} : \{ opacity: \[0\.2, 0\.35, 0\.2\], scale: \[0\.97, 1\.03, 0\.97\] \}\}/g;
      if (regexAnimate2.test(content)) {
         content = content.replace(regexAnimate2, "animate={{ opacity: [0.2, 0.35, 0.2], scale: [0.97, 1.03, 0.97] }}");
         modified = true;
      }

      const regexFilter = /filter: isMobile \? 'blur\(60px\)' : 'blur\(100px\)'/g;
      if (regexFilter.test(content)) {
         content = content.replace(regexFilter, "filter: 'blur(100px)'");
         modified = true;
      }
      
      const regexFilter2 = /filter: isMobile \? 'blur\(50px\)' : 'blur\(90px\)'/g;
      if (regexFilter2.test(content)) {
         content = content.replace(regexFilter2, "filter: 'blur(90px)'");
         modified = true;
      }

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Reverted JS inline logic in: ${fullPath}`);
      }
    }
  }
}

processDir(componentsDir);
