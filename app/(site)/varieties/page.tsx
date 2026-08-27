import { VarietyCard } from "@/components/VarietyCard"
import { PageShell } from "@/components/PageShell"
import { groupByFamily } from "@/lib/catalog"
import { getVarieties } from "@/lib/data"

export const revalidate = 60

export const metadata = { title: "Varieties" }

export default async function VarietiesPage() {
  const varieties = await getVarieties()
  const families = groupByFamily(varieties)

  return (
    <PageShell wide back={{ href: "/", label: "Back to the catalog" }} kicker="The catalog" title="Seventeen packets we still grow out">
      <p className="max-w-2xl text-muted">
        Grouped the way a print catalog is grouped. Photographs sit where a color plate would in print. Stock is what is in the shed this week.
      </p>
      {families.map(([family, list]) => (
        <section key={family} className="!mt-14">
          <h2 className="font-serif text-2xl tracking-tight text-ink">{family}</h2>
          <ul className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((v) => (
              <li key={v._id}>
                <VarietyCard variety={v} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </PageShell>
  )
}
