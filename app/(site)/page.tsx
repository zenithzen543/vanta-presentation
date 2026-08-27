import type { Metadata } from "next"
import { Sections } from "@/components/home/Sections"
import { getPageData } from "@/lib/data"

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const { home, settings } = await getPageData()
  const title = home.seo?.title || settings.defaultSeo?.title
  const description = home.seo?.description || settings.defaultSeo?.description
  return { title, description }
}

export default async function HomePage() {
  const { home } = await getPageData()
  return (
    <main id="main">
      <Sections sections={home.sections} />
    </main>
  )
}
