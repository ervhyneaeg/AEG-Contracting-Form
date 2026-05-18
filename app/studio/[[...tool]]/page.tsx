/**
 * Sanity Studio mounted in the Next.js app at /studio.
 * The catch-all route ensures all Studio sub-paths work.
 */
"use client";

import { NextStudio } from "next-sanity/studio";

import config from "@/sanity.config";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
