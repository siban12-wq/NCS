import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

async function generateOg() {
  const bgPath = path.resolve('public/memories/campus-hills.jpg');
  if (!fs.existsSync(bgPath)) return;

  const bg = await sharp(bgPath)
    .resize(1200, 630, { fit: 'cover' })
    .modulate({ brightness: 0.6 })
    .toBuffer();

  const svgOverlay = Buffer.from(`
    <svg width="1200" height="630">
      <rect width="1200" height="630" fill="rgba(18, 22, 58, 0.8)" />
      <circle cx="600" cy="180" r="48" fill="#2340C8" />
      <circle cx="600" cy="180" r="28" fill="#5ED3C8" />
      <text x="600" y="300" font-family="Georgia, serif" font-size="64" font-weight="bold" fill="#F8F6FF" text-anchor="middle">TEAM NCS</text>
      <text x="600" y="370" font-family="sans-serif" font-size="32" fill="#FFE2A8" text-anchor="middle">You don't have to figure it out alone.</text>
      <text x="600" y="430" font-family="sans-serif" font-size="22" fill="#B9A7F5" text-anchor="middle">NIST Counselling Services · Student Support Team</text>
    </svg>
  `);

  await sharp(bg)
    .composite([{ input: svgOverlay }])
    .png()
    .toFile('public/og-image.png');

  console.log('Successfully generated public/og-image.png');
}

generateOg().catch(console.error);
