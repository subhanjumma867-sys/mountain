const fs = require('fs');

const app = fs.readFileSync('assets/js/app.js', 'utf8');

// Find occurrences of img or card or overlay in app.js
const lines = app.split('\n');
console.log('Searching for image rendering in app.js...');
lines.forEach((l, i) => {
  if (l.includes('<img') || l.includes('overlay') || l.includes('card-img') || l.includes('gradient')) {
    console.log(`${i+1}: ${l.trim().slice(0, 100)}`);
  }
});
