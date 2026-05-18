import { TextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { blockStylesField } from "../blockStylesField";
import { baseFormInputFields } from "./baseFormInputFields";

export const textareaInputElement = defineType({
  name: "textareaInputElement",
  title: "Textarea",
  type: "object",
  icon: TextIcon,
  fields: [
    ...baseFormInputFields,
    defineField({
      name: "lineCount",
      title: "Visible Rows",
      type: "number",
      initialValue: 4,
      validation: (Rule) => Rule.min(2).max(20),
    }),
    defineField({ name: "maxLength", title: "Max Length (chars)", type: "number" }),
    blockStylesField,
  ],
  preview: {
    select: { label: "label", name: "name" },
    prepare: ({ label, name }) => ({
      title: label || "Textarea",
      subtitle: `name="${name || "—"}"`,
    }),
  },
});
