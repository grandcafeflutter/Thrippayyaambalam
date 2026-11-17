import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { CmsGalleryImage } from '@/lib/cmsMedia';

type GalleryLightboxProps = {
  images: CmsGalleryImage[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

export default function GalleryLightbox({ images, index, onIndexChange, onClose }: GalleryLightboxProps) {
  const total = images.length;
  const image = images[index];
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onIndexChange((index + 1) % total);
      if (event.key === 'ArrowLeft') onIndexChange((index - 1 + total) % total);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [index, total, onClose, onIndexChange]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.caption}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-primary-900/90 p-4 backdrop-blur-sm transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-neutral-50/10 text-neutral-50 transition hover:bg-neutral-50/20"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onIndexChange((index - 1 + total) % total);
        }}
        aria-label="Previous photo"
        className="absolute left-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-neutral-50/10 text-neutral-50 transition hover:bg-neutral-50/20"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <figure className="flex max-h-full w-full max-w-5xl flex-col items-center gap-4" onClick={(event) => event.stopPropagation()}>
        <img src={image.src} alt={image.alt} className="max-h-[78vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl" />
        <figcaption className="text-center text-sm text-primary-50">
          {image.caption} <span className="text-secondary-300">({index + 1} / {total})</span>
        </figcaption>
      </figure>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onIndexChange((index + 1) % total);
        }}
        aria-label="Next photo"
        className="absolute right-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-neutral-50/10 text-neutral-50 transition hover:bg-neutral-50/20"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}
