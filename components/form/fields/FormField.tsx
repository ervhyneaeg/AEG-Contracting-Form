"use client";

import { AlertCircle } from "lucide-react";
import type { ReactNode } from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/**
 * Visual wrapper for a form input — label on top, control in middle,
 * error/help text below. Use inside react-hook-form Controller / register
 * patterns rather than wrapping the input itself.
 */
export function FormField({
  label,
  required,
  optional,
  htmlFor,
  error,
  hint,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  htmlFor?: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <Label htmlFor={htmlFor} className="flex items-baseline justify-between">
        <span>
          {label}
          {required && <span className="ml-1 text-gold">*</span>}
        </span>
        {optional && (
          <span className="text-xs font-normal text-muted-foreground">Optional</span>
        )}
      </Label>
      {children}
      {error ? (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-destructive-foreground">
          <AlertCircle className="h-3.5 w-3.5" />
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
