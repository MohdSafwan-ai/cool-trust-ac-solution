import Link from 'next/link';
import {
  Phone,
  ArrowUpRight,
  ArrowRight,
  MapPin,
  Snowflake,
  Wrench,
  Wind,
  Droplets,
  CalendarCheck,
  Refrigerator,
  KeyRound,
} from 'lucide-react';
import { business } from '@/data/business';
import { services } from '@/data/services';
import { whatsappUrl, directionsUrl, mapUrl } from '@/lib/contact';
export function WhatsAppIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.8A8.5 8.5 0 1 1 20.5 11.7Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M8.3 7.8c-.7.7-.3 2.8 1.6 4.8 2 2 4.2 2.6 5 1.8l.7-1-2-1-1 .6c-1.1-.5-2-1.4-2.5-2.4l.6-.9-1-2Z"
        fill="currentColor"
      />
    </svg>
  );
}
export function ContactButtons({ service }: { service?: string }) {
  return (
    <div className="contact-buttons">
      <a
        className="button"
        href={whatsappUrl(service)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppIcon />
        Contact on WhatsApp
        <ArrowUpRight size={16} />
      </a>
      <a className="button button-outline" href={'tel:' + business.telephone}>
        <Phone size={17} />
        Call Now
      </a>
    </div>
  );
}
const icons = [
  Snowflake,
  Wrench,
  Droplets,
  CalendarCheck,
  Wind,
  KeyRound,
  Wind,
  Refrigerator,
];
export function ServicesList({ preview = false }: { preview?: boolean }) {
  return (
    <section className="section container" id="services">
      <div className="section-heading">
        <div>
          <span className="eyebrow">WHAT WE DO</span>
          <h2>Our Services</h2>
          <p>
            Air conditioning and appliance services for homes and businesses.
          </p>
        </div>
        {preview && (
          <Link className="text-link" href="/services">
            Explore all services
            <ArrowRight size={17} />
          </Link>
        )}
      </div>
      <div className="services-grid">
        {services.map((s, i) => {
          const Icon = icons[i];
          return (
            <Link
              href={'/services/' + s.slug}
              className="service-row"
              key={s.slug}
            >
              <span className="service-icon">
                <Icon size={24} strokeWidth={1.5} />
              </span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </div>
              <ArrowUpRight className="service-arrow" size={20} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
export function AboutBlock() {
  return (
    <section className="about-section">
      <div className="container about-grid">
        <div>
          <span className="eyebrow">LOCAL SERVICE. DIRECT SUPPORT.</span>
          <h2>
            Keeping your space
            <br />
            comfortable.
          </h2>
        </div>
        <div>
          <h3>About {business.name}</h3>
          <p>
            {business.name} provides air conditioning and appliance-related
            services from Greater Noida. Contact the team for installation,
            repair, maintenance, gas filling, AC rental, air purifier servicing,
            and refrigerator repair enquiries.
          </p>
          <Link href="/about" className="text-link">
            Get to know us
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
export function AreasBlock() {
  return (
    <section className="section container areas-section">
      <div>
        <span className="eyebrow">CLOSE TO HOME</span>
        <h2>Serving Greater Noida</h2>
        <p>
          Based in Gaur City 1, Haibatpur. Share your location with our team to
          discuss a service enquiry.
        </p>
      </div>
      <div className="area-label">
        <MapPin size={23} />
        <div>
          <strong>{business.areas[0]}</strong>
          <span>Gaur City 1 · Haibatpur</span>
        </div>
      </div>
    </section>
  );
}
export function ContactBlock() {
  return (
    <section className="section container contact-section">
      <div>
        <span className="eyebrow">LET’S TALK</span>
        <h2>Tell us what needs attention.</h2>
        <p>
          Share your appliance model, the issue and your location.
          <br />
          Our team can discuss the next steps with you.
        </p>
        <ContactButtons />
      </div>
      <div className="contact-details">
        <h3>{business.name}</h3>
        <a href={'tel:' + business.telephone}>
          <Phone size={16} />
          {business.phone}
          <span>Primary</span>
        </a>
        <a href={'tel:' + business.secondaryTelephone}>
          <Phone size={16} />
          {business.secondaryPhone}
          <span>Alternative</span>
        </a>
        <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />
          {business.phone}
          <span>WhatsApp</span>
        </a>
        <p>
          <MapPin size={18} />
          {business.address}
        </p>
        <a
          className="text-link"
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Directions
          <ArrowUpRight size={15} />
        </a>
      </div>
    </section>
  );
}
export function LocationMap() {
  return (
    <section className="location-section">
      <div className="container">
        <div className="map-heading">
          <div>
            <span className="eyebrow">OUR LOCATION</span>
            <h2>Find Us</h2>
            <p>{business.address}</p>
          </div>
          <a
            className="button button-outline"
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin size={17} />
            Get Directions
            <ArrowUpRight size={15} />
          </a>
        </div>
        <iframe
          src={mapUrl}
          title={'Address map for ' + business.name}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <p className="map-note">
          Address-based map. Contact the team for help finding the premises.
        </p>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <>
      <footer>
        <div className="container footer-main">
          <div>
            <strong>{business.name}</strong>
            <p>Air conditioning & appliance services.</p>
            <p>{business.address}</p>
          </div>
          <nav aria-label="Footer navigation">
            {[
              ['Home', '/'],
              ['Services', '/services'],
              ['About', '/about'],
              ['Contact', '/contact'],
              ['Privacy Policy', '/privacy-policy'],
            ].map(([label, url]) => (
              <Link key={url} href={url}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="footer-phone">
            <a href={'tel:' + business.telephone}>{business.phone}</a>
            <a href={'tel:' + business.secondaryTelephone}>
              {business.secondaryPhone}
            </a>
          </div>
        </div>
        <div className="container copyright">
          © {new Date().getFullYear()} {business.name}. All rights reserved.
          <span>Greater Noida, Uttar Pradesh</span>
        </div>
      </footer>
      <div className="mobile-contact">
        <a className="button" href={'tel:' + business.telephone}>
          <Phone size={17} />
          Call Now
        </a>
        <a
          className="button whatsapp"
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon />
          WhatsApp
        </a>
      </div>
    </>
  );
}
export function Steps() {
  return (
    <section className="section container steps">
      <div className="section-heading">
        <div>
          <span className="eyebrow">A SIMPLE START</span>
          <h2>Service begins with a conversation.</h2>
        </div>
      </div>
      <div className="steps-grid">
        {[
          [
            '01',
            'Get in touch',
            'Call or message us with your service requirement.',
          ],
          [
            '02',
            'Share the details',
            'Tell us your location, appliance model and the issue.',
          ],
          [
            '03',
            'Discuss the next steps',
            'Speak with the team about the work, charges and visit arrangements.',
          ],
        ].map(([n, t, d]) => (
          <div key={n}>
            <span className="step-number">{n}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
