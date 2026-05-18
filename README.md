# AEG Contracting Form

A customizable Next.js + Sanity site for Andreas Empire Group's agent contracting & onboarding flow.

**Reference:** built on the same patterns as [WBSLandingPage](../WBSLandingPage).

## Stack

- **Next.js 16** (App Router, React 19, Turbopack)
- **Sanity v5** — CMS with Presentation Tool (right-click to add sections in `/studio`)
- **Neon Postgres** via **Drizzle ORM** — form submissions, files, audit log
- **Tailwind 4** — gold/black luxury theme (`globals.css`)
- **Radix + shadcn/ui** primitives, **Motion** animations
- **Resend** — magic-link resume emails (Phase 2)
- **Anthropic SDK** — AI Concierge (Phase 3)

## Local setup

```bash
# 1. Install
npm install

# 2. Configure env
cp .env.example .env.local
# Fill in:
#   - NEXT_PUBLIC_SANITY_PROJECT_ID  (create at https://www.sanity.io/manage)
#   - NEXT_PUBLIC_SANITY_API_READ_TOKEN
#   - DATABASE_URL (Neon pooled connection string)
#   - SANITY_STUDIO_PROJECT_ID (same value)

# 3. Push DB schema to Neon
npm run db:push

# 4. Run dev server (Next + embedded Studio)
npm run dev
# → http://localhost:3000           (site)
# → http://localhost:3000/studio    (Sanity Studio with visual editing)
# → http://localhost:3000/contracting (form placeholder, Phase 1)
```

## Editing content

All editable copy lives in Sanity. The studio is mounted at `/studio` and exposes:

- **Site Settings** (singleton) — brand, logo, SEO defaults, support contact
- **Contracting Form Page** (singleton) — step copy, sidebar blocks, footer stats
- **Pages** — page-builder pages composed of sections

### Adding sections visually

Open any page in `/studio` → Presentation. Hover the live preview and click the
"+ Add" overlay between sections. The available section types are declared in
[sanity/schemaTypes/documents/pageType.ts](sanity/schemaTypes/documents/pageType.ts) — to add
a new section type, add a schema in `sanity/schemaTypes/objects/`, a renderer
case in [components/page-builder/page-builder.tsx](components/page-builder/page-builder.tsx),
and a `defineArrayMember` entry in `pageType.ts`.

## Database

Drizzle schemas live in [db/schema.ts](db/schema.ts).

```bash
npm run db:generate   # create migration SQL from schema diff
npm run db:migrate    # apply migrations to DATABASE_URL
npm run db:push       # push schema directly (dev only)
npm run db:studio     # browse data in Drizzle Studio
```

## Roadmap

- **Phase 0** ✅ Scaffold (this commit)
- **Phase 1** — Build the 4-step contracting form (Personal / Licensing / Career Goals / Final Details), step navigation, gold/black UI chrome, sidebar widgets
- **Phase 2** — Drizzle submissions, magic-link resume via Resend, Sanity Asset uploads, admin submission view
- **Phase 3** — AI Concierge (streaming chat, tools, system prompt editable in Sanity)
- **Phase 4** — Polish, motion, a11y, deploy to Vercel

## Layout

```
app/
  layout.tsx              ← root layout (Sanity metadata, draft mode)
  page.tsx                ← home (Sanity slug=home)
  [slug]/page.tsx         ← dynamic Sanity pages
  contracting/page.tsx    ← contracting form (Phase 1)
  studio/[[...tool]]      ← Sanity Studio mount
  api/draft-mode/         ← enable/disable preview mode

sanity/
  env.ts, lib/*, presentation/, structure.ts, schemaTypes/

components/
  page-builder/           ← section dispatcher (the "right-click to add" pattern)

db/
  schema.ts, client.ts    ← Drizzle + Neon

lib/
  utils.ts, fonts.ts
```
