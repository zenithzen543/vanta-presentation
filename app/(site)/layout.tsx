import type { ReactNode } from "react"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { getPageData } from "@/lib/data"
import { isSanityConfigured } from "@/sanity/env"
import { SanityLive } from "@/sanity/live"

export const revalidate = process.env.NODE_ENV === "development" ? 0 : 60

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const { settings, source } = await getPageData()
  return (
    <>
      <Header settings={settings} />
      <div className="flex-1">{children}</div>
      <Footer settings={settings} source={source} />
      {isSanityConfigured ? <SanityLive /> : null}
    </>
  )
}
