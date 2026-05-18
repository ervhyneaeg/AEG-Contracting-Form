import { ContractingForm } from "@/components/form/ContractingForm";
import { FeatureCards } from "@/components/layout/FeatureCards";
import { FooterStats } from "@/components/layout/FooterStats";
import { HeaderHero } from "@/components/layout/HeaderHero";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { sanityFetch } from "@/sanity/lib/live";
import {
  type ContractingFormPage,
  contractingFormPageQuery,
  type SiteSettings,
  siteSettingsQuery,
} from "@/sanity/lib/queries";

export default async function ContractingPage() {
  const [{ data: pageData }, { data: settingsData }] = await Promise.all([
    sanityFetch({ query: contractingFormPageQuery }),
    sanityFetch({ query: siteSettingsQuery }),
  ]);
  const page = pageData as ContractingFormPage | null;
  const settings = settingsData as SiteSettings | null;

  return (
    <main className="bg-background min-h-screen text-foreground">
      <HeaderHero
        eyebrow={page?.hero?.eyebrow}
        title={page?.hero?.title}
        tagline={page?.hero?.tagline}
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-12 lg:grid-cols-[260px_1fr_300px] lg:gap-6">
        <LeftSidebar />

        <div>
          <ContractingForm stepsCopy={page?.steps} />
        </div>

        <RightSidebar />
      </div>

      <FeatureCards cards={page?.featureCards} />

      <FooterStats
        supportEmail={settings?.supportEmail}
        supportPhone={settings?.supportPhone}
        supportHours={settings?.supportHours}
      />
    </main>
  );
}
