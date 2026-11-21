import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '@/data/temple';

type SiteHeaderProps = {
  currentPath: string;
};

export default function SiteHeader({ currentPath }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = (href: string) => {
    const isActive = currentPath === href;
    return [
      'rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200',
      isActive
        ? 'bg-secondary-500 text-primary-900 shadow-sm'
        : 'text-primary-50 hover:bg-primary-600 hover:text-secondary-200',
    ].join(' ');
  };

  return (
    <header className="sticky top-0 z-40 border-b-2 border-secondary-500 bg-gradient-to-r from-primary-800 via-primary-700 to-primary-800 shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-neutral-50 p-1 shadow-md ring-2 ring-secondary-400">
            <img src="/images/image.png" alt="Temple emblem" className="h-full w-full object-contain" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-lg font-bold text-neutral-50 sm:text-xl">Thrippayya</span>
            <span className="font-serif text-lg font-semibold text-secondary-300 sm:text-xl">Thrimoorthi Temple</span>
          </span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={linkClass(item.href)}
              aria-current={currentPath === item.href ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary-900/60 text-neutral-50 transition hover:bg-primary-600 xl:hidden"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="animate-fade-up border-t border-primary-600 bg-primary-800 px-4 pb-4 pt-2 xl:hidden"
        >
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`${linkClass(item.href)} text-center`}
                aria-current={currentPath === item.href ? 'page' : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
