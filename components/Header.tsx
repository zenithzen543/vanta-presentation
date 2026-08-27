import Link from "next/link"
import { MobileNav } from "@/components/MobileNav"
import { ButtonLink } from "@/components/ui/ButtonLink"
import type { SiteSettings } from "@/lib/types"

export function Header({ settings }: { settings: SiteSettings }) {
  const nav = settings.nav ?? []

  return (
    <header className="sticky top-0 z-40 border-b border-rule/80 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="min-w-0">
          <Link
            href="/"
            className="font-serif text-xl tracking-tight text-ink"
            aria-label={`${settings.siteName} home`}
            suppressHydrationWarning
          >
            {settings.siteName}
          </Link>
          <p className="hidden text-[10px] tracking-[0.18em] text-muted uppercase sm:block">{settings.place}</p>
        </div>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-[13px] text-ink/70 transition hover:text-ink after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-ink after:transition after:duration-200 hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
          {settings.cta?.href ? <ButtonLink cta={settings.cta} className="h-9 px-4 text-xs" /> : null}
        </nav>
        <MobileNav items={nav} />
      </div>
    </header>
  )
}
