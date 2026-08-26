# CLAUDE.md

Kavita Yadav's portfolio. React 19 + TypeScript + Vite 8, Tailwind v4, react-router-dom 7,
framer-motion 13.

**Read `PROJECT_STATE.md` before starting work** — it has current route status, what's a
scaffold vs. built, known problems, and the remaining-work order.

## Commands

```bash
npm run dev            # port 5173
npm run build          # tsc -b && vite build — run before claiming done
npm run test:camera    # standalone tsx scripts, not a test runner
npm run test:ripple
npm run test:noise
```

## Conventions — do not break these

- **Design tokens live in `src/index.css` under `@theme`.** Never hardcode a hex in a
  component when a token exists. Don't invent new tokens without being asked.
- **Base element styles must stay inside `@layer base`.** Unlayered CSS outranks *every*
  `@layer`, including Tailwind utilities — an unlayered `h1 { color }` silently beat
  `text-white` and cost a real debugging cycle.
- **No shadows anywhere.** `--shadow-button` / `--shadow-block` are `none` deliberately.
  Cards get definition from a `border-ink/[0.08]` hairline, not elevation.
- **Page background is pure white.** `sky-tint`, `paper-white`, `bone-white` are all `#ffffff`.
- **All copy lives in `src/lib/content.ts`.** Don't inline strings in components.
  Don't paraphrase testimonials — they are people's real words.
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
`FishTrail` (scroll-scrubbed koi), `PondScene` (footer), `Floaties`, `scenes/mockups`.

`ScrollWorld.tsx` is **orphaned** — imported nowhere. Don't extend it; delete it if asked.

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
- **Don't script index-based string splices on `.tsx` files.** That corrupted
  `Contact.tsx` twice (once to 134k lines). Use the Edit tool, or rewrite the file whole.

## Git

Repo: https://github.com/kavya-2709/kavita-portfolio (public, `main`).
`*.mp4` is gitignored — GitHub rejects files over 100MB.
