import { MapPin, Phone, Mail } from 'lucide-react';
import { NAV_ITEMS, TEMPLE_CONTACT, TEMPLE_NAME } from '@/data/temple';

export default function SiteFooter() {
  return (
    <footer className="mt-24 bg-primary-800 text-primary-50">
      <div className="h-1.5 bg-gradient-to-r from-secondary-700 via-secondary-400 to-secondary-700" />
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-50 p-1 ring-2 ring-secondary-400">
              <img src="/images/image.png" alt="" className="h-full w-full object-contain" />
            </span>
            <span className="font-serif text-xl font-semibold text-neutral-50">{TEMPLE_NAME}</span>
          </div>
          <p className="max-w-xs text-sm text-primary-100">
            A sacred abode of the Trimurti, where Brahma, Vishnu and Maheshwara are worshipped together in one sanctum.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-serif text-lg font-semibold text-secondary-300">Explore</h3>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-secondary-300">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-serif text-lg font-semibold text-secondary-300">Visit Us</h3>
          <p className="mb-3 text-sm font-semibold text-primary-100">{TEMPLE_CONTACT.organization}</p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary-400" />
              <span className="whitespace-pre-line">{TEMPLE_CONTACT.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-secondary-400" />
              <span>{TEMPLE_CONTACT.phone}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-secondary-400" />
              <span>{TEMPLE_CONTACT.email}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-600">
        <p className="mx-auto max-w-[1400px] px-4 py-5 text-center text-xs text-primary-200 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} {TEMPLE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
