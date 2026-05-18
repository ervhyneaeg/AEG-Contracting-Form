import { CheckmarkIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { blockStylesField } from "../blockStylesField";
import { baseFormInputFields } from "./baseFormInputFields";

export const checkboxInputElement = defineType({
  name: "checkboxInputElement",
  title: "Checkbox",
  type: "object",
  icon: CheckmarkIcon,
  fields: [
    ...baseFormInputFields,
    defineField({
      name: "checkedLabel",
      title: "Checked Label (overrides Label when checked)",
      type: "string",
    }),
    blockStylesField,
  ],
  preview: {
    select: { label: "label", name: "name" },
    prepare: ({ label, name }) => ({
      title: label || "Checkbox",
      subtitle: `name="${name || "—"}"`,
    }),
  },
});
