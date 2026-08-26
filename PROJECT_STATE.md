# PROJECT_STATE.md

Handoff snapshot. Reflects the codebase as it actually is — not a plan.

## 1. Project

Personal portfolio for **Kavita Yadav**, Product & UX Designer (India). Single-page
homepage plus routed sub-pages. Visual concept: an interactive **pond** — a canvas
water simulation in the hero, a koi swimming the full page length, and an
illustrated pond footer.

- **Framework:** React 19 + TypeScript, Vite 8
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite` (tokens in `src/index.css` `@theme`)
- **Routing:** react-router-dom 7 (`BrowserRouter` in `src/main.tsx`)
- **Animation:** framer-motion 13
- **Lint:** oxlint. **No test runner** — three standalone `tsx` scripts instead.

Scripts: `dev`, `build` (`tsc -b && vite build`), `preview`, `lint`,
`test:camera`, `test:ripple`, `test:noise`.

## 2. Current Routes

| Route | Status | Purpose |
|---|---|---|
| `/` | Built | Homepage: Hero → Intro → Impact → LogoStrip → SelectedWork → Testimonials → Contact |
| `/about` | **Scaffold only** | Renders `sections/About.tsx` + footer. Content exists, page design not started |
| `/playground` | **Scaffold only** | Renders `sections/Playground.tsx` + footer. Content exists, page design not started |
| `/work/:slug` | **Scaffold only** | Generic case-study template. Shows index/client/headline/impact/tags/hero image, then a literal placeholder: "Full case study … coming next" |

Valid `:slug` values: `clean4wheels`, `niopractice`, `housing`. Unknown slugs render a
"That case study isn't here." fallback.

**Planned, does not exist:** a dedicated `/work` index page. Nav's "Work" link is
still a hash jump to the `#work` section on the homepage, unlike About/Playground
which are real routes.

## 3. Current Implementation

**Pages:** `pages/AboutPage.tsx`, `pages/PlaygroundPage.tsx`, `sections/CaseStudy.tsx`.

**Homepage sections** (`src/sections/`): `Hero`, `Intro`, `Impact`, `LogoStrip`,
`SelectedWork`, `Testimonials`, `Contact`, plus `About` / `Playground` (now used by
their routes, not the homepage).

**Reusable UI** (`src/components/ui.tsx`): `Container` (1200px max), `Button`
(primary/secondary/ghost), `Card`, `Pill`, `SectionHeader`, `Reveal`, `Stagger` +
`Stagger.Item`, `EASE`, `fadeUp`, `stagger`.

**Layout/nav:** `Nav.tsx` — fixed header, inverts white→ink when leaving the hero,
morphs into an "Available for work" avatar chip on scroll, and routes vs.
section-jumps per link. `ScrollToTop.tsx` — resets scroll on route change.
`Loader.tsx` — Pacman-style intro loader gating first render.

**Canvas / SVG systems:**
- `Pond.tsx` — hero water. Domain-warped fBm liquid + ripple simulation, pointer trail, koi, lily pads. Used only by `Hero`.
- `FishTrail.tsx` — koi swimming a scroll-scrubbed path down the whole document.
- `PondScene.tsx` — footer illustration: tabby cat with pointer-tracking pupils, submerged pads/lotuses, koi.
- `Floaties.tsx` — decorative SVG objects (Cloud, Crayon, Envelope, Smiley, Bloom, IrisBlob, `Float` wrapper).
- `scenes/mockups.tsx` — hand-built UI panels (`Clean4Wheels`, `NioPractice`, `Aumraa`, `Housing`) used as image fallbacks.

**Utilities** (`src/lib/`): `camera.ts` (3D camera maths), `ripple.ts` (water sim),
`noise.ts` (value noise/fBm/domain warp), `useCountUp.ts` (scroll-triggered counter
with Indian vs. Western digit-grouping detection).

**Content:** all copy in `src/lib/content.ts` — `profile`, `companies`, `experience`,
`selectedWork`, `projects`, `sideProjects`, `skills`, `education`, `testimonials`.

## 4. Design System

Tokens live in `src/index.css` under `@theme`. Base element styles are inside
`@layer base` — **required**, since unlayered rules outrank Tailwind utilities.

- **Fonts:** Instrument Serif (`--font-serif-display`, display/hero), Geist
  (`--font-geist`, UI/body), Inter (`--font-aeonik`, headings). Loaded from Google Fonts in `index.html`.
- **Colors:** `--color-ink #0a0d12`, `--color-charcoal #181d27`, `--color-graphite #535862`,
  `--color-fog #93979f`, `--color-iris-blue #0069e0`, `--color-mist-gray #f6f7f8`.
  Washes: powder-blue, lavender, mint, solar, violet, aqua, peach.
  **Page background is pure white** — `sky-tint`, `paper-white` and `bone-white` are all `#ffffff`.
- **Type scale:** `caption 10` → `body-sm 14` → `body 16` → `body-lg 18` → `subheading 20`
  → `heading-sm 24` → `heading 32` → `heading-lg 48` → `display 72` → `hero 148`, each with
  its own line-height and letter-spacing.
- **Spacing:** `Container` = `max-w-[1200px] px-6 md:px-10`. Sections use
  `py-14 md:py-20`, giving a **uniform 112px mobile / 160px desktop** gap between every section.
- **Radius:** `cards 32`, `images 24`, `cards-sm 16`, `inputs 16`, `buttons 32`, `banner 90`, pills `9999`.
- **Buttons:** charcoal pill, iris-blue fill rising from the bottom on hover; ghost variant is a hairline outline.
- **Cards:** white with `border-ink/[0.08]` hairline. **No shadows anywhere** — shadow tokens are `none` by design.
- **Motion:** `--ease-genie: cubic-bezier(0.16,1,0.3,1)`, exported as `EASE`. Durations 0.3–0.9s. Marquee keyframes; global `prefers-reduced-motion` kill-switch.
- **Cursor:** `.treat-cursor` — bone-shaped cat-treat cursor, scoped to the footer scene only.

## 5. Portfolio Projects

The three in `selectedWork` are the intended case studies.

| Project | Current Status | Route | Assets Available | Case Study Status |
|---|---|---|---|---|
| Clean4Wheels | Card built | `/work/clean4wheels` | `public/work/clean4wheels.png` + built mockup fallback | Scaffold only |
| NioPractice | Card built | `/work/niopractice` | `public/work/nio.png` + built mockup fallback | Scaffold only |
| Housing.com | Card built | `/work/housing` | `public/work/housing.png` + 3 real screens | Scaffold only |
| Aumraa | In `projects`/`experience` only — no card | none | Built mockup only | Not started |
| Buzzr | In `sideProjects` (Playground) | none | none | Not planned |
| Doorstep Beauty | In `sideProjects` (Playground) | none | `logos/companies/doorstep-beauty.png` | Not planned |

## 6. Assets

All under `public/`, referenced by absolute path (`/work/...`).

- `public/work/` — case-study hero images (`clean4wheels.png`, `nio.png`, `housing.png`), three Housing screens, `heart.png` bullet icon
- `public/logos/` — tool SVGs (figma, framer, webflow, adobe, claude, gemini, linkedin, behance)
- `public/logos/companies/` — client PNG marks (clean4wheels, nio, software-incubator, doorstep-beauty, thrift-guide)
- `public/people/` — testimonial photos (harsh-kumar, harsh, manav-kothari)
- `public/avatar.png` — nav chip avatar; `public/favicon.svg`
- **Fonts:** CDN only (Google Fonts), not self-hosted. **No videos.**

## 7. Current Problems

**Critical**
- Not a git repository. No version control at all — `git status` fails. All work is unbacked.

**Important**
- `/about`, `/playground` and all three case-study pages are scaffolds with placeholder bodies. The case-study template says "Full case study … coming next" on screen.
- Nav is inconsistent: About/Playground are routes, Work is a homepage hash jump. No `/work` index exists.
- `components/ScrollWorld.tsx` is orphaned — imported nowhere, still shipped in `src/`. Its `camera.ts` + `camera.test.ts` exist only to serve it.
- No SEO beyond a single `<meta description>` and `<title>`. No Open Graph, no per-route metadata (routes share one title).
- Bundle is **431 kB / 137 kB gzip** with no code-splitting; hero canvas + fish trail + footer SVG all load upfront.

**Minor**
- Responsive coverage is uneven — `Impact.tsx` has one `md:` breakpoint vs. six in `SelectedWork.tsx`. Not audited at small widths.
- Clean4Wheels and NioPractice cards fall back to built HTML mockups if their hero images fail; real screen exports would be better.
- `projects` in `content.ts` is legacy data from an earlier design, superseded by `selectedWork` but still exported.
- Accessibility verified only for hero and footer contrast; the rest is unaudited.

**Verified working:** `tsc -b` clean, `vite build` succeeds, and all three test scripts pass.

## 8. Remaining Work

1. **Work page** — build a `/work` index route; repoint the Nav "Work" link from the `#work` hash to it.
2. **Case study 1 (Clean4Wheels)** — replace the placeholder with the real write-up: problem, research, flows, outcomes.
3. **Case study 2 (NioPractice)** — same.
4. **Case study 3 (Housing.com)** — same; it already has three real screens to build around.
5. **About page** — design the page; content (`skills`, `experience`, `education`) already exists.
6. **Playground** — design the page; `sideProjects` exists. Motion reel / Medium posts still to be added.
7. **Responsive refinement** — audit every section at mobile/tablet; even out breakpoint coverage.
8. **Accessibility** — keyboard nav, focus states, alt text, contrast beyond hero/footer.
9. **SEO** — per-route titles/meta, Open Graph, sitemap, robots.
10. **Performance** — route-level code-splitting; lazy-load canvas/SVG work off the critical path.
11. **GitHub** — `git init`, first commit, push (nothing is version-controlled yet).
12. **Production deployment** — Vercel or Netlify; needs an SPA rewrite so `/about` etc. don't 404 on refresh.
13. **Custom domain** — buy and point DNS.

## 9. Deployment

- **Local dev:** `npm run dev` on port 5173 (`.claude/launch.json` defines a `portfolio` config).
- **Git:** none — not initialised.
- **GitHub:** no remote.
- **Hosting:** none. Never deployed.
- **Domain:** none. Existing public site is the old Framer one at `kycanvas.framer.website` (separate, not this codebase).
- **Environment variables:** none. No `.env` file, no secrets or API keys anywhere.
- **Contact form/backend:** none — contact is a `mailto:` link plus social links. No server, no form handler.

---

**NEXT TASK: Initialise git and push to GitHub (`git init`, `.gitignore` is already present, first commit, create remote).**

Everything built so far — the pond canvas, fish trail, footer scene, all content — exists only on this machine with no version control. Do this before writing any case study, so subsequent work is recoverable.
