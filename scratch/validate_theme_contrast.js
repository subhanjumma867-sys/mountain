const fs = require('fs');

const css = fs.readFileSync('assets/css/style.css', 'utf8');

// Check bracket balance
let openBrackets = 0;
for (let i = 0; i < css.length; i++) {
  if (css[i] === '{') openBrackets++;
  if (css[i] === '}') openBrackets--;
  if (openBrackets < 0) {
    console.error('Bracket imbalance at char', i);
    process.exit(1);
  }
}
console.log('Bracket balance check passed! Remaining unclosed:', openBrackets);

// Check presence of key rules
const keyRules = [
  '.hero-section h1',
  '[data-theme="snow"] .hero-section h1',
  '.view-header-banner h1',
  '[data-theme="snow"] .view-header-banner h1',
  '.position-absolute h5',
  '[data-theme="snow"] .position-absolute h5',
  '.gallery-card .gallery-title',
  '[data-theme="snow"] .gallery-card .gallery-title',
  '.position-relative .position-absolute small',
  '[data-theme="snow"] .position-relative .position-absolute small'
];

let allPassed = true;
keyRules.forEach(rule => {
  const found = css.includes(rule);
  console.log(`${rule}: ${found ? 'PASS' : 'FAIL'}`);
  if (!found) allPassed = false;
});

if (allPassed) {
  console.log('ALL KEY VISIBILITY RULES VERIFIED SUCCESSFULLY!');
} else {
  console.log('SOME RULES WERE NOT FOUND.');
}
