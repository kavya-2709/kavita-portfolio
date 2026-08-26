/**
 * Value noise + fBm + domain warping.
 *
 * Domain warping — sampling noise at coordinates that are themselves
 * displaced by noise — is what turns smooth blobs into the organic,
 * marbled liquid shapes the pond needs. Plain fBm looks like clouds;
 * warped fBm looks like flowing water.
 */

const PERM = new Uint8Array(512);

export function seedNoise(seed = 1337) {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  // deterministic shuffle (mulberry32)
  let s = seed >>> 0;
  const rnd = () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), 1 | t);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = 255; i > 0; i--) {
    const j = (rnd() * (i + 1)) | 0;
    const tmp = p[i];
    p[i] = p[j];
    p[j] = tmp;
  }
  for (let i = 0; i < 512; i++) PERM[i] = p[i & 255];
}

seedNoise();

const fade = (t: number) => t * t * (3 - 2 * t);

/** 2D value noise in [0,1]. */
export function valueNoise(x: number, y: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;

  const xi = ix & 255;
  const yi = iy & 255;

  const a = PERM[(PERM[xi] + yi) & 255] / 255;
  const b = PERM[(PERM[(xi + 1) & 255] + yi) & 255] / 255;
  const c = PERM[(PERM[xi] + yi + 1) & 255] / 255;
  const d = PERM[(PERM[(xi + 1) & 255] + yi + 1) & 255] / 255;

  const u = fade(fx);
  const v = fade(fy);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

/** Fractal Brownian motion — 3 octaves is enough for large soft shapes. */
export function fbm3(x: number, y: number): number {
  let sum = 0;
  sum += 0.5 * valueNoise(x, y);
  sum += 0.25 * valueNoise(x * 2.03, y * 2.03);
  sum += 0.125 * valueNoise(x * 4.01, y * 4.01);
  return sum / 0.875;
}

/**
 * Domain-warped fBm. `strength` controls how violently the coordinate
 * space is dragged around — higher gives more ribboning.
 */
export function warpedFbm(x: number, y: number, strength = 3): number {
  const qx = fbm3(x, y);
  const qy = fbm3(x + 5.2, y + 1.3);
  return fbm3(x + strength * qx, y + strength * qy);
}
