# Cool Trust AC Solution logo

The mark combines an open C with a T, using the site's navy (`#10283D`), white, and mint (`#8EE3D0`). Keep its proportions and spacing intact.

- Vector master: `public/brand/mark.svg`.
- Square PNG exports: `public/brand/logo-192.png` and `public/brand/logo-512.png`.
- Header: mark beside the two-line business name.
- Browser icons: `src/app/icon.svg` and `src/app/favicon.ico` (16, 32 and 48 pixels).
- Apple touch icon: `src/app/apple-icon.png` (180 pixels).

After editing the vector master, run `node scripts/generate-brand-icons.mjs` to regenerate the matching exports. Next.js publishes the icon metadata automatically. The business structured data references the 512-pixel PNG.
