import { ThLargeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { blockStylesField } from "./blockStylesField";

export const featureCardsSectionType = defineType({
  name: "featureCardsSection",
  title: "Feature Cards",
  type: "object",
  icon: ThLargeIcon,
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({
      name: "features",
      title: "Cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: ["globe", "crown", "user", "trending-up", "shield", "lock", "star", "rocket"],
              },
            }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
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
      title: title || "Feature Cards",
      subtitle: eyebrow || "Features",
    }),
  },
});
