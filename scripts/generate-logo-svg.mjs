import fs from 'node:fs';
import path from 'node:path';

const brandDir = path.resolve('public/brand');
const whiteLogoPath = path.join(brandDir, 'logo-white.png');
const whiteDataUri = `data:image/png;base64,${fs.readFileSync(whiteLogoPath).toString('base64')}`;

// SVG container embedding the clean crisp emblem
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 631 622" width="100%" height="100%">
  <image href="${whiteDataUri}" width="631" height="622" />
</svg>`;

fs.writeFileSync(path.join(brandDir, 'logo.svg'), svgContent, 'utf8');

// Favicon SVG with rounded indigo background and emblem
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="22" fill="#12163A" />
  <image href="${whiteDataUri}" x="10" y="10" width="80" height="80" />
</svg>`;

fs.writeFileSync(path.resolve('public/favicon.svg'), faviconSvg, 'utf8');
console.log('Generated public/brand/logo.svg and public/favicon.svg');
