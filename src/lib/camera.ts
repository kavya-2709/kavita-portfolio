/**
 * Camera geometry for the scroll cinematic.
 *
 * Scenes sit in CSS 3D space at z = -i * GAP. The world is translated by
 * `worldZ`, so scene i's effective distance from the camera is
 * `worldZ - i * GAP`. Solving for "scene i sits STANDOFF in front of the
 * camera when p = i / last" gives worldZ = p * last * GAP - STANDOFF.
 */
export const GAP = 1500;
export const STANDOFF = 700;

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** smoothstep — lets the camera settle mid-scene, then pick up toward the next */
export const settle = (t: number) => t * t * (3 - 2 * t);

/** Signed distance of scene `i` from the camera, in units of GAP. 0 = in focus. */
export const sceneDistance = (p: number, i: number, last: number) =>
  clamp01(p) * last - i;

export const worldZ = (p: number, last: number) => clamp01(p) * last * GAP - STANDOFF;

/** Effective z of scene `i` relative to the camera. -STANDOFF when in focus. */
export const effectiveZ = (p: number, i: number, last: number) =>
  worldZ(p, last) - i * GAP;

/** Interpolate a lateral offset along the winding flight path. */
export function pathOffset(p: number, offsets: number[]): number {
  const last = offsets.length - 1;
  const s = clamp01(p) * last;
  const i = Math.min(last - 1, Math.floor(s));
  return -lerp(offsets[i], offsets[i + 1], settle(s - i));
}
