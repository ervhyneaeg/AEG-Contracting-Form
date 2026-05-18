import { sql } from "drizzle-orm";
import {
  index,
  inet,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const submissionStatus = pgEnum("submission_status", [
  "draft",
  "submitted",
  "in_review",
  "approved",
  "rejected",
]);

export const stepKey = pgEnum("step_key", [
  "personal",
  "licensing",
  "career_goals",
  "final_details",
]);

export const fileKind = pgEnum("file_kind", [
  "headshot",
  "license_doc",
  "w9",
  "other",
]);

/**
 * One row per contracting application.
 * Per-step data is jsonb so copy/labels can evolve without migrations;
 * strict zod validation at the API boundary keeps the JSONB clean.
 */
export const submissions = pgTable(
  "submissions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull(),
    status: submissionStatus("status").notNull().default("draft"),
    currentStep: stepKey("current_step").notNull().default("personal"),

    personal: jsonb("personal").$type<Record<string, unknown>>().default({}),
    licensing: jsonb("licensing").$type<Record<string, unknown>>().default({}),
    careerGoals: jsonb("career_goals").$type<Record<string, unknown>>().default({}),
    finalDetails: jsonb("final_details").$type<Record<string, unknown>>().default({}),

    // Magic-link resume token (rotated per email send).
    resumeToken: text("resume_token").unique(),
    resumeTokenExpiresAt: timestamp("resume_token_expires_at", { withTimezone: true }),

    ip: inet("ip"),
    userAgent: text("user_agent"),

    startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => sql`now()`),
    submittedAt: timestamp("submitted_at", { withTimezone: true }),
  },
  (t) => [
    index("submissions_email_idx").on(t.email),
    index("submissions_status_idx").on(t.status),
  ],
);

export type Submission = typeof submissions.$inferSelect;
export type NewSubmission = typeof submissions.$inferInsert;

/**
 * File uploads. Files live in Sanity Assets; we only track metadata.
 */
export const submissionFiles = pgTable(
  "submission_files",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    submissionId: uuid("submission_id")
      .notNull()
      .references(() => submissions.id, { onDelete: "cascade" }),
    kind: fileKind("kind").notNull(),
    sanityAssetId: text("sanity_asset_id").notNull(),
    url: text("url").notNull(),
    filename: text("filename"),
    mimeType: text("mime_type"),
    sizeBytes: integer("size_bytes"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("submission_files_submission_idx").on(t.submissionId)],
);

export type SubmissionFile = typeof submissionFiles.$inferSelect;

/**
 * Append-only audit trail (step saved, magic-link sent, status changed, etc.).
 */
export const auditLog = pgTable(
  "audit_log",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    submissionId: uuid("submission_id").references(() => submissions.id, {
      onDelete: "cascade",
    }),
    event: text("event").notNull(),
    payload: jsonb("payload").$type<Record<string, unknown>>().default({}),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("audit_log_submission_idx").on(t.submissionId),
    index("audit_log_event_idx").on(t.event),
  ],
);
