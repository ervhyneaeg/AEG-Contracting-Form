import { TextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { blockStylesField } from "../blockStylesField";

export const headingElement = defineType({
  name: "headingElement",
  title: "Heading",
  type: "object",
  icon: TextIcon,
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "level",
      title: "Heading Level",
      type: "string",
      options: {
        list: [
          { title: "H1 (page title)", value: "h1" },
          { title: "H2 (section)", value: "h2" },
          { title: "H3 (subsection)", value: "h3" },
          { title: "H4 (small)", value: "h4" },
        ],
      },
      initialValue: "h2",
    }),
    defineField({
      name: "tone",
      title: "Color Tone",
      type: "string",
      options: {
        list: [
          { title: "Gold gradient", value: "gold-gradient" },
          { title: "Gold solid", value: "gold" },
          { title: "Foreground (default)", value: "foreground" },
          { title: "Muted", value: "muted" },
        ],
      },
      initialValue: "foreground",
    }),
    blockStylesField,
  ],
  preview: {
    select: { text: "text", level: "level" },
    prepare: ({ text, level }) => ({
      title: text || "Heading",
      subtitle: (level || "h2").toUpperCase(),
    }),
  },
});
