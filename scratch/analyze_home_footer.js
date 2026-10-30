const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const footerMatch = html.match(/<footer[\s\S]*?<\/footer>/);
if (footerMatch) {
  console.log('=== FOOTER RAW ===');
  console.log(footerMatch[0]);
}

const homeMatch = html.match(/<div class="spa-view[^"]*" id="view-home">([\s\S]*?)<\/div>\s*<!-- =+[\s\S]*?VIEW 2/);
if (homeMatch) {
  console.log('=== VIEW HOME (first 1000 chars) ===');
  console.log(homeMatch[1].slice(0, 1000));
}
