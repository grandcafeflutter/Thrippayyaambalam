import { CalendarDays } from 'lucide-react';
import type { FestivalCalendarEntry } from '@/data/festivals';

type FestivalCalendarProps = {
  title?: string;
  entries?: FestivalCalendarEntry[];
};

export default function FestivalCalendar({ title = 'Festival Calendar - 2026', entries = [] }: FestivalCalendarProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 shadow-xl">
      <header className="flex items-center justify-center gap-3 bg-primary-700 px-6 py-5 text-neutral-50">
        <CalendarDays className="h-7 w-7 text-secondary-300" />
        <h2 className="font-serif text-2xl font-semibold sm:text-3xl">{title}</h2>
      </header>
      <p className="border-b border-secondary-300 bg-secondary-50 px-6 py-3 text-center text-sm font-medium text-primary-700">
        Thrippayya Thrimoorthi Temple, special events and celebrations
      </p>
      <ul className="max-h-[38rem] divide-y divide-neutral-200 overflow-y-auto">
        {entries.map((entry, index) => (
          <li
            key={`${entry.date}-${index}`}
            className="grid grid-cols-[6.5rem_1fr] gap-4 px-6 py-3 text-sm transition-colors hover:bg-primary-50 sm:grid-cols-[7.5rem_1fr]"
          >
            <span className="font-semibold text-primary-700">{entry.date}</span>
            <span className="text-neutral-700">{entry.event}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
