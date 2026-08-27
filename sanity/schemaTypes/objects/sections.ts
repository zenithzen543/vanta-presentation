import { defineArrayMember, defineField, defineType } from "sanity"

export const masthead = defineType({
  name: "masthead",
  title: "Catalog masthead",
  type: "object",
  fields: [
    defineField({ name: "catalogNo", type: "string" }),
    defineField({ name: "season", type: "string" }),
    defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "deck", type: "text", rows: 4 }),
    defineField({ name: "primaryCta", type: "cta" }),
  ],
  preview: { select: { title: "heading" }, prepare: ({ title }) => ({ title: title || "Masthead" }) },
})

export const featuredVariety = defineType({
  name: "featuredVariety",
  title: "Featured variety",
  type: "object",
  fields: [
    defineField({ name: "kicker", type: "string" }),
    defineField({ name: "variety", type: "reference", to: [{ type: "variety" }] }),
  ],
  preview: { select: { title: "variety.title" }, prepare: ({ title }) => ({ title: title || "Featured variety" }) },
})

export const sowingTable = defineType({
  name: "sowingTable",
  title: "Sowing table",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "intro", type: "text", rows: 3 }),
    defineField({ name: "rows", type: "array", of: [{ type: "sowingRow" }] }),
  ],
  preview: { prepare: () => ({ title: "Sowing table" }) },
})

export const varietyIndex = defineType({
  name: "varietyIndex",
  title: "Variety index",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "intro", type: "text", rows: 2 }),
    defineField({ name: "varieties", type: "array", of: [{ type: "reference", to: [{ type: "variety" }] }] }),
  ],
  preview: { select: { title: "heading" }, prepare: ({ title }) => ({ title: title || "Index" }) },
})

export const journalStrip = defineType({
  name: "journalStrip",
  title: "Journal strip",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "notes", type: "array", of: [{ type: "reference", to: [{ type: "journalNote" }] }] }),
  ],
  preview: { prepare: () => ({ title: "Journal" }) },
})

export const workshopList = defineType({
  name: "workshopList",
  title: "Workshop list",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "intro", type: "text", rows: 2 }),
    defineField({ name: "workshops", type: "array", of: [{ type: "reference", to: [{ type: "workshop" }] }] }),
  ],
  preview: { prepare: () => ({ title: "Workshops" }) },
})

export const letterCta = defineType({
  name: "letterCta",
  title: "Letter / CTA",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", type: "text", rows: 4 }),
    defineField({ name: "primaryCta", type: "cta" }),
  ],
  preview: { select: { title: "heading" }, prepare: ({ title }) => ({ title: title || "Letter" }) },
})

export const pageSections = [
  defineArrayMember({ type: "masthead" }),
  defineArrayMember({ type: "featuredVariety" }),
  defineArrayMember({ type: "sowingTable" }),
  defineArrayMember({ type: "varietyIndex" }),
  defineArrayMember({ type: "journalStrip" }),
  defineArrayMember({ type: "workshopList" }),
  defineArrayMember({ type: "letterCta" }),
]
