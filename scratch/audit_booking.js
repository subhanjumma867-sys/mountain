const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Show booking view text-dark uses and bg-dark-subtle
const viewStart = html.indexOf('id="view-booking"');
const footerStart = html.indexOf('<footer');
const section = html.slice(viewStart, footerStart);
const lines = section.split('\n');

console.log('=== view-booking: text-dark, bg-dark-subtle usages ===');
lines.forEach((line, i) => {
  if (line.includes('text-dark') || line.includes('bg-dark-subtle') || line.includes('bg-white')) {
    console.log(`L${i}: ${line.trim()}`);
  }
});

// Show the booking section text-white-50/70/80 for context
console.log('\n=== view-booking: text-white-50/70/80 (first 20) ===');
let count = 0;
lines.forEach((line, i) => {
  if (count >= 20) return;
  if (line.includes('text-white-50') || line.includes('text-white-70') || line.includes('text-white-80')) {
    console.log(`L${i}: ${line.trim()}`);
    count++;
  }
});
