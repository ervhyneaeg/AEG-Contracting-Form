import { CommentIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { blockStylesField } from "./blockStylesField";

export const testimonialsSectionType = defineType({
  name: "testimonialsSection",
  title: "Testimonials",
  type: "object",
  icon: CommentIcon,
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: { list: ["grid", "single"] },
      initialValue: "grid",
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "quote", title: "Quote", type: "text", rows: 4 }),
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "role", title: "Role / Title", type: "string" }),
            defineField({
              name: "avatar",
              title: "Avatar",
              type: "image",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", title: "Alt", type: "string" })],
            }),
            defineField({
              name: "rating",
              title: "Rating (1-5)",
              type: "number",
              validation: (Rule) => Rule.min(1).max(5),
            }),
          ],
          preview: { select: { title: "name", subtitle: "role", media: "avatar" } },
        }),
      ],
    }),
    defineField({ name: "paddingTop", title: "Padding Top", type: "number", initialValue: 80 }),
    defineField({ name: "paddingBottom", title: "Padding Bottom", type: "number", initialValue: 80 }),
    blockStylesField,
  ],
  preview: {
    select: { title: "title", eyebrow: "eyebrow" },
    prepare: ({ title, eyebrow }) => ({
      title: title || "Testimonials",
      subtitle: eyebrow || "Testimonials",
    }),
  },
});
