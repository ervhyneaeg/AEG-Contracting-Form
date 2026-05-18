import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./objects/blockContentType";
import { blockStylesType } from "./objects/blockStylesType";
import { contractingFormPageType } from "./documents/contractingFormPageType";
import { columnContainerType } from "./objects/columnContainerType";
import { containerSectionType } from "./objects/containerSectionType";
import { ctaSectionType } from "./objects/ctaSectionType";

// Atomic elements (Phase 1e)
import { bulletListElement } from "./objects/elements/bulletListElement";
import { buttonElement } from "./objects/elements/buttonElement";
import { cardElement } from "./objects/elements/cardElement";
import { checkboxInputElement } from "./objects/elements/checkboxInputElement";
import { formContainerElement } from "./objects/elements/formContainerElement";
import { headingElement } from "./objects/elements/headingElement";
import { paragraphElement } from "./objects/elements/paragraphElement";
import { radioGroupElement } from "./objects/elements/radioGroupElement";
import { selectInputElement } from "./objects/elements/selectInputElement";
import { textareaInputElement } from "./objects/elements/textareaInputElement";
import { textInputElement } from "./objects/elements/textInputElement";
import { faqSectionType } from "./objects/faqSectionType";
import { featureCardsSectionType } from "./objects/featureCardsSectionType";
import { heroSectionType } from "./objects/heroSectionType";
import { imageSectionType } from "./objects/imageSectionType";
import { logosSectionType } from "./objects/logosSectionType";
import { pageType } from "./documents/pageType";
import { richTextSectionType } from "./objects/richTextSectionType";
import { rowContainerType } from "./objects/rowContainerType";
import { sectionContainerType } from "./objects/sectionContainerType";
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

    // Structural containers (Section > Row > Column)
    sectionContainerType,
    rowContainerType,
    columnContainerType,

    // Section objects (composed page-level blocks)
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

    // Atomic content elements (drop into Columns)
    headingElement,
    paragraphElement,
    buttonElement,
    cardElement,
    bulletListElement,

    // Atomic form elements
    formContainerElement,
    textInputElement,
    textareaInputElement,
    selectInputElement,
    radioGroupElement,
    checkboxInputElement,

    // Supporting
    blockContentType,
    blockStylesType,
  ],
};
