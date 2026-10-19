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

## 3. Folder Structure (actual)

```
app/
  layout.tsx          — root layout, fonts, metadata
  page.tsx            — assembles all sections in order
  globals.css         — @theme brand tokens (emerald, gold, ivory, charcoal)
components/
  sections/
    hero.tsx          — built
    unit-section.tsx  — built (reusable: Aryasatya ivory, Adhinata emerald)
    location.tsx      — built
    (planned: keunggulan.tsx, galeri.tsx, legalitas.tsx, kontak.tsx)
  navbar.tsx          — built (scroll-spy, responsive Sheet on mobile)
  footer.tsx          — built
  floating-whatsapp.tsx — built
  ui/                 — shadcn/ui primitives (button, badge, dialog, card, separator, sheet)
lib/
  site.ts             — config: WA number, marketing contact, brand name, nav items, priceFrom, bookingFee, installmentFrom
  units.ts            — Aryasatya/Adhinata typed spec objects + FLOOR_PLAN_LABELS
  location.ts         — 6 location items with distances
  cloudinary.ts       — getCloudinaryUrl helper for next/image
  wa.ts               — buildWaLink helper
  utils.ts            — cn (clsx + tailwind-merge)
public/
  logo-the-brawijaya.webp — 150x107px transparent logo
```

## 4. Image Pipeline (Cloudinary)

- Images live in a Cloudinary account (cloud name: `dcsh47583`).
- `next/image` uses `getCloudinaryUrl` helper from `lib/cloudinary.ts` that builds
  Cloudinary transformation URLs (`f_auto,q_auto,w_{width}`) so images
  are auto-optimized per device without running our own image server.
- Only the **image public ID** is stored in code (e.g. `hero-gerbang_p7bmqb`,
  `aryasatya1_vywvat`), not full URLs — keeps it swappable if the cloud changes.

## 5. Config & Environment

- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dcsh47583` — safe to expose (it's just a CDN
  namespace, not a secret).
- `NEXT_PUBLIC_WA_NUMBER` — the sales WA number (Yulia), centralized in `.env.local` so it's
  changed in one place if it ever changes. Read via `lib/site.ts`.
- No other secrets needed for v1 — no API keys, no database URL.

## 6. WhatsApp CTA Component

`buildWaLink` in `lib/wa.ts` builds the link:

```
https://wa.me/<NEXT_PUBLIC_WA_NUMBER>?text=<url-encoded prefilled message>
```

Each section passes its own context-aware message (e.g. "Halo Kak Yulia,
saya tertarik dengan Tipe Adhinata di The Brawijaya") so the sales agent
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

This page is mostly static, but a few client components have
subscriptions (scroll-based navbar state, carousel scroll tracking, intersection
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
