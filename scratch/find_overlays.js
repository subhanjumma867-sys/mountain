const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// Find all elements with position-absolute or overlay or image or hero
const lines = html.split('\n');
console.log('Searching for image overlays and hero banners in index.html...');
lines.forEach((l, idx) => {
  if (
    l.includes('hero-') ||
    l.includes('position-absolute') ||
    l.includes('overlay') ||
    l.includes('banner') ||
    l.includes('mosaic') ||
    l.includes('summit-card') ||
    l.includes('img') && l.includes('caption')
  ) {
    if (idx < 500) {
      console.log(`${idx+1}: ${l.trim()}`);
    }
  }
});
