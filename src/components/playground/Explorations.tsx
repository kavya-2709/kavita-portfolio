import { useState } from "react";
import { Container } from "../ui";
import { TYPE } from "../../lib/type";
import { LiquidButton } from "../LiquidButton";
import { ExternalIcon, PlayIcon } from "../icons";
import { explorations as copy } from "../../lib/content";

/**
 * The AI explorations, built from the reference Kavita supplied.
 *
 * Two things make that design work and both are structural.
 *
 * The statement sits *beside* the cards, not above them, and stays put while
 * they scroll. It is the page's only large heading, so it has to behave like
 * a title rather than like the first of several section headers.
 *
 * And the statement and the cards are wired together: each card carries a
 * one-word tag, the statement ends with the tag of whichever card you are
 * on, and that card's tag grows into the question the project started from
 * while the others stay single words. The section reads as one sentence
 * being finished several different ways.
 *
 * Pointer, keyboard and tap all drive it, and it is legible with no
 * interaction at all: the first card is open by default.
 */
export default function Explorations() {
  /**
   * Nothing is open until you point at something.
   *
   * The first card used to be expanded by default, which meant the page
   * arrived already asserting one project's question before the reader had
   * chosen anything. At rest every card is just its one-word tag and the
   * heading ends on a word of its own; hovering, focusing or tapping a card
   * opens that card's question, and leaving puts it back.
   */
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="py-14 md:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-14">
          {/* The statement. Sticky so it holds the thought while you read
              across the cards, which is what it does in the reference. */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h1 className={TYPE.h1}>
              {copy.headingBefore}{" "}
              <span className="font-serif-display text-[color:#ef5a22] italic">
                {active === null ? copy.restingTag : copy.items[active].tag}
              </span>
            </h1>
            <p className={`${TYPE.body} mt-6`}>{copy.lead}</p>
          </div>

            <ul
            className="grid gap-6 sm:grid-cols-2 lg:gap-7"
            onMouseLeave={() => setActive(null)}
          >
            {copy.items.map((it, i) => {
              const open = active === i;
              return (
                <li
                  key={it.id}
                  onMouseEnter={() => setActive(i)}
                  onFocusCapture={() => setActive(i)}
                  onBlurCapture={() => setActive(null)}
                  // Tap toggles, so a touch user can close it again.
                  onClick={() => setActive((p) => (p === i ? null : i))}
                  className="flex h-full flex-col"
                >
                  {/* One bubble that grows, not two that swap.
                      Same fill, same type, same squared bottom-left corner
                      in both states, so hovering reads as the word opening
                      out into the question rather than as a replacement. */}
                  <div
                    className={`font-geist text-body-sm bg-mist-gray self-start rounded-[1.75rem] rounded-bl-[0.5rem] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                      open
                        ? "text-ink max-w-[26rem] px-6 py-4 leading-[1.55]"
                        : "text-ink px-5 py-2.5 font-semibold"
                    }`}
                  >
                    {open ? (
                      <>
                        {it.q.before}
                        <strong className="font-semibold">{it.q.strong}</strong>
                        {it.q.after}
                      </>
                    ) : (
                      it.tag
                    )}
                  </div>

                  {/* A bento of three: the hero across the top, the two
                      supporting shots beneath it.

                      The whole block is pinned to one aspect ratio and every
                      tile is `object-cover`, so the two projects occupy
                      exactly the same height whatever their screenshots
                      happen to measure. Before this the cards ran to
                      different lengths purely because one site is 16:10 and
                      the other is nearly 2:1.

                      One radius on every tile and a gap that matches it, so
                      the three read as pieces of one object rather than
                      three images that happen to be stacked. */}
                  <figure className="mt-4 mb-0 grid aspect-[4/3] min-h-0 grid-cols-2 grid-rows-[minmax(0,1.85fr)_minmax(0,1fr)] gap-2.5">
                    <img
                      src={it.hero}
                      alt={it.heroAlt}
                      loading="lazy"
                      className="rounded-cards-sm border-ink/[0.08] col-span-2 h-full min-h-0 w-full border bg-white object-cover object-top"
                    />
                    {it.thumbs.map((t) => (
                      <img
                        key={t.src}
                        src={t.src}
                        alt={t.alt}
                        loading="lazy"
                        // A single supporting shot spans the row rather than
                        // leaving a hole beside itself.
                        className={`rounded-cards-sm border-ink/[0.08] h-full min-h-0 w-full border bg-white object-cover object-top ${
                          it.thumbs.length === 1 ? "col-span-2" : ""
                        }`}
                      />
                    ))}
                  </figure>

                  <h2 className={`${TYPE.h3} mt-5`}>{it.title}</h2>
                  <p className={`${TYPE.small} mt-2`}>{it.meta}</p>

                  <div className="mt-auto flex flex-wrap gap-2 pt-5">
                    <LiquidButton href={it.live} size="sm">
                      {copy.liveCta}
                      <ExternalIcon />
                    </LiquidButton>
                    {/* Only rendered once there is something to play, so a
                        project without a recording does not show a button
                        that goes nowhere. */}
                    {it.demo ? (
                      <LiquidButton href={it.demo} size="sm">
                        {copy.demoCta}
                        <PlayIcon />
                      </LiquidButton>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
