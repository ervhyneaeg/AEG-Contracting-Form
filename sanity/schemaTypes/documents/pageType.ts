import { DocumentIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const pageType = defineType({
  name: "page",
  title: "Pages",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
      description: 'Use "home" for the homepage.',
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        // Structural — recommended top-level wrapper
        defineArrayMember({ type: "sectionContainer" }),
        // Direct content sections (also allowed at top level for simple pages)
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
        defineArrayMember({ type: "containerSection" }),
        defineArrayMember({ type: "spacerSection" }),
      ],
      description: "Add and reorder the sections rendered on this page.",
    }),
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare: ({ title, slug }) => ({
      title,
      subtitle: slug ? `/${slug}` : "No slug",
    }),
  },
});
