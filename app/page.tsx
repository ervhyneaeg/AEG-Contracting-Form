import { draftMode } from "next/headers";

import { PageBuilder } from "@/components/page-builder/page-builder";
import { sanityFetch } from "@/sanity/lib/live";
import { type Page, pageBySlugQuery } from "@/sanity/lib/queries";

export default async function HomePage() {
  const { isEnabled } = await draftMode();
  const { data } = await sanityFetch({
    query: pageBySlugQuery,
    params: { slug: "home" },
  });
  const page = data as Page | null;

  if (!page) {
    // First-run experience: no "home" page yet in Sanity.
    return (
      <main className="bg-background text-foreground flex min-h-screen items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-gold/80">AEG Contracting</p>
          <h1 className="font-display mt-4 text-5xl font-bold tracking-tight text-gold">
            Build Your Empire.
          </h1>
          <p className="mt-4 text-muted-foreground">
            No <code className="text-gold">home</code> page exists yet in Sanity. Open{" "}
            <a href="/studio" className="text-gold underline underline-offset-4">
              /studio
            </a>{" "}
            to create one (slug: <code className="text-gold">home</code>), then add sections.
          </p>
          <a
            href="/contracting"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-gold px-8 py-3 text-sm font-semibold text-black hover:bg-gold/90"
          >
            Go to Contracting Form →
          </a>
        </div>
      </main>
    );
  }

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
