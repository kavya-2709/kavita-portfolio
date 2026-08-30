import type { ReactNode } from "react";

/**
 * Device chrome for product screenshots.
 *
 * A bare screenshot on a white page has no edge, so it reads as a picture of
 * a website rather than as a product. The frame supplies that edge and says
 * which surface the work belongs to without a caption.
 *
 * Both frames are drawn, not imported: they are chrome, not content, so a
 * bitmap of a phone would only add weight and go soft on a retina screen.
 * The bezel is a border and a radius, which stays sharp at any size.
 */
export function DeviceFrame({
  kind,
  children,
  className = "",
}: {
  kind: "phone" | "browser";
  children: ReactNode;
  className?: string;
}) {
  if (kind === "phone") {
    return (
      <div
        className={`border-ink/15 bg-ink/[0.03] relative rounded-[2rem] border p-2 ${className}`}
      >
        {/* Speaker slot. Sits over the screen, so the screenshot can run to
            the full height of the bezel rather than stopping short of it. */}
        <span
          aria-hidden
          className="bg-ink/20 absolute top-3.5 left-1/2 z-10 h-1 w-12 -translate-x-1/2 rounded-full"
        />
        <div className="overflow-hidden rounded-[1.6rem] bg-white">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`border-ink/12 rounded-cards-sm overflow-hidden border bg-white ${className}`}
    >
      {/* Window bar. The three dots are the whole convention, so nothing
          else is needed to read this as a browser. */}
      <div className="border-ink/[0.08] bg-mist-gray flex items-center gap-1.5 border-b px-4 py-2.5">
        <span aria-hidden className="bg-ink/15 size-2.5 rounded-full" />
        <span aria-hidden className="bg-ink/15 size-2.5 rounded-full" />
        <span aria-hidden className="bg-ink/15 size-2.5 rounded-full" />
        <span
          aria-hidden
          className="bg-ink/[0.06] ml-3 h-4 flex-1 rounded-full sm:ml-4"
        />
      </div>
      {children}
    </div>
  );
}
