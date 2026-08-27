import { defineLive } from "next-sanity/live"
import { client } from "@/sanity/lib/client"

const serverToken = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: serverToken || false,
  browserToken: false,
})
