const fs = require('fs');

const css = fs.readFileSync('assets/css/style.css', 'utf8');
const lines = css.split('\n');

let currentSelector = [];
let inSnowRule = false;

lines.forEach((line, idx) => {
  if (line.includes('[data-theme="snow"]')) {
    inSnowRule = true;
  }
  if (inSnowRule) {
    currentSelector.push(`${idx+1}: ${line}`);
    if (line.includes('}')) {
      const block = currentSelector.join('\n');
      if (block.includes('color:')) {
        console.log('--- Rule ---');
        console.log(block);
      }
      currentSelector = [];
      inSnowRule = false;
    }
  }
});
