import { ServicesList } from '@/components/Content';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'AC & Appliance Services in Greater Noida',
  'Explore installation, repairs, gas filling, AMC, maintenance, rental, air purifier service and refrigerator repair enquiries.',
  '/services',
);
export default function Page() {
  return (
    <>
      <div className="container page-heading">
        <span className="eyebrow">COOL TRUST AC SOLUTION</span>
        <h1>AC & appliance services.</h1>
        <p>
          Find the service you need. Contact us to discuss your appliance,
          location and requirements.
        </p>
      </div>
      <ServicesList />
    </>
  );
}
