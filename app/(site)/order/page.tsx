import { PageShell } from "@/components/PageShell"
import { OrderForm } from "@/components/OrderForm"
import { getVarieties } from "@/lib/data"

export const metadata = { title: "Request a packet list" }

export default async function OrderPage({
  searchParams,
}: {
  searchParams: Promise<{ packet?: string }>
}) {
  const varieties = await getVarieties()
  const { packet } = await searchParams
  return (
    <PageShell wide back={{ href: "/", label: "Back to the catalog" }} kicker="Mail order" title="Tell us your zone">
      <p className="text-muted">
        We do not run a cart. Mark the packets you want and tell us your zone. We reply with what we can actually send, then pack the week it ships — March through June.
      </p>
      <OrderForm varieties={varieties} preset={packet} />
    </PageShell>
  )
}
