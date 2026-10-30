const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');
console.log('=== Scanned index.html for text-dark, bg-light, text-secondary, text-muted ===');
lines.forEach((line, idx) => {
  if (line.includes('text-dark') || line.includes('bg-light') || line.includes('text-secondary') || line.includes('text-muted')) {
    console.log(`${idx + 1}: ${line.trim()}`);
  }
});
