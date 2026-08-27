import Link from "next/link"
import { PageShell } from "@/components/PageShell"
import { getJournal } from "@/lib/data"

export const revalidate = process.env.NODE_ENV === "development" ? 0 : 60

export const metadata = { title: "Journal" }

export default async function JournalPage() {
  const notes = await getJournal()
  return (
    <PageShell wide back={{ href: "/", label: "Back to the catalog" }} kicker="River Road" title="From the notebook">
      <p className="max-w-2xl text-muted">
        Field notes, packing weeks, and the arguments we have with isolation distances. Not a blog calendar.
      </p>
      <ul className="mt-4 grid gap-5 sm:grid-cols-2">
        {notes.map((note) => (
          <li key={note._id} className="rounded-2xl border border-rule bg-surface p-6 transition hover:border-ink/25 hover:shadow-[0_8px_30px_rgba(18,17,15,0.04)]">
            <p className="text-[11px] font-medium tracking-[0.16em] text-moss uppercase">{note.season}</p>
            <Link href={note.href} className="mt-3 block font-serif text-2xl tracking-tight hover:text-moss">
              {note.title}
            </Link>
            <p className="mt-2 text-muted">{note.excerpt}</p>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}
