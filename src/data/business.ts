export const business = {
  name: 'Cool Trust AC Solution',
  phone: '+91 9719127879',
  secondaryPhone: '+91 9759765361',
  telephone: '+919719127879',
  secondaryTelephone: '+919759765361',
  whatsapp: '919719127879',
  address:
    'Gaur City 1, Haibatpur, Near Bharat Petrol Pump, Greater Noida, Uttar Pradesh 201009, India',
  mapQuery:
    'Gaur City 1, Haibatpur, Near Bharat Petrol Pump, Greater Noida, Uttar Pradesh 201009',
  areas: ['Greater Noida, Uttar Pradesh'],
  postalAddress: {
    streetAddress: 'Gaur City 1, Haibatpur, Near Bharat Petrol Pump',
    addressLocality: 'Greater Noida',
    addressRegion: 'Uttar Pradesh',
    postalCode: '201009',
    addressCountry: 'IN',
  },
};
const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL
    : undefined);
export const siteUrl = configuredUrl
  ? new URL(configuredUrl).origin
  : undefined;
export const productionUrl =
  siteUrl && !/localhost|127\.0\.0\.1/.test(siteUrl) ? siteUrl : undefined;
