/**
 * Gold serif "AEG Contracting" hero atop the contracting page.
 * Decorative skyline backdrop via CSS gradient — replace with an image asset later.
 */

export function HeaderHero({
  eyebrow,
  title,
  tagline,
}: {
  eyebrow?: string;
  title?: string;
  tagline?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-gold/15">
      {/* Backdrop layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(20%_0.02_70/_0.4)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,oklch(8%_0.005_60)_85%)]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-16 text-center md:py-24">
        {eyebrow && (
          <p className="mb-3 text-xs tracking-[0.4em] uppercase text-gold/70">{eyebrow}</p>
        )}
        <h1 className="font-display text-6xl font-bold tracking-tight text-transparent bg-gradient-to-b from-gold-bright via-gold to-gold-deep bg-clip-text sm:text-7xl md:text-8xl">
          {title || "AEG Contracting"}
        </h1>
        <div className="mt-4 h-px w-32 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        <p className="mt-5 max-w-2xl text-sm tracking-[0.25em] uppercase text-foreground/80 sm:text-base">
          {tagline || "Build your empire. Legacy starts here."}
        </p>
      </div>
    </section>
  );
}
