import { z } from "zod";

// ============================================================
// Per-step Zod schemas
// Each represents one tab of the contracting form. Combined for final submit.
// ============================================================

export const personalSchema = z.object({
  fullLegalName: z
    .string()
    .min(2, "Full legal name is required (as on government ID).")
    .max(120),
  preferredName: z.string().max(80).optional().or(z.literal("")),
  phone: z
    .string()
    .regex(/^[\d\s\-+()]+$/, "Phone may only contain digits, spaces, +, (, ), or -.")
    .min(10, "A valid phone number is required."),
  email: z.string().email("A valid email is required.").max(160),
  communicationPreference: z.enum(["call", "text", "email"], {
    errorMap: () => ({ message: "Pick how you'd prefer to be contacted." }),
  }),
  bilingual: z.enum(["yes", "no"]).optional(),
  languagesSpoken: z.string().max(120).optional().or(z.literal("")),
});

export const licensingSchema = z.object({
  statesLicensed: z
    .string()
    .min(1, "List at least one state (e.g. FL, TX, GA).")
    .max(200),
  npnNumber: z.string().min(1, "NPN is required.").max(40),
  licenseInfo: z.string().max(500).optional().or(z.literal("")),
  yearsExperience: z.string().min(1, "Years of experience is required."),
  currentStatus: z.string().min(1, "Pick the option that best fits."),
  currentSituation: z.string().min(1, "Pick the option that best fits."),
});

export const careerGoalsSchema = z.object({
  salesInterest: z.string().min(1, "Pick your primary interest."),
  monthlyProductionGoal: z.string().min(1, "Pick a production target."),
  marketSelection: z.string().min(1, "Pick a market focus."),
  whatLookingFor: z.string().min(1, "Pick what you're looking for."),
});

export const finalDetailsSchema = z.object({
  // Phase 2 will refine this to z.instanceof(File) when wiring Sanity Assets uploads.
  headshot: z.unknown().optional(),
  anythingElse: z.string().max(2000).optional().or(z.literal("")),
  consent: z
    .boolean()
    .refine((v) => v === true, "You must confirm to submit your application."),
});

export const fullFormSchema = personalSchema
  .merge(licensingSchema)
  .merge(careerGoalsSchema)
  .merge(finalDetailsSchema);

export type PersonalValues = z.infer<typeof personalSchema>;
export type LicensingValues = z.infer<typeof licensingSchema>;
export type CareerGoalsValues = z.infer<typeof careerGoalsSchema>;
export type FinalDetailsValues = z.infer<typeof finalDetailsSchema>;
export type FormValues = z.infer<typeof fullFormSchema>;

// ============================================================
// Step → field mapping (used by react-hook-form's `trigger()` for per-step validation)
// ============================================================

export const STEP_KEYS = ["personal", "licensing", "careerGoals", "finalDetails"] as const;
export type StepKey = (typeof STEP_KEYS)[number];

export const STEP_FIELDS: Record<StepKey, Array<keyof FormValues>> = {
  personal: [
    "fullLegalName",
    "preferredName",
    "phone",
    "email",
    "communicationPreference",
    "bilingual",
    "languagesSpoken",
  ],
  licensing: [
    "statesLicensed",
    "npnNumber",
    "licenseInfo",
    "yearsExperience",
    "currentStatus",
    "currentSituation",
  ],
  careerGoals: ["salesInterest", "monthlyProductionGoal", "marketSelection", "whatLookingFor"],
  finalDetails: ["headshot", "anythingElse", "consent"],
};

export const formDefaults: Partial<FormValues> = {
  fullLegalName: "",
  preferredName: "",
  phone: "",
  email: "",
  communicationPreference: undefined,
  bilingual: undefined,
  languagesSpoken: "",
  statesLicensed: "",
  npnNumber: "",
  licenseInfo: "",
  yearsExperience: "",
  currentStatus: "",
  currentSituation: "",
  salesInterest: "",
  monthlyProductionGoal: "",
  marketSelection: "",
  whatLookingFor: "",
  anythingElse: "",
  consent: false,
};
