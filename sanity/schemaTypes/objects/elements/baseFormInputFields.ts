import { defineField } from "sanity";

/**
 * Spread these into any form-input element schema. They cover the fields
 * every editor needs to configure on a form field.
 */
export const baseFormInputFields = [
  defineField({
    name: "label",
    title: "Label",
    type: "string",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "name",
    title: "Field Name (data key)",
    type: "string",
    description:
      'The key submitted to the server (e.g. "email"). Letters, numbers, underscores only.',
    validation: (Rule) =>
      Rule.required()
        .min(1)
        .max(64)
        .regex(/^[a-zA-Z_][a-zA-Z0-9_]*$/, "Letters, numbers, underscores only — no spaces."),
  }),
  defineField({
    name: "required",
    title: "Required",
    type: "boolean",
    initialValue: false,
  }),
  defineField({
    name: "placeholder",
    title: "Placeholder",
    type: "string",
  }),
  defineField({
    name: "helpText",
    title: "Help Text",
    type: "string",
    description: "Shown under the field when there's no error.",
  }),
  defineField({
    name: "defaultValue",
    title: "Default Value",
    type: "string",
  }),
];
