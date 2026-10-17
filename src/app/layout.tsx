import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { Footer, LocationMap } from '@/components/Content';
import { business, productionUrl, siteUrl } from '@/data/business';
const heading = Manrope({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});
const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});
export const metadata: Metadata = {
  metadataBase: new URL(productionUrl || siteUrl || 'http://localhost:3000'),
  title: {
    default: business.name + ' | AC Services in Greater Noida',
    template: '%s | ' + business.name,
  },
  description:
    'AC repair, installation and appliance service enquiries in Greater Noida. Contact Cool Trust AC Solution by phone or WhatsApp.',
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    name: business.name,
    telephone: business.telephone,
    additionalProperty: {
      '@type': 'PropertyValue',
      name: 'Alternative telephone',
      value: business.secondaryTelephone,
    },
    address: { '@type': 'PostalAddress', ...business.postalAddress },
    areaServed: 'Greater Noida',
    ...(productionUrl ? { url: productionUrl } : {}),
  };
  return (
    <html lang="en-IN">
      <body className={heading.variable + ' ' + body.variable}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <LocationMap />
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, '\u003c'),
          }}
        />
      </body>
    </html>
  );
}
