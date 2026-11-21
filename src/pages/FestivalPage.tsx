import { useState } from 'react';
import FestivalCalendar from '@/components/FestivalCalendar';
import FestivalCard from '@/components/FestivalCard';
import PageBanner from '@/components/PageBanner';
import { getFestivalCards, getFestivalTable, getFestivalTableTitle } from '@/lib/cmsMedia';

const FESTIVAL_HERO_IMAGE = 'https://coovcplsijznkdytdyqh.supabase.co/storage/v1/object/public/site-media/cms/temple-cms-home-hero-images/2e1a4a7c-60b5-40c4-925f-85f5a49392e3.webp';

export default function FestivalPage() {
  const [festivalCards] = useState(getFestivalCards);
  const [festivalTable] = useState(getFestivalTable);
  const [festivalTableTitle] = useState(getFestivalTableTitle);

  return (
    <>
      <PageBanner
        eyebrow="Celebrations"
        title="Our Festivals"
        description="Major festivals, special poojas and traditional celebrations held at Thrippayya Thrimoorthi Temple."
        image={FESTIVAL_HERO_IMAGE}
      />

      <section className="mx-auto grid max-w-[1400px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.45fr_1fr] lg:px-8">
        <div className="space-y-6">
          {festivalCards.map((festival) => (
            <FestivalCard key={festival.id} festival={festival} />
          ))}
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <FestivalCalendar title={festivalTableTitle} entries={festivalTable} />
        </div>
      </section>
    </>
  );
}
