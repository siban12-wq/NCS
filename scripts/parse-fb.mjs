import fs from 'fs';

const html = fs.readFileSync('scripts/fb_m.html', 'utf8');

const title = html.match(/<title[^>]*>([^<]+)<\/title>/i);
console.log('Title:', title ? title[1] : 'No title');

const metas = [...html.matchAll(/<meta\s+(?:property|name)=["']([^"']+)["']\s+content=["']([^"']+)["']/gi)];
console.log('\n--- META TAGS ---');
metas.forEach(m => console.log(`${m[1]} = ${m[2]}`));

// Search for strings like text, posts, events, phone, email, etc.
console.log('\n--- TEXT MATCHES ---');
const regexList = [
  /counselling/gi,
  /sangam/gi,
  /contact/gi,
  /nist/gi,
  /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
  /\+?91[\s-]?[0-9]{10}/g,
];

// Extract text content inside <span> or <div> or <p>
const textMatches = [...html.matchAll(/>([^<]{20,})</g)]
  .map(m => m[1].trim())
  .filter(t => t.length > 20 && !t.includes('{') && !t.includes('function'));

console.log('Sample text snippets (first 25):');
console.log(textMatches.slice(0, 25).join('\n---\n'));
