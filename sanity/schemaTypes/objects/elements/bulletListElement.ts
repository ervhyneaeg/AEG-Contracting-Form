import { UlistIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { blockStylesField } from "../blockStylesField";

export const bulletListElement = defineType({
  name: "bulletListElement",
  title: "Bullet List",
  type: "object",
  icon: UlistIcon,
  fields: [
    defineField({
      name: "style",
      title: "List Style",
      type: "string",
      options: {
        list: [
          { title: "Bullet (disc)", value: "bullet" },
          { title: "Numbered (1, 2, 3)", value: "numbered" },
          { title: "Check icon", value: "check" },
          { title: "Star icon", value: "star" },
          { title: "Gold dot", value: "gold-dot" },
        ],
      },
      initialValue: "bullet",
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "text",
              title: "Item",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "text" } },
        }),
      ],
    }),
    blockStylesField,
  ],
  preview: {
    select: { style: "style", count: "items.length" },
    prepare: ({ style, count }) => ({
      title: "Bullet List",
      subtitle: `${count || 0} item${count === 1 ? "" : "s"} · ${style || "bullet"}`,
    }),
  },
});
