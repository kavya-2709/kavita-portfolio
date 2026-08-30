# CLAUDE.md

Kavita Yadav's portfolio. React 19 + TypeScript + Vite 8, Tailwind v4, react-router-dom 7,
framer-motion 13.

**Read `PROJECT_STATE.md` before starting work** — it has current route status, what's a
scaffold vs. built, known problems, and the remaining-work order.

## Commands

```bash
npm run dev            # port 5173
npm run build          # tsc -b && vite build — run before claiming done
npm run lint           # oxlint — 6 pre-existing warnings
npm run test:ripple    # standalone tsx scripts, not a test runner
npm run test:noise
```

`test:ripple` / `test:noise` **currently fail**: they run through `tsx`, which isn't
installed. Pre-existing. Add `tsx` as a devDependency or drop the scripts.

## Conventions — do not break these

- **Design tokens live in `src/index.css` under `@theme`.** Never hardcode a hex in a
  component when a token exists. Don't invent new tokens without being asked.
- **Base element styles must stay inside `@layer base`.** Unlayered CSS outranks *every*
  `@layer`, including Tailwind utilities — an unlayered `h1 { color }` silently beat
  `text-white` and cost a real debugging cycle.
- **No shadows anywhere.** `--shadow-button` / `--shadow-block` are `none` deliberately.
  Cards get definition from a `border-ink/[0.08]` hairline, not elevation. The one
  sanctioned exception is the testimonial sheet and its photograph, which are meant to
  read as physical paper resting on the page. Don't generalise it.
- **Type roles live in `lib/type.ts`. Import `TYPE`, never write heading classes
  inline.** Every section heading is the same size and the same face on every page:
  Instrument Serif announces a section, Geist explains one. Size means level, never
  emphasis. Headings were previously set inline at six different scales across ~100
  places, so two sections at the same level could differ by 24px.
- **One button, `ActionLink`.** Two sizes, three tones, and a liquid fill that rises
  on hover and focus. Every tone carries a border, transparent where it isn't drawn,
  or filled and outlined buttons come out a pixel apart side by side.
- **Each case study owns a colour.** `lib/surfaces.ts` maps slug to a pale tint of
  that project's own brand hex, taken from its Figma file. The card and the study it
  opens are the same colour, so the tint tells you where you are.
- **Only the three system faces, everywhere.** Instrument Serif for display, Geist for
  body and UI, Inter for headings. A handwriting face (Caveat) was tried on the
  testimonial quotes and removed. Don't reintroduce a fourth face.
- **Page background is pure white.** `sky-tint`, `paper-white`, `bone-white` are all `#ffffff`.
- **All copy lives in `src/lib/content.ts`.** Don't inline strings in components.
  Don't paraphrase testimonials — they are people's real words.
- **Copy rules:** no em dashes in *rendered* copy (they read as an AI tell — rewrite the
  sentence rather than swapping in a comma), no trailing full stops on headings, year
  ranges as `2024/25` not a dash. Re-check after any copy edit. This file and
  `PROJECT_STATE.md` are notes, not rendered copy, so they're exempt.
- **Overlapping surfaces must be fully opaque.** `--color-card-ivory/-sage/-stone` are
  solid hexes because the `SelectedWork` cards physically overlap as they stack; an
  alpha tint shows the card underneath. Never tint these with `/opacity`.
- **Layout:** `Container` = `max-w-[1200px] px-6 md:px-10`. Sections use `py-14 md:py-20`,
  which produces a uniform 112px mobile / 160px desktop gap. Keep it uniform.
- **Motion:** import `EASE` from `components/ui.tsx` (`cubic-bezier(0.16,1,0.3,1)`).
  Durations 0.3–0.9s. There's a global `prefers-reduced-motion` kill-switch — leave it.
- **Fonts:** `font-serif-display` (Instrument Serif) for display/hero, `font-geist` for
  UI/body, `font-aeonik` (Inter) for headings.

## Reusable pieces

`components/ui.tsx` — `Container`, `Button`, `Card`, `Pill`, `SectionHeader`, `Reveal`,
`Stagger`/`Stagger.Item`, `EASE`. Use these instead of rebuilding.

`components/` also has `Nav`, `ScrollToTop`, `Loader`, `Pond` (hero canvas),
`FishTrail` (scroll-scrubbed koi), `FooterScene` (the closing panorama image),
`Scrapbook`, `Floaties`, `scenes/mockups`.

`ScrollWorld.tsx`, `PondScene.tsx`, `DepthRail.tsx`, `CloudBand.tsx` and `lib/camera.ts`
were all orphaned and have been **deleted**. Don't reintroduce them.

## Gotchas that already cost time

- **SVG mask stops must be white.** Masks key off luminance, so `#000` stops hide
  everything regardless of `stop-opacity`. Using black once made an entire scene vanish.
- **SVG arc sweep-flag matters.** Two circles pass through any two points; the wrong flag
  centres the arc in the wrong place. A lily pad rendered as a 285×192 blob instead of a
  192×192 disc.
- **`AnimatePresence mode="wait"` + variant children stalls.** If a staggered child can't
  resolve the `exit` variant, the parent's exit never settles and the incoming element
  never mounts — content freezes while state moves on. Give children every variant the
  parent uses, or use plain transition objects.
- **Word-gaps must sit outside `inline-block` wrappers.** Whitespace inside one gets
  stripped, so per-word reveal animations render text with no spaces.
- **Route changes need `behavior: "instant"`.** `html { scroll-behavior: smooth }` turns
  `scrollTo(0,0)` into an animation that the incoming route cancels mid-flight.
- **Verify with measurements, not screenshots.** The preview pane frequently serves stale
  frames and throttles `requestAnimationFrame` to zero, which freezes every framer-motion
  value. Check `rafTicks` before concluding an animation is broken.
- **The preview console buffer never clears.** It accumulates across reloads *and*
  navigations, so one old error looks like it "reproduces on every route". This burned a
  whole debugging cycle chasing a shell-wide `TypeError` that was really a single
  transient HMR failure from mid-edit. Before believing an error is live: log a marker
  (`console.log('MARKER')`), reload, and check the error appears *after* the marker. Count
  entries too — one error across a dozen reloads is stale, not recurring.
- **`EASE` is a framer-motion array, not a CSS string.** `[0.16,1,0.3,1]`. Dropping it
  into a CSS shorthand gives `transform 0.7s 0.16,1,0.3,1`, which is invalid, so the
  browser silently discards the *whole* declaration and you get no transition with no
  error. For CSS, use `cubic-bezier(${EASE.join(",")})` (see `Testimonials.tsx`).
- **Don't let framer-motion own a resting position.** It writes transforms from rAF, so
  where rAF is throttled to zero (background tab, and this preview pane) elements sit at
  `transform: none`. That's fine for a decorative reveal, but for anything whose *layout*
  depends on the transform, use a plain CSS transform so the position is declarative and
  correct on first paint. The testimonial sheets stack on top of each other otherwise.
- **Marquee gaps go inside the run, not on the track.** Both marquees (`Testimonials`,
  `OffTheClock`) duplicate a run and translate `-50%`. A gap on the flex *track* makes
  the two runs unequal, so `-50%` lands mid-card and the strip jumps every cycle. Put
  the gap inside each run with matching trailing padding, and verify
  `run0.offsetWidth === run1.offsetWidth === track.scrollWidth / 2`.
- **Don't script index-based string splices on `.tsx` files.** That corrupted
  `Contact.tsx` twice (once to 134k lines). Use the Edit tool, or rewrite the file whole.

## Git

Repo: https://github.com/kavya-2709/kavita-portfolio (public, `main`).
`*.mp4` is gitignored — GitHub rejects files over 100MB.
