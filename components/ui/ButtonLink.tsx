import Link from "next/link"
import type { Cta } from "@/lib/types"

export function ButtonLink({
  cta,
  className = "",
  invert = false,
}: {
  cta: Cta
  className?: string
  invert?: boolean
}) {
  if (!cta?.href) return null
  return (
    <Link
      href={cta.href}
      className={`inline-flex h-11 items-center rounded-full px-6 text-sm font-medium tracking-wide transition ${
        invert ? "bg-paper text-ink hover:bg-paper/90" : "bg-ink text-paper hover:bg-moss"
      } ${className}`}
      data-event-id={cta.eventId}
    >
      {cta.label}
    </Link>
  )
}
