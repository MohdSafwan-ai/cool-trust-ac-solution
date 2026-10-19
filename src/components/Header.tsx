'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Snowflake } from 'lucide-react';
import { business } from '@/data/business';
export const navigation = [
  ['Home', '/'],
  ['Services', '/services'],
  ['About', '/about'],
  ['Gallery', '/gallery'],
  ['Service Areas', '/service-areas'],
  ['Contact', '/contact'],
];
export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const escape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [open]);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          href="/"
          className="brand"
          aria-label={business.name.toUpperCase() + ' home'}
        >
          <span className="brand-icon">
            <Snowflake size={31} />
          </span>
          <span>
            COOL TRUST <small>AC SOLUTION</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(([label, url]) => (
            <Link
              key={url}
              href={url}
              aria-current={
                (url === '/' ? path === '/' : path.startsWith(url))
                  ? 'page'
                  : undefined
              }
            >
              {label}
            </Link>
          ))}
        </nav>
        <a
          aria-label="Call Cool Trust AC Solution"
          className="button header-call"
          href={'tel:' + business.telephone}
        >
          <Phone size={16} />
          <span>Call Now</span>
        </a>
        <button
          className="menu-toggle"
          ref={toggle}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav container"
          aria-label="Mobile navigation"
        >
          {navigation.map(([label, url]) => (
            <Link key={url} href={url} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
