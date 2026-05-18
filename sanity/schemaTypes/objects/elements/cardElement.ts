import { SquareIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { blockStylesField } from "../blockStylesField";

export const cardElement = defineType({
  name: "cardElement",
  title: "Card",
  type: "object",
  icon: SquareIcon,
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt", type: "string" })],
    }),
    defineField({
      name: "icon",
      title: "Icon (used if no image)",
      type: "string",
      options: {
        list: [
          "none",
          "shield",
          "star",
          "rocket",
          "crown",
          "globe",
          "lock",
          "user",
          "check",
          "trending-up",
          "clipboard",
          "sparkles",
        ],
      },
      initialValue: "none",
    }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({
      name: "linkLabel",
      title: "Link Label",
      type: "string",
    }),
    defineField({
      name: "linkHref",
      title: "Link URL",
      type: "url",
      validation: (Rule) => Rule.uri({ allowRelative: true }),
    }),
    defineField({
      name: "hoverable",
      title: "Hover Effect",
      type: "boolean",
      initialValue: true,
    }),
    blockStylesField,
  ],
  preview: {
    select: { title: "title", subtitle: "eyebrow", media: "image" },
  },
});
