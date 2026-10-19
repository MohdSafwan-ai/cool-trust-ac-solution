import type { Metadata } from 'next';
import { productionUrl, business } from '@/data/business';

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const fullTitle = title.includes(business.name)
    ? title
    : `${title} | ${business.name}`;
  const url = productionUrl ? productionUrl + path : undefined;
  const image = {
    url: '/opengraph-image',
    width: 1200,
    height: 630,
    alt: `${business.name} — AC and appliance services in Greater Noida`,
  };

  return {
    title: { absolute: fullTitle },
    description,
    ...(url ? { alternates: { canonical: url } } : {}),
    openGraph: {
      title: fullTitle,
      description,
      siteName: business.name,
      type: 'website',
      locale: 'en_IN',
      images: [image],
      ...(url ? { url } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: ['/opengraph-image'],
    },
  };
}
