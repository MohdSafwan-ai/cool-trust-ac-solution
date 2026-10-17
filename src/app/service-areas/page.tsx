import { AreasBlock, ContactButtons } from '@/components/Content';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'Service Areas',
  'Cool Trust AC Solution is based in Gaur City 1, Haibatpur, Greater Noida. Share your location to discuss service availability.',
  '/service-areas',
);
export default function Page() {
  return (
    <>
      <div className="container page-heading">
        <span className="eyebrow">SERVICE AREAS</span>
        <h1>Based in Greater Noida.</h1>
        <p>
          Please share your address when enquiring so the team can confirm
          whether service can be arranged at your location.
        </p>
        <ContactButtons />
      </div>
      <AreasBlock />
    </>
  );
}
