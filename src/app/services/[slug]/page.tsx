import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';
import { services } from '@/data/services';
import { ContactButtons } from '@/components/Content';
import { pageMetadata } from '@/lib/metadata';
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  return s
    ? pageMetadata(
        s.title + ' in Greater Noida',
        s.description + ' Contact Cool Trust AC Solution in Greater Noida.',
        '/services/' + slug,
      )
    : { title: 'Service not found' };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  if (!s) notFound();
  const ac = s.slug.startsWith('ac-');
  return (
    <article className="container service-detail">
      <Link href="/services" className="text-link">
        <ArrowLeft size={16} />
        All services
      </Link>
      <div className="detail-grid">
        <div>
          <span className="eyebrow">GREATER NOIDA · SERVICE ENQUIRIES</span>
          <h1>{s.title}</h1>
          <p className="lead">{s.description}</p>
          <h2>What we can help with</h2>
          <ul className="task-list">
            {s.tasks.map((t) => (
              <li key={t}>
                <Check size={17} />
                {t}
              </li>
            ))}
          </ul>
          <h2>How to request this service</h2>
          <p>
            Share your appliance brand and model, your location and a brief
            description of what you need. The team can discuss suitability,
            charges and visit arrangements before any work is agreed.
          </p>
          <ContactButtons service={s.title} />
        </div>
        <div className="detail-aside">
          {ac ? (
            <Image
              src="/images/ac-service.jpg"
              alt="Technician checking an air conditioner coil with a diagnostic tool"
              width={600}
              height={750}
              sizes="(max-width:760px) 100vw, 40vw"
            />
          ) : (
            <div className="appliance-placeholder">
              <span>{s.title}</span>
              <p>Service photograph to be supplied by the business.</p>
            </div>
          )}
          <p className="map-note">
            {ac
              ? 'Illustrative stock photograph; not a photograph of our team.'
              : 'Image placeholder awaiting a verified business photograph.'}
          </p>
        </div>
      </div>
      <div className="related">
        <h2>Other services</h2>
        <div>
          {services
            .filter((item) => item.slug !== slug)
            .map((item) => (
              <Link key={item.slug} href={'/services/' + item.slug}>
                {item.title} ↗
              </Link>
            ))}
        </div>
      </div>
    </article>
  );
}
