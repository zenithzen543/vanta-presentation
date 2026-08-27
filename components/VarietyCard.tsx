import Link from "next/link"
import { PacketPhoto } from "@/components/PacketPhoto"
import type { Variety } from "@/lib/types"

export function VarietyCard({ variety }: { variety: Variety }) {
  return (
    <Link href={variety.href} className="group block">
      <PacketPhoto
        image={variety.image}
        plate={variety.plate}
        title={variety.title}
        className="aspect-[4/5] w-full rounded-2xl"
        sizes="(min-width: 1024px) 280px, 45vw"
      />
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] tracking-wide text-muted italic">{variety.latin}</p>
          <h3 className="mt-1 font-serif text-xl leading-tight text-ink group-hover:text-moss">{variety.title}</h3>
        </div>
        <p className="shrink-0 pt-5 text-xs text-muted">{variety.packet?.split("·")[0]?.trim()}</p>
      </div>
      <p className="mt-1 text-xs text-muted">
        {variety.family} · {variety.stock}
      </p>
    </Link>
  )
}
