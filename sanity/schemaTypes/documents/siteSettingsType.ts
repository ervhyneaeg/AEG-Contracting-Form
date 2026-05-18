import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "brandName",
      title: "Brand Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      initialValue: "AEG Contracting",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      initialValue: "AEG Contracting | Andreas Empire Group",
    }),
    defineField({
      name: "siteDescription",
      title: "Site Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().min(50).max(160),
    }),
    defineField({
      name: "siteUrl",
      title: "Site URL",
      type: "url",
      validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "twitterHandle",
      title: "Twitter Handle",
      type: "string",
    }),
    defineField({
      name: "supportEmail",
      title: "Support Email",
      type: "string",
    }),
    defineField({
      name: "supportPhone",
      title: "Support Phone",
      type: "string",
    }),
    defineField({
      name: "supportHours",
      title: "Support Hours",
      type: "string",
      initialValue: "Mon – Fri 9AM – 6PM EST",
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
