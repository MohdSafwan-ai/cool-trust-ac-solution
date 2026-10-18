'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Progressive enhancement: content stays visible without JavaScript.
export default function MotionEnhancements() {
  const pathname = usePathname();

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.section-heading, .gallery-photo, .service-row, .about-grid > div, .steps-grid > div, .areas-section > div, .contact-section > div, .map-heading, .related',
      ),
    );
    let observer: IntersectionObserver | undefined;

    const reset = () => {
      observer?.disconnect();
      targets.forEach((target) => {
        target.removeAttribute('data-reveal');
        target.style.removeProperty('--reveal-delay');
      });
    };

    const setup = () => {
      reset();
      if (preference.matches) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(({ target, isIntersecting }) => {
            if (!isIntersecting) return;
            target.setAttribute('data-reveal', 'visible');
            observer?.unobserve(target);
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -24px 0px' },
      );

      targets.forEach((target) => {
        const rect = target.getBoundingClientRect();
        // Leave the initial viewport and restored scroll positions readable.
        if (rect.top < window.innerHeight && rect.bottom > 0) return;
        if (rect.bottom <= 0) return;

        const siblings = Array.from(target.parentElement?.children || []);
        const index = siblings.indexOf(target);
        const delay = target.matches('.service-row')
          ? (index % 2) * 75
          : target.closest('.steps-grid')
            ? Math.min(index, 2) * 85
            : 0;
        target.style.setProperty('--reveal-delay', `${delay}ms`);
        target.dataset.reveal = 'pending';
        observer?.observe(target);
      });
    };

    setup();
    preference.addEventListener('change', setup);
    return () => {
      reset();
      preference.removeEventListener('change', setup);
    };
  }, [pathname]);

  return null;
}
