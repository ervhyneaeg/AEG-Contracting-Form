import "@/app/globals.css";

import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";

import { inter, playfair } from "@/lib/fonts";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { type SiteSettings, siteSettingsQuery } from "@/sanity/lib/queries";

async function getSiteSettings(): Promise<SiteSettings | null> {
  const { data } = await sanityFetch({ query: siteSettingsQuery });
  return (data as SiteSettings | null) ?? null;
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings().catch(() => null);

  const siteTitle = settings?.siteTitle || "AEG Contracting";
  const description =
    settings?.siteDescription ||
    "Build your empire. Legacy starts here. Andreas Empire Group contracting & onboarding.";
  const siteUrl = settings?.siteUrl || "http://localhost:3000";
  const ogImage = settings?.ogImage?.asset
    ? urlFor(settings.ogImage).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title: { default: siteTitle, template: `%s – ${siteTitle}` },
    metadataBase: new URL(siteUrl),
    description,
    openGraph: {
      type: "website",
      url: siteUrl,
      title: siteTitle,
      description,
      siteName: siteTitle,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description,
      images: ogImage ? [ogImage] : undefined,
      creator: settings?.twitterHandle,
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { isEnabled } = await draftMode();

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} dark`} suppressHydrationWarning>
      <body className="bg-background text-foreground font-sans antialiased">
        {children}
        <SanityLive />
        {isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
