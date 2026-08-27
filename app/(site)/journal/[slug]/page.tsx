import { notFound } from "next/navigation"
import { PageShell } from "@/components/PageShell"
import { getJournal, getJournalNote } from "@/lib/data"

export const revalidate = process.env.NODE_ENV === "development" ? 0 : 60

export async function generateStaticParams() {
  const notes = await getJournal()
  return notes.filter((n) => n.slug).map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const note = await getJournalNote(slug)
  return { title: note?.title ?? "Journal", description: note?.excerpt }
}

export default async function JournalNotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const note = await getJournalNote(slug)
  if (!note) notFound()
  return (
    <PageShell
      back={{ href: "/journal", label: "Back to the notebook" }}
      kicker={note.season}
      title={note.title}
    >
      {note.body ? (
        <p className="whitespace-pre-line">{note.body}</p>
      ) : (
        <p>{note.excerpt}</p>
      )}
    </PageShell>
  )
}
