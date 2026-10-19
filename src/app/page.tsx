import Image from 'next/image';
import Link from 'next/link';
import { galleryPhotos } from '@/data/gallery';
import Gallery from '@/components/Gallery';
import FrequentlyAskedQuestions from '@/components/FrequentlyAskedQuestions';
import { MapPin, Check, ArrowUpRight } from 'lucide-react';
import {
  ContactButtons,
  ServicesList,
  AboutBlock,
  AreasBlock,
  ContactBlock,
  Steps,
} from '@/components/Content';
import { pageMetadata } from '@/lib/metadata';
import { business } from '@/data/business';
export const metadata = pageMetadata(
  'AC Repair & Installation in Greater Noida | ' + business.name,
  'AC repair, cleaning, installation, gas refilling and maintenance in Greater Noida. Contact Cool Trust AC Solution for home and business service enquiries.',
  '/',
);
export default function Home() {
  return (
    <>
      <section className="container hero">
        <div className="hero-copy">
          <span className="location-pill">
            <MapPin size={17} aria-hidden="true" />
            Greater Noida, Uttar Pradesh
          </span>
          <h1>{business.name}</h1>
          <p className="hero-service-line">
            AC Repairing, Repair Service &amp; Installation
          </p>
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
        <div className="hero-visual hero-story">
          <div className="hero-story-grid">
            <div className="hero-story-main">
              <Image
                src={galleryPhotos[2].src}
                alt={galleryPhotos[2].alt}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 760px) 60vw, (max-width: 1240px) 30vw, 340px"
              />
            </div>
            <div className="hero-story-details">
              {galleryPhotos.slice(0, 2).map((photo) => (
                <div className="hero-story-detail" key={photo.src}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    loading="eager"
                    fetchPriority="high"
                    sizes="(max-width: 760px) 35vw, (max-width: 1240px) 20vw, 210px"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="hero-story-footer">
            <span className="hero-story-eyebrow">
              THE PEOPLE BEHIND THE SERVICE
            </span>
            <div className="hero-story-caption">
              <strong>Our technician at work.</strong>
              <Link href="/gallery">
                Explore gallery <ArrowUpRight size={16} />
              </Link>
            </div>
            <p>Real service moments, from our gallery.</p>
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
      <Gallery preview />
      <Steps />
      <AreasBlock />
      <FrequentlyAskedQuestions />
      <ContactBlock />
    </>
  );
}
