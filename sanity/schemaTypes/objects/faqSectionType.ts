import { HelpCircleIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const faqSectionType = defineType({
  name: "faqSection",
  title: "FAQ",
  type: "object",
  icon: HelpCircleIcon,
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({
      name: "items",
      title: "Questions",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "blockContent",
            }),
          ],
          preview: { select: { title: "question" } },
        }),
      ],
    }),
    defineField({ name: "paddingTop", title: "Padding Top", type: "number", initialValue: 80 }),
    defineField({ name: "paddingBottom", title: "Padding Bottom", type: "number", initialValue: 80 }),
  ],
  preview: {
    select: { title: "title", eyebrow: "eyebrow" },
    prepare: ({ title, eyebrow }) => ({
      title: title || "FAQ",
      subtitle: eyebrow || "FAQ",
    }),
  },
});
