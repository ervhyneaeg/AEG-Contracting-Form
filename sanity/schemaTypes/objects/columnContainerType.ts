import { SplitVerticalIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { blockStylesField } from "./blockStylesField";

const WIDTH_PRESETS = [
  { title: "Auto / Equal flex", value: "auto" },
  { title: "Full (100%)", value: "full" },
  { title: "1/2 (50%)", value: "1/2" },
  { title: "1/3 (33%)", value: "1/3" },
  { title: "2/3 (67%)", value: "2/3" },
  { title: "1/4 (25%)", value: "1/4" },
  { title: "3/4 (75%)", value: "3/4" },
  { title: "1/5 (20%)", value: "1/5" },
  { title: "1/6 (16%)", value: "1/6" },
  { title: "Custom %", value: "custom" },
];

export const columnContainerType = defineType({
  name: "columnContainer",
  title: "Column",
  type: "object",
  icon: SplitVerticalIcon,
  fields: [
    defineField({
      name: "width",
      title: "Width",
      type: "string",
      options: { list: WIDTH_PRESETS },
      initialValue: "auto",
    }),
    defineField({
      name: "customWidth",
      title: "Custom Width (%)",
      type: "number",
      description: "Used only when Width is set to 'Custom %'.",
      validation: (Rule) => Rule.min(0).max(100),
      hidden: ({ parent }) => parent?.width !== "custom",
    }),
    defineField({
      name: "items",
      title: "Items",
      description: "Content elements stacked inside this column.",
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
        defineArrayMember({ type: "spacerSection" }),
      ],
    }),
    blockStylesField,
  ],
  preview: {
    select: { width: "width", customWidth: "customWidth", itemCount: "items.length" },
    prepare: ({ width, customWidth, itemCount }) => {
      const w = width === "custom" ? `${customWidth ?? 0}%` : width || "auto";
      return {
        title: `Column (${w})`,
        subtitle: `${itemCount || 0} item${itemCount === 1 ? "" : "s"}`,
      };
    },
  },
});
