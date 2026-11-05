import { useCallback, useEffect, useRef, useState } from "react";
import { LiquidButton } from "../LiquidButton";
import { CANVAS_W, CANVAS_H } from "../../lib/playground";
import { sketchwall as copy } from "../../lib/content";

/**
 * The sketch pad.
 *
 * Strokes are kept as data and the canvas is repainted from them, rather than
 * the canvas being the only record. That is what makes undo a one-line pop
 * instead of a stack of full-size bitmaps, and it is also why the pad can be
 * backed by a fixed 1000x700 buffer while being displayed at whatever width
 * the layout gives it: pointer positions are scaled into buffer space on the
 * way in, so a drawing made on a phone and one made on a desktop land on the
 * wall at exactly the same resolution.
 */

type Point = { x: number; y: number };
type Stroke = { colour: string; width: number; erase: boolean; pts: Point[] };

/** Pen colours, all from the site's own palette. */
const COLOURS = [
  { name: "Ink", value: "#0a0d12" },
  { name: "Iris", value: "#0069e0" },
  { name: "Koi", value: "#ef5a22" },
  { name: "Cherry", value: "#98002e" },
  { name: "Violet", value: "#5e23dc" },
  { name: "Leaf", value: "#2f7d55" },
  { name: "Sun", value: "#f0c020" },
] as const;

const WIDTHS = [3, 7, 16] as const;

export default function DrawCanvas({
  onPost,
  posting,
}: {
  onPost: (png: Blob, name: string) => Promise<void>;
  posting: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokesRef = useRef<Stroke[]>([]);
  const drawingRef = useRef<Stroke | null>(null);

  const [colour, setColour] = useState<string>(COLOURS[0].value);
  const [width, setWidth] = useState<number>(WIDTHS[1]);
  const [erase, setErase] = useState(false);
  const [name, setName] = useState("");
  // Mirrors strokesRef purely so the buttons can enable and disable; the
  // strokes themselves stay in a ref so drawing never triggers a React render.
  const [count, setCount] = useState(0);

  /** Repaint everything. Cheap: these are tens of strokes, not thousands. */
  const repaint = useCallback(() => {
    const cv = canvasRef.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const all = drawingRef.current
      ? [...strokesRef.current, drawingRef.current]
      : strokesRef.current;

    for (const s of all) {
      if (s.pts.length === 0) continue;
      ctx.strokeStyle = s.erase ? "#ffffff" : s.colour;
      ctx.lineWidth = s.width;
      ctx.beginPath();

      if (s.pts.length === 1) {
        // A tap should leave a dot, not nothing.
        const p = s.pts[0];
        ctx.arc(p.x, p.y, s.width / 2, 0, Math.PI * 2);
        ctx.fillStyle = s.erase ? "#ffffff" : s.colour;
        ctx.fill();
        continue;
      }

      // Quadratic through midpoints: a polyline of raw pointer samples looks
      // visibly faceted at these line widths.
      ctx.moveTo(s.pts[0].x, s.pts[0].y);
      for (let i = 1; i < s.pts.length - 1; i++) {
        const mid = {
          x: (s.pts[i].x + s.pts[i + 1].x) / 2,
          y: (s.pts[i].y + s.pts[i + 1].y) / 2,
        };
        ctx.quadraticCurveTo(s.pts[i].x, s.pts[i].y, mid.x, mid.y);
      }
      const last = s.pts[s.pts.length - 1];
      ctx.lineTo(last.x, last.y);
      ctx.stroke();
    }
  }, []);

  useEffect(() => {
    repaint();
  }, [repaint]);

  /** Client coordinates into the fixed buffer's coordinates. */
  function toBuffer(e: React.PointerEvent<HTMLCanvasElement>): Point {
    const r = e.currentTarget.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) / r.width) * CANVAS_W,
      y: ((e.clientY - r.top) / r.height) * CANVAS_H,
    };
  }

  function start(e: React.PointerEvent<HTMLCanvasElement>) {
    // Capture, or dragging off the pad and back leaves a gap in the stroke.
    // Guarded: capture throws if the pointer is no longer active, and losing
    // the whole stroke because of a capture failure is the worse outcome.
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* draw without capture */
    }
    drawingRef.current = { colour, width, erase, pts: [toBuffer(e)] };
    repaint();
  }

  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current) return;
    drawingRef.current.pts.push(toBuffer(e));
    repaint();
  }

  function end() {
    const s = drawingRef.current;
    drawingRef.current = null;
    if (!s || s.pts.length === 0) return;
    strokesRef.current = [...strokesRef.current, s];
    setCount(strokesRef.current.length);
    repaint();
  }

  function undo() {
    strokesRef.current = strokesRef.current.slice(0, -1);
    setCount(strokesRef.current.length);
    repaint();
  }

  function clear() {
    strokesRef.current = [];
    setCount(0);
    repaint();
  }

  async function post() {
    const cv = canvasRef.current;
    if (!cv || count === 0) return;
    const png = await new Promise<Blob | null>((res) =>
      cv.toBlob(res, "image/png"),
    );
    if (!png) return;
    await onPost(png, name.trim());
    clear();
    setName("");
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        aria-label={copy.canvasLabel}
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerCancel={end}
        // Without this a finger drag scrolls the page instead of drawing.
        className="rounded-cards border-ink/[0.08] block w-full touch-none border bg-white"
        style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}`, cursor: "crosshair" }}
      />

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-4">
        {/* colours */}
        <div className="flex items-center gap-2" role="group" aria-label={copy.colourLabel}>
          {COLOURS.map((c) => {
            const on = !erase && colour === c.value;
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => {
                  setColour(c.value);
                  setErase(false);
                }}
                aria-label={c.name}
                aria-pressed={on}
                // The ring, not a size change: a swatch that grows on select
                // shifts every swatch after it.
                className={`size-7 rounded-full transition-[box-shadow] duration-200 ${
                  on ? "ring-ink/70 ring-2 ring-offset-2" : "ring-0"
                }`}
                style={{ backgroundColor: c.value }}
              />
            );
          })}
        </div>

        {/* nib sizes */}
        <div className="flex items-center gap-2" role="group" aria-label={copy.sizeLabel}>
          {WIDTHS.map((w) => (
            <button
              key={w}
              type="button"
              onClick={() => setWidth(w)}
              aria-label={`${w} pixel nib`}
              aria-pressed={width === w}
              className={`flex size-8 items-center justify-center rounded-full border transition-colors duration-200 ${
                width === w ? "border-ink/40 bg-mist-gray" : "border-ink/10"
              }`}
            >
              <span
                className="bg-ink block rounded-full"
                style={{ width: w / 1.6 + 3, height: w / 1.6 + 3 }}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setErase((e) => !e)}
          aria-pressed={erase}
          className={`font-geist text-body-sm rounded-full border px-4 py-2 transition-colors duration-200 ${
            erase
              ? "border-ink/40 bg-mist-gray text-ink"
              : "border-ink/10 text-graphite hover:text-ink"
          }`}
        >
          {copy.eraser}
        </button>

        <div className="flex items-center gap-2">
          <LiquidButton onClick={undo} disabled={count === 0} size="sm">
            {copy.undo}
          </LiquidButton>
          <LiquidButton onClick={clear} disabled={count === 0} size="sm">
            {copy.clear}
          </LiquidButton>
        </div>
      </div>

      <div className="border-ink/[0.08] mt-6 flex flex-wrap items-center gap-4 border-t pt-6">
        <label className="font-geist text-body-sm text-graphite flex items-center gap-3">
          {copy.signLabel}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={24}
            placeholder={copy.signPlaceholder}
            className="font-geist text-body-sm text-ink border-ink/15 focus:border-ink/40 w-44 rounded-full border px-4 py-2 outline-none transition-colors"
          />
        </label>
        <LiquidButton
          onClick={post}
          disabled={count === 0 || posting}
          tone="solid"
        >
          {posting ? copy.posting : copy.post}
        </LiquidButton>
        {count === 0 ? (
          <span className="font-geist text-body-sm text-fog">{copy.hint}</span>
        ) : null}
      </div>
    </div>
  );
}
