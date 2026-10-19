# SEO and domain launch

## Implemented

- Unique absolute page titles, descriptions and canonical URLs on all 15 public pages.
- Consistent Open Graph and social sharing metadata without repeated business names.
- Linked HVACBusiness and WebSite structured data with the genuine address, both contact numbers, service catalogue and business photograph.
- Service and BreadcrumbList structured data on all eight service pages, matching visible breadcrumbs.
- Service-specific explanations and practical enquiry details, without invented rates, ratings, opening hours, guarantees or extra coverage areas.
- Sitemap and robots.txt based on the configured production origin. Preview deployments receive a noindex directive.
- Improved text contrast, logo accessibility and hero-image loading priority.
- Optional Google Search Console HTML verification via `GOOGLE_SITE_VERIFICATION`.

## Domain connection order

1. Confirm the exact owned domain and whether the primary address should use www.
2. Add both the chosen hostname and its www/apex counterpart to the existing Vercel project `cool-trust-ac-solution`.
3. Use the specific DNS records returned by Vercel for that project. Keep Hostinger DNS management and existing email/verification records intact; only change the records needed for website routing.
4. Verify domain ownership if requested, DNS resolution and the HTTPS certificate. Configure the alternate hostname to redirect to the chosen primary address.
5. Set `NEXT_PUBLIC_SITE_URL` in Vercel Production to the final HTTPS origin and redeploy. It takes precedence over automatic domain detection. Recheck canonical links, structured-data identifiers, social images and `/sitemap.xml` on the final hostname.
6. Verify the final domain in the business owner's Google Search Console account, using its supplied DNS TXT token or URL-prefix HTML verification token. Submit `/sitemap.xml` and inspect the homepage and main service URLs.
7. If the business has an official Google Business Profile, use the exact supplied listing and update its website address. Do not invent a listing URL or publish unverified business details.

## Still needed

The exact Hostinger domain, preferred primary hostname, access to its DNS panel, and Google Search Console verification details. No custom domain, DNS record or search-console ownership has been claimed or changed without those details.

## Validation

- `npm run lint` and `npm run build` passed.
- `qa/seo-check.mjs` checks 15 pages for unique titles/descriptions, canonical and social URLs, business/service/breadcrumb structured data, sitemap consistency and 404 handling.
- `qa/check.mjs` checks navigation, contact actions, map URLs, and overflow across eight viewport widths.
- Results: `qa/seo-results.json`, `qa/results.json` and `qa/seo-lighthouse-summary.json`.
- Lighthouse scores represent individual automated mobile lab runs and can vary between runs.

## Mobile audit results

Production checks scored 100 for SEO and 100 for accessibility. Performance varied from 72 to 89 between two runs with different initial response times. The repeat measured a 2.6s largest contentful paint, zero layout shift, and 130ms total blocking time. Baseline performance was 88, with 96 accessibility and 100 SEO. See the summary JSON for all measurements and audited commit IDs. A final priority hint was added to the main hero image after the measurements.

## Official references

- Google local business structured data: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Google site names: https://developers.google.com/search/docs/appearance/site-names
- Vercel domain setup: https://vercel.com/docs/domains/set-up-custom-domain
