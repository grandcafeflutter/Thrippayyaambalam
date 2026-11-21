import { useState } from 'react';
import { Megaphone } from 'lucide-react';
import PageBanner from '@/components/PageBanner';
import PoojaRateTable from '@/components/PoojaRateTable';
import SectionHeading from '@/components/SectionHeading';
import { getPoojaRates } from '@/lib/cmsMedia';
import { HERO_IMAGE } from '@/data/temple';

const NOTICES = [
  'Monday, Saturday and Pradosham are special days for offerings.',
  'Items for abhishekam must be brought to the temple before 7:30 AM.',
  'Tila Homam is performed for all vehicles.',
];

export default function PoojaPage() {
  const [poojaRates] = useState(getPoojaRates);
  const splitIndex = Math.ceil(poojaRates.length / 2);

  return (
    <>
      <PageBanner
        eyebrow="Sevas & Poojas"
        title="Pooja & Offerings"
        description="List of poojas and offerings at the temple, with the current rate for each."
        image={HERO_IMAGE}
      />

      <section className="mx-auto max-w-[1400px] space-y-12 px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Rate List"
          title="Pooja & Offering Rates"
          description="Rates for each pooja and offering, in Indian rupees (₹)."
        />

        <div className="grid items-start gap-8 lg:grid-cols-2">
          <PoojaRateTable rates={poojaRates.slice(0, splitIndex)} />
          <PoojaRateTable rates={poojaRates.slice(splitIndex)} />
        </div>

        <div className="flex flex-col gap-6 rounded-2xl border border-secondary-400 bg-primary-700 p-6 text-neutral-50 shadow-xl sm:flex-row sm:items-center sm:p-8">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-secondary-500 text-primary-900">
            <Megaphone className="h-8 w-8" />
          </div>
          <ul className="space-y-3 text-base leading-[1.5] sm:text-lg">
            {NOTICES.map((notice) => (
              <li key={notice} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary-300" />
                <span>{notice}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
