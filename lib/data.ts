import { seed } from "@/lib/content/seed"
import type { HomePage, JournalNote, PageData, SiteSettings, Variety, Workshop } from "@/lib/types"
import { isSanityConfigured } from "@/sanity/env"
import { client } from "@/sanity/lib/client"
import {
  allJournalQuery,
  allVarietiesQuery,
  allWorkshopsQuery,
  homeQuery,
  journalBySlugQuery,
  varietyBySlugQuery,
} from "@/sanity/lib/queries"

function fetchOpts(tags: string[]) {
  return {
    next: {
      revalidate: process.env.NODE_ENV === "development" ? 0 : 60,
      tags,
    },
  }
}

function allSeedVarieties(): Variety[] {
  const section = seed.home.sections.find((item) => item._type === "varietyIndex")
  return section && section._type === "varietyIndex" ? section.varieties : []
}

function allSeedNotes(): JournalNote[] {
  const section = seed.home.sections.find((item) => item._type === "journalStrip")
  return section && section._type === "journalStrip" ? section.notes : []
}

function usableImage(url?: string, slug?: string) {
  if (url && !/\.png(\?|$)/i.test(url)) return url
  return slug ? `/varieties/${slug}.jpg` : url || ""
}

function normalizeHome(home: HomePage): HomePage {
  return {
    ...home,
    sections: home.sections.map((section) => {
      if (section._type === "featuredVariety" && section.variety) {
        return {
          ...section,
          variety: { ...section.variety, image: usableImage(section.variety.image, section.variety.slug) },
        }
      }
      if (section._type === "varietyIndex") {
        return {
          ...section,
          varieties: (section.varieties ?? []).map((variety) => ({
            ...variety,
            image: usableImage(variety.image, variety.slug),
          })),
        }
      }
      return section
    }),
  }
}

function mergeVariety(fetched: Partial<Variety>, seeded: Variety | null): Variety | null {
  if (!fetched?.slug && !seeded) return null
  const slug = fetched.slug || seeded?.slug
  if (!slug) return null
  return {
    _id: fetched._id || seeded?._id || slug,
    title: fetched.title || seeded?.title || "",
    latin: fetched.latin || seeded?.latin || "",
    slug,
    family: fetched.family || seeded?.family || "",
    days: fetched.days || seeded?.days || "",
    sowing: fetched.sowing || seeded?.sowing || "",
    packet: fetched.packet || seeded?.packet || "",
    story: fetched.story || seeded?.story || "",
    flavor: fetched.flavor || seeded?.flavor || "",
    isolation: fetched.isolation || seeded?.isolation || "",
    use: fetched.use || seeded?.use || "",
    stock: fetched.stock || seeded?.stock || "",
    plate: fetched.plate || seeded?.plate || "#3d4a32",
    image: usableImage(fetched.image, slug) || seeded?.image || "",
    sort: fetched.sort ?? seeded?.sort ?? 99,
    href: `/varieties/${slug}`,
  }
}

function allSeedWorkshops(): Workshop[] {
  const section = seed.home.sections.find((item) => item._type === "workshopList")
  return section && section._type === "workshopList" ? section.workshops : []
}

const CATALOG_TYPES = new Set([
  "masthead",
  "featuredVariety",
  "sowingTable",
  "varietyIndex",
  "journalStrip",
  "workshopList",
  "letterCta",
])

function isCatalogPayload(settings: SiteSettings, home: HomePage) {
  const hasCatalogSection = home.sections.some((section) => CATALOG_TYPES.has(section._type))
  const hasFarmSettings = Boolean(settings.place && settings.footerNote && settings.nav?.length)
  return hasCatalogSection && hasFarmSettings
}

export async function getPageData(): Promise<PageData> {
  if (!isSanityConfigured) return seed
  try {
    const result = await client.fetch<Pick<PageData, "settings" | "home">>(homeQuery, {}, fetchOpts(["home"]))
    if (!result?.home?.sections?.length || !result.settings || !isCatalogPayload(result.settings, result.home)) {
      return { ...seed, source: "fallback" }
    }
    return { ...result, home: normalizeHome(result.home), source: "sanity" }
  } catch {
    return { ...seed, source: "fallback" }
  }
}

export async function getVariety(slug: string): Promise<Variety | null> {
  const seeded = allSeedVarieties().find((item) => item.slug === slug) ?? null
  if (!isSanityConfigured) return seeded
  try {
    const variety = await client.fetch(varietyBySlugQuery, { slug }, fetchOpts(["varieties"]))
    if (!variety) return seeded
    return mergeVariety(variety, seeded)
  } catch {
    return seeded
  }
}

export async function getVarieties(): Promise<Variety[]> {
  const seeded = allSeedVarieties()
  if (!isSanityConfigured) return seeded
  try {
    const list = await client.fetch<Variety[]>(allVarietiesQuery, {}, fetchOpts(["varieties"]))
    if (!list?.length) return seeded
    return list
      .map((item) => mergeVariety(item, seeded.find((row) => row.slug === item.slug) ?? null))
      .filter((item): item is Variety => Boolean(item))
  } catch {
    return seeded
  }
}

export async function getJournalNote(slug: string): Promise<JournalNote | null> {
  const seeded = allSeedNotes().find((item) => item.slug === slug) ?? null
  if (!isSanityConfigured) return seeded
  try {
    const note = await client.fetch(journalBySlugQuery, { slug }, fetchOpts(["journal"]))
    if (!note) return seeded
    return { ...note, href: `/journal/${note.slug}` }
  } catch {
    return seeded
  }
}

export async function getJournal(): Promise<JournalNote[]> {
  const seeded = allSeedNotes()
  if (!isSanityConfigured) return seeded
  try {
    const list = await client.fetch<JournalNote[]>(allJournalQuery, {}, fetchOpts(["journal"]))
    return list?.length ? list : seeded
  } catch {
    return seeded
  }
}

export async function getWorkshops(): Promise<Workshop[]> {
  const seeded = allSeedWorkshops()
  if (!isSanityConfigured) return seeded
  try {
    const list = await client.fetch<Workshop[]>(allWorkshopsQuery, {}, fetchOpts(["workshops"]))
    return list?.length ? list : seeded
  } catch {
    return seeded
  }
}
