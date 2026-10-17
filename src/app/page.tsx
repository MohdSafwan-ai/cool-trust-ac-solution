import Image from 'next/image';
import { MapPin, Check } from 'lucide-react';
import {
  ContactButtons,
  ServicesList,
  AboutBlock,
  AreasBlock,
  ContactBlock,
  Steps,
} from '@/components/Content';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'AC Repair, Servicing & Installation in Greater Noida',
  'AC repair, cleaning, installation, gas refilling and maintenance in Greater Noida. Contact Cool Trust AC Solution for home and business service enquiries.',
  '/',
);
export default function Home() {
  return (
    <>
      <section className="container hero">
        <div className="hero-copy">
          <span className="location-pill">
            <MapPin size={14} />
            Greater Noida, Uttar Pradesh
          </span>
          <h1>
            AC Repair,
            <br />
            Servicing &<br />
            <span>Installation.</span>
          </h1>
          <p>
            AC repair, cleaning, installation, gas refilling and maintenance
            services for residential and commercial air conditioners.
          </p>
          <ContactButtons />
          <div className="hero-note">
            <span />
            <span>For your home. For your business.</span>
          </div>
        </div>
        <div className="hero-visual">
          <Image
            src="/images/ac-outdoor.jpg"
            alt="Technician checking refrigerant pressure on an outdoor air conditioner"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 50vw"
          />
          <div className="photo-caption">
            <span>CARE THAT KEEPS YOU COMFORTABLE</span>
            <span>AC & appliance services</span>
          </div>
        </div>
      </section>
      <div className="service-strip">
        <div className="container">
          <span>
            <Check size={16} />
            Residential & commercial
          </span>
          <span>
            <Check size={16} />
            AC & appliance services
          </span>
          <span>
            <Check size={16} />
            Direct phone & WhatsApp support
          </span>
        </div>
      </div>
      <ServicesList preview />
      <AboutBlock />
      <Steps />
      <AreasBlock />
      <ContactBlock />
    </>
  );
}
