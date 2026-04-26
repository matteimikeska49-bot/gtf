const fs = require('fs');

const files = [
  'src/components/AIContentPage.jsx',
  'src/components/InstagramPostPage.jsx',
  'src/components/AIContentPageRu.jsx',
  'src/components/InstagramPostPageRu.jsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Remove the second and subsequent occurrences of `const CTA_URL = 'https://app.gotoflow.io';`
  let ctaCount = 0;
  content = content.replace(/const CTA_URL = ['"]https:\/\/app\.gotoflow\.io['"];/g, (match) => {
    ctaCount++;
    if (ctaCount === 1) return match;
    return '';
  });

  // Remove the `import React from 'react';` block that's lower down.
  // We can just find the second import React and all imports below it up to export const
  
  content = content.replace(/import React from 'react';[\s\S]*?(?=export const)/, '');

  fs.writeFileSync(file, content);
}
console.log("Fixed files.");
