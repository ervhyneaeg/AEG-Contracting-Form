import { BlockquoteIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { blockStylesField } from "../blockStylesField";

export const paragraphElement = defineType({
  name: "paragraphElement",
  title: "Paragraph",
  type: "object",
  icon: BlockquoteIcon,
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "size",
      title: "Size",
      type: "string",
      options: {
        list: [
          { title: "Small", value: "sm" },
          { title: "Base", value: "base" },
          { title: "Large", value: "lg" },
          { title: "XL (lead)", value: "xl" },
        ],
      },
      initialValue: "base",
    }),
    blockStylesField,
  ],
  preview: {
    select: { text: "text" },
    prepare: ({ text }) => ({
      title: "Paragraph",
      subtitle: text ? text.slice(0, 60) : "Empty",
    }),
  },
});
