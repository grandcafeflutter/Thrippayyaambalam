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
        href="#/"
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
      window.history.replaceState({}, document.title, window.location.pathname);
      window.location.hash = '/cms';
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
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
