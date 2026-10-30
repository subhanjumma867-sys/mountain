const fs = require('fs');

// 1. Fix app.js
let app = fs.readFileSync('assets/js/app.js', 'utf8');

// Replace problematic text classes in renderers
app = app.replace(/<h5 class="fw-bold text-dark mb-2">\${item\.title}<\/h5>/g, '<h5 class="fw-bold text-light-heading mb-2">${item.title}</h5>');
app = app.replace(/<p class="text-secondary small mb-3">\${item\.desc}<\/p>/g, '<p class="text-light-body small mb-3">${item.desc}</p>');
app = app.replace(/<span class="badge bg-secondary-subtle text-muted">\${item\.category}<\/span>/g, '<span class="badge bg-secondary-subtle text-light-body">${item.category}</span>');

app = app.replace(/<h5 class="fw-bold text-dark mb-1">\${style\.title}<\/h5>/g, '<h5 class="fw-bold text-light-heading mb-1">${style.title}</h5>');
app = app.replace(/<small class="text-muted d-block mb-3">\${style\.subtitle}<\/small>/g, '<small class="text-light-body d-block mb-3">${style.subtitle}</small>');
app = app.replace(/<p class="text-secondary small mb-3">\${style\.desc}<\/p>/g, '<p class="text-light-body small mb-3">${style.desc}</p>');
app = app.replace(/<ul class="list-unstyled small text-muted ps-2 mb-0">/g, '<ul class="list-unstyled small text-light-body ps-2 mb-0">');
app = app.replace(/<small class="text-muted d-block mb-1"><strong>Iconic Routes:<\/strong><\/small>/g, '<small class="text-light-body d-block mb-1"><strong>Iconic Routes:</strong></small>');

app = app.replace(/class="accordion-button \${isFirst \? '' : 'collapsed'} fw-bold text-dark p-3 p-md-4"/g, 'class="accordion-button ${isFirst ? \'\' : \'collapsed\'} fw-bold text-light-heading p-3 p-md-4"');
app = app.replace(/<small class="text-muted fw-normal">\${tech\.category}<\/small>/g, '<small class="text-light-body fw-normal">${tech.category}</small>');
app = app.replace(/<p class="text-secondary small mb-3">\${tech\.summary}<\/p>/g, '<p class="text-light-body small mb-3">${tech.summary}</p>');
app = app.replace(/<h6 class="small fw-bold text-dark text-uppercase mb-2">/g, '<h6 class="small fw-bold text-primary text-uppercase mb-2">');
app = app.replace(/<ol class="small text-muted ps-3 mb-0">/g, '<ol class="small text-light-body ps-3 mb-0">');

app = app.replace(/<h5 class="fw-bold text-dark mb-2">\${sh\.title}<\/h5>/g, '<h5 class="fw-bold text-light-heading mb-2">${sh.title}</h5>');
app = app.replace(/<div class="badge bg-secondary-subtle text-secondary border border-secondary-subtle py-2 px-3 small mb-3 text-start">/g, '<div class="badge bg-secondary-subtle text-primary border border-secondary-subtle py-2 px-3 small mb-3 text-start">');
app = app.replace(/<p class="text-secondary small mb-3">\${sh\.desc}<\/p>/g, '<p class="text-light-body small mb-3">${sh.desc}</p>');
app = app.replace(/<h6 class="small fw-bold text-dark mb-2">Engineered Specifications:<\/h6>/g, '<h6 class="small fw-bold text-primary mb-2">Engineered Specifications:</h6>');
app = app.replace(/<ul class="list-unstyled small text-muted ps-1 mb-0">/g, '<ul class="list-unstyled small text-light-body ps-1 mb-0">');

app = app.replace(/<small class="text-muted fw-semibold">\${hz\.type}<\/small>/g, '<small class="text-light-body fw-semibold">${hz.type}</small>');
app = app.replace(/<h5 class="fw-bold text-dark mb-2">\${hz\.name}<\/h5>/g, '<h5 class="fw-bold text-light-heading mb-2">${hz.name}</h5>');
app = app.replace(/<p class="text-secondary small mb-3">\${hz\.desc}<\/p>/g, '<p class="text-light-body small mb-3">${hz.desc}</p>');
app = app.replace(/<div class="mt-auto p-3 rounded-3 bg-light border">/g, '<div class="mt-auto p-3 rounded-3 mitigation-box border">');
app = app.replace(/<strong class="d-block small text-dark mb-1">/g, '<strong class="d-block small text-primary mb-1">');
app = app.replace(/<small class="text-muted">\${hz\.mitigation}<\/small>/g, '<small class="text-light-body">${hz.mitigation}</small>');

app = app.replace(/<small class="text-muted">\${story\.teamSize}<\/small>/g, '<small class="text-light-body">${story.teamSize}</small>');
app = app.replace(/<h5 class="fw-bold text-dark mb-1">\${story\.title}<\/h5>/g, '<h5 class="fw-bold text-light-heading mb-1">${story.title}</h5>');
app = app.replace(/<small class="text-muted d-block mb-3">\${story\.subtitle}<\/small>/g, '<small class="text-light-body d-block mb-3">${story.subtitle}</small>');
app = app.replace(/<div class="story-quote-box p-3 bg-light rounded-3 mb-3 fst-italic small text-secondary">/g, '<div class="story-quote-box p-3 rounded-3 mb-3 fst-italic small text-light-body">');
app = app.replace(/<div class="text-end fw-bold text-dark not-italic mt-1">— \${story\.client}<\/div>/g, '<div class="text-end fw-bold text-primary not-italic mt-1">— ${story.client}</div>');
app = app.replace(/<h6 class="small fw-bold text-dark mb-1">Expedition Highlights:<\/h6>/g, '<h6 class="small fw-bold text-light-heading mb-1">Expedition Highlights:</h6>');
app = app.replace(/<ul class="list-unstyled small text-muted mb-0">/g, '<ul class="list-unstyled small text-light-body mb-0">');

app = app.replace(/<span class="badge bg-secondary-subtle text-muted mb-1">\${item\.category}<\/span>/g, '<span class="badge bg-primary-subtle text-primary mb-1">${item.category}</span>');
app = app.replace(/<h6 class="fw-bold text-dark mb-0">\${item\.title}<\/h6>/g, '<h6 class="fw-bold text-light-heading mb-0">${item.title}</h6>');
app = app.replace(/<p class="text-secondary small mb-3">\${item\.desc}<\/p>/g, '<p class="text-light-body small mb-3">${item.desc}</p>');

app = app.replace(/<div class="card h-100 border-0 shadow-sm rounded-4 p-4 bg-light">/g, '<div class="card h-100 border-0 shadow-sm rounded-4 p-4 golden-rule-card">');
app = app.replace(/<h6 class="fw-bold text-dark mb-0">\${rule\.title}<\/h6>/g, '<h6 class="fw-bold text-light-heading mb-0">${rule.title}</h6>');
app = app.replace(/<p class="text-secondary small mb-0">\${rule\.detail}<\/p>/g, '<p class="text-light-body small mb-0">${rule.detail}</p>');

app = app.replace(/<h5 class="fw-bold text-dark mb-1">\${exp\.name}<\/h5>/g, '<h5 class="fw-bold text-light-heading mb-1">${exp.name}</h5>');
app = app.replace(/<small class="text-muted"><i class="fa-solid fa-clock me-1"><\/i> \${exp\.duration}<\/small>/g, '<small class="text-light-body"><i class="fa-solid fa-clock me-1"></i> ${exp.duration}</small>');
app = app.replace(/<p class="text-secondary small mb-3">\${exp\.description\.substring\(0, 115\)}\.\.\.<\/p>/g, '<p class="text-light-body small mb-3">${exp.description.substring(0, 115)}...</p>');
app = app.replace(/<small class="text-muted d-block">Starting from<\/small>/g, '<small class="text-light-body d-block">Starting from</small>');

app = app.replace(/<h6 class="fw-bold text-dark mb-1">\${vid\.title}<\/h6>/g, '<h6 class="fw-bold text-light-heading mb-1">${vid.title}</h6>');
app = app.replace(/<p class="text-muted small mb-0">\${vid\.summary}<\/p>/g, '<p class="text-light-body small mb-0">${vid.summary}</p>');

app = app.replace(/<div class="p-3 bg-white rounded-3 shadow-sm border d-flex align-items-center gap-3">/g, '<div class="p-3 checklist-item-box rounded-3 shadow-sm border d-flex align-items-center gap-3">');
app = app.replace(/<label class="form-check-label small fw-semibold text-dark mb-0 cursor-pointer" for="\${item\.id}">/g, '<label class="form-check-label small fw-semibold text-light-heading mb-0 cursor-pointer" for="${item.id}">');

app = app.replace(/<td class="fw-bold text-dark">/g, '<td class="fw-bold text-light-heading">');
app = app.replace(/<td class="text-muted small"><i class="fa-solid fa-location-dot me-1 text-danger"><\/i> \${r\.location} \(\${r\.year}\)<\/td>/g, '<td class="text-light-body small"><i class="fa-solid fa-location-dot me-1 text-danger"></i> ${r.location} (${r.year})</td>');
app = app.replace(/<td class="small text-secondary">\${r\.details}<\/td>/g, '<td class="small text-light-body">${r.details}</td>');

fs.writeFileSync('assets/js/app.js', app, 'utf8');
console.log('Fixed app.js text classes successfully!');

// 2. Fix map.js
let map = fs.readFileSync('assets/js/map.js', 'utf8');
map = map.replace(/<h6 class="card-title fw-bold mb-1 text-dark d-flex align-items-center">/g, '<h6 class="card-title fw-bold mb-1 text-light-heading d-flex align-items-center">');
map = map.replace(/<span class="badge bg-dark-subtle text-dark-emphasis">\${club\.type}<\/span>/g, '<span class="badge bg-primary-subtle text-primary">${club.type}</span>');
map = map.replace(/<span class="badge bg-secondary-subtle text-muted px-2 py-1">/g, '<span class="badge bg-secondary-subtle text-light-body px-2 py-1">');
map = map.replace(/<p class="text-secondary small mb-2">/g, '<p class="text-light-body small mb-2">');
map = map.replace(/<p class="card-text small text-muted mb-2">\${club\.focus}<\/p>/g, '<p class="card-text small text-light-body mb-2">${club.focus}</p>');
map = map.replace(/<small class="text-muted"><i class="fa-solid fa-clock-rotate-left me-1"><\/i> Est\. \${club\.founded}<\/small>/g, '<small class="text-light-body"><i class="fa-solid fa-clock-rotate-left me-1"></i> Est. ${club.founded}</small>');
map = map.replace(/<p class="small text-muted mb-0">Lat:/g, '<p class="small text-light-body mb-0">Lat:');

fs.writeFileSync('assets/js/map.js', map, 'utf8');
console.log('Fixed map.js text classes successfully!');
