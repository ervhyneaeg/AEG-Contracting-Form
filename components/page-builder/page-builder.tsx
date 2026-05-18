"use client";

/**
 * Page-builder dispatcher. Renders a Sanity page's `sections[]` array.
 * data-sanity attributes enable Presentation Tool overlays
 * (hover/click in /studio's preview pane to add, move, edit, or delete sections).
 */
import { PortableText } from "@portabletext/react";
import { createDataAttribute } from "next-sanity";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";

type PageSection = {
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
  layout?: "grid" | "flex" | "stack";
  columns?: number;
  gap?: string;
  image?: { asset?: { _id?: string; url?: string }; alt?: string };
  imageDark?: { asset?: { _id?: string; url?: string }; alt?: string };
  stats?: Array<{ _key?: string; value?: string; label?: string }>;
  features?: Array<{ _key?: string; title?: string; description?: string; icon?: string }>;
  items?: PageSection[];
};

type PageBuilderProps = {
  sections?: PageSection[] | null;
  documentId?: string;
  documentType?: string;
  isDraftMode?: boolean;
  pathPrefix?: string;
  isInner?: boolean;
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
  const base = "inline-flex items-center justify-center px-8 py-3 text-sm font-semibold tracking-wide transition-all rounded-md";
  const styles =
    variant === "primary"
      ? "bg-gold text-black hover:bg-gold/90 shadow-gold"
      : "border border-gold/40 text-gold hover:bg-gold/10";
  return (
    <a href={href} className={cn(base, styles)}>
      {children}
    </a>
  );
}

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
        <div className="mt-10 rounded-2xl border border-dashed border-gold/30 bg-card/30 px-6 py-16 text-center text-muted-foreground">
          Add sections to this page in Sanity Studio.
        </div>
      </section>
    );
  }

  return (
    <div data-sanity={sectionsContainerAttr} className="contents">
      {sections.map((section) => {
        const key = section._key || "unknown";
        const sectionAttr = createSectionAttr(section._key);

        switch (section._type) {
          case "spacerSection":
            return (
              <div
                key={key}
                data-sanity={sectionAttr}
                style={{ height: (section.paddingTop || 24) + (section.paddingBottom || 24) }}
              />
            );

          case "richTextSection": {
            const align = section.textAlign || "left";
            const alignClass =
              align === "center" ? "text-center mx-auto" : align === "right" ? "text-right ml-auto" : "text-left mr-auto";
            return (
              <section
                key={key}
                data-sanity={sectionAttr}
                className={baseSectionClass}
                style={{
                  paddingTop: section.paddingTop ?? 80,
                  paddingBottom: section.paddingBottom ?? 80,
                }}
              >
                <div className={cn("max-w-3xl space-y-4", alignClass)}>
                  {section.eyebrow && (
                    <p className="text-sm tracking-[0.3em] uppercase text-gold/80">{section.eyebrow}</p>
                  )}
                  {section.title && (
                    <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{section.title}</h2>
                  )}
                  {section.body ? (
                    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-muted-foreground">
                      <PortableText value={section.body as never} />
                    </div>
                  ) : null}
                </div>
              </section>
            );
          }

          case "ctaSection":
            return (
              <section key={key} data-sanity={sectionAttr} className={cn(baseSectionClass, "py-20")}>
                <div className="bg-card/40 border border-gold/20 flex h-full flex-col justify-center rounded-3xl px-8 py-12 text-center">
                  {section.eyebrow && (
                    <p className="text-sm tracking-[0.3em] uppercase text-gold/80">{section.eyebrow}</p>
                  )}
                  {section.title && (
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{section.title}</h2>
                  )}
                  {section.body ? (
                    <div className="prose prose-sm md:prose-base dark:prose-invert mx-auto mt-4 max-w-2xl text-muted-foreground">
                      <PortableText value={section.body as never} />
                    </div>
                  ) : null}
                  <div className="mt-auto flex flex-wrap items-center justify-center gap-4 py-4">
                    {section.primaryCtaLabel && section.primaryCtaHref && (
                      <CtaLink href={section.primaryCtaHref}>{section.primaryCtaLabel}</CtaLink>
                    )}
                    {section.secondaryCtaLabel && section.secondaryCtaHref && (
                      <a
                        href={section.secondaryCtaHref}
                        className="text-foreground text-sm font-medium underline underline-offset-4"
                      >
                        {section.secondaryCtaLabel}
                      </a>
                    )}
                  </div>
                </div>
              </section>
            );

          case "imageSection": {
            const imgSrc = section.image?.asset ? urlFor(section.image).width(1600).fit("max").url() : null;
            return (
              <section
                key={key}
                data-sanity={sectionAttr}
                className={baseSectionClass}
                style={{
                  paddingTop: section.paddingTop ?? 0,
                  paddingBottom: section.paddingBottom ?? 0,
                }}
              >
                {imgSrc ? (
                  <img src={imgSrc} alt={section.image?.alt || ""} className="w-full rounded-2xl object-cover" />
                ) : isDraftMode ? (
                  <div className="rounded-2xl border border-dashed border-gold/30 bg-card/30 px-6 py-16 text-center text-muted-foreground">
                    Add an image in Sanity Studio.
                  </div>
                ) : null}
              </section>
            );
          }

          case "statsSection":
            return (
              <section
                key={key}
                data-sanity={sectionAttr}
                className={baseSectionClass}
                style={{
                  paddingTop: section.paddingTop ?? 48,
                  paddingBottom: section.paddingBottom ?? 48,
                }}
              >
                {(section.eyebrow || section.title) && (
                  <div className="mb-8 text-center">
                    {section.eyebrow && (
                      <p className="text-sm tracking-[0.3em] uppercase text-gold/80">{section.eyebrow}</p>
                    )}
                    {section.title && (
                      <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{section.title}</h2>
                    )}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
                  {section.stats?.map((s) => (
                    <div key={s._key} className="flex flex-col items-center text-center">
                      <span className="text-3xl font-bold text-gold sm:text-4xl">{s.value}</span>
                      <span className="mt-1 text-xs tracking-widest uppercase text-muted-foreground">{s.label}</span>
                    </div>
                  ))}
                </div>
              </section>
            );

          case "featureCardsSection":
            return (
              <section
                key={key}
                data-sanity={sectionAttr}
                className={baseSectionClass}
                style={{
                  paddingTop: section.paddingTop ?? 64,
                  paddingBottom: section.paddingBottom ?? 64,
                }}
              >
                {(section.eyebrow || section.title || section.description) && (
                  <div className="mb-10 text-center">
                    {section.eyebrow && (
                      <p className="text-sm tracking-[0.3em] uppercase text-gold/80">{section.eyebrow}</p>
                    )}
                    {section.title && (
                      <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{section.title}</h2>
                    )}
                    {section.description && (
                      <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{section.description}</p>
                    )}
                  </div>
                )}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {section.features?.map((f) => (
                    <div
                      key={f._key}
                      className="rounded-2xl border border-gold/20 bg-card/40 p-6 transition-colors hover:border-gold/40"
                    >
                      <h3 className="text-base font-semibold tracking-wide uppercase text-gold">{f.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            );

          case "containerSection": {
            const layout = section.layout || "grid";
            const columns = section.columns || 3;
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
                }}
              >
                {(section.eyebrow || section.title || section.description) && (
                  <div className="mb-10 max-w-3xl text-center mx-auto">
                    {section.eyebrow && (
                      <p className="mb-3 text-sm tracking-[0.3em] uppercase text-gold/80">{section.eyebrow}</p>
                    )}
                    {section.title && (
                      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{section.title}</h2>
                    )}
                    {section.description && (
                      <p className="mt-4 text-lg text-muted-foreground">{section.description}</p>
                    )}
                  </div>
                )}
                {section.items && section.items.length > 0 ? (
                  <div className={cn(layoutClass, gap)}>
                    <PageBuilder
                      sections={section.items}
                      documentId={documentId}
                      documentType={documentType}
                      isDraftMode={isDraftMode}
                      pathPrefix={`${prefix}[_key=="${key}"].items`}
                      isInner
                    />
                  </div>
                ) : isDraftMode ? (
                  <div className="rounded-2xl border border-dashed border-gold/30 bg-card/30 px-6 py-16 text-center text-muted-foreground">
                    Add items to this container in Sanity Studio.
                  </div>
                ) : null}
              </section>
            );
          }

          case "heroSection":
          default: {
            const align = section.textAlign || "center";
            const imgSrc = section.image?.asset ? urlFor(section.image).width(1200).fit("max").url() : null;
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
                className={cn(baseSectionClass, "mt-16 flex min-h-[calc(100vh-8rem)] items-center py-12 lg:mt-24")}
              >
                <div
                  className={cn(
                    "mx-auto w-full max-w-7xl",
                    imgSrc
                      ? "grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24"
                      : "flex flex-col items-center",
                  )}
                >
                  <div className={cn("flex w-full flex-col gap-6", imgSrc ? alignClasses : cn("max-w-4xl", alignClasses))}>
                    {section.eyebrow && (
                      <p className="text-sm tracking-[0.3em] uppercase text-gold/80">{section.eyebrow}</p>
                    )}
                    <h1 className="font-display text-4xl font-bold tracking-tight text-gold sm:text-6xl lg:text-7xl">
                      {section.title || "Add a title in Sanity"}
                    </h1>
                    {section.body ? (
                      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-2xl text-muted-foreground">
                        <PortableText value={section.body as never} />
                      </div>
                    ) : null}
                    <div
                      className={cn(
                        "mt-4 flex flex-wrap gap-4",
                        align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start",
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
                      <img src={imgSrc} alt={section.image?.alt || ""} className="h-full w-full object-cover" />
                    </div>
                  )}
                </div>
              </section>
            );
          }
        }
      })}
    </div>
  );
}
