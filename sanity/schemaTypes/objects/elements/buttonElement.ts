import { LaunchIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { blockStylesField } from "../blockStylesField";

export const buttonElement = defineType({
  name: "buttonElement",
  title: "Button",
  type: "object",
  icon: LaunchIcon,
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      options: {
        list: [
          { title: "Link", value: "link" },
          { title: "Submit (inside form)", value: "submit" },
        ],
      },
      initialValue: "link",
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "url",
      hidden: ({ parent }) => parent?.kind === "submit",
      validation: (Rule) => Rule.uri({ allowRelative: true }),
    }),
    defineField({
      name: "newTab",
      title: "Open in new tab",
      type: "boolean",
      hidden: ({ parent }) => parent?.kind === "submit",
      initialValue: false,
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Primary (gold)", value: "primary" },
          { title: "Outline", value: "outline" },
          { title: "Ghost", value: "ghost" },
          { title: "Subtle", value: "subtle" },
          { title: "Link (underline)", value: "link" },
        ],
      },
      initialValue: "primary",
    }),
    defineField({
      name: "size",
      title: "Size",
      type: "string",
      options: {
        list: [
          { title: "Small", value: "sm" },
          { title: "Medium", value: "md" },
          { title: "Large", value: "lg" },
        ],
      },
      initialValue: "md",
    }),
    defineField({
      name: "fullWidth",
      title: "Full width",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          "none",
          "arrow-right",
          "check",
          "star",
          "rocket",
          "shield",
          "lock",
          "user",
          "globe",
          "crown",
        ],
      },
      initialValue: "none",
    }),
    blockStylesField,
  ],
  preview: {
    select: { label: "label", kind: "kind", variant: "variant" },
    prepare: ({ label, kind, variant }) => ({
      title: label || "Button",
      subtitle: `${kind || "link"} · ${variant || "primary"}`,
    }),
  },
});
