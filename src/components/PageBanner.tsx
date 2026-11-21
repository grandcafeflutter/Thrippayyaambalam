type PageBannerProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
};

export default function PageBanner({ eyebrow, title, description, image }: PageBannerProps) {
  return (
    <section className="relative isolate overflow-hidden bg-primary-800">
      <img src={image} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-900 via-primary-900/85 to-primary-800/40" />
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.2em] text-secondary-300">{eyebrow}</p>
        <h1 className="animate-fade-up mt-3 max-w-3xl text-4xl font-semibold text-neutral-50 sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <span className="mt-6 block h-0.5 w-20 rounded-full bg-secondary-500" />
        <p className="animate-fade-up mt-6 max-w-2xl text-base leading-[1.5] text-primary-50 sm:text-lg">{description}</p>
      </div>
    </section>
  );
}
