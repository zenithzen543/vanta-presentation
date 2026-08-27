import Link from "next/link"

export function BackLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-sm font-medium text-moss transition hover:text-ink"
    >
      <span aria-hidden="true">←</span>
      {children}
    </Link>
  )
}
