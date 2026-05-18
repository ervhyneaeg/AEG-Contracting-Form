/**
 * Visible empty-state for page-builder sections.
 * Rendered when fields are missing in draft mode so the editor always sees
 * the block. In published mode, sections with empty critical fields return null.
 */
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function SectionPlaceholder({
  type,
  hint,
  icon: Icon,
  height = "min-h-[200px]",
  className,
}: {
  type: string;
  hint: string;
  icon?: LucideIcon;
  height?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gold/25 bg-card/20 px-6 py-12 text-center transition-all hover:border-gold/55 hover:bg-card/40",
        height,
        className,
      )}
    >
      {Icon && (
        <Icon className="h-8 w-8 text-gold/40 transition-colors group-hover:text-gold/70" />
      )}
      <div>
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gold/80 group-hover:text-gold">
          {type}
        </p>
        <p className="mt-1.5 max-w-md text-xs text-muted-foreground">{hint}</p>
      </div>
    </div>
  );
}

/**
 * Inline dashed text placeholder used inside otherwise-empty section bodies.
 */
export function InlinePlaceholder({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block rounded border border-dashed border-gold/30 px-2 py-0.5 text-gold/60",
        className,
      )}
    >
      {children}
    </span>
  );
}
