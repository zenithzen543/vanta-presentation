import { defineField, defineType } from "sanity"

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "description", type: "text", rows: 3 }),
  ],
})

export const cta = defineType({
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "eventId",
      type: "string",
      title: "Analytics event ID",
      description: "Stable GTM id. Marketing can change the label.",
    }),
  ],
})

export const navItem = defineType({
  name: "navItem",
  title: "Nav item",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", type: "string", validation: (r) => r.required() }),
  ],
})

export const sowingRow = defineType({
  name: "sowingRow",
  title: "Sowing row",
  type: "object",
  fields: [
    defineField({ name: "crop", type: "string", validation: (r) => r.required() }),
    defineField({ name: "window", type: "string", validation: (r) => r.required() }),
    defineField({ name: "method", type: "string", validation: (r) => r.required() }),
  ],
})
