# Cool Trust AC Solution

A mobile-first Next.js App Router website for the Greater Noida business. Includes Home, Services, eight service detail pages, About, Gallery, Service Areas, Contact, Privacy Policy, and a custom 404 page.

## Run locally

Requires Node.js 20.9 or newer (Node.js 22 or 24 recommended).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For a production preview:

```sh
npm run build
npm start
```

## Configuration

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the final HTTPS production domain. Rebuild after changing it. On Vercel, the production domain is detected automatically through `VERCEL_PROJECT_PRODUCTION_URL`. An explicit `NEXT_PUBLIC_SITE_URL` takes precedence. Canonical URLs and sitemap entries are omitted only when neither production URL is available. No private API keys are required.

Business contact information, address and confirmed service areas live in `src/data/business.ts`. Service descriptions and tasks live in `src/data/services.ts`. Gallery photos and captions live in `src/data/gallery.ts`; add new entries there to expand the gallery. WhatsApp and map URLs are built in `src/lib/contact.ts`.

## Completed features

- Server-rendered pages with static generation for all eight services.
- Mobile navigation, keyboard focus styles, Escape-to-close menu, and a mobile contact bar with safe-area padding.
- Primary and secondary phone links, encoded service-specific WhatsApp enquiries, address-based Google Maps embed, and official Google Maps directions.
- Unique metadata, production-domain canonical links, generated Open Graph image, JSON-LD HVACBusiness data, robots.txt and XML sitemap.
- Self-hosted build-time Google fonts, local optimized images using Next Image, lazy map loading, and reduced-motion support.
- No accounts, booking backend, analytics, payments or invented ratings/claims.

## Vercel deployment

1. Push this folder to a Git repository and import it into Vercel.
2. Select the Next.js framework preset and leave the project root as this folder. Build command: `npm run build`; output settings: Next.js defaults.
3. Set `NEXT_PUBLIC_SITE_URL` to the final production URL (including `https://`, no trailing slash) for the production environment.
4. Deploy. If the domain changes, update the variable and redeploy. Check `/sitemap.xml`, canonical links, telephone and WhatsApp actions after deployment.

The GitHub repository is connected to the Vercel project `cool-trust-ac-solution`. Pushes to `main` deploy to production.

## Photography and business confirmation

- The three photographs in `public/images/gallery/` were supplied by the business for the technician gallery. The original images are preserved. Gallery images now use separate AI-enhanced versions; the viewer offers a View original link. Enhancement prompts and saved paths are recorded in `docs/gallery-photo-enhancement.md`.

- `public/images/ac-outdoor.jpg`: illustrative stock photo by José Andrés Pacheco Cortes: https://www.pexels.com/photo/man-checking-an-air-conditioner-5463575/
- `public/images/ac-service.jpg`: illustrative stock photo by the same photographer: https://www.pexels.com/photo/man-repairing-an-aircon-5463580/
- Photos downloaded from Pexels for local hosting; license: https://www.pexels.com/license/. These do not depict the business's own team.
- The homepage hero now presents three AI-enhanced photographs from the business gallery: a main technician portrait alongside two AC servicing details. The former outdoor stock hero image remains as an unused asset.
- Air purifier and refrigerator detail pages intentionally show labeled photograph placeholders awaiting relevant business photographs.
- Confirm the final domain, official map listing/pin, business photography, and the privacy text against actual data-handling practices before launch. No hours, ratings, prices, service guarantees, additional service areas, or geographic coordinates have been invented.
- All links remain accessible if the map cannot load. The map uses an address query; it does not claim a verified exact pin.

## Verification

```sh
npm run lint
npm run typecheck
npm run build
npm audit --omit=dev
```

Browser QA results are recorded in `qa/results.json`; screenshots are in `qa/`. The local QA runner uses the Codex bundled Playwright runtime. Set `PLAYWRIGHT_MODULE_PATH` to your installed `playwright` package path to run `node qa/check.mjs` elsewhere (with the production server running on port 3000 and Edge installed).

The full dependency audit currently reports five high-severity findings through the development-only ESLint dependency chain (`braces` → `micromatch` → `fast-glob` → Next ESLint plugin/config). The registry currently offers no patched `braces` version. Do not blindly downgrade the Next ESLint configuration to an incompatible major as suggested by audit. Recheck and update the development tooling when a compatible patch is available. Production dependencies are checked separately.
