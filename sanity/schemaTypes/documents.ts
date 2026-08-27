import { defineField, defineType } from "sanity"
import { pageSections } from "./objects/sections"

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Farm settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", type: "string", initialValue: "Thorn & Furrow", validation: (r) => r.required() }),
    defineField({ name: "place", type: "string" }),
    defineField({ name: "nav", type: "array", of: [{ type: "navItem" }] }),
    defineField({ name: "cta", type: "cta" }),
    defineField({ name: "footerNote", type: "text", rows: 2 }),
    defineField({ name: "defaultSeo", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Farm settings" }) },
})

export const homePage = defineType({
  name: "homePage",
  title: "Catalog homepage",
  type: "document",
  fields: [
    defineField({ name: "seo", type: "seo" }),
    defineField({ name: "sections", title: "Catalog sections", type: "array", of: pageSections }),
  ],
  preview: { prepare: () => ({ title: "Catalog homepage" }) },
})

export const variety = defineType({
  name: "variety",
  title: "Variety",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Common name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "latin", title: "Latin name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({
      name: "family",
      title: "Catalog family",
      type: "string",
      options: {
        list: [
          "Tomato",
          "Pepper",
          "Cucumber",
          "Squash",
          "Melon",
          "Bean",
          "Pea",
          "Brassica",
          "Greens",
          "Root",
          "Allium",
          "Corn",
        ],
      },
    }),
    defineField({ name: "days", title: "Days to maturity", type: "string" }),
    defineField({ name: "sowing", type: "string" }),
    defineField({ name: "packet", title: "Packet", type: "string" }),
    defineField({ name: "flavor", type: "string" }),
    defineField({ name: "isolation", type: "text", rows: 2 }),
    defineField({ name: "use", title: "Kitchen use", type: "string" }),
    defineField({
      name: "stock",
      type: "string",
      options: { list: ["In the shed", "Limited", "Wait list"] },
    }),
    defineField({
      name: "photo",
      title: "Packet photograph",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "plate",
      title: "Packet plate color",
      type: "string",
      description: "Fallback color if the photograph is missing",
    }),
    defineField({ name: "sort", type: "number" }),
    defineField({ name: "story", type: "text", rows: 5, validation: (r) => r.required() }),
  ],
  preview: { select: { title: "title", subtitle: "family", media: "photo" } },
})

export const journalNote = defineType({
  name: "journalNote",
  title: "Journal note",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "excerpt", type: "text", rows: 3 }),
    defineField({ name: "season", type: "string" }),
    defineField({ name: "sort", type: "number" }),
    defineField({ name: "body", type: "text", rows: 12 }),
  ],
  preview: { select: { title: "title", subtitle: "season" } },
})

export const workshop = defineType({
  name: "workshop",
  title: "Workshop",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "date", type: "string" }),
    defineField({ name: "place", type: "string" }),
    defineField({ name: "seats", type: "string" }),
    defineField({ name: "sort", type: "number" }),
    defineField({ name: "notes", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "title", subtitle: "date" } },
})
