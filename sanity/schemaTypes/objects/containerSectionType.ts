import { StackCompactIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const containerSectionType = defineType({
  name: "containerSection",
  title: "Container",
  type: "object",
  icon: StackCompactIcon,
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({
      name: "headerLayout",
      title: "Header Layout",
      type: "string",
      options: {
        list: ["center", "left", "right", "split"],
      },
      initialValue: "center",
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: { list: ["grid", "flex", "stack"] },
      initialValue: "grid",
    }),
    defineField({
      name: "columns",
      title: "Columns (grid only)",
      type: "number",
      options: { list: [1, 2, 3, 4] },
      initialValue: 3,
    }),
    defineField({
      name: "gap",
      title: "Gap",
      type: "string",
      options: { list: ["4", "6", "8", "12"] },
      initialValue: "6",
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        defineArrayMember({ type: "heroSection" }),
        defineArrayMember({ type: "richTextSection" }),
        defineArrayMember({ type: "ctaSection" }),
        defineArrayMember({ type: "imageSection" }),
        defineArrayMember({ type: "statsSection" }),
        defineArrayMember({ type: "featureCardsSection" }),
        defineArrayMember({ type: "testimonialsSection" }),
        defineArrayMember({ type: "faqSection" }),
        defineArrayMember({ type: "logosSection" }),
        defineArrayMember({ type: "stepsSection" }),
      ],
    }),
    defineField({ name: "paddingTop", title: "Padding Top", type: "number", initialValue: 64 }),
    defineField({ name: "paddingBottom", title: "Padding Bottom", type: "number", initialValue: 64 }),
  ],
  preview: {
    select: { title: "title", eyebrow: "eyebrow" },
    prepare: ({ title, eyebrow }) => ({
      title: title || "Container",
      subtitle: eyebrow || "Container",
    }),
  },
});
