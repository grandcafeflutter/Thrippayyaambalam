import { useCallback, useEffect, useState } from 'react';
import PageBanner from '@/components/PageBanner';
import GalleryLightbox from '@/components/GalleryLightbox';
import { getGalleryImages } from '@/lib/cmsMedia';

const GALLERY_HERO_IMAGE = 'https://coovcplsijznkdytdyqh.supabase.co/storage/v1/object/public/site-media/cms/temple-cms-home-hero-images/2e1a4a7c-60b5-40c4-925f-85f5a49392e3.webp';

export default function GalleryPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [galleryImages, setGalleryImages] = useState(getGalleryImages);
  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  useEffect(() => {
    const refreshGallery = (event: Event) => {
      if ((event as CustomEvent<string>).detail === 'temple-cms-gallery-images') {
        setGalleryImages(getGalleryImages());
        setActiveIndex(null);
      }
    };
    window.addEventListener('cms-content-updated', refreshGallery);
    return () => window.removeEventListener('cms-content-updated', refreshGallery);
  }, []);

  return (
    <>
      <PageBanner
        eyebrow="Moments"
        title="Gallery"
        description="Glimpses of the temple's architecture, festivals, rituals and the devotees who gather here."
        image={GALLERY_HERO_IMAGE}
      />

      <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {galleryImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open photo: ${image.caption}`}
              className="group relative mb-5 block w-full overflow-hidden rounded-2xl shadow-md ring-1 ring-neutral-200 transition duration-300 hover:shadow-xl"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-primary-900/90 to-transparent px-5 pb-4 pt-10 text-left text-sm font-semibold text-neutral-50 transition duration-300 group-hover:translate-y-0">
                {image.caption}
              </span>
            </button>
          ))}
        </div>
      </section>

      {activeIndex !== null && (
        <GalleryLightbox images={galleryImages} index={activeIndex} onIndexChange={setActiveIndex} onClose={closeLightbox} />
      )}
    </>
  );
}
