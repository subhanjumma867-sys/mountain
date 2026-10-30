const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// Find all tags with text-white or text-light
const regex = /<([a-z0-9]+)[^>]*class="[^"]*(text-white|text-light)[^"]*"[^>]*>/gi;
let match;
const found = [];
while ((match = regex.exec(html)) !== null) {
  found.push(match[0].slice(0, 100));
}
console.log('Total text-white/light elements in HTML:', found.length);
console.log('Sample elements:');
found.slice(0, 25).forEach(m => console.log(m));
