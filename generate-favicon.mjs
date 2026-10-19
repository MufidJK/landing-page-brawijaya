import sharp from 'sharp';

const logoPath = './public/logo-the-brawijaya.webp';
const outputPath = './app/icon.png';

// Read logo
const logo = sharp(logoPath);
const metadata = await logo.metadata();

console.log(`Logo dimensions: ${metadata.width}x${metadata.height}`);

// Create 128x128 canvas with emerald background and rounded corners
const size = 128;
const padding = Math.round(size * 0.12); // 12% padding
const logoSize = size - (padding * 2);

// Scale logo proportionally to fit
const scale = Math.min(logoSize / metadata.width, logoSize / metadata.height);
const scaledWidth = Math.round(metadata.width * scale);
const scaledHeight = Math.round(metadata.height * scale);

// Center logo
const left = Math.round((size - scaledWidth) / 2);
const top = Math.round((size - scaledHeight) / 2);

// Generate white logo
const whiteLogo = await sharp(logoPath)
  .resize(scaledWidth, scaledHeight, { fit: 'inside' })
  .negate() // Invert to white (logo is dark)
  .toBuffer();

// Create rounded emerald background with white logo
await sharp({
  create: {
    width: size,
    height: size,
    channels: 4,
    background: { r: 15, g: 61, b: 46, alpha: 1 } // #0F3D2E
  }
})
  .composite([
    {
      input: Buffer.from(
        `<svg><rect x="0" y="0" width="${size}" height="${size}" rx="16" ry="16" fill="#0F3D2E"/></svg>`
      ),
      blend: 'dest-in'
    },
    {
      input: whiteLogo,
      top,
      left
    }
  ])
  .png()
  .toFile(outputPath);

console.log(`✓ Generated ${outputPath} (${size}x${size})`);
