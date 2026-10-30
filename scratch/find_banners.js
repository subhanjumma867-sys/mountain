const fs = require('fs');

const lines = fs.readFileSync('assets/css/style.css', 'utf8').split('\n');
lines.forEach((l, i) => {
  if (l.includes('view-header-banner') || l.includes('hero-section')) {
    console.log(`${i+1}: ${l}`);
  }
});
