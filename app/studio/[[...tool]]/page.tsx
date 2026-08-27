import { Studio } from "./Studio"
import { dataset, isSanityConfigured, projectId } from "@/sanity/env"

export const dynamic = "force-static"

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-20">
        <p className="font-serif text-4xl text-ink">Connect Sanity</p>
        <p className="mt-4 text-muted">Studio is at /studio. Add a project ID to edit the Thorn & Furrow catalog.</p>
        <ol className="mt-8 list-decimal space-y-3 pl-5 text-sm leading-6">
          <li>Create a project at sanity.io/manage.</li>
          <li>Copy .env.example to .env.local and set NEXT_PUBLIC_SANITY_PROJECT_ID.</li>
          <li>Add http://localhost:3000 to CORS origins.</li>
          <li>Run npm run seed, restart the app, reload this page.</li>
        </ol>
        <p className="mt-8 text-xs text-muted">projectId: {projectId || "(empty)"} · dataset: {dataset}</p>
      </main>
    )
  }
  return <Studio />
}
