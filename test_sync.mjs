import fs from 'fs';
const committedHtml = fs.readFileSync('dist/ru/templates/instagram-carousel/index.html', 'utf-8');
const removeNonDeterministicLines = (html) => {
  return html.replace(/assets\/[^.]+\.[a-z0-9]+\.(js|css|woff2?|png|jpg|svg)/g, 'assets/HASHED.$1')
             .replace(/<script[^>]*><\/script>/g, '')
             .replace(/vite-plugin-pwa[^"]*/g, '')
             .replace(/\s+/g, ' ');
};
console.log(removeNonDeterministicLines(committedHtml).substring(0, 200));
