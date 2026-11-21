import { ArrowRight, Hand } from 'lucide-react';
import PageBanner from '@/components/PageBanner';
import { ORDER_OF_WORSHIP_IMAGE, TEMPLE_NAME, WORSHIP_STEPS } from '@/data/temple';

const CLOSING_STEPS = WORSHIP_STEPS.slice(14);
const MAIN_STEPS = WORSHIP_STEPS.slice(0, 14);

export default function WorshipPage() {
  return (
    <>
      <PageBanner
        eyebrow="Devotional Path"
        title="Order of Worship"
        description={`The traditional sequence of Darshan at ${TEMPLE_NAME}, followed by devotees as they approach the Trimurti.`}
        image={ORDER_OF_WORSHIP_IMAGE}
      />

      {/* Intro */}
      <section className="mx-auto max-w-4xl px-4 pt-20 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary-600">Step by Step</p>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-primary-800 sm:text-4xl">
          The Sacred Circuit
        </h2>
        <span className="mx-auto mt-5 block h-0.5 w-16 rounded-full bg-secondary-500" />
        <p className="mx-auto mt-6 max-w-2xl text-base leading-[1.75] text-neutral-600">
          The Darshan of Thrimoorthy — the Divine Trinity of Brahma, Maheshwara, and Vishnu — follows a
          prescribed circuit through the temple's sacred enclosures. Each step deepens the devotee's
          connection to the deities and completes the act of worship.
        </p>
      </section>

      {/* Journey steps */}
      <section className="mx-auto mt-16 max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Vertical spine */}
          <div
            aria-hidden="true"
            className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-secondary-400 via-secondary-300 to-transparent sm:left-8 sm:block"
          />

          <ol className="space-y-6">
            {MAIN_STEPS.map((step, index) => (
              <li key={step.title} className="group relative flex gap-5 sm:gap-8">
                {/* Step number badge */}
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-700 text-sm font-bold text-secondary-300 shadow-lg ring-4 ring-[#fdf8f0] transition duration-300 group-hover:bg-secondary-500 group-hover:text-primary-900 sm:h-16 sm:w-16 sm:text-base">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Card */}
                <div className="flex-1 overflow-hidden rounded-2xl border border-neutral-200 bg-[#fffaf4] shadow-sm transition duration-300 group-hover:border-secondary-300 group-hover:shadow-md">
                  <div className="flex flex-col gap-1 p-5 sm:flex-row sm:items-start sm:gap-6 sm:p-6">
                    <div className="flex-1">
                      <h3 className="font-serif text-lg font-semibold leading-snug text-primary-800 sm:text-xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-[15px] leading-[1.7] text-neutral-600">{step.text}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Important Guidelines & Final Step — highlighted differently */}
        <div className="mt-8 space-y-4">
          {CLOSING_STEPS.map((step, i) => (
            <div
              key={step.title}
              className={`flex gap-5 overflow-hidden rounded-2xl border p-5 sm:gap-8 sm:p-6 ${
                i === 0
                  ? 'border-amber-300 bg-amber-50'
                  : 'border-primary-200 bg-primary-50'
              }`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold ring-4 sm:h-16 sm:w-16 sm:text-base ${
                  i === 0
                    ? 'bg-amber-500 text-white ring-amber-100'
                    : 'bg-secondary-500 text-primary-900 ring-secondary-100'
                }`}
              >
                {i === 0 ? '!' : <Hand className="h-6 w-6" />}
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-lg font-semibold leading-snug text-primary-800 sm:text-xl">
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.7] text-neutral-700">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="mx-auto mb-24 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary-800 shadow-xl">
          <img
            src={ORDER_OF_WORSHIP_IMAGE}
            alt="Temple inner sanctum with lamps"
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="relative z-10 flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary-400">Need guidance?</p>
              <h3 className="font-serif text-2xl font-semibold text-neutral-50 sm:text-3xl">
                Speak with our Temple Office
              </h3>
              <p className="max-w-lg text-[15px] leading-[1.6] text-primary-100">
                Visitors unfamiliar with the sequence are welcome to contact the temple office before
                their visit for personal guidance.
              </p>
            </div>
            <a
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-secondary-500 px-7 py-3.5 text-sm font-semibold text-primary-900 transition hover:bg-secondary-400"
            >
              Contact the Office
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
