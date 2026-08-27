import Link from "next/link"
import type { PageData, SiteSettings } from "@/lib/types"

export function Footer({ settings, source }: { settings: SiteSettings; source?: PageData["source"] }) {
  return (
    <footer className="mt-8 border-t border-rule bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-serif text-2xl tracking-tight">{settings.siteName}</p>
          <p className="mt-2 text-[11px] tracking-[0.18em] text-muted uppercase">{settings.place}</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-muted">{settings.footerNote}</p>
          <p className="mt-4 text-sm text-muted">River Road, Tivoli, New York 12583</p>
        </div>
        <div className="flex flex-wrap content-start gap-x-6 gap-y-2 text-sm">
          {(settings.nav ?? []).map((item) => (
            <Link key={item.href} href={item.href} className="text-ink/70 hover:text-ink">
              {item.label}
            </Link>
          ))}
          <Link href="/order" className="text-ink/70 hover:text-ink">
            Mail order
          </Link>
        </div>
      </div>
      <div className="border-t border-rule">
        <p className="mx-auto max-w-6xl px-4 py-4 text-[11px] text-muted sm:px-6">
          © {new Date().getFullYear()} {settings.siteName} · Catalog No. 14, Spring 2026
          {source ? ` · Content: ${source === "sanity" ? "Sanity live" : "local seed"}` : ""}
        </p>
      </div>
    </footer>
  )
}
