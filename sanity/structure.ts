import type { StructureResolver } from "sanity/structure";

const SINGLETONS = ["siteSettings", "contractingFormPage", "aiAssistantSettings"];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("Contracting Form Page")
        .id("contractingFormPage")
        .child(
          S.document()
            .schemaType("contractingFormPage")
            .documentId("contractingFormPage"),
        ),
      S.divider(),
      S.documentTypeListItem("page").title("Pages"),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return id && !SINGLETONS.includes(id) && id !== "page";
      }),
    ]);
