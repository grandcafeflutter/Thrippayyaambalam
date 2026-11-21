import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, Flame, MapPin, Pause, Play, Sparkles, Calendar } from 'lucide-react';
import DarshanTimings from '@/components/DarshanTimings';
import SectionHeading from '@/components/SectionHeading';
import {
  ABOUT_TEXT,
  FESTIVALS,
  TEMPLE_NAME,
  WORSHIP_STEPS,
} from '@/data/temple';
import { getGalleryImages, getHomeFestivals, getHomeFestivalsTitle, getHomeHeroImages, getHomeQuickLinkLabels } from '@/lib/cmsMedia';

const ABOUT_SECTION_IMAGE = '/thrippayya-thrimoorthy.jpeg';
const WORSHIP_SECTION_IMAGE = '/images/Vintage Shrine with Three Deities.jpg';

const QUICK_LINKS = [
  { href: '/pooja', label: 'Daily Pooja', icon: Flame },
  { href: '/festival', label: 'Upcoming Festivals', icon: CalendarDays },
  { href: '/festival', label: 'Special Events', icon: Sparkles },
  { href: '/worship', label: 'Order of Worship', icon: BookOpen },
  { href: '/contact', label: 'Temple Location', icon: MapPin },
] as const;

export default function HomePage() {
  const [heroImages] = useState(getHomeHeroImages);
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const [quickLinkLabels] = useState(getHomeQuickLinkLabels);
  const [festivalContent] = useState(getHomeFestivals);
  const [festivalTitle] = useState(getHomeFestivalsTitle);
  const [galleryImages] = useState(getGalleryImages);
  const quickLinks = QUICK_LINKS.map((link, index) => ({ ...link, label: quickLinkLabels[index] ?? link.label }));

  useEffect(() => {
    if (heroImages.length < 2 || isHeroPaused) return;
    const interval = window.setInterval(() => {
      setActiveHeroIndex((current) => (current + 1) % heroImages.length);
    }, 6000);
    return () => window.clearInterval(interval);
  }, [heroImages.length, isHeroPaused]);

  const showHeroImage = (index: number) => {
    setActiveHeroIndex((index + heroImages.length) % heroImages.length);
  };

  return (
    <>
      <section className="relative isolate overflow-hidden bg-primary-900">
        {heroImages.map((image, index) => (
          <img
            key={`${image.src}-${index}`}
            src={image.src}
            alt={image.alt}
            aria-hidden={index !== activeHeroIndex}
            className={`absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-1000 ${index === activeHeroIndex ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary-900 via-primary-900/80 to-primary-900/10" />
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 pb-32 pt-20 sm:px-6 sm:pt-28 lg:px-8 lg:pb-40">
          <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.25em] text-secondary-300">
            Welcome to
          </p>
          <h1 className="animate-fade-up mt-4 max-w-2xl text-5xl font-semibold leading-[1.1] text-neutral-50 sm:text-6xl lg:text-7xl">
            Thrippayya <span className="text-secondary-300">Thrimoorthi</span> Temple
          </h1>
          <p className="animate-fade-up mt-6 font-serif text-2xl font-medium text-secondary-300 sm:text-3xl">
            A Sacred Abode of the Trimurti
          </p>
          <span className="mt-6 block h-0.5 w-24 rounded-full bg-secondary-500" />
          <p className="animate-fade-up mt-6 max-w-xl text-base text-primary-50 sm:text-lg">
            A revered temple dedicated to the holy Trinity of Brahma, Vishnu and Maheshwara, enshrined in divine
            harmony.
          </p>
          <div className="animate-fade-up mt-8 flex flex-wrap gap-4">
            <a
              href="/history"
              className="inline-flex items-center gap-2 rounded-full bg-secondary-500 px-6 py-3 text-sm font-semibold text-primary-900 shadow-lg transition hover:bg-secondary-400"
            >
              Discover the temple
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-50/60 px-6 py-3 text-sm font-semibold text-neutral-50 transition hover:bg-neutral-50/10"
            >
              Plan your visit
            </a>
          </div>
        </div>
        {heroImages.length > 1 && (
          <div className="absolute bottom-6 right-4 z-20 flex items-center gap-2 sm:bottom-8 sm:right-8">
            <button
              type="button"
              onClick={() => showHeroImage(activeHeroIndex - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-primary-900/50 text-white transition hover:bg-primary-900"
              aria-label="Previous hero image"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-1.5" role="group" aria-label={`Hero image selector. Image ${activeHeroIndex + 1} of ${heroImages.length}`}>
              {heroImages.map((image, index) => (
                <button
                  key={`${image.src}-indicator-${index}`}
                  type="button"
                  onClick={() => showHeroImage(index)}
                  className={`h-2.5 rounded-full transition-all ${index === activeHeroIndex ? 'w-6 bg-secondary-300' : 'w-2.5 bg-white/70 hover:bg-white'}`}
                  aria-label={`Show hero image ${index + 1}`}
                  aria-current={index === activeHeroIndex ? 'true' : undefined}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => showHeroImage(activeHeroIndex + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-primary-900/50 text-white transition hover:bg-primary-900"
              aria-label="Next hero image"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsHeroPaused((paused) => !paused)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-primary-900/50 text-white transition hover:bg-primary-900"
              aria-label={isHeroPaused ? 'Play hero image slider' : 'Pause hero image slider'}
            >
              {isHeroPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </button>
          </div>
        )}
      </section>

      <div className="mx-auto -mt-20 max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <nav aria-label="Quick links" className="grid grid-cols-2 gap-3 rounded-2xl border border-secondary-300 bg-neutral-50 p-3 shadow-xl sm:grid-cols-3 lg:grid-cols-5">
          {quickLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group flex flex-col items-center gap-3 rounded-xl px-4 py-5 text-center transition duration-300 hover:-translate-y-1 hover:bg-primary-50 hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-700 ring-1 ring-secondary-300 transition group-hover:bg-primary-700 group-hover:text-secondary-300">
                <link.icon className="h-6 w-6" />
              </span>
              <span className="font-serif text-lg font-semibold text-primary-700">{link.label}</span>
            </a>
          ))}
        </nav>
      </div>

      <section className="mx-auto mt-20 max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
          <div className="grid overflow-hidden rounded-3xl border border-secondary-200 bg-neutral-50 shadow-md md:grid-cols-[1fr_1.2fr]">
            <img src={ABOUT_SECTION_IMAGE} alt="Thrippayya Thrimoorthi Temple" className="h-full min-h-72 w-full object-cover" />
            <div className="flex flex-col justify-center gap-5 p-8 sm:p-10">
              <h2 className="text-3xl font-semibold text-primary-700 sm:text-4xl">About the Temple</h2>
              <span className="h-0.5 w-16 rounded-full bg-secondary-500" />
              <p className="text-[15px] leading-[1.5] text-neutral-700">{ABOUT_TEXT}</p>
              <a
                href="/history"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-700 px-5 py-2.5 text-sm font-semibold text-neutral-50 transition hover:bg-primary-600"
              >
                Read More
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="h-full w-full lg:max-w-md lg:justify-self-end">
            <DarshanTimings />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <SectionHeading title={festivalTitle} />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {FESTIVALS.map((festival, index) => {
            const content = festivalContent[index] ?? festival;
            return (
            <article
              key={festival.id}
              className="group grid grid-cols-[0.95fr_1.05fr] overflow-hidden rounded-3xl border border-secondary-200 bg-[#fffaf0] shadow-sm transition duration-300 hover:-translate-y-1 hover:border-secondary-400 hover:shadow-xl md:grid-cols-1"
            >
              <div className="relative min-h-44 overflow-hidden md:aspect-[16/10] md:min-h-0">
                <img
                  src={content.image}
                  alt={content.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <span className="absolute left-3 top-3 rounded-full bg-primary-900/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-secondary-300">
                  Festival
                </span>
              </div>
              <div className="flex flex-col justify-center gap-4 p-5 text-center md:p-6">
                <h3 className="font-serif text-xl font-semibold leading-tight text-primary-800 sm:text-2xl">{content.title}</h3>
                <div className="mx-auto flex items-center gap-2 rounded-full border border-secondary-200 bg-neutral-50 px-3 py-2 text-left text-sm font-semibold text-accent-700 shadow-sm">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-700 text-secondary-300">
                    <Calendar className="h-4 w-4" />
                  </span>
                  <span>{content.date}</span>
                </div>
              </div>
            </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="relative grid overflow-hidden rounded-2xl bg-primary-800 shadow-xl md:aspect-[3/1] md:grid-cols-[2fr_1fr]">
          <div className="relative z-10 flex flex-col justify-center gap-3 p-5 sm:p-6 lg:p-8">
            <h2 className="font-serif text-2xl font-semibold uppercase leading-[1.2] tracking-wide text-secondary-300 sm:text-3xl">
              Order of Worship at {TEMPLE_NAME}
            </h2>
            <p className="text-sm leading-6 text-primary-50">{WORSHIP_STEPS[0].text}</p>
            <a
              href="/worship"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary-500 px-5 py-2.5 text-sm font-semibold text-primary-900 transition hover:bg-secondary-400"
            >
              Read more
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="min-h-[11rem] bg-primary-900 md:min-h-0">
            <img src={WORSHIP_SECTION_IMAGE} alt="Thrippayya Thrimoorthi Temple" className="h-full min-h-[11rem] w-full object-cover object-center md:min-h-0" />
          </div>
        </div>
      </section>

      <section className="mx-auto mb-24 mt-24 max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <SectionHeading title="Gallery" align="left" />
          <a
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-full bg-primary-700 px-6 py-3 text-sm font-semibold text-neutral-50 transition hover:bg-primary-600"
          >
            View Gallery
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {galleryImages.slice(0, 5).map((image) => (
            <div key={image.src} className="aspect-square overflow-hidden rounded-xl shadow-sm">
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
