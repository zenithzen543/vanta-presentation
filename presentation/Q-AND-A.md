# Likely questions

**Why a seed catalog instead of a trust/compliance site?**  
Your site is yours. Cloning it is not senior work. This still has a homepage composer, references, ISR, Studio UX, and GTM IDs — the job. The business is intentionally different so you can judge the modeling, not the photocopy.

**Why not a 2×3 product card grid?**  
That layout is the Vanta homepage. A catalog uses a masthead, a featured item, a table, and an index — forms marketing actually uses for editorial products.

**SSG / ISR / SSR?**  
Catalog and variety pages: ISR. Studio: client. Order form: client submit. Webhook revalidate on publish.

**How do editors not break the page?**  
Typed sections, required fields, no raw HTML. Unknown `_type` is skipped.

**GTM?**  
`eventId` on the CTA object, never the visible label.

**Webflow → Sanity?**  
Map collections (varieties, journal, events) first. Redirects and titles travel with documents.

**Previous code?**  
Jamb and Slingshot: NDA. Public URLs only. Thorn & Furrow: not NDA, but still no source — live catalog and Studio only.
