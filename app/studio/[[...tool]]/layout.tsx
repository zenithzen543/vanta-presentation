import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = { title: "Sanity Studio", robots: { index: false, follow: false } }
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" }

export default function StudioLayout({ children }: { children: ReactNode }) {
  return children
}
