import type { MetadataRoute } from 'next';
import { productionUrl } from '@/data/business';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
    ],
    ...(productionUrl ? { sitemap: productionUrl + '/sitemap.xml' } : {}),
  };
}
