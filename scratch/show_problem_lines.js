const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Show actual problematic lines from each view
const views = [
  'view-history', 'view-disciplines', 'view-records', 
  'view-map', 'view-camps', 'view-gallery', 
  'view-safety', 'view-booking'
];

const problematic = ['text-dark', 'bg-dark-subtle'];

views.forEach(view => {
  const start = html.indexOf(`id="${view}"`);
  const end = html.indexOf(`id="view-`, start + 10);
  if (start < 0) return;
  const section = html.slice(start, end < 0 ? start + 50000 : end);
  const lines = section.split('\n');
  
  const found = [];
  lines.forEach((line, i) => {
    const hasBad = problematic.some(p => line.includes(p)) && !line.includes('bg-warning') && !line.includes('bg-info') && !line.includes('bg-success');
    if (hasBad) found.push(`  L+${i}: ${line.trim()}`);
  });
  
  if (found.length > 0) {
    console.log(`\n--- ${view} ---`);
    found.forEach(f => console.log(f));
  }
});
