import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import StructuredData from '@/components/StructuredData';
import { businessStructuredData } from '@/lib/structured-data';
import MotionEnhancements from '@/components/MotionEnhancements';
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
  applicationName: business.name,
  robots: { index: process.env.VERCEL_ENV !== 'preview', follow: true },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <MotionEnhancements />
        <StructuredData data={businessStructuredData()} />
      </body>
    </html>
  );
}
