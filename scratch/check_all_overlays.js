const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const app = fs.readFileSync('assets/js/app.js', 'utf8');

console.log('=== Checking all view-header-banner, overlays, images in index.html ===');
const views = html.match(/<div class="spa-view[^"]*" id="([^"]+)">/g);
console.log('Views found:', views);

// Check all image overlays across index.html
const overlayMatches = [];
const lines = html.split('\n');
lines.forEach((line, i) => {
  if (line.includes('linear-gradient') || line.includes('img-overlay') || line.includes('hero-overlay') || line.includes('gallery-overlay') || line.includes('carousel-caption') || line.includes('view-header-banner')) {
    overlayMatches.push(`${i+1}: ${line.trim()}`);
  }
});
console.log('Overlays count:', overlayMatches.length);
overlayMatches.forEach(m => console.log(m));
