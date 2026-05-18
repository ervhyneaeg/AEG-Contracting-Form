/**
 * Placeholder AEG brand mark — gold crowned lion glyph swapped out for a
 * stylized monogram until the real logo asset is added in Sanity.
 */
import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-2 text-center", className)}>
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold bg-background shadow-gold">
        <span className="font-display text-3xl font-bold text-gold">AEG</span>
        <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-gold" aria-hidden>
          ♕
        </span>
      </div>
      <div>
        <p className="font-display text-xs tracking-[0.3em] uppercase text-gold/80">
          Andreas Empire Group
        </p>
        <p className="text-[10px] tracking-[0.4em] uppercase text-gold/50">
          Financial Services
        </p>
      </div>
    </div>
  );
}
