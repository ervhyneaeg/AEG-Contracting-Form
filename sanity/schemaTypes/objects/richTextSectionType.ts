import { TextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const richTextSectionType = defineType({
  name: "richTextSection",
  title: "Rich Text",
  type: "object",
  icon: TextIcon,
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "body", title: "Body", type: "blockContent" }),
    defineField({
      name: "textAlign",
      title: "Text Alignment",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Center", value: "center" },
          { title: "Right", value: "right" },
        ],
      },
      initialValue: "left",
    }),
    defineField({ name: "paddingTop", title: "Padding Top", type: "number", initialValue: 80 }),
    defineField({ name: "paddingBottom", title: "Padding Bottom", type: "number", initialValue: 80 }),
  ],
  preview: {
    select: { title: "title", eyebrow: "eyebrow" },
    prepare: ({ title, eyebrow }) => ({
      title: title || "Rich Text",
      subtitle: eyebrow || "Rich Text",
    }),
  },
});
