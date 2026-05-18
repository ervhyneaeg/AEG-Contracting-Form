import { ImagesIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { blockStylesField } from "./blockStylesField";

export const logosSectionType = defineType({
  name: "logosSection",
  title: "Logo Cloud",
  type: "object",
  icon: ImagesIcon,
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "logos",
      title: "Logos",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "image",
              title: "Logo",
              type: "image",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", title: "Alt", type: "string" })],
            }),
            defineField({
              name: "href",
              title: "Link (optional)",
              type: "url",
              validation: (Rule) => Rule.uri({ allowRelative: true }),
            }),
          ],
          preview: { select: { title: "name", media: "image" } },
        }),
      ],
    }),
    defineField({ name: "paddingTop", title: "Padding Top", type: "number", initialValue: 64 }),
    defineField({ name: "paddingBottom", title: "Padding Bottom", type: "number", initialValue: 64 }),
    blockStylesField,
  ],
  preview: {
    select: { title: "title", eyebrow: "eyebrow" },
    prepare: ({ title, eyebrow }) => ({
      title: title || "Logo Cloud",
      subtitle: eyebrow || "Logos",
    }),
  },
});
