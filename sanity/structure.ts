import type { StructureResolver } from "sanity/structure"

export const structure: StructureResolver = (S) =>
  S.list()
    .title("The farm")
    .items([
      S.listItem()
        .title("Catalog homepage")
        .id("homePage")
        .child(S.document().schemaType("homePage").documentId("homePage").title("Catalog homepage")),
      S.listItem()
        .title("Farm settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings").title("Farm settings")),
      S.divider(),
      S.documentTypeListItem("variety").title("Varieties"),
      S.documentTypeListItem("journalNote").title("Journal"),
      S.documentTypeListItem("workshop").title("Workshops"),
    ])
