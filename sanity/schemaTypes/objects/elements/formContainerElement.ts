import { EnvelopeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { blockStylesField } from "../blockStylesField";

/**
 * Wraps form-input elements in a <form> that submits to /api/forms/submit.
 * Captures all named fields inside via standard FormData (no react state).
 */
export const formContainerElement = defineType({
  name: "formContainerElement",
  title: "Form",
  type: "object",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "formKey",
      title: "Form Key",
      description:
        'Identifies this form in the database (e.g. "contact", "newsletter"). Letters, numbers, dashes only.',
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(40)
          .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, dashes only."),
    }),
    defineField({
      name: "submitLabel",
      title: "Submit Button Label",
      type: "string",
      initialValue: "Submit",
    }),
    defineField({
      name: "successMessage",
      title: "Success Message",
      type: "string",
      initialValue: "Thanks — we'll be in touch shortly.",
    }),
    defineField({
      name: "errorMessage",
      title: "Error Message",
      type: "string",
      initialValue: "Something went wrong. Please try again or contact support.",
    }),
    defineField({
      name: "notifyEmail",
      title: "Notify Email (optional)",
      description:
        "If set, submissions are also emailed here (wires up in Phase 2 via Resend).",
      type: "string",
    }),
    defineField({
      name: "items",
      title: "Form Items",
      type: "array",
      of: [
        defineArrayMember({ type: "textInputElement" }),
        defineArrayMember({ type: "textareaInputElement" }),
        defineArrayMember({ type: "selectInputElement" }),
        defineArrayMember({ type: "radioGroupElement" }),
        defineArrayMember({ type: "checkboxInputElement" }),
        defineArrayMember({ type: "headingElement" }),
        defineArrayMember({ type: "paragraphElement" }),
        defineArrayMember({ type: "buttonElement" }),
      ],
      description: "Drop fields and content blocks here. Add a Submit-kind Button at the bottom.",
    }),
    blockStylesField,
  ],
  preview: {
    select: { formKey: "formKey", itemCount: "items.length" },
    prepare: ({ formKey, itemCount }) => ({
      title: `Form (${formKey || "—"})`,
      subtitle: `${itemCount || 0} item${itemCount === 1 ? "" : "s"}`,
    }),
  },
});
