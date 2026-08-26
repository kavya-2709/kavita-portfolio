import { STANDOFF, effectiveZ, sceneDistance, pathOffset } from "./camera";

const last = 3;                       // 4 scenes
const offs = [-140, 170, -110, 150];  // lateral offsets
let fail = 0;
const ok = (name: string, cond: boolean, got?: unknown) => {
  if (!cond) { fail++; console.log(`FAIL ${name}` + (got !== undefined ? ` -> got ${got}` : "")); }
  else console.log(`pass ${name}`);
};

// 1. Each scene is exactly STANDOFF in front of the camera at its own focus point.
for (let i = 0; i <= last; i++) {
  const z = effectiveZ(i / last, i, last);
  ok(`scene ${i} focuses at -STANDOFF`, Math.abs(z + STANDOFF) < 1e-6, z);
}

// 2. Focused scene has distance 0; neighbours are +/-1.
ok("d=0 at focus",    Math.abs(sceneDistance(1 / last, 1, last)) < 1e-9);
ok("d=-1 for next",   Math.abs(sceneDistance(1 / last, 2, last) + 1) < 1e-9);
ok("d=+1 for prev",   Math.abs(sceneDistance(1 / last, 0, last) - 1) < 1e-9);

// 3. Camera only ever moves forward (no reversal => no seam stutter).
let prev = -Infinity, monotonic = true;
for (let s = 0; s <= 1000; s++) {
  const z = effectiveZ(s / 1000, 0, last);
  if (z < prev - 1e-9) monotonic = false;
  prev = z;
}
ok("camera z is monotonically forward", monotonic);

// 4. Lateral path is continuous across every seam (no jump between segments).
let maxJump = 0;
for (let s = 1; s <= 3000; s++) {
  const a = pathOffset((s - 1) / 3000, offs);
  const b = pathOffset(s / 3000, offs);
  maxJump = Math.max(maxJump, Math.abs(b - a));
}
ok("lateral path continuous (max step < 3px)", maxJump < 3, maxJump.toFixed(3));

// 5. Path actually lands on each scene's offset at its focus point.
for (let i = 0; i <= last; i++) {
  const x = pathOffset(i / last, offs);
  ok(`path centres scene ${i}`, Math.abs(x + offs[i]) < 1e-6, x);
}

console.log(fail === 0 ? "\nALL PASS" : `\n${fail} FAILURE(S)`);
process.exit(fail ? 1 : 0);
