# PROJECT_STATE.md

Handoff snapshot. Reflects the codebase as it actually is, not a plan.
Read this and `CLAUDE.md` before starting work.

## 1. Project

Personal portfolio for **Kavita Yadav**, Product & UX Designer (India). A homepage
plus routed sub-pages. Visual concept: a **pond** — a canvas water simulation in the
hero, a koi swimming the page length, and a painted pond closing the footer.

- **Framework:** React 19 + TypeScript, Vite 8
- **Styling:** Tailwind v4 via `@tailwindcss/vite`, tokens in `src/index.css` `@theme`
- **Routing:** react-router-dom 7 (`BrowserRouter` in `src/main.tsx`)
- **Animation:** framer-motion 13
- **Lint:** oxlint (6 warnings, all pre-existing and benign)

Scripts: `dev` (port 5173), `build` (`tsc -b && vite build`), `preview`, `lint`,
`test:ripple`, `test:noise`.

> **`test:ripple` and `test:noise` currently fail**: they run through `tsx`, which
> is not installed. Pre-existing, not caused by recent work. Either add `tsx` as a
> devDependency or drop the scripts.

## 2. Routes

| Route | Status | Notes |
|---|---|---|
| `/` | Built | Hero → Intro → Impact → LogoStrip → SelectedWork → Testimonials → Contact |
| `/work` | Built | Index of all three case studies, plus the playground section. `pages/WorkPage.tsx` |
| `/about` | Built | Four sections. `pages/AboutPage.tsx` |
| `/work/clean4wheels` | Built | `pages/Clean4WheelsCase.tsx` |
| `/work/niopractice` | Built | `pages/NioCase.tsx` |
| `/work/housing` | Built | `pages/HousingCase.tsx` |
| `/playground` | Redirect | Now a section of `/work`; the old path redirects rather than 404s |
| `/work/:slug` | Fallback | Generic scaffold, reached only by an unknown slug |

**Nav is two items, Work and About.** Playground had its own route and its own
top-level slot for a page that is one section long, which sent people looking for
case studies down a second path. It now closes `/work` under a hairline, keeping
its `#playground` id so `/work#playground` still lands on it.

The three case studies are **lazy-loaded** (`React.lazy` + a `Suspense` boundary in
`App.tsx`). Together they carry enough copy to push the entry chunk past 500kB, and
none of it is needed by someone landing on the homepage.

Case-study pages share `components/caseStudy.tsx`: `Eyebrow`, `Head`, `Rise`,
`Card`, `Glance` and the `SECTION` rhythm. That shared furniture is what makes three
studies imported from three different Figma visual languages read as one site.

## 3. Homepage

**`SelectedWork`** is a sticky card stack. Each card parks 24px lower than the last
(`NAV_OFFSET + i * STACK_STEP`) so the next slides up and settles on top.
**Stacking is pure CSS `position: sticky`** — the scroll-driven scale/opacity is
decoration on top, so if that never runs the cards still stack.

- Two-column from `lg` (story left, work right), single column below. At tablet width
  a 50/50 split set the headline three words to a line. Two columns cut card height
  from ~855px to ~524px, which matters a lot in a stack.
- Card surfaces are **solid, fully opaque tokens**: `--color-card-ivory #f4f1ea`,
  `--color-card-sage #eaeee9`, `--color-card-stone #f1eae5`. Opacity tints are wrong
  here — the cards physically overlap, so a translucent card shows the one beneath.
- Image sits on a white plate inside the tinted card so mockups don't sink into it.

**`Testimonials`** is one sheet of paper, clipped and replaced. Not a marquee: the
earlier continuously-scrolling reel was removed deliberately.

- Square corners, warm `--color-paper-sheet`, fine SVG-turbulence grain, and a two-part
  contact shadow. This is **the sanctioned exception to the no-shadow rule** — the sheet
  has to read as sitting on the page.
- Type is the site's own: Geist for the quote, name and role, Instrument Serif for the
  section heading. Quotes are vertically centred against the sheet, next to the print.
- The clip bites the top edge of the photograph and is a child of the `figure`, so it
  inherits the print's tilt and stays registered to it.
- **All three sheets stay mounted**, positioned by a plain CSS transform at `-108% / 0 /
  108%`. Nothing mounts or unmounts, so there is no reset frame at the wrap and no
  presence to leak orphaned nodes. An earlier `AnimatePresence` version accumulated
  sheets that never unmounted.
- Position is **CSS, not framer-motion, on purpose**: motion writes transforms from rAF,
  so with rAF throttled the sheets all collapse to `transform: none` in one stack.
- The sheet wrapping round to the right gets `transition: none` so it jumps rather than
  travelling across frame. It is off-frame at both ends, so the jump is never seen.
- 2.5s hold, 0.7s slide, paused on hover/focus. Auto-advance is off entirely under
  `prefers-reduced-motion`; the dot controls still reach every quote.
- **Heights are fixed per breakpoint and were set by measuring the longest quote**
  (532 chars). The row layout starts at `md`, where the sheet is still narrow, so photo,
  gap and padding step up again at `lg` — sizing them for the wide sheet alone
  overflowed the quote by 154px at 768px. **Re-measure after any type change:** Geist is
  materially wider per character than the handwriting face it replaced.

## 4. About page

Four sections: `Surface` → `HowIWork` → `TrackRecord` → `OffTheClock`.
Content is Kavita's real copy and photography, originally from the Framer site
(`kycanvas.framer.website/about-me`).

**`Surface`** opens on "Curious by nature / Intentional by design", surfacing word by
word, then credential pills, a work CTA, and a **scattered pile of three photos**.
Pile offsets are percentages of each photo's *own* size, so one set of numbers holds
at every breakpoint; the 40%-across / 50%-down step leaves each photo ~70% visible.

**`HowIWork`** is the page's one genuinely interactive moment. Four paper cards lie
overlapping; hovering or tapping one lifts it 20px, straightens it toward 0°, raises
it to `z-50`, nudges neighbours ±26px away and drops them to 0.72 opacity. Driven by
one `focused: number | null` state and **transform + z-index only**, so nothing
re-lays-out. `onHoverStart`/`onTapStart`/`tabIndex` cover mouse, touch and keyboard.

> **Card paddings are load-bearing and were set by measurement.** A tilted 104px
> sticker has a ~130px bounding box, and a rotated card's text sits ~23px lower than
> its flat padding implies. That is why `pt-20` / `pb-32` / `lg:pr-12` look oversized
> and are only just enough. **If sticker size changes, re-measure** — every
> intermediate value tried looked fine in the numbers and still clipped on screen.

Stickers are Kavita's cat memes, all true alpha cut-outs, sized by **height not
width** (`h-[92px] md:h-[104px]`) because the four images have different aspect
ratios. `sticker-problem/repeat.png` are hers; `sticker-why/detail.webp` were cut
in-browser by flood-filling alpha from the border, because those two PNGs never
arrived. Swap them if the originals turn up.

**`TrackRecord`** renders one row per role: years, role, org, engagement type, tags.
It deliberately **does not render `points`** — six roles × 2–3 bullets flattened the
hierarchy until nothing stood out.

> **`experience` is ordered most-recent-first and that order is what renders.**
> There is no sort step: the period strings mix formats, so parsing is more fragile
> than keeping the array right by hand. **Add new roles at the top.**

**`OffTheClock`** is a leftward photo marquee. Card heights are **240 / 288px
specifically** so both aspect ratios divide into whole pixels (240→320/180,
288→384/216); fractional widths accumulate and leave the `-50%` loop half a pixel
short.

## 5. Footer

`Contact` → `FooterScene` → a thin black bar.

- The heading is the page's one piece of sales copy: **"Let's build something worth
  using"**. One line, conversion-focused, personal.
- `FooterScene` is `public/footer.webp`, a still image (1672×563, 106KB). It replaced
  a 25MB video of the same subject; the still says the same thing at a fraction of
  the weight. **No video ships at all** — `dist` went 36MB → 12MB.
- Source was a 1.4MB PNG. It needed no cropping (corners sample as sky and grass, not
  white) and re-encoded to WebP q0.82, a 13× saving.
- **Not lazy-loaded**: at 106KB the saving is negligible and it is the one image that
  must never be missing when someone reaches it.
- **Mobile crops in.** A 3:1 panorama is ~126px tall at 375px, shrinking the figures
  to ~95px. Below `sm` it holds 200px with `object-cover` at `42% 58%`; from `sm` up
  `h-auto` restores the full frame.
- Blending is a white top fade plus side feathers. No border, no rounding.

## 6. Design system

Tokens live in `src/index.css` under `@theme`. Base element styles are inside
`@layer base` — **required**, since unlayered rules outrank Tailwind utilities.

- **Fonts, two only in rendered UI:** Instrument Serif (`font-serif-display`) for
  display and emotional beats, Geist (`font-geist`) for everything else.
  `@layer base` sets `h1–h4` to `--font-aeonik` (Inter), so **every heading needs an
  explicit font class** or Inter silently leaks back in.
- **Colours:** `ink #0a0d12`, `charcoal #181d27`, `graphite #535862`, `fog #93979f`,
  `iris-blue #0069e0`, `mist-gray #f6f7f8`. Pastel washes: powder-blue, lavender,
  mint, solar, violet, aqua, peach. Solid card surfaces: card-ivory, card-sage,
  card-stone. **Page background is pure white.**
- **Radii:** cards 32, images 24, cards-sm 16, inputs 16, buttons 32, pills 9999.
- **No shadows anywhere.** Cards get definition from a `border-ink/[0.08]` hairline.
- **Motion:** `EASE = cubic-bezier(0.16,1,0.3,1)`, durations 0.3–0.9s, global
  `prefers-reduced-motion` kill-switch.

**Copy rules:** no em dashes in rendered copy (they read as an AI tell — rewrite the
sentence rather than swapping in a comma), no trailing full stops on headings, and
year ranges use `2024/25` rather than a dash. Re-check after any copy edit.

## 7. Assets

Everything under `public/` ships to `dist` verbatim, so nothing unused belongs there.

- `public/footer.webp` — the footer scene
- `public/life/` — 11 photos + 4 stickers for the About page
- `public/logos/companies/` — 5 client marks for the logo strip
- `public/people/` — 3 testimonial portraits
- `public/work/` — 6 case-study images
- `public/avatar.png`, `public/favicon.svg`

**`assets-source/` is deliberately outside `public/`** and holds originals and
retired media so they are never built: `footer-panorama.png`, the earlier painted
plate, `footer-scene.mp4` (25MB), `clouds.mp4` (19MB), `footer style.mp4` (51MB),
`beyond the screen.mp4`, and `unused/kavita-portrait.png`. About 107MB, all
untracked by git. **Don't delete without keeping a copy.**

Deleted as genuinely unused: eight tool-logo SVGs and `work/heart.png`.

## 8. Known problems

- All three case studies are written; only an unknown `/work/:slug` reaches the
  scaffold in `sections/CaseStudy.tsx`.
- The playground section is thin: `sideProjects` still reads as placeholder copy.
- `test:ripple` / `test:noise` fail because `tsx` isn't installed.
- Entry bundle is ~442kB / 141kB gzip. The case studies are split out per route, but
  the hero canvas and fish trail still load upfront.
- Unused `content.ts` exports kept on purpose because they are Kavita's writing, not
  dead layout data: `capabilities`, `skills`, `education`. Decide whether to use or
  drop them. (`heroStack`, `closingCards` and the `.treat-cursor` CSS rule were dead
  layout, so they are gone.)
- Accessibility audited only for hero and footer contrast.
- No SEO beyond one `<title>` and `<meta description>`; all routes share them.
- Never deployed. Needs an SPA rewrite so `/about` doesn't 404 on refresh.

## 9. Remaining work

1. **Playground content** — write real side projects; the cards are still thin.
2. **Confirm two claims** — the Clean4Wheels team line ("Sole designer, with founder,
   CTO and ops") is an *inference* from the stakeholder list, not something the Figma
   file states. And it is unknown whether NioPractice's 28% / 35% are measured or
   projected; Clean4Wheels labels its numbers, Nio does not.
3. **Case-study outcomes** — none of the three says whether it shipped. With the
   metrics honestly labelled as projections, that gap is the most visible one left.
4. **Responsive audit** — even out breakpoint coverage across sections.
5. **Accessibility** — keyboard nav, focus states, alt text, contrast beyond the hero.
6. **SEO** — per-route titles and meta, Open Graph, sitemap, robots.
7. **Performance** — lazy-load the hero canvas and fish trail, as the studies now are.
8. **Deploy** — Vercel or Netlify with an SPA rewrite, then a custom domain.

## 10. Verification notes

The preview pane in this environment is unreliable and has produced several false
conclusions. Verify with DOM measurements, not screenshots.

- It frequently **serves blank frames** and keeps `document.visibilityState: hidden`,
  which also means **video never plays** there.
- It throttles `requestAnimationFrame` to ~3fps, **fires no scroll events**, and
  **IntersectionObserver callbacks never arrive**. Anything gated on those will look
  broken when it is fine.
- **The console buffer never clears** across reloads or navigations, so one old error
  looks like it reproduces on every route. Log a marker, reload, and check the error
  appears *after* it. Count entries: one error across a dozen reloads is stale.
