import type { Metadata } from 'next';
import { productionUrl, business } from '@/data/business';
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    ...(productionUrl
      ? { alternates: { canonical: productionUrl + path } }
      : {}),
    openGraph: {
      title: title + ' | ' + business.name,
      description,
      type: 'website',
      locale: 'en_IN',
      ...(productionUrl ? { url: productionUrl + path } : {}),
    },
  };
}
