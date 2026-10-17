import { AboutBlock, Steps, AreasBlock } from '@/components/Content';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'About Us',
  'Learn about Cool Trust AC Solution, an air conditioning and appliance service business based in Gaur City 1, Greater Noida.',
  '/about',
);
export default function Page() {
  return (
    <>
      <div className="container page-heading">
        <span className="eyebrow">ABOUT US</span>
        <h1>
          Local service.
          <br />A direct conversation.
        </h1>
        <p>
          Air conditioning and appliance-related services from Greater Noida.
        </p>
      </div>
      <AboutBlock />
      <Steps />
      <AreasBlock />
    </>
  );
}
