/**
 * Height-field water ripple simulation.
 *
 * Two buffers hold the surface height at t-1 and t. Each step solves the
 * discrete wave equation — a cell's next height is the average of its four
 * neighbours, minus its own previous height — then bleeds energy off via
 * `damping` so ripples decay instead of ringing forever.
 *
 * Rendering shades the surface from the height *gradient* rather than
 * distorting a source image, so the pond needs no texture to look wet.
 */

export type RippleField = {
  w: number;
  h: number;
  /** previous frame */
  a: Float32Array;
  /** current frame */
  b: Float32Array;
  damping: number;
};

export function createField(w: number, h: number, damping = 0.94): RippleField {
  return { w, h, a: new Float32Array(w * h), b: new Float32Array(w * h), damping };
}

/** Push a circular depression into the surface — a fingertip or a raindrop. */
export function drop(f: RippleField, cx: number, cy: number, radius: number, strength: number) {
  const x0 = Math.max(1, Math.floor(cx - radius));
  const x1 = Math.min(f.w - 2, Math.ceil(cx + radius));
  const y0 = Math.max(1, Math.floor(cy - radius));
  const y1 = Math.min(f.h - 2, Math.ceil(cy + radius));
  const r2 = radius * radius;

  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const d2 = dx * dx + dy * dy;
      if (d2 > r2) continue;
      // cosine falloff — a soft dimple, not a spike
      const falloff = 0.5 + 0.5 * Math.cos((Math.sqrt(d2) / radius) * Math.PI);
      f.a[y * f.w + x] += strength * falloff;
    }
  }
}

/** Advance one timestep. Buffers are swapped, so `f.a` is always the newest. */
export function step(f: RippleField) {
  const { w, h, a, b, damping } = f;
  for (let y = 1; y < h - 1; y++) {
    const row = y * w;
    for (let x = 1; x < w - 1; x++) {
      const i = row + x;
      const next = (a[i - 1] + a[i + 1] + a[i - w] + a[i + w]) * 0.5 - b[i];
      b[i] = next * damping;
    }
  }
  f.a = b;
  f.b = a;
}

/** Total absolute displacement — used to prove the surface settles. */
export function energy(f: RippleField): number {
  let sum = 0;
  for (let i = 0; i < f.a.length; i++) sum += Math.abs(f.a[i]);
  return sum;
}
