// Builds icons.svg: an inline <symbol> sprite from lucide-react 0.468.0 (installed by npm install).
// Usage: npm run icons   (edit NAMES to add icons)
import fs from 'node:fs';
const DIR = 'node_modules/lucide-react/dist/esm/icons/';
const NAMES = ['calendar','clock','users','search','audio-lines','list-checks','settings','sun','moon','link','copy','check','messages-square','arrow-up','square','pencil','x','gavel','circle-help','file-text','menu','corner-down-left','inbox','share-2','folder','undo-2','chevron-down','lock','globe'];
let out = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">\n';
for (const n of NAMES) {
  const src = fs.readFileSync(DIR + n + '.js', 'utf8');
  const arr = src.match(/createLucideIcon\("[^"]+", (\[[\s\S]*\])\);/)[1];
  const nodes = Function('return ' + arr)();
  const inner = nodes.map(([tag, a]) => '<' + tag + ' ' + Object.entries(a).filter(([k]) => k !== 'key').map(([k, v]) => `${k}="${v}"`).join(' ') + '/>').join('');
  out += `<symbol id="i-${n}" viewBox="0 0 24 24">${inner}</symbol>\n`;
}
fs.writeFileSync('icons.svg', out + '</svg>\n');
console.log('wrote', NAMES.length);
