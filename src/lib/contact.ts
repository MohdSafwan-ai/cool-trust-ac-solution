import { business } from '@/data/business';
export const whatsappUrl = (service?: string) =>
  'https://wa.me/' +
  business.whatsapp +
  '?text=' +
  encodeURIComponent(
    service
      ? 'Hello ' +
          business.name +
          ', I need assistance with ' +
          service +
          '. My location is [please enter your location].'
      : 'Hello ' +
          business.name +
          ', I would like to enquire about an AC service.',
  );
export const directionsUrl =
  'https://www.google.com/maps/dir/?api=1&destination=' +
  encodeURIComponent(business.mapQuery);
export const mapUrl =
  'https://www.google.com/maps?q=' +
  encodeURIComponent(business.mapQuery) +
  '&output=embed';
