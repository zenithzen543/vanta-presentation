import Link from "next/link"
import { ButtonLink } from "@/components/ui/ButtonLink"
import { PacketPhoto } from "@/components/PacketPhoto"
import { VarietyCard } from "@/components/VarietyCard"
import type {
  FeaturedVarietySection,
  HomeSection,
  JournalStripSection,
  LetterCtaSection,
  MastheadSection,
  SowingTableSection,
  VarietyIndexSection,
  WorkshopListSection,
} from "@/lib/types"

function Masthead({ section }: { section: MastheadSection }) {
  return (
    <section className="border-b border-rule">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
        <div>
          <p className="text-[11px] font-medium tracking-[0.2em] text-moss uppercase">
            {section.catalogNo} · {section.season}
          </p>
          <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[1.05] tracking-tight text-ink sm:text-7xl">
            {section.heading}
          </h1>
        </div>
        <div className="lg:pb-2">
          <p className="max-w-md text-base leading-7 text-muted">{section.deck}</p>
          {section.primaryCta?.href ? (
            <div className="mt-8">
              <ButtonLink cta={section.primaryCta} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

function FeaturedVariety({ section }: { section: FeaturedVarietySection }) {
  const v = section.variety
  if (!v?.title) return null
  return (
    <section className="border-b border-rule bg-surface">
      <div className="mx-auto grid max-w-6xl lg:grid-cols-2">
        <PacketPhoto
          image={v.image}
          plate={v.plate}
          title={v.title}
          priority
          className="min-h-[22rem] w-full lg:min-h-[36rem]"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <div className="flex flex-col justify-center px-4 py-12 sm:px-10 lg:px-16">
          <p className="text-[11px] font-medium tracking-[0.2em] text-moss uppercase">{section.kicker}</p>
          <p className="mt-4 text-sm italic text-muted">{v.latin}</p>
          <h2 className="mt-2 font-serif text-4xl tracking-tight text-ink sm:text-5xl">{v.title}</h2>
          <p className="mt-6 max-w-md text-base leading-7 text-ink/80">{v.story}</p>
          <dl className="mt-8 grid max-w-sm grid-cols-2 gap-x-6 gap-y-4 text-sm">
            <div>
              <dt className="text-[11px] tracking-wide text-muted uppercase">Maturity</dt>
              <dd className="mt-1">{v.days}</dd>
            </div>
            <div>
              <dt className="text-[11px] tracking-wide text-muted uppercase">Packet</dt>
              <dd className="mt-1">{v.packet}</dd>
            </div>
            <div>
              <dt className="text-[11px] tracking-wide text-muted uppercase">Stock</dt>
              <dd className="mt-1">{v.stock}</dd>
            </div>
            <div>
              <dt className="text-[11px] tracking-wide text-muted uppercase">Sowing</dt>
              <dd className="mt-1">{v.sowing}</dd>
            </div>
          </dl>
          <Link href={v.href} className="mt-8 text-sm font-medium text-moss hover:underline">
            Full packet notes
          </Link>
        </div>
      </div>
    </section>
  )
}

function SowingTable({ section }: { section: SowingTableSection }) {
  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">{section.heading}</h2>
        <p className="mt-3 max-w-2xl text-muted">{section.intro}</p>
        <div className="mt-10 overflow-hidden rounded-2xl border border-rule bg-surface">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="bg-paper text-[11px] tracking-wide text-muted uppercase">
              <tr>
                <th className="px-5 py-3 font-medium">Crop</th>
                <th className="px-5 py-3 font-medium">Window</th>
                <th className="px-5 py-3 font-medium">Method</th>
              </tr>
            </thead>
            <tbody>
              {(section.rows ?? []).map((row) => (
                <tr key={row.crop} className="border-t border-rule">
                  <td className="px-5 py-3.5 font-medium">{row.crop}</td>
                  <td className="px-5 py-3.5">{row.window}</td>
                  <td className="px-5 py-3.5 text-muted">{row.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

function VarietyIndex({ section }: { section: VarietyIndexSection }) {
  return (
    <section id="catalog" className="border-b border-rule">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">{section.heading}</h2>
            <p className="mt-3 max-w-xl text-muted">{section.intro}</p>
          </div>
          <Link href="/varieties" className="text-sm font-medium text-moss hover:underline">
            View all packets
          </Link>
        </div>
        <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {(section.varieties ?? []).map((v) => (
            <li key={v._id}>
              <VarietyCard variety={v} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function JournalStrip({ section }: { section: JournalStripSection }) {
  return (
    <section className="border-b border-rule bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="font-serif text-3xl tracking-tight">{section.heading}</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(section.notes ?? []).map((note) => (
            <article key={note._id} className="rounded-2xl border border-rule p-6 transition hover:border-ink/25 hover:shadow-[0_8px_30px_rgba(18,17,15,0.04)]">
              <p className="text-[11px] font-medium tracking-[0.16em] text-moss uppercase">{note.season}</p>
              <h3 className="mt-3 font-serif text-2xl leading-snug">
                <Link href={note.href} className="hover:text-moss">
                  {note.title}
                </Link>
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">{note.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function WorkshopList({ section }: { section: WorkshopListSection }) {
  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="font-serif text-3xl tracking-tight">{section.heading}</h2>
        <p className="mt-3 max-w-xl text-muted">{section.intro}</p>
        <ul className="mt-10 divide-y divide-rule overflow-hidden rounded-2xl border border-rule bg-surface">
          {(section.workshops ?? []).map((item) => (
            <li key={item._id} className="grid gap-1 px-5 py-5 sm:grid-cols-[10rem_1fr_6rem] sm:items-baseline">
              <p className="text-sm text-muted">{item.date}</p>
              <div>
                <p className="font-serif text-xl">{item.title}</p>
                <p className="mt-1 text-sm text-muted">
                  {item.place} — {item.notes}
                </p>
              </div>
              <p className="text-sm text-moss sm:text-right">{item.seats ? `${item.seats} seats` : ""}</p>
            </li>
          ))}
        </ul>
        <Link href="/workshops" className="mt-6 inline-block text-sm font-medium text-moss hover:underline">
          All Saturdays
        </Link>
      </div>
    </section>
  )
}

function LetterCta({ section }: { section: LetterCtaSection }) {
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 sm:py-24">
        <h2 className="font-serif text-4xl tracking-tight sm:text-5xl">{section.heading}</h2>
        <p className="mt-4 leading-7 text-paper/70">{section.body}</p>
        {section.primaryCta?.href ? (
          <div className="mt-8">
            <ButtonLink cta={section.primaryCta} invert />
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function Sections({ sections }: { sections: HomeSection[] }) {
  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case "masthead":
            return <Masthead key={section._key} section={section} />
          case "featuredVariety":
            return <FeaturedVariety key={section._key} section={section} />
          case "sowingTable":
            return <SowingTable key={section._key} section={section} />
          case "varietyIndex":
            return <VarietyIndex key={section._key} section={section} />
          case "journalStrip":
            return <JournalStrip key={section._key} section={section} />
          case "workshopList":
            return <WorkshopList key={section._key} section={section} />
          case "letterCta":
            return <LetterCta key={section._key} section={section} />
          default:
            return null
        }
      })}
    </>
  )
}
