import { TiersIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const stepsSectionType = defineType({
  name: "stepsSection",
  title: "Process / Steps",
  type: "object",
  icon: TiersIcon,
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: { list: ["horizontal", "vertical"] },
      initialValue: "horizontal",
    }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  "user",
                  "check",
                  "shield",
                  "rocket",
                  "trending-up",
                  "crown",
                  "globe",
                  "lock",
                  "star",
                  "clipboard",
                ],
              },
            }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
    }),
    defineField({ name: "paddingTop", title: "Padding Top", type: "number", initialValue: 80 }),
    defineField({ name: "paddingBottom", title: "Padding Bottom", type: "number", initialValue: 80 }),
  ],
  preview: {
    select: { title: "title", eyebrow: "eyebrow" },
    prepare: ({ title, eyebrow }) => ({
      title: title || "Steps",
      subtitle: eyebrow || "Process",
    }),
  },
});
