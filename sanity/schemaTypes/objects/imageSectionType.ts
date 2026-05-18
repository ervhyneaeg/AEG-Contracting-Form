import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const imageSectionType = defineType({
  name: "imageSection",
  title: "Image",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({ name: "paddingTop", title: "Padding Top", type: "number", initialValue: 0 }),
    defineField({ name: "paddingBottom", title: "Padding Bottom", type: "number", initialValue: 0 }),
  ],
  preview: { select: { media: "image", title: "image.alt" } },
});
