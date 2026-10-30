const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Search input in records view
html = html.replace(
  '<span class="input-group-text bg-dark border-secondary text-white-50"><i class="fa-solid fa-magnifying-glass"></i></span>\n            <input type="text" id="records-search-input" class="form-control bg-dark text-white border-secondary" placeholder="Search record, climber, peak...">',
  '<span class="input-group-text search-input-addon"><i class="fa-solid fa-magnifying-glass"></i></span>\n            <input type="text" id="records-search-input" class="form-control form-control-alpine" placeholder="Search record, climber, peak...">'
);

// 2. Booking guide ratio options
html = html.replace(
  /<div class="form-check p-3 rounded-3 bg-dark border border-secondary border-opacity-25 h-100">/g,
  '<div class="form-check p-3 rounded-3 booking-option-card border h-100">'
);

// 3. Booking gear options
html = html.replace(
  /<div class="form-check p-2 px-3 rounded-2 bg-dark border border-secondary border-opacity-25">/g,
  '<div class="form-check p-2 px-3 rounded-2 booking-option-card border">'
);

// 4. Auth Modal
html = html.replace(
  '<div class="modal-content bg-dark text-white border-primary border-opacity-50 rounded-4 shadow-lg overflow-hidden">',
  '<div class="modal-content modal-alpine border-primary border-opacity-50 rounded-4 shadow-lg overflow-hidden">'
);

// 5. Home risk management cards
html = html.replace(
  /<div class="p-3 rounded-4 bg-dark border border-secondary border-opacity-25 h-100">/g,
  '<div class="p-3 rounded-4 card-alpine border h-100">'
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed index.html elements successfully!');
