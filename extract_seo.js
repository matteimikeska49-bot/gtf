const fs = require('fs');
const path = require('path');

const files = [
  'src/components/MainPage.jsx', // Main page might be in LanguageContext or App.jsx? I'll check App.jsx
  'src/context/LanguageContext.jsx',
  'src/components/CarouselPage.jsx',
  'src/components/CarouselPageRu.jsx',
  'src/components/AIContentPage.jsx',
  'src/components/InstagramPostPage.jsx',
  'src/components/AIContentPageRu.jsx',
  'src/components/InstagramPostPageRu.jsx',
  'src/components/LinkedInCarouselPage.jsx',
  'src/components/LinkedInCarouselPageRu.jsx',
  'src/components/BlogPage.jsx',
  'src/components/BlogPageRu.jsx',
  'src/components/blog/LinkedInCarouselIdeasPage.jsx',
  'src/components/blog/LinkedInCarouselIdeasPageRu.jsx',
  'src/components/carousel/CarouselSections.jsx',
  'src/components/carousel/CarouselSectionsRu.jsx',
  'src/components/carousel/CarouselSections2.jsx',
  'src/components/carousel/CarouselSections2Ru.jsx',
];

files.forEach(file => {
  try {
    const content = fs.readFileSync(path.join(__dirname, file), 'utf8');
    console.log(`\n--- ${file} ---`);
    
    // Extract document.title
    const titleMatch = content.match(/document\.title\s*=\s*['"]([^'"]+)['"]/g);
    if (titleMatch) console.log('TITLE:', titleMatch);
    
    // Extract description
    const descMatch = content.match(/const\s+desc\s*=\s*['"]([^'"]+)['"]/);
    if (descMatch) console.log('DESC:', descMatch[1]);
    
    // Check if setMeta description is used
    const setMetaDesc = content.match(/setMeta\('description',\s*([^)]+)\)/);
    if (setMetaDesc) console.log('SETMETA DESC:', setMetaDesc[1]);

    // Check canonical
    const canonical = content.match(/setLink\('canonical',\s*['"]([^'"]+)['"]/);
    if (canonical) console.log('CANONICAL:', canonical[1]);

    // Check hreflang
    const hreflang = content.match(/setLink\('alternate',\s*['"]([^'"]+)['"],\s*['"]([^'"]+)['"]\)/g);
    if (hreflang) console.log('HREFLANG:', hreflang);

    // H1 check
    const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/gs);
    if (h1Match) console.log('H1:', h1Match.map(h => h.replace(/<[^>]+>/g, '').trim()));

  } catch (e) {}
});
