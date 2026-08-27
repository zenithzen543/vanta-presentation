"use client"

import { FormEvent, useMemo, useState } from "react"
import { PacketPhoto } from "@/components/PacketPhoto"
import { track } from "@/components/Analytics"
import type { Variety } from "@/lib/types"

export function OrderForm({ varieties, preset }: { varieties: Variety[]; preset?: string }) {
  const [sent, setSent] = useState(false)
  const initial = useMemo(() => (preset ? [preset] : []), [preset])
  const [picked, setPicked] = useState<string[]>(initial)

  function toggle(slug: string) {
    setPicked((current) => (current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]))
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    track("order_request", { packets: picked.join(",") })
    setSent(true)
  }

  if (sent) {
    return (
      <p className="rounded-2xl border border-rule bg-surface p-6 leading-7">
        Thank you. We will write back with a packet list
        {picked.length ? ` (${picked.length} marked)` : ""} and what is actually in the shed this week. Packets ship March through June, packed the week they leave.
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8">
      <fieldset>
        <legend className="font-serif text-2xl tracking-tight">Packets you want on the list</legend>
        <p className="mt-1 text-sm text-muted">Mark what you want. We confirm what is actually in the shed.</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {varieties.map((variety) => {
            const on = picked.includes(variety.slug)
            return (
              <li key={variety._id}>
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border bg-surface p-3 text-sm transition ${
                    on ? "border-ink" : "border-rule hover:border-ink/30"
                  }`}
                >
                  <PacketPhoto
                    image={variety.image}
                    plate={variety.plate}
                    title={variety.title}
                    className="h-14 w-11 shrink-0 rounded-lg"
                    sizes="48px"
                  />
                  <input
                    type="checkbox"
                    name="packets"
                    value={variety.slug}
                    checked={on}
                    onChange={() => toggle(variety.slug)}
                    className="sr-only"
                  />
                  <span>
                    <span className="block font-serif text-lg leading-tight">{variety.title}</span>
                    <span className="text-xs text-muted">
                      {variety.family} · {variety.packet} · {variety.stock}
                    </span>
                  </span>
                </label>
              </li>
            )
          })}
        </ul>
      </fieldset>
      <label className="grid gap-1.5 text-sm">
        Email
        <input required type="email" name="email" className="h-11 rounded-xl border border-rule bg-surface px-3 outline-none focus:border-ink" />
      </label>
      <label className="grid gap-1.5 text-sm">
        Growing zone (or nearest town)
        <input required name="zone" className="h-11 rounded-xl border border-rule bg-surface px-3 outline-none focus:border-ink" />
      </label>
      <label className="grid gap-1.5 text-sm">
        What you grew last year
        <textarea name="note" rows={4} className="rounded-xl border border-rule bg-surface p-3 outline-none focus:border-ink" />
      </label>
      <button type="submit" className="h-11 rounded-full bg-ink text-sm font-medium tracking-wide text-paper transition hover:bg-moss">
        Request a packet list
      </button>
    </form>
  )
}
