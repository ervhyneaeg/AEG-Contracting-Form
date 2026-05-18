import { BarChartIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const statsSectionType = defineType({
  name: "statsSection",
  title: "Stats Strip",
  type: "object",
  icon: BarChartIcon,
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              description: "e.g. 25K+",
            }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
    defineField({ name: "paddingTop", title: "Padding Top", type: "number", initialValue: 48 }),
    defineField({ name: "paddingBottom", title: "Padding Bottom", type: "number", initialValue: 48 }),
  ],
  preview: {
    select: { title: "title", eyebrow: "eyebrow" },
    prepare: ({ title, eyebrow }) => ({
      title: title || "Stats Strip",
      subtitle: eyebrow || "Stats",
    }),
  },
});
