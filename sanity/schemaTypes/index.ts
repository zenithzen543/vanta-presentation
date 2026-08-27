import { homePage, journalNote, siteSettings, variety, workshop } from "./documents"
import {
  featuredVariety,
  journalStrip,
  letterCta,
  masthead,
  sowingTable,
  varietyIndex,
  workshopList,
} from "./objects/sections"
import { cta, navItem, seo, sowingRow } from "./objects/shared"

export const schemaTypes = [
  seo,
  cta,
  navItem,
  sowingRow,
  masthead,
  featuredVariety,
  sowingTable,
  varietyIndex,
  journalStrip,
  workshopList,
  letterCta,
  siteSettings,
  homePage,
  variety,
  journalNote,
  workshop,
]
