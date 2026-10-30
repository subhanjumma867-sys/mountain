const fs = require('fs');

const content = fs.readFileSync('assets/css/style.css', 'utf8');
const lines = content.split('\n');

console.log('--- Matches in style.css ---');
lines.forEach((l, i) => {
  if (l.includes('gallery-title') || l.includes('snow') || l.includes('spa-view h')) {
    console.log(`${i + 1}: ${l}`);
  }
});
