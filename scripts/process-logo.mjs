import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

async function processLogo() {
  const inputPath = path.resolve('_originals/brand/ncs-logo-original.jpg');
  const brandDir = path.resolve('public/brand');
  fs.mkdirSync(brandDir, { recursive: true });

  const image = sharp(inputPath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // We will produce 3 buffers:
  // 1. dark (original dark ink, transparent background)
  // 2. white (white ink, transparent background)
  // 3. royal blue (#2340C8 ink, transparent background)
  const darkBuf = Buffer.alloc(width * height * 4);
  const whiteBuf = Buffer.alloc(width * height * 4);
  const blueBuf = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const r = data[i * channels + 0];
    const g = data[i * channels + 1];
    const b = data[i * channels + 2];

    // Compute grayscale luminance (0 = black, 255 = white)
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

    // Background thresholding with smooth antialiasing
    // High luminance = transparent, Low luminance = opaque
    let alpha = 0;
    if (luminance < 170) {
      alpha = 255;
    } else if (luminance < 240) {
      alpha = Math.round(255 * (1 - (luminance - 170) / (240 - 170)));
    } else {
      alpha = 0;
    }

    // 1. Dark ink on transparent
    darkBuf[i * 4 + 0] = 18;  // #12163A deep ink
    darkBuf[i * 4 + 1] = 22;
    darkBuf[i * 4 + 2] = 58;
    darkBuf[i * 4 + 3] = alpha;

    // 2. White ink on transparent
    whiteBuf[i * 4 + 0] = 248; // #F8F6FF
    whiteBuf[i * 4 + 1] = 246;
    whiteBuf[i * 4 + 2] = 255;
    whiteBuf[i * 4 + 3] = alpha;

    // 3. Royal blue on transparent (#2340C8)
    blueBuf[i * 4 + 0] = 35;
    blueBuf[i * 4 + 1] = 64;
    blueBuf[i * 4 + 2] = 200;
    blueBuf[i * 4 + 3] = alpha;
  }

  // Save files
  await sharp(darkBuf, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(path.join(brandDir, 'logo-dark.png'));

  await sharp(whiteBuf, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(path.join(brandDir, 'logo-white.png'));

  await sharp(blueBuf, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(path.join(brandDir, 'logo.png')); // primary transparent logo

  console.log('Successfully generated public/brand/logo.png, logo-white.png, and logo-dark.png');
}

processLogo().catch(console.error);
