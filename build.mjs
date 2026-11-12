// Builds quorum.html (the artifact page: no html/head/body, the publisher wraps it)
// and preview.html (a full standalone document for local render checks).
import fs from 'node:fs';
const src = fs.readFileSync('quorum.src.html', 'utf8');
const icons = fs.readFileSync('icons.svg', 'utf8');
const page = src.replace('<!--ICONS-->', icons);
fs.writeFileSync('quorum.html', page);
fs.writeFileSync('preview.html', `<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><style>:root{color-scheme:light}img{max-width:100%}[hidden]{display:none!important}</style>\n${page}\n</body></html>\n`);
console.log('built');
