import { ThListIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { blockStylesField } from "./blockStylesField";

export const sectionContainerType = defineType({
  name: "sectionContainer",
  title: "Section",
  type: "object",
  icon: ThListIcon,
  description: "Full-width frame that holds rows of columns.",
  fields: [
    defineField({
      name: "label",
      title: "Admin Label",
      description: "Internal name for this section (not shown on the live site).",
      type: "string",
    }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [defineArrayMember({ type: "rowContainer" })],
    }),
    blockStylesField,
  ],
  preview: {
    select: { label: "label", rowCount: "rows.length" },
    prepare: ({ label, rowCount }) => ({
      title: label || "Section",
      subtitle: `${rowCount || 0} row${rowCount === 1 ? "" : "s"}`,
    }),
  },
});
