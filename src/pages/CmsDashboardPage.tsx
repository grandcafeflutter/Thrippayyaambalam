import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowDown,
  ArrowUp,
  Check,
  CheckCircle2,
  ChevronRight,
  Eye,
  FileText,
  Globe2,
  Image,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Menu,
  MoreHorizontal,
  Save,
  Search,
  Plus,
  Trash2,
  Upload,
  Settings,
  X,
} from 'lucide-react';
import { DEFAULT_HOME_HERO_IMAGES, getDarshanTimings, getFestivalCards, getFestivalTable, getFestivalTableTitle, getGalleryImages, getHomeFestivals, getHomeFestivalsTitle, getHomeHeroImages, getHomeQuickLinkLabels, getPoojaRates, DARSHAN_TIMINGS_KEY, FESTIVAL_CARDS_KEY, FESTIVAL_TABLE_KEY, FESTIVAL_TABLE_TITLE_KEY, GALLERY_IMAGES_KEY, HOME_FESTIVALS_KEY, HOME_FESTIVALS_TITLE_KEY, HOME_HERO_IMAGE_KEY, HOME_HERO_IMAGES_KEY, HOME_QUICK_LINKS_KEY, POOJA_RATES_KEY, type CmsFestival, type CmsGalleryImage, type CmsHeroImage, type CmsTiming } from '@/lib/cmsMedia';
import type { PoojaRate } from '@/data/poojaRates';
import type { FestivalCalendarEntry, FestivalHighlight } from '@/data/festivals';
import { ADMINISTRATION_CONTENT_KEY, ADMINISTRATION_GROUPS, type AdministrationGroup, type Member } from '@/pages/AdministrationPage';

type Section = {
  id: string;
  title: string;
  type: string;
  content: string;
  status: 'Published' | 'Draft';
  updated: string;
};

type Page = {
  id: string;
  name: string;
  path: string;
  sections: Section[];
};

type HeroForm = {
  eyebrow: string;
  title: string;
  tagline: string;
  description: string;
  primaryButton: string;
  secondaryButton: string;
};

type QuickLinksForm = string[];

const CMS_SESSION_KEY = 'temple-cms-authenticated';
const CMS_USERNAME = 'Thrippayya2026';
const CMS_PASSWORD = 'ijk2kdlr2026';

function compressHeroImage(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) return Promise.reject(new Error('Choose a valid image file.'));
  if (file.size > 20 * 1024 * 1024) return Promise.reject(new Error('Choose an image smaller than 20 MB.'));

  return new Promise((resolve, reject) => {
    const image = new window.Image();
    const imageUrl = URL.createObjectURL(file);
    const releaseImageUrl = () => URL.revokeObjectURL(imageUrl);

    image.onload = () => {
      try {
        if (!image.naturalWidth || !image.naturalHeight) throw new Error('The selected image could not be decoded.');
        const scale = Math.min(1, 1920 / image.naturalWidth, 1200 / image.naturalHeight);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(image.naturalWidth * scale);
        canvas.height = Math.round(image.naturalHeight * scale);
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Image processing is unavailable in this browser.');

        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const webp = canvas.toDataURL('image/webp', 0.82);
        resolve(webp.startsWith('data:image/webp;') ? webp : canvas.toDataURL('image/jpeg', 0.82));
      } catch (error) {
        reject(error);
      } finally {
        releaseImageUrl();
      }
    };
    image.onerror = () => {
      releaseImageUrl();
      reject(new Error('The selected image could not be opened.'));
    };
    image.src = imageUrl;
  });
}

function getAdministrationForm(): AdministrationGroup[] {
  if (typeof window === 'undefined') return ADMINISTRATION_GROUPS;
  const saved = window.localStorage.getItem(ADMINISTRATION_CONTENT_KEY);
  if (!saved) return ADMINISTRATION_GROUPS;
  try {
    const groups = JSON.parse(saved);
    return Array.isArray(groups) && groups.length === ADMINISTRATION_GROUPS.length ? groups : ADMINISTRATION_GROUPS;
  } catch {
    return ADMINISTRATION_GROUPS;
  }
}

const INITIAL_PAGES: Page[] = [
  {
    id: 'home',
    name: 'Home',
    path: '/',
    sections: [
      { id: 'hero-section', title: 'Hero Section', type: 'Form · 4 text, 2 buttons, image slider', content: 'Welcome label, heading, tagline, description, buttons and slider images', status: 'Published', updated: 'Today, 10:42 AM' },
      { id: 'quick-links', title: 'Quick Links', type: 'Form · 5 cards', content: 'Daily Pooja, Upcoming Festivals, Special Events, Order of Worship and Temple Location', status: 'Published', updated: 'Today, 10:42 AM' },
      { id: 'darshan-timings', title: 'Darshan & Pooja Timings', type: 'Form · 2 timing rows', content: 'Morning and Evening darshan timings', status: 'Published', updated: 'Today, 10:42 AM' },
      { id: 'upcoming-festivals', title: 'Upcoming Festivals', type: 'Form · 3 cards', content: 'Three festival cards with image, title and date', status: 'Published', updated: 'Today, 10:42 AM' },
      { id: 'about', title: 'About the temple', type: 'Content block', content: 'A revered temple dedicated to the holy Trinity...', status: 'Published', updated: 'Yesterday' },
      { id: 'festivals', title: 'Upcoming festivals', type: 'Festival cards', content: 'View upcoming festivals and special events.', status: 'Published', updated: '2 days ago' },
      { id: 'worship', title: 'Order of worship', type: 'Call to action', content: 'Plan your visit and learn the sacred circuit.', status: 'Draft', updated: '3 days ago' },
    ],
  },
  {
    id: 'history',
    name: 'History',
    path: '/history',
    sections: [
      { id: 'history-intro', title: 'History introduction', type: 'Content block', content: 'Discover the origin and story of the temple.', status: 'Published', updated: '4 days ago' },
      { id: 'milestones', title: 'Temple milestones', type: 'Timeline', content: 'A visual history of important temple moments.', status: 'Published', updated: '1 week ago' },
    ],
  },
  {
    id: 'pooja',
    name: 'Pooja & Offerings',
    path: '/pooja',
    sections: [
      { id: 'pooja-banner', title: 'Pooja page banner', type: 'Banner', content: 'List of poojas and offerings at the temple.', status: 'Published', updated: '1 week ago' },
      { id: 'pooja-rates', title: 'Pooja Rates Table', type: 'Form · Editable table', content: 'Pooja number, offering name and rate', status: 'Published', updated: 'Today, 10:42 AM' },
      { id: 'rates', title: 'Offering rates', type: 'Rate table', content: 'Current rates for each pooja and offering.', status: 'Published', updated: '1 week ago' },
      { id: 'notices', title: 'Important notices', type: 'Notice list', content: 'Special instructions for devotees.', status: 'Draft', updated: '2 weeks ago' },
    ],
  },
  {
    id: 'administration',
    name: 'Administration',
    path: '/administration',
    sections: [
      { id: 'committee-members', title: 'Committee Members', type: 'Form · Image, name, designation', content: 'Office bearers and committee member directory', status: 'Published', updated: 'Today, 10:42 AM' },
      { id: 'patrons', title: 'Patrons', type: 'Form · Image, name, designation', content: 'Patron member directory', status: 'Published', updated: 'Today, 10:42 AM' },
      { id: 'advisory-committee', title: 'Advisory Committee', type: 'Form · Image, name, designation', content: 'Advisory committee member directory', status: 'Published', updated: 'Today, 10:42 AM' },
      { id: 'auditors', title: 'Auditors', type: 'Form · Image, name, designation', content: 'Auditor member directory', status: 'Published', updated: 'Today, 10:42 AM' },
    ],
  },
  {
    id: 'worship',
    name: 'Order of Worship',
    path: '/worship',
    sections: [
      { id: 'worship-banner', title: 'Worship page banner', type: 'Banner', content: 'The traditional sequence of Darshan.', status: 'Published', updated: '2 weeks ago' },
      { id: 'steps', title: 'Sacred circuit steps', type: 'Step list', content: 'The 14 steps followed by devotees.', status: 'Published', updated: '2 weeks ago' },
    ],
  },
  {
    id: 'festival',
    name: 'Festival',
    path: '/festival',
    sections: [
      { id: 'festival-cards', title: 'Festival Cards', type: 'Form · Image, title, description', content: 'Festival highlight cards', status: 'Published', updated: 'Today, 10:42 AM' },
      { id: 'festival-table', title: 'Festival Table', type: 'Form · Title, English date, description', content: 'Festival calendar event table', status: 'Published', updated: 'Today, 10:42 AM' },
    ],
  },
  {
    id: 'gallery',
    name: 'Gallery',
    path: '/gallery',
    sections: [
      { id: 'gallery-images', title: 'Gallery Images', type: 'Form · Upload and delete', content: 'Manage the images shown in the gallery', status: 'Published', updated: 'Today, 10:42 AM' },
    ],
  },
  {
    id: 'contact',
    name: 'Contact',
    path: '/contact',
    sections: [
      { id: 'contact-intro', title: 'Contact introduction', type: 'Content block', content: 'We are here to help with your visit.', status: 'Published', updated: '3 weeks ago' },
      { id: 'contact-details', title: 'Temple details', type: 'Information card', content: 'Address, phone number, and visiting hours.', status: 'Published', updated: '3 weeks ago' },
    ],
  },
];

export default function CmsDashboardPage() {
  const [pages, setPages] = useState(INITIAL_PAGES);
  const [selectedPageId, setSelectedPageId] = useState('home');
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [search, setSearch] = useState('');
  const [mobilePagesOpen, setMobilePagesOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [heroUploadsPending, setHeroUploadsPending] = useState(0);
  const [heroImages, setHeroImages] = useState<CmsHeroImage[]>(getHomeHeroImages);
  const [heroForm, setHeroForm] = useState<HeroForm>({
    eyebrow: 'WELCOME TO',
    title: 'Thrippayya Thrimoorthi Temple',
    tagline: 'A Sacred Abode of the Trimurti',
    description: 'A revered temple dedicated to the holy Trinity of Brahma, Vishnu and Maheshwara, enshrined in divine harmony.',
    primaryButton: 'Discover the temple',
    secondaryButton: 'Plan your visit',
  });
  const [quickLinksForm, setQuickLinksForm] = useState<QuickLinksForm>(getHomeQuickLinkLabels);
  const [timingsForm, setTimingsForm] = useState<CmsTiming[]>(getDarshanTimings);
  const [festivalForm, setFestivalForm] = useState<CmsFestival[]>(getHomeFestivals);
  const [poojaRatesForm, setPoojaRatesForm] = useState<PoojaRate[]>(getPoojaRates);
  const [festivalTitle, setFestivalTitle] = useState(getHomeFestivalsTitle);
  const [administrationForm, setAdministrationForm] = useState<AdministrationGroup[]>(getAdministrationForm);
  const [festivalCardsForm, setFestivalCardsForm] = useState<FestivalHighlight[]>(getFestivalCards);
  const [festivalTableForm, setFestivalTableForm] = useState<FestivalCalendarEntry[]>(getFestivalTable);
  const [festivalTableFormTitle, setFestivalTableFormTitle] = useState(getFestivalTableTitle);
  const [galleryForm, setGalleryForm] = useState<CmsGalleryImage[]>(getGalleryImages);
  const [isAuthenticated, setIsAuthenticated] = useState(() => typeof window !== 'undefined' && window.sessionStorage.getItem(CMS_SESSION_KEY) === 'true');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const selectedPage = pages.find((page) => page.id === selectedPageId) ?? pages[0];
  const filteredPages = useMemo(
    () => pages.filter((page) => page.name.toLowerCase().includes(search.toLowerCase())),
    [pages, search],
  );

  const choosePage = (id: string) => {
    setSelectedPageId(id);
    setSelectedSection(null);
    setMobilePagesOpen(false);
  };

  const updateSection = (field: 'title' | 'content', value: string) => {
    if (!selectedSection) return;
    setSelectedSection((section) => (section ? { ...section, [field]: value } : section));
  };

  const saveSection = () => {
    if (!selectedSection) return;
    if (selectedPage.id === 'home' && selectedSection.id === 'hero-section' && heroUploadsPending > 0) {
      setSaveError('Wait for image processing to finish before saving.');
      return;
    }
    setSaveError('');
    try {
      if (selectedPage.id === 'home' && selectedSection.id === 'hero-section') {
        const legacyHeroImage = window.localStorage.getItem(HOME_HERO_IMAGE_KEY);
        if (legacyHeroImage) window.localStorage.removeItem(HOME_HERO_IMAGE_KEY);
        try {
          window.localStorage.setItem(HOME_HERO_IMAGES_KEY, JSON.stringify(heroImages));
        } catch (error) {
          if (legacyHeroImage) window.localStorage.setItem(HOME_HERO_IMAGE_KEY, legacyHeroImage);
          throw error;
        }
      }
      if (selectedPage.id === 'home' && selectedSection.id === 'quick-links') {
        window.localStorage.setItem(HOME_QUICK_LINKS_KEY, JSON.stringify(quickLinksForm));
      }
      if (selectedPage.id === 'home' && selectedSection.id === 'darshan-timings') {
        window.localStorage.setItem(DARSHAN_TIMINGS_KEY, JSON.stringify(timingsForm));
      }
      if (selectedPage.id === 'home' && selectedSection.id === 'upcoming-festivals') {
        window.localStorage.setItem(HOME_FESTIVALS_KEY, JSON.stringify(festivalForm));
        window.localStorage.setItem(HOME_FESTIVALS_TITLE_KEY, festivalTitle);
      }
      if (selectedPage.id === 'pooja' && selectedSection.id === 'pooja-rates') {
        window.localStorage.setItem(POOJA_RATES_KEY, JSON.stringify(poojaRatesForm));
      }
      if (selectedPage.id === 'administration') {
        window.localStorage.setItem(ADMINISTRATION_CONTENT_KEY, JSON.stringify(administrationForm));
      }
      if (selectedPage.id === 'festival' && selectedSection.id === 'festival-cards') {
        window.localStorage.setItem(FESTIVAL_CARDS_KEY, JSON.stringify(festivalCardsForm));
      }
      if (selectedPage.id === 'festival' && selectedSection.id === 'festival-table') {
        window.localStorage.setItem(FESTIVAL_TABLE_KEY, JSON.stringify(festivalTableForm));
        window.localStorage.setItem(FESTIVAL_TABLE_TITLE_KEY, festivalTableFormTitle);
      }
      if (selectedPage.id === 'gallery' && selectedSection.id === 'gallery-images') {
        window.localStorage.setItem(GALLERY_IMAGES_KEY, JSON.stringify(galleryForm));
      }
    } catch (error) {
      console.error('Could not save CMS section.', error);
      setSaveError(error instanceof DOMException && error.name === 'QuotaExceededError'
        ? 'Browser storage is full. Remove an image or use smaller images, then try saving again.'
        : 'Could not save these changes. Please try again.');
      return;
    }

    setPages((current) => current.map((page) => page.id !== selectedPage.id
      ? page
      : { ...page, sections: page.sections.map((section) => section.id === selectedSection.id ? { ...selectedSection, updated: 'Just now' } : section) }));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2400);
  };

  const handleHeroUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    event.target.value = '';
    setSaveError('');
    setHeroUploadsPending((count) => count + 1);
    void compressHeroImage(file).then((src) => setHeroImages((current) => [...current, {
      src,
      alt: file.name.replace(/\.[^/.]+$/, '') || 'Temple hero image',
    }])).catch((error: unknown) => setSaveError(error instanceof Error ? error.message : 'The selected image could not be processed.'))
      .finally(() => setHeroUploadsPending((count) => Math.max(0, count - 1)));
  };

  const handleHeroReplace = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    event.target.value = '';
    setSaveError('');
    setHeroUploadsPending((count) => count + 1);
    void compressHeroImage(file).then((src) => setHeroImages((current) => current.map((image, currentIndex) => (
      currentIndex === index ? { ...image, src } : image
    )))).catch((error: unknown) => setSaveError(error instanceof Error ? error.message : 'The selected image could not be processed.'))
      .finally(() => setHeroUploadsPending((count) => Math.max(0, count - 1)));
  };

  const updateHeroImageAlt = (index: number, alt: string) => {
    setHeroImages((current) => current.map((image, currentIndex) => currentIndex === index ? { ...image, alt } : image));
  };

  const removeHeroImage = (index: number) => {
    setHeroImages((current) => current.length > 1 ? current.filter((_, currentIndex) => currentIndex !== index) : current);
  };

  const moveHeroImage = (index: number, offset: number) => {
    setHeroImages((current) => {
      const targetIndex = index + offset;
      if (targetIndex < 0 || targetIndex >= current.length) return current;
      const reordered = [...current];
      [reordered[index], reordered[targetIndex]] = [reordered[targetIndex], reordered[index]];
      return reordered;
    });
  };

  const updateHeroField = (field: keyof HeroForm, value: string) => {
    setHeroForm((current) => ({ ...current, [field]: value }));
  };

  const updateQuickLink = (index: number, value: string) => {
    setQuickLinksForm((current) => current.map((label, currentIndex) => currentIndex === index ? value : label));
  };

  const updateTiming = (index: number, field: keyof CmsTiming, value: string) => {
    setTimingsForm((current) => current.map((timing, currentIndex) => currentIndex === index ? { ...timing, [field]: value } : timing));
  };

  const updateFestival = (index: number, field: keyof CmsFestival, value: string) => {
    setFestivalForm((current) => current.map((festival, currentIndex) => currentIndex === index ? { ...festival, [field]: value } : festival));
  };

  const handleFestivalUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => updateFestival(index, 'image', String(reader.result));
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const updatePoojaRate = (index: number, field: keyof PoojaRate, value: string) => {
    setPoojaRatesForm((current) => current.map((item, currentIndex) => currentIndex === index
      ? { ...item, [field]: field === 'name' ? value : Number(value) }
      : item));
  };

  const addPoojaRate = () => {
    setPoojaRatesForm((current) => [...current, { no: current.length + 1, name: '', rate: 0 }]);
  };

  const updateAdministrationMember = (groupTitle: string, memberIndex: number, field: keyof Member, value: string) => {
    setAdministrationForm((current) => current.map((group) => group.title !== groupTitle
      ? group
      : { ...group, members: group.members.map((member, index) => index === memberIndex ? { ...member, [field]: value } : member) }));
  };

  const handleAdministrationUpload = (groupTitle: string, memberIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => updateAdministrationMember(groupTitle, memberIndex, 'photo', String(reader.result));
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const updateFestivalCard = (index: number, field: keyof FestivalHighlight, value: string) => {
    setFestivalCardsForm((current) => current.map((card, currentIndex) => currentIndex === index ? { ...card, [field]: value } : card));
  };

  const handleFestivalCardUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => updateFestivalCard(index, 'image', String(reader.result));
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const updateFestivalTable = (index: number, field: keyof FestivalCalendarEntry, value: string) => {
    setFestivalTableForm((current) => current.map((entry, currentIndex) => currentIndex === index ? { ...entry, [field]: value } : entry));
  };

  const handleGalleryUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => setGalleryForm((current) => [...current, { src: String(reader.result), alt: file.name.replace(/\.[^/.]+$/, ''), caption: file.name.replace(/\.[^/.]+$/, '') }]);
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const removeGalleryImage = (index: number) => {
    setGalleryForm((current) => current.filter((_, currentIndex) => currentIndex !== index));
  };

  const updateGalleryImage = (index: number, field: 'alt' | 'caption', value: string) => {
    setGalleryForm((current) => current.map((image, currentIndex) => currentIndex === index ? { ...image, [field]: value } : image));
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loginUsername === CMS_USERNAME && loginPassword === CMS_PASSWORD) {
      window.sessionStorage.setItem(CMS_SESSION_KEY, 'true');
      setIsAuthenticated(true);
      setLoginError('');
      return;
    }
    setLoginError('Incorrect username or password.');
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem(CMS_SESSION_KEY);
    setIsAuthenticated(false);
    setLoginUsername('');
    setLoginPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8fa] px-5 py-10">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-xl sm:p-9">
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-700 text-white shadow-sm"><LockKeyhole className="h-7 w-7" /></div>
            <h1 className="mt-5 font-serif text-3xl font-bold text-slate-900">CMS Login</h1>
            <p className="mt-2 text-sm text-slate-500">Sign in to manage temple website content.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">Username</span><input value={loginUsername} onChange={(event) => setLoginUsername(event.target.value)} autoComplete="username" required className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100" /></label>
            <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">Password</span><input type="password" value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)} autoComplete="current-password" required className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100" /></label>
            {loginError && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{loginError}</p>}
            <button type="submit" className="w-full rounded-xl bg-primary-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-primary-800">Sign in to CMS</button>
          </form>
          <a href="#/" className="mt-6 block text-center text-sm font-semibold text-slate-500 hover:text-primary-700">Return to website</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="flex h-20 items-center justify-between px-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setMobilePagesOpen((open) => !open)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden" aria-label="Toggle pages menu">
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-700 text-white shadow-sm">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div>
              <p className="font-serif text-lg font-bold tracking-tight text-slate-900">Temple CMS</p>
              <p className="text-xs font-medium text-slate-500">Content management</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <a href="#/" className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 sm:inline-flex">
              <Eye className="h-4 w-4" /> View website
            </a>
            <div className="hidden h-7 w-px bg-slate-200 sm:block" />
            <button type="button" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Settings"><Settings className="h-5 w-5" /></button>
            <button type="button" onClick={handleLogout} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Log out"><LogOut className="h-5 w-5" /></button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-400 text-sm font-bold text-primary-900">AD</div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1500px]">
        <aside className={`${mobilePagesOpen ? 'block' : 'hidden'} absolute inset-x-0 top-20 z-20 border-b border-slate-200 bg-white p-5 shadow-xl lg:relative lg:top-0 lg:block lg:w-[300px] lg:shrink-0 lg:border-b-0 lg:border-r lg:p-7 lg:shadow-none`}>
          <div className="mb-7 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Workspace</p>
              <h2 className="mt-1 font-serif text-xl font-bold text-slate-900">Website pages</h2>
            </div>
            <button type="button" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 lg:hidden" onClick={() => setMobilePagesOpen(false)} aria-label="Close pages menu"><X className="h-5 w-5" /></button>
          </div>
          <label className="relative mb-5 block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search pages" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-100" />
          </label>
          <nav className="space-y-1.5" aria-label="Website pages">
            {filteredPages.map((page) => (
              <button key={page.id} type="button" onClick={() => choosePage(page.id)} className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left transition ${selectedPage.id === page.id ? 'bg-primary-50 text-primary-800 ring-1 ring-primary-100' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
                <span className="flex min-w-0 items-center gap-3">
                  <FileText className={`h-4 w-4 shrink-0 ${selectedPage.id === page.id ? 'text-primary-700' : 'text-slate-400'}`} />
                  <span className="truncate text-sm font-semibold">{page.name}</span>
                </span>
                <ChevronRight className={`h-4 w-4 shrink-0 transition ${selectedPage.id === page.id ? 'text-primary-600' : 'text-slate-300 group-hover:text-slate-500'}`} />
              </button>
            ))}
          </nav>
          <div className="mt-8 rounded-2xl bg-slate-900 p-4 text-white">
            <Globe2 className="mb-3 h-5 w-5 text-secondary-300" />
            <p className="text-sm font-bold">Live website</p>
            <p className="mt-1 text-xs leading-5 text-slate-300">Your latest published content is visible to visitors.</p>
            <a href="#/" className="mt-3 inline-flex text-xs font-bold text-secondary-300 hover:text-secondary-200">Open website <ArrowLeft className="ml-1 h-3.5 w-3.5 rotate-180" /></a>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-5 py-7 sm:px-8 sm:py-10 lg:px-12">
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold text-primary-700">Content overview</p>
              <h1 className="mt-1 font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Manage {selectedPage.name}</h1>
              <p className="mt-2 text-sm text-slate-500">Update the content sections shown on <span className="font-semibold text-slate-700">{selectedPage.path}</span></p>
            </div>
            <a href={`#${selectedPage.path}`} className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"><Eye className="h-4 w-4" /> Preview page</a>
          </div>

          <div className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-xs font-semibold text-slate-500">Sections</p><p className="mt-2 font-serif text-2xl font-bold text-slate-900">{selectedPage.sections.length}</p></div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-xs font-semibold text-slate-500">Published</p><p className="mt-2 font-serif text-2xl font-bold text-emerald-600">{selectedPage.sections.filter((section) => section.status === 'Published').length}</p></div>
            <div className="col-span-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:col-span-1"><p className="text-xs font-semibold text-slate-500">Needs review</p><p className="mt-2 font-serif text-2xl font-bold text-amber-600">{selectedPage.sections.filter((section) => section.status === 'Draft').length}</p></div>
          </div>

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
              <div><h2 className="font-serif text-xl font-bold text-slate-900">Page sections</h2><p className="mt-1 text-xs text-slate-500">Choose a section to edit its content.</p></div>
              <button type="button" className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50 sm:inline-flex"><MoreHorizontal className="h-4 w-4" /> More</button>
            </div>
            <div className="divide-y divide-slate-100">
              {selectedPage.sections.map((section) => (
                <div key={section.id} className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500"><FileText className="h-4 w-4" /></div>
                    <div className="min-w-0"><h3 className="truncate text-sm font-bold text-slate-900">{section.title}</h3><p className="mt-1 truncate text-sm text-slate-500">{section.content}</p><div className="mt-2 flex items-center gap-2 text-xs text-slate-400"><span>{section.type}</span><span>•</span><span>Updated {section.updated}</span></div></div>
                  </div>
                  <div className="flex shrink-0 items-center justify-between gap-4 sm:justify-end">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${section.status === 'Published' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}><span className={`h-1.5 w-1.5 rounded-full ${section.status === 'Published' ? 'bg-emerald-500' : 'bg-amber-500'}`} />{section.status}</span>
                    <button type="button" onClick={() => setSelectedSection(section)} className="rounded-lg bg-primary-700 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-primary-800">Update</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {selectedSection && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-0 backdrop-blur-[2px] sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={`Update ${selectedSection.title}`}>
          <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-700">Update section</p><h2 className="mt-1 font-serif text-2xl font-bold text-slate-900">{selectedSection.title}</h2></div><button type="button" onClick={() => setSelectedSection(null)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100" aria-label="Close editor"><X className="h-5 w-5" /></button></div>
            <div className="space-y-5 px-6 py-6">
              {saveError && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{saveError}</p>}
              {selectedPage.id === 'gallery' && selectedSection.id === 'gallery-images' ? (
                <div className="space-y-5">
                  <div className="flex flex-col justify-between gap-3 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center"><div><p className="text-sm font-bold text-slate-700">Gallery images</p><p className="mt-1 text-xs leading-5 text-slate-500">Upload new images or delete images from the public gallery.</p></div><label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary-700 px-3 py-2 text-xs font-bold text-white hover:bg-primary-800"><Upload className="h-4 w-4" /> Upload new image<input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleGalleryUpload} className="sr-only" /></label></div>
                  {galleryForm.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">No gallery images. Upload an image to get started.</div> : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{galleryForm.map((image, index) => <div key={`${image.src}-${index}`} className="overflow-hidden rounded-2xl border border-slate-200 bg-white"><div className="relative"><img src={image.src} alt={image.alt} className="h-36 w-full object-cover" /><button type="button" onClick={() => removeGalleryImage(index)} className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/80 text-white hover:bg-red-600" aria-label={`Delete ${image.caption}`}><Trash2 className="h-4 w-4" /></button></div><div className="space-y-3 p-3"><label className="block"><span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">Alt text</span><input value={image.alt} onChange={(event) => updateGalleryImage(index, 'alt', event.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100" /></label><label className="block"><span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">Caption</span><input value={image.caption} onChange={(event) => updateGalleryImage(index, 'caption', event.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100" /></label></div></div>)}</div>}
                </div>
              ) : selectedPage.id === 'festival' && selectedSection.id === 'festival-cards' ? (
                <div className="space-y-5">
                  <div className="rounded-xl bg-slate-50 p-4"><p className="text-sm font-bold text-slate-700">Festival cards</p><p className="mt-1 text-xs leading-5 text-slate-500">Update the image, title, and description for each festival card.</p></div>
                  {festivalCardsForm.map((card, index) => (
                    <div key={card.id} className="grid gap-4 rounded-2xl border border-slate-200 p-4 sm:grid-cols-[7rem_1fr]">
                      <div><img src={card.image} alt={`${card.name} preview`} className="h-24 w-28 rounded-xl border border-slate-200 object-cover" /><label className="mt-2 inline-flex cursor-pointer items-center gap-1.5 text-xs font-bold text-primary-700 hover:text-primary-800"><Upload className="h-3.5 w-3.5" /> Replace image<input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => handleFestivalCardUpload(index, event)} className="sr-only" /></label></div>
                      <div className="space-y-3"><label className="block"><span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">Title</span><input value={card.name} onChange={(event) => updateFestivalCard(index, 'name', event.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100" /></label><label className="block"><span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">Description</span><textarea value={card.description} onChange={(event) => updateFestivalCard(index, 'description', event.target.value)} rows={3} className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm leading-5 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100" /></label></div>
                    </div>
                  ))}
                </div>
              ) : selectedPage.id === 'festival' && selectedSection.id === 'festival-table' ? (
                <div className="space-y-4">
                  <div className="rounded-xl bg-slate-50 p-4"><p className="text-sm font-bold text-slate-700">Festival table</p><p className="mt-1 text-xs leading-5 text-slate-500">Update the table title and each event&apos;s English date and description.</p></div>
                  <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">Table title</span><input value={festivalTableFormTitle} onChange={(event) => setFestivalTableFormTitle(event.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100" /></label>
                  <div className="overflow-hidden rounded-2xl border border-slate-200"><div className="grid grid-cols-[7rem_1fr] gap-2 bg-primary-700 px-3 py-3 text-xs font-bold uppercase tracking-wide text-white"><span>English date</span><span>Description</span></div><div className="max-h-[52vh] divide-y divide-slate-100 overflow-y-auto bg-white">{festivalTableForm.map((entry, index) => <div key={index} className="grid grid-cols-[7rem_1fr] gap-2 px-3 py-2"><input value={entry.date} onChange={(event) => updateFestivalTable(index, 'date', event.target.value)} placeholder="Jan 2" className="min-w-0 rounded-lg border border-slate-200 px-2 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100" aria-label={`English date for event ${index + 1}`} /><textarea value={entry.event} onChange={(event) => updateFestivalTable(index, 'event', event.target.value)} rows={2} className="min-w-0 resize-none rounded-lg border border-slate-200 px-2 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100" aria-label={`Description for event ${index + 1}`} /></div>)}</div></div>
                </div>
              ) : selectedPage.id === 'administration' ? (
                <div className="space-y-5">
                  <div className="rounded-xl bg-slate-50 p-4"><p className="text-sm font-bold text-slate-700">{selectedSection.title}</p><p className="mt-1 text-xs leading-5 text-slate-500">Update each member&apos;s image, name, and designation.</p></div>
                  {(() => {
                    const group = administrationForm.find((item) => item.title === selectedSection.title);
                    if (!group) return null;
                    return <div className="space-y-3">
                      {group.members.map((member, index) => (
                        <div key={`${member.name}-${index}`} className="grid gap-4 rounded-2xl border border-slate-200 p-4 sm:grid-cols-[5rem_1fr]">
                          <div>
                            <img src={member.photo} alt={`${member.name} preview`} className="h-16 w-16 rounded-xl border border-slate-200 object-cover" />
                            <label className="mt-2 inline-flex cursor-pointer items-center gap-1 text-[11px] font-bold text-primary-700 hover:text-primary-800"><Upload className="h-3 w-3" /> Replace<input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => handleAdministrationUpload(group.title, index, event)} className="sr-only" /></label>
                          </div>
                          <div className="grid gap-3 sm:grid-cols-2">
                            <label className="block"><span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">Name</span><input value={member.name} onChange={(event) => updateAdministrationMember(group.title, index, 'name', event.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100" /></label>
                            <label className="block"><span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">Designation</span><input value={member.role ?? ''} onChange={(event) => updateAdministrationMember(group.title, index, 'role', event.target.value)} placeholder="Optional" className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100" /></label>
                          </div>
                        </div>
                      ))}
                    </div>;
                  })()}
                </div>
              ) : selectedPage.id === 'pooja' && selectedSection.id === 'pooja-rates' ? (
                <div className="space-y-4">
                  <div className="rounded-xl bg-slate-50 p-4"><p className="text-sm font-bold text-slate-700">Editable pooja rates</p><p className="mt-1 text-xs leading-5 text-slate-500">Update the number, offering name, or rate for each pooja. Changes appear on the public Pooja page after saving.</p></div>
                  <div className="overflow-hidden rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between bg-primary-700 px-3 py-3 text-white"><div className="grid flex-1 grid-cols-[4.5rem_1fr_7rem] gap-2 text-xs font-bold uppercase tracking-wide"><span>No.</span><span>Offering</span><span>Rate (₹)</span></div><button type="button" onClick={addPoojaRate} className="ml-3 inline-flex shrink-0 items-center gap-1 rounded-lg bg-secondary-500 px-2.5 py-1.5 text-xs font-bold text-primary-900 transition hover:bg-secondary-400"><Plus className="h-3.5 w-3.5" /> Add row</button></div>
                    <div className="max-h-[50vh] divide-y divide-slate-100 overflow-y-auto bg-white">
                      {poojaRatesForm.map((item, index) => (
                        <div key={index} className="grid grid-cols-[4.5rem_1fr_7rem] gap-2 px-3 py-2">
                          <input type="number" value={item.no} onChange={(event) => updatePoojaRate(index, 'no', event.target.value)} className="min-w-0 rounded-lg border border-slate-200 px-2 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100" aria-label={`Number for pooja ${index + 1}`} />
                          <input value={item.name} onChange={(event) => updatePoojaRate(index, 'name', event.target.value)} className="min-w-0 rounded-lg border border-slate-200 px-2 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100" aria-label={`Offering for row ${index + 1}`} />
                          <input type="number" min="0" value={item.rate} onChange={(event) => updatePoojaRate(index, 'rate', event.target.value)} className="min-w-0 rounded-lg border border-slate-200 px-2 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100" aria-label={`Rate for row ${index + 1}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : selectedPage.id === 'home' && selectedSection.id === 'hero-section' ? (
                <div className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">1. Welcome label <span className="font-normal text-slate-400">(Text)</span></span><input value={heroForm.eyebrow} onChange={(event) => updateHeroField('eyebrow', event.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100" /></label>
                    <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">2. Hero heading <span className="font-normal text-slate-400">(Text)</span></span><input value={heroForm.title} onChange={(event) => updateHeroField('title', event.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100" /></label>
                  </div>
                  <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">3. Hero tagline <span className="font-normal text-slate-400">(Text)</span></span><input value={heroForm.tagline} onChange={(event) => updateHeroField('tagline', event.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100" /></label>
                  <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">4. Hero description <span className="font-normal text-slate-400">(Text)</span></span><textarea value={heroForm.description} onChange={(event) => updateHeroField('description', event.target.value)} rows={3} className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100" /></label>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">5. Primary button <span className="font-normal text-slate-400">(Button)</span></span><input value={heroForm.primaryButton} onChange={(event) => updateHeroField('primaryButton', event.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100" /></label>
                    <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">6. Secondary button <span className="font-normal text-slate-400">(Button)</span></span><input value={heroForm.secondaryButton} onChange={(event) => updateHeroField('secondaryButton', event.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100" /></label>
                  </div>
                </div>
              ) : selectedPage.id === 'home' && selectedSection.id === 'quick-links' ? (
                <div className="space-y-4">
                  <div className="rounded-xl bg-slate-50 p-4"><p className="text-sm font-bold text-slate-700">Five cards</p><p className="mt-1 text-xs leading-5 text-slate-500">Update the labels displayed in the Home page quick links row.</p></div>
                  {quickLinksForm.map((label, index) => (
                    <label key={index} className="block"><span className="mb-2 block text-sm font-bold text-slate-700">{index + 1}. Card {index + 1} <span className="font-normal text-slate-400">(Text)</span></span><input value={label} onChange={(event) => updateQuickLink(index, event.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100" /></label>
                  ))}
                </div>
              ) : selectedPage.id === 'home' && selectedSection.id === 'darshan-timings' ? (
                <div className="space-y-4">
                  <div className="rounded-xl bg-slate-50 p-4"><p className="text-sm font-bold text-slate-700">Darshan schedule</p><p className="mt-1 text-xs leading-5 text-slate-500">Set the type and time shown in the Darshan &amp; Pooja Timings card.</p></div>
                  {timingsForm.map((timing, index) => (
                    <div key={index} className="rounded-2xl border border-slate-200 p-4">
                      <p className="mb-3 text-sm font-bold text-slate-800">Timing {index + 1}</p>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Type</span><input value={timing.period} onChange={(event) => updateTiming(index, 'period', event.target.value)} placeholder="Morning" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100" /></label>
                        <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Time</span><input value={timing.time} onChange={(event) => updateTiming(index, 'time', event.target.value)} placeholder="5:30 AM to 10:00 AM" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100" /></label>
                      </div>
                    </div>
                  ))}
                </div>
              ) : selectedPage.id === 'home' && selectedSection.id === 'upcoming-festivals' ? (
                <div className="space-y-5">
                  <div className="rounded-xl bg-slate-50 p-4"><p className="text-sm font-bold text-slate-700">Upcoming Festivals section</p><p className="mt-1 text-xs leading-5 text-slate-500">Update the section title plus the image, title and date shown for each card.</p></div>
                  <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">Section title</span><input value={festivalTitle} onChange={(event) => setFestivalTitle(event.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100" /></label>
                  {festivalForm.map((festival, index) => (
                    <div key={index} className="rounded-2xl border border-slate-200 p-4">
                      <p className="mb-3 text-sm font-bold text-slate-800">Festival card {index + 1}</p>
                      <div className="grid gap-4 sm:grid-cols-[7rem_1fr]">
                        <div>
                          <img src={festival.image} alt={`${festival.title} preview`} className="h-24 w-28 rounded-xl border border-slate-200 object-cover" />
                          <label className="mt-2 inline-flex cursor-pointer items-center gap-1.5 text-xs font-bold text-primary-700 hover:text-primary-800"><Upload className="h-3.5 w-3.5" /> Replace image<input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => handleFestivalUpload(index, event)} className="sr-only" /></label>
                        </div>
                        <div className="space-y-3">
                          <label className="block"><span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">Title</span><input value={festival.title} onChange={(event) => updateFestival(index, 'title', event.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100" /></label>
                          <label className="block"><span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">Date</span><input value={festival.date} onChange={(event) => updateFestival(index, 'date', event.target.value)} placeholder="Mar 10 to Mar 17" className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100" /></label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">Section title</span><input value={selectedSection.title} onChange={(event) => updateSection('title', event.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100" /></label>
                  <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">Content summary</span><textarea value={selectedSection.content} onChange={(event) => updateSection('content', event.target.value)} rows={5} className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100" /></label>
                </>
              )}
              {selectedPage.id === 'home' && selectedSection.id === 'hero-section' && (
                <div>
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <div><p className="text-sm font-bold text-slate-700">7. Hero slider images</p><p className="mt-1 text-xs text-slate-500">Images rotate on the home page in the order shown. Keep at least one image.</p></div>
                    <div className="flex flex-wrap gap-2">
                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-primary-700 px-3 py-2 text-xs font-bold text-white transition hover:bg-primary-800">
                        <Upload className="h-4 w-4" /> Add image
                        <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleHeroUpload} className="sr-only" />
                      </label>
                      <button type="button" onClick={() => setHeroImages(DEFAULT_HOME_HERO_IMAGES.map((image) => ({ ...image })))} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100">Restore defaults</button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {heroImages.map((image, index) => (
                      <div key={`${image.src}-${index}`} className="grid gap-3 rounded-2xl border border-slate-200 p-3 sm:grid-cols-[10rem_1fr]">
                        <div className="relative">
                          <img src={image.src} alt={image.alt} className="h-32 w-full rounded-xl object-cover" />
                          <span className="absolute left-2 top-2 rounded-full bg-slate-900/75 px-2 py-1 text-[11px] font-bold text-white">Slide {index + 1}</span>
                        </div>
                        <div className="flex min-w-0 flex-col justify-between gap-3">
                          <label className="block"><span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">Alt text</span><input value={image.alt} onChange={(event) => updateHeroImageAlt(index, event.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100" /></label>
                          <div className="flex flex-wrap items-center gap-2">
                            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"><Upload className="h-3.5 w-3.5" /> Replace<input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => handleHeroReplace(index, event)} className="sr-only" /></label>
                            <button type="button" onClick={() => moveHeroImage(index, -1)} disabled={index === 0} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40" aria-label={`Move slide ${index + 1} earlier`}><ArrowUp className="h-3.5 w-3.5" /> Move up</button>
                            <button type="button" onClick={() => moveHeroImage(index, 1)} disabled={index === heroImages.length - 1} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40" aria-label={`Move slide ${index + 1} later`}><ArrowDown className="h-3.5 w-3.5" /> Move down</button>
                            <button type="button" onClick={() => removeHeroImage(index)} disabled={heroImages.length === 1} className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40" aria-label={`Delete slide ${index + 1}`}><Trash2 className="h-3.5 w-3.5" /> Remove</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-slate-500"><Image className="h-3.5 w-3.5" /> JPG, PNG or WebP. Save changes to publish the slider images on the home page.{heroUploadsPending > 0 && <span role="status" className="font-semibold text-primary-700"> Processing image{heroUploadsPending > 1 ? 's' : ''}...</span>}</p>
                </div>
              )}
              <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-bold text-slate-500">Publishing status</p><p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-800"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> {selectedSection.status} on the live website</p></div>
            </div>
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 px-6 py-5 sm:flex-row sm:justify-end"><button type="button" onClick={() => setSelectedSection(null)} className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100">Cancel</button><button type="button" onClick={saveSection} disabled={selectedPage.id === 'home' && selectedSection.id === 'hero-section' && heroUploadsPending > 0} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-700 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-50"><Save className="h-4 w-4" /> Save changes</button></div>
          </div>
        </div>
      )}

      {saved && <div className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white shadow-xl"><Check className="h-4 w-4 text-emerald-400" /> Changes saved</div>}
    </div>
  );
}
