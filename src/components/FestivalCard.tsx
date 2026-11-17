import { ArrowRight } from 'lucide-react';
import type { FestivalHighlight } from '@/data/festivals';

type FestivalCardProps = {
  festival: FestivalHighlight;
};

export default function FestivalCard({ festival }: FestivalCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:flex-row">
      <div className="h-56 shrink-0 overflow-hidden sm:h-auto sm:w-64">
        <img
          src={festival.image}
          alt={festival.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="relative flex flex-1 flex-col gap-3 p-6 sm:p-7">
        <h2 className="font-serif text-3xl font-semibold text-primary-700 sm:text-4xl">{festival.name}</h2>
        <p className="text-base leading-[1.5] text-neutral-700">{festival.description}</p>
        <a
          href="#/contact"
          aria-label={`Enquire about ${festival.name}`}
          className="mt-auto inline-flex h-10 w-10 items-center justify-center self-end rounded-full bg-secondary-500 text-primary-900 shadow-sm transition duration-300 hover:translate-x-1 hover:bg-secondary-400"
        >
          <ArrowRight className="h-5 w-5" />
        </a>
      </div>
    </article>
  );
}
