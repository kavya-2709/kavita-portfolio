import { valueNoise, fbm3, warpedFbm, seedNoise } from "./noise";

let fail = 0;
const ok = (n: string, c: boolean, got?: unknown) => {
  if (!c) { fail++; console.log(`FAIL ${n}` + (got !== undefined ? ` -> ${got}` : "")); }
  else console.log(`pass ${n}`);
};

// 1. Range is [0,1] for all three layers.
{
  let lo = Infinity, hi = -Infinity, wlo = Infinity, whi = -Infinity;
  for (let i = 0; i < 20000; i++) {
    const x = (i % 173) * 0.37;
    const y = ((i * 7) % 211) * 0.29;
    const v = valueNoise(x, y);
    const w = warpedFbm(x * 0.05, y * 0.05);
    if (v < lo) lo = v; if (v > hi) hi = v;
    if (w < wlo) wlo = w; if (w > whi) whi = w;
  }
  ok("valueNoise in [0,1]", lo >= 0 && hi <= 1, `${lo.toFixed(3)}..${hi.toFixed(3)}`);
  ok("warpedFbm in [0,1]", wlo >= 0 && whi <= 1, `${wlo.toFixed(3)}..${whi.toFixed(3)}`);
  ok("warpedFbm actually varies", whi - wlo > 0.25, (whi - wlo).toFixed(3));
}

// 2. Continuity — tiny coordinate steps must not jump (no visible seams).
{
  let maxJump = 0;
  for (let i = 0; i < 4000; i++) {
    const x = i * 0.013, y = i * 0.007;
    maxJump = Math.max(maxJump, Math.abs(warpedFbm(x + 0.001, y) - warpedFbm(x, y)));
  }
  ok("warpedFbm is continuous", maxJump < 0.02, maxJump.toFixed(4));
}

// 3. Deterministic for a given seed — animation must not flicker.
{
  const a = warpedFbm(3.7, 9.1);
  const b = warpedFbm(3.7, 9.1);
  ok("deterministic", a === b);
  seedNoise(1337);
  const c = warpedFbm(3.7, 9.1);
  ok("reseeding same seed reproduces", Math.abs(a - c) < 1e-12);
  seedNoise(99);
  ok("different seed differs", Math.abs(warpedFbm(3.7, 9.1) - a) > 1e-6);
  seedNoise(1337);
}

// 4. Warping genuinely changes the field (not a no-op).
{
  let diff = 0;
  for (let i = 0; i < 2000; i++) {
    const x = i * 0.021, y = i * 0.017;
    diff += Math.abs(warpedFbm(x, y, 3) - fbm3(x, y));
  }
  ok("domain warp alters the field", diff / 2000 > 0.05, (diff / 2000).toFixed(4));
}

// 5. All finite.
{
  let finite = true;
  for (let i = 0; i < 5000; i++) {
    if (!Number.isFinite(warpedFbm(i * 0.31, -i * 0.17))) { finite = false; break; }
  }
  ok("all values finite (incl. negative coords)", finite);
}

console.log(fail === 0 ? "\nALL PASS" : `\n${fail} FAILURE(S)`);
if (fail) throw new Error(`${fail} failing assertion(s)`);
