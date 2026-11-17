type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
};

export default function SectionHeading({ eyebrow, title, description, align = 'center' }: SectionHeadingProps) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <div className={`flex flex-col gap-3 ${alignment}`}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-700">{eyebrow}</p>
      )}
      <div className="flex items-center gap-4">
        {align === 'center' && <span className="hidden h-px w-12 bg-secondary-500 sm:block" />}
        <h2 className="text-3xl font-semibold text-primary-700 sm:text-4xl">{title}</h2>
        {align === 'center' && <span className="hidden h-px w-12 bg-secondary-500 sm:block" />}
      </div>
      {description && <p className="max-w-2xl text-neutral-600">{description}</p>}
    </div>
  );
}
