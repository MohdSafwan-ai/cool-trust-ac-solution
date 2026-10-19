import { business, productionUrl } from '@/data/business';
import { services } from '@/data/services';
import { directionsUrl } from '@/lib/contact';

export function businessStructuredData() {
  const identity = productionUrl
    ? { '@id': `${productionUrl}/#business`, url: productionUrl }
    : {};
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HVACBusiness',
        ...identity,
        name: business.name,
        telephone: business.telephone,
        address: { '@type': 'PostalAddress', ...business.postalAddress },
        areaServed: {
          '@type': 'City',
          name: business.postalAddress.addressLocality,
        },
        hasMap: directionsUrl,
        contactPoint: [business.telephone, business.secondaryTelephone].map(
          (telephone) => ({
            '@type': 'ContactPoint',
            telephone,
            contactType: 'customer service',
          }),
        ),
        ...(productionUrl
          ? {
              image: [`${productionUrl}/images/gallery/our-technician.png`],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'AC and appliance services',
                itemListElement: services.map((service) => ({
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    '@id': `${productionUrl}/services/${service.slug}#service`,
                    name: service.title,
                    url: `${productionUrl}/services/${service.slug}`,
                  },
                })),
              },
            }
          : {}),
      },
      ...(productionUrl
        ? [
            {
              '@type': 'WebSite',
              '@id': `${productionUrl}/#website`,
              url: productionUrl + '/',
              name: business.name,
              alternateName: 'Cool Trust',
              inLanguage: 'en-IN',
              publisher: { '@id': `${productionUrl}/#business` },
            },
          ]
        : []),
    ],
  };
}

export function serviceStructuredData(service: (typeof services)[number]) {
  if (!productionUrl) return undefined;
  const url = `${productionUrl}/services/${service.slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: `${service.title} in Greater Noida`,
        serviceType: service.title,
        description: service.description,
        url,
        provider: { '@id': `${productionUrl}/#business` },
        areaServed: {
          '@type': 'City',
          name: business.postalAddress.addressLocality,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumbs`,
        itemListElement: [
          { name: 'Home', url: productionUrl + '/' },
          { name: 'Services', url: productionUrl + '/services' },
          { name: service.title, url },
        ].map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      },
    ],
  };
}
