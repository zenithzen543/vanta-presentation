import Link from "next/link"
import { PageShell } from "@/components/PageShell"

export const metadata = { title: "The farm" }

export default function AboutPage() {
  return (
    <PageShell wide back={{ href: "/", label: "Back to the catalog" }} kicker="Tivoli, New York" title="Four acres and a packing shed">
      <p className="max-w-2xl">
        River Road, west of the village. A packing shed that was a dairy lean-to, an icehouse without a roof, and enough ground to grow a catalog we can stand behind. We are not a trial garden. If a variety is listed, we eat it.
      </p>
      <dl className="mt-8 grid gap-6 overflow-hidden rounded-2xl border border-rule bg-surface p-8 sm:grid-cols-3">
        <div>
          <dt className="text-[11px] tracking-[0.16em] text-muted uppercase">Ground</dt>
          <dd className="mt-2 font-serif text-3xl tracking-tight">4 acres</dd>
          <dd className="mt-1 text-sm text-muted">Zone 6a. Clay that needs sand for carrots.</dd>
        </div>
        <div>
          <dt className="text-[11px] tracking-[0.16em] text-muted uppercase">This catalog</dt>
          <dd className="mt-2 font-serif text-3xl tracking-tight">17 packets</dd>
          <dd className="mt-1 text-sm text-muted">No ornamentals. No fillers from a wholesaler.</dd>
        </div>
        <div>
          <dt className="text-[11px] tracking-[0.16em] text-muted uppercase">Ship</dt>
          <dd className="mt-2 font-serif text-3xl tracking-tight">Mar–Jun</dd>
          <dd className="mt-1 text-sm text-muted">Packed the week they leave. No summer trucks.</dd>
        </div>
      </dl>
      <p className="max-w-2xl">
        We pack by hand, March through June. Write us with your zone and what you grew last year. We send a packet list — what is actually in the shed that week — not a cart checkout.
      </p>
      <p className="max-w-2xl text-muted">
        Saturdays on the farm are twelve people, coffee in the shed, and boots. Dates are on the{" "}
        <Link href="/workshops" className="text-moss hover:underline">
          workshops
        </Link>{" "}
        page. We cancel if the driveway is ice. Look for the lean-to west of the village; the icehouse still has no roof.
      </p>
    </PageShell>
  )
}
