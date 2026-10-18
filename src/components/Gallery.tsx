'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import { galleryPhotos } from '@/data/gallery';

export default function Gallery({ preview = false }: { preview?: boolean }) {
  const [selected, setSelected] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const photo = galleryPhotos[selected];

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const move = (direction: number) => {
    setSelected(
      (index) =>
        (index + direction + galleryPhotos.length) % galleryPhotos.length,
    );
  };

  return (
    <section
      className="section container gallery-section"
      aria-label="Our technician photo gallery"
    >
      {preview && (
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE PEOPLE BEHIND THE SERVICE</span>
            <h2>Our Gallery</h2>
            <p>
              A look at our technician carrying out AC servicing and cleaning.
            </p>
          </div>
          <Link className="text-link" href="/gallery">
            View our gallery <ArrowRight size={17} />
          </Link>
        </div>
      )}
      <div className="gallery-grid">
        {galleryPhotos.map((item, index) => (
          <figure className="gallery-photo" key={item.src}>
            <a
              href={item.src}
              target="_blank"
              rel="noopener noreferrer"
              className="gallery-photo-link"
              aria-label={'View full-size photo: ' + item.title}
              aria-haspopup="dialog"
              onClick={(event) => {
                if (
                  event.metaKey ||
                  event.ctrlKey ||
                  event.shiftKey ||
                  event.altKey ||
                  !dialog.current?.showModal
                )
                  return;
                event.preventDefault();
                setSelected(index);
                dialog.current.showModal();
                setIsOpen(true);
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 760px) 82vw, (max-width: 1240px) 31vw, 380px"
              />
              <span className="gallery-expand" aria-hidden="true">
                <ArrowUpRight size={20} />
              </span>
            </a>
            <figcaption>
              <span className="gallery-number">0{index + 1}</span>
              <h3>{item.title}</h3>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="gallery-hint">
        Select a photo to view it in full.{' '}
        <span>Swipe to explore the gallery.</span>
      </p>
      <dialog
        ref={dialog}
        className="gallery-lightbox"
        aria-labelledby="gallery-viewer-title"
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            move(-1);
          }
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            move(1);
          }
        }}
      >
        <div className="gallery-viewer-toolbar">
          <span>OUR GALLERY</span>
          <a
            className="gallery-original-link"
            href={photo.originalSrc}
            target="_blank"
            rel="noopener noreferrer"
          >
            View original
            <ArrowUpRight size={14} />
          </a>
          <button
            type="button"
            className="viewer-control"
            onClick={() => dialog.current?.close()}
            aria-label="Close photo viewer"
          >
            <X size={22} />
          </button>
        </div>
        {isOpen && (
          <div className="gallery-full-image">
            <Image
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 760px) 90vw, 850px"
            />
          </div>
        )}
        <div className="gallery-viewer-footer">
          <div aria-live="polite" aria-atomic="true">
            <h2 id="gallery-viewer-title">{photo.title}</h2>
            <p>
              {selected + 1} / {galleryPhotos.length}
            </p>
          </div>
          <div className="gallery-viewer-controls">
            <button
              type="button"
              className="viewer-control"
              onClick={() => move(-1)}
              aria-label="Previous photo"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              className="viewer-control"
              onClick={() => move(1)}
              aria-label="Next photo"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </dialog>
    </section>
  );
}
