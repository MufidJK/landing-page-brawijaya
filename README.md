<div align="center">
  <img src="docs/readme-logo.png" width="150" alt="The Brawijaya Landing Page logo" />
  <h1>The Brawijaya Landing Page</h1>

  ![Next.js](https://img.shields.io/badge/Next.js-16.3.8-black?style=for-the-badge&logo=next.js)
  ![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=for-the-badge&logo=react)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwind-css)
  ![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-000000?style=for-the-badge)
  ![Cloudinary](https://img.shields.io/badge/Cloudinary-latest-3448C5?style=for-the-badge&logo=cloudinary)
  ![Jest](https://img.shields.io/badge/Jest-30.5.2-C21325?style=for-the-badge&logo=jest)
  ![Vercel](https://img.shields.io/badge/Vercel-deployed-000000?style=for-the-badge&logo=vercel)
  
  [![Live](https://img.shields.io/badge/Live-brawijaya--serpong.vercel.app-00C853?style=for-the-badge)](https://brawijaya-serpong.vercel.app)
</div>

## 📋 Project Overview

Marketing landing page for **The Brawijaya**, a housing cluster in Serpong, Tangerang Selatan. This is a single-purpose lead generation tool: its only goal is to convert visitors into WhatsApp conversations with the sales agent.

**Architecture:** Static site, zero backend. No database, no API routes, no form submissions. Lead capture happens entirely through click-to-WhatsApp links (`wa.me`), removing an entire class of security and spam risks.

## ✨ Key Features & Architecture

- **Click-to-WhatsApp CTA** — Shared `buildWaLink` helper (lib/wa.ts) and reusable `WhatsAppCTA` component (components/whatsapp-cta.tsx) build prefilled WhatsApp links with context-aware messages per section
- **Two house type sections** — Reusable `UnitSection` component (components/sections/unit-section.tsx) with horizontal-scroll photo carousel, click-to-open lightbox with keyboard navigation, and three floor plans per unit
- **Scroll-spy navbar** — Active section tracking via IntersectionObserver (components/navbar.tsx), responsive mobile Sheet menu
- **Floating WhatsApp button** — Bottom-right persistent CTA (components/floating-whatsapp.tsx)
- **Location advantages section** — Six proximity chips showing travel times to key destinations (components/sections/location.tsx)
- **Cloudinary image pipeline** — All images served through `getCloudinaryUrl` helper (lib/cloudinary.ts) with automatic format/quality optimization via Next.js Image component
- **Security headers** — CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy configured in next.config.ts
- **Open Graph link preview** — Metadata with 1200x630 OG image for social sharing (app/layout.tsx, app/opengraph-image.jpg)
- **Jest test suite** — 36 tests across 7 suites covering components, helpers, and user interactions (*.test.tsx files)
- **Zero-warning lint policy** — `npm run check` enforces `tsc --noEmit`, `eslint . --max-warnings 0`, and `jest --ci` (see AGENTS.md §3)

**Implementation reference:**
- Click-to-WhatsApp: `lib/wa.ts`, `components/whatsapp-cta.tsx`
- Photo carousel/lightbox: `components/sections/unit-section.tsx` (lines 159-210 carousel, 266-312 lightbox)
- Scroll-spy navbar: `components/navbar.tsx` (lines 34-88 IntersectionObserver logic)
- Floating WhatsApp: `components/floating-whatsapp.tsx`
- Location section: `components/sections/location.tsx`
- Cloudinary pipeline: `lib/cloudinary.ts`, used in hero/unit sections
- Security headers: `next.config.ts` (lines 12-56)
- Open Graph: `app/layout.tsx` (lines 24-42)
- Test suite: `components/**/*.test.tsx`, `lib/**/*.test.ts`
- Lint policy: `AGENTS.md` (lines 95-100), enforced by `check` script in package.json

## 🛠️ Tech Stack

**Frontend:**
- Next.js 16.3.8 (App Router + Turbopack)
- React 19.2.8
- TypeScript 5 (strict mode)
- Tailwind CSS 4
- shadcn/ui (Radix UI primitives)
- react-icons 5.7.0

**Media:**
- Cloudinary (image CDN with automatic optimization)

**Testing & Quality:**
- Jest 30.5.2
- React Testing Library 16.3.3
- ESLint 9

**Deployment:**
- Vercel

## 📁 Project Structure

```
landing-page-rumah-brawijaya/
├── app/
│   ├── layout.tsx                 # Root layout, fonts, metadata, Open Graph
│   ├── page.tsx                   # Main page assembling all sections
│   ├── globals.css                # Tailwind v4 @theme tokens (emerald, gold, ivory, charcoal)
│   ├── icon.png                   # Favicon (128x128)
│   └── opengraph-image.jpg        # OG image for social sharing (1200x630)
├── components/
│   ├── sections/
│   │   ├── hero.tsx               # Hero section with headline, price, CTA
│   │   ├── unit-section.tsx       # Reusable unit section (Aryasatya/Adhinata)
│   │   └── location.tsx           # Location advantages (Keunggulan section)
│   ├── navbar.tsx                 # Scroll-spy navbar with mobile Sheet
│   ├── footer.tsx                 # Footer with brand, links, contact
│   ├── floating-whatsapp.tsx      # Persistent WhatsApp CTA button
│   ├── whatsapp-cta.tsx           # Shared WhatsApp button component
│   └── ui/                        # shadcn/ui primitives (button, badge, dialog, card, separator, sheet)
├── lib/
│   ├── site.ts                    # Site config (brand, URL, WA number, prices, nav items)
│   ├── units.ts                   # Aryasatya/Adhinata specs + Cloudinary photo/floor plan IDs
│   ├── location.ts                # Location items with distances
│   ├── cloudinary.ts              # getCloudinaryUrl helper for next/image
│   ├── wa.ts                      # buildWaLink helper for WhatsApp CTAs
│   └── utils.ts                   # cn utility (clsx + tailwind-merge)
├── docs/
│   └── readme-logo.png            # Logo for README
├── public/
│   └── (static assets)
├── AGENTS.md                      # SOP for AI coding agents working in this repo
├── architecture.md                # Architecture decisions and patterns
├── prd.md                         # Product requirements document
├── .env.example                   # Environment variable template
├── next.config.ts                 # Next.js config with security headers
├── tailwind.config.ts             # Tailwind CSS configuration
├── jest.config.ts                 # Jest configuration
└── package.json
```

## 🚀 Local Setup & Installation

### Prerequisites

- Node.js 18.18 or later (required by Next.js 16)
- Git

### Clone and Install

```bash
git clone https://github.com/MufidJK/landing-page-brawijaya.git
cd landing-page-brawijaya
npm install
```

### Environment Variables

Copy the example environment file:

```bash
# macOS/Linux
cp .env.example .env.local

# Windows
copy .env.example .env.local
```

**.env.example contents:**
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_WA_NUMBER=your_whatsapp_number
```

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name (safe to expose, it's a CDN namespace) | `dcsh47583` |
| `NEXT_PUBLIC_WA_NUMBER` | WhatsApp number for sales agent (international format, no + or spaces) | `6281234567890` |

**Note on images:** Images are served from the owner's Cloudinary account. To run your own copy with different images, upload your own images to Cloudinary and update the public IDs in:
- `lib/units.ts` (photoIds, floorPlanIds for Aryasatya and Adhinata)
- `components/sections/hero.tsx` (hero image ID)
- `components/navbar.tsx` (logo ID)

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `next dev` | Start development server (hot reload) |
| `build` | `next build` | Build production bundle (static generation) |
| `start` | `next start` | Start production server (after build) |
| `lint` | `eslint .` | Run ESLint |
| `typecheck` | `tsc --noEmit` | Run TypeScript compiler (type check only) |
| `test` | `jest --ci` | Run Jest tests (CI mode) |
| `test:watch` | `jest --watch` | Run Jest in watch mode (development) |
| `check` | `typecheck && eslint --max-warnings 0 && test` | Full quality gate (all checks must pass) |

## 🧪 Quality

Run the full quality gate before committing:

```bash
npm run check
```

This runs:
1. TypeScript compiler (`tsc --noEmit`) — zero errors
2. ESLint (`eslint . --max-warnings 0`) — zero warnings, zero errors
3. Jest (`jest --ci`) — all tests must pass

**Project documentation:**
- **AGENTS.md** — SOP for AI coding agents (coding rules, setup phases, non-negotiables)
- **architecture.md** — Architecture decisions, rendering strategy, security posture
- **prd.md** — Product requirements, target audience, functional/non-functional requirements

## 🚢 Deployment

### Vercel (Recommended)

1. Import the repository in Vercel
2. Add environment variables:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `NEXT_PUBLIC_WA_NUMBER`
3. Deploy

**Production URL:** [https://brawijaya-serpong.vercel.app](https://brawijaya-serpong.vercel.app)

## 📄 License & Acknowledgments

Source code Copyright (c) 2026 MufidJK. All rights reserved.

**The Brawijaya name, logo, renders, photos and floor plans belong to the project developer and their respective owners. This repository contains the source code of a marketing website only.**
