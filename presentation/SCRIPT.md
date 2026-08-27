# Thorn & Furrow — 10-minute speaking script

Read **SAY** out loud. Follow **DO**. Ten minutes is slides 1–9. Slides 10–15 if they have time.

## Before you start

- Catalog: `http://localhost:3000`
- Studio: `http://localhost:3000/studio` (logged in)
- Deck: `Thorn-and-Furrow-Portfolio.pptx` (15 slides). There is no SaaS slide and no stack slide — say both on the title.
- Hard-refresh once. If Studio fails, keep going on the public site.
- If you run long, skip slide 8 (decisions), close, and take questions. Slides 10–15 are extra if they ask about past work.

## Clock

| Time | Slide | You are doing |
|---|---|---|
| 0:00–0:50 | 1 · Title | Marketing site, not SaaS. Next.js, Sanity, Vercel. |
| 0:50–1:30 | 2 · I own the types. They own the catalog. | I own the types. They own the catalog. |
| 1:30–2:05 | 3 · What visitors see | Four surfaces. No cart. |
| 2:05–2:40 | 4 · Why this shape | Documents, composition, event IDs. |
| 2:40–3:30 | 5 · Editor to production | Studio → GROQ → Next.js → ISR. |
| 3:30–4:05 | 6 · Five documents | Five documents. |
| 4:05–6:45 | 7 · Live demo | Home, packet, publish, tracking. |
| 6:45–7:25 | 8 · What I would defend | Five calls you would make again. |
| 7:25–7:55 | 9 · Close | One line. Stop here if they only have ten minutes. |
| 7:55–8:10 | 10 · Work I cannot open | Jamb and Slingshot. Public only. |
| 8:10–8:45 | 11 · Jamb — who buys, what sells | Who, inventory, sale. |
| 8:45–9:15 | 12 · Jamb — four public collections | Fireplaces, lighting, furniture, journal. |
| 9:15–9:50 | 13 · Slingshot — the control problem | Problem, product, who pays. |
| 9:50–10:20 | 14 · Slingshot — catalog, argument, shop | Home, how it works, shop. |
| 10:20–10:35 | 15 · Stop | I cannot open those desks. Questions here. |


## 0:00–0:50  ·  1 · Title

**DO:** Deck on the projector: Thorn-and-Furrow-Portfolio.pptx. Catalog open at localhost:3000. Studio logged in on a second screen. Do not demo yet. There is no SaaS slide and no stack slide — say both here.

**SAY:**

I am presenting a marketing website — not a SaaS product. Next.js is the site. Sanity is the CMS. Vercel is where it deploys. This catalog is Thorn and Furrow. I can open it. Two other live sites come after the close. I will not open their studios.

## 0:50–1:30  ·  2 · I own the types. They own the catalog.

**DO:** Stay on this slide. Do not click the site yet. Point at Catalog No. 14 and the live homepage screenshot.

**SAY:**

The farm packs seed March through June. This season is Catalog Number 14. If a variety is listed, they grow it. Marketing does not wait on engineering for a new heading or a sold-out packet. Those are fields. I own the types. They own the weekly catalog. That is the same contract as any marketing site: structured content, page composition, caching, SEO, and analytics that survive a copy change.

## 1:30–2:05  ·  3 · What visitors see

**DO:** Point at the four cards, then glance at the live homepage if it is visible.

**SAY:**

Visitors land on a homepage composed from Sanity sections — masthead, featured packet, sowing table, the spring list. Varieties is the catalog: seventeen packets grouped by family, the way a print catalog is grouped. Journal is the seasonal notebook. Mail order is a letter, not a cart: mark packets, tell us your zone, we write back. Studio exists at /studio for editors. It is not linked on the public site. The storefront should feel live, not like a CMS demo.

## 2:05–2:40  ·  4 · Why this shape

**SAY:**

I did not build a hero, a two-by-three feature grid, and a logo wall. That would look like homework. A catalog needs four things a marketing site actually needs. Documents: Icehouse Tomato is one record, reused on home, the index, the packet page, and the order form. Composition: the homepage is an ordered list of blocks. Editors reorder it without a deploy. Editor-safe fields: stock, packet price, sowing, isolation, photographs. Stable tracking: GTM keys off event IDs, not the words on the button.

## 2:40–3:30  ·  5 · Editor to production

**DO:** Walk the five boxes left to right. Do not open code unless asked.

**SAY:**

The path is simple. An editor publishes in Sanity Studio. Next.js pulls the page with GROQ through next-sanity. Pages are React Server Components in the App Router. Production uses ISR — pages revalidate about every sixty seconds — plus a signed revalidate API after publish, so we do not wait a full minute. If Sanity is down, a local seed still renders the catalog. That is resilience, and it is also how a demo does not die. Photographs come from Sanity assets, with a local file fallback per slug.

## 3:30–4:05  ·  6 · Five documents

**DO:** Name the five documents. Mention the Studio desk is labeled The farm.

**SAY:**

Five document types. Farm settings: name, nav, primary CTA, footer, default SEO. Catalog homepage: SEO plus an ordered section array. Variety: latin name, family, days, packet, stock, photo, story. That is the product object. Journal note and workshop are seasonal content. The Studio desk is labeled The farm so editors see a catalog, not a generic CMS. Change Icehouse Tomato once. Home, packet page, and order form all update, because they reference the same document.

## 4:05–6:45  ·  7 · Live demo

**DO:** Switch to the browser. (1) Homepage: masthead, Icehouse feature, sowing table, packet grid. (2) Click Icehouse Tomato. (3) Studio → Catalog homepage → Catalog sections → Catalog masthead → Heading → Publish → reload /. (4) Hover Request a packet list and say the event ID.

**SAY:**

This is the site. Catalog Number 14, Spring 2026. The masthead is a section. The featured packet is a document — latin name, story, maturity, stock — not a dashboard widget. The sowing table is editorial and dated for zone 6a. The spring list is seventeen references to variety documents. Marketing reorders this list. I own the types. Icehouse Tomato: same document you just saw featured. App Router, static params, ISR. In Studio, Catalog homepage, Catalog sections, Catalog masthead: I change the Heading and publish. Reload. The heading is live. That publish loop is the work. Request a packet list: the label is copy. The contract is eventId — hero_order, nav_order. Copy can change. GTM does not.

## 6:45–7:25  ·  8 · What I would defend

**DO:** Back to the deck. If Studio failed, say: seed fallback still rendered the catalog. Skip this slide if you are over time.

**SAY:**

Five decisions I would make again. Server components and GROQ, not a client-side CMS fetch on every page. References over duplication. Event IDs on every CTA so measurement survives a rewrite. ISR plus a signed revalidate webhook. No cart. The conversion is a qualified packet-list request — closer to a real marketing funnel than a fake checkout.

## 7:25–7:55  ·  9 · Close

**DO:** One line. If they only have ten minutes, stop and take questions. Otherwise go to slide 10.

**SAY:**

The catalog is the product. The CMS is how it changes without a deploy.

## 7:55–8:10  ·  10 · Work I cannot open

**DO:** Point at both public homepages. Do not open Studio. Then Jamb, then Slingshot.

**SAY:**

Same pattern as an ads business: who buys, what is inventory, how a visit becomes a sale. Then where the CMS sits. Jamb is a Pimlico dealer. Slingshot Bio sells reagents to flow cytometry labs. I will not open Studio, schemas, or fields. Public surfaces only.

## 8:10–8:45  ·  11 · Jamb — who buys, what sells

**DO:** Walk who, inventory, sale. Screenshot is the public homepage. No Studio.

**SAY:**

Jamb opened on Pimlico Road in 2001. The buyer is an interior designer, a collector, a country-house client — London, then Los Angeles, Chicago, Dallas, Atlanta, Palm Beach. Inventory is two things at once. Unique antiques: chimneypieces from the seventeenth century on, furniture, lighting. And handmade reproductions from the south London workshop, so a design stays available after the antique sells — that is the original business idea. The sale is high-ticket and consultative. A designer specs a piece from the catalog. The showroom closes it. Enquiry, not Amazon checkout. Sanity owns collections and journal stories. Next.js is the storefront.

## 8:45–9:15  ·  12 · Jamb — four public collections

**DO:** Name the four public collections. Do not invent schemas.

**SAY:**

Four public surfaces, same contract as any marketing catalog. Fireplaces: antique chimneypieces and stone or marble reproductions, plus a bespoke service. Lighting: hanging globes, lanterns, wall lights — the Original Globe is the story that started the reproduction line. Furniture: English country-house seating and tables, antique and made. Journal: stories for architects and designers, not a blog calendar. Editors change stock and stories. Engineering owns the types.

## 9:15–9:50  ·  13 · Slingshot — the control problem

**DO:** Walk the problem, then the product, then who pays. Screenshot is How Mimics Work. No Studio.

**SAY:**

Slingshot Bio sells to flow cytometry labs: biopharma, CROs, academic cores, cell therapy, instrument makers. The problem is the control. Donor cells expire and drift lot to lot. Polystyrene beads have the wrong scatter. They sell shelf-stable synthetic cell mimics — polymer particles engineered to scatter, fluoresce, and stain like real cells. Compensation, unmixing, viability, immunophenotyping, instrument setup. Catalog SKUs plus custom mimics on request. A scientist finds a control, reads a protocol, orders a reagent. Repeat purchases. Sanity owns product and resource documents. Next.js is the catalog and shop.

## 9:50–10:20  ·  14 · Slingshot — catalog, argument, shop

**DO:** Home, how it works, shop. Name public surfaces only.

**SAY:**

Three public surfaces. Homepage is the catalog of controls. How Mimics Work is the argument: not a biologic, not a bead. Shop is the conversion: SKUs grouped by purpose — unmixing, immunophenotyping, CAR-T, custom — then a cart. Resources sit beside the shop: application notes, data sheets, protocols. That is the education that sells a reagent. Same rule: I cannot open the desk.

## 10:20–10:35  ·  15 · Stop

**DO:** Stop. Invite questions on Thorn and Furrow, not on those studios.

**SAY:**

I cannot open those desks. This catalog I can. Happy to go into schema, caching, or the order form — here.

## Close line (memorize)

> The catalog is the product. The CMS is how it changes without a deploy.
