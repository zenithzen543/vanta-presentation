export const ctaProjection = `{ label, href, eventId }`

const varietyProjection = `{
  _id, title, latin, "slug": slug.current, family, days, sowing, packet, story,
  flavor, isolation, use, stock, plate, sort,
  "image": select(
    defined(photo.asset->url) && photo.asset->extension != "png" => photo.asset->url,
    "/varieties/" + slug.current + ".jpg"
  ),
  "href": "/varieties/" + slug.current
}`

export const homeQuery = `{
  "settings": *[_id == "siteSettings"][0]{
    siteName, place, nav[]{ label, href }, cta${ctaProjection}, footerNote,
    defaultSeo{ title, description }
  },
  "home": *[_id == "homePage"][0]{
    seo{ title, description },
    sections[]{
      _type, _key, catalogNo, season, heading, deck, kicker, intro, body,
      primaryCta${ctaProjection},
      variety->${varietyProjection},
      rows[]{ crop, window, method },
      varieties[]->${varietyProjection},
      notes[]->{
        _id, title, "slug": slug.current, excerpt, season, sort,
        "href": "/journal/" + slug.current
      },
      workshops[]->{ _id, title, date, place, notes, seats, sort }
    }
  }
}`

export const varietyBySlugQuery = `*[_type == "variety" && slug.current == $slug][0]{
  _id, title, latin, "slug": slug.current, family, days, sowing, packet, story,
  flavor, isolation, use, stock, plate, sort,
  "image": select(
    defined(photo.asset->url) && photo.asset->extension != "png" => photo.asset->url,
    "/varieties/" + slug.current + ".jpg"
  )
}`

export const allVarietiesQuery = `*[_type == "variety"] | order(sort asc, title asc){
  _id, title, latin, "slug": slug.current, family, days, sowing, packet, story,
  flavor, isolation, use, stock, plate, sort,
  "image": select(
    defined(photo.asset->url) && photo.asset->extension != "png" => photo.asset->url,
    "/varieties/" + slug.current + ".jpg"
  ),
  "href": "/varieties/" + slug.current
}`

export const journalBySlugQuery = `*[_type == "journalNote" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, excerpt, season, body, sort
}`

export const allJournalQuery = `*[_type == "journalNote"] | order(sort asc){
  _id, title, "slug": slug.current, excerpt, season, sort,
  "href": "/journal/" + slug.current
}`

export const allWorkshopsQuery = `*[_type == "workshop"] | order(sort asc){ _id, title, date, place, notes, seats, sort }`
