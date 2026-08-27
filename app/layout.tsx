import type { Metadata } from "next"
import { DM_Sans, Fraunces } from "next/font/google"
import { DevHydrationGuard } from "@/components/DevHydrationGuard"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Thorn & Furrow — heirloom seed from the Hudson Valley",
    template: "%s | Thorn & Furrow",
  },
  description: "A small catalog of vegetables we still grow out ourselves, plus a seasonal journal and workshops at the farm.",
}

const sans = DM_Sans({ subsets: ["latin"], variable: "--font-dm" })
const serif = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" })

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink" suppressHydrationWarning>
        <DevHydrationGuard />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
          suppressHydrationWarning
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
