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
  // `columns` is overloaded by Sanity schema:
  //   containerSection.columns  → number (grid column count 1-4)
  //   rowContainer.columns      → PageSectionData[] (column children)
  // The renderer dispatches on _type so the meaning is unambiguous at use site.
  columns?: number | PageSectionData[];
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
  // Section / Row / Column container fields
  label?: string;
  rows?: PageSectionData[];
  width?: string;
  customWidth?: number;
  alignment?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
  wrap?: boolean;
  // Atomic element fields (Phase 1e)
  text?: string;
  level?: "h1" | "h2" | "h3" | "h4";
  tone?: "gold-gradient" | "gold" | "foreground" | "muted";
  size?: "sm" | "base" | "lg" | "xl" | "md";
  kind?: "link" | "submit";
  href?: string;
  newTab?: boolean;
  variant?: "primary" | "outline" | "ghost" | "subtle" | "link";
  fullWidth?: boolean;
  icon?: string;
  linkLabel?: string;
  linkHref?: string;
  hoverable?: boolean;
  style?: "bullet" | "numbered" | "check" | "star" | "gold-dot";
  name?: string;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  defaultValue?: string;
  inputType?: "text" | "email" | "tel" | "number" | "password" | "url";
  minLength?: number;
  maxLength?: number;
  lineCount?: number;
  orientation?: "horizontal" | "vertical";
  options?: Array<{ _key?: string; value?: string; label?: string }>;
  checkedLabel?: string;
  formKey?: string;
  submitLabel?: string;
  successMessage?: string;
  errorMessage?: string;
  notifyEmail?: string;
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
      label,
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
      gap,
      alignment,
      justify,
      wrap,
      width,
      customWidth,
      styles,
      // Section > Row > Column projections (recursive)
      rows[]{
        _key, _type, gap, alignment, justify, wrap, styles,
        columns[]{
          _key, _type, width, customWidth, styles,
          items[]{
            _key, _type, eyebrow, title, body, description,
            primaryCtaLabel, primaryCtaHref, secondaryCtaLabel, secondaryCtaHref,
            paddingTop, paddingBottom, textAlign, layout, gap, styles,
            // Atomic element fields (Phase 1e)
            text, level, tone, size, kind, href, newTab, variant, fullWidth, icon,
            linkLabel, linkHref, hoverable, style,
            name, required, placeholder, helpText, defaultValue,
            inputType, minLength, maxLength, lineCount, orientation, checkedLabel,
            formKey, submitLabel, successMessage, errorMessage, notifyEmail,
            options[]{ _key, value, label },
            image{ asset->{_id, url}, alt },
            imageDark{ asset->{_id, url}, alt },
            stats[]{ _key, value, label },
            features[]{ _key, title, description, icon },
            testimonials[]{ _key, quote, name, role, rating, avatar{ asset->{_id, url}, alt } },
            logos[]{ _key, name, href, image{ asset->{_id, url}, alt } },
            steps[]{ _key, title, description, icon },
            // Bullet list items / form container items / FAQ items
            items[]{
              _key, _type,
              text, level, tone, size, kind, href, variant, fullWidth, icon,
              label, name, required, placeholder, helpText, defaultValue,
              inputType, minLength, maxLength, lineCount, orientation, checkedLabel,
              options[]{ _key, value, label },
              question, answer, eyebrow, title, body, styles
            }
          }
        }
      },
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
