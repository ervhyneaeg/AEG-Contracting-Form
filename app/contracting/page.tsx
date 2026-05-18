import { sanityFetch } from "@/sanity/lib/live";
import { type ContractingFormPage, contractingFormPageQuery } from "@/sanity/lib/queries";

/**
 * Phase 1 will build the 4-step form here. For now: placeholder shell that pulls
 * any editable copy already in Sanity (singleton: contractingFormPage).
 */
export default async function ContractingPage() {
  const { data: raw } = await sanityFetch({ query: contractingFormPageQuery });
  const data = raw as ContractingFormPage | null;

  return (
    <main className="bg-background text-foreground flex min-h-screen items-center justify-center px-6 py-24">
      <div className="max-w-2xl text-center">
        <p className="text-sm tracking-[0.3em] uppercase text-gold/80">
          {data?.hero?.eyebrow || "Phase 1 placeholder"}
        </p>
        <h1 className="font-display mt-4 text-5xl font-bold tracking-tight text-gold sm:text-7xl">
          {data?.hero?.title || "AEG Contracting"}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {data?.hero?.tagline || "Build your empire. Legacy starts here."}
        </p>
        <p className="mt-12 text-sm text-muted-foreground">
          The 4-step contracting form will be built in Phase 1. Edit copy at{" "}
          <a href="/studio/intent/edit/id=contractingFormPage" className="text-gold underline">
            /studio → Contracting Form Page
          </a>
          .
        </p>
      </div>
    </main>
  );
}
