import { useState } from "react";
import { Container } from "../ui";
import { TYPE } from "../../lib/type";
import { LiquidButton } from "../LiquidButton";
import { ExternalIcon } from "../icons";
import { explorations as copy } from "../../lib/content";

/**
 * The AI explorations, built from the reference Kavita supplied.
 *
 * The thing that makes that design work is that the heading and the cards are
 * wired together: each card carries a one-word tag, the heading ends with the
 * tag of whichever card you are on, and that card's tag expands into the
 * question the project started from while the others stay as single words.
 * So the section reads as one sentence being finished three different ways,
 * rather than as a row of boxes.
 *
 * Pointer and keyboard both drive it, and the whole thing is legible with no
 * interaction at all: the first card is open by default, and on a touch
 * screen tapping a card opens its question.
 */
export default function Explorations() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-14 md:py-20">
      <Container>
        <div className="max-w-3xl">
          <p className={TYPE.eyebrow}>{copy.eyebrow}</p>
          <h2 className={`${TYPE.h2} mt-4`}>
            {copy.headingBefore}{" "}
            {/* The word swaps, so it is given a stable baseline rather than
                being allowed to reflow the line as lengths change. */}
            <span className="font-serif-display text-[color:#ef5a22] italic">
              {copy.items[active].tag}
            </span>
          </h2>
          <p className={`${TYPE.lead} mt-5`}>{copy.lead}</p>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
          {copy.items.map((it, i) => {
            const open = active === i;
            return (
              <li
                key={it.id}
                onMouseEnter={() => setActive(i)}
                onFocusCapture={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                {/* The tag, which grows into the question for the open card.
                    Both states are the same element so the swap reads as one
                    thing changing size, not two things replacing each other. */}
                <div
                  className={`font-geist text-body-sm inline-block transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    open
                      ? "rounded-cards-sm bg-mist-gray text-ink max-w-md px-5 py-3.5"
                      : "bg-mist-gray text-graphite rounded-full px-4 py-2 font-medium"
                  }`}
                >
                  {open ? it.question : it.tag}
                </div>

                <figure className="m-0 mt-4">
                  <img
                    src={it.hero}
                    alt={it.heroAlt}
                    loading="lazy"
                    className="rounded-cards border-ink/[0.08] w-full border bg-white"
                  />
                  {it.thumbs.length > 0 ? (
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {it.thumbs.map((t) => (
                        <img
                          key={t.src}
                          src={t.src}
                          alt={t.alt}
                          loading="lazy"
                          className="rounded-cards-sm border-ink/[0.08] h-32 w-full border bg-white object-cover object-top"
                        />
                      ))}
                    </div>
                  ) : null}
                </figure>

                <h3 className={`${TYPE.h3} mt-5 max-w-md`}>{it.title}</h3>
                <p className={`${TYPE.small} mt-1.5`}>{it.meta}</p>

                <div className="mt-4">
                  <LiquidButton href={it.live} size="sm">
                    {copy.liveCta}
                    <ExternalIcon />
                  </LiquidButton>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
