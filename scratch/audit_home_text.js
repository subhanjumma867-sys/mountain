const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// Match view-home
const homeMatch = html.match(/<div class="spa-view[^"]*" id="view-home">([\s\S]*?)<\/div>\s*<!-- =+[\s\S]*?SPA VIEW 2/);
if (!homeMatch) {
  console.log('view-home not found');
  process.exit(1);
}

const homeHtml = homeMatch[1];

// Find all tags with classes
const tagRegex = /<([a-z0-9]+)\s+([^>]*?)>(.*?)<\/\1>|<([a-z0-9]+)\s+([^>]*?)\/?>/gis;

// Check for any text-dark, text-white, text-muted, text-secondary, text-white-50, text-white-70, text-white-80, bg-dark, bg-light, bg-dark-subtle
const lines = homeHtml.split('\n');
console.log('=== HOMEPAGE TEXT-RELATED CLASSES ===');
lines.forEach((line, idx) => {
  if (
    line.includes('text-white') ||
    line.includes('text-dark') ||
    line.includes('text-muted') ||
    line.includes('text-secondary') ||
    line.includes('bg-dark') ||
    line.includes('bg-light') ||
    line.includes('badge') ||
    line.includes('lead') ||
    line.includes('btn-outline-light')
  ) {
    console.log(`L${idx + 204}: ${line.trim()}`);
  }
});
