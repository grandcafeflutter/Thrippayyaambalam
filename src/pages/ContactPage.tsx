import { ArrowRight, Clock, ExternalLink, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import PageBanner from '@/components/PageBanner';
import { ABOUT_IMAGE, TEMPLE_CONTACT } from '@/data/temple';

const MAP_QUERY = 'SREE THRIPPAYYA KSHETHRA KSHEMA SAMITHY, P.O. Nadavaramba, Irinjalakuda, Trichur, Kerala 680661';
const MAP_URL = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`;
const DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;

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

      <section className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary-600">Temple Office</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-primary-800 sm:text-4xl">We are here to help</h2>
          <p className="mt-4 leading-7 text-neutral-600">Whether you are planning your first Darshan or arranging a special pooja, our office is happy to guide you.</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACT_ITEMS.map((item) => (
            <a key={item.label} href={item.href ?? '/contact'} className="group flex items-center gap-3 rounded-2xl border border-secondary-200 bg-[#fffaf4] p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-secondary-400 hover:bg-secondary-50">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-700 text-secondary-300 shadow-sm transition group-hover:bg-secondary-500 group-hover:text-primary-900"><item.icon className="h-5 w-5" /></span>
              <span className="min-w-0"><span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">{item.label}</span><span className="mt-1 block whitespace-pre-line text-sm font-medium leading-5 text-primary-800">{item.value}</span></span>
            </a>
          ))}
          <div className="flex items-center gap-3 rounded-2xl border border-secondary-200 bg-[#fffaf4] p-4 shadow-sm">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-700 text-secondary-300 shadow-sm"><Clock className="h-5 w-5" /></span>
            <span className="min-w-0"><span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">Darshan hours</span><span className="mt-1 block text-sm font-medium text-primary-800">5:30 AM–10:00 AM · 5:30 PM–7:30 PM</span></span>
          </div>
        </div>

        <div className="mt-16 grid items-stretch gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-secondary-200 bg-[#fffaf4] p-2 shadow-lg">
            <div className="rounded-[1.35rem] bg-neutral-50 p-5 sm:p-8 lg:p-9">
              <div className="mb-7 flex items-center justify-between gap-4 rounded-2xl bg-primary-800 px-5 py-4 sm:px-6">
                <h2 className="font-serif text-2xl font-semibold leading-tight text-secondary-300 sm:text-3xl">How can we help?</h2>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-500 text-primary-900"><Mail className="h-5 w-5" /></span>
              </div>
              <ContactForm />
            </div>
          </div>

          <div className="flex flex-col overflow-hidden rounded-3xl border border-secondary-200 bg-neutral-50 p-2 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-7">
              <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary-600">Find your way</p><h2 className="mt-2 font-serif text-3xl font-semibold leading-tight text-primary-800 sm:text-4xl">Visit the temple</h2><p className="mt-2 max-w-sm whitespace-pre-line text-sm leading-5 text-neutral-600">{TEMPLE_CONTACT.organization}{'\n'}{TEMPLE_CONTACT.address}</p></div>
              <a href={DIRECTIONS_URL} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary-500 px-4 py-2.5 text-sm font-semibold text-primary-900 transition hover:bg-secondary-400"><Navigation className="h-4 w-4" />Directions<ExternalLink className="h-3.5 w-3.5" /></a>
            </div>
            <div className="relative min-h-[360px] flex-1 overflow-hidden rounded-2xl sm:min-h-[460px]">
              <iframe title="Map showing the location of Thrippayya Thrimoorthi Temple" src={MAP_URL} loading="lazy" className="absolute inset-0 h-full w-full border-0 grayscale-[0.15]" referrerPolicy="no-referrer-when-downgrade" />
              <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl border border-white/60 bg-neutral-50/95 p-3 shadow-lg backdrop-blur sm:inset-x-6 sm:bottom-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-700 text-secondary-300"><MapPin className="h-5 w-5" /></span>
                <div><p className="text-sm font-semibold text-primary-800">{TEMPLE_CONTACT.organization}</p><p className="whitespace-pre-line text-xs leading-4 text-neutral-600">{TEMPLE_CONTACT.address}</p></div>
                <ArrowRight className="ml-auto h-4 w-4 text-primary-700" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
