import { PageShell } from "@/components/PageShell"
import { getWorkshops } from "@/lib/data"

export const metadata = { title: "Workshops" }

export default async function WorkshopsPage() {
  const workshops = await getWorkshops()
  return (
    <PageShell wide back={{ href: "/", label: "Back to the catalog" }} kicker="Saturdays" title="On the farm">
      <p className="max-w-2xl text-muted">
        Twelve people unless noted. Coffee in the shed. We cancel if the driveway is ice. Write us; do not buy a ticket.
      </p>
      <ul className="divide-y divide-rule overflow-hidden rounded-2xl border border-rule bg-surface">
        {workshops.map((item) => (
          <li key={item._id} className="grid gap-2 px-5 py-6 sm:grid-cols-[10rem_1fr_6rem]">
            <p className="text-sm text-muted">{item.date}</p>
            <div>
              <p className="font-serif text-2xl tracking-tight">{item.title}</p>
              <p className="mt-1 text-muted">{item.place} — {item.notes}</p>
            </div>
            <p className="text-sm text-moss sm:text-right">{item.seats ? `${item.seats} seats` : ""}</p>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}
