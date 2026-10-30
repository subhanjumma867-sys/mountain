const fs = require('fs');
const css = fs.readFileSync('assets/css/style.css', 'utf8');

const checks = [
  ['.text-white-70 {', 'text-white-70 utility defined'],
  ['.text-white-80 {', 'text-white-80 utility defined'],
  ['.text-white-50 {', 'text-white-50 utility defined'],
  ['footer.bg-dark {', 'footer bg-dark base override'],
  ['footer.bg-dark h5', 'footer bg-dark headings override'],
  ['footer.bg-dark .text-white-70', 'footer text-white-70 override'],
  ['footer.bg-dark .text-white-50', 'footer text-white-50 override'],
  ['footer.bg-dark .bg-dark-subtle', 'footer bg-dark-subtle override'],
  ['[data-theme="snow"] footer.bg-dark {', 'footer snow bg override'],
  ['[data-theme="snow"] footer .text-white-50', 'footer snow text-white-50 override'],
  ['[data-theme="snow"] footer .text-white-70', 'footer snow text-white-70 override'],
  ['[data-theme="snow"] footer .bg-dark-subtle', 'footer snow bg-dark-subtle override'],
  ['.activity-card h5 {', 'activity-card h5 color'],
  ['.activity-card p {', 'activity-card p color'],
  ['[data-theme="snow"] .activity-card h5', 'snow activity-card h5'],
  ['.summit-card .p-4 h5', 'summit-card p-4 h5'],
  ['[data-theme="snow"] .summit-card {', 'snow summit-card bg'],
  ['[data-theme="snow"] .summit-card .p-4 p', 'snow summit-card p text'],
  ['[data-theme="snow"] .btn-dark-glass', 'snow btn-dark-glass'],
  ['.max-w-700', 'max-w-700 utility'],
];

checks.forEach(([pattern, label]) => {
  console.log((css.includes(pattern) ? 'OK  ' : 'FAIL') + ' - ' + label);
});

const lines = css.split('\n').length;
console.log('\nTotal CSS lines:', lines);
