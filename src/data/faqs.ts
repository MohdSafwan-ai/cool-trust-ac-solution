import { business } from '@/data/business';
import { services } from '@/data/services';

export const faqs = [
  {
    question: 'What services does Cool Trust AC Solution provide?',
    answer: `${business.name} accepts enquiries for ${services.map((service) => service.title).join(', ')}. Services are for homes and businesses, with the requested work discussed directly with the team.`,
  },
  {
    question: 'Where is Cool Trust AC Solution located?',
    answer: `${business.name} is based at ${business.address}. Use the directions link below or contact the team for help finding the premises.`,
  },
  {
    question: 'Can I arrange a service at my location?',
    answer: `The business is based in ${business.postalAddress.addressLocality}, ${business.postalAddress.addressRegion}. Share your exact address when enquiring so the team can confirm whether service can be arranged at your location.`,
  },
  {
    question: 'How can I contact the team for an AC service?',
    answer: `Call ${business.phone} or use the website’s WhatsApp link to contact the team on the same number. The alternative phone number is ${business.secondaryPhone}. A call or message starts an enquiry; visit arrangements need to be discussed with the team.`,
  },
  {
    question: 'What details should I share when requesting a service?',
    answer:
      'Share your appliance brand and model, your address, and a short description of the issue or work you need. If available, include a photo of the appliance or displayed error when messaging. These details help the team discuss the next steps.',
  },
  {
    question: 'How do I find out the service charges?',
    answer:
      'Contact the team with your appliance details and service requirement to discuss the charges. The website does not list fixed prices. Confirm the work, charges and visit arrangements with the team before agreeing to a service.',
  },
];
