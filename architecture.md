# Architecture — The Brawijaya Landing Page

## 1. High-Level Shape

This is a **static/near-static marketing page** with zero backend surface:

```
Visitor → Next.js page (SSG/ISR) → images from Cloudinary CDN
                                  → CTA click → wa.me (WhatsApp, off-site)
```

No database. No API routes. No form submission endpoint. This is a
deliberate choice, not a gap:

- Lead capture happens entirely via `wa.me` click-to-chat links, so there
  is no server to store, validate, or leak lead data from.
- It removes an entire class of risk (injection, spam bots hitting a
  form endpoint, need for rate limiting/CAPTCHA) for a page whose only
  job is "get visitor to WhatsApp."
- If a real CRM/lead-tracking need shows up later, that's a v2 decision —
  don't build it preemptively.

## 2. Rendering Strategy

- **Static Generation (SSG)** for the whole page — content is fixed
  marketing copy, not per-visitor dynamic data. No need for SSR or ISR
  unless promo copy/pricing needs to change without a redeploy (if so,
  revisit — could move copy to a local JSON/MDX file and use ISR with a
  long revalidate window, still no database).

## 3. Folder Structure (proposed)

```
app/
  layout.tsx          — root layout, fonts, metadata
  page.tsx             — assembles all sections in order
  globals.css
components/
  sections/
    hero.tsx
    promo-banner.tsx
    gallery.tsx
    unit-types.tsx      — Aryasatya / Adhinata tabs or cards
    bonus-list.tsx
    location-highlights.tsx
    contact-cta.tsx
  ui/                   — shadcn/ui primitives
  whatsapp-cta.tsx       — shared CTA button component (wa.me link builder)
lib/
  config.ts             — WA number, Cloudinary cloud name, unit data
  cloudinary.ts          — next/image loader function
data/
  units.ts               — Aryasatya/Adhinata spec objects (typed)
  gallery.ts              — curated Cloudinary image list + alt text
```

## 4. Image Pipeline (Cloudinary)

- Images live in a Cloudinary account (mak's photos get uploaded there
  manually or via Cloudinary's upload widget — not through this app).
- `next/image` uses a custom loader (`lib/cloudinary.ts`) that builds
  Cloudinary transformation URLs (`f_auto,q_auto,w_{width}`) so images
  are auto-optimized per device without running our own image server.
- Only the **image path/public ID** is stored in `data/gallery.ts`, not
  full URLs — keeps it swappable if the Cloudinary cloud name changes.

## 5. Config & Environment

- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` — safe to expose (it's just a CDN
  namespace, not a secret).
- `NEXT_PUBLIC_WA_NUMBER` — the sales WA number, centralized so it's
  changed in one place if Yulia's number ever changes.
- No other secrets needed for v1 — no API keys, no database URL.

## 6. WhatsApp CTA Component

Single shared component builds the link:

```
https://wa.me/<NEXT_PUBLIC_WA_NUMBER>?text=<url-encoded prefilled message>
```

Each section passes its own context-aware message (e.g. "Halo, saya
tertarik dengan Tipe Adhinata di The Brawijaya") so the sales agent
knows what the visitor was looking at.

## 7. Security Posture

Because there's no backend, the threat surface is mainly client-side:

- Security headers (CSP, X-Frame-Options, Referrer-Policy) set via
  `next.config.ts` headers() or middleware.
- No third-party scripts beyond what's strictly needed (e.g. avoid
  adding analytics/pixels without an explicit decision — each one is
  a new script executing on the page).
- Google Maps embed (if used, per reference site) loaded via iframe
  with restrictive `sandbox`/`allow` attributes, not a JS SDK.
- Dependency audit as part of CI/pre-deploy (see AGENTS.md §4).

## 8. Performance Targets

- Hero image: `priority` + explicit width/height to avoid layout shift.
- Below-the-fold gallery images: lazy-loaded by default (`next/image`
  default behavior).
- Fonts: use `next/font` (self-hosted, no external font request blocking
  render); verify `--font-sans` actually resolves to Geist and not a
  serif fallback (see AGENTS.md §2 Phase 2 — this has silently broken
  on prior shadcn+Next.js setups).
- Target Lighthouse mobile Performance ≥ 90 (matches prd.md §9).
- Build hygiene: `prebuild` script clears `.next` before each build to
  avoid stale-chunk issues on redeploy (see AGENTS.md §2 Phase 3).

## 8a. Runtime Memory Safety

This page is mostly static, but a few client components will have
subscriptions (scroll-based header state, carousel autoplay, intersection
observers for scroll-in animations). Every one of these **must** clean up
in its `useEffect` return — this is a hard requirement in AGENTS.md §3,
not optional polish. An uncleaned listener/interval is exactly the class
of bug that caused a crash on a prior project ([[affanverse]]) — treat
every subscription in a client component as leak-risk until it has a
verified cleanup function.

## 9. Deployment

- Vercel, connected to the GitHub repo.
- Preview deployments per branch/PR for mak/Yulia to review before merge
  to production.

## 10. Explicit Non-Decisions (revisit only if needed)

- No CMS — if content changes become frequent, consider MDX/JSON content
  files before reaching for a full CMS.
- No analytics in v1 — add only with explicit approval, and prefer a
  privacy-respecting, lightweight option (e.g. Vercel Analytics) over a
  heavy third-party pixel.
