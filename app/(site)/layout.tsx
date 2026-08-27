import type { ReactNode } from "react"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { getPageData } from "@/lib/data"

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const { settings } = await getPageData()
  return (
    <>
      <Header settings={settings} />
      <div className="flex-1">{children}</div>
      <Footer settings={settings} />
    </>
  )
}
