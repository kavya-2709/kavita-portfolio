import { useState } from "react";
import { Container } from "../ui";
import { TYPE } from "../../lib/type";
import { LiquidButton } from "../LiquidButton";
import { ExternalIcon } from "../icons";
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
  const [active, setActive] = useState(0);

  return (
    <section className="pb-14 md:pb-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-14">
          {/* The statement. Sticky so it holds the thought while you read
              across the cards, which is what it does in the reference. */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h1 className={TYPE.h1}>
              {copy.headingBefore}{" "}
              <span className="font-serif-display text-[color:#ef5a22] italic">
                {copy.items[active].tag}
              </span>
            </h1>
            <p className={`${TYPE.body} mt-6`}>{copy.lead}</p>
          </div>

          <ul className="grid gap-6 sm:grid-cols-2 lg:gap-7">
            {copy.items.map((it, i) => {
              const open = active === i;
              return (
                <li
                  key={it.id}
                  onMouseEnter={() => setActive(i)}
                  onFocusCapture={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="flex h-full flex-col"
                >
                  {/* The tag, which grows into the question for the open
                      card. Both states are the same element, so the swap
                      reads as one thing changing size rather than two
                      things replacing each other. */}
                  <div
                    className={`font-geist text-body-sm inline-block transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                      open
                        ? "rounded-cards-sm bg-mist-gray text-ink px-5 py-3.5"
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
                      <div
                        className={`mt-3 grid gap-3 ${
                          it.thumbs.length === 1 ? "grid-cols-1" : "grid-cols-2"
                        }`}
                      >
                        {it.thumbs.map((t) => (
                          <img
                            key={t.src}
                            src={t.src}
                            alt={t.alt}
                            loading="lazy"
                            className="rounded-cards-sm border-ink/[0.08] h-28 w-full border bg-white object-cover object-top"
                          />
                        ))}
                      </div>
                    ) : null}
                  </figure>

                  <h2 className={`${TYPE.h3} mt-5`}>{it.title}</h2>
                  <p className={`${TYPE.small} mt-1.5`}>{it.meta}</p>

                  <div className="mt-auto pt-4">
                    <LiquidButton href={it.live} size="sm">
                      {copy.liveCta}
                      <ExternalIcon />
                    </LiquidButton>
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
