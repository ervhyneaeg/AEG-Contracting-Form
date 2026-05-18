import { ClipboardIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Singleton document holding the editable copy for the /contracting page.
 * Field *structure* (zod schema, DB columns) stays in code — this is just labels/copy.
 */
export const contractingFormPageType = defineType({
  name: "contractingFormPage",
  title: "Contracting Form Page",
  type: "document",
  icon: ClipboardIcon,
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          initialValue: "AEG Contracting",
        }),
        defineField({
          name: "tagline",
          title: "Tagline",
          type: "string",
          initialValue: "Build your empire. Legacy starts here.",
        }),
      ],
    }),
    defineField({
      name: "steps",
      title: "Form Steps",
      description:
        "Editable copy for each step. The number/order of steps is fixed in code (4 steps).",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "formStepCopy",
          fields: [
            defineField({
              name: "key",
              title: "Step Key (do not change)",
              type: "string",
              options: {
                list: [
                  { title: "Personal", value: "personal" },
                  { title: "Licensing", value: "licensing" },
                  { title: "Career Goals", value: "careerGoals" },
                  { title: "Final Details", value: "finalDetails" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Step Indicator Label",
              type: "string",
            }),
            defineField({
              name: "title",
              title: "Step Title",
              type: "string",
            }),
            defineField({
              name: "subtitle",
              title: "Step Subtitle",
              type: "string",
            }),
            defineField({
              name: "helpText",
              title: "Help Text (bottom of step)",
              type: "text",
              rows: 2,
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "key" },
          },
        }),
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: "sidebarBlocks",
      title: "Sidebar Blocks",
      description:
        "Composable sidebar widgets shown alongside the form (security, status, etc.).",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "sidebarBlock",
          fields: [
            defineField({
              name: "kind",
              title: "Kind",
              type: "string",
              options: {
                list: [
                  { title: "Enterprise Security", value: "security" },
                  { title: "Application Status", value: "status" },
                  { title: "AI Concierge (placeholder)", value: "aiConcierge" },
                  { title: "Legacy Card", value: "legacy" },
                ],
              },
            }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({
              name: "items",
              title: "Items",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({ name: "title", title: "Title", type: "string" }),
                    defineField({ name: "description", title: "Description", type: "string" }),
                  ],
                }),
              ],
            }),
          ],
          preview: { select: { title: "title", subtitle: "kind" } },
        }),
      ],
    }),
    defineField({
      name: "footerStats",
      title: "Footer Stats Strip",
      description: "e.g. 25K+ AGENTS CONTRACTED",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
    defineField({
      name: "featureCards",
      title: "Feature Cards (below form)",
      description: "GLOBAL OPPORTUNITY / ELITE TRAINING / EXECUTIVE SUPPORT / FINANCIAL FREEDOM",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "string" }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: ["globe", "crown", "user", "trending-up", "shield", "lock"],
              },
            }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Contracting Form Page" }) },
});
