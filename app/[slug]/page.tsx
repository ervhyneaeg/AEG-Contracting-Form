import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { PageBuilder } from "@/components/page-builder/page-builder";
import { sanityFetch } from "@/sanity/lib/live";
import {
  type Page,
  pageBySlugQuery,
  type SiteSettings,
  siteSettingsQuery,
} from "@/sanity/lib/queries";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const [{ data: pageData }, { data: settingsData }] = await Promise.all([
    sanityFetch({ query: pageBySlugQuery, params: { slug }, stega: false }),
    sanityFetch({ query: siteSettingsQuery, stega: false }),
  ]);
  const page = pageData as Page | null;
  const siteSettings = settingsData as SiteSettings | null;
  if (!page) return {};
  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || siteSettings?.siteDescription,
  };
}

export default async function DynamicPage({ params }: Params) {
  const { slug } = await params;
  if (slug === "home") return notFound(); // home is served at `/`
  const { data } = await sanityFetch({ query: pageBySlugQuery, params: { slug } });
  const page = data as Page | null;
  const { isEnabled } = await draftMode();

  if (!page) notFound();

  return (
    <main className="bg-background text-foreground min-h-screen w-full">
      <PageBuilder
        sections={page.sections}
        documentId={page._id}
        documentType={page._type}
        isDraftMode={isEnabled}
      />
    </main>
  );
}
