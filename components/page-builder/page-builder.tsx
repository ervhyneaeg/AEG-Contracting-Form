"use client";

/**
 * Page-builder dispatcher. Renders a Sanity page's `sections[]` array.
 *
 * Every section has a *skeleton* empty-state shown in draft mode when its
 * critical fields are missing. In published mode, fully-empty sections render
 * null so the live site stays clean.
 *
 * data-sanity attributes wire each block into the Presentation Tool overlay
 * system (hover/right-click in /studio's preview to add, move, edit, delete).
 */
import { PortableText } from "@portabletext/react";
import {
  AlignLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronsUpDown,
  Clipboard,
  Columns3,
  Crown,
  Frame,
  Globe,
  HelpCircle,
  Image as ImageIcon,
  LayoutGrid,
  List,
  ListOrdered,
  Lock,
  type LucideIcon,
  Megaphone,
  Quote,
  Rocket,
  Rows3,
  ShieldCheck,
  Sparkles,
  Square,
  Star,
  TrendingUp,
  Type,
  UserCircle,
} from "lucide-react";
import { createDataAttribute } from "next-sanity";
import type { CSSProperties, ReactNode } from "react";

import { applyBlockStyles, type BlockStyles } from "@/lib/block-styles";
import { columnWidthStyle } from "@/lib/column-width";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";

import { FormContainer } from "./elements/FormContainer";
import { SectionPlaceholder } from "./SectionPlaceholder";

// ============================================================
// Types
// ============================================================

type SanityImage = { asset?: { _id?: string; url?: string }; alt?: string };

type FaqItem = { _key?: string; question?: string; answer?: unknown };

type PageSection = {
  _key?: string;
  _type?: string;
  eyebrow?: string;
  title?: string;
  label?: string;
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
  columns?: number | PageSection[];
  gap?: string;
  alignment?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
  wrap?: boolean;
  width?: string;
  customWidth?: number;
  rows?: PageSection[];
  image?: SanityImage;
  imageDark?: SanityImage;
  stats?: Array<{ _key?: string; value?: string; label?: string }>;
  features?: Array<{ _key?: string; title?: string; description?: string; icon?: string }>;
  testimonials?: Array<{
    _key?: string;
    quote?: string;
    name?: string;
    role?: string;
    rating?: number;
    avatar?: SanityImage;
  }>;
  logos?: Array<{ _key?: string; name?: string; href?: string; image?: SanityImage }>;
  steps?: Array<{ _key?: string; title?: string; description?: string; icon?: string }>;
  items?: PageSection[] | FaqItem[];
  styles?: BlockStyles | null;
  // Atomic element fields (Phase 1e)
  text?: string;
  level?: "h1" | "h2" | "h3" | "h4";
  tone?: string;
  size?: string;
  kind?: "link" | "submit";
  href?: string;
  newTab?: boolean;
  variant?: string;
  fullWidth?: boolean;
  icon?: string;
  linkLabel?: string;
  linkHref?: string;
  hoverable?: boolean;
  style?: string;
  name?: string;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  defaultValue?: string;
  inputType?: string;
  minLength?: number;
  maxLength?: number;
  lineCount?: number;
  orientation?: string;
  options?: Array<{ _key?: string; value?: string; label?: string }>;
  checkedLabel?: string;
  formKey?: string;
  submitLabel?: string;
  successMessage?: string;
  errorMessage?: string;
  notifyEmail?: string;
};

type PageBuilderProps = {
  sections?: PageSection[] | null;
  documentId?: string;
  documentType?: string;
  isDraftMode?: boolean;
  pathPrefix?: string;
  isInner?: boolean;
};

// ============================================================
// Helpers
// ============================================================

const ICON_MAP: Record<string, LucideIcon> = {
  globe: Globe,
  crown: Crown,
  user: UserCircle,
  "trending-up": TrendingUp,
  shield: ShieldCheck,
  lock: Lock,
  star: Star,
  rocket: Rocket,
  check: CheckCircle2,
  clipboard: Clipboard,
  sparkles: Sparkles,
  "arrow-right": ArrowRight,
};


function CtaLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const base =
    "inline-flex items-center justify-center rounded-md px-8 py-3 text-sm font-semibold tracking-wide transition-all";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-b from-gold to-gold-deep text-black hover:from-gold-bright shadow-gold"
      : "border border-gold/40 text-gold hover:bg-gold/10 hover:border-gold/60";
  return (
    <a href={href} className={cn(base, styles)}>
      {children}
    </a>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  align?: "left" | "center" | "right";
}) {
  if (!eyebrow && !title && !description) return null;
  const alignClass =
    align === "left" ? "text-left mr-auto" : align === "right" ? "text-right ml-auto" : "text-center mx-auto";
  return (
    <div className={cn("mb-10 max-w-3xl", alignClass)}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold tracking-[0.3em] uppercase text-gold/80">
          {eyebrow}
        </p>
      )}
      {title && (
        <h2 className="font-display text-3xl tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
      )}
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

function hasAny(...values: unknown[]): boolean {
  return values.some((v) => {
    if (v == null) return false;
    if (typeof v === "string") return v.trim().length > 0;
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === "object") return Object.keys(v as object).length > 0;
    return Boolean(v);
  });
}

// ============================================================
// Page Builder
// ============================================================

export function PageBuilder({
  sections,
  documentId,
  documentType,
  isDraftMode,
  pathPrefix,
  isInner,
}: PageBuilderProps) {
  const prefix = pathPrefix || "sections";
  const baseSectionClass = isInner ? "w-full" : "max-w-container mx-auto px-6 w-full";

  const createSectionAttr = (key?: string) => {
    if (!isDraftMode || !documentId || !documentType || !key) return undefined;
    return createDataAttribute({
      id: documentId,
      type: documentType,
      path: `${prefix}[_key=="${key}"]`,
    }).toString();
  };

  const sectionsContainerAttr =
    isDraftMode && documentId && documentType
      ? createDataAttribute({ id: documentId, type: documentType, path: prefix }).toString()
      : undefined;

  if (!sections || sections.length === 0) {
    if (!isDraftMode) return null;
    return (
      <section className={baseSectionClass} data-sanity={sectionsContainerAttr}>
        <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-gold/30 bg-card/30 px-6 py-16 text-center">
          <p className="text-sm tracking-[0.25em] uppercase text-gold/80">Empty page</p>
          <p className="max-w-md text-sm text-muted-foreground">
            Toggle <span className="text-gold">Edit</span> in the top-left of the
            Presentation panel, then <span className="text-gold">hover</span> or{" "}
            <span className="text-gold">right-click</span> this box to insert your first
            section.
          </p>
        </div>
      </section>
    );
  }

  return (
    <div data-sanity={sectionsContainerAttr} className="contents">
      {sections.map((section) => {
        const key = section._key || "unknown";
        const sectionAttr = createSectionAttr(section._key);
        const styleOverrides = applyBlockStyles(section.styles);

        switch (section._type) {
          // -------------------------------------------------------------
          // Spacer
          // -------------------------------------------------------------
          case "spacerSection": {
            const height = (section.paddingTop || 24) + (section.paddingBottom || 24);
            if (isDraftMode) {
              return (
                <div
                  key={key}
                  data-sanity={sectionAttr}
                  className="mx-auto flex w-full max-w-container items-center px-6"
                  style={{ height, ...styleOverrides }}
                >
                  <div className="flex w-full items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-gold/40">
                    <span className="h-px flex-1 bg-gold/15" />
                    <span>Spacer · {height}px</span>
                    <span className="h-px flex-1 bg-gold/15" />
                  </div>
                </div>
              );
            }
            return <div key={key} data-sanity={sectionAttr} style={{ height }} />;
          }

          // -------------------------------------------------------------
          // Rich Text
          // -------------------------------------------------------------
          case "richTextSection": {
            const empty = !hasAny(section.eyebrow, section.title, section.body);
            if (empty && !isDraftMode) return null;

            const align = section.textAlign || "left";
            const alignClass =
              align === "center"
                ? "text-center mx-auto"
                : align === "right"
                  ? "text-right ml-auto"
                  : "text-left mr-auto";

            return (
              <section
                key={key}
                data-sanity={sectionAttr}
                className={baseSectionClass}
                style={{
                  paddingTop: section.paddingTop ?? 80,
                  paddingBottom: section.paddingBottom ?? 80,
                  ...styleOverrides,
                }}
              >
                {empty ? (
                  <SectionPlaceholder
                    type="Rich Text"
                    hint="Add an eyebrow, title, and body in the studio."
                    icon={AlignLeft}
                  />
                ) : (
                  <div className={cn("max-w-3xl space-y-4", alignClass)}>
                    {section.eyebrow && (
                      <p className="text-sm tracking-[0.3em] uppercase text-gold/80">
                        {section.eyebrow}
                      </p>
                    )}
                    {section.title && (
                      <h2 className="font-display text-3xl tracking-tight text-foreground sm:text-4xl">
                        {section.title}
                      </h2>
                    )}
                    {!!section.body && (
                      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-muted-foreground">
                        <PortableText value={section.body as never} />
                      </div>
                    )}
                  </div>
                )}
              </section>
            );
          }

          // -------------------------------------------------------------
          // Call to Action
          // -------------------------------------------------------------
          case "ctaSection": {
            const empty = !hasAny(
              section.title,
              section.body,
              section.primaryCtaLabel,
              section.secondaryCtaLabel,
            );
            if (empty && !isDraftMode) return null;

            return (
              <section
                key={key}
                data-sanity={sectionAttr}
                className={cn(baseSectionClass, "py-20")}
                style={styleOverrides}
              >
                {empty ? (
                  <SectionPlaceholder
                    type="Call to Action"
                    hint="Add a title and primary CTA button."
                    icon={Megaphone}
                  />
                ) : (
                  <div className="bg-card/40 flex h-full flex-col justify-center rounded-3xl border border-gold/20 px-8 py-12 text-center">
                    {section.eyebrow && (
                      <p className="text-sm tracking-[0.3em] uppercase text-gold/80">
                        {section.eyebrow}
                      </p>
                    )}
                    {section.title && (
                      <h2 className="font-display mt-3 text-3xl tracking-tight sm:text-4xl">
                        {section.title}
                      </h2>
                    )}
                    {!!section.body && (
                      <div className="prose prose-sm md:prose-base dark:prose-invert mx-auto mt-4 max-w-2xl text-muted-foreground">
                        <PortableText value={section.body as never} />
                      </div>
                    )}
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                      {section.primaryCtaLabel && section.primaryCtaHref && (
                        <CtaLink href={section.primaryCtaHref}>{section.primaryCtaLabel}</CtaLink>
                      )}
                      {section.secondaryCtaLabel && section.secondaryCtaHref && (
                        <CtaLink href={section.secondaryCtaHref} variant="secondary">
                          {section.secondaryCtaLabel}
                        </CtaLink>
                      )}
                    </div>
                  </div>
                )}
              </section>
            );
          }

          // -------------------------------------------------------------
          // Image
          // -------------------------------------------------------------
          case "imageSection": {
            const imgSrc = section.image?.asset
              ? urlFor(section.image).width(1600).fit("max").url()
              : null;
            if (!imgSrc && !isDraftMode) return null;

            return (
              <section
                key={key}
                data-sanity={sectionAttr}
                className={baseSectionClass}
                style={{
                  paddingTop: section.paddingTop ?? 0,
                  paddingBottom: section.paddingBottom ?? 0,
                  ...styleOverrides,
                }}
              >
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={section.image?.alt || ""}
                    className="w-full rounded-2xl object-cover"
                  />
                ) : (
                  <SectionPlaceholder
                    type="Image"
                    hint="Click to add an image in the studio."
                    icon={ImageIcon}
                    height="min-h-[280px]"
                  />
                )}
              </section>
            );
          }

          // -------------------------------------------------------------
          // Stats
          // -------------------------------------------------------------
          case "statsSection": {
            const hasStats = (section.stats?.length || 0) > 0;
            const empty = !hasStats && !hasAny(section.eyebrow, section.title);
            if (empty && !isDraftMode) return null;

            return (
              <section
                key={key}
                data-sanity={sectionAttr}
                className={baseSectionClass}
                style={{
                  paddingTop: section.paddingTop ?? 48,
                  paddingBottom: section.paddingBottom ?? 48,
                  ...styleOverrides,
                }}
              >
                <SectionHeader eyebrow={section.eyebrow} title={section.title} />
                {hasStats ? (
                  <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    {section.stats!.map((s) => (
                      <div key={s._key} className="flex flex-col items-center text-center">
                        <span className="font-display text-3xl font-bold text-gold sm:text-4xl">
                          {s.value || "—"}
                        </span>
                        <span className="mt-1 text-xs tracking-[0.2em] uppercase text-muted-foreground">
                          {s.label || "Label"}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <SectionPlaceholder
                    type="Stats"
                    hint="Add stat items (value + label) in the studio."
                    icon={BarChart3}
                  />
                )}
              </section>
            );
          }

          // -------------------------------------------------------------
          // Feature Cards
          // -------------------------------------------------------------
          case "featureCardsSection": {
            const hasItems = (section.features?.length || 0) > 0;
            const empty = !hasItems && !hasAny(section.eyebrow, section.title, section.description);
            if (empty && !isDraftMode) return null;

            return (
              <section
                key={key}
                data-sanity={sectionAttr}
                className={baseSectionClass}
                style={{
                  paddingTop: section.paddingTop ?? 64,
                  paddingBottom: section.paddingBottom ?? 64,
                  ...styleOverrides,
                }}
              >
                <SectionHeader
                  eyebrow={section.eyebrow}
                  title={section.title}
                  description={section.description}
                />
                {hasItems ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {section.features!.map((f) => {
                      const Icon = ICON_MAP[f.icon || ""] || Sparkles;
                      return (
                        <div
                          key={f._key}
                          className="rounded-2xl border border-gold/20 bg-card/40 p-6 transition-colors hover:border-gold/40"
                        >
                          <Icon className="mb-3 h-6 w-6 text-gold" />
                          <h3 className="text-sm font-semibold tracking-[0.15em] uppercase text-gold">
                            {f.title || "Feature title"}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {f.description || "Add a description."}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <SectionPlaceholder
                    type="Feature Cards"
                    hint="Add 2–4 feature cards in the studio."
                    icon={LayoutGrid}
                  />
                )}
              </section>
            );
          }

          // -------------------------------------------------------------
          // Testimonials
          // -------------------------------------------------------------
          case "testimonialsSection": {
            const hasItems = (section.testimonials?.length || 0) > 0;
            const empty = !hasItems && !hasAny(section.eyebrow, section.title, section.description);
            if (empty && !isDraftMode) return null;

            return (
              <section
                key={key}
                data-sanity={sectionAttr}
                className={baseSectionClass}
                style={{
                  paddingTop: section.paddingTop ?? 80,
                  paddingBottom: section.paddingBottom ?? 80,
                  ...styleOverrides,
                }}
              >
                <SectionHeader
                  eyebrow={section.eyebrow}
                  title={section.title}
                  description={section.description}
                />
                {hasItems ? (
                  <div
                    className={cn(
                      section.layout === "single"
                        ? "mx-auto max-w-2xl"
                        : "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
                    )}
                  >
                    {section.testimonials!.map((t) => {
                      const avatarSrc = t.avatar?.asset
                        ? urlFor(t.avatar).width(96).height(96).fit("crop").url()
                        : null;
                      return (
                        <figure
                          key={t._key}
                          className="rounded-2xl border border-gold/15 bg-card/40 p-6"
                        >
                          <Quote className="h-5 w-5 text-gold/60" />
                          {t.rating ? (
                            <div className="mt-2 flex gap-0.5 text-gold">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    "h-3.5 w-3.5",
                                    i < (t.rating || 0) ? "fill-gold" : "opacity-30",
                                  )}
                                />
                              ))}
                            </div>
                          ) : null}
                          <blockquote className="mt-3 text-sm leading-relaxed text-foreground/90">
                            {t.quote || (
                              <span className="text-muted-foreground italic">Add a quote.</span>
                            )}
                          </blockquote>
                          <figcaption className="mt-5 flex items-center gap-3 border-t border-gold/10 pt-4">
                            {avatarSrc ? (
                              <img
                                src={avatarSrc}
                                alt={t.avatar?.alt || t.name || ""}
                                className="h-10 w-10 rounded-full border border-gold/30 object-cover"
                              />
                            ) : (
                              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-card">
                                <UserCircle className="h-5 w-5 text-gold/50" />
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-semibold text-foreground">
                                {t.name || "Name"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {t.role || "Role / Title"}
                              </p>
                            </div>
                          </figcaption>
                        </figure>
                      );
                    })}
                  </div>
                ) : (
                  <SectionPlaceholder
                    type="Testimonials"
                    hint="Add testimonials with quote, name, role, and avatar."
                    icon={Quote}
                  />
                )}
              </section>
            );
          }

          // -------------------------------------------------------------
          // FAQ
          // -------------------------------------------------------------
          case "faqSection": {
            const items = (section.items as FaqItem[]) || [];
            const hasItems = items.length > 0;
            const empty = !hasItems && !hasAny(section.eyebrow, section.title, section.description);
            if (empty && !isDraftMode) return null;

            return (
              <section
                key={key}
                data-sanity={sectionAttr}
                className={baseSectionClass}
                style={{
                  paddingTop: section.paddingTop ?? 80,
                  paddingBottom: section.paddingBottom ?? 80,
                  ...styleOverrides,
                }}
              >
                <SectionHeader
                  eyebrow={section.eyebrow}
                  title={section.title}
                  description={section.description}
                />
                {hasItems ? (
                  <div className="mx-auto max-w-3xl divide-y divide-gold/15 rounded-2xl border border-gold/15 bg-card/40 px-6">
                    {items.map((item) => (
                      <details
                        key={item._key}
                        className="group py-5 [&[open]_summary>svg]:rotate-180 [&[open]_summary]:text-gold"
                      >
                        <summary className="flex cursor-pointer items-center justify-between text-left text-base font-medium text-foreground transition-colors hover:text-gold">
                          <span>{item.question || "Question"}</span>
                          <ChevronsUpDown className="h-4 w-4 shrink-0 text-gold/60 transition-transform" />
                        </summary>
                        {!!item.answer && (
                          <div className="prose prose-sm dark:prose-invert mt-3 max-w-none text-muted-foreground">
                            <PortableText value={item.answer as never} />
                          </div>
                        )}
                      </details>
                    ))}
                  </div>
                ) : (
                  <SectionPlaceholder
                    type="FAQ"
                    hint="Add question/answer pairs in the studio."
                    icon={HelpCircle}
                  />
                )}
              </section>
            );
          }

          // -------------------------------------------------------------
          // Logo Cloud
          // -------------------------------------------------------------
          case "logosSection": {
            const hasItems = (section.logos?.length || 0) > 0;
            const empty = !hasItems && !hasAny(section.eyebrow, section.title);
            if (empty && !isDraftMode) return null;

            return (
              <section
                key={key}
                data-sanity={sectionAttr}
                className={baseSectionClass}
                style={{
                  paddingTop: section.paddingTop ?? 64,
                  paddingBottom: section.paddingBottom ?? 64,
                  ...styleOverrides,
                }}
              >
                <SectionHeader eyebrow={section.eyebrow} title={section.title} />
                {hasItems ? (
                  <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-80">
                    {section.logos!.map((logo) => {
                      const src = logo.image?.asset
                        ? urlFor(logo.image).height(60).fit("max").url()
                        : null;
                      const inner = src ? (
                        <img
                          src={src}
                          alt={logo.image?.alt || logo.name || ""}
                          className="h-12 w-auto opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                        />
                      ) : (
                        <span className="rounded border border-dashed border-gold/30 px-4 py-3 text-xs tracking-wider uppercase text-gold/60">
                          {logo.name || "Logo"}
                        </span>
                      );
                      return logo.href ? (
                        <a key={logo._key} href={logo.href} target="_blank" rel="noopener noreferrer">
                          {inner}
                        </a>
                      ) : (
                        <div key={logo._key}>{inner}</div>
                      );
                    })}
                  </div>
                ) : (
                  <SectionPlaceholder
                    type="Logo Cloud"
                    hint="Add carrier/partner logos in the studio."
                    icon={ImageIcon}
                  />
                )}
              </section>
            );
          }

          // -------------------------------------------------------------
          // Steps / Process
          // -------------------------------------------------------------
          case "stepsSection": {
            const hasItems = (section.steps?.length || 0) > 0;
            const empty = !hasItems && !hasAny(section.eyebrow, section.title, section.description);
            if (empty && !isDraftMode) return null;

            const horizontal = (section.layout || "horizontal") === "horizontal";

            return (
              <section
                key={key}
                data-sanity={sectionAttr}
                className={baseSectionClass}
                style={{
                  paddingTop: section.paddingTop ?? 80,
                  paddingBottom: section.paddingBottom ?? 80,
                  ...styleOverrides,
                }}
              >
                <SectionHeader
                  eyebrow={section.eyebrow}
                  title={section.title}
                  description={section.description}
                />
                {hasItems ? (
                  <ol
                    className={cn(
                      horizontal
                        ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
                        : "mx-auto max-w-3xl space-y-4",
                    )}
                  >
                    {section.steps!.map((step, idx) => {
                      const Icon = ICON_MAP[step.icon || ""] || CheckCircle2;
                      return (
                        <li
                          key={step._key}
                          className="relative flex flex-col gap-3 rounded-2xl border border-gold/15 bg-card/40 p-6 transition-colors hover:border-gold/35"
                        >
                          <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-gold/10 font-display text-lg font-bold text-gold">
                              {idx + 1}
                            </span>
                            <Icon className="h-5 w-5 text-gold/70" />
                          </div>
                          <h3 className="text-base font-semibold text-foreground">
                            {step.title || "Step title"}
                          </h3>
                          {step.description && (
                            <p className="text-sm leading-relaxed text-muted-foreground">
                              {step.description}
                            </p>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                ) : (
                  <SectionPlaceholder
                    type="Process / Steps"
                    hint="Add numbered steps (title + description + icon)."
                    icon={ListOrdered}
                  />
                )}
              </section>
            );
          }

          // -------------------------------------------------------------
          // Section Container (GHL-style) — Phase 1d
          // -------------------------------------------------------------
          case "sectionContainer": {
            const rows = section.rows || [];
            const hasRows = rows.length > 0;
            return (
              <section
                key={key}
                data-sanity={sectionAttr}
                className={cn(
                  baseSectionClass,
                  "py-6",
                  isDraftMode &&
                    "relative outline outline-2 outline-emerald-500/40 outline-offset-[-1px]",
                )}
                style={styleOverrides}
              >
                {isDraftMode && (
                  <p className="mb-2 inline-flex items-center gap-1.5 rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold tracking-[0.2em] uppercase text-emerald-400">
                    <Frame className="h-3 w-3" />
                    Section{section.label ? ` · ${section.label}` : ""}
                  </p>
                )}
                {hasRows ? (
                  <PageBuilder
                    sections={rows}
                    documentId={documentId}
                    documentType={documentType}
                    isDraftMode={isDraftMode}
                    pathPrefix={`${prefix}[_key=="${key}"].rows`}
                    isInner
                  />
                ) : (
                  <SectionPlaceholder
                    type="Section"
                    hint="Empty Section — add a Row to start composing this block."
                    icon={Frame}
                  />
                )}
              </section>
            );
          }

          // -------------------------------------------------------------
          // Row Container — Phase 1d
          // -------------------------------------------------------------
          case "rowContainer": {
            const cols = Array.isArray(section.columns) ? section.columns : [];
            const hasCols = cols.length > 0;
            const gap = section.gap || "md";
            const gapMap: Record<string, string> = {
              none: "gap-0",
              xs: "gap-2",
              sm: "gap-4",
              md: "gap-6",
              lg: "gap-8",
              xl: "gap-12",
            };
            const alignMap: Record<string, string> = {
              start: "items-start",
              center: "items-center",
              end: "items-end",
              stretch: "items-stretch",
            };
            const justifyMap: Record<string, string> = {
              start: "justify-start",
              center: "justify-center",
              end: "justify-end",
              between: "justify-between",
              around: "justify-around",
            };
            const wrap = section.wrap ?? true;
            const direction = wrap ? "flex-col md:flex-row" : "flex-row";
            return (
              <div
                key={key}
                data-sanity={sectionAttr}
                className={cn(
                  "flex w-full",
                  direction,
                  gapMap[gap] || gapMap.md,
                  alignMap[section.alignment || "stretch"],
                  justifyMap[section.justify || "start"],
                  "my-2",
                  isDraftMode &&
                    "relative outline outline-2 outline-sky-500/40 outline-offset-[-1px]",
                )}
                style={styleOverrides}
              >
                {isDraftMode && (
                  <p className="absolute -top-2 left-2 z-10 inline-flex items-center gap-1.5 rounded bg-sky-500/10 px-2 py-0.5 text-[10px] font-semibold tracking-[0.2em] uppercase text-sky-400">
                    <Rows3 className="h-3 w-3" />
                    Row
                  </p>
                )}
                {hasCols ? (
                  <PageBuilder
                    sections={cols}
                    documentId={documentId}
                    documentType={documentType}
                    isDraftMode={isDraftMode}
                    pathPrefix={`${prefix}[_key=="${key}"].columns`}
                    isInner
                  />
                ) : (
                  <div className="flex-1">
                    <SectionPlaceholder
                      type="Row"
                      hint="Empty Row — add Columns to split this row."
                      icon={Rows3}
                    />
                  </div>
                )}
              </div>
            );
          }

          // -------------------------------------------------------------
          // Column Container — Phase 1d
          // -------------------------------------------------------------
          case "columnContainer": {
            const items = (section.items as PageSection[]) || [];
            const hasItems = items.length > 0;
            const widthStyle = columnWidthStyle(section.width, section.customWidth);
            return (
              <div
                key={key}
                data-sanity={sectionAttr}
                className={cn(
                  "flex flex-col",
                  "min-w-0",
                  isDraftMode &&
                    "relative outline outline-2 outline-pink-500/40 outline-offset-[-1px]",
                )}
                style={{ ...widthStyle, ...styleOverrides }}
              >
                {isDraftMode && (
                  <p className="absolute -top-2 right-2 z-10 inline-flex items-center gap-1.5 rounded bg-pink-500/10 px-2 py-0.5 text-[10px] font-semibold tracking-[0.2em] uppercase text-pink-400">
                    <Columns3 className="h-3 w-3" />
                    Column · {section.width || "auto"}
                  </p>
                )}
                {hasItems ? (
                  <PageBuilder
                    sections={items}
                    documentId={documentId}
                    documentType={documentType}
                    isDraftMode={isDraftMode}
                    pathPrefix={`${prefix}[_key=="${key}"].items`}
                    isInner
                  />
                ) : (
                  <SectionPlaceholder
                    type="Column"
                    hint="Drop content elements (Hero, Rich Text, Image, …)"
                    icon={Columns3}
                  />
                )}
              </div>
            );
          }

          // -------------------------------------------------------------
          // Container (legacy generic container — kept for backward compat)
          // -------------------------------------------------------------
          case "containerSection": {
            const items = (section.items as PageSection[]) || [];
            const hasItems = items.length > 0;
            const empty = !hasItems && !hasAny(section.eyebrow, section.title, section.description);
            if (empty && !isDraftMode) return null;

            const layout = section.layout || "grid";
            const columns = typeof section.columns === "number" ? section.columns : 3;
            const gap =
              section.gap === "4" ? "gap-4" : section.gap === "8" ? "gap-8" : section.gap === "12" ? "gap-12" : "gap-6";
            const cols =
              columns === 1
                ? "lg:grid-cols-1"
                : columns === 2
                  ? "lg:grid-cols-2"
                  : columns === 4
                    ? "lg:grid-cols-4"
                    : "lg:grid-cols-3";
            const layoutClass =
              layout === "grid"
                ? `grid grid-cols-1 md:grid-cols-2 ${cols}`
                : layout === "flex"
                  ? "flex flex-wrap justify-center"
                  : "flex flex-col";

            return (
              <section
                key={key}
                data-sanity={sectionAttr}
                className={baseSectionClass}
                style={{
                  paddingTop: section.paddingTop ?? 64,
                  paddingBottom: section.paddingBottom ?? 64,
                  ...styleOverrides,
                }}
              >
                <SectionHeader
                  eyebrow={section.eyebrow}
                  title={section.title}
                  description={section.description}
                  align={section.headerLayout === "left" ? "left" : section.headerLayout === "right" ? "right" : "center"}
                />
                {hasItems ? (
                  <div className={cn(layoutClass, gap)}>
                    <PageBuilder
                      sections={items}
                      documentId={documentId}
                      documentType={documentType}
                      isDraftMode={isDraftMode}
                      pathPrefix={`${prefix}[_key=="${key}"].items`}
                      isInner
                    />
                  </div>
                ) : (
                  <SectionPlaceholder
                    type="Container"
                    hint="Drop sections inside this container in the studio."
                    icon={LayoutGrid}
                  />
                )}
              </section>
            );
          }

          // =============================================================
          // ATOMIC ELEMENTS (Phase 1e)
          // =============================================================

          case "headingElement": {
            const level = section.level || "h2";
            const text = section.text || "";
            const empty = !text;
            if (empty && !isDraftMode) return null;
            const toneClass =
              section.tone === "gold-gradient"
                ? "text-transparent bg-gradient-to-b from-gold-bright via-gold to-gold-deep bg-clip-text"
                : section.tone === "gold"
                  ? "text-gold"
                  : section.tone === "muted"
                    ? "text-muted-foreground"
                    : "text-foreground";
            const sizeClass = {
              h1: "text-5xl sm:text-6xl font-bold",
              h2: "text-3xl sm:text-4xl font-semibold",
              h3: "text-2xl sm:text-3xl font-semibold",
              h4: "text-xl font-semibold",
            }[level];
            const Tag = level as "h1" | "h2" | "h3" | "h4";
            return (
              <div key={key} data-sanity={sectionAttr} style={styleOverrides}>
                {empty ? (
                  <SectionPlaceholder
                    type={`Heading · ${level.toUpperCase()}`}
                    hint="Add heading text in the studio."
                    icon={Type}
                    height="min-h-[80px]"
                  />
                ) : (
                  <Tag
                    className={cn(
                      "font-display tracking-tight",
                      sizeClass,
                      toneClass,
                    )}
                  >
                    {text}
                  </Tag>
                )}
              </div>
            );
          }

          case "paragraphElement": {
            const text = section.text || "";
            const empty = !text;
            if (empty && !isDraftMode) return null;
            const sizeClass = {
              sm: "text-sm",
              base: "text-base",
              lg: "text-lg",
              xl: "text-xl",
            }[section.size as "sm" | "base" | "lg" | "xl"] || "text-base";
            return (
              <div key={key} data-sanity={sectionAttr} style={styleOverrides}>
                {empty ? (
                  <SectionPlaceholder
                    type="Paragraph"
                    hint="Add body text in the studio."
                    icon={AlignLeft}
                    height="min-h-[80px]"
                  />
                ) : (
                  <p className={cn("leading-relaxed text-muted-foreground", sizeClass)}>
                    {text}
                  </p>
                )}
              </div>
            );
          }

          case "buttonElement": {
            const empty = !section.text && !section.label;
            if (empty && !isDraftMode) return null;
            const label = section.text || section.label || "Button";
            const variant = section.variant || "primary";
            const size = section.size || "md";
            const isSubmit = section.kind === "submit";
            const Icon = section.icon && section.icon !== "none" ? ICON_MAP[section.icon] : null;

            const sizeClass = {
              sm: "h-9 px-4 text-xs",
              md: "h-11 px-6 text-sm",
              lg: "h-12 px-8 text-base",
            }[size as "sm" | "md" | "lg"] || "h-11 px-6 text-sm";

            const variantClass =
              variant === "primary"
                ? "bg-gradient-to-b from-gold to-gold-deep text-black hover:from-gold-bright shadow-gold"
                : variant === "outline"
                  ? "border border-gold/40 text-gold hover:bg-gold/10"
                  : variant === "ghost"
                    ? "text-foreground hover:bg-accent hover:text-gold"
                    : variant === "subtle"
                      ? "bg-card text-foreground hover:bg-accent"
                      : "text-gold underline underline-offset-4 hover:text-gold-bright";

            const buttonClass = cn(
              "inline-flex items-center justify-center gap-2 rounded-md font-semibold tracking-wide transition-all",
              sizeClass,
              variantClass,
              section.fullWidth && "w-full",
            );

            const inner = (
              <>
                {label}
                {Icon && <Icon className="h-4 w-4" />}
              </>
            );

            if (empty && isDraftMode) {
              return (
                <div key={key} data-sanity={sectionAttr} style={styleOverrides}>
                  <SectionPlaceholder
                    type="Button"
                    hint="Set the button label and link/submit type."
                    icon={Square}
                    height="min-h-[60px]"
                  />
                </div>
              );
            }

            if (isSubmit) {
              return (
                <button
                  key={key}
                  type="submit"
                  data-sanity={sectionAttr}
                  className={buttonClass}
                  style={styleOverrides}
                >
                  {inner}
                </button>
              );
            }

            return (
              <a
                key={key}
                href={section.href || "#"}
                target={section.newTab ? "_blank" : undefined}
                rel={section.newTab ? "noopener noreferrer" : undefined}
                data-sanity={sectionAttr}
                className={buttonClass}
                style={styleOverrides}
              >
                {inner}
              </a>
            );
          }

          case "cardElement": {
            const empty = !section.title;
            if (empty && !isDraftMode) return null;
            const imgSrc = section.image?.asset
              ? urlFor(section.image).width(600).height(400).fit("crop").url()
              : null;
            const Icon = section.icon && section.icon !== "none" ? ICON_MAP[section.icon] : null;

            const card = (
              <div
                className={cn(
                  "flex h-full flex-col overflow-hidden rounded-2xl border border-gold/15 bg-card/40 transition-all",
                  section.hoverable && "hover:border-gold/35 hover:shadow-gold",
                )}
                style={styleOverrides}
              >
                {imgSrc ? (
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={imgSrc}
                      alt={section.image?.alt || section.title || ""}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                ) : Icon ? (
                  <div className="flex items-center justify-center bg-gradient-to-br from-gold/10 to-transparent p-10">
                    <Icon className="h-10 w-10 text-gold" />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-6">
                  {section.eyebrow && (
                    <p className="mb-2 text-xs font-semibold tracking-[0.2em] uppercase text-gold/80">
                      {section.eyebrow}
                    </p>
                  )}
                  {section.title && (
                    <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
                  )}
                  {section.description && (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {section.description}
                    </p>
                  )}
                  {section.linkLabel && (
                    <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
                      {section.linkLabel}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </p>
                  )}
                </div>
              </div>
            );

            return (
              <div key={key} data-sanity={sectionAttr} className="group">
                {empty ? (
                  <SectionPlaceholder
                    type="Card"
                    hint="Add a title, description, image/icon, and optional link."
                    icon={Square}
                  />
                ) : section.linkHref ? (
                  <a href={section.linkHref} className="block h-full">
                    {card}
                  </a>
                ) : (
                  card
                )}
              </div>
            );
          }

          case "bulletListElement": {
            const items = (section.items as Array<{ _key?: string; text?: string }>) || [];
            const hasItems = items.length > 0;
            if (!hasItems && !isDraftMode) return null;
            const style = section.style || "bullet";
            const isNumbered = style === "numbered";
            const ListTag = isNumbered ? "ol" : "ul";
            return (
              <div key={key} data-sanity={sectionAttr} style={styleOverrides}>
                {hasItems ? (
                  <ListTag className="space-y-2">
                    {items.map((it, i) => (
                      <li key={it._key} className="flex items-start gap-3 text-sm text-foreground/90">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                          {style === "check" ? (
                            <CheckCircle2 className="h-4 w-4 text-gold" />
                          ) : style === "star" ? (
                            <Star className="h-4 w-4 fill-gold text-gold" />
                          ) : style === "gold-dot" ? (
                            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                          ) : isNumbered ? (
                            <span className="text-xs font-semibold text-gold">{i + 1}.</span>
                          ) : (
                            <span className="h-1.5 w-1.5 rounded-full bg-gold/60" />
                          )}
                        </span>
                        <span>{it.text}</span>
                      </li>
                    ))}
                  </ListTag>
                ) : (
                  <SectionPlaceholder
                    type="Bullet List"
                    hint="Add list items in the studio."
                    icon={List}
                    height="min-h-[100px]"
                  />
                )}
              </div>
            );
          }

          case "formContainerElement": {
            const items = (section.items as PageSection[]) || [];
            const hasItems = items.length > 0;
            if (!section.formKey && !isDraftMode) return null;
            if (!hasItems && !isDraftMode) return null;

            const hasSubmitInside = items.some(
              (it) => it._type === "buttonElement" && it.kind === "submit",
            );

            return (
              <div key={key} data-sanity={sectionAttr}>
                {section.formKey ? (
                  <FormContainer
                    formKey={section.formKey}
                    submitLabel={section.submitLabel}
                    successMessage={section.successMessage}
                    errorMessage={section.errorMessage}
                    style={styleOverrides as CSSProperties}
                    hasSubmitInside={hasSubmitInside}
                  >
                    {hasItems ? (
                      <PageBuilder
                        sections={items}
                        documentId={documentId}
                        documentType={documentType}
                        isDraftMode={isDraftMode}
                        pathPrefix={`${prefix}[_key=="${key}"].items`}
                        isInner
                      />
                    ) : (
                      <SectionPlaceholder
                        type="Form"
                        hint="Drop Text Input / Select / Checkbox / Submit Button inside."
                        icon={Square}
                      />
                    )}
                  </FormContainer>
                ) : (
                  <SectionPlaceholder
                    type="Form"
                    hint="Set the Form Key in the studio (e.g. 'contact')."
                    icon={Square}
                  />
                )}
              </div>
            );
          }

          case "textInputElement": {
            const empty = !section.label || !section.name;
            if (empty && !isDraftMode) return null;
            const fieldId = `input-${key}`;
            return (
              <div key={key} data-sanity={sectionAttr} className="flex flex-col" style={styleOverrides}>
                {empty ? (
                  <SectionPlaceholder
                    type="Text Input"
                    hint="Set Label and Field Name in the studio."
                    icon={Type}
                    height="min-h-[100px]"
                  />
                ) : (
                  <>
                    <label
                      htmlFor={fieldId}
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      {section.label}
                      {section.required && <span className="ml-1 text-gold">*</span>}
                    </label>
                    <input
                      id={fieldId}
                      name={section.name}
                      type={section.inputType || "text"}
                      required={section.required}
                      placeholder={section.placeholder}
                      defaultValue={section.defaultValue}
                      minLength={section.minLength}
                      maxLength={section.maxLength}
                      className="h-12 w-full rounded-md border border-border bg-input/60 px-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                    {section.helpText && (
                      <p className="mt-1.5 text-xs text-muted-foreground">{section.helpText}</p>
                    )}
                  </>
                )}
              </div>
            );
          }

          case "textareaInputElement": {
            const empty = !section.label || !section.name;
            if (empty && !isDraftMode) return null;
            const fieldId = `textarea-${key}`;
            return (
              <div key={key} data-sanity={sectionAttr} className="flex flex-col" style={styleOverrides}>
                {empty ? (
                  <SectionPlaceholder
                    type="Textarea"
                    hint="Set Label and Field Name in the studio."
                    icon={AlignLeft}
                    height="min-h-[120px]"
                  />
                ) : (
                  <>
                    <label
                      htmlFor={fieldId}
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      {section.label}
                      {section.required && <span className="ml-1 text-gold">*</span>}
                    </label>
                    <textarea
                      id={fieldId}
                      name={section.name}
                      required={section.required}
                      placeholder={section.placeholder}
                      defaultValue={section.defaultValue}
                      maxLength={section.maxLength}
                      rows={section.lineCount || 4}
                      className="w-full rounded-md border border-border bg-input/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                    {section.helpText && (
                      <p className="mt-1.5 text-xs text-muted-foreground">{section.helpText}</p>
                    )}
                  </>
                )}
              </div>
            );
          }

          case "selectInputElement": {
            const empty = !section.label || !section.name || (section.options?.length ?? 0) === 0;
            if (empty && !isDraftMode) return null;
            const fieldId = `select-${key}`;
            return (
              <div key={key} data-sanity={sectionAttr} className="flex flex-col" style={styleOverrides}>
                {empty ? (
                  <SectionPlaceholder
                    type="Select"
                    hint="Set Label, Field Name, and at least one Option."
                    icon={LayoutGrid}
                    height="min-h-[100px]"
                  />
                ) : (
                  <>
                    <label
                      htmlFor={fieldId}
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      {section.label}
                      {section.required && <span className="ml-1 text-gold">*</span>}
                    </label>
                    <select
                      id={fieldId}
                      name={section.name}
                      required={section.required}
                      defaultValue={section.defaultValue || ""}
                      className="h-12 w-full rounded-md border border-border bg-input/60 px-4 text-sm text-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                    >
                      {section.placeholder && (
                        <option value="">{section.placeholder}</option>
                      )}
                      {section.options?.map((opt) => (
                        <option key={opt._key} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {section.helpText && (
                      <p className="mt-1.5 text-xs text-muted-foreground">{section.helpText}</p>
                    )}
                  </>
                )}
              </div>
            );
          }

          case "radioGroupElement": {
            const empty = !section.label || !section.name || (section.options?.length ?? 0) === 0;
            if (empty && !isDraftMode) return null;
            return (
              <div key={key} data-sanity={sectionAttr} className="flex flex-col" style={styleOverrides}>
                {empty ? (
                  <SectionPlaceholder
                    type="Radio Group"
                    hint="Set Label, Field Name, and Options in the studio."
                    icon={LayoutGrid}
                    height="min-h-[120px]"
                  />
                ) : (
                  <>
                    <p className="mb-2 block text-sm font-medium text-foreground">
                      {section.label}
                      {section.required && <span className="ml-1 text-gold">*</span>}
                    </p>
                    <div
                      className={cn(
                        "gap-3",
                        section.orientation === "vertical" ? "flex flex-col" : "grid grid-cols-2 sm:grid-cols-3",
                      )}
                    >
                      {section.options?.map((opt) => (
                        <label
                          key={opt._key}
                          className="flex cursor-pointer items-center gap-3 rounded-lg border border-gold/15 bg-card/40 px-4 py-3 transition-colors hover:border-gold/35 has-[input:checked]:border-gold has-[input:checked]:bg-gold/5"
                        >
                          <input
                            type="radio"
                            name={section.name}
                            value={opt.value}
                            required={section.required}
                            defaultChecked={section.defaultValue === opt.value}
                            className="h-4 w-4 accent-gold"
                          />
                          <span className="text-sm">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                    {section.helpText && (
                      <p className="mt-1.5 text-xs text-muted-foreground">{section.helpText}</p>
                    )}
                  </>
                )}
              </div>
            );
          }

          case "checkboxInputElement": {
            const empty = !section.label || !section.name;
            if (empty && !isDraftMode) return null;
            const fieldId = `checkbox-${key}`;
            return (
              <div key={key} data-sanity={sectionAttr} style={styleOverrides}>
                {empty ? (
                  <SectionPlaceholder
                    type="Checkbox"
                    hint="Set Label and Field Name in the studio."
                    icon={CheckCircle2}
                    height="min-h-[80px]"
                  />
                ) : (
                  <label
                    htmlFor={fieldId}
                    className="flex cursor-pointer items-start gap-3 rounded-lg border border-gold/15 bg-card/40 p-4 text-sm text-foreground transition-colors hover:border-gold/30"
                  >
                    <input
                      id={fieldId}
                      type="checkbox"
                      name={section.name}
                      value="true"
                      required={section.required}
                      defaultChecked={section.defaultValue === "true"}
                      className="mt-0.5 h-5 w-5 accent-gold"
                    />
                    <div>
                      <span className="font-medium">
                        {section.label}
                        {section.required && <span className="ml-1 text-gold">*</span>}
                      </span>
                      {section.helpText && (
                        <p className="mt-1 text-xs text-muted-foreground">{section.helpText}</p>
                      )}
                    </div>
                  </label>
                )}
              </div>
            );
          }

          // -------------------------------------------------------------
          // Hero (default fallback for unknown _type)
          // -------------------------------------------------------------
          case "heroSection":
          default: {
            const align = section.textAlign || "center";
            const imgSrc = section.image?.asset
              ? urlFor(section.image).width(1200).fit("max").url()
              : null;
            const empty = !hasAny(
              section.eyebrow,
              section.title,
              section.body,
              section.primaryCtaLabel,
              section.secondaryCtaLabel,
              imgSrc,
            );
            if (empty && !isDraftMode) return null;

            const alignClasses =
              align === "left"
                ? "items-start text-left"
                : align === "right"
                  ? "items-end text-right"
                  : "items-center text-center";

            return (
              <section
                key={key}
                data-sanity={sectionAttr}
                className={cn(
                  baseSectionClass,
                  "flex items-center py-12",
                  empty ? "min-h-[420px]" : "min-h-[calc(100vh-8rem)]",
                )}
                style={styleOverrides}
              >
                {empty ? (
                  <SectionPlaceholder
                    type="Hero"
                    hint="Add eyebrow, title, body, CTAs, and a hero image."
                    icon={Sparkles}
                    height="min-h-[320px]"
                    className="w-full"
                  />
                ) : (
                  <div
                    className={cn(
                      "mx-auto w-full max-w-7xl",
                      imgSrc
                        ? "grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24"
                        : "flex flex-col items-center",
                    )}
                  >
                    <div
                      className={cn(
                        "flex w-full flex-col gap-6",
                        imgSrc ? alignClasses : cn("max-w-4xl", alignClasses),
                      )}
                    >
                      {section.eyebrow && (
                        <p className="text-sm tracking-[0.3em] uppercase text-gold/80">
                          {section.eyebrow}
                        </p>
                      )}
                      {section.title && (
                        <h1 className="font-display text-4xl font-bold tracking-tight text-gold sm:text-6xl lg:text-7xl">
                          {section.title}
                        </h1>
                      )}
                      {!!section.body && (
                        <div className="prose prose-sm md:prose-base dark:prose-invert max-w-2xl text-muted-foreground">
                          <PortableText value={section.body as never} />
                        </div>
                      )}
                      <div
                        className={cn(
                          "mt-4 flex flex-wrap gap-4",
                          align === "center"
                            ? "justify-center"
                            : align === "right"
                              ? "justify-end"
                              : "justify-start",
                        )}
                      >
                        {section.primaryCtaLabel && section.primaryCtaHref && (
                          <CtaLink href={section.primaryCtaHref}>{section.primaryCtaLabel}</CtaLink>
                        )}
                        {section.secondaryCtaLabel && section.secondaryCtaHref && (
                          <CtaLink href={section.secondaryCtaHref} variant="secondary">
                            {section.secondaryCtaLabel}
                          </CtaLink>
                        )}
                      </div>
                    </div>
                    {imgSrc && (
                      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-gold/20">
                        <img
                          src={imgSrc}
                          alt={section.image?.alt || ""}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                )}
              </section>
            );
          }
        }
      })}
    </div>
  );
}
