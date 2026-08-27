import { seed } from "@/lib/content/seed"
import type { HomePage, JournalNote, PageData, SiteSettings, Variety, Workshop } from "@/lib/types"
import { isSanityConfigured } from "@/sanity/env"
import { sanityFetch } from "@/sanity/live"
import {
  allJournalQuery,
  allVarietiesQuery,
  allWorkshopsQuery,
  homeQuery,
  journalBySlugQuery,
  varietyBySlugQuery,
} from "@/sanity/lib/queries"

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

function mergeSettings(fetched?: Partial<SiteSettings> | null): SiteSettings {
  return {
    ...seed.settings,
    ...fetched,
    nav: fetched?.nav?.length ? fetched.nav : seed.settings.nav,
    cta: fetched?.cta?.href ? fetched.cta : seed.settings.cta,
    defaultSeo: { ...seed.settings.defaultSeo, ...fetched?.defaultSeo },
  }
}

async function fetchQuery<T>(query: string, params?: Record<string, unknown>, tags: string[] = []): Promise<T | null> {
  try {
    const { data } = await sanityFetch({
      query,
      ...(params ? { params } : {}),
      stega: false,
      perspective: "published",
      tags,
    })
    return (data ?? null) as T | null
  } catch {
    return null
  }
}

export async function getPageData(): Promise<PageData> {
  if (!isSanityConfigured) return seed
  const result = await fetchQuery<Pick<PageData, "settings" | "home">>(homeQuery, undefined, ["home"])
  const home = result?.home
  if (!home?.sections?.length || !home.sections.some((section) => CATALOG_TYPES.has(section._type))) {
    return { ...seed, source: "fallback" }
  }
  return {
    settings: mergeSettings(result?.settings),
    home: normalizeHome(home),
    source: "sanity",
  }
}

export async function getVariety(slug: string): Promise<Variety | null> {
  const seeded = allSeedVarieties().find((item) => item.slug === slug) ?? null
  if (!isSanityConfigured) return seeded
  const variety = await fetchQuery<Partial<Variety>>(varietyBySlugQuery, { slug }, ["varieties"])
  if (!variety) return seeded
  return mergeVariety(variety, seeded)
}

export async function getVarieties(): Promise<Variety[]> {
  const seeded = allSeedVarieties()
  if (!isSanityConfigured) return seeded
  const list = await fetchQuery<Variety[]>(allVarietiesQuery, undefined, ["varieties"])
  if (!list?.length) return seeded
  return list
    .map((item) => mergeVariety(item, seeded.find((row) => row.slug === item.slug) ?? null))
    .filter((item): item is Variety => Boolean(item))
}

export async function getJournalNote(slug: string): Promise<JournalNote | null> {
  const seeded = allSeedNotes().find((item) => item.slug === slug) ?? null
  if (!isSanityConfigured) return seeded
  const note = await fetchQuery<JournalNote>(journalBySlugQuery, { slug }, ["journal"])
  if (!note) return seeded
  return { ...note, href: `/journal/${note.slug}` }
}

export async function getJournal(): Promise<JournalNote[]> {
  const seeded = allSeedNotes()
  if (!isSanityConfigured) return seeded
  const list = await fetchQuery<JournalNote[]>(allJournalQuery, undefined, ["journal"])
  return list?.length ? list : seeded
}

export async function getWorkshops(): Promise<Workshop[]> {
  const seeded = allSeedWorkshops()
  if (!isSanityConfigured) return seeded
  const list = await fetchQuery<Workshop[]>(allWorkshopsQuery, undefined, ["workshops"])
  return list?.length ? list : seeded
}
