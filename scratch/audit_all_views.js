const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find all views and check for text-dark, text-muted, text-secondary, bg-light, bg-white inside views (non-hero-section)
const views = [
  'view-history', 'view-disciplines', 'view-records', 
  'view-map', 'view-camps', 'view-gallery', 
  'view-safety', 'view-booking'
];

const problematic = [
  'text-muted', 'text-secondary', 'text-dark', 'bg-light',
  'text-white-50', 'text-white-70', 'text-white-80',
  'bg-dark-subtle', 'bg-white', 'text-body'
];

views.forEach(view => {
  const start = html.indexOf(`id="${view}"`);
  const end = html.indexOf(`id="view-`, start + 10);
  if (start < 0) { console.log(view + ': not found'); return; }
  const section = html.slice(start, end < 0 ? start + 50000 : end);
  const issues = {};
  problematic.forEach(pat => {
    const count = (section.match(new RegExp(pat, 'g')) || []).length;
    if (count > 0) issues[pat] = count;
  });
  if (Object.keys(issues).length > 0) {
    console.log(`\n${view}:`, JSON.stringify(issues));
  } else {
    console.log(`${view}: OK (no problematic classes)`);
  }
});
