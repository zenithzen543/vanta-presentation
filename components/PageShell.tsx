import type { ReactNode } from "react"
import { BackLink } from "@/components/ui/BackLink"

export function PageShell({
  back,
  kicker,
  title,
  latin,
  wide,
  children,
}: {
  back?: { href: string; label: string }
  kicker?: string
  title: string
  latin?: string
  wide?: boolean
  children?: ReactNode
}) {
  return (
    <main id="main" className={`mx-auto px-4 py-16 sm:px-6 sm:py-20 ${wide ? "max-w-6xl" : "max-w-2xl"}`}>
      {back ? (
        <div className="mb-8">
          <BackLink href={back.href}>{back.label}</BackLink>
        </div>
      ) : null}
      {kicker ? <p className="text-[11px] font-medium tracking-[0.2em] text-moss uppercase">{kicker}</p> : null}
      {latin ? <p className="mt-3 text-sm italic text-muted">{latin}</p> : null}
      <h1 className={`${kicker || latin ? "mt-3" : ""} font-serif text-4xl tracking-tight text-ink sm:text-5xl`}>{title}</h1>
      <div className="mt-8 space-y-4 text-base leading-8">{children}</div>
    </main>
  )
}
