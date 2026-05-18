import { StackIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { blockStylesField } from "./blockStylesField";

export const spacerSectionType = defineType({
  name: "spacerSection",
  title: "Spacer",
  type: "object",
  icon: StackIcon,
  fields: [
    defineField({ name: "paddingTop", title: "Top (px)", type: "number", initialValue: 24 }),
    defineField({ name: "paddingBottom", title: "Bottom (px)", type: "number", initialValue: 24 }),
    blockStylesField,
  ],
  preview: { prepare: () => ({ title: "Spacer" }) },
});
