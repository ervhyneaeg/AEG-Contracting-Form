"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export type Step = {
  key: string;
  label: string;
};

export function StepIndicator({
  steps,
  currentIndex,
  onStepClick,
}: {
  steps: Step[];
  currentIndex: number;
  onStepClick?: (index: number) => void;
}) {
  return (
    <div className="relative mx-auto w-full max-w-3xl px-4">
      {/* Connector line behind dots */}
      <div className="absolute left-0 right-0 top-6 mx-auto flex h-px max-w-[calc(100%-3rem)] -translate-y-1/2 items-center px-12">
        <div className="h-px w-full bg-gold/20" />
        <div
          className="absolute left-12 h-px bg-gradient-to-r from-gold to-gold-bright transition-all duration-500"
          style={{
            width: `calc(${(currentIndex / (steps.length - 1)) * 100}% - ${
              currentIndex === steps.length - 1 ? "0px" : "0px"
            })`,
            maxWidth: "calc(100% - 6rem)",
          }}
        />
      </div>

      <ol className="relative flex items-start justify-between">
        {steps.map((step, idx) => {
          const completed = idx < currentIndex;
          const active = idx === currentIndex;
          const clickable = !!onStepClick && idx <= currentIndex;
          return (
            <li key={step.key} className="flex flex-1 flex-col items-center">
              <button
                type="button"
                onClick={clickable ? () => onStepClick(idx) : undefined}
                disabled={!clickable}
                className={cn(
                  "relative flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold transition-all",
                  active &&
                    "bg-gradient-to-b from-gold to-gold-deep text-black shadow-gold ring-2 ring-gold/40 ring-offset-4 ring-offset-background",
                  completed &&
                    "bg-gold/20 text-gold ring-1 ring-gold/40 hover:bg-gold/30",
                  !active &&
                    !completed &&
                    "bg-card text-foreground/40 ring-1 ring-gold/15",
                  clickable && !active && "cursor-pointer",
                  !clickable && "cursor-not-allowed",
                )}
                aria-current={active ? "step" : undefined}
              >
                {completed ? <Check className="h-5 w-5" /> : idx + 1}
              </button>
              <div className="mt-3 text-center">
                <p
                  className={cn(
                    "text-[10px] font-semibold tracking-[0.2em] uppercase",
                    active ? "text-gold" : completed ? "text-gold/70" : "text-muted-foreground",
                  )}
                >
                  Step {idx + 1}
                </p>
                <p
                  className={cn(
                    "mt-1 text-xs font-medium tracking-wide",
                    active || completed ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {step.label}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
