# PRD — The Brawijaya Landing Page

## 1. Background

Marketing landing page for **The Brawijaya**, a housing cluster in Serpong,
Tangerang Selatan. This site is a **sales/lead-gen tool**, not a full company
site — its only job is to convince a visitor to contact Yulia (the sales
agent) via WhatsApp.

Design reference (visual language + structure, facts rewritten in our own words):
https://thebrawijaya.co.id/

## 2. Goals

- Convert mobile visitors (majority of traffic expected) into a WhatsApp
  chat with the sales agent, as fast as possible.
- Communicate the two house types clearly enough that a visitor doesn't
  need to ask basic spec questions before chatting.
- Feel premium/"Modern Classic European", matching the reference site's
  tone — not generic or templated.
- Load fast on mobile data (many visitors will be on 4G, not wifi).

## 3. Non-Goals (out of scope for v1)

- No CMS / admin panel — content is hardcoded in the codebase for now.
- No database, no user accounts, no backend API.
- No blog, no multi-page site — this stays a single scrolling page.
- No payment or booking flow — WhatsApp handles that conversation.

## 4. Target Audience

- Prospective home buyers browsing on mobile, often from a social
  media ad or shared WA link.
- Budget range Rp970Jt–Rp1,2M — price-sensitive, comparison-shopping
  against other Serpong/BSD clusters.

## 5. Page Sections (v1 status)

**Built (live in code):**
1. **Hero** — headline, price from Rp970 juta, primary CTA button (WA link)
2. **Tipe Aryasatya** — LB 68m², LT 55m² (5x11m), 3KT/2KM, photo carousel + floor plans, highlights, WA CTA
3. **Tipe Adhinata** — LB 83m², LT 66m² (6x11m), 3KT/2KM, carport 2 mobil, photo carousel + floor plans, highlights, WA CTA
4. **Lokasi Strategis** — 6 distance chips (Tol BSD, Stasiun Rawa Buntu, The Breeze, Eka Hospital, Sekolah Cikal, Pasar Modern BSD), WA CTA

**Global (live in code):**
- Navbar (scroll-spy, responsive Sheet on mobile)
- Footer (brand, links, contact, developer, disclaimer)
- Floating WhatsApp button (bottom-right, safe-area aware)

**Planned / pending client confirmation (Phase 2):**
- Keunggulan/gratisan — 3 unit AC, canopy, smart door lock, pompa air,
  toren, DP 5%*, BPHTB*, biaya surat s/d SHM* (verify with client)
- Galeri — curated interior/exterior photos (select best ~8–12 from uploaded set)
- Legalitas — PBG signboard photo + text
- Kontak — repeat WA CTA, agent info, S&K berlaku disclaimer

**Pricing (confirmed):**
- Price from: Rp970 juta (read from `lib/site.ts`)
- Booking fee: Rp10 juta all-in
- Installments: from ~Rp6 juta/month

## 6. Functional Requirements

- **Lead capture = click-to-WhatsApp only.** Every CTA button opens
  `https://wa.me/<number>?text=<prefilled message>` in a new tab.
  No form, no submission endpoint, no stored lead data.
- Prefilled WA message should reference which unit type the visitor
  was looking at when possible (e.g. different CTA text per section).
- Fully responsive; primary target is mobile viewport, desktop is
  secondary but must not look broken.
- Images served via Cloudinary URLs (not bundled into the repo).

## 7. Non-Functional Requirements

- **Performance:** LCP under ~2.5s on simulated 4G; images lazy-loaded
  below the fold; hero image optimized/prioritized.
- **Security:** No secrets in client bundle, no backend to attack
  (see architecture.md) — but standard hardening still applies
  (CSP headers, no inline eval, sanitized external links).
- **Accessibility:** semantic headings, alt text on all images, CTA
  buttons reachable/labeled for screen readers, sufficient color
  contrast for text over background images.
- **SEO:** basic meta tags (title, description, OG image) since this
  may be shared as a link on social media / WA.

## 8. Content Source

- Marketing copy: rewritten in our own words from reference site + client input.
- Photos: Cloudinary public IDs (Aryasatya: 11 photos + 3 floor plans; Adhinata: 9 photos + 3 floor plans).
- Contact: Yulia (marketing), WA number in `.env.local`, Instagram @thebrawijaya.official.

## 9. Definition of Done (v1)

- All built sections above (Hero, Aryasatya, Adhinata, Lokasi, global components) implemented and content-complete.
- Verified responsive at common breakpoints (360px, 768px, 1024px, 1440px).
- All WA CTA links tested and open with correct prefilled text.
- Lighthouse mobile score: Performance ≥ 90, Accessibility ≥ 95.
- No `any` types, tests passing (see AGENTS.md), no console errors/warnings.
- `npm run check` passes (typecheck + lint + tests).

**Phase 2** = remaining planned sections (Keunggulan, Galeri, Legalitas, Kontak) after client confirmation on content.
