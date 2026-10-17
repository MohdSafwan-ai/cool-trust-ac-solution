import { ContactBlock } from '@/components/Content';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'Contact Us',
  'Call or WhatsApp Cool Trust AC Solution. Find both phone numbers, our Gaur City 1 address and directions in Greater Noida.',
  '/contact',
);
export default function Page() {
  return (
    <>
      <div className="container page-heading">
        <span className="eyebrow">CONTACT</span>
        <h1>We’re a call away.</h1>
        <p>
          For service enquiries and questions about your appliance, speak
          directly with the team.
        </p>
      </div>
      <ContactBlock />
    </>
  );
}
