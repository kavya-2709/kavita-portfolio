import { playground as p } from "../lib/content";
import { Container } from "../components/ui";
import { TYPE } from "../lib/type";

/**
 * Playground — the motion reel.
 *
 * One rail rather than a strip of tiles. The reel already carries its own
 * pacing and cuts, so slicing it into captioned cards was describing motion
 * the viewer can watch happen. Nothing here is labelled for the same reason.
 *
 * Sits on the page's own white, with no tinted band behind it: the reel
 * brings its own colour and a ground fought with it.
 */
export default function Playground() {
  return (
    <section id="playground" className="relative py-16 md:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
          <div>
            <span className="bg-ink text-paper-white font-geist text-caption inline-flex rounded-full px-4 py-1.5 tracking-[0.11em] uppercase">
              {p.badge}
            </span>

            <h2 className={`${TYPE.h2} mt-7`}>
              {p.title}
              <br />
              <span className="text-clay italic">{p.titleAccent}</span>
            </h2>
          </div>

          <div className="flex items-start gap-5 lg:pt-3">
            <img
              src={p.sticker}
              alt=""
              aria-hidden
              width={96}
              height={96}
              className="h-[72px] w-auto shrink-0 -rotate-6 md:h-[88px]"
            />
            <p className={`${TYPE.body} max-w-sm`}>
              {p.blurbBefore}
              <em className="font-serif-display text-ink text-body-lg not-italic">
                <span className="italic">{p.blurbEmphasis}</span>
              </em>
              {p.blurbAfter}
            </p>
          </div>
        </div>

        {/*
          Autoplays muted and loops, which is the only way a browser will
          start a video unprompted. `preload="metadata"` rather than `auto`:
          it sits below three case studies on a page whose job is those case
          studies, so it should not compete with them for first-paint
          bandwidth. `playsInline` stops iOS taking it fullscreen.
        */}
        <div className="rounded-cards border-ink/[0.08] mt-12 overflow-hidden border bg-white md:mt-16">
          <video
            src={p.reel}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label={p.reelLabel}
            className="block aspect-video w-full object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
