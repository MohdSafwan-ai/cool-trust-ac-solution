import fs from 'node:fs/promises';
import sharp from 'sharp';

// Keep every browser and device icon in sync with the vector master.
const source = await fs.readFile(
  new URL('../public/brand/mark.svg', import.meta.url),
);
const root = new URL('../', import.meta.url);
await fs.writeFile(new URL('src/app/icon.svg', root), source);
for (const size of [192, 512]) {
  await fs.writeFile(
    new URL(`public/brand/logo-${size}.png`, root),
    await sharp(source).resize(size, size).png().toBuffer(),
  );
}
await fs.writeFile(
  new URL('src/app/apple-icon.png', root),
  await sharp(source)
    .resize(180, 180)
    .flatten({ background: '#10283D' })
    .png()
    .toBuffer(),
);

const images = await Promise.all(
  [16, 32, 48].map(async (size) => ({
    size,
    data: await sharp(source).resize(size, size).png().toBuffer(),
  })),
);
const directory = Buffer.alloc(6 + images.length * 16);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(images.length, 4);
let offset = directory.length;
for (const [i, { size, data }] of images.entries()) {
  const entry = 6 + i * 16;
  directory[entry] = size;
  directory[entry + 1] = size;
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(data.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += data.length;
}
await fs.writeFile(
  new URL('src/app/favicon.ico', root),
  Buffer.concat([directory, ...images.map(({ data }) => data)]),
);
console.log(
  'Generated vector favicon, ICO sizes 16/32/48, Apple icon and 192/512px logo exports.',
);
