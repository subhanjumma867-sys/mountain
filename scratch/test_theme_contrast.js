const fs = require('fs');

const css = fs.readFileSync('assets/css/style.css', 'utf8');

const checks = [
  'Overrides bg-dark in snow: ' + css.includes('[data-theme="snow"] .bg-dark'),
  'Overrides bg-dark-glass in snow: ' + css.includes('[data-theme="snow"] .btn-dark-glass'),
  'Overrides bg-light in dark: ' + css.includes('.bg-light'),
  'Overrides text-dark in dark: ' + css.includes('.text-dark'),
  'Overrides text-secondary in dark: ' + css.includes('.text-secondary'),
  'Overrides text-muted in dark: ' + css.includes('.text-muted'),
  'Overrides text-white in snow: ' + css.includes('[data-theme="snow"] .text-white'),
  'Overrides text-white-50 in snow: ' + css.includes('[data-theme="snow"] .text-white-50'),
  'Overrides text-white-70 in snow: ' + css.includes('[data-theme="snow"] .text-white-70'),
  'Overrides text-white-80 in snow: ' + css.includes('[data-theme="snow"] .text-white-80'),
  'Overrides modal-content in snow: ' + css.includes('[data-theme="snow"] .modal-content')
];

checks.forEach(c => console.log(c));
