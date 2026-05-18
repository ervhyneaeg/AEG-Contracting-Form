import { StringIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { blockStylesField } from "../blockStylesField";
import { baseFormInputFields } from "./baseFormInputFields";

export const textInputElement = defineType({
  name: "textInputElement",
  title: "Text Input",
  type: "object",
  icon: StringIcon,
  fields: [
    ...baseFormInputFields,
    defineField({
      name: "inputType",
      title: "Input Type",
      type: "string",
      options: {
        list: [
          { title: "Text", value: "text" },
          { title: "Email", value: "email" },
          { title: "Phone (tel)", value: "tel" },
          { title: "Number", value: "number" },
          { title: "Password", value: "password" },
          { title: "URL", value: "url" },
        ],
      },
      initialValue: "text",
    }),
    defineField({ name: "minLength", title: "Min Length", type: "number" }),
    defineField({ name: "maxLength", title: "Max Length", type: "number" }),
    blockStylesField,
  ],
  preview: {
    select: { label: "label", name: "name", inputType: "inputType" },
    prepare: ({ label, name, inputType }) => ({
      title: label || "Text Input",
      subtitle: `${inputType || "text"} · name="${name || "—"}"`,
    }),
  },
});
