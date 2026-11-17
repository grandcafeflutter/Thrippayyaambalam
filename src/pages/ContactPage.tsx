import { ArrowRight, Clock, ExternalLink, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import DarshanTimings from '@/components/DarshanTimings';
import PageBanner from '@/components/PageBanner';
import { ABOUT_IMAGE, TEMPLE_CONTACT } from '@/data/temple';

const MAP_URL = 'https://www.google.com/maps?q=Thrippayya%2C%20Kerala%2C%20India&output=embed';
const DIRECTIONS_URL = 'https://www.google.com/maps/search/?api=1&query=Thrippayya%2C%20Kerala%2C%20India';

const CONTACT_ITEMS = [
  { icon: MapPin, label: 'Visit us', value: TEMPLE_CONTACT.address, href: undefined },
  { icon: Phone, label: 'Call the office', value: TEMPLE_CONTACT.phone, href: `tel:${TEMPLE_CONTACT.phone}` },
  { icon: Mail, label: 'Write to us', value: TEMPLE_CONTACT.email, href: `mailto:${TEMPLE_CONTACT.email}` },
] as const;

export default function ContactPage() {
  return (
    <>
      <PageBanner
        eyebrow="Get in Touch"
        title="Contact Us"
        description="Plan your visit, enquire about poojas and festivals, or reach the temple office with any question."
        image={ABOUT_IMAGE}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="space-y-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary-600">Temple Office</p>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-primary-800 sm:text-4xl">We are here to help</h2>
              <p className="mt-4 max-w-md text-neutral-600">
                Whether you are planning your first Darshan or arranging a special pooja, our office is happy to guide you.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-secondary-200 bg-[#fffaf4] shadow-sm">
              <ul className="divide-y divide-secondary-100">
                {CONTACT_ITEMS.map((item) => (
                  <li key={item.label} className="p-5 transition hover:bg-secondary-50 sm:p-6">
                    <a href={item.href ?? '#'} className={`flex items-center gap-4 ${item.href ? 'group' : ''}`}>
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-700 text-secondary-300 shadow-sm transition group-hover:bg-secondary-500 group-hover:text-primary-900">
                        <item.icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">{item.label}</span>
                        <span className="mt-1 block truncate text-[15px] font-medium text-primary-800 group-hover:text-primary-600">{item.value}</span>
                      </span>
                    </a>
                  </li>
                ))}
                <li className="p-5 sm:p-6">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-700 text-secondary-300 shadow-sm">
                      <Clock className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">Darshan hours</span>
                      <span className="mt-1 block text-[15px] font-medium text-primary-800">5:30 AM–10:00 AM &middot; 5:30 PM–7:30 PM</span>
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <DarshanTimings />
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 shadow-md sm:p-10">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary-600">Send a message</p>
                <h2 className="mt-2 font-serif text-3xl font-semibold text-primary-800">How can we help?</h2>
                <p className="mt-3 text-neutral-600">Share your questions and the temple office will get back to you.</p>
              </div>
              <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary-100 text-secondary-700 sm:flex">
                <Mail className="h-5 w-5" />
              </span>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary-600">Find your way</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-primary-800 sm:text-4xl">Visit the temple</h2>
            <p className="mt-3 text-neutral-600">Thrippayya, Kerala, India</p>
          </div>
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-700 px-5 py-3 text-sm font-semibold text-neutral-50 transition hover:bg-primary-600"
          >
            <Navigation className="h-4 w-4" />
            Get directions
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-secondary-200 bg-secondary-50 p-2 shadow-lg">
          <div className="relative h-[360px] overflow-hidden rounded-2xl sm:h-[460px]">
            <iframe
              title="Map showing the location of Thrippayya Thrimoorthi Temple"
              src={MAP_URL}
              loading="lazy"
              className="h-full w-full border-0 grayscale-[0.15]"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-white/60 bg-neutral-50/95 p-4 shadow-lg backdrop-blur sm:inset-x-6 sm:bottom-6 sm:max-w-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-700 text-secondary-300">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-primary-800">Thrippayya Thrimoorthi Temple</p>
                  <p className="text-xs text-neutral-600">Thrippayya, Kerala, India</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-primary-700" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
