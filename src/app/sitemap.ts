import type { MetadataRoute } from 'next';
import { productionUrl } from '@/data/business';
import { services } from '@/data/services';
export default function sitemap(): MetadataRoute.Sitemap {
  return productionUrl
    ? [
        '',
        '/services',
        '/about',
        '/gallery',
        '/contact',
        '/service-areas',
        '/privacy-policy',
        ...services.map((s) => '/services/' + s.slug),
      ].map((p) => ({ url: productionUrl + p }))
    : [];
}
