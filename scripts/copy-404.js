import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, '..', 'dist');
const indexHtml = path.join(dist, 'index.html');
const notFoundHtml = path.join(dist, '404.html');

if (fs.existsSync(indexHtml)) {
  fs.copyFileSync(indexHtml, notFoundHtml);
  console.log('Copied index.html -> 404.html for GitHub Pages SPA');
}
