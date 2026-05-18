import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./objects/blockContentType";
import { contractingFormPageType } from "./documents/contractingFormPageType";
import { containerSectionType } from "./objects/containerSectionType";
import { ctaSectionType } from "./objects/ctaSectionType";
import { faqSectionType } from "./objects/faqSectionType";
import { featureCardsSectionType } from "./objects/featureCardsSectionType";
import { heroSectionType } from "./objects/heroSectionType";
import { imageSectionType } from "./objects/imageSectionType";
import { logosSectionType } from "./objects/logosSectionType";
import { pageType } from "./documents/pageType";
import { richTextSectionType } from "./objects/richTextSectionType";
import { siteSettingsType } from "./documents/siteSettingsType";
import { spacerSectionType } from "./objects/spacerSectionType";
import { statsSectionType } from "./objects/statsSectionType";
import { stepsSectionType } from "./objects/stepsSectionType";
import { testimonialsSectionType } from "./objects/testimonialsSectionType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    siteSettingsType,
    contractingFormPageType,
    pageType,

    // Section objects
    heroSectionType,
    richTextSectionType,
    ctaSectionType,
    imageSectionType,
    statsSectionType,
    featureCardsSectionType,
    testimonialsSectionType,
    faqSectionType,
    logosSectionType,
    stepsSectionType,
    containerSectionType,
    spacerSectionType,

    // Supporting
    blockContentType,
  ],
};
