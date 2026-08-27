# Live demo (8 minutes)

Two windows: catalog `http://localhost:3000` and Studio `http://localhost:3000/studio`. Log in to Studio first.

Footer must read **Content: Sanity live**. If it says local seed, run `npm run seed` and hard-refresh.

---

## 1. Catalog homepage (2 min)

Open `/`.

This is **not** a SaaS feature grid. Point at:

- Masthead: catalog number and season (print logic)
- Featured variety: latin name, story, packet facts, color plate — a **document**, not a dashboard widget
- Sowing table: editorial, dated, zone-specific
- The spring list: seventeen packets, an index of **references** to variety documents

*Say:* “Marketing reorders the catalog. I own the types.”

---

## 2. A variety page (45s)

Click **Icehouse Tomato**. Open **Varieties** to show families. Mark packets on `/order`.

*Say:* “Same Sanity document as the homepage feature. App Router, ISR, `generateStaticParams`.”

---

## 3. Tracking (30s)

**Request a packet list** uses `eventId` (`hero_order`, `nav_order`). Copy can change; GTM does not.

---

## 4. Studio (4 min)

1. Desk: Catalog homepage, Farm settings, Varieties, Journal, Workshops.
2. **Catalog homepage → sections → Catalog masthead.** Change the heading. Publish.
3. Open **Icehouse Tomato**: latin name, days, packet, story.
4. Reload `/`. The new heading is live. With the catalog tab left open, publish can also refresh the page without a reload.

That publish loop is the interview.

---

## Backup

If Studio is down: `sanity/schemaTypes/documents.ts` and the `_type` switch in `components/home/Sections.tsx`. Footer will say local seed and the catalog still renders.
