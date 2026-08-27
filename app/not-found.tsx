export default function NotFound() {
  return (
    <main id="main" className="mx-auto max-w-xl px-6 py-24 text-center">
      <p className="font-serif text-5xl">404</p>
      <p className="mt-3 text-muted">That page is not in this catalog.</p>
      <a href="/" className="mt-8 inline-flex h-11 items-center rounded-full bg-ink px-6 text-sm font-medium tracking-wide text-paper transition hover:bg-moss">
        Back to the catalog
      </a>
    </main>
  )
}
