import { FESTIVALS, GALLERY_IMAGES } from '@/data/temple';
import { FESTIVAL_CALENDAR_2026, FESTIVAL_HIGHLIGHTS, type FestivalCalendarEntry, type FestivalHighlight } from '@/data/festivals';
import { POOJA_RATES, type PoojaRate } from '@/data/poojaRates';

export const HOME_HERO_IMAGE_KEY = 'temple-cms-home-hero-image';
export const HOME_HERO_IMAGES_KEY = 'temple-cms-home-hero-images';
export const HOME_QUICK_LINKS_KEY = 'temple-cms-home-quick-links';
export const DARSHAN_TIMINGS_KEY = 'temple-cms-darshan-timings';
export const HOME_FESTIVALS_KEY = 'temple-cms-home-festivals';
export const HOME_FESTIVALS_TITLE_KEY = 'temple-cms-home-festivals-title';
export const POOJA_RATES_KEY = 'temple-cms-pooja-rates';
export const FESTIVAL_CARDS_KEY = 'temple-cms-festival-cards';
export const FESTIVAL_TABLE_KEY = 'temple-cms-festival-table';
export const FESTIVAL_TABLE_TITLE_KEY = 'temple-cms-festival-table-title';
export const GALLERY_IMAGES_KEY = 'temple-cms-gallery-images';

export type CmsHeroImage = { src: string; alt: string };

export const DEFAULT_HOME_HERO_IMAGES: CmsHeroImage[] = GALLERY_IMAGES.slice(0, 3).map((image) => ({
  src: image.src,
  alt: image.alt,
}));

export function getHomeHeroImages(): CmsHeroImage[] {
  if (typeof window === 'undefined') return DEFAULT_HOME_HERO_IMAGES;
  const savedImages = window.localStorage.getItem(HOME_HERO_IMAGES_KEY);
  if (savedImages) {
    try {
      const images = JSON.parse(savedImages);
      if (Array.isArray(images) && images.length > 0 && images.every((item) => item?.src)) {
        return images.map((item) => ({ src: String(item.src), alt: String(item.alt || 'Temple hero image') }));
      }
    } catch {
      return DEFAULT_HOME_HERO_IMAGES;
    }
  }
  const legacyImage = window.localStorage.getItem(HOME_HERO_IMAGE_KEY);
  return legacyImage
    ? [{ src: legacyImage, alt: 'Temple hero image' }, ...DEFAULT_HOME_HERO_IMAGES.filter((image) => image.src !== legacyImage).slice(0, 2)]
    : DEFAULT_HOME_HERO_IMAGES;
}

export const DEFAULT_HOME_QUICK_LINKS = [
  'Daily Pooja',
  'Upcoming Festivals',
  'Special Events',
  'Order of Worship',
  'Temple Location',
] as const;

export function getHomeQuickLinkLabels(): string[] {
  if (typeof window === 'undefined') return [...DEFAULT_HOME_QUICK_LINKS];
  const saved = window.localStorage.getItem(HOME_QUICK_LINKS_KEY);
  if (!saved) return [...DEFAULT_HOME_QUICK_LINKS];
  try {
    const labels = JSON.parse(saved);
    return Array.isArray(labels) && labels.length === DEFAULT_HOME_QUICK_LINKS.length
      ? labels.map(String)
      : [...DEFAULT_HOME_QUICK_LINKS];
  } catch {
    return [...DEFAULT_HOME_QUICK_LINKS];
  }
}

export type CmsTiming = { period: string; time: string };

export const DEFAULT_DARSHAN_TIMINGS: CmsTiming[] = [
  { period: 'Morning', time: '5:30 AM to 10:00 AM' },
  { period: 'Evening', time: '5:30 PM to 7:30 PM' },
];

export function getDarshanTimings(): CmsTiming[] {
  if (typeof window === 'undefined') return DEFAULT_DARSHAN_TIMINGS;
  const saved = window.localStorage.getItem(DARSHAN_TIMINGS_KEY);
  if (!saved) return DEFAULT_DARSHAN_TIMINGS;
  try {
    const timings = JSON.parse(saved);
    return Array.isArray(timings) && timings.length === 2 && timings.every((item) => item?.period && item?.time)
      ? timings.map((item) => ({ period: String(item.period), time: String(item.time) }))
      : DEFAULT_DARSHAN_TIMINGS;
  } catch {
    return DEFAULT_DARSHAN_TIMINGS;
  }
}

export type CmsFestival = { image: string; title: string; date: string };

export const DEFAULT_HOME_FESTIVALS: CmsFestival[] = FESTIVALS.map((festival) => ({
  image: festival.image,
  title: festival.name,
  date: festival.date,
}));

export function getHomeFestivals(): CmsFestival[] {
  if (typeof window === 'undefined') return DEFAULT_HOME_FESTIVALS;
  const saved = window.localStorage.getItem(HOME_FESTIVALS_KEY);
  if (!saved) return DEFAULT_HOME_FESTIVALS;
  try {
    const festivals = JSON.parse(saved);
    return Array.isArray(festivals) && festivals.length === DEFAULT_HOME_FESTIVALS.length && festivals.every((item) => item?.image && item?.title && item?.date)
      ? festivals.map((item) => ({ image: String(item.image), title: String(item.title), date: String(item.date) }))
      : DEFAULT_HOME_FESTIVALS;
  } catch {
    return DEFAULT_HOME_FESTIVALS;
  }
}

export function getHomeFestivalsTitle(): string {
  if (typeof window === 'undefined') return 'Upcoming Festivals';
  return window.localStorage.getItem(HOME_FESTIVALS_TITLE_KEY) || 'Upcoming Festivals';
}

export function getPoojaRates(): PoojaRate[] {
  if (typeof window === 'undefined') return POOJA_RATES;
  const saved = window.localStorage.getItem(POOJA_RATES_KEY);
  if (!saved) return POOJA_RATES;
  try {
    const rates = JSON.parse(saved);
    return Array.isArray(rates) && rates.length > 0 && rates.every((item) => item?.no !== undefined && item?.name && item?.rate !== undefined)
      ? rates.map((item) => ({ no: Number(item.no), name: String(item.name), rate: Number(item.rate) }))
      : POOJA_RATES;
  } catch {
    return POOJA_RATES;
  }
}

export function getFestivalCards(): FestivalHighlight[] {
  if (typeof window === 'undefined') return FESTIVAL_HIGHLIGHTS;
  const saved = window.localStorage.getItem(FESTIVAL_CARDS_KEY);
  if (!saved) return FESTIVAL_HIGHLIGHTS;
  try {
    const cards = JSON.parse(saved);
    return Array.isArray(cards) && cards.length === FESTIVAL_HIGHLIGHTS.length && cards.every((item) => item?.id && item?.image && item?.name && item?.description)
      ? cards.map((item) => ({ ...item, id: String(item.id), image: String(item.image), name: String(item.name), description: String(item.description), imageAlt: String(item.imageAlt || item.name) }))
      : FESTIVAL_HIGHLIGHTS;
  } catch {
    return FESTIVAL_HIGHLIGHTS;
  }
}

export function getFestivalTable(): FestivalCalendarEntry[] {
  if (typeof window === 'undefined') return FESTIVAL_CALENDAR_2026;
  const saved = window.localStorage.getItem(FESTIVAL_TABLE_KEY);
  if (!saved) return FESTIVAL_CALENDAR_2026;
  try {
    const entries = JSON.parse(saved);
    return Array.isArray(entries) && entries.length > 0 && entries.every((item) => item?.date && item?.event)
      ? entries.map((item) => ({ date: String(item.date), event: String(item.event) }))
      : FESTIVAL_CALENDAR_2026;
  } catch {
    return FESTIVAL_CALENDAR_2026;
  }
}

export function getFestivalTableTitle(): string {
  if (typeof window === 'undefined') return 'Festival Calendar - 2026';
  return window.localStorage.getItem(FESTIVAL_TABLE_TITLE_KEY) || 'Festival Calendar - 2026';
}

export type CmsGalleryImage = { src: string; alt: string; caption: string };

export const DEFAULT_GALLERY_IMAGES: CmsGalleryImage[] = GALLERY_IMAGES.map((image) => ({ ...image }));

export function getGalleryImages(): CmsGalleryImage[] {
  if (typeof window === 'undefined') return DEFAULT_GALLERY_IMAGES;
  const saved = window.localStorage.getItem(GALLERY_IMAGES_KEY);
  if (!saved) return DEFAULT_GALLERY_IMAGES;
  try {
    const images = JSON.parse(saved);
    return Array.isArray(images) && images.length > 0 && images.every((item) => item?.src && item?.alt && item?.caption)
      ? images.map((item) => ({ src: String(item.src), alt: String(item.alt), caption: String(item.caption) }))
      : DEFAULT_GALLERY_IMAGES;
  } catch {
    return DEFAULT_GALLERY_IMAGES;
  }
}
