import { SelectIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { blockStylesField } from "../blockStylesField";
import { baseFormInputFields } from "./baseFormInputFields";

export const selectInputElement = defineType({
  name: "selectInputElement",
  title: "Select / Dropdown",
  type: "object",
  icon: SelectIcon,
  fields: [
    ...baseFormInputFields,
    defineField({
      name: "options",
      title: "Options",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Value (data)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label (display)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
    }),
    blockStylesField,
  ],
  preview: {
    select: { label: "label", name: "name", count: "options.length" },
    prepare: ({ label, name, count }) => ({
      title: label || "Select",
      subtitle: `${count || 0} options · name="${name || "—"}"`,
    }),
  },
});
