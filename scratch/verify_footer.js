const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find footer opening tag
const footerStart = html.indexOf('<footer');
const footerTagEnd = html.indexOf('>', footerStart);
const footerTag = html.slice(footerStart, footerTagEnd + 1);
console.log('Footer tag:', footerTag);

// Check for bg-dark-subtle in footer area
const footerSection = html.slice(footerStart, footerStart + 3000);
const darkSubtleCount = (footerSection.match(/bg-dark-subtle/g) || []).length;
console.log('bg-dark-subtle occurrences in footer area:', darkSubtleCount);

// Check if the footer has class "bg-dark" (as a standalone class)
const hasBgDark = /\bbg-dark\b/.test(footerTag);
const hasBgDarkInClass = footerTag.includes('bg-dark');
console.log('footer has bg-dark class (standalone):', hasBgDark);
console.log('footer has bg-dark in class attr:', hasBgDarkInClass);
