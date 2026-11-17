import fs from 'fs';

const html = fs.readFileSync('scripts/fb_m.html', 'utf8');

// Look for decoded HTML entities
function decodeEntities(encodedString) {
  const translate_re = /&(nbsp|amp|quot|lt|gt);/g;
  const translate = {
    "nbsp": " ",
    "amp" : "&",
    "quot": "\"",
    "lt"  : "<",
    "gt"  : ">"
  };
  return encodedString.replace(translate_re, function(match, entity) {
    return translate[entity];
  }).replace(/&#(\d+);/gi, function(match, numStr) {
    const num = parseInt(numStr, 10);
    return String.fromCharCode(num);
  }).replace(/&#x([0-9a-f]+);/gi, function(match, hexStr) {
    const num = parseInt(hexStr, 16);
    return String.fromCharCode(num);
  });
}

console.log('Decoded Description:');
const descMatch = html.match(/name="description"\s+content="([^"]+)"/i) || html.match(/property="og:description"\s+content="([^"]+)"/i);
if (descMatch) {
  console.log(decodeEntities(descMatch[1]));
}

// Find all JSON blobs inside script tags
const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
console.log(`Found ${scripts.length} script tags.`);

const foundStrings = new Set();
scripts.forEach((s) => {
  const content = s[1];
  // Search for mentions of events, dates, activities, names, email, phone, location
  const matches = content.matchAll(/"([A-Z0-9][^"\\]{15,200})"/gi);
  for (const m of matches) {
    const val = m[1];
    if (
      val.toLowerCase().includes('counsel') ||
      val.toLowerCase().includes('sangam') ||
      val.toLowerCase().includes('nist') ||
      val.toLowerCase().includes('student') ||
      val.toLowerCase().includes('berhampur') ||
      val.toLowerCase().includes('nourish') ||
      val.toLowerCase().includes('service') ||
      val.toLowerCase().includes('blissful') ||
      val.toLowerCase().includes('pragmatic')
    ) {
      foundStrings.add(val);
    }
  }
});

console.log('\n--- FOUND KEY PHRASES & DETAILS ---');
Array.from(foundStrings).slice(0, 40).forEach(str => console.log('•', decodeEntities(str)));
