# AGENTS.md — SOP for The Brawijaya Landing Page

This file is the operating manual for any AI coding agent (Hermes via
9Router, Antigravity, etc.) working in this repository. Follow it exactly.
If a request conflicts with this file, follow this file and flag the
conflict instead of silently deviating.

## 1. Stack

- Next.js (App Router), TypeScript strict mode
- Tailwind CSS v4
- shadcn/ui for interactive primitives (tabs, accordion, carousel)
- Images: Cloudinary URLs via `next/image` with a custom loader — **never**
  commit binary image files to the repo
- Deployment target: Vercel

> Not in this stack, deliberately: **no Supabase, no database, no
> `next-themes`/dark-mode toggle.** This project has zero backend (see
> architecture.md) and the design reference has no dark mode requirement.
> Don't add either without an explicit decision to change scope.

> ⚠️ **Never run `taskkill /F /IM node.exe` (or any broad kill-all-node
> command).** This machine also runs 9Router as a node process — a
> blanket kill takes down 9Router along with any stray dev server, and
> 9Router does not auto-restart. This has happened before and caused a
> full agent outage. To clear a stuck dev server, find the specific PID
> holding the port instead: `netstat -ano | findstr :3000`, then
> `taskkill /F /PID <that specific PID>`.

## 2. Setup Phases (run once, in order, before any UI work)

**Phase 1 — Core init**
```
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir
npx shadcn@latest init
```
When shadcn asks: default style, Zinc or Slate base color, CSS variables = yes.

**Phase 2 — Typography sanity check**

Next.js's default Geist font setup sometimes doesn't get correctly wired
into Tailwind/shadcn's `font-sans` variable, and the page silently falls
back to serif. In `app/layout.tsx`, confirm:
- `GeistSans`/`GeistMono` (or `next/font/google` equivalents) are mapped
  to `--font-sans` and `--font-mono` CSS variables
- the `<body>` tag explicitly has the `font-sans` utility class applied
- verify in the browser (inspect computed font-family), don't assume the
  config is correct just because it compiles

**Phase 3 — Testing infra**
```
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/dom @testing-library/user-event ts-node @types/jest
```
- `jest.config.ts` must include `moduleNameMapper` for the `@/*` path alias
  so imports resolve the same way they do in the app
- Add to `package.json` scripts:
  - `"prebuild": "node -e \"require('fs').rmSync('.next',{recursive:true,force:true})\""` (cross-platform .next cache clear)
  - `"typecheck": "tsc --noEmit"`
  - `"lint": "eslint ."`
  - `"test": "jest --ci"`, `"test:watch": "jest --watch"`
  - `"check": "npm run typecheck && eslint . --max-warnings 0 && npm test"` (full quality gate)

## 3. Non-Negotiable Coding Rules

- **Zero `any` types.** If a type is genuinely unknown, use `unknown` and
  narrow it — never suppress with `any` or `@ts-ignore`.
- **Server Components by default.** Only add `"use client"` when the
  component genuinely needs interactivity (tabs, carousel state, click
  handlers). State the reason in a comment above the directive.
- **No backend, no API routes, no Server Actions for this project.**
  Lead capture is a plain `<a href="https://wa.me/...">` link — do not
  introduce a form submission endpoint (see architecture.md for why).
- **Always use `next/image`**, never raw `<img>`. Every image needs
  meaningful `alt` text (not filenames, not "image1").
- **No arbitrary hex colors in className** (e.g. `text-[#1F2421]`). Use
  the brand tokens from the `@theme` block in `globals.css`; if a token
  is missing, add it there. Tailwind IntelliSense suggestions count as
  warnings: the editor Problems panel must be at 0 for every touched file.
- **Tailwind v4 token safety:** before adding a custom CSS variable in
  `globals.css`, check it doesn't collide with a Tailwind reserved key
  (e.g. `--spacing-*` overriding `max-w-*` utilities). This exact bug
  class caused real breakage on a prior project — verify in the browser,
  not just visually in the editor.
- **No hardcoded secrets or phone numbers scattered across files.** WA
  number, Cloudinary cloud name, and any other config values live in one
  constants file (e.g. `lib/site.ts`) or `.env` as appropriate.
- **No em dashes or en dashes (— –) in user-facing copy.** Use commas,
  periods, or plain hyphens. Reads cleaner, avoids encoding issues.
- **Every `useEffect` that subscribes to something must clean up after
  itself.** This means: event listeners (`scroll`, `resize`), `setTimeout`/
  `setInterval`, `IntersectionObserver`/`MutationObserver`, media query
  listeners, and any third-party widget's `.destroy()`/unsubscribe method.
  A `useEffect` with a subscription and no return cleanup function is a
  bug, not a style nitpick — it's how components leak memory and crash
  long-running sessions. Review every `useEffect` against this before
  marking a component done.
- **Zero warnings, zero errors — no exceptions.** `npm run lint` (eslint . --max-warnings 0) and
  `tsc --noEmit` must both come back completely clean, not just "no
  errors, a few warnings." A yellow squiggle is still a defect. Do not
  suppress a warning with an eslint-disable comment to make it go away —
  fix the actual cause, or explain in the PR why suppression is the
  correct call and get explicit sign-off first.

## 4. Testing Requirements

- Every non-trivial component gets a co-located `.test.tsx` (React
  Testing Library). Trivial = pure presentational with no logic/props
  branching.
- At minimum, test:
  - Each WA CTA link renders with the correct `href` and target.
  - Unit type cards render correct specs for Aryasatya vs Adhinata.
  - Responsive-critical components render without throwing at small
    viewport (jsdom width mock is fine).
- Run the full test suite and `tsc --noEmit` before considering any task
  "done." Do not report a task complete with failing tests or type errors.

## 5. Security Checklist (apply before marking a PR/change complete)

- [ ] No API keys, tokens, or secrets in client-side code or committed files
- [ ] All external links (`wa.me`, Cloudinary, maps embed) use `rel="noopener noreferrer"` where `target="_blank"` is used
- [ ] No `dangerouslySetInnerHTML` unless content is fully static/trusted
- [ ] CSP / security headers configured in `next.config.ts` (or middleware)
- [ ] No third-party script tags added without explicit approval — each one is a new attack surface
- [ ] Dependency audit (`npm audit` or equivalent) clean of high/critical issues before deploy

## 6. Workflow

- Build **one section at a time**, in the order listed in prd.md §5.
  Do not attempt the whole page in one pass.
- After each section: self-review against this file's checklist, then
  report back with what was built and what's next — don't silently
  continue to the next section without a checkpoint.
- Commit messages describe the section/feature, not "update files."
- If the agent has access to a docs-lookup MCP tool (e.g. context7),
  use it to verify current API/library usage instead of relying on
  possibly-outdated training knowledge — especially for Next.js App
  Router and Tailwind v4 APIs, which have changed across versions.

## 7. Definition of Done (per task)

A task is done only when:
- it matches prd.md requirements
- `npm test` passes fully
- `tsc --noEmit` is clean — zero errors
- `npm run lint` (eslint . --max-warnings 0) is clean — **zero warnings, zero errors**
- every `useEffect` with a subscription/listener/timer has a verified
  cleanup function
- passes the security checklist above
- verified responsive at the breakpoints listed in prd.md §9

Do not report a task complete if any of the above is not met — "mostly
clean" or "just a few warnings" is not done.

Task prompts that say "minimal patch" or "stop after this" never waive §3, §4 or §7.
The raw output of `npm run check` must be pasted in every completion report.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
