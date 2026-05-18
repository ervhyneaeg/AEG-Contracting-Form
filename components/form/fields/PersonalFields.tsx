"use client";

import { AtSign, Globe2, MessageSquare, Phone, User } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COMMUNICATION_PREFERENCES, YES_NO } from "@/lib/form-options";
import type { FormValues } from "@/lib/form-schema";

import { FormField } from "./FormField";

export function PersonalFields() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <FormField
        label="Full Legal Name"
        required
        htmlFor="fullLegalName"
        error={errors.fullLegalName?.message}
        hint="As shown on government ID"
        className="md:col-span-2"
      >
        <Input
          id="fullLegalName"
          icon={<User className="h-4 w-4" />}
          placeholder="Jane Q. Public"
          autoComplete="name"
          {...register("fullLegalName")}
        />
      </FormField>

      <FormField
        label="Preferred Name"
        optional
        htmlFor="preferredName"
        error={errors.preferredName?.message}
      >
        <Input
          id="preferredName"
          placeholder="What you go by"
          {...register("preferredName")}
        />
      </FormField>

      <FormField
        label="Phone"
        required
        htmlFor="phone"
        error={errors.phone?.message}
      >
        <Input
          id="phone"
          type="tel"
          icon={<Phone className="h-4 w-4" />}
          placeholder="+1 (555) 000-0000"
          autoComplete="tel"
          {...register("phone")}
        />
      </FormField>

      <FormField
        label="Professional Email"
        required
        htmlFor="email"
        error={errors.email?.message}
        className="md:col-span-2"
      >
        <Input
          id="email"
          type="email"
          icon={<AtSign className="h-4 w-4" />}
          placeholder="you@example.com"
          autoComplete="email"
          {...register("email")}
        />
      </FormField>

      <FormField
        label="Communication Preference"
        required
        error={errors.communicationPreference?.message}
        className="md:col-span-2"
      >
        <Controller
          control={control}
          name="communicationPreference"
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="grid grid-cols-3 gap-3"
            >
              {COMMUNICATION_PREFERENCES.map((opt) => (
                <label
                  key={opt.value}
                  htmlFor={`comm-${opt.value}`}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-gold/15 bg-card/40 px-4 py-3 transition-colors hover:border-gold/35 has-[input:checked]:border-gold has-[input:checked]:bg-gold/5"
                >
                  <RadioGroupItem value={opt.value} id={`comm-${opt.value}`} />
                  <span className="flex items-center gap-2 text-sm">
                    <MessageSquare className="h-3.5 w-3.5 text-gold/60" />
                    {opt.label}
                  </span>
                </label>
              ))}
            </RadioGroup>
          )}
        />
      </FormField>

      <FormField
        label="Are You Bilingual?"
        optional
        error={errors.bilingual?.message}
      >
        <Controller
          control={control}
          name="bilingual"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {YES_NO.map((opt) => (
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
        label="Languages Spoken"
        optional
        htmlFor="languagesSpoken"
        error={errors.languagesSpoken?.message}
      >
        <Input
          id="languagesSpoken"
          icon={<Globe2 className="h-4 w-4" />}
          placeholder="e.g. Spanish, Tagalog"
          {...register("languagesSpoken")}
        />
      </FormField>
    </div>
  );
}
