import { existsSync, readFileSync } from "node:fs"
import sharp from "sharp"
import { resolve } from "node:path"
import { createClient } from "next-sanity"
import { seed } from "../lib/content/seed"

function loadEnv() {
  const envPath = resolve(process.cwd(), ".env.local")
  if (!existsSync(envPath)) return
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const index = trimmed.indexOf("=")
    if (index === -1) continue
    const key = trimmed.slice(0, index).trim()
    const value = trimmed.slice(index + 1).trim().replace(/^["']|["']$/g, "")
    if (!process.env[key]) process.env[key] = value
  }
}

loadEnv()

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !token) {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local")
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-08-25",
  token,
  useCdn: false,
})

const KEEP_TYPES = new Set(["variety", "journalNote", "workshop", "homePage", "siteSettings"])

async function deleteStale() {
  const types: string[] = await client.fetch(`array::unique(*._type)`)
  const staleTypes = types.filter(
    (type) => !KEEP_TYPES.has(type) && !type.startsWith("sanity.") && !type.startsWith("system."),
  )
  const extraSingletons: string[] = await client.fetch(
    `*[_type in ["homePage", "siteSettings"] && !(_id in ["homePage", "siteSettings", "drafts.homePage", "drafts.siteSettings"])]._id`,
  )
  const staleIds: string[] = staleTypes.length
    ? await client.fetch(`*[_type in $types]._id`, { types: staleTypes })
    : []
  const ids = [...new Set([...staleIds, ...extraSingletons])]
  if (!ids.length) return 0
  await ids.reduce((transaction, id) => transaction.delete(id), client.transaction()).commit()
  return ids.length
}

async function deleteCatalogDrafts(ids: string[]) {
  const draftIds = ids.map((id) => `drafts.${id}`)
  const existing: string[] = await client.fetch(`*[_id in $ids]._id`, { ids: draftIds })
  if (!existing.length) return
  await existing.reduce((transaction, id) => transaction.delete(id), client.transaction()).commit()
}

function ref(id: string) {
  return { _type: "reference" as const, _ref: id }
}

function key(prefix: string, index: number) {
  return `${prefix}-${index}`
}

async function uploadPhoto(slug: string) {
  const file = resolve(process.cwd(), "public/varieties", `${slug}.jpg`)
  if (!existsSync(file)) return undefined
  const jpeg = await sharp(file).rotate().jpeg({ quality: 82, mozjpeg: true }).toBuffer()
  const asset = await client.assets.upload("image", jpeg, {
    filename: `${slug}.jpg`,
    contentType: "image/jpeg",
  })
  return { _type: "image" as const, asset: { _type: "reference" as const, _ref: asset._id } }
}

async function run() {
  const index = seed.home.sections.find((s) => s._type === "varietyIndex")
  const featured = seed.home.sections.find((s) => s._type === "featuredVariety")
  const journal = seed.home.sections.find((s) => s._type === "journalStrip")
  const workshops = seed.home.sections.find((s) => s._type === "workshopList")

  if (
    !index || index._type !== "varietyIndex" ||
    !featured || featured._type !== "featuredVariety" ||
    !journal || journal._type !== "journalStrip" ||
    !workshops || workshops._type !== "workshopList"
  ) {
    throw new Error("Seed catalog is missing required sections")
  }

  const docs: Record<string, unknown>[] = []

  for (const variety of index.varieties) {
    const photo = await uploadPhoto(variety.slug)
    docs.push({
      _id: variety._id,
      _type: "variety",
      title: variety.title,
      latin: variety.latin,
      slug: { _type: "slug", current: variety.slug },
      family: variety.family,
      days: variety.days,
      sowing: variety.sowing,
      packet: variety.packet,
      flavor: variety.flavor,
      isolation: variety.isolation,
      use: variety.use,
      stock: variety.stock,
      plate: variety.plate,
      sort: variety.sort,
      story: variety.story,
      ...(photo ? { photo } : {}),
    })
  }

  for (const note of journal.notes) {
    docs.push({
      _id: note._id,
      _type: "journalNote",
      title: note.title,
      slug: { _type: "slug", current: note.slug },
      excerpt: note.excerpt,
      season: note.season,
      sort: note.sort,
      body: note.body,
    })
  }

  for (const workshop of workshops.workshops) {
    docs.push({
      _id: workshop._id,
      _type: "workshop",
      title: workshop.title,
      date: workshop.date,
      place: workshop.place,
      notes: workshop.notes,
      seats: workshop.seats,
      sort: workshop.sort,
    })
  }

  docs.push({
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: seed.settings.siteName,
    place: seed.settings.place,
    nav: seed.settings.nav.map((item, i) => ({ _key: key("nav", i), ...item })),
    cta: seed.settings.cta,
    footerNote: seed.settings.footerNote,
    defaultSeo: seed.settings.defaultSeo,
  })

  docs.push({
    _id: "homePage",
    _type: "homePage",
    seo: seed.home.seo,
    sections: seed.home.sections.map((section) => {
      const base = { _type: section._type, _key: section._key }
      switch (section._type) {
        case "masthead":
          return {
            ...base,
            catalogNo: section.catalogNo,
            season: section.season,
            heading: section.heading,
            deck: section.deck,
            primaryCta: section.primaryCta,
          }
        case "featuredVariety":
          return { ...base, kicker: section.kicker, variety: ref(section.variety._id) }
        case "sowingTable":
          return {
            ...base,
            heading: section.heading,
            intro: section.intro,
            rows: section.rows.map((row, i) => ({ _key: key("row", i), ...row })),
          }
        case "varietyIndex":
          return {
            ...base,
            heading: section.heading,
            intro: section.intro,
            varieties: section.varieties.map((v, i) => ({ _key: key("var", i), ...ref(v._id) })),
          }
        case "journalStrip":
          return {
            ...base,
            heading: section.heading,
            notes: section.notes.map((n, i) => ({ _key: key("note", i), ...ref(n._id) })),
          }
        case "workshopList":
          return {
            ...base,
            heading: section.heading,
            intro: section.intro,
            workshops: section.workshops.map((w, i) => ({ _key: key("ws", i), ...ref(w._id) })),
          }
        case "letterCta":
          return { ...base, heading: section.heading, body: section.body, primaryCta: section.primaryCta }
        default:
          return base
      }
    }),
  })

  const tx = docs.reduce(
    (transaction, doc) => transaction.createOrReplace(doc as { _id: string; _type: string }),
    client.transaction(),
  )
  await tx.commit()
  await deleteCatalogDrafts(docs.map((doc) => String(doc._id)))
  const removed = await deleteStale()
  console.log(`Seeded ${docs.length} Thorn & Furrow documents to ${projectId}/${dataset}. Removed ${removed} leftover documents.`)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
