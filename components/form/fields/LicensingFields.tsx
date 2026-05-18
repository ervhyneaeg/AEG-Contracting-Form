"use client";

import { Hash, MapPin } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CURRENT_SITUATION,
  CURRENT_STATUS,
  YEARS_EXPERIENCE,
} from "@/lib/form-options";
import type { FormValues } from "@/lib/form-schema";

import { FormField } from "./FormField";

export function LicensingFields() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <FormField
        label="State(s) Licensed In"
        required
        htmlFor="statesLicensed"
        error={errors.statesLicensed?.message}
        hint="Two-letter codes separated by commas"
        className="md:col-span-2"
      >
        <Input
          id="statesLicensed"
          icon={<MapPin className="h-4 w-4" />}
          placeholder="e.g. FL, TX, GA"
          {...register("statesLicensed")}
        />
      </FormField>

      <FormField
        label="NPN Number"
        required
        htmlFor="npnNumber"
        error={errors.npnNumber?.message}
        hint="National Producer Number"
      >
        <Input
          id="npnNumber"
          icon={<Hash className="h-4 w-4" />}
          placeholder="National Producer Number"
          {...register("npnNumber")}
        />
      </FormField>

      <FormField
        label="Years of Experience"
        required
        error={errors.yearsExperience?.message}
      >
        <Controller
          control={control}
          name="yearsExperience"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select years of experience" />
              </SelectTrigger>
              <SelectContent>
                {YEARS_EXPERIENCE.map((opt) => (
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
        label="Resident / Non-Resident License Information"
        optional
        htmlFor="licenseInfo"
        error={errors.licenseInfo?.message}
        hint="Anything not covered by the fields above"
        className="md:col-span-2"
      >
        <Textarea
          id="licenseInfo"
          rows={3}
          placeholder="e.g. resident in FL, non-resident in TX (license #...)"
          {...register("licenseInfo")}
        />
      </FormField>

      <FormField label="Current Status" required error={errors.currentStatus?.message}>
        <Controller
          control={control}
          name="currentStatus"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {CURRENT_STATUS.map((opt) => (
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
        label="Current Situation"
        required
        error={errors.currentSituation?.message}
      >
        <Controller
          control={control}
          name="currentSituation"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {CURRENT_SITUATION.map((opt) => (
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
