"use client";

import { Briefcase, ClipboardList, Sparkles, UserCircle, type LucideIcon } from "lucide-react";
import { useState } from "react";

import { StepIndicator, type Step } from "./StepIndicator";
import { StepShell } from "./StepShell";

const DEFAULT_STEPS: Array<Step & {
  title: string;
  subtitle: string;
  helpText: string;
  icon: LucideIcon;
}> = [
  {
    key: "personal",
    label: "Personal",
    title: "Personal Information",
    subtitle: "Tell us how to reach you and what to call you.",
    helpText:
      "All information is kept strictly confidential and used solely for AEG onboarding purposes.",
    icon: UserCircle,
  },
  {
    key: "licensing",
    label: "Licensing",
    title: "Licensing & Experience",
    subtitle: "Help us understand your current professional standing.",
    helpText: "Please ensure license info matches your state records.",
    icon: ClipboardList,
  },
  {
    key: "careerGoals",
    label: "Career Goals",
    title: "Career Goals & Interests",
    subtitle: "Help us tailor your onboarding to your goals.",
    helpText: "There are no wrong answers — this helps us match you to the right hierarchy.",
    icon: Sparkles,
  },
  {
    key: "finalDetails",
    label: "Final Details",
    title: "Final Details",
    subtitle: "A few last items to complete your profile.",
    helpText: "Almost there — uploading a headshot is optional but helps your team find you.",
    icon: Briefcase,
  },
];

type StepCopy = {
  key?: string;
  label?: string;
  title?: string;
  subtitle?: string;
  helpText?: string;
};

export function ContractingForm({ stepsCopy }: { stepsCopy?: StepCopy[] | null }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Merge Sanity copy (if any) over defaults — Sanity is source of truth for labels/help text.
  const steps = DEFAULT_STEPS.map((d) => {
    const override = stepsCopy?.find((s) => s.key === d.key);
    return {
      ...d,
      label: override?.label || d.label,
      title: override?.title || d.title,
      subtitle: override?.subtitle || d.subtitle,
      helpText: override?.helpText || d.helpText,
    };
  });

  const current = steps[currentIndex];
  const next = () => setCurrentIndex((i) => Math.min(i + 1, steps.length - 1));
  const back = () => setCurrentIndex((i) => Math.max(i - 1, 0));

  return (
    <div className="space-y-10">
      <StepIndicator
        steps={steps.map(({ key, label }) => ({ key, label }))}
        currentIndex={currentIndex}
        onStepClick={(idx) => idx <= currentIndex && setCurrentIndex(idx)}
      />

      <StepShell
        icon={current.icon}
        title={current.title}
        subtitle={current.subtitle}
        helpText={current.helpText}
        stepNumber={currentIndex + 1}
        totalSteps={steps.length}
        isFirst={currentIndex === 0}
        isLast={currentIndex === steps.length - 1}
        onNext={next}
        onBack={back}
      >
        <div className="rounded-2xl border border-dashed border-gold/25 bg-background/40 px-6 py-12 text-center">
          <p className="text-sm tracking-wide uppercase text-gold/70">
            {current.label} fields
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Phase 1b will wire the actual {current.label.toLowerCase()} fields here.
          </p>
        </div>
      </StepShell>
    </div>
  );
}
