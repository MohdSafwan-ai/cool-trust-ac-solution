import Gallery from '@/components/Gallery';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata(
  'Our Gallery',
  'See our technician at work during AC servicing and cleaning. Photos shared by Cool Trust AC Solution in Greater Noida.',
  '/gallery',
);

export default function GalleryPage() {
  return (
    <>
      <div className="container page-heading">
        <span className="eyebrow">BEHIND THE SERVICE</span>
        <h1>Our Gallery</h1>
        <p>
          Our technician at work. A closer look at AC servicing and cleaning,
          through photos shared by Cool Trust AC Solution.
        </p>
      </div>
      <Gallery />
    </>
  );
}
