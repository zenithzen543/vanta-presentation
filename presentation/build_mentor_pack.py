"""Mentor pack: a freshman-readable Word guide + a plain-text speaking script."""

from pathlib import Path

from docx import Document
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
from docx.shared import Inches, Pt, RGBColor

OUT = Path(__file__).resolve().parent
INK = RGBColor(0x12, 0x11, 0x0F)
MOSS = RGBColor(0x3A, 0x4A, 0x38)
MUTED = RGBColor(0x6B, 0x65, 0x60)

BEATS = [
    {
        "clock": "0:00–0:25",
        "slide": "1 · Title",
        "do": "Deck on the projector. Catalog open at localhost:3000. Studio logged in on a second screen. Do not demo yet.",
        "say": (
            "I am presenting a marketing website — not a SaaS product. "
            "Next.js is the site. Sanity is the CMS. Vercel is where it deploys. "
            "This catalog is Thorn and Furrow. I can open it. "
            "Two other live sites come after the close. I will not open their studios."
        ),
    },
    {
        "clock": "0:25–1:05",
        "slide": "2 · Not a SaaS",
        "do": "Point at the two columns. SaaS on the left. This site on the right. Stay on the slide.",
        "say": (
            "A normal SaaS is an app people log into. Dashboard, settings, roles, billing. The software is the product. "
            "This is not that. Nobody logs in. There is no account. "
            "This is a public marketing site for a real business — a farm that sells seed. "
            "The pages are the catalog: packets, stories, a letter to order. "
            "Marketers own the words and the stock. Engineering owns the types so those changes do not need a deploy. "
            "The conversion is a packet-list request — a lead — not a SaaS signup."
        ),
    },
    {
        "clock": "1:05–1:50",
        "slide": "3 · The stack",
        "do": "Walk the three boxes: Next.js, then Sanity, then Vercel. Do not open code.",
        "say": (
            "Three tools. Next.js is the website — React, App Router, what visitors see. "
            "Sanity is the CMS. Studio is the editor. Packets and homepage sections are documents, not a Word file. "
            "Vercel is the host. Git push, a live URL, CDN, ISR. That is production for a Next.js site. "
            "Editor publishes in Sanity. Next.js pulls the page. Vercel serves it. "
            "That loop is what I am here to show."
        ),
    },
    {
        "clock": "1:50–2:25",
        "slide": "4 · The job",
        "do": "Stay on the pitch slide. Do not click the site yet.",
        "say": (
            "The farm packs seed March through June. This season is Catalog Number 14. "
            "If a variety is listed, they grow it. "
            "Marketing does not wait on engineering for a new heading or a sold-out packet. Those are fields. "
            "I own the types. They own the weekly catalog. "
            "That is the same contract as any marketing site: structured content, page composition, caching, SEO, "
            "and analytics that survive a copy change."
        ),
    },
    {
        "clock": "2:25–3:00",
        "slide": "5 · What visitors see",
        "do": "Point at the four cards, then glance at the live homepage if it is visible.",
        "say": (
            "Visitors land on a homepage composed from Sanity sections — masthead, featured packet, sowing table, the spring list. "
            "Varieties is the catalog: seventeen packets grouped by family, the way a print catalog is grouped. "
            "Journal is the seasonal notebook. Mail order is a letter, not a cart: mark packets, tell us your zone, we write back. "
            "Studio exists at /studio for editors. It is not linked on the public site. The storefront should feel live, not like a CMS demo."
        ),
    },
    {
        "clock": "3:00–3:35",
        "slide": "6 · Why this shape",
        "do": None,
        "say": (
            "I did not build a hero, a two-by-three feature grid, and a logo wall. That would look like homework. "
            "A catalog needs four things a marketing site actually needs. "
            "Documents: Icehouse Tomato is one record, reused on home, the index, the packet page, and the order form. "
            "Composition: the homepage is an ordered list of blocks. Editors reorder it without a deploy. "
            "Editor-safe fields: stock, packet price, sowing, isolation, photographs. "
            "Stable tracking: GTM keys off event IDs, not the words on the button."
        ),
    },
    {
        "clock": "3:35–4:25",
        "slide": "7 · Architecture",
        "do": "Walk the five boxes left to right. Do not open code unless asked.",
        "say": (
            "The path is simple. An editor publishes in Sanity Studio. "
            "Next.js pulls the page with GROQ through next-sanity. "
            "Pages are React Server Components in the App Router. "
            "Production uses ISR — pages revalidate about every sixty seconds — plus a signed revalidate API after publish, so we do not wait a full minute. "
            "If Sanity is down, a local seed still renders the catalog. That is resilience, and it is also how a demo does not die. "
            "Photographs come from Sanity assets, with a local file fallback per slug."
        ),
    },
    {
        "clock": "4:25–5:00",
        "slide": "8 · Content model",
        "do": "Name the five documents. Mention the Studio desk is labeled The farm.",
        "say": (
            "Five document types. Farm settings: name, nav, primary CTA, footer, default SEO. "
            "Catalog homepage: SEO plus an ordered section array. "
            "Variety: latin name, family, days, packet, stock, photo, story. That is the product object. "
            "Journal note and workshop are seasonal content. "
            "The Studio desk is labeled The farm so editors see a catalog, not a generic CMS. "
            "Change Icehouse Tomato once. Home, packet page, and order form all update, because they reference the same document."
        ),
    },
    {
        "clock": "5:00–7:40",
        "slide": "9 · Live demo",
        "do": (
            "Switch to the browser. (1) Homepage: masthead, Icehouse feature, sowing table, packet grid. "
            "(2) Click Icehouse Tomato. (3) Studio → Catalog homepage → masthead heading → Publish → reload /. "
            "(4) Hover Request a packet list and say the event ID."
        ),
        "say": (
            "This is the site. Catalog Number 14, Spring 2026. The masthead is a section. "
            "The featured packet is a document — latin name, story, maturity, stock — not a dashboard widget. "
            "The sowing table is editorial and dated for zone 6a. "
            "The spring list is seventeen references to variety documents. Marketing reorders this list. I own the types. "
            "Icehouse Tomato: same document you just saw featured. App Router, static params, ISR. "
            "In Studio, under Catalog homepage, I change the masthead heading and publish. Reload. The heading is live. That publish loop is the work. "
            "Request a packet list: the label is copy. The contract is eventId — hero_order, nav_order. Copy can change. GTM does not."
        ),
    },
    {
        "clock": "7:40–8:20",
        "slide": "10 · What I would defend",
        "do": "Back to the deck. If Studio failed, say: seed fallback still rendered the catalog.",
        "say": (
            "Five decisions I would make again. "
            "Server components and GROQ, not a client-side CMS fetch on every page. "
            "References over duplication. "
            "Event IDs on every CTA so measurement survives a rewrite. "
            "ISR plus a signed revalidate webhook. "
            "No cart. The conversion is a qualified packet-list request — closer to a real marketing funnel than a fake checkout."
        ),
    },
    {
        "clock": "8:20–8:50",
        "slide": "11 · Close",
        "do": "One line. If they only have ten minutes, stop and take questions. Otherwise go to slide 12.",
        "say": "The catalog is the product. The CMS is how it changes without a deploy.",
    },
    {
        "clock": "8:50–9:05",
        "slide": "12 · NDA map",
        "do": "Point at both public homepages. Do not open Studio. Then Jamb, then Slingshot.",
        "say": (
            "Same pattern as an ads business: who buys, what is inventory, how a visit becomes a sale. Then where the CMS sits. "
            "Jamb is a Pimlico dealer. Slingshot Bio sells reagents to flow cytometry labs. "
            "I will not open Studio, schemas, or fields. Public surfaces only."
        ),
    },
    {
        "clock": "9:05–9:40",
        "slide": "13 · Jamb business",
        "do": "Walk who, inventory, sale. Screenshot is the public homepage. No Studio.",
        "say": (
            "Jamb opened on Pimlico Road in 2001. The buyer is an interior designer, a collector, a country-house client — London, then Los Angeles, Chicago, Dallas, Atlanta, Palm Beach. "
            "Inventory is two things at once. Unique antiques: chimneypieces from the seventeenth century on, furniture, lighting. "
            "And handmade reproductions from the south London workshop, so a design stays available after the antique sells — that is the original business idea. "
            "The sale is high-ticket and consultative. A designer specs a piece from the catalog. The showroom closes it. Enquiry, not Amazon checkout. "
            "Sanity owns collections and journal stories. Next.js is the storefront."
        ),
    },
    {
        "clock": "9:40–10:10",
        "slide": "14 · Jamb catalog",
        "do": "Name the four public collections. Do not invent schemas.",
        "say": (
            "Four public surfaces, same contract as any marketing catalog. "
            "Fireplaces: antique chimneypieces and stone or marble reproductions, plus a bespoke service. "
            "Lighting: hanging globes, lanterns, wall lights — the Original Globe is the story that started the reproduction line. "
            "Furniture: English country-house seating and tables, antique and made. "
            "Journal: stories for architects and designers, not a blog calendar. "
            "Editors change stock and stories. Engineering owns the types."
        ),
    },
    {
        "clock": "10:10–10:45",
        "slide": "15 · Slingshot business",
        "do": "Walk the problem, then the product, then who pays. Screenshot is How Mimics Work. No Studio.",
        "say": (
            "Slingshot Bio sells to flow cytometry labs: biopharma, CROs, academic cores, cell therapy, instrument makers. "
            "The problem is the control. Donor cells expire and drift lot to lot. Polystyrene beads have the wrong scatter. "
            "They sell shelf-stable synthetic cell mimics — polymer particles engineered to scatter, fluoresce, and stain like real cells. "
            "Compensation, unmixing, viability, immunophenotyping, instrument setup. Catalog SKUs plus custom mimics on request. "
            "A scientist finds a control, reads a protocol, orders a reagent. Repeat purchases. "
            "Sanity owns product and resource documents. Next.js is the catalog and shop."
        ),
    },
    {
        "clock": "10:45–11:15",
        "slide": "16 · Slingshot catalog",
        "do": "Home, how it works, shop. Name public surfaces only.",
        "say": (
            "Three public surfaces. Homepage is the catalog of controls. "
            "How Mimics Work is the argument: not a biologic, not a bead. "
            "Shop is the conversion: SKUs grouped by purpose — unmixing, immunophenotyping, CAR-T, custom — then a cart. "
            "Resources sit beside the shop: application notes, data sheets, protocols. That is the education that sells a reagent. "
            "Same rule: I cannot open the desk."
        ),
    },
    {
        "clock": "11:15–11:30",
        "slide": "17 · Stop",
        "do": "Stop. Invite questions on Thorn and Furrow, not on those studios.",
        "say": (
            "I cannot open those desks. This catalog I can. "
            "Happy to go into schema, caching, or the order form — here."
        ),
    },
]


def set_run(run, *, size=11, bold=False, color=INK, italic=False, name="Calibri"):
    run.font.name = name
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.italic = italic
    run.font.color.rgb = color
    rPr = run._element.get_or_add_rPr()
    rFonts = rPr.get_or_add_rFonts()
    rFonts.set(qn("w:eastAsia"), name)


def add_para(doc, text, *, size=11, bold=False, italic=False, color=INK, name="Calibri", space_before=0, space_after=8):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = 1.15
    run = p.add_run(text)
    set_run(run, size=size, bold=bold, italic=italic, color=color, name=name)
    return p


def add_heading(doc, text, level=1):
    return add_para(
        doc,
        text,
        size=18 if level == 1 else 13,
        bold=True,
        color=MOSS if level == 1 else INK,
        name="Georgia",
        space_before=16 if level == 1 else 12,
        space_after=8,
    )


def add_bullet(doc, text, *, size=11):
    p = doc.add_paragraph(style="List Bullet")
    run = p.add_run(text)
    set_run(run, size=size)
    return p


def shade_cell(cell, hex_color):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:fill"), hex_color)
    shd.set(qn("w:val"), "clear")
    tcPr.append(shd)


def set_cell_text(cell, text, *, bold=False, color=INK, size=10):
    cell.text = ""
    run = cell.paragraphs[0].add_run(text)
    set_run(run, size=size, bold=bold, color=color)


def add_table(doc, headers, rows):
    table = doc.add_table(rows=1 + len(rows), cols=len(headers))
    table.style = "Table Grid"
    for i, header in enumerate(headers):
        cell = table.rows[0].cells[i]
        set_cell_text(cell, header, bold=True, color=RGBColor(0xFF, 0xFF, 0xFF), size=10)
        shade_cell(cell, "3A4A38")
    for r, row in enumerate(rows, start=1):
        for c, value in enumerate(row):
            cell = table.rows[r].cells[c]
            set_cell_text(cell, value, size=10)
            if r % 2 == 0:
                shade_cell(cell, "F6F4F0")
    doc.add_paragraph()


SLIDES = [
    (
        "1 · Title",
        "You are saying what this talk is: a marketing website, not a SaaS app.",
        "Next.js is the site. Sanity is the CMS. Vercel is deploy. Thorn & Furrow is the catalog you can open. Two other sites come later; you will not open their CMS.",
        "Do not start the demo yet. The deck is on the projector. The catalog is already open in a browser.",
    ),
    (
        "2 · Not a SaaS",
        "You are drawing a line: login app vs public catalog.",
        "SaaS = people log in, the software is the product, success is signup. This site = nobody logs in, the catalog is the marketing surface, success is a packet-list request (a lead).",
        "Point left then right. Stay on the slide.",
    ),
    (
        "3 · The stack",
        "You are naming the three tools, in order.",
        "Next.js draws the public pages. Sanity is the editor (Studio). Vercel hosts the site after a git push. Editor publishes → Next.js pulls → Vercel serves.",
        "Walk the three boxes. Do not open code.",
    ),
    (
        "4 · The job",
        "You are explaining the work: marketers edit fields; you own the structure.",
        "A farm sells 17 seed packets each spring. If a variety is listed, they grow it. A sold-out packet or a new heading is a field, not a code change. That is the same deal as any marketing website.",
        "Stay on the slide. Do not click the site.",
    ),
    (
        "5 · What visitors see",
        "You are touring the public site the way a visitor sees it.",
        "Four pages: homepage (blocks from the CMS), varieties (the catalog), journal (seasonal notes), mail order (a letter, not a shopping cart). Studio exists, but it is not linked in the footer — the storefront should feel like a real catalog.",
        "Point at the four screenshot cards.",
    ),
    (
        "6 · Why this shape",
        "You are saying why this is not a generic marketing homework site.",
        "Four ideas: (1) one Icehouse Tomato document reused everywhere, (2) homepage is an ordered list of sections, (3) marketers edit stock and price, (4) analytics uses a hidden event ID, not the button words.",
        "If you forget a word, say: one record, many pages.",
    ),
    (
        "7 · Architecture",
        "You are walking the path from editor to live page. Left to right.",
        "Studio → GROQ query → Next.js page → ISR refresh → catalog. If Sanity is down, a local backup still shows the catalog. That is how the demo cannot die.",
        "Do not open code unless they ask.",
    ),
    (
        "8 · Content model",
        "You are naming the five kinds of records in the CMS.",
        "Farm settings (site chrome). Catalog homepage (ordered sections). Variety (the product). Journal note. Workshop. Change Icehouse once; home, packet page, and order form all follow.",
        "Say the desk is labeled The farm — editors see a catalog, not a generic CMS.",
    ),
    (
        "9 · Live demo",
        "This is the talk. Switch to the browser. Four clicks.",
        "Home is live. Icehouse is the same document. You change a heading in Studio, publish, reload — it is live. The button text can change; the event ID cannot.",
        "Practice this until you can do it without the notes.",
    ),
    (
        "10 · What I would defend",
        "You are listing five choices you would make again.",
        "Fetch on the server. Do not copy the same tomato into three places. Track event IDs. Refresh after publish. No fake cart — a packet-list request is the lead.",
        "If Studio failed in the demo, say the seed fallback still rendered.",
    ),
    (
        "11 · Close",
        "One sentence. Then stop if they only have ten minutes.",
        "The catalog is the product. The CMS is how it changes without a deploy.",
        "Memorize this line. Do not add a new topic.",
    ),
    (
        "12 · NDA map",
        "You are introducing two live sites you cannot open internally.",
        "Explain them like an ads business: who buys, what is inventory, how a visit becomes a sale. Jamb is a Pimlico dealer. Slingshot sells lab reagents. Public pages only.",
        "Never open their Studio. Never invent field names.",
    ),
    (
        "13 · Jamb business",
        "You are explaining Jamb as a business, not as code.",
        "Who: designers and collectors. Inventory: unique antiques plus handmade copies so a design survives after the antique sells. Sale: showroom enquiry, not Amazon. Sanity owns collections and journal stories.",
        "The screenshot is the public homepage.",
    ),
    (
        "14 · Jamb catalog",
        "You are naming four public collections.",
        "Fireplaces, lighting, furniture, journal. Same idea as Thorn & Furrow: collections in the CMS, storefront in Next.js.",
        "Do not guess schema names. Say collections and stories.",
    ),
    (
        "15 · Slingshot business",
        "You are explaining why labs buy cell mimics.",
        "Who: flow cytometry labs. Problem: real donor cells expire and vary; plastic beads scatter wrong. Product: shelf-stable synthetic cells. Sale: find a control, read a protocol, order a vial. Repeat purchases.",
        "The screenshot is How Mimics Work. Still no Studio.",
    ),
    (
        "16 · Slingshot catalog",
        "You are naming the public surfaces.",
        "Home = catalog. How Mimics Work = the argument. Shop = SKUs and a cart. Resources = notes and data sheets that help a scientist buy.",
        "Same rule: I cannot open the desk.",
    ),
    (
        "17 · Stop",
        "You close the NDA section and invite questions on Thorn & Furrow.",
        "I cannot open those desks. This catalog I can.",
        "Do not answer questions about Jamb or Slingshot internals. Redirect to this catalog.",
    ),
]


def build_docx():
    doc = Document()
    section = doc.sections[0]
    section.top_margin = Inches(0.85)
    section.bottom_margin = Inches(0.85)
    section.left_margin = Inches(1.0)
    section.right_margin = Inches(1.0)

    add_para(doc, "MENTOR PACK  ·  FOR THE PRESENTER", size=10, bold=True, color=MOSS, space_after=4)
    add_para(doc, "Understand the talk, then read the script", size=26, bold=True, name="Georgia", space_after=4)
    add_para(
        doc,
        "This guide is for a first-time presenter. Read it once slowly. Then practice with SCRIPT.txt. "
        "You do not need to have written the code. You do need to understand the story.",
        size=12,
        italic=True,
        color=MUTED,
        name="Georgia",
        space_after=12,
    )

    add_heading(doc, "For the mentor (read this first)")
    add_para(
        doc,
        "Coach the opening first: not a SaaS, then Next.js / Sanity / Vercel. Then the catalog. If she can say that in her own words, the rest of the talk has a frame.",
    )
    for item in [
        "Before Studio: have her explain SaaS vs this site, then the three tools, with no slides.",
        "Then open /studio. Let her change the masthead heading and publish. That loop is the talk.",
        "Have her explain Jamb and Slingshot out loud using only who / inventory / sale. Stop her if she starts inventing field names.",
        "First rehearsal: she reads SCRIPT.txt. Second rehearsal: she uses only the slides. Third: you interrupt with questions.",
        "If she freezes, the rescue line is: “The catalog is the product. The CMS is how it changes without a deploy.”",
    ]:
        add_bullet(doc, item)

    add_heading(doc, "Start here — what you are presenting")
    add_para(
        doc,
        "You are not presenting a SaaS product. You are presenting a marketing website.",
        size=14,
        italic=True,
        name="Georgia",
        space_after=10,
    )
    add_para(
        doc,
        "Say this until it is boring: a SaaS is an app people log into (dashboard, settings, billing). "
        "This talk is a public website for a farm that sells seed. Nobody logs in. The pages are the catalog. "
        "Marketers change packets and headings in a CMS. Engineering does not ship a new build for those changes. "
        "At the end you will also name two other live marketing sites (Jamb, Slingshot) that you cannot open inside.",
    )
    add_para(doc, "Your job in the room is three things, in this order:", size=11, bold=True, space_before=8, space_after=4)
    for item in [
        "1. Tell them what this is: marketing site, not SaaS. Stack: Next.js, Sanity, Vercel.",
        "2. Walk Thorn & Furrow live: homepage, Icehouse Tomato, publish a heading, event ID on the button.",
        "3. If there is time: Jamb and Slingshot as public businesses only. No Studio.",
    ]:
        add_bullet(doc, item)

    add_heading(doc, "Not a SaaS — the difference")
    add_para(doc, "This is the first idea they need to hear. Point at slide 2.")
    add_table(
        doc,
        ["A normal SaaS", "This site (marketing catalog)"],
        [
            ["People log in. Dashboard, settings, roles, billing.", "Nobody logs in. The catalog is public."],
            ["The software is the product.", "The catalog is the marketing surface for a real farm."],
            ["Data belongs to each customer’s account.", "Content is editorial: packets, stories, stock."],
            ["Engineering ships features: auth, CRUD, permissions.", "Engineering ships types, pages, publish, SEO, tracking."],
            ["Success is signup, activation, subscription.", "Success is a packet-list request — a marketing lead."],
        ],
    )
    add_para(
        doc,
        "If someone asks “is this like Slack / Notion / a dashboard app?” the answer is no. Those are SaaS. This is the public website that sells the thing.",
        italic=True,
        color=MUTED,
    )

    add_heading(doc, "The stack — three tools")
    add_para(doc, "Memorize these three sentences. They are slide 3.")
    add_table(
        doc,
        ["Tool", "What it is", "What you say"],
        [
            ["Next.js", "The website framework (React, App Router).", "Next.js is the site — what visitors see."],
            ["Sanity", "The CMS. Studio is the editor at /studio.", "Sanity is the CMS. Packets are documents, not a Word file."],
            ["Vercel", "The host. Git push → live URL, CDN, ISR.", "Vercel is where it deploys. That is production."],
        ],
    )
    add_para(
        doc,
        "The loop, in one line: editor publishes in Sanity → Next.js pulls the page → Vercel serves it. "
        "That is what you are here to show. You do not need to explain React internals.",
        space_before=4,
    )

    add_heading(doc, "The one idea (after the stack)")
    add_para(
        doc,
        "The catalog is the product. The CMS is how it changes without a deploy.",
        size=14,
        italic=True,
        name="Georgia",
        space_after=10,
    )
    add_para(
        doc,
        "In plain English: this is a real-looking website for a farm that sells heirloom seeds. "
        "Marketers can change headings, stock, and stories in Sanity Studio. A programmer does not need to redeploy the site for those changes.",
    )

    add_heading(doc, "What you are showing")
    add_table(
        doc,
        ["Thing", "What it is", "Can you open it?"],
        [
            ["Thorn & Furrow", "A Hudson Valley heirloom-seed catalog. 17 packets, journal, workshops, mail-order letter. Catalog No. 14, Spring 2026.", "Yes. Website and Studio."],
            ["Jamb", "A Pimlico dealer: antique and reproduction fireplaces, lighting, furniture, a journal. jamb.co.uk", "Public website only. No Studio."],
            ["Slingshot Bio", "Lab reagents: synthetic cell mimics for flow cytometry. slingshotbio.com", "Public website only. No Studio."],
        ],
    )

    add_heading(doc, "Hard rules (NDA)")
    add_para(doc, "Jamb and Slingshot were built under NDA. You may talk about the public business. You may not show how they are built inside.")
    for item in [
        "You MAY: name the company, what they sell, who buys, how a visit becomes a sale, and that Sanity feeds public pages (collections/stories, or products/resources).",
        "You MAY NOT: open their Studio, repo, or admin. Do not name schemas, field names, or internal tools.",
        "If they ask “can you show Jamb Studio?” say: “No. NDA. I can name the business and which public surfaces Sanity feeds. Thorn & Furrow is the walkthrough.”",
        "Do not mention NDA, interview, or CMS on the public Thorn & Furrow site. That site should feel like a live catalog.",
        "Do not guess. If you do not know, say you will stay on public surfaces.",
    ]:
        add_bullet(doc, item)

    add_heading(doc, "Words you need (say them in English first)")
    add_table(
        doc,
        ["Word", "Say it like this"],
        [
            ["CMS", "The editor marketers use to change the website without asking engineering to ship a new build."],
            ["Next.js", "The website framework that draws the public pages. React, App Router."],
            ["Sanity", "The CMS used here. Studio is the editor."],
            ["Vercel", "Where the Next.js site deploys. Git push, live URL, CDN, ISR."],
            ["Studio", "The admin screen of Sanity. For this catalog it lives at /studio. The desk is labeled The farm."],
            ["Document", "One record. Icehouse Tomato is one document. Home, the packet page, and the order form all point at it."],
            ["Section / composition", "The homepage is a list of blocks in order. Editors can reorder them."],
            ["GROQ", "The query language Next.js uses to pull content from Sanity."],
            ["ISR", "Pages refresh about every 60 seconds. A signed revalidate call after publish means we do not wait a full minute."],
            ["eventId", "A hidden name on a button (hero_order, nav_order). Analytics listens to the ID, not the words on the button."],
            ["Mail order / no cart", "Visitors mark packets and tell us their zone. We write back. That is a marketing lead, not a fake checkout."],
            ["Seed fallback", "If Sanity is down, local backup content still renders the catalog. The demo does not go blank."],
        ],
    )

    add_heading(doc, "How the 17 slides fit")
    add_para(doc, "Slides 1–11 are the 10-minute talk (start with not-SaaS and the stack). Stop at slide 11 if that is all the time. Slides 12–17 are extra past work.")
    add_table(
        doc,
        ["Time", "Slide", "In one sentence"],
        [
            ["0:00–0:25", "1 Title", "Marketing site, not SaaS. This catalog I can open."],
            ["0:25–1:05", "2 Not a SaaS", "Login app vs public catalog. Lead, not signup."],
            ["1:05–1:50", "3 The stack", "Next.js = site. Sanity = CMS. Vercel = deploy."],
            ["1:50–2:25", "4 The job", "I own the types. They own the catalog."],
            ["2:25–3:00", "5 Product", "Four public pages. No cart."],
            ["3:00–3:35", "6 Why this shape", "Documents, sections, fields, event IDs."],
            ["3:35–4:25", "7 Architecture", "Studio → GROQ → Next.js → live catalog."],
            ["4:25–5:00", "8 Content model", "Five document types. Change Icehouse once."],
            ["5:00–7:40", "9 Live demo", "This is the talk. Four clicks."],
            ["7:40–8:20", "10 Decisions", "Five choices I would make again."],
            ["8:20–8:50", "11 Close", "The memorized line. Stop if time is up."],
            ["8:50–9:05", "12 NDA map", "Two public sites. No Studio."],
            ["9:05–9:40", "13 Jamb business", "Who buys, what sells, how it sells."],
            ["9:40–10:10", "14 Jamb catalog", "Fireplaces, lighting, furniture, journal."],
            ["10:10–10:45", "15 Slingshot business", "The control problem, then the product."],
            ["10:45–11:15", "16 Slingshot catalog", "Home, argument, shop."],
            ["11:15–11:30", "17 Stop", "Questions on this catalog, not those desks."],
        ],
    )
    add_para(
        doc,
        "If you run long: skip slide 10, say the close line, take questions. Do not skip slides 2 and 3 — that is how the room knows what you are presenting.",
        italic=True,
        color=MUTED,
    )

    add_heading(doc, "Slide by slide — understand, then speak")
    add_para(
        doc,
        "For each slide: first understand what it is arguing. Then read the SAY lines from SCRIPT.txt. "
        "Do not invent extra features.",
        italic=True,
        color=MUTED,
    )
    for num, (title, meaning, gist, coach) in enumerate(SLIDES, start=1):
        add_heading(doc, f"Slide {num}  ·  {title.split(' · ', 1)[-1]}", level=2)
        add_para(doc, "What this slide means", size=10, bold=True, color=MOSS, space_after=2)
        add_para(doc, meaning, space_after=6)
        add_para(doc, "Say it in your own words first", size=10, bold=True, color=MOSS, space_after=2)
        add_para(doc, gist, space_after=6)
        add_para(doc, "Coach note", size=10, bold=True, color=MOSS, space_after=2)
        add_para(doc, coach, italic=True, color=MUTED, space_after=10)

    add_heading(doc, "Live demo — four clicks (practice this)")
    add_para(doc, "Before you start: catalog at http://localhost:3000 and Studio at http://localhost:3000/studio, already logged in. Hard-refresh once.")
    add_table(
        doc,
        ["Step", "You click", "You say"],
        [
            ["1", "Homepage /", "Catalog Number 14. The masthead is a section. The featured packet is a document, not a widget. The sowing table is editorial. The spring list is seventeen references."],
            ["2", "Icehouse Tomato", "Same document you just saw featured."],
            ["3", "Studio → Catalog homepage → masthead heading → Publish → reload /", "The heading is live. That publish loop is the work."],
            ["4", "Hover Request a packet list", "The label is copy. The contract is eventId — hero_order, nav_order. Copy can change. GTM does not."],
        ],
    )
    add_para(doc, "If Studio fails: keep going on the public site. Say the local seed still renders the catalog. Do not apologize for a long time.")

    add_heading(doc, "Jamb and Slingshot in four lines each")
    add_para(doc, "Jamb", size=13, bold=True, name="Georgia", space_before=4, space_after=4)
    for item in [
        "Who buys: interior designers, collectors, country-house clients. Pimlico Road plus US showrooms.",
        "What they sell: unique antiques (chimneypieces, lighting, furniture) and handmade reproductions so a design stays available after the antique sells.",
        "How a visit becomes a sale: high-ticket, consultative. The website is the catalog for the showroom, not a cart.",
        "Where Sanity sits: collections and journal stories. Next.js is the storefront.",
    ]:
        add_bullet(doc, item)
    add_para(doc, "Slingshot Bio", size=13, bold=True, name="Georgia", space_before=8, space_after=4)
    for item in [
        "Who buys: flow cytometry labs — biopharma, CROs, academic cores, cell therapy.",
        "What they sell: shelf-stable synthetic cell mimics that scatter and stain like real cells. Catalog SKUs plus custom.",
        "How a visit becomes a sale: a scientist finds a control, reads a protocol, orders a reagent. Repeat purchases.",
        "Where Sanity sits: product and resource documents. Next.js is the catalog and shop.",
    ]:
        add_bullet(doc, item)

    add_heading(doc, "If they ask")
    add_table(
        doc,
        ["Question", "Answer in one breath"],
        [
            ["Is this a SaaS?", "No. Nobody logs in. It is a public marketing catalog. The conversion is a lead, not a subscription."],
            ["Can you show Jamb or Slingshot Studio?", "No. NDA. I can name the business and which public surfaces Sanity feeds. Thorn & Furrow is the walkthrough."],
            ["How does the homepage work?", "An ordered Sanity array. The UI switches on section type. Editors reorder blocks."],
            ["What is ISR?", "Pages regenerate on a 60-second window, plus a signed revalidate call after publish."],
            ["How do you track CTAs?", "A hidden event ID on the link. GTM listens for the ID, not the label."],
            ["What if Sanity is down?", "Local seed still renders. The catalog does not go blank."],
            ["Is there a cart?", "No. Mail order is a qualified packet-list request — a marketing lead."],
            ["What is a document?", "Icehouse Tomato is one record. Home, packet page, and order form all reference it."],
        ],
    )

    add_heading(doc, "Before you walk in")
    for item in [
        "Memorize the close line.",
        "Do the four demo clicks twice without notes.",
        "Read SCRIPT.txt out loud once. Then put it down and use the slides.",
        "If you only have ten minutes: slides 1–9. If they ask about past work: 10–15.",
        "Breathe. Point at the screen. Finish the sentence if they interrupt, then answer.",
    ]:
        add_bullet(doc, item)

    add_para(
        doc,
        "The catalog is the product. The CMS is how it changes without a deploy.",
        size=14,
        italic=True,
        name="Georgia",
        space_before=16,
        space_after=8,
    )
    add_para(
        doc,
        "Word-for-word lines: SCRIPT.txt in this folder. Deck: Thorn-and-Furrow-Portfolio.pptx",
        size=9,
        color=MUTED,
    )

    path = OUT / "Mentor-Guide.docx"
    doc.save(path)
    return path


def build_script_txt():
    lines = [
        "THORN & FURROW — SPEAKING SCRIPT",
        "Read SAY out loud. Follow DO. Ten minutes is slides 1–11. Slides 12–17 if they have time.",
        "",
        "BEFORE YOU START",
        "- Catalog: http://localhost:3000",
        "- Studio: http://localhost:3000/studio (already logged in)",
        "- Hard-refresh once. If Studio fails, keep going on the public site.",
        "- If you run long, skip slide 10, say the close line, take questions. Do not skip slides 2 and 3.",
        "",
        "MEMORIZE THIS LINE",
        "The catalog is the product. The CMS is how it changes without a deploy.",
        "",
        "==================================================",
        "",
    ]
    for beat in BEATS:
        lines += [
            f"{beat['clock']}    {beat['slide']}",
            "",
        ]
        if beat.get("do"):
            lines += [f"DO:  {beat['do']}", ""]
        lines += ["SAY:", beat["say"], "", "--------------------------------------------------", ""]
    lines += [
        "END",
        "If they ask about Jamb or Slingshot Studio: No. NDA. Thorn & Furrow is the walkthrough.",
        "",
    ]
    path = OUT / "SCRIPT.txt"
    path.write_text("\n".join(lines), encoding="utf-8")
    return path


if __name__ == "__main__":
    print(build_docx())
    print(build_script_txt())
