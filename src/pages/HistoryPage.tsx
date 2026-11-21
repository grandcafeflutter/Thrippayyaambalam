import { ArrowRight, Flame, Sparkles, Sun } from 'lucide-react';
import DarshanTimings from '@/components/DarshanTimings';
import PageBanner from '@/components/PageBanner';
import SectionHeading from '@/components/SectionHeading';
import { ABOUT_IMAGE, ABOUT_TEXT } from '@/data/temple';

const TRIMURTI = [
  {
    name: 'Lord Brahma',
    position: 'Left',
    aspect: 'Creation',
    description: 'The creator of the universe, seated on the left of the sanctum.',
    icon: Sparkles,
  },
  {
    name: 'Lord Shiva (Maheshwara)',
    position: 'Centre',
    aspect: 'Destruction',
    description: 'The transformer who dissolves the old so that the new may arise, seated at the centre.',
    icon: Flame,
  },
  {
    name: 'Lord Vishnu',
    position: 'Right',
    aspect: 'Preservation',
    description: 'The sustainer who protects and maintains the order of creation, seated on the right.',
    icon: Sun,
  },
] as const;

export default function HistoryPage() {
  return (
    <>
      <PageBanner
        eyebrow="Our Heritage"
        title="About the Temple"
        description="A sacred shrine where the three primal aspects of the Almighty stand together in one sanctum."
        image={ABOUT_IMAGE}
      />

      <section className="mx-auto max-w-[1400px] space-y-20 px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
            <SectionHeading title="A Rare Sanctum" align="left" />
            <p className="text-lg leading-[1.5] text-neutral-700">{ABOUT_TEXT}</p>
          </div>
          <DarshanTimings />
        </div>

        <div className="space-y-10">
          <SectionHeading
            eyebrow="The Trimurti"
            title="Three Aspects, One Pedestal"
            description="The Hindu triad representing the three primal aspects of Parabrahma (Almighty God)."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {TRIMURTI.map((deity) => (
              <article
                key={deity.name}
                className="group rounded-2xl border border-neutral-200 bg-neutral-50 p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-secondary-400 hover:shadow-xl"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-700 text-secondary-300 transition group-hover:bg-secondary-500 group-hover:text-primary-900">
                  <deity.icon className="h-7 w-7" />
                </span>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-accent-700">
                  {deity.position} of the sanctum
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-primary-700">{deity.name}</h3>
                <p className="mt-2 font-semibold text-secondary-800">{deity.aspect}</p>
                <p className="mt-4 text-neutral-600">{deity.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-primary-800 p-10 text-neutral-50 shadow-xl sm:flex-row sm:items-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-secondary-300">Plan your darshan</h2>
            <p className="text-primary-50">Join the morning and evening poojas to experience the temple at its most vibrant.</p>
          </div>
          <a
            href="/pooja"
            className="inline-flex items-center gap-2 rounded-full bg-secondary-500 px-6 py-3 text-sm font-semibold text-primary-900 transition hover:bg-secondary-400"
          >
            View poojas
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </>
  );
}
