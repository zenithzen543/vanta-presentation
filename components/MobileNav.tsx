"use client"

import Link from "next/link"
import { useState } from "react"
import type { NavItem } from "@/lib/types"

export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false)
  if (!items.length) return null

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="rounded-full border border-rule bg-surface px-3.5 py-1.5 text-xs font-medium tracking-wide"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Close" : "Menu"}
      </button>
      {open ? (
        <div className="absolute left-0 right-0 top-16 border-b border-rule bg-paper px-4 py-4 shadow-sm">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="block py-2 text-sm" onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  )
}
