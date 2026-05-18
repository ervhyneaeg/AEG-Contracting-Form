import { groq } from "next-sanity";

import type { BlockStyles } from "@/lib/block-styles";

// ============================================================
// Query result types
// (Hand-typed for Phase 0. Replace with sanity-typegen output once enabled.)
// ============================================================

export type SanityImageRef = {
  asset?: { _id?: string; url?: string };
  alt?: string;
};

export type SiteSettings = {
  brandName?: string;
  logo?: SanityImageRef;
  siteTitle?: string;
  siteDescription?: string;
  siteUrl?: string;
  twitterHandle?: string;
  ogImage?: SanityImageRef;
  supportEmail?: string;
  supportPhone?: string;
  supportHours?: string;
};

export type PageSectionData = {
  _key?: string;
  _type?: string;
  eyebrow?: string;
  title?: string;
  body?: unknown;
  description?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  paddingTop?: number;
  paddingBottom?: number;
  textAlign?: "center" | "left" | "right";
  headerLayout?: "center" | "left" | "right" | "split";
  layout?: "grid" | "flex" | "stack" | "horizontal" | "vertical" | "single";
  columns?: number;
  gap?: string;
  image?: SanityImageRef;
  imageDark?: SanityImageRef;
  stats?: Array<{ _key?: string; value?: string; label?: string }>;
  features?: Array<{ _key?: string; title?: string; description?: string; icon?: string }>;
  testimonials?: Array<{
    _key?: string;
    quote?: string;
    name?: string;
    role?: string;
    rating?: number;
    avatar?: SanityImageRef;
  }>;
  // faq + container both use "items" — discriminated by section _type at render time
  items?: PageSectionData[] | Array<{ _key?: string; question?: string; answer?: unknown }>;
  logos?: Array<{ _key?: string; name?: string; href?: string; image?: SanityImageRef }>;
  steps?: Array<{ _key?: string; title?: string; description?: string; icon?: string }>;
  styles?: BlockStyles | null;
};

export type Page = {
  _id: string;
  _type: string;
  title?: string;
  slug?: string;
  seoTitle?: string;
  seoDescription?: string;
  sections?: PageSectionData[];
};

export type ContractingFormPage = {
  hero?: { eyebrow?: string; title?: string; tagline?: string };
  steps?: Array<{
    _key?: string;
    key?: "personal" | "licensing" | "careerGoals" | "finalDetails";
    label?: string;
    title?: string;
    subtitle?: string;
    helpText?: string;
  }>;
  sidebarBlocks?: Array<{
    _key?: string;
    kind?: string;
    title?: string;
    items?: Array<{ title?: string; description?: string }>;
  }>;
  footerStats?: Array<{ _key?: string; value?: string; label?: string }>;
  featureCards?: Array<{ _key?: string; title?: string; description?: string; icon?: string }>;
};

export const siteSettingsQuery = groq`
  *[_id == "siteSettings"][0]{
    brandName,
    logo{ asset->{_id, url}, alt },
    siteTitle,
    siteDescription,
    siteUrl,
    twitterHandle,
    ogImage{ asset->{_id, url}, alt },
    supportEmail,
    supportPhone,
    supportHours
  }
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    "slug": slug.current,
    seoTitle,
    seoDescription,
    sections[]{
      _key,
      _type,
      eyebrow,
      title,
      body,
      description,
      primaryCtaLabel,
      primaryCtaHref,
      secondaryCtaLabel,
      secondaryCtaHref,
      paddingTop,
      paddingBottom,
      textAlign,
      headerLayout,
      layout,
      columns,
      gap,
      styles,
      image{ asset->{_id, url}, alt },
      imageDark{ asset->{_id, url}, alt },
      stats[]{ _key, value, label },
      features[]{ _key, title, description, icon },
      testimonials[]{
        _key,
        quote,
        name,
        role,
        rating,
        avatar{ asset->{_id, url}, alt }
      },
      logos[]{
        _key,
        name,
        href,
        image{ asset->{_id, url}, alt }
      },
      steps[]{
        _key,
        title,
        description,
        icon
      },
      items[]{
        _key,
        _type,
        // FAQ item fields
        question,
        answer,
        // Container item / generic section fields
        eyebrow,
        title,
        body,
        description,
        paddingTop,
        paddingBottom,
        textAlign,
        primaryCtaLabel,
        primaryCtaHref,
        secondaryCtaLabel,
        secondaryCtaHref,
        styles,
        image{ asset->{_id, url}, alt },
        imageDark{ asset->{_id, url}, alt },
        stats[]{ _key, value, label },
        features[]{ _key, title, description, icon }
      }
    }
  }
`;

export const contractingFormPageQuery = groq`
  *[_id == "contractingFormPage"][0]{
    hero{
      eyebrow,
      title,
      tagline
    },
    steps[]{
      _key,
      key,
      label,
      title,
      subtitle,
      helpText
    },
    sidebarBlocks,
    footerStats[]{ _key, value, label },
    featureCards[]{ _key, title, description, icon }
  }
`;
