const fs = require('fs');
const css = fs.readFileSync('assets/css/style.css', 'utf8');

const checks = [
  // Utility classes
  ['.text-white-70 {', 'text-white-70 utility defined'],
  ['.text-white-80 {', 'text-white-80 utility defined'],
  ['.max-w-700', 'max-w-700 utility'],
  
  // Footer
  ['footer.bg-dark {', 'Footer bg-dark base override'],
  ['[data-theme="snow"] footer.bg-dark {', 'Footer snow bg override'],
  ['[data-theme="snow"] footer .text-white-50', 'Footer snow text-50'],
  ['[data-theme="snow"] footer .text-white-70', 'Footer snow text-70'],
  ['[data-theme="snow"] footer .bg-dark-subtle', 'Footer snow badge bg'],
  
  // Homepage
  ['.summit-card .p-4 h5', 'Summit card heading'],
  ['[data-theme="snow"] .summit-card {', 'Snow summit card bg'],
  ['.activity-card h5 {', 'Activity card heading'],
  ['[data-theme="snow"] .activity-card h5', 'Snow activity card heading'],
  ['[data-theme="snow"] .btn-dark-glass', 'Snow btn-dark-glass'],
  
  // Booking view
  ['[data-theme="snow"] .booking-box-container {', 'Booking snow bg'],
  ['[data-theme="snow"] #view-booking .text-white-70', 'Booking snow label text-70'],
  ['[data-theme="snow"] #view-booking .text-white-80', 'Booking snow label text-80'],
  ['[data-theme="snow"] #view-booking .text-white-50', 'Booking snow helper text-50'],
  
  // Global catch-all
  ['[data-theme="snow"] .spa-view:not(#view-home) .text-white-70', 'Global catch-all text-70'],
  ['[data-theme="snow"] .spa-view:not(#view-home) .text-white-80', 'Global catch-all text-80'],
  ['[data-theme="snow"] .view-header-banner .text-white', 'View header stays white'],
  ['[data-theme="snow"] .position-absolute .text-white', 'Image overlay stays white'],
  
  // Other views
  ['[data-theme="snow"] .era-card {', 'Snow era card bg'],
  ['[data-theme="snow"] .basecamp-feature-card', 'Snow basecamp card bg'],
  ['[data-theme="snow"] .modal-content.bg-dark {', 'Snow modal bg-dark'],
  
  // CSS variable fix
  ['background: var(--alpine-bg-card)', 'summit-card uses correct var'],
];

let pass = 0;
let fail = 0;
checks.forEach(([pattern, label]) => {
  const ok = css.includes(pattern);
  console.log((ok ? 'OK  ' : 'FAIL') + ' - ' + label);
  if (ok) pass++; else fail++;
});

console.log(`\n${pass}/${checks.length} checks passed` + (fail > 0 ? ` | ${fail} FAILED` : ' ✓'));
console.log('CSS total lines:', css.split('\n').length);
