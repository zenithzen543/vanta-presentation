import { notFound } from "next/navigation"
import { PacketPhoto } from "@/components/PacketPhoto"
import { BackLink } from "@/components/ui/BackLink"
import { ButtonLink } from "@/components/ui/ButtonLink"
import { VarietyCard } from "@/components/VarietyCard"
import { relatedInFamily } from "@/lib/catalog"
import { getVariety, getVarieties } from "@/lib/data"

export const revalidate = process.env.NODE_ENV === "development" ? 0 : 60

export async function generateStaticParams() {
  const varieties = await getVarieties()
  return varieties.filter((v) => v.slug).map((v) => ({ slug: v.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const variety = await getVariety(slug)
  return { title: variety?.title ?? "Variety", description: variety?.story }
}

export default async function VarietyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const variety = await getVariety(slug)
  if (!variety) notFound()
  const related = relatedInFamily(await getVarieties(), variety)

  return (
    <main id="main">
      <div className="grid lg:grid-cols-2">
        <PacketPhoto
          image={variety.image}
          plate={variety.plate}
          title={variety.title}
          priority
          className="min-h-[22rem] w-full lg:min-h-[calc(100vh-4rem)]"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <div className="flex flex-col justify-center px-4 py-14 sm:px-10 lg:px-16">
          <BackLink href="/varieties">Back to varieties</BackLink>
          <p className="mt-8 text-[11px] font-medium tracking-[0.2em] text-moss uppercase">
            Packet notes · {variety.family}
          </p>
          <p className="mt-4 text-sm italic text-muted">{variety.latin}</p>
          <h1 className="mt-2 font-serif text-4xl tracking-tight text-ink sm:text-5xl">{variety.title}</h1>
          <p className="mt-6 max-w-lg text-base leading-7">{variety.story}</p>
          <p className="mt-4 max-w-lg text-muted">{variety.flavor}</p>
          <dl className="mt-10 grid max-w-lg grid-cols-2 gap-6 text-sm">
            {[
              ["Stock", variety.stock],
              ["Packet", variety.packet],
              ["Maturity", variety.days],
              ["Sowing", variety.sowing],
              ["Kitchen", variety.use],
              ["Isolation", variety.isolation],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-[11px] tracking-wide text-muted uppercase">{label}</dt>
                <dd className="mt-1">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10">
            <ButtonLink cta={{ label: `Request ${variety.title}`, href: `/order?packet=${variety.slug}`, eventId: "variety_order" }} />
          </div>
        </div>
      </div>
      {related.length ? (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-serif text-2xl tracking-tight">Also in {variety.family}</h2>
          <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <li key={item._id}>
                <VarietyCard variety={item} />
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <BackLink href="/varieties">Back to varieties</BackLink>
          </div>
        </section>
      ) : (
        <div className="px-4 py-10 sm:px-6">
          <BackLink href="/varieties">Back to varieties</BackLink>
        </div>
      )}
    </main>
  )
}
