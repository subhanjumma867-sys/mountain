const fs = require('fs');

let css = fs.readFileSync('assets/css/style.css', 'utf8');

const contrastRules = `
/* ============================================================
   UNIVERSAL HIGH-CONTRAST TYPOGRAPHY & VISIBILITY SYSTEM
   Guarantees 100% visible, crystal-clear, high-contrast text across ALL themes
   ============================================================ */

/* Semantic Text Color Utilities */
.text-light-heading {
  color: var(--alpine-text-light) !important;
}

.text-light-body {
  color: var(--alpine-text-muted) !important;
}

[data-theme="snow"] .text-light-heading {
  color: #0f172a !important;
}

[data-theme="snow"] .text-light-body {
  color: #334155 !important;
}

/* Search input addon */
.search-input-addon {
  background-color: var(--alpine-bg-surface) !important;
  border-color: var(--alpine-border) !important;
  color: var(--alpine-text-muted) !important;
}

[data-theme="snow"] .search-input-addon {
  background-color: #f1f5f9 !important;
  border-color: #cbd5e1 !important;
  color: #64748b !important;
}

/* Booking Option Cards */
.booking-option-card {
  background-color: var(--alpine-bg-card) !important;
  border-color: var(--alpine-border) !important;
  transition: all 0.25s ease;
}

.booking-option-card:hover {
  border-color: var(--alpine-primary) !important;
}

.booking-option-card strong {
  color: var(--alpine-text-light) !important;
}

.booking-option-card label,
.booking-option-card span:not(.badge):not(.text-warning) {
  color: var(--alpine-text-muted) !important;
}

[data-theme="snow"] .booking-option-card {
  background-color: #ffffff !important;
  border-color: #cbd5e1 !important;
}

[data-theme="snow"] .booking-option-card strong {
  color: #0f172a !important;
}

[data-theme="snow"] .booking-option-card label,
[data-theme="snow"] .booking-option-card span:not(.badge):not(.text-warning) {
  color: #475569 !important;
}

/* Modal Alpine Styling */
.modal-alpine {
  background-color: var(--alpine-bg-card) !important;
  border: 1px solid var(--alpine-border) !important;
  color: var(--alpine-text-light) !important;
}

.modal-alpine label {
  color: var(--alpine-text-muted) !important;
}

[data-theme="snow"] .modal-alpine {
  background-color: #ffffff !important;
  border-color: #cbd5e1 !important;
  color: #0f172a !important;
}

[data-theme="snow"] .modal-alpine label {
  color: #334155 !important;
}

/* Mitigation, Golden Rules, Checklist Boxes */
.mitigation-box {
  background: var(--alpine-bg-surface) !important;
  border: 1px solid var(--alpine-border) !important;
  color: var(--alpine-text-muted) !important;
}

[data-theme="snow"] .mitigation-box {
  background: #f8fafc !important;
  border-color: #cbd5e1 !important;
  color: #334155 !important;
}

.golden-rule-card {
  background: var(--alpine-bg-card) !important;
  border: 1px solid var(--alpine-border) !important;
}

[data-theme="snow"] .golden-rule-card {
  background: #ffffff !important;
  border-color: #cbd5e1 !important;
}

.checklist-item-box {
  background: var(--alpine-bg-card) !important;
  border: 1px solid var(--alpine-border) !important;
  transition: all 0.2s ease;
}

.checklist-item-box:hover {
  border-color: var(--alpine-primary) !important;
}

[data-theme="snow"] .checklist-item-box {
  background: #ffffff !important;
  border-color: #cbd5e1 !important;
}

/* Universal Card Headings Contrast */
.card h1, .card h2, .card h3, .card h4, .card h5, .card h6,
.card .card-title,
.card strong:not(.badge),
.card-alpine h1, .card-alpine h2, .card-alpine h3, .card-alpine h4, .card-alpine h5, .card-alpine h6,
.style-card h5, .shelter-card h5, .hazard-card h5, .story-card h5, .innovation-card h6, .expedition-card h5, .video-card h6,
.timeline-card h5, .club-card h6, .summit-card h5, .era-card h6, .basecamp-feature-card h6, .federation-card strong {
  color: var(--alpine-text-light) !important;
}

[data-theme="snow"] .card h1, 
[data-theme="snow"] .card h2, 
[data-theme="snow"] .card h3, 
[data-theme="snow"] .card h4, 
[data-theme="snow"] .card h5, 
[data-theme="snow"] .card h6,
[data-theme="snow"] .card .card-title,
[data-theme="snow"] .card strong:not(.badge),
[data-theme="snow"] .card-alpine h1, 
[data-theme="snow"] .card-alpine h2, 
[data-theme="snow"] .card-alpine h3, 
[data-theme="snow"] .card-alpine h4, 
[data-theme="snow"] .card-alpine h5, 
[data-theme="snow"] .card-alpine h6,
[data-theme="snow"] .style-card h5, 
[data-theme="snow"] .shelter-card h5, 
[data-theme="snow"] .hazard-card h5, 
[data-theme="snow"] .story-card h5, 
[data-theme="snow"] .innovation-card h6, 
[data-theme="snow"] .expedition-card h5, 
[data-theme="snow"] .video-card h6,
[data-theme="snow"] .timeline-card h5, 
[data-theme="snow"] .club-card h6, 
[data-theme="snow"] .summit-card h5, 
[data-theme="snow"] .era-card h6, 
[data-theme="snow"] .basecamp-feature-card h6, 
[data-theme="snow"] .federation-card strong {
  color: #0f172a !important;
}

/* Universal Card Paragraphs & Small text */
.card p, .card ul, .card ol, .card li, .card small:not(.badge),
.style-card p, .shelter-card p, .hazard-card p, .story-card p, .innovation-card p, .expedition-card p, .video-card p,
.timeline-card p, .club-card p, .summit-card p, .era-card p, .basecamp-feature-card p, .federation-card p {
  color: var(--alpine-text-muted) !important;
}

[data-theme="snow"] .card p, 
[data-theme="snow"] .card ul, 
[data-theme="snow"] .card ol, 
[data-theme="snow"] .card li, 
[data-theme="snow"] .card small:not(.badge),
[data-theme="snow"] .style-card p, 
[data-theme="snow"] .shelter-card p, 
[data-theme="snow"] .hazard-card p, 
[data-theme="snow"] .story-card p, 
[data-theme="snow"] .innovation-card p, 
[data-theme="snow"] .expedition-card p, 
[data-theme="snow"] .video-card p,
[data-theme="snow"] .timeline-card p, 
[data-theme="snow"] .club-card p, 
[data-theme="snow"] .summit-card p, 
[data-theme="snow"] .era-card p, 
[data-theme="snow"] .basecamp-feature-card p, 
[data-theme="snow"] .federation-card p {
  color: #334155 !important;
}

/* Table Alpine High-Contrast */
.table-alpine,
.table-alpine td,
.table-alpine th {
  color: var(--alpine-text-light) !important;
}

.table-alpine td.text-light-body,
.table-alpine td .text-light-body,
.table-alpine td.text-muted,
.table-alpine td.text-secondary {
  color: var(--alpine-text-muted) !important;
}

[data-theme="snow"] .table-alpine,
[data-theme="snow"] .table-alpine td,
[data-theme="snow"] .table-alpine th {
  color: #0f172a !important;
}

[data-theme="snow"] .table-alpine td.text-light-body,
[data-theme="snow"] .table-alpine td .text-light-body,
[data-theme="snow"] .table-alpine td.text-muted,
[data-theme="snow"] .table-alpine td.text-secondary {
  color: #334155 !important;
}

/* Badges with light backgrounds */
.badge.bg-secondary-subtle {
  background-color: var(--alpine-bg-surface) !important;
  color: var(--alpine-text-light) !important;
  border: 1px solid var(--alpine-border) !important;
}

[data-theme="snow"] .badge.bg-secondary-subtle {
  background-color: #e2e8f0 !important;
  color: #0f172a !important;
  border-color: #cbd5e1 !important;
}

.badge.bg-warning-subtle {
  background-color: rgba(245, 158, 11, 0.18) !important;
  color: #f59e0b !important;
  border: 1px solid rgba(245, 158, 11, 0.3) !important;
}

.badge.bg-primary-subtle {
  background-color: rgba(56, 189, 248, 0.18) !important;
  color: var(--alpine-primary) !important;
  border: 1px solid var(--alpine-border) !important;
}

.badge.bg-success-subtle {
  background-color: rgba(16, 185, 129, 0.18) !important;
  color: #10b981 !important;
  border: 1px solid rgba(16, 185, 129, 0.3) !important;
}

.badge.bg-danger-subtle {
  background-color: rgba(239, 68, 68, 0.18) !important;
  color: #ef4444 !important;
  border: 1px solid rgba(239, 68, 68, 0.3) !important;
}

/* Accordion Alpine Body High-Contrast */
.accordion-alpine .accordion-body h6 {
  color: var(--alpine-primary) !important;
}

.accordion-alpine .accordion-body ol,
.accordion-alpine .accordion-body li,
.accordion-alpine .accordion-body p {
  color: var(--alpine-text-muted) !important;
}

[data-theme="snow"] .accordion-alpine .accordion-body ol,
[data-theme="snow"] .accordion-alpine .accordion-body li,
[data-theme="snow"] .accordion-alpine .accordion-body p {
  color: #334155 !important;
}
`;

// Insert before the print styles
const printIndex = css.indexOf('/* ============================================================\n   PRINT STYLES FOR OFFICIAL EXPEDITION PASS');
if (printIndex !== -1) {
  css = css.slice(0, printIndex) + contrastRules + '\n' + css.slice(printIndex);
} else {
  css += '\n' + contrastRules;
}

fs.writeFileSync('assets/css/style.css', css, 'utf8');
console.log('Successfully injected universal contrast rules into assets/css/style.css (' + css.length + ' bytes)');
