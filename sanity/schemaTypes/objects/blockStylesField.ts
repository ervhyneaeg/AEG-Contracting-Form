import { defineField } from "sanity";

/**
 * Spread this into any section schema's `fields` array to get the full
 * style-override panel (padding/margin/border/bg/maxWidth/textAlign).
 */
export const blockStylesField = defineField({
  name: "styles",
  title: "Styles",
  type: "blockStyles",
  options: { collapsible: true, collapsed: true },
});
