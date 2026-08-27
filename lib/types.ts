export type Cta = {
  label: string
  href: string
  style?: "primary" | "secondary"
  eventId?: string
}

export type NavItem = {
  label: string
  href: string
}

export type Seo = { title?: string; description?: string }

export type Variety = {
  _id: string
  title: string
  latin: string
  slug: string
  family: string
  days: string
  sowing: string
  packet: string
  story: string
  flavor: string
  isolation: string
  use: string
  stock: string
  plate: string
  image: string
  sort: number
  href: string
}

export type JournalNote = {
  _id: string
  title: string
  slug: string
  excerpt: string
  season: string
  href: string
  body?: string
  sort?: number
}

export type Workshop = {
  _id: string
  title: string
  date: string
  place: string
  notes: string
  seats?: string
  sort?: number
}

export type MastheadSection = {
  _type: "masthead"
  _key: string
  catalogNo: string
  season: string
  heading: string
  deck: string
  primaryCta: Cta
}

export type FeaturedVarietySection = {
  _type: "featuredVariety"
  _key: string
  kicker: string
  variety: Variety
}

export type SowingTableSection = {
  _type: "sowingTable"
  _key: string
  heading: string
  intro: string
  rows: { crop: string; window: string; method: string }[]
}

export type VarietyIndexSection = {
  _type: "varietyIndex"
  _key: string
  heading: string
  intro: string
  varieties: Variety[]
}

export type JournalStripSection = {
  _type: "journalStrip"
  _key: string
  heading: string
  notes: JournalNote[]
}

export type WorkshopListSection = {
  _type: "workshopList"
  _key: string
  heading: string
  intro: string
  workshops: Workshop[]
}

export type LetterCtaSection = {
  _type: "letterCta"
  _key: string
  heading: string
  body: string
  primaryCta: Cta
}

export type HomeSection =
  | MastheadSection
  | FeaturedVarietySection
  | SowingTableSection
  | VarietyIndexSection
  | JournalStripSection
  | WorkshopListSection
  | LetterCtaSection

export type SiteSettings = {
  siteName: string
  place: string
  nav: NavItem[]
  cta: Cta
  footerNote: string
  defaultSeo: Seo
}

export type HomePage = {
  seo: Seo
  sections: HomeSection[]
}

export type PageData = {
  settings: SiteSettings
  home: HomePage
  source: "sanity" | "fallback"
}
