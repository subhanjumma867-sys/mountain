const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const patterns = [
  'text-white-50',
  'text-white-70',
  'text-white-80',
  'bg-dark-subtle',
  'text-warning-emphasis',
  'text-dark',
  'text-muted',
  'text-secondary',
  'bg-dark',
  'bg-light'
];

const lines = html.split('\n');
console.log(`Total lines in index.html: ${lines.length}`);

patterns.forEach(pat => {
  const matches = [];
  lines.forEach((l, idx) => {
    if (l.includes(pat)) {
      matches.push({ line: idx + 1, content: l.trim() });
    }
  });
  console.log(`\n=== Pattern "${pat}": ${matches.length} occurrences ===`);
  matches.slice(0, 15).forEach(m => console.log(`  L${m.line}: ${m.content}`));
  if (matches.length > 15) {
    console.log(`  ... and ${matches.length - 15} more`);
  }
});
