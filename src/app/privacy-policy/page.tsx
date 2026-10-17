import { business } from '@/data/business';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'Privacy Policy',
  'How contact enquiries and third-party services work on the Cool Trust AC Solution website.',
  '/privacy-policy',
);
export default function Page() {
  return (
    <article className="container prose section">
      <span className="eyebrow">YOUR INFORMATION</span>
      <h1>Privacy Policy</h1>
      <p>
        This website provides information about {business.name} and links to
        contact the business.
      </p>
      <h2>Contact enquiries</h2>
      <p>
        There is no enquiry form or customer account on this website. If you
        call or send a WhatsApp message, you choose what information to share.
        The business uses information shared in an enquiry to discuss and
        arrange the requested service. Please avoid sending unnecessary
        sensitive information.
      </p>
      <h2>WhatsApp and Google Maps</h2>
      <p>
        WhatsApp links open a third-party service. The embedded Google Map can
        receive technical information such as your IP address when loaded. These
        services process information under their own privacy policies.
      </p>
      <p>
        <a
          href="https://www.whatsapp.com/legal/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp privacy policy
        </a>{' '}
        ·{' '}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google privacy policy
        </a>
      </p>
      <h2>Website operation</h2>
      <p>
        This website does not include advertising trackers or analytics scripts.
        The hosting provider may process technical request logs to operate and
        secure the website.
      </p>
      <h2>Questions or requests</h2>
      <p>
        Contact <a href={'tel:' + business.telephone}>{business.phone}</a> to
        ask about information you have shared with the business or to request
        its correction or deletion, where applicable.
      </p>
    </article>
  );
}
