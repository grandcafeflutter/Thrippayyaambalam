import { useEffect, useState, type ComponentType } from 'react';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { useHashPath } from '@/lib/router';
import AdministrationPage from '@/pages/AdministrationPage';
import ContactPage from '@/pages/ContactPage';
import FestivalPage from '@/pages/FestivalPage';
import GalleryPage from '@/pages/GalleryPage';
import HistoryPage from '@/pages/HistoryPage';
import HomePage from '@/pages/HomePage';
import PoojaPage from '@/pages/PoojaPage';
import WorshipPage from '@/pages/WorshipPage';
import CmsDashboardPage from '@/pages/CmsDashboardPage';
import { hydrateCmsContent } from '@/lib/cmsBackend';
import { supabase } from '@/lib/supabase';

const PAGES: Record<string, ComponentType> = {
  '/': HomePage,
  '/history': HistoryPage,
  '/pooja': PoojaPage,
  '/worship': WorshipPage,
  '/administration': AdministrationPage,
  '/festival': FestivalPage,
  '/gallery': GalleryPage,
  '/contact': ContactPage,
};

function NotFoundPage() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-32 text-center">
      <h1 className="text-5xl font-semibold text-primary-700">Page not found</h1>
      <p className="text-lg text-neutral-600">The page you are looking for does not exist or has moved.</p>
      <a
        href="/"
        className="rounded-full bg-primary-700 px-6 py-3 text-sm font-semibold text-neutral-50 transition hover:bg-primary-600"
      >
        Return to the temple home
      </a>
    </section>
  );
}

export default function App() {
  const path = useHashPath();
  const [cmsReady, setCmsReady] = useState(false);

  useEffect(() => {
    let active = true;
    setCmsReady(false);
    void hydrateCmsContent().finally(() => {
      if (active) setCmsReady(true);
    });
    return () => {
      active = false;
    };
  }, [path]);

  useEffect(() => {
    const isCmsRedirect = new URLSearchParams(window.location.search).get('cms') === '1';
    if (!isCmsRedirect || !supabase) return;
    void supabase.auth.getSession().then(({ data }) => {
      if (!data.session) return;
      window.history.replaceState({}, document.title, '/cms');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  useEffect(() => {
    const metadata: Record<string, { title: string; description: string }> = {
      '/': {
        title: 'Thrippayya Thrimoorthi Temple | Kerala',
        description: 'Visit Thrippayya Thrimoorthi Temple in Kerala, a sacred shrine where Brahma, Vishnu and Maheshwara are worshipped together.',
      },
      '/history': { title: 'Temple History | Thrippayya Thrimoorthi Temple', description: 'Discover the history, traditions and spiritual heritage of Thrippayya Thrimoorthi Temple.' },
      '/pooja': { title: 'Pooja and Offerings | Thrippayya Thrimoorthi Temple', description: 'Explore pooja services, offerings and rates at Thrippayya Thrimoorthi Temple.' },
      '/worship': { title: 'Order of Worship | Thrippayya Thrimoorthi Temple', description: 'Learn the traditional order of worship and Darshan followed at Thrippayya Thrimoorthi Temple.' },
      '/administration': { title: 'Temple Administration | Thrippayya Thrimoorthi Temple', description: 'Meet the committee members, patrons, advisory committee and auditors of the temple.' },
      '/festival': { title: 'Festivals | Thrippayya Thrimoorthi Temple', description: 'View upcoming festivals, celebrations and the temple festival calendar.' },
      '/gallery': { title: 'Temple Gallery | Thrippayya Thrimoorthi Temple', description: 'Browse photos of the temple, festivals, rituals and devotees.' },
      '/contact': { title: 'Contact the Temple | Thrippayya Thrimoorthi Temple', description: 'Contact Thrippayya Thrimoorthi Temple for visits, poojas, festivals and enquiries.' },
    };
    const pageMetadata = metadata[path] ?? metadata['/'];
    document.title = pageMetadata.title;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute('content', pageMetadata.description);
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${window.location.origin}${path === '/' ? '/' : path}`;
  }, [path]);

  if (!cmsReady) {
    return <div className="flex min-h-screen items-center justify-center bg-neutral-50 text-sm text-neutral-600">Loading temple content...</div>;
  }
  if (path === '/cms') {
    return <CmsDashboardPage />;
  }
  const Page = PAGES[path] ?? NotFoundPage;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader currentPath={path} />
      <main className="flex-1">
        <Page />
      </main>
      <SiteFooter />
    </div>
  );
}
