"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Briefcase,
  CheckCircle2,
  ClipboardList,
  Sparkles,
  UserCircle,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { CareerGoalsFields } from "./fields/CareerGoalsFields";
import { FinalDetailsFields } from "./fields/FinalDetailsFields";
import { LicensingFields } from "./fields/LicensingFields";
import { PersonalFields } from "./fields/PersonalFields";
import { StepIndicator, type Step } from "./StepIndicator";
import { StepShell } from "./StepShell";

import {
  formDefaults,
  type FormValues,
  fullFormSchema,
  STEP_FIELDS,
  type StepKey,
} from "@/lib/form-schema";

type StepMeta = Step & {
  title: string;
  subtitle: string;
  helpText: string;
  icon: LucideIcon;
  Fields: React.ComponentType;
};

const DEFAULT_STEPS: StepMeta[] = [
  {
    key: "personal",
    label: "Personal",
    title: "Personal Information",
    subtitle: "Tell us how to reach you and what to call you.",
    helpText:
      "All information is kept strictly confidential and used solely for AEG onboarding purposes.",
    icon: UserCircle,
    Fields: PersonalFields,
  },
  {
    key: "licensing",
    label: "Licensing",
    title: "Licensing & Experience",
    subtitle: "Help us understand your current professional standing.",
    helpText: "Please ensure license info matches your state records.",
    icon: ClipboardList,
    Fields: LicensingFields,
  },
  {
    key: "careerGoals",
    label: "Career Goals",
    title: "Career Goals & Interests",
    subtitle: "Help us tailor your onboarding to your goals.",
    helpText: "There are no wrong answers — this helps us match you to the right hierarchy.",
    icon: Sparkles,
    Fields: CareerGoalsFields,
  },
  {
    key: "finalDetails",
    label: "Final Details",
    title: "Final Details",
    subtitle: "A few last items to complete your profile.",
    helpText:
      "Almost there. Uploading a headshot is optional but helps your upline team find you.",
    icon: Briefcase,
    Fields: FinalDetailsFields,
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
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(fullFormSchema),
    defaultValues: formDefaults as FormValues,
    mode: "onBlur",
  });

  // Merge Sanity copy over defaults so the editor can tune labels/help text.
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
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === steps.length - 1;

  const goNext = async () => {
    const stepFields = STEP_FIELDS[current.key as StepKey];
    const valid = await form.trigger(stepFields);
    if (!valid) return;

    if (isLast) {
      // Final step — handleSubmit re-runs full-schema validation and gives us
      // a fully-typed payload. Phase 2 will POST this to /api/submissions.
      await form.handleSubmit(
        (values) => {
          // eslint-disable-next-line no-console
          console.log("Contracting form submitted:", values);
          setSubmitted(true);
        },
        () => {
          /* validation failures already shown inline */
        },
      )();
      return;
    }
    setCurrentIndex((i) => i + 1);
  };

  const goBack = () => setCurrentIndex((i) => Math.max(i - 1, 0));

  if (submitted) {
    return (
      <div className="rounded-3xl border border-gold/30 bg-card/40 px-8 py-16 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-gold" />
        <h2 className="font-display mt-5 text-3xl tracking-tight text-foreground">
          Application received
        </h2>
        <p className="mt-3 text-muted-foreground">
          We&apos;ll review your contracting details and reach out via your preferred channel.
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          (Submissions persist to the database in Phase 2.)
        </p>
      </div>
    );
  }

  const Fields = current.Fields;

  return (
    <FormProvider {...form}>
      <div className="space-y-10">
        <StepIndicator
          steps={steps.map(({ key, label }) => ({ key, label }))}
          currentIndex={currentIndex}
          onStepClick={(idx) => idx < currentIndex && setCurrentIndex(idx)}
        />

        <StepShell
          icon={current.icon}
          title={current.title}
          subtitle={current.subtitle}
          helpText={current.helpText}
          stepNumber={currentIndex + 1}
          totalSteps={steps.length}
          isFirst={isFirst}
          isLast={isLast}
          onNext={goNext}
          onBack={goBack}
          primaryLabel={isLast ? "Submit Application" : undefined}
        >
          <Fields />
        </StepShell>
      </div>
    </FormProvider>
  );
}
