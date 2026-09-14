# Dhana Laxmi Construction

Marketing and lead-generation website for **Dhana Laxmi Construction**, Rayagada, Odisha. Property listings, in-context search and filters, WhatsApp-first conversion CTAs, and a sell-your-property lead form.

## Tech stack

- **Next.js 14** (App Router, fully static output)
- **React 18** + **TypeScript** (strict)
- **Tailwind CSS 3** with a custom brand theme (navy `#03254D`, gold `#CE811C`)
- `next/image` for responsive, optimised images
- JSON-LD structured data (`RealEstateAgent`, `Product`, `BreadcrumbList`)
- Client-side search / filter / sort — no backend required

## Getting started

```bash
npm install
npm run dev       # start dev server on http://localhost:3000
npm run build     # production build (static)
npm start         # serve the production build
```

## Configure

All business-specific details live in **`src/config/site.ts`**:

- `whatsappNumber` — international format, digits only (e.g. `"919776213573"`)
- `phone`, `email`, `address`, `mapEmbedUrl`, `social`

Changing this file automatically updates every WhatsApp button, call link, footer entry, contact page card and structured-data record across the site.

## Property inventory

The full property dataset is in **`src/data/properties.ts`**. Adding, removing or updating a property is a single-object change — cards, filters, detail pages, sitemap and JSON-LD update automatically.

Property photos are self-hosted under **`public/property-photos/`** with filenames matching each property's slug.

## Project structure

```
src/
├── app/                    Next.js App Router pages
│   ├── page.tsx           Home
│   ├── properties/        Listing + [slug] detail
│   ├── about/  contact/  sell/
│   ├── sitemap.ts  robots.ts
│   └── layout.tsx  globals.css
├── components/            Header, Footer, Hero, PropertyCard,
│                          PropertyGallery, MobileNav, forms, Schema, …
├── config/site.ts         Business details (single source of truth)
├── data/properties.ts     Property inventory
└── lib/                   format.ts (INR, WhatsApp links), search.ts
public/
├── logo.png               Brand logo
├── banner-bg.png          Hero background artwork
└── property-photos/       Property images
```

## Forms

The Sell Your Property and Contact forms validate client-side (Indian mobile format, required fields) and expose a clear integration point in each `onSubmit` where you can wire up an email service, Google Sheets, Supabase, Firebase, or a custom API endpoint. The forms are marked with a `// Placeholder integration hook` comment.

## Deploy

Static Next.js output — deploys cleanly to Vercel, Netlify, Cloudflare Pages or any Node host.
