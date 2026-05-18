import { SplitHorizontalIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { blockStylesField } from "./blockStylesField";

const GAPS = [
  { title: "None", value: "none" },
  { title: "XS (8px)", value: "xs" },
  { title: "SM (16px)", value: "sm" },
  { title: "MD (24px)", value: "md" },
  { title: "LG (32px)", value: "lg" },
  { title: "XL (48px)", value: "xl" },
];

const ALIGNMENTS = [
  { title: "Top", value: "start" },
  { title: "Center", value: "center" },
  { title: "Bottom", value: "end" },
  { title: "Stretch (fill height)", value: "stretch" },
];

const JUSTIFY = [
  { title: "Start", value: "start" },
  { title: "Center", value: "center" },
  { title: "End", value: "end" },
  { title: "Space between", value: "between" },
  { title: "Space around", value: "around" },
];

export const rowContainerType = defineType({
  name: "rowContainer",
  title: "Row",
  type: "object",
  icon: SplitHorizontalIcon,
  fields: [
    defineField({
      name: "columns",
      title: "Columns",
      type: "array",
      of: [defineArrayMember({ type: "columnContainer" })],
    }),
    defineField({
      name: "gap",
      title: "Column Gap",
      type: "string",
      options: { list: GAPS },
      initialValue: "md",
    }),
    defineField({
      name: "alignment",
      title: "Vertical Alignment",
      type: "string",
      options: { list: ALIGNMENTS },
      initialValue: "stretch",
    }),
    defineField({
      name: "justify",
      title: "Horizontal Distribution",
      type: "string",
      options: { list: JUSTIFY },
      initialValue: "start",
    }),
    defineField({
      name: "wrap",
      title: "Stack on small screens",
      description: "Columns stack vertically on mobile when enabled.",
      type: "boolean",
      initialValue: true,
    }),
    blockStylesField,
  ],
  preview: {
    select: { count: "columns.length" },
    prepare: ({ count }) => ({
      title: "Row",
      subtitle: `${count || 0} column${count === 1 ? "" : "s"}`,
    }),
  },
});
