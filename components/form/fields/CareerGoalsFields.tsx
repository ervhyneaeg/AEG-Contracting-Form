"use client";

import { Controller, useFormContext } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MARKET_SELECTION,
  MONTHLY_PRODUCTION_GOAL,
  SALES_INTEREST,
  WHAT_LOOKING_FOR,
} from "@/lib/form-options";
import type { FormValues } from "@/lib/form-schema";

import { FormField } from "./FormField";

export function CareerGoalsFields() {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <FormField label="Sales Interest" required error={errors.salesInterest?.message}>
        <Controller
          control={control}
          name="salesInterest"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {SALES_INTEREST.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </FormField>

      <FormField
        label="Monthly Production Goal"
        required
        error={errors.monthlyProductionGoal?.message}
      >
        <Controller
          control={control}
          name="monthlyProductionGoal"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {MONTHLY_PRODUCTION_GOAL.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </FormField>

      <FormField
        label="Market Selection"
        required
        error={errors.marketSelection?.message}
        hint="What market are you focused on (or interested in)?"
      >
        <Controller
          control={control}
          name="marketSelection"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {MARKET_SELECTION.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </FormField>

      <FormField
        label="What Are You Looking For?"
        required
        error={errors.whatLookingFor?.message}
      >
        <Controller
          control={control}
          name="whatLookingFor"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {WHAT_LOOKING_FOR.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </FormField>
    </div>
  );
}
