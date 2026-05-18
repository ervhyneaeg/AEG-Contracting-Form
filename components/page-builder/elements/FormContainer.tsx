"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { type CSSProperties, type ReactNode, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Renders an editor-built form (formContainerElement). Captures all named
 * inputs inside via standard FormData, POSTs to /api/forms/submit, and shows
 * a success or error message inline.
 */
export function FormContainer({
  formKey,
  submitLabel = "Submit",
  successMessage = "Thanks — we'll be in touch shortly.",
  errorMessage = "Something went wrong. Please try again.",
  className,
  style,
  children,
  hasSubmitInside,
}: {
  formKey: string;
  submitLabel?: string;
  successMessage?: string;
  errorMessage?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  hasSubmitInside?: boolean;
}) {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("submitting");
    setErrorDetail(null);

    const formEl = e.currentTarget;
    const data = new FormData(formEl);
    data.set("__formKey", formKey);

    try {
      const res = await fetch("/api/forms/submit", {
        method: "POST",
        body: data,
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Submit failed");
      }
      setState("success");
      formEl.reset();
    } catch (err) {
      setState("error");
      setErrorDetail(err instanceof Error ? err.message : null);
    }
  };

  if (state === "success") {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-3 rounded-2xl border border-gold/30 bg-card/40 px-6 py-12 text-center",
          className,
        )}
        style={style}
      >
        <CheckCircle2 className="h-10 w-10 text-gold" />
        <p className="text-base font-medium text-foreground">{successMessage}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("flex flex-col gap-5", className)}
      style={style}
      noValidate
    >
      {children}

      {state === "error" && (
        <p className="rounded-md border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive-foreground">
          {errorDetail ? `${errorMessage} (${errorDetail})` : errorMessage}
        </p>
      )}

      {!hasSubmitInside && (
        <button
          type="submit"
          disabled={state === "submitting"}
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-b from-gold to-gold-deep px-8 py-3 text-sm font-semibold text-black shadow-gold transition-all hover:from-gold-bright disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitLabel}
        </button>
      )}
    </form>
  );
}
