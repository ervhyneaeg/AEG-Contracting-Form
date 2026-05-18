import { ControlsIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const SPACING = [
  { title: "None", value: "none" },
  { title: "XS (8px)", value: "xs" },
  { title: "SM (16px)", value: "sm" },
  { title: "MD (32px)", value: "md" },
  { title: "LG (48px)", value: "lg" },
  { title: "XL (64px)", value: "xl" },
  { title: "2XL (96px)", value: "2xl" },
  { title: "3XL (128px)", value: "3xl" },
];

const RADIUS = [
  { title: "None", value: "none" },
  { title: "SM (4px)", value: "sm" },
  { title: "MD (8px)", value: "md" },
  { title: "LG (12px)", value: "lg" },
  { title: "XL (16px)", value: "xl" },
  { title: "2XL (24px)", value: "2xl" },
  { title: "Pill / Full", value: "full" },
];

const WIDTHS = [
  { title: "Full Width", value: "full" },
  { title: "Wide (1280px)", value: "wide" },
  { title: "Medium (1024px)", value: "medium" },
  { title: "Small (768px)", value: "small" },
  { title: "Narrow (640px)", value: "narrow" },
];

const BORDER_WIDTHS = [
  { title: "None", value: "0" },
  { title: "1px (hairline)", value: "1" },
  { title: "2px", value: "2" },
  { title: "4px (heavy)", value: "4" },
];

const BG_COLORS = [
  { title: "Transparent", value: "transparent" },
  { title: "Card", value: "card" },
  { title: "Card (strong)", value: "card-strong" },
  { title: "Accent", value: "accent" },
  { title: "Gold tint", value: "gold-tint" },
  { title: "Gold (strong)", value: "gold-strong" },
  { title: "Deep black", value: "dark" },
];

const BORDER_COLORS = [
  { title: "None", value: "none" },
  { title: "Gold", value: "gold" },
  { title: "Gold subtle", value: "gold-subtle" },
  { title: "Border (neutral)", value: "border" },
];

const TEXT_ALIGN = [
  { title: "Left", value: "left" },
  { title: "Center", value: "center" },
  { title: "Right", value: "right" },
];

/**
 * Reusable style overrides applied to any block. Preset-based so the editor
 * UX stays simple and the brand stays consistent.
 */
export const blockStylesType = defineType({
  name: "blockStyles",
  title: "Styles",
  type: "object",
  icon: ControlsIcon,
  groups: [
    { name: "spacing", title: "Spacing" },
    { name: "container", title: "Container" },
    { name: "border", title: "Border" },
    { name: "appearance", title: "Appearance" },
  ],
  fields: [
    defineField({
      name: "maxWidth",
      title: "Container Width",
      type: "string",
      options: { list: WIDTHS },
      group: "container",
    }),
    defineField({
      name: "paddingTop",
      title: "Padding Top",
      type: "string",
      options: { list: SPACING },
      group: "spacing",
    }),
    defineField({
      name: "paddingRight",
      title: "Padding Right",
      type: "string",
      options: { list: SPACING },
      group: "spacing",
    }),
    defineField({
      name: "paddingBottom",
      title: "Padding Bottom",
      type: "string",
      options: { list: SPACING },
      group: "spacing",
    }),
    defineField({
      name: "paddingLeft",
      title: "Padding Left",
      type: "string",
      options: { list: SPACING },
      group: "spacing",
    }),
    defineField({
      name: "marginTop",
      title: "Margin Top",
      type: "string",
      options: { list: SPACING },
      group: "spacing",
    }),
    defineField({
      name: "marginBottom",
      title: "Margin Bottom",
      type: "string",
      options: { list: SPACING },
      group: "spacing",
    }),
    defineField({
      name: "borderWidth",
      title: "Border Width",
      type: "string",
      options: { list: BORDER_WIDTHS },
      group: "border",
    }),
    defineField({
      name: "borderColor",
      title: "Border Color",
      type: "string",
      options: { list: BORDER_COLORS },
      group: "border",
    }),
    defineField({
      name: "borderRadius",
      title: "Border Radius",
      type: "string",
      options: { list: RADIUS },
      group: "border",
    }),
    defineField({
      name: "background",
      title: "Background",
      type: "string",
      options: { list: BG_COLORS },
      group: "appearance",
    }),
    defineField({
      name: "textAlign",
      title: "Text Align",
      type: "string",
      options: { list: TEXT_ALIGN },
      group: "appearance",
    }),
  ],
});
