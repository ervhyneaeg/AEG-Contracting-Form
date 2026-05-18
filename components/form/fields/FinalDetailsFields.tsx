"use client";

import { UploadCloud, X } from "lucide-react";
import { useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import type { FormValues } from "@/lib/form-schema";

import { FormField } from "./FormField";

const ACCEPTED_TYPES = "image/png,image/jpeg,image/gif,application/pdf,.doc,.docx,.xls,.xlsx,.csv";

export function FinalDetailsFields() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormValues>();
  const [previewName, setPreviewName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex flex-col gap-6">
      {/* Headshot upload — wiring lands in Phase 2 (Sanity Assets) */}
      <FormField
        label="Professional Headshot"
        optional
        hint="PDF, DOC/DOCX, XLS/CSV, JPG/JPEG, PNG, GIF — max 10 MB. (Upload wires up in Phase 2)"
        error={errors.headshot ? "Upload failed" : undefined}
      >
        <Controller
          control={control}
          name="headshot"
          render={({ field }) => {
            const file = field.value as File | undefined;
            return (
              <div
                role="button"
                tabIndex={0}
                onClick={() => inputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    inputRef.current?.click();
                  }
                }}
                className="group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gold/25 bg-card/30 px-6 py-12 text-center transition-colors hover:border-gold/50"
              >
                {file || previewName ? (
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-foreground">
                      {file?.name || previewName}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        field.onChange(undefined);
                        setPreviewName(null);
                        if (inputRef.current) inputRef.current.value = "";
                      }}
                      aria-label="Remove file"
                      className="rounded-full p-1 text-muted-foreground hover:bg-gold/10 hover:text-gold"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 transition-colors group-hover:bg-gold/20">
                      <UploadCloud className="h-7 w-7 text-gold/80" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Click to upload</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        PDF, DOC/DOCX, XLS/CSV, JPG/JPEG, PNG, GIF
                      </p>
                    </div>
                  </>
                )}
                <input
                  ref={inputRef}
                  type="file"
                  accept={ACCEPTED_TYPES}
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    field.onChange(f);
                    setPreviewName(f?.name || null);
                  }}
                />
              </div>
            );
          }}
        />
      </FormField>

      <FormField
        label="Anything Else We Should Know?"
        optional
        htmlFor="anythingElse"
        error={errors.anythingElse?.message}
      >
        <Textarea
          id="anythingElse"
          rows={5}
          placeholder="Type your message here"
          {...register("anythingElse")}
        />
      </FormField>

      <FormField label="Consent" error={errors.consent?.message}>
        <Controller
          control={control}
          name="consent"
          render={({ field }) => (
            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gold/15 bg-card/40 p-4 text-sm text-muted-foreground transition-colors hover:border-gold/30">
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
                className="mt-0.5"
              />
              <span>
                I confirm the information provided is accurate to the best of my knowledge,
                and I consent to be contacted by{" "}
                <span className="font-semibold text-foreground">Andreas Empire Group</span>{" "}
                regarding onboarding, scheduling, and contracting.
              </span>
            </label>
          )}
        />
      </FormField>
    </div>
  );
}
