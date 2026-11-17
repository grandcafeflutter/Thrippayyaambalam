import { Clock, Sunrise, Sunset } from 'lucide-react';
import { useState } from 'react';
import { getDarshanTimings } from '@/lib/cmsMedia';

const PERIOD_ICONS = {
  Morning: Sunrise,
  Evening: Sunset,
} as const;

export default function DarshanTimings() {
  const [timings] = useState(getDarshanTimings);

  return (
    <div className="h-full rounded-2xl border border-secondary-300 bg-neutral-50 p-6 shadow-md">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-700 text-secondary-300">
          <Clock className="h-5 w-5" />
        </span>
        <h3 className="font-serif text-2xl font-semibold text-primary-700">Darshan Timings</h3>
      </div>
      <ul className="divide-y divide-neutral-200">
        {timings.map((slot) => {
          const Icon = PERIOD_ICONS[slot.period as keyof typeof PERIOD_ICONS] ?? Clock;
          return (
            <li key={slot.period} className="flex items-center justify-between gap-4 py-4">
              <span className="flex items-center gap-3 font-semibold text-primary-700">
                <Icon className="h-5 w-5 text-secondary-600" />
                {slot.period}:
              </span>
              <span className="text-right text-neutral-700">{slot.time}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
