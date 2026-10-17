import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="container page-heading">
      <h1>Page not found.</h1>
      <p>Find the service you need or contact our team.</p>
      <Link className="button" href="/services">
        Browse services
      </Link>
    </div>
  );
}
