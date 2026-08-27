import type { Variety } from "@/lib/types"

export const FAMILY_ORDER = [
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
] as const

export function groupByFamily(varieties: Variety[]) {
  const groups = new Map<string, Variety[]>()
  for (const family of FAMILY_ORDER) groups.set(family, [])
  for (const variety of varieties) {
    const family = variety.family || "Other"
    if (!groups.has(family)) groups.set(family, [])
    groups.get(family)!.push(variety)
  }
  return [...groups.entries()].filter(([, list]) => list.length)
}

export function relatedInFamily(varieties: Variety[], current: Variety) {
  return varieties.filter((item) => item.family === current.family && item._id !== current._id)
}
