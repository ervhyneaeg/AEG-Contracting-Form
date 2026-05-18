"use client";

import { ChevronRight, ShieldCheck, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function StepShell({
  icon: Icon = ShieldCheck,
  title,
  subtitle,
  helpText,
  stepNumber,
  totalSteps,
  isFirst,
  isLast,
  onNext,
  onBack,
  children,
  primaryLabel,
}: {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  helpText?: string;
  stepNumber: number;
  totalSteps: number;
  isFirst?: boolean;
  isLast?: boolean;
  onNext?: () => void;
  onBack?: () => void;
  children: React.ReactNode;
  primaryLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-gold/20 bg-card/40 backdrop-blur-sm">
      {/* gold corner accent */}
      <div className="absolute right-0 top-0 h-32 w-32 bg-gradient-to-bl from-gold/10 to-transparent" />

      <div className="relative p-8 sm:p-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
              <Icon className="h-5 w-5 text-gold" />
            </div>
            <div>
              <h2 className="font-display text-3xl tracking-wide text-foreground sm:text-4xl">
                {title}
              </h2>
              {subtitle && <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>}
            </div>
          </div>
          <span
            className={cn(
              "shrink-0 rounded-md border border-gold/30 bg-gold/5 px-3 py-2 text-xs font-semibold tracking-[0.15em] uppercase text-gold",
            )}
          >
            Step {stepNumber} of {totalSteps}
          </span>
        </div>

        {/* Content */}
        <div className="mt-8">{children}</div>

        {/* Footer */}
        <div className="mt-10 flex flex-col items-stretch gap-4 border-t border-gold/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3 text-xs text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold/60" />
            <p className="max-w-md">
              {helpText ||
                "Please ensure all information matches your legal documents. Accurate information helps us process your contracting faster."}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            {!isFirst && onBack && (
              <Button variant="outline" size="md" type="button" onClick={onBack}>
                ← Back
              </Button>
            )}
            {onNext && (
              <Button size="md" type="button" onClick={onNext}>
                {primaryLabel || (isLast ? "Submit" : "Save & Continue")}
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
